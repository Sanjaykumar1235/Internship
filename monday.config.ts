// monday.com.config.ts
// -----------------------------------------------------------------------------
// AUTO-GENERATED CONFIGURATION FILE.
// DO NOT modify the sections labeled "AUTO-GENERATED".
//
// Copyright (c) 2025 Smackcoders. All rights reserved.
// This file is subject to the Smackcoders Proprietary License.
// Unauthorized copying or distribution is strictly prohibited.
// -----------------------------------------------------------------------------

import { Monday } from "./monday.controller";

export const XappName = "monday.com";
export const modules = [
  {
    "module": "Boards",
    "actions": [
      "create",
      "update",
      "delete",
      "get",
      "getMany"
    ],
    "triggers": [
      "new_board",
      "updated_board"
    ]
  },
  {
    "module": "Items",
    "actions": [
      "create",
      "update",
      "delete",
      "get",
      "getMany",
      "move"
    ],
    "triggers": [
      "new_item",
      "updated_item",
      "item_moved"
    ]
  },
  {
    "module": "Columns",
    "actions": [
      "create",
      "update",
      "delete",
      "get",
      "getMany"
    ],
    "triggers": [
      "new_column",
      "updated_column"
    ]
  },
  {
    "module": "Groups",
    "actions": [
      "create",
      "update",
      "delete",
      "get",
      "getMany"
    ],
    "triggers": [
      "new_group",
      "updated_group"
    ]
  },
  {
    "module": "Users",
    "actions": [
      "create",
      "update",
      "delete",
      "get",
      "getMany"
    ],
    "triggers": [
      "new_user",
      "updated_user"
    ]
  },
  {
    "module": "Tags",
    "actions": [
      "create",
      "update",
      "delete",
      "get",
      "getMany"
    ],
    "triggers": [
      "new_tag",
      "tag_added_to_item"
    ]
  },
  {
    "module": "Notifications",
    "actions": [
      "get",
      "getMany"
    ],
    "triggers": [
      "new_notification"
    ]
  },
  {
    "module": "Teams",
    "actions": [
      "create",
      "update",
      "delete",
      "get",
      "getMany"
    ],
    "triggers": [
      "new_team",
      "updated_team"
    ]
  },
  {
    "module": "Documents",
    "actions": [
      "create",
      "update",
      "delete",
      "get",
      "getMany"
    ],
    "triggers": [
      "new_document"
    ]
  }
];

export default {
  XappName,
  modules,
  
}
export const fields = [

  // Subscribers

  {
    displayName: " Name",
    name: "board_name",
    type: "string",
    description: "New Name of the Boards",
    default: "",
    items: [],
    required: true,
    displayOptions: {
      show: {
        category: ["Boards"],
        name: ["create"],
      },
    },
  },
  {
  displayName: "New value",
  name: "new_value",
  type: "string",
  description: "New Name of the boards",
  default: "",
  items: [],
  required: true,
  displayOptions: {
    show: {
      category: ["Boards"],
      name: ["update"],
    },
  },
},
  {
    displayName: "Boards Id",
    name: "id",
    type: "string",
    description: "The unique identifier of Boards",
    default: "",
    items: [],
    required: true,
    displayOptions: {
      show: {
        category: ["Boards"],
        name: ["get","delete"],
      },
    },
  },
   {
      displayName: "Get Many Boards",
      name: "getMany",
      type: "string",
      description: "Retrieve multiple Boards.",
      default: "",
      items: [],
      options: [],
      async init(data) {    try {
          const options = await Monday.getAllBoards(data);
          this.options = options;
        } catch (error) {
          console.error("Error occurred:", error + error.stack);
        }
      },
      required: false,
      displayOptions: {
        show: {
          category: ["Boards"],
          name: ["getMany"],
        },
      },
      },
    

  //  Items
  {
    displayName: "Group_id",
    name: "id",
    type: "string",
    description: "The unique identifier of group",
    default: "",
    items: [],
    required: false,
    displayOptions: {
      show: {
        category: ["Items"],
        name: ["move","create"],
      },
    },
  },

  {
    displayName: "board_id",
    name: "id",
    type: "string",
    description: "The unique identifier of boards",
    default: "",
    items: [],
    required: false,
    displayOptions: {
      show: {
        category: ["Items"],
        name: ["create"],
      },
    },
  },


  {
    displayName: "Item Id",
    name: "id",
    type: "string",
    description: "The unique identifier of the Items",
    default: "",
    items: [],
    required: true,
    displayOptions: {
      show: {
        category: ["Items"],
        name: ["move","delete"],
      },
    },
  },
  {
    displayName: "Name",
    name: "item_name",
    type: "string",
    description: "New Name of the Items",
    default: "",
    items: [],
    required: true,
    displayOptions: {
      show: {
        category: ["Items"],
        name: ["create"],
      },
    },
  },
  {
    displayName: "Get Many Items",
    name: "getMany",
    type: "string",
    description: "Retrieve multiple Boards.",
    default: "",
    items: [],
    options: [],
    async init(data) {    try {
        const options = await Monday.getAllItems(data);
        this.options = options;
      } catch (error) {
        console.error("Error occurred:", error + error.stack);
      }
    },
    required: false,
    displayOptions: {
      show: {
        category: ["Boards"],
        name: ["getMany"],
      },
    },
    },
  {

  displayName: "Board Id",
  name: "id",
  type: "string",
  description: "teh unique identifier of the boards",
  default: "",
  items: [],
  required: true,
  displayOptions: {
    show: {
      category: ["DuplicateItems"],
      name: ["create"],
    },
  },
},

{

  displayName: "Items Id",
  name: "id",
  type: "string",
  description: "teh unique identifier of the Items",
  default: "",
  items: [],
  required: true,
  displayOptions: {
    show: {
      category: ["DuplicateItems"],
      name: ["create"],
    },
  },
},
  

  //  columns


  {
    displayName: "board Id",
    name: "id",
    type: "string",
    description: "",
    default: "",
    items: [],
    required: true,
    displayOptions: {
      show: {
        category: ["Columns"],
        name: ["create","delete"],
      },
    },
  },

  {
    displayName: "Status",
    name: "title",
    type: "string",
    description: "Status of the Column",
    default: "",
    items: [],
    required: true,
    displayOptions: {
      show: {
        category: ["Columns"],
        name: ["create"],
      },
    },
  },

  {
    displayName: "Description",
    name: "description",
    type: "string",
    description: "description for the columns",
    default: "",
    items: [],
    required: true,
    displayOptions: {
      show: {
        category: ["Columns"],
        name: ["create"],
      },
    },
  }, 
  {
  displayName: "Columns Id",
  name: "id",
  type: "string",
  description: "The unique identifier of the columns",
  default: "",
  items: [],
  required: true,
  displayOptions: {
    show: {
      category: ["Columns"],
      name: ["delete"]
    },
  },
}, 
{
  displayName: "Get Many Columns",
  name: "getMany",
  type: "string",
  description: "Retrieve multiple Boards.",
  default: "",
  items: [],
  options: [],
  async init(data) {    try {
      const options = await Monday.getAllColumns(data);
      this.options = options;
    } catch (error) {
      console.error("Error occurred:", error + error.stack);
    }
  },
  required: false,
  displayOptions: {
    show: {
      category: ["Columns"],
      name: ["getMany"],
    },
  },
  },



{
  displayName: "Boards Id",
  name: "id",
  type: "string",
  description: "The unique identifier of the boards",
  default: "",
  items: [],
  required: false,
  displayOptions: {
    show: {
      category: ["Groups"],
      name: ["create", "update","delete"],
    },
  },
},
{
  displayName: "Group Name",
  name: "group_name",
  type: "string",
  description: "New Name of the Groups",
  default: "",
  items: [],
  required: true,
  displayOptions: {
    show: {
      category: ["Groups"],
      name: ["create"],
    },
  },
},
{
  displayName: "Groups Id",
  name: "id",
  type: "string",
  description: "The unique identifier of the Groups",
  default: "",
  items: [],
  required: false,
  displayOptions: {
    show: {
      category: ["Groups"],
      name: ["update","delete"],
    },
  },
},
{
  displayName: "Get Many Groiups",
  name: "getMany",
  type: "string",
  description: "Retrieve multiple Boards.",
  default: "",
  items: [],
  options: [],
  async init(data) {    try {
      const options = await Monday.getAllGroups(data);
      this.options = options;
    } catch (error) {
      console.error("Error occurred:", error + error.stack);
    }
  },
  required: false,
  displayOptions: {
    show: {
      category: ["Groups"],
      name: ["getMany"],
    },
  },
  },

//         Tags
{
  displayName: "Name",
  name: "tags_name",
  type: "string",
  description: "Name of the tags",
  default: "",
  items: [],
 required: false,
  displayOptions: {
    show: {
      category: ["Tags"],
      name: ["create"],
    },
  },
},

  {
    displayName: "Board Id",
    name: "id",
    type: "string",
    description: "The unique identifier of the boards",
    default: "",
    items: [],
    required: false,
    displayOptions: {
      show: {
        category: ["Tags"],
        name: ["update"],
      },
    },
  },
  {
    displayName: "Item Id",
    name: "id",
    type: "string",
    description: "The unique identifier of the Items",
    default: "",
    items: [],
    required: false,
    displayOptions: {
      show: {
        category: ["Tags"],
        name: ["update"],
      },
    },
  },

  {
    displayName: "Column Id",
    name: "id",
    type: "string",
    description: "The unique identiifer of the Columns",
    default: "",
    items: [],
    required: false,
    displayOptions: {
      show: {
        category: ["Tags"],
        name: ["update"],
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

  
  {
    displayName: "Name",
    name: "name",
    type: "string",
    description: "Name of the Workspace ",
    default: "",
    items: [],
    required: false,
    displayOptions: {
      show: {
        category: ["Workspace"],
        name: ["create"],
      },
    },
  },
  {
    displayName: "Get Many Workspace",
    name: "getMany",
    type: "string",
    description: "Retrieve multiple Boards.",
    default: "",
    items: [],
    options: [],
    async init(data) {    try {
        const options = await Monday.getAllWorkspace(data);
        this.options = options;
      } catch (error) {
        console.error("Error occurred:", error + error.stack);
      }
    },
    required: false,
    displayOptions: {
      show: {
        category: ["Workspace"],
        name: ["getMany"],
      },
    },
    },

  
  {
    displayName: "Workspace Id",
    name: "id",
    type: "string",
    description: "the unique identifier ofthe workspace ",
    default: "",
    items: [],
    required: false,
    displayOptions: {
      show: {
        category: ["Documents"],
        name: ["create"],
      },
    },
  },
  
  {
    displayName: "Name",
    name: "name",
    type: "string",
    description: "Name of the Documents ",
    default: "",
    items: [],
    required: false,
    displayOptions: {
      show: {
        category: ["Documents"],
        name: ["create"],
      },
    },
  },

  {
    displayName: "Board Id",
    name: "id",
    type: "string",
    description: "The unique identifier of the Boards",
    default: "",
    items: [],
    required: false,
    displayOptions: {
      show: {
        category: ["DocumentsColumns"],
        name: ["create"],
      },
    },
  },

  
  {
    displayName: "Title",
    name: "title",
    type: "string",
    description: "Title of the columns",
    default: "",
    items: [],
    required: false,
    displayOptions: {
      show: {
        category: ["DocumentsColumns"],
        name: ["create"],
      },
    },
  },
    {
    displayName: "Title",
    name: "title",
    type: "string",
    description: "Title of the columns",
    default: "",
    items: [],
    required: false,
    displayOptions: {
      show: {
        category: ["DocumentsColumns"],
        name: ["create"],
      },
    },
  },

  {
    displayName: "Get Many Users",
    name: "getMany",
    type: "string",
    description: "Retrieve multiple Boards.",
    default: "",
    items: [],
    options: [],
    async init(data) {    try {
        const options = await Monday.getAllUsers(data);
        this.options = options;
      } catch (error) {
        console.error("Error occurred:", error + error.stack);
      }
    },
    required: false,
    displayOptions: {
      show: {
        category: ["Users"],
        name: ["getMany"],
      },
    },
    },




  
];





