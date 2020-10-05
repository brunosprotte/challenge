const devConfig = {
  name: 'default',
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  entities: [
    './src/model/*.ts'
  ],
  migrations: [
    './src/database/migrations/*.ts'
  ],
  cli: {
    migrationsDir: './src/database/migrations/',
  },
};

const prodConfig = {
  name: 'default',
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  entities: [
    './dist/model/*.js'
  ],
  migrations: [
    './dist/database/migrations/*.js'
  ],
  cli: {
    migrationsDir: './dist/database/migrations',
  },
};

module.exports = process.env.NODE_ENV === 'development' ? devConfig : prodConfig;
