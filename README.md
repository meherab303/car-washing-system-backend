# Car Wash Booking System

## Project Overview
The Car Wash Booking System is a backend application designed to manage bookings for car wash services. It includes features for error handling, CRUD operations, authentication, and authorization, as well as transactional operations for data consistency. The system supports multiple user roles, such as admin and user, and provides functionality to create and manage bookings, services, and slots.

## Features
- **Authentication & Authorization**: Secure login system using access and refresh tokens for both users and admins.
- **CRUD Operations**: Create, read, update, and delete operations for Users, Services, BookingSlots, and Bookings.
- **BookingSlot Management**: Automatic generation of service slots based on start time, end time, and service duration.
- **Service Management**:Admins can create, update, and delete car wash services.Users can view available services and book them.
- **Booking Management**:Users can book, view, and cancel their car wash appointments.Admins can manage all bookings.
- **Access Control**:APIs are protected with authentication, ensuring that only authorized users can access certain endpoints.Admins have enhanced permissions compared to regular users.
- **Validation**: Request validation using Zod schemas.
- **Error Handling**: Global error handling middleware for consistent error responses.
- **No Data Found Middleware**: Handles scenarios where valid queries return no data.
- **Not Found Middleware**: Handles unmatched routes.

## Technology Stack
- **Programming Language**: TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Middleware**: Zod for validation, cookie-parser, and CORS

## Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB instance

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/meherab303/car-washing-system.git
   ```
2. Navigate to the project directory:
   ```bash
   cd car-wash-booking-system
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up the environment variables:
   - Create a `.env` file in the root directory
5. Start server:
   ```bash
   npm run start:dev   

## API Endpoints
### Authentication
- **POST** `/api/v1/auth/register`: Register a new user.
- **POST** `/api/v1/auth/login`: Login a user and return a JWT.

### Users
- **GET** `/api/v1/users`: Retrieve all users.
- **GET** `/api/v1/users/:id`: Retrieve a user by ID.
- **PATCH** `/api/v1/users/:id`: Update user details.
- **DELETE** `/api/v1/users/:id`: Delete a user.

### Services
- **POST** `/api/v1/services`: Create a new service.
- **GET** `/api/v1/services`: Retrieve all services.
- **GET** `/api/v1/services/:id`: Retrieve a service by ID.
- **PATCH** `/api/v1/services/:id`: Update a service.
- **DELETE** `/api/v1/services/:id`: Mark a service as deleted.

### Slots
- **POST** `/api/v1/slots`: Generate slots for a service.
- **GET** `/api/v1/slots`: Retrieve all slots.

### Bookings
- **POST** `/api/v1/bookings`: Create a new booking.
- **GET** `/api/v1/bookings`: Retrieve all bookings.
- **GET** `/api/v1/bookings/:id`: Retrieve a booking by ID.
- **PATCH** `/api/v1/bookings/:id`: Update a booking.
- **DELETE** `/api/v1/bookings/:id`: Cancel a booking.

## Middleware
### Global Error Handler
Handles all unhandled errors and provides a consistent error response structure:
```json
{
  "success": false,
  "message": "Error message",
  "errorMessages": [{ "path": "", "message": "Specific error detail" }],
  "stack": "Stack trace (only in development)"
}
```

### Not Found Middleware
Handles unmatched routes:
```json
{
  "success": false,
  "statusCode": 404,
  "message": "Not Found"
}
```

### No Data Found Middleware
Handles cases where queries return no data:
```json
{
  "success": false,
  "statusCode": 404,
  "message": "No Data Found",
  "data": []
}
```




