## Floor Management Application

This application provides a management system for a floor layout, where you can create and manage rooms, arrange tables within those rooms, and perform drag-and-drop operations to position the tables precisely.
Table of Contents

    Installation Instructions
    Running the Application
    Validation of Chosen Libraries and Tools
    Drag-and-Drop Positioning Mechanism

# Installation Instructions

To run the Floor Management application, you need to set up both the backend and frontend components.
Backend Setup

    Navigate to the backend folder:

`cd backend`

Install the required dependencies:

`npm install`

Start the backend server:

`npm run dev`

    The backend should now be running on http://localhost:5000

Frontend Setup

    Navigate to the frontend folder:

`cd frontend`

Install the required dependencies:

`npm install`

Start the frontend server:

`npm start`

    The frontend should now be running on http://localhost:3000

Once both the backend and frontend servers are running, you should be able to interact with the application in your browser.
Running Tests

To run the tests for this application, follow these steps:

    In the frontend folder, run the following command to run the unit tests:

`npm test`

    This will execute the tests using Jest and display the results in the terminal.

# Validation of Chosen Libraries and Tools

The application uses several libraries and tools to facilitate development and ensure smooth functionality. Here's a summary of the key libraries and why they were chosen:
Frontend Libraries:

    react: The core library for building user interfaces. It provides a component-based architecture that allows efficient rendering of UI elements.
    react-router-dom: Used for navigation and routing in React. This allows the application to handle page transitions without refreshing the browser.
    react-dnd: A drag-and-drop library for React that allows users to interact with tables and move them within the room layout. The react-dnd-html5-backend package provides the HTML5 drag-and-drop backend for modern browsers.
    react-hook-form: A form library that simplifies handling forms in React. It improves performance by minimizing re-renders.
    react-toastify: Used for displaying toast notifications. It helps to inform users about important actions or errors, such as saving or loading data.
    axios: A promise-based HTTP client used to interact with the backend API. It makes API calls for saving and loading room layouts.
    tailwindcss: A utility-first CSS framework that simplifies styling and improves productivity. Tailwind allows for a more responsive, flexible design with minimal custom CSS.

# Development Tools:

    jest: A testing framework used to ensure the correctness of the codebase. It provides test runners and assertions for unit and integration tests.
    @testing-library/react: A library for testing React components. It encourages testing components the way users interact with them.
    babel: A JavaScript compiler that allows the application to use modern JavaScript features by converting them into compatible code for older environments.
    postcss and autoprefixer: Used for post-processing the CSS to add browser-specific prefixes, ensuring cross-browser compatibility.

# Drag-and-Drop Positioning Mechanism

The application uses the react-dnd library to enable drag-and-drop functionality, allowing tables to be repositioned within the room layout.
How Drag-and-Drop Works in the Application:

    useDrag Hook: This hook is used to make the table elements draggable. When a user clicks and holds a table, the useDrag hook captures the drag event and updates the position of the table in real time.
    useDrop Hook: The useDrop hook is used to define the area where tables can be dropped (e.g., inside the room). The hook listens for the dragged item and updates the state accordingly when the item is dropped.
    Precise Positioning:
        Each table's position within the room is defined by an x and y coordinate in pixels. The drag-and-drop functionality allows for dynamic changes in these coordinates.
        The drag-and-drop interaction ensures that the table is placed at the exact position where the user drops it, preserving the accuracy of the layout.
        After the table is dropped, the updated position is saved back to the backend to ensure persistence across sessions.

Why This Approach:

    Precision: react-dnd provides an easy-to-use and flexible solution for implementing drag-and-drop with precise positioning. The useDrop and useDrag hooks make it simple to track the state of the dragged items and ensure that they are placed correctly.
    Customization: The approach used allows for easy customization of drag-and-drop behavior, including constraints on where items can be placed, handling rotations, and resizing tables.
    Performance: react-dnd is optimized for handling complex drag-and-drop interactions in a performant manner, even in applications with many items.

This method provides an intuitive user experience and ensures that the drag-and-drop functionality is highly precise, making it a suitable choice for applications like room layout management.