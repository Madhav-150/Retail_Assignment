import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const Settings = () => {
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    notifications: true,
    timezone: 'UTC+05:30',
    theme: 'light',
  });

  // Load settings from API on mount
  // Load settings from API on mount
  React.useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/settings', {
          withCredentials: true
        });

        if (response.data.data.settings && Object.keys(response.data.data.settings).length > 0) {
          setFormData(prev => ({
            ...prev,
            ...response.data.data.settings
          }));
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };

    fetchSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = async () => {
    // Visual-only save (as requested)
    toast.success('Profile settings saved!');

    /* 
    // Disabled API call as per user request
    try {
      await axios.put('http://localhost:4000/api/settings', formData, {
        withCredentials: true
      });
      
      toast.success('Profile settings saved to database!');
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Failed to save settings. Please ensure you are logged in.');
    }
    */
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your account preferences and security</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            width="20"
            height="20"
            style={{ width: '20px', height: '20px' }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          Profile Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-group">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm transition-colors"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm transition-colors"
            />
          </div>

          <div className="form-group">
            <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
            <select
              id="timezone"
              name="timezone"
              value={formData.timezone}
              onChange={handleChange}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm transition-colors"
            >
              <option value="UTC+05:30">(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi</option>
              <option value="UTC+00:00">(UTC+00:00) London, Dublin, Lisbon</option>
              <option value="UTC-05:00">(UTC-05:00) Eastern Time (US & Canada)</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="theme" className="block text-sm font-medium text-gray-700 mb-1">Theme</label>
            <select
              id="theme"
              name="theme"
              value={formData.theme}
              onChange={handleChange}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm transition-colors"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
          </div>

          <div className="form-group flex items-center md:col-span-2 bg-gray-50 p-4 rounded-lg border border-gray-100">
            <input
              type="checkbox"
              id="notifications"
              name="notifications"
              checked={formData.notifications}
              onChange={handleChange}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded cursor-pointer"
            />
            <label htmlFor="notifications" className="ml-2 block text-sm text-gray-700 cursor-pointer select-none">
              Receive email notifications about account activity
            </label>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
          <button
            onClick={handleSave}
            className="btn btn-primary px-6"
          >
            Save Changes
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            width="20"
            height="20"
            style={{ width: '20px', height: '20px' }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          Security
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-group md:col-span-2">
            <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
            <input
              type="password"
              id="current-password"
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm transition-colors"
              placeholder="Enter current password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <input
              type="password"
              id="new-password"
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm transition-colors"
              placeholder="Enter new password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
            <input
              type="password"
              id="confirm-password"
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm transition-colors"
              placeholder="Confirm new password"
            />
          </div>
          <div className="flex items-end md:col-span-2 justify-end">
            <button className="btn bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 px-6 transition-colors">
              Update Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
