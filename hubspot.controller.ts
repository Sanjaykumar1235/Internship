// hubspot.controller.ts
// -----------------------------------------------------------------------------
// AUTO-GENERATED CONTROLLER FILE.
// DO NOT modify the auto-generated endpoints below.
// For custom integration logic, extend the helper "performhubspotAction".
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
  Scope,
  Head,
  BadRequestException,
} from '@nestjs/common';
import * as qs from 'qs'
import { randomBytes } from 'crypto';
import { Request, response, Response } from 'express';
import { Repository } from 'typeorm';
import axios from 'axios';
import * as crypto from 'crypto';
import { fields } from './hubspot.config';
import { CredentialController } from 'src/credential/credential.controller';
import { initializeDB } from 'src/ormconfig';
import { Credentials } from 'src/entities/Credentials';
import { CustomLogger } from 'src/logger/custom.logger';
import config, { XappName, modules as xappModules } from './hubspot.config'
@Controller('hubspot')
export class HubspotController {
  private logger = new CustomLogger();
  private CredentialController = new CredentialController()






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
      const { clientId, redirectUri, clientSecret, name, type, id } = reqBody;
      const state = randomBytes(16).toString('hex')
      const scope = [
        'crm.objects.users.write',
        'crm.objects.users.read',
        'crm.objects.contacts.write',
        'crm.objects.contacts.read',
        'crm.objects.companies.write',
        'crm.objects.companies.read',
        'crm.lists.write',
        'crm.lists.read',
        'content',
        'marketing.campaigns.read',
        'marketing.campaigns.write',
        'oauth'
      ].join(' ');
      const authUrl = `https://app.hubspot.com/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${encodeURIComponent(scope)}&state=${state}`;


      // Construct the OAuth URL.
      // NOTE: Update the URL if your xapp uses a different authentication endpoint.

      const data = {
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        state: state
      };

      const credentialsRequest = {
        name: name,
        type: type,
        data: data
      }

      if (reqBody.id) {
        await this.CredentialController.updateCredentials(reqBody.id, data);

        this.logger.debug('Credentials with ID updated successfully', reqBody.id);
        return res.status(HttpStatus.OK).send({ authurl: authUrl });
      } else {
        await this.CredentialController.createCredentials(credentialsRequest, res);
        console.log('Credentials stored in database');
        return res.status(HttpStatus.CREATED).send({ authurl: authUrl });
      }

    } catch (error) {
      this.logger.error('Error in authorize:', error);
      throw new HttpException('Authorization error: ' + error.message, HttpStatus.INTERNAL_SERVER_ERROR);
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
      const credRepository = connection.getRepository(Credentials);
      const credential = await credRepository.createQueryBuilder('credentials')
        .where("credentials.auth_data->>'state'=:state", { state })
        .getOne();
      const { client_id, client_secret, redirect_uri } = credential.authData;
      const requestBody = qs.stringify({
        client_id: client_id,
        client_secret: client_secret,
        grant_type: 'authorization_code',
        redirect_uri: redirect_uri,
        code: code
      })


      const result = await axios.post('https://api.hubapi.com/oauth/v1/token', requestBody, {
        headers: {
          "Content-Type": 'application/x-www-form-urlencoded'
        }
      });
      credential.authData['token'] = result.data
      await this.CredentialController.updateCredentials(credential.id, credential.authData);
      return res.status(HttpStatus.CREATED).send({ result: result.data });
    } catch (err) {
      this.logger.error('Error in callback:', err);
      throw new HttpException('CAllback error', HttpStatus.INTERNAL_SERVER_ERROR);
    }


  }

  /**
     * [AUTO-GENERATED] Refresh token endpoint.
     * This endpoint should handle token expiry and refresh the access token.
     * Implement the refresh logic based on your authentication provider.
     */
  @Post('refreshToken')
  async refreshToken(@Body() credentialId: string) {
    try {
      // TODO: Implement the refresh token logic here.
      // Example: Request a new access token using the refresh token.
      const newAccessToken = 'new-access-token-placeholder';
      const connection = await initializeDB();
      const credRepository = connection.getRepository(Credentials);
      const credential: any = await credRepository.findOne({ where: { id: credentialId } })
      const data = qs.stringify({
        client_id: credential.authData.client_id,
        client_secret: credential.authData.client_secret,
        grant_type: 'refresh_token',
        refresh_token: credential.authData.token.refresh_token
      })
      const response = await axios.post(`https://api.hubapi.com/oauth/v1/token`, data, {
        headers: {
          "Content-Type": 'application/x-www-form-urlencoded'
        }
      });
      const result = response.data
      const updatedAuthData = {
        ...credential.authData,
        token: result

      };
      console.log(response.data)
      await this.CredentialController.updateCredentials(credentialId, updatedAuthData)
      return {
        message: `${XappName} access token refreshed successfully`,
        accessToken: newAccessToken,
      }
    } catch (error) {
      this.logger.error('Error in refreshToken:', error);
      throw new HttpException('Refresh token error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async AuthError(functionName: string, functionArgs: any[], credentialId: string) {
    try {
      console.log("hello from autherror")
      await this.refreshToken(credentialId);
      const argsArray = Array.isArray(functionArgs) ? functionArgs : [functionArgs];
      const result = await this[functionName](...argsArray);
      return result
    } catch (error) {
      this.logger.error('Error refreshing token:', error + error.stack);
      return error;
    }
  }

  //   // ---------------------------------------------------------------------------
  // AUTO-GENERATED ENDPOINTS FOR MODULE ACTIONS (as defined in the blueprint JSON)
  // ---------------------------------------------------------------------------

  /**
   * [AUTO-GENERATED] Endpoint for module "campaign" action "create".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - ModuleData: object (data to create)
   * - Calls the integration helper "performhubspotAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
  "credentialId": "6a891555-ba55-41c1-b803-4c08bf316f1c",
  "data": {
    "data":{
    "properties": {
      "hs_name": "anto",
      "hs_start_date": "2025-04-02",
      "hs_end_date": "2025-04-03"
    }
    }
  }
}

   */


  @Post('campaign/create')
  async createCampaign(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {

      const result = await this.performhubspotAction(`campaigns`, 'create', 'POST', data);
      if (result.status === 401) {
        const functionArgs = Array.from(arguments).slice(0, 2);
        const result = await this.AuthError("createCampaign", functionArgs, data.credentialId)
      }


      return res.status(HttpStatus.OK).json({
        message: `hubspot campaign create executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in campaign/create:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "campaign" action "update".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - ModuleData: object (data to update)
   * - Calls the integration helper "performhubspotAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
  "credentialId": "6a891555-ba55-41c1-b803-4c08bf316f1c",
  "data": {
    "Id":"69c89f04-7df2-4dbb-ae89-faa4f14687b5",
    "data":{
    "properties": {
      "hs_name": "sanjubai",
      "hs_start_date": "2025-04-02",
      "hs_end_date": "2025-04-03"
    }
    }
  }
}

   */


  @Post('campaign/update')
  async updateCampaign(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performhubspotAction('campaigns', 'update', 'PATCH', data);
      if (result.status === 401) {
        const functionArgs = Array.from(arguments).slice(0, 2);
        const result = await this.AuthError("updateCampaign", functionArgs, data.credentialId)
      }
      return res.status(HttpStatus.OK).json({
        message: `hubspot campaign update executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in campaign/update:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "campaign" action "delete".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - RecordId: string (ID of the record to delete)
   * - Calls the integration helper "performhubspotAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
  "credentialId": "6a891555-ba55-41c1-b803-4c08bf316f1c",
  "data": {
    "Id": "c5072cb4-8538-45da-88fc-d3f5a3cadfe9",
    "data":{}
  }
  
}

   */


  @Post('campaign/delete')
  async deleteCampaign(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performhubspotAction('campaigns', 'delete', 'DELETE', data);
      if (result.status === 401) {
        const functionArgs = Array.from(arguments).slice(0, 2);
        const result = await this.AuthError("deleteCampaign", functionArgs, data.credentialId)
      }
      return res.status(HttpStatus.OK).json({
        message: `hubspot campaign delete executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in campaign/delete:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "campaign" action "get".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - RecordId: string (ID of the record to fetch)
   * - Calls the integration helper "performhubspotAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
      "credentialId": "6a891555-ba55-41c1-b803-4c08bf316f1c",
      "data":{
        "Id":"c5072cb4-8538-45da-88fc-d3f5a3cadfe9"
      }
}
   */


  @Post('campaign/get')
  async getCampaign(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performhubspotAction('campaigns', 'get', 'GET', data);
      if (result.status === 401) {
        const functionArgs = Array.from(arguments).slice(0, 2);
        const result = await this.AuthError("getCampaign", functionArgs, data.credentialId)
      }
      return res.status(HttpStatus.OK).json({
        message: `hubspot campaign get executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in campaign/get:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "campaign" action "getMany".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - Filters: object (optional filters for querying records)
   * - Calls the integration helper "performhubspotAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
  "CredentialId": "your-credential-id",
  "Filters": {
    "status": "active",
    "dateFrom": "2024-01-01"
  }
}
   */


  @Post('campaign/getMany')
  async getmanyCampaign(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performhubspotAction('campaign', 'getMany', 'GET', data);
      if (result.status === 401) {
        const functionArgs = Array.from(arguments).slice(0, 2);
        const result = await this.AuthError("getmanyCampaign", functionArgs, data.credentialId)
      }
      return res.status(HttpStatus.OK).json({
        message: `hubspot campaign getMany executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in campaign/getMany:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "account" action "get".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - RecordId: string (ID of the record to fetch)
   * - Calls the integration helper "performhubspotAction".
   * DO NOT modify the method signature.
   *  Example usage:
   * {
     "credentialId":"6a891555-ba55-41c1-b803-4c08bf316f1c",
     "data":{}
}
   */


  @Post('account/get')
  async getAccount(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performhubspotAction('details', 'get', 'GET', data);
      if (result.status === 401) {
        const functionArgs = Array.from(arguments).slice(0, 2);
        const result = await this.AuthError("getAccount", functionArgs, data.credentialId)
      }
      return res.status(HttpStatus.OK).json({
        message: `hubspot account get executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in account/get:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "account" action "getMany".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - Filters: object (optional filters for querying records)
   * - Calls the integration helper "performhubspotAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
  "CredentialId": "your-credential-id",
  "Filters": {
    "status": "active",
    "dateFrom": "2024-01-01"
  }
}
   */


  @Post('account/getMany')
  async getmanyAccount(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performhubspotAction('account', 'getMany', 'GET', data);
      if (result.status === 401) {
        const functionArgs = Array.from(arguments).slice(0, 2);
        const result = await this.AuthError("getmanyAccount", functionArgs, data.credentialId)
      }
      return res.status(HttpStatus.OK).json({
        message: `hubspot account getMany executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in account/getMany:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "email" action "create".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - ModuleData: object (data to create)
   * - Calls the integration helper "performhubspotAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId":"6a891555-ba55-41c1-b803-4c08bf316f1c",
    "data": {
    
        "data":{
        "name": "Sanjay"
    }
}
}
   */


  @Post('email/create')
  async createEmail(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performhubspotAction('emails', 'create', 'POST', data);
      if (result.status === 401) {
        const functionArgs = Array.from(arguments).slice(0, 2);
        const result = await this.AuthError("createEmail", functionArgs, data.credentialId)
      }
      return res.status(HttpStatus.OK).json({
        message: `hubspot email create executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in email/create:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "email" action "update".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - ModuleData: object (data to update)
   * - Calls the integration helper "performhubspotAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId":"6a891555-ba55-41c1-b803-4c08bf316f1c",
    "data":{
        "Id":188287039237,
        "data":{
        "name":"yousuf"
    }
    }
}
   */


  @Post('email/update')
  async updateEmail(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performhubspotAction('emails', 'update', 'PATCH', data);
      if (result.status === 401) {
        const functionArgs = Array.from(arguments).slice(0, 2);
        const result = await this.AuthError("updateEmail", functionArgs, data.credentialId)
      }
      return res.status(HttpStatus.OK).json({
        message: `hubspot email update executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in email/update:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "email" action "delete".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - RecordId: string (ID of the record to delete)
   * - Calls the integration helper "performhubspotAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId":"6a891555-ba55-41c1-b803-4c08bf316f1c",
    "data":{
        "Id":188287039237
    }
}  */


  @Post('email/delete')
  async deleteEmail(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performhubspotAction('emails', 'delete', 'DELETE', data);
      if (result.status === 401) {
        const functionArgs = Array.from(arguments).slice(0, 2);
        const result = await this.AuthError("deleteEmail", functionArgs, data.credentialId)
      }
      return res.status(HttpStatus.OK).json({
        message: `hubspot email delete executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in email/delete:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "email" action "get".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - RecordId: string (ID of the record to fetch)
   * - Calls the integration helper "performhubspotAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
  "CredentialId": "your-credential-id",
  "RecordId": "record-id"
}
   */


  @Post('email/get')
  async getEmail(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performhubspotAction(`emails/${data.data.emailId}/revisions`, 'get', 'GET', data);
      if (result.status === 401) {
        const functionArgs = Array.from(arguments).slice(0, 2);
        const result = await this.AuthError("getEmail", functionArgs, data.credentialId)
      }
      return res.status(HttpStatus.OK).json({
        message: `hubspot email get executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in email/get:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "email" action "getMany".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - Filters: object (optional filters for querying records)
   * - Calls the integration helper "performhubspotAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId":"6a891555-ba55-41c1-b803-4c08bf316f1c",
    "data":{}
}
   */


  @Post('email/getMany')
  async getmanyEmail(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performhubspotAction('emails', 'getMany', 'GET', data);
      if (result.status === 401) {
        const functionArgs = Array.from(arguments).slice(0, 2);
        const result = await this.AuthError("getmanyEmail", functionArgs, data.credentialId)
      }
      return res.status(HttpStatus.OK).json({
        message: `hubspot email getMany executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in email/getMany:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "list" action "create".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - ModuleData: object (data to create)
   * - Calls the integration helper "performhubspotAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId":"6a891555-ba55-41c1-b803-4c08bf316f1c",
    "data":{
        "data":{
    "name":"sanjay lists",
    
     "objectTypeId": "0-1",
     "processingType": "MANUAL"
}
    }
}

   */


  @Post('list/create')
  async createList(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performhubspotAction('lists', 'create', 'POST', data);
      if (result.status === 401) {
        const functionArgs = Array.from(arguments).slice(0, 2);
        const result = await this.AuthError("createList", functionArgs, data.credentialId)
      }
      return res.status(HttpStatus.OK).json({
        message: `hubspot list create executed successfully`,
        result,
      });

    } catch (error) {

      if (error.response && error.response.status === 401) {
      }
      this.logger.error(`Error in list/create:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "list" action "update".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - ModuleData: object (data to update)
   * - Calls the integration helper "performhubspotAction".
   * DO NOT modify the method signature.
   *  Example usage:
   * {
    "credentialId": "{{credentialId}}",
    "data": {
        "id": "12",
        "name": "harish0101"
    }
}

   */


  @Post('lists/update')
  async updateList(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performhubspotAction(`lists/${data.data.id}/update-list-name?listName=${data.data.name}&includeFilters=false'`, 'update', 'PUT', data);
      if (result.status === 401) {
        const functionArgs = Array.from(arguments).slice(0, 2);
        const result = await this.AuthError("updateList", functionArgs, data.credentialId)
      }
      return res.status(HttpStatus.OK).json({
        message: `hubspot list update executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in list/update:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "list" action "delete".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - RecordId: string (ID of the record to delete)
   * - Calls the integration helper "performhubspotAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId":"6a891555-ba55-41c1-b803-4c08bf316f1c",
    "data": {
         "Id": "29"
    
    }
   
}

   */


  @Post('list/delete')
  async deleteList(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performhubspotAction('lists', 'delete', 'DELETE', data);
      if (result.status === 401) {
        const functionArgs = Array.from(arguments).slice(0, 2);
        const result = await this.AuthError("deleteList", functionArgs, data.credentialId)
      }
      return res.status(HttpStatus.OK).json({
        message: `hubspot list delete executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in list/delete:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "list" action "get".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - RecordId: string (ID of the record to fetch)
   * - Calls the integration helper "performhubspotAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId":"6a891555-ba55-41c1-b803-4c08bf316f1c",
    "data":{
        "Id":"31"
   }
}
   */


  @Post('list/get')
  async getList(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performhubspotAction(`lists`, 'get', 'GET', data);
      if (result.status === 401) {
        const functionArgs = Array.from(arguments).slice(0, 2);
        const result = await this.AuthError("getList", functionArgs, data.credentialId)
      }
      return res.status(HttpStatus.OK).json({
        message: `hubspot list get executed successfully`,
        result,

      });
    } catch (error) {

      this.logger.error(`Error in list/get:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );

    }
  }



  /**
   * [AUTO-GENERATED] Endpoint for module "list" action "getMany".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - Filters: object (optional filters for querying records)
   * - Calls the integration helper "performhubspotAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
  "CredentialId": "your-credential-id",
  "Filters": {
    "status": "active",
    "dateFrom": "2024-01-01"
  }
}
   */


  @Post('lists/getMany')
  async getManylists(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performhubspotAction('lists/search', 'create', 'POST', data);
      if (result.status === 401) {
        const functionArgs = Array.from(arguments).slice(0, 2);
        const result = await this.AuthError("getListByName", functionArgs, data.credentialId)
      }
      return res.status(HttpStatus.OK).json({
        message: `hubspot list get executed successfully`,
        result,

      });
    } catch (error) {
      this.logger.error(`Error in list/get:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
  /**
 * [AUTO-GENERATED] Endpoint for module "list" action "get".
 *  - Request Parameters (data): 
 * - CredentialId: string
 * - Filters: object (optional filters for querying records)
 * - Calls the integration helper "performhubspotAction".
 * DO NOT modify the method signature.
 *  Example usage:
 *  {
  "credentialId":"6a891555-ba55-41c1-b803-4c08bf316f1c",
  "data":{
       "objectTypeId":"0-1",
          "listName":"list100",
      "data":{
          
       
      }
  }
}
 */
  @Post('listname/get')
  async getlistbyname(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performhubspotAction(`lists/object-type-id/${data.data.objectTypeId}/name/${data.data.listName}`, 'getMany', 'GET', data);
      if (result.status === 401) {
        const functionArgs = Array.from(arguments).slice(0, 2);
        const result = await this.AuthError("getlistbyname", functionArgs, data.credentialId)
      }
      return res.status(HttpStatus.OK).json({
        message: `hubspot list getMany executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in list/getMany:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }


  //  GetMany
  //   {
  //     "category": "email",
  //     "name": "getMany",
  //     "data": "{{credentialId}}"
  // }

  async getAllEmail(@Body() data: any) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      data = {
        credentialId: data,
        data: {}
      }
      const result = await this.performhubspotAction('emails', 'getMany', 'GET', data);
      if (result.status === 401) {
        const functionArgs = Array.from(arguments).slice(0, 2);
        const result = await this.AuthError("getAllEmail", functionArgs, data.credentialId)
      }
      const response = result.response.results.map(results => ({ id: results.id, name: results.name }));

      return { response, status: result.status }

    } catch (error) {
      this.logger.error(`Error in email/getMany:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  //  GetMany

  async getAllList(@Body() data: any) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      data = {
        credentialId: data,
        data: {
          data: {}
        }
      }
      const result = await this.performhubspotAction('lists/search', 'create', 'POST', data);
      if (result.status === 401) {
        const functionArgs = Array.from(arguments).slice(0, 2);
        const result = await this.AuthError("getListByName", functionArgs, data.credentialId)
      }
      const response = result.response.lists.map(lists => ({ name: lists.name, listId: lists.listId }));
      return { response, status: result.status }
    } catch (error) {
      this.logger.error(`Error in list/get:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async initialize(credentialId) {
    try {
      const id: any = credentialId;
      const connection = await initializeDB();
      const credRepository = connection.getRepository(Credentials);
      const credentialRepository = await credRepository.findOne({ where: { id } });
      const access_token = credentialRepository.authData.token.access_token;
      return access_token;
    } catch (error) {
      this.logger.error('Error initializing Node:', error + error.stack);
    }
  }




  /**
   * [AUTO-GENERATED] Helper method to perform a Convertkit action.
   * This method is a stub—extend it to integrate with the actual API for your xapp.
   *
   * Validations:
   * - Ensure that the provided module and action are supported.
   * - Validate the "data" structure as needed.
   *
   * DO NOT change the method signature.
   */

  private async performhubspotAction(module: string, action: string, method: any, data: any): Promise<any> {
    // TODO: Implement the actual integration logic.
    // For example:
    // 1. Initialize your API client using a refresh token or saved credentials.
    // 2. Validate that 'data' contains required fields (credentialId, ModuleId, ModuleData).
    // 3. Use the correct HTTP method based on the action (GET, POST, PATCH, DELETE, etc.).
    // 4. Handle errors and return the API response.
    // 5. If the access token is expired, call the refreshToken endpoint.

    const resultData = await this.curl(module, action, method, data);
    return resultData
  }
  public async curl(module: string, action: string, method: string, argumentdata: any): Promise<any> {

    try {
      const { credentialId, data } = argumentdata;
      const initializeData = await this.initialize(credentialId)
      const access_token = initializeData;
      let baseUrl;
      if (module === 'campaigns' || module.includes('emails')) {
        baseUrl = `https://api.hubapi.com/marketing/v3/`;
      }
      else if (module === 'lists') {
        baseUrl = `https://api.hubapi.com/crm/v3/`;
      }
      else if (module === 'details') {
        baseUrl = `https://api.hubapi.com/account-info/v3/`
      }
      else {
        baseUrl = `https://api.hubapi.com/crm/v3/`;
      }

      let url = `${baseUrl}${module}`
      if (data.Id) url += `/${data.Id}`
      const options: any = {
        method, url, headers: {
          "Authorization": `Bearer ${access_token}`,
          "Content-Type": "application/json"
        }
      };
      if (action === 'getMany') {
        if (argumentdata) options.params = data
      }
      else {
        if (argumentdata) options.data = data.data
      }
      const response = await axios(options)
      return { response: response.data, status: response.status }
    } catch (error) {
      return { response: [error.response?.data || error.message], status: error.status || 500 };
    }
  }

  @Post('get/fields')
  async getfields(@Body() body: { category: string; name: string; data: any }) {
    const { category, name, data } = body;
    try {
      const relevantFields = await this.generateFields(category, name, data,);
      return relevantFields;
    } catch (error) {
      return [];
    }
  }

  private async generateFields(category: string, name: string, data: any) {
    if (!fields || !Array.isArray(fields)) {
      throw new Error("Fields array is not defined or is not an array.");
    }
    await initializeFields(data);
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
}
async function initializeFields(data) {
  for (const field of fields) {
    if (typeof field.init === 'function') {
      await field.init(data);
    }
  }
}
export const hub = new HubspotController()

