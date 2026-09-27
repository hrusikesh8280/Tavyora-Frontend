# Future analytics model — not implemented

Implementation awaits the production privacy/consent decision. No analytics or tracking storage exists in this production source.

| Event | Trigger | Useful parameters |
|---|---|---|
| technology_explore | Intentional click into the technology journey | source_page, placement |
| technology_enquiry | Intentional technology enquiry CTA click | source_page, placement |
| wellbeing_explore | Intentional click into wellbeing | source_page, placement |
| yoga_enquiry | Intentional yoga enquiry CTA click | source_page, placement |
| contact_submit | Future server confirms a valid contact submission | enquiry_type |

Avoid duplicate firing, hover/scroll noise, full URLs containing sensitive query strings, email addresses, free-text brief contents and other personal data. An email CTA click is not a sent enquiry; a contact button click is not a successful submission. Final consent, retention and provider choice must match the real privacy policy.
