import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, BellIcon, ExclamationTriangleIcon, InformationCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

interface Notification {
  id: number;
  type: 'warning' | 'info' | 'success';
  message: string;
  date: string;
}

const mockNotifications: Notification[] = [
  {
    id: 1,
    type: 'warning',
    message: 'You are close to exceeding your Food budget for this month',
    date: '2024-02-20',
  },
  {
    id: 2,
    type: 'info',
    message: 'Your salary has been credited to your account',
    date: '2024-02-19',
  },
  {
    id: 3,
    type: 'success',
    message: 'You have saved 25% more than last month!',
    date: '2024-02-18',
  },
];

export const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'warning':
        return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />;
      case 'info':
        return <InformationCircleIcon className="h-5 w-5 text-blue-500" />;
      case 'success':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
    }
  };

  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'info':
        return 'bg-blue-50 border-blue-200';
      case 'success':
        return 'bg-green-50 border-green-200';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <BellIcon className="h-6 w-6 text-primary-600" />
          <h2 className="text-lg font-semibold text-gray-900">
            Notifications & Tips
          </h2>
        </div>
        <span className="text-sm text-gray-500">
          {notifications.length} new
        </span>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {notifications.map((notification) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className={`p-4 rounded-lg border ${getNotificationColor(notification.type)}`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700">{notification.message}</p>
                  <p className="mt-1 text-xs text-gray-500">
                    {new Date(notification.date).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => removeNotification(notification.id)}
                  className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {notifications.length === 0 && (
          <div className="text-center py-8">
            <BellIcon className="mx-auto h-12 w-12 text-gray-300" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No notifications</h3>
            <p className="mt-1 text-sm text-gray-500">
              You're all caught up! Check back later for new updates.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}; 