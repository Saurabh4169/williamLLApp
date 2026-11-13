export interface FAQItem {
  id: string;
  category: 'General' | 'Services' | 'Contact' | 'Process' | 'Permits';
  question: string;
  answer: string;
}

export const FAQS_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'General',
    question: 'Why is Williams & Williams LLC popular?',
    answer: 'Williams & Williams LLC is trusted across Chicago because we bridge technical municipal code with pragmatic commercial strategy. Our positioning is built on three pillars: Experienced, Knowledgeable, and Dedicated. With deep relationships across city departments, aldermanic offices, and the Zoning Board of Appeals, we cut through bureaucratic red tape and protect our clients’ development investments.',
  },
  {
    id: 'faq-2',
    category: 'Services',
    question: 'What services do you provide?',
    answer: 'We provide end-to-end zoning and land-use advisory in Chicago, IL. This includes: Zoning Analysis & Consultation, Zoning Appeals & Hearing Representation before the ZBA, Building Permit Assistance & Expediting, Strategic Zoning Insights, Compliance & Planning Audits, Community & Aldermanic Engagement, Site Feasibility Studies, Urban Planning Consultation, and Construction & Design Zoning Integration.',
  },
  {
    id: 'faq-3',
    category: 'Contact',
    question: 'What is the best way to contact you?',
    answer: 'The fastest way to reach our team is by phone at 630-635-7688 or by emailing dubbs.mgmt@gmail.com. You can also request a Free Quote or Book a Consultation directly through this mobile application for an expedited initial project assessment.',
  },
  {
    id: 'faq-4',
    category: 'Process',
    question: 'How long does a Chicago zoning appeal typically take?',
    answer: '[TYPICAL TIMELINE: 6 to 10 weeks]. From filing the formal petition and conducting certified neighbor mailings to appearing before the Zoning Board of Appeals (ZBA) at City Hall, our team manages every statutory deadline to prevent continuances.',
  },
  {
    id: 'faq-5',
    category: 'Permits',
    question: 'Do you help resolve active stop-work orders or building code violations?',
    answer: 'Yes. We represent property owners before the City of Chicago Department of Administrative Hearings, conduct on-site compliance audits, and coordinate with city plan examiners to lift stop-work orders and cure open citations.',
  },
  {
    id: 'faq-6',
    category: 'Services',
    question: 'What is the difference between a Zoning Variance and an Administrative Adjustment?',
    answer: 'An Administrative Adjustment can grant minor relief (e.g., up to 10–20% variation in setbacks or open space) directly through the Zoning Administrator without a public hearing. A Variance requires a public evidentiary hearing before the Zoning Board of Appeals (ZBA) to prove hardship.',
  },
  {
    id: 'faq-7',
    category: 'General',
    question: 'Is your advice considered legal counsel?',
    answer: 'Important legal disclaimer: Williams & Williams LLC provides professional zoning, land-use, and municipal consulting. Information provided through our app and website is general guidance and does not constitute formal legal advice or create an attorney-client relationship.',
  },
];

