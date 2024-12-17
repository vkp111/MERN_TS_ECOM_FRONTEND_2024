# E-commerce Web Development with MERN Stack and TypeScript

This project is a fully-featured e-commerce web application developed using the **MERN stack (MongoDB, Express, React, Node.js)** and **TypeScript**. It provides a scalable and efficient platform for managing products, orders, and user authentication.

## Features

### User Features
- User authentication and authorization (JWT-based).
- Browse products by categories and search functionality.
- Add products to cart and place orders.
- View order history and order status.

### Admin Features
- Dashboard with visual analytics using charts (Pie and Doughnut charts).
- Manage products: Create, update, and delete products.
- Manage categories and stock availability.
- Order fulfillment management.
- Revenue distribution insights.

## Tech Stack
- **Frontend:** React with TypeScript
  - React Router for navigation
  - Redux Toolkit for state management
  - React Hot Toast for notifications
- **Backend:** Node.js with TypeScript
  - Express.js for server-side routing
  - JWT for secure authentication
  - MongoDB as the database
  - Mongoose for object modeling
- **Charts:** Chart.js for data visualization

## Installation and Setup

### Prerequisites
- Node.js installed (v16+ recommended)
- MongoDB installed locally or a connection URI to a cloud instance

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```
2. Install dependencies for both backend and frontend:
   ```bash
   # For the backend
   cd backend
   npm install

   # For the frontend
   cd ../frontend
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file in the `backend` directory with the following variables:
     ```env
     PORT=5000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_secret_key
     ```
   - Create a `.env` file in the `frontend` directory with the following variables:
     ```env
     REACT_APP_API_URL=http://localhost:5000/api
     ```
4. Start the development servers:
   ```bash
   # Backend
   cd backend
   npm run dev

   # Frontend
   cd ../frontend
   npm start
   ```

### Accessing the Application
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000`

## Folder Structure

### Backend
```
backend/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── utils/
│   └── app.ts
├── package.json
└── tsconfig.json
```

### Frontend
```
frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── redux/
│   ├── types/
│   ├── App.tsx
│   ├── index.tsx
│   └── styles/
├── package.json
└── tsconfig.json
```

## Key Components

### Admin Dashboard
The admin dashboard includes:
- **Charts:** Visual representation of key metrics such as order fulfillment, revenue distribution, and stock availability.
- **CRUD Operations:** Manage products, categories, and users efficiently.

### User Functionality
- Intuitive and responsive user interface for browsing and purchasing products.
- Personalized user profiles with order tracking.

## Future Improvements
- Implement payment gateway integration (e.g., Stripe or PayPal).
- Add unit and integration testing with Jest and React Testing Library.
- Enhance the admin dashboard with more detailed analytics.
- Add support for product reviews and ratings.

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a Pull Request.

## License
This project is licensed under the [MIT License](LICENSE).

## Contact
For any inquiries, feel free to contact me:
- **Email:** your-email@example.com
- **GitHub:** [your-username](https://github.com/your-username)

---

Thank you for checking out this project! Your feedback and suggestions are appreciated.

<!-- ================================================================================================== -->



# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
