import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authenticateToken, authorizeRole } from '../middlewares/auth.middleware';
import { Role } from '../enum/role.enum';

const router = Router();
const userController = new UserController();

router.get('/users', authenticateToken, authorizeRole(Role.ADMIN), userController.getAllUsers.bind(userController));
router.get('/users/:id', authenticateToken, userController.getUserById.bind(userController));
router.patch('/users/:id', authenticateToken, authorizeRole(Role.ADMIN), userController.updateUser.bind(userController));
router.delete('/users/:id', authenticateToken, authorizeRole(Role.ADMIN), userController.deleteUser.bind(userController));


export default router;
