# Computer-Based Exam Service

Welcome to the Computer-Based Exam Service, a platform for conducting and managing online exams.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Authors](#authors)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The Computer-Based Exam Service is a web application designed for conducting online exams. It provides a set of features to create and manage exams, courses, questions, options, and student responses.

## Features

- User authentication and role-based access control.
- Create and manage exams, courses, questions, and options.
- Allow students to take exams and submit their responses.
- Calculate and record exam scores.
- API for integration with other systems.

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed on your system.
- A PostgreSQL database for data storage.
- Prisma CLI installed globally (`npm install -g prisma`).

### Installation

1. Clone the repository:

   ```sh
   git clone [<repository-url>](https://github.com/Oluwateezzy/cbt-exam.git)
   cd cbt-exam
2. Install the project dependencies:

   ```sh
   npm install
3. Set up your environment variables. Create a .env file in the project root and configure your database connection details and other environment-specific settings.
4. Run database migrations to create the database tables:
   ```sh
   npx prisma migrate dev
5. Start the development server:
   ```sh
   npm run start:dev
The service should now be running on http://localhost:3000 by default.

### Usage
You can access the API documentation at /api/docs to learn about available endpoints and how to use them.

### API Documentation
API documentation is available in the Swagger UI interface. You can access it by navigating to /api in your web browser.

### Authors
- [Oluwafunmilayo Oluwatobiloba](https://github.com/oluwateezzy)

### Contributing
We welcome contributions from the community.

## License
Nest is [MIT licensed](LICENSE).
