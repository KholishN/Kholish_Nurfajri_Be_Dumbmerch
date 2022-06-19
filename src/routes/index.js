const express = require("express");

const router = express.Router();

// 
const {addUsers, getUsers, getUser, updatetUser, deletetUser, getProfile} = require("../controllers/user")
const {addProduct, getProducts, getUserProduct, getProductDetail, updateProduct, deleteProduct} = require("../controllers/product")
const {addCategory, getCategories, getCategory, updateCategory, deleteCategory, addCategoryProduct} = require("../controllers/category")
const {register, login} = require("../controllers/auth")
const {getAllTransaction, buyProduct} = require("../controllers/transaction")
const  {addReview, getReview} = require("../controllers/review")

// middleware
const {auth} = require("../middleware/auth")
const {uploadFile} = require("../middleware/uploadFile")



// user
router.post("/user", addUsers)
router.get("/users",auth, getUsers)
router.get("/user/:id",auth, getUser)
router.patch("/user/:id",auth, updatetUser)
router.delete("/user/:id",auth, deletetUser)
// profile
router.get("/profile",auth, getProfile)

// product
router.post("/product",auth, uploadFile('image'), addProduct)
router.get("/products", getProducts)
router.get("/product/:id",auth, getProductDetail)
router.get("/user-product", getUserProduct)
router.patch("/update-product/:id",auth, updateProduct)
router.delete("/delete-product/:id", deleteProduct)

// Category
router.post("/category", addCategory)
router.post("/category-product", addCategoryProduct)
router.get("/categories", getCategories)
router.get("/category/:id", getCategory)
router.patch("/update-category/:id", updateCategory)
router.delete("/delete-category/:id", deleteCategory)

// transaction
router.get("/transaction",auth, getAllTransaction)
router.post("/buying",auth, buyProduct)

// review
router.post("/review",auth, addReview)
router.get("/review",auth, getReview)


//register & login
router.post("/register", register)
router.post("/login", login)



module.exports = router