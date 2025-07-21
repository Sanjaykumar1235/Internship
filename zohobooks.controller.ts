// zohobooks.controller.ts
// -----------------------------------------------------------------------------
// AUTO-GENERATED CONTROLLER FILE.
// DO NOT modify the auto-generated endpoints below.
// For custom integration logic, extend the helper "performZohoBooksAction".
//
// Copyright (c) 2025 Smackcoders. All rights reserved.
// This file is subject to the Smackcoders Proprietary License.
// Unauthorized copying or distribution is strictly prohibited.
// -----------------------------------------------------------------------------

import {
  Controller,
  Post,
  Get,
  
  Delete,
  Param,
  Body,
  Req,
  Res,
  HttpStatus,
  HttpException,
  Query,
} from '@nestjs/common';
import { Request, Response } from 'express';
import axios  from 'axios';
import * as qs from 'qs';
import { randomBytes } from 'crypto';
import { initializeDB } from 'src/ormconfig';
import { Credentials } from 'src/entities/Credentials';
import { CustomLogger } from 'src/logger/custom.logger';
import config, { XappName, fields, modules as xappModules } from './zohobooks.config';
import { CredentialController } from 'src/credential/credential.controller';
import { InjectRepository } from '@nestjs/typeorm';
import { CommandStartedEvent, Repository } from 'typeorm';
import { zohocliqController } from '../Zoho cliq/zoho.controller';

@Controller('zohobooks')
export class ZohoBooksController {
  private logger = new CustomLogger();
  private CredentialController = new CredentialController();



  /**
   * [AUTO-GENERATED] OAuth authorize endpoint.
   * This endpoint initiates the authentication flow.
   * Implement the actual token request and error handling as needed.
   */

  @Post('authorize')
  async authorize(@Body() reqBody: any, @Res() res: Response) {
      if (!reqBody.clientId || !reqBody.redirectUri || !reqBody.clientSecret || !reqBody.name || !reqBody.type ||!reqBody.organizationsId) {
          throw new HttpException('Missing OAuth parameters', HttpStatus.BAD_REQUEST);
      }
      try {
          const { clientId, redirectUri, clientSecret, name, type,organizationsId, id } = reqBody;
          


          const state = randomBytes(16).toString('hex')


          // Construct the OAuth URL.
          // NOTE: Update the URL if your xapp uses a different authentication endpoint.
          const scope = 'ZohoBooks.projects.READ%2CZohoBooks.projects.UPDATE%2CZohoBooks.projects.DELETE%2CZohoBooks.projects.CREATE%2CZohoBooks.settings.DELETE%2CZohoBooks.purchaseorders.CREATE%2CZohoBooks.bills.CREATE%2CZohoBooks.accountants.UPDATE%2CZohoBooks.accountants.DELETE%2CZohoBooks.expenses.UPDATE%2CZohoBooks.contacts.CREATE%2CZohoBooks.accountants.CREATE%2CZohoBooks.settings.READ%2CZohoBooks.accountants.READ%2CZohoBooks.contacts.UPDATE%2CZohoBooks.contacts.READ%2CZohoBooks.contacts.DELETE%2CZohoBooks.estimates.CREATE%2CZohoBooks.estimates.UPDATE%2CZohoBooks.estimates.READ%2CZohoBooks.estimates.DELETE%2CZohoBooks.invoices.CREATE%2CZohoBooks.invoices.UPDATE%2CZohoBooks.invoices.READ%2CZohoBooks.invoices.DELETE%2CZohoBooks.expenses.CREATE%2CZohoBooks.expenses.UPDATE%2CZohoBooks.expenses.READ%2CZohoBooks.expenses.DELETE%2CZohoBooks.salesorders.CREATE%2CZohoBooks.salesorders.UPDATE%2CZohoBooks.salesorders.READ%2CZohoBooks.salesorders.DELETE%2CZohoBooks.purchaseorders.CREATE%2CZohoBooks.purchaseorders.UPDATE%2CZohoBooks.purchaseorders.READ%2CZohoBooks.purchaseorders.DELETE%2CZohoBooks.bills.CREATE%2CZohoBooks.bills.UPDATE%2CZohoBooks.bills.READ%2CZohoBooks.bills.DELETE%2CZohoBooks.settings.READ%2CZohoBooks.settings.CREATE%2CZohoBooks.settings.UPDATE%2CZohoBooks.banking.CREATE';
          const authUrl = `https://accounts.zoho.in/oauth/v2/auth?scope=${scope}&client_id=${clientId}&response_type=code&access_type=offline&redirect_uri=${redirectUri}&state=${state}`;

          const data = {
              clientId: clientId,
              clientSecret: clientSecret,
              organizationsId: organizationsId,
              redirectUri: redirectUri,
              state: state,
              name: name
          }
 
          const credentialRequest = {
              name: name,
              data: data,
              type: type
          }
          if (reqBody.id) {
              await this.CredentialController.updateCredentials(reqBody.id, data)

              this.logger.debug('Credentials with id updated successfully ', reqBody.id)


              return res.status(HttpStatus.OK).send(authUrl);
          } else {
              await this.CredentialController.createCredentials(credentialRequest, res);
             
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
       
          const code = req.query.code as string;
          const state = req.query.state as string;
      
          const connection = await initializeDB();
          const credentialRepository = connection.getRepository(Credentials);
          const credential = await credentialRepository
              .createQueryBuilder('credential')
              .where("credential.auth_data->>'state'=:state", { state })
              .getOne();
         

          if (!credential) {
              return res.status(400).json({ message: 'Invalid state:No Credentials found' })
          }

          const { clientId, clientSecret, redirectUri } = credential.authData
          const requestBody = qs.stringify({
              grant_type: 'authorization_code',
              client_id: clientId,
              client_secret: clientSecret,
              redirect_uri: redirectUri,
              code: code
          })

          
          const result = await axios.post('https://accounts.zoho.in/oauth/v2/token', requestBody, {
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
              }
          });


          
          // const data={result.data,}

          credential.authData['token'] = result.data


          await this.CredentialController.updateCredentials(credential.id, credential.authData)
          return res.send(result.data)


          // TODO: Implement token exchange using the provided code.
          // NOTE: Save the access token and handle refresh token logic.
      } catch (error) {
          this.logger.error('Error in callback:', error);
          throw new HttpException('Callback error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
  }
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

      const tokenResponse = await axios.post(`https://accounts.zoho.in/oauth/v2/token`, tokenRequestData.toString(), {
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
   * [AUTO-GENERATED] Endpoint for module "customers" action "create".
   *  - Request Parameters (data): 
   * - credentialId: string
   * - data: object (data to create)
   * - Calls the integration helper "performZohoBooksAction".
   * DO NOT modify the method signature.
   *  Example usage:
   * {
    "credentialId":"{{credentialId}}",
   "data":{
    "data":{
       "contact_name": "New Customer 900",
        "contact_type": "customer",
           "customer_sub_type": "business"

    }
   }
}
   */
  

  @Post('customers/create')
  async createCustomers(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performZohoBooksAction('contacts', 'create','POST', data);
      
      return res.status(HttpStatus.OK).json({
        message: `ZohoBooks customers update executed successfully`,
        result,
      });
     
    } catch (error) {
      this.logger.error(`Error in customers/create:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "customers" action "update".
   *  - Request Parameters (data): 
   * - credentialId: string
   * - data: object (data to update)
   * - Calls the integration helper "performZohoBooksAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId":"{{credentialId}}",
   "data":{
    "Id":"2572085000000035001",
    "data":{
         "contact_name": "Update Customer"
   
    }
   }
}
   */
  

  @Post('customers/update')
  async updateCustomers(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performZohoBooksAction('contacts', 'update','PUT', data);
      return res.status(HttpStatus.OK).json({
        message: `ZohoBooks customers update executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in customers/update:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "customers" action "get".
   *  - Request Parameters (data): 
   * - credentialId: string
   * - data: string (ID of the record to fetch)
   * - Calls the integration helper "performZohoBooksAction".
   * DO NOT modify the method signature.
   *  Example usage:
   * {
    "credentialId":"{{credentialId}}",
   "data":{
   "Id":"2572085000000035001"
   }
}
   */
  

  @Post('customers/get')
  async getCustomers(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performZohoBooksAction('contacts', 'get','GET', data);
      return res.status(HttpStatus.OK).json({
        message: `ZohoBooks customers get executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in customers/get:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "customers" action "getMany".
   *  - Request Parameters (data): 
   * - credentialId: string
   * - Filters: object (optional filters for querying records)
   * - Calls the integration helper "performZohoBooksAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId":"{{credentialId}}",
   "data":{
  
   }
}
   */
  

  @Post('customers/getMany')
  async getmanyCustomers(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performZohoBooksAction('contacts', 'getMany','GET', data);
      return res.status(HttpStatus.OK).json({
        message: `ZohoBooks customers getMany executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in customers/getMany:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "customers" action "delete".
   *  - Request Parameters (data): 
   * - credentialId: string
   * - data: string (ID of the record to delete)
   * - Calls the integration helper "performZohoBooksAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId":"{{credentialId}}",
   "data":{
    "Id":"2572085000000035001"
   }
}
   */
  

  @Post('customers/delete')
  async deleteCustomers(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performZohoBooksAction('contacts', 'delete','DELETE', data);
      return res.status(HttpStatus.OK).json({
        message: `ZohoBooks customers delete executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in customers/delete:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "items" action "create".
   *  - Request Parameters (data): 
   * - credentialId: string
   * - data: object (data to create)
   * - Calls the integration helper "performZohoBooksAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId":"{{credentialId}}",
   "data":{
    "data":{
        "name": "New Items 7",
    "rate": 120,
    "description": "500GB"
    }
   }
}
   */
  

  @Post('items/create')
  async createItems(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performZohoBooksAction('items', 'create','POST', data);
      return res.status(HttpStatus.OK).json({
        message: `ZohoBooks items create executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in items/create:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "items" action "get".
   *  - Request Parameters (data): 
   * - credentialId: string
   * - data: string (ID of the record to fetch)
   * - Calls the integration helper "performZohoBooksAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId":"{{credentialId}}",
   "data":{
   "Id":"2572085000000044001"
   }
}
   */
  

  @Post('items/get')
  async getItems(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performZohoBooksAction('items', 'get','GET', data);
      return res.status(HttpStatus.OK).json({
        message: `ZohoBooks items get executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in items/get:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "items" action "getMany".
   *  - Request Parameters (data): 
   * - credentialId: string
   * - Filters: object (optional filters for querying records)
   * - Calls the integration helper "performZohoBooksAction".
   * DO NOT modify the method signature.
   *  Example usage:
   * {
    "credentialId":"{{credentialId}}",
   "data":{
   }
}
   */
  

  @Post('items/getMany')
  async getmanyItems(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performZohoBooksAction('items', 'getMany','GET', data);
      return res.status(HttpStatus.OK).json({
        message: `ZohoBooks items getMany executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in items/getMany:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "items" action "update".
   *  - Request Parameters (data): 
   * - credentialId: string
   * - data: object (data to update)
   * - Calls the integration helper "performZohoBooksAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId":"{{credentialId}}",
   "data":{
   "Id":"2572085000000044001",
   "data":{
       "name": "New Items 7",
    "rate": 150
   }
}
}
   */
  

  @Post('items/update')
  async updateItems(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performZohoBooksAction('items', 'update', 'PUT',data);
      return res.status(HttpStatus.OK).json({
        message: `ZohoBooks items update executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in items/update:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "items" action "delete".
   *  - Request Parameters (data): 
   * - credentialId: string
   * - data: string (ID of the record to delete)
   * - Calls the integration helper "performZohoBooksAction".
   * DO NOT modify the method signature.
   *  Example usage:
   * {
    "credentialId":"{{credentialId}}",
   "data":{
   "Id":"2572085000000044001" 
}
}
   */
  

  @Post('items/delete')
  async deleteItems(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performZohoBooksAction('items', 'delete', 'DELETE',data);
      return res.status(HttpStatus.OK).json({
        message: `ZohoBooks items delete executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in items/delete:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "invoices" action "create".
   *  - Request Parameters (data): 
   * - credentialId: string
   * - data: object (data to create)
   * - Calls the integration helper "performZohoBooksAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId":"{{credentialId}}",
   "data":{
    "data":{
        "customer_id": "2572085000000040001",
            "line_items": [
        {
            "item_id":"2572085000000033002" ,
            "name": "Hard Drive 6"    
   }
            ]       
}
}
}
  */
  

  @Post('invoices/create')
  async createInvoices(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performZohoBooksAction('invoices', 'create', 'POST',data);
      return res.status(HttpStatus.OK).json({
        message: `ZohoBooks invoices create executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in invoices/create:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "invoices" action "get".
   *  - Request Parameters (data): 
   * - credentialId: string
   * - data: string (ID of the record to fetch)
   * - Calls the integration helper "performZohoBooksAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId":"{{credentialId}}",
   "data":{
    "Id":"2572085000000036009"
   
}
}

   */
  

  @Post('invoices/get')
  async getInvoices(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performZohoBooksAction('invoices', 'get','GET', data);
      return res.status(HttpStatus.OK).json({
        message: `ZohoBooks invoices get executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in invoices/get:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "invoices" action "getMany".
   *  - Request Parameters (data): 
   * - credentialId: string
   * - Filters: object (optional filters for querying records)
   * - Calls the integration helper "performZohoBooksAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId":"{{credentialId}}",
   "data":{
 
   
}
}

   */
  

  @Post('invoices/getMany')
  async getmanyInvoices(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performZohoBooksAction('invoices', 'getMany','GET', data);
      return res.status(HttpStatus.OK).json({
        message: `ZohoBooks invoices getMany executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in invoices/getMany:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "invoices" action "update".
   *  - Request Parameters (data): 
   * - credentialId: string
   * - data: object (data to update)
   * - Calls the integration helper "performZohoBooksAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId":"{{credentialId}}",
   "data":{
    "Id":"2572085000000044025",
    "data":{
        "customer_id":"2572085000000040001",
         "line_items": [
        {
            "item_id":"2572085000000033002" ,
            "name": "Soft"    
   }
            ]  

    }
   
}
}

   */
  

  @Post('invoices/update')
  async updateInvoices(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performZohoBooksAction('invoices', 'update', 'PUT',data);
      return res.status(HttpStatus.OK).json({
        message: `ZohoBooks invoices update executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in invoices/update:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "invoices" action "delete".
   *  - Request Parameters (data): 
   * - credentialId: string
   * - data: string (ID of the record to delete)
   * - Calls the integration helper "performZohoBooksAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId":"{{credentialId}}",
   "data":{
    "Id":"2572085000000036009"
 
   
}
}

   */
  

  @Post('invoices/delete')
  async deleteInvoices(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performZohoBooksAction('invoices', 'delete', 'DELETE',data);
      return res.status(HttpStatus.OK).json({
        message: `ZohoBooks invoices delete executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in invoices/delete:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "salesorders" action "create".
   *  - Request Parameters (data): 
   * - credentialId: string
   * - data: object (data to create)
   * - Calls the integration helper "performZohoBooksAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId": "{{credentialId}}",
    "data": {
        "data": {
            "customer_id": "2572085000000041001",
            "line_items": [
                {
                    "item_order": 0,
                    "item_id": "2572085000000042001",
                    "rate": 120,
                    "name": "New Sales"
                }
            ]
        }
    }
}
   */
  

  @Post('salesorders/create')
  async createSalesorders(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performZohoBooksAction('salesorders', 'create','POST', data);
      return res.status(HttpStatus.OK).json({
        message: `ZohoBooks salesorders create executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in salesorders/create:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "salesorders" action "get".
   *  - Request Parameters (data): 
   * - credentialId: string
   * - data: string (ID of the record to fetch)
   * - Calls the integration helper "performZohoBooksAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId":"{{credentialId}}",
   "data":{
   "Id":"2572085000000068007"     
}
}

   */
  

  @Post('salesorders/get')
  async getSalesorders(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performZohoBooksAction('salesorders', 'get','GET', data);
      return res.status(HttpStatus.OK).json({
        message: `ZohoBooks salesorders get executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in salesorders/get:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "salesorders" action "getMany".
   *  - Request Parameters (data): 
   * - credentialId: string
   * - Filters: object (optional filters for querying records)
   * - Calls the integration helper "performZohoBooksAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId":"{{credentialId}}",
   "data":{
   
   }
}

   */
  

  @Post('salesorders/getMany')
  async getmanySalesorders(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performZohoBooksAction('salesorders', 'getMany','GET', data);
      return res.status(HttpStatus.OK).json({
        message: `ZohoBooks salesorders getMany executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in salesorders/getMany:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "salesorders" action "update".
   *  - Request Parameters (data): 
   * - credentialId: string
   * - data: object (data to update)
   * - Calls the integration helper "performZohoBooksAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId":"{{credentialId}}",
   "data":{
   "Id":"2572085000000038015",
   "data":{
     "line_items": [
        {
            "item_order": 0,
            "item_id": "2572085000000042001",
            "quantity":60
   }
     ]

}
   }
}

   */
  

  @Post('salesorders/update')
  async updateSalesorders(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performZohoBooksAction('salesorders', 'update','PUT', data);
      return res.status(HttpStatus.OK).json({
        message: `ZohoBooks salesorders update executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in salesorders/update:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "salesorders" action "delete".
   *  - Request Parameters (data): 
   * - credentialId: string
   * - data: string (ID of the record to delete)
   * - Calls the integration helper "performZohoBooksAction".
   * DO NOT modify the method signature.
   *  Example usage:
   * {
    "credentialId": "{{credentialId}}",
    "data":{
        "Id":"2572085000000048001"
    }
  
}
   */
  

  @Post('salesorders/delete')
  async deleteSalesorders(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performZohoBooksAction('salesorders', 'delete','DELETE', data);
      return res.status(HttpStatus.OK).json({
        message: `ZohoBooks salesorders delete executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in salesorders/delete:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

 

    /**
   * [AUTO-GENERATED] Endpoint for module "accounts" action "create".
   *  - Request Parameters (data): 
   * - credentialId: string
   * - data: object (data to create)
   * - Calls the integration helper "performZohoBooksAction".
   * DO NOT modify the method signature.
   *  Example usage:
   * {
    "credentialId": "{{credentialId}}",
    "data": {
        "data": {
            "account_name": "Expense account 6",
            "account_type": "long_term_liability"
        }
    }
}
   */
  

@Post('chartofaccounts/create')
async createChartOfAcounts(@Body() data: any, @Res() res: Response) {
  if (!data) {
    throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
  }
  try {
    const result = await this.performZohoBooksAction('chartofaccounts', 'create','POST', data);
    return res.status(HttpStatus.OK).json({
      message: `ZohoBooks expenses create executed successfully`,
      result,
    });
  } catch (error) {
    this.logger.error(`Error in expenses/create:`, error);
    throw new HttpException(
      error.message || 'Internal server error',
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}

    /**
   * [AUTO-GENERATED] Endpoint for module "accounts" action "get".
   *  - Request Parameters (data): 
   * - credentialId: string
   * - data: object (data to create)
   * - Calls the integration helper "performZohoBooksAction".
   * DO NOT modify the method signature.
   *  Example usage:
   * {
    "credentialId":"{{credentialId}}",
   "data":{
    "Id":"2572085000000031385"
   
}
}
   */
  

@Post('chartofaccounts/get')
async getChartOfAcounts(@Body() data: any, @Res() res: Response) {
  if (!data) {
    throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
  }
  try {
    const result = await this.performZohoBooksAction('chartofaccounts', 'get','GET', data);
    return res.status(HttpStatus.OK).json({
      message: `ZohoBooks expenses create executed successfully`,
      result,
    });
  } catch (error) {
    this.logger.error(`Error in expenses/create:`, error);
    throw new HttpException(
      error.message || 'Internal server error',
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}

    /**
   * [AUTO-GENERATED] Endpoint for module "accounts" action "update".
   *  - Request Parameters (data): 
   * - credentialId: string
   * - data: object (data to create)
   * - Calls the integration helper "performZohoBooksAction".
   * DO NOT modify the method signature.
   *  Example usage:
   * {
    "credentialId":"{{credentialId}}",
   "data":{
    "Id":"2572085000000031385",
    "data":{
        "account_name": "Update Expense account"

    }
   
}
} */
  

@Post('chartofaccounts/update')
async updateChartOfAcounts(@Body() data: any, @Res() res: Response) {
  if (!data) {
    throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
  }
  try {
    const result = await this.performZohoBooksAction('chartofaccounts', 'update','PUT', data);
    return res.status(HttpStatus.OK).json({
      message: `ZohoBooks expenses create executed successfully`,
      result,
    });
  } catch (error) {
    this.logger.error(`Error in expenses/create:`, error);
    throw new HttpException(
      error.message || 'Internal server error',
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}

    /**
   * [AUTO-GENERATED] Endpoint for module "accounts" action "delete".
   *  - Request Parameters (data): 
   * - credentialId: string
   * - data: object (data to create)
   * - Calls the integration helper "performZohoBooksAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId":"{{credentialId}}",
    "data":{
        "Id":"2572085000000049030"
       
    }
}   
   */
  

@Post('chartofaccounts/delete')
async deleteChartOfAcounts(@Body() data: any, @Res() res: Response) {
  if (!data) {
    throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
  }
  try {
    const result = await this.performZohoBooksAction('chartofaccounts', 'delete','delete', data);
    return res.status(HttpStatus.OK).json({
      message: `ZohoBooks expenses create executed successfully`,
      result,
    });
  } catch (error) {
    this.logger.error(`Error in expenses/create:`, error);
    throw new HttpException(
      error.message || 'Internal server error',
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}

    /**
   * [AUTO-GENERATED] Endpoint for module "accounts" action "getMany".
   *  - Request Parameters (data): 
   * - credentialId: string
   * - data: object (data to create)
   * - Calls the integration helper "performZohoBooksAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId":"{{credentialId}}",
    "data":{
  
       
    }
}   
   */
  

@Post('chartofaccounts/getMany')
async getManyChartAccounts(@Body() data: any, @Res() res: Response) {
  if (!data) {
    throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
  }
  try {
    const result = await this.performZohoBooksAction('chartofaccounts', 'getMany','get', data);
    return res.status(HttpStatus.OK).json({
      message: `ZohoBooks expenses create executed successfully`,
      result,
    });
  } catch (error) {
    this.logger.error(`Error in expenses/create:`, error);
    throw new HttpException(
      error.message || 'Internal server error',
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}

  /**
   * [AUTO-GENERATED] Endpoint for module "expenses" action "create".
   *  - Request Parameters (data): 
   * - credentialId: string
   * - data: object (data to create)
   * - Calls the integration helper "performZohoBooksAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId": "{{credentialId}}",
    "data": {
        "data": {
            "account_id": "2572085000000031385",
            "date": "2025-05-24",
            "amount": 112.5,
            "line_items": [
                {
                    "account_id": "2572085000000031385",
                    "amount": 112.5,
                    "name": "New one"
                }
            ]
        }
    }
}  */
  

  @Post('expenses/create')
  async createExpenses(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performZohoBooksAction('expenses', 'create','POST', data);
      return res.status(HttpStatus.OK).json({
        message: `ZohoBooks expenses create executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in expenses/create:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "expenses" action "get".
   *  - Request Parameters (data): 
   * - credentialId: string
   * - data: string (ID of the record to fetch)
   * - Calls the integration helper "performZohoBooksAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId":"{{credentialId}}",
   "data":{
    "Id":"2572085000000058001"
   
}
}
   */
  

  @Post('expenses/get')
  async getExpenses(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performZohoBooksAction('expenses', 'get','GET', data);
      return res.status(HttpStatus.OK).json({
        message: `ZohoBooks expenses get executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in expenses/get:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "expenses" action "getMany".
   *  - Request Parameters (data): 
   * - credentialId: string
   * - Filters: object (optional filters for querying records)
   * - Calls the integration helper "performZohoBooksAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId":"{{credentialId}}",
   "data":{}
}
   */
  

  @Post('expenses/getMany')
  async getmanyExpenses(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performZohoBooksAction('expenses', 'getMany','GET', data);
      return res.status(HttpStatus.OK).json({
        message: `ZohoBooks expenses getMany executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in expenses/getMany:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "expenses" action "update".
   *  - Request Parameters (data): 
   * - credentialId: string
   * - data: object (data to update)
   * - Calls the integration helper "performZohoBooksAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId": "{{credentialId}}",
    "data": {
        "Id": "2572085000000037015",
        "data": {
            "account_id": "2572085000000031385",
            "date": "2025-05-22",
            "amount": 119.5,
            "description": "Marketing expense",
            "line_items": [
                {
                    "account_id": "2572085000000031385",
                    "description": "Marketing",
                    "amount": 119.5
                }
            ],
            "is_billable": false
        }
    }
}
   */
  

  @Post('expenses/update')
  async updateExpenses(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performZohoBooksAction('expenses', 'update','PUT', data);
      return res.status(HttpStatus.OK).json({
        message: `ZohoBooks expenses update executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in expenses/update:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "expenses" action "delete".
   *  - Request Parameters (data): 
   * - credentialId: string
   * - data: string (ID of the record to delete)
   * - Calls the integration helper "performZohoBooksAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId":"{{credentialId}}",
   "data":{
    "Id":"2572085000000037015"
  
}
}
   */
  

  @Post('expenses/delete')
  async deleteExpenses(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performZohoBooksAction('expenses', 'delete','DELETE', data);
      return res.status(HttpStatus.OK).json({
        message: `ZohoBooks expenses delete executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in expenses/delete:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }


 
 /**
   * [AUTO-GENERATED] Endpoint for module "bills" action "update".
   *  - Request Parameters (data): 
   * - credentialId: string
   * - data: object (data to update)
   * - Calls the integration helper "performZohoBooksAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId": "{{credentialId}}",
    "data": {
        "data": {
            "name": "Roshan",
            "email": "roshan122@gmail.com",
            "role_id": "2572085000000056021"
        }
    }
}
   */
  

@Post('users/create')
async createUsers(@Body() data: any, @Res() res: Response) {
  if (!data) {
    throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
  }
  try {
    const result = await this.performZohoBooksAction('users', 'create','POST', data);
    return res.status(HttpStatus.OK).json({
      message: `ZohoBooks bills update executed successfully`,
      result,
    });
  } catch (error) {
    this.logger.error(`Error in bills/update:`, error);
    throw new HttpException(
      error.message || 'Internal server error',
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}
 /**
   * [AUTO-GENERATED] Endpoint for module "bills" action "update".
   *  - Request Parameters (data): 
   * - credentialId: string
   * - data: object (data to update)
   * - Calls the integration helper "performZohoBooksAction".
   * DO NOT modify the method signature.
   *  Example usage:
   * {
    "credentialId":"{{credentialId}}",
   "data":{
  "Id":"2572085000000057021"
}
}

   */
  

@Post('users/get')
async getUsers(@Body() data: any, @Res() res: Response) {
  if (!data) {
    throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
  }
  try {
    const result = await this.performZohoBooksAction('users', 'get','GET', data);
    return res.status(HttpStatus.OK).json({
      message: `ZohoBooks bills update executed successfully`,
      result,
    });
  } catch (error) {
    this.logger.error(`Error in bills/update:`, error);
    throw new HttpException(
      error.message || 'Internal server error',
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}
 /**
   * [AUTO-GENERATED] Endpoint for module "bills" action "update".
   *  - Request Parameters (data): 
   * - credentialId: string
   * - data: object (data to update)
   * - Calls the integration helper "performZohoBooksAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId":"{{credentialId}}",
   "data":{
  "Id":"2572085000000057021",
  "data":{
    "name":"Anto"
  }
}
}

   */
  

@Post('users/update')
async updateUsers(@Body() data: any, @Res() res: Response) {
  if (!data) {
    throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
  }
  try {
    const result = await this.performZohoBooksAction('users', 'update','PUT', data);
    return res.status(HttpStatus.OK).json({
      message: `ZohoBooks bills update executed successfully`,
      result,
    });
  } catch (error) {
    this.logger.error(`Error in bills/update:`, error);
    throw new HttpException(
      error.message || 'Internal server error',
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}
 /**
   * [AUTO-GENERATED] Endpoint for module "bills" action "update".
   *  - Request Parameters (data): 
   * - credentialId: string
   * - data: object (data to update)
   * - Calls the integration helper "performZohoBooksAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId":"{{credentialId}}",
   "data":{
 
}
}

   */
  

@Post('users/getMany')
async getManyUsers(@Body() data: any, @Res() res: Response) {
  if (!data) {
    throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
  }
  try {
    const result = await this.performZohoBooksAction('users', 'getMany','GET', data);
    return res.status(HttpStatus.OK).json({
      message: `ZohoBooks bills update executed successfully`,
      result,
    });
  } catch (error) {
    this.logger.error(`Error in bills/update:`, error);
    throw new HttpException(
      error.message || 'Internal server error',
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}
 /**
   * [AUTO-GENERATED] Endpoint for module "bills" action "update".
   *  - Request Parameters (data): 
   * - credentialId: string
   * - data: object (data to update)
   * - Calls the integration helper "performZohoBooksAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId":"{{credentialId}}",
   "data":{
  "Id":"2572085000000057021"
}
}

   */
  

@Post('users/delete')
async deleteUsers(@Body() data: any, @Res() res: Response) {
  if (!data) {
    throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
  }
  try {
    const result = await this.performZohoBooksAction('users', 'delete','DELETE', data);
    return res.status(HttpStatus.OK).json({
      message: `ZohoBooks bills update executed successfully`,
      result,
    });
  } catch (error) {
    this.logger.error(`Error in bills/update:`, error);
    throw new HttpException(
      error.message || 'Internal server error',
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}
  
 /**
   * [AUTO-GENERATED] Endpoint for module "bills" action "update".
   *  - Request Parameters (data): 
   * - credentialId: string
   * - data: object (data to update)
   * - Calls the integration helper "performZohoBooksAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId": "{{credentialId}}",
    "data": {
        "Id": "2572085000000067003"
    }
}
   */
  

@Post('project/get')
async getProject(@Body() data: any, @Res() res: Response) {
  if (!data) {
    throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
  }
  try {
    const result = await this.performZohoBooksAction('projects', 'get','GET', data);
    return res.status(HttpStatus.OK).json({
      message: `ZohoBooks bills update executed successfully`,
      result,
    });
  } catch (error) {
    this.logger.error(`Error in bills/update:`, error);
    throw new HttpException(
      error.message || 'Internal server error',
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}
 /**
   * [AUTO-GENERATED] Endpoint for module "project" action "create".
   *  - Request Parameters (data): 
   * - credentialId: string
   * - data: object (data to update)
   * - Calls the integration helper "performZohoBooksAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId":"{{credentialId}}",
   "data":{
    "data":{
        "project_name":"New Project 5",
           "customer_id": "2572085000000040026",
            "billing_type": "based_on_task_hours"
       
}
}
}

   */
  

@Post('project/create')
async createProject(@Body() data: any, @Res() res: Response) {
  if (!data) {
    throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
  }
  try {
    const result = await this.performZohoBooksAction('projects', 'create','POST', data);
    return res.status(HttpStatus.OK).json({
      message: `ZohoBooks bills update executed successfully`,
      result,
    });
  } catch (error) {
    this.logger.error(`Error in bills/update:`, error);
    throw new HttpException(
      error.message || 'Internal server error',
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}
 /**
   * [AUTO-GENERATED] Endpoint for module "project" action "update".
   *  - Request Parameters (data): 
   * - credentialId: string
   * - data: object (data to update)
   * - Calls the integration helper "performZohoBooksAction".
   * DO NOT modify the method signature.
   *  Example usage:
   * {
    "credentialId": "{{credentialId}}",
    "data": {
        "Id": "2572085000000056305",
        "data": {
            "project_name": "Update The Project",
            "customer_id": "2572085000000040026",
            "billing_type": "based_on_task_hours"
        }
    }
}
   */
  

@Post('project/update')
async updateProject(@Body() data: any, @Res() res: Response) {
  if (!data) {
    throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
  }
  try {
    const result = await this.performZohoBooksAction('projects', 'update','PUT', data);
    return res.status(HttpStatus.OK).json({
      message: `ZohoBooks bills update executed successfully`,
      result,
    });
  } catch (error) {
    this.logger.error(`Error in bills/update:`, error);
    throw new HttpException(
      error.message || 'Internal server error',
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}
 /**
   * [AUTO-GENERATED] Endpoint for module "project" action "getMany".
   *  - Request Parameters (data): 
   * - credentialId: string
   * - data: object (data to update)
   * - Calls the integration helper "performZohoBooksAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId": "{{credentialId}}",
    "data": {
      
    }
}  */
  

@Post('project/getMany')
async getManyProject(@Body() data: any, @Res() res: Response) {
  if (!data) {
    throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
  }
  try {
    const result = await this.performZohoBooksAction('projects', 'getMany','GET', data);
    return res.status(HttpStatus.OK).json({
      message: `ZohoBooks bills update executed successfully`,
      result,
    });
  } catch (error) {
    this.logger.error(`Error in bills/update:`, error);
    throw new HttpException(
      error.message || 'Internal server error',
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}
 /**
   * [AUTO-GENERATED] Endpoint for module "project" action "delete".
   *  - Request Parameters (data): 
   * - credentialId: string
   * - data: object (data to update)
   * - Calls the integration helper "performZohoBooksAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId": "{{credentialId}}",
    "data": {
        "Id": "2572085000000067003"
    }
}
   */
  

@Post('project/delete')
async deleteProject(@Body() data: any, @Res() res: Response) {
  if (!data) {
    throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
  }
  try {
    const result = await this.performZohoBooksAction('projects', 'delete','DELETE', data);
    return res.status(HttpStatus.OK).json({
      message: `ZohoBooks bills update executed successfully`,
      result,
    });
  } catch (error) {
    this.logger.error(`Error in bills/update:`, error);
    throw new HttpException(
      error.message || 'Internal server error',
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}


//   GetMany

async getAllCustomers(@Body() data: any) {
  if (!data) {
    throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
  }
  try {
    const result = await this.performZohoBooksAction('contacts', 'getMany','GET', data);
   return {response:result.response.contacts.map(data=>({value:data.contact_id,name:data.contact_name}))}
  } catch (error) {
    this.logger.error(`Error in customers/getMany:`, error);
    throw new HttpException(
      error.message || 'Internal server error',
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}
async getAllItems(@Body() data: any) {
  if (!data) {
    throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
  }
  try {
    const result = await this.performZohoBooksAction('items', 'getMany','GET', data);
    return {response:result.response.items.map(data=>({value:data.item_id,name:data.name}))}
   
  } catch (error) {
    this.logger.error(`Error in items/getMany:`, error);
    throw new HttpException(
      error.message || 'Internal server error',
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}
async getAllInvoices(@Body() data: any) {
  if (!data) {
    throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
  }
  try {
    const result = await this.performZohoBooksAction('invoices', 'getMany','GET', data);
    return {response:result.response.invoices.map(data=>({value:data.invoice_id,name:data.customer_name}))}
  
  } catch (error) {
    this.logger.error(`Error in invoices/getMany:`, error);
    throw new HttpException(
      error.message || 'Internal server error',
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}
async getAllSalesorders(@Body() data: any) {
  if (!data) {
    throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
  }
  try {
    const result = await this.performZohoBooksAction('salesorders', 'getMany','GET', data);
    return {response:result.response.salesorders.map(data=>({value:data.salesorder_id,name:data.customer_name}))}
  } catch (error) {
    this.logger.error(`Error in salesorders/getMany:`, error);
    throw new HttpException(
      error.message || 'Internal server error',
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}

async getAllChartAccounts(@Body() data: any) {
  if (!data) {
    throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
  }
  try {
    const result = await this.performZohoBooksAction('chartofaccounts', 'getMany','get', data);
    return {response:result.response.chartofaccounts.map(data=>({value:data.account_id,name:data.account_name}))}
  } catch (error) {
    this.logger.error(`Error in expenses/create:`, error);
    throw new HttpException(
      error.message || 'Internal server error',
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}

async getAllExpenses(@Body() data: any) {
  if (!data) {
    throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
  }
  try {
    const result = await this.performZohoBooksAction('expenses', 'getMany','GET', data);
    return {response:result.response.expenses.map(data=>({value:data.expense_id,name:data.account_name}))}
  } catch (error) {
    this.logger.error(`Error in expenses/getMany:`, error);
    throw new HttpException(
      error.message || 'Internal server error',
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}

async getAllUsers(@Body() data: any) {
  if (!data) {
    throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
  }
  try {
    const result = await this.performZohoBooksAction('users', 'getMany','GET', data);
    return {response:result.response.users.map(data=>({value:data.user_id,name:data.name}))}
  } catch (error) {
    this.logger.error(`Error in bills/update:`, error);
    throw new HttpException(
      error.message || 'Internal server error',
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}
async getAllProject(@Body() data: any) {
  if (!data) {
    throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
  }
  try {
    const result = await this.performZohoBooksAction('projects', 'getMany','GET', data);
    return {response:result.response.projects.map(data=>({value:data.project_id,name:data.project_name}))}
  } catch (error) {
    this.logger.error(`Error in bills/update:`, error);
    throw new HttpException(
      error.message || 'Internal server error',
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}
    
public async initialize(credentialId) {
  try {
    const connection = await initializeDB();
    const credRepository = connection.getRepository(Credentials);
    const credentialsRepository: any = await credRepository.findOne({ where: { id: credentialId } });




    const access_token = credentialsRepository.authData.token.access_token;

    const organizationsId=credentialsRepository.authData.organizationsId
    return {access_token,organizationsId};

  } catch (error) {
    this.logger.error('Error initializing twitter :', error + error.stack);
  }
}

  /**
   * [AUTO-GENERATED] Helper method to perform a ZohoBooks action.
   * This method is a stub—extend it to integrate with the actual API for your xapp.
   *
   * Validations:
   * - Ensure that the provided module and action are supported.
   * - Validate the "data" structure as needed.
   *
   * DO NOT change the method signature.
   */
  // private async performZohoBooksAction(module: string, action: string, data: any): Promise<any> {
  //   // TODO: Implement the actual integration logic.
  //   // For example:
  //   // 1. Initialize your API client using a refresh token or saved credentials.
  //   // 2. Validate that 'data' contains required fields (CredentialId, ModuleId, ModuleData).
  //   // 3. Use the correct HTTP method based on the action (GET, POST, PUT, DELETE, etc.).
  //   // 4. Handle errors and return the API response.
  //   // 5. If the access token is expired, call the refreshToken endpoint.
  //   return {
  //     module,
  //     action,
  //     data,
  //     simulated: true,
  //   };
  // }

 public async curl(module: string, action: string, method: string, argumentdata: any): Promise<any> {

  try {
    const { credentialId, data } = argumentdata;


    const initializeData = await this.initialize(credentialId);

    if (!initializeData) {
      return { response: ['Initialization failed'], status: 500 };
    }

    const { access_token,organizationsId } = initializeData;



    const baseUrl=`https://www.zohoapis.in/books/v3`
   

    let url = `${baseUrl}/${module}`;
    if (data.Id) {
                url += `/${data.Id}`;
            }
    // Always append organization_id
    url += `?organization_id=${organizationsId}`;

    const options: any = {
      method,
      url,
      headers: {
        Authorization: `Zoho-oauthtoken ${access_token}`,
        'Content-Type': 'application/json',
      },
    };

    // Extract actual payload
    const payload = data?.data || {};

    // Add to body or params based on method
    if (method === 'GET') {
      options.params = payload;
    } else {
      options.data = payload;
    }

            if (action === 'getMany') {
                if (argumentdata) options.params = data.data;
            } else {
                options.data = data.data;
            }
    
    const response = await axios(options);
  
    return { response: response.data, status: response.status };
  } catch (error) {
   
    return { response: [error.response?.data || error.message], status: error.response?.status || 500 };
  }
}
private async performZohoBooksAction(module: string, action: string, method: string, data: any): Promise<any> {
  
    const resultData = await this.curl(module, action, method, data);
    return resultData;

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

@Post('getFields')
async getfields(@Body() body: { category: string, name: string, credentialId: any }) {
  const { category, name, credentialId } = body;
  try {
    const value = await this.initializeFields(credentialId);
    const relevantFields = await this.generateFields(category, name)
    return relevantFields;
  } catch (error) {
    return []
  }
}

async initializeFields(data) {
  for (const field of fields) {
    if (typeof field.init === 'function') {
      const datas = { credentialId: data, data: {} }
      await field.init(datas)
    }
  }
}


}
export const zohobooks =new ZohoBooksController()
