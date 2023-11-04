# Next Poster App

The Next Poster App is a simplified social media application, inspired by Twitter's core functionalities but with fewer features. It is designed to be a scalable, single-page application (SPA) that serves as a platform for users to make posts, reposts, quote posts, and follow other users.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation and Usage](#installation-and-usage)
- [Feature Planning](#feature-planning)
- [Self-Critique and Scalability](#self-critique-and-scalability)
- [License](#license)
- [Contact](#contact)

## Features

- Display a feed of all posts or just posts from followed users on the Homepage.
- User page with users management, post feeds, and follow/unfollow functionality.
- Post creation from the homepage and user pages, with character limits

## Technologies Used

- Next.js 14 for building a user-friendly SPA with Server Actions for backend-like functionalities.
- Prisma as an ORM for safe and performant database operations.
- PlanetScale for a scalable MySQL-compatible database platform.
- Zod for TypeScript-based data validation to ensure data integrity.
- TailwindCSS for utility-first styling for rapid UI development.
- Date-fns for convenient date manipulations.

## Installation and Usage

Clone the repository, install dependencies, and run the development server:

```bash
cd next-poster-app
pnpm install
pnpm run dev

Visit `http://localhost:3000` in your browser to use the application.


## Self-Critique and Scalability


- Testing coverage for frontend and serverless functionalities.
- UI improvements for user experience such as pagination or "fetch more" options.
- Accessibility enhancements for wider user compatibility.

### Scalability Considerations

- As user base and post volumes grow, the database schema and queries would need optimization to handle increased load.
- Efficient state management to ensure a seamless user experience.



## Note on `.env` File

While an `.env` file is included in this submission for ease of setup and demonstration purposes, please note that in a real-world scenario, sharing a `.env` file is not recommended practice as it can contain sensitive information. In production environments, environment variables should be securely managed.


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
