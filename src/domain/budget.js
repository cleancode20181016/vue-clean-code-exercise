import moment from 'moment'

class Period {
  constructor(start, end) {
    this.start = start
    this.end = end
  }
  getDayCount () {
    return this.end.diff(this.start, 'days') + 1
  }
}

class MonthBudget {
  constructor(month, amount) {
    this.month = month
    this.amount = amount
  }

  getDayCount () {
    return this.month.daysInMonth()
  }
  getPeriod () {
    return new Period(
      moment(this.month).startOf('month'),
      moment(this.month).endOf('month'),
    )
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
      const diffDays = period.getDayCount()
      return (this.getMonthBudgetAmount(period.start) / period.start.daysInMonth()) * diffDays
    }
    let budget = 0

    // start month
    budget += this._getAmountFromPeriod(new Period(
      period.start,
      moment(period.start).endOf('month')
    ), period.start)

    // months in between
    const monthDiff = period.end.diff(period.start, 'months') - 1
    for (let month = 1; month <= monthDiff; month++) {
      const thisMonth = moment(period.start)
        .add(month, 'month')
      budget += this._getAmountFromPeriod(period, thisMonth)
    }

    // end month
    budget += this._getAmountFromPeriod(new Period(
      moment(period.end).startOf('month'),
      period.end
    ), period.end)
    return budget
  }

  _getAmountFromPeriod (period, month) {
    const monthBudget = new MonthBudget(month, this.getMonthBudgetAmount(month))
    const monthPeriod = monthBudget.getPeriod()
    const startOfOverlapped = period.start.isBefore(monthPeriod.start) ? monthPeriod.start : period.start
    const endOfOverlapped = period.end.isAfter(monthPeriod.end) ? monthPeriod.end : period.end
    if (startOfOverlapped.isAfter(endOfOverlapped)) {
      return 0
    }
    const overlappingDays = new Period(startOfOverlapped, endOfOverlapped).getDayCount()
    return overlappingDays * (monthBudget.amount / monthBudget.getDayCount())
  }
}
