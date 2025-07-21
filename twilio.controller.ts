// twilio.controller.ts
// -----------------------------------------------------------------------------
// AUTO-GENERATED CONTROLLER FILE.
// DO NOT modify the auto-generated endpoints below.
// For custom integration logic, extend the helper "performtwilioAction".
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
import { fields } from './twilio.config';
import { initializeDB } from '../../ormconfig';
import { Credentials } from '../../entities/Credentials';
import { CustomLogger } from '../../logger/custom.logger';
import { CredentialController } from 'src/credential/credential.controller';
import config, { XappName, modules as xappModules } from './twilio.config';
import { resolveObjectURL } from 'buffer';

@Controller('twilio')
export class twilioController {
  private logger = new CustomLogger();
  private CredentialController = new CredentialController()
  /**
   * [AUTO-GENERATED] OAuth authorize endpoint.
   * This endpoint initiates the authentication flow.
   * Implement the actual token request and error handling as needed.
   */
  @Post('authorize')
  async authorize(@Body() reqBody: any, @Res() res: Response) {
    if (!reqBody.apikey || !reqBody.apiSecret || !reqBody.accountId || !reqBody.type || !reqBody.name) {
      throw new HttpException('Missing  parameters', HttpStatus.BAD_REQUEST);
    }

    try {
      const { apikey, apiSecret, accountId, name, type,id } = reqBody;
      console.log(reqBody)

      const data = {
        token: {
          apikey: apikey,
          apiSecret: apiSecret,
          accountId: accountId
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

  // Construct the OAuth URL.
  // NOTE: Update the URL if your xapp uses a different authentication endpoint.
  //     const authUrl = ``;
  //     this.logger.debug(`${XappName} auth URL:`, authUrl);
  //     return res.status(HttpStatus.OK).send(authUrl);
  //   } catch (error) {
  //     this.logger.error('Error in authorize:', error);
  //     throw new HttpException('Authorization error', HttpStatus.INTERNAL_SERVER_ERROR);
  //   }
  // }

  /**
   * [AUTO-GENERATED] OAuth callback endpoint.
   * Implement token exchange, credential update, and refreshToken handling here.
   */
  //   @Get('callback')
  //   async callback(@Req() req: Request, @Res() res: Response) {
  //     try {
  //       const code = req.query.code as string;
  //       // TODO: Implement token exchange using the provided code.
  //       // NOTE: Save the access token and handle refresh token logic.
  //       return res.redirect('https://your.redirect.url');
  //     } catch (error) {
  //       this.logger.error('Error in callback:', error);
  //       throw new HttpException('Callback error', HttpStatus.INTERNAL_SERVER_ERROR);
  //     }
  //   }

  //   /**
  //    * [AUTO-GENERATED] Refresh token endpoint.
  //    * This endpoint should handle token expiry and refresh the access token.
  //    * Implement the refresh logic based on your authentication provider.
  //    */
  //   @Post('refreshToken')
  //   async refreshToken(@Body() reqBody: any, @Res() res: Response) {
  //     if (!reqBody.refreshToken) {
  //       throw new HttpException('Missing refresh token', HttpStatus.BAD_REQUEST);
  //     }
  //     try {
  //       // TODO: Implement the refresh token logic here.
  //       // Example: Request a new access token using the refresh token.
  //       const newAccessToken = 'new-access-token-placeholder';
  //       return res.status(HttpStatus.OK).json({
  //         message: `${XappName} access token refreshed successfully`,
  //         accessToken: newAccessToken,
  //       });
  //     } catch (error) {
  //       this.logger.error('Error in refreshToken:', error);
  //       throw new HttpException('Refresh token error', HttpStatus.INTERNAL_SERVER_ERROR);
  //     }
  //   }

  // async AuthError(functionName: string, functionArgs: any[], credentialsId: string, ) {
  //   try {
  //     await this.refreshToken(credentialsId);
  //     const result = await this[functionName](...functionArgs);
  //    return result;
  //   } catch (error) {
  //     this.logger.error('Error refreshing token:', error + error.stack);
  //     return error;
  //   }
  // }

  // ---------------------------------------------------------------------------
  // AUTO-GENERATED ENDPOINTS FOR MODULE ACTIONS (as defined in the blueprint JSON)
  // ---------------------------------------------------------------------------

  /**
   * [AUTO-GENERATED] Endpoint for module "messages" action "create".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - ModuleData: object (data to create)
   * - Calls the integration helper "performtwilioAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId":"7836fa35-1600-4b44-a2b0-1475a75a57f9",
    "data":{
        "data":{
    "From":"+19373194870",
    "To":"+918925186242",
    "Body":"hello "
}
}
}
   */


  @Post('messages/create')
  async createMessages(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performtwilioAction('Messages.json', 'create', 'POST', data);
      return res.status(HttpStatus.OK).json({
        message: `twilio messages create executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in messages/create:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "messages" action "get".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - RecordId: string (ID of the record to fetch)
   * - Calls the integration helper "performtwilioAction".
   * DO NOT modify the method signature.
   *  Example usage:
   * {
      "credentialId":"7836fa35-1600-4b44-a2b0-1475a75a57f9",
      "data":{
        "Id":"SM39b989175b0f43059d8adb02781edb60",
        "data":{

        }
      }
}
   */


  @Post('messages/get')
  async getMessages(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performtwilioAction('Messages', 'get', 'GET', data);
      return res.status(HttpStatus.OK).json({
        message: `twilio messages get executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in messages/get:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }


  /**
   * [AUTO-GENERATED] Endpoint for module "messages" action "getMany".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - RecordId: string (ID of the record to fetch)
   * - Calls the integration helper "performtwilioAction".
   * DO NOT modify the method signature.
   *  Example usage:
   * {
      "credentialId":"7836fa35-1600-4b44-a2b0-1475a75a57f9",
      "data":{
  
}
   */


@Post('messages/getMany')
async getManyMessages(@Body() data: any, @Res() res: Response) {
  if (!data) {
    throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
  }
  try {
    const result = await this.performtwilioAction('Messages.json', 'get', 'GET', data);
    return res.status(HttpStatus.OK).json({
      message: `twilio messages get executed successfully`,
      result,
    });
  } catch (error) {
    this.logger.error(`Error in messages/get:`, error);
    throw new HttpException(
      error.message || 'Internal server error',
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}

  /**
   * [AUTO-GENERATED] Endpoint for module "messages" action "delete".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - RecordId: string (ID of the record to delete)
   * - Calls the integration helper "performtwilioAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
      "credentialId":"7836fa35-1600-4b44-a2b0-1475a75a57f9",
      "data":{
        "Id":"SM39b989175b0f43059d8adb02781edb60",
        "data":{
        

        }
      }
}
   */


  @Post('messages/delete')
  async deleteMessages(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performtwilioAction('Messages', 'delete', 'DELETE', data);
      return res.status(HttpStatus.OK).json({
        message: `twilio messages delete executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in messages/delete:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "calls" action "create".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - ModuleData: object (data to create)
   * - Calls the integration helper "performtwilioAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
      "credentialId":"7836fa35-1600-4b44-a2b0-1475a75a57f9",
      "data":{
        "data":{
              
    "From":"+19373194870",
    "To":"+918925186242",
    "Url": "http://demo.twilio.com/docs/voice.xml"
   
  }

        }
      }

   */


  @Post('calls/create')
  async createCalls(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performtwilioAction('Calls.json', 'create', 'POST', data);
      return res.status(HttpStatus.OK).json({
        message: `twilio calls create executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in calls/create:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "calls" action "get".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - RecordId: string (ID of the record to fetch)
   * - Calls the integration helper "performtwilioAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
      "credentialId":"7836fa35-1600-4b44-a2b0-1475a75a57f9",
      "data":{
        "Id":"CAbdf20559ee9c0ec7f05fde4bdab9bf0d",
        "data":{

        }

      }
      }
   */


  @Post('calls/get')
  async getCalls(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performtwilioAction('Calls', 'get', 'GET', data);
      return res.status(HttpStatus.OK).json({
        message: `twilio calls get executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in calls/get:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
  
  /**
   * [AUTO-GENERATED] Endpoint for module "calls" action "getMany".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - RecordId: string (ID of the record to fetch)
   * - Calls the integration helper "performtwilioAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
      "credentialId":"7836fa35-1600-4b44-a2b0-1475a75a57f9",
      "data":{
       

      }
      }
   */


      @Post('calls/getMany')
      async getManyCalls(@Body() data: any, @Res() res: Response) {
        if (!data) {
          throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
        }
        try {
          const result = await this.performtwilioAction('Calls.json', 'get', 'GET', data);
          return res.status(HttpStatus.OK).json({
            message: `twilio calls get executed successfully`,
            result,
          });
        } catch (error) {
          this.logger.error(`Error in calls/get:`, error);
          throw new HttpException(
            error.message || 'Internal server error',
            HttpStatus.INTERNAL_SERVER_ERROR
          );
        }
      }

  /**
   * [AUTO-GENERATED] Endpoint for module "calls" action "update".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - ModuleData: object (data to update)
   * - Calls the integration helper "performtwilioAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
      "credentialId":"7836fa35-1600-4b44-a2b0-1475a75a57f9",
      "data":{
        "Id":"CAf2b05fc4337bc8d03832263925430d73",
        "data":{
         "status": "completed"
            

        }

      }
      }
   */


  @Post('calls/update')
  async updateCalls(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performtwilioAction('Calls', 'update', 'POST', data);
      return res.status(HttpStatus.OK).json({
        message: `twilio calls update executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in calls/update:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "calls" action "delete".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - RecordId: string (ID of the record to delete)
   * - Calls the integration helper "performtwilioAction".
   * DO NOT modify the method signature.
   *  Example usage:
   * {
      "credentialId":"7836fa35-1600-4b44-a2b0-1475a75a57f9",
      "data":{
        "Id":"CA9f1f8d5cfb2125d181f790eaaa5232b5",
        "data":{

        }

      }
      }
   */


  @Post('calls/delete')
  async deleteCalls(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performtwilioAction('Calls', 'delete', 'DELETE', data);
      return res.status(HttpStatus.OK).json({
        message: `twilio calls delete executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in calls/delete:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
   


  /**
   * [AUTO-GENERATED] Endpoint for module "recordings" action "get".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - RecordId: string (ID of the record to fetch)
   * - Calls the integration helper "performtwilioAction".
   * DO NOT modify the method signature.
   *  Example usage:
   * {
      "credentialId":"7836fa35-1600-4b44-a2b0-1475a75a57f9",
      "data":{
        "callid":"CAe7cb4a336dc9b2e08adf1724ab99f629",
        "data":{
       }
 } }
   */


  @Post('recordings/get')
  async getRecordings(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performtwilioAction(`Calls/${data.data.callid}/Recordings.json`, 'get', 'GET', data);
      return res.status(HttpStatus.OK).json({
        message: `twilio recordings get executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in recordings/get:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
 /**
   * [AUTO-GENERATED] Endpoint for module "recordings" action "getMany".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - RecordId: string (ID of the record to fetch)
   * - Calls the integration helper "performtwilioAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *{
      "credentialId":"7836fa35-1600-4b44-a2b0-1475a75a57f9",
      "data":{
        

      }
      }
   */


@Post('recordings/getMany')
async getManyRecordings(@Body() data: any, @Res() res: Response) {
  if (!data) {
    throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
  }
  try {
    const result = await this.performtwilioAction(`Recordings.json`, 'get', 'GET', data);
    return res.status(HttpStatus.OK).json({
      message: `twilio recordings get executed successfully`,
      result,
    });
  } catch (error) {
    this.logger.error(`Error in recordings/get:`, error);
    throw new HttpException(
      error.message || 'Internal server error',
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}

  /**
   * [AUTO-GENERATED] Endpoint for module "recordings" action "delete".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - RecordId: string (ID of the record to delete)
   * - Calls the integration helper "performtwilioAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
      "credentialId":"7836fa35-1600-4b44-a2b0-1475a75a57f9",
      "data":{
        "id":"RE54d40d909dd3f1b672fb193b218b294f",
        "data":{
        }

      }
      }
   */


  @Post('recordings/delete')
  async deleteRecordings(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performtwilioAction(`Recordings/${data.data.id}.json`, 'delete', 'DELETE', data);
      return res.status(HttpStatus.OK).json({
        message: `twilio recordings delete executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in recordings/delete:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "phonenumbers" action "get".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - RecordId: string (ID of the record to fetch)
   * - Calls the integration helper "performtwilioAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
      "credentialId":"7836fa35-1600-4b44-a2b0-1475a75a57f9",
      "data":{


      }
      }
   */


  @Post('phonenumbers/get')
  async getPhonenumbers(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performtwilioAction('IncomingPhoneNumbers.json', 'get', 'GET', data);
      return res.status(HttpStatus.OK).json({
        message: `twilio phonenumbers get executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in phonenumbers/get:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
  /**
   * [AUTO-GENERATED] Endpoint for module "phonenumbers" action "update".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - ModuleData: object (data to update)
   * - Calls the integration helper "performtwilioAction".
   * DO NOT modify the method signature.
   *  Example usage:
   * {
      "credentialId":"7836fa35-1600-4b44-a2b0-1475a75a57f9",
      "data":{
        "id":"PN9c27587dce86c802547a906f35537254",
        "data":{
            "status_callback":"completed"

        }

      }
      }
   */


  @Post('phonenumbers/update')
  async updatePhonenumbers(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performtwilioAction(`IncomingPhoneNumbers/${data.data.id}.json`, 'update', 'POST', data);
      return res.status(HttpStatus.OK).json({
        message: `twilio phonenumbers update executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in phonenumbers/update:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "phonenumbers" action "delete".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - RecordId: string (ID of the record to delete)
   * - Calls the integration helper "performtwilioAction".
   * DO NOT modify the method signature.
   *  Example usage:
   * {
      "credentialId":"7836fa35-1600-4b44-a2b0-1475a75a57f9",
      "data":{
        "id":"PN9c27587dce86c802547a906f35537254",
        "data":{
            }

      }
      } */


  @Post('phonenumbers/delete')
  async deletePhonenumbers(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performtwilioAction(`IncomingPhoneNumbers/${data.data.id}.json`, 'delete', 'DELETE', data);
      return res.status(HttpStatus.OK).json({
        message: `twilio phonenumbers delete executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in phonenumbers/delete:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  //  GetMany
  async getAllMessages(@Body() data: any) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performtwilioAction('Messages.json', 'get', 'GET', data);
      return {response:result.response.messages.map(messages =>({body:messages.body,sid:messages.sid}))}
     
    } catch (error) {
      this.logger.error(`Error in messages/get:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
  async getAllCalls(@Body() data: any) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performtwilioAction('Calls.json', 'get', 'GET', data);
      return {response:result.response.calls.map(calls =>({phone_number_sid:calls.phone_number_sid,sid:calls.sid,status:calls.status}))}

    
    } catch (error) {
      this.logger.error(`Error in calls/get:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
  async getAllRecordings(@Body() data: any) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performtwilioAction(`Recordings.json`, 'get', 'GET', data);
      return {response:result.response.recordings.map(recordings =>({sid:recordings.sid,start_time:recordings.start_time}))}
   
    } catch (error) {
      this.logger.error(`Error in recordings/get:`, error);
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
 
      const apiSecret = credentialRepository.auth_data.token.apiSecret
      console.log('apiSecret', apiSecret)

      const accountId = credentialRepository.auth_data.token.accountId
      console.log('accountid', accountId)
      return { apiSecret, accountId }
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
  private async performtwilioAction(module: string, action: string, method: string, data: any): Promise<any> {
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


      const { accountId, apiSecret } = initializeData;
      console.log('one', initializeData)

      const apiKey = btoa(`${accountId}:${apiSecret}`);

      console.log('accountid 2', apiSecret)
      const baseUrl = `https://api.twilio.com/2010-04-01/Accounts/${accountId}/`
      let url = `${baseUrl}${module}`

      if (data.Id) { url += `/${data.Id}.json` }


      const options: any = {
        method, url, headers: {
          "Authorization": `Basic ${apiKey}`,
          "Content-Type": "application/x-www-form-urlencoded"
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
      console.log('error', error)
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
export const Twi= new twilioController()

