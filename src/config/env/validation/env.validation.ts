// Import Joi for schema validation.
import * as Joi from 'joi';

// Export a function that returns a configuration object with validation rules.
export default () => ({
  // Validate the NODE_ENV environment variable. It must be a string and one of the specified values. Default to 'development' if not provided.
  NODE_ENV: Joi.string().required().valid('development', 'production', 'test', 'provision').default('development'),
  // Validate the PORT environment variable. It must be a number and a valid port. Default to 5000 if not provided.
  PORT: Joi.number().port().required().default(5000),
  // Validate the DATABASE_URL environment variable. It must be a string and is required. Default to 'mongodb://localhost:27017/Xplore' if not provided.
  DATABASE_URL: Joi.string().required().default('mongodb://localhost:27017/Xplore'),
  // Validate the E_AUTH_URI environment variable. It must be a string and is required. Default to 'http://localhost:3000' if not provided.
  E_AUTH_URI: Joi.string().required().default('http://localhost:3000'),
  // Validate the WALLET_URL environment variable. It must be a string and is required. Default to 'http://localhost:4000' if not provided.
  WALLET_URL: Joi.string().required().default('http://localhost:4000'),
  // Validate the USER_SERVICE_URL environment variable. It must be a string and is required. Default to 'http://localhost:6000' if not provided.
  USER_SERVICE_URL: Joi.string().required().default('http://localhost:6000'),
  // Validate the ORGANIZATION environment variable. It must be a string and is required. Default to 'Xplore' if not provided.
  ORGANIZATION: Joi.string().required().default('Xplore'),
});