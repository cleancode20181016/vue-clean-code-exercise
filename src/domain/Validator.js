import _, {upperFirst} from 'lodash'

export const notEmpty = value => value !== ''
export const emptyError = field => `${upperFirst(field)} cannot be empty`
export const format = value => (/^\d{4}-\d{2}$/g).test(value)
export const formatError = field => `Invalid ${field} format`
export const positiveNumber = value => !isNaN(parseInt(value)) && value >= 0
export const positiveError = field => `Invalid ${field}`

export const NOT_EMPTY = {validate: notEmpty, error: emptyError};
export const FORMAT = {validate: format, error: formatError};
export const POSITIVE_NUMBER = {validate: positiveNumber, error: positiveError};

export default class Validator {
  errors = {}
  constructor(rules){
    this.rules = rules
  }
  validate(data, callback){
    this.errors = {}
    for (let field in this.rules) {
      let failure = this.rules[field].find(validation => !validation.validate(data[field]))
        || {error: () => ''};
      callback(field, failure.error(field))
      this.errors[field] = failure.error(field)
    }
  }

  get valid(){
    return _(this.errors).chain().values().compact().isEmpty().value()
  }
}
