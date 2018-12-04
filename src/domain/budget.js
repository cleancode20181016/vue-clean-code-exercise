import moment from 'moment'

export class Budget {
  budgets = {}

  getMonthBudgetAmount(date) {
    return this.budgets[date.format('YYYY-MM')] || 0
  }

  query(startDate, endDate) {
    const momentStartDate = moment(startDate, 'YYYY-MM-DD')
    const momentEndDate = moment(endDate, 'YYYY-MM-DD')

    if (momentStartDate.isSame(momentEndDate, 'month')) {
      const diffDays = momentEndDate.diff(momentStartDate, 'days') + 1
      const budget = (this.getMonthBudgetAmount(momentStartDate) / momentStartDate.daysInMonth()) * diffDays
      return budget
    }
    let budget = 0

    // start month
    const numberOfDaysInStartMonth = getNumbersOfDaysInStartMonth(momentStartDate)
    const amountDaysFirst = momentStartDate.daysInMonth()
    const firstMonthBudget = this.getMonthBudgetAmount(momentStartDate)
    const totalBudgetFirstMonth = numberOfDaysInStartMonth * (firstMonthBudget / amountDaysFirst)
    budget += totalBudgetFirstMonth

    // months in between
    const monthDiff = momentEndDate.diff(momentStartDate, 'months') - 1
    for (let month = 1; month <= monthDiff; month++) {
      const monthString = moment(momentStartDate)
        .add(month, 'month')
        .format('YYYY-MM')
      const budgetThisMonth = this.budgets[monthString] || 0
      budget += budgetThisMonth
    }

    // end month
    const numberOfDaysInLastMonth = getNumbersOfDaysInEndMonth(momentEndDate)
    const amountDaysLast = momentEndDate.daysInMonth()
    const lastMonthBudget = this.getMonthBudgetAmount(momentEndDate)
    const totalBudgetLastMonth = numberOfDaysInLastMonth * (lastMonthBudget / amountDaysLast)
    budget += totalBudgetLastMonth
    return budget
  }
}

const getNumbersOfDaysInStartMonth = momentStartDate => {
  const endDate = moment(momentStartDate).endOf('month')
  const remainingDays = endDate.diff(momentStartDate, 'days')

  return remainingDays + 1
}

const getNumbersOfDaysInEndMonth = momentEndDate => {
  const startDate = moment(momentEndDate).startOf('month')
  const remainingDays = momentEndDate.diff(startDate, 'days')

  return remainingDays + 1
}
