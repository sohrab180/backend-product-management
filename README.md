# Product Management API

This API provides a backend service to manage products in an inventory system. It includes functionalities to create, update, retrieve, and delete products, as well as manage product availability. Below is an overview of the API and its usage.

## Prerequisites

Ensure the following are installed:
- Node.js
- MongoDB
- npm (Node Package Manager)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd <project-directory>
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create an `uploads` folder in the root directory for storing product images:
   ```bash
   mkdir uploads
   ```

5. Set up your `.env` file to include:
   ```env
   PORT=5000
   MONGO_URI=<your-mongodb-connection-string>
   ```

## Running the Server

1. Start the server:
   ```bash
   npm start
   ```

2. The API will be available at `http://localhost:5000`.

## API Endpoints

### 1. Add a New Product
**POST** `/products`

- **Description**: Adds a new product to the database.
- **Request Body** (form-data):
  - `name` (string, required): Name of the product.
  - `description` (string, optional): Description of the product.
  - `price` (number, required): Price of the product (must be positive).
  - `category` (string, required): Category of the product.
  - `productId` (string, required): Unique ID of the product.
  - `image` (file, optional): Product image file.
- **Response**:
  - 201: Product created successfully.
  - 400: Missing required fields or invalid price.
  - 500: Internal server error.

### 2. Retrieve All Products
**GET** `/products`

- **Description**: Fetches all products from the database.
- **Response**:
  - 200: List of products.
  - 500: Internal server error.

### 3. Retrieve Product by ID
**GET** `/product/:id`

- **Description**: Fetches a specific product by its ID.
- **Response**:
  - 200: Product details.
  - 404: Product not found.
  - 500: Internal server error.

### 4. Update Product by ID
**PUT** `/products/:id`

- **Description**: Updates product details by ID.
- **Request Body** (form-data):
  - Fields to update (optional):
    - `name` (string)
    - `description` (string)
    - `price` (number, must be positive)
    - `category` (string)
    - `productId` (string)
    - `image` (file, optional)
- **Response**:
  - 200: Product updated successfully.
  - 400: Invalid price.
  - 404: Product not found.
  - 500: Internal server error.

### 5. Update Product Availability to Unavailable
**PUT** `/update-delete/:id`

- **Description**: Marks a product as unavailable by updating the `availability` field to `UnAvailable`.
- **Response**:
  - 200: Product availability updated.
  - 404: Product not found.
  - 500: Internal server error.

## Folder Structure
```
project-directory/
├── models/
│   └── projectManagement.js  # MongoDB schema for products
├── routes/
│   └── productRoutes.js      # API route handlers
├── uploads/                  # Folder to store uploaded images
├── app.js                    # Main application file
├── package.json              # Project metadata and dependencies
└── README.md                 # Documentation
```

## MongoDB Schema
The `Product` schema in `models/projectManagement.js` includes:

- `name` (String, required): Name of the product.
- `description` (String, optional): Description of the product.
- `price` (Number, required): Price of the product.
- `category` (String, required): Product category.
- `productId` (String, required): Unique identifier.
- `image` (String, optional): URL of the product image.
- `availability` (String, default: 'Available'): Availability status.

## Notes
- Ensure the MongoDB connection string is correctly set in `.env`.
- Use `multer` for handling file uploads.
- Uploaded images are stored in the `uploads/` folder and are accessible via `http://localhost:5000/uploads/<filename>`.

## License
This project is licensed under the MIT License. Feel free to use and modify it as needed.

## Author
[Sohraab Ali Ansaari]

---
Thank you for using this API!

