// chative .config.ts
// -----------------------------------------------------------------------------
// AUTO-GENERATED CONFIGURATION FILE.
// DO NOT modify the sections labeled "AUTO-GENERATED".
//
// Copyright (c) 2025 Smackcoders. All rights reserved.
// This file is subject to the Smackcoders Proprietary License.
// Unauthorized copying or distribution is strictly prohibited.
// -----------------------------------------------------------------------------

export const XappName = "Chative ";
export const modules = [
  {
    "module": "contacts",
    "actions": [
      "update",
      "get",
      "getMany",
      "delete"
    ],
    "triggers": [
      "contacts"
    ]
  }
];

export default {
  XappName,
  modules,
};


const additionalContacts=[
    {

    displayName: "Some custom fields",
    name: "some_custom_fields",
    type: "string",
    description: "",
    default: "",
    items: [],
    required: false,
  },
]

export const fields = [

  //                    SMS

{
  displayName: "FirstName",
  name: "firstName",
  type: "string",
  description: "first name of the user",
  default: "",
  items: [],
  required: true,
  displayOptions: {
    show: {
      category: ["contacts"],
      name: ["update"]
    }
  }
},
{
  displayName: "LastName",
  name: "lastName",
  type: "string",
  description: "last name of the user",
  default: "",
  items: [],
  required: true,
  displayOptions: {
    show: {
      category: ["contacts"],
      name: ["update"]
    }
  }
},
{
  displayName: "Email",
  name: "email",
  type: "string",
  description: "Email for the users",
  default: "",
  items: [],
  required: true,
  displayOptions: {
    show: {
      category: ["contacts"],
      name: ["update"]
    }
  }
},
{
  displayName: "Gender",
  name: "gender",
  type: "string",
  description: "User gender",
  default: "",
  items: [],
  required: true,
  displayOptions: {
    show: {
      category: ["contacts"],
      name: ["update"]
    }
  }
},
{
  displayName: "Phone",
  name: "phone",
  type: "string",
  description: "Phone number of the user",
  default: "",
  items: [],
  required: true,
  displayOptions: {
    show: {
      category: ["contacts"],
      name: ["update"]
    }
  }
},
{
  displayName: "Birthday",
  name: "birthday",
  type: "string",
  description: "User birthday ",
  default: "",
  items: [],
  required: true,
  displayOptions: {
    show: {
      category: ["contacts"],
      name: ["update"]
    }
  }
},
{
  displayName: "Conatct Id",
  name: "id",
  type: "string",
  description: "The unique identifier of the cantact ",
  default: "",
  items: [],
  required: true,
  displayOptions: {
    show: {
      category: ["contacts"],
      name: ["update","get","delete"]
    }
  }
},
{
  displayName: "Additionalfields",
  name: "additionfields",
  type: "string",
  description: "",
  default: "",
  items: [],
  required: true,
  displayOptions: {
    show: {
      category: ["contacts"],
      name: ["update"]
    }
  },
  fileds:additionalContacts

},



]
