import moment from 'moment'

class Period {
    constructor(start, end) {
        this.start = start
        this.end = end
    }

    dayCount() {
        return this.end.diff(this.start, 'days') + 1
    }

    getOverlappingDayCount(another) {
        let endOverlapping = this.end.isBefore(another.end) ? this.end : another.end;
        let startOverlapping = this.start.isAfter(another.start) ? this.start : another.start;
        return new Period(startOverlapping, endOverlapping).dayCount();
    }
}

class Budget {
    constructor(month, amount) {
        this.amount = amount || 0
        this.month = month
    }

    dayCount() {
        return this.getPeriod().dayCount()
    }

    getPeriod() {
        return new Period(this.getStart(), this.getEnd())
    }

    getEnd() {
        return moment(this.month, 'YYYY-MM').endOf('month');
    }

    getStart() {
        return moment(this.month, 'YYYY-MM').startOf('month');
    }

    getAmountOfOverlapping(period) {
        return this.amount / this.dayCount() * period.getOverlappingDayCount(this.getPeriod());
    }
}

export class BudgetPlan {
    budgets = {}

    query(startDate, endDate) {

        return this._query(new Period(moment(startDate, 'YYYY-MM-DD'), moment(endDate, 'YYYY-MM-DD')))
    }

    _query(period) {
        if (period.start.isSame(period.end, 'month')) {

            let firstBudget = new Budget(period.start.format("YYYY-MM"), this.budgets[period.start.format("YYYY-MM")]);

            return firstBudget.getAmountOfOverlapping(period)
        }

        let totalAmount = 0

        // start month
        let firstBudget = new Budget(period.start.format("YYYY-MM"), this.budgets[period.start.format("YYYY-MM")]);

        totalAmount += firstBudget.getAmountOfOverlapping(period)

        // months in between
        const monthDiff = period.end.diff(period.start, 'months') - 1
        for (let month = 1; month <= monthDiff; month++) {
            const monthString = moment(period.start)
                .add(month, 'month')
                .format('YYYY-MM')
            let budget = new Budget(monthString, this.budgets[monthString]);
            totalAmount += budget.getAmountOfOverlapping(period)
        }

        // end month
        let lastBudget = new Budget(period.end.format("YYYY-MM"), this.budgets[period.end.format("YYYY-MM")]);

        totalAmount += lastBudget.getAmountOfOverlapping(period)
        return totalAmount
    }
}





