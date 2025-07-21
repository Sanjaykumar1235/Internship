// everhour.config.ts
// -----------------------------------------------------------------------------
// AUTO-GENERATED CONFIGURATION FILE.
// DO NOT modify the sections labeled "AUTO-GENERATED".
//
// Copyright (c) 2025 Smackcoders. All rights reserved.
// This file is subject to the Smackcoders Proprietary License.
// Unauthorized copying or distribution is strictly prohibited.
// -----------------------------------------------------------------------------
import { everhourController } from "./everhour.controller";
export const XappName = "everhour";
export const modules = [
  {
    "module": "client",
    "actions": [
      "create",
      "get",
      "getMany",
      "update",
      "delete"
    ],
    "triggers": []
  },
  // EVENTS MODULE NOT AVAILABLE IN DOCUMENTS
  {
    "module": "event",
    "actions": [
      "create",
      "get",
      "getMany",
      "update",
      "delete"
    ],
    "triggers": []
  },
  {
    "module": "project",
    "actions": [
      "create",
      "get",
      "getMany",
      "update",
      "delete"
    ],
    "triggers": []
  },
  // TASKS MODULE INPROPER DOCUMENTS
  {
    "module": "task",
    "actions": [
      "create",
      "get",
      "getMany",
      "update",
      "delete"
    ],
    "triggers": []
  },
  {
    "module": "timers",
    "actions": [
      "create",
      "get",
      "getMany",
      "delete"
    ],
    "triggers": []
  },
  {
    "module": "user",
    "actions": [
      "get",
      "getMany"
    ],
    "triggers": []
  },
  {
    "module": "invoice",
    "actions": [
      "create",
      "get",
      "getMany",
      "update",
      "delete"
    ],
    "triggers": []
  },
  //EXPENSE MODULE IN GET METHOD NOT AVAILABLE IN DOCUMENTS
  {
    "module": "expense",
    "actions": [
      "create",
      "get",
      "getMany",
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


/** CLIENTS MODULES */
export const createAndUpdateClientsFields= [
  {
    displayName: "Projects",
    name: "projects",
    type: "string",
    description: "A list of projects associated with the client.",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Business Details",
    name: "businessDetails",
    type: "string",
    description: "Details about the client's business.",
    required: false,
    items: [],
    options: []
  }
]
  /** PROJECTS MODULES */
export const createAndUpdateProjectsFields=[
  {
    displayName: "Users",
    name: "users",
    type: "string",
    description: "List of users associated with the project.",
    required: false,
    items: [],
    options: []
  }
]

/** INVOICE MODULE */
export const createAndUpdateInvoiceFields = [
  {
    displayName: "Limit Date From",
    name: "limitDateFrom",
    type: "string",
    description: "Start date for filtering (e.g., 2019-03-11).",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Limit Date Till",
    name: "limitDateTill",
    type: "string",
    description: "End date for filtering (e.g., 2019-03-13).",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Include Expenses",
    name: "includeExpenses",
    type: "boolean",
    description: "Whether to include expenses in the data.",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Include Time",
    name: "includeTime",
    type: "boolean",
    description: "Whether to include tracked time in the data.",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Projects",
    name: "projects",
    type: "string",
    description: "A list of projects to include.",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Tax",
    name: "tax",
    type: "string",
    description: "Tax information for the operation.",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Discount",
    name: "discount",
    type: "string",
    description: "Discount information for the operation.",
    required: false,
    items: [],
    options: []
  }
  
]

/**EXPENSE MODULE */
export const createAndUpdateExpenseFields = [
  {
    displayName: "Amount",
    name: "amount",
    type: "string",
    description: "The monetary amount (e.g., 2278).",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Attachments",
    name: "attachments",
    type: "string",
    description: "A list of attached files or resources.",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Billable",
    name: "billable",
    type: "boolean",
    description: "Indicates whether the item is billable.",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Date",
    name: "date",
    type: "string",
    description: "Date of the record (e.g., 04-04).",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Year",
    name: "year",
    type: "string",
    description: "Year portion of the date (e.g., 2019).",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Details",
    name: "details",
    type: "string",
    description: "Description or notes (e.g., Transportation notes).",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Project",
    name: "project",
    type: "string",
    description: "Project identifier (e.g., as:333045610521453).",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Quantity",
    name: "quantity",
    type: "string",
    description: "The number of items or units (e.g., 17).",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "User",
    name: "user",
    type: "string",
    description: "User ID associated with this entry (e.g., 6).",
    required: false,
    items: [],
    options: []
  }
  
]

const additionalsections=[
    {
    displayName: "Position",
    name: "position",
    type: "string",
    description: "give the position number",
    required: false,
    items: [],
    options: []
  },
    {
    displayName: "Status",
    name: "status",
    type: "string",
    description: "status of the section",
    required: false,
    items: [],
    options: []
  }
  

]

const additionalCategory=[
   {
    displayName: "UnitBased",
    name: "unitBased",
    type: "boolean",
    description: "Give the boolean value",
    required: false,
    items: [],
    options: []
  },
    {
    displayName: "UnitName",
    name: "unitName",
    type: "string",
    description: "unit values",
    required: false,
    items: [],
    options: []
  },
    {
    displayName: "UnitPrice",
    name: "unitPrice",
    type: "string",
    description: "Price values",
    required: false,
    items: [],
    options: []
  }

]


const additionalWebhooks=[
     {
    displayName: "Project Id",
    name: "projectid",
    type: "boolean",
    description: "The unique identifier of the project",
    required: false,
    items: [],
    options: []
  }
]
/** TIMER MODULE */
export const startTimerFields = [
  {
    displayName: "Task",
    name: "task",
    type: "string",
    description: "Task identifier",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "User Date",
    name: "userDate",
    type: "string",
    description: "Date associated with the user entry ",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Comment",
    name: "comment",
    type: "string",
    description: "Optional comment or notes.",
    required: false,
    items: [],
    options: []
  }
  
]


const additionalTasks = [
  {
    displayName: "Section",
    name: "section",
    type: "string",
    description: "Sections Id",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Labels",
    name: "labels||high",
    type: "string",
    description: "Labels name",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Labels",
    name: "labels||bug",
    type: "string",
    description: "label Name",
    required: false,
    items: [],
    options: []
  },
    {
    displayName: "Position",
    name: "position",
    type: "string",
    description: "Value of positions",
    required: false,
    items: [],
    options: []
  },
      {
    displayName: "DueOn",
    name: "dueOn",
    type: "string",
    description: "Due date",
    required: false,
    items: [],
    options: []
  },
        {
    displayName: "Status",
    name: "status",
    type: "string",
    description: "Mention the status",
    required: false,
    items: [],
    options: []
  },
  
]


export const fields = [

  /** CLIENTS MODULES */
  {
    displayName: "Client Name",
    name: "generateName",
    type: "string",
    description: "The name of the client.",
    required: true,
    items:[],
    options:[],
    displayOptions:{
      show:{
        category:["clients"],
        name:["create","update"]
      }
    }
  },
  {
    displayName:"Clients Id",
    name:"id",
    type:"string",
    default:"",
    description:"Provide Client's ID for actions.",
    items:[],
    required:true,
    options:[],
    displayOptions:{
      show:{
        category:["clients"],
        name:["update","get","delete"]
      }
    }
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type:"collection",
    palceholder: "Add Fields",
    default: {},
      items: [],
      required: false,
      options: [],
    displayOptions: {
        show: {
            category: ["clients"],
            name:["create","update"]
        }
    },
    fields : createAndUpdateClientsFields
  },
  {
    displayName: "Return All",
    name: "returnALl",
    type:"boolean",
    palceholder: "Return All",
    default: {},
      items: [],
      required: false,
      options: [],
      async init(data) {
        try {
          
          const list = await everhourController.getAllClients(data);
          this.options = list;
        } catch (error) {
          return ({ 'Error occurred': error });
        }
      },
    displayOptions: {
        show: {
            category: ["clients"],
            name:["getMany"]
        }
    },
   

  },

  /** PROJECTS MODULE */
  {
    displayName: "Project Name",
    name: "name",
    type: "string",
    description: "The name of the project.",
    required: true,
    items:[],
    options:[],
    displayOptions:{
      show:{
        category:["projects"],
        name:["create","update"]
      }
    }
  },
  {
    displayName: "Project Type",
    name: "type",
    type: "options",
    description: "The type of the project.",
    required: true,
    items:[],
    options:[
      {      name: "board",
            value: "board",
      },
      {
        name: "list",
        value: "list",
      }
    ],
    displayOptions:{
      show:{
        category:["projects"],
        name:["create","update"]
      }
    }
  },
  {
    displayName:"Projects Id",
    name:"id",
    type:"string",
    default:"",
    description:"Provide Projects's ID for actions.",
    items:[],
    required:true,
    options:[],
    displayOptions:{
      show:{
        category:["projects"],
        name:["update","get","delete"]
      }
    }
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type:"collection",
    palceholder: "Add Fields",
    default: {},
      items: [],
      required: false,
      options: [],
    displayOptions: {
        show: {
            category: ["projects"],
            name:["create","update"]
        }
    },
    fields : createAndUpdateProjectsFields
  },
  {
    displayName: "Return All",
    name: "returnALl",
    type:"boolean",
    palceholder: "Return All",
    default: {},
      items: [],
      required: false,
      options: [],
      async init(data) {
        try {
          
          const list = await everhourController.getAllProject(data);
          this.options = list;
        } catch (error) {
          return ({ 'Error occurred': error });
        }
      },
    displayOptions: {
        show: {
            category: ["projects"],
            name:["getMany"]
        }
    },
   

  },

  /** INVOICE MODULE */

  {
    displayName:"Client Id",
    name:"id",
    type:"string",
    default:"",
    description:"The unique identifier of the client",
    items:[],
    required:true,
    options:[],
    async init(data) {
      try {
        
        const list = await everhourController.getAllClients(data);
        this.options = list;
      } catch (error) {
        return ({ 'Error occurred': error });
      }
    },
    displayOptions:{
      show:{
        category:["invoice"],
        name:["create"]
      }
    }
  },
  {
    displayName:"Invoice Id",
    name:"id",
    type:"string",
    default:"",
    description:"Provide Invoice's ID for actions.",
    items:[],
    required:true,
    options:[],
    displayOptions:{
      show:{
        category:["invoice"],
        name:["update","get","delete"]
      }
    }
  },
  {
    displayName:" Id",
    name:"invoiceItems||id",
    type:"string",
    default:"",
    description:"The unique identifier of the project",
    items:[],
    required:true,
    options:[],
    async init(data) {
      try {
        
        const list = await everhourController.getAllProject(data);
        this.options = list;
      } catch (error) {
        return ({ 'Error occurred': error });
      }
    },
    displayOptions:{
      show:{
        category:["invoice"],
        name:["update"]
      }
    }
  },
  {
    displayName:"Name",
    name:"invoiceItems||name",
    type:"string",
    default:"",
    description:"",
    items:[],
    required:true,
    options:[],
    displayOptions:{
      show:{
        category:["invoice"],
        name:["update"]
      }
    }
  },
  {
    displayName:" BilledTime",
    name:"invoiceItems||billedTime",
    type:"string",
    default:"",
    description:"",
    items:[],
    required:true,
    options:[],
    displayOptions:{
      show:{
        category:["invoice"],
        name:["update"]
      }
    }
  },
  {
    displayName:"ListAmount",
    name:"invoiceItems||listAmount",
    type:"string",
    default:"",
    description:"",
    items:[],
    required:true,
    options:[],
    displayOptions:{
      show:{
        category:["invoice"],
        name:["update"]
      }
    }
  },
  {
    displayName:"Taxable",
    name:"invoiceItems||taxable",
    type:"string",
    default:"",
    description:"",
    items:[],
    required:true,
    options:[],
    displayOptions:{
      show:{
        category:["invoice"],
        name:["update"]
      }
    }
  },
  {
    displayName:"Taxable",
    name:"invoiceItems||taxable",
    type:"string",
    default:"",
    description:"",
    items:[],
    required:true,
    options:[],
    displayOptions:{
      show:{
        category:["invoice"],
        name:["update"]
      }
    }
  },


  


  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type:"collection",
    palceholder: "Add Fields",
    default: {},
      items: [],
      required: false,
      options: [],
    displayOptions: {
        show: {
            category: ["invoice"],
            name:["update"]
        }
    },
    fields : createAndUpdateInvoiceFields
  },
  {
    displayName: "Return All",
    name: "returnALl",
    type:"boolean",
    palceholder: "Return All",
    default: {},
      items: [],
      required: false,
      options: [],
      async init(data) {
        try {
          
          const list = await everhourController.getAllInvoice(data);
          this.options = list;
        } catch (error) {
          return ({ 'Error occurred': error });
        }
      },
    displayOptions: {
        show: {
            category: ["invoice"],
            name:["getMany"]
        }
    },
   

  },

  /**EXPENSE MODULE */
  {
    displayName: "Category",
    name: "category",
    type: "string",
    description: "Category ID ",
    items:[],
    required:true,
    options:[],
         async init(data) {
        try {
          
          const list = await everhourController.getAllCatgeory(data);
          this.options = list;
        } catch (error) {
          return ({ 'Error occurred': error });
        }
      },
    displayOptions:{
      show:{
        category:["expense"],
        name:["update","create"]
      }
    }
  },


  {
    displayName:"Expense Id",
    name:"id",
    type:"string",
    default:"",
    description:"Provide Expense's ID for actions.",
    items:[],
    required:true,
    options:[],
    displayOptions:{
      show:{
        category:["expense"],
        name:["update","delete"]
      }
    }
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type:"collection",
    palceholder: "Add Fields",
    default: {},
      items: [],
      required: false,
      options: [],
    displayOptions: {
        show: {
            category: ["expense"],
            name:["create","update"]
        }
    },
    fields : createAndUpdateExpenseFields
  },
  {
    displayName: "Return All",
    name: "returnALl",
    type:"boolean",
    palceholder: "Return All",
    default: {},
      items: [],
      required: false,
      options: [],
      async init(data) {
        try {
          
          const list = await everhourController.getAllExpense(data);
          this.options = list;
        } catch (error) {
          return ({ 'Error occurred': error });
        }
      },
    displayOptions: {
        show: {
            category: ["expense"],
            name:["getMany"]
        }
    },
   

  },
  /** TEAMUSER(USER) MODULE */
  {
    displayName: "Return All",
    name: "returnALl",
    type:"boolean",
    palceholder: "Return All",
    default: {},
      items: [],
      required: false,
      options: [],
      async init(data) {
        try {
          
          const list = await everhourController.getAllTeamUser(data);
          this.options = list;
        } catch (error) {
          return ({ 'Error occurred': error });
        }
      },
    displayOptions: {
        show: {
            category: ["teamUser"],
            name:["getMany"]
        }
    },
   

  },



  /** TIMER MODULES */
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type:"collection",
    palceholder: "Add Fields",
    default: {},
      items: [],
      required: false,
      options: [],
    displayOptions: {
        show: {
            category: ["timer"],
            name:["create"]
        }
    },
    fields : startTimerFields
  },
  {
    displayName: "Return All",
    name: "returnALl",
    type:"boolean",
    palceholder: "Return All",
    default: {},
      items: [],
      required: false,
      options: [],
      async init(data) {
        try {
          
          const list = await everhourController.getAllTeamTimers(data);
          this.options = list;
        } catch (error) {
          return ({ 'Error occurred': error });
        }
      },
    displayOptions: {
        show: {
            category: ["timer"],
            name:["getMany"]
        }
    },
   

  },

   {
    displayName:"Name",
    name:"name",
    type:"string",
    default:"",
    description:"New Name of the sections",
    items:[],
    required:true,
    options:[],
    displayOptions:{
      show:{
        category:["section"],
        name:["create","update"]
      }
    }
  },
    {
    displayName:"Sections Id",
    name:"id",
    type:"string",
    default:"",
    description:"The unique identifier of the sections",
    items:[],
    required:true,
    options:[],
    displayOptions:{
      show:{
        category:["section"],
        name:["update","get","delete"]
      }
    }
  },
  {
    displayName: "Return All",
    name: "returnALl",
    type:"boolean",
    palceholder: "Return All",
    default: {},
      items: [],
      required: false,
      options: [],
      async init(data) {
        try {
          
          const list = await everhourController.getAllSection(data);
          this.options = list;
        } catch (error) {
          return ({ 'Error occurred': error });
        }
      },
    displayOptions: {
        show: {
            category: ["section"],
            name:["getMany"]
        }
    },
   

  },
   {
    displayName: "Additional Fields",
    name: "additionalFields",
    type:"collection",
    palceholder: "Add Fields",
    default: {},
      items: [],
      required: false,
      options: [],
    displayOptions: {
        show: {
            category: ["section"],
            name:["create","update"]
        }
    },
    fields : additionalsections
  },

  //  category

    {
    displayName: "Color",
    name: "color",
    type: "string",
    description: "Color of the category",
    items:[],
    required:true,
    options:[],
    displayOptions:{
      show:{
        category:["category"],
        name:["create"]
      }
    }
  },
   {
    displayName: "Name",
    name: "name",
    type: "string",
    description: "New Name of the category",
    items:[],
    required:true,
    options:[],
    displayOptions:{
      show:{
        category:["category"],
        name:["create","update"]
      }
    }
  },


  {
    displayName:"Category Id",
    name:"id",
    type:"string",
    default:"",
    description:"The unique identifier of the category",
    items:[],
    required:true,
    options:[],
    displayOptions:{
      show:{
        category:["category"],
        name:["update","delete"]
      }
    }
  },
    {
    displayName: "Return All",
    name: "returnALl",
    type:"boolean",
    palceholder: "Return All",
    default: {},
      items: [],
      required: false,
      options: [],
      async init(data) {
        try {
          
          const list = await everhourController.getAllCatgeory(data);
          this.options = list;
        } catch (error) {
          return ({ 'Error occurred': error });
        }
      },
    displayOptions: {
        show: {
            category: ["category"],
            name:["getMany"]
        }
    },
   

  },
   {
    displayName: "Additional Fields",
    name: "additionalFields",
    type:"collection",
    palceholder: "Add Fields",
    default: {},
      items: [],
      required: false,
      options: [],
    displayOptions: {
        show: {
            category: ["category"],
            name:["create","update"]
        }
    },
    fields : additionalCategory
  },

  //  webhooks
     {
    displayName: "TargetUrl",
    name: "targetUrl",
    type: "string",
    description: "Url for webhooks",
    items:[],
    required:true,
    options:[],
    displayOptions:{
      show:{
        category:["webhooks"],
        name:["create","update"]
      }
    }
  },
      {
    displayName: "Events",
    name: "events||",
    type: "string",
    description: "Events",
    items:[],
    required:true,
    options:[],
    displayOptions:{
      show:{
        category:["webhooks"],
        name:["create","update"]
      }
    }
  },
        {
    displayName: "Webhooks Id",
    name: "id",
    type: "string",
    description: "The unique identifier of the Webhooks",
    items:[],
    required:true,
    options:[],
    displayOptions:{
      show:{
        category:["webhooks"],
        name:["get","update","delete"]
      }
    }
  },
   {
    displayName: "Additional Fields",
    name: "additionalFields",
    type:"collection",
    palceholder: "Add Fields",
    default: {},
      items: [],
      required: false,
      options: [],
    displayOptions: {
        show: {
            category: ["webhooks"],
            name:["create","update"]
        }
    },
    fields : additionalWebhooks
  },

  //  task

   {
    displayName: "Name",
    name: "name",
    type: "string",
    description: "Name of the Task",
    items:[],
    required:true,
    options:[],
    displayOptions:{
      show:{
        category:["task"],
        name:["create","update"]
      }
    }
  },
      {
    displayName: "Task Id",
    name: "id",
    type: "string",
    description: "The unique identifier of the Task",
    items:[],
    required:true,
    options:[],
    displayOptions:{
      show:{
        category:["task"],
        name:["update","get","delete"]
      }
    }
  },

   {
    displayName: "Additional Fields",
    name: "additionalFields",
    type:"collection",
    palceholder: "Add Fields",
    default: {},
      items: [],
      required: false,
      options: [],
    displayOptions: {
        show: {
            category: ["task"],
            name:["create","update"]
        }
    },
    fields : additionalTasks
  },
]