// amocrm.config.ts
// -----------------------------------------------------------------------------
// AUTO-GENERATED CONFIGURATION FILE.
// DO NOT modify the sections labeled "AUTO-GENERATED".
//
// Copyright (c) 2025 Smackcoders. All rights reserved.
// This file is subject to the Smackcoders Proprietary License.
// Unauthorized copying or distribution is strictly prohibited.
// -----------------------------------------------------------------------------

import { amController } from "./amocrm.controller";

export const XappName = "amocrm";
export const modules = [
  {
    "module": "company",
    "actions": [
      "create",
      "update",
      "get",
      "getMany",
      "delete"
    ],
    "triggers": [
      "company_updated",
      "new_company"
    ]
  },
  {
    "module": "contact",
    "actions": [
      "create",
      "update",
      "get",
      "getMany",
      "delete"
    ],
    "triggers": [
      "contact_updated",
      "new_contact"
    ]
  },
  {
    "module": "lead",
    "actions": [
      "create",
      "update",
      "get",
      "getMany",
      "delete"
    ],
    "triggers": []
  },
  {
    "module": "note",
    "actions": [
      "create",
      "update",
      "get",
      "getMany",
      "delete"
    ],
    "triggers": [
      "note_updated"
    ]
  },
  {
    "module": "task",
    "actions": [
      "create",
      "update",
      "get",
      "getMany",
      "delete"
    ],
    "triggers": []
  }
];

export default {
  XappName,
  modules,
};


export const companyFields = [
  {
    displayName: 'Company ID',
    name: 'id',
    type: 'int32',
    description: 'Unique identifier of the company.'
  },
  {
    displayName: 'Company Name',
    name: 'name',
    type: 'string',
    description: 'The name of the company.'
  },
  {
    displayName: 'Responsible User ID',
    name: 'responsible_user_id',
    type: 'int32',
    description: 'The ID of the user responsible for the company.'
  },
  {
    displayName: 'Created By',
    name: 'created_by',
    type: 'int32',
    description: 'The ID of the user who created the company.'
  },
  {
    displayName: 'Updated By',
    name: 'updated_by',
    type: 'int32',
    description: 'The ID of the user who last updated the company.'
  },
  {
    displayName: 'Created At',
    name: 'created_at',
    type: 'int32',
    description: 'Company creation date in the format of Unix Timestamp.'
  },
  {
    displayName: 'Updated At',
    name: 'updated_at',
    type: 'int32',
    description: 'Company update date in the format of Unix Timestamp.'
  },
  {
    displayName: 'Custom Fields Values',
    name: 'custom_fields_values',
    type: 'json',
    description: 'An array of the current company custom fields’ values.'
  },
  {
    displayName: 'Embedded Object',
    name: '_embedded',
    type: 'object',
    description: 'Embedded object containing additional information.'
  },
  {
    displayName: 'Request ID',
    name: 'request_id',
    type: 'string',
    description: 'The field will be returned unchanged in the response and will not be saved.'
  },
  {
    displayName: 'Tags to Add',
    name: 'tags_to_add',
    type: 'array of objects',
    description: 'Array of tags to add. You need to pass either name or ID of the tag.'
  }
];
export const contactFields = [
  {
    displayName: 'Contact Fullname',
    name: 'name',
    type: 'string',
    description: 'Full name of the contact.'
  },
  {
    displayName: 'Contact First Name',
    name: 'first_name',
    type: 'string',
    description: 'First name of the contact.'
  },
  {
    displayName: 'Contact Last Name',
    name: 'last_name',
    type: 'string',
    description: 'Last name of the contact.'
  },
  {
    displayName: 'Responsible User ID',
    name: 'responsible_user_id',
    type: 'int32',
    description: 'The ID of the user responsible for the contact.'
  },
  {
    displayName: 'Created By',
    name: 'created_by',
    type: 'int32',
    description: 'The ID of the user who created the contact.'
  },
  {
    displayName: 'Updated By',
    name: 'updated_by',
    type: 'int32',
    description: 'The ID of the user who last updated the contact.'
  },
  {
    displayName: 'Created At',
    name: 'created_at',
    type: 'int32',
    description: 'Contact creation date in the format of Unix Timestamp.'
  },
  {
    displayName: 'Updated At',
    name: 'updated_at',
    type: 'int32',
    description: 'Contact update date in the format of Unix Timestamp.'
  },
  {
    displayName: 'Custom Fields Values',
    name: 'custom_fields_values',
    type: 'json',
    description: 'An array of the current contact custom fields’ values.'
  },
  {
    displayName: 'Embedded Object',
    name: '_embedded',
    type: 'object',
    description: 'Embedded entities data.'
  },
  {
    displayName: 'Tags to Add',
    name: 'tags_to_add',
    type: 'array of objects',
    description: 'Array of tags to add. You need to pass either name or ID of the tag.'
  },
  {
    displayName: 'Tags to Delete',
    name: 'tags_to_delete',
    type: 'array of objects',
    description: 'Array of tags to delete. You need to pass either name or ID of the tag.'
  }
];
export const taskFields = [
  {
    displayName: 'Responsible User ID',
    name: 'responsible_user_id',
    type: 'int32',
    description: 'Task responsible user ID, current user ID by default.'
  },
  {
    displayName: 'Entity ID',
    name: 'entity_id',
    type: 'int32',
    description: 'ID of the entity the task is linked to.'
  },
  {
    displayName: 'Entity Type',
    name: 'entity_type',
    type: 'string',
    description: 'Type of the entity the task is linked to.'
  },
  {
    displayName: 'Is Completed',
    name: 'is_completed',
    type: 'boolean',
    description: 'Defines whether the task is completed.'
  },
  {
    displayName: 'Task Type ID',
    name: 'task_type_id',
    type: 'int32',
    description: 'Task type.'
  },
  {
    displayName: 'Text',
    name: 'text',
    type: 'string',
    description: 'Task description.'
  },
  {
    displayName: 'Duration',
    name: 'duration',
    type: 'int32',
    description: 'Task duration in seconds.'
  },
  {
    displayName: 'Complete Till',
    name: 'complete_till',
    type: 'int32',
    description: 'Task deadline date in the format of Unix Timestamp.'
  },
  {
    displayName: 'Result Object',
    name: 'result',
    type: 'object',
    description: 'Task result.'
  },
  {
    displayName: 'Created By',
    name: 'created_by',
    type: 'int32',
    description: 'ID of the user who created the task.'
  },
  {
    displayName: 'Updated By',
    name: 'updated_by',
    type: 'int32',
    description: 'ID of the user who edited the task last.'
  },
  {
    displayName: 'Created At',
    name: 'created_at',
    type: 'int32',
    description: 'Task creation date in the format of Unix Timestamp.'
  },
  {
    displayName: 'Updated At',
    name: 'updated_at',
    type: 'int32',
    description: 'Task edit date in the format of Unix Timestamp.'
  },
  {
    displayName: 'Request ID',
    name: 'request_id',
    type: 'string',
    description: 'Field that will be returned unchanged in the response and will not be saved.'
  }
];
export const noteFields = [
  {
    displayName: 'Note Type',
    name: 'note_type',
    type: 'string',
    description: 'Type of the note. '
  },
  {
    displayName: 'Params',
    name: 'params',
    type: 'json',
    description: 'Note properties depending on the note type.'
  },
  {
    displayName: 'Request ID',
    name: 'request_id',
    type: 'string',
    description: 'Field that will be returned unchanged in the response and will not be saved.'
  },
  {
    displayName: 'Trigger Digital Pipeline',
    name: 'is_need_to_trigger_digital_pipeline',
    type: 'boolean',
    description: 'Defines whether to send events to the Digital Pipeline. Optional. If not passed or passed as true, Digital Pipeline triggers will be processed.'
  }
];
export const leadFields = [
  {
    displayName: 'Lead Name',
    name: 'name',
    type: 'string',
    description: 'Name of the lead.'
  },
  {
    displayName: 'Price',
    name: 'price',
    type: 'int32',
    description: 'Lead sale amount.'
  },
  {
    displayName: 'Status ID',
    name: 'status_id',
    type: 'int32',
    description: 'Stage ID the lead is added to. The first stage of the main pipeline by default.'
  },
  {
    displayName: 'Pipeline ID',
    name: 'pipeline_id',
    type: 'int32',
    description: 'Pipeline ID the lead is added to.'
  },
  {
    displayName: 'Created By',
    name: 'created_by',
    type: 'int32',
    description: 'The ID of the user creating the lead. When passing the value 0, the lead will be considered as created by the robot.'
  },
  {
    displayName: 'Updated By',
    name: 'updated_by',
    type: 'int32',
    description: 'The ID of the user updating the lead. When passing the value 0, the lead will be considered as created by the robot.'
  },
  {
    displayName: 'Created At',
    name: 'created_at',
    type: 'int32',
    description: 'Lead creation date in the format of Unix Timestamp.'
  },
  {
    displayName: 'Updated At',
    name: 'updated_at',
    type: 'int32',
    description: 'Lead update date in the format of Unix Timestamp.'
  },
  {
    displayName: 'Closed At',
    name: 'closed_at',
    type: 'int32',
    description: 'Lead closure date in the format of Unix Timestamp.'
  },
  {
    displayName: 'Loss Reason ID',
    name: 'loss_reason_id',
    type: 'int32',
    description: 'Lead loss reason ID.'
  },
  {
    displayName: 'Responsible User ID',
    name: 'responsible_user_id',
    type: 'int32',
    description: 'Lead responsible user ID.'
  },
  {
    displayName: 'Custom Fields Values',
    name: 'custom_fields_values',
    type: 'json',
    description: 'An array of the current lead custom fields’ values.'
  },
  {
    displayName: 'Embedded Object',
    name: '_embedded',
    type: 'object',
    description: 'Embedded entities of the lead.'
  },
  {
    displayName: 'Tags to Add',
    name: 'tags_to_add',
    type: 'array of objects',
    description: 'Array of tags to add. You need to pass either name or ID of the tag.'
  },
  {
    displayName: 'Tags to Delete',
    name: 'tags_to_delete',
    type: 'array of objects',
    description: 'Array of tags to delete. You need to pass either name or ID of the tag.'
  }
];
export const fields = [
  {
    displayName: 'name',
    name: 'name',
    type: 'string',
    description: 'unique name of the company.',
    default: '',
    items: [],
    options: [],
    required: true,
    displayOptions: {
      show: {
        category: ['company', 'contact', 'lead'],
        name: ['create', 'update'],
      },
    },
  },
  {
    displayName: 'Id',
    name: 'companyId',
    type: 'string',
    description: 'unique id of the company.',
    default: '',
    items: [],
    options: [],
    required: true,
    displayOptions: {
      show: {
        category: ['company'],
        name: ['get', 'update'],
      },
    },
  },
  {
    displayName: 'Companies',
    name: 'getMany',
    type: 'string',
    description: 'list of the companies.',
    default: '',
    items: [],
    options: [],
    required: true,
    async init(data) {
      try {
        const list = await amController.getmanyCompanyf(data);
        this.options = list;
      } catch (error) {
        return ({ 'Error': error })
      }
    },
    displayOptions: {
      show: {
        category: ['company'],
        name: ['getMany'],
      },
    },
  },
  {
    displayName: 'Additional fields',
    name: 'Additional fields',
    type: 'string',
    description: 'optional fields.',
    default: '',
    items: [],
    options: [companyFields],
    required: false,
    displayOptions: {
      show: {
        category: ['company'],
        name: ['create','update'],
      },
    },
    
  },

  {
    displayName: 'Id',
    name: 'contactId',
    type: 'string',
    description: 'unique id of the contact.',
    default: '',
    items: [],
    options: [],
    required: true,
    displayOptions: {
      show: {
        category: ['contact'],
        name: ['get', 'update'],
      },
    },
  },
  {
    displayName: 'Contacts',
    name: 'getMany',
    type: 'string',
    description: 'list of the contacts.',
    default: '',
    items: [],
    options: [],
    required: true,
    async init(data) {
      try {
        const list = await amController.getmanyContactf(data);
        this.options = list;
      } catch (error) {
        return ({ 'Error': error })
      }
    },
    displayOptions: {
      show: {
        category: ['contact'],
        name: ['getMany'],
      },
    },
  },
  {
    displayName: 'Additional fields',
    name: 'Additional fields',
    type: 'string',
    description: 'optional fields.',
    default: '',
    items: [],
    options: [contactFields],
    required: false,
    displayOptions: {
      show: {
        category: ['contact'],
        name: ['create','update'],
      },
    },
  },
  {
    displayName: 'Id',
    name: 'noteId',
    type: 'string',
    description: 'unique id of the note.',
    default: '',
    items: [],
    options: [],
    required: true,
    displayOptions: {
      show: {
        category: ['note'],
        name: ['get', 'update'],
      },
    },
  },
  {
    displayName: 'entity_type',
    name: 'entity_type',
    type: 'string',
    description: 'type of the entity.',
    default: '',
    items: [],
    options: [],
    required: true,
    displayOptions: {
      show: {
        category: ['note'],
        name: ['get', 'update', 'getmany', 'create'],
      },
    },
  },

  {
    displayName: 'Id',
    name: 'entity_id',
    type: 'string',
    description: 'unique id of the entity.',
    default: '',
    items: [],
    options: [],
    required: true,
    displayOptions: {
      show: {
        category: ['note'],
        name: ['create', 'update'],
      },
    },
  },
  {
    displayName: 'note_type',
    name: 'note_type',
    type: 'string',
    description: 'type of the note.',
    default: '',
    items: [],
    options: [],
    required: true,
    displayOptions: {
      show: {
        category: ['note'],
        name: ['create', 'update'],
      },
    },
  },
  {
    displayName: 'params__text',
    name: 'params__text',
    type: 'string',
    description: 'The note description.',
    default: '',
    items: [],
    options: [],
    required: true,
    displayOptions: {
      show: {
        category: ['note'],
        name: ['create', 'update'],
      },
    },
  },
  {
    displayName: 'is_need_to_trigger_digital_pipeline',
    name: 'is_need_to_trigger_digital_pipeline',
    type: 'boolean',
    description: 'option to trigger.',
    default: '',
    items: [],
    options: [],
    required: true,
    displayOptions: {
      show: {
        category: ['note'],
        name: ['create', 'update'],
      },
    },
  },
  {
    displayName: 'Notes',
    name: 'getMany',
    type: 'string',
    description: 'list of the Notes.',
    default: '',
    items: [],
    options: [],
    async init(data) {
      try {
        const list = await amController.getmanyNotef(data);
        this.options = list;
      } catch (error) {
        return ({ 'Error': error })
      }
    },
    required: true,
    displayOptions: {
      show: {
        category: ['note'],
        name: ['getMany'],
      },
    },
  },
  {
    displayName: 'Additional fields',
    name: 'Additional fields',
    type: 'string',
    description: 'optional fields.',
    default: '',
    items: [],
    options: [noteFields],
    required: false,
    displayOptions: {
      show: {
        category: ['note'],
        name: ['getMany'],
      },
    },
  },
  {
    displayName: 'Id',
    name: 'leadId',
    type: 'string',
    description: 'unique id of the lead.',
    default: '',
    items: [],
    options: [],
    required: true,
    displayOptions: {
      show: {
        category: ['lead'],
        name: ['get', 'update'],
      },
    },
  },
  {
    displayName: 'lead',
    name: 'getMany',
    type: 'string',
    description: 'list of the leads.',
    default: '',
    items: [],
    options: [],
    required: true,
    async init(data) {
      try {
        const list = await amController.getmanyLeadf(data);
        this.options = list;
      } catch (error) {
        return ({ 'Error': error })
      }
    },
    displayOptions: {
      show: {
        category: ['lead'],
        name: ['getMany'],
      },
    },
  },
  {
    displayName: 'Additional fields',
    name: 'Additional fields',
    type: 'string',
    description: 'optional fields.',
    default: '',
    items: [],
    options: [leadFields],
    required: false,
    displayOptions: {
      show: {
        category: ['lead'],
        name: ['getMany'],
      },
    },
  },

  {
    displayName: 'text',
    name: 'text',
    type: 'string',
    description: 'the task description.',
    default: '',
    items: [],
    options: [],
    required: true,
    displayOptions: {
      show: {
        category: ['task'],
        name: ['create', 'update'],
      },
    },
  },
  {
    displayName: 'complete_till',
    name: 'complete_till',
    type: 'string',
    description: 'the duration to complete the task.',
    default: '',
    items: [],
    options: [],
    required: true,
    displayOptions: {
      show: {
        category: ['task'],
        name: ['create', 'update'],
      },
    },
  },
  {
    displayName: 'Id',
    name: 'taskId',
    type: 'string',
    description: 'unique id of the task.',
    default: '',
    items: [],
    options: [],
    required: true,
    displayOptions: {
      show: {
        category: ['task'],
        name: ['get', 'update'],
      },
    },
  },
  {
    displayName: 'tasks',
    name: 'getMany',
    type: 'string',
    description: 'list of the tasks.',
    default: '',
    items: [],
    options: [],
    required: true,
    async init(data) {
      try {
        const list = await amController.getmanyTaskf(data);
        this.options = list;
      } catch (error) {
        return ({ 'Error': error })
      }
    },
    displayOptions: {
      show: {
        category: ['task'],
        name: ['getMany'],
      },
    },
  },
  {
    displayName: 'Additional fields',
    name: 'Additional fields',
    type: 'string',
    description: 'optional fields.',
    default: '',
    items: [],
    options: [taskFields],
    required: false,
    displayOptions: {
      show: {
        category: ['task'],
        name: ['create','update'],
      },
    },
  },

]
