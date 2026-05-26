'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { farmingPools, type Pool } from '@/lib/mockData';

function StakeModal({ pool, onClose }: { pool: Pool; onClose: () => void }) {
  const [amount, setAmount] = useState('');
  const [tab, setTab] = useState<'stake' | 'unstake'>('stake');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-mimo-dark-card border border-mimo-dark-border rounded-2xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">{pool.name}</h3>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/10 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex gap-2 mb-6">
          {(['stake', 'unstake'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                tab === t ? 'bg-mimo-purple text-white' : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              {t === 'stake' ? 'Stake' : 'Unstake'}
            </button>
          ))}
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">Amount</label>
          <div className="relative">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full px-4 py-3 rounded-xl bg-mimo-dark border border-mimo-dark-border text-white text-lg font-mono focus:outline-none focus:border-mimo-purple transition-colors"
            />
            <button
              onClick={() => setAmount(String(pool.staked))}
              className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 rounded-md bg-mimo-purple/20 text-mimo-purple text-xs font-medium"
            >
              MAX
            </button>
          </div>
        </div>

        <div className="space-y-2 mb-6 p-3 rounded-lg bg-mimo-dark/50">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">APY</span>
            <span className="text-green-400">{pool.apy}%</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Currently Staked</span>
            <span>${pool.staked.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Earned</span>
            <span className="text-mimo-purple">${pool.earned.toFixed(2)}</span>
          </div>
        </div>

        <button className="w-full py-3 rounded-xl bg-gradient-to-r from-mimo-purple to-mimo-violet text-white font-semibold hover:opacity-90 transition-opacity">
          {tab === 'stake' ? 'Stake Tokens' : 'Unstake Tokens'}
        </button>
      </motion.div>
    </motion.div>
  );
}

export default function PoolsPage() {
  const [search, setSearch] = useState('');
  const [selectedPool, setSelectedPool] = useState<Pool | null>(null);
  const [riskFilter, setRiskFilter] = useState<string>('All');

  const filtered = farmingPools.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchRisk = riskFilter === 'All' || p.risk === riskFilter;
    return matchSearch && matchRisk;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Yield Farming Pools</h1>
            <p className="text-gray-400 mt-1">Stake LP tokens to earn MIMO rewards</p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-initial">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search pools..."
                className="w-full sm:w-64 pl-9 pr-4 py-2 rounded-lg bg-mimo-dark-card border border-mimo-dark-border text-sm focus:outline-none focus:border-mimo-purple transition-colors"
              />
            </div>
            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              className="px-3 py-2 rounded-lg bg-mimo-dark-card border border-mimo-dark-border text-sm focus:outline-none focus:border-mimo-purple"
            >
              {['All', 'Low', 'Medium', 'High'].map((r) => (
                <option key={r} value={r}>{r} Risk</option>
              ))}
            </select>
          </div>
        </div>

        {/* Pools Table */}
        <div className="rounded-xl bg-mimo-dark-card border border-mimo-dark-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-mimo-dark-border">
                  <th className="text-left py-3 px-6 text-xs font-medium text-gray-400 uppercase">Pool</th>
                  <th className="text-right py-3 px-6 text-xs font-medium text-gray-400 uppercase">APY</th>
                  <th className="text-right py-3 px-6 text-xs font-medium text-gray-400 uppercase">TVL</th>
                  <th className="text-right py-3 px-6 text-xs font-medium text-gray-400 uppercase">Staked</th>
                  <th className="text-right py-3 px-6 text-xs font-medium text-gray-400 uppercase">Earned</th>
                  <th className="text-center py-3 px-6 text-xs font-medium text-gray-400 uppercase">Risk</th>
                  <th className="text-right py-3 px-6 text-xs font-medium text-gray-400 uppercase">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((pool, i) => (
                  <motion.tr
                    key={pool.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="border-b border-mimo-dark-border/50 hover:bg-mimo-dark-hover transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="flex -space-x-2">
                          <div className="w-8 h-8 rounded-full bg-mimo-purple/20 border-2 border-mimo-dark-card flex items-center justify-center text-xs">
                            {pool.token0[0]}
                          </div>
                          <div className="w-8 h-8 rounded-full bg-mimo-violet/20 border-2 border-mimo-dark-card flex items-center justify-center text-xs">
                            {pool.token1[0]}
                          </div>
                        </div>
                        <div>
                          <div className="font-medium">{pool.name}</div>
                          <div className="text-xs text-gray-400">{pool.token0}/{pool.token1}</div>
                        </div>
                      </div>
                    </td>
                    <td className="text-right py-4 px-6">
                      <span className="text-green-400 font-mono font-medium">{pool.apy}%</span>
                    </td>
                    <td className="text-right py-4 px-6 font-mono">
                      ${(pool.tvl / 1_000_000).toFixed(1)}M
                    </td>
                    <td className="text-right py-4 px-6 font-mono">
                      ${pool.staked.toLocaleString()}
                    </td>
                    <td className="text-right py-4 px-6 font-mono text-mimo-purple">
                      ${pool.earned.toFixed(2)}
                    </td>
                    <td className="text-center py-4 px-6">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        pool.risk === 'Low' ? 'bg-green-400/10 text-green-400' :
                        pool.risk === 'Medium' ? 'bg-yellow-400/10 text-yellow-400' :
                        'bg-red-400/10 text-red-400'
                      }`}>
                        {pool.risk}
                      </span>
                    </td>
                    <td className="text-right py-4 px-6">
                      <button
                        onClick={() => setSelectedPool(pool)}
                        className="px-4 py-2 rounded-lg bg-mimo-purple/20 text-mimo-purple text-sm font-medium hover:bg-mimo-purple/30 transition-colors"
                      >
                        Manage
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedPool && <StakeModal pool={selectedPool} onClose={() => setSelectedPool(null)} />}
      </AnimatePresence>
    </div>
  );
}
