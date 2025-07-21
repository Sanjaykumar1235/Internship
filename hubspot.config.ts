// hubspot.config.ts
// -----------------------------------------------------------------------------
// AUTO-GENERATED CONFIGURATION FILE.
// DO NOT modify the sections labeled "AUTO-GENERATED".
//
// Copyright (c) 2025 Smackcoders. All rights reserved.
// This file is subject to the Smackcoders Proprietary License.
// Unauthorized copying or distribution is strictly prohibited.
// -----------------------------------------------------------------------------

import { hub } from "./hubspot.controller";

export const XappName = "hubspot";
export const modules = [
  {
    "module": "campaign",
    "actions": [
      "create",
      "update",
      "delete",
      "get",
      "getMany"
    ],
    "triggers": [
      "campaign_created",
      "campaign_updated",
      "campaign_deleted"
    ]
  },
  {
    "module": "account",
    "actions": [
      "get",
      "getMany"
    ],
    "triggers": [
      "account_updated"
    ]
  },
  {
    "module": "email",
    "actions": [
      "create",
      "update",
      "delete",
      "get",
      "getMany"
    ],
    "triggers": [
      "email_sent",
      "email_opened",
      "email_bounced"
    ]
  },
  {
    "module": "list",
    "actions": [
      "create",
      "update",
      "delete",
      "get",
      "getMany"
    ],
    "triggers": [
      "list_created",
      "list_updated",
      "list_deleted"
    ]
  },
  {
    "module": "refresh",
    "actions": [
      "update"
    ],
    "triggers": [
      "refresh_completed"
    ]
  }
];

export default {
  XappName,
  modules,

}


const listAdditionalFields=[
  {
    displayName: "Filter Branch",
    name: "filterbranch",
    type: "string",
    description: "",
    default: "",
    items: [],
    required: false,
  },
  {
    displayName: "List Folder ID",
    name: "listfolderiD",
    type: "string",
    description: "",
    default: "",
    items: [],
    required: false,
  },
  {
    displayName: "Custom Properties",
    name: "customproperties",
    type: "string",
    description: "",
    default: "",
    items: [],
    required: false,
  },

]
export const fields = [

  // Subscribers

  {
    displayName: "Properties hs name",
    name: "properties__hs_name",
    type: "string",
    description: "New Name of the Campaigns",
    default: "",
    items: [],
    required: true,
    displayOptions: {
      show: {
        category: ["campaign"],
        name: ["create,update"],
      },
    },
  },
  {
    displayName: "Start Date",
    name: "properties__start_date",
    type: "date",
    description: "",
    default: "",
    items: [],
    required: true,
    displayOptions: {
      show: {
        category: ["campaign"],
        name: ["create", "update"],
      },
    },
  },
  {
    displayName: "End Date",
    name: "properties__end_date",
    type: "date",
    description: "",
    default: "",
    items: [],
    required: true,
    displayOptions: {
      show: {
        category: ["campaign"],
        name: ["create", "update"],
      },
    },
  },
  {
    displayName: "Campaigns Id",
    name: "id",
    type: "date",
    description: "The unique identifier of Campaigns",
    default: "",
    items: [],
    required: true,
    displayOptions: {
      show: {
        category: ["campaign"],
        name: ["get", "delete", "update"],
      },
    },
  },


  // lists

  {
    displayName: "Name",
    name: "name",
    type: "string",
    description: "New Name of the lists",
    default: "",
    items: [],
    required: false,
    displayOptions: {
      show: {
        category: ["list"],
        name: ["create", "update", "get"],
      },
    },
  },

  {
    displayName: "Object Type Id",
    name: "objectTypeId",
    type: "string",
    description: "The Id of the ObjectType",
    default: "",
    items: [],
    required: false,
    displayOptions: {
      show: {
        category: ["list"],
        name: ["create"],
      },
    },
  },
  {
    displayName: "Processing Type",
    name: "processingType",
    type: "string",
    description: "The Id of the ObjectType",
    default: "",
    items: [],
    required: false,
    displayOptions: {
      show: {
        category: ["list"],
        name: ["create"],
      },
    },
  },
  {
    displayName: "Additional Fields",
    name: "Additional Fields",
    type: "string",
    description: "Additional Fields for Lists",
    default: "",
    items: [],
    required: false,
    displayOptions: {
      show: {
        category: ["list"],
        name: ["create"],
      },
    },
    fields:listAdditionalFields
  },
  {
    displayName: "Get Many Tags",
    name: "getMany",
    type: "string",
    description: "Retrieve multiple tags.",
    default: "",
    items: [],
    options: [],
    async init(data) {
      try {
        const options = await hub.getAllList(data);
        this.options = options;
      } catch (error) {
        console.error("Error occurred:", error + error.stack);
      }
    },
    required: false,
    displayOptions: {
      show: {
        category: ["list"],
        name: ["getMany"],
      },
    },
  },



  {
    displayName: "Name",
    name: "name",
    type: "string",
    description: "New Name of the email",
    default: "",
    items: [],
    required: true,
    displayOptions: {
      show: {
        category: ["email"],
        name: ["create", "update"],
      },
    },
  },
  {
    displayName: "Email Id",
    name: "email_id",
    type: "string",
    description: "The unique identifier of the email",
    default: "",
    items: [],
    required: true,
    displayOptions: {
      show: {
        category: ["email"],
        name: ["update", "delete","get"],
      },
    },
  },

  {
    displayName: "Get Many Email",
    name: "getMany",
    type: "string",
    description: "Retrieve multiple Email.",
    default: "",
    items: [],
    options: [],
    async init(data) {
      try {
        const options = await hub.getAllEmail(data);
        this.options = options;
      } catch (error) {
        console.error("Error occurred:", error + error.stack);
      }
    },
    required: false,
    displayOptions: {
      show: {
        category: ["email"],
        name: ["getMany"], 
      },
    },
  },
]
