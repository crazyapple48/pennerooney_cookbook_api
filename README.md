This is the API for the Pennerooney Cookbook!!

Some notes:

1. Recipe route is /recipes

2. Method route is /methods

3. Source route is /sources

4. Purpose route is /purposes

5. Genre route is /genres

Currently set up for a Mysql database using Prisma and has a seed file included. Will be migrating to PostgreSql soon! :)

2 .env files will need to be created!

- .env.development

  - needs to have a PORT variable with the port you would like to use (defaults to 3000)

  - needs to have a DATABASE_URL variable with the connection string to your development database

- .env.test

  - needs to have a DATABASE_URL variable with the connection string to your test database

Notes after cloning Repo:

1. run "npm install"

2. "npm run testdb" will push prisma schema to the test database

3. "npm run devdb" will push prisma schema to the development database

4. "npx prisma db seed" SHOULD seed your development database with some dummy data

5. "npm run migrate:mysql" will create a new migration

6. "npm run dev" will run the development server for use with api calling applications like insomnia or postman

7. "npm run test" will run the test suites for all the routes
