// Helper functions for the expenses feature

import { Budget, BudgetFrequency, Category } from "../types";

/**
 * Formats a number as currency
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  }).format(amount);
}

/**
 * Formats a percentage
 */
export function formatPercentage(percentage: number): string {
  return `${percentage.toFixed(1)}%`;
}

/**
 * Gets a category by ID from a list of categories
 */
export function getCategoryById(
  categories: Category[],
  id: string
): Category | undefined {
  return categories.find((category) => category.id === id);
}

/**
 * Gets days in a month for a calendar view
 */
export function getDaysInMonth(month: number, year: number): Date[] {
  const date = new Date(year, month, 1);
  const days: Date[] = [];

  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return days;
}

/**
 * Gets week ranges for a month
 */
export function getWeekRanges(
  month: number,
  year: number
): { startDate: Date; endDate: Date; label: string }[] {
  const weeks: { startDate: Date; endDate: Date; label: string }[] = [];
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  // Start from the first day of the month
  let currentWeekStart = new Date(firstDay);

  // Adjust to previous Sunday if not already Sunday
  const startDayOfWeek = currentWeekStart.getDay();
  if (startDayOfWeek !== 0) {
    currentWeekStart.setDate(currentWeekStart.getDate() - startDayOfWeek);
  }

  // Generate weeks until we pass the end of the month
  while (currentWeekStart <= lastDay) {
    const currentWeekEnd = new Date(currentWeekStart);
    currentWeekEnd.setDate(currentWeekEnd.getDate() + 6);

    // Format a label for the week range
    const startFormat = currentWeekStart.getDate();
    const endFormat = currentWeekEnd.getDate();
    const monthFormat = currentWeekStart.toLocaleDateString("en-US", {
      month: "short",
    });
    const endMonthFormat = currentWeekEnd.toLocaleDateString("en-US", {
      month: "short",
    });

    const label =
      monthFormat === endMonthFormat
        ? `${monthFormat} ${startFormat} - ${endFormat}`
        : `${monthFormat} ${startFormat} - ${endMonthFormat} ${endFormat}`;

    weeks.push({
      startDate: new Date(currentWeekStart),
      endDate: new Date(currentWeekEnd),
      label,
    });

    // Move to next week
    currentWeekStart.setDate(currentWeekStart.getDate() + 7);
  }

  return weeks;
}

/**
 * Calculate amount spent in a budget period
 */
export function calculateBudgetProgress(
  budget: Budget,
  expenses: { amount: number; date: string }[]
): { spent: number; percentage: number } {
  const now = new Date();
  let startDate: Date;
  let endDate: Date;

  switch (budget.period) {
    case BudgetFrequency.WEEKLY:
      // Calculate the start of the week (Sunday)
      startDate = new Date(now);
      const dayOfWeek = startDate.getDay();
      startDate.setDate(startDate.getDate() - dayOfWeek);
      startDate.setHours(0, 0, 0, 0);

      // End of week (Saturday)
      endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 6);
      endDate.setHours(23, 59, 59, 999);
      break;

    case BudgetFrequency.MONTHLY:
      // Start of month
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);

      // End of month
      endDate = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        0,
        23,
        59,
        59,
        999
      );
      break;

    case BudgetFrequency.YEARLY:
      // Start of year
      startDate = new Date(now.getFullYear(), 0, 1);

      // End of year
      endDate = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);
      break;

    default:
      startDate = new Date(0);
      endDate = new Date();
  }

  // Calculate total spent during the period
  const filteredExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    return expenseDate >= startDate && expenseDate <= endDate;
  });

  const spent = filteredExpenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );
  const percentage = (spent / budget.amount) * 100;

  return { spent, percentage };
}

/**
 * Generate month items for horizontal month selector
 */
export function getMonthsForScroll(currentMonth: number, currentYear: number) {
  const months = [];

  // Add previous 4 months, current month, and next 4 months
  // (reduced from 6+5 to 4+4 to fit better with year display)
  for (let i = -4; i <= 4; i++) {
    let monthIndex = currentMonth + i;
    let year = currentYear;

    if (monthIndex < 0) {
      monthIndex = 12 + monthIndex;
      year = currentYear - 1;
    } else if (monthIndex > 11) {
      monthIndex = monthIndex - 12;
      year = currentYear + 1;
    }

    months.push({
      index: monthIndex,
      year,
      name: new Date(year, monthIndex).toLocaleString("default", {
        month: "short",
      }),
    });
  }

  return months;
}
