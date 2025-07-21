// everhour.controller.ts
// -----------------------------------------------------------------------------
// AUTO-GENERATED CONTROLLER FILE.
// DO NOT modify the auto-generated endpoints below.
// For custom integration logic, extend the helper "performeverhourAction".
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
import config, { XappName, fields, modules as xappModules } from './everhour.config';
import { CredentialController } from 'src/credential/credential.controller';

@Controller('everhour')
export class EverhourController {
    private logger = new CustomLogger();
    private credentialController = new CredentialController();

    /**
  * [AUTO-GENERATED] OAuth authorize endpoint.
  * This endpoint initiates the authentication flow.
  * Implement the actual token request and error handling as needed.
  */

    @Post('authorize')
    async authorize(@Body() reqBody: any, @Res() res: Response) {
        if (!reqBody.apiKey) {
            throw new HttpException('Missing APIKEY ', HttpStatus.BAD_REQUEST)
        }
        try {
            const { apiKey, baseUrl, name, authType } = reqBody;

            const state = crypto.randomBytes(16).toString('hex');
            const authData = {
                apiKey: apiKey,
                baseUrl: baseUrl,
                state: state
            }
            const requestbody = {
                name: name,
                type: authType,
                data: authData
            };
            if (reqBody.id) {
                await this.credentialController.updateCredentials(reqBody.id, authData);
                this.logger.debug('Credentials with ID updated successful', reqBody.id);
            } else {
                await this.credentialController.createCredentials(requestbody, res);
                this.logger.debug('New Credentials create fot:', name);
            }
            this.logger.debug(`${XappName} auth Credentials Stored:`,);
            return res.status(HttpStatus.OK).send({ 'Everything Stored ': state });
        } catch (error) {
            this.logger.error('Error in authorize:', error);
            throw new HttpException('Authorization error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    /**
 * [AUTO-GENERATED] Endpoint for module "clients" action "create".
 *  - Request Parameters (data): 
 * - CredentialId: string
 * - RecordId: string (ID of the record to delete)
 * - Calls the integration helper "performEverhour".
 * DO NOT modify the method signature.
 *  Example usage:
 *  {
  "credentialsId":"{{credentialsId}}",
  "data":{
      "data":{
          "name":"Harish"
      }
  }
}

 */

    @Post('clients/create')
    async createClients(@Body() data: any, @Res() res: Response) {
        if (!data) {
            throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
        }
        try {
            const result = await this.performEverhour('clients', 'create', 'post', data);
            return res.status(HttpStatus.OK).json({
                message: `Everhour clients created executed successfully`,
                result,
            });
        } catch (error) {
            this.logger.error(`Error in clients/create:`, error);
            throw new HttpException(
                error.message || 'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    /**
* [AUTO-GENERATED] Endpoint for module "clients" action "update".
*  - Request Parameters (data): 
* - CredentialId: string
* - RecordId: string (ID of the record to delete)
* - Calls the integration helper "performEverhour".
* DO NOT modify the method signature.
*  Example usage:
* {
"credentialsId":"{{credentialsId}}",
"data":{
  "Id":"10029946",
  "data":{
      "name":"selvakumar"            
  }
}
}

*/

    @Post('clients/update')
    async updateClients(@Body() data: any, @Res() res: Response) {
        if (!data) {
            throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
        }
        try {
            const result = await this.performEverhour('clients', 'update', 'put', data);
            return res.status(HttpStatus.OK).json({
                message: `Everhour clients updated executed successfully`,
                result,
            });
        } catch (error) {
            this.logger.error(`Error in clients/update:`, error);
            throw new HttpException(
                error.message || 'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    /**
* [AUTO-GENERATED] Endpoint for module "clients" action "delete".
*  - Request Parameters (data): 
* - CredentialId: string
* - RecordId: string (ID of the record to delete)
* - Calls the integration helper "performEverhour".
* DO NOT modify the method signature.
*  Example usage:
* {
"credentialsId":"{{credentialsId}}",
"data":{
  "Id":"10029946"
}
}

*/

    @Post('clients/delete')
    async deleteClients(@Body() data: any, @Res() res: Response) {
        if (!data) {
            throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
        }
        try {
            const result = await this.performEverhour('clients', 'delete', 'delete', data);
            return res.status(HttpStatus.OK).json({
                message: `Everhour clients deleted executed successfully`,
                result,
            });
        } catch (error) {
            this.logger.error(`Error in clients/delete:`, error);
            throw new HttpException(
                error.message || 'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    /**
* [AUTO-GENERATED] Endpoint for module "clients" action "get".
*  - Request Parameters (data): 
* - CredentialId: string
* - RecordId: string (ID of the record to delete)
* - Calls the integration helper "performEverhour".
* DO NOT modify the method signature.
*  Example usage:
* {
"credentialsId":"{{credentialsId}}",
"data":{
"Id":"10030171"
}
}
*/

    @Post('clients/get')
    async getClients(@Body() data: any, @Res() res: Response) {
        if (!data) {
            throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
        }
        try {
            const result = await this.performEverhour('clients', 'get', 'get', data);
            return res.status(HttpStatus.OK).json({
                message: `Everhour clients get executed successfully`,
                result,
            });
        } catch (error) {
            this.logger.error(`Error in clients/get:`, error);
            throw new HttpException(
                error.message || 'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    /**
* [AUTO-GENERATED] Endpoint for module "clients" action "delete".
*  - Request Parameters (data): 
* - CredentialId: string
* - RecordId: string (ID of the record to delete)
* - Calls the integration helper "performEverhour".
* DO NOT modify the method signature.
*  Example usage:
*  {
"credentialsId":"{{credentialsId}}",
"data":{
 
}
}

*/

    @Post('clients/getMany')
    async getmanyClients(@Body() data: any, @Res() res: Response) {
        if (!data) {
            throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
        }
        try {
            const result = await this.performEverhour('clients', 'getMany', 'get', data);
            return res.status(HttpStatus.OK).json({
                message: `Everhour clients getMany executed successfully`,
                result,
            });
        } catch (error) {
            this.logger.error(`Error in clients/getMany:`, error);
            throw new HttpException(
                error.message || 'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    /**
* [AUTO-GENERATED] Endpoint for module "projects" action "create ".
*  - Request Parameters (data): 
* - CredentialId: string
* - RecordId: string (ID of the record to delete)
* - Calls the integration helper "performEverhour".
* DO NOT modify the method signature.
*  Example usage:
* {
    "credentialsId": "{{credentialsId}}",
    "data": {
        "data": {
            "name": "New Projects 7",
            "type": "board"
        }
    }
}
*/

    @Post('projects/create')
    async createProject(@Body() data: any, @Res() res: Response) {
        if (!data) {
            throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
        }
        try {
            const result = await this.performEverhour('projects', 'create', 'post', data);
            return res.status(HttpStatus.OK).json({
                message: `Everhour projects created executed successfully`,
                result,
            });
        } catch (error) {
            this.logger.error(`Error in projects/create:`, error);
            throw new HttpException(
                error.message || 'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }


    /**
* [AUTO-GENERATED] Endpoint for module "projects" action "update ".
*  - Request Parameters (data): 
* - CredentialId: string
* - RecordId: string (ID of the record to delete)
* - Calls the integration helper "performEverhour".
* DO NOT modify the method signature.
*  Example usage:
*  {
"credentialsId":"{{credentialsId}}",
"data":{
"Id":"ev:191024153489538",
"data":{
"name":"New Project 1",
"canSyncTasks": true,
  "users": [
      1399503
  ]
}
}
}
*/

    @Post('projects/update')
    async updateProject(@Body() data: any, @Res() res: Response) {
        if (!data) {
            throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
        }
        try {
            const result = await this.performEverhour('projects', 'update', 'put', data);
            return res.status(HttpStatus.OK).json({
                message: `Everhour projects updated executed successfully`,
                result,
            });
        } catch (error) {
            this.logger.error(`Error in projects/update:`, error);
            throw new HttpException(
                error.message || 'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }


    /**
* [AUTO-GENERATED] Endpoint for module "projects" action "delete ".
*  - Request Parameters (data): 
* - CredentialId: string
* - RecordId: string (ID of the record to delete)
* - Calls the integration helper "performEverhour".
* DO NOT modify the method signature.
*  Example usage:
* {
"credentialsId":"{{credentialsId}}",
"data":{
"Id":"ev:191024173969350"
}
}

*/

    @Post('projects/delete')
    async deleteProject(@Body() data: any, @Res() res: Response) {
        if (!data) {
            throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
        }
        try {
            const result = await this.performEverhour('projects', 'delete', 'delete', data);
            return res.status(HttpStatus.OK).json({
                message: `Everhour projects deleted executed successfully`,
                result,
            });
        } catch (error) {
            this.logger.error(`Error in projects/delete:`, error);
            throw new HttpException(
                error.message || 'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }


    /**
* [AUTO-GENERATED] Endpoint for module "projects" action "get ".
*  - Request Parameters (data): 
* - CredentialId: string
* - RecordId: string (ID of the record to delete)
* - Calls the integration helper "performEverhour".
* DO NOT modify the method signature.
*  Example usage:
* {
"credentialsId":"{{credentialsId}}",
"data":{
"Id":"ev:191024153489538"
}
}

*/

    @Post('projects/get')
    async Project(@Body() data: any, @Res() res: Response) {
        if (!data) {
            throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
        }
        try {
            const result = await this.performEverhour('projects', 'get', 'get', data);
            return res.status(HttpStatus.OK).json({
                message: `Everhour projects created executed successfully`,
                result,
            });
        } catch (error) {
            this.logger.error(`Error in projects/get:`, error);
            throw new HttpException(
                error.message || 'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }


    /**
* [AUTO-GENERATED] Endpoint for module "projects" action "getMany ".
*  - Request Parameters (data): 
* - CredentialId: string
* - RecordId: string (ID of the record to delete)
* - Calls the integration helper "performEverhour".
* DO NOT modify the method signature.
*  Example usage:
*  {
"credentialsId":"{{credentialsId}}",
"data":{
 
}
}

*/

    @Post('projects/getMany')
    async getmanyProject(@Body() data: any, @Res() res: Response) {
        if (!data) {
            throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
        }
        try {
            const result = await this.performEverhour('projects', 'getMany', 'get', data);
            return res.status(HttpStatus.OK).json({
                message: `Everhour projects getMany executed successfully`,
                result,
            });
        } catch (error) {
            this.logger.error(`Error in projects/getMany:`, error);
            throw new HttpException(
                error.message || 'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    /**
* [AUTO-GENERATED] Endpoint for module "clients/${data.clientId}/invoices" action "create".
*  - Request Parameters (data): 
* - CredentialId: string
* - RecordId: string (ID of the record to delete)
* - Calls the integration helper "performEverhour".
* DO NOT modify the method signature.
*  Example usage:
* {
    "credentialsId": "{{credentialsId}}",
    "data": {
            "clientId": "10035361",

        "data": {
        }
    }
}



*/

    @Post('invoices/create')
    async createInvoice(@Body() data: any, @Res() res: Response) {
        if (!data) {
            throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
        }
        try {
            const result = await this.performEverhour(`clients/${data.data.clientId}/invoices`, 'create', 'post', data);
            return res.status(HttpStatus.OK).json({
                message: `Everhour invoice create executed successfully`,
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
* [AUTO-GENERATED] Endpoint for module "invoices" action "update".
*  - Request Parameters (data): 
* - CredentialId: string
* - RecordId: string (ID of the record to delete)
* - Calls the integration helper "performEverhour".
* DO NOT modify the method signature.
*  Example usage:
* {
"credentialsId": "{{credentialsId}}",
"data": {
"Id": "471074",
"data": {
  "limitDateFrom": "2019-03-11",
  "limitDateTill": "2019-03-13",
  "includeExpenses": true,
  "includeTime": true,
  "totalAmount": "2000",
  "projects": [
      "gh:63301595"
  ],
  "tax": {
      "rate": 11,
      "amount": 1512
  },
  "discount": {
      "amount": 4581,
      "rate": 25
  },
  "invoiceItems": [
      {
          "id": "ev:191024153489538",
          "name": "Software Development",
          "billedTime": 415860,
          "listAmount": 288793,
          "taxable": false,
          "position": 1
      },
      {
          "id": "ev:191024153489538",
          "name": "Softw2 Development",
          "billedTime": 415860,
          "listAmount": 288793,
          "taxable": false,
          "position": 1
      }
  ]
}
}
}

*/

    @Post('invoices/update')
    async updateInvoice(@Body() data: any, @Res() res: Response) {
        if (!data) {
            throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
        }
        try {
            const result = await this.performEverhour(`invoices`, 'update', 'put', data)
            return res.status(HttpStatus.OK).json({
                message: `Everhour invoice update executed successfully`,
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
* - CredentialId: string
* - RecordId: string (ID of the record to delete)
* - Calls the integration helper "performEverhour".
* DO NOT modify the method signature.
*  Example usage:
* {
"credentialsId":"{{credentialsId}}",
 
"data":{   "Id":"470881"
}
}

*/

    @Post('invoices/delete')
    async deleteInvoice(@Body() data: any, @Res() res: Response) {
        if (!data) {
            throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
        }
        try {
            const result = await this.performEverhour(`invoices`, 'delete', 'delete', data);
            return res.status(HttpStatus.OK).json({
                message: `Everhour invoice delete executed successfully`,
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
* [AUTO-GENERATED] Endpoint for module "invoices" action "get".
*  - Request Parameters (data): 
* - CredentialId: string
* - RecordId: string (ID of the record to delete)
* - Calls the integration helper "performEverhour".
* DO NOT modify the method signature.
*  Example usage:
*  {
"credentialsId":"{{credentialsId}}",
 
"data":{   
"Id":"470897"
}
}
*/

    @Post('invoices/get')
    async getInvoice(@Body() data: any, @Res() res: Response) {
        if (!data) {
            throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
        }
        try {
            const result = await this.performEverhour(`invoices`, 'get', 'get', data);
            return res.status(HttpStatus.OK).json({
                message: `Everhour invoice get executed successfully`,
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
* - CredentialId: string
* - RecordId: string (ID of the record to delete)
* - Calls the integration helper "performEverhour".
* DO NOT modify the method signature.
*  Example usage:
*  {
"credentialsId":"{{credentialsId}}",
 
"data":{

}
 
}

*/

    @Post('invoices/getMany')
    async getmanyInvoice(@Body() data: any, @Res() res: Response) {
        if (!data) {
            throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
        }
        try {
            const result = await this.performEverhour(`invoices`, 'getMany', 'get', data);
            return res.status(HttpStatus.OK).json({
                message: `Everhour invoice getMany executed successfully`,
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
* [AUTO-GENERATED] Endpoint for module "category" action "create".
*  - Request Parameters (data): 
* - CredentialId: string
* - RecordId: string (ID of the record to delete)
* - Calls the integration helper "performEverhour".
* DO NOT modify the method signature.
*  Example usage:
* {
    "credentialsId": "{{credentialsId}}",
    "data": {
        "data": {
            "color": "#92dfb5",
            "name": "Anto"
        }
    }
}


*/

    @Post('category/create')
    async createCategory(@Body() data: any, @Res() res: Response) {
        if (!data) {
            throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
        }
        try {
            const result = await this.performEverhour(`expenses/categories`, 'create', 'post', data);
            return res.status(HttpStatus.OK).json({
                message: `Everhour category create executed successfully`,
                result,
            });
        } catch (error) {
            this.logger.error(`Error in category/create:`, error);
            throw new HttpException(
                error.message || 'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }


    /**
* [AUTO-GENERATED] Endpoint for module "category" action "update".
*  - Request Parameters (data): 
* - CredentialId: string
* - RecordId: string (ID of the record to delete)
* - Calls the integration helper "performEverhour".
* DO NOT modify the method signature.
*  Example usage:
*  {
    "credentialsId": "{{credentialsId}}",
    "data": {
        "Id": "723370",
        "data": {
            "name": "Yousuf"
        }
    }
}


*/

    @Post('category/update')
    async updateCategory(@Body() data: any, @Res() res: Response) {
        if (!data) {
            throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
        }
        try {
            const result = await this.performEverhour(`expenses/categories`, 'update', 'PUT', data);
            return res.status(HttpStatus.OK).json({
                message: `Everhour category update executed successfully`,
                result,
            });
        } catch (error) {
            this.logger.error(`Error in category/update:`, error);
            throw new HttpException(
                error.message || 'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    /**
* [AUTO-GENERATED] Endpoint for module "category" action "getMany".
*  - Request Parameters (data): 
* - CredentialId: string
* - RecordId: string (ID of the record to delete)
* - Calls the integration helper "performEverhour".
* DO NOT modify the method signature.
*  Example usage:
*  {
    "credentialsId": "{{credentialsId}}",
    "data": {}
}


*/

    @Post('category/getMany')
    async getManyCatgeory(@Body() data: any, @Res() res: Response) {
        if (!data) {
            throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
        }
        try {
            const result = await this.performEverhour(`expenses/categories`, 'getMany', 'GET', data);
            return res.status(HttpStatus.OK).json({
                message: `Everhour category getMany executed successfully`,
                result,
            });
        } catch (error) {
            this.logger.error(`Error in category/getMany:`, error);
            throw new HttpException(
                error.message || 'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }


    /**
* [AUTO-GENERATED] Endpoint for module "category" action "delete".
*  - Request Parameters (data): 
* - CredentialId: string
* - RecordId: string (ID of the record to delete)
* - Calls the integration helper "performEverhour".
* DO NOT modify the method signature.
*  Example usage:
*  {
    "credentialsId": "{{credentialsId}}",
    "data": {
        "Id": "723370"
    }
}


*/

    @Post('category/delete')
    async deleteCategory(@Body() data: any, @Res() res: Response) {
        if (!data) {
            throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
        }
        try {
            const result = await this.performEverhour(`expenses/categories`, 'delete', 'DELETE', data);
            return res.status(HttpStatus.OK).json({
                message: `Everhour category delete executed successfully`,
                result,
            });
        } catch (error) {
            this.logger.error(`Error in category/delete:`, error);
            throw new HttpException(
                error.message || 'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
    /**
* [AUTO-GENERATED] Endpoint for module "section" action "create".
*  - Request Parameters (data): 
* - CredentialId: string
* - RecordId: string (ID of the record to delete)
* - Calls the integration helper "performEverhour".
* DO NOT modify the method signature.
*  Example usage:
*  {
"credentialsId": "{{credentialsId}}",
"data": {
"id": "ev:191024173205091",
"data": {
"name": "New Sections 4"
}
}
}


*/
    @Post('section/create')
    async createSection(@Body() data: any, @Res() res: Response) {
        if (!data) {
            throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
        }
        try {
            const result = await this.performEverhour(`projects/${data.data.id}/sections`, 'create', 'POST', data); // using Project ID
            return res.status(HttpStatus.OK).json({
                message: `Everhour section create executed successfully`,
                result,
            });
        } catch (error) {
            this.logger.error(`Error in section/create:`, error);
            throw new HttpException(
                error.message || 'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    /**
* [AUTO-GENERATED] Endpoint for module "section" action "get".
*  - Request Parameters (data): 
* - CredentialId: string
* - RecordId: string (ID of the record to delete)
* - Calls the integration helper "performEverhour".
* DO NOT modify the method signature.
*  Example usage:
*  {
"credentialsId": "{{credentialsId}}",
"data": {
"Id": "1289277"
}
}

*/
    @Post('section/get')
    async getSection(@Body() data: any, @Res() res: Response) {
        if (!data) {
            throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
        }
        try {
            const result = await this.performEverhour(`sections`, 'get', 'GET', data);
            return res.status(HttpStatus.OK).json({
                message: `Everhour section get executed successfully`,
                result,
            });
        } catch (error) {
            this.logger.error(`Error in webhooks/get:`, error);
            throw new HttpException(
                error.message || 'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    /**
* [AUTO-GENERATED] Endpoint for module "sections" action "update".
*  - Request Parameters (data): 
* - CredentialId: string
* - RecordId: string (ID of the record to delete)
* - Calls the integration helper "performEverhour".
* DO NOT modify the method signature.
*  Example usage:
*  {
"credentialsId": "{{credentialsId}}",
"data": {
"Id": "1289277",
"data": {
"name": "Updated Sections"
}
}
}

*/
    @Post('section/update')
    async updateSections(@Body() data: any, @Res() res: Response) {
        if (!data) {
            throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
        }
        try {
            const result = await this.performEverhour(`sections`, 'update', 'PUT', data);
            return res.status(HttpStatus.OK).json({
                message: `Everhour section update executed successfully`,
                result,
            });
        } catch (error) {
            this.logger.error(`Error in webhooks/get:`, error);
            throw new HttpException(
                error.message || 'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    /**
* [AUTO-GENERATED] Endpoint for module "section" action "delete".
*  - Request Parameters (data): 
* - CredentialId: string
* - RecordId: string (ID of the record to delete)
* - Calls the integration helper "performEverhour".
* DO NOT modify the method signature.
*  Example usage:
*  {
"credentialsId":"{{credentialsId}}",
"data":{
"Id":"1289273"
}
}


*/
    @Post('section/delete')
    async deleteSectionm(@Body() data: any, @Res() res: Response) {
        if (!data) {
            throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
        }
        try {
            const result = await this.performEverhour(`sections`, 'delete', 'DELETE', data);
            return res.status(HttpStatus.OK).json({
                message: `Everhour sections delete executed successfully`,
                result,
            });
        } catch (error) {
            this.logger.error(`Error in webhooks/get:`, error);
            throw new HttpException(
                error.message || 'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    /**
* [AUTO-GENERATED] Endpoint for module "section" action "getMany".
*  - Request Parameters (data): 
* - CredentialId: string
* - RecordId: string (ID of the record to delete)
* - Calls the integration helper "performEverhour".
* DO NOT modify the method signature.
*  Example usage:
* {
"credentialsId": "{{credentialsId}}",
"data": {
"id": "ev:191024173205091"
}
}


*/
    @Post('section/getMany')
    async getManySection(@Body() data: any, @Res() res: Response) {
        if (!data) {
            throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
        }
        try {
            const result = await this.performEverhour(`projects/${data.data.id}/sections`, 'getMany', 'GET', data);
            return res.status(HttpStatus.OK).json({
                message: `Everhour sections getMany executed successfully`,
                result,
            });
        } catch (error) {
            this.logger.error(`Error in webhooks/get:`, error);
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
* - RecordId: string (ID of the record to delete)
* - Calls the integration helper "performEverhour".
* DO NOT modify the method signature.
*  Example usage:
*  {
"credentialsId": "{{credentialsId}}",
"data": {
    "id": "ev:191024173205091",
    "data": {
        "name": "New Task 4",
        "section": "1289277",
        "labels": [
            "high",
            "bug"
        ],
        "position": 1,
        "dueOn": "2025-03-14",
        "status": "open"
    }
}
}


*/

    @Post('task/create')
    async createTask(@Body() data: any, @Res() res: Response) {
        if (!data) {
            throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
        }
        try {
            const result = await this.performEverhour(`projects/${data.data.id}/tasks`, 'create', 'post', data);  //using project Id
            return res.status(HttpStatus.OK).json({
                message: `Everhour task create executed successfully`,
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
* - RecordId: string (ID of the record to delete)
* - Calls the integration helper "performEverhour".
* DO NOT modify the method signature.
*  Example usage:
*  {
"credentialsId": "{{credentialsId}}",
"data": {
    "Id": "ev:191110400429554",
    "data": {
        "name": "Update Task"
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
            const result = await this.performEverhour(`tasks`, 'update', 'PUT', data);
            return res.status(HttpStatus.OK).json({
                message: `Everhour task update executed successfully`,
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
* [AUTO-GENERATED] Endpoint for module "task" action "delete".
*  - Request Parameters (data): 
* - CredentialId: string
* - RecordId: string (ID of the record to delete)
* - Calls the integration helper "performEverhour".
* DO NOT modify the method signature.
*  Example usage:
*  {
"credentialsId": "{{credentialsId}}",
"data": {
    "Id": "ev:191110535629736"
}
}


*/

    @Post('task/delete')
    async deleteTask(@Body() data: any, @Res() res: Response) {
        if (!data) {
            throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
        }
        try {
            const result = await this.performEverhour(`tasks`, 'delete', 'delete', data);
            return res.status(HttpStatus.OK).json({
                message: `Everhour task delete executed successfully`,
                result,
            });
        } catch (error) {
            this.logger.error(`Error in task/delete:`, error);
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
* - RecordId: string (ID of the record to delete)
* - Calls the integration helper "performEverhour".
* DO NOT modify the method signature.
*  Example usage:
* {
"credentialsId": "{{credentialsId}}",
"data": {
    "Id": "ev:191110400429554"
}
}


*/

    @Post('task/get')
    async getTask(@Body() data: any, @Res() res: Response) {
        if (!data) {
            throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
        }
        try {
            const result = await this.performEverhour(`tasks`, 'get', 'GET', data);
            return res.status(HttpStatus.OK).json({
                message: `Everhour task get executed successfully`,
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
* [AUTO-GENERATED] Endpoint for module "webhooks" action "create".
*  - Request Parameters (data): 
* - CredentialId: string
* - RecordId: string (ID of the record to delete)
* - Calls the integration helper "performEverhour".
* DO NOT modify the method signature.
*  Example usage:
*  {
"credentialsId": "{{credentialsId}}",
"data": {
    "data": {
        "targetUrl": "https://api.everhour.com/saml/consume",
        "events": [
            "api:time:updated"
        ],
        "project": "ev:191024173205091"
    }
}
}

*/
    @Post('webhooks/create')
    async createWebhooks(@Body() data: any, @Res() res: Response) {
        if (!data) {
            throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
        }
        try {
            const result = await this.performEverhour(`hooks`, 'create', 'post', data);
            return res.status(HttpStatus.OK).json({
                message: `Everhour webhooks create executed successfully`,
                result,
            });
        } catch (error) {
            this.logger.error(`Error in task/delete:`, error);
            throw new HttpException(
                error.message || 'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    /**
* [AUTO-GENERATED] Endpoint for module "webhooks" action "get".
*  - Request Parameters (data): 
* - CredentialId: string
* - RecordId: string (ID of the record to delete)
* - Calls the integration helper "performEverhour".
* DO NOT modify the method signature.
*  Example usage:
*  {
"credentialsId": "{{credentialsId}}",
"data": {
"Id": "11886"
}
}

*/
    @Post('webhooks/get')
    async getWebhooks(@Body() data: any, @Res() res: Response) {
        if (!data) {
            throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
        }
        try {
            const result = await this.performEverhour(`hooks`, 'get', 'GET', data);
            return res.status(HttpStatus.OK).json({
                message: `Everhour webhooks get executed successfully`,
                result,
            });
        } catch (error) {
            this.logger.error(`Error in webhooks/get:`, error);
            throw new HttpException(
                error.message || 'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    /**
* [AUTO-GENERATED] Endpoint for module "webhooks" action "update".
*  - Request Parameters (data): 
* - CredentialId: string
* - RecordId: string (ID of the record to delete)
* - Calls the integration helper "performEverhour".
* DO NOT modify the method signature.
*  Example usage:
*  {
"credentialsId":"{{credentialsId}}",
"data":{
"Id":"11886",
"data":{
   "events": [
        "api:time:updated"
    ]

}
}
}


*/
    @Post('webhooks/update')
    async updateWebhooks(@Body() data: any, @Res() res: Response) {
        if (!data) {
            throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
        }
        try {
            const result = await this.performEverhour(`hooks`, 'update', 'PUT', data);
            return res.status(HttpStatus.OK).json({
                message: `Everhour webhooks update executed successfully`,
                result,
            });
        } catch (error) {
            this.logger.error(`Error in webhooks/update:`, error);
            throw new HttpException(
                error.message || 'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }



    /**
* [AUTO-GENERATED] Endpoint for module "webhooks" action "delete".
*  - Request Parameters (data): 
* - CredentialId: string
* - RecordId: string (ID of the record to delete)
* - Calls the integration helper "performEverhour".
* DO NOT modify the method signature.
*  Example usage:
*  {
"credentialsId": "{{credentialsId}}",
"data": {
"Id": "11886"
}
}


*/
    @Post('webhooks/delete')
    async deleteWebhooks(@Body() data: any, @Res() res: Response) {
        if (!data) {
            throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
        }
        try {
            const result = await this.performEverhour(`hooks`, 'delete', 'DELETE', data);
            return res.status(HttpStatus.OK).json({
                message: `Everhour webhooks delete executed successfully`,
                result,
            });
        } catch (error) {
            this.logger.error(`Error in webhooks/delete:`, error);
            throw new HttpException(
                error.message || 'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }


    /**
* [AUTO-GENERATED] Endpoint for module "expenses" action "create".
*  - Request Parameters (data): 
* - CredentialId: string
* - RecordId: string (ID of the record to delete)
* - Calls the integration helper "performEverhour".
* DO NOT modify the method signature.
*  Example usage:
* {
    "credentialsId": "{{credentialsId}}",
    "data": {
        "data": {
            "category": 723369,
            "amount": 98,
            "date": "2025-05-04"
        }
    }
}
*/

    @Post('expense/create')
    async createExpense(@Body() data: any, @Res() res: Response) {
        if (!data) {
            throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
        }
        try {
            const result = await this.performEverhour(`expenses`, 'create', 'post', data);
            return res.status(HttpStatus.OK).json({
                message: `Everhour  expenses create executed successfully`,
                result,
            });
        } catch (error) {
            this.logger.error(`Error in expense/create:`, error);
            throw new HttpException(
                error.message || 'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    /**
* [AUTO-GENERATED] Endpoint for module "expenses" action "update".
*  - Request Parameters (data): 
* - CredentialId: string
* - RecordId: string (ID of the record to delete)
* - Calls the integration helper "performEverhour".
* DO NOT modify the method signature.
*  Example usage:
*  {
    "credentialsId": "{{credentialsId}}",
    "data": {
        "Id": "529485",
        "data": {
            "billable": true,
            "category": 723369,
            "amount": 227832,
            "date": "2025-03-12"
        }
    }
}

*/

    @Post('expense/update')
    async updateExpense(@Body() data: any, @Res() res: Response) {
        if (!data) {
            throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
        }
        try {
            const result = await this.performEverhour(`expenses`, 'updata', 'put', data);
            return res.status(HttpStatus.OK).json({
                message: `Everhour  expenses update executed successfully`,
                result,
            });
        } catch (error) {
            this.logger.error(`Error in expense/update:`, error);
            throw new HttpException(
                error.message || 'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    /**
* [AUTO-GENERATED] Endpoint for module "expenses" action "delete".
*  - Request Parameters (data): 
* - CredentialId: string
* - RecordId: string (ID of the record to delete)
* - Calls the integration helper "performEverhour".
* DO NOT modify the method signature.
*  Example usage:
* {
    "credentialsId": "{{credentialsId}}",
    "data": {
        "Id": "529486"
    }
}
*/

    @Post('expense/delete')
    async deleteExpense(@Body() data: any, @Res() res: Response) {
        if (!data) {
            throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
        }
        try {
            const result = await this.performEverhour(`expenses`, 'delete', 'delete', data);
            return res.status(HttpStatus.OK).json({
                message: `Everhour  expenses delete executed successfully`,
                result,
            });
        } catch (error) {
            this.logger.error(`Error in expense/delete:`, error);
            throw new HttpException(
                error.message || 'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    /**
* [AUTO-GENERATED] Endpoint for module "expenses" action "getMany".
*  - Request Parameters (data): 
* - CredentialId: string
* - RecordId: string (ID of the record to delete)
* - Calls the integration helper "performEverhour".
* DO NOT modify the method signature.
*  Example usage:
* {
    "credentialsId": "{{credentialsId}}",
    "data": {}
}

*/

    @Post('expense/getMany')
    async getmanyExpense(@Body() data: any, @Res() res: Response) {
        if (!data) {
            throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
        }
        try {
            const result = await this.performEverhour(`expenses`, 'getMany', 'get', data);
            return res.status(HttpStatus.OK).json({
                message: `Everhour  expenses getMany executed successfully`,
                result,
            });
        } catch (error) {
            this.logger.error(`Error in expense/getMany:`, error);
            throw new HttpException(
                error.message || 'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    /**
* [AUTO-GENERATED] Endpoint for module "expense" action "get".
*  - Request Parameters (data): 
* - CredentialId: string
* - RecordId: string (ID of the record to delete)
* - Calls the integration helper "performEverhour".
* DO NOT modify the method signature.
*  Example usage:
*  {
 
"credentialsId":"78a89f6d-4bbd-4433-b7f4-aaf536a6bb8e",
"data":{
"recordId":"472d116ff5342bf2fa4d3b6621ba9345"
}
}

*/

    /**EXPENSE MODULE IN GET METHOD NOT AVAILABLE IN DOCUMENTS */

    // @Post('expense/get')
    // async getExpense(@Body() data: any, @Res() res: Response) {
    // if (!data) {
    //     throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    // }
    // try {
    //     const result = await this.performEverhour(`expenses`, 'get','get', data);
    //     return res.status(HttpStatus.OK).json({
    //     message: `Everhour  expenses create executed successfully`,
    //     result,
    //     });
    // } catch (error) {
    //     this.logger.error(`Error in expense/get:`, error);
    //     throw new HttpException(
    //     error.message || 'Internal server error',
    //     HttpStatus.INTERNAL_SERVER_ERROR
    //     );
    // }
    // }



    /**
* [AUTO-GENERATED] Endpoint for module "team/users" action "getMany".
*  - Request Parameters (data): 
* - CredentialId: string
* - RecordId: string (ID of the record to delete)
* - Calls the integration helper "performEverhour".
* DO NOT modify the method signature.
*  Example usage:
* {
"credentialsId":"{{credentialsId}}",
 
"data":{
}
}

*/

    @Post('teamUsers/getMany')
    async getmanyTeamUser(@Body() data: any, @Res() res: Response) {
        if (!data) {
            throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
        }
        try {
            const result = await this.performEverhour(`team/users`, 'getMany', 'get', data);
            return res.status(HttpStatus.OK).json({
                message: `Everhour  users getMany executed successfully`,
                result,
            });
        } catch (error) {
            this.logger.error(`Error in users/getMany:`, error);
            throw new HttpException(
                error.message || 'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    /**
* [AUTO-GENERATED] Endpoint for module "users/me" action "getMany".
*  - Request Parameters (data): 
* - CredentialId: string
* - RecordId: string (ID of the record to delete)
* - Calls the integration helper "performEverhour".
* DO NOT modify the method signature.
*  Example usage:
* {
"credentialsId":"{{credentialsId}}",
 
"data":{
}
}
*/

    @Post('currentUsers/get')
    async getmanyCurrentUser(@Body() data: any, @Res() res: Response) {
        if (!data) {
            throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
        }
        try {
            const result = await this.performEverhour(`users/me`, 'get', 'get', data);
            return res.status(HttpStatus.OK).json({
                message: `Everhour  users get executed successfully`,
                result,
            });
        } catch (error) {
            this.logger.error(`Error in currentUsers/get:`, error);
            throw new HttpException(
                error.message || 'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }


    /**
* [AUTO-GENERATED] Endpoint for module "timers" action "start".
*  - Request Parameters (data): 
* - CredentialId: string
* - RecordId: string (ID of the record to delete)
* - Calls the integration helper "performEverhour".
* DO NOT modify the method signature.
*  Example usage:
*{
"credentialsId": "{{credentialsId}}",
"data": {
"data": {
"userDate": "2025-05-04",
"comment": "some notes"
}
}
}

*/

    @Post('timer/start')
    async startTimer(@Body() data: any, @Res() res: Response) {
        if (!data) {
            throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
        }
        try {
            const result = await this.performEverhour(`timers`, 'create', 'post', data);
            return res.status(HttpStatus.OK).json({
                message: `Everhour  timer start executed successfully`,
                result,
            });
        } catch (error) {
            this.logger.error(`Error in timer/start:`, error);
            throw new HttpException(
                error.message || 'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }


    /**
* [AUTO-GENERATED] Endpoint for module "timers/current" action "stop".
*  - Request Parameters (data): 
* - CredentialId: string
* - RecordId: string (ID of the record to delete)
* - Calls the integration helper "performEverhour".
* DO NOT modify the method signature.
*  Example usage:
* {
"credentialsId": "{{credentialsId}}",
"data": {
 
}
}

*/

    @Post('timer/stop')
    async stopTimer(@Body() data: any, @Res() res: Response) {
        if (!data) {
            throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
        }
        try {
            const result = await this.performEverhour(`timers/current`, 'delete', 'delete', data);
            return res.status(HttpStatus.OK).json({
                message: `Everhour  timer stop executed successfully`,
                result,
            });
        } catch (error) {
            this.logger.error(`Error in timer/stop:`, error);
            throw new HttpException(
                error.message || 'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    /**
* [AUTO-GENERATED] Endpoint for module "team/timers" action "getMany".
*  - Request Parameters (data): 
* - CredentialId: string
* - RecordId: string (ID of the record to delete)
* - Calls the integration helper "performEverhour".
* DO NOT modify the method signature.
*  Example usage:
*  {
"credentialsId": "{{credentialsId}}",
"data": {}
}

*/

    @Post('teamTimer/getMany')
    async getmanyTeamTimers(@Body() data: any, @Res() res: Response) {
        if (!data) {
            throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
        }
        try {
            const result = await this.performEverhour(`team/timers`, 'getMany', 'get', data);
            return res.status(HttpStatus.OK).json({
                message: `Everhour  teamTimers getMany executed successfully`,
                result,
            });
        } catch (error) {
            this.logger.error(`Error in timers/getMany:`, error);
            throw new HttpException(
                error.message || 'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }


    /**
* [AUTO-GENERATED] Endpoint for module "timers/current" action "get".
*  - Request Parameters (data): 
* - CredentialId: string
* - RecordId: string (ID of the record to delete)
* - Calls the integration helper "performEverhour".
* DO NOT modify the method signature.
*  Example usage:
*  {
"credentialsId": "{{credentialsId}}",
"data": {}
}
*/

    @Post('currentTimer/get')
    async getCurrentTimers(@Body() data: any, @Res() res: Response) {
        if (!data) {
            throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
        }
        try {
            const result = await this.performEverhour(`timers/current`, 'get', 'get', data);
            return res.status(HttpStatus.OK).json({
                message: `Everhour  currentTimers getMany executed successfully`,
                result,
            });
        } catch (error) {
            this.logger.error(`Error in currentTimer/getMany:`, error);
            throw new HttpException(
                error.message || 'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    async getAllClients(data: any,) {
        if (!data) {
            throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
        }
        try {
            const result = await this.performEverhour('clients', 'getMany', 'get', data);
            return result.response.map((data) => ({ name: data.name, id: data.id }))

        } catch (error) {
            this.logger.error(`Error in clients/getMany:`, error);
            throw new HttpException(
                error.message || 'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
    async getAllTeamUser(data: any,) {
        if (!data) {
            throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
        }
        try {
            const result = await this.performEverhour(`team/users`, 'getMany', 'get', data);
            return result.response.map(data => ({ value: data.id, name: data.name }))
        } catch (error) {
            this.logger.error(`Error in users/getMany:`, error);
            throw new HttpException(
                error.message || 'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }



    async getAllProject(data: any) {
        if (!data) {
            throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
        }
        try {
            const result = await this.performEverhour('projects', 'getMany', 'get', data);
            return result.response.map((data) => ({ value: data.id, name: data.name }))
        } catch (error) {
            this.logger.error(`Error in projects/getMany:`, error);
            throw new HttpException(
                error.message || 'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }


    async getAllInvoice(data: any) {
        if (!data) {
            throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
        }
        try {
            const result = await this.performEverhour(`invoices`, 'getMany', 'get', data);
            return result.response.map(data => ({ value: data.id }))
        } catch (error) {
            this.logger.error(`Error in invoices/getMany:`, error);
            throw new HttpException(
                error.message || 'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    async getAllExpense(data: any,) {
        if (!data) {
            throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
        }
        try {
            const result = await this.performEverhour(`expenses`, 'getMany', 'get', data);
            return result.response.map(data => ({ value: data.id, }))
        } catch (error) {
            this.logger.error(`Error in expense/getMany:`, error);
            throw new HttpException(
                error.message || 'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    async getAllTeamTimers(data: any,) {
        if (!data) {
            throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
        }
        try {
            const result = await this.performEverhour(`team/timers`, 'getMany', 'get', data);
            return result.response.map((data) => ({ startedAt: data.startedAt, userDate: data.userDate }))
        } catch (error) {
            this.logger.error(`Error in timers/getMany:`, error);
            throw new HttpException(
                error.message || 'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    async getAllSection(@Body() data: any) {
        if (!data) {
            throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
        }
        try {
            const Id = "ev:191024173205091"
            const result = await this.performEverhour(`projects/${Id}/sections`, 'getMany', 'GET', data);
            return result.response.map(data => ({ value: data.id, name: data.name }))
        } catch (error) {
            this.logger.error(`Error in section/getMany:`, error);
            throw new HttpException(
                error.message || 'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    async getAllCatgeory(@Body() data: any) {
        if (!data) {
            throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
        }
        try {
            const result = await this.performEverhour(`expenses/categories`, 'getMany', 'GET', data);
            return result.response.map(data => ({ value: data.id, name: data.name }))

        } catch (error) {
            this.logger.error(`Error in category/getMany:`, error);
            throw new HttpException(
                error.message || 'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }




    private async generateFields(category: string, name: string) {
        if (!fields || !Array.isArray(fields)) {
            throw new Error("Fields array is not defined or is not an array")
        }
        const filteredFields = fields.filter(
            (field) =>
                field.displayOptions &&
                field.displayOptions.show &&
                field.displayOptions.show.category &&
                field.displayOptions.show.category.includes(category) &&
                (field.displayOptions.show.name
                    ? field.displayOptions.show.name.includes(name)
                    : true
                )
        );
        return filteredFields
    }

    @Post('getfields')
    async getfields(@Body() body: { category: string; name: string; credentialsId: any }) {
        const { category, name, credentialsId } = body;
        try {
            await this.initializeFields(credentialsId);
            const relevantFields = await this.generateFields(category, name);
            return relevantFields;
        } catch (error) {
            return [];
        }
    }

    async initializeFields(data) {
        for (const field of fields) {
            if (typeof field.init === 'function') {
                const datas = { credentialsId: data, data: {} }
                await field.init(datas);
            }
        }
    }
    public async initialize(credentialsId) {
        try {
            const connection = await initializeDB();
            const credRepository = connection.getRepository(Credentials);
            const credentialsRepository: any = await credRepository.findOne({ where: { id: credentialsId } });
            const credentials = await credentialsRepository.authData;
            return { credential: credentials }

        } catch (error) {
            this.logger.error('Error initializing twitter :', error + error.stack);
        }
    }

    public async curl(module: string, action: string, method: string, argumentdata: any) {
        try {
            const { credentialsId, data } = argumentdata;
            const initializeData = await this.initialize(credentialsId);

            const { apiKey, baseUrl } = await initializeData?.credential;
            let url = `${baseUrl}/${module}`;



            if (data.Id) {
                url += `/${data.Id}`;
            }
            const options: any = {
                method,
                url,
                headers: { "Content-Type": "application/json", "X-Api-Key": apiKey }
            }
            if (action === "getMany") {
                if (argumentdata) options.params = data.data
            } else {
                if (argumentdata) options.data = data.data

            }
            const response = await axios(options);
            return { response: response.data, status: response.status }
        } catch (error) {

            return { reponse: error.response?.data, status: error.status }
        }
    }

    private async performEverhour(module: string, action: string, method: string, data: any): Promise<any> {
        // TODO: Implement the actual integration logic.
        // For example:
        // 1. Initialize your API client using a refresh token or saved credentials.
        // 2. Validate that 'data' contains required fields (CredentialId, ModuleId, ModuleData).
        // 3. Use the correct HTTP method based on the action (GET, POST, PATCH, DELETE, etc.).
        // 4. Handle errors and return the API response.
        // 5. If the access token is expired, call the refreshToken endpoint.

        const result = await this.curl(module, action, method, data);

        return result
        // return {
        //   module,
        //   action,
        //   data,
        //   simulated: true,
        // };
    }
}


export const everhourController = new EverhourController();