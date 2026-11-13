export interface VaultFile {
  id: string;
  name: string;
  folderId: 'surveys' | 'plans' | 'permits' | 'notices';
  size: string;
  type: 'PDF' | 'DWG' | 'DOCX' | 'JPG';
  uploadDate: string;
  verified: boolean;
}

export interface VaultFolder {
  id: 'surveys' | 'plans' | 'permits' | 'notices';
  name: string;
  shortName: string;
  description: string;
  count: number;
}

export const VAULT_FOLDERS: VaultFolder[] = [
  { id: 'surveys', name: 'Surveys & Plats', shortName: 'Surveys', description: 'Cadastral & ALTA Boundary Surveys', count: 3 },
  { id: 'plans', name: 'Architectural Plans', shortName: 'Plans', description: 'CAD, BIM & Elevation Schematics', count: 3 },
  { id: 'permits', name: 'Permits & Approvals', shortName: 'Permits', description: 'DOB Stamps & Official Resolutions', count: 2 },
  { id: 'notices', name: 'Hearing Notices', shortName: 'Notices', description: 'ZBA Certified Mailings & Affidavits', count: 2 },
];

export const INITIAL_VAULT_FILES: VaultFile[] = [
  { id: 'f-1', name: 'Plat_of_Survey_Certified_2026.pdf', folderId: 'surveys', size: '4.2 MB', type: 'PDF', uploadDate: 'Oct 14, 2026', verified: true },
  { id: 'f-2', name: 'ALTA_Boundary_Topographic_Survey.pdf', folderId: 'surveys', size: '8.1 MB', type: 'PDF', uploadDate: 'Oct 18, 2026', verified: true },
  { id: 'f-9', name: 'Cook_County_GIS_Parcel_Audit_Record.pdf', folderId: 'surveys', size: '2.1 MB', type: 'PDF', uploadDate: 'Oct 22, 2026', verified: true },
  { id: 'f-3', name: 'Architectural_Site_Elevation_A101.dwg', folderId: 'plans', size: '15.6 MB', type: 'DWG', uploadDate: 'Nov 02, 2026', verified: true },
  { id: 'f-4', name: 'FAR_Building_Envelope_Schematic.pdf', folderId: 'plans', size: '2.9 MB', type: 'PDF', uploadDate: 'Nov 04, 2026', verified: true },
  { id: 'f-10', name: 'Structural_Framing_Section_Details_S201.dwg', folderId: 'plans', size: '11.4 MB', type: 'DWG', uploadDate: 'Nov 08, 2026', verified: true },
  { id: 'f-5', name: 'DOB_Standard_Plan_Review_Application.pdf', folderId: 'permits', size: '1.2 MB', type: 'PDF', uploadDate: 'Nov 05, 2026', verified: true },
  { id: 'f-7', name: 'City_Hall_ZBA_Resolution_Approval_Stamped.pdf', folderId: 'permits', size: '3.4 MB', type: 'PDF', uploadDate: 'Nov 10, 2026', verified: true },
  { id: 'f-6', name: 'ZBA_Public_Notice_Receipts_Certified.pdf', folderId: 'notices', size: '850 KB', type: 'PDF', uploadDate: 'Nov 06, 2026', verified: true },
  { id: 'f-8', name: 'Certified_Neighbor_Notice_Affidavit_250ft.pdf', folderId: 'notices', size: '1.8 MB', type: 'PDF', uploadDate: 'Nov 09, 2026', verified: true },
];
