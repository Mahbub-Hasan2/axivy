export const packages = [
  {
    key: 'starter', label: 'Starter', name: 'Enquiry Ready', price: 'from QAR 2,500', cadence: 'one-time, fixed price',
    tagline: 'A professional website that makes it easy for customers to message you, and makes sure no enquiry is lost.',
    bestFor: 'Businesses with no website yet, or only an Instagram or Facebook page.',
    problem: 'Customers cannot find you or contact you easily, and enquiries disappear into chats.',
    includes: ['Professional website, 1 to 5 pages, designed for mobile phones', 'Clear pages for your services, contact details and location', 'WhatsApp button with a ready-written message on every page', 'Enquiry form that saves every lead to a Google Sheet', 'Instant email alert to you for every new enquiry', 'Greeting and away messages set up in your WhatsApp Business app', 'Basic on-page SEO and Google Search Console setup', 'A short walkthrough so you can run everything confidently'],
    button: 'Get a free audit for Starter', auditHash: '#audit-starter', whatsappMessage: "Hi Axivy, I'm interested in the Enquiry Ready (Starter) package. Can we talk?",
  },
  {
    key: 'growth', label: 'Growth', name: 'Enquiry to Booking', price: 'from QAR 4,500', cadence: 'one-time, fixed price', badge: 'Recommended',
    tagline: 'Everything in Starter, plus a simple system that follows every enquiry through to a booking.',
    bestFor: 'Busy businesses where several people handle enquiries, or follow-ups get forgotten.',
    problem: 'Enquiries are answered late, nobody is sure who follows up, and customer details are scattered.',
    includes: ['Everything in Starter, plus:', 'HubSpot CRM set up around the way your team handles enquiries', 'Every website enquiry lands in the CRM automatically', 'Follow-up reminders so promising leads do not go cold', 'Booking or appointment request form', 'Simple monthly summary of enquiries and where they came from', 'Team walkthrough and a short written guide'],
    button: 'Get a free audit for Growth', auditHash: '#audit-growth', whatsappMessage: "Hi Axivy, I'm interested in the Enquiry to Booking (Growth) package. Can we talk?",
  },
  {
    key: 'care', label: 'Monthly Care', name: 'Monthly Care', price: 'from QAR 300', cadence: 'per month',
    tagline: 'We keep your website and enquiry system running, so you can focus on your customers.',
    bestFor: 'Owners who want it looked after without having to think about it.',
    problem: 'Websites and automations quietly break, expire or go out of date when nobody is watching.',
    includes: ['Domain and hosting renewal reminders and upkeep', 'Software and security updates', 'A few small content or price updates each month', 'Regular checks that forms, WhatsApp links and alerts still work', 'A short monthly report', 'A direct WhatsApp line to Axivy for support questions'],
    button: 'Ask about Monthly Care', auditHash: '#audit-care', whatsappMessage: "Hi Axivy, I'd like to know more about the Monthly Care plan.",
  },
];

export const addOns = [
  { name: 'Workflow automation', price: 'from QAR 1,500', problem: 'Your team keeps copying details between forms, spreadsheets and chats.', copy: 'We connect the tools you already use so repetitive admin, such as logging an enquiry or notifying a colleague, happens automatically.' },
  { name: 'AI FAQ assistant', price: 'from QAR 1,500', problem: 'You answer the same questions every day.', copy: 'An assistant that answers questions you have approved and collects enquiry details, with a clear hand-off to a person for anything else.' },
];

export const packageFaqs = [
  ['What do I need to provide?', 'Your logo if you have one, photos, a list of your services and your contact details. If you do not have written content, tell us and we will help you shape simple, clear text.'],
  ['How long does it take?', 'Most Starter projects take about 1 to 2 weeks once we have your content. Growth depends on how your enquiries and bookings work today. We agree the timeline with you before you pay anything.'],
  // TODO(owner): replace with final ownership terms
  ['Who owns my website and data?', 'We agree ownership of your domain, content and customer data in writing before work starts, so there are no surprises later.'],
  ['Do I need the WhatsApp Business API?', 'Not for Starter or Growth. We begin with the free WhatsApp Business app, which is enough for most small businesses. The API only makes sense later if you need automated messaging at higher volume, and its provider fees are paid directly by you.'],
  ['Can I upgrade later?', 'Yes. Starter is built so it can grow into Growth, and we agree the price of any upgrade before doing extra work.'],
  ['What if I only need a website, or only a CRM?', 'Tell us what you need. We will recommend the smallest package that solves your problem, or scope something custom after a free audit.'],
  ['How does payment work?', 'You get a fixed price before we start. You pay 50% to begin and 50% when we deliver.'],
  ['What is the free audit?', 'A short one-page review of how enquiries reach you today, with a practical suggestion for what to fix first. There is no obligation to buy anything.'],
];
