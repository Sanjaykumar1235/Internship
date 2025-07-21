// bitrixcrm.controller.ts
// -----------------------------------------------------------------------------
// AUTO-GENERATED CONTROLLER FILE.
// DO NOT modify the auto-generated endpoints below.
// For custom integration logic, extend the helper "performbitrixcrmAction".
//
// Copyright (c) 2025 Smackcoders. All rights reserved.
// This file is subject to the Smackcoders Proprietary License.
// Unauthorized copying or distribution is strictly prohibited.
// -----------------------------------------------------------------------------

import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  Req,
  Res,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import * as qs from 'qs'
import axios, { Method } from 'axios';
import * as crypto from 'crypto';
import { initializeDB } from '../../ormconfig';
import { CredentialController } from 'src/credential/credential.controller';
import { Credentials } from '../../entities/Credentials';
import { CustomLogger } from '../../logger/custom.logger';
import config, { XappName, modules as xappModules } from './bitrix.config';
import { fields } from './bitrix.config';
@Controller('bitrixcrm')
export class bitrixcrmController {
  private logger = new CustomLogger();
  private CredentialController = new CredentialController();

  /**
   * [AUTO-GENERATED] OAuth authorize endpoint.
   * This endpoint initiates the authentication flow.
   * Implement the actual token request and error handling as needed.
   */
  @Post('authorize')
  async authorize(@Body() reqBody: any, @Res() res: Response) {
    if (!reqBody.clientId || !reqBody.redirectUri || !reqBody.clientSecret || !reqBody.name || !reqBody.type) {
      throw new HttpException('Missing OAuth parameters', HttpStatus.BAD_REQUEST);
    }
    try {
      const { clientId, redirectUri, clientSecret, name, type } = reqBody;

      const state = crypto.randomBytes(16).toString('hex')



      // Construct the OAuth URL.
      // NOTE: Update the URL if your xapp uses a different authentication endpoint.

      const authUrl = `https://b24-l21hl0.bitrix24.in/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${state}`;


      const data = {
        clientId: clientId,
        clientSecret: clientSecret,
        redirectUri: redirectUri.trim(),
        state: state,
        name: name,
      }


      const credentialsRequest = {
        name: name,
        type: type,
        data: data
      }


      if (reqBody.id) {
        await this.CredentialController.updateCredentials(reqBody.id, data);


        this.logger.debug('Credentials with ID updated successfully', reqBody.id);
        return res.status(HttpStatus.OK).send(authUrl);
      } else {
        // If no ID, create new credentials
        await this.CredentialController.createCredentials(credentialsRequest, res);
        return res.status(HttpStatus.CREATED).send(authUrl);
      }
    } catch (error) {
      this.logger.error('Error in authorize:', error);
      throw new HttpException('Authorization error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * [AUTO-GENERATED] OAuth callback endpoint.
   * Implement token exchange, credential update, and refreshToken handling here.
   */
  @Get('callback')
  async callback(@Req() req: Request, @Res() res: Response) {
    try {
      this.logger.log("Processing OAuth callback");
      const code = req.query.code as string;
      const state = req.query.state as string;

      if (!code) {
        throw new HttpException('Authorization code missing', HttpStatus.BAD_REQUEST);
      }

      if (!state) {
        throw new HttpException('State parameter missing', HttpStatus.BAD_REQUEST);
      }

      this.logger.log(`Received state: ${state}`);
      // Fetch stored credentials using state
      const connection = await initializeDB();
      const credRepository = connection.getRepository(Credentials);
      const credential = await credRepository
        .createQueryBuilder('credentials')
        .where("credentials.auth_data->>'state' = :state", { state })
        .getOne();

      if (!credential) {
        throw new HttpException('Invalid state parameter', HttpStatus.NOT_FOUND);
      }

      const { clientId, clientSecret, redirectUri } = credential.authData;


      
      const requestBody = qs.stringify({
        grant_type: 'authorization_code',
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri, 
        code: code
      });

      this.logger.log('Sending token request to Bitrix');

      const result = await axios.post('https://b24-l21hl0.bitrix24.in/oauth/token/?', requestBody, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      });

      this.logger.log("Token received successfully");

      const data = result.data
      credential.authData['token'] = data
      await this.CredentialController.updateCredentials(credential.id, credential.authData);
  

      // Redirect or return success response
      return res.status(HttpStatus.OK).send({
        status: 'success',
        message: 'Authentication successful',
        data: result.data
      });

    } catch (err) {
      // Enhanced error logging and handling

      // Return user-friendly error response
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: 'error',
        message: err.response?.data?.error || 'Authentication failed',
        details: err.message
      });
    }
  }

  /**
   * [AUTO-GENERATED] Refresh token endpoint.
   * This endpoint should handle token expiry and refresh the access token.
   * Implement the refresh logic based on your authentication provider.
   */
  @Post('refreshToken')
  async refreshToken(@Body() reqBody: any) {
    if (!reqBody.credentialId) {
      throw new HttpException('Missing refresh token', HttpStatus.BAD_REQUEST);
    }
    try {
      const id = reqBody.credentialId
      const connection = await initializeDB();
      const credRepository = connection.getRepository(Credentials);
      const credentialRepository: any = await credRepository.findOne({ where: { id } })
      const { clientId, clientSecret, token } = credentialRepository.authData;
      const refresh_token = await token.refresh_token;
      // TODO: Implement the refresh token logic here.
      // Example: Request a new access token using the refresh token.
      const tokenRequestData = new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refresh_token,
        client_id: clientId,
        client_secret: clientSecret,
      })

      const tokenResponse = await axios.post(`https://b24-l21hl0.bitrix24.in/oauth/token/?`, tokenRequestData.toString(), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
      const tokens = tokenResponse.data;
      credentialRepository.authData['token'] = tokens;
      const data = credentialRepository.authData;
      await this.CredentialController.updateCredentials(credentialRepository.id, data);


      const updatedcred: any = await credRepository.findOne({ where: { id } })

      return {
        message: `${XappName} access token refreshed successfully`,
        accessToken: updatedcred,
      };
    } catch (error) {
      this.logger.error('Error in refreshToken:', error);
      throw new HttpException('Refresh token error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async AuthError(functionName: string, functionArgs: any[], credentialId: string,) {
    try {
      await this.refreshToken({ credentialId });

      const argsArray = await Array.isArray(functionArgs) ? functionArgs : [functionArgs];
      const result = await this[functionName](...argsArray);
      return result;
    } catch (error) {
      this.logger.error('Error refreshing token:', error + error.stack);
      return error;
    }
  }
  // ---------------------------------------------------------------------------
  // AUTO-GENERATED ENDPOINTS FOR MODULE ACTIONS (as defined in the blueprint JSON)
  // ---------------------------------------------------------------------------

  /**
   * [AUTO-GENERATED] Endpoint for module "company" action "create".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - ModuleData: object (data to create)
   * - Calls the integration helper "performbitrixcrmAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId": "{{credentialId}}",
    "data": {
        "data": {
            "fields": {
                "TITLE": "New One",
                "COMPANY_TYPE": "CUSTOMER",
                "INDUSTRY": "MANUFACTURING"
            }
        }
    }
}
   */


  @Post('company/create')
  async createCompany(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performbitrixcrmAction('crm.company.add', 'create', 'POST', data);
      if (result.status === 401) {
        const functionArgs = Array.from(arguments).slice(0, 2);
        const result = await this.AuthError("createCompany", functionArgs, data.credentialId)
        return result
      }

      return res.status(HttpStatus.OK).json({
        message: `bitrixcrm company create executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in company/create:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "company" action "update".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - ModuleData: object (data to update)
   * - Calls the integration helper "performbitrixcrmAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId": "{{credentialId}}",
    "data": {
        "data": {
            "ID": 3,
            "fields": {
                "TITLE": "Updated Company Name",
                "COMPANY_TYPE": "PARTNER",
                "INDUSTRY": "Finance",
                "ADDRESS": "456 Main St"
            }
        }
    }
}
   */


  @Post('company/update')
  async updateCompany(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performbitrixcrmAction('crm.company.update', 'update', 'POST', data);
      if (result.status === 401) {
        const functionArgs = Array.from(arguments).slice(0, 2);
        const result = await this.AuthError("updateCompany", functionArgs, data.credentialId)
        return result
      }
      return res.status(HttpStatus.OK).json({
        message: `bitrixcrm company update executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in company/update:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "company" action "delete".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - RecordId: string (ID of the record to delete)
   * - Calls the integration helper "performbitrixcrmAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId": "{{credentialId}}",
    "data": {
        "data": {
            "ID": "5"
        }
    }
}
   */


  @Post('company/delete')
  async deleteCompany(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performbitrixcrmAction('crm.company.delete', 'delete', 'POST', data);
      if (result.status === 401) {
        const functionArgs = Array.from(arguments).slice(0, 2);
        const result = await this.AuthError("deleteCompany", functionArgs, data.credentialId)
        return result
      }
      return res.status(HttpStatus.OK).json({
        message: `bitrixcrm company delete executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in company/delete:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "company" action "get".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - RecordId: string (ID of the record to fetch)
   * - Calls the integration helper "performbitrixcrmAction".
   * DO NOT modify the method signature.
   *  Example usage:
   * {
    "credentialId": "{{credentialId}}",
    "data": {
        "data": {
            "ID": "3"
        }
    }
}
   */


  @Post('company/get')
  async getCompany(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performbitrixcrmAction('crm.company.get', 'get', 'POST', data);
      if (result.status === 401) {
        const functionArgs = Array.from(arguments).slice(0, 2);
        const result = await this.AuthError("getCompany", functionArgs, data.credentialId)
        return result
      }
      return res.status(HttpStatus.OK).json({
        message: `bitrixcrm company get executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in company/get:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "company" action "getMany".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - Filters: object (optional filters for querying records)
   * - Calls the integration helper "performbitrixcrmAction".
   * DO NOT modify the method signature.
   *  Example usage:
   * {
    "credentialId": "{{credentialId}}",
    "data": {}
}
   */


  @Post('company/getMany')
  async getmanyCompany(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performbitrixcrmAction('crm.company.list', 'getMany', 'POST', data);
      if (result.status === 401) {
        const functionArgs = Array.from(arguments).slice(0, 2);
        const result = await this.AuthError("getmanyCompany", functionArgs, data.credentialId)
        return result
      }
      return res.status(HttpStatus.OK).json({
        message: `bitrixcrm company getMany executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in company/getMany:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "contact" action "create".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - ModuleData: object (data to create)
   * - Calls the integration helper "performbitrixcrmAction".
   * DO NOT modify the method signature.
   *  Example usage:
   * {
    "credentialId": "{{credentialId}}",
    "data": {
        "data": {
            "fields": {
                "NAME": "Anto"
            }
        }
    }
}
   */


  @Post('contact/create')
  async createContact(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performbitrixcrmAction('crm.contact.add', 'create', 'POST', data);
      if (result.status === 401) {
        const functionArgs = Array.from(arguments).slice(0, 2);
        const result = await this.AuthError("createContact", functionArgs, data.credentialId)
        return result
      }
      return res.status(HttpStatus.OK).json({
        message: `bitrixcrm contact create executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in contact/create:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "contact" action "update".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - ModuleData: object (data to update)
   * - Calls the integration helper "performbitrixcrmAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId": "{{credentialId}}",
    "data": {
        "data": {
            "ID": "13",
            "fields": {
                "NAME": "Harish"
            }
        }
    }
}
   */


  @Post('contact/update')
  async updateContact(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performbitrixcrmAction('crm.contact.update', 'update', 'POST', data);
      if (result.status === 401) {
        const functionArgs = Array.from(arguments).slice(0, 2);
        const result = await this.AuthError("updateContact", functionArgs, data.credentialId)
        return result
      }
      return res.status(HttpStatus.OK).json({
        message: `bitrixcrm contact update executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in contact/update:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "contact" action "delete".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - RecordId: string (ID of the record to delete)
   * - Calls the integration helper "performbitrixcrmAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId": "{{credentialId}}",
    "data": {
        "data": {
            "ID": "11"
        }
    }
}
   */


  @Post('contact/delete')
  async deleteContact(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performbitrixcrmAction('crm.contact.delete', 'delete', 'POST', data);
      if (result.status === 401) {
        const functionArgs = Array.from(arguments).slice(0, 2);
        const result = await this.AuthError("deleteContact", functionArgs, data.credentialId)
        return result
      }
      return res.status(HttpStatus.OK).json({
        message: `bitrixcrm contact delete executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in contact/delete:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "contact" action "get".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - RecordId: string (ID of the record to fetch)
   * - Calls the integration helper "performbitrixcrmAction".
   * DO NOT modify the method signature.
   *  Example usage:
   * {
    "credentialId": "{{credentialId}}",
    "data": {
        "data": {
            "ID": "13"
        }
    }
}  */


  @Post('contact/get')
  async getContact(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performbitrixcrmAction('crm.contact.get', 'get', 'POST', data);
      if (result.status === 401) {
        const functionArgs = Array.from(arguments).slice(0, 2);
        const result = await this.AuthError("getContact", functionArgs, data.credentialId)
        return result
      }
      return res.status(HttpStatus.OK).json({
        message: `bitrixcrm contact get executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in contact/get:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "contact" action "getMany".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - Filters: object (optional filters for querying records)
   * - Calls the integration helper "performbitrixcrmAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId": "{{credentialId}}",
    "data": {}
}
   */


  @Post('contact/getMany')
  async getmanyContact(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performbitrixcrmAction('crm.contact.list', 'getMany', 'POST', data);
      if (result.status === 401) {
        const functionArgs = Array.from(arguments).slice(0, 2);
        const result = await this.AuthError("getmanyContact", functionArgs, data.credentialId)
        return result
      }
      return res.status(HttpStatus.OK).json({
        message: `bitrixcrm contact getMany executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in contact/getMany:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "deal" action "create".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - ModuleData: object (data to create)
   * - Calls the integration helper "performbitrixcrmAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId": "{{credentialId}}",
    "data": {
        "data": {
            "fields": {
                "TITLE": "NEW DEAL"
            }
        }
    }
}
   */


  @Post('deal/create')
  async createDeal(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performbitrixcrmAction('crm.deal.add', 'create', 'POST', data);
      if (result.status === 401) {
        const functionArgs = Array.from(arguments).slice(0, 2);
        const result = await this.AuthError("createDeal", functionArgs, data.credentialId)
        return result
      }
      return res.status(HttpStatus.OK).json({
        message: `bitrixcrm deal create executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in deal/create:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "deal" action "update".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - ModuleData: object (data to update)
   * - Calls the integration helper "performbitrixcrmAction".
   * DO NOT modify the method signature.
   *  Example usage:
   * {
    "credentialId": "{{credentialId}}",
    "data": {
        "data": {
            "ID": "3",
            "fields": {
                "TITLE": "Deals"
            }
        }
    }
}
   */


  @Post('deal/update')
  async updateDeal(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performbitrixcrmAction('crm.deal.update', 'update', 'POST', data);
      if (result.status === 401) {
        const functionArgs = Array.from(arguments).slice(0, 2);
        const result = await this.AuthError("updateDeal", functionArgs, data.credentialId)
        return result
      }
      return res.status(HttpStatus.OK).json({
        message: `bitrixcrm deal update executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in deal/update:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "deal" action "delete".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - RecordId: string (ID of the record to delete)
   * - Calls the integration helper "performbitrixcrmAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId": "{{credentialId}}",
    "data": {
        "data": {
            "ID": "1"
        }
    }
}
   */


  @Post('deal/delete')
  async deleteDeal(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performbitrixcrmAction('crm.deal.delete', 'delete', 'POST', data);
      if (result.status === 401) {
        const functionArgs = Array.from(arguments).slice(0, 2);
        const result = await this.AuthError("deleteDeal", functionArgs, data.credentialId)
        return result
      }
      return res.status(HttpStatus.OK).json({
        message: `bitrixcrm deal delete executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in deal/delete:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "deal" action "get".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - RecordId: string (ID of the record to fetch)
   * - Calls the integration helper "performbitrixcrmAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId": "{{credentialId}}",
    "data": {
        "data": {
            "ID": "3"
        }
    }
}
   */


  @Post('deal/get')
  async getDeal(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performbitrixcrmAction(`crm.deal.get`, 'get', 'POST', data);
      if (result.status === 401) {
        const functionArgs = Array.from(arguments).slice(0, 2);
        const result = await this.AuthError("getDeal", functionArgs, data.credentialId)
        return result
      }
      return res.status(HttpStatus.OK).json({
        message: `bitrixcrm deal get executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in deal/get:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "deal" action "getMany".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - Filters: object (optional filters for querying records)
   * - Calls the integration helper "performbitrixcrmAction".
   * DO NOT modify the method signature.
   *  Example usage:
   * {
    "credentialId":"{{credentialId}}",
    "data":{}
}
   */


  @Post('deal/getMany')
  async getmanyDeal(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performbitrixcrmAction('crm.deal.list', 'getMany', 'GET', data);
      if (result.status === 401) {
        const functionArgs = Array.from(arguments).slice(0, 2);
        const result = await this.AuthError("getmanyDeal", functionArgs, data.credentialId)
        return result
      }
      return res.status(HttpStatus.OK).json({
        message: `bitrixcrm deal getMany executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in deal/getMany:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "lead" action "create".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - ModuleData: object (data to create)
   * - Calls the integration helper "performbitrixcrmAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId": "{{credentialId}}",
    "data": {
        "data": {
            "fields": {
                "TITLE": "New Leads"
            }
        }
    }
}
   */


  @Post('lead/create')
  async createLead(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performbitrixcrmAction('crm.lead.add', 'create', 'POST', data);
      if (result.status === 401) {
        const functionArgs = Array.from(arguments).slice(0, 2);
        const result = await this.AuthError("createLead", functionArgs, data.credentialId)
        return result
      }
      return res.status(HttpStatus.OK).json({
        message: `bitrixcrm lead create executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in lead/create:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "lead" action "update".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - ModuleData: object (data to update)
   * - Calls the integration helper "performbitrixcrmAction".
   * DO NOT modify the method signature.
   *  Example usage:
   * {
    "credentialId": "{{credentialId}}",
    "data": {
        "data": {
            "ID": "1",
            "fields": {
                "TITLE": "Update leads"
            }
        }
    }
}
   */


  @Post('lead/update')
  async updateLead(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performbitrixcrmAction('crm.lead.update', 'update', 'POST', data);
      if (result.status === 401) {
        const functionArgs = Array.from(arguments).slice(0, 2);
        const result = await this.AuthError("updateLead", functionArgs, data.credentialId)
        return result
      }
      return res.status(HttpStatus.OK).json({
        message: `bitrixcrm lead update executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in lead/update:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "lead" action "delete".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - RecordId: string (ID of the record to delete)
   * - Calls the integration helper "performbitrixcrmAction".
   * DO NOT modify the method signature.
   *  Example usage:
   * {
    "credentialId": "{{credentialId}}",
    "data": {
        "data": {
            "ID": "3"
        }
    }
}
   */


  @Post('lead/delete')
  async deleteLead(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performbitrixcrmAction('crm.lead.delete', 'delete', 'POST', data);
      if (result.status === 401) {
        const functionArgs = Array.from(arguments).slice(0, 2);
        const result = await this.AuthError("deleteLead", functionArgs, data.credentialId)
        return result
      }
      return res.status(HttpStatus.OK).json({
        message: `bitrixcrm lead delete executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in lead/delete:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "lead" action "get".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - RecordId: string (ID of the record to fetch)
   * - Calls the integration helper "performbitrixcrmAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId": "{{credentialId}}",
    "data": {
        "data": {
            "ID": "1"
        }
    }
}
   */


  @Post('lead/get')
  async getLead(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performbitrixcrmAction('crm.lead.get', 'get', 'POST', data);
      if (result.status === 401) {
        const functionArgs = Array.from(arguments).slice(0, 2);
        const result = await this.AuthError("getLead", functionArgs, data.credentialId)
        return result
      }
      return res.status(HttpStatus.OK).json({
        message: `bitrixcrm lead get executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in lead/get:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "lead" action "getMany".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - Filters: object (optional filters for querying records)
   * - Calls the integration helper "performbitrixcrmAction".
   * DO NOT modify the method signature.
   *  Example usage:
   * {
    "credentialId":"{{credentialId}}",
    "data":{}
}
   */


  @Post('lead/getMany')
  async getmanyLead(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performbitrixcrmAction('crm.lead.list', 'getMany', 'POST', data);
      if (result.status === 401) {
        const functionArgs = Array.from(arguments).slice(0, 2);
        const result = await this.AuthError("getmanyLead", functionArgs, data.credentialId)
        return result
      }
      return res.status(HttpStatus.OK).json({
        message: `bitrixcrm lead getMany executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in lead/getMany:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
 * [AUTO-GENERATED] Endpoint for module "spa" action "create".
 *  - Request Parameters (data): 
 * - CredentialId: string
 * - RecordId: string (ID of the record to fetch)
 * - Calls the integration helper "performbitrixcrmAction".
 * DO NOT modify the method signature.
 *  Example usage:
 * {
    "credentialId": "{{credentialId}}",
    "data": {
        "data": {
            "fields": {
                "title": "Harish"
            }
        }
    }
}
 */

  @Post('spa/create')
  async createSpa(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performbitrixcrmAction('crm.type.add', 'create', 'POST', data);
      if (result.status === 401) {
        const functionArgs = Array.from(arguments).slice(0, 2);
        const result = await this.AuthError("createSpa", functionArgs, data.credentialId)
        return result
      }
      return res.status(HttpStatus.OK).json({
        message: `bitrixcrm spa create executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in spa/create:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "spa" action "get".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - RecordId: string (ID of the record to fetch)
   * - Calls the integration helper "performbitrixcrmAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId": "{{credentialId}}",
    "data": {
        "data": {
            "id": 7
        }
    }
}
   */


  @Post('spa/get')
  async getSpa(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performbitrixcrmAction('crm.type.get', 'get', 'POST', data);
      if (result.status === 401) {
        const functionArgs = Array.from(arguments).slice(0, 2);
        const result = await this.AuthError("getSpa", functionArgs, data.credentialId)
        return result
      }
      return res.status(HttpStatus.OK).json({
        message: `bitrixcrm spa get executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in spa/get:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "spa" action "update".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - RecordId: string (ID of the record to fetch)
   * - Calls the integration helper "performbitrixcrmAction".
   * DO NOT modify the method signature.
   *  Example usage:
   * {
    "credentialId": "{{credentialId}}",
    "data": {
        "data": {
            "id": 7,
            "fields": {
                "title": "New Spa"
            }
        }
    }
}
   */


  @Post('spa/update')
  async updateSpa(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performbitrixcrmAction('crm.type.update', 'update', 'POST', data);
      if (result.status === 401) {
        const functionArgs = Array.from(arguments).slice(0, 2);
        const result = await this.AuthError("updateSpa", functionArgs, data.credentialId)
        return result
      }
      return res.status(HttpStatus.OK).json({
        message: `bitrixcrm spa update executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in spa/get:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "spa" action "delete".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - RecordId: string (ID of the record to fetch)
   * - Calls the integration helper "performbitrixcrmAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId": "{{credentialId}}",
    "data": {
        "data": {
            "id": 5
        }
    }
}
   */


  @Post('spa/delete')
  async deleteSpa(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performbitrixcrmAction('crm.type.delete', 'delete', 'POST', data);
      if (result.status === 401) {
        const functionArgs = Array.from(arguments).slice(0, 2);
        const result = await this.AuthError("deleteSpa", functionArgs, data.credentialId)
        return result
      }
      return res.status(HttpStatus.OK).json({
        message: `bitrixcrm spa get executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in spa/get:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "spa" action "getMany".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - RecordId: string (ID of the record to fetch)
   * - Calls the integration helper "performbitrixcrmAction".
   * DO NOT modify the method signature.
   *  Example usage:
   * {
    "credentialId": "{{credentialId}}",
    "data": {}
}
   */


  @Post('spa/getMany')
  async getManySpa(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performbitrixcrmAction('crm.type.list', 'getMany', 'POST', data);
      if (result.status === 401) {
        const functionArgs = Array.from(arguments).slice(0, 2);
        const result = await this.AuthError("getManySpa", functionArgs, data.credentialId)
        return result
      }
      return res.status(HttpStatus.OK).json({
        message: `bitrixcrm spa get executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in spa/get:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }





  //  GetMany

  async getAllContact(@Body() data: any) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performbitrixcrmAction('crm.contact.list', 'getMany', 'POST', data);
      if (result.status === 401) {
        const functionArgs = Array.from(arguments).slice(0, 2);
        const result = await this.AuthError("getAllContact", functionArgs, data.credentialId)
        return result
      }
      return { response: result.response.result.map(data => ({ value: data.ID, name: data.NAME })) }


    } catch (error) {
      this.logger.error(`Error in contact/getMany:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getAllCompany(@Body() data: any) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performbitrixcrmAction('crm.company.list', 'getMany', 'POST', data);
      if (result.status === 401) {
        const functionArgs = Array.from(arguments).slice(0, 2);
        const result = await this.AuthError("getAllCompany", functionArgs, data.credentialId)
        return result
      }
      return { response: result.response.result.map(data => ({ value: data.ID, name: data.TITLE })) }

    } catch (error) {
      this.logger.error(`Error in company/getMany:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getAllDeal(@Body() data: any) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performbitrixcrmAction('crm.deal.list', 'getMany', 'GET', data);
      if (result.status === 401) {
        const functionArgs = Array.from(arguments).slice(0, 2);
        const result = await this.AuthError("getAllDeal", functionArgs, data.credentialId)
        return result
      }
      return { response: result.response.result.map(data => ({ value: data.ID, name: data.TITLE })) }

    } catch (error) {
      this.logger.error(`Error in deal/getMany:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getAllSpa(@Body() data: any) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performbitrixcrmAction('crm.type.list', 'getMany', 'POST', data);
      if (result.status === 401) {
        const functionArgs = Array.from(arguments).slice(0, 2);
        const result = await this.AuthError("getAllSpa", functionArgs, data.credentialId)
        return result
      }
      return { response: result.response.result.types.map(data => ({ value: data.id, name: data.title })) }

    } catch (error) {
      this.logger.error(`Error in spa/get:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getAllLead(@Body() data: any) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performbitrixcrmAction('crm.lead.list', 'getMany', 'POST', data);
      if (result.status === 401) {
        const functionArgs = Array.from(arguments).slice(0, 2);
        const result = await this.AuthError("getAllLead", functionArgs, data.credentialId)
        return result
      }
      return { response: result.response.result.map(data => ({ value: data.ID, name: data.TITLE })) }

    } catch (error) {
      this.logger.error(`Error in lead/getMany:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }





  private async generateFields(category: string, name: string) {
    if (!fields || !Array.isArray(fields)) {
      throw new Error("Fields array is not defined or is not an array.");
    }
    const filteredFields = fields.filter(
      (field) =>
        field.displayOptions &&
        field.displayOptions.show &&
        field.displayOptions.show.category &&
        field.displayOptions.show.category.includes(category) &&
        (field.displayOptions.show.name
          ? field.displayOptions.show.name.includes(name)
          : true)
    );
    return filteredFields;
  }
  @Post('getfields')
  async getfields(@Body() body: { category: string; name: string; credentialId: any }) {
    const { category, name, credentialId } = body;
    try {
      await this.initializeFields(credentialId);
      const relevantFields = await this.generateFields(category, name);
      return relevantFields;
    } catch (error) {
      return [];
    }
  }



  async initializeFields(data) {
    for (const field of fields) {
      if (typeof field.init === 'function') {
        const datas = { credentialId: data, data: {} }
        await field.init(datas);
      }
    }
  }


  public async initialize(credentialId) {
    try {
      const connection = await initializeDB();
      const credRepository = connection.getRepository(Credentials);
      const credentialsRepository: any = await credRepository.findOne({ where: { id: credentialId } });



      const access_token = credentialsRepository.authData.token.access_token;
      return access_token;

    } catch (error) {
      this.logger.error('Error initializing twitter :', error + error.stack);
    }
  }


  /**
   * [AUTO-GENERATED] Helper method to perform a bitrixcrm action.
   * This method is a stub—extend it to integrate with the actual API for your xapp.
   *
   * Validations:
   * - Ensure that the provided module and action are supported.
   * - Validate the "data" structure as needed.
   *
   * DO NOT change the method signature.
   */
  private async performbitrixcrmAction(module: string, action: string, method: string, data: any): Promise<any> {
    // TODO: Implement the actual integration logic.
    // For example:
    // 1. Initialize your API client using a refresh token or saved credentials.
    // 2. Validate that 'data' contains required fields (CredentialId, ModuleId, ModuleData).
    // 3. Use the correct HTTP method based on the action (GET, POST, PATCH, DELETE, etc.).
    // 4. Handle errors and return the API response.
    // 5. If the access token is expired, call the refreshToken endpoint.

    const resultData = await this.curl(module, action, method, data);

    return resultData

  }
  public async curl(module: string, action: string, method: string, argumentdata: any) {
    try {
      const { credentialId, data } = argumentdata;
      const initializeData = await this.initialize(credentialId);

      const baseUrl = `https://b24-l21hl0.bitrix24.in/rest`

      const access_token = initializeData;
      let url = `${baseUrl}/${module}`;


      if (data.Id) {
        url += `/${data.Id}`;
      }
      const options: any = {
        method,
        url,
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          Authorization: `Bearer ${access_token}`
        }
      }
      if (action === "getMany") {
        if (argumentdata) options.params = data.data
      } else {
        if (argumentdata) options.data = data.data

      }
      const response = await axios(options);
      return { response: response.data, status: response.status }
    } catch (error) {
      return { response: [error.response?.data || error.message], status: error.status || 500 };
    }
  }

}
export const bitrix = new bitrixcrmController();