const express= require('express')

const categoryController = require('./controllers/categoryController')

const router = express.Router()
const homeController = require('./controllers/homeController')
const productController = require('./controllers/poductController')
const adminController = require('./controllers/adminController')
const userController = require('./controllers/userController')
const addressController = require('./controllers/addressController')


router.route('/')
    .get(homeController.get)

//gestion des categories
router.route('/category-list')
    .get(categoryController.get)

router.route('/category-create')
    .post(categoryController.post)


router.route('/category-delete/:id')
    .post(categoryController.delete)

router.route('/form-category-update')
    .get(categoryController.getUpdate)
router.route('/form-category-update/:id')
    .post(categoryController.update)
//gestion des produits
router.route('/product-create')
    .get(productController.getForm)
    .post(productController.post)
router.route('/product-list')
    .get(productController.getList)

//gestion back office
router.route('/back-office')
    .get(adminController.get)

router.route('/sign-up')
    .get(userController.get)
    .post(userController.post)

router.route('/sign-in')
    .get(userController.getSignIn)
    .post(userController.postSignIn)

router.route('/address-create/:id')
    .post(addressController.postAddress)

router.route('/user-list')
    .get(userController.userList)

router.route('/user-update/:id')
    .get(userController.update)
    .post(userController.postUpdate)



module.exports = router