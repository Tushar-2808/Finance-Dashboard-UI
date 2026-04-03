import { useMemo } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import Card from '../ui/Card';
import { formatINR, abbreviateINR } from '../../utils/currency';
/** Dual-series area chart comparing income vs expenses trend across months */
const TrendLineChart = ({
  monthlyBreakdown
}) => {
  const data = useMemo(() => {
    return monthlyBreakdown.map(({
      month,
      income,
      expenses
    }) => ({
      month,
      income,
      expenses
    }));
  }, [monthlyBreakdown]);
  return <Card className="animate-slide-up border-0 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <span className="w-1.5 h-4 bg-teal-500 rounded-full" />
          Cash Flow Trend
        </h3>
        <div className="flex gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-teal-500" />
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">Income</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-orange-500" />
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">Expenses</span>
          </div>
        </div>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{
          top: 5,
          right: 10,
          left: -20,
          bottom: 0
        }}>
            <defs>
              <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} strokeOpacity={0.4} />
            <XAxis dataKey="month" tick={{
            fontSize: 10,
            fill: '#9ca3af',
            fontWeight: 600
          }} tickLine={false} axisLine={false} dy={10} />
            <YAxis tickFormatter={abbreviateINR} tick={{
            fontSize: 10,
            fill: '#9ca3af',
            fontWeight: 600
          }} tickLine={false} axisLine={false} width={60} />
            <Tooltip formatter={(value, name) => [formatINR(Number(value || 0)), String(name || '').charAt(0).toUpperCase() + String(name || '').slice(1)]} contentStyle={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            border: 'none',
            borderRadius: '12px',
            fontSize: '12px',
            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
            backdropFilter: 'blur(4px)',
            padding: '12px'
          }} itemStyle={{
            fontWeight: 700,
            padding: '2px 0'
          }} labelStyle={{
            fontWeight: 800,
            color: '#111827',
            marginBottom: '8px',
            fontSize: '11px',
            textTransform: 'uppercase'
          }} />
            <Area type="monotone" dataKey="income" stroke="#14b8a6" strokeWidth={3} fill="url(#incomeGradient)" dot={false} activeDot={{
            r: 5,
            strokeWidth: 2,
            stroke: '#fff'
          }} />
            <Area type="monotone" dataKey="expenses" stroke="#f97316" strokeWidth={3} fill="url(#expenseGradient)" dot={false} activeDot={{
            r: 5,
            strokeWidth: 2,
            stroke: '#fff'
          }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>;
};
export default TrendLineChart;