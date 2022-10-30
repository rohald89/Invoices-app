export interface ValidatorResult {
  [validatorName: string]: { [key: string]: any } & {
    error: boolean;
    message?: string;
  };
}

export type ValidatorFN = (value: any) => ValidatorResult;

function required(value: string): ValidatorResult {
  if (value === '' || value == null) {
    return { required: { error: true, message: 'Field is Required' } };
  }
  return { required: { error: false } };
}

function minLength(number: number) {
  return function (value): ValidatorResult {
    if (value == null || value.length < number) {
      return {
        minLength: {
          error: true,
          value: number,
          message: `Field minimum length is ${number}`
        }
      };
    }
    return { minLength: { error: false } };
  };
}

export const Validators = {
  required,
  minLength
};
