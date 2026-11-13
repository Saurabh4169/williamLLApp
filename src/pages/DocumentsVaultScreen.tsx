import React, { useState } from 'react';
import {
  UploadCloud,
  FileText,
  Folder,
  Download,
  CheckCircle2,
  FileCode,
  FileSpreadsheet,
  Plus,
  Search,
  Compass,
  Layers,
  Bell,
  Eye,
  Check,
  X,
  FileCheck2,
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { VAULT_FOLDERS, VaultFile } from '../data/documentsVault';
import AppHeader from '../components/layout/AppHeader';

export const DocumentsVaultScreen: React.FC = () => {
  const { vaultFiles, activeVaultFolder, setActiveVaultFolder, uploadVaultFile } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const [previewFile, setPreviewFile] = useState<VaultFile | null>(null);

  // Filter files by folder and search query
  const filteredFiles = vaultFiles.filter((f) => {
    const matchesFolder = f.folderId === activeVaultFolder;
    const matchesSearch =
      searchQuery.trim() === '' ||
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFolder && matchesSearch;
  });

  const activeFolder =
    VAULT_FOLDERS.find((f) => f.id === activeVaultFolder) || VAULT_FOLDERS[0];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const ext = file.name.split('.').pop()?.toUpperCase() || 'PDF';
      uploadVaultFile({
        name: file.name,
        folderId: activeVaultFolder,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        type: ext as 'PDF' | 'DWG' | 'DOCX' | 'JPG',
        uploadDate: 'Just now',
        verified: true,
      });

      setUploadSuccess(`"${file.name}" uploaded to ${activeFolder.name}!`);
      setTimeout(() => setUploadSuccess(null), 3500);
    }
  };

  const handleDownload = (file: VaultFile) => {
    setDownloadSuccess(`Downloaded "${file.name}" (${file.size})`);
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'DWG':
        return (
          <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center flex-shrink-0">
            <FileCode className="w-4 h-4 stroke-[2]" />
          </div>
        );
      case 'DOCX':
        return (
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
            <FileSpreadsheet className="w-4 h-4 stroke-[2]" />
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-500 flex items-center justify-center flex-shrink-0">
            <FileText className="w-4 h-4 stroke-[2]" />
          </div>
        );
    }
  };

  const getFolderIcon = (id: string, isSelected: boolean) => {
    switch (id) {
      case 'surveys':
        return <Compass className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-sky-600'}`} />;
      case 'plans':
        return <Layers className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-purple-600'}`} />;
      case 'permits':
        return <CheckCircle2 className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-emerald-600'}`} />;
      case 'notices':
        return <Bell className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-amber-600'}`} />;
      default:
        return <Folder className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-[#3D4D7C]'}`} />;
    }
  };

  const getFolderIconBg = (id: string, isSelected: boolean) => {
    if (isSelected) return 'bg-white/20';
    switch (id) {
      case 'surveys':
        return 'bg-sky-50';
      case 'plans':
        return 'bg-purple-50';
      case 'permits':
        return 'bg-emerald-50';
      case 'notices':
        return 'bg-amber-50';
      default:
        return 'bg-slate-100';
    }
  };

  return (
    <div className="min-h-full flex flex-col text-[#1F2A44] bg-[#F2F3F5] pb-28">
      {/* Header */}
      <AppHeader title="Documents Vault" showBack />

      <div className="px-4 py-3 space-y-3 max-w-md mx-auto w-full">
        {/* 1. Document Search Bar */}
        <div className="relative">
          <div className="h-10 bg-white rounded-full border border-[#DDE2EA] shadow-2xs flex items-center px-3.5 gap-2.5 focus-within:ring-2 focus-within:ring-[#3D4D7C] focus-within:border-transparent transition-all">
            <Search className="w-4 h-4 text-[#8A93A6] flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by file name, survey type, DWG..."
              className="flex-1 bg-transparent text-xs text-[#1F2A44] placeholder-[#8A93A6] focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-[11px] font-bold text-[#8A93A6] hover:text-[#1F2A44]"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Upload Success Feedback Toast */}
        {uploadSuccess && (
          <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-[14px] text-xs font-semibold text-emerald-800 flex items-center gap-2 shadow-2xs animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span className="truncate">{uploadSuccess}</span>
          </div>
        )}

        {/* Download Success Feedback Toast */}
        {downloadSuccess && (
          <div className="p-2.5 bg-sky-50 border border-sky-200 rounded-[14px] text-xs font-semibold text-sky-800 flex items-center gap-2 shadow-2xs animate-fade-in">
            <Download className="w-4 h-4 text-sky-600 flex-shrink-0" />
            <span className="truncate">{downloadSuccess}</span>
          </div>
        )}

        {/* 2. Folder Navigation Grid (Phone-Proportioned 2x2 Grid) */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between px-0.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A93A6]">
              Vault Folders
            </span>
            <span className="text-[10px] font-semibold text-[#3D4D7C]">
              {vaultFiles.length} total records
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {VAULT_FOLDERS.map((folder) => {
              const isSelected = activeVaultFolder === folder.id;
              const count = vaultFiles.filter((f) => f.folderId === folder.id).length;

              return (
                <button
                  key={folder.id}
                  type="button"
                  onClick={() => setActiveVaultFolder(folder.id)}
                  className={`p-2.5 rounded-[16px] text-left transition-all select-none border flex flex-col justify-between active:scale-98 ${
                    isSelected
                      ? 'bg-[#1F2A44] text-white border-[#1F2A44] shadow-xs'
                      : 'bg-white text-[#1F2A44] border-[#DDE2EA] hover:border-[#3D4D7C]/40 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${getFolderIconBg(
                        folder.id,
                        isSelected
                      )}`}
                    >
                      {getFolderIcon(folder.id, isSelected)}
                    </div>
                    <span
                      className={`text-[9.5px] font-bold px-1.5 py-0.5 rounded-full ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : 'bg-[#F2F4F8] text-[#5A657D]'
                      }`}
                    >
                      {count} {count === 1 ? 'file' : 'files'}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-heading text-xs font-bold leading-tight truncate">
                      {folder.name}
                    </h3>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Quick Upload Action Bar */}
        <div className="p-2.5 sm:p-3 rounded-[16px] bg-white border border-[#DDE2EA] shadow-2xs flex items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center flex-shrink-0">
              <UploadCloud className="w-4 h-4 stroke-[2]" />
            </div>
            <div className="min-w-0">
              <h4 className="font-heading text-xs font-bold text-[#1F2A44] truncate">
                Upload to {activeFolder.shortName}
              </h4>
              <p className="text-[10px] text-[#8A93A6] truncate">
                PDF, DWG, BIM files up to 50 MB
              </p>
            </div>
          </div>

          <label className="flex items-center gap-1 px-3 py-1.5 rounded-full btn-glossy-navy text-xs font-bold shadow-2xs cursor-pointer active:scale-95 transition-all flex-shrink-0">
            <Plus className="w-3.5 h-3.5" />
            <span>Upload</span>
            <input type="file" className="hidden" onChange={handleFileUpload} />
          </label>
        </div>

        {/* 4. Structured Files List */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between px-0.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A93A6]">
              Files in {activeFolder.name} ({filteredFiles.length})
            </span>
            <span className="text-[10px] font-semibold text-[#3FA66B] flex items-center gap-1">
              <FileCheck2 className="w-3 h-3" />
              <span>Certified</span>
            </span>
          </div>

          {filteredFiles.length === 0 ? (
            <div className="p-6 text-center bg-white rounded-[16px] border border-[#DDE2EA] space-y-1.5 shadow-2xs">
              <Folder className="w-8 h-8 text-[#8A93A6] mx-auto opacity-40" />
              <h4 className="font-heading text-xs font-bold text-[#1F2A44]">
                No files found
              </h4>
              <p className="text-[11px] text-[#8A93A6] max-w-xs mx-auto">
                {searchQuery
                  ? `No documents matching "${searchQuery}" in this folder.`
                  : `This folder currently has no files. Upload your first document above.`}
              </p>
            </div>
          ) : (
            <div className="space-y-1.5">
              {filteredFiles.map((file) => (
                <div
                  key={file.id}
                  className="p-2.5 rounded-[14px] bg-white border border-[#DDE2EA] shadow-2xs flex items-center justify-between gap-2 hover:border-[#3D4D7C]/40 hover:shadow-xs transition-all"
                >
                  <div
                    className="flex items-center gap-2.5 min-w-0 flex-1 cursor-pointer"
                    onClick={() => setPreviewFile(file)}
                  >
                    {getFileIcon(file.type)}

                    <div className="min-w-0 flex-1">
                      <h4 className="font-heading text-xs font-bold text-[#1F2A44] truncate">
                        {file.name}
                      </h4>

                      <div className="flex items-center gap-1.5 text-[10px] text-[#8A93A6] mt-0.5">
                        <span className="font-bold text-[#3D4D7C]">{file.type}</span>
                        <span>&bull;</span>
                        <span>{file.size}</span>
                        <span>&bull;</span>
                        <span>{file.uploadDate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <span className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[8.5px] font-bold">
                      <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                      <span>Verified</span>
                    </span>

                    <button
                      type="button"
                      onClick={() => setPreviewFile(file)}
                      aria-label={`Preview ${file.name}`}
                      className="w-7 h-7 rounded-full bg-[#F2F4F8] hover:bg-slate-200 text-[#1F2A44] flex items-center justify-center active:scale-90 transition-all"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDownload(file)}
                      aria-label={`Download ${file.name}`}
                      className="w-7 h-7 rounded-full btn-glossy-navy text-white flex items-center justify-center active:scale-90 transition-all shadow-2xs"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Document Quick Preview Modal */}
      {previewFile && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-t-[24px] sm:rounded-[20px] p-4 max-w-sm w-full space-y-3.5 border border-[#DDE2EA] shadow-xl">
            <div className="flex items-center justify-between pb-2 border-b border-[#DDE2EA]">
              <div className="flex items-center gap-2 min-w-0">
                {getFileIcon(previewFile.type)}
                <div className="min-w-0">
                  <h3 className="font-heading text-xs font-bold text-[#1F2A44] truncate">
                    {previewFile.name}
                  </h3>
                  <p className="text-[10px] text-[#8A93A6]">
                    {previewFile.type} &bull; {previewFile.size} &bull; {previewFile.uploadDate}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setPreviewFile(null)}
                className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-[#5A657D] hover:bg-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Document Preview Placeholder Box */}
            <div className="h-44 rounded-[14px] bg-[#F8F9FA] border border-dashed border-[#DDE2EA] flex flex-col items-center justify-center text-center p-3 space-y-2">
              <FileCheck2 className="w-10 h-10 text-[#3FA66B]" />
              <div>
                <p className="text-xs font-bold text-[#1F2A44]">
                  Cook County Certified Document
                </p>
                <p className="text-[10.5px] text-[#8A93A6] mt-0.5">
                  Official municipal digital copy with DOB verification stamp.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  handleDownload(previewFile);
                  setPreviewFile(null);
                }}
                className="flex-1 h-9 rounded-full btn-glossy-navy text-xs font-bold text-white flex items-center justify-center gap-1.5 shadow-2xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Official File</span>
              </button>
              <button
                type="button"
                onClick={() => setPreviewFile(null)}
                className="h-9 px-4 rounded-full bg-slate-100 text-xs font-bold text-[#5A657D] hover:bg-slate-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentsVaultScreen;
