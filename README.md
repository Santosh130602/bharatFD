
# BharatFD

## Introduction

BharatFD is a project that allows users to submit and view frequently asked questions (FAQs) with answers in different languages. The system supports adding, viewing, and fetching FAQs via a user-friendly frontend interface and an API backend.

---

## Project Setup

### Prerequisites

Before starting, make sure you have the following installed on your system:

- **Node.js** (version 14 or higher)
- **npm** (Node Package Manager)
- **Postman** (for testing API endpoints)

### Clone the Repository

Clone the BharatFD GitHub repository to your local machine:

```bash
git clone https://github.com/Santosh130602/bharatFD
```

---

## Setting Up Frontend


1. Install the required dependencies:

```bash
npm install
```

2. Start the frontend development server:

```bash
npm start
```

This will launch the frontend on `http://localhost:3000`. Open this URL in your browser to access the frontend.

---

## Setting Up Backend

1. Navigate to the backend directory:

```bash
cd bharatFD
```

2. Install the necessary backend dependencies:

```bash
npm install
```

3. Start the backend server using **nodemon**:

```bash
nodemon index.js
```

This will run the backend API on `http://localhost:4000`.

---

## Testing the Application

### Testing Frontend

1. Open the frontend in your browser (`http://localhost:3000`).
2. In the input fields:
   - Enter a **question** and **answer** in their respective fields.
   - Select a language from the dropdown.
   - Click the "Translate" button to submit the FAQ and see the translated content.

### Testing Backend with Postman

#### 1. **POST Request to Add FAQ**

To test the backend, make a **POST** request to the following URL:

```
http://localhost:4000/api/faqs
```

Use the following JSON in the request body to add a new FAQ:

```json
{
  "question": "What is your name?",
  "answer": "My name is Santosh Kumar Pal.",
  "language": "en"
}
```

#### 2. **GET Request to Fetch All FAQs**

To fetch all FAQ data, make a **GET** request to:

```
http://localhost:4000/api/faqs
```

#### 3. **GET Request to Fetch FAQs for a Specific Language**

To get FAQ data for a specific language, use this **GET** request:

```
http://localhost:4000/api/faqs/?lang=en
```

---

## Frontend Access

You can also view the FAQ data directly on the frontend once the backend is running. The FAQs will be displayed after submitting them through the frontend.

---

## Project Structure

- **frontend**: Contains the React app for the user interface.
- **backend**: Contains the Express.js API for managing FAQs.

---

## Developer Info

- **Name**: Santosh Kumar Pal
- **Email**: santoshbiet.cs2144@gmail.com
