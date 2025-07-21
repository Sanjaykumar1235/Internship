// zohobooks.config.ts
// -----------------------------------------------------------------------------
// AUTO-GENERATED CONFIGURATION FILE.
// DO NOT modify the sections labeled "AUTO-GENERATED".
//
// Copyright (c) 2025 Smackcoders. All rights reserved.
// This file is subject to the Smackcoders Proprietary License.
// Unauthorized copying or distribution is strictly prohibited.
// -----------------------------------------------------------------------------

import { zohobooks } from "./zohobooks.controller";

export const XappName = "ZohoBooks";
export const modules = [
  {
    "module": "customers",
    "actions": [
      "create",
      "update",
      "get",
      "getMany",
      "delete"
    ],
    "triggers": [
      "new_customers",
      "updated_customers"
    ]
  },
  {
    "module": "quotes",
    "actions": [
      "create",
      "update",
      "get",
      "getMany",
      "delete"
    ],
    "triggers": [
      "new_quotes",
      "updated_quotes"
    ]
  },
  {
    "module": "items",
    "actions": [
      "create",
      "get",
      "getMany",
      "update",
      "delete"
    ],
    "triggers": [
      "new_item"
    ]
  },
  {
    "module": "invoices",
    "actions": [
      "create",
      "get",
      "getMany",
      "update",
      "delete"
    ],
    "triggers": [
      "new_invoice",
      "updated_invoice"
    ]
  },
  {
    "module": "salesorders",
    "actions": [
      "create",
      "get",
      "getMany",
      "update",
      "delete"
    ],
    "triggers": [
      "new_salesorder",
      "updated_salesorder"
    ]
  },
  {
    "module": "vendors",
    "actions": [
      "create",
      "get",
      "getMany",
      "update",
      "delete"
    ],
    "triggers": [
      "new_vendors",
      "updated_vendors"
    ]
  },
  {
    "module": "expenses",
    "actions": [
      "create",
      "get",
      "getMany",
      "update",
      "delete"
    ],
    "triggers": [
      "new_expenses",
      "updated_expenses"
    ]
  },
  {
    "module": "recurring-expenses",
    "actions": [
      "create",
      "get",
      "getMany",
      "update",
      "delete"
    ],
    "triggers": [
      "new_recurringexpenses",
      "updated_recurringexpenses"
    ]
  },
  {
    "module": "purchaseorders",
    "actions": [
      "create",
      "get",
      "getMany",
      "update",
      "delete"
    ],
    "triggers": [
      "new_purchaseOrders",
      "updated_purchaseOrders"
    ]
  },
  {
    "module": "bills",
    "actions": [
      "create",
      "get",
      "getMany",
      "update",
      "delete"
    ],
    "triggers": [
      "new_bills",
      "updated_bills"
    ]
  },
  {
    "module": "recurring-bills",
    "actions": [
      "create",
      "get",
      "getMany",
      "update",
      "delete"
    ],
    "triggers": [
      "new_recurringbills",
      "updated_recurringbills"
    ]
  },
  {
    "module": "vendor-credits",
    "actions": [
      "create",
      "get",
      "getMany",
      "update",
      "delete"
    ],
    "triggers": [
      "new_vendorCredits",
      "updated_vendorCredits"
    ]
  },

];

export default {
  XappName,
  modules,
};

const additionalcontact=[
  {
    displayName: "Company Name",
    name: "company_name",
    type: "string",
    description: "Name of the company",
    default: "",
    items: [],
    required: false,
   

  },
  {
    displayName: "Website",
    name: "website",
    type: "string",
    description: "Website URL of the company",
    default: "",
   
    items: [],
    required: false,

  },
  {
    displayName: "Language Code",
    name: "language_code",
    type: "string",
    description: "Language code for the company profile",
    items: [],
    required: false,
    default: ""

  },
  {
    displayName: "Contact Type",
    name: "contact_type",
    type: "string",
    description: "Type of contact",
    items: [],
    required: false,
    default: "",

  },
  {
    displayName: "Customer Sub Type",
    name: "customer_sub_type",
    type: "string",
    description: "Subtype of the customer",
    items: [],
    required: false,
    default: "",

  },
  {
    displayName: "Credit Limit",
    name: "credit_limit",
    type: "number",
    description: "Credit limit assigned to the customer",
    items: [],
    required: false,
    default: "",

  },
  {
    displayName: "Tag ID",
    name: "tags||tag_id",
    type: "number",
    description: "Unique identifier for the tag",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "Tag Option ID",
    name: "tags||tag_option_id",
    type: "number",
    description: "Identifier for the selected tag option",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "Billing Attention",
    name: "billing_address__attention",
    type: "string",
    description: "Attention person for billing address",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "Billing Address",
    name: "billing_address__address",
    type: "string",
    description: "Primary billing address",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "Billing Street 2",
    name: "billing_address__street2",
    type: "string",
    description: "Secondary street for billing address",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "Billing State Code",
    name: "billing_address__state_code",
    type: "string",
    description: "State code for billing address",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "Billing City",
    name: "billing_address__city",
    type: "string",
    description: "City for billing address",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "Billing State",
    name: "billing_address__state",
    type: "string",
    description: "State for billing address",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "Billing ZIP",
    name: "billing_address__zip",
    type: "string",
    description: "ZIP code for billing address",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "Billing Country",
    name: "billing_address__country",
    type: "string",
    description: "Country for billing address",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "Billing Fax",
    name: "billing_address__fax",
    type: "string",
    description: "Fax number for billing address",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "Billing Phone",
    name: "billing_address__phone",
    type: "string",
    description: "Phone number for billing address",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "Shipping Attention",
    name: "shipping_address__attention",
    type: "string",
    description: "Attention person for shipping address",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "Shipping Address",
    name: "shipping_address__address",
    type: "string",
    description: "Primary shipping address",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "Shipping Street 2",
    name: "shipping_address__street2",
    type: "string",
    description: "Secondary street for shipping address",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "Shipping State Code",
    name: "shipping_address__state_code",
    type: "string",
    description: "State code for shipping address",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "Shipping City",
    name: "shipping_address__city",
    type: "string",
    description: "City for shipping address",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "Shipping State",
    name: "shipping_address__state",
    type: "string",
    description: "State for shipping address",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "Shipping ZIP",
    name: "shipping_address__zip",
    type: "string",
    description: "ZIP code for shipping address",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "Shipping Country",
    name: "shipping_address__country",
    type: "string",
    description: "Country for shipping address",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "Shipping Fax",
    name: "shipping_address__fax",
    type: "string",
    description: "Fax number for shipping address",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "Shipping Phone",
    name: "shipping_address__phone",
    type: "string",
    description: "Phone number for shipping address",
    default: "",
    items: [],
    required: false
  },
   {
        displayName: "Custom Field Index",
        name: "custom_fields||index",
        type: "string",
        description: "Index of the custom field",
        default: "",
        items: [],
        required: false
      },
      {
        displayName: "Custom Field Value",
        name: "custom_fields||value",
        type: "string",
        description: "Value of the custom field",
        default: "",
        items: [],
        required: false
      },
      {
        displayName: "Opening Balance Location ID",
        name: "opening_balances||location_id",
        type: "string",
        description: "Location ID for the opening balance",
        default: "",
        items: [],
        required: false
      },
      {
        displayName: "Opening Balance Exchange Rate",
        name: "opening_balances||exchange_rate",
        type: "string",
        description: "Exchange rate used for the opening balance",
        default: "",
        items: [],
        required: false
      },
      {
        displayName: "Opening Balance Amount",
        name: "opening_balances||opening_balance_amount",
        type: "string",
        description: "Amount of the opening balance",
        default: "",
        items: [],
        required: false
      },
  {
    displayName: "VAT Registration Number",
    name: "vat_reg_no",
    type: "string",
    description: "VAT registration number",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "Owner ID",
    name: "owner_id",
    type: "number",
    description: "Unique identifier for the owner",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "Tax Registration Number",
    name: "tax_reg_no",
    type: "string",
    description: "Tax registration number",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "Tax Exemption Certificate Number",
    name: "tax_exemption_certificate_number",
    type: "string",
    description: "Certificate number for tax exemption",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "Country Code",
    name: "country_code",
    type: "string",
    description: "ISO country code",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "VAT Treatment",
    name: "vat_treatment",
    type: "string",
    description: "VAT treatment category",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "Tax Treatment",
    name: "tax_treatment",
    type: "string",
    description: "Tax treatment category",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "Tax Regime",
    name: "tax_regime",
    type: "string",
    description: "Tax regime applied",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "Legal Name",
    name: "legal_name",
    type: "string",
    description: "Legal name of the entity",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "Is TDS Registered",
    name: "is_tds_registered",
    type: "boolean",
    description: "Whether TDS is registered",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "Place of Contact",
    name: "place_of_contact",
    type: "string",
    description: "Place or region of contact",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "GST Number",
    name: "gst_no",
    type: "string",
    description: "GST number",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "GST Treatment",
    name: "gst_treatment",
    type: "string",
    description: "GST treatment category",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "Tax Authority Name",
    name: "tax_authority_name",
    type: "string",
    description: "Name of the tax authority",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "AvaTax Exempt Number",
    name: "avatax_exempt_no",
    type: "string",
    description: "AvaTax exemption number",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "AvaTax Use Code",
    name: "avatax_use_code",
    type: "string",
    description: "AvaTax usage code",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "Tax Exemption ID",
    name: "tax_exemption_id",
    type: "number",
    description: "Unique ID for tax exemption",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "Tax Exemption Code",
    name: "tax_exemption_code",
    type: "string",
    description: "Code for tax exemption",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "Tax Authority ID",
    name: "tax_authority_id",
    type: "number",
    description: "ID of the tax authority",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "Tax ID",
    name: "tax_id",
    type: "number",
    description: "Tax identification number",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "TDS Tax ID",
    name: "tds_tax_id",
    type: "string",
    description: "TDS tax identification number",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "Is Taxable",
    name: "is_taxable",
    type: "boolean",
    description: "Indicates if the entity is taxable",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "Facebook",
    name: "facebook",
    type: "string",
    description: "Facebook handle or URL",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "Twitter",
    name: "twitter",
    type: "string",
    description: "Twitter handle or URL",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "Track 1099",
    name: "track_1099",
    type: "boolean",
    description: "Whether to track for 1099",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "Tax ID Type",
    name: "tax_id_type",
    type: "string",
    description: "Type of the tax ID",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "Tax ID Value",
    name: "tax_id_value",
    type: "string",
    description: "Value of the tax ID",
    default: "",
    items: [],
    required: false
  }
  
  
]

const additionalSales=[
  {
    displayName: "Notes",
    name: "notes",
    type: "string",
    description: "Additional notes",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "Terms",
    name: "terms",
    type: "string",
    description: "Terms and conditions",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "Billing Address ID",
    name: "billing_address_id",
    type: "number",
    description: "ID of the billing address",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "Shipping Address ID",
    name: "shipping_address_id",
    type: "string",
    description: "ID of the shipping address",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "CRM Owner ID",
    name: "crm_owner_id",
    type: "string",
    description: "CRM owner ID",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "CRM Custom Reference ID",
    name: "crm_custom_reference_id",
    type: "string",
    description: "Custom reference ID in CRM",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "VAT Treatment",
    name: "vat_treatment",
    type: "string",
    description: "VAT treatment for the customer",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "Tax Treatment",
    name: "tax_treatment",
    type: "string",
    description: "Tax treatment status",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "Is Reverse Charge Applied",
    name: "is_reverse_charge_applied",
    type: "boolean",
    description: "Indicates if reverse charge is applied",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "Sales Order Number",
    name: "salesorder_number",
    type: "string",
    description: "Sales order number",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "Reference Number",
    name: "reference_number",
    type: "string",
    description: "Reference number",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "Is Update Customer",
    name: "is_update_customer",
    type: "boolean",
    description: "Whether customer details should be updated",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "Discount",
    name: "discount",
    type: "string",
    description: "Discount amount or percentage",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "Exchange Rate",
    name: "exchange_rate",
    type: "number",
    description: "Currency exchange rate",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "Salesperson Name",
    name: "salesperson_name",
    type: "string",
    description: "Name of the salesperson",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "Default Notes",
    name: "notes_default",
    type: "string",
    description: "Default notes used in the document",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "Default Terms",
    name: "terms_default",
    type: "string",
    description: "Default terms and conditions",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "Tax ID",
    name: "tax_id",
    type: "string",
    description: "Tax ID associated with the transaction",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "Tax Authority ID",
    name: "tax_authority_id",
    type: "string",
    description: "Tax authority identifier",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "Tax Exemption ID",
    name: "tax_exemption_id",
    type: "string",
    description: "Identifier for tax exemption",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "Tax Authority Name",
    name: "tax_authority_name",
    type: "string",
    description: "Name of the tax authority",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "Tax Exemption Code",
    name: "tax_exemption_code",
    type: "string",
    description: "Code for the tax exemption",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "AvaTax Exempt Number",
    name: "avatax_exempt_no",
    type: "string",
    description: "AvaTax exemption number",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "AvaTax Use Code",
    name: "avatax_use_code",
    type: "string",
    description: "AvaTax use code",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "Shipping Charge",
    name: "shipping_charge",
    type: "number",
    description: "Additional shipping charges",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "Adjustment",
    name: "adjustment",
    type: "number",
    description: "Adjustment to the total",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "Delivery Method",
    name: "delivery_method",
    type: "string",
    description: "Method of delivery",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "Estimate ID",
    name: "estimate_id",
    type: "string",
    description: "Associated estimate ID",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "Is Discount Before Tax",
    name: "is_discount_before_tax",
    type: "boolean",
    description: "True if discount applies before tax",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "Discount Type",
    name: "discount_type",
    type: "string",
    description: "Type of discount (e.g., entity_level)",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "Adjustment Description",
    name: "adjustment_description",
    type: "string",
    description: "Description of the adjustment",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "Pricebook ID",
    name: "pricebook_id",
    type: "string",
    description: "ID of the pricebook used",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "Template ID",
    name: "template_id",
    type: "string",
    description: "Template ID used for the document",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "ZCRM Potential ID",
    name: "zcrm_potential_id",
    type: "string",
    description: "Zoho CRM potential ID",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "ZCRM Potential Name",
    name: "zcrm_potential_name",
    type: "string",
    description: "Zoho CRM potential name",
    default: "",
    items: [],
    required: false
  },
  
      {
        displayName: "Item Order",
        name: "line_items||item_order",
        type: "number",
        default: 0,
        required: false
      },
      {
        displayName: "Item ID",
        name: "line_items||item_id",
        type: "string",
        default: "",
        required: false
      },
      {
        displayName: "Rate",
        name: "line_items||rate",
        type: "number",
        default: 0,
        required: false
      },
      {
        displayName: "Name",
        name: "line_items||name",
        type: "string",
        default: "",
        required: false
      },
      {
        displayName: "Description",
        name: "line_items||description",
        type: "string",
        default: "",
        required: false
      },
      {
        displayName: "Quantity",
        name: "line_items||quantity",
        type: "number",
        default: 0,
        required: false
      },
      {
        displayName: "Product Type",
        name: "line_items||product_type",
        type: "string",
        default: "",
        required: false
      },
      {
        displayName: "HSN or SAC",
        name: "line_items||hsn_or_sac",
        type: "number",
        default: 0,
        required: false
      },
      {
        displayName: "SAT Item Key Code",
        name: "line_items||sat_item_key_code",
        type: "number",
        default: 0,
        required: false
      },
      {
        displayName: "Unit Key Code",
        name: "line_items||unitkey_code",
        type: "string",
        default: "",
        required: false
      },
      {
        displayName: "Location ID",
        name: "line_items||location_id",
        type: "string",
        default: "",
        required: false
      },
      {
        displayName: "Discount",
        name: "line_items||discount",
        type: "string",
        default: "",
        required: false
      },
      {
        displayName: "Tax ID",
        name: "line_items||tax_id",
        type: "string",
        default: "",
        required: false
      },
      {
        displayName: "TDS Tax ID",
        name: "line_items||tds_tax_id",
        type: "string",
        default: "",
        required: false
      },
   {
            displayName: "Tag ID",
            name: "line_items||tags||tag_id",
            type: "number",
            default: 0,
            required: false
          },
          {
            displayName: "Tag Option ID",
            name: "line_items||tags||tag_option_id",
            type: "number",
            default: 0,
            required: false
          },
   {
        displayName: "Unit",
        name: "line_items||unit",
        type: "string",
        default: "",
        required: false
      },
   {
            displayName: "Custom Field ID",
            name: "line_items||item_custom_fields||customfield_id",
            type: "string",
            default: "",
            required: false
          },
          {
            displayName: "Value",
            name: "line_items||item_custom_fields||value",
            type: "string",
            default: "",
            required: false
          },
   {
        displayName: "Tax Exemption ID",
        name: "line_items||tax_exemption_id",
        type: "string",
        default: "",
        required: false
      },
      {
        displayName: "Tax Exemption Code",
        name: "line_items||tax_exemption_code",
        type: "string",
        default: "",
        required: false
      },
      {
        displayName: "Tax Treatment Code",
        name: "line_items||tax_treatment_code",
        type: "string",
        default: "",
        required: false
      },
      {
        displayName: "AvaTax Exempt No",
        name: "line_items||avatax_exempt_no",
        type: "string",
        default: "",
        required: false
      },
      {
        displayName: "AvaTax Use Code",
        name: "line_items||avatax_use_code",
        type: "string",
        default: "",
        required: false
      },
      {
        displayName: "Project ID",
        name: "line_items||project_id",
        type: "number",
        default: 0,
        required: false
      },
  {
    displayName: "Place of Supply",
    name: "place_of_supply",
    type: "string",
    description: "Place of supply",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "Salesperson ID",
    name: "salesperson_id",
    type: "string",
    description: "ID of the salesperson",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "Merchant ID",
    name: "merchant_id",
    type: "string",
    description: "ID of the merchant",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "GST Treatment",
    name: "gst_treatment",
    type: "string",
    description: "GST treatment type",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "GST Number",
    name: "gst_no",
    type: "string",
    description: "GST number",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "Is Inclusive Tax",
    name: "is_inclusive_tax",
    type: "boolean",
    description: "Whether tax is inclusive",
    default: false,
    items: [],
    required: false
  },
  {
    displayName: "Location ID",
    name: "location_id",
    type: "string",
    description: "Location identifier",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "Currency ID",
    name: "currency_id",
    type: "string",
    description: "Currency identifier",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "Contact Persons",
    name: "contact_persons",
    type: "array",
    description: "List of contact person IDs",
    default: [],
    items: [
      {
        type: "string"
      }
    ],
    required: false
  },
  
]

const additionalitems=[
   {
    "displayName": "Location ID",
    "name": "locations||location_id",
    "type": "string",
    "default": "",
    "required": true,
    "description": "Unique identifier for the location."
  },
  {
    "displayName": "Initial Stock",
    "name": "locations||initial_stock",
    "type": "string",
    "default": "",
    "required": false,
    "description": "Initial quantity of stock at the location."
  },
  {
    "displayName": "Initial Stock Rate",
    "name": "locations||initial_stock_rate",
    "type": "string",
    "default": "",
    "required": false,
    "description": "Rate applied to the initial stock at the location."
  },
  {
    "displayName": "Purchase Tax Rule ID",
    "name": "purchase_tax_rule_id",
    "type": "number",
    "default": "",
    "required": false,
    "description": "Identifier for the tax rule applied on purchases."
  },
  {
    "displayName": "Sales Tax Rule ID",
    "name": "sales_tax_rule_id",
    "type": "number",
    "default": "",
    "required": false,
    "description": "Identifier for the tax rule applied on sales."
  },
  {
    "displayName": "Tax Percentage",
    "name": "tax_percentage",
    "type": "string",
    "default": "",
    "required": false,
    "description": "Tax rate applied, expressed as a percentage."
  },
  {
    "displayName": "SKU",
    "name": "sku",
    "type": "string",
    "default": "",
    "required": false,
    "description": "Stock Keeping Unit - unique product identifier."
  },
  {
    "displayName": "Product Type",
    "name": "product_type",
    "type": "string",
    "default": "goods",
    "required": false,
    "description": "Type of product, e.g., goods or services."
  },
  {
    "displayName": "HSN or SAC",
    "name": "hsn_or_sac",
    "type": "string",
    "default": "",
    "required": false,
    "description": "Harmonized System of Nomenclature (HSN) or Services Accounting Code (SAC)."
  },
  {
    "displayName": "SAT Item Key Code",
    "name": "sat_item_key_code",
    "type": "string",
    "default": "",
    "required": false,
    "description": "SAT item key code used for tax classification."
  },
  {
    "displayName": "Unit Key Code",
    "name": "unitkey_code",
    "type": "string",
    "default": "",
    "required": false,
    "description": "Code representing the unit of measure."
  },
  {
    "displayName": "Is Taxable",
    "name": "is_taxable",
    "type": "boolean",
    "default": true,
    "required": false,
    "description": "Indicates if the item is subject to tax."
  },
  {
    "displayName": "Tax Exemption ID",
    "name": "tax_exemption_id",
    "type": "string",
    "default": "",
    "required": false,
    "description": "Identifier for any applicable tax exemption."
  },
  {
    "displayName": "Purchase Tax Exemption ID",
    "name": "purchase_tax_exemption_id",
    "type": "string",
    "default": "",
    "required": false,
    "description": "Identifier for purchase-specific tax exemption."
  },
  {
    "displayName": "Account ID",
    "name": "account_id",
    "type": "string",
    "default": " ",
    "required": false,
    "description": "Associated account identifier."
  },
  {
    "displayName": "Avatax Tax Code",
    "name": "avatax_tax_code",
    "type": "number",
    "default": "",
    "required": false,
    "description": "Avalara tax code for this item."
  },
  {
    "displayName": "Avatax Use Code",
    "name": "avatax_use_code",
    "type": "number",
    "default": "",
    "required": false,
    "description": "Avalara use code for tax exemption purposes."
  },
  {
    "displayName": "Item Type",
    "name": "item_type",
    "type": "string",
    "default": " ",
    "required": false,
    "description": "Type classification of the item."
  },
  {
    "displayName": "Purchase Description",
    "name": "purchase_description",
    "type": "string",
    "default": " ",
    "required": false,
    "description": "Description used when purchasing the item."
  },
  {
    "displayName": "Purchase Rate",
    "name": "purchase_rate",
    "type": "string",
    "default": " ",
    "required": false,
    "description": "Rate or cost for purchasing the item."
  },
  {
    "displayName": "Purchase Account ID",
    "name": "purchase_account_id",
    "type": "string",
    "default": " ",
    "required": false,
    "description": "Account ID linked to purchase transactions."
  },
  {
    "displayName": "Inventory Account ID",
    "name": "inventory_account_id",
    "type": "string",
    "default": " ",
    "required": false,
    "description": "Account ID linked to inventory management."
  },
  {
    "displayName": "Vendor ID",
    "name": "vendor_id",
    "type": "string",
    "default": " ",
    "required": false,
    "description": "Identifier of the vendor supplying the item."
  },
  {
    "displayName": "Reorder Level",
    "name": "reorder_level",
    "type": "string",
    "default": " ",
    "required": false,
    "description": "Stock quantity threshold for reorder alerts."
  }
]

const additionalinvoive=[
   {
    "displayName": "Invoice Number",
    "name": "invoice_number",
    "type": "string",
    "default": "",
    "required": false,
    "description": "Unique number assigned to the invoice.",
    "items": []
  },
  {
    "displayName": "Place of Supply",
    "name": "place_of_supply",
    "type": "string",
    "default": "",
    "required": false,
    "description": "Location where the supply is made.",
    "items": []
  },
  {
    "displayName": "VAT Treatment",
    "name": "vat_treatment",
    "type": "string",
    "default": "",
    "required": false,
    "description": "VAT treatment applicable to the transaction.",
    "items": []
  },
  {
    "displayName": "Tax Treatment",
    "name": "tax_treatment",
    "type": "string",
    "default": "",
    "required": false,
    "description": "Tax treatment status of the customer.",
    "items": []
  },
  {
    "displayName": "Is Reverse Charge Applied",
    "name": "is_reverse_charge_applied",
    "type": "boolean",
    "default": false,
    "required": false,
    "description": "Indicates whether reverse charge is applied.",
    "items": []
  },
  {
    "displayName": "GST Treatment",
    "name": "gst_treatment",
    "type": "string",
    "default": "",
    "required": false,
    "description": "GST treatment of the customer.",
    "items": []
  },
  {
    "displayName": "GST Number",
    "name": "gst_no",
    "type": "string",
    "default": "",
    "required": false,
    "description": "GST identification number.",
    "items": []
  },
  {
    "displayName": "CFDI Usage",
    "name": "cfdi_usage",
    "type": "string",
    "default": "",
    "required": false,
    "description": "Purpose of the invoice as per CFDI regulation.",
    "items": []
  },
  {
    "displayName": "Reference Number",
    "name": "reference_number",
    "type": "string",
    "default": "",
    "required": false,
    "description": "Optional reference number for the invoice.",
    "items": []
  },
  {
    "displayName": "Template ID",
    "name": "template_id",
    "type": "number",
    "default": "",
    "required": false,
    "description": "ID of the template used for the invoice.",
    "items": []
  },
  {
    "displayName": "Invoice Date",
    "name": "date",
    "type": "string",
    "default": "",
    "required": false,
    "description": "Date the invoice was created (YYYY-MM-DD).",
    "items": []
  },
  {
    "displayName": "Payment Terms",
    "name": "payment_terms",
    "type": "number",
    "default": "",
    "required": false,
    "description": "Number of days for payment due.",
    "items": []
  },
  {
    "displayName": "Payment Terms Label",
    "name": "payment_terms_label",
    "type": "string",
    "default": "",
    "required": false,
    "description": "Text label for payment terms (e.g., Net 15).",
    "items": []
  },
  {
    "displayName": "Due Date",
    "name": "due_date",
    "type": "string",
    "default": "",
    "required": false,
    "description": "Due date for invoice payment (YYYY-MM-DD).",
    "items": []
  },
  {
    "displayName": "Discount",
    "name": "discount",
    "type": "number",
    "default": 0,
    "required": false,
    "description": "Discount applied to the invoice.",
    "items": []
  },
  {
    "displayName": "Is Discount Before Tax",
    "name": "is_discount_before_tax",
    "type": "boolean",
    "default": false,
    "required": false,
    "description": "True if discount is applied before tax.",
    "items": []
  },
  {
    "displayName": "Discount Type",
    "name": "discount_type",
    "type": "string",
    "default": "",
    "required": false,
    "description": "Type of discount applied (e.g., item_level, entity_level).",
    "items": []
  },
  {
    "displayName": "Is Inclusive Tax",
    "name": "is_inclusive_tax",
    "type": "boolean",
    "default": false,
    "required": false,
    "description": "True if taxes are inclusive in line items.",
    "items": []
  },
  {
    "displayName": "Exchange Rate",
    "name": "exchange_rate",
    "type": "number",
    "default": 1,
    "required": false,
    "description": "Exchange rate used for currency conversion.",
    "items": []
  },
  {
    "displayName": "Location ID",
    "name": "location_id",
    "type": "string",
    "default": "",
    "required": false,
    "description": "ID representing the location associated with the invoice.",
    "items": []
  },
  {
    "displayName": "Recurring Invoice ID",
    "name": "recurring_invoice_id",
    "type": "string",
    "default": "",
    "required": false,
    "description": "ID of the recurring invoice if applicable.",
    "items": []
  },
  {
    "displayName": "Invoiced Estimate ID",
    "name": "invoiced_estimate_id",
    "type": "string",
    "default": "",
    "required": false,
    "description": "ID of the associated estimate if invoiced.",
    "items": []
  },
  {
    "displayName": "Salesperson Name",
    "name": "salesperson_name",
    "type": "string",
    "default": "",
    "required": false,
    "description": "Name of the salesperson linked to the invoice.",
    "items": []
  },
  {
        "displayName": "Custom Field ID",
        "name": "custom_fields__customfield_id",
        "type": "string",
        "default": "",
        "required": true,
        "description": "ID of the custom field.",
        "items": []
      },
      {
        "displayName": "Custom Field Value",
        "name": "custom_fields__value",
        "type": "string",
        "default": "",
        "required": true,
        "description": "Value of the custom field.",
        "items": []
      }
]

const additionalprojects=[
  {
    "displayName": "Currency ID",
    "name": "currency_id",
    "type": "string",
    "default": "",
    "required": false,
    "description": "Unique identifier of the currency used.",
    "items": []
  },
  {
    "displayName": "Description",
    "name": "description",
    "type": "string",
    "default": "",
    "required": false,
    "description": "Brief explanation about the distribution or purpose.",
    "items": []
  },
  {
    "displayName": "Rate",
    "name": "rate",
    "type": "string",
    "default": "",
    "required": false,
    "description": "Rate applicable to the item or user.",
    "items": []
  },
  {
    "displayName": "Budget Type",
    "name": "budget_type",
    "type": "string",
    "default": "",
    "required": false,
    "description": "Type of budget allocated.",
    "items": []
  },
  {
    "displayName": "Budget Hours",
    "name": "budget_hours",
    "type": "string",
    "default": "",
    "required": false,
    "description": "Allocated budget hours.",
    "items": []
  },
  {
    "displayName": "Budget Amount",
    "name": "budget_amount",
    "type": "string",
    "default": "",
    "required": false,
    "description": "Total budget amount allocated.",
    "items": []
  },
  {
    "displayName": "Cost Budget Amount",
    "name": "cost_budget_amount",
    "type": "string",
    "default": "",
    "required": false,
    "description": "Cost budget amount for the operation.",
    "items": []
  },
  {
    "displayName": "User ID",
    "name": "user_id",
    "type": "string",
    "default": "",
    "required": false,
    "description": "Identifier for the user assigned.",
    "items": []
  },
  {
    "displayName": "Task Name",
    "name": "tasks||task_name",
    "type": "string",
    "default": "",
    "required": false,
    "description": "Name of the task assigned to the user.",
    "items": []
  },
  {
    "displayName": "Task Description",
    "name": "tasks||description",
    "type": "string",
    "default": "",
    "required": false,
    "description": "Description of the task.",
    "items": []
  },
  {
    "displayName": "Task Rate",
    "name": "tasks||rate",
    "type": "string",
    "default": "",
    "required": false,
    "description": "Rate applicable for the task.",
    "items": []
  },
  {
    "displayName": "Task Budget Hours",
    "name": "tasks||budget_hours",
    "type": "string",
    "default": "",
    "required": false,
    "description": "Budgeted hours for the task.",
    "items": []
  },
  {
    "displayName": "User ID",
    "name": "users||user_id",
    "type": "string",
    "default": "",
    "required": false,
    "description": "Identifier for the user.",
    "items": []
  },
  {
    "displayName": "Is Current User",
    "name": "users||is_current_user",
    "type": "boolean",
    "default": "",
    "required": false,
    "description": "Flag to indicate if the user is the current user.",
    "items": []
  },
  {
    "displayName": "User Name",
    "name": "users||user_name",
    "type": "string",
    "default": "",
    "required": false,
    "description": "Name of the user.",
    "items": []
  },
  {
    "displayName": "Email",
    "name": "users||email",
    "type": "string",
    "default": "",
    "required": false,
    "description": "Email address of the user.",
    "items": []
  },
  {
    "displayName": "User Role",
    "name": "users||user_role",
    "type": "string",
    "default": "",
    "required": false,
    "description": "Role assigned to the user.",
    "items": []
  },
  {
    "displayName": "Status",
    "name": "users||status",
    "type": "string",
    "default": "",
    "required": false,
    "description": "Status of the user (active/inactive).",
    "items": []
  },
  {
    "displayName": "User Rate",
    "name": "users||rate",
    "type": "string",
    "default": "",
    "required": false,
    "description": "Rate applicable for the user.",
    "items": []
  },
  {
    "displayName": "User Budget Hours",
    "name": "users||budget_hours",
    "type": "string",
    "default": "",
    "required": false,
    "description": "Budgeted hours assigned to the user.",
    "items": []
  },
  {
    "displayName": "Total Hours",
    "name": "users||total_hours",
    "type": "string",
    "default": "",
    "required": false,
    "description": "Total hours logged by the user.",
    "items": []
  },
  {
    "displayName": "Billed Hours",
    "name": "users||billed_hours",
    "type": "string",
    "default": "",
    "required": false,
    "description": "Total billed hours for the user.",
    "items": []
  },
  {
    "displayName": "Unbilled Hours",
    "name": "users||un_billed_hours",
    "type": "string",
    "default": "",
    "required": false,
    "description": "Unbilled hours recorded for the user.",
    "items": []
  },
  {
    "displayName": "Cost Rate",
    "name": "users||cost_rate",
    "type": "string",
    "default": "",
    "required": false,
    "description": "Cost rate per hour for the user.",
    "items": []
  }
]


const additionalUsers=[

    {
  displayName: "Role Id",
  name: "role_id",
  type: "number",
  description: "Role id of create users",
  default: "",
  items: [],
  required: false
},
{
  displayName: "Cost Rate",
  name: "cost_rate",
  type: "string",
  description: "Hourly cost rate",
  default: "",
  items: [],
  required: false
},



]

const additionalexpenses=[
  {
  displayName: "Tax ID",
  name: "tax_id",
  type: "number",
  description: "Tax identifier",
  default: "",
  items: [],
  required: false
},
{
  displayName: "Destination of Supply",
  name: "destination_of_supply",
  type: "string",
  description: "Destination state of supply",
  default: "",
  items: [],
  required: false
},
{
  displayName: "Place of Supply",
  name: "place_of_supply",
  type: "string",
  description: "Place of supply",
  default: "",
  items: [],
  required: false
},
{
  displayName: "HSN or SAC",
  name: "hsn_or_sac",
  type: "number",
  description: "HSN or SAC code",
  default: "",
  items: [],
  required: false
},
{
  displayName: "GST No",
  name: "gst_no",
  type: "string",
  description: "GST number",
  default: "",
  items: [],
  required: false
},
{
  displayName: "Reverse Charge Tax ID",
  name: "reverse_charge_tax_id",
  type: "number",
  description: "Reverse charge tax ID",
  default: "",
  items: [],
  required: false
},
{
  displayName: "Location ID",
  name: "location_id",
  type: "string",
  description: "Location identifier",
  default: "",
  items: [],
  required: false
},
  {
   displayName: "Line Item ID",
    name: "line_items||line_item_id",
     type: "number",
     description:  "Unique identifier for the line item",
    default: "",
   items: [],
   required: false
  },
  {
   displayName: "Tax ID",
    name: "line_items||tax_id",
     type: "number",
     description:  "Applicable tax ID for the line item",
    default: "",
   items: [],
   required: false
  },
  {
   displayName: "Item Order",
    name: "line_items||item_order",
     type: "number",
     description:  "Order of the item in the list",
    default: "",
   items: [],
   required: false
  },
  {
   displayName: "Product Type",
    name: "line_items||product_type",
     type: "string",
     description:  "Type of product (e.g., goods or services)",
    default: "",
   items: [],
   required: false
  },
  {
   displayName: "Acquisition VAT ID",
    name: "line_items||acquisition_vat_id",
     type: "string",
     description:  "VAT ID used during acquisition (if applicable)",
    default: "",
   items: [],
   required: false
  },
  {
   displayName: "Reverse Charge VAT ID",
    name: "line_items||reverse_charge_vat_id",
     type: "string",
     description:  "VAT ID for reverse charge mechanism",
    default: "",
   items: [],
   required: false
  },
  {
   displayName: "Reverse Charge Tax ID",
    name: "line_items||reverse_charge_tax_id",
     type: "number",
     description:  "Tax ID used under reverse charge",
    default: "",
   items: [],
   required: false
  },
  {
   displayName: "Tax Exemption Code",
    name: "line_items||tax_exemption_code",
     type: "string",
     description:  "Code indicating reason for tax exemption",
    default: "",
   items: [],
   required: false
  },
  {
   displayName: "Tax Exemption ID",
    name: "line_items||tax_exemption_id",
     type: "number",
     description:  "Identifier for the tax exemption",
    default: "",
   items: [],
   required: false
  },
  {
   displayName: "Location ID",
    name: "line_items||location_id",
     type: "string",
     description:  "Location ID associated with the line item",
    default: "",
   items: [],
   required: false
  }
,
{
  displayName: "Tax ID",
  name: "taxes||tax_id",
  type: "number",
  default: "",
  required: false,
  description: "Unique identifier of the tax applicable to the item.",
  items: []
},
{
  displayName: "Tax Amount",
  name: "taxes||tax_amount",
  type: "number",
  default: "",
  required: false,
  description: "Amount of tax applied to the item.",
  items: []
},
{
  displayName: "Is Inclusive Tax",
  name: "is_inclusive_tax",
  type: "boolean",
  description: "Whether tax is inclusive",
  default: false,
  items: [],
  required: false
},
{
  displayName: "Is Billable",
  name: "is_billable",
  type: "boolean",
  description: "Whether the item is billable",
  default: true,
  items: [],
  required: false
},
{
  displayName: "Reference Number",
  name: "reference_number",
  type: "string",
  description: "Reference number",
  default: "",
  items: [],
  required: false
},
{
  displayName: "Description",
  name: "description",
  type: "string",
  description: "Description of the transaction",
  default: "",
  items: [],
  required: false
},
{
  displayName: "Customer ID",
  name: "customer_id",
  type: "number",
  description: "Customer identifier",
  default: "",
  items: [],
  required: false
},
{
  displayName: "Currency ID",
  name: "currency_id",
  type: "number",
  description: "Currency identifier",
  default: "",
  items: [],
  required: false
},
{
  displayName: "Exchange Rate",
  name: "exchange_rate",
  type: "number",
  description: "Currency exchange rate",
  default: 1,
  items: [],
  required: false
},
{
  displayName: "Project ID",
  name: "project_id",
  type: "number",
  description: "Associated project ID",
  default: "",
  items: [],
  required: false
},
{
  displayName: "Mileage Type",
  name: "mileage_type",
  type: "string",
  description: "Mileage type",
  default: "",
  items: [],
  required: false
},
{
  displayName: "VAT Treatment",
  name: "vat_treatment",
  type: "string",
  description: "VAT treatment type",
  default: "",
  items: [],
  required: false
},
{
  displayName: "Tax Treatment",
  name: "tax_treatment",
  type: "string",
  description: "Tax treatment",
  default: "",
  items: [],
  required: false
},
{
  displayName: "Product Type",
  name: "product_type",
  type: "string",
  description: "Type of product",
  default: "",
  items: [],
  required: false
},
{
  displayName: "Acquisition VAT ID",
  name: "acquisition_vat_id",
  type: "string",
  default: "",
  required: false
},
{
  displayName: "Reverse Charge VAT ID",
  name: "reverse_charge_vat_id",
  type: "string",
  default: "",
  required: false
},
{
  displayName: "Start Reading",
  name: "start_reading",
  type: "string",
  default: "",
  required: false
},
{
  displayName: "End Reading",
  name: "end_reading",
  type: "string",
  default: "",
  required: false
},
{
  displayName: "Distance",
  name: "distance",
  type: "string",
  default: "",
  required: false
},
{
  displayName: "Mileage Unit",
  name: "mileage_unit",
  type: "string",
  default: "",
  required: false
},
{
  displayName: "Mileage Rate",
  name: "mileage_rate",
  type: "string",
  default: "",
  required: false
},
{
  displayName: "Employee ID",
  name: "employee_id",
  type: "string",
  default: "",
  required: false
},
{
  displayName: "Vehicle Type",
  name: "vehicle_type",
  type: "string",
  default: "",
  required: false
},
{
  displayName: "Can Reclaim VAT on Mileage",
  name: "can_reclaim_vat_on_mileage",
  type: "string",
  default: "",
  required: false
},
{
  displayName: "Fuel Type",
  name: "fuel_type",
  type: "string",
  default: "",
  required: false
},
{
  displayName: "Engine Capacity Range",
  name: "engine_capacity_range",
  type: "string",
  default: "",
  required: false
},
{
  displayName: "Paid Through Account ID",
  name: "paid_through_account_id",
  type: "number",
  description: "Account through which payment is made",
  default: "",
  required: false
},
{
  displayName: "Vendor ID",
  name: "vendor_id",
  type: "string",
  default: "",
  required: false
},
{
  displayName: "Custom Fields",
  name: "custom_fields",
  type: "array",
  description: "Custom fields data",
  default: [],
  items: [],
  required: false
}

]

const additionalAccounts=[
  {
    displayName: "Account Code",
    name: "account_code",
    type: "string",
    description: "Account code identifier",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "Currency ID",
    name: "currency_id",
    type: "string",
    description: "Currency identifier",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "Description",
    name: "description",
    type: "string",
    description: "Description of the account",
    default: "",
    items: [],
    required: false
  },
  {
    displayName: "Show on Dashboard",
    name: "show_on_dashboard",
    type: "boolean",
    description: "Whether to show on dashboard",
    default: false,
    items: [],
    required: false
  },
  {
    displayName: "Can Show in ZE",
    name: "can_show_in_ze",
    type: "boolean",
    description: "Whether it can show in ZE",
    default: false,
    items: [],
    required: false
  },
  {
    displayName: "Include in VAT Return",
    name: "include_in_vat_return",
    type: "boolean",
    description: "Whether to include in VAT return",
    default: true,
    items: [],
    required: false
  },
      {
        displayName: "Custom Field ID",
        name: "customfield_id",
        type: "string",
        default: "",
        required: false
      },
      {
        displayName: "Value",
        name: "value",
        type: "string",
        default: "",
        required: false
      },
  {
    displayName: "Parent Account ID",
    name: "parent_account_id",
    type: "string",
    description: "ID of the parent account",
    default: "",
    items: [],
    required: false
  }
  

]

export const fields=[
  {
    displayName: "Contact Name",
    name: "contact_name",
    type: "string",
    default: "",
    description: "Name of the contact.",
    required: true,
    items: [],
    options: [] ,
    displayOptions: {
      show: {
        category: ["contact"],
        name: ["create","update"],
      }
    }
  },
  {
    displayName: "Contact Id",
    name: "id",
    type: "string",
    default: "",
    description: "The unique identifier of the contact",
    required: true,
    items: [],
    options: [] ,
    displayOptions: {
      show: {
        category: ["contact"],
        name: ["update","get","delete",]
      }
    }
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    items: [],
    required: false,
    options: [],
    displayOptions: {
      show: {
        category: ["contact"],
        name: ["create","update"],
      }
    },
    fields: additionalcontact,
  },
  {
    displayName: "ReturnAll",
    name: "return_all",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    items: [],
    required: false,
    options: [],
    displayOptions: {
      show: {
        category: ["contact"],
        name: ["getMany"],
      }
    },
    async init(data) {
      try {
        const list = await zohobooks.getAllCustomers(data);
        console.log(list)
        this.options = list;
      } catch (error) {
        return ({ 'Error occurred': error });
      }
    },
  },

  //  Sales Order
  {
    displayName: "Contact Id",
    name: "id",
    type: "string",
    default: "",
    description: "The unique identifier of the contact",
    required: true,
    items: [],
    options: [] ,
    displayOptions: {
      show: {
        category: ["salesorders"],
        name: ["create","update"]
      }
    }
  },
  {
    displayName: "Line Items Item Id",
    name: "line_items||__item_order",
    type: "string",
    default: "",
    description: "The line items ",
    required: true,
    items: [],
    options: [] ,
    displayOptions: {
      show: {
        category: ["salesorders"],
        name: ["create","update"]
      }
    }
  },
  {
    displayName: "Line Items Item Id",
    name: "line_items||__rate",
    type: "string",
    default: "",
    description: "The line items ",
    required: true,
    items: [],
    options: [] ,
    displayOptions: {
      show: {
        category: ["salesorders"],
        name: ["create","update"]
      }
    }
  },
  {
    displayName: "Salesorders Id",
    name: "id",
    type: "string",
    default: "",
    description: "The unique identifier of the contact",
    required: true,
    items: [],
    options: [] ,
    displayOptions: {
      show: {
        category: ["salesorders"],
        name: ["update","get","delete",]
      }
    }
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    items: [],
    required: false,
    options: [],
    displayOptions: {
      show: {
        category: ["salesorders"],
        name: ["create","update"],
      }
    },
    fields: additionalSales,
  },
  {
    displayName: "ReturnAll",
    name: "return_all",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    items: [],
    required: false,
    options: [],
    displayOptions: {
      show: {
        category: ["salesorders"],
        name: ["getMany"],
      }
    },
    async init(data) {
      try {
        const list = await zohobooks.getAllSalesorders(data);
        console.log(list)
        this.options = list;
      } catch (error) {
        return ({ 'Error occurred': error });
      }
    },
  },

//   Accounts

{
  displayName: "Name",
  name: "account_name",
  type: "string",
  default: "",
  description: "Name of the account",
  required: true,
  items: [],
  options: [] ,
  displayOptions: {
    show: {
      category: ["accounts"],
      name: ["create","update"]
    }
  }
},
{
  displayName: "Type",
  name: "account_type",
  type: "string",
  default: "",
  description: "The account type",
  required: true,
  items: [],
  options: [] ,
  displayOptions: {
    show: {
      category: ["accounts"],
      name: ["create","update"]
    }
  }
},
{
  displayName: "Account Id",
  name: "id",
  type: "string",
  default: "",
  description: "The unique identifier of the account",
  required: true,
  items: [],
  options: [] ,
  displayOptions: {
    show: {
      category: ["accounts"],
      name: ["get","update","delete"]
    }
  }
},
{
  displayName: "Additional Fields",
  name: "additionalFields",
  type: "collection",
  placeholder: "Add Field",
  default: {},
  items: [],
  required: false,
  options: [],
  displayOptions: {
    show: {
      category: ["accounts"],
      name: ["create","update"],
    }
  },
  fields: additionalAccounts,
},
{
  displayName: "ReturnAll",
  name: "return_all",
  type: "collection",
  placeholder: "Add Field",
  default: {},
  items: [],
  required: false,
  options: [],
  displayOptions: {
    show: {
      category: ["accounts"],
      name: ["getMany"],
    }
  },
  async init(data) {
    try {
      const list = await zohobooks.getAllChartAccounts(data);
      console.log(list)
      this.options = list;
    } catch (error) {
      return ({ 'Error occurred': error });
    }
  },
},

//  Expense

{
  displayName: "Account Id",
  name: "id",
  type: "string",
  default: "",
  description: "The unique identifier of the account",
  required: true,
  items: [],
  options: [] ,
  displayOptions: {
    show: {
      category: ["expenses"],
      name: ["create","update"]
    }
  }
},
{
  displayName: "Date",
  name: "date",
  type: "string",
  default: "",
  description: "Date ",
  required: true,
  items: [],
  options: [] ,
  displayOptions: {
    show: {
      category: ["expenses"],
      name: ["create","update"]
    }
  }
},
{
  displayName: "Ammount",
  name: "amount",
  type: "string",
  default: "",
  description: "Amount of the expnses",
  required: true,
  items: [],
  options: [] ,
  displayOptions: {
    show: {
      category: ["expenses"],
      name: ["create","update"]
    }
  }
},
{
  displayName: "Account Id",
  name: "line_itmes||__account_id",
  type: "string",
  default: "",
  description: "The unique identifier of the account",
  required: true,
  items: [],
  options: [] ,
  displayOptions: {
    show: {
      category: ["expenses"],
      name: ["create","update"]
    }
  }
},
{
  displayName: "Amount",
  name: "line_itmes||__amount",
  type: "string",
  default: "",
  description: "The amount of the expense",
  required: true,
  items: [],
  options: [] ,
  displayOptions: {
    show: {
      category: ["expenses"],
      name: ["create","update"]
    }
  }
},
{
  displayName: "Expenses Id",
  name: "id",
  type: "string",
  default: "",
  description: "The unique identifier of the expenses",
  required: true,
  items: [],
  options: [] ,
  displayOptions: {
    show: {
      category: ["expenses"],
      name: ["get","update","delete"]
    }
  }
},

{
  displayName: "Additional Fields",
  name: "additionalFields",
  type: "collection",
  placeholder: "Add Field",
  default: {},
  items: [],
  required: false,
  options: [],
  displayOptions: {
    show: {
      category: ["expenses"],
      name: ["create","update"],
    }
  },
  fields: additionalexpenses,
},
{
  displayName: "ReturnAll",
  name: "return_all",
  type: "collection",
  placeholder: "Add Field",
  default: {},
  items: [],
  required: false,
  options: [],
  displayOptions: {
    show: {
      category: ["expenses"],
      name: ["getMany"],
    }
  },
  async init(data) {
    try {
      const list = await zohobooks.getAllExpenses(data);
      console.log(list)
      this.options = list;
    } catch (error) {
      return ({ 'Error occurred': error });
    }
  },
},

//   Projects

{
  displayName: "Project Name",
  name: "project_name",
  type: "string",
  default: "",
  description: "The Name of the project",
  required: true,
  items: [],
  options: [] ,
  displayOptions: {
    show: {
      category: ["project"],
      name: ["create","update"]
    }
  }
},
{
  displayName: "Customer Id",
  name: "customer_id",
  type: "string",
  default: "",
  description: "The unique identifier of the customer",
  required: true,
  items: [],
  options: [] ,
  displayOptions: {
    show: {
      category: ["project"],
      name: ["create","update"]
    }
  }
},
{
  displayName: "Billing type",
  name: "billing_type",
  type: "string",
  default: "",
  description: "Billing type",
  required: true,
  items: [],
  options: [] ,
  displayOptions: {
    show: {
      category: ["project"],
      name: ["create","update"]
    }
  }
},
{
  displayName: "Project Id",
  name: "id",
  type: "string",
  default: "",
  description: "The unique identifier of the projects",
  required: true,
  items: [],
  options: [] ,
  displayOptions: {
    show: {
      category: ["project"],
      name: ["get","update","delete"]
    }
  }
},

{
  displayName: "Additional Fields",
  name: "additionalFields",
  type: "collection",
  placeholder: "Add Field",
  default: {},
  items: [],
  required: false,
  options: [],
  displayOptions: {
    show: {
      category: ["project"],
      name: ["create","update"],
    }
  },
  fields: additionalprojects,
},
{
  displayName: "ReturnAll",
  name: "return_all",
  type: "collection",
  placeholder: "Add Field",
  default: {},
  items: [],
  required: false,
  options: [],
  displayOptions: {
    show: {
      category: ["project"],
      name: ["getMany"],
    }
  },
  async init(data) {
    try {
      const list = await zohobooks.getAllProject(data);
      console.log(list)
      this.options = list;
    } catch (error) {
      return ({ 'Error occurred': error });
    }
  },
},


//  Invoice


{
  displayName: "Customer Id",
  name: "id",
  type: "string",
  default: "",
  description: "The unique identifier of the customer",
  required: true,
  items: [],
  options: [] ,
  displayOptions: {
    show: {
      category: ["invoices"],
      name: ["create","update"]
    }
  }
},
{
  displayName: "Invoice Id",
  name: "id",
  type: "string",
  default: "",
  description: "The unique identifier of the invoice",
  required: true,
  items: [],
  options: [] ,
  displayOptions: {
    show: {
      category: ["invoices"],
      name: ["get","update","delete"]
    }
  }
},

{
  displayName: "Additional Fields",
  name: "additionalFields",
  type: "collection",
  placeholder: "Add Field",
  default: {},
  items: [],
  required: false,
  options: [],
  displayOptions: {
    show: {
      category: ["invoices"],
      name: ["create","update"],
    }
  },
  fields: additionalinvoive,
},
{
  displayName: "ReturnAll",
  name: "return_all",
  type: "collection",
  placeholder: "Add Field",
  default: {},
  items: [],
  required: false,
  options: [],
  displayOptions: {
    show: {
      category: ["project"],
      name: ["getMany"],
    }
  },
  async init(data) {
    try {
      const list = await zohobooks.getAllInvoices(data);
      console.log(list)
      this.options = list;
    } catch (error) {
      return ({ 'Error occurred': error });
    }
  },
},

//  Items


{
  displayName: "Name",
  name: "name",
  type: "string",
  default: "",
  description: "The namne of the items",
  required: true,
  items: [],
  options: [] ,
  displayOptions: {
    show: {
      category: ["items"],
      name: ["create","update"]
    }
  }
},
{
  displayName: "Rate",
  name: "rate",
  type: "string",
  default: "",
  description: "Rate",
  required: true,
  items: [],
  options: [] ,
  displayOptions: {
    show: {
      category: ["items"],
      name: ["create","update"]
    }
  }
},
{
  displayName: "description",
  name: "description",
  type: "string",
  default: "",
  description: "Discription of the items",
  required: true,
  items: [],
  options: [] ,
  displayOptions: {
    show: {
      category: ["items"],
      name: ["create","update"]
    }
  }
},
{
  displayName: "items Id",
  name: "id",
  type: "string",
  default: "",
  description: "rate ",
  required: true,
  items: [],
  options: [] ,
  displayOptions: {
    show: {
      category: ["items"],
      name: ["get","update","delete"]
    }
  }
},

{
  displayName: "Additional Fields",
  name: "additionalFields",
  type: "collection",
  placeholder: "Add Field",
  default: {},
  items: [],
  required: false,
  options: [],
  displayOptions: {
    show: {
      category: ["items"],
      name: ["create","update"],
    }
  },
  fields:additionalitems,
},
{
  displayName: "ReturnAll",
  name: "return_all",
  type: "collection",
  placeholder: "Add Field",
  default: {},
  items: [],
  required: false,
  options: [],
  displayOptions: {
    show: {
      category: ["items"],
      name: ["getMany"],
    }
  },
  async init(data) {
    try {
      const list = await zohobooks.getAllItems(data);
      console.log(list)
      this.options = list;
    } catch (error) {
      return ({ 'Error occurred': error });
    }
  },
},

//  Users

{
  displayName: "Name",
  name: "name",
  type: "string",
  default: "",
  description: "Name of the users",
  required: true,
  items: [],
  options: [] ,
  displayOptions: {
    show: {
      category: ["users"],
      name: ["create","update"]
    }
  }
},
{
  displayName: "Email",
  name: "email",
  type: "string",
  default: "",
  description: "Users email",
  required: true,
  items: [],
  options: [] ,
  displayOptions: {
    show: {
      category: ["users"],
      name: ["create","update"]
    }
  }
},

{
  displayName: "Users Id",
  name: "id",
  type: "string",
  default: "",
  description: "The unique identifier of the users ",
  required: true,
  items: [],
  options: [] ,
  displayOptions: {
    show: {
      category: ["users"],
      name: ["get","update","delete"]
    }
  }
},

{
  displayName: "Additional Fields",
  name: "additionalFields",
  type: "collection",
  placeholder: "Add Field",
  default: {},
  items: [],
  required: false,
  options: [],
  displayOptions: {
    show: {
      category: ["users"],
      name: ["create","update"],
    }
  },
  fields:additionalUsers,
},
{
  displayName: "ReturnAll",
  name: "return_all",
  type: "collection",
  placeholder: "Add Field",
  default: {},
  items: [],
  required: false,
  options: [],
  displayOptions: {
    show: {
      category: ["users"],
      name: ["getMany"],
    }
  },
  async init(data) {
    try {
      const list = await zohobooks.getAllUsers(data);
      console.log(list)
      this.options = list;
    } catch (error) {
      return ({ 'Error occurred': error });
    }
  },
},






]
