// amocrm.controller.ts
// -----------------------------------------------------------------------------
// AUTO-GENERATED CONTROLLER FILE.
// DO NOT modify the auto-generated endpoints below.
// For custom integration logic, extend the helper "performamocrmAction".
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
import axios, { Method } from 'axios';
import * as crypto from 'crypto';
import { initializeDB } from '../../ormconfig';
import { Credentials } from '../../entities/Credentials';
import { CustomLogger } from '../../logger/custom.logger';
import config, { XappName, fields, modules as xappModules } from './amocrm.config';
import { CredentialController } from 'src/credential/credential.controller';
import * as qs from 'qs';


@Controller('amocrm')
export class amocrmController {
  private logger = new CustomLogger();
  private credentialController = new CredentialController();


  /**
   * [AUTO-GENERATED] OAuth authorize endpoint.
   * This endpoint initiates the authentication flow.
   * Implement the actual token request and error handling as needed.
   */
  @Post('authorize')
  async authorize(@Body() reqBody: any, @Res() res: Response) {

    try {
      const { integrationId, secretKey,accountname, authorizationCode, redirectUri, name, type } = reqBody;
      const state = crypto.randomBytes(20).toString('hex');

      const authUrl = `https://www.kommo.com/oauth?client_id=${integrationId}&state=${state}&mode=popup`;

      const data = {
        integrationId: integrationId,
        secretKey: secretKey,
        accountname:accountname,
        authorizationCode: authorizationCode,
        redirectUri: redirectUri,
        state: state,
      }

      const request = {
        name: name,
        type: type,
        data: data
      }

      if (reqBody.id) {
        await this.credentialController.updateCredentials(reqBody.id, data)
      } else {
        await this.credentialController.createCredentials(request,res);
      }
      return res.status(HttpStatus.OK).send(authUrl);
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
  async callback(@Req() req: Request) {
    try {
      const code = req.query.code as string;
      const state = req.query.state as string;
      const referer = req.query.referer as string; // Extract subdomain from referer
      console.log('ref',referer)

      if (!code || !state || !referer) {
        throw new Error('Missing required query parameters');
      }

      // Retrieve credentials using the state parameter
      const connection = await initializeDB();
      const credRepository = connection.getRepository(Credentials);
      const credential = await credRepository
        .createQueryBuilder('sanjay')
        .where("sanjay.auth_data->>'state' = :state", { state })
        .getOne();

      if (!credential) {
        throw new Error('No matching credential found for the provided state');
      }

      const { integrationId, secretKey, redirectUri } = credential.auth_data;

      // Prepare the request body
      const data = {
        grant_type: 'authorization_code',
        client_id: integrationId,
        client_secret: secretKey,
        redirect_uri: redirectUri,
        code
    
          }    ;

      // Send POST request to exchange code for access token
      const response = await axios.post(`https://${referer}/oauth2/access_token`, data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      // Store the received tokens
      credential.auth_data['token'] = response.data;
      await this.credentialController.updateCredentials(credential.id, credential.auth_data);

      return response.data;
    } catch (error) {
      throw new HttpException('Callback error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  /**
   * [AUTO-GENERATED] Refresh token endpoint.
   * This endpoint should handle token expiry and refresh the access token.
   * Implement the refresh logic based on your authentication provider.
   */
  @Post('refreshToken')
  async refreshToken(credentialId) {

    try {
      const referer = `https://sanjubai1235.kommo.com`
      // TODO: Implement the refresh token logic here.
      // Example: Request a new access token using the refresh token.
      const connection = await initializeDB();
      const credRepository = connection.getRepository(Credentials);
      const credential: any = await credRepository.findOne({ where: { credentialId } })
      const { refresh_token } = credential.authData.token;
      const { integrationId, secretKey, redirectUri } = credential.auth_data;
      const data = {
        grant_type: 'refresh_token',
        refresh_token: refresh_token,
        client_id: integrationId,
        client_secret: secretKey,
        redirect_uri: redirectUri

      }
      const response = await axios.post(`${referer}/oauth2/access_token`, data, {
        headers: {
          "Content-Type": 'application/json',
          Accept: 'application/json'
        }
      });
      credential.auth_data['token'] = response.data;
      await this.credentialController.updateCredentials(credentialId, credential.auth_data)
    } catch (error) {
      this.logger.error('Error in refreshToken:', error);
      throw new HttpException('Refresh token error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async AuthError(functionName: string, functionArgs: any[], credentialsId: string,) {
    try {
      await this.refreshToken(credentialsId);
      const result = await this[functionName](...functionArgs);
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
   * - Calls the integration helper "performamocrmAction".
   * DO NOT modify the method signature.
   *  Example usage:
   * {
    "credentialId":"{{credentialId}}",
    "data":{
        "data":
            [{
                "name":"new company 5"
            }]
        
    }
}
   */


  @Post('company/create')
  async createCompany(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performamocrmAction('companies', 'create', 'post', data);
      return res.status(HttpStatus.OK).json({
        message: `amocrm company create executed successfully`,
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
   * - Calls the integration helper "performamocrmAction".
   * DO NOT modify the method signature.
   *  Example usage:
   * {
    "credentialId":"{{credentialId}}",

    "data":{
        "Id":50,
        "data":
            {
                "name":"nexgen company"
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
      const result = await this.performamocrmAction(`companies`, 'update', 'patch', data);
      return res.status(HttpStatus.OK).json({
        message: `amocrm company update executed successfully`,
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
   * [AUTO-GENERATED] Endpoint for module "company" action "get".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - RecordId: string (ID of the record to fetch)
   * - Calls the integration helper "performamocrmAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId":"{{credentialId}}",

    "data":{
        "Id":50
    }
}
   */


  @Post('company/get')
  async getCompany(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performamocrmAction(`companies`, 'get', 'get', data);
      return res.status(HttpStatus.OK).json({
        message: `amocrm company get executed successfully`,
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
   * - Calls the integration helper "performamocrmAction".
   * DO NOT modify the method signature.
   *  Example usage:
   * {
    "credentialId":"{{credentialId}}",
    "data":{}
}
   */


  @Post('company/getMany')
  async getmanyCompany(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performamocrmAction('companies', 'getMany', 'get', data);
      return res.status(HttpStatus.OK).json({
        message: `amocrm company getMany executed successfully`,
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

  async getmanyCompanyf(@Body() data: any) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performamocrmAction('companies', 'getMany', 'get', data);
      return result.response._embedded.companies.map(data => ({ value: data.id, name: data.name }))
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
   * - Calls the integration helper "performamocrmAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId": "50103317-3bcb-416b-8fb5-b1f331939564",
    "data": {
        "data": [
            {
                "name": "new contact"
            }
        ]
    }
}
   */


  @Post('contact/create')
  async createContact(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performamocrmAction('contacts', 'create', 'post', data);
      return res.status(HttpStatus.OK).json({
        message: `amocrm contact create executed successfully`,
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
   * - Calls the integration helper "performamocrmAction".
   * DO NOT modify the method signature.
   *  Example usage:
   * {
    "credentialId":"{{credentialId}}",
    "data":{
        "Id":98,
        "data":{
            "name":"Update contact "
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
      const result = await this.performamocrmAction(`contacts`, 'update', 'patch', data);
      return res.status(HttpStatus.OK).json({
        message: `amocrm contact update executed successfully`,
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
   * [AUTO-GENERATED] Endpoint for module "contact" action "get".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - RecordId: string (ID of the record to fetch)
   * - Calls the integration helper "performamocrmAction".
   * DO NOT modify the method signature.
   *  Example usage:
   * {
    "credentialId":"{{credentialId}}",
    "data":{
        "Id":98
    }
}
   */


  @Post('contact/get')
  async getContact(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performamocrmAction(`contacts`, 'get', 'get', data);
      return res.status(HttpStatus.OK).json({
        message: `amocrm contact get executed successfully`,
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
   * - Calls the integration helper "performamocrmAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId": "{{credentialId}}",
    "data": {}
} */


  @Post('contact/getMany')
  async getmanyContact(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performamocrmAction('contacts', 'getMany', 'get', data);
      return res.status(HttpStatus.OK).json({
        message: `amocrm contact getMany executed successfully`,
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

  async getmanyContactf(@Body() data: any) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performamocrmAction('contacts', 'getMany', 'get', data);
      return result.response._embedded.contacts.map(data => ({ id: data.id, name: data.name }))

    } catch (error) {
      this.logger.error(`Error in contact/getMany:`, error);
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
   * - Calls the integration helper "performamocrmAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId":"{{credentialId}}",
    "data":{
        "data":[{
            "name":"new Lead 4"
        }]
    }
}
   */


  @Post('lead/create')
  async createLead(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performamocrmAction('leads', 'create', 'post', data);
      return res.status(HttpStatus.OK).json({
        message: `amocrm lead create executed successfully`,
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
   * - Calls the integration helper "performamocrmAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId":"{{credentialId}}",

    "data":{
        "Id":140,
        "data":{
            "name":"lead name"
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
      const result = await this.performamocrmAction(`leads`, 'update', 'patch', data);
      return res.status(HttpStatus.OK).json({
        message: `amocrm lead update executed successfully`,
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
   * [AUTO-GENERATED] Endpoint for module "lead" action "get".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - RecordId: string (ID of the record to fetch)
   * - Calls the integration helper "performamocrmAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *{
    "credentialId":"{{credentialId}}",
    "data":{
        "Id":140
    }
}
   */


  @Post('lead/get')
  async getLead(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performamocrmAction(`leads`, 'get', 'get', data);
      return res.status(HttpStatus.OK).json({
        message: `amocrm lead get executed successfully`,
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
   * - Calls the integration helper "performamocrmAction".
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
      const result = await this.performamocrmAction('leads', 'getMany', 'get', data);
      return res.status(HttpStatus.OK).json({
        message: `amocrm lead getMany executed successfully`,
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

  async getmanyLeadf(@Body() data: any) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performamocrmAction('leads', 'getMany', 'get', data);
      return result.response._embedded.leads.map(data => ({ id: data.id, name: data.name }))

    } catch (error) {
      this.logger.error(`Error in lead/getMany:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "note" action "create".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - ModuleData: object (data to create)
   * - Calls the integration helper "performamocrmAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId": "{{credentialId}}",
    "data": {
            "entity_type": "contacts",

        "data": [
            {
                "entity_id": 112,
                "note_type": "common",
                "params": {
                    "text": "Meeting with the client"
                },
                "is_need_to_trigger_digital_pipeline": true
            }
        ]
    }
}
   */


  @Post('note/create')
  async createNote(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performamocrmAction(`${data.data.entity_type}/notes`, 'create', 'post', data);
      return res.status(HttpStatus.OK).json({
        message: `amocrm note create executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in note/create:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "note" action "update".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - ModuleData: object (data to update)
   * - Calls the integration helper "performamocrmAction".
   * DO NOT modify the method signature.
   *  Example usage:
   * {
    "credentialId": "{{credentialId}}",
    "data": {
            "entity_type": "contacts",
            "Id":388,

        "data": {
            "entity_id": 112,
            "note_type": "common",
            "params": {
                "text": "Meeting with the client"
            },
            "is_need_to_trigger_digital_pipeline": true
        }
    }
}
   */


  @Post('note/update')
  async updateNote(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performamocrmAction(`${data.data.entity_type}/notes`, 'update', 'patch', data);
      return res.status(HttpStatus.OK).json({
        message: `amocrm note update executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in note/update:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "note" action "get".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - RecordId: string (ID of the record to fetch)
   * - Calls the integration helper "performamocrmAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId": "{{credentialId}}",
    "data": {
            "entity_type": "contacts",
            "Id":388

    }
}
   */


  @Post('note/get')
  async getNote(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performamocrmAction(`${data.data.entity_type}/notes`, 'get', 'get', data);
      return res.status(HttpStatus.OK).json({
        message: `amocrm note get executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in note/get:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "note" action "getMany".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - Filters: object (optional filters for querying records)
   * - Calls the integration helper "performamocrmAction".
   * DO NOT modify the method signature.
   *  Example usage:
   * {
    "credentialId": "{{credentialId}}",
   
    "data": {
         "entity_type": "contacts"
    }
}
   */


  @Post('note/getMany')
  async getmanyNote(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performamocrmAction(`${data.data.entity_type}/notes`, 'getMany', 'get', data);
      return res.status(HttpStatus.OK).json({
        message: `amocrm note getMany executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in note/getMany:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }


  async getmanyNotef(@Body() data: any) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performamocrmAction(`${data.entity_type}/notes`, 'getMany', 'get', data);
      return result.response._embedded.notes.map(data => ({ id: data.id, name: data.name }))
    } catch (error) {
      this.logger.error(`Error in note/getMany:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }


  /**
   * [AUTO-GENERATED] Endpoint for module "task" action "create".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - ModuleData: object (data to create)
   * - Calls the integration helper "performamocrmAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId": "{{credentialId}}",
    "data": {
        "data": [
            {
                "text": "new task 5",
                "complete_till": 1588885140
            }
        ]
    }
}
   */


  @Post('task/create')
  async createTask(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performamocrmAction('tasks', 'create', 'post', data);
      return res.status(HttpStatus.OK).json({
        message: `amocrm task create executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in task/create:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "task" action "update".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - ModuleData: object (data to update)
   * - Calls the integration helper "performamocrmAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *{
    "credentialId": "{{credentialId}}",
    "data": {
        "Id":36,
        "data": {
            "text": "new task1",
            "complete_till": 1588885140
        }
    }
}
   */


  @Post('task/update')
  async updateTask(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performamocrmAction(`tasks`, 'update', 'patch', data);
      return res.status(HttpStatus.OK).json({
        message: `amocrm task update executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in task/update:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "task" action "get".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - RecordId: string (ID of the record to fetch)
   * - Calls the integration helper "performamocrmAction".
   * DO NOT modify the method signature.
   *  Example usage:
   * {
    "credentialId": "{{credentialId}}",
    "data": {
        "Id":36
    }
}
   */


  @Post('task/get')
  async getTask(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performamocrmAction(`tasks`, 'get', 'get', data);
      return res.status(HttpStatus.OK).json({
        message: `amocrm task get executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in task/get:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "task" action "getMany".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - Filters: object (optional filters for querying records)
   * - Calls the integration helper "performamocrmAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId": "{{credentialId}}",
    "data": {}
}
   */


  @Post('task/getMany')
  async getmanyTask(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performamocrmAction('tasks', 'getMany', 'get', data);
      return res.status(HttpStatus.OK).json({
        message: `amocrm task getMany executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in task/getMany:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }


  async getmanyTaskf(@Body() data: any) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performamocrmAction('tasks', 'getMany', 'get', data);
      return result.response._embedded.tasks.map(data => ({ id: data.id, name: data.text }))

    } catch (error) {
      this.logger.error(`Error in task/getMany:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }


  /**
   * [AUTO-GENERATED] Helper method to perform a amocrm action.
   * This method is a stub—extend it to integrate with the actual API for your xapp.
   *
   * Validations:
   * - Ensure that the provided module and action are supported.
   * - Validate the "data" structure as needed.
   *
   * DO NOT change the method signature.
   */


  private async intialize(credentialId) {
    try {
      const id: any = credentialId;
      const connect = await initializeDB();
      const credRepository = connect.getRepository(Credentials)
      const credentialRepository = await credRepository.findOne({ where: { id } });
      const authData = credentialRepository.auth_data;
      return authData;
    } catch (error) {
      this.logger.error('Error initializing Node:', error + error.stack);
    }
  }

  private async curl(module: any, action: any, method: any, argumentData: any) {
    try {

      
      
      const { credentialId, data } = argumentData;
      const credential = await this.intialize(credentialId);
      const { access_token } = credential.token;
      const accountname=credential.accountname;


      let url = `https://${accountname}.kommo.com/api/v4/${module}`;

      
            if (data.Id) {
                url += `/${data.Id}`;
            }


      
      let options: any
      options = {
        method: method,
        url,
        headers: {
          Authorization: `Bearer ${access_token}`,
          accept: 'application/json'
        }
      }


      if (action === 'getMany') {
        if (argumentData) options.params = data.data;
      } else {
        if (argumentData) options.data = data.data;
      }

      const response = await axios(options);
      return { response: response.data, status: response.status };
    }
    catch (error) {
      return error
    }
  }

  private async performamocrmAction(module: string, action: string, method: any, argumentData: any): Promise<any> {
    // TODO: Implement the actual integration logic.
    // For example:
    // 1. Initialize your API client using a refresh token or saved credentials.
    // 2. Validate that 'data' contains required fields (CredentialId, ModuleId, ModuleData).
    // 3. Use the correct HTTP method based on the action (GET, POST, PATCH, DELETE, etc.).
    // 4. Handle errors and return the API response.
    // 5. If the access token is expired, call the refreshToken endpoint.
    const result = await this.curl(module, action, method, argumentData);

    return result;
  }



  private async generateFields(category: string, name: string) {
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

  @Post('get/fields')
  async getfields(@Body() body: any) {
    const { category, name, credentialId } = body;
    try {
      await initializeFields(credentialId);
      const relevantFields = await this.generateFields(category, name);
      return relevantFields;
    } catch (error) {
      return [];
    }
  }
}

export const amController = new amocrmController();

async function initializeFields(data) {
  for (const field of fields) {
    if (typeof field.init === 'function') {
      const dta={credentialId:data,data:{}}
      await field.init(dta);
    }
  }
}