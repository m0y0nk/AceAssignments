# AceAssignments

AceAssignments is a React-based web application designed to help users track, manage, and ace their assignments with ease. It provides features like a problem tracker, assignment calendar, and completion rate tracker, making it a one-stop solution for students and professionals.

---


```markdown

## 📌 Features

- **Random Problem of the Day**: Displays a random problem to solve, with the ability to expand for more details.
- **Assignment Calendar**: A calendar view to track and manage assignments and events.
- **Completion Rate Tracker**: Visualizes the completion rate of topics and assignments.
- **Problem Tracker**: Add, edit, and manage problems with details like title, topic, difficulty, and description.
- **AI-Powered Suggestions**: Generate problem-solving approaches using Google GenAI.
- **Responsive Design**: Fully responsive and optimized for all devices.

---

## 📚 Tech Stack

- **Frontend**: React, Vite
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Icons**: Font Awesome
- **AI Integration**: Google GenAI
- **UI Components**: Radix UI Dialog

```
---

## ⚙️ Installation

1. **Clone the repository:**

```bash
git clone https://github.com/your-username/aceassignments.git
cd aceassignments
```

2. **Install dependencies:**

```bash
npm install
```

3. **Create a `.env` file** in the root directory and add:

```
VITE_GEMINI_API_KEY=your_google_genai_api_key
```

4. **Start the development server:**

```bash
npm run dev
```

5. **Open the application:**

(https://ace-assignments.vercel.app/)

---

## 🗂️ Project Structure

```
AceAssignments/
├── public/                  # Static assets
├── src/
│   ├── components/          # React components
│   │   ├── landingPage/     # Landing page components
│   │   ├── navbar/          # Navbar components
│   │   ├── pages/           # Page components
│   │   └── helper/          # Helper components
│   ├── context/             # React Context for state management
│   ├── styles/              # Global styles
│   ├── App.jsx              # Main application component
│   └── main.jsx             # Entry point
├── .env                     # Environment variables
├── package.json             # Project dependencies and scripts
├── tailwind.config.js       # Tailwind CSS configuration
└── vite.config.js           # Vite configuration
```

---

## 📋 Features in Detail

1. **Random Problem of the Day**
   - Displays a random problem from the database.
   - Expand functionality to navigate to the problems page.

2. **Assignment Calendar**
   - A calendar view to track assignments and events.
   - Expand functionality to navigate to the add-event page.

3. **Completion Rate Tracker**
   - Displays the completion rate of topics.
   - Expand functionality to navigate to the tracker page.

4. **Problem Tracker**
   - Add, edit, and manage problems with:
     - Title
     - Topic
     - Difficulty
     - Description
     - Approach
   - AI-powered suggestions for problem-solving approaches.

---

## 🌐 Environment Variables

| Variable Name        | Description                         |
|:--------------------|:------------------------------------|
| `VITE_GEMINI_API_KEY`| API key for Google GenAI integration |

---


## 📖 Dependencies

- **React**: Frontend library for building user interfaces.
- **Vite**: Fast build tool for modern web projects.
- **Tailwind CSS**: Utility-first CSS framework.
- **@radix-ui/react-dialog**: Accessible dialog components.
- **@fortawesome/fontawesome-free**: Icon library.
- **@google/genai**: AI-powered suggestions integration.

---
