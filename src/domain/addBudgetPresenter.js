import Api from "../api";
import {FORMAT, NOT_EMPTY, POSITIVE_NUMBER} from "./Validator";
import Validator from "./Validator";

export default class AddBudgetPresenter {
  budget = {month: '', amount: 0}
  errors = {month: '', amount: ''}

  save(success) {
    const validations = {
      month: [ NOT_EMPTY, FORMAT ],
      amount: [ NOT_EMPTY, POSITIVE_NUMBER ]
    }
    const data = this.budget;
    let validator = new Validator(validations)
    validator.validate(data, (field, error) => this.errors[field] = error)

    if (!validator.valid) {
      return
    }
    let budgets = Api.getBudgets()
    let existing = budgets && budgets.find(budget => budget.month === this.budget.month)
    if (existing) {
      Api.updateBudget(this.budget)
    } else {
      Api.addBudget(this.budget)
    }
    success()
  }
}