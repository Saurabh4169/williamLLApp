import React, { useState } from 'react';
import {
  UploadCloud,
  FileText,
  Folder,
  Download,
  CheckCircle,
  FileCode,
  FileSpreadsheet,
  Plus,
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { VAULT_FOLDERS } from '../data/documentsVault';
import { AppHeader } from '../components/layout/AppHeader';
import { GlassCard } from '../components/ui/GlassCard';
import Badge from '../components/ui/Badge';

export const DocumentsVaultScreen: React.FC = () => {
  const { vaultFiles, activeVaultFolder, setActiveVaultFolder, uploadVaultFile } = useAppStore();
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);

  const filteredFiles = vaultFiles.filter((f) => f.folderId === activeVaultFolder);

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

      setUploadSuccess(`"${file.name}" uploaded successfully!`);
      setTimeout(() => setUploadSuccess(null), 3000);
    }
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'DWG':
        return <FileCode className="w-5 h-5 text-[#3D4D7C]" />;
      case 'DOCX':
        return <FileSpreadsheet className="w-5 h-5 text-[#3FA66B]" />;
      default:
        return <FileText className="w-5 h-5 text-[#E5484D]" />;
    }
  };

  return (
    <div className="min-h-full flex flex-col text-[#1F2A44] pb-6">
      <AppHeader title="Documents Vault" showBack />

      <div className="px-4 py-4 space-y-5">
        {/* Title Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-xl font-bold text-[#1F2A44] tracking-tight">
              Municipal Document Vault
            </h1>
            <p className="text-xs text-[#8A93A6]">
              Secure repository for cadastral surveys, architectural CAD plans, and city permit notices.
            </p>
          </div>
        </div>

        {/* Upload Alert */}
        {uploadSuccess && (
          <div className="p-3 bg-[#EAF6F0]/80 backdrop-blur-sm border border-[#3FA66B]/30 rounded-xl text-xs font-semibold text-[#2C784C] flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#3FA66B]" />
            <span>{uploadSuccess}</span>
          </div>
        )}

        {/* Folder Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          {VAULT_FOLDERS.map((folder) => {
            const isSelected = activeVaultFolder === folder.id;
            const count = vaultFiles.filter((f) => f.folderId === folder.id).length;

            return (
              <button
                key={folder.id}
                onClick={() => setActiveVaultFolder(folder.id)}
                className={`p-3.5 rounded-2xl border text-left transition-all select-none min-h-[44px] ${
                  isSelected
                    ? 'btn-glossy-navy shadow-md text-white'
                    : 'liquid-glass-card text-[#1F2A44] hover:border-[#3D4D7C]/40'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-[#3D4D7C]/10 text-[#3D4D7C]'
                    }`}
                  >
                    <Folder className="w-5 h-5" />
                  </div>
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      isSelected ? 'bg-white/20 text-white' : 'liquid-glass-chip text-[#1F2A44]'
                    }`}
                  >
                    {count}
                  </span>
                </div>

                <h3 className="font-heading text-sm font-bold truncate">
                  {folder.name}
                </h3>
                <p
                  className={`text-[10px] line-clamp-1 mt-0.5 ${
                    isSelected ? 'text-white/80' : 'text-[#8A93A6]'
                  }`}
                >
                  {folder.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Upload Action Card */}
        <GlassCard className="p-4 border border-dashed border-[#3D4D7C]/40 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#3D4D7C]/10 text-[#3D4D7C] flex items-center justify-center">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#1F2A44]">
                Upload to {VAULT_FOLDERS.find((f) => f.id === activeVaultFolder)?.name}
              </h4>
              <p className="text-[10px] text-[#8A93A6]">
                PDF, DWG, BIM files up to 50 MB
              </p>
            </div>
          </div>

          <label className="flex items-center gap-1.5 px-3 py-1.5 rounded-full btn-glossy-navy text-xs font-semibold shadow-xs cursor-pointer active:scale-95 transition-all">
            <Plus className="w-3.5 h-3.5" />
            <span>Upload</span>
            <input type="file" className="hidden" onChange={handleFileUpload} />
          </label>
        </GlassCard>

        {/* Files in Active Folder */}
        <div className="space-y-2.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#8A93A6] block">
            Files in {VAULT_FOLDERS.find((f) => f.id === activeVaultFolder)?.name} ({filteredFiles.length})
          </span>

          {filteredFiles.length === 0 ? (
            <GlassCard className="p-8 text-center text-[#8A93A6] text-xs">
              No documents in this folder yet. Use the upload button above.
            </GlassCard>
          ) : (
            filteredFiles.map((file) => (
              <GlassCard
                key={file.id}
                className="p-3.5 flex items-center justify-between"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-white/70 flex items-center justify-center flex-shrink-0">
                    {getFileIcon(file.type)}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-[#1F2A44] truncate max-w-[200px]">
                      {file.name}
                    </h4>
                    <div className="flex items-center gap-2 text-[10px] text-[#8A93A6] mt-0.5">
                      <span className="font-semibold text-[#3D4D7C]">{file.type}</span>
                      <span>&bull;</span>
                      <span>{file.size}</span>
                      <span>&bull;</span>
                      <span>{file.uploadDate}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="success" size="sm">
                    Verified
                  </Badge>
                  <button
                    onClick={() => alert(`Downloading "${file.name}"...`)}
                    aria-label={`Download ${file.name}`}
                    className="w-8 h-8 rounded-full liquid-glass-chip flex items-center justify-center text-[#1F2A44] hover:border-[#3D4D7C]/40"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </GlassCard>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentsVaultScreen;
