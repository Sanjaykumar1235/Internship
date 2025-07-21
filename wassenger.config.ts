// wassenger.config.ts
// -----------------------------------------------------------------------------
// AUTO-GENERATED CONFIGURATION FILE.
// DO NOT modify the sections labeled "AUTO-GENERATED".
//
// Copyright (c) 2025 Smackcoders. All rights reserved.
// This file is subject to the Smackcoders Proprietary License.
// Unauthorized copying or distribution is strictly prohibited.
// -----------------------------------------------------------------------------

import { Was } from "./wassenger.controller";

export const XappName = "wassenger";
export const modules = [
  {
    "module": "message",
    "actions": [
      "getMany",
      "get",
      "create",
      "update",
      "delete"
    ],
    "triggers": []
  },
  {
    "module": "contact",
    "actions": [
      "get",
      "create",
      "update",
      "delete",
      "getMany"
    ],
    "triggers": []
  },
  {
    "module": "campaigns",
    "actions": [
      "get",
      "create",
      "update",
      "delete",
      "getMany"
    ],
    "triggers": []
  },
  {
    "module": "label",
    "actions": [
      "create",
      "update",
      "delete",
      "getMany"
    ],
    "triggers": []
  },
  {
    "module": "user",
    "actions": [
      "get",
      "create",
      "update",
      "delete",
      "getMany"
    ],
    "triggers": []
  },
  {
    "module": "chatmessages",
    "actions": [
      "get",
      "search",
      "update",
      "delete"
    ],
    "triggers": []
  },
  {
    "module": "chat",
    "actions": [
      "get",
      "delete",
      "sync",
      "assign",
      "unassign"
    ],
    "triggers": []
  },
  {
    "module": "invoice",
    "actions": [
      "getMany"
    ],
    "triggers": []
  },
  {
    "module": "department",
    "actions": [
      "get",
      "create",
      "update",
      "delete",
      "getMany"
    ],
    "triggers": []
  },
  {
    "module": "note",
    "actions": [
      "create",
      "delete"
    ],
    "triggers": []
  },
  {
    "module": "webhook",
    "actions": [
      "get",
      "create",
      "update",
      "delete"
    ],
    "triggers": []
  }
];

export default {
  XappName,
  modules,
};

const additonalsMessages=[
  {

    displayName: "Message",
    name: "message",
    type: "string",
    description: "",
    default: "",
    items: [],
    required: false,
},
{

  displayName: "Chat",
  name: "chat",
  type: "string",
  description: "",
  default: "",
  items: [],
  required: false,
},
{

  displayName: "Device",
  name: "device",
  type: "string",
  description: "",
  default: "",
  items: [],
  required: false,
},
{

  displayName: "Agent",
  name: "agent",
  type: "string",
  description: "",
  default: "",
  items: [],
  required: false,
},
{

  displayName: "DeliverAt",
  name: "deliverAt",
  type: "string",
  description: "",
  default: "",
  items: [],
  required: false,
},
{

  displayName: "Is unsubscribed",
  name: "is_unsubscribed",
  type: "string",
  description: "",
  default: "",
  items: [],
  required: false,
},
{

  displayName: "Schedule",
  name: "schedule||delay",
  type: "string",
  description: "",
  default: "",
  items: [],
  required: false,
},
{

  displayName: "Schedule",
  name: "schedule||delayto",
  type: "string",
  description: "",
  default: "",
  items: [],
  required: false,
},
{

  displayName: "Schedule",
  name: "schedule||date",
  type: "string",
  description: "",
  default: "",
  items: [],
  required: false,
},
{

  displayName: "Typing",
  name: "typing",
  type: "string",
  description: "",
  default: "",
  items: [],
  required: false,
},
{

  displayName: "Quote",
  name: "quote",
  type: "string",
  description: "",
  default: "",
  items: [],
  required: false,
},
{

  displayName: "SelectId",
  name: "selectId",
  type: "string",
  description: "",
  default: "",
  items: [],
  required: false,
},
{

  displayName: "Forward",
  name: "forward__message",
  type: "string",
  description: "",
  default: "",
  items: [],
  required: false,
},
{

  displayName: "Forward",
  name: "forward__chat",
  type: "string",
  description: "",
  default: "",
  items: [],
  required: false,
},
{

  displayName: "Pole",
  name: "pole__name",
  type: "string",
  description: "",
  default: "",
  items: [],
  required: false,
},
{

  displayName: "Pole",
  name: "pole__options",
  type: "string",
  description: "",
  default: "",
  items: [],
  required: false,
},
{

  displayName: "Pole",
  name: "pole__messages",
  type: "string",
  description: "",
  default: "",
  items: [],
  required: false,
},
{

  displayName: "Vote",
  name: "vote__pole",
  type: "string",
  description: "",
  default: "",
  items: [],
  required: false,
},
{

  displayName: "Vote",
  name: "vote__options||id",
  type: "string",
  description: "",
  default: "",
  items: [],
  required: false,
},
{

  displayName: "Vote",
  name: "vote__options||value",
  type: "string",
  description: "",
  default: "",
  items: [],
  required: false,
},
{

  displayName: "Attend",
  name: "attend__event",
  type: "string",
  description: "",
  default: "",
  items: [],
  required: false,
},
{

  displayName: "Attend",
  name: "attend__confirm",
  type: "string",
  description: "",
  default: "",
  items: [],
  required: false,
},
{

  displayName: "Refrence",
  name: "refrence",
  type: "string",
  description: "",
  default: "",
  items: [],
  required: false,
},
{

  displayName: "RetentionPolicy",
  name: "retentionPolicy",
  type: "string",
  description: "",
  default: "",
  items: [],
  required: false,
},

{

  displayName: "Refrence",
  name: "refrence",
  type: "string",
  description: "",
  default: "",
  items: [],
  required: false,
},

{

  displayName: "Priority",
  name: "priority",
  type: "string",
  description: "",
  default: "",
  items: [],
  required: false,
},

{

  displayName: "Header",
  name: "header",
  type: "string",
  description: "",
  default: "",
  items: [],
  required: false,
},

{

  displayName: "Footer",
  name: "footer",
  type: "string",
  description: "",
  default: "",
  items: [],
  required: false,
},






]

const additionalCampaigns=[
  {

    displayName: "Message",
    name: "message",
    type: "string",
    description: "",
    default: "",
    items: [],
    required: false,
  },
  {

    displayName: "File",
    name: "file",
    type: "string",
    description: "",
    default: "",
    items: [],
    required: false,
  },
  {

    displayName: "Activate",
    name: "activate",
    type: "string",
    description: "",
    default: "",
    items: [],
    required: false,
  },
  {

    displayName: "Settings",
    name: "settings__speed",
    type: "string",
    description: "",
    default: "",
    items: [],
    required: false,
  },
  {

    displayName: "Seetings",
    name: "settings__date",
    type: "string",
    description: "",
    default: "",
    items: [],
    required: false,
  },
  {

    displayName: "Settings",
    name: "settings__expiration",
    type: "string",
    description: "",
    default: "",
    items: [],
    required: false,
  },
  {

    displayName: "Settings",
    name: "settings__timezone",
    type: "string",
    description: "",
    default: "",
    items: [],
    required: false,
  },
  {

    displayName: "Contacts",
    name: "contact__phone",
    type: "string",
    description: "",
    default: "",
    items: [],
    required: false,
  },
  {

    displayName: "Contacts",
    name: "contact__group",
    type: "string",
    description: "",
    default: "",
    items: [],
    required: false,
  },
  {

    displayName: "Contacts",
    name: "contact__name",
    type: "string",
    description: "",
    default: "",
    items: [],
    required: false,
  },
  {

    displayName: "Contacts",
    name: "contact__messages",
    type: "string",
    description: "",
    default: "",
    items: [],
    required: false,
  },
  {

    displayName: "Contacts",
    name: "contact__refrence",
    type: "string",
    description: "",
    default: "",
    items: [],
    required: false,
  },
  {

    displayName: "Contacts",
    name: "contact__source",
    type: "string",
    description: "",
    default: "",
    items: [],
    required: false,
  },
  {

    displayName: "Actions",
    name: "actions",
    type: "string",
    description: "",
    default: "",
    items: [],
    required: false,
  },
  {

    displayName: "Unsubscriber",
    name: "unsubscribe__active",
    type: "string",
    description: "",
    default: "",
    items: [],
    required: false,
  },
  {

    displayName: "Unsubscriber",
    name: "unsubscribe__word",
    type: "string",
    description: "",
    default: "",
    items: [],
    required: false,
  },
  {

    displayName: "Unsubscriber",
    name: "unsubscribe__message",
    type: "string",
    description: "",
    default: "",
    items: [],
    required: false,
  },
  {

    displayName: "Unsubscriber",
    name: "unsubscribe__actions",
    type: "string",
    description: "",
    default: "",
    items: [],
    required: false,
  },





]


export const fields=[
  
    {
      displayName: "Phone",
      name: "phone",
      type: "string",
      description: "Phone number of the users",
      default: "",
      items: [],
      required: true,
      displayOptions: {
        show: {
          category: ["messages"],
          name: ["create"]
        }
      }
    },
    {
      displayName: "Group",
      name: "group",
      type: "string",
      description: "Target group chat WhatsApp ID",
      default: "",
      items: [],
      required: true,
      displayOptions: {
        show: {
          category: ["messages"],
          name: ["create"]
        }
      }
    },
    {
      displayName: "Channel",
      name: "channel",
      type: "string",
      description: "Target group chat WhatsApp ID",
      default: "",
      items: [],
      required: true,
      displayOptions: {
        show: {
          category: ["messages"],
          name: ["create"]
        }
      }
    },
    {
      displayName: "Message Id",
      name: "messageid",
      type: "string",
      description: "The unique identifier of the Messgaes",
      default: "",
      items: [],
      required: true,
      displayOptions: {
        show: {
          category: ["messages"],
          name: ["get","delete"]
        }
      }
    },

    
    {
      displayName: "Get Many campaign",
      name: "getMany",
      type: "string",
      description: "Retrieve multiple campaign.",
      default: "",
      items: [],
      options: [],
      async init(data) {      try {
          const options = await Was.getAllMessage(data);
          this.options = options;
        } catch (error) {
          console.error("Error occurred:", error + error.stack);
        }
      },
      required: false,
      displayOptions: {
        show: {
          category: ["messages"],
          name: ["getMany"],
        },
      },
    },

    // Additionfields

    {
      displayName: "Additionfields",
      name: "additionfields",
      type: "string",
      description: "",
      default: "",
      items: [],
      required: true,
      displayOptions: {
        show: {
          category: ["messages"],
          name: ["create","update"]
        }
      },
      fields:additonalsMessages
    },

    //  Campaigns

    {
      displayName: "Name",
      name: "name",
      type: "string",
      description: "Name of the Campaigns",
      default: "",
      items: [],
      required: true,
      displayOptions: {
        show: {
          category: ["campaigns"],
          name: ["create"]
        }
      }
    },
    {
      displayName: "Device Id",
      name: "device id",
      type: "string",
      description: "The unique identifier of the Id",
      default: "",
      items: [],
      required: true,
      displayOptions: {
        show: {
          category: ["campaigns"],
          name: ["create"]
        }
      }
    },
    {
      displayName: "Campaigns Id",
      name: "campaigns id",
      type: "string",
      description: "The unique identifier of the campaigns",
      default: "",
      items: [],
      required: true,
      displayOptions: {
        show: {
          category: ["campaigns"],
          name: ["get","update","delete"]
        }
      }
    },

    
    {
      displayName: "Get Many campaign",
      name: "getMany",
      type: "string",
      description: "Retrieve multiple campaign.",
      default: "",
      items: [],
      options: [],
      async init(data) {      try {
          const options = await Was.getAllCampaigns(data);
          this.options = options;
        } catch (error) {
          console.error("Error occurred:", error + error.stack);
        }
      },
      required: false,
      displayOptions: {
        show: {
          category: ["campaigns"],
          name: ["getMany"],
        },
      },
    },

    // Additionfields

    {
      displayName: "Additionfields",
      name: "additionfields",
      type: "string",
      description: "",
      default: "",
      items: [],
      required: true,
      displayOptions: {
        show: {
          category: ["campaigns"],
          name: ["create","update"]
        }
      },
      fields:additionalCampaigns
    },

    //  Webhooks
  
    
    {
      displayName: "Name",
      name: "name",
      type: "string",
      description: "Name of the Webhooks",
      default: "",
      items: [],
      required: true,
      displayOptions: {
        show: {
          category: ["webhooks"],
          name: ["create","update"]
        }
      }
    },
    {
      displayName: "Url",
      name: "url",
      type: "string",
      description: "Webhook endpoint URL",
      default: "",
      items: [],
      required: true,
      displayOptions: {
        show: {
          category: ["webhooks"],
          name: ["create","update"]
        }
      }
    },
    {
      displayName: "Events",
      name: "events",
      type: "string",
      description: "events to be notified on this webhook endpoint",
      default: "",
      items: [],
      required: true,
      displayOptions: {
        show: {
          category: ["webhooks"],
          name: ["create","update"]
        }
      }
    },
    {
      displayName: "Webhooks Id",
      name: "webhooks id",
      type: "string",
      description: "The unique identifier of the Webhooks ",
      default: "",
      items: [],
      required: true,
      displayOptions: {
        show: {
          category: ["webhooks"],
          name: ["get","update","delete"]
        }
      }
    },
    
    {
      displayName: "Get Many webhooks",
      name: "getMany",
      type: "string",
      description: "Retrieve multiple webhooks.",
      default: "",
      items: [],
      options: [],
      async init(data) {      try {
          const options = await Was.getAllWebhook(data);
          this.options = options;
        } catch (error) {
          console.error("Error occurred:", error + error.stack);
        }
      },
      required: false,
      displayOptions: {
        show: {
          category: ["webhooks"],
          name: ["getMany"],
        },
      },
    },

    {
      displayName: "Get Many invoice",
      name: "getMany",
      type: "string",
      description: "Retrieve multiple invoice.",
      default: "",
      items: [],
      options: [],
      async init(data) {      try {
          const options = await Was.getAllInvoice(data);
          this.options = options;
        } catch (error) {
          console.error("Error occurred:", error + error.stack);
        }
      },
      required: false,
      displayOptions: {
        show: {
          category: ["Invoice"],
          name: ["getMany"],
        },
      },
    },
   
    


    
  


]