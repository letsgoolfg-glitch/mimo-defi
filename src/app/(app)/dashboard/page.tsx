'use client';

import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, DollarSign, Layers, AlertTriangle } from 'lucide-react';
import { portfolioHistory, yieldSummary, tokenHoldings } from '@/lib/mockData';

const iconMap = [TrendingUp, DollarSign, Layers, AlertTriangle];

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        {/* Yield Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {yieldSummary.map((item, i) => {
            const Icon = iconMap[i];
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-5 rounded-xl bg-mimo-dark-card border border-mimo-dark-border hover:border-mimo-purple/30 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-400">{item.label}</span>
                  <Icon size={18} className="text-mimo-purple" />
                </div>
                <div className="text-2xl font-bold mb-1">{item.value}</div>
                <span className={`text-sm ${item.positive ? 'text-green-400' : 'text-red-400'}`}>
                  {item.change}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Portfolio Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-6 rounded-xl bg-mimo-dark-card border border-mimo-dark-border mb-8"
        >
          <h2 className="text-xl font-semibold mb-6">Portfolio Value</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={portfolioHistory}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2D1F4E" />
              <XAxis dataKey="date" stroke="#6B7280" fontSize={12} />
              <YAxis stroke="#6B7280" fontSize={12} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip
                contentStyle={{ background: '#1A1028', border: '1px solid #2D1F4E', borderRadius: '8px', color: '#E2E8F0' }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, 'Value']}
              />
              <Area type="monotone" dataKey="value" stroke="#8B5CF6" strokeWidth={2} fill="url(#colorValue)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Token Holdings Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="rounded-xl bg-mimo-dark-card border border-mimo-dark-border overflow-hidden"
        >
          <div className="p-6 border-b border-mimo-dark-border">
            <h2 className="text-xl font-semibold">Token Holdings</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-mimo-dark-border">
                  <th className="text-left py-3 px-6 text-xs font-medium text-gray-400 uppercase">Token</th>
                  <th className="text-right py-3 px-6 text-xs font-medium text-gray-400 uppercase">Price</th>
                  <th className="text-right py-3 px-6 text-xs font-medium text-gray-400 uppercase">24h</th>
                  <th className="text-right py-3 px-6 text-xs font-medium text-gray-400 uppercase">Balance</th>
                  <th className="text-right py-3 px-6 text-xs font-medium text-gray-400 uppercase">Value</th>
                </tr>
              </thead>
              <tbody>
                {tokenHoldings.map((token, i) => (
                  <motion.tr
                    key={token.symbol}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 + i * 0.05 }}
                    className="border-b border-mimo-dark-border/50 hover:bg-mimo-dark-hover transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{token.icon}</span>
                        <div>
                          <div className="font-medium">{token.symbol}</div>
                          <div className="text-sm text-gray-400">{token.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="text-right py-4 px-6 font-mono">${token.price.toLocaleString()}</td>
                    <td className={`text-right py-4 px-6 font-mono ${token.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {token.change24h >= 0 ? '+' : ''}{token.change24h}%
                    </td>
                    <td className="text-right py-4 px-6 font-mono">{token.balance}</td>
                    <td className="text-right py-4 px-6 font-mono font-medium">${token.value.toLocaleString()}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
