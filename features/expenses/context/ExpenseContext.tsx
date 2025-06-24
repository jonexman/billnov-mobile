import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Budget, Category, Transaction } from "../types";
import { getCategoryById } from "../utils/helpers";
import {
  mockBudgets,
  mockCategories,
  mockExpenses,
  mockIncomes,
} from "../utils/mockData";

// Define the context shape
interface ExpenseContextType {
  // Categories
  categories: Category[];
  addCategory: (category: Omit<Category, "id">) => Category;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  getCategoryById: (id: string) => Category | undefined;

  // Expenses
  expenses: Transaction[];
  addExpense: (
    expense: Omit<Transaction, "id" | "type" | "category">
  ) => Transaction | undefined;
  updateExpense: (
    id: string,
    updates: Partial<Omit<Transaction, "id" | "type">>
  ) => void;
  deleteExpense: (id: string) => void;
  getExpenseById: (id: string) => Transaction | undefined;
  filteredExpenses: (filter: ExpenseFilter) => Transaction[];

  // Incomes
  incomes: Transaction[];
  addIncome: (
    income: Omit<Transaction, "id" | "type" | "category">
  ) => Transaction | undefined;
  updateIncome: (
    id: string,
    updates: Partial<Omit<Transaction, "id" | "type">>
  ) => void;
  deleteIncome: (id: string) => void;
  getIncomeById: (id: string) => Transaction | undefined;
  filteredIncomes: (filter: ExpenseFilter) => Transaction[];

  // Budgets
  budgets: Budget[];
  addBudget: (budget: Omit<Budget, "id">) => Budget;
  updateBudget: (id: string, updates: Partial<Budget>) => void;
  deleteBudget: (id: string) => void;
  getBudgetById: (id: string) => Budget | undefined;

  // Analytics
  categoryTotals: CategoryTotal[];
  loading: boolean;
}

// Helper interfaces
interface CategoryTotal {
  categoryId: string;
  categoryName: string;
  categoryColor: string;
  categoryIcon: string;
  total: number;
  percentage: number;
}

interface ExpenseFilter {
  startDate?: Date;
  endDate?: Date;
  categoryId?: string;
  minAmount?: number;
  maxAmount?: number;
  isPaid?: boolean;
  searchText?: string;
}

// Create the context
const ExpenseContext = createContext<ExpenseContextType | null>(null);

// Provider component
export function ExpenseProvider({ children }: { children: React.ReactNode }) {
  // State for all data
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [expenses, setExpenses] = useState<Transaction[]>([]);
  const [incomes, setIncomes] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>(mockBudgets);
  const [categoryTotals, setCategoryTotals] = useState<CategoryTotal[]>([]);
  const [loading, setLoading] = useState(true);

  // Initialize expenses with mock data
  useEffect(() => {
    const expensesWithCategories = mockExpenses.map((expense) => ({
      ...expense,
      isPaid: expense.isPaid !== undefined ? expense.isPaid : true,
      category: getCategoryById(categories, expense.categoryId || "") || {
        id: "unknown",
        name: "Unknown",
        icon: "help-circle",
        color: "#999",
        type: "expense" as const,
      },
      type: "expense" as const,
    }));

    setExpenses(expensesWithCategories as Transaction[]);
  }, []);

  // Initialize incomes with mock data
  useEffect(() => {
    const incomesWithCategories = mockIncomes.map((income) => ({
      ...income,
      isPaid: income.isPaid !== undefined ? income.isPaid : true,
      category: getCategoryById(categories, income.categoryId || "") || {
        id: "unknown",
        name: "Unknown",
        icon: "help-circle",
        color: "#999",
        type: "income" as const,
      },
      type: "income" as const,
    }));

    setIncomes(incomesWithCategories as Transaction[]);
  }, []);

  // Calculate category analytics
  useEffect(() => {
    // Calculate totals by category
    const totals: Record<string, CategoryTotal> = {};
    let grandTotal = 0;

    expenses.forEach((expense) => {
      const categoryId = expense.category.id;
      if (!totals[categoryId]) {
        totals[categoryId] = {
          categoryId,
          categoryName: expense.category.name,
          categoryColor: expense.category.color,
          categoryIcon: expense.category.icon,
          total: 0,
          percentage: 0,
        };
      }
      totals[categoryId].total += expense.amount;
      grandTotal += expense.amount;
    });

    // Convert to array and calculate percentages
    const totalsArray = Object.values(totals).map((item) => ({
      ...item,
      percentage: grandTotal > 0 ? (item.total / grandTotal) * 100 : 0,
    }));

    setCategoryTotals(totalsArray);
    setLoading(false);
  }, [expenses]);

  // Category methods
  const addCategory = useCallback((category: Omit<Category, "id">) => {
    const newCategory = {
      ...category,
      id: `category-${Date.now()}`,
    };
    setCategories((prev) => [...prev, newCategory]);
    return newCategory;
  }, []);

  const updateCategory = useCallback(
    (id: string, updates: Partial<Category>) => {
      setCategories((prev) =>
        prev.map((category) =>
          category.id === id ? { ...category, ...updates } : category
        )
      );
    },
    []
  );

  const deleteCategory = useCallback((id: string) => {
    setCategories((prev) => prev.filter((category) => category.id !== id));
  }, []);

  const getCategoryByIdContext = useCallback(
    (id: string): Category | undefined => {
      return categories.find((category) => category.id === id);
    },
    [categories]
  );

  // Expense methods
  const addExpense = useCallback(
    (expense: Omit<Transaction, "id" | "type" | "category">) => {
      const category = getCategoryByIdContext(expense.categoryId);

      if (!category) {
        console.error("Category not found");
        return;
      }

      const newExpense: Transaction = {
        ...expense,
        id: `expense-${Date.now()}`,
        type: "expense",
        category,
      };

      setExpenses((prev) => [newExpense, ...prev]);
      return newExpense;
    },
    [getCategoryByIdContext]
  );

  const updateExpense = useCallback(
    (id: string, updates: Partial<Omit<Transaction, "id" | "type">>) => {
      setExpenses((prev) =>
        prev.map((expense) => {
          if (expense.id === id) {
            const updatedExpense = { ...expense, ...updates };

            // If categoryId was updated, update the category object too
            if (
              updates.categoryId &&
              updates.categoryId !== expense.categoryId
            ) {
              const newCategory = getCategoryByIdContext(updates.categoryId);
              if (newCategory) {
                updatedExpense.category = newCategory;
              }
            }

            return updatedExpense;
          }
          return expense;
        })
      );
    },
    [getCategoryByIdContext]
  );

  const deleteExpense = useCallback((id: string) => {
    setExpenses((prevExpenses) =>
      prevExpenses.filter((expense) => expense.id !== id)
    );
  }, []);

  const getExpenseById = useCallback(
    (id: string): Transaction | undefined => {
      return expenses.find((expense) => expense.id === id);
    },
    [expenses]
  );

  const filteredExpenses = useCallback(
    (filter: ExpenseFilter): Transaction[] => {
      return expenses.filter((expense) => {
        // Apply date filter
        if (filter.startDate && new Date(expense.date) < filter.startDate) {
          return false;
        }
        if (filter.endDate && new Date(expense.date) > filter.endDate) {
          return false;
        }

        // Apply category filter
        if (filter.categoryId && expense.category.id !== filter.categoryId) {
          return false;
        }

        // Apply amount filter
        if (
          filter.minAmount !== undefined &&
          expense.amount < filter.minAmount
        ) {
          return false;
        }
        if (
          filter.maxAmount !== undefined &&
          expense.amount > filter.maxAmount
        ) {
          return false;
        }

        // Apply isPaid filter
        if (filter.isPaid !== undefined && expense.isPaid !== filter.isPaid) {
          return false;
        }

        // Apply search text filter
        if (
          filter.searchText &&
          !expense.description
            .toLowerCase()
            .includes(filter.searchText.toLowerCase())
        ) {
          return false;
        }

        return true;
      });
    },
    [expenses]
  );

  // Income methods
  const addIncome = useCallback(
    (income: Omit<Transaction, "id" | "type" | "category">) => {
      const category = getCategoryByIdContext(income.categoryId);

      if (!category) {
        console.error("Category not found");
        return;
      }

      const newIncome: Transaction = {
        ...income,
        id: `income-${Date.now()}`,
        type: "income",
        category,
      };

      setIncomes((prev) => [newIncome, ...prev]);
      return newIncome;
    },
    [getCategoryByIdContext]
  );

  const updateIncome = useCallback(
    (id: string, updates: Partial<Omit<Transaction, "id" | "type">>) => {
      setIncomes((prev) =>
        prev.map((income) => {
          if (income.id === id) {
            const updatedIncome = { ...income, ...updates };

            // If categoryId was updated, update the category object too
            if (
              updates.categoryId &&
              updates.categoryId !== income.categoryId
            ) {
              const newCategory = getCategoryByIdContext(updates.categoryId);
              if (newCategory) {
                updatedIncome.category = newCategory;
              }
            }

            return updatedIncome;
          }
          return income;
        })
      );
    },
    [getCategoryByIdContext]
  );

  const deleteIncome = useCallback((id: string) => {
    setIncomes((prevIncomes) =>
      prevIncomes.filter((income) => income.id !== id)
    );
  }, []);

  const getIncomeById = useCallback(
    (id: string): Transaction | undefined => {
      return incomes.find((income) => income.id === id);
    },
    [incomes]
  );

  const filteredIncomes = useCallback(
    (filter: ExpenseFilter): Transaction[] => {
      return incomes.filter((income) => {
        // Apply date filter
        if (filter.startDate && new Date(income.date) < filter.startDate) {
          return false;
        }
        if (filter.endDate && new Date(income.date) > filter.endDate) {
          return false;
        }

        // Apply category filter
        if (filter.categoryId && income.category.id !== filter.categoryId) {
          return false;
        }

        // Apply amount filter
        if (
          filter.minAmount !== undefined &&
          income.amount < filter.minAmount
        ) {
          return false;
        }
        if (
          filter.maxAmount !== undefined &&
          income.amount > filter.maxAmount
        ) {
          return false;
        }

        // Apply isPaid filter
        if (filter.isPaid !== undefined && income.isPaid !== filter.isPaid) {
          return false;
        }

        // Apply search text filter
        if (
          filter.searchText &&
          !income.description
            .toLowerCase()
            .includes(filter.searchText.toLowerCase())
        ) {
          return false;
        }

        return true;
      });
    },
    [incomes]
  );

  // Budget methods
  const addBudget = useCallback((budget: Omit<Budget, "id">) => {
    const newBudget = {
      ...budget,
      id: `budget-${Date.now()}`,
    };
    setBudgets((prev) => [...prev, newBudget]);
    return newBudget;
  }, []);

  const updateBudget = useCallback((id: string, updates: Partial<Budget>) => {
    setBudgets((prev) =>
      prev.map((budget) =>
        budget.id === id ? { ...budget, ...updates } : budget
      )
    );
  }, []);

  const deleteBudget = useCallback((id: string) => {
    setBudgets((prev) => prev.filter((budget) => budget.id !== id));
  }, []);

  const getBudgetById = useCallback(
    (id: string): Budget | undefined => {
      return budgets.find((budget) => budget.id === id);
    },
    [budgets]
  );

  // Create value object
  const contextValue: ExpenseContextType = {
    // Categories
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    getCategoryById: getCategoryByIdContext,

    // Expenses
    expenses,
    addExpense,
    updateExpense,
    deleteExpense,
    getExpenseById,
    filteredExpenses,

    // Incomes
    incomes,
    addIncome,
    updateIncome,
    deleteIncome,
    getIncomeById,
    filteredIncomes,

    // Budgets
    budgets,
    addBudget,
    updateBudget,
    deleteBudget,
    getBudgetById,

    // Analytics
    categoryTotals,
    loading,
  };

  return (
    <ExpenseContext.Provider value={contextValue}>
      {children}
    </ExpenseContext.Provider>
  );
}

// Hooks for consuming the context
export function useExpenseContext() {
  const context = useContext(ExpenseContext);
  if (context === null) {
    throw new Error("useExpenseContext must be used within an ExpenseProvider");
  }
  return context;
}

export function useCategories() {
  const {
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    getCategoryById,
  } = useExpenseContext();
  return {
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    getCategoryById,
  };
}

export function useExpenses() {
  const {
    expenses,
    addExpense,
    updateExpense,
    deleteExpense,
    getExpenseById,
    filteredExpenses,
  } = useExpenseContext();
  return {
    expenses,
    addExpense,
    updateExpense,
    deleteExpense,
    getExpenseById,
    filteredExpenses,
  };
}

export function useIncomes() {
  const {
    incomes,
    addIncome,
    updateIncome,
    deleteIncome,
    getIncomeById,
    filteredIncomes,
  } = useExpenseContext();
  return {
    incomes,
    addIncome,
    updateIncome,
    deleteIncome,
    getIncomeById,
    filteredIncomes,
  };
}

export function useBudgets() {
  const { budgets, addBudget, updateBudget, deleteBudget, getBudgetById } =
    useExpenseContext();
  return { budgets, addBudget, updateBudget, deleteBudget, getBudgetById };
}

export function useCategoryAnalytics() {
  const { categoryTotals, loading } = useExpenseContext();
  return { categoryTotals, loading };
}

export function useExpenseData() {
  const { expenses, incomes, loading } = useExpenseContext();

  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );
  const totalIncomes = incomes.reduce((sum, income) => sum + income.amount, 0);
  const balance = totalIncomes - totalExpenses;

  return {
    totalExpenses,
    totalIncomes,
    balance,
    loading,
  };
}
