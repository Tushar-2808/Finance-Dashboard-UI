import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { seedTransactions } from '../data/seedTransactions';
/** Zustand store for managing transactions with localStorage persistence */
export const useTransactionStore = create()(persist(set => ({
  transactions: seedTransactions,
  addEntry: entry => set(state => ({
    transactions: [{
      ...entry,
      id: uuidv4()
    }, ...state.transactions]
  })),
  modifyEntry: (id, updates) => set(state => ({
    transactions: state.transactions.map(t => t.id === id ? {
      ...updates,
      id
    } : t)
  })),
  removeEntry: id => set(state => ({
    transactions: state.transactions.filter(t => t.id !== id)
  }))
}), {
  name: 'fin-transactions'
}));

// Re-export types used by the store consumers to avoid direct type imports