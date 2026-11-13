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
  description: string;
  count: number;
}

export const VAULT_FOLDERS: VaultFolder[] = [
  { id: 'surveys', name: 'Surveys & Plats', description: 'Boundary, topographic & ALTA cadastral surveys', count: 4 },
  { id: 'plans', name: 'Architectural Plans', description: 'CAD, BIM schematics, elevations & site plans', count: 6 },
  { id: 'permits', name: 'Permits & Approvals', description: 'DOB stamps, certificates & administrative relief', count: 5 },
  { id: 'notices', name: 'Hearing Notices', description: 'ZBA certified mailings & City Hall affidavits', count: 3 },
];

export const INITIAL_VAULT_FILES: VaultFile[] = [
  { id: 'f-1', name: 'Plat_of_Survey_Certified_2026.pdf', folderId: 'surveys', size: '4.2 MB', type: 'PDF', uploadDate: 'Oct 14, 2026', verified: true },
  { id: 'f-2', name: 'ALTA_Boundary_Topographic_Survey.pdf', folderId: 'surveys', size: '8.1 MB', type: 'PDF', uploadDate: 'Oct 18, 2026', verified: true },
  { id: 'f-3', name: 'Architectural_Site_Elevation_A101.dwg', folderId: 'plans', size: '15.6 MB', type: 'DWG', uploadDate: 'Nov 02, 2026', verified: true },
  { id: 'f-4', name: 'FAR_Building_Envelope_Schematic.pdf', folderId: 'plans', size: '2.9 MB', type: 'PDF', uploadDate: 'Nov 04, 2026', verified: true },
  { id: 'f-5', name: 'DOB_Standard_Plan_Review_Application.pdf', folderId: 'permits', size: '1.2 MB', type: 'PDF', uploadDate: 'Nov 05, 2026', verified: true },
  { id: 'f-6', name: 'ZBA_Public_Notice_Receipts_Certified.pdf', folderId: 'notices', size: '850 KB', type: 'PDF', uploadDate: 'Nov 06, 2026', verified: true },
];

