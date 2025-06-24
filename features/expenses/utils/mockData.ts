// Sample mock data for the expenses feature

import { Budget, Category, Expense, Income } from "../types";

// Mock categories
export const mockCategories: Category[] = [
  {
    id: "category-1",
    name: "Food",
    icon: "restaurant",
    color: "#FF6B6B",
    type: "expense",
  },
  {
    id: "category-2",
    name: "Transport",
    icon: "car",
    color: "#4ECDC4",
    type: "expense",
  },
  {
    id: "category-3",
    name: "Housing",
    icon: "home",
    color: "#FFD166",
    type: "expense",
  },
  {
    id: "category-4",
    name: "Entertainment",
    icon: "film",
    color: "#6A0572",
    type: "expense",
  },
  {
    id: "category-5",
    name: "Shopping",
    icon: "cart",
    color: "#F08A5D",
    type: "expense",
  },
  {
    id: "category-6",
    name: "Salary",
    icon: "cash",
    color: "#06D6A0",
    type: "income",
  },
  {
    id: "category-7",
    name: "Freelance",
    icon: "laptop",
    color: "#118AB2",
    type: "income",
  },
  {
    id: "category-8",
    name: "Investments",
    icon: "trending-up",
    color: "#073B4C",
    type: "income",
  },
];

// Get current year for mock data
const currentYear = 2025;

// Mock expense transactions
export const mockExpenses: Omit<Expense, "category">[] = [
  // April 2025
  {
    id: "expense-april-1",
    amount: 22.75,
    description: "Dinner",
    date: new Date(currentYear, 3, 5).toISOString(),
    categoryId: "category-1",
    type: "expense",
    isPaid: true,
  },
  {
    id: "expense-april-2",
    amount: 40.0,
    description: "Gas",
    date: new Date(currentYear, 3, 8).toISOString(),
    categoryId: "category-2",
    type: "expense",
    isPaid: true,
  },
  {
    id: "expense-april-3",
    amount: 1200.0,
    description: "Rent",
    date: new Date(currentYear, 3, 1).toISOString(),
    categoryId: "category-3",
    type: "expense",
    isPaid: true,
  },
  {
    id: "expense-april-4",
    amount: 85.0,
    description: "Concert tickets",
    date: new Date(currentYear, 3, 15).toISOString(),
    categoryId: "category-4",
    type: "expense",
    isPaid: true,
  },

  // May 2025
  {
    id: "expense-may-1",
    amount: 30.5,
    description: "Lunch with colleagues",
    date: new Date(currentYear, 4, 10).toISOString(),
    categoryId: "category-1",
    type: "expense",
    isPaid: true,
  },
  {
    id: "expense-may-2",
    amount: 45.0,
    description: "Uber rides",
    date: new Date(currentYear, 4, 14).toISOString(),
    categoryId: "category-2",
    type: "expense",
    isPaid: true,
  },
  {
    id: "expense-may-3",
    amount: 1200.0,
    description: "Rent",
    date: new Date(currentYear, 4, 1).toISOString(),
    categoryId: "category-3",
    type: "expense",
    isPaid: true,
  },
  {
    id: "expense-may-4",
    amount: 150.0,
    description: "New jacket",
    date: new Date(currentYear, 4, 18).toISOString(),
    categoryId: "category-5",
    type: "expense",
    isPaid: true,
  },

  // June 2025
  {
    id: "expense-1",
    amount: 25.5,
    description: "Lunch",
    date: new Date(currentYear, 5, 15).toISOString(),
    categoryId: "category-1",
    type: "expense",
    isPaid: true,
  },
  {
    id: "expense-2",
    amount: 35.0,
    description: "Taxi",
    date: new Date(currentYear, 5, 14).toISOString(),
    categoryId: "category-2",
    type: "expense",
    isPaid: true,
  },
  {
    id: "expense-3",
    amount: 1200.0,
    description: "Rent",
    date: new Date(currentYear, 5, 1).toISOString(),
    categoryId: "category-3",
    type: "expense",
    isPaid: true,
  },
  {
    id: "expense-4",
    amount: 45.0,
    description: "Movie tickets",
    date: new Date(currentYear, 5, 10).toISOString(),
    categoryId: "category-4",
    type: "expense",
    isPaid: true,
  },
  {
    id: "expense-5",
    amount: 120.0,
    description: "New shoes",
    date: new Date(currentYear, 5, 8).toISOString(),
    categoryId: "category-5",
    type: "expense",
    isPaid: true,
  },
  {
    id: "expense-6",
    amount: 18.25,
    description: "Coffee and snacks",
    date: new Date(currentYear, 5, 13).toISOString(),
    categoryId: "category-1",
    type: "expense",
    isPaid: true,
  },
  {
    id: "expense-7",
    amount: 65.5,
    description: "Groceries",
    date: new Date(currentYear, 5, 12).toISOString(),
    categoryId: "category-1",
    type: "expense",
    isPaid: true,
  },
  {
    id: "expense-8",
    amount: 22.99,
    description: "Uber",
    date: new Date(currentYear, 5, 11).toISOString(),
    categoryId: "category-2",
    type: "expense",
    isPaid: true,
  },
];

// Mock income transactions
export const mockIncomes: Omit<Income, "category">[] = [
  // April 2025
  {
    id: "income-april-1",
    amount: 3000.0,
    description: "Monthly salary",
    date: new Date(currentYear, 3, 5).toISOString(),
    categoryId: "category-6",
    type: "income",
    isPaid: true,
  },
  {
    id: "income-april-2",
    amount: 350.0,
    description: "Part-time project",
    date: new Date(currentYear, 3, 18).toISOString(),
    categoryId: "category-7",
    type: "income",
    isPaid: true,
  },

  // May 2025
  {
    id: "income-may-1",
    amount: 3000.0,
    description: "Monthly salary",
    date: new Date(currentYear, 4, 5).toISOString(),
    categoryId: "category-6",
    type: "income",
    isPaid: true,
  },
  {
    id: "income-may-2",
    amount: 420.0,
    description: "Website design",
    date: new Date(currentYear, 4, 22).toISOString(),
    categoryId: "category-7",
    type: "income",
    isPaid: true,
  },
  {
    id: "income-may-3",
    amount: 100.0,
    description: "Stock dividends",
    date: new Date(currentYear, 4, 28).toISOString(),
    categoryId: "category-8",
    type: "income",
    isPaid: true,
  },

  // June 2025
  {
    id: "income-1",
    amount: 3000.0,
    description: "Monthly salary",
    date: new Date(currentYear, 5, 5).toISOString(),
    categoryId: "category-6",
    type: "income",
    isPaid: true,
  },
  {
    id: "income-2",
    amount: 500.0,
    description: "Freelance project",
    date: new Date(currentYear, 5, 15).toISOString(),
    categoryId: "category-7",
    type: "income",
    isPaid: true,
  },
  {
    id: "income-3",
    amount: 120.0,
    description: "Dividends",
    date: new Date(currentYear, 5, 20).toISOString(),
    categoryId: "category-8",
    type: "income",
    isPaid: true,
  },
];

// Mock budgets
export const mockBudgets: Budget[] = [
  {
    id: "budget-1",
    name: "Food Budget",
    amount: 300,
    period: "monthly",
    categoryId: "category-1",
    startDate: new Date(currentYear, 0, 1).toISOString(),
  },
  {
    id: "budget-2",
    name: "Transport Budget",
    amount: 200,
    period: "monthly",
    categoryId: "category-2",
    startDate: new Date(currentYear, 0, 1).toISOString(),
  },
  {
    id: "budget-3",
    name: "Entertainment",
    amount: 150,
    period: "monthly",
    categoryId: "category-4",
    startDate: new Date(currentYear, 0, 1).toISOString(),
  },
  {
    id: "budget-4",
    name: "Overall Monthly Budget",
    amount: 2000,
    period: "monthly",
    startDate: new Date(currentYear, 0, 1).toISOString(),
  },
];
