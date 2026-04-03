import { useState, useCallback } from 'react';
import { Pencil, Trash2, ArrowUpDown, SearchX } from 'lucide-react';
import { formatINR, formatDisplayDate } from '../../utils/currency';
import { categoryConfig } from '../../constants/categoryConfig';
import { cn } from '../../utils/cn';
import { useRoleStore } from '../../store/roleStore';
import { useTransactionStore } from '../../store/transactionStore';
import { useFilterStore } from '../../store/filterStore';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import type { Transaction, SpendingCategory } from '../../types/finance';

interface TransactionListProps {
  transactions: Transaction[];
  onEdit: (tx: Transaction) => void;
}

/** Refined transaction table with striped rows, status indicators, and violet accents */
const TransactionList = ({ transactions, onEdit }: TransactionListProps) => {
  const activeRole = useRoleStore((s) => s.activeRole);
  const removeEntry = useTransactionStore((s) => s.removeEntry);
  const { sortField, sortDirection, setSortField, setSortDirection } = useFilterStore();
  const clearAllFilters = useFilterStore((s) => s.clearAllFilters);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const handleSort = useCallback(
    (field: 'date' | 'amount') => {
      if (sortField === field) {
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
      } else {
        setSortField(field);
        setSortDirection('desc');
      }
    },
    [sortField, sortDirection, setSortField, setSortDirection]
  );

  const handleDelete = useCallback(
    (id: string) => {
      removeEntry(id);
      setConfirmDeleteId(null);
    },
    [removeEntry]
  );

  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
        <div className="w-16 h-16 rounded-3xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4 border-2 border-dashed border-gray-200 dark:border-gray-700">
          <SearchX size={28} className="text-gray-400" />
        </div>
        <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-1">
          Zero matches found
        </h3>
        <p className="text-xs text-gray-400 dark:text-gray-500 mb-5">
          Try expanding your search or clearing active filters
        </p>
        <Button variant="secondary" size="sm" onClick={clearAllFilters} className="rounded-full px-6">
          Reset Filter View
        </Button>
      </div>
    );
  }

  const SortIcon = ({ field }: { field: 'date' | 'amount' }) => (
    <ArrowUpDown
      size={12}
      className={cn(
        'inline ml-1.5 transition-colors',
        sortField === field ? 'text-violet-500' : 'text-gray-300'
      )}
    />
  );

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 dark:bg-gray-800/50">
            <th
              className="py-4 px-5 text-left text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest cursor-pointer select-none hover:text-violet-500 transition-colors"
              onClick={() => handleSort('date')}
            >
              Date <SortIcon field="date" />
            </th>
            <th className="py-4 px-5 text-left text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">
              Description
            </th>
            <th className="py-4 px-5 text-left text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">
              Category
            </th>
            <th className="py-4 px-5 text-left text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">
              Kind
            </th>
            <th
              className="py-4 px-5 text-right text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest cursor-pointer select-none hover:text-violet-500 transition-colors"
              onClick={() => handleSort('amount')}
            >
              Amount <SortIcon field="amount" />
            </th>
            {activeRole === 'admin' && (
              <th className="py-4 px-5 text-right text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-800/50">
          {transactions.map((tx, idx) => {
            const config = categoryConfig[tx.category as SpendingCategory];
            const isDeleting = confirmDeleteId === tx.id;
            const isIncome = tx.kind === 'income';

            return (
              <tr
                key={tx.id}
                className={cn(
                  'transition-colors group',
                  idx % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50/50 dark:bg-gray-800/20'
                )}
              >
                <td className="py-4 px-5 whitespace-nowrap text-xs font-bold text-gray-500 dark:text-gray-400">
                  {formatDisplayDate(tx.date)}
                </td>
                <td
                  className="py-4 px-5 max-w-[200px] truncate text-sm text-gray-900 dark:text-gray-100 font-bold"
                  title={tx.description}
                >
                  {tx.description}
                </td>
                <td className="py-4 px-5">
                  <Badge color={config?.color} textColor={config?.textColor} className="text-[10px] font-extrabold uppercase px-2 py-0.5">
                    {tx.category}
                  </Badge>
                </td>
                <td className="py-4 px-5">
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      'w-2 h-2 rounded-full',
                      isIncome ? 'bg-teal-500' : 'bg-orange-500'
                    )} />
                    <span className="text-xs font-bold text-gray-600 dark:text-gray-400">
                      {isIncome ? 'Credit' : 'Debit'}
                    </span>
                  </div>
                </td>
                <td
                  className={cn(
                    'py-4 px-5 text-right font-black whitespace-nowrap tabular-nums',
                    isIncome ? 'text-teal-600' : 'text-orange-600'
                  )}
                >
                  {isIncome ? '+' : '-'}{formatINR(tx.amount)}
                </td>
                {activeRole === 'admin' && (
                  <td className="py-4 px-5 text-right">
                    {isDeleting ? (
                      <div className="inline-flex items-center gap-1.5 bg-rose-50 dark:bg-rose-900/20 p-1.5 rounded-lg border border-rose-100 dark:border-rose-900/10">
                        <span className="text-[10px] font-black text-rose-800 dark:text-rose-300 uppercase">Confirm?</span>
                        <button
                          onClick={() => handleDelete(tx.id)}
                          className="text-[10px] font-black text-rose-600 hover:text-rose-700 dark:text-rose-400 underline uppercase"
                        >
                          Yes
                        </button>
                        <button
                          onClick={() => setConfirmDeleteId(null)}
                          className="text-[10px] font-black text-gray-500 hover:text-gray-700 dark:text-gray-400 uppercase"
                        >
                          No
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => onEdit(tx)}
                          className="rounded-lg p-2 text-gray-400 hover:text-violet-600 hover:bg-violet-50 dark:hover:bg-violet-950 transition-colors"
                          aria-label={`Edit ${tx.description}`}
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => setConfirmDeleteId(tx.id)}
                          className="rounded-lg p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950 transition-colors"
                          aria-label={`Delete ${tx.description}`}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    )}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
