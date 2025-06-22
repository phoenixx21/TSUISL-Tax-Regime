Here's the updated and complete **README.md**, now including instructions to run the backend using both `node server.js` and the frontend using `http-server` for serving static files:

---

# 💰 Tax Regime Web Application

A web-based application for managing user accounts and collecting user-specific tax regime data. This application includes user authentication (sign-up/login), data input, and a secure password management system, with a responsive UI styled using CSS and data handling through a Node.js + MySQL backend.

---

## 📁 Project Structure

```
.
├── index.html         # Main frontend HTML page
├── styles.css         # CSS styling
├── script.js          # Frontend JavaScript logic
├── server.js          # Node.js backend API
├── .env               # Environment variables for MySQL (not uploaded)
```

---

## 🚀 Features

### 🔐 Authentication

* **Sign Up**: Register with user ID, name, email, contact number, and password.
* **Login**: Authenticate with user ID and password.
* **Change Password**: Securely change your existing password.
* **Keep Me Logged In**: Optionally store login info in local storage.

### 📦 User Data Management

* Save and retrieve custom tax regime data:

  * `pno`, `name`, and `level` associated with a `userId`.

### 🧑‍💻 UI/UX

* Fully responsive layout using `styles.css`
* Multi-section forms: login, signup, and forgot password
* Smooth navigation between sections without reloading

---

## 🛠️ Technologies Used

### Frontend

* `HTML5`, `CSS3`
* `Vanilla JavaScript`

### Backend

* `Node.js`, `Express.js`
* `MySQL2`
* `dotenv` for environment config
* `CORS`, `body-parser`

---

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/tax-regime-app.git
cd tax-regime-app
```

---

### 2. Backend Setup

#### 📄 Install dependencies

```bash
npm install express mysql2 dotenv body-parser cors
```

#### 🔐 Configure `.env`

Create a `.env` file in the root directory:

```env
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=your_database_name
```

#### 🧱 Create MySQL Tables

```sql
CREATE TABLE users (
  userId VARCHAR(50) PRIMARY KEY,
  userName VARCHAR(100),
  email VARCHAR(100),
  contactNo VARCHAR(15),
  password VARCHAR(100)
);

CREATE TABLE tax_regime (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId VARCHAR(50),
  pno VARCHAR(50),
  name VARCHAR(100),
  level VARCHAR(50),
  FOREIGN KEY (userId) REFERENCES users(userId)
);
```

#### ▶️ Run the Node Server

Start the backend server using:

```bash
node server.js
```

Server will be available at: `http://localhost:3000`

---

### 3. Frontend Setup

#### 📦 Install `http-server` (if not installed)

```bash
npm install -g http-server
```

#### ▶️ Serve Static Files

Run this command in the project root directory:

```bash
http-server -p 8080
```

Your frontend will be available at: `http://localhost:8080`

> Make sure the backend (`node server.js`) is running before using the frontend.

---

## 🔄 API Endpoints

### ✅ Authentication

* `POST /signup`: Register a new user
* `POST /login`: Login with credentials
* `POST /change-password`: Change existing password

### 📤 User Data

* `POST /save-user-data`: Save tax data for a user
* `POST /get-user-data`: Retrieve saved tax data

