import express from 'express';
import { getAllUsers, getNewUser, getSpecialUser } from '../controllers/user.js';

const router = express.Router();

router.get('/users/all', getAllUsers);
router.post('/users/new',getNewUser);

router.get("/userid/:userid", getSpecialUser);

export default router;