import express from 'express';
import {loginUser,logoutUser, getLoggedInUserDetails, sendPasswordResetOtp, resetPassword, registerAdmin } from '../controllers/authController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import authVendorMiddleware from '../middlewares/authVendorMiddleware.js';
import { getVendorLoggedInDetails, logoutVendor, vendorLogin, vendorRegister } from '../controllers/vendorController.js';
import { getAllAdmins } from '../controllers/adminController.js';

const authRouter = express.Router();

authRouter.post('/register', registerAdmin);
authRouter.post('/login', loginUser);
authRouter.post('/logout', logoutUser);
authRouter.get('/profile',authMiddleware,getLoggedInUserDetails);
authRouter.post('/send-reset-otp', sendPasswordResetOtp)
authRouter.post('/reset-password',resetPassword)

//admin
authRouter.get('/admin/get-all-admins',authMiddleware,getAllAdmins);


//vendor
authRouter.get('/vendor/profile',authVendorMiddleware,getVendorLoggedInDetails);
authRouter.post('/vendor/register', vendorRegister);
authRouter.post('/vendor/login', vendorLogin);
authRouter.post('/vendor/logout', logoutVendor);

export default authRouter;

