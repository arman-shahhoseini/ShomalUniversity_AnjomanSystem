import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8002/api/landing';

function AdminPanel() {
  const [registrations, setRegistrations] = useState([]);
  const [stats, setStats] = useState({ total_registrations: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterField, setFilterField] = useState('');

  useEffect(() => {
    fetchData();
    // Auto refresh every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const [regsResponse, statsResponse] = await Promise.all([
        axios.get(`${API_BASE_URL}/registrations`),
        axios.get(`${API_BASE_URL}/stats`)
      ]);
      setRegistrations(regsResponse.data);
      setStats(statsResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredRegistrations = registrations.filter(reg => {
    const matchesSearch = 
      reg.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.phone.includes(searchTerm) ||
      reg.interests.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesField = !filterField || reg.field_of_study === filterField;
    
    return matchesSearch && matchesField;
  });

  const uniqueFields = [...new Set(registrations.map(r => r.field_of_study))];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-neon-blue border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 p-4 md:p-8">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-0 right-0 w-96 h-96 bg-neon-blue rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.05, 0.1, 0.05]
          }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute bottom-0 left-0 w-96 h-96 bg-neon-gold rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-neon-blue to-neon-gold bg-clip-text text-transparent">
                پنل مدیریت ثبت‌نام‌ها
              </h1>
              <p className="text-gray-400">انجمن علمی دانشگاه شمال</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={fetchData}
              className="px-6 py-3 bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-xl hover:shadow-neon-blue transition-all duration-300 flex items-center gap-2"
              data-testid="refresh-btn"
            >
              🔄 بروزرسانی
            </motion.button>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gray-900/50 backdrop-blur-sm border border-neon-blue/30 rounded-xl p-6"
            >
              <div className="text-neon-blue text-3xl mb-2">👥</div>
              <div className="text-3xl font-bold text-white mb-1">
                {stats.total_registrations}
              </div>
              <div className="text-sm text-gray-400">کل ثبت‌نام‌ها</div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gray-900/50 backdrop-blur-sm border border-neon-gold/30 rounded-xl p-6"
            >
              <div className="text-neon-gold text-3xl mb-2">📚</div>
              <div className="text-3xl font-bold text-white mb-1">
                {uniqueFields.length}
              </div>
              <div className="text-sm text-gray-400">رشته‌های مختلف</div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gray-900/50 backdrop-blur-sm border border-neon-purple/30 rounded-xl p-6"
            >
              <div className="text-neon-purple text-3xl mb-2">📱</div>
              <div className="text-3xl font-bold text-white mb-1">
                {registrations.filter(r => r.phone).length}
              </div>
              <div className="text-sm text-gray-400">شماره تماس ثبت شده</div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gray-900/50 backdrop-blur-sm border border-neon-blue/30 rounded-xl p-6"
            >
              <div className="text-neon-blue text-3xl mb-2">🎯</div>
              <div className="text-3xl font-bold text-white mb-1">
                {registrations.filter(r => r.interests).length}
              </div>
              <div className="text-sm text-gray-400">علاقه‌مندی ثبت شده</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6 grid md:grid-cols-2 gap-4"
        >
          <input
            type="text"
            placeholder="جستجو بر اساس نام، شماره یا علاقه‌مندی..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-6 py-3 bg-gray-900/50 backdrop-blur-sm border border-neon-blue/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-neon-gold transition-all duration-300"
            data-testid="search-input"
          />
          <select
            value={filterField}
            onChange={(e) => setFilterField(e.target.value)}
            className="px-6 py-3 bg-gray-900/50 backdrop-blur-sm border border-neon-blue/30 rounded-xl text-white focus:outline-none focus:border-neon-gold transition-all duration-300"
            data-testid="filter-select"
          >
            <option value="">همه رشته‌ها</option>
            {uniqueFields.map((field, index) => (
              <option key={index} value={field}>{field}</option>
            ))}
          </select>
        </motion.div>

        {/* Results Count */}
        {(searchTerm || filterField) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-4 text-gray-400 text-sm"
          >
            نمایش {filteredRegistrations.length} از {registrations.length} ثبت‌نام
          </motion.div>
        )}

        {/* Registrations Table */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-900/50 backdrop-blur-sm border border-neon-purple/30 rounded-xl overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800/50">
                <tr>
                  <th className="px-4 md:px-6 py-4 text-right text-sm font-semibold text-neon-blue">#</th>
                  <th className="px-4 md:px-6 py-4 text-right text-sm font-semibold text-neon-blue">نام و نام خانوادگی</th>
                  <th className="px-4 md:px-6 py-4 text-right text-sm font-semibold text-neon-blue">شماره تماس</th>
                  <th className="px-4 md:px-6 py-4 text-right text-sm font-semibold text-neon-blue">رشته تحصیلی</th>
                  <th className="px-4 md:px-6 py-4 text-right text-sm font-semibold text-neon-blue hidden md:table-cell">علاقه‌مندی‌ها</th>
                  <th className="px-4 md:px-6 py-4 text-right text-sm font-semibold text-neon-blue hidden lg:table-cell">تاریخ ثبت</th>
                </tr>
              </thead>
              <tbody>
                {filteredRegistrations.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-gray-400">
                      {searchTerm || filterField ? 'نتیجه‌ای یافت نشد' : 'هنوز ثبت‌نامی انجام نشده است'}
                    </td>
                  </tr>
                ) : (
                  filteredRegistrations.map((reg, index) => (
                    <motion.tr
                      key={reg.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03 }}
                      className="border-t border-gray-800 hover:bg-gray-800/30 transition-colors"
                      whileHover={{ backgroundColor: 'rgba(0, 217, 255, 0.05)' }}
                    >
                      <td className="px-4 md:px-6 py-4 text-sm text-gray-300">{index + 1}</td>
                      <td className="px-4 md:px-6 py-4 text-sm text-white font-medium">
                        {reg.first_name} {reg.last_name}
                      </td>
                      <td className="px-4 md:px-6 py-4 text-sm text-gray-300 font-mono">
                        {reg.phone}
                      </td>
                      <td className="px-4 md:px-6 py-4 text-sm text-gray-300">
                        <span className="inline-block px-3 py-1 bg-neon-blue/10 border border-neon-blue/30 rounded-full text-neon-blue text-xs">
                          {reg.field_of_study}
                        </span>
                      </td>
                      <td className="px-4 md:px-6 py-4 text-sm text-gray-300 max-w-xs hidden md:table-cell">
                        <div className="truncate" title={reg.interests}>
                          {reg.interests}
                        </div>
                      </td>
                      <td className="px-4 md:px-6 py-4 text-sm text-gray-400 hidden lg:table-cell">
                        {new Date(reg.created_at).toLocaleDateString('fa-IR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Export Button */}
        {registrations.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-center"
          >
            <button
              onClick={() => {
                const csvContent = [
                  ['ردیف', 'نام', 'نام خانوادگی', 'شماره تماس', 'رشته تحصیلی', 'علاقه‌مندی‌ها', 'تاریخ ثبت'],
                  ...registrations.map((reg, index) => [
                    index + 1,
                    reg.first_name,
                    reg.last_name,
                    reg.phone,
                    reg.field_of_study,
                    reg.interests,
                    new Date(reg.created_at).toLocaleDateString('fa-IR')
                  ])
                ].map(row => row.join(',')).join('\n');
                
                const blob = new Blob(["\ufeff" + csvContent], { type: 'text/csv;charset=utf-8;' });
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = `registrations_${new Date().toISOString().split('T')[0]}.csv`;
                link.click();
              }}
              className="px-8 py-3 bg-gradient-to-r from-neon-gold to-neon-purple text-white rounded-xl hover:shadow-neon-gold transition-all duration-300 inline-flex items-center gap-2"
              data-testid="export-btn"
            >
              📥 دانلود به صورت CSV
            </button>
          </motion.div>
        )}

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center text-gray-500 text-sm"
        >
          <p>انجمن علمی دانشگاه شمال • پنل مدیریت</p>
          <p className="mt-2">آخرین بروزرسانی: {new Date().toLocaleTimeString('fa-IR')}</p>
        </motion.div>
      </div>
    </div>
  );
}

export default AdminPanel;