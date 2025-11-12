import express from 'express';
import { registerUser,loginUser,logoutUser, getLoggedInUserDetails, sendPasswordResetOtp, resetPassword } from '../controllers/authController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const authRouter = express.Router();

authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);
authRouter.post('/logout', logoutUser);
authRouter.get('/profile',authMiddleware,getLoggedInUserDetails);
authRouter.post('/send-reset-otp', sendPasswordResetOtp)
authRouter.post('/reset-password',resetPassword)

export default authRouter;

