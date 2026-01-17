# 🌦️ Weather Proxy Server: Learning Cache & APIs

Welcome! This project demonstrates how to build a middleman (proxy) server that fetches weather data from an external provider and stores it locally to improve performance.

## 🎓 Learning Objectives

By exploring this codebase, you will learn:

1. **Route Parameters**: How to capture dynamic data from a URL.
2. **Environment Variables**: Why and how to hide sensitive API keys.
3. **The Cache Pattern**: Implementing "Check -> Fetch -> Store" logic to save time and money.
4. **Asynchronous JavaScript**: Using `async/await` for network requests.

---

## 🛠️ The Logic Flow: Cache Hit vs. Miss

In professional development, calling an external API is "expensive" (it takes time and often costs money per request). To solve this, we use a **Cache**.

### How it works in this app:

1. **The Request**: A user asks for weather in "London".
2. **The Check**: The server looks at the `weatherCache` object.
3. **Cache Hit**: If "London" is already in the object, we return that data immediately. No external call needed!
4. **Cache Miss**: If "London" is missing, we use `fetch()` to get it from Visual Crossing, save a copy in our `weatherCache`, and then send it to the user.

---

## 📂 Code Breakdown

### 1. Security with `.env`

We use `dotenv` to load our API key.

> **Teacher's Note:** Never hardcode your API keys directly in your script. If you push hardcoded keys to GitHub, hackers can steal them and run up your bill!

```javascript
const weather_api_key = process.env.WEATHER_API_KEY;

```

### 2. Dynamic Routing

The endpoint uses colons (`:`) to define variables in the URL.

```javascript
app.get("/weather-for-date/:date/:location", ...)

```

If you visit `/weather-for-date/2026-01-20/Seattle`, Express assigns `2026-01-20` to `req.params.date` and `Seattle` to `req.params.location`.

### 3. The Fetch Logic

We use the native `fetch` API (available in Node.js 18+) to communicate with the weather provider. Note the use of **template literals** (backticks) to inject our variables into the URL string.

---

## 🚀 Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/) installed.
* An API Key from [Visual Crossing Weather](https://www.visualcrossing.com/weather-data).

### Installation

1. **Clone the repo:**
```bash
git clone <your-repo-url>
cd weather-proxy-tutorial

```


2. **Install dependencies:**
```bash
npm install express dotenv

```


3. **Setup Environment:**
Create a file named `.env` in the root folder and add your key:
```text
WEATHER_API_KEY=your_actual_key_here

```



### Running the Server

```bash
node server.js

```

The server will start on `http://localhost:3001`.

---

## 🧪 Testing the Cache

To see the cache in action, try these steps in your browser or Postman:

1. **First Request:** Visit `http://localhost:3001/weather-for-date/2026-01-20/London`.
* Check your terminal; it will say **"Cache miss"**.


2. **Second Request:** Refresh the page.
* Check your terminal; it will now say **"Cache hit"**. The response will be much faster!



---

### 🌟 Suggested Exercises

* **Persistence:** Currently, the cache clears every time you restart the server. How could you save this to a file instead?
* **Error Handling:** What happens if the location doesn't exist? Try adding a `try/catch` block to handle API errors gracefully.
* **Expiration:** Real weather changes! Can you add a timestamp to the cache so it "expires" after 1 hour?
