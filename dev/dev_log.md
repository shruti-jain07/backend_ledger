## Day 1- 24 April 2026 - Project Initialization

### Work Done
- Initialized Node.js project using npm init
- Installed core dependencies (express, mongoose, dotenv)
- Installed nodemon for development
- Created basic Express server and verified it is running
- Setup MongoDB Atlas cluster and connected using mongoose
- Installed MongoDB Compass and verified DB connection
- Initialized Git repository and created initial commit

### Decisions
- Using environment variables (.env) to store sensitive data like DB URI
- Keeping DB connection logic inside src/config/db.js for separation of concerns
- Using feature-based branching strategy
- Each module will be developed in separate branches and merged into main after completion

## Day 2 -25 april 2026- base Structure

### What I did
- Set up professional folder structure
- Implemented centralized response format
- Created custom error class (AppError)
- Added global error handling middleware
- Installed Joi for schema-based validation
- created reusable validation schema
- added support for body,params, and query validation
- Integrated Winston for Structured Logging
- Created centralized logger utility
- Implemented request logging middleware
- Logged API request details(method,url,status,duration)
### Why I did it
## Error handling
- To standardize API responses
- To centralize error handling
- To keep controllers clean and maintainable
## Validation
- to Keep validation logic completely separate from controllers

### Decisions
- Using layered architecture (Controller → Service → Repository)
- enforcing consistnt API response format across application
- centralizing error handling to avoid duplicate logic 
- using middleware based validation for reusability
- Using structured JSON logs for better debugging and scalability
- Centralizing all logs using Winston
## Day 3 -27 april 2026- git synchronization
### Issue faced & how i resolved
- merge conflict happened
- in order to resolve this used git stash
- because of some mismatch code got lost
- restored everything from main
- then applied some changes
- successfully resolved everything and code got cleanly merged into main
## What i did 
- Centralized error-handling & response format done
- validation done
- logging done
## Day-4 28April 2026 
## Postman Setup
### What I did
- Created environment with base_url
- Created API collection
- Added initial health check endpoint
- Structured collection for future modules

### Why I did it
- To standardize API testing
- To avoid hardcoded URLs
- To maintain reusable API structure

### Outcome
- Postman is ready for structured backend testing
## Day 5 - 29 April 2026 to 02 May 2026
base_url=http://localhost:3000
## Auth / User Module

### What I did

- Designed User schema with email, name, password
- Implemented password hashing using bcrypt (pre-save hook)
- Built register and login APIs
- Created APIs
    - POST base_url/api/auth/register -> register
    - POST base_url/api/auth/login -> login
- Implemented JWT-based authentication
- Integrated cookie-parser for token handling
- Created auth middleware:
  - Token verification
  - User extraction and attaching to req.user
- Ensured password is never exposed in response
- Integrated Joi validation for auth routes
- Tested all auth flows in Postman (success + edge cases)

### Why I did it

- To build a secure authentication system
- To protect routes using middleware
- To ensure proper validation and error handling

### Decisions

- Using cookies for token storage instead of headers
- Keeping authentication logic modular and reusable
- Using middleware for route protection
- Avoiding sensitive data exposure in API responses

### Outcome

- register and login working correctly
- Auth middleware fully functional
- System ready for protected routes

---

## Day 6 - 05 May 2026 to 06 May 2026

## Account Module

### What I did

- Designed Account schema:
  - Linked with user (ObjectId reference)
  - Added status (ACTIVE, FROZEN, CLOSED)
  - Added currency (INR, USD, EUR)
  - Applied indexing for performance
- Built complete module structure:
  - Repository for DB operations
  - Service for business logic
  - Controller for handling requests
- Created APIs:
  - POST base_url/api/account → Create account
  - GET base_url/api/account → Fetch user account
- Protected all routes using auth middleware
- Used req.user.id for user-specific operations
- Ensured user isolation (no cross-user data access)
- Followed consistent response structure
- Tested all scenarios in Postman:
  - Success cases
  - No token / invalid token
  - Multi-user isolation
- Organized Postman collection with proper naming

### Why I did it

- To build the first business module of the system
- To enforce secure, user-specific data access
- To maintain consistency in architecture and responses

### Decisions

- Not adding validation for account creation (no client input yet)
- Keeping schema minimal (no account name/type for now)
- Using middleware for authentication instead of manual checks

### Outcome

- Account module fully functional
- Secure user-based data handling implemented
- Strong foundation ready for transaction/ledger module

### 06 may-11 may 2026
# Transaction System Module

## Completed Features

### Transaction Model
- Added transaction schema
- Added transaction statuses:
  - PENDING
  - SUCCESS
  - FAILED
  - REVERSED
- Added idempotency key support
- Added account indexes

### Ledger System
- Added immutable ledger entries
- Implemented CREDIT and DEBIT ledger types
- Prevented ledger updates/deletes using mongoose middleware

### Authentication
- Added system user authorization middleware
- Added systemUser support in user model

### Transaction Processing
- Implemented atomic MongoDB transactions using sessions
- Added double-entry ledger logic
- Added balance derivation from ledger entries
- Added ownership validation
- Added account status validation
- Added insufficient balance validation
- Added same-account prevention
- Added duplicate transaction prevention using idempotency keys

### System Funding
- Added initial funds transfer API using system user account
- Added system account validation

### APIs Completed
- POST /api/transactions/transfer
- POST /api/transactions/system/initial-funds

### Testing Completed
- User to user transfers
- System to user transfers
- Ledger entry creation
- Transaction status updates
- Balance derivation checks
- Session rollback checks

### 12may-13may 
# Balance API 
### API Completed
- POST /api/account/:accountId/balance
## Feature
- Added account balance API
- Added ownership validation for balance access
## Testing
- Completed Postman testing for balance API
- Tested unauthorized balance access validation

## 14 may 2026
# Transaction History API Update

## API 
router.get("/history",authMiddleware,transactionController.getTransactionHistory)

## Completed

- Added transaction history API
- Added paginated transaction fetching
- Added latest-first transaction sorting
- Added transaction repository query for account-based history
- Added authenticated transaction history access
- Completed Postman testing for:
  - transaction history
  - pagination
  - unauthorized access