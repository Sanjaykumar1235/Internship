// sinch.config.ts
// -----------------------------------------------------------------------------
// AUTO-GENERATED CONFIGURATION FILE.
// DO NOT modify the sections labeled "AUTO-GENERATED".
//
// Copyright (c) 2025 Smackcoders. All rights reserved.
// This file is subject to the Smackcoders Proprietary License.
// Unauthorized copying or distribution is strictly prohibited.
// -----------------------------------------------------------------------------

import { sinch } from "./sinch.controller";

export const XappName = "sinch";
export const modules = [
    {
        "module": "contact",
        "actions": [
            "create",
            "get",
            "update",
            "getMany",
            "delete"
        ],
        "triggers": []
    },
    {
        "module": "message",
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

const additioncontacts = [
    {

        displayName: " Channel Priority",
        name: "channel_priority",
        type: "string",
        description: "",
        default: "",
        items: [],
        required: false,


    },
    {

        displayName: " Display Name",
        name: "display_name",
        type: "string",
        description: "",
        default: "",
        items: [],
        required: false,


    },
    {

        displayName: " Email",
        name: "email",
        type: "string",
        description: "",
        default: "",
        items: [],
        required: false,


    },
    {

        displayName: " External Id",
        name: "external_id",
        type: "string",
        description: "",
        default: "",
        items: [],
        required: false,


    },
    {

        displayName: "Metadata",
        name: "metadata",
        type: "string",
        description: "",
        default: "",
        items: [],
        required: false,


    },

]

const additionalmessages = [

    {

        displayName: "Callback Url",
        name: "callback_url",
        type: "string",
        description: "",
        default: "",
        items: [],
        required: false,


    },
    {

        displayName: "Channel Priority Order",
        name: "channel_priority_order",
        type: "string",
        description: "",
        default: "",
        items: [],
        required: false,


    },
    {

        displayName: "Channel Properties",
        name: "channel_properties",
        type: "string",
        description: "",
        default: "",
        items: [],
        required: false,


    },
    {

        displayName: "Property Name",
        name: "channel_properties__property name",
        type: "string",
        description: "",
        default: "",
        items: [],
        required: false,


    },
    {

        displayName: "Message Metadata",
        name: "message_metadata",
        type: "string",
        description: "",
        default: "",
        items: [],
        required: false,


    },
    {

        displayName: "Conversation Metadata",
        name: "conversation_metadata",
        type: "string",
        description: "",
        default: "",
        items: [],
        required: false,


    },

    {

        displayName: "Queue",
        name: "queue",
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
    {

        displayName: "Processing Strategy",
        name: "processing_strategy",
        type: "string",
        description: "",
        default: "",
        items: [],
        required: false,


    },
    {

        displayName: "Correlation Id",
        name: "correlation_id",
        type: "string",
        description: "",
        default: "",
        items: [],
        required: false,


    },
    {

        displayName: "Conversation Metadata Update Strategy",
        name: "conversation_metadata_update_strategy",
        type: "string",
        description: "",
        default: "",
        items: [],
        required: false,


    },
    {

        displayName: "Message Content Type",
        name: "message_content_type",
        type: "string",
        description: "",
        default: "",
        items: [],
        required: false,


    },
    {

        displayName: "Processing Strategy",
        name: "processing_strategy",
        type: "string",
        description: "",
        default: "",
        items: [],
        required: false,


    },



]




export const fields = [


    {
        displayName: " channel Identities",
        name: "channel_identities||channel",
        type: "string",
        description: "SMS",
        default: "",
        items: [],
        required: true,
        displayOptions: {
            show: {
                category: ["contact"],
                name: ["create", "update"],
            },
        },
    },
    {
        displayName: "channel Identities",
        name: "channel_identities||identity",
        type: "string",
        description: "Phone number of the new users",
        default: "",
        items: [],
        required: true,
        displayOptions: {
            show: {
                category: ["contact"],
                name: ["create", "update"],
            },
        },
    },
    {
        displayName: "Language",
        name: "language",
        type: "string",
        description: "",
        default: "",
        items: [],
        required: true,
        displayOptions: {
            show: {
                category: ["contact"],
                name: ["create"],
            },
        },
    },

    {
        displayName: "Contact Id",
        name: "contact_id",
        type: "string",
        description: "The unique identifier of the contact",
        default: "",
        items: [],
        required: true,
        displayOptions: {
            show: {
                category: ["contact"],
                name: ["get", "update", "delete"],
            },
        },
    },

    {
        displayName: "Get Many contact",
        name: "getMany",
        type: "string",
        description: "Retrieve multiple contacts.",
        default: "",
        items: [],
        options: [],
        async init(data) {
            try {
                const options = await sinch.getAllContact(data);
                this.options = options;
            } catch (error) {
                console.error("Error occurred:", error + error.stack);
            }
        },
        required: false,
        displayOptions: {
            show: {
                category: ["contacts"],
                name: ["getMany"],
            },
        },
    },
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
                category: ["contact"],
                name: ["create"],
            },
        },
        fields: additioncontacts
    },



    //          Messages

    {
        displayName: "App Id",
        name: "app_id",
        type: "string",
        description: "The unique identifier of the app",
        default: "",
        items: [],
        required: true,
        displayOptions: {
            show: {
                category: ["message"],
                name: ["create"],
            },
        },
    },
    {
        displayName: "Recipient",
        name: "recipient__contact_id",
        type: "string",
        description: "The unique identifier of the contact",
        default: "",
        items: [],
        required: true,
        displayOptions: {
            show: {
                category: ["message"],
                name: ["create"],
            },
        },
    },
    {
        displayName: "Message",
        name: "message__text_message__text",
        type: "string",
        description: "This is a text message",
        default: "",
        items: [],
        required: true,
        displayOptions: {
            show: {
                category: ["message"],
                name: ["create"],
            },
        },
    },
    {
        displayName: "Message Id",
        name: "messageid",
        type: "string",
        description: "The unique identifier of the message",
        default: "",
        items: [],
        required: true,
        displayOptions: {
            show: {
                category: ["message"],
                name: ["get", "update", "delete"],
            },
        },
    },
    {
        displayName: "Metadata",
        name: "metadata",
        type: "string",
        description: "New value for meta data",
        default: "",
        items: [],
        required: true,
        displayOptions: {
            show: {
                category: ["message"],
                name: ["update"],
            },
        },
    },
    {
        displayName: "Get Many messages",
        name: "getMany",
        type: "string",
        description: "Retrieve multiple messages.",
        default: "",
        items: [],
        options: [],
        async init(data) {
            try {
                const options = await sinch.getALlMessage(data);
                this.options = options;
            } catch (error) {
                console.error("Error occurred:", error + error.stack);
            }
        },
        required: false,
        displayOptions: {
            show: {
                category: ["message"],
                name: ["getMany"],
            },
        },
    },

    {
        displayName: "AdditionalFields",
        name: "additionfields",
        type: "string",
        description: "",
        default: "",
        items: [],
        required: true,
        displayOptions: {
            show: {
                category: ["message"],
                name: ["create"],
            },
        },
        fields: additionalmessages
    },


]
