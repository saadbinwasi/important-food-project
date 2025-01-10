# MERN Food Ordering App

## Description

This is a full-stack **Food Ordering App** built using the **MERN stack** (MongoDB, Express, React, Node.js). The app allows users to browse meals, add them to the cart, and place orders. The backend is built with **Node.js** and **Express.js**, and meal/order data is stored in JSON files. The frontend uses **React** with **Context API** and **React Reducer** for state management.

---

## Key Features

- **Meal Display**: Browse available meals with real-time data fetched from the backend.
- **Dynamic Shopping Cart**: Add, remove, and clear items from the shopping cart.
- **Order Validation**: Ensures that all required fields (name, email, address, etc.) are filled before submitting the order.
- **Order Management**: Place orders, which are stored on the backend (simulated with a file-based database).
- **Backend API**: Handles meal data and order submission using **Express.js**.

---

## Technologies Used

- **Frontend**: 
  - React.js
  - React Context API
  - React Reducers
  
- **Backend**: 
  - Node.js
  - Express.js
  - File-based storage using Node's `fs` module
  
- **Others**:
  - CORS (Cross-Origin Resource Sharing) for API access from the frontend
  - Body-parser for handling JSON data

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/mern-food-ordering-app.git
cd mern-food-ordering-app
