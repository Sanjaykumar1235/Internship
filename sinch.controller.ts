// sinch.controller.ts
// -----------------------------------------------------------------------------
// AUTO-GENERATED CONTROLLER FILE.
// DO NOT modify the auto-generated endpoints below.
// For custom integration logic, extend the helper "performsinchAction".
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
import { Credentials } from '../../entities/Credentials';
import { CredentialController } from 'src/credential/credential.controller';
import { CustomLogger } from '../../logger/custom.logger';
import config, { XappName, fields, modules as xappModules } from './sinch.config';

@Controller('sinch')
export class sinchController {
  private logger = new CustomLogger();
  private CredentialController= new CredentialController();

  /**
   * [AUTO-GENERATED] OAuth authorize endpoint.
   * This endpoint initiates the authentication flow.
   * Implement the actual token request and error handling as needed.
   */
  @Post('authorize')
  async authorize(@Body() reqBody: any, @Res() res: Response) {
    if (!reqBody.accessKey || !reqBody.keySecret || !reqBody.name ||!reqBody.type ||!reqBody.projectId ||!reqBody.region) {
      throw new HttpException('Missing OAuth parameters', HttpStatus.BAD_REQUEST);
    }
    try {
      const { accessKey,keySecret,name,type,projectId,region,id } = reqBody;
      // Construct the OAuth URL.
      // NOTE: Update the URL if your xapp uses a different authentication endpoint.

      const data = qs.stringify({
        grant_type: 'client_credentials',
      });

      const authHeader =Buffer.from(`${accessKey}:${keySecret}`).toString('base64');
      const tokenUrl = `https://auth.sinch.com/oauth2/token`;

      const headers={
        'Content-Type':'application/x-www-form-urlencoded',
        'Authorization':`Basic ${authHeader}`
      }

      const result=await axios.post(tokenUrl,data,{headers})

      const apiToken=result.data.access_token

      const credentialData={
        token:{
        accessKey:accessKey,
        keySecret:keySecret,
        projectId:projectId,
        apiToken,
        region
        }
      }
      const Credentials={
        data:credentialData,
        name,
        type,
      }
      if (reqBody.id) {
        await this.CredentialController.updateCredentials(reqBody.id, credentialData)
        this.logger.debug('Credentials with Id updated Sucessfully', reqBody.id)
        return res.status(HttpStatus.OK).send({message:'Credentials updated successfully'})

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
   * [AUTO-GENERATED] Endpoint for module "contact" action "create".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - ModuleData: object (data to create)
   * - Calls the integration helper "performsinchAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId":"{{credentialId}}",
    "data":{
        "data":{
  "channel_identities": [
    {
      "channel": "SMS",
      "identity": "+916382803487"
    }
  ],
  "language": "EN_US",
  "display_name": "Contact",
  "email": "harishnarayanan@gmail.com"
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
      const result = await this.performsinchAction('contacts', 'create','POST', data);
      return res.status(HttpStatus.OK).json({
        message: `sinch contact create executed successfully`,
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
   * [AUTO-GENERATED] Endpoint for module "contact" action "get".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - RecordId: string (ID of the record to fetch)
   * - Calls the integration helper "performsinchAction".
   * DO NOT modify the method signature.
   *  Example usage:
   * {
    "credentialId":"{{credentialId}}",
    "data":{
        "contact_id":"01JRF9A4B2QZYQ1MG0Y4WP5SYV",
        "data":{}
    }
}
   */
  

  @Post('contact/get')
  async getContact(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performsinchAction(`contacts/${data.data.contact_id}`, 'get','GET', data);
      return res.status(HttpStatus.OK).json({
        message: `sinch contact get executed successfully`,
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
   * [AUTO-GENERATED] Endpoint for module "contact" action "update".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - ModuleData: object (data to update)
   * - Calls the integration helper "performsinchAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId":"{{credentialId}}",
    "data":{
        "contact_id":"01JRF9A4B2QZYQ1MG0Y4WP5SYV",
        "data":{
            "display_name":"Harish",
            "email":"harishnarayanan@gmail.com"


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
      const result = await this.performsinchAction(`contacts/${data.data.contact_id}`, 'update','PATCH', data);
      return res.status(HttpStatus.OK).json({
        message: `sinch contact update executed successfully`,
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
   * [AUTO-GENERATED] Endpoint for module "contact" action "getMany".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - Filters: object (optional filters for querying records)
   * - Calls the integration helper "performsinchAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId":"{{credentialId}}",
    "data":{}
}
   */
  

  @Post('contact/getMany')
  async getmanyContact(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performsinchAction('contacts', 'getMany','GET', data);
      return res.status(HttpStatus.OK).json({
        message: `sinch contact getMany executed successfully`,
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
   * [AUTO-GENERATED] Endpoint for module "contact" action "delete".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - RecordId: string (ID of the record to delete)
   * - Calls the integration helper "performsinchAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId":"{{credentialId}}",
    "data":{
        "contact_id":"01JNQXXK3YSYCMBYX7VNR5MZR1"
    }
}
   */
  

  @Post('contact/delete')
  async deleteContact(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performsinchAction(`contacts/${data.data.contact_id}`, 'delete','DELETE', data);
      return res.status(HttpStatus.OK).json({
        message: `sinch contact delete executed successfully`,
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
   * [AUTO-GENERATED] Endpoint for module "message" action "create".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - ModuleData: object (data to create)
   * - Calls the integration helper "performsinchAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId":"{{credentialId}}",
    "data":{
        "data":{
            "app_id":"01JRFG2TXER8YKXFDSK7V5B5VW",
            "recipient":{
                "contact_id":"01JNQYJQK1T4D2SFS2RS7PXQ76"
            },
            "message":{
                "text_message":{
                    "text":"hello from sinch"
                }
            }
        }
    }
}
   */
  

  @Post('message/create')
  async createMessage(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performsinchAction('messages:send', 'create','POST', data);
      return res.status(HttpStatus.OK).json({
        message: `sinch message create executed successfully`,
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
   * [AUTO-GENERATED] Endpoint for module "message" action "get".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - RecordId: string (ID of the record to fetch)
   * - Calls the integration helper "performsinchAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId":"{{credentialId}}",
    "data":{
        "messageId":"01JRFE4V1FZWM7TJXZJJKF1SAW"
    }
}
   */
  

  @Post('message/get')
  async getMessage(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performsinchAction(`messages/${data.data.messageId}`, 'get','GET', data);
      return res.status(HttpStatus.OK).json({
        message: `sinch message get executed successfully`,
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
   * [AUTO-GENERATED] Endpoint for module "message" action "getMany".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - Filters: object (optional filters for querying records)
   * - Calls the integration helper "performsinchAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId":"{{credentialId}}",
    "data":{ }
}
   */
  

  @Post('message/getMany')
  async getmanyMessage(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performsinchAction('messages', 'getMany','GET', data);
      return res.status(HttpStatus.OK).json({
        message: `sinch message getMany executed successfully`,
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
   * [AUTO-GENERATED] Endpoint for module "message" action "update".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - ModuleData: object (data to update)
   * - Calls the integration helper "performsinchAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId":"{{credentialId}}",
    "data":{
        "messageId":"01JRFE4V1FZWM7TJXZJJKF1SAW",
        "data":{
            "metadata":"New Metta data Value"

        }
    }

}
   */
  

  @Post('message/update')
  async updateMessage(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performsinchAction(`messages/${data.data.messageId}`, 'update','PATCH', data);
      return res.status(HttpStatus.OK).json({
        message: `sinch message update executed successfully`,
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
   * - Calls the integration helper "performsinchAction".
   * DO NOT modify the method signature.
   *  Example usage:
   * {
    "credentialId":"{{credentialId}}",
    "data":{
        "messageId":"01JRFE4V1FZWM7TJXZJJKF1SAW"
    }
}  */
  

  @Post('message/delete')
  async deleteMessage(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performsinchAction(`messages/${data.data.messageId}`, 'delete','DELETE', data);
      return res.status(HttpStatus.OK).json({
        message: `sinch message delete executed successfully`,
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
   * [AUTO-GENERATED] Endpoint for module "apps" action "create".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - RecordId: string (ID of the record to delete)
   * - Calls the integration helper "performsinchAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
  "CredentialId": "your-credential-id",
  "RecordId": "record-id"
}
   */
  
@Post('app/create')
async createApp(@Body() data: any, @Res() res: Response) {
  if (!data) {
    throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
  }
  try {
    const result = await this.performsinchAction('apps', 'create','POST', data);
    return res.status(HttpStatus.OK).json({
      message: `sinch apps create executed successfully`,
      result,
    });
  } catch (error) {
    this.logger.error(`Error in apps/create:`, error);
    throw new HttpException(
      error.message || 'Internal server error',
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}

//           GetMany

async getAllContact(@Body() data: any) {
  if (!data) {
    throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
  }
  try {
    const result = await this.performsinchAction('contacts', 'getMany','GET', data);
    return {response:result.response.contacts.map(contacts=>({value:contacts.id,name:contacts.display_name}))}
   
  } catch (error) {
    this.logger.error(`Error in contact/getMany:`, error);
    throw new HttpException(
      error.message || 'Internal server error',
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}



async getALlMessage(@Body() data: any) {
  if (!data) {
    throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
  }
  try {
    const result = await this.performsinchAction('messages', 'getMany','GET', data);
    return {response:result.response.messages.map(messages=>({value:messages.id}))}
    
  } catch (error) {
    this.logger.error(`Error in message/getMany:`, error);
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
 
      const apiToken = credentialRepository.auth_data.token.apiToken

      const region=credentialRepository.auth_data.token.region
      

      const projectId = credentialRepository.auth_data.token.projectId
 
      return { apiToken, projectId,region }
    } catch (error) {
      this.logger.error('Error initializing Node:', error + error.stack);
    }
  }


  /**
   * [AUTO-GENERATED] Helper method to perform a twilio action.
   * This method is a stub—extend it to integrate with the actual API for your xapp.
   *
   * Validations:
   * - Ensure that the provided module and action are supported.
   * - Validate the "data" structure as needed.
   *
   * DO NOT change the method signature.
   */
  private async performsinchAction(module: string, action: string, method: string, data: any): Promise<any> {
    // TODO: Implement the actual integration logic.
    // For example:
    // 1. Initialize your API client using a refresh token or saved credentials.
    // 2. Validate that 'data' contains required fields (CredentialId, ModuleId, ModuleData).
    // 3. Use the correct HTTP method based on the action (GET, POST, PATCH, DELETE, etc.).
    // 4. Handle errors and return the API response.
    // 5. If the access token is expired, call the refreshToken endpoint.
    // return {
    //   module,
    //   action,
    //   data,
    //   simulated: true,
    // };
    const resultData = await this.curl(module, action, method, data);
    return resultData

  }
  public async curl(module: string, action: string, method: string, argumentdata: any): Promise<any> {

    try {
      const { credentialId, data } = argumentdata;
      const initializeData: any = await this.initialize(credentialId)


      const { apiToken,projectId ,region } = initializeData;
      console.log('one', initializeData)
      
      const baseUrl = `https://${region}.conversation.api.sinch.com/v1/projects/${projectId}/`
      let url = `${baseUrl}${module}`
      console.log('url',url)

      if (data.Id) { url += `/${data.Id}` }


      const options: any = {
        method, url, headers: {
          "Authorization": `Bearer ${apiToken}`,
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
export const sinch= new sinchController()
