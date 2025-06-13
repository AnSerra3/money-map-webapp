
// API response types - adjust these based on your colleague's API structure
export interface Transaction {
  id: number;
  description: string;
  amount: number;
  category: string;
  date: string;
  type: 'income' | 'expense';
}

export interface ExpenseCategory {
  name: string;
  amount: number;
  budget: number;
  color: string;
}

export interface MonthlyData {
  month: string;
  income: number;
  expenses: number;
}

export interface MonthlyStats {
  totalIncome: number;
  totalExpenses: number;
  savings: number;
  budgetUsed: number;
}

export interface CreateTransactionRequest {
  description: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
  date: string;
}
