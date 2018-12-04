import moment from 'moment'

class Period {
  constructor(start, end) {
    this.start = start
    this.end = end
  }
}

export class Budget {
  budgets = {}

  getMonthBudgetAmount(date) {
    return this.budgets[date.format('YYYY-MM')] || 0
  }

  query(startDate, endDate) {
    return this._query(new Period(
      moment(startDate, 'YYYY-MM-DD'),
      moment(endDate, 'YYYY-MM-DD')
    ))
  }

  _query(period) {

    if (period.start.isSame(period.end, 'month')) {
      const diffDays = period.end.diff(period.start, 'days') + 1
      const budget = (this.getMonthBudgetAmount(period.start) / period.start.daysInMonth()) * diffDays
      return budget
    }
    let budget = 0

    // start month
    const numberOfDaysInStartMonth = getNumbersOfDaysInStartMonth(period.start)
    const amountDaysFirst = period.start.daysInMonth()
    const firstMonthBudget = this.getMonthBudgetAmount(period.start)
    const totalBudgetFirstMonth = numberOfDaysInStartMonth * (firstMonthBudget / amountDaysFirst)
    budget += totalBudgetFirstMonth

    // months in between
    const monthDiff = period.end.diff(period.start, 'months') - 1
    for (let month = 1; month <= monthDiff; month++) {
      const monthString = moment(period.start)
        .add(month, 'month')
        .format('YYYY-MM')
      const budgetThisMonth = this.budgets[monthString] || 0
      budget += budgetThisMonth
    }

    // end month
    const numberOfDaysInLastMonth = getNumbersOfDaysInEndMonth(period.end)
    const amountDaysLast = period.end.daysInMonth()
    const lastMonthBudget = this.getMonthBudgetAmount(period.end)
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
