## Introduction
A project for a web app where any body can share there stories with images and share it to the world.

## Prerequisites
```bash
Git
Node.js and npm
Next.js React
Prisma for orm
Next auth for authentication
Docker (optional, for local PostgreSQL)
AWS account (for S3 setup)
```

## Setup Instructions
- Clone the Repository
```bash
Copy code
git clone <repository_url>
cd <repository_directory>
```
- Configure Environment Variables
  - Copy the example environment file:

```bash
Copy code
cp .env.example .env
```
  - Set up an AWS S3 bucket and create an IAM user with access key and secret access key.

  - Add the AWS access key and secret access key to the .env file:

```bash
AWS_ACCESS_KEY_ID=your_access_key_id
AWS_SECRET_ACCESS_KEY=your_secret_access_key
```
- Set Up PostgreSQL
You can either run a local PostgreSQL instance using Docker or use a third-party provider.

Using Docker:
```bash
docker run -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres
```
Using a Third-Party Provider:
Get the PostgreSQL connection URL from your provider and add it to the .env file:

```bash
DATABASE_URL=your_postgresql_connection_url
```
- Migrate the Database
Navigate to the db folder and run the migrations:

```bash
cd db
npx prisma migrate dev --name init
npx prisma generate
```
- Run the Project
Go back to the root directory and start the development server:

```bash
cd ..
npm run dev
```
- Create an Account and Add Seed Data
After running the server, open your browser and go to the local development URL (usually http://localhost:3000). Create an account and add some seed data to start working with the project.

Contributing
Please contributr to the project as much as possible.
