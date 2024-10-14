import Joi from 'joi';
import dotenv from 'dotenv';
dotenv.config();

const envSchema = Joi.object({
  PORT: Joi.number().default(5000),
  MONGOOSE_URL: Joi.string().required().description('Mongoose db url'),
})
  .unknown()
  .required();
const { error, value } = envSchema.validate(process.env);
if (error) {
  throw new Error(`Env vars validation error:${error.message} `);
}

export const port = value.PORT;
export const mongoose_url = value.MONGOOSE_URL;
