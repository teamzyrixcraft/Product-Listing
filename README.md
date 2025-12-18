# Product Listing & Filtering UI

A modern and responsive **Product Listing web application** built using **React.js** and **Tailwind CSS**.  
The app consumes data from a public API and provides search, filtering, sorting, and detailed product views, following clean and scalable frontend architecture.

---

## Features

- Product listing using **DummyJSON API**
- Search with auto-suggestions
- Category-based filtering
- Price range filtering (INR)
- Sort by price (Low → High, High → Low)
- Product details page with image gallery
- Similar products recommendation
- Fully responsive design
- Clean, modular, and maintainable codebase

---

## Tech Stack

- **React.js** (Vite)
- **Tailwind CSS**
- **React Router DOM**
- **Custom Hooks**
- **REST API (DummyJSON)**

---

## Folder Structure
- **components/** → Reusable UI components  
- **hooks/** → Custom hooks for data fetching and logic  
- **pages/** → Route-level components  
- **services/** → Centralized API layer  
- **App.jsx** → Routing and global state orchestration

---

## Setup Instructions

### Clone the repository

```bash
git clone https://github.com/your-username/product-listing-ui.git
cd product-listing-ui
```
### Install Dependencies
- npm install

### Start the development server
- npm run dev

## API Used

This project uses the **DummyJSON Products API** to fetch product-related data.

- Fetch all products  
  https://dummyjson.com/products

- Fetch a product by ID  
  https://dummyjson.com/products/{id}

