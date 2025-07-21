// monday.com.controller.ts
// -----------------------------------------------------------------------------
// AUTO-GENERATED CONTROLLER FILE.
// DO NOT modify the auto-generated endpoints below.
// For custom integration logic, extend the helper "performMondaydotcomAction".
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
import { Request, response, Response } from 'express';
import { fields } from './monday.config';
import { randomBytes } from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';
import axios, { AxiosResponseTransformer, Method } from 'axios';
import { CredentialController } from 'src/credential/credential.controller';
import * as crypto from 'crypto';
import * as qs from 'qs'
import { initializeDB } from '../../ormconfig';
import { Credentials } from '../../entities/Credentials';
import { CustomLogger } from '../../logger/custom.logger';
import config, { XappName, modules as Xappmodules } from './monday.config'
import { Repository } from 'typeorm';

@Controller('mondaydotcom')
export class MondayController {
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
      console.log('hello form auth')
      const { clientId, redirectUri, clientSecret, name, type } = reqBody;

      const state = randomBytes(16).toString('hex')



      // Construct the OAuth URL.
      // NOTE: Update the URL if your xapp uses a different authentication endpoint.
      const scopes = [
        'account:read',
        'assets:read',
        'boards:read',
        'boards:write',
        'docs:read',
        'docs:write',
        'me:read',
        'notifications:write',
        'tags:read',
        'teams:read',
        'updates:read',
        'updates:write',
        'users:read',
        'users:write',
        'webhooks:read',
        'webhooks:write',
        'workspaces:read',
        'workspaces:write',
      ].join(' ');
      const authUrl = `https://auth.monday.com/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&scope=${encodeURIComponent(scopes)}`;
      const data = {
        clientId: clientId,
        clientSecret: clientSecret,
        redirectUri: redirectUri,
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


      const { clientId, clientSecret, redirectUri } = credential.auth_data;
      console.log('ad', credential.auth_data)






      const requestBody = qs.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri,
        code: code
      })

      const result = await axios.post(`https://auth.monday.com/oauth2/token`, requestBody, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        } 
      });

      credential.auth_data['token'] = result.data
      await this.CredentialController.updateCredentials(credential.id, credential.auth_data);

      return res.send(result.data)

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
      const tokenUrl = `https://auth.monday.com/oauth2/token`;
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
   * [AUTO-GENERATED] Endpoint for module "Boards" action "create".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - ModuleData: object (data to create)
   * - Calls the integration helper "performMondaydotcomAction".
   * DO NOT modify the method signature.
   *  Example usage:
   * {
  "credentialId":"9934f8b5-7f17-4fc3-9e88-06e475a35505",
  "data":{
    "data":{
        "name":"New Boar",
        "kind":"public"
    }
  }

}


   */






  @Post('boards/create')
  async createBoards(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }

    try {



      data.data = {
        query: `mutation { create_board (board_name: "${data.data.data.name}", board_kind: ${data.data.data.kind}) { id } }`
      };

      const result = await this.performMondaydotcomAction('boards', 'create', 'POST', data);


      return res.status(HttpStatus.OK).json({
        message: `monday.com Boards create executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in Boards/create:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "Boards" action "update".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - ModuleData: object (data to update)
   * - Calls the integration helper "performMondaydotcomAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *{
  "credentialId": "9934f8b5-7f17-4fc3-9e88-06e475a35505",
  "data":{
    "id":1995316580,
    "data":{
        "board_attribute":"name",
        "new_value":"new name"
    }
  }
}

   */


  @Post('boards/update')
  async updateBoards(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {

      data.data = {
        query: `mutation {
  update_board(board_id:${data.data.id}, board_attribute:${data.data.data.board_attribute}, new_value:"${data.data.data.new_value}") 
}
`}
      const result = await this.performMondaydotcomAction('boards', 'update', 'POST', data);
      return res.status(HttpStatus.OK).json({
        message: `monday.com Boards update executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in Boards/update:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "Boards" action "delete".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - RecordId: string (ID of the record to delete)
   * - Calls the integration helper "performMondaydotcomAction".
   * DO NOT modify the method signature.
   *  Example usage:
   * {
  "credentialId":"9934f8b5-7f17-4fc3-9e88-06e475a35505",
  "data":{
  "board_id":1995310459
  }
    

}
   */


  @Post('boards/delete')
  async deleteBoards(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {

      data.data = {
        query: `mutation {
  delete_board (board_id:${data.data.board_id}) {
    id
  }
}`
      }
      const result = await this.performMondaydotcomAction('boards', 'delete', 'POST', data);
      return res.status(HttpStatus.OK).json({
        message: `monday.com Boards delete executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in Boards/delete:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "Boards" action "get".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - RecordId: string (ID of the record to fetch)
   * - Calls the integration helper "performMondaydotcomAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
  "{  
  "credentialId": "9934f8b5-7f17-4fc3-9e88-06e475a35505",
  
  "data": {
    "board_id":[1995316580,1995386555]
  }

}  */


  @Post('boards/get')
  async getBoards(@Body() data: any, @Res() res: Response) {

    try {
      data.data = {
        query: `
        query {
          boards (ids: [${data.data.board_id}]) {
            id
            name
            state
            permissions
            description
            workspace_id
          }
        }
      `

      }

      const result = await this.performMondaydotcomAction('boards', 'get', 'POST', data);
      return res.status(HttpStatus.OK).json({
        message: `monday.com Boards get executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in Boards/get:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "Boards" action "getMany".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - Filters: object (optional filters for querying records)
   * - Calls the integration helper "performMondaydotcomAction".
   * DO NOT modify the method signature.
   *  Example usage:
   * {
     "credentialId": "9934f8b5-7f17-4fc3-9e88-06e475a35505",
     "data":{}
     
}   */
  

  @Post('boards/getMany')
  async getmanyBoards(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      data.data = {
        query: `
        query {
          boards {
            id
            name
            state
            permissions
            description
            workspace_id
          }
        }
      `
      }
      const result = await this.performMondaydotcomAction('boards', 'getMany', 'POST', data);
      return res.status(HttpStatus.OK).json({
        message: `monday.com Boards getMany executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in Boards/getMany:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "Items" action "create".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - ModuleData: object (data to create)
   * - Calls the integration helper "performMondaydotcomAction".
   * DO NOT modify the method signature.
   *  Example usage:
   * {
 "credentialId": "9934f8b5-7f17-4fc3-9e88-06e475a35505",
 "data":{

    "board_id":1995386555,
    "group_id":"group_mkpnnn6x",
    "item_name":"harish nara"
}
}
   */


  @Post('items/create')
  async createItems(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {

      data.data = {
        query: `mutation {
  create_item (board_id:${data.data.board_id}, group_id: "${data.data.group_id}", item_name: "${data.data.item_name}") {
    id
  }
}`
      }
      const result = await this.performMondaydotcomAction('Items', 'create', 'POST', data);
      return res.status(HttpStatus.OK).json({
        message: `monday.com Items create executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in Items/create:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

 
  /**
   * [AUTO-GENERATED] Endpoint for module "Items" action "delete".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - RecordId: string (ID of the record to delete)
   * - Calls the integration helper "performMondaydotcomAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
 "credentialId": "9934f8b5-7f17-4fc3-9e88-06e475a35505",
 "data":{

    "item_id":1994938758
 }
}
   */


  @Post('items/delete')
  async deleteItems(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {

      data.data = {
        query: `mutation {
  delete_item (item_id:${data.data.item_id}) {
    id
  }
}`
      }
      const result = await this.performMondaydotcomAction('Items', 'delete', 'POST', data);
      return res.status(HttpStatus.OK).json({
        message: `monday.com Items delete executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in Items/delete:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
  /**
* [AUTO-GENERATED] Endpoint for module "Items" action "get".
*  - Request Parameters (data): 
* - CredentialId: string
* - RecordId: string (ID of the record to fetch)
* - Calls the integration helper "performMondaydotcomAction".
* DO NOT modify the method signature.
*  Example usage:
*{
    "credentialId": "9934f8b5-7f17-4fc3-9e88-06e475a35505",
    "data":{
        "board_id":1995399712
    }
} */

@Post('items/get')
  async getItems(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {

      data.data = {
        query: `
      query {
          items(ids: ${data.data.board_id}) {
              id
          }
      }
  `
      }
      const result = await this.performMondaydotcomAction('Items', 'get', 'POST', data);
      return res.status(HttpStatus.OK).json({
        message: `monday.com  Items get executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in Items/delete:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
  
  /**
* [AUTO-GENERATED] Endpoint for module "DuplicateItems" action "create".
*  - Request Parameters (data): 
* - CredentialId: string
* - RecordId: string (ID of the record to fetch)
* - Calls the integration helper "performMondaydotcomAction".
* DO NOT modify the method signature.
*  Example usage:
*{
 "credentialId": "9934f8b5-7f17-4fc3-9e88-06e475a35505",
 "data":{
    "board_id":1994938459,
    "item_id":1994938758
 }
    
}  */
  @Post('duplicateItems/create')
  async createDuplicateItems(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {

      data.data = {
        query: `mutation {
  duplicate_item (board_id:${data.data.board_id}, item_id:${data.data.item_id}, with_updates: true) {
    id
  }
}`
      }
      const result = await this.performMondaydotcomAction('Items', 'create', 'POST', data);
      return res.status(HttpStatus.OK).json({
        message: `monday.com Duplicte Items executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in Items/delete:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }




 
  /**
   * [AUTO-GENERATED] Endpoint for module "Items" action "getMany".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - Filters: object (optional filters for querying records)
   * - Calls the integration helper "performMondaydotcomAction".
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


  @Post('items/getMany')
  async getmanyItems(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {

      data.data = {
        query: `query {
          items (ids: [${data.data.board_id}]) {
            name
          }
        }`
      };

      const result = await this.performMondaydotcomAction('Items', 'getMany', 'POST', data);
      return res.status(HttpStatus.OK).json({
        message: `monday.com Items getMany executed successfully`,
        result,
      });
    } catch (error) {
      // this.logger.error(`Error in Items/getMany:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "Items" action "move".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - ModuleData: object (action-specific data)
   * - Calls the integration helper "performMondaydotcomAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
  "credentialId": "9934f8b5-7f17-4fc3-9e88-06e475a35505",
  "data":{

    "item_id":1995323712,
    "group_id":"group_mkpn3yme"
  }
}
   */


  @Post('items/move')
  async moveItems(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {

      data.data = {
        query: `mutation {
            move_item_to_group (item_id:${data.data.item_id}, group_id:"${data.data.group_id}") {
              id
            }
          }`

      }
      const result = await this.performMondaydotcomAction('Items', 'move', 'POST', data);
      return res.status(HttpStatus.OK).json({
        message: `monday.com Items move executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in Items/move:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "Columns" action "create".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - ModuleData: object (data to create)
   * - Calls the integration helper "performMondaydotcomAction".
   * DO NOT modify the method signature.
   *  Example usage:
   * {
  "credentialId": "9934f8b5-7f17-4fc3-9e88-06e475a35505",
  "data":{

    "board_id":1994944127,
    "data":{
    "title":"Done",
    "description":"this is the new description"
}
  }
}
   */


  @Post('columns/create')
  async createColumns(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {

      data.data = {
        query: `mutation{
  create_column(board_id:${data.data.board_id}, title:"${data.data.data.title}", description: "${data.data.data.description}", column_type:status) {
    id
    title
    description
  }
}`
      }
      const result = await this.performMondaydotcomAction('Columns', 'create', 'POST', data);
      return res.status(HttpStatus.OK).json({
        message: `monday.com Columns create executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in Columns/create:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "Columns" action "update".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - ModuleData: object (data to update)
   * - Calls the integration helper "performMondaydotcomAction".
   * DO NOT modify the method signature.
   *  Example usage:
   * {
"credentialId": "16826cfe-487e-4af9-861b-f41fae496dee",

  "board_id":1991365195,
  "title":"Done",
  "description":"this is the new description"
}
   */


  // @Post('Columns/update')
  // async updateColumns(@Body() data: any, @Res() res: Response) {
  //   if (!data) {
  //     throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
  //   }
  //   try {
  //     const result = await this.performMondaydotcomAction('Columns', 'update', data);
  //     return res.status(HttpStatus.OK).json({
  //       message: `monday.com Columns update executed successfully`,
  //       result,
  //     });
  //   } catch (error) {
  //     // this.logger.error(`Error in Columns/update:`, error);
  //     throw new HttpException(
  //       error.message || 'Internal server error',
  //       HttpStatus.INTERNAL_SERVER_ERROR
  //     );
  //   }
  // }

  /**
   * [AUTO-GENERATED] Endpoint for module "Columns" action "delete".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - RecordId: string (ID of the record to delete)
   * - Calls the integration helper "performMondaydotcomAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
  "credentialId": "9934f8b5-7f17-4fc3-9e88-06e475a35505",
  "data":{

    "board_id":1994944127,
    "column_id":"color_mkpnqnbg"
  }
}
   */


  @Post('columns/delete')
  async deleteColumns(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {

      data.data = {
        query: `mutation {
  delete_column (board_id:${data.data.board_id}, column_id: "${data.data.column_id}") {
    id
  }
}`
      }
      const result = await this.performMondaydotcomAction('Columns', 'delete', 'POST', data);
      return res.status(HttpStatus.OK).json({
        message: `monday.com Columns delete executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in Columns/delete:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "Columns" action "get".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - RecordId: string (ID of the record to fetch)
   * - Calls the integration helper "performMondaydotcomAction".
   * DO NOT modify the method signature.
   *  Example usage:
   * {
     "credentialId": "9934f8b5-7f17-4fc3-9e88-06e475a35505",
     "data":{
        "board_id":1994944127,
        "column_id":"color_mkpnqnbg"
     }
}
  //  */


  @Post('columns/get')
  async getColumns(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      data.data={
        query:`
        query {
          boards(ids: ${data.data.board_id}) {
            columns(ids: ["${data.data.column_id}"]) {
              id
              title
              type
            }
          }
        }
      `
      }
      const result = await this.performMondaydotcomAction('Columns', 'get','POST', data);
      return res.status(HttpStatus.OK).json({
        message: `monday.com Columns get executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in Columns/get:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "Columns" action "getMany".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - Filters: object (optional filters for querying records)
   * - Calls the integration helper "performMondaydotcomAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  
     {
     "credentialId": "9934f8b5-7f17-4fc3-9e88-06e475a35505",
     "data":{
        "board_id":[1994944127]
     }
}
   */


  @Post('columns/getMany')
  async getmanyColumns(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      data.data = {
        query: `
        query {
          boards(ids: ${data.data.board_id}) {
            columns {
              id
              title
              type
            }
          }
        }
      `
      }
      const result = await this.performMondaydotcomAction('Columns', 'getMany', 'POST', data);
      return res.status(HttpStatus.OK).json({
        message: `monday.com Columns getMany executed successfully`,
        result,
      });
    } catch (error) {
      // this.logger.error(`Error in Columns/getMany:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "Groups" action "create".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - ModuleData: object (data to create)
   * - Calls the integration helper "performMondaydotcomAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
 "credentialId": "9934f8b5-7f17-4fc3-9e88-06e475a35505",

 "data":{
    "data":{

    "board_id":1995386555,
    "group_name":"sanjay",
    "relative_to":"test_group"
    }
 }
}
   */


  @Post('groups/create')
  async createGroups(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      data.data = {
        query: `mutation {
  create_group (board_id:${data.data.data.board_id}, group_name: "${data.data.data.group_name}", relative_to: "${data.data.data.relative_to}", group_color: "#ff642e", position_relative_method: before_at) {
    id
  }
}`
      }
      const result = await this.performMondaydotcomAction('groups', 'create', 'POST', data);
      return res.status(HttpStatus.OK).json({
        message: `monday.com Groups create executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in Groups/create:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "Groups" action "update".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - ModuleData: object (data to update)
   * - Calls the integration helper "performMondaydotcomAction".
   * DO NOT modify the method signature.
   *  Example usage:
   * {
  "credentialId": "9934f8b5-7f17-4fc3-9e88-06e475a35505",
  "data":{
    "group_id":"group_mkpndtjr",
    "data":{

    "board_id":1995310459,
   
    "new_value":"Sanjay"
}
  }
}
   */


  @Post('groups/update')
  async updateGroups(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {

      data.data = {
        query: `mutation {
  update_group (board_id:${data.data.data.board_id}, group_id: "${data.data.group_id}", group_attribute: relative_position_before, new_value: "${data.data.data.new_value}") { 
    id
  } 
}`
      }
      const result = await this.performMondaydotcomAction('Groups', 'update', 'POST', data);
      return res.status(HttpStatus.OK).json({
        message: `monday.com Groups update executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in Groups/update:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "Groups" action "delete".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - RecordId: string (ID of the record to delete)
   * - Calls the integration helper "performMondaydotcomAction".
   * DO NOT modify the method signature.
   *  Example usage:
   * {
  "credentialId": "9934f8b5-7f17-4fc3-9e88-06e475a35505",
  "data":{
     "group_id":"group_mkpndtjr",
    "data":{
    "board_id":1995310459
    }
    }
   
}
   */


  @Post('groups/delete')
  async deleteGroups(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {

      data.data = {
        query: `mutation {
  delete_group (board_id:${data.data.data.board_id}, group_id: "${data.data.group_id}") {
    id
    deleted
  }
}`
      }
      const result = await this.performMondaydotcomAction('Groups', 'delete', 'POST', data);
      return res.status(HttpStatus.OK).json({
        message: `monday.com Groups delete executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in Groups/delete:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }






  /**
   * [AUTO-GENERATED] Endpoint for module "Groups" action "getMany".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - Filters: object (optional filters for querying records)
   * - Calls the integration helper "performMondaydotcomAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId":"9934f8b5-7f17-4fc3-9e88-06e475a35505",
    "data":{
        "id":1995316580
    }
}
   */


  @Post('groups/getMany')
  async getmanyGroups(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      data.data = {
        query: `
      query {
          boards(ids: ${data.data.id}) {
              groups {
                  id
                  title
                  archived
                  deleted
              }
          }
      }
  `
      }

      const result = await this.performMondaydotcomAction('groups', 'getMany', 'POST', data);
      return res.status(HttpStatus.OK).json({
        message: `monday.com Groups getMany executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in Groups/getMany:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "Users" action "create".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - ModuleData: object (data to create)
   * - Calls the integration helper "performMondaydotcomAction".
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


  // @Post('Users/create')
  // async createUsers(@Body() data: any, @Res() res: Response) {
  //   if (!data) {
  //     throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
  //   }
  //   try {
  //     const result = await this.performMondaydotcomAction('Users', 'create', data,data);
  //     return res.status(HttpStatus.OK).json({
  //       message: `monday.com Users create executed successfully`,
  //       result,
  //     });
  //   } catch (error) {
  //     // this.logger.error(`Error in Users/create:`, error);
  //     throw new HttpException(
  //       error.message || 'Internal server error',
  //       HttpStatus.INTERNAL_SERVER_ERROR
  //     );
  //   }
  // }

  /**
   * [AUTO-GENERATED] Endpoint for module "Users" action "getMany".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - ModuleData: object (data to update)
   * - Calls the integration helper "performMondaydotcomAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
     "credentialId": "9934f8b5-7f17-4fc3-9e88-06e475a35505",
     "data":{}
}
   */

  @Post('users/getMany')
  async getManyUsers(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      data.data = {
        query: `
    query {
        users {
          id
          created_at
          email
        account {
          name
          id      
        }
        }
      }
        `
      }
      const result = await this.performMondaydotcomAction('Users', 'getMany', 'POST', data);
      return res.status(HttpStatus.OK).json({
        message: `monday.com Users create executed successfully`,
        result,
      });
    } catch (error) {
      // this.logger.error(`Error in Users/create:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "Users" action "update".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - ModuleData: object (data to update)
   * - Calls the integration helper "performMondaydotcomAction".
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



  // @Post('Users/update')
  // async updateUsers(@Body() data: any, @Res() res: Response) {
  //   if (!data) {
  //     throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
  //   }
  //   try {
  //     const result = await this.performMondaydotcomAction('Users', 'update', data,data);
  //     return res.status(HttpStatus.OK).json({
  //       message: `monday.com Users update executed successfully`,
  //       result,
  //     });
  //   } catch (error) {
  //     // this.logger.error(`Error in Users/update:`, error);
  //     throw new HttpException(
  //       error.message || 'Internal server error',
  //       HttpStatus.INTERNAL_SERVER_ERROR
  //     );
  //   }
  // }

  /**
   * [AUTO-GENERATED] Endpoint for module "Users" action "delete".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - RecordId: string (ID of the record to delete)
   * - Calls the integration helper "performMondaydotcomAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
  "CredentialId": "your-credential-id",
  "RecordId": "record-id"
}
   */


  // @Post('Users/delete')
  // async deleteUsers(@Body() data: any, @Res() res: Response) {
  //   if (!data) {
  //     throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
  //   }
  //   try {
  //     const result = await this.performMondaydotcomAction('Users', 'delete', data);
  //     return res.status(HttpStatus.OK).json({
  //       message: `monday.com Users delete executed successfully`,
  //       result,
  //     });
  //   } catch (error) {
  //     // this.logger.error(`Error in Users/delete:`, error);
  //     throw new HttpException(
  //       error.message || 'Internal server error',
  //       HttpStatus.INTERNAL_SERVER_ERROR
  //     );
  //   }
  // }

  /**
   * [AUTO-GENERATED] Endpoint for module "Users" action "get".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - RecordId: string (ID of the record to fetch)
   * - Calls the integration helper "performMondaydotcomAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    
    "credentialId": "9934f8b5-7f17-4fc3-9e88-06e475a35505"
    

}**/


  @Post('users/get')
  async getUsers(@Body() data: any,@Res() res:Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    console.log(data)

    try {

      data.data = {
        query: `{
  users {
    id
    name
    email
  }
}
`
      }
      const result = await this.performMondaydotcomAction('Users', 'get', 'POST', data);
      return res.status(HttpStatus.OK).json({
        message: `monday.com Users get executed successfully`,
        result,
      });

    } catch (error) {
      this.logger.error(`Error in Users/get:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "Users" action "getMany".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - Filters: object (optional filters for querying records)
   * - Calls the integration helper "performMondaydotcomAction".
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



  /**
   * [AUTO-GENERATED] Endpoint for module "Tags" action "create".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - ModuleData: object (data to create)
   * - Calls the integration helper "performMondaydotcomAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
   "credentialId": "9934f8b5-7f17-4fc3-9e88-06e475a35505",
   "data":{
    "data":{
    "tag_name":"Sanjay Tag"
}
   }
}
   */


  @Post('tags/create')
  async createTags(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {

      data.data = {
        query: `mutation {
  create_or_get_tag (tag_name: "${data.data.data.tag_name}") {
    id
  }
}`
      }
      const result = await this.performMondaydotcomAction('Tags', 'create', 'POST', data);
      return res.status(HttpStatus.OK).json({
        message: `monday.com Tags create executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in Tags/create:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "Tags" action "update".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - ModuleData: object (data to update)
   * - Calls the integration helper "performMondaydotcomAction".
   * DO NOT modify the method signature.
   *  Example usage:
   * {
 "credentialId": "9934f8b5-7f17-4fc3-9e88-06e475a35505",
 "data":{
    "data":{

    "board_id":1994944127,
    "item_id":1994944608,
    "column_id":"color_mkpma0z5"
}
 }
}
   */


  @Post('tags/update')
  async updateTagsColumns(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      console.log(data)

      data.data = {
        query: `mutation {
            change_column_value (
              board_id: ${data.data.data.board_id}, 
              item_id: ${data.data.data.item_id}, 
              column_id: "${data.data.data.column_id}", 
              value: ${JSON.stringify(JSON.stringify({ tags: ["Important", "Urgent"] }))}
            ) {
              id
            }
          }`
      };

      const result = await this.performMondaydotcomAction('Tags', 'update', 'POST', data);
      return res.status(HttpStatus.OK).json({
        message: `monday.com Tags update executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in Tags/update:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );

    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "Teams" action "getMany".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - Filters: object (optional filters for querying records)
   * - Calls the integration helper "performMondaydotcomAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId": "9934f8b5-7f17-4fc3-9e88-06e475a35505",
    "data":{}
}
   */


  @Post('teams/getMany')
  async getmanyTeams(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {

      data.data = {
        query: `
               query {
            teams {
              name
              picture_url
              users {
                created_at
                phone
              }
            }
          }
        `
      }
      const result = await this.performMondaydotcomAction('Teams', 'getMany', 'POST', data);
      return res.status(HttpStatus.OK).json({
        message: `monday.com Teams getMany executed successfully`,
        result,
      });
    } catch (error) {
      // this.logger.error(`Error in Teams/getMany:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "Workspace" action "create".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - ModuleData: object (data to create)
   * - Calls the integration helper "performMondaydotcomAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
  "credentialId": "9934f8b5-7f17-4fc3-9e88-06e475a35505",
  "data":{
    "data":{

    "name":"My new Workspace",
    "description":"this the new description"
}
  }
}
   */



  @Post('workspace/create')
  async createWorkspace(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {

      data.data = {
        query: `mutation {
  create_workspace (name:"${data.data.data.name}", kind: open, description: "${data.data.data.description}") {
    id
    description
  }
}`
      }
      const result = await this.performMondaydotcomAction('workspace', 'create', 'POST', data);
      return res.status(HttpStatus.OK).json({
        message: `monday.com Documents create executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in Documents/create:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
   /**
   * [AUTO-GENERATED] Endpoint for module "Workspace" action "update".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - ModuleData: object (data to create)
   * - Calls the integration helper "performMondaydotcomAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
  "credentialId": "9934f8b5-7f17-4fc3-9e88-06e475a35505",
  "data": {
    "workspace_id": 1769604,
    "data": {
      "attributes": {
        "name": "New Workspace "
      }
    }
  }
}

   */



@Post('workspace/update')
async updateWorkspace(@Body() data: any, @Res() res: Response) {
  if (!data) {
    throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
  }
  try {

    data.data = {
      query: `
        mutation {
          update_workspace(
            id: ${data.data.workspace_id},
            attributes: ${JSON.stringify(data.data.data.attributes).replace(/"([^"]+)":/g, '$1:')}
          ) {
            id
            name
            description
            
          }
        }
      `
    }
    const result = await this.performMondaydotcomAction('workspace', 'update', 'POST', data);
    return res.status(HttpStatus.OK).json({
      message: `monday.com Documents create executed successfully`,
      result,
    });
  } catch (error) {
    this.logger.error(`Error in Documents/create:`, error);
    throw new HttpException(
      error.message || 'Internal server error',
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}

   /**
   * [AUTO-GENERATED] Endpoint for module "Workspace" action "delete".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - ModuleData: object (data to create)
   * - Calls the integration helper "performMondaydotcomAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
  "credentialId": "9934f8b5-7f17-4fc3-9e88-06e475a35505",
  "data": {
    "workspace_id": 1769604
  }
}
   */



@Post('workspace/delete')
async deleteWorkspace(@Body() data: any, @Res() res: Response) {
  if (!data) {
    throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
  }
  try {

    data.data = {
      query: `
        mutation {
            delete_workspace (workspace_id: ${data.data.workspace_id}) {
              id
            }
        }
      `
    }
    const result = await this.performMondaydotcomAction('workspace', 'delete', 'POST', data);
    return res.status(HttpStatus.OK).json({
      message: `monday.com Documents create executed successfully`,
      result,
    });
  } catch (error) {
    this.logger.error(`Error in Documents/create:`, error);
    throw new HttpException(
      error.message || 'Internal server error',
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}
  /**
   * [AUTO-GENERATED] Endpoint for module "workspace" action "get".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - ModuleData: object (data to create)
   * - Calls the integration helper "performMondaydotcomAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
     "credentialId": "9934f8b5-7f17-4fc3-9e88-06e475a35505",
     "data":{
        "workspaceId":1769604
     }
}
   */
  
@Post('workspace/get')
async getworkspace(@Body() data: any, @Res() res: Response) {
  if (!data) {
    throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
  }
  try {

    data.data = {
      query: `
      query {
        workspaces(ids: [${data.data.workspaceId}]) {
          id
          name
          description
        }
      }
    `
    };

    const result = await this.performMondaydotcomAction('workspace', 'get', 'POST', data);
    return res.status(HttpStatus.OK).json({
      message: `monday.com Items getMany executed successfully`,
      result,
    });
  } catch (error) {
    // this.logger.error(`Error in Items/getMany:`, error);
    throw new HttpException(
      error.message || 'Internal server error',
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}
 /**
   * [AUTO-GENERATED] Endpoint for module "Workspace" action "getMany".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - ModuleData: object (data to update)
   * - Calls the integration helper "performMondaydotcomAction".
   * DO NOT modify the method signature.
   *  Example usage:
   * {
    "credentialId": "9934f8b5-7f17-4fc3-9e88-06e475a35505",
    "data":{}
}
   */
@Post('workspace/getMany')
  async getManyWOrkspace(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      data.data={
        query:`
          query {
            workspaces {
                id
                name
                kind
                description
            }
          }
        `
      }
      const result = await this.performMondaydotcomAction('workspace', 'getMany','POST', data);
      return res.status(HttpStatus.OK).json({
        message: `monday.com Tags getMany executed successfully`,
        result,
      });
    } catch (error) {
      // this.logger.error(`Error in Tags/getMany:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
   /**
   * [AUTO-GENERATED] Endpoint for module "Document" action "create".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - ModuleData: object (data to update)
   * - Calls the integration helper "performMondaydotcomAction".
   * DO NOT modify the method signature.
   *  Example usage:
   * {

  "credentialId": "9934f8b5-7f17-4fc3-9e88-06e475a35505",
  "data":{
    "workspace_id":"1767230",
    "data":{
    "name":"anto",
    "kind":"public"
}
  }
}
   */

  @Post('documents/create')
  async createDocuments(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {

      data.data = {
        query: `mutation {
  create_doc (location: {workspace: { workspace_id:${data.data.workspace_id}, name:"${data.data.data.name}", kind:${data.data.data.kind}}}) {
    id
  }
}`
      }
      const result = await this.performMondaydotcomAction('Documents', 'create', 'POST', data);
      return res.status(HttpStatus.OK).json({
        message: `monday.com Documents create executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in Documents/create:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "DocumentsColumns" action "create".
   *  - Request Parameters (data): 
   * - CredentialId: string
   * - ModuleData: object (data to update)
   * - Calls the integration helper "performMondaydotcomAction".
   * DO NOT modify the method signature.
   *  Example usage:
   * {

 "credentialId": "9934f8b5-7f17-4fc3-9e88-06e475a35505",
 "data":{

    "board_id":1994944127,
    "data":{
    "titile":"Task info"
}
 }
}
   */
  Teams

  @Post('documentsColumns/create')
  async updateDocuments(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      console.log('hello from docs')

      data.data = {
        query: `mutation {
  create_column (board_id:${data.data.board_id}, column_type: doc, title: "${data.data.data.title}") {
    id
  }
}`
      }
      const result = await this.performMondaydotcomAction('Documents', 'create', 'POST', data);
      return res.status(HttpStatus.OK).json({
        message: `monday.com Documents update executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in Documents/update:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }





  //  GetMany

  async getAllBoards(@Body() data: any) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      data.data = {
        query: `
        query {
          boards {
            id
            name
            state
            permissions
            description
            workspace_id
          }
        }
      `
      }
      const result = await this.performMondaydotcomAction('boards', 'getMany', 'POST', data);
      return {response:result.response.data.boards.map(data =>({id:data.id,name:data.name})),status:result.status}
    
    } catch (error) {
      this.logger.error(`Error in Boards/getMany:`, error);
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

      data.data = {
        query: `query {
          items (ids: [${data.data.board_id}]) {
            name
          }
        }`
      };

      const result = await this.performMondaydotcomAction('Items', 'getMany', 'POST', data);
      return {response:result,status:result.status}
    } catch (error) {
      this.logger.error(`Error in Items/getMany:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
  async getAllColumns(@Body() data: any) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      data.data = {
        query: `
        query {
          boards(ids: ${data.board_id}) {
            columns {
              id
              title
              type
            }
          }
        }
      `
      }
      const result = await this.performMondaydotcomAction('Columns', 'getMany', 'POST', data);
      return {response:result,status:result.status}

    } catch (error) {
      this.logger.error(`Error in Columns/getMany:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
  async getAllGroups(@Body() data: any) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      data.data = {
        query: `
      query {
          boards(ids: ${data.data.id}) {
              groups {
                  id
                  title
                  archived
                  deleted
              }
          }
      }
  `
      }

      const result = await this.performMondaydotcomAction('groups', 'getMany', 'POST', data);
     return {response:result,status:result.status}
    } catch (error) {
      this.logger.error(`Error in Groups/getMany:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getAllTeams(@Body() data: any) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {

      data.data = {
        query: `
               query {
            teams {
              name
              picture_url
              users {
                created_at
                phone
              }
            }
          }
        `
      }
      const result = await this.performMondaydotcomAction('Teams', 'getMany', 'POST', data);
      return {response:result,status:result.status}
    } catch (error) {
      this.logger.error(`Error in Teams/getMany:`, error);
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
      data.data = {
        query: `
    query {
        users {
          id
          created_at
          email
        account {
          name
          id      
        }
        }
      }
        `
      }
      const result = await this.performMondaydotcomAction('Users', 'getMany', 'POST', data);
      return {response:result.response.data.users.map(data =>({id:data.id})),status:result.status}
    } catch (error) {
      this.logger.error(`Error in Users/create:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
  async getAllWorkspace(@Body() data: any) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      data.data={
        query:`
          query {
            workspaces {
                id
                name
                kind
                description
            }
          }
        `
      }
      const result = await this.performMondaydotcomAction('workspace', 'getMany','POST', data);
     return {response:result.response.data.workspaces.map(data =>({id:data.id,name:data.name})),status:result.status}
    } catch (error) {
      // this.logger.error(`Error in Tags/getMany:`, error);
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
   * [AUTO-GENERATED] Helper method to perform a monday.com action.
   * This method is a stub—extend it to integrate with the actual API for your xapp.
   *
   * Validations:
   * - Ensure that the provided module and action are supported.
   * - Validate the "data" structure as needed.
   *
   * DO NOT change the method signature.
   */
  private async performMondaydotcomAction(module: string, action: string, method: string, data: any) {

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
      const initializeData = await this.initialize(credentialId)

      const access_token = initializeData;
      const baseUrl = `https://api.monday.com/v2`
      let url = baseUrl

      if (data.Id) url += `/${data.Id}`

      const options: any = {
        method, url, headers: {
          "Authorization": `Bearer ${access_token}`,
          "Content-Type": "application/json"
        }
      };
      if (action === 'getMany') {
        options.data = JSON.stringify({ query: data.query });
      } else {
        if (argumentdata) options.data = { query: data.query };
      }

      console.log("data:", argumentdata, "options.data:", options.data);


      console.log("options", options)

      const response = await axios(options)
      return { response: response.data, status: response.status }

    } catch (error) {
      console.log(error)
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
export const Monday = new MondayController()

