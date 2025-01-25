import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  port: process.env.PORT,
  Node_ENV:process.env.NODE_ENV,
  DATABASE_URL: process.env.DATABASE_URL,
  SALT_ROUND: process.env.SALT_ROUND,
  JWT_ACCESS_SECRET:process.env.JWT_ACCESS_SECRET,
  JWT_ACCESS_EXPIRES_IN :process.env.JWT_ACCESS_EXPIRES_IN, 
  jwt_refresh_secret:process.env.JWT_REFRESH_SECRET,
  jwt_refresh_expires_in:process.env.JWT_REFRESH_EXPIRES_IN,
  jwt_Reset_ui_link:process.env.JWT_RESET_UI_LINK,
  node_mailer_pass:process.env.NODE_MAILER_APP_PASS,
  node_mailer_email:process.env.NODE_MAILER_EMAIL,

};
