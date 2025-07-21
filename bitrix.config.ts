// bitrixcrm.config.ts
// -----------------------------------------------------------------------------
// AUTO-GENERATED CONFIGURATION FILE.
// DO NOT modify the sections labeled "AUTO-GENERATED".
//
// Copyright (c) 2025 Smackcoders. All rights reserved.
// This file is subject to the Smackcoders Proprietary License.
// Unauthorized copying or distribution is strictly prohibited.
// -----------------------------------------------------------------------------

import { ServerDescription } from "typeorm";
import { bitrix, bitrixcrmController } from "./bitrix.controller";

export const XappName = "bitrixcrm";
export const modules = [
  {
    "module": "company",
    "actions": [
      "create",
      "update",
      "delete",
      "get",
      "getMany"
    ],
    "triggers": []
  },
  {
    "module": "contact",
    "actions": [
      "create",
      "update",
      "delete",
      "get",
      "getMany"
    ],
    "triggers": [
      "contact_created"
    ]
  },
  {
    "module": "deal",
    "actions": [
      "create",
      "update",
      "delete",
      "get",
      "getMany"
    ],
    "triggers": [
      "deal_created"
    ]
  },
  {
    "module": "lead",
    "actions": [
      "create",
      "update",
      "delete",
      "get",
      "getMany"
    ],
    "triggers": []
  },
  {
    "module": "spa",
    "actions": [
      "create",
      "get"
    ],
    "triggers": [
      "spa_created"
    ]
  },
  {
    "module": "getfields",
    "actions": [
      "get"
    ],
    "triggers": []
  }
];

export default {
  XappName,
  modules,
};




/** PROJECTS MODULES */
export const additionalCompany = [
  {
    displayName: "employees",
    name: "fields__employees",
    type: "array",
    description: "New value of the employee",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Currency Id",
    name: "fields__currencyId",
    type: "array",
    description: "Id of the currency",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Revenue",
    name: "fields__revenue",
    type: "array",
    description: "Revenue values",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Logo",
    name: "fields__logo__fileData",
    type: "array",
    description: "Get element by Id",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "opened",
    name: "fields__opened",
    type: "array",
    description: "ANy alaphabet",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Assigned By Id",
    name: "fields__assignedByID",
    type: "array",
    description: "assigned Id",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Phone",
    name: "fields__phone||value",
    type: "array",
    description: "value",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Phone",
    name: "fields__phone||type",
    type: "array",
    description: "value",
    required: false,
    items: [],
    options: []
  },

]
export const additionalContact = [
  {
    displayName: "Honorific",
    name: "fields__honorific",
    type: "array",
    description: "Salutation like Mr./Mrs.",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Second Name",
    name: "fields__secondName",
    type: "array",
    description: "Middle name of the contact",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Last Name",
    name: "fields__lastName",
    type: "array",
    description: "Family name of the contact",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Photo",
    name: "fields__photo__fileData",
    type: "array",
    description: "Base64 encoded image data",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Birthdate",
    name: "fields__birthdate",
    type: "array",
    description: "Date of birth",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Type ID",
    name: "fields__typeId",
    type: "array",
    description: "Type of contact like CLINET OR PARTNER",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Source ID",
    name: "fields__sourceId",
    type: "array",
    description: "Source of the contact",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Source Description",
    name: "fields__sourceDescription",
    type: "array",
    description: "Additional info about the contact source",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Post",
    name: "fields__post",
    type: "array",
    description: "Job title or designation",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Comments",
    name: "fields__comments",
    type: "array",
    description: "Internal notes or comments",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Opened",
    name: "fields__opened",
    type: "array",
    description: "Y or N for public visibility",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Export",
    name: "fields__export",
    type: "array",
    description: "Y or N for data export permission",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Assigned By ID",
    name: "fields__assignedById",
    type: "array",
    description: "User ID to assign the contact",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Company ID",
    name: "fields__companyId",
    type: "array",
    description: "Primary associated company ID",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Company IDs",
    name: "fields__companyIds||",
    type: "array",
    description: "List of associated company IDs",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "UTM Source",
    name: "fields__utmSource",
    type: "array",
    description: "UTM source for marketing tracking",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "UTM Medium",
    name: "fields__utmMedium",
    type: "array",
    description: "UTM medium for marketing tracking",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "UTM Campaign",
    name: "fields__utmCampaign",
    type: "array",
    description: "UTM campaign name",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "UTM Content",
    name: "fields__utmContent",
    type: "array",
    description: "UTM content tag",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "UTM Term",
    name: "fields__utmTerm",
    type: "array",
    description: "UTM keyword term",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Phone",
    name: "fields__phone||value",
    type: "array",
    description: "Phone number value",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Email",
    name: "fields__email||value",
    type: "array",
    description: "Email address value",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Custom String Field",
    name: "fields__ufCrm_1720697698689",
    type: "array",
    description: "Example of a custom string field",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Parent Contact ID",
    name: "fields__parentId_1224",
    type: "array",
    description: "Example of a custom parent link field",
    required: false,
    items: [],
    options: []
  }
];

//  Deals 
export const additionalDeal = [
  {
    displayName: "Type ID",
    name: "fields__typeId",
    type: "array",
    description: "Type of the deal",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Category ID",
    name: "fields__categoryId",
    type: "array",
    description: "Pipeline category ID",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Stage ID",
    name: "fields__stageId",
    type: "array",
    description: "Stage within the pipeline",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Is Recurring",
    name: "fields__isRecurring",
    type: "array",
    description: "Whether the deal is recurring ",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Is Return Customer",
    name: "fields__isReturnCustomer",
    type: "array",
    description: "Whether it's a return customer",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Is Repeated Approach",
    name: "fields__isRepeatedApproach",
    type: "array",
    description: "Repeated sales attempt ",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Probability",
    name: "fields__probability",
    type: "array",
    description: "Success probability ",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Currency ID",
    name: "fields__currencyId",
    type: "array",
    description: "Currency ",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Opportunity",
    name: "fields__opportunity",
    type: "array",
    description: "Expected deal amount",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Is Manual Opportunity",
    name: "fields__isManualOpportunity",
    type: "array",
    description: "Y if the opportunity was entered manually",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Tax Value",
    name: "fields__taxValue",
    type: "array",
    description: "Tax percentage",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Company ID",
    name: "fields__companyId",
    type: "array",
    description: "Linked company ID",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Contact IDs",
    name: "fields__contactIds||",
    type: "array",
    description: "Array of associated contact IDs",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Begin Date",
    name: "fields__begindate",
    type: "array",
    description: "Start date of the deal",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Close Date",
    name: "fields__closedate",
    type: "array",
    description: "Expected close date of the deal",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Opened",
    name: "fields__opened",
    type: "array",
    description: "Visibility of the deal",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Closed",
    name: "fields__closed",
    type: "array",
    description: "Mark as closed",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Comments",
    name: "fields__comments",
    type: "array",
    description: "Internal comment or note",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Source ID",
    name: "fields__sourceId",
    type: "array",
    description: "Deal source",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Source Description",
    name: "fields__sourceDescription",
    type: "array",
    description: "Extra details about the source",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Additional Info",
    name: "fields__additionalInfo",
    type: "array",
    description: "Any additional string-based detail",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "UTM Source",
    name: "fields__utmSource",
    type: "array",
    description: "UTM source for marketing attribution",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "UTM Medium",
    name: "fields__utmMedium",
    type: "array",
    description: "UTM medium",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Parent Deal",
    name: "fields__parentId_1220",
    type: "array",
    description: "Custom field to link parent deal",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Custom Field",
    name: "fields__ufCrm_1721244482250",
    type: "array",
    description: "Sample custom field",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Register Social Network Event",
    name: "params__registerSonetEvent",
    type: "array",
    description: "Y/N to register in activity stream",
    required: false,
    items: [],
    options: []
  }
];


// lead

export const additionalLead = [
  {
    displayName: "Name",
    name: "fields__name",
    type: "array",
    description: "First name of the lead",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Second Name",
    name: "fields__secondName",
    type: "array",
    description: "Middle name of the lead",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Last Name",
    name: "fields__lastName",
    type: "array",
    description: "Last name of the lead",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Status ID",
    name: "fields__statusId",
    type: "array",
    description: "Lead status",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Opened",
    name: "fields__opened",
    type: "array",
    description: "Lead is public",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Assigned By ID",
    name: "fields__assignedById",
    type: "array",
    description: "Responsible user ID",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Currency ID",
    name: "fields__currencyId",
    type: "array",
    description: "Currency code",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Opportunity",
    name: "fields__opportunity",
    type: "array",
    description: "Lead budget/opportunity amount",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Phone",
    name: "fields__phone||value",
    type: "array",
    description: "Phone number",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Web",
    name: "fields__web||value",
    type: "array",
    description: "Website(s)",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Register Sonet Event",
    name: "params__registerSonetEvent",
    type: "array",
    description: "Add entry to activity stream",
    required: false,
    items: [],
    options: []
  }
];


//  SPA

export const additionalSPA = [
  {
    displayName: "Automation Enabled",
    name: "fields__isAutomationEnabled",
    type: "array",
    description: "Enable automation",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Begin/Close Dates Enabled",
    name: "fields__isBeginCloseDatesEnabled",
    type: "array",
    description: "Enable begin/close dates",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Business Process Enabled",
    name: "fields__isBizProcEnabled",
    type: "array",
    description: "Enable business processes ",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Categories Enabled",
    name: "fields__isCategoriesEnabled",
    type: "array",
    description: "Enable categories",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Client Enabled",
    name: "fields__isClientEnabled",
    type: "array",
    description: "Enable client selection",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Documents Enabled",
    name: "fields__isDocumentsEnabled",
    type: "array",
    description: "Enable document generation",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Link with Products Enabled",
    name: "fields__isLinkWithProductsEnabled",
    type: "array",
    description: "Allow product linking",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "My Company Enabled",
    name: "fields__isMycompanyEnabled",
    type: "array",
    description: "Enable 'My company' field",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Observers Enabled",
    name: "fields__isObserversEnabled",
    type: "array",
    description: "Enable observer field",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Recycle Bin Enabled",
    name: "fields__isRecyclebinEnabled",
    type: "array",
    description: "Enable recycle bin",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Open Permissions",
    name: "fields__isSetOpenPermissions",
    type: "array",
    description: "Set default open permissions",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Source Enabled",
    name: "fields__isSourceEnabled",
    type: "array",
    description: "Enable source field",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Stages Enabled",
    name: "fields__isStagesEnabled",
    type: "array",
    description: "Enable stages",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Use in User Field Enabled",
    name: "fields__isUseInUserfieldEnabled",
    type: "array",
    description: "Allow usage in user fields",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Linked User Fields",
    name: "fields__linkedUserFields__CALENDAR_EVENT|UF_CRM_CAL_EVENT",
    type: "array",
    description: "Link calendar event user field",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Linked User Fields",
    name: "fields__linkedUserFields__TASKS_TASK|UF_CRM_TASK",
    type: "array",
    description: "Link task user field",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Relations - Parent",
    name: "fields__relations__parent||entityTypeId",
    type: "array",
    description: "Parent relation entity type ID",
    required: false,
    items: [],
    options: []
  },
  {
    displayName: "Relations - Child",
    name: "fields__relations__child||entityTypeId",
    type: "array",
    description: "Child relation entity type ID",
    required: false,
    items: [],
    options: []
  }
];






export const fields = [

  //  Company

  {
    displayName: "Title",
    name: "fields__title",
    type: "string",
    default: "",
    description: "Name of the title",
    items: [],
    required: true,
    options: [],
    displayOptions: {
      show: {
        category: ["company"],
        name: ["create", "update"]
      }
    }
  },
  {
    displayName: "Company Type",
    name: "fields__companytype",
    type: "collection",
    default: {},
    description: "Company type",
    items: [],
    required: false,
    options: [],
    displayOptions: {
      show: {
        category: ["company"],
        name: ["create", "update"]
      }
    },
  },
  {
    displayName: "Industry",
    name: "fields__industry",
    type: "collection",
    default: {},
    description: "tYpe of industry",
    items: [],
    required: false,
    options: [],
    displayOptions: {
      show: {
        category: ["company"],
        name: ["create", "update"]
      }
    },
  },
  {
    displayName: "Company Id",
    name: "id",
    type: "collection",
    default: {},
    description: "The unique identifier of the Company",
    items: [],
    required: false,
    options: [],
    displayOptions: {
      show: {
        category: ["company"],
        name: ["get", "update", "delete"]
      }
    },
  },
  {
    displayName: "GetMany company",
    name: "getMany",
    type: "boolean",
    default: {},
    items: [],
    required: false,
    options: [],
    async init(data) {
      try {

        const list = await bitrix.getAllCompany(data);
        this.options = list;
      } catch (error) {
        return ({ 'Error occurred': error });
      }
    },
    displayOptions: {
      show: {
        category: ["company"],
        name: ["getMany"]
      }
    },


  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    default: {},
    items: [],
    required: false,
    options: [],
    displayOptions: {
      show: {
        category: ["company"],
        name: ["create"]
      }
    },
    fields: additionalCompany
  },


  //  Contacts
  {
    displayName: "Industry",
    name: "fields__industry",
    type: "collection",
    default: {},
    description: "tYpe of industry",

    items: [],
    required: false,
    options: [],
    displayOptions: {
      show: {
        category: ["contact"],
        name: ["create"]
      }
    },
  },
  {
    displayName: "GetMany contacts",
    name: "getMany",
    type: "boolean",
    default: {},
    description: "",

    items: [],
    required: false,
    options: [],
    async init(data) {
      try {

        const list = await bitrix.getAllContact(data);
        this.options = list;
      } catch (error) {
        return ({ 'Error occurred': error });
      }
    },
    displayOptions: {
      show: {
        category: ["contact"],
        name: ["getMany"]
      }
    },


  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    default: {},
    description: "",

    items: [],
    required: false,
    options: [],
    displayOptions: {
      show: {
        category: ["contact"],
        name: ["create"]
      }
    },
    fields: additionalContact
  },

  //  Deals

  {
    displayName: "Title",
    name: "fields__title",
    type: "collection",
    default: {},
    description: "New value oif title",

    items: [],
    required: false,
    options: [],
    displayOptions: {
      show: {
        category: ["deal"],
        name: ["create","update"]
      }
    },
  },
  {
    displayName: "Deals Id",
    name: "id",
    type: "collection",
    description: "The unique identifier of the deals",
    default: {},
    items: [],
    required: false,
    options: [],
    displayOptions: {
      show: {
        category: ["deal"],
        name: ["get","update","delete"]
      }
    },
  },
  {
    displayName: "GetMany deals",
    name: "getMany",
    type: "boolean",
    description: "Return All",
    default: {},
    items: [],
    required: false,
    options: [],
    async init(data) {
      try {

        const list = await bitrix.getAllDeal(data);
        this.options = list;
      } catch (error) {
        return ({ 'Error occurred': error });
      }
    },
    displayOptions: {
      show: {
        category: ["deal"],
        name: ["getMany"]
      }
    },
  },

  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    default: {},
    items: [],
    required: false,
    options: [],
    displayOptions: {
      show: {
        category: ["deal"],
        name: ["create","update"]
      }
    },
    fields: additionalDeal
  },

// leads

  {
    displayName: "Title",
    name: "fields__title",
    type: "array",
    description: "Title of the deal",
    required: true,
    items: [],
    options: [],
    displayOptions: {
      show: {
        category: ["lead"],
        name: ["create","update"]
      }
    },
  },
  
  {
    displayName: "Leads Id",
    name: "id",
    type: "array",
    description: "The unique identifier of the Leads",
    required: true,
    items: [],
    options: [],
    displayOptions: {
      show: {
        category: ["lead"],
        name: ["get","update","delete"]
      }
    },
  },

  {
    displayName: "GetMany lead",
    name: "getMany",
    type: "boolean",
    description: "Return All",
    default: {},
    items: [],
    required: false,
    options: [],
    async init(data) {
      try {

        const list = await bitrix.getAllLead(data);
        this.options = list;
      } catch (error) {
        return ({ 'Error occurred': error });
      }
    },
    displayOptions: {
      show: {
        category: ["lead"],
        name: ["getMany"]
      }
    },
  },


  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    default: {},
    items: [],
    required: false,
    options: [],
    displayOptions: {
      show: {
        category: ["lead"],
        name: ["create","update"]
      }
    },
    fields: additionalLead
  },

  
    {
      displayName: "Title",
      name: "fields__title",
      type: "array",
      description: "Name/title of the Smart Process",
      required: true,
      items: [],
      options: [],
      displayOptions: {
        show: {
          category: ["spa"],
          name: ["create","update"]
        }
      },
    },
    
    {
      displayName: "SPA ID",
      name: "Id",
      type: "array",
      description: "The unique identifier of the SPA ",
      required: true,
      items: [],
      options: [],
      displayOptions: {
        show: {
          category: ["spa"],
          name: ["get","update","delete"]
        }
      },
    },

    {
      displayName: "GetMany SPA",
      name: "getMany",
      type: "boolean",
      description: "Return All",
      default: {},
      items: [],
      required: false,
      options: [],
      async init(data) {
        try {
  
          const list = await bitrix.getAllSpa(data);
          this.options = list;
        } catch (error) {
          return ({ 'Error occurred': error });
        }
      },
      displayOptions: {
        show: {
          category: ["spa"],
          name: ["getMany"]
        }
      },
    },
  
    {
      displayName: "Additional Fields",
      name: "additionalFields",
      type: "collection",
      default: {},
      items: [],
      required: false,
      options: [],
      displayOptions: {
        show: {
          category: ["spa"],
          name: ["create","update"]
        }
      },
      fields: additionalSPA
    },
  ];
  




