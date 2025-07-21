// zoom.config.ts
// -----------------------------------------------------------------------------
// AUTO-GENERATED CONFIGURATION FILE.
// DO NOT modify the sections labeled "AUTO-GENERATED".
//
// Copyright (c) 2025 Smackcoders. All rights reserved.
// This file is subject to the Smackcoders Proprietary License.
// Unauthorized copying or distribution is strictly prohibited.
// -----------------------------------------------------------------------------

import { zoom } from "./zoom.controller";

export const XappName = "zoom";
export const modules = [
  {
    "module": "meeting",
    "actions": [
      "create",
      "update",
      "delete",
      "get",
      "getMany"
    ],
    "triggers": [
      "meeting_created"
    ]
  },
  {
    "module": "template",
    "actions": [
      "create",
      "get",
      "getMany"
    ],
    "triggers": [
      "template_created"
    ]
  },
  {
    "module": "invitelinks",
    "actions": [
      "create",
      "get"
    ],
    "triggers": [
      "invitelinks_created"
    ]
  },
  {
    "module": "getfields",
    "actions": [
      "get"
    ],
    "triggers": [
      "getfields_retrieved"
    ]
  }
];

export default {
  XappName,
  modules,
};

//  AdditionalsFiels

const MeetingAdditionFields=[
  {
    displayName: "Agenda",
    name: "agenda",
    type: "string",
    description: "",
    default: "",
    items: [],
    required: false,
   
},
{
  displayName: "Default password",
  name: "default_password",
  type: "string",
  description: "",
  default: "",
  items: [],
  required: false,
 
},
{
  displayName: "Duration",
  name: "duration",
  type: "string",
  description: "",
  default: "",
  items: [],
  required: false,
 
},

{
  displayName: "Password",
  name: "password",
  type: "string",
  description: "",
  default: "",
  items: [],
  required: false,
 
},
{
  displayName: "Pre_schedule",
  name: "pre_schedule",
  type: "string",
  description: "",
  default: "",
  items: [],
  required: false,
 
},
{
  displayName: "Recurrence",
  name: "recurrence",
  type: "string",
  description: "",
  default: "",
  items: [],
  required: false,
 
},
{
  displayName: "Schedule_for",
  name: "schedule_for",
  type: "string",
  description: "",
  default: "",
  items: [],
  required: false,
 
},
{
  displayName: "Settings",
  name: "settings",
  type: "string",
  description: "",
  default: "",
  items: [],
  required: false,
 
},
{
  displayName: "Settings",
  name: "settings||additional_data_center_regions",
  type: "string",
  description: "",
  default: "",
  items: [],
  required: false,
 
},
{
  displayName: "Setting",
  name: "settings__allow_multiple_devices",
  type: "string",
  description: "",
  default: "",
  items: [],
  required: false,
 
},
{
  displayName: "Setting",
  name: "setting__alternative_hosts",
  type: "string",
  description: "",
  default: "",
  items: [],
  required: false,
 
},
{
  displayName: "Setting",
  name: "settings__alternative_hosts_email_notification",
  type: "string",
  description: "",
  default: "",
  items: [],
  required: false,
 
},
{
  displayName: "Setting",
  name: "settings__approved_or_denied_countries_or_regions",
  type: "string",
  description: "",
  default: "",
  items: [],
  required: false,
 
},
{
  displayName: "Setting",
  name: "settings__approved_or_denied_countries_or_regions__approved_list",
  type: "string",
  description: "",
  default: "",
  items: [],
  required: false,
 
},
{
  displayName: "Setting",
  name: "settings__approved_or_denied_countries_or_regions__denied_list",
  type: "string",
  description: "",
  default: "",
  items: [],
  required: false,
 
},
{
  displayName: "Setting",
  name: "settings__approved_or_denied_countries_or_regions__enable",
  type: "string",
  description: "",
  default: "",
  items: [],
  required: false,
 
},
{
  displayName: "Setting",
  name: "settings__approved_or_denied_countries_or_regions__method",
  type: "string",
  description: "",
  default: "",
  items: [],
  required: false,
 
},
{
  displayName: "Setting",
  name: "settings__approved_or_denied_countries_or_regions__audio",
  type: "string",
  description: "",
  default: "",
  items: [],
  required: false,
 
},
{
  displayName: "Setting",
  name: "settings__approved_or_denied_countries_or_regions__audio_conference_info",
  type: "string",
  description: "",
  default: "",
  items: [],
  required: false,
 
},
{
  displayName: "Setting",
  name: "settings__approved_or_denied_countries_or_regions__authentication_domains",
  type: "string",
  description: "",
  default: "",
  items: [],
  required: false,
 
},
{
  displayName: "Setting",
  name: "settings__approved_or_denied_countries_or_regions__authentication_exception",
  type: "string",
  description: "",
  default: "",
  items: [],
  required: false,
 
},
{
  displayName: "Setting",
  name: "settings__approved_or_denied_countries_or_regions__authentication_exception||email",
  type: "string",
  description: "",
  default: "",
  items: [],
  required: false,
 
},
{
  displayName: "Setting",
  name: "settings__approved_or_denied_countries_or_regions__authentication_exception||name",
  type: "string",
  description: "",
  default: "",
  items: [],
  required: false,
 
},
{
  displayName: "Setting",
  name: "settings__approved_or_denied_countries_or_regions__authentication_option",
  type: "string",
  description: "",
  default: "",
  items: [],
  required: false,
 
},
{
  displayName: "Setting",
  name: "settings__approved_or_denied_countries_or_regions__auto_recording",
  type: "string",
  description: "",
  default: "",
  items: [],
  required: false,
 
},
{
  displayName: "Setting",
  name: "settings__approved_or_denied_countries_or_regions__breakout_room",
  type: "string",
  description: "",
  default: "",
  items: [],
  required: false,
 
},

{
  displayName: "Setting",
  name: "settings__approved_or_denied_countries_or_regions__calendar_type",
  type: "string",
  description: "",
  default: "",
  items: [],
  required: false,
 
},
{
  displayName: "Start time",
  name: "start_time",
  type: "string",
  description: "",
  default: "",
  items: [],
  required: false,
 
},

{
  displayName: "Template Id",
  name: "template_id",
  type: "string",
  description: "",
  default: "",
  items: [],
  required: false,
 
},
{
  displayName: "Timezone",
  name: "timezone",
  type: "string",
  description: "",
  default: "",
  items: [],
  required: false,
 
},
{
  displayName: "Topic",
  name: "topic",
  type: "string",
  description: "",
  default: "",
  items: [],
  required: false,
 
},
{
  displayName: "Tracking fields",
  name: "tracking_fields||value",
  type: "string",
  description: "",
  default: "",
  items: [],
  required: false,
 
},
{
  displayName: "Timezone",
  name: "timezone",
  type: "string",
  description: "",
  default: "",
  items: [],
  required: false,
 
}
]

const TemplateAdditionFields=[

  {
    displayName: "Meeting Id",
    name: "meeting_id",
    type: "string",
    description: "",
    default: "",
    items: [],
    required: false,
   
  },
  {
    displayName: "Name",
    name: "name",
    type: "string",
    description: "",
    default: "",
    items: [],
    required: false,
   
  },
  {
    displayName: "Save recurrence",
    name: "save_recurrence",
    type: "string",
    description: "",
    default: "",
    items: [],
    required: false,
   
  },
  {
    displayName: "OverWrite",
    name: "overwrite",
    type: "string",
    description: "",
    default: "",
    items: [],
    required: false,
   
  }



]

const InviteLinks=[

  {
    displayName: "Attendees",
    name: "attendees||disable_video",
    type: "string",
    description: "",
    default: "",
    items: [],
    required: false,
   
  },
  {
    displayName: "Attendees",
    name: "attendees||disable_audio",
    type: "string",
    description: "",
    default: "",
    items: [],
    required: false,
   
  },
  {
    displayName: "Ttl",
    name: "ttl",
    type: "string",
    description: "",
    default: "",
    items: [],
    required: false,
   
  },


]


export const fields = [

  //                    meetings

  {
      displayName: "user id",
      name: "id",
      type: "string",
      description: "The unique identifier of  the user",
      default: "",
      items: [],
      required: true,
      displayOptions: {
          show: {
              category: ["meetings"],
              name: ["create"]
          }
      }
  },
  {
    displayName: "Field",
    name: "field",
    type: "string",
    description: "New value of fields",
    default: "",
    items: [],
    required: true,
    displayOptions: {
        show: {
            category: ["meetings"],
            name: ["create"]
        }
    }
},
  {
      displayName: "meeting Id",
      name: "id",
      type: "string",
      description: "urgent",
      default: "",
      items: [],
      required: true,
      displayOptions: {
          show: {
              category: ["meetings"],
              name: [ "update","get","delete"]
          }
      }
      
  },
  //  Addition fields

  {
    displayName: "Additionfields",
    name: "additionalfields",
    type: "string",
    description: "",
    default: "",
    items: [],
    required: true,
    displayOptions: {
        show: {
            category: ["meetings"],
            name: [ "create","update"]
        }
    },
    fields:MeetingAdditionFields

    
},
 

  {
      displayName: "meetings",
      name: "getMany",
      type: "string",
      description: "Retrieve multiple meetings.",
      default: "",
      items: [],
      options: [],
      async init(data) {
          try {
              const options = await zoom.getAllMeeting(data);
              this.options = options;
          } catch (error) {
              console.error("Error occurred:", error + error.stack);
          }
      },
      required: false,
      displayOptions: {
          show: {
              category: ["meetings"],
              name: ["getMany"],
          },
      },
  },
 
  {
    displayName: "user id",
    name: "id",
    type: "string",
    description: "the unique identifier of the user",
    default: "",
    items: [],
    required: true,
    displayOptions: {
        show: {
            category: ["template"],
            name: [ "create"]
        }
    }
},


{
  displayName: "meeting template",
  name: "getMany",
  type: "string",
  description: "Retrieve multiple meetings.",
  default: "",
  items: [],
  options: [],
  async init(data) {
      try {
          const options = await zoom.getAllTemplate(data);
          this.options = options;
      } catch (error) {
          console.error("Error occurred:", error + error.stack);
      }
  },
  required: false,
  displayOptions: {
      show: {
          category: ["template"],
          name: ["getMany"],
      },
  },
},
// Addition fields
{
  displayName: "Additionfields",
  name: "additionalfields",
  type: "string",
  description: "",
  default: "",
  items: [],
  required: true,
  displayOptions: {
      show: {
          category: ["template"],
          name: [ "create"]
      }
  },
  fields:TemplateAdditionFields

  
},

//  Invite Links
{
  displayName: "meeting Id",
  name: "id",
  type: "string",
  description: "the unique identifier of the meeting",
  default: "",
  items: [],
  required: true,
  displayOptions: {
      show: {
          category: ["invitelinks"],
          name: [ "create","get"]
      }
  }
},
{
  displayName: "Name",
  name: "attendees||name",
  type: "string",
  description: "New Name of the users",
  default: "",
  items: [],
  required: true,
  displayOptions: {
      show: {
          category: ["invitelinks"],
          name: [ "create"]
      }
  }
},
{
  displayName: "AdditionalFields",
  name: "additionalfields",
  type: "string",
  description: "",
  default: "",
  items: [],
  required: true,
  displayOptions: {
      show: {
          category: ["invitelinks"],
          name: [ "create"]
      }
  },
  fields:InviteLinks
},

]





