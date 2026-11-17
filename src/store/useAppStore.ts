import { create } from 'zustand';
import { CLIENT_CASES, UPCOMING_APPOINTMENTS, ClientCase, Appointment } from '../data/cases';
import { INITIAL_VAULT_FILES, VaultFile } from '../data/documentsVault';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'expert' | 'system';
  authorName: string;
  avatarKey?: string;
  text: string;
  timestamp: string;
  attachmentName?: string;
}

export interface QuoteRequest {
  id: string;
  serviceType: string;
  propertyType: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  message: string;
  dateSubmitted: string;
  status: 'Received' | 'In Review';
}

export interface QuoteItem {
  id: string;
  quoteNumber: string;
  service: string;
  address: string;
  estimateAmount: number;
  status: 'In Review' | 'Approved' | 'Accepted & Paid';
  dateSubmitted: string;
  scope: string;
}

export interface TicketMessage {
  id: string;
  sender: 'user' | 'consultant';
  authorName: string;
  text: string;
  time: string;
  attachment?: string;
}

export interface Ticket {
  id: string;
  subject: string;
  topic: string;
  relatedCase?: string;
  priority: 'Low' | 'Normal' | 'Urgent';
  status: 'Open' | 'Resolved';
  lastReplyTime: string;
  assignedConsultant: {
    name: string;
    title: string;
    isOnline: boolean;
  };
  messages: TicketMessage[];
}

export interface InvoiceItem {
  id: string;
  title: string;
  caseNumber?: string;
  date: string;
  dueDate: string;
  amount: number;
  status: 'Paid' | 'Due';
}

export interface AppNotification {
  id: string;
  type: 'case' | 'appointment' | 'document' | 'update' | 'message';
  title: string;
  message: string;
  time: string;
  group: 'Today' | 'Yesterday' | 'Earlier';
  read: boolean;
  link: string;
}

export interface BookingPayload {
  serviceId?: string;
  serviceTitle: string;
  serviceCode?: string;
  serviceCategory?: 'zoning' | 'construction';
  packageType: string;
  amount: number;
  date: string;
  time: string;
  meetingType: 'In person' | 'Phone' | 'Video' | 'Office' | 'Site visit' | 'Site Visit';
  propertyAddress: string;
  pin?: string;
  zoningDistrict?: string;
  projectType?: string;
  description?: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
}

export interface AppState {
  // Onboarding & Splash
  hasSeenOnboarding: boolean;
  completeOnboarding: () => void;
  resetOnboarding: () => void;

  // Active User Profile
  user: {
    name: string;
    email: string;
    phone: string;
    company: string;
    notifications: boolean;
    savedServiceIds: string[];
    savedProjectIds: string[];
    isLoggedIn: boolean;
  };
  updateUserProfile: (updates: Partial<AppState['user']>) => void;
  toggleSavedService: (serviceId: string) => void;
  toggleSavedProject: (projectId: string) => void;

  // Toast System
  toast: string | null;
  showToast: (message: string) => void;

  // Appearance & Localization
  darkMode: boolean;
  toggleDarkMode: () => void;
  language: 'English' | 'Español';
  setLanguage: (lang: 'English' | 'Español') => void;
  biometricLogin: boolean;
  toggleBiometricLogin: () => void;
  analyticsSharing: boolean;
  toggleAnalyticsSharing: () => void;

  // Client Cases & Appointments
  cases: ClientCase[];
  appointments: Appointment[];
  activeCaseFilter: 'Active' | 'Completed';
  setActiveCaseFilter: (filter: 'Active' | 'Completed') => void;
  addAppointment: (appointment: Omit<Appointment, 'id'>) => void;
  addBooking: (payload: BookingPayload) => { bookingId: string; invoiceId: string };
  addCase: (newCase: Omit<ClientCase, 'id'>) => void;

  // Vault Documents
  vaultFiles: VaultFile[];
  activeVaultFolder: 'surveys' | 'plans' | 'permits' | 'notices';
  setActiveVaultFolder: (folder: 'surveys' | 'plans' | 'permits' | 'notices') => void;
  uploadVaultFile: (file: Omit<VaultFile, 'id'>) => void;

  // In-App Chat
  chatMessages: ChatMessage[];
  sendChatMessage: (text: string, attachmentName?: string) => void;

  // Support Tickets / Enquiries
  tickets: Ticket[];
  createEnquiry: (data: {
    topic: string;
    relatedCase?: string;
    priority: 'Low' | 'Normal' | 'Urgent';
    subject: string;
    message: string;
    attachment?: string;
  }) => string;
  sendTicketReply: (ticketId: string, text: string) => void;

  // Invoices & Billing
  invoices: InvoiceItem[];
  payInvoice: (invoiceId: string) => void;
  payOutstandingBalance: () => void;

  // Quotes
  quotesList: QuoteItem[];
  acceptAndPayQuote: (quoteId: string) => void;
  addQuoteRequest: (quote: Partial<QuoteItem>) => void;

  // Legacy Quotes & Notifications
  notifications: AppNotification[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  deleteNotification: (id: string) => void;
  notificationSettings: {
    caseUpdates: boolean;
    appointments: boolean;
    zoningAlerts: boolean;
    messages: boolean;
    push: boolean;
  };
  toggleNotificationSetting: (key: keyof AppState['notificationSettings']) => void;

  quotes: QuoteRequest[];
  submitQuoteRequest: (quote: Omit<QuoteRequest, 'id' | 'dateSubmitted' | 'status'>) => void;

  // Global UI Controls
  desktopFrameMode: boolean;
  toggleDesktopFrameMode: () => void;
}

const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    type: 'case',
    title: 'Case Status Updated',
    message: 'WW-2026-0842 (Damen Ave) advanced from Under Review to Hearing Scheduled before the Chicago ZBA.',
    time: '2h ago',
    group: 'Today',
    read: false,
    link: '/cases/case-1',
  },
  {
    id: 'notif-2',
    type: 'appointment',
    title: 'Hearing Strategy Dry-Run Tomorrow',
    message: 'Consultation with Marcus Vance scheduled for tomorrow at 10:00 AM CST via video conference.',
    time: '4h ago',
    group: 'Today',
    read: false,
    link: '/cases',
  },
  {
    id: 'notif-3',
    type: 'message',
    title: 'Message from Consultant',
    message: 'Elena Rostova: "Chicago DOB zoning division officially cleared the change of occupancy for Fulton Market."',
    time: 'Yesterday',
    group: 'Yesterday',
    read: false,
    link: '/chat',
  },
  {
    id: 'notif-4',
    type: 'document',
    title: 'New Document Uploaded',
    message: 'Williams & Williams team uploaded Certified_Neighbor_Notice_Affidavit.pdf to your case vault.',
    time: 'Yesterday',
    group: 'Yesterday',
    read: true,
    link: '/vault',
  },
  {
    id: 'notif-5',
    type: 'update',
    title: 'City Council Ordinance Alert',
    message: 'Chicago City Council expanded the Connected Communities Ordinance parking relief parameters.',
    time: '3d ago',
    group: 'Earlier',
    read: true,
    link: '/news/connected-communities-ordinance-expansion',
  },
  {
    id: 'notif-6',
    type: 'appointment',
    title: 'Appointment Confirmed',
    message: 'Your upcoming zoning review session has been confirmed with our senior municipal advisory.',
    time: '5d ago',
    group: 'Earlier',
    read: true,
    link: '/cases',
  },
];

const INITIAL_QUOTES: QuoteRequest[] = [
  {
    id: 'quote-101',
    serviceType: 'Zoning Analysis & Strategy Consultation',
    propertyType: 'Multi-Family Residential (3-Flat)',
    name: 'Alex Sterling',
    email: 'alex.sterling@example.com',
    phone: '312-555-0198',
    address: '2144 N. Damen Ave, Chicago, IL 60647',
    message: 'Requesting rear yard setback assessment and parking reduction under Connected Communities Ordinance.',
    dateSubmitted: 'Nov 10, 2026',
    status: 'In Review',
  },
  {
    id: 'quote-102',
    serviceType: 'ZBA Variance Petitions',
    propertyType: 'Commercial Mixed-Use',
    name: 'Alex Sterling',
    email: 'alex.sterling@example.com',
    phone: '312-555-0198',
    address: '1250 W. Fulton Market, Chicago, IL 60607',
    message: 'FAR bonus verification and aldermanic rapport review for 6-story boutique residential.',
    dateSubmitted: 'Nov 02, 2026',
    status: 'Received',
  },
];

const INITIAL_QUOTES_LIST: QuoteItem[] = [
  {
    id: 'quote-101',
    quoteNumber: 'WW-QT-2026-44',
    service: 'Rear Yard Setback Variance & ZBA Representation',
    address: '2144 N. Damen Ave, Chicago, IL 60647',
    estimateAmount: 1850.0,
    status: 'Approved',
    dateSubmitted: 'Nov 14, 2026',
    scope: 'Complete Title 17 ordinance hardship brief, 250-ft neighbor certified mailings, aldermanic brief preparation & oral argument at ZBA.',
  },
  {
    id: 'quote-102',
    quoteNumber: 'WW-QT-2026-38',
    service: 'TOD Commercial Parking Reduction Review',
    address: '1250 W. Fulton Market, Chicago, IL 60607',
    estimateAmount: 3200.0,
    status: 'In Review',
    dateSubmitted: 'Nov 10, 2026',
    scope: 'Transit-Served Location (TSL) parking count reduction petition under Chicago Connected Communities Ordinance.',
  },
  {
    id: 'quote-103',
    quoteNumber: 'WW-QT-2026-29',
    service: 'Preliminary Zoning & Permitted Uses Audit',
    address: '1508 N. Talman Ave, Chicago, IL 60622',
    estimateAmount: 950.0,
    status: 'Accepted & Paid',
    dateSubmitted: 'Oct 28, 2026',
    scope: 'Certified lot dimension audit, permitted floor area ratio (FAR), and building height envelope checklist.',
  },
];

const INITIAL_TICKETS: Ticket[] = [
  {
    id: '#TK-1043',
    subject: 'Aldermanic Hearing Support - 32nd Ward',
    topic: 'ZBA Hearing & Aldermanic Rapport',
    relatedCase: 'WW-2026-0842 (Damen Ave)',
    priority: 'Urgent',
    status: 'Open',
    lastReplyTime: '12m ago',
    assignedConsultant: {
      name: 'Marcus Vance, Esq.',
      title: 'Principal Zoning Counsel',
      isOnline: true,
    },
    messages: [
      {
        id: 'tm-1',
        sender: 'consultant',
        authorName: 'Marcus Vance, Esq.',
        text: 'Good morning Alex. We reviewed the Damen Ave RT-4 hardship brief. The aldermanic liaison confirmed they will support the 18% setback variance.',
        time: 'Today, 10:15 AM',
      },
      {
        id: 'tm-2',
        sender: 'user',
        authorName: 'Alex Sterling',
        text: 'Excellent news! Did they ask for any landscape screening or permeable surface commitments?',
        time: 'Today, 10:28 AM',
      },
      {
        id: 'tm-3',
        sender: 'consultant',
        authorName: 'Marcus Vance, Esq.',
        text: 'Only standard permeable paving on the two garage spaces. We have updated Exhibit C accordingly for the Nov 24 hearing docket.',
        time: 'Today, 10:35 AM',
      },
    ],
  },
  {
    id: '#TK-1028',
    subject: 'ADU Coach House Ordinance Eligibility',
    topic: 'Zoning Classification & Permitted Uses',
    relatedCase: 'General Property Review',
    priority: 'Normal',
    status: 'Open',
    lastReplyTime: '2h ago',
    assignedConsultant: {
      name: 'Elena Rostova',
      title: 'Senior Expediter',
      isOnline: true,
    },
    messages: [
      {
        id: 'tm-4',
        sender: 'user',
        authorName: 'Alex Sterling',
        text: 'Hi Elena, does the RS-3 parcel qualify for an administrative ADU permit without a full variance?',
        time: 'Today, 8:30 AM',
      },
      {
        id: 'tm-5',
        sender: 'consultant',
        authorName: 'Elena Rostova',
        text: 'Yes! The lot area exceeds 3,125 sq ft and is within the designated North Pilot ADU zone. We can file under standard administrative track.',
        time: 'Today, 9:10 AM',
      },
    ],
  },
  {
    id: '#TK-0985',
    subject: 'ZBA Special Use Stenographer Filing Deposit',
    topic: 'Billing & Invoicing',
    relatedCase: 'WW-2026-0842',
    priority: 'Low',
    status: 'Resolved',
    lastReplyTime: 'Nov 12',
    assignedConsultant: {
      name: 'Sarah Jenkins',
      title: 'Billing Specialist',
      isOnline: false,
    },
    messages: [
      {
        id: 'tm-6',
        sender: 'consultant',
        authorName: 'Sarah Jenkins',
        text: 'Your court reporter and stenographer deposit for City Hall Hearing Room 201 has been processed and credited to Invoice #INV-2026-002.',
        time: 'Nov 12, 2:40 PM',
      },
    ],
  },
];

const INITIAL_INVOICES: InvoiceItem[] = [
  {
    id: 'INV-2026-004',
    title: 'ZBA Hearing Representation & Stenographer Fee',
    caseNumber: 'WW-2026-0842',
    date: 'Nov 15, 2026',
    dueDate: 'Dec 01, 2026',
    amount: 1400.0,
    status: 'Due',
  },
  {
    id: 'INV-2026-003',
    title: 'Connected Communities Transit Parking Review',
    caseNumber: 'WW-2026-0791',
    date: 'Nov 12, 2026',
    dueDate: 'Nov 28, 2026',
    amount: 1450.0,
    status: 'Due',
  },
  {
    id: 'INV-2026-002',
    title: 'Preliminary Title 17 Ordinance & Plat Audit',
    caseNumber: 'WW-2026-0715',
    date: 'Oct 20, 2026',
    dueDate: 'Nov 05, 2026',
    amount: 850.0,
    status: 'Paid',
  },
  {
    id: 'INV-2026-001',
    title: 'Initial Zoning Strategy Retainer & File Setup',
    caseNumber: 'WW-2026-0680',
    date: 'Oct 01, 2026',
    dueDate: 'Oct 15, 2026',
    amount: 1200.0,
    status: 'Paid',
  },
];

export const useAppStore = create<AppState>((set, get) => ({
  hasSeenOnboarding: true,
  completeOnboarding: () => set({ hasSeenOnboarding: true }),
  resetOnboarding: () => set({ hasSeenOnboarding: true }),

  user: {
    name: 'Alex Sterling',
    email: 'alex.sterling@example.com',
    phone: '312-555-0198',
    company: 'Sterling Developments LLC',
    notifications: true,
    savedServiceIds: ['zoning-appeals', 'permit-assistance'],
    savedProjectIds: ['1508-n-talman', 'west-loop-tower'],
    isLoggedIn: true,
  },
  updateUserProfile: (updates) =>
    set((state) => ({ user: { ...state.user, ...updates } })),
  toggleSavedService: (serviceId) =>
    set((state) => {
      const exists = state.user.savedServiceIds.includes(serviceId);
      const savedServiceIds = exists
        ? state.user.savedServiceIds.filter((id) => id !== serviceId)
        : [...state.user.savedServiceIds, serviceId];
      return { user: { ...state.user, savedServiceIds } };
    }),
  toggleSavedProject: (projectId) =>
    set((state) => {
      const current = state.user.savedProjectIds || [];
      const exists = current.includes(projectId);
      const savedProjectIds = exists
        ? current.filter((id) => id !== projectId)
        : [...current, projectId];
      return { user: { ...state.user, savedProjectIds } };
    }),

  // Toast System
  toast: null,
  showToast: (message: string) => {
    set({ toast: message });
    setTimeout(() => {
      if (get().toast === message) {
        set({ toast: null });
      }
    }, 2800);
  },

  // Appearance & Preferences
  darkMode: false,
  toggleDarkMode: () =>
    set((state) => {
      const next = !state.darkMode;
      if (next) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return { darkMode: next };
    }),
  language: 'English',
  setLanguage: (lang) => {
    set({ language: lang });
    get().showToast(lang === 'Español' ? 'Idioma cambiado a Español' : 'Language set to English');
  },
  biometricLogin: true,
  toggleBiometricLogin: () =>
    set((state) => {
      const next = !state.biometricLogin;
      get().showToast(next ? 'Biometric authentication enabled' : 'Biometric authentication disabled');
      return { biometricLogin: next };
    }),
  analyticsSharing: false,
  toggleAnalyticsSharing: () =>
    set((state) => {
      const next = !state.analyticsSharing;
      get().showToast(next ? 'Analytics data sharing enabled' : 'Analytics data sharing disabled');
      return { analyticsSharing: next };
    }),

  cases: CLIENT_CASES,
  appointments: UPCOMING_APPOINTMENTS,
  activeCaseFilter: 'Active',
  setActiveCaseFilter: (filter) => set({ activeCaseFilter: filter }),

  addAppointment: (appointment) =>
    set((state) => ({
      appointments: [
        {
          ...appointment,
          id: `app-${Date.now()}`,
        },
        ...state.appointments,
      ],
    })),

  addBooking: (payload) => {
    const isConstruction =
      payload.serviceCategory === 'construction' ||
      payload.serviceId?.includes('con') ||
      payload.serviceTitle.toLowerCase().includes('construction') ||
      payload.serviceTitle.toLowerCase().includes('architectural') ||
      payload.serviceTitle.toLowerCase().includes('renovation') ||
      payload.serviceTitle.toLowerCase().includes('drawing') ||
      payload.serviceTitle.toLowerCase().includes('visualization');

    const bookingNum = Math.floor(1000 + Math.random() * 9000);
    const bookingId = `#BK-${bookingNum}`;
    const invoiceId = `#INV-2026-${bookingNum}`;
    const code =
      payload.serviceCode ||
      (isConstruction ? `WW-CON-0${Math.floor(1 + Math.random() * 5)}` : `WW-2026-${bookingNum}`);

    const newAppointment: Appointment = {
      id: bookingId,
      caseNumber: code,
      serviceCode: code,
      title: payload.serviceTitle,
      serviceCategory: isConstruction ? 'construction' : 'zoning',
      type:
        payload.meetingType === 'In person'
          ? 'Office'
          : payload.meetingType === 'Site visit'
          ? 'Site Visit'
          : (payload.meetingType as any),
      date: payload.date,
      time: payload.time,
      expertName: isConstruction ? 'Daniel Reyes, AIA' : 'Marcus Vance, Esq. (Lead Counsel)',
      expertRole: isConstruction ? 'Assigned Architect' : 'Assigned Counsel',
      location:
        payload.meetingType === 'Site visit' || payload.meetingType === 'Site Visit'
          ? payload.propertyAddress
          : payload.meetingType === 'In person' || payload.meetingType === 'Office'
          ? '125 S. Wacker Dr, Suite 1400, Chicago, IL'
          : payload.meetingType === 'Video'
          ? 'Google Meet Video Session'
          : '+1 (312) 555-0198',
      propertyAddress: payload.propertyAddress,
      packageDetails: `${payload.packageType} Package`,
      amountPaid: payload.amount,
      status: 'Confirmed',
    };

    const newInvoice: InvoiceItem = {
      id: invoiceId,
      title: `${payload.serviceTitle} (${payload.packageType} Package)`,
      caseNumber: bookingId,
      date: 'Today',
      dueDate: 'Paid in Full',
      amount: payload.amount,
      status: 'Paid',
    };

    const newNotification: AppNotification = {
      id: `notif-${Date.now()}`,
      type: 'appointment',
      title: 'Consultation Confirmed',
      message: `Your booking ${bookingId} for ${payload.serviceTitle} on ${payload.date} at ${payload.time} is confirmed.`,
      time: 'Just now',
      group: 'Today',
      read: false,
      link: '/profile?tab=bookings',
    };

    set((state) => ({
      appointments: [newAppointment, ...state.appointments],
      invoices: [newInvoice, ...state.invoices],
      notifications: [newNotification, ...state.notifications],
    }));

    return { bookingId, invoiceId };
  },

  addCase: (newCase) =>
    set((state) => ({
      cases: [
        {
          ...newCase,
          id: `case-${Date.now()}`,
        },
        ...state.cases,
      ],
    })),

  vaultFiles: INITIAL_VAULT_FILES,
  activeVaultFolder: 'surveys',
  setActiveVaultFolder: (folder) => set({ activeVaultFolder: folder }),
  uploadVaultFile: (file) =>
    set((state) => ({
      vaultFiles: [
        {
          ...file,
          id: `file-${Date.now()}`,
        },
        ...state.vaultFiles,
      ],
    })),

  chatMessages: [
    {
      id: 'msg-1',
      sender: 'expert',
      authorName: 'Marcus Vance (Principal Consultant)',
      avatarKey: 'aboutFounder',
      text: 'Good morning Alex! I reviewed the Damen Ave RT-4 hardship brief. The 250-foot neighbor certified mailings were filed today with the ZBA.',
      timestamp: 'Today, 9:15 AM',
    },
    {
      id: 'msg-2',
      sender: 'user',
      authorName: 'Alex Sterling',
      text: 'Thank you Marcus! Did the 32nd Ward aldermanic staff raise any concerns about the rear yard setback?',
      timestamp: 'Today, 9:28 AM',
    },
    {
      id: 'msg-3',
      sender: 'expert',
      authorName: 'Marcus Vance (Principal Consultant)',
      avatarKey: 'aboutFounder',
      text: 'Not at all. Because we kept the lot coverage within 60% and maintained existing mature trees, they agreed to send a supportive letter to the board. We are in great shape for the Nov 24 hearing.',
      timestamp: 'Today, 9:40 AM',
    },
  ],

  sendChatMessage: (text, attachmentName) => {
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      authorName: get().user.name,
      text,
      timestamp: 'Just now',
      attachmentName,
    };
    set((state) => ({ chatMessages: [...state.chatMessages, newMsg] }));

    setTimeout(() => {
      const replyMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'expert',
        authorName: 'Elena Rostova (Senior Expediter)',
        avatarKey: 'avatar2',
        text: 'Received your message! Our Chicago zoning team is on it and reviewing your request. We will follow up with direct updates shortly.',
        timestamp: 'Just now',
      };
      set((state) => ({ chatMessages: [...state.chatMessages, replyMsg] }));
    }, 1200);
  },

  // Support Tickets / Enquiries
  tickets: INITIAL_TICKETS,
  createEnquiry: (data) => {
    const ticketNum = `#TK-${Math.floor(1000 + Math.random() * 9000)}`;
    const newTicket: Ticket = {
      id: ticketNum,
      subject: data.subject,
      topic: data.topic,
      relatedCase: data.relatedCase || 'General Chicago Zoning Review',
      priority: data.priority,
      status: 'Open',
      lastReplyTime: 'Just now',
      assignedConsultant: {
        name: 'Marcus Vance, Esq.',
        title: 'Principal Zoning Counsel',
        isOnline: true,
      },
      messages: [
        {
          id: `tm-${Date.now()}`,
          sender: 'user',
          authorName: get().user.name,
          text: data.message,
          time: 'Just now',
          attachment: data.attachment,
        },
      ],
    };

    set((state) => ({ tickets: [newTicket, ...state.tickets] }));
    get().showToast('Ticket raised');

    // Simulate auto-acknowledgement after 1.5s
    setTimeout(() => {
      set((state) => ({
        tickets: state.tickets.map((t) =>
          t.id === ticketNum
            ? {
                ...t,
                messages: [
                  ...t.messages,
                  {
                    id: `tm-${Date.now() + 1}`,
                    sender: 'consultant',
                    authorName: 'Marcus Vance, Esq.',
                    text: `Thank you for reaching out regarding "${data.subject}". We have logged your request under ${ticketNum} and our municipal team is reviewing the Cook County ordinance parameters right now.`,
                    time: 'Just now',
                  },
                ],
              }
            : t
        ),
      }));
    }, 1500);

    return ticketNum;
  },

  sendTicketReply: (ticketId, text) => {
    const userMsg: TicketMessage = {
      id: `tm-${Date.now()}`,
      sender: 'user',
      authorName: get().user.name,
      text,
      time: 'Just now',
    };

    set((state) => ({
      tickets: state.tickets.map((t) =>
        t.id === ticketId
          ? {
              ...t,
              lastReplyTime: 'Just now',
              messages: [...t.messages, userMsg],
            }
          : t
      ),
    }));

    setTimeout(() => {
      const replyMsg: TicketMessage = {
        id: `tm-${Date.now() + 2}`,
        sender: 'consultant',
        authorName: 'Marcus Vance, Esq.',
        text: 'Received! We have added this note directly to your City Hall expediente and will advise on next steps.',
        time: 'Just now',
      };

      set((state) => ({
        tickets: state.tickets.map((t) =>
          t.id === ticketId
            ? {
                ...t,
                lastReplyTime: 'Just now',
                messages: [...t.messages, replyMsg],
              }
            : t
        ),
      }));
    }, 1200);
  },

  // Invoices & Billing
  invoices: INITIAL_INVOICES,
  payInvoice: (invoiceId) => {
    set((state) => ({
      invoices: state.invoices.map((inv) =>
        inv.id === invoiceId ? { ...inv, status: 'Paid' as const } : inv
      ),
    }));
    get().showToast(`Payment successful! Invoice ${invoiceId} marked as Paid.`);
  },

  payOutstandingBalance: () => {
    set((state) => ({
      invoices: state.invoices.map((inv) => ({ ...inv, status: 'Paid' as const })),
    }));
    get().showToast('Payment successful! All outstanding balances cleared.');
  },

  // Quotes
  quotesList: INITIAL_QUOTES_LIST,
  acceptAndPayQuote: (quoteId) => {
    set((state) => ({
      quotesList: state.quotesList.map((q) =>
        q.id === quoteId || q.quoteNumber === quoteId
          ? { ...q, status: 'Accepted & Paid' as const }
          : q
      ),
    }));
    get().showToast('Payment successful! Quote accepted and retainer recorded.');
  },

  addQuoteRequest: (quote) => {
    const quoteNum = `WW-QT-2026-${Math.floor(50 + Math.random() * 50)}`;
    const newQuote: QuoteItem = {
      id: `quote-${Date.now()}`,
      quoteNumber: quoteNum,
      service: quote.service || 'Zoning Consultation & Fee Estimate',
      address: quote.address || 'Chicago, IL',
      estimateAmount: quote.estimateAmount || 1500.0,
      status: 'In Review',
      dateSubmitted: 'Today',
      scope: quote.scope || 'Preliminary parcel review and zoning fee assessment.',
    };
    set((state) => ({ quotesList: [newQuote, ...state.quotesList] }));
    get().showToast(`Quote request ${quoteNum} submitted`);
  },

  notifications: INITIAL_NOTIFICATIONS,
  markNotificationRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),
  markAllNotificationsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
    })),
  deleteNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
  notificationSettings: {
    caseUpdates: true,
    appointments: true,
    zoningAlerts: true,
    messages: true,
    push: true,
  },
  toggleNotificationSetting: (key) =>
    set((state) => ({
      notificationSettings: {
        ...state.notificationSettings,
        [key]: !state.notificationSettings[key],
      },
    })),

  quotes: INITIAL_QUOTES,
  submitQuoteRequest: (quote) =>
    set((state) => ({
      quotes: [
        {
          ...quote,
          id: `quote-${Date.now()}`,
          dateSubmitted: new Date().toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          }),
          status: 'Received',
        },
        ...state.quotes,
      ],
    })),

  desktopFrameMode: true,
  toggleDesktopFrameMode: () =>
    set((state) => ({ desktopFrameMode: !state.desktopFrameMode })),
}));
