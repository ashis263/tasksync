# TaskSync - MERN Todo App with Real-Time Collaboration and Drag & Drop

TaskSync is a modern, collaborative todo application built using the MERN stack (MongoDB, Express.js, React.js, Node.js) with real-time updates via Socket.IO and interactive drag-and-drop functionality powered by React DnD.

## Features

-   **Real-time Collaboration:** Tasks are synchronized across all connected clients instantly using Socket.IO, allowing for seamless teamwork.
-   **Drag and Drop:** Reorder tasks within lists and move them between lists effortlessly using React DnD.
-   **User Authentication:** Secure user authentication with Firebase.
-   **Task Management:** Create, edit, and delete tasks with detailed descriptions and due dates.
-   **List Management:** Create, edit, and delete task lists.
-   **Responsive Design:** Works seamlessly on various devices.
-   **Modern UI:** Clean and intuitive user interface built with Tailwind CSS and DaisyUI.
-   **Form Validation:** Robust form validation using React Hook Form.
-   **Notifications:** User friendly sweet alert for notifications.
-   **Date handling:** Using Moment.js for date formatting.

## Technologies Used

-   **Frontend:**
    -   React.js
    -   React DnD (Drag and Drop)
    -   Socket.IO Client
    -   React Router DOM
    -   Axios (HTTP requests)
    -   React Hook Form
    -   Tailwind CSS
    -   DaisyUI
    -   React Icons
    -   React Responsive Modal
    -   Firebase Authentication
    -   Moment.js
    -   Sweetalert2
-   **Backend:**
    -   Node.js
    -   Express.js
    -   MongoDB
    -   Socket.IO Server

## Getting Started

### Prerequisites

-   Node.js (>=18)
-   npm or yarn
-   MongoDB
-   Firebase project with authentication enabled

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd TaskSync
    ```

2.  **Install backend dependencies:**

    ```bash
    cd backend
    npm install
    ```

3.  **Configure backend environment variables:**

    -   Create a `.env` file in the `backend` directory.
    -   Add the following variables:

        ```
        PORT=5000
        MONGODB_URI=<your_mongodb_connection_string>
        ```

4.  **Start the backend server:**

    ```bash
    npm run dev
    ```

5.  **Install frontend dependencies:**

    ```bash
    cd ../frontend
    npm install
    ```

6.  **Configure frontend environment variables:**

    -   Create a `.env.local` file in the `frontend` directory.
    -   Add the following variables:

        ```
        VITE_API_BASE_URL=http://localhost:5000
        VITE_FIREBASE_API_KEY=<your_firebase_api_key>
        VITE_FIREBASE_AUTH_DOMAIN=<your_firebase_auth_domain>
        VITE_FIREBASE_PROJECT_ID=<your_firebase_project_id>
        VITE_FIREBASE_STORAGE_BUCKET=<your_firebase_storage_bucket>
        VITE_FIREBASE_MESSAGING_SENDER_ID=<your_firebase_messaging_sender_id>
        VITE_FIREBASE_APP_ID=<your_firebase_app_id>
        ```

7.  **Start the frontend development server:**

    ```bash
    npm run dev
    ```

8.  **Open your browser and navigate to `http://localhost:5173` (or the port specified by Vite).**

### Live link
<ul>
  <li>🚀 <a href="https://task-flow-c8b5e.web.app/">Firebase Deployment</a></li>
</ul>