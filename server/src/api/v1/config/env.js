const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({path: path.join(__dirname, '../../.env')});

const envSchema = Joi.object({
    NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
    PORT: Joi.string().default('3000'),
    DATABASE_URL: Joi.string().uri().required().description('Database connection URL'),
    JWT_SECRET: Joi.string().min(32).required().min(32),
    JWT_EXPIRE: Joi.string().default('7d'),
    REDIS_HOST:Joi.string().default('localhost'),
    REDIS_PORT:Joi.number().default(6379),
    RATE_LIMIT_WINDOW_MS: Joi.number().default(15 * 60 * 1000),
    RATE_LIMIT_MAX_REQUEST: Joi.number().default(100),
    CORS_ORIGIN: joi.string().required(),
}).unknown();

const { error, value: envVars } = envSchema.validate(process.env);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
    env: env.NODE_ENV,
    port:env.PORT,
    jwt: {
    secret: env.JWT_SECRET,
    accessExpirationMinutes: env.JWT_EXPIRE,
    refreshExpirationDays: env.JWT_REFRESH_EXPIRE
  },
  redis: {
    host: env.REDIS_HOST,
    port: env.REDIS_PORT,
    password: env.REDIS_PASSWORD
  },
  rateLimit: {
    windowMs: env.RATE_LIMIT_WINDOW_MS,
    max: env.RATE_LIMIT_MAX_REQUESTS
  },
  cors: {
    origin: env.CORS_ORIGIN.split(',')
  }
};
