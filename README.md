Please follow the below instructions to run this branch in your machine:

1. Login to the GitHub account on which you have been granted access to this repository.

2. Clone this repository -
   ```sh
   git clone https://github.com/MdShimulMahmud/software-engineering-lab.git
   ```
3. Go to the cloned project directory
   ```sh
   cd software-engineering-lab
   ```
4. Go to frontend
   ```sh
   cd frontend
   ```
5. Install dependencies
   ```sh
   npm i
   ```
6. Start the frontend

   ```sh
   npm start

   ```

7. Go to backend
   ```sh
   cd backend
   ```
8. Install dependencies
   ```sh
   npm i
   ```
9. Start the frontend
   ```sh
   npm start
   ```
10. Your frontend should be available in http://localhost:3000

11. Your backend should be available in http://localhost:5000

# Set up .env for Frontend

```sh
    REACT_APP_CLOUDINARY_CLOUD_NAME=
    REACT_APP_MAP_KEY=

```

# Set up .env for backend

```sh
    DATABASE_URL="postgresql://postgres:password@localhost:5432/testDB?schema=public"
    JWT_SECRET_KEY=
    PORT=
    CLOUDINARY_CLOUD_NAME=
    CLOUDINARY_API_KEY=
    CLOUDINARY_API_SECRET=
```

# Swagger Documentation

```sh
    http://localhost:5000/api-docs
```
