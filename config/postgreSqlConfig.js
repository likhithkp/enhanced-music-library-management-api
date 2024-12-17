require("dotenv").config();

module.exports = {
  "development": {
    "username": "postgres.evzmohnwswlryyucnbsw",
    "password": "enhanced-music-library-management-api",
    "database": "postgres",
    "host": "aws-0-us-east-1.pooler.supabase.com",
    "dialect": "postgres",
    "pool_mode": "transaction"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": "postgres.evzmohnwswlryyucnbsw",
    "password": "enhanced-music-library-management-api",
    "database": "postgres",
    "host": "aws-0-us-east-1.pooler.supabase.com",
    "dialect": "postgres",
    "pool_mode": "transaction"
  }
};
