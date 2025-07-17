#AI-Powered Blog Application
This is a full-stack blog application that leverages Artificial Intelligence to generate blog content. It provides a complete platform for users to create, view, like, comment on, and search for blog posts, all secured with modern authentication mechanisms.

#✨ Features
AI-Powered Content Generation: Dynamically generate engaging blog content using the Google Gemini API.

Secure User Authentication: Robust user login and registration system implemented with JSON Web Tokens (JWT).

Blog Management (CRUD): Users can create, read, update, and delete their blog posts.

Interactive Engagement: Functionality for users to like and comment on blog posts.

Efficient Search: A comprehensive search feature to easily find specific blog content.

Responsive User Interface: Designed to provide a seamless experience across various devices.

#🚀 Technologies Used
Frontend:

React.js: A JavaScript library for building user interfaces.

HTML & CSS: For structuring and styling the web pages.

Backend:

Node.js: A JavaScript runtime built on Chrome's V8 JavaScript engine.

Express.js: A fast, unopinionated, minimalist web framework for Node.js.

JSON Web Tokens (JWT): For secure and stateless authentication.

Google Gemini API: Integrated for AI-driven content generation.

Database: MongoDB

#📦 Installation & Setup
Follow these steps to get the project up and running on your local machine.

Prerequisites
Node.js (LTS version recommended)

npm or Yarn

Backend Setup
Navigate into the server directory:

cd server

Install the backend dependencies:

npm install
or
yarn install

Create a .env file in the server directory and add your environment variables. Example:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_google_gemini_api_key

Replace placeholders with your actual values.

Start the backend server:

npm start
or
yarn start

Frontend Setup
Navigate into the client directory:

cd client

Install the frontend dependencies:

npm install
or
yarn install

If your frontend needs to connect to the backend, ensure your API base URL is correctly configured (e.g., in a .env file in the client directory, or within your React app's configuration). Example:

REACT_APP_API_URL=http://localhost:5000/api

Adjust the URL if your backend runs on a different port or domain.

Start the frontend development server:

npm start
or
yarn start

#🖥️ Usage
Once both the backend and frontend servers are running:

Open your web browser and navigate to http://localhost:3000 (or the port where your React app is running).

Register a new user account or log in if you already have one.

Explore the blog posts, create your own, like posts, add comments, and utilize the search functionality.

