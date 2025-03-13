const {response} = require('express');
const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');
const { validateJwt } = require('../helpers/validate-jwt');
const { getTokenRemainingTime } = require('../helpers/get-token-remaining-time');


const createUser = async (req, res = response) => {
	
	const { name, email, role, premium } = req.body;
	
	try {
		
		const userExists = await User.findOne({email})
		
		if (userExists) {
			return res.status(400).json({
				ok: false,
				message: 'El usuario ya existe'
			})
		}
		
		
		let user = new User({ 
			...req.body, // name, email, phone, password, role, premium
			createdAt: new Date(), 
			authorized: true, 
		});
		
		const token = await generateJWT(user.id, name, email, role);
		user.token = token;
		
		await user.save();
		
		return res.status(200).json({
			ok: true,
			message: 'Usuario creado correctamente',
			id: user._id,
			name,
			email,
			role: user.role, 
			premium,
			token,
			tokenExp: getTokenRemainingTime(user.token)
		})
		
	} catch (error) {
		
		console.log(error)
		return res.status(500).json({
			ok: false,
			message: 'Error al crear el usuario',
			error: error.message
		})
		
	}
}


const loginUser = async (req, res = response) => {
	
	const {email, password} = req.body;
	
	try {
		
		const user = await User.findOne({email})
		
		if (!user) {
			return res.status(400).json({
				ok: false,
				message: 'El usuario no existe'
			})
		}
		
		
		if (user.password !== password) {
			return res.status(400).json({
				ok: false,
				message: 'Credenciales incorrectos'
			})
		}
		
		const isTokenValid = validateJwt(user.token);
		
		if (!isTokenValid) {
			return res.status(400).json({
				ok: false,
				message: 'Membresia caducada, Hable con el administrador'
			})
		}
		
		let currentToken = user.token; 
		
		if (user.role === 'admin') {
			const userId = user._id;
			currentToken = await generateJWT(userId, user.name, user.email, user.role);
			await User.findByIdAndUpdate(userId, {token: currentToken, authorized: true});
		}
		
		return res.status(200).json({
			ok: true,
			message: 'Usuario logueado correctamente',
			id: user._id,
			name: user.name,
			email,
			role: user.role,
			premium: user.premium,
			token: currentToken,
			tokenExp: getTokenRemainingTime(currentToken)
		})
		
	} catch (error) {
		
		console.log(error)
		return res.status(500).json({
			ok: false,
			message: 'Error al loguear el usuario',
		})
		
	}
}

const getTokenData = async (req, res = response) => {
	
	const {token} = req.params;
	
	try {
		
		const payload = validateJwt(token);
		
		if (!payload) {
			return res.status(400).json({
				ok: false,
				message: 'El usuario no existe'
			})
		}
		
		return res.status(200).json({
			ok: true,
			message: 'Token valido',
			id: payload.uid,
			name: payload.name,
			email: payload.email,
			role: payload.role,
			token,
			tokenExp: getTokenRemainingTime(token)
		})
		
	} catch (error) {
		
		console.log(error)
		return res.status(500).json({
			ok: false,
			message: 'Error al validar el token',
		})
		
	}
}


const renewUserAuthToken = async (req, res = response) => {
	const {userId} = req.params;
	
	try {
		
		const user = await User.findById(userId);
		
		if (!user) {
			return res.status(400).json({
				ok: false,
				message: 'El usuario no existe'
			})
		}
		
		const token = await generateJWT(userId, user.name, user.email, user.role);
		
		await User.findByIdAndUpdate(userId, {token, authorized: true});
		
		return res.status(200).json({
			ok: true,
			message: 'Token renovado correctamente',
			id: user._id,
			name: user.name,
			email: user.email,
			role: user.role,
			premium: user.premium,
			token,
			tokenExp: getTokenRemainingTime(token)
		})
		
	} catch (error) {
		console.log(error)
		return res.status(500).json({
			ok: false,
			message: 'Error al renovar el token',
		})
	}
}


module.exports = {
	createUser,
	loginUser,
	getTokenData,
	renewUserAuthToken,
}