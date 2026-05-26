'use client';

import { useWalletStore } from '@/store/useWalletStore';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Wallet, Shield, Zap, Globe } from 'lucide-react';
import { useEffect } from 'react';

export default function LoginPage() {
  const { isConnected, connect } = useWalletStore();
  const router = useRouter();

  useEffect(() => {
    if (isConnected) router.push('/dashboard');
  }, [isConnected, router]);

  const handleConnect = (type: 'metamask' | 'walletconnect') => {
    connect(type);
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-mimo-dark via-purple-900/30 to-mimo-dark animate-gradient" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-mimo-purple/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-mimo-violet/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-mimo-purple/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center max-w-md mx-auto px-6"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
          className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-mimo-purple to-mimo-violet flex items-center justify-center animate-pulse-glow"
        >
          <span className="text-4xl font-bold text-white">M</span>
        </motion.div>

        <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-mimo-purple via-purple-400 to-mimo-violet bg-clip-text text-transparent">
          MiMo DeFi
        </h1>
        <p className="text-gray-400 text-lg mb-10">
          Yield farming on the Xiaomi MiMo ecosystem
        </p>

        {/* Connect Buttons */}
        <div className="space-y-4 mb-12">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleConnect('metamask')}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-gradient-to-r from-mimo-purple to-mimo-violet text-white font-semibold text-lg shadow-lg shadow-mimo-purple/25 hover:shadow-mimo-purple/40 transition-all duration-300"
          >
            <Wallet size={24} />
            Connect MetaMask
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleConnect('walletconnect')}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl border-2 border-mimo-purple/30 text-mimo-purple font-semibold text-lg hover:bg-mimo-purple/10 hover:border-mimo-purple/60 transition-all duration-300"
          >
            <Globe size={24} />
            WalletConnect
          </motion.button>
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: Shield, label: 'Secure' },
            { icon: Zap, label: 'Fast' },
            { icon: Globe, label: 'Multi-Chain' },
          ].map((f, i) => (
            <motion.div
              key={f.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="flex flex-col items-center gap-2 p-3 rounded-lg bg-white/5"
            >
              <f.icon size={20} className="text-mimo-purple" />
              <span className="text-xs text-gray-400">{f.label}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
