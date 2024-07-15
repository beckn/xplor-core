import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsThreeUppercaseLetters(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'isThreeUppercaseLetters',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          // Check if the value is a string and has exactly three uppercase letters
          return typeof value === 'string' && /^[A-Z]{3}$/.test(value);
        },
        defaultMessage() {
          return 'Currency must contain exactly three uppercase letters.';
        },
      },
    });
  };
}
