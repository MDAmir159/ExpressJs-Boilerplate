const dotenv = require("dotenv");
dotenv.config()
module.exports = {
  HOST: process.env.API_HOST,
  USER: process.env.API_USER,
  PASSWORD: process.env.API_PASSWORD,
  DATABASE: process.env.API_DATABASE,
  CONNECTION_LIMIT: process.env.API_CONNECTION_LIMIT,
  PORT: process.env.API_PORT,
  DB_PORT: process.env.DB_PORT,
  ACCESS_TOKEN_SECRET:process.env.ACCESS_TOKEN_SECRET,
	REFRESH_TOKEN_SECRET:process.env.REFRESH_TOKEN_SECRET,
  API_EMAIL:process.env.API_EMAIL,
  API_EMAIL_PASSWORD:process.env.API_EMAIL_PASSWORD,
  BASE_LINK : process.env.BASE_LINK,
  JWT_SECRET_KEY:process.env.JWT_SECRET_KEY,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET
};
