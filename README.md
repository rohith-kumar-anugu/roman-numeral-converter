# Roman Numeral Converter

A web application that converts integers to Roman numerals.

## Overview

This application consists of a web service backend and a React frontend that allows users to convert whole numbers (between 1-3999) to Roman numerals. 

## Features

- RESTful API endpoint for Roman numeral conversion
- React frontend using Adobe's React Spectrum component library
- Light and dark mode support that follows system preferences
- Input validation to ensure numbers are within the valid range (1-3999)
- Complete implementation of the three pillars of observability: logs, metrics, and traces
- Docker containerization for easy deployment
- Comprehensive test coverage

## Technologies Used

### Backend
- **Node.js** with **Express.js** - For the web service
- **TypeScript** - For type safety and better developer experience
- **Pino** - For structured logging
- **Prometheus** - For metrics collection
- **Jest** - For automated testing

### Frontend
- **React** - For building the user interface
- **Adobe React Spectrum** - For UI components
- **TypeScript** - For type safety

### DevOps
- **Docker** - For containerization
- **Nodemon** - For development hot-reloading

## Architecture

The application follows a client-server architecture:

1. **Backend Service**: A RESTful API that accepts requests to convert numbers to Roman numerals
2. **Frontend Application**: A React application that provides a user interface for the conversion service

## API Specification

The backend exposes the following endpoint:

```
GET /romannumeral?query={integer}
```

Where `{integer}` is a whole number between 1 and 3999.

### Successful Response
```json
{
  "input": "42",
  "output": "XLII"
}
```

### Error Response
Plain text error message with appropriate HTTP status code.

## Roman Numeral Conversion Logic

The conversion algorithm uses a greedy approach to build Roman numerals:

1. Define mappings for Roman numeral symbols (I, V, X, L, C, D, M) to their respective values
2. Starting with the largest value, repeatedly add the symbol to the result and subtract its value from the input number
3. Continue until the input number becomes zero

This approach guarantees the correct Roman numeral representation with optimal time complexity.

## Observability Implementation

### Logs
- Structured JSON logging with Pino
- Log levels for different types of events
- Request/response logging for API calls

### Metrics
- Prometheus metrics for request counts, response times, and errors
- Metrics endpoint exposed at `/metrics`

### Traces
- Request tracing with unique identifiers
- Performance timing for the conversion process

## Project Structure

```
roman-numeral-converter/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── romanNumeralController.ts
│   │   ├── routes/
│   │   │   └── romanNumeralRoutes.ts
│   │   ├── services/
│   │   │   └── romanNumeralService.ts
│   │   │   └── romanNumeralService.test.ts
│   │   └── index.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── jest.config.js
├── frontend/
│   ├── src/
│   │   ├── App.tsx
│   │   ├── RomanNumeralConverter.tsx
│   │   └── index.tsx
│   ├── package.json
│   └── tsconfig.json
├── docker/
│   ├── Dockerfile.backend
│   ├── Dockerfile.frontend
│   ├── nginx.conf
│   └── docker-compose.yml
└── README.md
```

## Setup and Installation

### Prerequisites
- Node.js (v14 or later)
- npm or yarn
- Docker and Docker Compose (for containerized deployment)

### Local Development

1. Clone the repository:
```bash
git clone <repository-url>
cd roman-numeral-converter
```

2. Backend setup:
```bash
cd backend
npm install
npm run dev
```
The backend will run on http://localhost:8080

3. Frontend setup:
```bash
cd frontend
npm install
npm start
```
The frontend will run on http://localhost:3000

### Docker Deployment

The project includes Docker configuration for containerized deployment:

#### Docker Files
- `docker/Dockerfile.backend`: Container configuration for the backend service
- `docker/Dockerfile.frontend`: Container configuration for the frontend application
- `docker/docker-compose.yml`: Orchestration file to run both services together
- `docker/nginx.conf`: Nginx configuration for serving the frontend and proxying API requests

#### Running with Docker

1. Make sure Docker and Docker Compose are installed on your system
2. Navigate to the docker directory:
   ```bash
   cd docker
   ```
3. Build and start the containers:
   ```bash
   docker-compose up --build
   ```
4. Access the application at http://localhost:3000

The Docker setup creates two containers:
- A backend container running the Node.js API on port 8080
- A frontend container with Nginx serving the React application on port 3000 and proxying API requests to the backend

## Testing

### Backend Tests

```bash
cd backend
npm test
```

### Frontend Tests

```bash
cd frontend
npm test
```

## Design Decisions

### Choice of Technologies

- **TypeScript**: Provides type safety and better code quality through static type checking.
- **Express.js**: Lightweight and flexible Node.js framework for building web services.
- **Pino**: High-performance, low-overhead logging library that produces structured JSON logs.
- **React Spectrum**: Adobe's design system that provides accessible, responsive components that adapt to light and dark modes.

### Error Handling

The application implements comprehensive error handling:
- Input validation for number range (1-3999)
- Proper HTTP status codes for different error types
- Detailed error messages for troubleshooting

### Observability

- **Logging**: Structured logs with appropriate context for each request
- **Metrics**: Prometheus metrics for monitoring system health and performance
- **Tracing**: Request tracing to follow requests through the system