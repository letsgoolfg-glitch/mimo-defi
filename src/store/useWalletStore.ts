import { create } from 'zustand';

interface WalletState {
  isConnected: boolean;
  address: string;
  balance: string;
  chainName: string;
  connect: (walletType: 'metamask' | 'walletconnect') => void;
  disconnect: () => void;
}

export const useWalletStore = create<WalletState>((set) => ({
  isConnected: false,
  address: '',
  balance: '0',
  chainName: '',
  connect: (walletType) => {
    const mockAddress = '0x7a25...4f9E';
    const mockBalance = '34,856.42';
    set({
      isConnected: true,
      address: mockAddress,
      balance: mockBalance,
      chainName: 'MiMo Chain',
    });
  },
  disconnect: () => {
    set({
      isConnected: false,
      address: '',
      balance: '0',
      chainName: '',
    });
  },
}));
