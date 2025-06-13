
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Transaction, ExpenseCategory, MonthlyData, MonthlyStats, CreateTransactionRequest } from '@/types/api';

// Replace with your colleague's API base URL
const API_BASE_URL = 'https://your-colleague-api.com/api';

// API service functions
export const apiService = {
  // Get all transactions
  getTransactions: async (): Promise<Transaction[]> => {
    const response = await fetch(`${API_BASE_URL}/transactions`);
    if (!response.ok) throw new Error('Failed to fetch transactions');
    return response.json();
  },

  // Get expense categories with budget data
  getExpenseCategories: async (): Promise<ExpenseCategory[]> => {
    const response = await fetch(`${API_BASE_URL}/categories`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    return response.json();
  },

  // Get monthly trend data
  getMonthlyData: async (): Promise<MonthlyData[]> => {
    const response = await fetch(`${API_BASE_URL}/monthly-data`);
    if (!response.ok) throw new Error('Failed to fetch monthly data');
    return response.json();
  },

  // Get monthly statistics
  getMonthlyStats: async (): Promise<MonthlyStats> => {
    const response = await fetch(`${API_BASE_URL}/monthly-stats`);
    if (!response.ok) throw new Error('Failed to fetch monthly stats');
    return response.json();
  },

  // Create new transaction
  createTransaction: async (transaction: CreateTransactionRequest): Promise<Transaction> => {
    const response = await fetch(`${API_BASE_URL}/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transaction),
    });
    if (!response.ok) throw new Error('Failed to create transaction');
    return response.json();
  },
};

// React Query hooks for easy data fetching
export const useTransactions = () => {
  return useQuery({
    queryKey: ['transactions'],
    queryFn: apiService.getTransactions,
  });
};

export const useExpenseCategories = () => {
  return useQuery({
    queryKey: ['expense-categories'],
    queryFn: apiService.getExpenseCategories,
  });
};

export const useMonthlyData = () => {
  return useQuery({
    queryKey: ['monthly-data'],
    queryFn: apiService.getMonthlyData,
  });
};

export const useMonthlyStats = () => {
  return useQuery({
    queryKey: ['monthly-stats'],
    queryFn: apiService.getMonthlyStats,
  });
};

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: apiService.createTransaction,
    onSuccess: () => {
      // Refresh all related data when a new transaction is created
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['expense-categories'] });
      queryClient.invalidateQueries({ queryKey: ['monthly-data'] });
      queryClient.invalidateQueries({ queryKey: ['monthly-stats'] });
    },
  });
};
