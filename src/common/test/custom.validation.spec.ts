// Import necessary decorators and functions from NestJS and class-validator/class-transformer libraries.
import { ArgumentMetadata } from '@nestjs/common';
import { IsString } from 'class-validator';
import { faker } from '@faker-js/faker';

import { CustomValidationPipe } from '../validation/custom.validation';

// Define a test suite for the CustomValidationPipe.
describe('CustomValidationPipe', () => {
  // Declare a variable to hold an instance of the CustomValidationPipe.
  let pipe: CustomValidationPipe;

  // Setup before each test case.
  beforeEach(() => {
    // Initialize the CustomValidationPipe instance.
    pipe = new CustomValidationPipe();
  });

  // Test case to ensure the pipe returns the value if validation passes.
  it('should return the value if validation passes', async () => {
    // Define a test DTO class with a single property 'name' that must be a string.
    class TestDto {
      @IsString()
      name: string;
    }

    // Create an ArgumentMetadata object to simulate the metadata passed to the pipe.
    const metadata: ArgumentMetadata = {
      type: 'body', // Simulate the validation being performed on the body of a request.
      metatype: TestDto, // Specify the metatype to be the TestDto class.
    };

    // Generate a random full name using Faker and create a value object to be validated.
    const value = { name: faker.person.fullName() };
    // Call the transform method of the pipe with the generated value and metadata.
    const result = await pipe.transform(value, metadata);
    // Assert that the result of the transformation is the same as the input value, indicating successful validation.
    expect(result).toEqual(value);
  });
});
