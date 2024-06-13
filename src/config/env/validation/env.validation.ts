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
  // Validate the STG_SERVICE_URL environment variable. It must be a string and is required. Default to 'http://localhost:3001' if not provided.
  STG_SERVICE_URL: Joi.string().required().default('http://localhost:3001'),
  // Validate the ORGANIZATION environment variable. It must be a string and is required. Default to 'Xplore' if not provided.
  ORGANIZATION: Joi.string().required().default('Xplore'),
  // Validate the LANGUAGE_SERVICE_URL environment variable. t must be a string and is required. Default to 'http://localhost:8000' if not provided.
  LANGUAGE_SERVICE_URL: Joi.string().required().default('http://localhost:8000'),
  // Validate the OPEN_STREET_URL environment variable. It must be a string and is required. Default to 'https://nominatim.openstreetmap.org' if not provided.
  OPEN_STREET_URL: Joi.string().required().default('https://nominatim.openstreetmap.org'),
  // Validate the LLM_SERVICE_URL environment variable. It must be a string and is required. Default to 'http://localhost:9000' if not provided.
  LLM_SERVICE_URL: Joi.string().required().default('http://localhost:8001'),
  // Validate the GRAFANA_SERVICE_URL environment variable. It must be a string and is required. Default to 'http://localhost:7000' if not provided.
  GRAFANA_SERVICE_URL: Joi.string().required().default('http://localhost:7000'),
  // Validate the DEFAULT_LANGUAGE environment variable. It must be a string and is required. Default to 'en' if not provided.
  DEFAULT_LANGUAGE: Joi.string().required().default('en'),
  // Validate the IL_SERVICE_URL environment variable. It must be a string and is required. Default to 'http://localhost:8000' if not provided.
  IL_SERVICE_URL: Joi.string().required().default('http://localhost:8000'),
});
