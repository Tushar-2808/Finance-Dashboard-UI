import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { formatINR, formatDisplayDate } from '../../utils/currency';
import { categoryConfig } from '../../constants/categoryConfig';
import { cn } from '../../utils/cn';
import type { Transaction, SpendingCategory } from '../../types/finance';

interface RecentTransactionsMiniProps {
  transactions: Transaction[];
}

/** Redesigned list of recent transactions with left-border indicators and status icons */
const RecentTransactionsMini = ({ transactions }: RecentTransactionsMiniProps) => {
  const recent = transactions
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5);

  if (recent.length === 0) {
    return (
      <Card className="animate-slide-up bg-white/40 dark:bg-gray-900/40 border-dashed">
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-10 italic">
          No recent activity found
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <span className="w-1.5 h-4 bg-violet-500 rounded-full" />
          Latest Transactions
        </h3>
        <Link
          to="/transactions"
          className="text-[11px] font-bold text-violet-600 dark:text-violet-400 hover:text-violet-500 hover:underline transition-all uppercase tracking-wider"
        >
          View Full Ledger →
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {recent.map((tx) => {
          const config = categoryConfig[tx.category as SpendingCategory];
          const isIncome = tx.kind === 'income';
          
          return (
            <Card
              key={tx.id}
              className={cn(
                'animate-slide-up p-0 overflow-hidden border-0 shadow-sm border-l-4 transition-all hover:translate-x-1',
                isIncome ? 'border-l-teal-500' : 'border-l-orange-500'
              )}
            >
              <div className="flex items-center gap-3 p-3.5 bg-white dark:bg-gray-900">
                <div className={cn(
                  'w-10 h-10 rounded-xl flex items-center justify-center shrink-0',
                  isIncome ? 'bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400' : 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400'
                )}>
                  {isIncome ? <ArrowDownRight size={20} /> : <ArrowUpRight size={20} />}
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900 dark:text-gray-100 truncate">
                    {tx.description}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-tighter">
                      {formatDisplayDate(tx.date)}
                    </span>
                    <span className="w-1 h-1 bg-gray-300 dark:bg-gray-700 rounded-full" />
                    <Badge color={config?.color} textColor={config?.textColor} className="text-[9px] px-1.5 py-0">
                      {tx.category}
                    </Badge>
                  </div>
                </div>

                <div className="text-right">
                  <p className={cn(
                    'text-sm font-black whitespace-nowrap',
                    isIncome ? 'text-teal-600' : 'text-orange-600'
                  )}>
                    {isIncome ? '+' : '-'}{formatINR(tx.amount)}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default RecentTransactionsMini;
