import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCheck, Sliders, BellOff, X } from 'lucide-react';
import { useAppStore, AppNotification } from '../store/useAppStore';
import AppHeader from '../components/layout/AppHeader';
import NotificationItem from '../components/features/NotificationItem';
import GlassCard from '../components/ui/GlassCard';
import GlassButton from '../components/ui/GlassButton';

export const NotificationsScreen: React.FC = () => {
  const navigate = useNavigate();
  const {
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    deleteNotification,
    notificationSettings,
    toggleNotificationSetting,
  } = useAppStore();

  const [activeTab, setActiveTab] = useState<'All' | 'Cases' | 'Appointments' | 'Updates'>('All');
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  // Filter by tab
  const filteredNotifications = notifications.filter((item) => {
    if (activeTab === 'Cases') return item.type === 'case';
    if (activeTab === 'Appointments') return item.type === 'appointment';
    if (activeTab === 'Updates') return item.type === 'update' || item.type === 'document' || item.type === 'message';
    return true;
  });

  // Group by Today, Yesterday, Earlier
  const groups: { [key: string]: AppNotification[] } = {
    Today: filteredNotifications.filter((n) => n.group === 'Today'),
    Yesterday: filteredNotifications.filter((n) => n.group === 'Yesterday'),
    Earlier: filteredNotifications.filter((n) => n.group === 'Earlier'),
  };

  const hasNotifications = filteredNotifications.length > 0;

  return (
    <div className="min-h-full flex flex-col pb-6">
      {/* AppHeader with "Mark all read" action */}
      <AppHeader
        title="Notifications"
        showBack
        rightAction={
          <button
            onClick={markAllNotificationsRead}
            className="flex items-center gap-1 text-xs font-semibold text-[#3D4D7C] hover:text-[#1F2A44] transition-colors px-2 py-1.5 rounded-full liquid-glass-chip"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span className="hidden xs:inline min-[360px]:inline">Mark all read</span>
          </button>
        }
      />

      <div className="px-4 py-4 space-y-4">
        {/* Segmented Filter Control */}
        <div className="flex rounded-full liquid-glass-chip p-1 shadow-xs">
          {(['All', 'Cases', 'Appointments', 'Updates'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-full transition-all select-none min-h-[36px] ${
                activeTab === tab
                  ? 'nav-pill-active text-white shadow-xs'
                  : 'text-[#8A93A6] hover:text-[#1F2A44]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Grouped Notifications List */}
        {hasNotifications ? (
          <div className="space-y-4">
            {(['Today', 'Yesterday', 'Earlier'] as const).map((groupName) => {
              const items = groups[groupName];
              if (!items || items.length === 0) return null;

              return (
                <div key={groupName} className="space-y-2">
                  <div className="sticky top-16 z-20 py-1 px-1 text-[11px] font-bold uppercase tracking-wider text-[#8A93A6] flex items-center justify-between">
                    <span>{groupName}</span>
                    <span className="text-[10px] font-medium text-[#8A93A6]/80">
                      Swipe &larr; delete / read &rarr;
                    </span>
                  </div>

                  <div className="space-y-2">
                    {items.map((notification) => (
                      <NotificationItem
                        key={notification.id}
                        notification={notification}
                        onRead={markNotificationRead}
                        onDelete={deleteNotification}
                        onClick={(link) => navigate(link)}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="liquid-glass-card p-8 text-center space-y-3 mt-6">
            <div className="w-16 h-16 rounded-full bg-[#3D4D7C]/10 text-[#3D4D7C] flex items-center justify-center mx-auto">
              <BellOff className="w-8 h-8 stroke-[1.75]" />
            </div>
            <h3 className="font-heading text-lg font-bold text-[#1F2A44]">
              You're All Caught Up!
            </h3>
            <p className="text-xs text-[#8A93A6] max-w-xs mx-auto leading-relaxed">
              No new proceedings or appointment alerts right now. We will notify you when the City Hall or ZBA schedule updates.
            </p>
          </div>
        )}

        {/* Notification Settings Link */}
        <div className="pt-2 text-center">
          <button
            onClick={() => setShowSettingsModal(true)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#3D4D7C] hover:underline"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Manage Notification Preferences</span>
          </button>
        </div>
      </div>

      {/* Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-sm bg-white rounded-t-card-lg sm:rounded-card-lg p-5 shadow-2xl space-y-4 animate-in slide-in-from-bottom-4">
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-base font-bold text-[#1F2A44]">
                Notification Settings
              </h3>
              <button
                onClick={() => setShowSettingsModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[#1F2A44]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 divide-y divide-[#DDE2EA] text-xs">
              <div className="pt-2 flex items-center justify-between">
                <div>
                  <span className="font-bold text-[#1F2A44] block">Case Updates</span>
                  <span className="text-[#8A93A6]">ZBA hearings, filings, and denials</span>
                </div>
                <input
                  type="checkbox"
                  checked={notificationSettings.caseUpdates}
                  onChange={() => toggleNotificationSetting('caseUpdates')}
                  className="w-5 h-5 accent-[#3D4D7C] rounded"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <div>
                  <span className="font-bold text-[#1F2A44] block">Appointments</span>
                  <span className="text-[#8A93A6]">Reminders &amp; confirmations</span>
                </div>
                <input
                  type="checkbox"
                  checked={notificationSettings.appointments}
                  onChange={() => toggleNotificationSetting('appointments')}
                  className="w-5 h-5 accent-[#3D4D7C] rounded"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <div>
                  <span className="font-bold text-[#1F2A44] block">Chicago Zoning Alerts</span>
                  <span className="text-[#8A93A6]">City Council ordinances &amp; ARO</span>
                </div>
                <input
                  type="checkbox"
                  checked={notificationSettings.zoningAlerts}
                  onChange={() => toggleNotificationSetting('zoningAlerts')}
                  className="w-5 h-5 accent-[#3D4D7C] rounded"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <div>
                  <span className="font-bold text-[#1F2A44] block">Consultant Messages</span>
                  <span className="text-[#8A93A6]">Direct replies in chat</span>
                </div>
                <input
                  type="checkbox"
                  checked={notificationSettings.messages}
                  onChange={() => toggleNotificationSetting('messages')}
                  className="w-5 h-5 accent-[#3D4D7C] rounded"
                />
              </div>
            </div>

            <GlassButton
              variant="primary"
              fullWidth
              onClick={() => setShowSettingsModal(false)}
            >
              Done
            </GlassButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsScreen;

