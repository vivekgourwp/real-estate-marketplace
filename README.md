# Real Estate Marketplace

A full-stack real estate listing platform where users can sign up, list properties for sale/rent, and browse listings by category. Built as an end-to-end learning project covering authentication, relational database design, RESTful APIs, and a React frontend.

## Features

- **User Authentication** — Signup/Login with JWT-based authentication and bcrypt password hashing
- **Property Listings** — Create, view, update, and delete property listings
- **Owner-only Permissions** — Only the property owner can edit or delete their own listings
- **Image Upload** — Upload a property image (stored via Multer)
- **Property Categories** — Residential, Commercial, Plot/Land, Farmhouse, Rental, Luxury
- **Protected Routes** — Certain pages (like Add Property) are only accessible to logged-in users
- **Responsive Property Grid** — Clean card-based layout with hover animations

## Tech Stack

**Backend**
- Node.js + Express
- PostgreSQL
- Prisma ORM (v7)
- JWT (jsonwebtoken) for authentication
- bcryptjs for password hashing
- Multer for image uploads

**Frontend**
- React (Vite)
- React Router DOM
- Axios

## Project Structure

```
real-estate-marketplace/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   ├── src/
│   │   ├── config/         # Prisma client, Multer config
│   │   ├── controllers/    # Route logic (auth, property)
│   │   ├── middleware/     # JWT verification
│   │   └── routes/         # API route definitions
│   ├── uploads/            # Uploaded property images (gitignored)
│   └── index.js
└── frontend/
    └── src/
        ├── components/     # Navbar, Loader, ProtectedRoute
        ├── pages/          # Home, Login, Signup, Add/Edit Property, Property Detail
        └── services/       # API call logic (auth, property)
```

## Setup Instructions

### Prerequisites
- Node.js installed
- PostgreSQL installed and running

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:

```
JWT_SECRET=your_secret_key_here
```

Create a `prisma.config.ts` file (already included) and set your database URL there, or configure it as per your Prisma 7 setup. Then run:

```bash
npx prisma generate
npx prisma migrate dev
npm run dev
```

Backend runs on `http://localhost:5000`.

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`.

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register a new user |
| POST | `/api/auth/login` | Login and receive a JWT token |

### Properties
| Method | Endpoint | Auth Required | Description |
|--------|----------|----------------|-------------|
| GET | `/api/properties` | No | Get all properties |
| GET | `/api/properties/:id` | No | Get a single property |
| POST | `/api/properties` | Yes | Create a new property (with image) |
| PUT | `/api/properties/:id` | Yes (owner only) | Update a property |
| DELETE | `/api/properties/:id` | Yes (owner only) | Delete a property |

## Future Improvements

- Search by title/location
- Filter by category and price range
- WhatsApp inquiry button
- Property location map integration
- Multiple images per property (gallery)
- Migrate image storage to a cloud service (e.g., Cloudinary) for production deployment

## Author

Vivek Gour
