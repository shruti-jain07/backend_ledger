# Ledger Backend API

A backend-focused learning project built using Node.js, Express.js, MongoDB, and Ledger Architecture.

This project was created to explore and understand backend engineering concepts such as ledger-based systems, transactional consistency, idempotency, MongoDB transactions, centralized error handling, modular backend architecture, request validation, and API documentation using Swagger UI.

The goal of this project was not to build a production financial platform, but to better understand how scalable and maintainable backend systems are structured in real-world applications.

## What I Learned

Through this project, I explored and implemented several important backend development concepts:

* Ledger-based balance derivation
* MongoDB transactions and sessions
* Idempotency handling
* Repository-Service architecture
* Centralized error handling
* Request validation middleware
* Swagger/OpenAPI documentation
* JWT authentication with cookies
* Modular backend structure
* Transaction history management

This project helped me improve my understanding of backend architecture, API design, and system consistency.

## Features

### Authentication & Security

* JWT Authentication using HTTP-only cookies
* User Registration & Login
* Logout with Token Blacklisting

### Account Management

* Account Creation & Management
* Get User Accounts
* Get Account Balance

### Transactions

* Fund Transfer System
* Transaction History
* System Initial Funds Transfer
* Idempotency Handling
* Atomic Transactions using MongoDB Sessions

### Architecture & Tooling

* Ledger-based Balance Derivation
* Repository-Service Pattern
* Modular Backend Architecture
* Centralized Error Handling
* Request Validation Middleware
* Request Logging
* Swagger/OpenAPI Documentation
* Postman Collection Support

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* Swagger UI
* Postman

## Project Structure

```text
src/
├── controllers/
├── services/
├── repositories/
├── models/
├── routes/
├── middlewares/
├── validators/
├── utils/
├── config/
├── constants/
├── app.js

postman/
└── collections/

logs/

dev/
└── dev_log.md

.env
.gitignore
package.json
server.js
README.md
```

## Architecture Highlights

### Ledger-Based System

Balances are derived from ledger entries instead of directly storing balances in accounts. This improves transaction traceability and consistency.

### Idempotency

Duplicate transaction requests are prevented using idempotency keys.

### Atomic Transactions

MongoDB sessions and transactions are used to ensure transaction consistency during fund transfers.

### Modular Backend Structure

The project follows a clean modular architecture with Controllers, Services, Repositories, Middleware, Validators, and Models.

## API Documentation

Swagger UI documentation is available at:

```bash
/api-docs
```

## API Modules

### Auth APIs

* Register User
* Login User
* Logout User

### Account APIs

* Create Account
* Get User Accounts
* Get Account Balance

### Transaction APIs

* Transfer Funds
* System Initial Funds Transfer
* Get Transaction History

## Installation & Setup

### Clone Repository

```bash
git clone <your-repository-url>
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file using the `.env.example` template.

### Run Development Server

```bash
npm run dev
```

## Postman Collection

Import the Postman collection from:

```bash
/postman/collections/ledger-backend-api.postman_collection.json
```

## Future Improvements

* Refresh Token Mechanism
* Role-Based Access Control
* Rate Limiting
* Docker Support
* CI/CD Integration
* Automated Testing

## Author

Developed by Shruti Jain
