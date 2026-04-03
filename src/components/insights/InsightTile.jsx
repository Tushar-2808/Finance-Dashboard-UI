import { Crown, Hash, Calculator, Target } from 'lucide-react';
import Card from '../ui/Card';
import { formatINR } from '../../utils/currency';
import { cn } from '../../utils/cn';
/** Insight tiles reordered with Savings Rate first and a visual progress indicator */
const InsightTile = ({
  topCategoryByAmount,
  topCategoryByCount,
  avgMonthlySpend,
  savingsRate
}) => {
  const tiles = [{
    label: 'Monthly Savings Rate',
    icon: Target,
    value: savingsRate !== null ? `${savingsRate.toFixed(1)}%` : 'N/A',
    subValue: savingsRate !== null ? savingsRate > 20 ? 'Efficient' : savingsRate >= 0 ? 'Steady' : 'Deficit' : '',
    iconBg: 'bg-teal-50 dark:bg-teal-900/30',
    iconColor: 'text-teal-600 dark:text-teal-400',
    progress: savingsRate !== null ? Math.max(0, Math.min(100, savingsRate)) : null,
    progressColor: 'bg-teal-500'
  }, {
    label: 'Main Expense Center',
    icon: Crown,
    value: topCategoryByAmount ? topCategoryByAmount.category : 'None',
    subValue: topCategoryByAmount ? formatINR(topCategoryByAmount.total) : '',
    iconBg: 'bg-violet-50 dark:bg-violet-900/30',
    iconColor: 'text-violet-600 dark:text-violet-400',
    progress: null
  }, {
    label: 'Average Burn Rate',
    icon: Calculator,
    value: formatINR(avgMonthlySpend),
    subValue: 'per billing cycle',
    iconBg: 'bg-orange-50 dark:bg-orange-900/30',
    iconColor: 'text-orange-600 dark:text-orange-400',
    progress: null
  }, {
    label: 'Activity Volume',
    icon: Hash,
    value: topCategoryByCount ? topCategoryByCount.category : 'None',
    subValue: topCategoryByCount ? `${topCategoryByCount.count} entries` : '',
    iconBg: 'bg-blue-50 dark:bg-blue-900/30',
    iconColor: 'text-blue-600 dark:text-blue-400',
    progress: null
  }];
  return <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {tiles.map(({
      label,
      icon: Icon,
      value,
      subValue,
      iconBg,
      iconColor,
      progress,
      progressColor
    }) => <Card key={label} hover className="animate-slide-up border-0 shadow-sm p-5 flex flex-col h-full bg-white dark:bg-gray-900">
          <div className="flex items-center justify-between mb-4">
            <div className={cn('rounded-xl p-2.5', iconBg)}>
              <Icon size={18} className={iconColor} />
            </div>
            <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest text-right">
              {label}
            </p>
          </div>
          
          <div className="mt-auto">
            <p className="text-lg font-black text-gray-900 dark:text-gray-100 tracking-tight">
              {value}
            </p>
            {subValue && <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase mt-0.5">{subValue}</p>}
            
            {progress !== null && <div className="mt-4 space-y-1.5">
                <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div className={cn('h-full rounded-full transition-all duration-700', progressColor)} style={{
              width: `${progress}%`
            }} />
                </div>
              </div>}
          </div>
        </Card>)}
    </div>;
};
export default InsightTile;