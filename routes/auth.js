const {Router} = require('express');
const { check } = require('express-validator');
const {fieldValidators} = require('../middlewares/field-validators');

const {createUser, loginUser, renewUserAuthToken, getTokenData} = require('../controllers/auth');

const router = Router();

router.post(
	'/register',
	[
		check('name', 'El nombre es obligatorio').not().isEmpty(),
		check('email', 'El email es obligatorio').isEmail(),
		check('phone', 'El teléfono es obligatorio').not().isEmpty(),
		check('password', 'La contraseña es obligatoria').isLength({ min: 6 }),
		fieldValidators
	], 	
	createUser
);


router.post(
	'/login',
	[
		check('email', 'El email es obligatorio').isEmail(),
		check('password', 'La contraseña es obligatoria').isLength({ min: 6 }),
		fieldValidators
	], 
	loginUser
);


router.get('/token/:token', getTokenData);


router.post('/renew/:userId', renewUserAuthToken);



module.exports = router;