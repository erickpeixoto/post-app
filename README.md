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


## **Development Requirement**
## **Homepage**

- [x] Implement a feed to display all posts by default.
- [x] Create a toggle switch labeled "All / Following."
- [x] Enable feed filtering based on the toggle switch position:
  - [x] When "All" is selected, show all users' posts.
  - [x] When "Following" is selected, show posts only from followed users.
- [x] Ensure the URL changes reflect the toggle state ("All" or "Following").
- [x] Implement a direct URL access feature that shows the correct feed based on URL parameters.
- [x] Add functionality to write and post new content on the homepage.

## **User Profile Page**

- [x] Develop the user profile page as a modal that overlays the homepage.
- [x] Change the URL when the user profile page is opened.
- [x] Display the user's information:
  - [x] Username
  - [x] Date joined (formatted as "Month Day, Year")
  - [x] Number of followers and following
  - [x] Total count of posts (including reposts and quote posts)
- [x] Show a feed of all the user's posts, reposts, and quote posts.
- [x] Implement the follow/unfollow feature:
  - [x] Add a "Follow" button to follow the user.
  - [x] Add an "Unfollow" button to unfollow the user.
- [x] Ensure new posts made on the profile page are attributed to the profile's user.

## **Users**

- [x] Enforce a username character limit of 14, alphanumeric only.
- [x] Implement a system for using hardcoded default users (for post creation and follow actions).

## **Posts**

- [x] Limit users to 5 posts per day (including reposts and quote posts).
- [x] Set a maximum post character limit of 777.
- [x] Display a live character count when users write a post.
- [x] Prevent users from updating or deleting posts.
- [x] Add functionality for users to repost others' content.
- [x] Implement the ability for users to quote-post with a comment.

## **Following**

- [x] Allow users to follow others via the profile page.
- [x] Prevent users from following themselves.
- [x] Implement follow/unfollow functionality.

## **General and Submission**

- [x] Review the test instructions, submission instructions, FAQ, and evaluation criteria in the briefing.
- [x] Ensure all features are consistent with the provided briefing document.
- [x] Perform thorough testing of all features before submission.
- [x] Prepare the project for submission according to the briefing instructions.




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
