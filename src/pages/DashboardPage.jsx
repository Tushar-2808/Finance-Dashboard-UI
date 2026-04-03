import { useDerivedFinancials } from '../hooks/useDerivedFinancials';
import { useRoleStore } from '../store/roleStore';
import { useTransactionStore } from '../store/transactionStore';
import MetricCards from '../components/dashboard/MetricCards';
import TrendLineChart from '../components/dashboard/TrendLineChart';
import CategoryDonutChart from '../components/dashboard/CategoryDonutChart';
import RecentTransactionsMini from '../components/dashboard/RecentTransactionsMini';
import { BarChart3, Plus } from 'lucide-react';
import Button from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';
const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
};

/** Dashboard page with greeting banner, metric cards, charts, and recent activity */
const DashboardPage = () => {
  const {
    visibleTransactions,
    totalIncome,
    totalExpenses,
    currentBalance,
    monthlyBreakdown,
    categoryTotals,
    incomeDelta,
    expenseDelta
  } = useDerivedFinancials();
  const transactions = useTransactionStore(s => s.transactions);
  const activeRole = useRoleStore(s => s.activeRole);
  const navigate = useNavigate();

  // Empty state — no transactions at all
  if (transactions.length === 0) {
    return <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in">
        <div className="w-20 h-20 rounded-2xl bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center mb-5">
          <BarChart3 size={36} className="text-violet-600 dark:text-violet-400" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Welcome to WealthLens
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-md mb-6">
          {activeRole === 'admin' ? 'Start tracking your finances by adding your first transaction.' : 'No transactions recorded yet. Ask an admin to add some entries.'}
        </p>
        {activeRole === 'admin' && <Button onClick={() => navigate('/transactions')}>
            <Plus size={16} />
            Add First Transaction
          </Button>}
      </div>;
  }
  return <div className="space-y-6">
      {/* Greeting banner */}
      <div className="rounded-2xl bg-gradient-to-r from-violet-600 to-violet-500 dark:from-violet-700 dark:to-violet-600 px-6 py-4 flex items-center justify-between animate-fade-in shadow-lg shadow-violet-200 dark:shadow-violet-900/30">
        <div>
          <p className="text-violet-100 text-sm font-medium">{getGreeting()} 👋</p>
          <p className="text-white text-base font-semibold mt-0.5">
            Here's your financial overview
          </p>
        </div>
        <div className="text-right hidden sm:block">
          <p className="text-violet-200 text-xs">
            {new Date().toLocaleDateString('en-IN', {
            weekday: 'long',
            day: 'numeric',
            month: 'long'
          })}
          </p>
          <p className="text-violet-100 text-xs mt-0.5">
            {visibleTransactions.length} transaction{visibleTransactions.length !== 1 ? 's' : ''} tracked
          </p>
        </div>
      </div>

      {/* Metric cards */}
      <MetricCards currentBalance={currentBalance} totalIncome={totalIncome} totalExpenses={totalExpenses} transactionCount={visibleTransactions.length} incomeDelta={incomeDelta} expenseDelta={expenseDelta} />

      {/* Charts row — donut left, trend right */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2">
          <CategoryDonutChart categoryTotals={categoryTotals} />
        </div>
        <div className="lg:col-span-3">
          <TrendLineChart monthlyBreakdown={monthlyBreakdown} />
        </div>
      </div>

      {/* Recent activity */}
      <RecentTransactionsMini transactions={visibleTransactions} />
    </div>;
};
export default DashboardPage;