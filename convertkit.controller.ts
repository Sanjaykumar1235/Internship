// convertkit.controller.ts
// -----------------------------------------------------------------------------
// AUTO-GENERATED CONTROLLER FILE.
// DO NOT modify the auto-generated endpoints below.
// For custom integration logic, extend the helper "performConvertkitAction".
//
// Copyright (c) 2025 Smackcoders. All rights reserved.
// This file is subject to the Smackcoders Proprietary License.
// Unauthorized copying or distribution is strictly prohibited.
// -----------------------------------------------------------------------------

import {
    Controller,
    Post,
    Get,
    Body,
    Req,
    Res,
    HttpStatus,
    HttpException,
    BadGatewayException,
    BadRequestException,
    Redirect,
    ResponseDecoratorOptions,
    Param,
    Head,
} from '@nestjs/common';
import * as qs from 'qs'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'
import { Request, response, Response } from 'express';
import { randomBytes } from 'crypto';
import { fields } from './convertkit.config';
import { DataSource } from 'typeorm';
import axios, { Method } from 'axios';
import * as crypto from 'crypto';
import { CredentialController } from 'src/credential/credential.controller';
import { initializeDB } from '../../ormconfig';
import { Credentials } from '../../entities/Credentials';
import { CustomLogger } from '../../logger/custom.logger';
import config, { XappName, modules as xappModules } from './convertkit.config'



@Controller('convertkit')
export class ConvertkitController {
    private logger = new CustomLogger();
    private CredentialController = new CredentialController()
    // private logger:any;


    /**
     * [AUTO-GENERATED] OAuth authorize endpoint.
     * This endpoint initiates the authentication flow.
     * Implement the actual token request and error handling as needed.
     */
    @Post('authorize')
    async authorize(@Body() reqBody: any, @Res() res: Response) {
        console.log('hello from auth')
        if (!reqBody.clientId || !reqBody.redirectUri || !reqBody.clientSecret || !reqBody.name || !reqBody.type) {
            throw new HttpException('Missing OAuth parameters', HttpStatus.BAD_REQUEST);
        }
        try {
            const { clientId, clientSecret, redirectUri, name, type } = reqBody;
            const state = randomBytes(16).toString('hex')

            // Construct the OAuth URL.
            // NOTE: Update the URL if your xapp uses a different authentication endpoint.

            const authUrl = `https://app.kit.com/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&state=${state}`;

            const data = {
                clientId: clientId,
                clientSecret: clientSecret,
                redirectUri: redirectUri,
                state: state,
                name: name
            }
            const credentialsRequest = {
                name: name,
                type: type,
                data: data
            }

            if (reqBody.id) {
                await this.CredentialController.updateCredentials(reqBody.id,data );
           
                this.logger.debug('Credentials with ID updated successfully', reqBody.id);
                return res.status(HttpStatus.OK).send(authUrl);
            } else {
                // If no ID, create new credentials
                await this.CredentialController.createCredentials(credentialsRequest, res);
                console.log('Credentials stored in database');
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
            const credRepository = connection.getRepository(Credentials);
            const credential = await credRepository
                .createQueryBuilder('Credentials')
                .where("Credentials.auth_data->>'state'=:state", { state })
                .getOne();
            if (!credential) {
                console.error('Error: No credentials found for the given state');
                return res.status(404).json({ message: 'Invalid state: No credentials found' });
            }


            const { clientId, clientSecret, redirectUri } = credential.auth_data;






            const requestBody = qs.stringify({
                client_id: clientId,
                client_secret: clientSecret,
                grant_type: 'authorization_code',
                redirect_uri: redirectUri,
                code: code
            })

            const result = await axios.post(`https://app.kit.com/oauth/token`,requestBody, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            });

            credential.auth_data['token'] = result.data
            await this.CredentialController.updateCredentials(credential.id, credential.auth_data);


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
    async refreshToken(@Body() reqBody: any, @Res() res: Response) {
        console.log('hello')
        if (!reqBody.credentialId) {
            throw new HttpException('Missing credential ID', HttpStatus.BAD_REQUEST);
        }
        try {

            const { credentialId } = reqBody
            

            const newAccessToken = 'new-access-token-placeholder';
            const connection = await initializeDB();
            const credRepository = connection.getRepository(Credentials);
            const credential: any = await credRepository.findOne({ where: { id: credentialId } })

            const data = qs.stringify({
                client_id: credential.auth_data.client_id,
                client_secret: credential.auth_data.client_secret,
                grant_type: 'refresh_token',
                refresh_token: credential.auth_data.token.refresh_token
            })
            const tokenUrl = `https://app.kit.com/oauth/token`;
            const response = await axios.post(tokenUrl, data, {
                headers: {
                    'Accept': "application/json",
                    "Content-Type": 'application/json'
                }
            });
            const result = response.data

            const updatedAuthData = {
                ...credential.auth_data,
                token: result

            };
            await this.CredentialController.updateCredentials(credentialId, updatedAuthData)




            // TODO: Implement the refresh token logic here.
            // Example: Request a new access token using the refresh token.

            return res.send({
                message: `${XappName} access token refreshed successfully`,
                accessToken: newAccessToken,
            });

        } catch (error) {
            this.logger.error('Error in refreshToken:', error);
            throw new HttpException('Refresh token error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async AuthError(functionName: string, functionArgs: any[], credentialsId: string) {
        try {
            await this.refreshToken(credentialsId, response);
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
     * [AUTO-GENERATED] Endpoint for module "Subscribers" action "create".
     *  - Request Parameters (data): 
     * - credentialId: string
     * - ModuleData: object (data to create)
     * - Calls the integration helper "performConvertkitAction".
     * DO NOT modify the method signature.
     *  Example usage:
     *  {
    "credentialId": "your-credential-id",
    "ModuleData": {
      "field1": "value1",
      "field2": "value2"
    }
  }
     */



    @Post('subscribers/create')
    async createSubscribers( @Body() data: any, @Res() res: Response) {
        if (!data) {
            throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
        }
        try {
            const result = await this.performConvertkitAction('subscribers', 'create','POST',data );
            if (result.status === 401) {
                const functionArgs = Array.from(arguments).slice(0, 2);
                const result = await this.AuthError("createSubscribers", functionArgs, data.credentialId)
                return result
            }

          
            return res.status(HttpStatus.OK).json({
                message: `Convertkit Subscribers create executed successfully`,
                result,
            });
        } catch (error) {
            this.logger.error(`Error in Subscribers/create:`, error);
            throw new HttpException(
                error.message || 'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    /**
     * [AUTO-GENERATED] Endpoint for module "Subscribers" action "get".
     *  - Request Parameters (data): 
     * - credentialId: string
     * - RecordId: string (ID of the record to fetch)
     * - Calls the integration helper "performConvertkitAction".
     * DO NOT modify the method signature.
     *  Example usage:
     *  
    "{
    "credentialId":"8d7940e2-6e9a-4248-9a25-6b112fa9b085",
    "data":{
        "data":{
    "first_name":"harish",
    "email_address":"harish@gmail.com",
    "fields":{
        "Last name":"Raja",
        "Birthday":"Mar 20",
        "Source":"landing page"
    }
    }
    }
}
     */


    @Post('subscribers/get')
    async getSubscribers( @Body() data: any, @Res() res: Response) {
        if (!data) {
            throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
        }
        try {
            const result = await this.performConvertkitAction(`subscribers`, 'get','GET', data );
            if (result.status === 401) {
                const functionArgs = Array.from(arguments).slice(0, 2);
                const result = await this.AuthError("getSubscribers", functionArgs, data.credentialId)
            }
          
            return res.status(HttpStatus.OK).json({
                message: `Convertkit Subscribers get executed successfully`,
                result,
            });
        } catch (error) {
            this.logger.error(`Error in Subscribers/get:`, error);
            throw new HttpException(
                error.message || 'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }


    /**
     * [AUTO-GENERATED] Endpoint for module "Subscribers" action "getMany".
     *  - Request Parameters (data): 
     * - credentialId: string
     * - Filters: object (optional filters for querying records)
     * - Calls the integration helper "performConvertkitAction".
     * DO NOT modify the method signature.
     *  Example usage:
     * {
    
    "credentialId":"8d7940e2-6e9a-4248-9a25-6b112fa9b085",
    "data":{
   
    "Id":3262432456
    }
    
}
     */


    @Post('subscribers/getMany')
    async getmanySubscribers( @Body() data: any, @Res() res: Response) {
        if (!data) {
            throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
        }
        try {
            const result = await this.performConvertkitAction('subscribers', 'getMany','GET', data );
            if (result.status === 401) {
                const functionArgs = Array.from(arguments).slice(0, 2);
                const result = await this.AuthError("getmanySubscribers", functionArgs, data.credentialId)
            }

            return res.status(HttpStatus.OK).json({
                message: `Convertkit Subscribers getMany executed successfully`,
                result,
            });
        } catch (error) {
            this.logger.error(`Error in Subscribers/getMany:`, error);
            throw new HttpException(
                error.message || 'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }


    /**
     * [AUTO-GENERATED] Endpoint for module "Subscribers" action "update".
     *  - Request Parameters (data): 
     * - credentialId: string
     * - ModuleData: object (data to update)
     * - Calls the integration helper "performConvertkitAction".
     * DO NOT modify the method signature.
     *  Example usage:
     * {
    
    "credentialId":"8d7940e2-6e9a-4248-9a25-6b112fa9b085",
    "data":{}
}
     */


    @Post('subscribers/update')
    async updateSubscribers( @Body() data: any, @Res() res: Response) {
        if (!data) {
            throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
        }
        try {
            const result = await this.performConvertkitAction(`subscribers`, 'update','PUT', data );
            if (result.status === 401) {
                const functionArgs = Array.from(arguments).slice(0, 2);
                const result = await this.AuthError("updateSubscribers", functionArgs, data.credentialId)
            }
            return res.status(HttpStatus.OK).json({
                message: `Convertkit Subscribers update executed successfully`,
                result,
            });
        } catch (error) {
            this.logger.error(`Error in Subscribers/update:`, error);
            throw new HttpException(
                error.message || 'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    /**
     * [AUTO-GENERATED] Endpoint for module "Subscribers" action "delete".
     *  - Request Parameters (data): 
     * - credentialId: string
     * - RecordId: string (ID of the record to delete)
     * - Calls the integration helper "performConvertkitAction".
     * DO NOT modify the method signature.
     *  Example usage:
     *  {
    
    "credentialId":"8d7940e2-6e9a-4248-9a25-6b112fa9b085",
    "data":{
            "Id":3262432456,

        "data":{
    "first_name":"Anto",

    "fields":{
        "Last name":"Sanjay",
        "Birthday":"Oct 9",
        "Source":"page landing"
    }

        }}
}
     */


  

    @Post('unsubscribers/create')
    async createUnubscribersTags( @Body() data: any, @Res() res: Response) {
        if (!data) {
            throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
        }
        try {
            const result = await this.performConvertkitAction(`subscribers/${data.data.id}/unsubscribe`, 'create','POST',data );
            if (result.status === 401) {
                const functionArgs = Array.from(arguments).slice(0, 2);
                const result = await this.AuthError("createUnubscribersTags", functionArgs, data.credentialId)
            }
            return res.status(HttpStatus.OK).json({
                message: `Convertkit UnSubscribers  executed successfully`,
                result,
            });
        } catch (error) {
            this.logger.error(`Error in UnSubscribers/create:`, error);
            throw new HttpException(
                error.message || 'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
    /**
    * [AUTO-GENERATED] Endpoint for module "Subscribers" action "delete".
    *  - Request Parameters (data): 
    * - credentialId: string
    * - RecordId: string (ID of the record to delete)
    * - Calls the integration helper "performConvertkitAction".
    * DO NOT modify the method signature.
    *  Example usage:
    *  {
    
    "credentialId":"8d7940e2-6e9a-4248-9a25-6b112fa9b085",
    "data":{
    "id":3262432456
    }
}
    */

    @Post('subscribersTag/get')
    async getSubscribersTags( @Body() data: any, @Res() res: Response) {
        if (!data) {
            throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
        }
        try {
            const result = await this.performConvertkitAction(`subscribers/${data.data.id}/tags`, 'get','GET',data );
            if (result.status === 401) {
                const functionArgs = Array.from(arguments).slice(0, 2);
                const result = await this.AuthError("getSubscribersTags", functionArgs, data.credentialId)
            }
            return res.status(HttpStatus.OK).json({
                message: `Convertkit SubscribersTags get  executed successfully`,
                result,
            });

        } catch (error) {

            this.logger.error(`Error in Subscribers/get:`, error);
            throw new HttpException(
                error.message || 'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    /**
     * [AUTO-GENERATED] Endpoint for module "Broadcasts" action "create".
     *  - Request Parameters (data): 
     * - credentialId: string
     * - ModuleData: object (data to create)
     * - Calls the integration helper "performConvertkitAction".
     * DO NOT modify the method signature.
     *  Example usage:
     * {
    
    "credentialId":"8d7940e2-6e9a-4248-9a25-6b112fa9b085",
    "data":{
    "id":3262432456
    }
}*/



    @Post('broadcasts/create')
    async createBroadcasts( @Body() data: any, @Res() res: Response) {
        if (!data) {
            throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
        }
        try {
            const result = await this.performConvertkitAction('broadcasts', 'create','POST', data );
            if (result.status === 401) {
                const functionArgs = Array.from(arguments).slice(0, 2);
                const result = await this.AuthError("createBroadcasts", functionArgs, data.credentialId)
            }
            return res.status(HttpStatus.OK).json({
                message: `Convertkit Broadcasts create executed successfully`,
                result,
            });
        } catch (error) {
            this.logger.error(`Error in Broadcasts/create:`, error);
            throw new HttpException(
                error.message || 'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    /**
     * [AUTO-GENERATED] Endpoint for module "Broadcasts" action "get".
     *  - Request Parameters (data): 
     * - credentialId: string
     * - RecordId: string (ID of the record to fetch)
     * - Calls the integration helper "performConvertkitAction".
     * DO NOT modify the method signature.
     *  Example usage:
     * {
    
    "credentialId":"8d7940e2-6e9a-4248-9a25-6b112fa9b085",
    "data":{
        "data":{
  "email_template_id": 4167094,
  "email_address":"sanjubai1235@gmail.com",
  "content": "<p>I am Sanjay Kumar</p>",
  "description": "Intro email",
  "public": true,
  "published_at": null,
  "send_at": null,
  "thumbnail_alt": null,
  "thumbnail_url": null,
  "preview_text": "Pleased to meet you!",
  "subject": "Hello!",
  "subscriber_filter": [
    {
      "all": [
        {
          "type": "tag",
          "ids": [7113574]
        }
      ]
    }
  ]
        }
    }
}

     */


    @Post('broadcasts/get')
    async getBroadcasts( @Body() data: any, @Res() res: Response) {
        if (!data) {
            throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
        }
        try {
            const result = await this.performConvertkitAction(`broadcasts`, 'get','GET',data );
            if (result.status === 401) {
                const functionArgs = Array.from(arguments).slice(0, 2);
                const result = await this.AuthError("getBroadcasts", functionArgs, data.credentialId)
            }
            return res.status(HttpStatus.OK).json({
                message: `Convertkit Broadcasts get executed successfully`,
                result,
            });
        } catch (error) {
            this.logger.error(`Error in Broadcasts/get:`, error);
            throw new HttpException(
                error.message || 'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    /**
     * [AUTO-GENERATED] Endpoint for module "Broadcasts" action "getMany".
     *  - Request Parameters (data): 
     * - credentialId: string
     * - Filters: object (optional filters for querying records)
     * - Calls the integration helper "performConvertkitAction".
     * DO NOT modify the method signature.
     *  Example usage:
     * {
    
    "credentialId":"8d7940e2-6e9a-4248-9a25-6b112fa9b085",
    "data":{
    "Id":18933566
    }
}
     */


    @Post('broadcasts/getMany')
    async getmanyBroadcasts( @Body() data: any, @Res() res: Response) {
        if (!data) {
            throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
        }
        try {
            const result = await this.performConvertkitAction('broadcasts', 'getMany','GET', data );
            if (result.status === 401) {
                const functionArgs = Array.from(arguments).slice(0, 2);
                const result = await this.AuthError("getmanyBroadcasts", functionArgs, data.credentialId)
            }
            return res.status(HttpStatus.OK).json({
                message: `Convertkit Broadcasts getMany executed successfully`,
                result,
            });
        } catch (error) {
            this.logger.error(`Error in Broadcasts/getMany:`, error);
            throw new HttpException(
                error.message || 'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }


    /**
     * [AUTO-GENERATED] Endpoint for module "Broadcasts" action "update".
     *  - Request Parameters (data): 
     * - credentialId: string
     * - ModuleData: object (data to update)
     * - Calls the integration helper "performConvertkitAction".
     * DO NOT modify the method signature.
     *  Example usage:
     *  {
    
    "credentialId":"8d7940e2-6e9a-4248-9a25-6b112fa9b085",
    "data":{}
}
     */


    @Post('broadcasts/update')
    async updateBroadcasts( @Body() data: any, @Res() res: Response) {
        if (!data) {
            throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
        }
        try {
            const result = await this.performConvertkitAction(`broadcasts/${data.data.id}`, 'update','PUT',data );
            if (result.status === 401) {
                const functionArgs = Array.from(arguments).slice(0, 2);
                const result = await this.AuthError("updateBroadcasts", functionArgs, data.credentialId)
            }
            return res.status(HttpStatus.OK).json({
                message: `Convertkit Broadcasts update executed successfully`,
                result,
            });
        } catch (error) {
            this.logger.error(`Error in Broadcasts/update:`, error);
            throw new HttpException(
                error.message || 'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    /**
     * [AUTO-GENERATED] Endpoint for module "Broadcasts" action "delete".
     *  - Request Parameters (data): 
     * - credentialId: string
     * - RecordId: string (ID of the record to delete)
     * - Calls the integration helper "performConvertkitAction".
     * DO NOT modify the method signature.
     *  Example usage:
     * {
    
    "credentialId":"8d7940e2-6e9a-4248-9a25-6b112fa9b085",
    "data":{
    
    "id":18933536,
  "email_template_id":4167094,
  "email_address":"sanjubai1235@gmail.com",
  "content": "<p>How are </p>",
  "description": "introducting email",
  "public": true,
  "published_at": null,
  "send_at": null,
  "thumbnail_alt": null,
  "thumbnail_url": null,
  "preview_text": "Pleased to meet you!",
  "subject": "hai!",
  "subscriber_filter": [
    {
      "all": [
        {
          "type": "tag",
          "ids": [7113574]
        }
      ]
    }
  ]
}
}


     */


    @Post('broadcasts/delete')
    async deleteBroadcasts( @Body() data: any, @Res() res: Response) {
        if (!data) {
            throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
        }
        try {
            const result = await this.performConvertkitAction(`broadcasts/${data.data.id}`, 'delete','DELETE',data );
            if (result.status === 401) {
                const functionArgs = Array.from(arguments).slice(0, 2);
                const result = await this.AuthError("deleteBroadcasts", functionArgs, data.credentialId)
            }
            return res.status(HttpStatus.OK).json({
                message: `Convertkit Broadcasts delete executed successfully`,
                result,
            });
        } catch (error) {
            this.logger.error(`Error in Broadcasts/delete:`, error);
            throw new HttpException(
                error.message || 'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
    
    /**
     * [AUTO-GENERATED] Endpoint for module "Subscribers" action "create".
     *  - Request Parameters (data): 
     * - credentialId: string
     * - ModuleData: object (data to create)
     * - Calls the integration helper "performConvertkitAction".
     * DO NOT modify the method signature.
     *  Example usage:
     *  {
    
    "credentialId":"8d7940e2-6e9a-4248-9a25-6b112fa9b085",
    "data":{
    "id":18933536
    }
}
     */
    //  CustomFileds


    @Post('customfields/create')
    async createCustomFields(@Body() data: any, @Res() res: Response) {
        if (!data) {
            throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
        }
        try {
            const result = await this.performConvertkitAction('custom_fields', 'create','POST',data );
            if (result.status === 401) {
                const functionArgs = Array.from(arguments).slice(0, 2);
                const result = await this.AuthError("createCustomFields", functionArgs, data.credentialId)
            }
            return res.status(HttpStatus.OK).json({
                message: `Convertkit Custom create executed successfully`,
                result,
            });
        } catch (error) {
            this.logger.error(`Error in Customfields/create:`, error);
            throw new HttpException(
                error.message || 'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
    
    /**
     * [AUTO-GENERATED] Endpoint for module "Subscribers" action "create".
     *  - Request Parameters (data): 
     * - credentialId: string
     * - ModuleData: object (data to create)
     * - Calls the integration helper "performConvertkitAction".
     * DO NOT modify the method signature.
     *  Example usage:
     * {
    
    "credentialId":"8d7940e2-6e9a-4248-9a25-6b112fa9b085",
    "data":{
        "data":{
  "label": "kannan"
    }
}
}

     */
    @Post('customfields/getMany')
    async getCustomFields( @Body() data: any, @Res() res: Response) {
        if (!data) {
            throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
        }
        try {
            const result = await this.performConvertkitAction('custom_fields', 'getMany','GET',data);
            if (result.status === 401) {
                const functionArgs = Array.from(arguments).slice(0, 2);
                const result = await this.AuthError("getCustomFields", functionArgs, data.credentialId)
            }
            return res.status(HttpStatus.OK).json({
                message: `Convertkit Customfields getMany executed successfully`,
                result,
            });
        } catch (error) {
           
            this.logger.error(`Error in Custom/getMany`, error);
            throw new HttpException(
                error.message || 'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
    
    /**
     * [AUTO-GENERATED] Endpoint for module "Subscribers" action "create".
     *  - Request Parameters (data): 
     * - credentialId: string
     * - ModuleData: object (data to create)
     * - Calls the integration helper "performConvertkitAction".
     * DO NOT modify the method signature.
     *  Example usage:
     *  {
    
    "credentialId":"8d7940e2-6e9a-4248-9a25-6b112fa9b085",
    "data":{}
}
     */

    @Post('customfields/update')
    async updateCustomFields( @Body() data: any, @Res() res: Response) {
        if (!data) {
            throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
        }
        try {
            const result = await this.performConvertkitAction(`custom_fields`, 'update','PUT',data );
            if (result.status === 401) {
                const functionArgs = Array.from(arguments).slice(0, 2);
                const result = await this.AuthError("updateCustomFields", functionArgs, data.credentialId)
            }
            return res.status(HttpStatus.OK).json({
                message: `Convertkit Customfileds update executed successfully`,
                result,
            });
        } catch (error) {
            this.logger.error(`Error in Customfields/update:`, error);
            throw new HttpException(
                error.message || 'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
    
    /**
     * [AUTO-GENERATED] Endpoint for module "Subscribers" action "create".
     *  - Request Parameters (data): 
     * - credentialId: string
     * - ModuleData: object (data to create)
     * - Calls the integration helper "performConvertkitAction".
     * DO NOT modify the method signature.
     *  Example usage:
     *  {
    
    "credentialId":"8d7940e2-6e9a-4248-9a25-6b112fa9b085",
    "data":{
    
    "Id":923358,
    "data":{
    "label":"najns"
    }
    }
}
     */
    @Post('customfields/delete')
    async deleteCustomFields( @Body() data: any, @Res() res: Response) {
        if (!data) {
            throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
        }
        try {
            const result = await this.performConvertkitAction(`custom_fields/${data.id}`, 'delete','DELETE',data );
            if (result.status === 401) {
                const functionArgs = Array.from(arguments).slice(0, 2);
                const result = await this.AuthError("deleteCustomFields", functionArgs, data.credentialId)
            }
            return res.status(HttpStatus.OK).json({
                message: `Convertkit Customfileds delete executed successfully`,
                result,
            });
        } catch (error) {
            this.logger.error(`Error in Customfields/delete:`, error);
            throw new HttpException(
                error.message || 'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
    
    /**
     * [AUTO-GENERATED] Endpoint for module "Subscribers" action "create".
     *  - Request Parameters (data): 
     * - credentialId: string
     * - ModuleData: object (data to create)
     * - Calls the integration helper "performConvertkitAction".
     * DO NOT modify the method signature.
     *  Example usage:
     * {
    
    "credentialId":"8d7940e2-6e9a-4248-9a25-6b112fa9b085",
    "id":923343
}
     */
    @Post('bulkCustomfields/create')
    async createBulkCustomFileds( @Body() data: any, @Res() res: Response) {
        if (!data) {
            throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
        }
        try {
            const result = await this.performConvertkitAction('bulk/custom_fields', 'create','POST',data );
            if (result.status === 401) {
                const functionArgs = Array.from(arguments).slice(0, 2);
                const result = await this.AuthError("createBulkCustomFileds", functionArgs, data.credentialId)
            }
            return res.status(HttpStatus.OK).json({
                message: `Convertkit bulk Custom fields create executed successfully`,
                result,
            });
        } catch (error) {
            this.logger.error(`Error in BulkCustomfields/create:`, error);
            throw new HttpException(
                error.message || 'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    
    /**
     * [AUTO-GENERATED] Endpoint for module "Subscribers" action "create".
     *  - Request Parameters (data): 
     * - credentialId: string
     * - ModuleData: object (data to create)
     * - Calls the integration helper "performConvertkitAction".
     * DO NOT modify the method signature.
     *  Example usage:
     *  {
    
    "credentialId":"8d7940e2-6e9a-4248-9a25-6b112fa9b085",
    "data":{
        "data":{
  "custom_fields": [
    {
      "label": "Test Custom Field 0"
    },
    {
      "label": "Test Custom Field 1"
    },
    {
      "label": "Test Custom Field 2"
    },
    {
      "label": "Test Custom Field 3"
    }
  ]
}
    }
}
     */

    @Post('segments/getMany')
    async getSegments( @Body() data: any, @Res() res: Response) {

       
        if (!data) {
            throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
        }
        try {
            const result = await this.performConvertkitAction('segments', 'getMany','GET', data );
            if (result.status === 401) {
                const functionArgs = Array.from(arguments).slice(0, 2);
                const result = await this.AuthError("getSegments", functionArgs, data.credentialId)
            }
            return res.status(HttpStatus.OK).json({
                message: `Convertkit segments  getMany executed successfully`,
                result,
            });
        } catch (error) {
          

            this.logger.error(`Error in Segments/getMany:`, error);
            throw new HttpException(
                error.message || 'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    /**
     * [AUTO-GENERATED] Endpoint for module "Subscribers" action "create".
     *  - Request Parameters (data): 
     * - credentialId: string
     * - ModuleData: object (data to create)
     * - Calls the integration helper "performConvertkitAction".
     * DO NOT modify the method signature.
     *  Example usage:
     *  {
    
    "credentialId":"8d7940e2-6e9a-4248-9a25-6b112fa9b085",
    "data":{}
}
     */
    @Post('emailTemplates/getMany')
    async getEmailTemplates( @Body() data: any, @Res() res: Response) {
        if (!data) {
            throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
        }
        try {
            const result = await this.performConvertkitAction('email_templates ', 'getMany', 'GET',data);
            if (result.status === 401) {
                const functionArgs = Array.from(arguments).slice(0, 2);
                const result = await this.AuthError("getEmailTemplates", functionArgs, data.credentialId)
            }
            return res.status(HttpStatus.OK).json({
                message: `Convertkit EmailTemplates getMany executed successfully`,
                result,
            });
        } catch (error) {
            this.logger.error(`Error in EmailTemplates/getMany:`, error);
            throw new HttpException(
                error.message || 'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
    
    /**
     * [AUTO-GENERATED] Endpoint for module "Subscribers" action "create".
     *  - Request Parameters (data): 
     * - credentialId: string
     * - ModuleData: object (data to create)
     * - Calls the integration helper "performConvertkitAction".
     * DO NOT modify the method signature.
     *  Example usage:
     *  {
    
    "credentialId":"8d7940e2-6e9a-4248-9a25-6b112fa9b085",
    "data":{}
}
     */


    //Tags 
    @Post('tags/create')
    async createTags( @Body() data: any, @Res() res: Response) {
        if (!data) {
            throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
        }
        try {
            const result = await this.performConvertkitAction('tags', 'create','POST',data );
            if (result.status === 401) {
                const functionArgs = Array.from(arguments).slice(0, 2);
                const result = await this.AuthError("createTags", functionArgs, data.credentialId)
            }
            return res.status(HttpStatus.OK).json({
                message: `Convertkit Tags create executed successfully`,
                result,
            });
        } catch (error) {
            this.logger.error(`Error in tags/create:`, error);
            throw new HttpException(
                error.message || 'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
    
    /**
     * [AUTO-GENERATED] Endpoint for module "Subscribers" action "create".
     *  - Request Parameters (data): 
     * - credentialId: string
     * - ModuleData: object (data to create)
     * - Calls the integration helper "performConvertkitAction".
     * DO NOT modify the method signature.
     *  Example usage:
     *  {
    
    "credentialId":"8d7940e2-6e9a-4248-9a25-6b112fa9b085",
    "data":{
        "data":{
    "name":"kannan"
}
    }
}
     */
    @Post('tags/getMany')
    async getManyTags( @Body() data: any, @Res() res: Response) {
        if (!data) {
            throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
        }
        try {
            const result = await this.performConvertkitAction('tags', 'getMany','GET',data );
            if (result.status === 401) {
                const functionArgs = Array.from(arguments).slice(0, 2);
                const result = await this.AuthError("getManyTags", functionArgs, data.credentialId)
            }
            return res.status(HttpStatus.OK).json({
                message: `Convertkit Tags getMany executed successfully`,
                result,
            });
        } catch (error) {
            this.logger.error(`Error in tags/getMany:`, error);
            throw new HttpException(
                error.message || 'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    /**
     * [AUTO-GENERATED] Endpoint for module "Subscribers" action "create".
     *  - Request Parameters (data): 
     * - credentialId: string
     * - ModuleData: object (data to create)
     * - Calls the integration helper "performConvertkitAction".
     * DO NOT modify the method signature.
     *  Example usage:
     *  {
    
    "credentialId":"8d7940e2-6e9a-4248-9a25-6b112fa9b085",
    "data":{}
}
     */
    @Post('tags/update')
    async updateTags( @Body() data: any, @Res() res: Response) {
        if (!data) {
            throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
        }
        try {
            const result = await this.performConvertkitAction(`tags`, 'update','PUT',data );
            if (result.status === 401) {
                const functionArgs = Array.from(arguments).slice(0, 2);
                const result = await this.AuthError("updateTags", functionArgs, data.credentialId)
            }
            console.log('updated successfully', result)
            return res.status(HttpStatus.OK).json({
                message: `Convertkit Tags update executed successfully`,
                result,
            });
        } catch (error) {
            this.logger.error(`Error in tags/update:`, error);

            throw new HttpException(
                error.message || 'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
    
    /**
     * [AUTO-GENERATED] Endpoint for module "Subscribers" action "create".
     *  - Request Parameters (data): 
     * - credentialId: string
     * - ModuleData: object (data to create)
     * - Calls the integration helper "performConvertkitAction".
     * DO NOT modify the method signature.
     *  Example usage:
     *  {
    
    "credentialId":"8d7940e2-6e9a-4248-9a25-6b112fa9b085",
    "data":{
    "Id":7280581,

        "data":{
    "name":"mariselvam"
    }
    }
}
     */
    @Post('tagsSubscribe/create')
    async createTagsSubscribers( @Body() data: any, @Res() res: Response) {
        if (!data) {
            throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
        }
        try {
            const result = await this.performConvertkitAction(`tags/${data.data.tag_id}/subscribers/${data.data.subscribers_id} `, 'create','POST',data );
            if (result.status === 401) {
                const functionArgs = Array.from(arguments).slice(0, 2);
                const result = await this.AuthError("createTagsSubscribers", functionArgs, data.credentialId)
            }
            return res.status(HttpStatus.OK).json({
                message: `Convertkit Tags update executed successfully`,
                result,
            });
        } catch (error) {
            this.logger.error(`Error in tagsSubscriber/create:`, error);
            throw new HttpException(
                error.message || 'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
    
    /**
     * [AUTO-GENERATED] Endpoint for module "Subscribers" action "create".
     *  - Request Parameters (data): 
     * - credentialId: string
     * - ModuleData: object (data to create)
     * - Calls the integration helper "performConvertkitAction".
     * DO NOT modify the method signature.
     *  Example usage:
     *  {
    
    "credentialId":"8d7940e2-6e9a-4248-9a25-6b112fa9b085",
    "data":{
         "subscribers_id":3262432456,
    "tag_id":7280595,
        "data":{
   
}}}
     */
    @Post('subscribesTags/get')
    async getSubscribesTags( @Body() data: any, @Res() res: Response) {
        if (!data) {
            throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
        }
        try {
            const result = await this.performConvertkitAction(`tags/${data.data.id}/subscribers`, 'get', 'GET',data);
            if (result.status === 401) {
                const functionArgs = Array.from(arguments).slice(0, 2);
                const result = await this.AuthError("getSubscribesTags", functionArgs, data.credentialId)
            }
            return res.status(HttpStatus.OK).json({
                message: `Convertkit Tags get executed successfully`,
                result,
            });
        } catch (error) {
            this.logger.error(`Error in tags/create:`, error);
            throw new HttpException(
                error.message || 'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
    
    /**
     * [AUTO-GENERATED] Endpoint for module "Subscribers" action "create".
     *  - Request Parameters (data): 
     * - credentialId: string
     * - ModuleData: object (data to create)
     * - Calls the integration helper "performConvertkitAction".
     * DO NOT modify the method signature.
     *  Example usage:
     *  
{
    
    "credentialId":"8d7940e2-6e9a-4248-9a25-6b112fa9b085",
    "data":{
    "id":7280595,

        "data":{


        }
    }
}
     */
    @Post('tagsSubscriberEmail/create')
    async createTagsSubscribersEmail( @Body() data: any, @Res() res: Response) {
        if (!data) {
            throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
        }
        try {
            const result = await this.performConvertkitAction(`tags/${data.data.tags_id}/subscribers`, 'create','POST',data );
            if (result.status === 401) {
                const functionArgs = Array.from(arguments).slice(0, 2);
                const result = await this.AuthError("createTagsSubscribersEmail", functionArgs, data.credentialId)
            }
            return res.status(HttpStatus.OK).json({
                message: `Convertkit TagsSubscribers Email create executed successfully`,
                result,
            });
        } catch (error) {
            this.logger.error(`Error in tagsSubscriberemail/create:`, error);
            throw new HttpException(
                error.message || 'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
    
    /**
     * [AUTO-GENERATED] Endpoint for module "Subscribers" action "create".
     *  - Request Parameters (data): 
     * - credentialId: string
     * - ModuleData: object (data to create)
     * - Calls the integration helper "performConvertkitAction".
     * DO NOT modify the method signature.
     *  Example usage:
     *  {
    
    "credentialId":"8d7940e2-6e9a-4248-9a25-6b112fa9b085",
    "data":{
    "tags_id":7280595,
    "data":{
    "email_address":"harish@gmail.com"
}
}
}
     */
    @Post('tagsSubscriberEmail/delete')
    async removeTagsSubscribersEmail( @Body() data: any, @Res() res: Response) {
        if (!data) {
            throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
        }
        try {
            const result = await this.performConvertkitAction(`tags/${data.data.tags_id}/subscribers `, 'delete','DELETE',data );
            if (result.status === 401) {
                const functionArgs = Array.from(arguments).slice(0, 2);
                const result = await this.AuthError("removeTagsSubscribersEmail", functionArgs, data.credentialId)
            }
            return res.status(HttpStatus.OK).json({
                message: `Convertkit TagsSubscribers Email delete executed successfully`,
                result,
            });
        } catch (error) {
            this.logger.error(`Error in tagsSubscriberemail/delete:`, error);
            throw new HttpException(
                error.message || 'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
    
    /**
     * [AUTO-GENERATED] Endpoint for module "Subscribers" action "create".
     *  - Request Parameters (data): 
     * - credentialId: string
     * - ModuleData: object (data to create)
     * - Calls the integration helper "performConvertkitAction".
     * DO NOT modify the method signature.
     *  Example usage:
     *  {
    
    "credentialId":"8d7940e2-6e9a-4248-9a25-6b112fa9b085",
    "data":{
    "tags_id":7280595,
    "data":{
    "email_address":"harish@gmail.com"
}
}}
     */
    @Post('bulkTags/create')
    async createBulkTags(@Body() data: any, @Res() res: Response) {
        if (!data) {
            throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
        }
        try {
            const result = await this.performConvertkitAction('bulk/tags', 'create','POST',data );
            if (result.status === 401) {
                const functionArgs = Array.from(arguments).slice(0, 2);
                const result = await this.AuthError("createBulkTags", functionArgs, data.credentialId)
            }
            return res.status(HttpStatus.OK).json({
                message: `Convertkit Bulk Tags create executed successfully`,
                result,
            });
        } catch (error) {
            this.logger.error(`Error in tags/create:`, error);
            throw new HttpException(
                error.message || 'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
    
    /**
     * [AUTO-GENERATED] Endpoint for module "Subscribers" action "create".
     *  - Request Parameters (data): 
     * - credentialId: string
     * - ModuleData: object (data to create)
     * - Calls the integration helper "performConvertkitAction".
     * DO NOT modify the method signature.
     *  Example usage:
     *  {
    
    "credentialId":"8d7940e2-6e9a-4248-9a25-6b112fa9b085",
    "data":{
        "data":{
  "taggings": [
    {
      "tag_id": 7160977,
      "subscriber_id":3262432456
    },
    {
      "tag_id": 7160978,
      "subscriber_id":3262432371
    },
    {
      "tag_id": 7160979,
      "subscriber_id":3262432152
    },
    {
      "tag_id": 7160981,
      "subscriber_id":3262432267
    }
  ],
  "callback_url": null
}
}
     */
    @Post('bulkTagsSubscribers/create')
    async createBulkTagsSubscribes( @Body() data: any, @Res() res: Response) {
        if (!data) {
            throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
        }
        try {
            const result = await this.performConvertkitAction('bulk/tags/subscribers', 'create', 'POST',data);
            if (result.status === 401) {
                const functionArgs = Array.from(arguments).slice(0, 2);
                const result = await this.AuthError("createBulkTagsSubscribes", functionArgs, data.credentialId)
            }
            return res.status(HttpStatus.OK).json({
                message: `Convertkit BulkTagsSubscribes create executed successfully`,
                result,
            });
        } catch (error) {
            this.logger.error(`Error in tags/create:`, error);
            throw new HttpException(
                error.message || 'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
    
    /**
     * [AUTO-GENERATED] Endpoint for module "Subscribers" action "create".
     *  - Request Parameters (data): 
     * - credentialId: string
     * - ModuleData: object (data to create)
     * - Calls the integration helper "performConvertkitAction".
     * DO NOT modify the method signature.
     *  Example usage:
     *  {
    
    "credentialId":"8d7940e2-6e9a-4248-9a25-6b112fa9b085",
    "data":{
        "data":{
  "tags": [
    {
      "name": "Test Tag 0"
    },
    {
      "name": "Test Tag 1"
    },
    {
      "name": "Test Tag 2"
    },
    {
      "name": "Test Tag 3"
    }
  ],
  "callback_url": null
}
}
}
     */
    @Post('bulkTagsSubscribers/delete')
    async deleteBulkTagsSubscribes( @Body() data: any, @Res() res: Response) {
        if (!data) {
            throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
        }
        try {
            const result = await this.performConvertkitAction('bulk/tags/subscribers', 'delete', 'DELETE',data);
            if (result.status === 401) {
                const functionArgs = Array.from(arguments).slice(0, 2);
                const result = await this.AuthError("deleteBulkTagsSubscribes", functionArgs, data.credentialId)
            }
            return res.status(HttpStatus.OK).json({
                message: `Convertkit BulkTagsSubscribes deleted executed successfully`,
                result,
            });
        } catch (error) {
            this.logger.error(`Error in tags/create:`, error);

            throw new HttpException(
                error.message || 'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
    
    /**
     * [AUTO-GENERATED] Endpoint for module "Subscribers" action "create".
     *  - Request Parameters (data): 
     * - credentialId: string
     * - ModuleData: object (data to create)
     * - Calls the integration helper "performConvertkitAction".
     * DO NOT modify the method signature.
     *  Example usage:
     *  {
    
    "credentialId":"8d7940e2-6e9a-4248-9a25-6b112fa9b085",
    "data":{
  "taggings": [
    {
      "tag_id": 7160977,
      "subscriber_id":3262432456
    },
    {
      "tag_id": 7160978,
      "subscriber_id":3262432371
    },
    {
      "tag_id": 7160979,
      "subscriber_id":3262432152
    },
    {
      "tag_id": 7160981,
      "subscriber_id":3262432267
    }
  ],
  "callback_url": null
}
}
     */

    // Fields
    // Subscribers


    @Post('subscribers/getAll')
    async getAllSubscriber( @Body() data: any) {
        if (!data) {
            throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
        }
        try {
            console.log('hello')
            const result = await this.performConvertkitAction('subscribers', 'getMany', 'GET',data);
            if (result.status === 401) {
                const functionArgs = Array.from(arguments).slice(0, 2);
                const result = await this.AuthError("getAllSubscriber", functionArgs, data.credentialId)
            }
            const response = result.response.subscribers.map(subscribers => ({ id: subscribers.id, first_name: subscribers.first_name, email_address: subscribers.email_address }));
            // console.log(response)
            // return res.status(HttpStatus.OK).json({
            //   message: `Convertkit Subscribers getMany executed successfully`,
            //   result,
            // });
            return { response, status: result.status }

        } catch (error) {
            this.logger.error(`Error in Subscribers/getMany:`, error);
            throw new HttpException(
                error.message || 'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
    // Broadcasts

    @Post('broadcasts/getAll')
    async getAllBroadcasts( @Body() data: any) {
       

        try {
            const result = await this.performConvertkitAction('broadcasts', 'getMany','GET',data );
            if (result.status === 401) {
                const functionArgs = Array.from(arguments).slice(0, 2);
                const result = await this.AuthError("getAllBroadcasts", functionArgs, data.credentialId)
            }

            const response = result.response.broadcasts.map(broadcasts => ({ id: broadcasts.id, created_at: broadcasts.created_at }))
           
            return {response:result.data,status:result.status}
        } catch (error) {
            this.logger.error(`Error in Broadcasts/getMany:`, error);  
            throw new HttpException(
                error.message || 'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    // Custom Fields
    @Post('customFields/getAll')
    async getAllCustomFields( @Body() data: any) {
        if (!data) {
            throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
        }
        try {
            console.log('hello')
            const result = await this.performConvertkitAction('custom_fields', 'getMany','GET',data );
            if (result.status === 401) {
                const functionArgs = Array.from(arguments).slice(0, 2);
                const result = await this.AuthError("getAllCustomFields", functionArgs, data.credentialId)
            }
            const response = result.response.custom_fields.map(custom_fields => ({ id: custom_fields.id, name: custom_fields.name }));
           
            return {response:result.data,status:result.status}

            

        } catch (error) {
            this.logger.error(`Error in Custom/getMany`, error);
            throw new HttpException(
                error.message || 'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    //  Segments
    @Post('segments/getAll')
    async getAllSegments( @Body() data: any) {
        if (!data) {
            throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
        }
        try {
            const result = await this.performConvertkitAction('segments  ', 'getMany', 'GET',data);
            if (result.status === 401) {
                const functionArgs = Array.from(arguments).slice(0, 2);
                const result = await this.AuthError("getAllCustomFields", functionArgs, data.credentialId)
            }
            const response = result.response.segments.map(segments => ({ id: segments.id, name: segments.name }))

           
            return {response:result.data,status:result.status}

        } catch (error) {
            this.logger.error(`Error in Segments/getMany:`, error);
            throw new HttpException(
                error.message || 'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
    //  EmailTemplates
    @Post('emailTemplates/getAll')
    async getAllEmailTemplates( @Body() data: any) {
        if (!data) {
            throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
        }
        try {
            const result = await this.performConvertkitAction('email_templates ', 'getMany','GET',data );
            if (result.status === 401) {
                const functionArgs = Array.from(arguments).slice(0, 2);
                const result = await this.AuthError("getAllEmailTemplates", functionArgs, data.credentialId)
            }
            const response = result.response.email_templates.map(email_templates => ({ id: email_templates.id, name: email_templates.name }))
         
            return {response:result.data,status:result.status}

        } catch (error) {
            this.logger.error(`Error in EmailTemplates/getMany:`, error);
            throw new HttpException(
                error.message || 'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
    //  tags
    @Post('tags/getAll')
    async getAllTags( @Body() data: any) {
        if (!data) {
            throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
        }
        try {
            const result = await this.performConvertkitAction('tags', 'getMany','GET',data );
            if (result.status === 401) {
                const functionArgs = Array.from(arguments).slice(0, 2);
                const result = await this.AuthError("getAllTags", functionArgs, data.credentialId)
            }
            const response = result.response.tags.map(tags => ({ id: tags.id, name: tags.name }))
          
            return {response:result,status:result.status}

        } catch (error) {
            this.logger.error(`Error in tags/getMany:`, error);
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
            const access_token = credentialRepository.auth_data.token.access_token;
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
    private async performConvertkitAction(module: string, action: string,method:any,data:any): Promise<any> {
        // TODO: Implement the actual integration logic.
        // For example:
        // 1. Initialize your API client using a refresh token or saved credentials.
        // 2. Validate that 'data' contains required fields (credentialId, ModuleId, ModuleData).
        // 3. Use the correct HTTP method based on the action (GET, POST, PATCH, DELETE, etc.).
        // 4. Handle errors and return the API response.
        // 5. If the access token is expired, call the refreshToken endpoint.

        const resultData=await this.curl(module,action,method,data);
        return resultData

    }
        public async curl(module:string,action:string,method:string,argumentdata:any):Promise<any>{

            try{
                 const {credentialId,data}=argumentdata;
                 const initializeData=await this.initialize(credentialId)

                 const access_token=initializeData;
                 const baseUrl=`https://api.kit.com/v4/`
                 let url=`${baseUrl}${module}`

                 if(data.Id) url+= `/${data.Id}`

                 const options:any={
                    method,url,headers:{
                        "Authorization":`Bearer ${access_token}`,
                        "Content-Type":"application/json"
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
                
            }catch (error) {
                    return { response: [error.response?.data || error.message], status: error.status || 500 };
                }
            }
async handleError(err) {
        return {
            response: [err.response.data],
            status: err.status
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
export const kit= new ConvertkitController()
