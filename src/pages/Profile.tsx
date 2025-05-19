import React from 'react';
import { UserCircleIcon, PencilIcon } from '@heroicons/react/24/outline';
import { userData } from '../data/mockData';

export const Profile = () => {
  return (
    <div className="w-full min-h-screen max-w-7xl mx-auto px-1 sm:px-2 md:px-4 lg:px-8 flex flex-col space-y-6 text-sm">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-primary-700">Profile Settings</h1>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition-colors">
            <PencilIcon className="w-5 h-5" />
            <span>Edit Profile</span>
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex flex-col items-center gap-4">
            <div className="w-32 h-32 rounded-full bg-primary-100 flex items-center justify-center shadow">
              {userData.avatar ? (
                <img src={userData.avatar} alt={userData.name} className="w-32 h-32 rounded-full object-cover" />
              ) : (
                <UserCircleIcon className="w-24 h-24 text-primary-400" />
              )}
            </div>
            <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              Change Photo
            </button>
          </div>

          <div className="flex-1 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={userData.name}
                  readOnly
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value="ravi@example.com"
                  readOnly
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Savings Goal</label>
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  value={userData.savingsGoal}
                  readOnly
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900"
                />
                <span className="text-gray-500">INR</span>
              </div>
            </div>

            <div className="pt-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Preferences</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">Email Notifications</h3>
                    <p className="text-sm text-gray-500">Receive updates about your account</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">SMS Notifications</h3>
                    <p className="text-sm text-gray-500">Receive text messages for important updates</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 