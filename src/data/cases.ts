export interface CaseTimelineStage {
  id: string;
  stage: string;
  date: string;
  completed: boolean;
  current: boolean;
  notes: string;
}

export interface CaseDocument {
  id: string;
  name: string;
  type: 'PDF' | 'DWG' | 'DOCX' | 'JPG';
  size: string;
  uploadDate: string;
  status: 'Verified' | 'Pending Review' | 'Submitted to City';
  downloadUrl: string;
}

export interface CaseUpdate {
  id: string;
  date: string;
  title: string;
  message: string;
  author: string;
}

export interface ClientCase {
  id: string;
  caseNumber: string;
  title: string;
  type: 'Zoning Appeal' | 'Permit Assistance' | 'Feasibility Study' | 'Variance Request';
  address: string;
  status: 'Submitted' | 'Under Review' | 'Hearing Scheduled' | 'Approved' | 'Denied';
  statusColor: 'primary' | 'warning' | 'success' | 'danger';
  dateSubmitted: string;
  nextDate: string;
  nextEventTitle: string;
  assignedExpert: {
    name: string;
    role: string;
    avatarKey: string;
    phone: string;
    email: string;
  };
  imageKey: string;
  category: 'Active' | 'Completed';
  timeline: CaseTimelineStage[];
  documents: CaseDocument[];
  updates: CaseUpdate[];
}

export interface Appointment {
  id: string;
  caseNumber?: string;
  serviceCode?: string;
  title: string;
  serviceCategory?: 'zoning' | 'construction';
  type: 'Phone' | 'Video' | 'Office' | 'In-office' | 'Site Visit' | 'Site visit';
  date: string;
  time: string;
  expertName: string;
  expertRole?: 'Assigned Counsel' | 'Assigned Architect';
  location: string;
  propertyAddress?: string;
  packageDetails?: string;
  amountPaid?: number;
  status: 'Confirmed' | 'Completed' | 'Rescheduled';
  summaryNotes?: string;
  deliverables?: string[];
}

export const CLIENT_CASES: ClientCase[] = [
  {
    id: 'case-1',
    caseNumber: 'WW-2026-0842',
    title: 'Rear Yard Setback Variance & 3-Flat Expansion',
    type: 'Variance Request',
    address: '2144 N. Damen Ave, Chicago, IL 60647',
    status: 'Hearing Scheduled',
    statusColor: 'primary',
    dateSubmitted: 'Oct 14, 2026',
    nextDate: 'Nov 24, 2026',
    nextEventTitle: 'Chicago ZBA Board Public Hearing',
    assignedExpert: {
      name: 'Marcus Vance',
      role: 'Principal Zoning Strategist',
      avatarKey: 'aboutFounder',
      phone: '630-635-7688',
      email: 'dubbs.mgmt@gmail.com',
    },
    imageKey: 'portfolioCurrent2',
    category: 'Active',
    timeline: [
      {
        id: 't-1',
        stage: 'Application Intake & Cadastral Audit',
        date: 'Oct 14, 2026',
        completed: true,
        current: false,
        notes: 'Zoning classification RT-4 verified. 12-page hardship brief prepared.',
      },
      {
        id: 't-2',
        stage: 'Aldermanic & Community Consultation',
        date: 'Oct 29, 2026',
        completed: true,
        current: false,
        notes: '32nd Ward community advisory committee presentation completed. No objections.',
      },
      {
        id: 't-3',
        stage: 'ZBA Public Notice & Neighbor Certified Mailings',
        date: 'Nov 05, 2026',
        completed: true,
        current: false,
        notes: 'Certified mailings dispatched to all property owners within 250 feet.',
      },
      {
        id: 't-4',
        stage: 'City Hall Zoning Board of Appeals Hearing',
        date: 'Nov 24, 2026',
        completed: false,
        current: true,
        notes: 'Hearing scheduled at 121 N LaSalle St, Room 201. Expert witness testimony prepared.',
      },
      {
        id: 't-5',
        stage: 'Written Resolution & Stamped Approval',
        date: 'Dec 10, 2026 [ESTIMATED]',
        completed: false,
        current: false,
        notes: 'Formal city resolution publication and building permit release clearance.',
      },
    ],
    documents: [
      {
        id: 'd-1',
        name: 'Plat_of_Survey_Damen_2144.pdf',
        type: 'PDF',
        size: '3.4 MB',
        uploadDate: 'Oct 14, 2026',
        status: 'Verified',
        downloadUrl: '#',
      },
      {
        id: 'd-2',
        name: 'ZBA_Variance_Hardship_Brief_Signed.pdf',
        type: 'PDF',
        size: '1.8 MB',
        uploadDate: 'Oct 28, 2026',
        status: 'Submitted to City',
        downloadUrl: '#',
      },
      {
        id: 'd-3',
        name: 'Architectural_Setback_Elevation_v3.dwg',
        type: 'DWG',
        size: '14.2 MB',
        uploadDate: 'Nov 02, 2026',
        status: 'Verified',
        downloadUrl: '#',
      },
      {
        id: 'd-4',
        name: 'Certified_Neighbor_Notice_Affidavit.pdf',
        type: 'PDF',
        size: '950 KB',
        uploadDate: 'Nov 06, 2026',
        status: 'Submitted to City',
        downloadUrl: '#',
      },
    ],
    updates: [
      {
        id: 'u-1',
        date: 'Nov 06, 2026',
        title: 'Neighbor notices successfully completed',
        message: 'All certified return receipts have been logged and submitted to the ZBA secretary.',
        author: 'Marcus Vance',
      },
      {
        id: 'u-2',
        date: 'Oct 29, 2026',
        title: 'Aldermanic meeting concluded favorably',
        message: 'The ward zoning committee voiced support for the proposed setback modification.',
        author: 'Marcus Vance',
      },
    ],
  },
  {
    id: 'case-2',
    caseNumber: 'WW-2026-0791',
    title: 'Adaptive Reuse Commercial-to-Residential Permit Expediting',
    type: 'Permit Assistance',
    address: '920 W. Fulton Market, Chicago, IL 60607',
    status: 'Under Review',
    statusColor: 'primary',
    dateSubmitted: 'Sep 22, 2026',
    nextDate: 'Nov 18, 2026',
    nextEventTitle: 'Chicago DOB Zoning Examiner 2nd Review',
    assignedExpert: {
      name: 'Elena Rostova',
      role: 'Senior Municipal Expediter',
      avatarKey: 'avatar2',
      phone: '630-635-7688',
      email: 'dubbs.mgmt@gmail.com',
    },
    imageKey: 'servicePermits',
    category: 'Active',
    timeline: [
      {
        id: 't-21',
        stage: 'Architectural & MEP Plan Intake',
        date: 'Sep 22, 2026',
        completed: true,
        current: false,
        notes: 'Full plan set uploaded into Chicago E-Plan system.',
      },
      {
        id: 't-22',
        stage: 'First Round Examiner Corrections Cleared',
        date: 'Oct 19, 2026',
        completed: true,
        current: false,
        notes: 'Fire prevention and zoning egress comments resolved.',
      },
      {
        id: 't-23',
        stage: 'Secondary Plan Examiner Review',
        date: 'Nov 18, 2026',
        completed: false,
        current: true,
        notes: 'Final structural & plumbing clearance currently underway.',
      },
      {
        id: 't-24',
        stage: 'Permit Fee Assessment & Stamp Issuance',
        date: 'Nov 30, 2026 [ESTIMATED]',
        completed: false,
        current: false,
        notes: 'Final permit placard release.',
      },
    ],
    documents: [
      {
        id: 'd-21',
        name: 'Fulton_E-Plan_Architectural_Set.pdf',
        type: 'PDF',
        size: '18.7 MB',
        uploadDate: 'Sep 22, 2026',
        status: 'Submitted to City',
        downloadUrl: '#',
      },
      {
        id: 'd-22',
        name: 'Zoning_Egress_Compliance_Sheet.pdf',
        type: 'PDF',
        size: '2.1 MB',
        uploadDate: 'Oct 18, 2026',
        status: 'Verified',
        downloadUrl: '#',
      },
    ],
    updates: [
      {
        id: 'u-21',
        date: 'Oct 20, 2026',
        title: 'Zoning examiner signed off',
        message: 'The Chicago DOB zoning division officially cleared the change of occupancy.',
        author: 'Elena Rostova',
      },
    ],
  },
  {
    id: 'case-3',
    caseNumber: 'WW-2026-0612',
    title: 'Logan Square Mixed-Use TOD Feasibility Study',
    type: 'Feasibility Study',
    address: '2640 N. Milwaukee Ave, Chicago, IL 60647',
    status: 'Approved',
    statusColor: 'success',
    dateSubmitted: 'Aug 04, 2026',
    nextDate: 'Completed',
    nextEventTitle: 'Final Feasibility Report Delivered',
    assignedExpert: {
      name: 'Marcus Vance',
      role: 'Principal Zoning Strategist',
      avatarKey: 'aboutFounder',
      phone: '630-635-7688',
      email: 'dubbs.mgmt@gmail.com',
    },
    imageKey: 'portfolioPast2',
    category: 'Completed',
    timeline: [
      {
        id: 't-31',
        stage: 'Site Survey & Historical Analysis',
        date: 'Aug 04, 2026',
        completed: true,
        current: false,
        notes: 'Historical designation checks and TOD proximity verified (within 600ft of California Blue Line).',
      },
      {
        id: 't-32',
        stage: 'Density & FAR Modeling (B3-3 vs B3-5)',
        date: 'Aug 14, 2026',
        completed: true,
        current: false,
        notes: 'Modeled maximum yield showing 42 dwelling units with parking reduction waiver.',
      },
      {
        id: 't-33',
        stage: 'Final Written Zoning Dossier Delivered',
        date: 'Aug 22, 2026',
        completed: true,
        current: false,
        notes: 'Delivered to acquisition investment team. Acquisition closed successfully.',
      },
    ],
    documents: [
      {
        id: 'd-31',
        name: 'Milwaukee_TOD_Feasibility_Report_Final.pdf',
        type: 'PDF',
        size: '12.4 MB',
        uploadDate: 'Aug 22, 2026',
        status: 'Verified',
        downloadUrl: '#',
      },
    ],
    updates: [
      {
        id: 'u-31',
        date: 'Aug 22, 2026',
        title: 'Project Entitlements Fully Mapped',
        message: 'Delivered comprehensive 28-page study. Project now proceeding to schematic design.',
        author: 'Marcus Vance',
      },
    ],
  },
  {
    id: 'case-4',
    caseNumber: 'WW-2026-0504',
    title: 'Lincoln Park Special Use Permit for Daycare Center',
    type: 'Permit Assistance',
    address: '1850 N. Clark St, Chicago, IL 60614',
    status: 'Approved',
    statusColor: 'success',
    dateSubmitted: 'Jun 10, 2026',
    nextDate: 'Completed',
    nextEventTitle: 'Special Use Certificate Awarded',
    assignedExpert: {
      name: 'Elena Rostova',
      role: 'Senior Municipal Expediter',
      avatarKey: 'avatar2',
      phone: '630-635-7688',
      email: 'dubbs.mgmt@gmail.com',
    },
    imageKey: 'portfolioPast1',
    category: 'Completed',
    timeline: [
      {
        id: 't-41',
        stage: 'Application Filed',
        date: 'Jun 10, 2026',
        completed: true,
        current: false,
        notes: 'B1-3 Special use application registered.',
      },
      {
        id: 't-42',
        stage: 'Hearing & Approval',
        date: 'Jul 28, 2026',
        completed: true,
        current: false,
        notes: 'Unanimous ZBA vote granting special use permit.',
      },
    ],
    documents: [
      {
        id: 'd-41',
        name: 'ZBA_Resolution_Special_Use_Approval.pdf',
        type: 'PDF',
        size: '1.4 MB',
        uploadDate: 'Jul 30, 2026',
        status: 'Verified',
        downloadUrl: '#',
      },
    ],
    updates: [
      {
        id: 'u-41',
        date: 'Jul 30, 2026',
        title: 'Special Use Ordinance Granted',
        message: 'City Council approved certificate received. Client officially licensed to operate.',
        author: 'Elena Rostova',
      },
    ],
  },
];

export const UPCOMING_APPOINTMENTS: Appointment[] = [
  {
    id: 'app-1',
    caseNumber: 'WW-2026-0842',
    serviceCode: 'WW-2026-0842',
    title: 'ZBA Hearing Strategy Dry-Run',
    serviceCategory: 'zoning',
    type: 'Video',
    date: 'Nov 20, 2026',
    time: '10:00 AM CST',
    expertName: 'Marcus Vance, Esq.',
    expertRole: 'Assigned Counsel',
    location: 'Google Meet Secure Room',
    propertyAddress: '2144 N. Damen Ave, Chicago, IL 60647',
    packageDetails: 'Standard Strategy Package',
    amountPaid: 450.0,
    status: 'Confirmed',
  },
  {
    id: 'app-2',
    caseNumber: 'WW-2026-0791',
    serviceCode: 'WW-2026-0791',
    title: 'City Plan Examiner Status Briefing',
    serviceCategory: 'zoning',
    type: 'Phone',
    date: 'Nov 17, 2026',
    time: '2:30 PM CST',
    expertName: 'Elena Rostova',
    expertRole: 'Assigned Counsel',
    location: 'Phone Call (+1 312 555-0198)',
    propertyAddress: '1840 W. Division St, Chicago, IL 60622',
    packageDetails: 'Permit Assistance Review',
    amountPaid: 350.0,
    status: 'Confirmed',
  },
  // Sample Card a: WW-CON-01, Architectural Design Consultation, Nov 24, 2026 • 10:00 AM CST, Site Visit, Daniel Reyes, 1508 N Talman Ave, Chicago, IL 60622, Standard + 3D rendering, Paid $771.75
  {
    id: 'app-con-1',
    serviceCode: 'WW-CON-01',
    caseNumber: 'WW-CON-01',
    title: 'Architectural Design Consultation',
    serviceCategory: 'construction',
    date: 'Nov 24, 2026',
    time: '10:00 AM CST',
    type: 'Site Visit',
    expertName: 'Daniel Reyes',
    expertRole: 'Assigned Architect',
    propertyAddress: '1508 N Talman Ave, Chicago, IL 60622',
    packageDetails: 'Standard + 3D rendering',
    amountPaid: 771.75,
    location: '1508 N Talman Ave, Chicago, IL 60622',
    status: 'Confirmed',
  },
  // Sample Card b: WW-CON-04, Permit Drawings & Plans, Nov 26, 2026 • 1:00 PM CST, Video, Priya Nair, Paid $600
  {
    id: 'app-con-2',
    serviceCode: 'WW-CON-04',
    caseNumber: 'WW-CON-04',
    title: 'Permit Drawings & Plans',
    serviceCategory: 'construction',
    date: 'Nov 26, 2026',
    time: '1:00 PM CST',
    type: 'Video',
    expertName: 'Priya Nair',
    expertRole: 'Assigned Architect',
    propertyAddress: '2144 N. Damen Ave, Chicago, IL 60647',
    packageDetails: 'Standard Plan Set',
    amountPaid: 600.0,
    location: 'Google Meet Video Session',
    status: 'Confirmed',
  },
  // Sample Card c: WW-CON-03, Renovation & Addition Consultation, Dec 2, 2026 • 3:30 PM CST, Office, Daniel Reyes, Paid $200
  {
    id: 'app-con-3',
    serviceCode: 'WW-CON-03',
    caseNumber: 'WW-CON-03',
    title: 'Renovation & Addition Consultation',
    serviceCategory: 'construction',
    date: 'Dec 2, 2026',
    time: '3:30 PM CST',
    type: 'Office',
    expertName: 'Daniel Reyes',
    expertRole: 'Assigned Architect',
    propertyAddress: '432 W. Webster Ave, Chicago, IL 60614',
    packageDetails: 'Site Visit Assessment',
    amountPaid: 200.0,
    location: '125 S. Wacker Dr, Suite 1400, Chicago, IL',
    status: 'Confirmed',
  },
  // Past appointments
  {
    id: 'app-3',
    caseNumber: 'WW-2026-0618',
    serviceCode: 'WW-2026-0618',
    title: 'Preliminary Zoning & Setback Review',
    serviceCategory: 'zoning',
    type: 'Video',
    date: 'Oct 28, 2026',
    time: '11:00 AM CST',
    expertName: 'Marcus Vance, Esq.',
    expertRole: 'Assigned Counsel',
    location: 'Google Meet Secure Room',
    propertyAddress: '2144 N. Damen Ave, Chicago, IL',
    packageDetails: 'Standard Strategy Package',
    amountPaid: 450.0,
    status: 'Completed',
  },
  {
    id: 'app-4',
    caseNumber: 'WW-2026-0520',
    serviceCode: 'WW-2026-0520',
    title: 'ADU Coach House Ordinance Audit',
    serviceCategory: 'zoning',
    type: 'Office',
    date: 'Sep 15, 2026',
    time: '3:00 PM CST',
    expertName: 'Elena Rostova',
    expertRole: 'Assigned Counsel',
    location: '125 S. Wacker Dr, Suite 1400, Chicago',
    propertyAddress: '1508 N Talman Ave, Chicago, IL',
    packageDetails: 'Basic Ordinance Review',
    amountPaid: 450.0,
    status: 'Completed',
  },
  {
    id: 'app-con-past-1',
    caseNumber: 'WW-CON-05',
    serviceCode: 'WW-CON-05',
    title: '3D Visualization & Film',
    serviceCategory: 'construction',
    type: 'Video',
    date: 'Oct 12, 2026',
    time: '2:00 PM CST',
    expertName: 'Daniel Reyes',
    expertRole: 'Assigned Architect',
    propertyAddress: '910 W. Randolph St, Chicago, IL 60607',
    packageDetails: 'Full Plan + 3D rendering',
    amountPaid: 1450.0,
    location: 'Google Meet Studio',
    status: 'Completed',
    summaryNotes:
      'Completed 4K exterior daylight/twilight renderings and zoning envelope animation for West Loop mixed-use submission. All Chicago DOB massing and setback clearance checks verified.',
    deliverables: [
      'Rendering_Package_Randolph_St.pdf',
      'Zoning_Envelope_3D_Schematic.dwg',
    ],
  },
];

