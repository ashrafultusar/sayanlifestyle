URL: https://www.sayanslifestyle.com


## Features

- **User Authentication:** Secure login and signup using **NextAuth.js** with email or OAuth providers.  
- **Product Management:** Admin can add, update, and delete products with image upload using **Cloudinary**.  
- **Interactive UI:** Smooth animations with **Framer Motion**, responsive sliders using **Swiper**, and zoomable product images.  
- **Cart & Checkout:** Users can add products to cart and proceed to checkout seamlessly.  
- **Notifications:** Real-time notifications with **React Toastify**.  
- **Backend Integration:** Built-in **Express.js** API routes with **MongoDB** database for storing products, users, and orders.  
- **Secure Password Handling:** Passwords are encrypted with **bcrypt** for security.  
- **File Uploads:** Support for image uploads using **Multer** and **Formidable**.

---

## Tech Stack

- **Frontend:** Next.js, React.js, Tailwind CSS, Swiper, Framer Motion  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB, Mongoose  
- **Authentication:** NextAuth.js  
- **File Storage:** Cloudinary  
- **Utilities:** Axios, React Toastify, React Icons

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/sayanlifestyle.git
cd sayanlifestyle
Install dependencies:

bash
Copy code
npm install
Setup environment variables:

Create a .env.local file in the root and add:

env
Copy code
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
Usage
Start the development server:

bash
Copy code
npm run dev
Open http://localhost:3000 to view the website.

Build for production:

bash
Copy code
npm run build
npm run start
Folder Structure
graphql
Copy code
sayanlifestyle/
│
├─ pages/             # Next.js pages (Home, Product, Checkout, etc.)
├─ components/        # Reusable React components
├─ context/           # React Context for global state management
├─ lib/               # Utility functions and API helpers
├─ models/            # Mongoose models
├─ public/            # Static assets (images, favicon, etc.)
├─ styles/            # Tailwind CSS and global styles
├─ api/               # Next.js API routes
└─ middleware/        # Custom Express/Next.js middleware
Scripts
npm run dev – Start the development server with Turbopack

npm run build – Build the production version

npm run start – Start the production server

npm run lint – Run ESLint to check for code issues

Contributing
Fork the repository

Create your feature branch: git checkout -b feature/FeatureName

Commit your changes: git commit -m "Add some feature"

Push to the branch: git push origin feature/FeatureName

Create a Pull Request

License
This project is private and for personal use.

Made with ❤️ by Ashraful Islam Tusar