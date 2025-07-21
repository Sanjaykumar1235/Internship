// twilio.config.ts
// -----------------------------------------------------------------------------
// AUTO-GENERATED CONFIGURATION FILE.
// DO NOT modify the sections labeled "AUTO-GENERATED".
//
// Copyright (c) 2025 Smackcoders. All rights reserved.
// This file is subject to the Smackcoders Proprietary License.
// Unauthorized copying or distribution is strictly prohibited.
// -----------------------------------------------------------------------------

import { Twi } from "./twilio.controller";

export const XappName = "twilio";
export const modules = [
  {
    "module": "messages",
    "actions": [
      "create",
      "get",
      "delete"
    ],
    "triggers": [
      "message_sent",
      "message_received",
      "message_failed"
    ]
  },
  {
    "module": "calls",
    "actions": [
      "create",
      "get",
      "update",
      "delete"
    ],
    "triggers": [
      "call_started",
      "call_completed",
      "call_failed"
    ]
  },
  {
    "module": "recordings",
    "actions": [
      "get",
      "delete"
    ],
    "triggers": [
      "recording_created",
      "recording_deleted"
    ]
  },
  {
    "module": "phonenumbers",
    "actions": [
      "get",
      "update",
      "delete"
    ],
    "triggers": [
      "number_purchased",
      "number_released"
    ]
  },
];

export default {
  XappName,
  modules,
};
export const fields = [

  //                    SMS

{
  displayName: "From",
  name: "From",
  type: "string",
  description: "",
  default: "",
  items: [],
  required: true,
  displayOptions: {
    show: {
      category: ["Messages"],
      name: ["create"]
    }
  }
},
{
  displayName: "To",
  name: "To",
  type: "string",
  description: "The verified phone number of the users",
  default: "",
  items: [],
  required: true,
  displayOptions: {
    show: {
      category: ["Messages"],
      name: ["create"]
    }
  }
},
{
  displayName: "Body",
  name: "Body",
  type: "string",
  description: "The content of the text message ",
  default: "",
  items: [],
  required: true,
  displayOptions: {
    show: {
      category: ["Messages"],
      name: ["create"]
    }
  }
},
{
  displayName: "Message Id",
  name: "id",
  type: "string",
  description: "The unique identifier of messages",
  default: "",
  items: [],
  required: true,
  displayOptions: {
    show: {
      category: ["Messages"],
      name: ["get","update","delete"]
    }
  }
},
 {
    displayName: "Get Many Messages",
    name: "getMany",
    type: "string",
    description: "Retrieve multiple messages.",
    default: "",
    items: [],
    options: [],
    async init(data) {      try {
        const options = await Twi.getAllMessages(data);
        this.options = options;
      } catch (error) {
        console.error("Error occurred:", error + error.stack);
      }
    },
    required: false,
    displayOptions: {
      show: {
        category: ["Messages"],
        name: ["getMany"],
      },
    },
  },


//                    CALLS
{
  displayName: "From",
  name: "From",
  type: "string",
  description: "",
  default: "",
  items: [],
  required: true,
  displayOptions: {
    show: {
      category: ["Calls"],
      name: ["create"]
    }
  }
},
{
  displayName: "To",
  name: "To",
  type: "string",
  description: "The verified number of the users",
  default: "",
  items: [],
  required: true,
  displayOptions: {
    show: {
      category: ["Calls"],
      name: ["create"]
    }
  }
},
{
  displayName: "Record",
  name: "Record",
  type: "string",
  description: "the boolean value for record",
  default: "",
  items: [],
  required: true,
  displayOptions: {
    show: {
      category: ["Calls"],
      name: ["create"]
    }
  }
},
{
  displayName: "Url",
  name: "Url",
  type: "string",
  description: "",
  default: "",
  items: [],
  required: true,
  displayOptions: {
    show: {
      category: ["Calls"],
      name: ["create"]
    }
  }
},

{
  displayName: "Get Many Call",
  name: "getMany",
  type: "string",
  description: "Retrieve multiple calls.",
  default: "",
  items: [],
  options: [],
  async init(data) {      try {
      const options = await Twi.getAllCalls(data);
      this.options = options;
    } catch (error) {
      console.error("Error occurred:", error + error.stack);
    }
  },
  required: false,
  displayOptions: {
    show: {
      category: ["Calls"],
      name: ["getMany"],
    },
  },
},
//                           PHONE NUMBERS

  {
    displayName: "Phone number Sid",
    name: "id",
    type: "string",
    description: "The unique identifier of the phone number",
    default: "",
    items: [],
    required: true,
    displayOptions: {
      show: {
        category: ["Phone Number"],
        name: ["update","delete"]
      }
    }
  },
 
  //                     RECORDINGS
  {
      displayName: "Call Id",
      name: "callid",
      type: "string",
      description: "The unique identifier of the Calls",
      default: "",
      items: [],
      required: true,
      displayOptions: {
        show: {
          category: ["Recordings"],
          name: ["get"]
        }
      }
    }, {
      displayName: "Recordings Sid",
      name: "id",
      type: "string",
      description: "The unique identifier of the Recordings",
      default: "",
      items: [],
      required: true,
      displayOptions: {
        show: {
          category: ["Recordings"],
          name: ["delete"]
        }
      }
    },


    {
      displayName: "Get Many Recordings",
      name: "getMany",
      type: "string",
      description: "Retrieve multiple recordings.",
      default: "",
      items: [],
      options: [],
      async init(data) {      try {
          const options = await Twi.getAllRecordings(data);
          this.options = options;
        } catch (error) {
          console.error("Error occurred:", error + error.stack);
        }
      },
      required: false,
      displayOptions: {
        show: {
          category: ["Recordings"],
          name: ["getMany"],
        },
      },
    },
  
  
]




