import React, { useState } from 'react'
import { FaShoppingBag, FaBoxes, FaListAlt, FaMoneyBillWave, FaChartLine, FaUserFriends } from 'react-icons/fa';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { 
  useGetDashboardOverviewQuery,
  useGetOrderStatisticsQuery,
  useGetOrderStatusStatisticsQuery,
} from '../../services/analytics.service';

// Màu sắc chuyên nghiệp
const THEME = {
  primary: '#0f172a',    // Slate 900
  secondary: '#475569',  // Slate 600
  accent: {
    blue: '#3b82f6',    // Blue 500
    green: '#22c55e',   // Green 500
    yellow: '#eab308',  // Yellow 500
    red: '#ef4444',     // Red 500
  },
  background: {
    light: '#f8fafc',   // Slate 50
    white: '#ffffff',
    blue: '#eff6ff',    // Blue 50
    green: '#f0fdf4',   // Green 50
    yellow: '#fefce8',  // Yellow 50
    red: '#fef2f2',     // Red 50
  },
  text: {
    primary: '#0f172a',  // Slate 900
    secondary: '#64748b', // Slate 500
    light: '#94a3b8',    // Slate 400
  },
  border: '#e2e8f0',     // Slate 200
};

export default function Dashboard() {
  const [revenuePeriod, setRevenuePeriod] = useState('7days');
  
  const { data: overview, isLoading: isLoadingOverview } = useGetDashboardOverviewQuery();
  const { data: orderStats, isLoading: isLoadingOrderStats } = useGetOrderStatisticsQuery(revenuePeriod);
  const { data: statusStats, isLoading: isLoadingStatusStats } = useGetOrderStatusStatisticsQuery();

  const formatDate = (dateString) => {
    if (revenuePeriod === '7days') {
      return new Date(dateString).toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit'
      });
    } else if (revenuePeriod === '30days' || revenuePeriod === 'currentMonth') {
      return new Date(dateString).toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit'
      });
    }
    return dateString;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (isLoadingOverview || isLoadingOrderStats || isLoadingStatusStats) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-full">
        <div className="flex flex-col gap-4">
          {/* Thống kê chính */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Doanh thu */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 hover:border-blue-500 transition-all duration-300 hover:shadow-md">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-slate-600 text-sm font-medium">Tổng doanh thu</p>
                  <p className="text-2xl font-bold text-slate-900">{formatCurrency(overview?.totalRevenue || 0)}</p>
                  <div className="flex items-center text-blue-600 text-sm">
                    <FaChartLine className="mr-1.5" />
                    <span>Từ đơn hoàn thành</span>
                  </div>
                </div>
                <div className="bg-blue-50 rounded-full p-4">
                  <FaMoneyBillWave className="text-blue-500 text-2xl" />
                </div>
              </div>
            </div>

            {/* Đơn hàng */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 hover:border-green-500 transition-all duration-300 hover:shadow-md">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-slate-600 text-sm font-medium">Tổng đơn hàng</p>
                  <p className="text-2xl font-bold text-slate-900">{overview?.totalOrders || 0}</p>
                  <div className="flex items-center text-green-600 text-sm">
                    <FaShoppingBag className="mr-1.5" />
                    <span>Tất cả đơn hàng</span>
                  </div>
                </div>
                <div className="bg-green-50 rounded-full p-4">
                  <FaShoppingBag className="text-green-500 text-2xl" />
                </div>
              </div>
            </div>

            {/* Sản phẩm */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 hover:border-yellow-500 transition-all duration-300 hover:shadow-md">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-slate-600 text-sm font-medium">Tổng sản phẩm</p>
                  <p className="text-2xl font-bold text-slate-900">{overview?.totalProducts || 0}</p>
                  <div className="flex items-center text-yellow-600 text-sm">
                    <FaBoxes className="mr-1.5" />
                    <span>Sản phẩm đang bán</span>
                  </div>
                </div>
                <div className="bg-yellow-50 rounded-full p-4">
                  <FaBoxes className="text-yellow-600 text-2xl" />
                </div>
              </div>
            </div>

            {/* Đơn chờ xử lý */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 hover:border-red-500 transition-all duration-300 hover:shadow-md">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-slate-600 text-sm font-medium">Đơn chờ xử lý</p>
                  <p className="text-2xl font-bold text-slate-900">{overview?.pendingOrders || 0}</p>
                  <div className="flex items-center text-red-600 text-sm">
                    <FaUserFriends className="mr-1.5" />
                    <span>Cần xử lý ngay</span>
                  </div>
                </div>
                <div className="bg-red-50 rounded-full p-4">
                  <FaListAlt className="text-red-500 text-2xl" />
                </div>
              </div>
            </div>
          </div>

          {/* Biểu đồ */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Biểu đồ doanh thu */}
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-slate-900">Thống kê đơn hàng</h2>
                <select
                  value={revenuePeriod}
                  onChange={(e) => setRevenuePeriod(e.target.value)}
                  className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="7days">7 ngày qua</option>
                  <option value="30days">30 ngày qua</option>
                  <option value="currentMonth">Tháng này</option>
                </select>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={orderStats?.labels?.map((date, index) => ({
                    date,
                    revenue: orderStats?.datasets?.[1]?.data?.[index] || 0
                  })) || []}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={THEME.accent.blue} stopOpacity={0.1}/>
                        <stop offset="95%" stopColor={THEME.accent.blue} stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={THEME.border} />
                    <XAxis 
                      dataKey="date"
                      stroke={THEME.text.secondary}
                      tick={{ fill: THEME.text.secondary }}
                      tickFormatter={formatDate}
                    />
                    <YAxis
                      stroke={THEME.text.secondary}
                      tick={{ fill: THEME.text.secondary }}
                      tickFormatter={formatCurrency}
                    />
                    <Tooltip
                      formatter={(value) => formatCurrency(value)}
                      labelFormatter={(label) => `Ngày: ${formatDate(label)}`}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke={THEME.accent.blue}
                      fill="url(#colorRevenue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Biểu đồ trạng thái đơn hàng */}
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900 mb-6">Trạng thái đơn hàng</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusStats?.datasets[0]?.data.map((value, index) => ({
                        name: statusStats.labels[index],
                        value: value
                      })) || []}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {statusStats?.datasets[0]?.backgroundColor.map((color, index) => (
                        <Cell key={`cell-${index}`} fill={color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value} đơn hàng`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
