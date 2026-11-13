import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Briefcase, Calendar, FileText, Bell, MessageSquare, Trash2, Check } from 'lucide-react';
import { AppNotification } from '../../store/useAppStore';

export interface NotificationItemProps {
  notification: AppNotification;
  onRead: (id: string) => void;
  onDelete: (id: string) => void;
  onClick: (link: string) => void;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onRead,
  onDelete,
  onClick,
}) => {
  const x = useMotionValue(0);
  const deleteOpacity = useTransform(x, [-100, -40, 0], [1, 0.5, 0]);
  const readOpacity = useTransform(x, [0, 40, 100], [0, 0.5, 1]);

  const getIconAndColor = (type: string) => {
    switch (type) {
      case 'case':
        return {
          icon: <Briefcase className="w-5 h-5 text-[#3D4D7C]" />,
          bg: 'bg-[#3D4D7C]/12',
        };
      case 'appointment':
        return {
          icon: <Calendar className="w-5 h-5 text-[#3FA66B]" />,
          bg: 'bg-[#3FA66B]/15',
        };
      case 'document':
        return {
          icon: <FileText className="w-5 h-5 text-[#3D4D7C]" />,
          bg: 'bg-[#3D4D7C]/12',
        };
      case 'message':
        return {
          icon: <MessageSquare className="w-5 h-5 text-indigo-600" />,
          bg: 'bg-indigo-50',
        };
      default:
        return {
          icon: <Bell className="w-5 h-5 text-amber-600" />,
          bg: 'bg-amber-50',
        };
    }
  };

  const { icon, bg } = getIconAndColor(notification.type);

  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.x < -80) {
      onDelete(notification.id);
    } else if (info.offset.x > 80) {
      onRead(notification.id);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-card">
      {/* Background Swipe Actions */}
      <motion.div
        style={{ opacity: readOpacity }}
        className="absolute inset-y-0 left-0 w-24 bg-[#3FA66B] text-white flex items-center justify-center gap-1.5 px-3 rounded-l-card font-semibold text-xs z-0"
      >
        <Check className="w-4 h-4" />
        <span>Read</span>
      </motion.div>

      <motion.div
        style={{ opacity: deleteOpacity }}
        className="absolute inset-y-0 right-0 w-24 bg-[#E5484D] text-white flex items-center justify-center gap-1.5 px-3 rounded-r-card font-semibold text-xs z-0"
      >
        <Trash2 className="w-4 h-4" />
        <span>Delete</span>
      </motion.div>

      {/* Main Draggable Notification Card */}
      <motion.div
        drag="x"
        dragConstraints={{ left: -100, right: 100 }}
        dragElastic={0.15}
        onDragEnd={handleDragEnd}
        onClick={() => {
          onRead(notification.id);
          onClick(notification.link);
        }}
        className={`relative z-10 liquid-glass-card p-3.5 min-h-[72px] flex items-center gap-3.5 cursor-pointer transition-colors ${
          notification.read ? 'opacity-85' : 'bg-white/95'
        }`}
      >
        {/* Left 40px Circular Icon Tile */}
        <div
          className={`w-10 h-10 rounded-full ${bg} flex items-center justify-center flex-shrink-0`}
        >
          {icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h4
              className={`font-heading text-xs tracking-wide truncate ${
                notification.read ? 'font-semibold text-[#1F2A44]' : 'font-bold text-[#1F2A44]'
              }`}
            >
              {notification.title}
            </h4>
            <span className="text-[10px] text-[#8A93A6] whitespace-nowrap">
              {notification.time}
            </span>
          </div>

          <p className="text-[11px] text-[#8A93A6] line-clamp-2 mt-0.5 leading-snug">
            {notification.message}
          </p>
        </div>

        {/* Unread Blue/Navy Dot */}
        {!notification.read && (
          <span className="w-2.5 h-2.5 rounded-full bg-[#3D4D7C] flex-shrink-0 shadow-xs" />
        )}
      </motion.div>
    </div>
  );
};

export default NotificationItem;

