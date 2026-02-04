# 🛍️ E-Commerce Backend

A **production-ready** e-commerce REST API built with Node.js, Express, and MongoDB. This project demonstrates enterprise-level architecture patterns, best practices, and design decisions for a scalable backend system.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Technical Stack](#technical-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Request Flow](#request-flow)
- [API Endpoints](#api-endpoints)
- [Dashboard APIs Testing](#dashboard-apis-testing)
- [Authentication & Authorization](#authentication--authorization)
- [Design Decisions](#design-decisions)
- [Key Features](#key-features)
- [Database Schema](#database-schema)
- [Error Handling](#error-handling)
- [Environment Variables](#environment-variables)
- [Error Handling Documentation](#error-handling-documentation)

---

## 📊 Overview

This e-commerce backend provides:

- **User Management**: Registration, authentication, profile management
- **Product Catalog**: Products organized by categories with search & filtering
- **Shopping Cart**: Add/remove products with quantity management
- **Orders**: Complete order lifecycle management
- **Admin Dashboard**: User, product, and order administration
- **Role-Based Access Control**: Secure endpoints with user/admin roles
- **Comprehensive Logging**: Track all actions for debugging & monitoring

---

## 🏗️ Architecture

### Architectural Pattern: **Layered Architecture (3-Tier)**

```
┌─────────────────────────────────────────────────┐
│              API Routes Layer                    │
│        (routes/*.js, routes/admin/*.js)          │
└──────────────────┬──────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────┐
│          Controllers Layer                       │
│    (controllers/*.controller.js)                 │
│  - Input validation                             │
│  - Request orchestration                        │
│  - Response formatting                          │
└──────────────────┬──────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────┐
│           Services Layer                        │
│       (services/*.service.js)                   │
│  - Business logic                               │
│  - Data transformation                          │
│  - Cross-entity operations                      │
└──────────────────┬──────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────┐
│            Models Layer (Mongoose)              │
│         (models/*.model.js)                     │
│  - Schema definitions                           │
│  - Data validation                              │
│  - Database queries                             │
└──────────────────┬──────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────┐
│          Database (MongoDB)                     │
└─────────────────────────────────────────────────┘
```

### Why This Architecture?

✅ **Separation of Concerns**: Each layer has a single responsibility  
✅ **Testability**: Easy to mock services and test controllers  
✅ **Maintainability**: Clear structure makes code navigation simple  
✅ **Scalability**: Services can be extracted to microservices if needed  
✅ **Code Reusability**: Services can be shared across different controllers

---

## 💻 Technical Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Runtime** | Node.js | Latest LTS |
| **Framework** | Express.js | 5.2.1 |
| **Database** | MongoDB | 9.1.5 (via Mongoose ODM) |
| **Authentication** | JWT | 9.0.3 |
| **Encryption** | bcryptjs | 3.0.3 |
| **Dev Tools** | Nodemon | 3.1.11 |
| **Env Config** | dotenv | 17.2.3 |

---

## 📁 Project Structure

```
e-commerce-backend/
├── config/                          # Configuration files
│   ├── configapp.js                # App-level configurations
│   └── db.js                       # MongoDB connection setup
│
├── middleware/                      # Express middleware
│   ├── asyncHandler.js             # Async error wrapper
│   ├── verifyToken.js              # JWT authentication
│   ├── restrictTo.js               # Role-based authorization
│   ├── errorHandler.js             # Global error handling
│   ├── checkOrderOwnership.js       # Order ownership verification
│   ├── restrictOrderStatus.js       # Order status validation
│   └── validateOrderStatusTransition.js
│
├── models/                          # Mongoose schemas
│   ├── User.js                     # User schema
│   ├── product.model.js            # Product schema
│   ├── order.model.js              # Order schema
│   ├── category.model.js           # Category schema
│   └── Categories.js               # Category (alternate)
│
├── controllers/                     # Request handlers
│   ├── auth.controller.js          # Authentication logic
│   ├── users.controller.js         # User CRUD operations
│   ├── products.controller.js      # Product CRUD operations
│   ├── orders.controller.js        # Order management
│   ├── categories.controller.js    # Category management
│   └── dashboard.controller.js     # Admin dashboard
│
├── services/                        # Business logic layer
│   ├── auth.service.js             # Authentication service
│   ├── users.service.js            # User service
│   ├── products.service.js         # Product service
│   ├── orders.service.js           # Order service
│   ├── categories.service.js       # Category service
│   └── dashboard.service.js        # Dashboard analytics
│
├── routes/                          # API endpoints
│   ├── auth.routes.js              # Auth endpoints
│   ├── users.routes.js             # User endpoints
│   ├── products.routes.js          # Product endpoints
│   ├── orders.routes.js            # Order endpoints
│   ├── categories.routes.js        # Category endpoints
│   ├── home.routes.js              # Home endpoints
│   ├── notFound.routes.js          # 404 handler
│   └── admin/                      # Admin routes (protected)
│       ├── index.js                # Admin router mount
│       ├── users.route.js          # Admin user management
│       ├── products.route.js       # Admin product management
│       ├── categories.route.js     # Admin category management
│       └── orders.route.js         # Admin order management
│
├── utils/                           # Utility functions & classes
│   ├── AppError.js                 # Custom error class
│   ├── baseController.js           # Base controller class
│   ├── sendResponse.js             # Standardized response formatter
│   ├── logger.js                   # Logging utility
│   ├── apiFeatures.js              # Search, filter, pagination
│   ├── calculateOrderTotal.js      # Order calculation helper
│   ├── CategoryFactory.js          # Category factory pattern
│   ├── generateSlug.js             # URL slug generator
│   ├── pagination.js               # Pagination helper
│   ├── roles.js                    # Role definitions
│   ├── DSA/                        # Data structure algorithms (learning)
│   └── services/                   # Additional service utilities
│
├── validators/                      # Input validation
│   ├── auth.validator.js           # Auth input validation
│   ├── products.validator.js       # Product input validation
│   ├── category.validator.js       # Category input validation
│   └── validateId.js               # MongoDB ID validation
│
├── server.js                        # Application entry point
├── package.json                     # Dependencies & scripts
└── README.md                        # Documentation (this file)
```

---

## 🚀 Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Step 1: Clone & Install Dependencies

```bash
git clone <repository-url>
cd e-commerce-backend
npm install
```

### Step 2: Configure Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/e-commerce-backend

# Authentication
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d

# Logger
LOG_LEVEL=info
```

### Step 3: Start the Server

```bash
npm start
```

The API will be available at `http://localhost:3000`

---

## 📡 Request Flow

### Complete Request Lifecycle

```
HTTP Request
    │
    ▼
┌─────────────────────────────────────┐
│   Express Middleware Chain          │
├─────────────────────────────────────┤
│ 1. express.json()                   │
│ 2. express.urlencoded()             │
│ 3. Development logger               │
└─────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────┐
│   Route Matching                    │
│   (routes/[feature].routes.js)      │
└─────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────┐
│   Authentication Middleware         │
│   (if route protected)              │
│   - verifyToken() middleware        │
│   - Validates JWT token            │
│   - Fetches user from DB           │
└─────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────┐
│   Authorization Middleware          │
│   (if role-based)                   │
│   - restrictTo('admin', 'user')     │
│   - Checks user role                │
└─────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────┐
│   Additional Validators             │
│   - validateId() - MongoDB ID check │
│   - checkOrderOwnership()           │
│   - restrictOrderStatus()           │
└─────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────┐
│   Controller Handler                │
│   (controllers/*.controller.js)     │
│   - Receives request                │
│   - Validates input                 │
│   - Calls service layer             │
└─────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────┐
│   Service Layer                     │
│   (services/*.service.js)           │
│   - Business logic execution        │
│   - Mongoose model queries          │
│   - Data transformation             │
│   - Cross-entity operations         │
└─────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────┐
│   MongoDB Database                  │
│   - Query execution                 │
│   - Schema validation               │
│   - Data persistence                │
└─────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────┐
│   Response Formatting               │
│   sendResponse() utility            │
│   - Standardize response            │
│   - Set status code                 │
│   - Include metadata                │
└─────────────────────────────────────┘
    │
    ▼
HTTP Response (JSON)
```

### Example: User Login Flow

```
POST /api/auth/login
    │
    ▼
authRoutes.js (route matching)
    │
    ▼
asyncHandler wrapper (error handling)
    │
    ▼
authController.login()
    ├─ Validates input
    │
    ▼
authService.login()
    ├─ Find user by email
    ├─ Compare password with bcrypt
    ├─ Generate JWT token
    │
    ▼
Response: { user, token }
```

---

## 🔌 API Endpoints

### Authentication Endpoints

```
POST   /api/auth/register         Register new user
POST   /api/auth/login            Login user
```

### User Endpoints

```
GET    /api/users/profile         Get logged-in user profile
PUT    /api/users/profile         Update user profile
GET    /api/users/cart            Get user's shopping cart
POST   /api/users/cart            Add item to cart
DELETE /api/users/cart/:id        Remove from cart
POST   /api/users/wishlist        Add to wishlist
```

### Product Endpoints

```
GET    /api/products              Get all products
GET    /api/products/:id          Get product by ID
POST   /api/products/search       Search products (filters, pagination)
```

### Category Endpoints

```
GET    /api/categories            Get all categories
GET    /api/categories/:id        Get category by ID
```

### Order Endpoints

```
POST   /api/orders                Create new order
GET    /api/orders                Get user's orders
GET    /api/orders/:id            Get order details
PUT    /api/orders/:id            Update order status
```

### Admin Endpoints

```
GET    /api/admin/user            Manage users
GET    /api/admin/product         Manage products
GET    /api/admin/category        Manage categories

DELETE /api/admin/user/:id        Delete user
PUT    /api/admin/product/:id     Update product
POST   /api/admin/category        Create category
```

---

## 🔐 Authentication & Authorization

### JWT-Based Authentication

The system uses **JSON Web Tokens (JWT)** for stateless authentication.

#### Token Structure

```
Header: { alg: "HS256", typ: "JWT" }
Payload: { id: "userId", role: "user", iat: 1234567890, exp: 1234654290 }
Signature: HMACSHA256(header + payload, JWT_SECRET)
```

#### Flow

1. User sends credentials to `/api/auth/login`
2. Password validated using bcrypt
3. JWT token generated with user ID and role
4. Token sent to client (stored in localStorage/cookie)
5. Client includes token in Authorization header: `Bearer <token>`
6. `verifyToken` middleware validates token on protected routes

#### Protection Example

```javascript
// Protected route example
router.get('/profile', 
    verifyToken,              // Authenticate
    restrictTo('user'),       // Authorize
    getProfile                // Handler
);
```

### Role-Based Access Control (RBAC)

- **user**: Normal customer (default)
- **admin**: Can manage products, categories, users, orders

---

## 🎯 Design Decisions

### 1. **Layered Architecture (3-Tier Model)**

**Why?**
- Industry standard for scalable applications
- Clear separation of concerns (business logic ≠ HTTP handling)
- Easier testing (can mock services independently)
- Future-ready for microservices migration

**Alternative Considered:** MVC (Model-View-Controller)
- Rejected because we need explicit service layer for business logic

---

### 2. **Custom Error Handling Class (`AppError`)**

**Why?**
```javascript
// Instead of:
res.status(401).json({ error: message })

// We use:
throw new AppError(message, 401)
```

**Benefits:**
- Consistent error format across API
- Automatic logging with context
- Distinguishes operational vs programming errors
- Standardized error response structure

---

### 3. **Async Handler Wrapper Middleware**

**Why?**
```javascript
// Without asyncHandler - need try-catch in every handler
router.get('/', async (req, res, next) => {
    try {
        const data = await User.find();
        res.json(data);
    } catch (err) {
        next(err); // Manual error passing
    }
});

// With asyncHandler - cleaner
router.get('/', asyncHandler(async (req, res) => {
    const data = await User.find();
    res.json(data);
}));
```

**Benefits:**
- Prevents unhandled promise rejections
- Eliminates boilerplate try-catch blocks
- Forces error handling through middleware

---

### 4. **Service Layer Separation**

**Why?**
- Controllers handle HTTP concerns (request/response)
- Services handle business logic
- Same service can be used by multiple controllers
- Easy to add caching, logging, transactions at service level

**Example:**
```javascript
// Service: Contains business logic
UserService.register = async (userData) => {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    return User.create({ ...userData, password: hashedPassword });
}

// Controller: HTTP-specific
authController.register = async (req, res) => {
    const newUser = await authService.register(req.body);
    sendResponse(res, 201, newUser, "Registered successfully");
}
```

---

### 5. **Base Controller Class**

**Why?**
```javascript
// Avoid repetition in every controller
class BaseController {
    send(res, statusCode, data, message) {
        sendResponse(res, statusCode, data, message);
    }
    logAction(action, details) {
        Logger.info(`${action} - ${details}`);
    }
}

// Extend it
class AuthController extends BaseController {
    // Inherits send() and logAction()
}
```

**Benefits:**
- DRY principle (Don't Repeat Yourself)
- Consistent logging across controllers
- Common utility methods inherited

---

### 6. **MongoDB Index on User ID in Orders**

**Why?**
```javascript
user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,  // ✅ Indexed for fast lookup
}
```

**Benefits:**
- Queries like "get all orders by user" are O(log n) instead of O(n)
- Critical for performance with millions of records

---

### 7. **Order Item Snapshot (name, price)**

**Why?** Store product name and price at order time
```javascript
items: [{
    product: ObjectId,      // Link to product
    name: String,           // Snapshot of name at order time
    price: Number,          // Snapshot of price at order time
    quantity: Number,
    subtotal: Number
}]
```

**Benefits:**
- Historical accuracy (price doesn't change if product updated)
- Can delete product without affecting past order history
- Provides business audit trail

---

### 8. **Soft Delete Pattern (isDeleted flag)**

**Why?** Instead of hard-deleting records:
```javascript
// Instead of: await Product.deleteOne({ _id: id })
// We do:
await Product.updateOne({ _id: id }, { isDeleted: true })
```

**Benefits:**
- Data recovery possibility
- Audit trail (who deleted when)
- No breaking references in other documents

---

### 9. **Pagination via `apiFeatures.js`**

**Why?** Don't load all products at once

```javascript
const products = await Product.find()
    .skip((page - 1) * pageSize)
    .limit(pageSize);
```

**Benefits:**
- Reduce memory usage
- Faster response times
- Better user experience

---

### 10. **Nodemon for Development**

**Why?** Auto-restart on file changes

```json
{
    "scripts": {
        "start": "nodemon server.js"
    }
}
```

**Benefits:**
- Faster development cycle (no manual restart)
- Catch syntax errors immediately

---

## ✨ Key Features

### 🔑 Secure Authentication
- JWT-based stateless authentication
- Password hashing with bcryptjs
- Token expiration management
- Refresh token support

### 🛡️ Role-Based Access Control
- User and Admin roles
- Protected admin endpoints
- Granular permission control

### 🛒 Shopping Features
- Shopping cart management
- Wishlist functionality
- Order creation & tracking
- Order status lifecycle (pending → processing → shipped → delivered)

### 📊 Admin Dashboard
- User management (view, delete)
- Product management (CRUD)
- Category management
- Order tracking & management

### 📝 Data Validation
- Input validation at controller level
- Schema validation at model level
- Custom validators for order status transitions
- MongoDB ID validation

### 🚨 Comprehensive Error Handling
- Custom error class with logging
- Global error handler middleware
- Development vs production error responses
- Detailed error messages in logs

### 📍 Logging System
- Action logging (who did what)
- Error logging with stack traces
- Request logging in development mode

---

## 🗄️ Database Schema

### Users Collection

```json
{
  "_id": ObjectId,
  "name": String,
  "email": String (unique),
  "password": String (hashed),
  "role": String (default: "user"),
  "cart": [
    {
      "productId": ObjectId,
      "quantity": Number
    }
  ],
  "orders": [ObjectId],
  "wishlist": [
    {
      "productId": ObjectId
    }
  ],
  "createdAt": Date,
  "updatedAt": Date
}
```

### Products Collection

```json
{
  "_id": ObjectId,
  "name": String,
  "description": String,
  "image": String,
  "slug": String (unique),
  "categoryId": ObjectId,
  "price": Number,
  "quantity": Number,
  "isDeleted": Boolean (default: false),
  "createdAt": Date,
  "updatedAt": Date
}
```

### Orders Collection

```json
{
  "_id": ObjectId,
  "user": ObjectId (indexed),
  "items": [
    {
      "product": ObjectId,
      "name": String,          // Snapshot
      "price": Number,         // Snapshot
      "quantity": Number,
      "subtotal": Number
    }
  ],
  "shippingAddress": {
    "city": String,
    "street": String,
    "building": String,
    "phone": String
  },
  "totalPrice": Number,
  "status": String (enum),
  "createdAt": Date,
  "updatedAt": Date
}
```

### Categories Collection

```json
{
  "_id": ObjectId,
  "name": String,
  "description": String,
  "createdAt": Date,
  "updatedAt": Date
}
```

---

## ⚠️ Error Handling

### Global Error Handler Flow

```
throw AppError / Error in Service
    │
    ▼
asyncHandler catches error
    │
    ▼
Passes to next(err)
    │
    ▼
globalErrorHandler middleware
    │
    ▼
┌─────────────────────────────────────┐
│ Error Categorization:               │
│                                     │
│ Development:                        │
│ - Full stack trace                  │
│ - Error details                     │
│ - Debugging info                    │
│                                     │
│ Production:                         │
│ - Safe error message               │
│ - No technical details             │
│ - Operational errors only          │
└─────────────────────────────────────┘
    │
    ▼
JSON Response to Client
```

### ✅ تحسينات معالجة الأخطاء

تم تطبيق التحسينات التالية:
- ✅ رسائل **مختصرة وواضحة** للعميل
- ✅ معلومات **كاملة في الـ logs** للمطورين
- ✅ **Stack Trace مخفي** في بيئة الإنتاج
- ✅ **تقطيع الرسائل الطويلة** تلقائياً (200 حرف)

**📚 للمزيد:** اقرأ [توثيق معالجة الأخطاء الشاملة](./ERROR_HANDLING.md)

### Example Error Response

**Development:**
```json
{
  "status": "fail",
  "message": "Email already exists",
  "error": {},
  "stack": "Error: Email already exists\n at AuthService.register..."
}
```

**Production:**
```json
{
  "status": "fail",
  "message": "Email already exists"
}
```

---

## 🔧 Environment Variables

| Variable | Description | Default | Example |
|----------|-------------|---------|---------|
| `PORT` | Server port | 3000 | 3000 |
| `NODE_ENV` | Environment | development | development/production |
| `MONGODB_URI` | Database URL | localhost:27017 | mongodb+srv://user:pass@cluster |
| `JWT_SECRET` | Token signing key | - | your_secret_key_here |
| `JWT_EXPIRE` | Token expiration | 7d | 7d, 24h, 1y |
| `LOG_LEVEL` | Logging verbosity | info | debug, info, warn, error |

---

## 🚦 Future Enhancements

- [ ] Payment integration (Stripe/PayPal)
- [ ] Email notifications (order confirmation, shipping updates)
- [ ] Product reviews & ratings
- [ ] Inventory management & alerts
- [ ] Advanced search with Elasticsearch
- [ ] API documentation with Swagger/OpenAPI
- [ ] Unit & integration tests (Jest, Supertest)
- [ ] Rate limiting & API security (helmet, express-validator)
- [ ] Caching layer (Redis)
- [ ] Message queue (Bull, RabbitMQ)
- [ ] GraphQL API alongside REST
- [ ] Docker containerization

---

## 📚 Learning Resources

This project implements several important concepts:

- **Design Patterns**: Factory, Strategy, Observer
- **SOLID Principles**: Single Responsibility, Dependency Injection
- **Security**: JWT, bcrypt, CORS, rate limiting
- **Database**: MongoDB, Mongoose, Schema design, Indexing
- **Clean Code**: Meaningful naming, DRY, error handling

---

## 📄 License

ISC

---

## 🧪 Dashboard APIs Testing

تم اختبار Dashboard APIs بشكل شامل وتوثيق جميع النتائج والمؤشرات.

### الملخص السريع
- ✅ **الحالة:** Production-Ready
- ⏱️ **الأداء:** 6-16 ms
- 🔒 **الأمان:** Admin فقط
- 🧠 **الكاش:** Memory Cache (مستقر)
- 📊 **الاستقرار:** 100% بعد 20+ تنفيذ

### الـ APIs المختبرة
1. `GET /api/admin/dashboard/overall-summary` - ملخص عام
2. `GET /api/admin/dashboard/users-summary` - ملخص المستخدمين
3. `GET /api/admin/dashboard/orders-summary` - ملخص الطلبات
4. `GET /api/admin/dashboard/products-summary` - ملخص المنتجات
5. `GET /api/admin/dashboard/settings-summary` - ملخص الإعدادات

### التحسينات المطبقة
- 📈 **Caching:** 5 دقائق على overall-summary و users-summary
- 🔒 **Rate Limiting:** 200 طلب/15 دقيقة
- ✅ **Validation:** التحقق الشامل من البيانات

**📚 للمزيد من التفاصيل:** [اقرأ تقرير الاختبار الكامل](./DASHBOARD_TESTING.md)

---

## 👨‍💻 Author

[Your Name]

---

## 🤝 Contributing

Contributions welcome! Follow these steps:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## ❓ Support

For issues or questions, please open an GitHub issue.

---

**Built with ❤️ | Node.js | Express | MongoDB**
