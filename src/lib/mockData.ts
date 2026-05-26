export interface Token {
  symbol: string;
  name: string;
  icon: string;
  price: number;
  change24h: number;
  balance: number;
  value: number;
}

export interface Pool {
  id: string;
  name: string;
  token0: string;
  token1: string;
  apy: number;
  tvl: number;
  staked: number;
  earned: number;
  risk: 'Low' | 'Medium' | 'High';
}

export interface StakingTier {
  id: string;
  lockPeriod: string;
  lockDays: number;
  apy: number;
  minStake: number;
  totalStaked: number;
}

export const portfolioHistory = [
  { date: 'Jan', value: 12400 },
  { date: 'Feb', value: 14200 },
  { date: 'Mar', value: 13800 },
  { date: 'Apr', value: 17600 },
  { date: 'May', value: 19200 },
  { date: 'Jun', value: 18400 },
  { date: 'Jul', value: 22100 },
  { date: 'Aug', value: 24800 },
  { date: 'Sep', value: 23600 },
  { date: 'Oct', value: 27400 },
  { date: 'Nov', value: 31200 },
  { date: 'Dec', value: 34856 },
];

export const yieldSummary = [
  { label: 'Total Yield Earned', value: '$4,832.50', change: '+12.4%', positive: true },
  { label: 'Average APY', value: '18.6%', change: '+2.1%', positive: true },
  { label: 'Active Positions', value: '7', change: '+2', positive: true },
  { label: 'Impermanent Loss', value: '-$128.30', change: '-0.4%', positive: false },
];

export const tokenHoldings: Token[] = [
  { symbol: 'MIMO', name: 'MiMo Token', icon: '🟣', price: 2.45, change24h: 5.2, balance: 4500, value: 11025 },
  { symbol: 'ETH', name: 'Ethereum', icon: '💎', price: 3842.12, change24h: 1.8, balance: 2.5, value: 9605.30 },
  { symbol: 'USDC', name: 'USD Coin', icon: '💵', price: 1.00, change24h: 0.01, balance: 8200, value: 8200 },
  { symbol: 'WBTC', name: 'Wrapped Bitcoin', icon: '₿', price: 104250.00, change24h: -0.5, balance: 0.045, value: 4691.25 },
  { symbol: 'SOL', name: 'Solana', icon: '☀️', price: 178.40, change24h: 3.1, balance: 12, value: 2140.80 },
  { symbol: 'AVAX', name: 'Avalanche', icon: '🔺', price: 42.80, change24h: -1.2, balance: 35, value: 1498 },
];

export const farmingPools: Pool[] = [
  { id: '1', name: 'MIMO-ETH', token0: 'MIMO', token1: 'ETH', apy: 24.5, tvl: 12400000, staked: 2500, earned: 124.50, risk: 'Medium' },
  { id: '2', name: 'ETH-USDC', token0: 'ETH', token1: 'USDC', apy: 12.8, tvl: 45600000, staked: 5000, earned: 82.30, risk: 'Low' },
  { id: '3', name: 'MIMO-USDC', token0: 'MIMO', token1: 'USDC', apy: 32.1, tvl: 8200000, staked: 1800, earned: 201.20, risk: 'High' },
  { id: '4', name: 'WBTC-ETH', token0: 'WBTC', token1: 'ETH', apy: 8.4, tvl: 67800000, staked: 3200, earned: 45.10, risk: 'Low' },
  { id: '5', name: 'SOL-USDC', token0: 'SOL', token1: 'USDC', apy: 18.6, tvl: 15300000, staked: 1200, earned: 67.80, risk: 'Medium' },
  { id: '6', name: 'AVAX-ETH', token0: 'AVAX', token1: 'ETH', apy: 15.2, tvl: 9800000, staked: 800, earned: 38.90, risk: 'Medium' },
  { id: '7', name: 'MIMO-WBTC', token0: 'MIMO', token1: 'WBTC', apy: 28.7, tvl: 5400000, staked: 1500, earned: 156.40, risk: 'High' },
];

export const stakingTiers: StakingTier[] = [
  { id: '1', lockPeriod: '30 Days', lockDays: 30, apy: 8.5, minStake: 100, totalStaked: 2400000 },
  { id: '2', lockPeriod: '90 Days', lockDays: 90, apy: 14.2, minStake: 500, totalStaked: 5800000 },
  { id: '3', lockPeriod: '180 Days', lockDays: 180, apy: 22.8, minStake: 1000, totalStaked: 8200000 },
  { id: '4', lockPeriod: '365 Days', lockDays: 365, apy: 35.0, minStake: 2500, totalStaked: 12600000 },
];

export const swapTokens = [
  { symbol: 'MIMO', name: 'MiMo Token', icon: '🟣', balance: 4500, price: 2.45 },
  { symbol: 'ETH', name: 'Ethereum', icon: '💎', balance: 2.5, price: 3842.12 },
  { symbol: 'USDC', name: 'USD Coin', icon: '💵', balance: 8200, price: 1.00 },
  { symbol: 'WBTC', name: 'Wrapped Bitcoin', icon: '₿', balance: 0.045, price: 104250.00 },
  { symbol: 'SOL', name: 'Solana', icon: '☀️', balance: 12, price: 178.40 },
  { symbol: 'AVAX', name: 'Avalanche', icon: '🔺', balance: 35, price: 42.80 },
];
