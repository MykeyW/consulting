// src/i18n/quote.en.js
export const quote_en = {
  // Page header
  quote_page_badge: "Contractors & trades",
  quote_page_title: "Quote automation – demo",
  quote_page_sub:
    "See how a contractor could go from quote → follow-up → invoice with almost no manual work.",
  quote_back_to_site: "Back to site",

  // Form section
  quote_form_title: "New quote (demo only)",
  quote_form_sub:
    "Fill this out like a contractor sending a quote to a client.",
  quote_form_client_name: "Client / company name",
  quote_form_email: "Client email",
  quote_form_project: "Project description",
  quote_form_amount: "Quote amount",
  quote_form_amount_placeholder: "Example: 12500",
  quote_form_notes: "Internal notes (optional)",
  quote_form_submit: "Create quote (demo)",

  // List section
  quote_list_title: "Quotes in the system",
  quote_list_sub:
    "The system tracks quote status and decides who needs a follow-up.",
  quote_list_empty: "No quotes yet. Create one above.",

  // Table columns
  quote_col_client: "Client",
  quote_col_project: "Project",
  quote_col_amount: "Amount",
  quote_col_status: "Status",

  // Status labels
  quote_status_pending: "Waiting",
  quote_status_followup_scheduled: "Follow-up sent",
  quote_status_accepted: "Accepted",
  quote_status_invoiced: "Invoiced",

  // Actions
  quote_actions_title: "Automation controls",
  quote_actions_run_followups: "Run follow-up logic (demo)",
  quote_actions_mark_accepted: "Mark as accepted",
  quote_actions_mark_accepted_help:
    "Pretend the client replied “yes” – we’ll move this quote into Accepted and generate an invoice step.",

  // Detail panel
  quote_detail_title: "Quote timeline",
  quote_detail_created: "Quote sent",
  quote_detail_followup: "Follow-up email sent",
  quote_detail_accepted: "Client accepted",
  quote_detail_invoice: "Invoice generated",

  // Detail waiting messages
  quote_detail_waiting_followup: "Waiting to send follow-up (after 3 days).",
  quote_detail_waiting_acceptance: "Waiting for client to accept.",
  quote_detail_waiting_invoice: "Invoice step is ready once accepted.",

  // Empty detail
  quote_detail_none_selected: "Select a quote on the left to see details.",
};
