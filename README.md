# Hackathon Management Web Application

## Project Overview
This project involves the development of a web application for managing hackathons. The application enables users to:
- Discover upcoming hackathons.
- Create new hackathon events.
- Participate in hackathon events.

## Technical Stack
- **Frontend**: Next.js  
- **State Management**: React Hooks, Zustand  
- **Styling**: Tailwind CSS  
- **Authentication**: NextAuth.js  
- **Database**: MongoDB  
- **ORM**: Prisma  
- **Package Manager**: pnpm  

## Features
- **User Authentication**: Secure login and registration using NextAuth.js.
- **Hackathon Discovery**: Browse available hackathons and search by filters.
- **Hackathon Creation**: Authorized users can create new hackathons with descriptions, dates.
- **Participation**: Users can join hackathons and interact with event details.

## Setup Instructions

Follow these steps to set up the project on your local machine:

### Prerequisites
- Ensure you have **Node.js** (version 14.x or higher) and **pnpm** installed on your system.
- Set up a **MongoDB** instance for storing data.

### Steps to Run the Application

1. **Install dependencies** using pnpm:
   ```bash
   pnpm install
   ```

2. **Generate Prisma Client**:
   After installing dependencies, generate the Prisma client:
   ```bash
   pnpm run generate
   ```

3. **Configure the database**:
   - Ensure you have a running MongoDB instance.
   - Update the `.env` file with your MongoDB connection string.

4. **Run the development server**:
   Start the application:
   ```bash
   pnpm run dev
   ```

   The application should now be running on [http://localhost:3000](http://localhost:3000).

### Test User
To quickly test the application, you can use a pre-configured test user account. Follow these steps:
1. Navigate to the application at [http://localhost:3000](http://localhost:3000).
2. On the login screen, choose the **Sign In** option using the available authentication provider (such as Google or Email).
3. Use the following credentials for a test user:
   - **Email**: user1@test.com
   - **Password**: 123123

   (Note: This is for testing purposes; ensure proper authentication setup in production.)

### Environment Variables
The `.env` file should include the following variables:
- `DATABASE_URL`: The MongoDB connection string.
- `NEXTAUTH_URL`: The URL where your application is hosted (`http://localhost:3000` for local).

## License
This project is licensed under the MIT License.