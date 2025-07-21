import { Controller, Post, Get, Patch, Delete, Param, Body, Req, Res, HttpStatus, HttpException } from '@nestjs/common'
import { Request, Response } from 'express';
import axios from 'axios';
import * as crypto from 'crypto';
import { CredentialController } from 'src/credential/credential.controller';
import { Credentials } from 'src/entities/Credentials';
import { initializeDB } from 'src/ormconfig';
import { CustomLogger } from 'src/logger/custom.logger';
import { url } from 'inspector';
import config, { XappName, fields, modules, fields as xappModules } from './smartsuite.config';

@Controller('smartsuite')
export class SmartsuiteController {
  private credentialController = new CredentialController();
  private logger = new CustomLogger();

  /**
* [AUTO-GENERATED] OAuth authorize endpoint.
* This endpoint initiates the authentication flow.
* Implement the actual token request and error handling as needed.
*/

  @Post('authorize')
  async authorize(@Body() reqBody: any, @Res() res: Response) {

    if (!reqBody.apiKey) {
      throw new HttpException('Missing OAuth parameters', HttpStatus.BAD_REQUEST)
    }
    try {
      const { name, type, apiKey } = reqBody;
      // Construct the OAuth URL.
      // NOTE: Update the URL if your xapp uses a different authentication endpoint.
      const state = crypto.randomBytes(16).toString('hex');
      const data = {
        apiKey,
        state
      };
      const reqbody = {
        name: name,
        type: type,
        data: data
      }
      if (reqBody.id) {
        // Update existing credentials
        await this.credentialController.updateCredentials(reqBody.id, data);
        this.logger.debug(`Credentials with ID updated successfully :`, reqBody.id);
      } else {
        await this.credentialController.createCredentials(reqbody, res);
        this.logger.debug(`New credentials created for :`, name);
      }
      return res.status(HttpStatus.OK).send("API key stored successfully");
    } catch (error) {
      this.logger.error('Error in authorize:', error);
      throw new HttpException('Authorization error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // ---------------------------------------------------------------------------
  // AUTO-GENERATED ENDPOINTS FOR MODULE ACTIONS (as defined in the blueprint JSON)
  // ---------------------------------------------------------------------------
  

    /**
   * [AUTO-GENERATED] Endpoint for module "records" action "getMany".
   *  - Request Parameters (data): 
   * - credentialId: string
   * - Filters: object (optional filters for querying records)
   * - Calls the integration helper "performSmartSuiteAction".
   * DO NOT modify the method signature.
   *  Example usage:
   * {
    "credentialId": "{{credentialId}}",
    "data": {
        "tabelId": "682ac424ef041efe3b5041a5"  //tabel Id
    }
}
   */


@Post('workspace/getMany')
async getmanyWorkspcae(@Body() data: any, @Res() res: Response) {
  if (!data) {
    throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
  }
  try {

    const result = await this.performSmartSuiteAction(`workspaces/`, 'getMany', 'post', data);
    return res.status(HttpStatus.OK).json({
      message: `SmartSuite workspace getMany executed successfully`,
      result,
    });
  } catch (error) {
    this.logger.error(`Error in workspace/getMany:`, error);
    throw new HttpException(
      error.message || 'Internal server error',
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}

  /**
   * [AUTO-GENERATED] Endpoint for module "tables" action "create".
   *  - Request Parameters (data): 
   * - credentialId: string
   * - data: object (data to create)
   * - Calls the integration helper "performSmartSuiteAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId": "{{credentialId}}",
    "data": {
        "data": {
            "name": "Harish 3 ",
            "solution": "682c13e66cbd033abd06db10",
            "structure": [
                {
                    "field_type": "textfield"
                }
            ]
        }
    }
}

   */


  @Post('tables/create')
  async createTables(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performSmartSuiteAction('applications/', 'create', 'post', data);
      return res.status(HttpStatus.OK).json({
        message: `SmartSuite tables create executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in tables/create:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
     * [AUTO-GENERATED] Endpoint for module "tables" action "get".
     *  - Request Parameters (data): 
     * - credentialId: string
     * - data: string (ID of the record to fetch)
     * - Calls the integration helper "performSmartSuiteAction".
     * DO NOT modify the method signature.
     *  Example usage:
     * {
    "credentialId": "{{credentialId}}",
    "data": {
        "Id":"682c1335274a7b5565247734"
    }
}
     */


  @Post('tables/get')
  async getTables(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performSmartSuiteAction('applications', 'get', 'get', data);
      return res.status(HttpStatus.OK).json({
        message: `SmartSuite tables get executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in tables/get:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "tables" action "getMany".
   *  - Request Parameters (data): 
   * - credentialId: string
   * - Filters: object (optional filters for querying records)
   * - Calls the integration helper "performSmartSuiteAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId": "{{credentialId}}",
    "data": {
      
    }
}
   */


  @Post('tables/getMany')
  async getmanyTables(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performSmartSuiteAction('applications', 'getMany', 'get', data);
      return res.status(HttpStatus.OK).json({
        message: `SmartSuite tables getMany executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in tables/getMany:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
  * [AUTO-GENERATED] Endpoint for module "records" action "create".
  *  - Request Parameters (data): 
  * - credentialId: string
  * - data: object (data to create)
  * - Calls the integration helper "performSmartSuiteAction".
  * DO NOT modify the method signature.
  *  Example usage:
  *  {
    "credentialId": "{{credentialId}}",
    "data": {
        "tabelId":"682c13f868c9df7dc3247730",  //Table Id
        "data": {
            "title":"Harish Record"
        }
    }
}
  */


  @Post('records/create')
  async createRecords(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performSmartSuiteAction(`applications/${data.data.tabelId}/records/`, 'create', 'post', data);
      return res.status(HttpStatus.OK).json({
        message: `SmartSuite records create executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in records/create:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
     * [AUTO-GENERATED] Endpoint for module "records" action "update".
     *  - Request Parameters (data): 
     * - credentialId: string
     * - data: object (data to update)
     * - Calls the integration helper "performSmartSuiteAction".
     * DO NOT modify the method signature.
     *  Example usage:
     *  {
    "credentialId": "{{credentialId}}",
    "data": {
        "tabelId":"682c13f868c9df7dc3247730", //tabel Id
        "Id":"682c17dd4c8d3c00bd99ed6b", //record Id
        "data": {
            "title":"project",
             "status": {
                "value": "In Process",
                "updated_on": "2025-05-20T05:49:17.377758Z"
            }
        }
            
    }
}
     */


  @Post('records/update')
  async updateRecords(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      
      const result = await this.performSmartSuiteAction(`applications/${data.data.tabelId}/records`, 'update', 'put', data);
      return res.status(HttpStatus.OK).json({
        message: `SmartSuite records update executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in records/update:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "records" action "get".
   *  - Request Parameters (data): 
   * - credentialId: string
   * - data: string (ID of the record to fetch)
   * - Calls the integration helper "performSmartSuiteAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId": "{{credentialId}}",
    "data": {
        "tabelId": "682ac424ef041efe3b5041a5", //tabel Id
        "Id": "682ac4c58a07bf6dc724d635"  //record Id
    }
}
   */


  @Post('records/get')
  async getRecords(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      
      const result = await this.performSmartSuiteAction(`applications/${data.data.tabelId}/records`, 'get', 'get', data);
      return res.status(HttpStatus.OK).json({
        message: `SmartSuite records get executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in records/get:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "records" action "getMany".
   *  - Request Parameters (data): 
   * - credentialId: string
   * - Filters: object (optional filters for querying records)
   * - Calls the integration helper "performSmartSuiteAction".
   * DO NOT modify the method signature.
   *  Example usage:
   * {
    "credentialId": "{{credentialId}}",
    "data": {
        "tabelId": "682ac424ef041efe3b5041a5"  //tabel Id
    }
}
   */


  @Post('records/getMany')
  async getmanyRecords(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
  
      const result = await this.performSmartSuiteAction(`applications/${data.data.tabelId}/records/list/`, 'post', 'post', data);
      return res.status(HttpStatus.OK).json({
        message: `SmartSuite records getMany executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in records/getMany:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "records" action "delete".
   *  - Request Parameters (data): 
   * - credentialId: string
   * - data: string (ID of the record to delete)
   * - Calls the integration helper "performSmartSuiteAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId": "{{credentialId}}",
    "data": {
        "tabelId":"682ac424ef041efe3b5041a5",
        "Id":"682ac4c58a07bf6dc724d635"
      
    }
}
   */


  @Post('records/delete')
  async deleteRecords(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {

   
      const result = await this.performSmartSuiteAction(`applications/${data.data.tabelId}/records`, 'delete', 'delete', data);
      return res.status(HttpStatus.OK).json({
        message: `SmartSuite records delete executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in records/delete:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }


  /**
 * [AUTO-GENERATED] Endpoint for module "solutions" action "create".
 *  - Request Parameters (data): 
 * - credentialId: string
 * - data: object (data to create)
 * - Calls the integration helper "performSmartSuiteAction".
 * DO NOT modify the method signature.
 *  Example usage:
 *  {
    "credentialId": "{{credentialId}}",
    "data": {
        "data": {
            "name": "New Harish 6",
            "logo_icon": "overline",
            "logo_color": "#3A86FF"
            
        }
    }
}
 */


  @Post('solutions/create')
  async createSolutions(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performSmartSuiteAction('solutions/', 'create', 'post', data);
      return res.status(HttpStatus.OK).json({
        message: `SmartSuite solutions create executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in solutions/create:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
  * [AUTO-GENERATED] Endpoint for module "solutions" action "get".
  *  - Request Parameters (data): 
  * - credentialId: string
  * - data: string (ID of the record to fetch)
  * - Calls the integration helper "performSmartSuiteAction".
  * DO NOT modify the method signature.
  *  Example usage:
  *  {
    "credentialId": "{{credentialId}}",
    "data": {
        "Id":"682ac298cd9eb16aac96da31"
       
    }
}
  */


  @Post('solutions/get')
  async getSolutions(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performSmartSuiteAction('solutions', 'get', 'get', data);
      return res.status(HttpStatus.OK).json({
        message: `SmartSuite solutions get executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in solutions/get:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }


  /**
   * [AUTO-GENERATED] Endpoint for module "solutions" action "getMany".
   *  - Request Parameters (data): 
   * - credentialId: string
   * - Filters: object (optional filters for querying records)
   * - Calls the integration helper "performSmartSuiteAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId": "{{credentialId}}",
    "data": {
  
    }
} */


  @Post('solutions/getMany')
  async getmanySolutions(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performSmartSuiteAction('solutions', 'getMany', 'get', data);
      return res.status(HttpStatus.OK).json({
        message: `SmartSuite solutions getMany executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in solutions/getMany:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "webhooks" action "create".
   *  - Request Parameters (data): 
   * - credentialId: string
   * - data: object (data to create)
   * - Calls the integration helper "performSmartSuiteAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId": "{{credentialId}}",
    "data": {
        "data": {
            "webhook": {
                "filter": {
                    "solution": {}
                },
                "kinds": [
                    "RECORD_CREATED"
                ],
                "locator": {
                    "accountId": "sv0ww36l",
                    "solution_id": "682ac298cd9eb16aac96da31"
                },
                "notification_status": {
                    "enabled": {
                        "url": "https://hook.us1.make.com/pgbpclvi5y9aix2g5cu421paeeq2izzz"
                    }
                }
            }
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
      const result = await this.performSmartSuiteAction('CreateWebhook', 'create', 'post', data);
      return res.status(HttpStatus.OK).json({
        message: `SmartSuite webhooks create executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in webhooks/create:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "webhooks" action "update".
   *  - Request Parameters (data): 
   * - credentialId: string
   * - data: object (data to update)
   * - Calls the integration helper "performSmartSuiteAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId": "{{credentialId}}",
    "data": {
        "data": {
            "webhook": {
                "webhook_id": "e3f229d8-2613-4e1b-abd1-ab87728fc4da",
                "kinds": [
                    "RECORD_CREATED"
                ],
                "locator": {
                    "account_id": "sv0ww36l",
                    "solution_id": "682ac298cd9eb16aac96da31"
                },
                "filter": {
                    "solution": {}
                },
                "notification_status": {
                    "enabled": {
                       
                    }
                }
            }
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
      const result = await this.performSmartSuiteAction('UpdateWebhook', 'update', 'post', data);
      return res.status(HttpStatus.OK).json({
        message: `SmartSuite webhooks update executed successfully`,
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
   * [AUTO-GENERATED] Endpoint for module "webhooks" action "get".
   *  - Request Parameters (data): 
   * - credentialId: string
   * - data: string (ID of the record to fetch)
   * - Calls the integration helper "performSmartSuiteAction".
   * DO NOT modify the method signature.
   *  Example usage:
   * {
    "credentialId": "{{credentialId}}",
    "data": {
        "data": {
            "webhook_id": "e3f229d8-2613-4e1b-abd1-ab87728fc4da"
        }
    }
}
   */


  @Post('webhooks/get')
  async getWebhooks(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performSmartSuiteAction('GetWebhook', 'get', 'post', data);
      return res.status(HttpStatus.OK).json({
        message: `SmartSuite webhooks get executed successfully`,
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
   * [AUTO-GENERATED] Endpoint for module "webhooks" action "getMany".
   *  - Request Parameters (data): 
   * - credentialId: string
   * - Filters: object (optional filters for querying records)
   * - Calls the integration helper "performSmartSuiteAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId": "{{credentialId}}",
    "data": {
        "data": {
            "solution_id": "682ac298cd9eb16aac96da31"
        }
    }
}
   */


  @Post('webhooks/getMany')
  async getmanyWebhooks(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performSmartSuiteAction('ListWebhooks', 'get', 'post', data);
      return res.status(HttpStatus.OK).json({
        message: `SmartSuite webhooks getMany executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in webhooks/getMany:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "webhooks" action "delete".
   *  - Request Parameters (data): 
   * - credentialId: string
   * - data: string (ID of the record to delete)
   * - Calls the integration helper "performSmartSuiteAction".
   * DO NOT modify the method signature.
   *  Example usage:
   * {
    "credentialId": "{{credentialId}}",
    "data": {
        "data": {
            "webhook_id": "e3f229d8-2613-4e1b-abd1-ab87728fc4da"
        }
    }
}
   */


  @Post('webhooks/delete')
  async deleteWebhooks(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performSmartSuiteAction('DeleteWebhook', 'delete', 'post', data);
      return res.status(HttpStatus.OK).json({
        message: `SmartSuite webhooks delete executed successfully`,
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
   * [AUTO-GENERATED] Endpoint for module "fields" action "create".
   *  - Request Parameters (data): 
   * - credentialId: string
   * - data: object (data to create)
   * - Calls the integration helper "performSmartSuiteAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId": "{{credentialId}}",
    "data": {
        "tabelId": "682ac424ef041efe3b5041a5",  //table ID
        "data": {
            "field": {
                "slug": "Anto bot", 
                "label": "Field 3",
                "field_type": "textfield", 
                "params": {
                    "max_length": 255 
                },
                "is_new": true
            },
            "field_position": {
                "prev_sibling_slug": "" 
            },
            "auto_fill_structure_layout": true
        }
    }
} 
   */


  @Post('fields/create')
  async createFields(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      
      const result = await this.performSmartSuiteAction(`applications/${data.data.tabelId}/add_field/`, 'create', 'post', data);
      return res.status(HttpStatus.OK).json({
        message: `SmartSuite fields create executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in fields/create:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "fields" action "update".
   *  - Request Parameters (data): 
   * - credentialId: string
   * - data: object (data to update)
   * - Calls the integration helper "performSmartSuiteAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId": "{{credentialId}}",
    "data": {
        "tabelId": "682ac424ef041efe3b5041a5",
        "data": {
            "slug": "H1A2R3I4S5H",
            "label": "Field 2",
            "field_type": "textfield",
            "params": {
                "max_length": 200
            }
        }
    }
}
   */


  @Post('fields/update')
  async updateFields(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performSmartSuiteAction(`applications/${data.data.tabelId}/change_field/`, 'update', 'put', data);
      return res.status(HttpStatus.OK).json({
        message: `SmartSuite fields update executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in fields/update:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "fields" action "delete".
   *  - Request Parameters (data): 
   * - credentialId: string
   * - data: string (ID of the record to delete)
   * - Calls the integration helper "performSmartSuiteAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId": "{{credentialId}}",
    "data": {
        "tabelId":"682ac424ef041efe3b5041a5",
        "data": {
            "slug": "Anto bot"
        }
    }
}
   */


  @Post('fields/delete')
  async deleteFields(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performSmartSuiteAction(`applications/${data.data.tabelId}/delete_field/`, 'delete', "post", data);
      return res.status(HttpStatus.OK).json({
        message: `SmartSuite fields delete executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in fields/delete:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "commands" action "create".
   *  - Request Parameters (data): 
   * - credentialId: string
   * - data: object (data to create)
   * - Calls the integration helper "performSmartSuiteAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId": "{{credentialId}}",
    "data": {
        "data": {
            "assigned_to":null,
            "message": {
                "html": "<b>hiii</b>"
            },
            "application": "682c13f868c9df7dc3247730",  //tabel ID
            "record": "682c140a2f4dde480cc67ad3"
        }
    }
}
   */


  @Post('comments/create')
  async createComments(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const recordId = data.data.recordId;
      const result = await this.performSmartSuiteAction(`comments/`, 'create', 'post', data);
      return res.status(HttpStatus.OK).json({
        message: `SmartSuite commands create executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in commands/create:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * [AUTO-GENERATED] Endpoint for module "commands" action "getMany".
   *  - Request Parameters (data): 
   * - credentialId: string
   * - Filters: object (optional filters for querying records)
   * - Calls the integration helper "performSmartSuiteAction".
   * DO NOT modify the method signature.
   *  Example usage:
   *  {
    "credentialId": "{{credentialId}}",
    "data": {
    
    }
}  
   */


  @Post('comments/getMany')
  async getmanyComments(@Body() data: any, @Res() res: Response) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performSmartSuiteAction(`comments/`, 'getMany', 'get', data);
      return res.status(HttpStatus.OK).json({
        message: `SmartSuite commands getMany executed successfully`,
        result,
      });
    } catch (error) {
      this.logger.error(`Error in commands/getMany:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getAllTable(data: any) {
    
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performSmartSuiteAction('applications', 'getMany', 'get', data);
      return result.response.map(data=>({name:data.name, value:data.id}))
    } catch (error) {
      this.logger.error(`Error table/getMany:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
  async getAllRecords(data: any) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performSmartSuiteAction(`applications/${data.data.tableId}/records/list/`, 'post', 'post', data);
      return result.response.items.map(data=>({name:data.title, value:data.id}))
    } catch (error) {  
      this.logger.error(`Error record/getMany:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
  async getAllSolutions(data: any) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performSmartSuiteAction('solutions', 'getMany', 'get', data);
      return result.response.map(data=>({name:data.name,value:data.id}))
    } catch (error) {
      this.logger.error(`Error solution/getMany:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
  async getAllWebhooks(data: any) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      // data = {...data,data:{data:{solutionId:"6816093eb52761998a3c78a9"}}}
      const result = await this.performSmartSuiteAction(`ListWebhooks`, 'get', 'post', data);
      return result.response.webhooks.map(data=>({name:data.notification_status.enabled.url, value:data.webhook_id}))
    } catch (error) {
      this.logger.error(`Error webhook/getMany:`, error);
      throw new HttpException( 
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
  async getAllComments(data: any) {
    if (!data) {
      throw new HttpException('Request body cannot be empty', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.performSmartSuiteAction(`comments/`, 'getMany', 'get', data);
      return result.response.results.map(item => ({
        name: item.message?.data?.content?.[0]?.content?.[0]?.text || '',
        value: item.id
      }));
    } catch (error) {
      this.logger.error(`Error command/getMany:`, error);
      throw new HttpException(
        error.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
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

  public async initilize(credentialId) {
    try {
      const id = credentialId;
      const connection = await initializeDB();
      const credRepository = connection.getRepository(Credentials);
      const credentialRespository = await credRepository.findOne({ where: { id } });

      const apiKey = credentialRespository.authData.apiKey;

      return {apiKey}
    } catch (error) {
      this.logger.error('Error initializing twitter :', error + error.stack);
    }
  }


  public async curl(module: string, action: string, method: string, argumentdata: any): Promise<any> {
    try {
      const { credentialId, data } = argumentdata;
      const initializeData: any = await this.initilize(credentialId);
      const { apiKey } = initializeData;
      
      let url = `https://app.smartsuite.com/api/v1/${module}`;

      if (module.includes('Webhook')) {
        url = `https://webhooks.smartsuite.com/smartsuite.webhooks.engine.Webhooks/${module}`
      }
      if (data.Id) {
        url += `/${data.Id}`;
      }
      const options: any = {
        method,
        url,
        headers: {
          Authorization: `Token ${apiKey}`,
          "ACCOUNT-ID": "sv0ww36l",
          'Content-Type': 'application/json',
        }
      };
      console.log('options',options)
      if (action === 'getMany') {
        if (argumentdata)
          options.params = data;
      } else {
        if (argumentdata)
          options.data = data.data;
      }

      if (method === "get") {
        delete options.data;
      }
      const response = await axios(options);


      return { response: response.data, status: response.status }
    } catch (error) {
      return { response: [error.response?.data || error.message], status: error.status || 500 };
    }
  }


  private async performSmartSuiteAction(module: string, action: string, method: string, data: any): Promise<any> {
    // TODO: Implement the actual integration logic.
    // For example:
    // 1. Initialize your API client using a refresh token or saved credentials.
    // 2. Validate that 'data' contains required fields (CredentialId, ModuleId, ModuleData).
    // 3. Use the correct HTTP method based on the action (GET, POST, PATCH, DELETE, etc.).
    // 4. Handle errors and return the API response.
    // 5. If the access token is expired, call the refreshToken endpoint.
    const resultData = await this.curl(module, action, method, data)
    return resultData;
  }


}

export const smartsuite =new SmartsuiteController()
