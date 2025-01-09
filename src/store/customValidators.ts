import { email, helpers, maxLength, minLength, numeric, required } from '@vuelidate/validators'

const customRequired = helpers.withMessage('This field is required', required)

const customMinLength = (min: number) =>
  helpers.withMessage(`Minimum length is ${min} characters`, minLength(min))

const customMaxLength = (max: number) =>
  helpers.withMessage(`Maximum length is ${max} characters`, maxLength(max))

const customEmail = helpers.withMessage('Invalid email address', email)

const customNumeric = helpers.withMessage('This field must be a number', numeric)

export { customRequired, customMinLength, customMaxLength, customEmail, customNumeric }
