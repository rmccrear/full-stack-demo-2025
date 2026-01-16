# Potluck Heaven: Full-Stack Demo

**Potluck Heaven** is a lightweight, full-stack web application designed as a capstone project for a coding bootcamp. The goal of this project is to demonstrate foundational concepts in React state management, component-based architecture, and third-party authentication integration using **Supabase**.

## 🚀 Overview

The application serves as a platform for users to manage and share meals. It focuses on the core user journey of authentication and personalized content viewing.

### Key Features

* **Dynamic Client-Side Routing:** Custom navigation logic built using React state (handling transitions between Home, My Meals, and Sign In).
* **Supabase Authentication:** Secure user login utilizing Supabase's Auth API.
* **Global State Management:** Centralized user and navigation state managed in the root `App` component.
* **Environment Safety:** Implementation of environment variables for API keys and project URLs.

---

## 🛠 Tech Stack

| Technology | Purpose |
| --- | --- |
| **React** | Frontend UI library and component management. |
| **Supabase** | Backend-as-a-Service (BaaS) for Auth and Database. |
| **CSS3** | Custom styling and layout. |
| **Vite** | Build tool and development server. |

---

## 📂 Project Structure

```text
├── src/
│   ├── pages/
│   │   ├── Home.jsx      # Landing page content
│   │   ├── MyMeals.jsx   # Personalized meal dashboard
│   │   └── SignIn.jsx    # Authentication form & logic
│   ├── utils/
│   │   └── supabase.js   # Supabase client configuration
│   ├── App.jsx           # Root component (Router & State)
│   ├── App.css           # Global styles
│   └── main.jsx          # Entry point
├── .env                  # Environment variables (API keys)
└── package.json          # Dependencies and scripts

```

---

## ⚙️ Setup & Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/full-stack-demo.git
cd full-stack-demo

```


2. **Install dependencies**
```bash
npm install

```


3. **Environment Configuration**
Create a `.env` file in the root directory and add your Supabase credentials:
```env
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_anon_key_here

```


4. **Run the development server**
```bash
npm run dev

```



---

## 💡 Implementation Details

### Custom Routing Logic

Rather than using a library like React Router, this demo uses a functional `Maps` pattern to teach the fundamentals of conditional rendering.

```javascript
const [currentPage, setCurrentPage] = useState("home");

let pageElement = <Home navigate={navigate}/>;

if(currentPage === "my-meals") {
  pageElement = <MyMeals navigate={navigate} user={user} />;
}

```

### Authentication Flow

The `SignIn` component captures user input and interacts with the Supabase client. Upon a successful response, the user object is lifted to the `App` state, allowing the UI to personalize the "Welcome" message across all pages.

