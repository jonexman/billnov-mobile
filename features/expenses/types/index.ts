// Expense module types

// Category types
export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  type: "expense" | "income" | "both";
  priority?: number;
}

// Transaction types
export interface Transaction {
  id: string;
  amount: number;
  date: string;
  description: string;
  categoryId: string;
  category: Category;
  type: "expense" | "income";
  note?: string;
  isPaid: boolean;
  repeat?: string;
  remind?: string;
  goal?: string;
  color?: string;
  iconColor?: string;
}

export interface Expense extends Transaction {
  type: "expense";
}

export interface Income extends Transaction {
  type: "income";
}

// Budget types
export enum BudgetType {
  CATEGORY = "category",
  OVERALL = "overall",
}

export enum BudgetFrequency {
  WEEKLY = "weekly",
  MONTHLY = "monthly",
  YEARLY = "yearly",
}

export interface Budget {
  id: string;
  categoryId?: string;
  amount: number;
  period: "daily" | "weekly" | "monthly" | "yearly";
  startDate: string;
  endDate?: string;
  name: string;
  color?: string;
  icon?: string;
}

export interface Period {
  startDate: Date;
  endDate: Date;
  label?: string;
}
