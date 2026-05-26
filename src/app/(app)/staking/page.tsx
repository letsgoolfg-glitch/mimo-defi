'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Lock, Calculator, Gift, Clock, TrendingUp, Coins } from 'lucide-react';
import { stakingTiers } from '@/lib/mockData';

export default function StakingPage() {
  const [selectedTier, setSelectedTier] = useState(stakingTiers[1]);
  const [stakeAmount, setStakeAmount] = useState('');
  const [activeTab, setActiveTab] = useState<'stake' | 'rewards'>('stake');

  const estimatedReward = useMemo(() => {
    const amount = parseFloat(stakeAmount);
    if (isNaN(amount) || amount <= 0) return 0;
    const dailyRate = selectedTier.apy / 365 / 100;
    return amount * dailyRate * selectedTier.lockDays;
  }, [stakeAmount, selectedTier]);

  const dailyReward = useMemo(() => {
    const amount = parseFloat(stakeAmount);
    if (isNaN(amount) || amount <= 0) return 0;
    return amount * (selectedTier.apy / 365 / 100);
  }, [stakeAmount, selectedTier]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-3xl font-bold mb-2">Staking</h1>
        <p className="text-gray-400 mb-8">Lock your MIMO tokens to earn rewards</p>

        <div className="flex gap-2 mb-8">
          {(['stake', 'rewards'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab ? 'bg-mimo-purple text-white' : 'bg-mimo-dark-card border border-mimo-dark-border text-gray-400 hover:text-white'
              }`}
            >
              {tab === 'stake' ? 'Stake Tokens' : 'My Rewards'}
            </button>
          ))}
        </div>

        {activeTab === 'stake' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Lock Period Cards */}
            <div className="lg:col-span-2">
              <h2 className="text-lg font-semibold mb-4">Select Lock Period</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {stakingTiers.map((tier, i) => (
                  <motion.button
                    key={tier.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => setSelectedTier(tier)}
                    className={`p-5 rounded-xl text-left transition-all ${
                      selectedTier.id === tier.id
                        ? 'bg-mimo-purple/10 border-2 border-mimo-purple'
                        : 'bg-mimo-dark-card border border-mimo-dark-border hover:border-mimo-purple/30'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-2 rounded-lg ${selectedTier.id === tier.id ? 'bg-mimo-purple/20' : 'bg-white/5'}`}>
                        <Lock size={18} className={selectedTier.id === tier.id ? 'text-mimo-purple' : 'text-gray-400'} />
                      </div>
                      <div>
                        <div className="font-semibold">{tier.lockPeriod}</div>
                        <div className="text-xs text-gray-400">Lock duration</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <div className="text-2xl font-bold text-mimo-purple">{tier.apy}%</div>
                        <div className="text-xs text-gray-400">APY</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium">{tier.minStake.toLocaleString()}</div>
                        <div className="text-xs text-gray-400">Min Stake</div>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-mimo-dark-border">
                      <div className="text-xs text-gray-400">
                        Total Staked: <span className="text-white">${(tier.totalStaked / 1_000_000).toFixed(1)}M</span>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Stake Form + Calculator */}
            <div className="space-y-6">
              <div className="rounded-xl bg-mimo-dark-card border border-mimo-dark-border p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Coins size={18} className="text-mimo-purple" />
                  Stake MIMO
                </h3>
                <div className="mb-4">
                  <label className="block text-sm text-gray-400 mb-2">Amount to Stake</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={stakeAmount}
                      onChange={(e) => setStakeAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full px-4 py-3 rounded-xl bg-mimo-dark border border-mimo-dark-border text-lg font-mono focus:outline-none focus:border-mimo-purple transition-colors"
                    />
                    <button
                      onClick={() => setStakeAmount('4500')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 rounded-md bg-mimo-purple/20 text-mimo-purple text-xs font-medium"
                    >
                      MAX
                    </button>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">Balance: 4,500 MIMO</div>
                </div>

                <div className="space-y-2 mb-6 p-3 rounded-lg bg-mimo-dark/50">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Lock Period</span>
                    <span>{selectedTier.lockPeriod}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">APY</span>
                    <span className="text-green-400">{selectedTier.apy}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Unlock Date</span>
                    <span>{new Date(Date.now() + selectedTier.lockDays * 86400000).toLocaleDateString()}</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-mimo-purple to-mimo-violet text-white font-semibold shadow-lg shadow-mimo-purple/25 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!stakeAmount || parseFloat(stakeAmount) <= 0}
                >
                  Stake Now
                </motion.button>
              </div>

              {/* Reward Calculator */}
              <div className="rounded-xl bg-mimo-dark-card border border-mimo-dark-border p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Calculator size={18} className="text-mimo-purple" />
                  Reward Calculator
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Daily Reward</span>
                    <span className="font-mono text-green-400">{dailyReward.toFixed(4)} MIMO</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Total Reward ({selectedTier.lockPeriod})</span>
                    <span className="font-mono text-mimo-purple font-medium">{estimatedReward.toFixed(2)} MIMO</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">USD Value</span>
                    <span className="font-mono">${(estimatedReward * 2.45).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Rewards Tab */
          <div className="max-w-2xl">
            <div className="rounded-xl bg-mimo-dark-card border border-mimo-dark-border p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-sm text-gray-400">Total Pending Rewards</div>
                  <div className="text-3xl font-bold text-mimo-purple">1,247.83 MIMO</div>
                  <div className="text-sm text-gray-400">≈ $3,057.18</div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-mimo-purple to-mimo-violet text-white font-semibold shadow-lg shadow-mimo-purple/25"
                >
                  <Gift size={18} className="inline mr-2" />
                  Claim All
                </motion.button>
              </div>

              <div className="space-y-3">
                {[
                  { tier: '90 Days', amount: 523.41, date: '2025-03-15' },
                  { tier: '180 Days', amount: 412.20, date: '2025-06-20' },
                  { tier: '30 Days', amount: 186.72, date: '2025-02-01' },
                  { tier: '365 Days', amount: 125.50, date: '2025-12-10' },
                ].map((reward, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-mimo-dark/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-mimo-purple/10">
                        <Clock size={16} className="text-mimo-purple" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">{reward.tier} Lock</div>
                        <div className="text-xs text-gray-400">Unlocks: {reward.date}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-mimo-purple">+{reward.amount.toFixed(2)} MIMO</div>
                      <div className="text-xs text-gray-400">≈ ${(reward.amount * 2.45).toFixed(2)}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="rounded-xl bg-mimo-dark-card border border-mimo-dark-border p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <TrendingUp size={18} className="text-mimo-purple" />
                Staking History
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-mimo-dark-border">
                      <th className="text-left py-3 text-xs font-medium text-gray-400 uppercase">Date</th>
                      <th className="text-left py-3 text-xs font-medium text-gray-400 uppercase">Action</th>
                      <th className="text-right py-3 text-xs font-medium text-gray-400 uppercase">Amount</th>
                      <th className="text-right py-3 text-xs font-medium text-gray-400 uppercase">Lock</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { date: '2025-01-15', action: 'Staked', amount: '2,000 MIMO', lock: '90 Days' },
                      { date: '2025-01-10', action: 'Claimed', amount: '45.20 MIMO', lock: '-' },
                      { date: '2024-12-20', action: 'Staked', amount: '1,500 MIMO', lock: '180 Days' },
                      { date: '2024-12-01', action: 'Staked', amount: '500 MIMO', lock: '30 Days' },
                    ].map((row, i) => (
                      <tr key={i} className="border-b border-mimo-dark-border/50">
                        <td className="py-3 text-sm text-gray-400">{row.date}</td>
                        <td className="py-3">
                          <span className={`text-sm font-medium ${row.action === 'Staked' ? 'text-mimo-purple' : 'text-green-400'}`}>
                            {row.action}
                          </span>
                        </td>
                        <td className="text-right py-3 text-sm font-mono">{row.amount}</td>
                        <td className="text-right py-3 text-sm text-gray-400">{row.lock}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
