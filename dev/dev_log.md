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

## Day 2 -25 april 2026- Folder Structure

### What I did
- Set up professional folder structure
- Implemented centralized response format
- Created custom error class (AppError)
- Added global error handling middleware

### Why I did it
- To standardize API responses
- To centralize error handling
- To keep controllers clean and maintainable

### Decisions
- Using layered architecture (Controller → Service → Repository)
- enforcing consistnt API response format across application
- centralizing error handling to avoid duplicate logic 
