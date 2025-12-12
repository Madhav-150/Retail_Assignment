import React, { useState } from 'react';
import { FiDownload, FiPlus, FiTrendingUp, FiUsers, FiDollarSign, FiShoppingCart, FiBarChart2, FiPieChart } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { Bar, Line, Pie } from 'react-chartjs-2';
import 'chart.js/auto';

// Chart data
const revenueData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Revenue',
      data: [12000, 19000, 15000, 25000, 22000, 30000],
      backgroundColor: 'rgba(79, 70, 229, 0.7)',
      borderColor: 'rgba(79, 70, 229, 1)',
      borderWidth: 1,
      tension: 0.4,
      fill: true
    }
  ]
};

const userData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Active Users',
      data: [200, 400, 300, 500, 600, 450, 700],
      backgroundColor: 'rgba(59, 130, 246, 0.7)',
      borderColor: 'rgba(59, 130, 246, 1)',
      borderWidth: 1,
      tension: 0.4
    }
  ]
};

const categoryData = {
  labels: ['Electronics', 'Fashion', 'Home', 'Beauty', 'Others'],
  datasets: [
    {
      data: [35, 25, 20, 15, 5],
      backgroundColor: [
        'rgba(79, 70, 229, 0.7)',
        'rgba(59, 130, 246, 0.7)',
        'rgba(16, 185, 129, 0.7)',
        'rgba(245, 158, 11, 0.7)',
        'rgba(156, 163, 175, 0.7)'
      ],
      borderWidth: 0
    }
  ]
};

// Additional Mock Data
const revenueDataYear = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [{
    label: 'Revenue',
    data: [12000, 19000, 15000, 25000, 22000, 30000, 28000, 35000, 32000, 40000, 45000, 50000],
    backgroundColor: 'rgba(79, 70, 229, 0.7)',
    borderColor: 'rgba(79, 70, 229, 1)',
    borderWidth: 1,
    tension: 0.4,
    fill: true
  }]
};

const categoryDataWeek = {
  labels: ['Electronics', 'Fashion', 'Home', 'Beauty', 'Others'],
  datasets: [{
    data: [10, 40, 15, 25, 10],
    backgroundColor: categoryData.datasets[0].backgroundColor,
    borderWidth: 0
  }]
};

const categoryData6M = {
  labels: ['Electronics', 'Fashion', 'Home', 'Beauty', 'Others'],
  datasets: [{
    data: [30, 30, 20, 10, 10],
    backgroundColor: categoryData.datasets[0].backgroundColor,
    borderWidth: 0
  }]
};

const categoryDataYear = {
  labels: ['Electronics', 'Fashion', 'Home', 'Beauty', 'Others'],
  datasets: [{
    data: [40, 20, 15, 15, 10],
    backgroundColor: categoryData.datasets[0].backgroundColor,
    borderWidth: 0
  }]
};

const Dashboard = () => {
  const stats = [
    {
      label: 'Total Revenue',
      value: '$45,231.89',
      change: '+20.1% from last month',
      icon: <FiDollarSign className="h-6 w-6 text-orange-700" />,
      bgColor: 'bg-gradient-to-br from-orange-100 to-orange-50',
      borderColor: 'border-orange-200',
      textColor: 'text-orange-800'
    },
    {
      label: 'Active Users',
      value: '2,345',
      change: '+180.1% from last month',
      icon: <FiUsers className="h-6 w-6 text-rose-700" />,
      bgColor: 'bg-gradient-to-br from-rose-100 to-rose-50',
      borderColor: 'border-rose-200',
      textColor: 'text-rose-800'
    },
    {
      label: 'Conversion',
      value: '12.5%',
      change: '+19% from last month',
      icon: <FiTrendingUp className="h-6 w-6 text-amber-700" />,
      bgColor: 'bg-gradient-to-br from-amber-100 to-amber-50',
      borderColor: 'border-amber-200',
      textColor: 'text-amber-800'
    },
    {
      label: 'Avg. Order Value',
      value: '$89.53',
      change: '+2.1% from last month',
      icon: <FiShoppingCart className="h-6 w-6 text-red-700" />,
      bgColor: 'bg-gradient-to-br from-red-100 to-red-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-800'
    },
  ];



  const [revenueTimeRange, setRevenueTimeRange] = useState('6m');
  const [categoryTimeRange, setCategoryTimeRange] = useState('month');
  const [reportData, setReportData] = useState({
    title: '',
    description: '',
    type: 'monthly'
  });

  const handleExport = () => {
    toast.info('Preparing export...');
    setTimeout(() => {
      window.print();
      toast.success('Export ready!');
    }, 500);
  };

  const handleNewReport = () => {
    toast.info('Scroll down to add new report details', {
      position: "top-center",
      autoClose: 3000,
    });
    const section = document.getElementById('new-report-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Report "${reportData.title}" created successfully!`);
    setReportData({ title: '', description: '', type: 'monthly' });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Welcome back! Here's what's happening with your store.</p>
        </div>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <button
            onClick={handleNewReport}
            className="btn btn-primary flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <FiPlus size={16} />
            New Report
          </button>
          <button
            onClick={handleExport}
            className="btn bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <FiDownload size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className={`relative overflow-hidden ${stat.bgColor} rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group border ${stat.borderColor}`}>
            {/* Colored top accent */}
            <div className={`absolute top-0 left-0 w-full h-1 ${stat.bgColor.replace('bg-', 'bg-gradient-to-r from-').replace('-50', '-500')} to-transparent opacity-80`}></div>

            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl bg-white shadow-sm group-hover:scale-110 transition-transform duration-300 border border-gray-100`}>
                  {/* Icon with specific background color for visibility */}
                  <div className={`p-2 rounded-lg ${index === 0 ? 'bg-orange-100' :
                    index === 1 ? 'bg-rose-100' :
                      index === 2 ? 'bg-amber-100' :
                        'bg-red-100'
                    }`}>
                    {stat.icon}
                  </div>
                </div>
                <span className={`flex items-center text-xs font-bold px-2.5 py-1 rounded-full bg-white/60 text-gray-800`}>
                  {stat.change.includes('+') ? <FiTrendingUp className="mr-1" /> : <FiTrendingUp className="mr-1 rotate-180" />}
                  {stat.change.split(' ')[0]}
                </span>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-black text-black uppercase tracking-wider">{stat.label}</p>
                <h3 className="text-2xl sm:text-3xl font-black text-black tracking-tight">{stat.value}</h3>
                <p className="text-xs text-gray-600 font-medium mt-1">vs last month</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Revenue Overview</h3>
            <div className="flex items-center text-sm text-gray-500">
              <FiBarChart2 className="mr-1" />
              <select
                className="bg-transparent border-none text-sm font-medium text-gray-500 focus:ring-0 cursor-pointer p-0 pr-6"
                value={revenueTimeRange}
                onChange={(e) => setRevenueTimeRange(e.target.value)}
              >
                <option value="6m">Last 6 months</option>
                <option value="1y">Last 1 year</option>
              </select>
            </div>
          </div>
          <div className="h-64">
            <Line
              data={revenueTimeRange === '1y' ? revenueDataYear : revenueData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: {
                      display: false
                    },
                    ticks: {
                      callback: function (value) {
                        return '$' + value.toLocaleString();
                      }
                    }
                  },
                  x: {
                    grid: {
                      display: false
                    }
                  }
                }
              }}
            />
          </div>
        </div>

        {/* Categories Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Sales by Category</h3>
            <div className="flex items-center text-sm text-gray-500">
              <FiPieChart className="mr-1" />
              <select
                className="bg-transparent border-none text-sm font-medium text-gray-500 focus:ring-0 cursor-pointer p-0 pr-6"
                value={categoryTimeRange}
                onChange={(e) => setCategoryTimeRange(e.target.value)}
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="6m">Last 6 Months</option>
                <option value="1y">Last 1 Year</option>
              </select>
            </div>
          </div>
          <div className="h-64 flex items-center justify-center">
            <Pie
              data={
                categoryTimeRange === 'week' ? categoryDataWeek :
                  categoryTimeRange === 'month' ? categoryData :
                    categoryTimeRange === '6m' ? categoryData6M :
                      categoryDataYear
              }
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'right'
                  }
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Recent Activity and User Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { id: 1, title: 'New order received', time: '2 hours ago', icon: '🛒' },
              { id: 2, title: 'New user registered', time: '5 hours ago', icon: '👤' },
              { id: 3, title: 'Payment received', time: '1 day ago', icon: '💳' },
            ].map((item) => (
              <div key={item.id} className="flex items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                <div className="bg-indigo-100 p-2 rounded-lg mr-4 text-indigo-600">
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{item.title}</p>
                  <p className="text-xs text-gray-500">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Stats */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">User Activity</h3>
          <div className="h-64">
            <Bar
              data={userData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: {
                      display: false
                    },
                    ticks: {
                      stepSize: 200
                    }
                  },
                  x: {
                    grid: {
                      display: false
                    }
                  }
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* New Report Section (Moved from Modal) */}
      <div id="new-report-section" className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900">Create New Report</h3>
          <p className="text-sm text-gray-500">Enter the details below to generate a new report.</p>
        </div>

        <form onSubmit={handleReportSubmit} className="space-y-4 max-w-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Report Title
              </label>
              <input
                type="text"
                id="title"
                required
                value={reportData.title}
                onChange={(e) => setReportData({ ...reportData, title: e.target.value })}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                placeholder="Q1 Sales Report"
              />
            </div>

            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                Report Type
              </label>
              <select
                id="type"
                value={reportData.type}
                onChange={(e) => setReportData({ ...reportData, type: e.target.value })}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              >
                <option value="monthly">Monthly Report</option>
                <option value="quarterly">Quarterly Report</option>
                <option value="yearly">Yearly Report</option>
                <option value="custom">Custom Report</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              rows={3}
              value={reportData.description}
              onChange={(e) => setReportData({ ...reportData, description: e.target.value })}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              placeholder="Enter a brief description of this report..."
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="btn btn-primary px-6 py-2.5 flex items-center justify-center gap-2"
            >
              <FiPlus />
              Create Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
