# 🖋️ Mysterious Artifacts

Welcome to **Mysterious Artifacts**, an eCommerce web application designed to showcase and sell a collection of mystical and magical products! This project leverages modern web technologies to deliver a seamless user experience, allowing users to browse, add items to their cart, and proceed to checkout with ease.

---

# ✨ Features

- 🛒 **Cart System**: Add, remove, and update quantities for items in your shopping cart.
- 🔑 **Google OAuth Integration**: Secure user login with Google.
- 📦 **Product Listings**: Beautifully displayed magical products, each with a description, image, and price.
- 🧮 **Dynamic Cart Total**: Automatically calculates subtotal, tax, and delivery fee for your shopping cart.
- 📱 **Responsive Design**: Optimized for all screen sizes—desktop, tablet, and mobile.
- ⚡ **Efficient Backend**: Uses `better-sqlite3` for high-performance database operations.

---

# 🚀 Tech Stack

- **Frontend**: 
  - Pug (HTML template engine)
  - CSS with FontAwesome for icons
- **Backend**: 
  - Node.js
  - Express.js
- **Database**: 
  - SQLite (via `better-sqlite3`)
- **Authentication**:
  - Passport.js with Google OAuth 2.0
- **File Uploads**: 
  - Multer

---

# 🛠️ Installation & Setup

Follow these steps to get the project up and running locally:

### Prerequisites
- **Node.js**: Ensure you have Node.js installed.
- **SQLite**: Pre-installed SQLite for database management.

### Clone the Repository
```bash
git clone https://github.com/RizikH/mysterious-artifacts.git
cd mysterious-artifacts
```
### Install Dependencies
```bash
npm install
```
### Create a ```.env``` File
```bash
clientID=YOUR_GOOGLE_CLIENT_ID
clientSecret=YOUR_GOOGLE_CLIENT_SECRET
```
### Run the Application
```bash
nodemon server.js
```
# 📂 Project Structure
```bash
mysterious-artifacts/
│
├── public/               # Static assets (CSS, JS, media)
├── views/                # Pug templates
│   ├── partials/         # Reusable components (header, footer, etc.)
│   ├── cart.pug          # Cart page
│   ├── products.pug      # Products page
│   ├── index.pug         # Home page
│   └── login.pug         # Login page
│
├── models/               # Database logic
│   ├── shop.model.js     # Product & cart database operations
│   └── users.model.js    # User database operations
│
├── routes/               # Application routes
│   ├── shop.route.js     # Routes for products & cart
│   └── auth.route.js     # Authentication routes
│
├── controllers/          # Application logic
│   ├── shop.controller.js
│   └── auth.controller.js
│
├── package.json          # Project's dependencies
├── server.js             # Server entry point and Main Express app setup
└── README.md             # Project documentation
```
### 🧙‍♂️ How It Works
Authentication: Users log in with Google OAuth to access personalized features like their shopping cart.
Browse Products: Products are displayed dynamically, with descriptions, images, and prices.
Cart Operations:
- Add items to the cart.
- Update quantities.
- Remove items.
- View the subtotal, tax, and total.
Admin Panel:
- Manage product listings (add, update, or delete).
- Bulk upload of products in JSON format.
Database Integration:
- Products, users, and carts are managed with SQLite for fast and lightweight storage.

# 🎨 Screenshots

### 🏠 Home Page
![Home Page](/public/resources/media/project-screenshots/home-page.png)

### 🛍️ Products Page
![Products Page](/public/resources/media/project-screenshots/products-page.png)

### 🛒 Cart Page
![Cart Page](/public/resources/media/project-screenshots/cart-page.png)

### ⚙️ Admin Panel 
- Manage Products
![Admin_Product_Page](/public/resources/media/project-screenshots/admin-product-view.png)
![Admin_Product_Add](/public/resources/media/project-screenshots/admin-product-add.png)

- Bulk Upload
![Admin_upload](/public/resources/media/project-screenshots/admin-upload-view.png)

# 📝 Future Enhancements
- 💳 Payment Integration: Add Stripe or PayPal for real transactions.
- 🔍 Search and Filtering: Enable product search and category-based filtering.
- 📊 Advanced Admin Features: Analytics and reporting for sales and users, and order handling.
- 📦 Order Tracking: Allow users to view and track their orders.

# 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to:
- Fork the project
- Create a new branch
- Submit a pull request

# 📜 License
This project is licensed under the MIT License.

# 👨‍💻 Author
- [Rizik H](https://github.com/RizikH)

Feel free to reach out for collaboration or questions!"
