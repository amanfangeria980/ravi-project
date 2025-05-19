export interface User {
  name: string;
  avatar: string;
  savingsGoal: number;
}

export interface Overview {
  balance: number;
  income: number;
  expenses: number;
  savingsRatio: number;
}

export interface Transaction {
  id: number;
  date: string;
  description: string;
  type: 'credit' | 'debit';
  category: string;
  amount: number;
}

export interface Category {
  name: string;
  amount: number;
  budget: number;
}

export const userData: User = {
  name: 'Ravi',
  avatar: 'https://ui-avatars.com/api/?name=Ravi&background=0D8ABC&color=fff',
  savingsGoal: 75000,
};

export const overviewData: Overview = {
  balance: 120000,
  income: 40000,
  expenses: 30000,
  savingsRatio: 0.25,
};

export const transactionsData: Transaction[] = [
  {
    id: 1,
    date: '2024-01-15',
    description: 'Salary',
    type: 'credit',
    category: 'Income',
    amount: 40000,
  },
  {
    id: 2,
    date: '2024-01-20',
    description: 'Grocery',
    type: 'debit',
    category: 'Food',
    amount: 32000,
  },
  {
    id: 3,
    date: '2024-02-15',
    description: 'Salary',
    type: 'credit',
    category: 'Income',
    amount: 40000,
  },
  {
    id: 4,
    date: '2024-02-20',
    description: 'Netflix',
    type: 'debit',
    category: 'Entertainment',
    amount: 29099,
  },
  {
    id: 5,
    date: '2024-03-10',
    description: 'Freelance',
    type: 'credit',
    category: 'Income',
    amount: 15000,
  },
  {
    id: 6,
    date: '2024-03-12',
    description: 'Uber',
    type: 'debit',
    category: 'Transport',
    amount: 16000,
  },
  {
    id: 7,
    date: '2024-04-10',
    description: 'Freelance',
    type: 'credit',
    category: 'Income',
    amount: 10000,
  },
  {
    id: 8,
    date: '2024-04-12',
    description: 'Rent',
    type: 'debit',
    category: 'Transport',
    amount: 18000,
  },
];


export const categoriesData: Category[] = [
  {
    name: 'Food',
    amount: 8000,
    budget: 10000,
  },
  {
    name: 'Transport',
    amount: 3000,
    budget: 5000,
  },
  {
    name: 'Entertainment',
    amount: 2000,
    budget: 3000,
  },
  {
    name: 'Shopping',
    amount: 5000,
    budget: 6000,
  },
]; 