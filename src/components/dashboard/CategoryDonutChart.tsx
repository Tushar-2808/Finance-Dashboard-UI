import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import Card from '../ui/Card';
import { formatINR } from '../../utils/currency';
import { categoryConfig } from '../../constants/categoryConfig';
import type { CategoryTotal } from '../../types/finance';
import type { SpendingCategory } from '../../types/finance';

interface CategoryDonutChartProps {
  categoryTotals: CategoryTotal[];
}

/** Donut chart for expense breakdown with centered total amount and a more premium legend */
const CategoryDonutChart = ({ categoryTotals }: CategoryDonutChartProps) => {
  const grandTotal = categoryTotals.reduce((sum, c) => sum + c.total, 0);

  if (categoryTotals.length === 0) {
    return (
      <Card className="animate-slide-up flex flex-col items-center justify-center h-full min-h-[300px]">
        <p className="text-sm font-medium text-gray-400 italic">No spending data</p>
      </Card>
    );
  }

  return (
    <Card className="animate-slide-up border-0 shadow-sm relative overflow-visible">
      <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2 mb-6">
        <span className="w-1.5 h-4 bg-orange-500 rounded-full" />
        Expense Allocation
      </h3>
      
      <div className="h-[240px] relative">
        {/* Center label overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Total</p>
          <p className="text-lg font-black text-gray-900 dark:text-gray-100 mt-1">{formatINR(grandTotal)}</p>
        </div>

        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={categoryTotals}
              dataKey="total"
              nameKey="category"
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={4}
              cornerRadius={8}
            >
              {categoryTotals.map((entry) => {
                const config = categoryConfig[entry.category as SpendingCategory];
                return (
                  <Cell
                    key={entry.category}
                    fill={config?.hex ?? '#94a3b8'}
                    strokeWidth={0}
                    style={{ filter: 'drop-shadow(0 4px 6px rgb(0 0 0 / 0.05))' }}
                  />
                );
              })}
            </Pie>
            <Tooltip
              formatter={(value: any) => formatINR(Number(value))}
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: 'none',
                borderRadius: '12px',
                fontSize: '12px',
                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                backdropFilter: 'blur(4px)',
                padding: '10px',
              }}
              labelStyle={{ fontWeight: 800, color: '#111827', marginBottom: '4px' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend with progress indicators */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-3 mt-6">
        {categoryTotals.map((entry) => {
          const config = categoryConfig[entry.category as SpendingCategory];
          const pct = grandTotal > 0 ? (entry.total / grandTotal) * 100 : 0;
          return (
            <div key={entry.category} className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-bold">
                <div className="flex items-center gap-1.5 truncate">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: config?.hex ?? '#94a3b8' }}
                  />
                  <span className="text-gray-700 dark:text-gray-300 truncate">{entry.category}</span>
                </div>
                <span className="text-gray-500">{pct.toFixed(0)}%</span>
              </div>
              <div className="h-1 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-500 ease-out"
                  style={{ 
                    backgroundColor: config?.hex ?? '#94a3b8',
                    width: `${pct}%` 
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default CategoryDonutChart;
