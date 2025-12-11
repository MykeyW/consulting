// src/i18n/booking.en.js

export const bookingEn = {
  // booking demo
  booking_title: "Booking demo – see it in action",
  booking_sub:
    "This is a fake booking page to show how Indigo Nord could automate scheduling for your business.",
  booking_calendar_label: "Pick a date",
  booking_note:
    "Grey dates and crossed-out times are in the past or already full in this demo.",
  booking_times_label: "Available times",
  booking_times_help:
    "Choose a time slot to hold it while you fill out the form.",
  booking_times_footer:
    "In a real system, this would sync with your tools (calendar, CRM, reminders).",
  booking_form_title: "Contact details (demo only)",
  booking_form_name: "Name",
  booking_form_email: "Email",
  booking_form_time: "Selected time",
  booking_form_time_placeholder: "Choose a time slot above",
  booking_form_save: "Save (demo)",
  booking_demo_disclaimer:
    "This is just a front-end demo. No real booking is created.",

  // Booking demo – page level
  booking_page_title: "Booking demo – see it in action",
  booking_page_sub:
    "This is a fake booking page to show how Indigo Nord could automate scheduling for your business.",
  booking_pick_date_label: "Pick a date",
  booking_month_label_prefix: "",
  booking_back_to_site: "Back to site",
  booking_style_label: "Style",
  booking_view_label: "View",

  booking_mode_booking: "Booking",
  booking_mode_admin: "Admin",
  booking_mode_email: "Daily email",

  // Calendar / times
  booking_available_times_title: "Available times",
  booking_choose_slot_help:
    "Choose a time slot to hold it while you fill out the form.",
  booking_real_system_note:
    "In a real system, this would sync with your tools (calendar, CRM, reminders).",
  booking_full_label: "Full",
  booking_slots_label: "slots",
  booking_one_slot_label: "slot",
  booking_calendar_title: "Calendar",
  booking_today_label: "Today",
  booking_back_to_calendar: "← Calendar",
  booking_no_slots_today: "No remaining time slots for this date.",
  booking_empty_times_help: "Choose a date on the left to see available times.",
  booking_visual_demo_note:
    "This is only a visual demo. Nothing is actually booked or sent.",
  booking_saved_toast:
    "Saved in the demo. The slot disappears from the calendar on this device only.",

  // Form labels (duplicate semantics but used in some components)
  booking_contact_panel_title: "Contact details (demo only)",
  booking_name_label: "Name",
  booking_email_label: "Email",
  booking_selected_time_label: "Selected time",
  booking_selected_time_placeholder: "Choose a time slot above",
  booking_save_demo: "Save (demo)",

  // Admin view (first block)
  booking_admin_title: "Admin view – bookings overview",
  booking_admin_sub:
    "Click a date to see who booked, which times are still open, and manage demo bookings.",
  booking_admin_no_bookings_title: "No bookings yet",
  booking_admin_no_bookings_body:
    "As people use the demo, their test bookings will show up here.",
  booking_admin_date_label: "Date",
  booking_admin_time_label: "Time",
  booking_admin_name_label: "Name",
  booking_admin_email_label: "Email",
  booking_admin_cancel_label: "Cancel (demo)",
  booking_admin_slots_summary_label: "Slots",
  booking_admin_slots_used_label: "used",
  booking_admin_slots_remaining_label: "remaining",

  // Daily email demo (first block)
  booking_email_demo_title: "Daily summary email (demo)",
  booking_email_demo_sub:
    "Example of an automated daily summary email that could be sent to the owner or team.",
  booking_email_subject_demo: "Daily bookings summary – {{date}} (demo only)",
  booking_email_intro_demo:
    "Here is your daily snapshot of upcoming bookings from the demo calendar.",
  booking_email_section_today_label: "Today’s bookings",
  booking_email_section_tomorrow_label: "Tomorrow’s bookings",
  booking_email_empty_state: "No bookings for this period in the demo data.",
  booking_email_footer_note:
    "This is only a visual example. In a real system, this would be sent automatically and include real customers.",

  // --- Booking admin panel (second, more refined block) ---
  booking_admin_no_date_selected:
    "Choose a date on the left to inspect its bookings and availability.",
  booking_admin_stats_title: "Day overview",
  booking_admin_total_slots: "Total slots",
  booking_admin_booked_slots: "Booked",
  booking_admin_remaining_slots: "Remaining",
  booking_admin_bookings_title: "Bookings for this date",
  booking_admin_status_label: "Status",
  booking_admin_status_booked: "Booked",
  booking_admin_status_available: "Available",
  booking_admin_upcoming_title: "Next 7 days – upcoming bookings",
  booking_admin_upcoming_empty:
    "No demo bookings yet. In production you’d see all upcoming appointments here.",
  booking_admin_export_pdf: "Export PDF (demo)",
  booking_admin_pdf_title_prefix: "Bookings –",
  booking_admin_pdf_section_day: "Day overview",
  booking_admin_pdf_section_bookings: "Bookings for this date",
  booking_admin_pdf_section_upcoming: "Next 7 days – upcoming bookings",
  booking_admin_pdf_no_date: "No date selected – nothing to export.",

  // --- Daily email demo (generic / booking_daily_* block) ---
  booking_daily_title: "Daily booking summary",
  booking_daily_subtitle:
    "Here’s a sample of the email your business could receive every morning.",
  booking_daily_to_label: "To:",
  booking_daily_subject_label: "Subject:",
  booking_daily_subject_line: "Today’s bookings and remaining slots",
  booking_daily_intro_line:
    "Good morning! Here’s a snapshot of today’s schedule for Indigo Nord’s booking system.",
  booking_daily_today_label: "Today",
  booking_daily_total_bookings: "Bookings",
  booking_daily_remaining_slots: "Remaining slots",
  booking_daily_table_time: "Time",
  booking_daily_table_name: "Name",
  booking_daily_table_email: "Email",
  booking_daily_table_note: "Details",
  booking_daily_no_notes: "–",
  booking_daily_available_slots_title: "Available slots",
  booking_daily_no_slots: "No remaining slots.",
  booking_daily_footer_line:
    "In a real system, this email would be generated automatically every morning based on your live calendar.",

  // More detailed admin labels used in some components
  booking_admin_pick_date_label: "Pick a date",
  booking_admin_time_col: "Time",
  booking_admin_name_col: "Name",
  booking_admin_email_col: "Email",
  booking_admin_status_col: "Status",
};
