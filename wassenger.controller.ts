// wassenger.controller.ts
// -----------------------------------------------------------------------------
// AUTO-GENERATED CONTROLLER FILE.
// DO NOT modify the auto-generated endpoints below.
// For custom integration logic, extend the helper "performwassengerAction".
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
  import { CredentialController } from 'src/credential/credential.controller';
  import config, { XappName, fields, modules as xappModules } from './wassenger.config';
  
  @Controller('wassenger')
  export class wassengerController {
    private logger = new CustomLogger();
    private CredentialController= new CredentialController();
  
    /**
     * [AUTO-GENERATED] OAuth authorize endpoint.
     * This endpoint initiates the authentication flow.
     * Implement the actual token request and error handling as needed.
     */
    @Post('authorize')
    async authorize(@Body() reqBody: any, @Res() res: Response) {
      if (!reqBody.name || !reqBody.type || !reqBody.apiToken ) {
        throw new HttpException('Missing OAuth parameters', HttpStatus.BAD_REQUEST);
      }
      try {
        const { name, type, apiToken } = reqBody;
        // Construct the OAuth URL.
        // NOTE: Update the URL if your xapp uses a different authentication endpoint.

        const data={
            apiToken
        }

        const credentialRequest={
            name,
            type,
            data
        }

        if(reqBody.id){
            await this.CredentialController.updateCredentials(reqBody.id,data)
            return res.status(HttpStatus.OK).send('Credentials Updated sucessfully')
        }
        else{
            await this.CredentialController.createCredentials(credentialRequest,res)
            return res.status(HttpStatus.OK).send({message:'Authorization completed'})
        }
        // this.logger.debug(`${XappName} auth URL:`, authUrl);
        // return res.status(HttpStatus.OK).send(authUrl);
      } catch (error) {
        this.logger.error('Error in authorize:', error);
        throw new HttpException('Authorization error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  
    /**
     * [AUTO-GENERATED] OAuth callback endpoint.
     * Implement token exchange, credential update, and refreshToken handling here.
     */
    // @Get('callback')
    // async callback(@Req() req: Request, @Res() res: Response) {
    //   try {
    //     const code = req.query.code as string;
    //     // TODO: Implement token exchange using the provided code.
    //     // NOTE: Save the access token and handle refresh token logic.
    //     return res.redirect('https://your.redirect.url');
    //   } catch (error) {
    //     this.logger.error('Error in callback:', error);
    //     throw new HttpException('Callback error', HttpStatus.INTERNAL_SERVER_ERROR);
    //   }
    // }
    
    /**
     * [AUTO-GENERATED] Refresh token endpoint.
     * This endpoint should handle token expiry and refresh the access token.
     * Implement the refresh logic based on your authentication provider.
     */
    // @Post('refreshToken')
    // async refreshToken(@Body() reqBody: any, @Res() res: Response) {
    //   if (!reqBody.refreshToken) {
    //     throw new HttpException('Missing refresh token', HttpStatus.BAD_REQUEST);
    //   }
    //   try {
    //     // TODO: Implement the refresh token logic here.
    //     // Example: Request a new access token using the refresh token.
    //     const newAccessToken = 'new-access-token-placeholder';
    //     return res.status(HttpStatus.OK).json({
    //       message: `${XappName} access token refreshed successfully`,
    //       accessToken: newAccessToken,
    //     });
    //   } catch (error) {
    //     this.logger.error('Error in refreshToken:', error);
    //     throw new HttpException('Refresh token error', HttpStatus.INTERNAL_SERVER_ERROR);
    //   }
    // }
  
//   async AuthError(functionName: string, functionArgs: any[], credentialsId: string, ) {
//     try {
//       await this.refreshToken(credentialsId);
//       const result = await this[functionName](...functionArgs);
//      return result;
//     } catch (error) {
//       this.logger.error('Error refreshing token:', error + error.stack);
//       return error;
//     }
//   }
    
    // ---------------------------------------------------------------------------
    // AUTO-GENERATED ENDPOINTS FOR MODULE ACTIONS (as defined in the blueprint JSON)
    // ---------------------------------------------------------------------------
  
    /**
     * [AUTO-GENERATED] Endpoint for module "message" action "getMany".
     *  - Request Parameters (data): 
     * - CredentialId: string
     * - Filters: object (optional filters for querying records)
     * - Calls the integration helper "performwassengerAction".
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
    
  
    @Post('message/getMany')
    async getmanyMessage(@Body() data: any, @Res() res: Response) {
      if (!data) {
        throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
      }
      try {
        const result = await this.performwassengerAction('messages', 'getMany','GET' ,data);
        return res.status(HttpStatus.OK).json({
          message: `wassenger message getMany executed successfully`,
          result,
        });
      } catch (error) {
        this.logger.error(`Error in message/getMany:`, error);
        throw new HttpException(
          error.message || 'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
  
    /**
     * [AUTO-GENERATED] Endpoint for module "message" action "get".
     *  - Request Parameters (data): 
     * - CredentialId: string
     * - RecordId: string (ID of the record to fetch)
     * - Calls the integration helper "performwassengerAction".
     * DO NOT modify the method signature.
     *  Example usage:
     *  {
    "CredentialId": "your-credential-id",
    "RecordId": "record-id"
  }
     */
    
  
    @Post('message/get')
    async getMessage(@Body() data: any, @Res() res: Response) {
      if (!data) {
        throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
      }
      try {
        const result = await this.performwassengerAction('messages', 'get','GET', data);
        return res.status(HttpStatus.OK).json({
          message: `wassenger message get executed successfully`,
          result,
        });
      } catch (error) {
        this.logger.error(`Error in message/get:`, error);
        throw new HttpException(
          error.message || 'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
  
    /**
     * [AUTO-GENERATED] Endpoint for module "message" action "create".
     *  - Request Parameters (data): 
     * - CredentialId: string
     * - ModuleData: object (data to create)
     * - Calls the integration helper "performwassengerAction".
     * DO NOT modify the method signature.
     *  Example usage:
     *  {
    "CredentialId": "your-credential-id",
    "ModuleData": {
      "field1": "value1",
      "field2": "value2"
    }
  }
     */
    
  
    @Post('message/create')
    async createMessage(@Body() data: any, @Res() res: Response) {
      if (!data) {
        throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
      }
      try {
        const result = await this.performwassengerAction('messages', 'create','POST', data);
        return res.status(HttpStatus.OK).json({
          message: `wassenger message create executed successfully`,
          result,
        });
      } catch (error) {
        this.logger.error(`Error in message/create:`, error);
        throw new HttpException(
          error.message || 'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
  
    /**
     * [AUTO-GENERATED] Endpoint for module "message" action "update".
     *  - Request Parameters (data): 
     * - CredentialId: string
     * - ModuleData: object (data to update)
     * - Calls the integration helper "performwassengerAction".
     * DO NOT modify the method signature.
     *  Example usage:
     *  {
    "CredentialId": "your-credential-id",
    "ModuleData": {
      "field1": "value1",
      "field2": "value2"
    }
  }
     */
    
  
    @Post('message/update')
    async updateMessage(@Body() data: any, @Res() res: Response) {
      if (!data) {
        throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
      }
      try {
        const result = await this.performwassengerAction('messages', 'update','PATCH', data);
        return res.status(HttpStatus.OK).json({
          message: `wassenger message update executed successfully`,
          result,
        });
      } catch (error) {
        this.logger.error(`Error in message/update:`, error);
        throw new HttpException(
          error.message || 'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
  
    /**
     * [AUTO-GENERATED] Endpoint for module "message" action "delete".
     *  - Request Parameters (data): 
     * - CredentialId: string
     * - RecordId: string (ID of the record to delete)
     * - Calls the integration helper "performwassengerAction".
     * DO NOT modify the method signature.
     *  Example usage:
     *  {
    "CredentialId": "your-credential-id",
    "RecordId": "record-id"
  }
     */
    
  
    @Post('message/delete')
    async deleteMessage(@Body() data: any, @Res() res: Response) {
      if (!data) {
        throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
      }
      try {
        const result = await this.performwassengerAction('messages', 'delete','DELETE', data);
        return res.status(HttpStatus.OK).json({
          message: `wassenger message delete executed successfully`,
          result,
        });
      } catch (error) {
        this.logger.error(`Error in message/delete:`, error);
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
     * - Calls the integration helper "performwassengerAction".
     * DO NOT modify the method signature.
     *  Example usage:
     *  {
    "CredentialId": "your-credential-id",
    "RecordId": "record-id"
  }
     */
    
  
    @Post('contact/get')
    async getContact(@Body() data: any, @Res() res: Response) {
      if (!data) {
        throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
      }
      try {
        const result = await this.performwassengerAction('contact', 'get','GET', data);
        return res.status(HttpStatus.OK).json({
          message: `wassenger contact get executed successfully`,
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
     * [AUTO-GENERATED] Endpoint for module "contact" action "create".
     *  - Request Parameters (data): 
     * - CredentialId: string
     * - ModuleData: object (data to create)
     * - Calls the integration helper "performwassengerAction".
     * DO NOT modify the method signature.
     *  Example usage:
     *  {
    "CredentialId": "your-credential-id",
    "ModuleData": {
      "field1": "value1",
      "field2": "value2"
    }
  }
     */
    
  

  //  Required Plans

    @Post('contact/create')
    async createContact(@Body() data: any, @Res() res: Response) {
      if (!data) {
        throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
      }
      try {
        const result = await this.performwassengerAction(`devices/6809f9e8318130ef920c9c4f/block`, 'create','POST', data);
        return res.status(HttpStatus.OK).json({
          message: `wassenger contact create executed successfully`,
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
     * - Calls the integration helper "performwassengerAction".
     * DO NOT modify the method signature.
     *  Example usage:
     *  {
    "CredentialId": "your-credential-id",
    "ModuleData": {
      "field1": "value1",
      "field2": "value2"
    }
  }
     */
    
  
    @Post('contact/update')
    async updateContact(@Body() data: any, @Res() res: Response) {
      if (!data) {
        throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
      }
      try {
        const result = await this.performwassengerAction('contact', 'update','PATCH', data);
        return res.status(HttpStatus.OK).json({
          message: `wassenger contact update executed successfully`,
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
     * - Calls the integration helper "performwassengerAction".
     * DO NOT modify the method signature.
     *  Example usage:
     *  {
    "CredentialId": "your-credential-id",
    "RecordId": "record-id"
  }
     */
    
  
    @Post('contact/delete')
    async deleteContact(@Body() data: any, @Res() res: Response) {
      if (!data) {
        throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
      }
      try {
        const result = await this.performwassengerAction('contact', 'delete','DELETE', data);
        return res.status(HttpStatus.OK).json({
          message: `wassenger contact delete executed successfully`,
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
     * [AUTO-GENERATED] Endpoint for module "contact" action "getMany".
     *  - Request Parameters (data): 
     * - CredentialId: string
     * - Filters: object (optional filters for querying records)
     * - Calls the integration helper "performwassengerAction".
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
    
  
    @Post('contact/getMany')
    async getmanyContact(@Body() data: any, @Res() res: Response) {
      if (!data) {
        throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
      }
      try {
        const result = await this.performwassengerAction('contact', 'getMany','GET', data);
        return res.status(HttpStatus.OK).json({
          message: `wassenger contact getMany executed successfully`,
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
  
    //  Device 
     /**
     * [AUTO-GENERATED] Endpoint for module "campaigns" action "get".
     *  - Request Parameters (data): 
     * - CredentialId: string
     * - RecordId: string (ID of the record to fetch)
     * - Calls the integration helper "performwassengerAction".
     * DO NOT modify the method signature.
     *  Example usage:
     *  {
    "CredentialId": "your-credential-id",
    "RecordId": "record-id"
  }
     */
    
  
    @Post('device/get')
    async getDevice(@Body() data: any, @Res() res: Response) {
      if (!data) {
        throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
      }
      try {
        const result = await this.performwassengerAction('devices', 'get','GET', data);
        return res.status(HttpStatus.OK).json({
          message: `wassenger campaigns get executed successfully`,
          result,
        });
      } catch (error) {
        this.logger.error(`Error in campaigns/get:`, error);
        throw new HttpException(
          error.message || 'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
  
    /**
     * [AUTO-GENERATED] Endpoint for module "campaigns" action "get".
     *  - Request Parameters (data): 
     * - CredentialId: string
     * - RecordId: string (ID of the record to fetch)
     * - Calls the integration helper "performwassengerAction".
     * DO NOT modify the method signature.
     *  Example usage:
     *  {
    "CredentialId": "your-credential-id",
    "RecordId": "record-id"
  }
     */
    
  
    @Post('campaigns/get')
    async getCampaigns(@Body() data: any, @Res() res: Response) {
      if (!data) {
        throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
      }
      try {
        const result = await this.performwassengerAction('campaigns', 'get','GET', data);
        return res.status(HttpStatus.OK).json({
          message: `wassenger campaigns get executed successfully`,
          result,
        });
      } catch (error) {
        this.logger.error(`Error in campaigns/get:`, error);
        throw new HttpException(
          error.message || 'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
  
    /**
     * [AUTO-GENERATED] Endpoint for module "campaigns" action "create".
     *  - Request Parameters (data): 
     * - CredentialId: string
     * - ModuleData: object (data to create)
     * - Calls the integration helper "performwassengerAction".
     * DO NOT modify the method signature.
     *  Example usage:
     *  {
    "CredentialId": "your-credential-id",
    "ModuleData": {
      "field1": "value1",
      "field2": "value2"
    }
  }
     */
    
  
    @Post('campaigns/create')
    async createCampaigns(@Body() data: any, @Res() res: Response) {
      if (!data) {
        throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
      }
      try {
        const result = await this.performwassengerAction('campaigns', 'create','POST', data);
        return res.status(HttpStatus.OK).json({
          message: `wassenger campaigns create executed successfully`,
          result,
        });
      } catch (error) {
        this.logger.error(`Error in campaigns/create:`, error);
        throw new HttpException(
          error.message || 'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
  
    /**
     * [AUTO-GENERATED] Endpoint for module "campaigns" action "update".
     *  - Request Parameters (data): 
     * - CredentialId: string
     * - ModuleData: object (data to update)
     * - Calls the integration helper "performwassengerAction".
     * DO NOT modify the method signature.
     *  Example usage:
     *  {
    "CredentialId": "your-credential-id",
    "ModuleData": {
      "field1": "value1",
      "field2": "value2"
    }
  }
     */
    
  
    @Post('campaigns/update')
    async updateCampaigns(@Body() data: any, @Res() res: Response) {
      if (!data) {
        throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
      }
      try {
        const result = await this.performwassengerAction('campaigns', 'update','PATCH', data);
        return res.status(HttpStatus.OK).json({
          message: `wassenger campaigns update executed successfully`,
          result,
        });
      } catch (error) {
        this.logger.error(`Error in campaigns/update:`, error);
        throw new HttpException(
          error.message || 'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
  
    /**
     * [AUTO-GENERATED] Endpoint for module "campaigns" action "delete".
     *  - Request Parameters (data): 
     * - CredentialId: string
     * - RecordId: string (ID of the record to delete)
     * - Calls the integration helper "performwassengerAction".
     * DO NOT modify the method signature.
     *  Example usage:
     *  {
    "CredentialId": "your-credential-id",
    "RecordId": "record-id"
  }
     */
    
  
    @Post('campaigns/delete')
    async deleteCampaigns(@Body() data: any, @Res() res: Response) {
      if (!data) {
        throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
      }
      try {
        const result = await this.performwassengerAction('campaigns', 'delete','DELETE', data);
        return res.status(HttpStatus.OK).json({
          message: `wassenger campaigns delete executed successfully`,
          result,
        });
      } catch (error) {
        this.logger.error(`Error in campaigns/delete:`, error);
        throw new HttpException(
          error.message || 'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
  
    /**
     * [AUTO-GENERATED] Endpoint for module "campaigns" action "getMany".
     *  - Request Parameters (data): 
     * - CredentialId: string
     * - Filters: object (optional filters for querying records)
     * - Calls the integration helper "performwassengerAction".
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
    
  
    @Post('campaigns/getMany')
    async getmanyCampaigns(@Body() data: any, @Res() res: Response) {
      if (!data) {
        throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
      }
      try {
        const result = await this.performwassengerAction('campaigns', 'getMany','GET', data);
        return res.status(HttpStatus.OK).json({
          message: `wassenger campaigns getMany executed successfully`,
          result,
        });
      } catch (error) {
        this.logger.error(`Error in campaigns/getMany:`, error);
        throw new HttpException(
          error.message || 'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
  
    /**
     * [AUTO-GENERATED] Endpoint for module "label" action "create".
     *  - Request Parameters (data): 
     * - CredentialId: string
     * - ModuleData: object (data to create)
     * - Calls the integration helper "performwassengerAction".
     * DO NOT modify the method signature.
     *  Example usage:
     *  {
    "CredentialId": "your-credential-id",
    "ModuleData": {
      "field1": "value1",
      "field2": "value2"
    }
  }
     */


  //    Required Payments
    
  
    @Post('label/create')
    async createLabel(@Body() data: any, @Res() res: Response) {
      if (!data) {
        throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
      }
      try {
        const result = await this.performwassengerAction(`devices/${data.data.deviceId}/labels`, 'create','POST', data);
        return res.status(HttpStatus.OK).json({
          message: `wassenger label create executed successfully`,
          result,
        });
      } catch (error) {
        this.logger.error(`Error in label/create:`, error);
        throw new HttpException(
          error.message || 'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
  
    /**
     * [AUTO-GENERATED] Endpoint for module "label" action "update".
     *  - Request Parameters (data): 
     * - CredentialId: string
     * - ModuleData: object (data to update)
     * - Calls the integration helper "performwassengerAction".
     * DO NOT modify the method signature.
     *  Example usage:
     *  {
    "CredentialId": "your-credential-id",
    "ModuleData": {
      "field1": "value1",
      "field2": "value2"
    }
  }
     */
    
  
    @Post('label/update')
    async updateLabel(@Body() data: any, @Res() res: Response) {
      if (!data) {
        throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
      }
      try {
        const result = await this.performwassengerAction('label', 'update','GET', data);
        return res.status(HttpStatus.OK).json({
          message: `wassenger label update executed successfully`,
          result,
        });
      } catch (error) {
        this.logger.error(`Error in label/update:`, error);
        throw new HttpException(
          error.message || 'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
  
    /**
     * [AUTO-GENERATED] Endpoint for module "label" action "delete".
     *  - Request Parameters (data): 
     * - CredentialId: string
     * - RecordId: string (ID of the record to delete)
     * - Calls the integration helper "performwassengerAction".
     * DO NOT modify the method signature.
     *  Example usage:
     *  {
    "CredentialId": "your-credential-id",
    "RecordId": "record-id"
  }
     */
    
  
    @Post('label/delete')
    async deleteLabel(@Body() data: any, @Res() res: Response) {
      if (!data) {
        throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
      }
      try {
        const result = await this.performwassengerAction('label', 'delete','GET', data);
        return res.status(HttpStatus.OK).json({
          message: `wassenger label delete executed successfully`,
          result,
        });
      } catch (error) {
        this.logger.error(`Error in label/delete:`, error);
        throw new HttpException(
          error.message || 'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
  
    /**
     * [AUTO-GENERATED] Endpoint for module "label" action "getMany".
     *  - Request Parameters (data): 
     * - CredentialId: string
     * - Filters: object (optional filters for querying records)
     * - Calls the integration helper "performwassengerAction".
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
    
  
    @Post('label/getMany')
    async getmanyLabel(@Body() data: any, @Res() res: Response) {
      if (!data) {
        throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
      }
      try {
        const result = await this.performwassengerAction('label', 'getMany','GET', data);
        return res.status(HttpStatus.OK).json({
          message: `wassenger label getMany executed successfully`,
          result,
        });
      } catch (error) {
        this.logger.error(`Error in label/getMany:`, error);
        throw new HttpException(
          error.message || 'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
  
    /**
     * [AUTO-GENERATED] Endpoint for module "user" action "get".
     *  - Request Parameters (data): 
     * - CredentialId: string
     * - RecordId: string (ID of the record to fetch)
     * - Calls the integration helper "performwassengerAction".
     * DO NOT modify the method signature.
     *  Example usage:
     *  {
    "CredentialId": "your-credential-id",
    "RecordId": "record-id"
  }
     */


  
  //    Required Payments
    
  
    @Post('user/get')
    async getUser(@Body() data: any, @Res() res: Response) {
      if (!data) {
        throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
      }
      try {
        const result = await this.performwassengerAction('user', 'get','GET', data);
        return res.status(HttpStatus.OK).json({
          message: `wassenger user get executed successfully`,
          result,
        });
      } catch (error) {
        this.logger.error(`Error in user/get:`, error);
        throw new HttpException(
          error.message || 'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
  
    /**
     * [AUTO-GENERATED] Endpoint for module "user" action "create".
     *  - Request Parameters (data): 
     * - CredentialId: string
     * - ModuleData: object (data to create)
     * - Calls the integration helper "performwassengerAction".
     * DO NOT modify the method signature.
     *  Example usage:
     *  {
    "CredentialId": "your-credential-id",
    "ModuleData": {
      "field1": "value1",
      "field2": "value2"
    }
  }
     */
    
  
    @Post('user/create')
    async createUser(@Body() data: any, @Res() res: Response) {
      if (!data) {
        throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
      }
      try {
        const result = await this.performwassengerAction(`devices/${data.data.deviceId}/team `, 'create','POST', data);
        return res.status(HttpStatus.OK).json({
          message: `wassenger user create executed successfully`,
          result,
        });
      } catch (error) {
        this.logger.error(`Error in user/create:`, error);
        throw new HttpException(
          error.message || 'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
  
    /**
     * [AUTO-GENERATED] Endpoint for module "user" action "update".
     *  - Request Parameters (data): 
     * - CredentialId: string
     * - ModuleData: object (data to update)
     * - Calls the integration helper "performwassengerAction".
     * DO NOT modify the method signature.
     *  Example usage:
     *  {
    "CredentialId": "your-credential-id",
    "ModuleData": {
      "field1": "value1",
      "field2": "value2"
    }
  }
     */
    
  
    @Post('user/update')
    async updateUser(@Body() data: any, @Res() res: Response) {
      if (!data) {
        throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
      }
      try {
        const result = await this.performwassengerAction('user', 'update','GET', data);
        return res.status(HttpStatus.OK).json({
          message: `wassenger user update executed successfully`,
          result,
        });
      } catch (error) {
        this.logger.error(`Error in user/update:`, error);
        throw new HttpException(
          error.message || 'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
  
    /**
     * [AUTO-GENERATED] Endpoint for module "user" action "delete".
     *  - Request Parameters (data): 
     * - CredentialId: string
     * - RecordId: string (ID of the record to delete)
     * - Calls the integration helper "performwassengerAction".
     * DO NOT modify the method signature.
     *  Example usage:
     *  {
    "CredentialId": "your-credential-id",
    "RecordId": "record-id"
  }
     */
    
  
    @Post('user/delete')
    async deleteUser(@Body() data: any, @Res() res: Response) {
      if (!data) {
        throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
      }
      try {
        const result = await this.performwassengerAction('user', 'delete','GET', data);
        return res.status(HttpStatus.OK).json({
          message: `wassenger user delete executed successfully`,
          result,
        });
      } catch (error) {
        this.logger.error(`Error in user/delete:`, error);
        throw new HttpException(
          error.message || 'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
  
    /**
     * [AUTO-GENERATED] Endpoint for module "user" action "getMany".
     *  - Request Parameters (data): 
     * - CredentialId: string
     * - Filters: object (optional filters for querying records)
     * - Calls the integration helper "performwassengerAction".
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
    
  
    @Post('user/getMany')
    async getmanyUser(@Body() data: any, @Res() res: Response) {
      if (!data) {
        throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
      }
      try {
        const result = await this.performwassengerAction('user', 'getMany','GET', data);
        return res.status(HttpStatus.OK).json({
          message: `wassenger user getMany executed successfully`,
          result,
        });
      } catch (error) {
        this.logger.error(`Error in user/getMany:`, error);
        throw new HttpException(
          error.message || 'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
  
    /**
     * [AUTO-GENERATED] Endpoint for module "chatmessages" action "get".
     *  - Request Parameters (data): 
     * - CredentialId: string
     * - RecordId: string (ID of the record to fetch)
     * - Calls the integration helper "performwassengerAction".
     * DO NOT modify the method signature.
     *  Example usage:
     *  {
    "CredentialId": "your-credential-id",
    "RecordId": "record-id"
  }
     */

  
  //    Required Payments
    
  
    @Post('chatmessages/get')
    async getChatmessages(@Body() data: any, @Res() res: Response) {
      if (!data) {
        throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
      }
      try {
        const result = await this.performwassengerAction(`chat/${data.data.deviceId}/messages`, 'get','GET', data);
        return res.status(HttpStatus.OK).json({
          message: `wassenger chatmessages get executed successfully`,
          result,
        });
      } catch (error) {
        this.logger.error(`Error in chatmessages/get:`, error);
        throw new HttpException(
          error.message || 'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
  
    /**
     * [AUTO-GENERATED] Endpoint for module "chatmessages" action "search".
     *  - Request Parameters (data): 
     * - CredentialId: string
     * - ModuleData: object (action-specific data)
     * - Calls the integration helper "performwassengerAction".
     * DO NOT modify the method signature.
     *  Example usage:
     *  {
    "CredentialId": "your-credential-id",
    "ModuleData": {
      "key": "value"
    }
  }
     */
    
  
    @Post('chatmessages/search')
    async searchChatmessages(@Body() data: any, @Res() res: Response) {
      if (!data) {
        throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
      }
      try {
        const result = await this.performwassengerAction('chatmessages', 'search','GET', data);
        return res.status(HttpStatus.OK).json({
          message: `wassenger chatmessages search executed successfully`,
          result,
        });
      } catch (error) {
        this.logger.error(`Error in chatmessages/search:`, error);
        throw new HttpException(
          error.message || 'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
  
    /**
     * [AUTO-GENERATED] Endpoint for module "chatmessages" action "update".
     *  - Request Parameters (data): 
     * - CredentialId: string
     * - ModuleData: object (data to update)
     * - Calls the integration helper "performwassengerAction".
     * DO NOT modify the method signature.
     *  Example usage:
     *  {
    "CredentialId": "your-credential-id",
    "ModuleData": {
      "field1": "value1",
      "field2": "value2"
    }
  }
     */
    
  
    @Post('chatmessages/update')
    async updateChatmessages(@Body() data: any, @Res() res: Response) {
      if (!data) {
        throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
      }
      try {
        const result = await this.performwassengerAction('chatmessages', 'update','GET', data);
        return res.status(HttpStatus.OK).json({
          message: `wassenger chatmessages update executed successfully`,
          result,
        });
      } catch (error) {
        this.logger.error(`Error in chatmessages/update:`, error);
        throw new HttpException(
          error.message || 'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
  
    /**
     * [AUTO-GENERATED] Endpoint for module "chatmessages" action "delete".
     *  - Request Parameters (data): 
     * - CredentialId: string
     * - RecordId: string (ID of the record to delete)
     * - Calls the integration helper "performwassengerAction".
     * DO NOT modify the method signature.
     *  Example usage:
     *  {
    "CredentialId": "your-credential-id",
    "RecordId": "record-id"
  }
     */
    
  
    @Post('chatmessages/delete')
    async deleteChatmessages(@Body() data: any, @Res() res: Response) {
      if (!data) {
        throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
      }
      try {
        const result = await this.performwassengerAction('chatmessages', 'delete','GET', data);
        return res.status(HttpStatus.OK).json({
          message: `wassenger chatmessages delete executed successfully`,
          result,
        });
      } catch (error) {
        this.logger.error(`Error in chatmessages/delete:`, error);
        throw new HttpException(
          error.message || 'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
  
    /**
     * [AUTO-GENERATED] Endpoint for module "chat" action "get".
     *  - Request Parameters (data): 
     * - CredentialId: string
     * - RecordId: string (ID of the record to fetch)
     * - Calls the integration helper "performwassengerAction".
     * DO NOT modify the method signature.
     *  Example usage:
     *  {
    "CredentialId": "your-credential-id",
    "RecordId": "record-id"
  }
     */
    

  
  //    Required Payments
  
    @Post('chat/get')
    async getChat(@Body() data: any, @Res() res: Response) {
      if (!data) {
        throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
      }
      try {
        const result = await this.performwassengerAction('chat', 'get','GET', data);
        return res.status(HttpStatus.OK).json({
          message: `wassenger chat get executed successfully`,
          result,
        });
      } catch (error) {
        this.logger.error(`Error in chat/get:`, error);
        throw new HttpException(
          error.message || 'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
  
    /**
     * [AUTO-GENERATED] Endpoint for module "chat" action "delete".
     *  - Request Parameters (data): 
     * - CredentialId: string
     * - RecordId: string (ID of the record to delete)
     * - Calls the integration helper "performwassengerAction".
     * DO NOT modify the method signature.
     *  Example usage:
     *  {
    "CredentialId": "your-credential-id",
    "RecordId": "record-id"
  }
     */
    
  
    @Post('chat/delete')
    async deleteChat(@Body() data: any, @Res() res: Response) {
      if (!data) {
        throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
      }
      try {
        const result = await this.performwassengerAction('chat', 'delete','GET', data);
        return res.status(HttpStatus.OK).json({
          message: `wassenger chat delete executed successfully`,
          result,
        });
      } catch (error) {
        this.logger.error(`Error in chat/delete:`, error);
        throw new HttpException(
          error.message || 'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
  
    /**
     * [AUTO-GENERATED] Endpoint for module "chat" action "sync".
     *  - Request Parameters (data): 
     * - CredentialId: string
     * - ModuleData: object (action-specific data)
     * - Calls the integration helper "performwassengerAction".
     * DO NOT modify the method signature.
     *  Example usage:
     *  {
    "CredentialId": "your-credential-id",
    "ModuleData": {
      "key": "value"
    }
  }
     */
    
  
    @Post('chat/sync')
    async syncChat(@Body() data: any, @Res() res: Response) {
      if (!data) {
        throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
      }
      try {
        const result = await this.performwassengerAction(`chat/6809f9e8318130ef920c9c4f/sync?size=100&messages=100`, 'sync','POST', data);
        return res.status(HttpStatus.OK).json({
          message: `wassenger chat sync executed successfully`,
          result,
        });
      } catch (error) {
        this.logger.error(`Error in chat/sync:`, error);
        throw new HttpException(
          error.message || 'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
  
    /**
     * [AUTO-GENERATED] Endpoint for module "chat" action "assign".
     *  - Request Parameters (data): 
     * - CredentialId: string
     * - ModuleData: object (action-specific data)
     * - Calls the integration helper "performwassengerAction".
     * DO NOT modify the method signature.
     *  Example usage:
     *  {
    "CredentialId": "your-credential-id",
    "ModuleData": {
      "key": "value"
    }
  }
     */
    
  
    @Post('chat/assign')
    async assignChat(@Body() data: any, @Res() res: Response) {
      if (!data) {
        throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
      }
      try {
        const result = await this.performwassengerAction('chat', 'assign','GET', data);
        return res.status(HttpStatus.OK).json({
          message: `wassenger chat assign executed successfully`,
          result,
        });
      } catch (error) {
        this.logger.error(`Error in chat/assign:`, error);
        throw new HttpException(
          error.message || 'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
  
    /**
     * [AUTO-GENERATED] Endpoint for module "chat" action "unassign".
     *  - Request Parameters (data): 
     * - CredentialId: string
     * - ModuleData: object (action-specific data)
     * - Calls the integration helper "performwassengerAction".
     * DO NOT modify the method signature.
     *  Example usage:
     *  {
    "CredentialId": "your-credential-id",
    "ModuleData": {
      "key": "value"
    }
  }
     */
    
  
    @Post('chat/unassign')
    async unassignChat(@Body() data: any, @Res() res: Response) {
      if (!data) {
        throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
      }
      try {
        const result = await this.performwassengerAction('chat', 'unassign','GET', data);
        return res.status(HttpStatus.OK).json({
          message: `wassenger chat unassign executed successfully`,
          result,
        });
      } catch (error) {
        this.logger.error(`Error in chat/unassign:`, error);
        throw new HttpException(
          error.message || 'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
  
    /**
     * [AUTO-GENERATED] Endpoint for module "invoice" action "getMany".
     *  - Request Parameters (data): 
     * - CredentialId: string
     * - Filters: object (optional filters for querying records)
     * - Calls the integration helper "performwassengerAction".
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
    
  
    @Post('invoice/getMany')
    async getmanyInvoice(@Body() data: any, @Res() res: Response) {
      if (!data) {
        throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
      }
      try {
        const result = await this.performwassengerAction(`devices/6809f9e8318130ef920c9c4f/invoices `, 'getMany','GET', data);
        return res.status(HttpStatus.OK).json({
          message: `wassenger invoice getMany executed successfully`,
          result,
        });
      } catch (error) {
        this.logger.error(`Error in invoice/getMany:`, error);
        throw new HttpException(
          error.message || 'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
  
    /**
     * [AUTO-GENERATED] Endpoint for module "department" action "get".
     *  - Request Parameters (data): 
     * - CredentialId: string
     * - RecordId: string (ID of the record to fetch)
     * - Calls the integration helper "performwassengerAction".
     * DO NOT modify the method signature.
     *  Example usage:
     *  {
    "CredentialId": "your-credential-id",
    "RecordId": "record-id"
  }
     */


  //  Required Payment
    
  
    @Post('department/get')
    async getDepartment(@Body() data: any, @Res() res: Response) {
      if (!data) {
        throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
      }
      try {
        const result = await this.performwassengerAction('department', 'get','GET', data);
        return res.status(HttpStatus.OK).json({
          message: `wassenger department get executed successfully`,
          result,
        });
      } catch (error) {
        this.logger.error(`Error in department/get:`, error);
        throw new HttpException(
          error.message || 'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
  
    /**
     * [AUTO-GENERATED] Endpoint for module "department" action "create".
     *  - Request Parameters (data): 
     * - CredentialId: string
     * - ModuleData: object (data to create)
     * - Calls the integration helper "performwassengerAction".
     * DO NOT modify the method signature.
     *  Example usage:
     *  {
    "CredentialId": "your-credential-id",
    "ModuleData": {
      "field1": "value1",
      "field2": "value2"
    }
  }
     */
    
  
    @Post('department/create')
    async createDepartment(@Body() data: any, @Res() res: Response) {
      if (!data) {
        throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
      }
      try {
        const result = await this.performwassengerAction(`devices/6809f9e8318130ef920c9c4f/departments`, 'create','POST', data);
        return res.status(HttpStatus.OK).json({
          message: `wassenger department create executed successfully`,
          result,
        });
      } catch (error) {
        this.logger.error(`Error in department/create:`, error);
        throw new HttpException(
          error.message || 'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
  
    /**
     * [AUTO-GENERATED] Endpoint for module "department" action "update".
     *  - Request Parameters (data): 
     * - CredentialId: string
     * - ModuleData: object (data to update)
     * - Calls the integration helper "performwassengerAction".
     * DO NOT modify the method signature.
     *  Example usage:
     *  {
    "CredentialId": "your-credential-id",
    "ModuleData": {
      "field1": "value1",
      "field2": "value2"
    }
  }
     */
    
  
    @Post('department/update')
    async updateDepartment(@Body() data: any, @Res() res: Response) {
      if (!data) {
        throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
      }
      try {
        const result = await this.performwassengerAction('department', 'update','GET', data);
        return res.status(HttpStatus.OK).json({
          message: `wassenger department update executed successfully`,
          result,
        });
      } catch (error) {
        this.logger.error(`Error in department/update:`, error);
        throw new HttpException(
          error.message || 'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
  
    /**
     * [AUTO-GENERATED] Endpoint for module "department" action "delete".
     *  - Request Parameters (data): 
     * - CredentialId: string
     * - RecordId: string (ID of the record to delete)
     * - Calls the integration helper "performwassengerAction".
     * DO NOT modify the method signature.
     *  Example usage:
     *  {
    "CredentialId": "your-credential-id",
    "RecordId": "record-id"
  }
     */
    
  
    @Post('department/delete')
    async deleteDepartment(@Body() data: any, @Res() res: Response) {
      if (!data) {
        throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
      }
      try {
        const result = await this.performwassengerAction('department', 'delete','GET', data);
        return res.status(HttpStatus.OK).json({
          message: `wassenger department delete executed successfully`,
          result,
        });
      } catch (error) {
        this.logger.error(`Error in department/delete:`, error);
        throw new HttpException(
          error.message || 'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
  
    /**
     * [AUTO-GENERATED] Endpoint for module "department" action "getMany".
     *  - Request Parameters (data): 
     * - CredentialId: string
     * - Filters: object (optional filters for querying records)
     * - Calls the integration helper "performwassengerAction".
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
    
  
    @Post('department/getMany')
    async getmanyDepartment(@Body() data: any, @Res() res: Response) {
      if (!data) {
        throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
      }
      try {
        const result = await this.performwassengerAction('department', 'getMany','GET', data);
        return res.status(HttpStatus.OK).json({
          message: `wassenger department getMany executed successfully`,
          result,
        });
      } catch (error) {
        this.logger.error(`Error in department/getMany:`, error);
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
     * - Calls the integration helper "performwassengerAction".
     * DO NOT modify the method signature.
     *  Example usage:
     *  {
    "CredentialId": "your-credential-id",
    "ModuleData": {
      "field1": "value1",
      "field2": "value2"
    }
  }
     */


  //  Required Payments

    
  
    @Post('note/create')
    async createNote(@Body() data: any, @Res() res: Response) {
      if (!data) {
        throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
      }
      try {
        const result = await this.performwassengerAction('note', 'create','GET', data);
        return res.status(HttpStatus.OK).json({
          message: `wassenger note create executed successfully`,
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
     * [AUTO-GENERATED] Endpoint for module "note" action "delete".
     *  - Request Parameters (data): 
     * - CredentialId: string
     * - RecordId: string (ID of the record to delete)
     * - Calls the integration helper "performwassengerAction".
     * DO NOT modify the method signature.
     *  Example usage:
     *  {
    "CredentialId": "your-credential-id",
    "RecordId": "record-id"
  }
     */
    
  
    @Post('note/delete')
    async deleteNote(@Body() data: any, @Res() res: Response) {
      if (!data) {
        throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
      }
      try {
        const result = await this.performwassengerAction('note', 'delete','GET', data);
        return res.status(HttpStatus.OK).json({
          message: `wassenger note delete executed successfully`,
          result,
        });
      } catch (error) {
        this.logger.error(`Error in note/delete:`, error);
        throw new HttpException(
          error.message || 'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }

    
    /**
     * [AUTO-GENERATED] Endpoint for module "webhook" action "getMany".
     *  - Request Parameters (data): 
     * - CredentialId: string
     * - RecordId: string (ID of the record to fetch)
     * - Calls the integration helper "performwassengerAction".
     * DO NOT modify the method signature.
     *  Example usage:
     *  {
    "CredentialId": "your-credential-id",
    "RecordId": "record-id"
  }
     */
    
  
  @Post('webhook/getMany')
  async getManyWebhook(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performwassengerAction('webhooks', 'getMany','GET', data);
      return res.status(HttpStatus.OK).json({
        message: `wassenger webhook get executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in webhook/get:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  
    /**
     * [AUTO-GENERATED] Endpoint for module "webhook" action "get".
     *  - Request Parameters (data): 
     * - CredentialId: string
     * - RecordId: string (ID of the record to fetch)
     * - Calls the integration helper "performwassengerAction".
     * DO NOT modify the method signature.
     *  Example usage:
     *  {
    "CredentialId": "your-credential-id",
    "RecordId": "record-id"
  }
     */
    
  
    @Post('webhook/get')
    async getWebhook(@Body() data: any, @Res() res: Response) {
      if (!data) {
        throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
      }
      try {
        const result = await this.performwassengerAction('webhooks', 'get','GET', data);
        return res.status(HttpStatus.OK).json({
          message: `wassenger webhook get executed successfully`,
          result,
        });
      } catch (error) {
        this.logger.error(`Error in webhook/get:`, error);
        throw new HttpException(
          error.message || 'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
  
    /**
     * [AUTO-GENERATED] Endpoint for module "webhook" action "create".
     *  - Request Parameters (data): 
     * - CredentialId: string
     * - ModuleData: object (data to create)
     * - Calls the integration helper "performwassengerAction".
     * DO NOT modify the method signature.
     *  Example usage:
     *  {
    "CredentialId": "your-credential-id",
    "ModuleData": {
      "field1": "value1",
      "field2": "value2"
    }
  }
     */
    
  
    @Post('webhook/create')
    async createWebhook(@Body() data: any, @Res() res: Response) {
      if (!data) {
        throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
      }
      try {
        const result = await this.performwassengerAction('webhooks', 'create','POST', data);
        return res.status(HttpStatus.OK).json({
          message: `wassenger webhook create executed successfully`,
          result,
        });
      } catch (error) {
        this.logger.error(`Error in webhook/create:`, error);
        throw new HttpException(
          error.message || 'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
  
    /**
     * [AUTO-GENERATED] Endpoint for module "webhook" action "update".
     *  - Request Parameters (data): 
     * - CredentialId: string
     * - ModuleData: object (data to update)
     * - Calls the integration helper "performwassengerAction".
     * DO NOT modify the method signature.
     *  Example usage:
     *  {
    "CredentialId": "your-credential-id",
    "ModuleData": {
      "field1": "value1",
      "field2": "value2"
    }
  }
     */
    
  
    @Post('webhook/update')
    async updateWebhook(@Body() data: any, @Res() res: Response) {
      if (!data) {
        throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
      }
      try {
        const result = await this.performwassengerAction(`webhooks/${data.data.id}`, 'update','PATCH', data);
        return res.status(HttpStatus.OK).json({
          message: `wassenger webhook update executed successfully`,
          result,
        });
      } catch (error) {
        this.logger.error(`Error in webhook/update:`, error);
        throw new HttpException(
          error.message || 'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
  
    /**
     * [AUTO-GENERATED] Endpoint for module "webhook" action "delete".
     *  - Request Parameters (data): 
     * - CredentialId: string
     * - RecordId: string (ID of the record to delete)
     * - Calls the integration helper "performwassengerAction".
     * DO NOT modify the method signature.
     *  Example usage:
     *  {
    "CredentialId": "your-credential-id",
    "RecordId": "record-id"
  }
     */
    
  
    @Post('webhook/delete')
    async deleteWebhook(@Body() data: any, @Res() res: Response) {
      if (!data) {
        throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
      }
      try {
        const result = await this.performwassengerAction(`webhooks/${data.data.id}`, 'delete','DELETE', data);
        return res.status(HttpStatus.OK).json({
          message: `wassenger webhook delete executed successfully`,
          result,
        });
      } catch (error) {
        this.logger.error(`Error in webhook/delete:`, error);
        throw new HttpException(
          error.message || 'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }


    //  GetMany

    async getAllMessage(@Body() data: any) {
      if (!data) {
        throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
      }
      try {
        const result = await this.performwassengerAction('messages', 'getMany','GET' ,data);
        return {response:result.response.map(response=>({value:response.id,phone:response.phone}))}

        
      } catch (error) {
        this.logger.error(`Error in message/getMany:`, error);
        throw new HttpException(
          error.message || 'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
  

    async getAllCampaigns(@Body() data: any) {
      if (!data) {
        throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
      }
      try {
        const result = await this.performwassengerAction('campaigns', 'getMany','GET', data);
        return {response:result.response.map(response=>({value:response.id,name:response.name}))}


      } catch (error) {
        this.logger.error(`Error in campaigns/getMany:`, error);
        throw new HttpException(
          error.message || 'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }

    async getAllInvoice(@Body() data: any) {
      if (!data) {
        throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
      }
      try {
        const result = await this.performwassengerAction(`devices/6809f9e8318130ef920c9c4f/invoices `, 'getMany','GET', data);
        return {response:result.response.map(response=>({value:response.id,name:response.device}))}


      } catch (error) {
        this.logger.error(`Error in invoice/getMany:`, error);
        throw new HttpException(
          error.message || 'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }

    async getAllWebhook(@Body() data: any) {
      if (!data) {
        throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
      }
      try {
        const result = await this.performwassengerAction('webhooks', 'getMany','GET', data);
        return {response:result.response.map(response=>({value:response.id,name:response.name}))}

      } catch (error) {
        this.logger.error(`Error in webhook/get:`, error);
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

          const apiToken= credentialRepository.authData.apiToken

          console.log('api',apiToken)

          return apiToken
     
     
        } catch (error) {
          this.logger.error('Error initializing Node:', error + error.stack);
        }
      }
    
  
  
    /**
     * [AUTO-GENERATED] Helper method to perform a wassenger action.
     * This method is a stub—extend it to integrate with the actual API for your xapp.
     *
     * Validations:
     * - Ensure that the provided module and action are supported.
     * - Validate the "data" structure as needed.
     *
     * DO NOT change the method signature.
     */
    private async performwassengerAction(module: string, action: string,method:string, data: any): Promise<any> {
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
  public async curl(module: string, action: string, method: string, argumentdata: any): Promise<any> {

    try {
      const { credentialId, data } = argumentdata;
      const initializeData: any = await this.initialize(credentialId)

      const apiToken= initializeData;


      const baseUrl = `https://api.wassenger.com/v1/`
      let url = `${baseUrl}${module}`

      if (data.Id) { url += `/${data.Id}` }


      const options: any = {
        method, url, headers: {
          "Token":`${apiToken}`,
          "Content-Type": "application/json"
        }
      };
      if (action === 'getMany') {
        if (argumentdata) options.params = data
      }
      else {
        if (argumentdata) options.data = data.data
      }
      console.log(options)
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
        
        
                    const relevantFields = await this.generateFields(category, name, data, );
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
      export const Was= new wassengerController()
      
    
  
  