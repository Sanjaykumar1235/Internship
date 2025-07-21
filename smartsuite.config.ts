// smartsuite.config.ts
// -----------------------------------------------------------------------------
// AUTO-GENERATED CONFIGURATION FILE.
// DO NOT modify the sections labeled "AUTO-GENERATED".
//
// Copyright (c) 2025 Smackcoders. All rights reserved.
// This file is subject to the Smackcoders Proprietary License.
// Unauthorized copying or distribution is strictly prohibited.
// -----------------------------------------------------------------------------

export const XappName = "SmartSuite";
export const modules = [
  {
    "module": "tables",
    "actions": [
      "create",
      "get",
      "getMany"
    ],
    "triggers": []
  },
  {
    "module": "records",
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
    "module": "solutions",
    "actions": [
      "create",
      "get",
      "getMany"
    ],
    "triggers": []
  },
  {
    "module": "webhooks",
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
    "module": "fields",
    "actions": [
      "create",
      "update",
      "delete"
    ],
    "triggers": []
  },
  {
    "module": "comments",
    "actions": [
      "create",
      "getMany"
    ],
    "triggers": []
  }
];
import { smartsuite, SmartsuiteController } from "./smartsuite.controller";
export default {
  XappName,
  modules,
};


// table module

export const createTableFields = [

  {
    displayName: "Slug",
    name: "structure||slug",
    type: "string",
    required: false,
    description: "The unique slug identifier for the field.",
    items: [],
    options: []
  },
  {
    displayName: "Label",
    name: "structure||label",
    type: "string",
    required: false,
    description: "The human-readable label for the field.",
    items: [],
    options: []
  },
]

// record module

export const createAndUpdateRecordField = [

  {
    displayName: "Data",
    name: "description__data",
    type: "string",
    required: false,
    description: "Structured data inside description.",
    items: [],
    options: []
  },
  {
    displayName: "HTML",
    name: "description__html",
    type: "string",
    required: false,
    description: "HTML-rendered content of the description.",
    items: [],
    options: []
  },
  {
    displayName: "Assigned_To",
    name: "assigned_to",
    type: "string",
    required: false,
    description: "Array of user IDs assigned to this record.",
    items: [],
    options: []
  },
  {
    displayName: "Value",
    name: "status__value",
    type: "string",
    required: false,
    description: "Status value of the record.",
    items: [],
    options: []
  },
  {
    displayName: "Date",
    name: "due_date__from_date__date",
    type: "string",
    required: false,
    description: "Start date of the due range.",
    items: [],
    options: []
  },
  {
    displayName: "IncludeTime",
    name: "due_date__from_date__include_time",
    type: "boolean",
    required: false,
    description: "Whether start date includes time.",
    items: [],
    options: []
  },
  {
    displayName: "Date",
    name: "due_date__to_date__date",
    type: "string",
    required: false,
    description: "End date of the due range.",
    items: [],
    options: []
  },
  {
    displayName: "IncludeTime",
    name: "due_date__to_date__include_time",
    type: "boolean",
    required: false,
    description: "Whether end date includes time.",
    items: [],
    options: []
  },
  {
    displayName: "IsOverdue",
    name: "due_date__is_overdue",
    type: "dropDown",
    required: false,
    description: "Whether the due date is past.",
    items: [],
    options: [
      { name: true, value: true },
      { name: false, value: false },
    ]
  },
  {
    displayName: "Priority",
    name: "priority",
    type: "string",
    required: false,
    description: "The priority level of the record.",
    items: [],
    options: []
  },
  {
    displayName: "FromDate",
    name: "sef1a6a113__from_date__date",
    type: "string",
    required: false,
    description: "Start date of custom field range.",
    items: [],
    options: [

    ]
  },
  {
    displayName: "IncludeTime",
    name: "sef1a6a113__from_date__include_time",
    type: "dropDown",
    required: false,
    description: "Whether start date includes time in custom field.",
    items: [],
    options: [
      { name: true, value: true },
      { name: false, value: false },
    ]
  },
  {
    displayName: "Date",
    name: "sef1a6a113__to_date__date",
    type: "string",
    required: false,
    description: "End date of custom field range.",
    items: [],
    options: []
  },
  {
    displayName: "IncludeTime",
    name: "sef1a6a113__to_date__include_time",
    type: "boolean",
    required: false,
    description: "Whether end date includes time in custom field.",
    items: [],
    options: []
  }
]



// webhooks module

export const createwebhook = [
  {
    displayName: "WebhookID",
    name: "webhook_id",
    type: "string",
    required: false,
    description: "Leave blank or omit when creating.",
    items: [],
    options: []
  }
]

export const updateWebhooks = [
  {
    displayName: "NotificationStatus",
    name: "webhook__notification_status",
    type: "string",
    required: false,
    description: "",
    items: [],
    options: []
  }
]

// field module

export const createAndUpdateField = [
  {
    displayName: "Auto Fill Structure Layout",
    name: "auto_fill_structure_layout",
    type: "dropDown",
    required: false,
    description: "",
    items: [],
    options: [
      { name: true, value: true },
      { name: false, value: false },
    ]
  }
]

// comments module

export const createCommentsFields = [
  {
    displayName: "Parent Comment",
    name: "parent_comment||",
    type: "array",
    required: false,
    description: "Parent comment Id if comment is a reply.",
    items: [],
    options: []
  }

]

export const fields = [

  // table module

  {
    displayName: "Name",
    name: "name",
    type: "string",
    default: "",
    description: "The name of the table.",
    items: [],
    required: true,
    options: [],
    async init(data) {
      try {
        const list = await smartsuite.getAllSolutions(data);
        console.log(list)
        this.options = list;
      } catch (error) {
        return ({ 'Error occurred': error });
      }
    },
    displayOptions: {
      show: {
        category: ["table"],
        name: ["create"],
      }
    }
  },
  {
    displayName: "Solution",
    name: "solution",
    type: "string",
    default: "",
    description: "The Solution ID the table belongs to.",
    items: [],
    required: true,
    options: [],
    displayOptions: {
      show: {
        category: ["table"],
        name: ["create"],
      }
    }
  },
  {
    displayName: "Field Type",
    name: "structure||field_type",
    type: "string",
    default: "",
    description: "The type of the field in the table structure.",
    items: [],
    required: true,
    options: [],
    displayOptions: {
      show: {
        category: ["table"],
        name: ["create"],
      }
    }
  },
  {
    displayName: "TableId",
    name: "table_id",
    type: "string",
    default: "",
    description: "The id of the table.",
    items: [],
    required: true,
    options: [],
    displayOptions: {
      show: {
        category: ["table"],
        name: ["get"],
      }
    }
  },

  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    items: [],
    required: false,
    options: [],
    displayOptions: {
      show: {
        category: ["table"],
        name: ["create"],
      }
    },
    fields: createTableFields,
  },
  {
    displayName: "ReturnAll",
    name: "return_all",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    items: [],
    required: false,
    options: [],
    displayOptions: {
      show: {
        category: ["table"],
        name: ["getMany"],
      }
    },
    async init(data) {
      try {
        const list = await smartsuite.getAllTable(data);
        console.log(list)
        this.options = list;
      } catch (error) {
        return ({ 'Error occurred': error });
      }
    },
  },


  // record module

  {
    displayName: "TableId",
    name: "table_id",
    type: "string",
    default: "",
    description: "id of the table",
    items: [],
    required: true,
    options: [
    ],
    async init(data) {
      try {
        const list = await smartsuite.getAllTable(data);
        console.log(list)
        this.options = list;
      } catch (error) {
        return ({ 'Error occurred': error });
      }
    },
    displayOptions: {
      show: {
        category: ["record"],
        name: ["create", "update", "get", "delete"],
      }
    }
  },
  {
    displayName: "Title",
    name: "title",
    type: "string",
    default: "",
    description: "title of the record",
    items: [],
    required: true,
    options: [],
    displayOptions: {
      show: {
        category: ["record"],
        name: ["create", "update"],
      }
    }
  },
  {
    displayName: "RecordId",
    name: "record_id",
    type: "string",
    default: "",
    description: "id of the record",
    items: [],
    required: true,
    options: [],
    displayOptions: {
      show: {
        category: ["record"],
        name: [ "update", "get", "delete"],
      }
    }
  },
  {
    displayName: "ReturnAll",
    name: "returnall",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    items: [],
    required: false,
    options: [],
    displayOptions: {
      show: {
        category: ["record"],
        name: ["getMany"],
      }
    },
    async init(data) {
      try {
        const list = await smartsuite.getAllRecords(data);
        console.log(list)
        this.options = list;
      } catch (error) {
        return ({ 'Error occurred': error });
      }
    },
  },

  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    items: [],
    required: false,
    options: [],
    displayOptions: {
      show: {
        category: ["record"],
        name: ["create","update"],
      }
    },
    fields: createAndUpdateRecordField,
  },

  // solution module
  {
    displayName: "Name",
    name: "name",
    type: "string",
    default: "",
    description: "name of the solution",
    items: [],
    required: true,
    options: [],
    displayOptions: {
      show: {
        category: ["solution"],
        name: ["create"],
      }
    }
  },
  {
    displayName: "LogoColor",
    name: "logo_color",
    type: "string",
    default: "",
    description: "name of the solution",
    items: [],
    required: true,
    options: [
      { name: "Primary Blue", value: "#3A86FF" },
      { name: "Primary Light Blue", value: "#4ECCFD" },
      { name: "Primary Green", value: "#3EAC40" },
      { name: "Primary Red", value: "#FF5757" },
      { name: "Primary Orange", value: "#FF9210" },
      { name: "Primary Yellow", value: "#FFB938" },
      { name: "Primary Purple", value: "#883CD0" },
      { name: "Primary Pink", value: "#EC506E" },
      { name: "Primary Teal", value: "#17C4C4" },
      { name: "Primary Grey", value: "#6A849B" },
      { name: "Dark Primary Blue", value: "#0C41F3" },
      { name: "Dark Primary Light Blue", value: "#00B3FA" },
      { name: "Dark Primary Green", value: "#199A27" },
      { name: "Dark Primary Red", value: "#F1273F" },
      { name: "Dark Primary Orange", value: "#FF702E" },
      { name: "Dark Primary Yellow", value: "#FDA80D" },
      { name: "Dark Primary Purple", value: "#673DB6" },
      { name: "Dark Primary Pink", value: "#CD286A" },
      { name: "Dark Primary Teal", value: "#00B2A8" },
      { name: "Dark Primary Grey", value: "#50515B" }
    ],
    displayOptions: {
      show: {
        category: ["solution"],
        name: ["create"],
      }
    }
  },
  {
    displayName: "LogoIcon",
    name: "logo_icon",
    type: "string",
    default: "",
    description: "icon of the solution",
    items: [],
    required: true,
    options: [],
    displayOptions: {
      show: {
        category: ["solution"],
        name: ["create"],
      }
    }
  },
  {
    displayName: "SolutionId",
    name: "solution_id",
    type: "string",
    default: "",
    description: "id of the solution",
    items: [],
    required: true,
    options: [],
    displayOptions: {
      show: {
        category: ["solution"],
        name: ["get"],
      }
    }
  },
 
  {
    displayName: "ReturnAll",
    name: "return_all",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    items: [],
    required: false,
    options: [],
    displayOptions: {
      show: {
        category: ["solution"],
        name: ["getMany"],
      }
    },
    async init(data) {
      try {
        const list = await smartsuite.getAllSolutions(data);
        console.log(list)
        this.options = list;
      } catch (error) {
        return ({ 'Error occurred': error });
      }
    },
  },

  // webhook module
  
  {
    displayName: "Solution",
    name: "webhook__filter__solution",
    type: "string",
    default: "",
    description: "Filter condition for the solution.",
    items: [],
    required: true,
    options: [],
    async init(data) {
      try {
        const list = await smartsuite.getAllSolutions(data);
        console.log(list)
        this.options = list;
      } catch (error) {
        return ({ 'Error occurred': error });
      }
    },
    displayOptions: {
      show: {
        category: ["webhook"],
        name: ["create", "update"],
      }
    }
  },
  {
    displayName: "Kinds",
    name: "webhook__kinds",
    type: "string",
    default: "",
    description: "The event kinds that trigger the webhook. Example: RECORD_CREATED.",
    items: [],
    required: true,
    options: [
      { name: "RECORD_CREATED", value: "RECORD_CREATED" },
      { name: "RECORD_UPDATE", value: "RECORD_UPDATE" },
      { name: "RECORD_DELETED", value: "RECORD_DELETED" },
    ],
    displayOptions: {
      show: {
        category: ["webhook,"],
        name: ["create", "update"],
      }
    }
  },
  {
    displayName: "AccountID",
    name: "webhook__locator__accountId",
    type: "string",
    default: "",
    description: "The account ID for locating the source.",
    items: [],
    required: true,
    options: [],
    displayOptions: {
      show: {
        category: ["webhook,"],
        name: ["create", "update"],
      }
    }
  },
  {
    displayName: "Solution Id",
    name: "webhook__locator__solution_id",
    type: "string",
    default: "",
    description: "The solution ID for locating the source.",
    items: [],
    required: true,
    options: [],
    displayOptions: {
      show: {
        category: ["webhook,"],
        name: ["create", "update"],
      }
    }
  },
  {
    displayName: "URL",
    name: "webhook__notification_status__enabled__url",
    type: "string",
    default: "",
    description: "The URL to send the webhook notification twebhook",
    items: [],
    required: true,
    options: [],
    displayOptions: {
      show: {
        category: ["webhook"],
        name: ["create", "update"],
      }
    }
  },
  {
    displayName: "WebhookId",
    name: "webhook_id",
    type: "string",
    default: "",
    description: "id of the webhook",
    items: [],
    required: true,
    options: [],
    displayOptions: {
      show: {
        category: ["webhook"],
        name: ["get"],
      }
    }
  },
  {
    displayName: "SolutionId",
    name: "solution_id",
    type: "string",
    default: "",
    description: "id of the solution",
    items: [],
    required: true,
    options: [],
    displayOptions: {
      show: {
        category: ["webhook"],
        name: ["getMany"],
      }
    },
    async init(data) {
      try {
        const list = await smartsuite.getAllWebhooks(data);
        console.log(list)
        this.options = list;
      } catch (error) {
        return ({ 'Error occurred': error });
      }
    },
  },

  // field module
  {
    displayName: "Slug",
    name: "field__slug",
    type: "string",
    default: "",
   description: "The unique slug identifier for the field.",
    items: [],
    required: true,
    options: [],
    async init(data) {
      try {
        const list = await smartsuite.getAllTable(data);
        console.log(list)
        this.options = list;
      } catch (error) {
        return ({ 'Error occurred': error });
      }
    },
    displayOptions: {
      show: {
        category: ["field"],
        name: ["create", "update"],
      }
    }
  },
  {
    displayName: "Label",
    name: "field__label",
    type: "string",
    default: "",
   description: "The human-readable label for the field.",
    items: [],
    required: true,
    options: [],
    displayOptions: {
      show: {
        category: ["field"],
        name: ["create", "update"],
      }
    }
  },
  {
    displayName: "FieldType",
    name: "field__field_type",
    type: "string",
    default: "",
   description: "Type of the field (e.g., textfield).",
    items: [],
    required: true,
    options: [],
    displayOptions: {
      show: {
        category: ["field"],
        name: ["create", "update"],
      }
    }
  },
  {
    displayName: "MaxLength",
    name: "field__params__max_length",
    type: "string",
    default: "",
   description: "Maximum allowed length of the field value.",
    items: [],
    required: true,
    options: [],
    displayOptions: {
      show: {
        category: ["field"],
        name: ["create", "update"],
      }
    }
  },
  {
    displayName: "IsNew",
    name: "field__is_new",
    type: "string",
    default: "",
   description: "Indicates if the field is newly created.",
    items: [],
    required: true,
    options: [],
    displayOptions: {
      show: {
        category: ["field"],
        name: ["create", "update"],
      }
    }
  },
  {
    displayName: "PreviousSiblingSlug",
    name: "field_position__prev_sibling_slug",
    type: "string",
    default: "",
    description: "Slug of the previous sibling field, if any.",
    items: [],
    required: true,
    options: [],
    displayOptions: {
      show: {
        category: ["field"],
        name: ["create", "update"],
      }
    }
  },
  {
    displayName: "AutoFillStructureLayout",
    name: "auto_fill_structure_layout",
    type: "string",
    default: "",
   description: "Whether to auto-fill the structure layout.",
    items: [],
    required: true,
    options: [],
    displayOptions: {
      show: {
        category: ["field"],
        name: ["create", "update"],
      }
    }
  },

  // comment moduule
  {
    displayName: "Assigned To",
    name: "assigned_to",
    type: "string",
    default: "",
   description: "The ID of the user assigned to the comment. Can be null.",
    items: [],
    required: true,
    options: [],
    displayOptions: {
      show: {
        category: ["comments"],
        name: ["create"],
      }
    }
  },
  {
    displayName: "Message HTML",
    name: "message__html",
    type: "string",
    default: "",
   description: "The HTML content of the comment message.",
    items: [],
    required: true,
    options: [],
    displayOptions: {
      show: {
        category: ["comments"],
        name: ["create"],
      }
    }
  },
  {
    displayName: "Application",
    name: "application",
    type: "string",
    default: "",
   description: "The ID of the application associated with the comment.",
    items: [],
    required: true,
    options: [],
    async init(data) {
      try {
        const list = await smartsuite.getAllTable(data);
        console.log(list)
        this.options = list;
      } catch (error) {
        return ({ 'Error occurred': error });
      }
    },
    displayOptions: {
      show: {
        category: ["comments"],
        name: ["create"],
      }
    }
  },
  {
    displayName: "Record",
    name: "record",
    type: "string",
    default: "",
   description: "The ID of the record associated with the comment.",
    items: [],
    required: true,
    options: [],
    displayOptions: {
      show: {
        category: ["comments"],
        name: ["create"],
      }
    },
    
  },
  {
    displayName: "Get All comments",
    name: "getMany",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    items: [],
    required: false,
    options: [],
    displayOptions: {
      show: {
        category: ["comments"],
        name: ["getMany"],
      }
    },
    async init(data) {
      try {
        const list = await smartsuite.getAllComments(data);
        console.log(list)
        this.options = list;
      } catch (error) {
        return ({ 'Error occurred': error });
      }
    },
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    items: [],
    required: false,
    options: [],
    displayOptions: {
      show: {
        category: ["comments"],
        name: ["create"],
      }
    },
    fields: createCommentsFields,
  },

]
