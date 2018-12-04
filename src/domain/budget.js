import moment from 'moment'

class Period {
  constructor(start, end) {
    this.start = start
    this.end = end
  }
  getDayCount () {
    return this.end.diff(this.start, 'days') + 1
  }
  getOverlappingDays (other) {
    const start = this.start.isBefore(other.start) ? other.start : this.start
    const end = this.end.isAfter(other.end) ? other.end : this.end
    if (start.isAfter(end)) {
      return 0
    }
    return new Period(start, end).getDayCount()
  }
}

class MonthBudget {
  constructor(month, amount) {
    this.month = moment(month, 'YYYY-MM')
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
  getAmountOfPeriod (period) {
    return period.getOverlappingDays(this.getPeriod()) * (this.amount / this.getDayCount())
  }
}

export class Budget {
  budgets = {}

  query(startDate, endDate) {
    return this._query(new Period(
      moment(startDate, 'YYYY-MM-DD'),
      moment(endDate, 'YYYY-MM-DD')
    ))
  }

  _query(period) {
    return Object.entries(this.budgets)
      .map(([month, amount]) => new MonthBudget(month, amount))
      .map(b => b.getAmountOfPeriod(period))
      .reduce((sum, amount) => sum + amount, 0)
  }
}
