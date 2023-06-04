import express from 'express';
import { userLogin,userRegister, getAllUsers, getMyProfile, userLogout } from '../controllers/user.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();


router.get("/all", getAllUsers);
router.post("/login", userLogin);
router.post("/register", userRegister);
router.get("/userid/:id", isAuthenticated,getMyProfile);
router.get("/logout", userLogout);

export default router;