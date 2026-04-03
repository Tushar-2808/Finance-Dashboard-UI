import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Card from '../ui/Card';
import { formatINR, abbreviateINR } from '../../utils/currency';
/** Grouped bar chart comparing income vs expenses using the WealthLens teal/orange theme */
const IncomeExpenseBarChart = ({
  monthlyBreakdown
}) => {
  return <Card className="animate-slide-up border-0 shadow-sm p-6">
      <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2 mb-6">
        <span className="w-1.5 h-4 bg-teal-500 rounded-full" />
        Monthly Cash Flow
      </h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthlyBreakdown} margin={{
          top: 5,
          right: 10,
          left: -20,
          bottom: 0
        }}>
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
            <Tooltip formatter={(value, name) => [formatINR(Number(value)), name === 'income' ? 'Income' : 'Expenses']} contentStyle={{
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
            <Legend iconType="circle" iconSize={8} wrapperStyle={{
            fontSize: 10,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            paddingTop: 20
          }} formatter={value => <span className="text-gray-500">{value === 'income' ? 'Income' : 'Expenses'}</span>} />
            <Bar dataKey="income" fill="#14b8a6" radius={[4, 4, 0, 0]} barSize={32} />
            <Bar dataKey="expenses" fill="#f97316" radius={[4, 4, 0, 0]} barSize={32} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>;
};
export default IncomeExpenseBarChart;