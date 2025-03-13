const {Router} = require('express');
const { getUsers, deleteUser, togglePremium, getUserById } = require('../controllers/users');

const router = Router();

// Get user by id
router.get('/:id', getUserById);

// Get all users
router.get('/', getUsers);

// Delete user
router.delete('/:id', deleteUser);

// Toggle user premium
router.put('/premium/:id', togglePremium);



module.exports = router;