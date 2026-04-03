import { Wallet, TrendingUp, TrendingDown, ArrowLeftRight, ArrowUp, ArrowDown } from 'lucide-react';
import Card from '../ui/Card';
import { formatINR } from '../../utils/currency';
import { cn } from '../../utils/cn';

type DeltaResult = { text: string; trend: 'up' | 'down' | 'flat' | 'none'; value: number | null };

interface MetricCardsProps {
  currentBalance: number;
  totalIncome: number;
  totalExpenses: number;
  transactionCount: number;
  incomeDelta: DeltaResult;
  expenseDelta: DeltaResult;
}

/** Four vertical metric cards with colored top-border stripes and inline icons */
const MetricCards = ({ currentBalance, totalIncome, totalExpenses, transactionCount, incomeDelta, expenseDelta }: MetricCardsProps) => {

  const cards = [
    {
      label: 'Current Balance',
      value: formatINR(currentBalance),
      icon: Wallet,
      color: currentBalance >= 0
        ? 'text-emerald-600 dark:text-emerald-400'
        : 'text-rose-600 dark:text-rose-400',
      border: currentBalance >= 0
        ? 'border-t-emerald-500'
        : 'border-t-rose-500',
      delta: null,
    },
    {
      label: 'Total Income',
      value: formatINR(totalIncome),
      icon: TrendingUp,
      color: 'text-teal-600 dark:text-teal-400',
      border: 'border-t-teal-500',
      delta: incomeDelta,
    },
    {
      label: 'Total Expenses',
      value: formatINR(totalExpenses),
      icon: TrendingDown,
      color: 'text-orange-600 dark:text-orange-500',
      border: 'border-t-orange-500',
      delta: expenseDelta,
    },
    {
      label: 'Transactions',
      value: transactionCount.toString(),
      icon: ArrowLeftRight,
      color: 'text-violet-600 dark:text-violet-400',
      border: 'border-t-violet-500',
      delta: null,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map(({ label, value, icon: Icon, color, border, delta }) => (
        <Card key={label} hover className={cn('animate-slide-up border-t-4 pt-4 pb-5', border)}>
          <div className="flex flex-col items-center text-center space-y-1">
            <div className="flex items-center gap-1.5 mb-1">
              <Icon size={14} className={cn('opacity-70', color)} />
              <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                {label}
              </p>
            </div>
            
            <p className={cn('text-xl lg:text-2xl font-black tracking-tight', color)}>
              {value}
            </p>
            
            {delta && delta.trend !== 'none' ? (
              <p
                className={cn(
                  'text-[11px] font-semibold flex items-center bg-gray-50 dark:bg-gray-800/50 px-2 py-0.5 rounded-full mt-1',
                  delta.trend === 'up' ? 'text-emerald-500' : delta.trend === 'down' ? 'text-rose-500' : 'text-gray-500'
                )}
              >
                {delta.trend === 'up' && <ArrowUp size={10} className="mr-0.5" />}
                {delta.trend === 'down' && <ArrowDown size={10} className="mr-0.5" />}
                {delta.text}
              </p>
            ) : (
              <div className="h-5" aria-hidden="true" /> /* Spacer for alignment */
            )}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default MetricCards;
