// chative .controller.ts
// -----------------------------------------------------------------------------
// AUTO-GENERATED CONTROLLER FILE.
// DO NOT modify the auto-generated endpoints below.
// For custom integration logic, extend the helper "performChativeAction".
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
import { CredentialController } from 'src/credential/credential.controller';
import { CustomLogger } from '../../logger/custom.logger';
import config, { XappName, modules as xappModules } from './chative .config';

@Controller('chative')
export class ChativeController {
  private logger = new CustomLogger();

  private CredentialController = new CredentialController()

  /**
   * [AUTO-GENERATED] OAuth authorize endpoint.
   * This endpoint initiates the authentication flow.
   * Implement the actual token request and error handling as needed.
   */
   @Post('authorize')
  async authorize(@Body() reqBody: any, @Res() res: Response) {
    if (!reqBody.apikey ||!reqBody.type || !reqBody.name) {
      throw new HttpException('Missing  parameters', HttpStatus.BAD_REQUEST);
    }

    try {
      const { apikey, name, type,id } = reqBody;

      const data = {
        token: {
          apikey: apikey,
         
        }
      }

      const Credentials = {
        data,
        name,
        type
      }
      if (reqBody.id) {
        await this.CredentialController.updateCredentials(reqBody.id, data)
        this.logger.debug('Credentials with Id updated Sucessfully', reqBody.id)
        return res.status(HttpStatus.CREATED).send({ message: "Authorization Updated Sucessfully Completed" })
      }
      else {
        await this.CredentialController.createCredentials(Credentials, res)
        return res.status(HttpStatus.CREATED).send({ message: "Authorization Sucessfully Completed" })
      }
    }
    catch (error) {
      throw new HttpException("Authorization Error", HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }


  
  // ---------------------------------------------------------------------------
  // AUTO-GENERATED ENDPOINTS FOR MODULE ACTIONS (as defined in the blueprint JSON)
  // ---------------------------------------------------------------------------

  /**
   * [AUTO-GENERATED] Endpoint for module "contacts" action "update".
   *  - Request Parameters (data): 
   * - credentialId: string
   * - data: object (data to update)
   * - Calls the integration helper "performChativeAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId":"{{credentialId}}",
    "data":{
        "Id":"183ccf94-3111-480f-8b12-4d19d65d3c78",
        "data":{
  "firstName": "Sanjay",
  "lastName": "kumar",
  "email": "sanjubai1235@gmail.com",
  "gender": "male",
  "phone": "8925614258",
  "birthday":"09/10/2003"
}
    }
}
   */


  

  @Post('contacts/update')
  async updateContacts(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performChativeAction(`contacts`, 'update','PATCH', data);
      return res.status(HttpStatus.OK).json({
        message: `Chative  contacts update executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in contacts/update:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "contacts" action "get".
   *  - Request Parameters (data): 
   * - credentialId: string
   * - data: string (ID of the record to fetch)
   * - Calls the integration helper "performChativeAction".
   * DO NOT modify the method signature.
   *  Example usage:
   * {
    "credentialId":"{{credentialId}}",
    "data":{
        "Id":"183ccf94-3111-480f-8b12-4d19d65d3c78"

    }
}
   */
  

  @Post('contacts/get')
  async getContacts(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performChativeAction('contacts', 'get','GET', data);
      return res.status(HttpStatus.OK).json({
        message: `Chative  contacts get executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in contacts/get:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "contacts" action "getMany".
   *  - Request Parameters (data): 
   * - credentialId: string
   * - Filters: object (optional filters for querying records)
   * - Calls the integration helper "performChativeAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId":"{{credentialId}}",
    "data":{
    }
}
   */
  

  @Post('contacts/getMany')
  async getmanyContacts(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performChativeAction('contacts', 'getMany','GET', data);
      return res.status(HttpStatus.OK).json({
        message: `Chative  contacts getMany executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in contacts/getMany:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "contacts" action "delete".
   *  - Request Parameters (data): 
   * - credentialId: string
   * - data: string (ID of the record to delete)
   * - Calls the integration helper "performChativeAction".
   * DO NOT modify the method signature.
   *  Example usage:
   * {
     "credentialId":"{{credentialId}}",
    "data":{
        "Id":"183ccf94-3111-480f-8b12-4d19d65d3c78"
            }
}
   */
  

  @Post('contacts/delete')
  async deleteContacts(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performChativeAction('contacts', 'delete','DELETE',data);
      return res.status(HttpStatus.OK).json({
        message: `Chative  contacts delete executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in contacts/delete:`, error);
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
 
     const apikey=credentialRepository.authData.token.apikey

     return apikey;
    } catch (error) {
      this.logger.error('Error initializing Node:', error + error.stack);
    }
  }



  /**
   * [AUTO-GENERATED] Helper method to perform a Chative  action.
   * This method is a stub—extend it to integrate with the actual API for your xapp.
   *
   * Validations:
   * - Ensure that the provided module and action are supported.
   * - Validate the "data" structure as needed.
   *
   * DO NOT change the method signature.
   */
  private async performChativeAction(module: string, action: string,method:string, data: any): Promise<any> {
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
  
  
       const apikey=initializeData;
        
        const baseUrl = `https://api.chative.io/api/v1/`
        let url = `${baseUrl}${module}`
 
        if (data.Id) { url += `/${data.Id}` }

        
  
        const options: any = {
          method, url,headers: {
  "Authorization": `Bearer ${apikey}`,
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
  }

