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
    isLoggedIn: boolean;
  };
  updateUserProfile: (updates: Partial<AppState['user']>) => void;
  toggleSavedService: (serviceId: string) => void;

  // Client Cases & Appointments
  cases: ClientCase[];
  appointments: Appointment[];
  activeCaseFilter: 'Active' | 'Completed';
  setActiveCaseFilter: (filter: 'Active' | 'Completed') => void;
  addAppointment: (appointment: Omit<Appointment, 'id'>) => void;
  addCase: (newCase: Omit<ClientCase, 'id'>) => void;

  // Vault Documents
  vaultFiles: VaultFile[];
  activeVaultFolder: 'surveys' | 'plans' | 'permits' | 'notices';
  setActiveVaultFolder: (folder: 'surveys' | 'plans' | 'permits' | 'notices') => void;
  uploadVaultFile: (file: Omit<VaultFile, 'id'>) => void;

  // In-App Chat
  chatMessages: ChatMessage[];
  sendChatMessage: (text: string, attachmentName?: string) => void;

  // Notifications
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

  // Quote Submissions
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

  quotes: [],
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
