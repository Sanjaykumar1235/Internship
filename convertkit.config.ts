// convertkit.config.ts
// -----------------------------------------------------------------------------
// AUTO-GENERATED CONFIGURATION FILE.
// DO NOT modify the sections labeled "AUTO-GENERATED".
//
// Copyright (c) 2025 Smackcoders. All rights reserved.
// This file is subject to the Smackcoders Proprietary License.
// Unauthorized copying or distribution is strictly prohibited.
// -----------------------------------------------------------------------------

import { kit } from "./convertkit.controller";

export const XappName = "Convertkit";
export const modules = [
  {
    "module": "Subscribers",
    "actions": [
      "create",
      "get",
      "getMany",
      "update",
      "delete"
    ],
    "triggers": [
      "new_subscribers",
      "updated_subscribers"
    ]
  },
  {
    "module": "Broadcasts",
    "actions": [
      "create",
      "get",
      "getMany",
      "update",
      "delete"
    ],
    "triggers": [
      "new_broadcast",
      "updated_broadcast"
    ]
  }
];

export default {
  XappName,
  modules,
};


export const fields = [

  // Subscribers

  {
    displayName: "Subscriber ID",
    name: "id",
    type: "string",
    description: "The unique identifier for the subscriber.",
    default: "",
    items: [],
    required: true,
    displayOptions: {
      show: {
        category: ["Subscribers"],
        name: ["get", "update", "delete"],
      },
    },
  },
  {
    displayName: "Email",
    name: "email",
    type: "string",
    description: "Email of the subscriber.",
    default: "",
    items: [],
    required: true,
    displayOptions: {
      show: {
        category: ["Subscribers"],
        name: ["create"],
      },
    },
  },
  {
    displayName: "First Name",
    name: "first_name",
    type: "string",
    description: "First name of the subscriber.",
    default: "",
    items: [],
    required: false,
    displayOptions: {
      show: {
        category: ["Subscribers"],
        name: ["create", "update"],
      },
    },
  },

  {
    displayName: "Get Many Subscribers",
    name: "getMany",
    type: "string",
    description: "Retrieve multiple subscribers.",
    default: "",
    items: [],
    options: [],
    async init(data) {      try {
        const options = await kit.getAllSubscriber(data);
        this.options = options;
      } catch (error) {
        console.error("Error occurred:", error + error.stack);
      }
    },
    required: false,
    displayOptions: {
      show: {
        category: ["Subscribers"],
        name: ["getMany"],
      },
    },
  },


  {
    displayName: "Unsubscribe Subscriber",
    name: "unsubscribe",
    type: "string",
    description: "Unsubscribe a subscriber.",
    default: "",
    items: [],
    required: true,
    displayOptions: {
      show: {
        category: ["Subscribers"],
        name: ["unsubscribe"],
      },
    },
  },


  {
    displayName: "Subscriber Tags",
    name: "subscriberTags",
    type: "string",
    description: "Get subscriber tags.",
    default: "",
    items: [],
    required: true,
    displayOptions: {
      show: {
        category: ["Subscribers"],
        name: ["getTags"],
      },
    },
  },

  //  Bulk Subcribers
  {
    displayName: "First Name",
    name: "taggings || first_name",
    type: "string",
    description: "Name of the subscribers",
    default: "",
    items: [],
    required: true,
    displayOptions: {
      show: {
        category: ["BulkSubscribers"],
        name: ["create"],
      },
    },
  },

  // Broadcasts
  {
    displayName: "Broadcasts ID",
    name: "id",
    type: "string",
    description: "The unique identifier for the Broadcasts.",
    default: "",
    items: [],
    required: true,
    displayOptions: {
      show: {
        category: ["Broadcasts"],
        name: ["get", "update", "delete"],
      },
    },
  }, 
  {
  displayName: "Type",
  name: "all || type",
  type: "string",
  description: "Broadcasts type",
  default: "",
  items: [],
  required: true,
  displayOptions: {
    show: {
      category: ["Broadcasts"],
      name: ["create"]
    },
  },
}, 


  {
  displayName: "Get Many Broadcasts",
  name: "getMany",
  type: "string",
  description: "Retrieve multiple broadcasts.",
  default: "",
  items: [],
  options: [],
  async init(data) {
    try {
      const options = await kit.getAllBroadcasts(data); 
      this.options = options;
    } catch (error) {
      console.error("Error occurred:", error.message, error.stack);
    }
  }
  ,
  required: false,
  displayOptions: {
    show: {
      category: ["Broadcasts"],
      name: ["getMany"],
    },
  },
},

// Customfileds

{
  displayName: "Label Name",
  name: "label",
  type: "string",
  description: "label name of Customfileds.",
  default: "",
  items: [],
  required: false,
  displayOptions: {
    show: {
      category: ["Customfileds"],
      name: ["create", "update"],
    },
  },
},
{
  displayName: "Get Many CustomFileds",
  name: "getMany",
  type: "string",
  description: "Retrieve multiple CustomFileds.",
  default: "",
  items: [],
  options: [],
  async init(data) {
    try {
      const options = await kit.getAllCustomFields(data);
      this.options = options;
    } catch (error) {
      console.error("Error occurred:", error + error.stack);
    }
  },
  required: false,
  displayOptions: {
    show: {
      category: ["CustomFileds"],
      name: ["getMany"],
    },
  },
},
{
  displayName: "Customfileds ID",
  name: "id",
  type: "string",
  description: "The unique identifier for the customfileds.",
  default: "",
  items: [],
  required: true,
  displayOptions: {
    show: {
      category: ["Customfileds"],
      name: ["get", "update", "delete"],
    },
  },
},
{
  displayName: "Label Name",
  name: "customfields || label",
  type: "string",
  description: "label name of Customfileds.",
  default: "",
  items: [],
  required: false,
  displayOptions: {
    show: {
      category: ["Customfileds"],
      name: ["bulkcustomfileds"],
    },
  },
},
// Segment
{
  displayName: "Get Many Segments",
  name: "getMany",
  type: "string",
  description: "Retrieve multiple Segments.",
  default: "",
  items: [],
  options: [],
  async init(data) {    try {
      const options = await kit.getAllSegments(data);
      this.options = options;
    } catch (error) {
      console.error("Error occurred:", error + error.stack);
    }
  },
  required: false,
  displayOptions: {
    show: {
      category: ["Segments"],
      name: ["getMany"],
    },
  },
},

//  Email templates
{
displayName: "Get Many EmailTemplates",
name: "getMany",
type: "string",
description: "Retrieve multiple emailtemplates.",
default: "",
items: [],
options: [],
async init(data) {
  try {
    const options = await kit.getAllEmailTemplates(data);
    this.options = options;
  } catch (error) {
    console.error("Error occurred:", error + error.stack);
  }
},
required: false,
displayOptions: {
  show: {
    category: ["EmailTemplates"],
    name: ["getMany"],
  },
},
},

// Tags
{
  displayName: "Tags Name",
  name: "tags__name",
  type: "string",
  description: "Name of the Tags",
  default: "",
  items: [],
  required: false,
  displayOptions: {
    show: {
      category: ["Tags"],
      name: ["create","update"],
    },
  },
},

{
  displayName: "Get Many Tags",
  name: "getMany",
  type: "string",
  description: "Retrieve multiple tags.",
  default: "",
  items: [],
  options: [],
  async init(data) {    try {
      const options = await kit.getAllTags(data);
      this.options = options;
    } catch (error) {
      console.error("Error occurred:", error + error.stack);
    }
  },
  required: false,
  displayOptions: {
    show: {
      category: ["Tags"],
      name: ["getMany"],
    },
  },
  },

  {
    displayName: "Tags Id",
    name: "id",
    type: "string",
    description: "The unique identifier of the Tags",
    default: "",
    items: [],
    required: false,
    displayOptions: {
      show: {
        category: ["Tags"],
        name: ["get","update","delete"],
      },
    },
  },

  // Bulk tags Subscribers

  {
    displayName: "Name",
    name: "tags || name",
    type: "string",
    description: "Name of the tags",
    default: "",
    items: [],
    required: false,
    displayOptions: {
      show: {
        category: ["BulkTags"],
        name: ["create"],
      },
    },
  },
  {
    displayName: "Tag Id",
    name: "taggings || tagId",
    type: "string",
    description: "The unique identifier of the Tags",
    default: "",
    items: [],
    required: false,
    displayOptions: {
      show: {
        category: ["BulkTagsSubscribers"],
        name: ["create"],
      },
    },
  },
  {
    displayName: "Tag Id",
    name: "id",
    type: "string",
    description: "The unique identifier of the Tags",
    default: "",
    items: [],
    required: false,
    displayOptions: {
      show: {
        category: ["BulkTagsSubscribers"],
        name: ["get"],
      },
    },
  },

  {
    displayName: "Email Address",
    name: "email_address",
    type: "string",
    description: "Email address of the Tags",
    default: "",
    items: [],
    required: false,
    displayOptions: {
      show: {
        category: ["Subscriber Email"],
        name: ["create"],
      },
    },
  },

  {
    displayName: "Tag Id",
    name: "id",
    type: "string",
    description: "the unique identifier ofthe tags ",
    default: "",
    items: [],
    required: false,
    displayOptions: {
      show: {
        category: ["Subscriber Email"],
        name: ["delete"],
      },
    },
  },


  
];

