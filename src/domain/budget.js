import moment from 'moment'

class Period {
  constructor(start, end) {
    this.start = start
    this.end = end
  }
  getDayCount () {
    if (this.start.isAfter(this.end)) {
      return 0
    }
    return this.end.diff(this.start, 'days') + 1
  }
  getOverlapping (other) {
    const start = this.start.isBefore(other.start) ? other.start : this.start
    const end = this.end.isAfter(other.end) ? other.end : this.end
    return new Period(start, end)
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
    let totalAmount = 0

    const monthDiff = period.end.diff(period.start, 'months') + 1
    for (let month = 0; month <= monthDiff; month++) {
      totalAmount += this._getAmountFromPeriod(period, moment(period.start).add(month, 'month'))
    }
    return totalAmount
  }

  _getAmountFromPeriod (period, month) {
    const monthBudget = new MonthBudget(month, this.getMonthBudgetAmount(month))
    const monthPeriod = monthBudget.getPeriod()
    const overlappingDays = period.getOverlapping(monthPeriod).getDayCount()
    return overlappingDays * (monthBudget.amount / monthBudget.getDayCount())
  }
}
