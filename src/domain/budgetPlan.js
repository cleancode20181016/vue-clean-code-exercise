import moment from 'moment'
import _ from 'lodash'

class Period {
    constructor(start, end) {
        this.start = start
        this.end = end
    }

    get dayCount() {
        if (this.end.isBefore(this.start)) {
            return 0
        }
        return this.end.diff(this.start, 'days') + 1
    }

    getOverlappingDayCount(another) {
        let endOverlapping = this.end.isBefore(another.end) ? this.end : another.end;
        let startOverlapping = this.start.isAfter(another.start) ? this.start : another.start;
        return new Period(startOverlapping, endOverlapping).dayCount;
    }
}

class Budget {
    constructor(month, amount) {
        this.amount = amount || 0
        this.month = month
    }

    dayCount() {
        return this.Period.dayCount
    }

    get Period() {
        return new Period(this.Start, this.End)
    }

    get End() {
        return moment(this.month, 'YYYY-MM').endOf('month');
    }

    get Start() {
        return moment(this.month, 'YYYY-MM').startOf('month');
    }

    getAmountOfOverlapping(period) {
        return this.amount / this.dayCount() * period.getOverlappingDayCount(this.Period);
    }
}

export class BudgetPlan {
    budgets = {}

    query(startDate, endDate) {

        return this._query(new Period(moment(startDate, 'YYYY-MM-DD'), moment(endDate, 'YYYY-MM-DD')))
    }

    _query(period) {

        return _(this.budgets).chain()
            .map((amount, month) => new Budget(month, amount))
            .sumBy(budget => budget.getAmountOfOverlapping(period))
            .value();
    }
}





