'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useWalletStore } from '@/store/useWalletStore';
import { LayoutDashboard, Droplets, ArrowLeftRight, Lock, LogOut, Wallet } from 'lucide-react';
import { motion } from 'framer-motion';

const navLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/pools', label: 'Pools', icon: Droplets },
  { href: '/swap', label: 'Swap', icon: ArrowLeftRight },
  { href: '/staking', label: 'Staking', icon: Lock },
];

export default function Navbar() {
  const pathname = usePathname();
  const { isConnected, address, balance, disconnect } = useWalletStore();

  if (!isConnected) return null;

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className="fixed top-0 left-0 right-0 z-50 bg-mimo-dark-card/90 backdrop-blur-xl border-b border-mimo-dark-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-mimo-purple to-mimo-violet flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-mimo-purple to-mimo-violet bg-clip-text text-transparent">
              MiMo DeFi
            </span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-mimo-purple/20 text-mimo-purple'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon size={18} />
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Wallet Info */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-mimo-dark/50 border border-mimo-dark-border">
              <Wallet size={14} className="text-mimo-purple" />
              <span className="text-sm text-gray-300">${balance}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-mimo-dark/50 border border-mimo-dark-border">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-sm text-gray-300">{address}</span>
            </div>
            <button
              onClick={disconnect}
              className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-400/10 transition-all"
              title="Disconnect"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        <div className="md:hidden flex items-center gap-1 pb-2 overflow-x-auto">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-mimo-purple/20 text-mimo-purple'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Icon size={14} />
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
}
