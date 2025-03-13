const { response } = require('express')
const User = require('../models/User')



const getUserById = async (req, res = response) => {
	const { id } = req.params

	try {

		const user = await User.findById(id)
		
		if (!user) {
			return res.status(404).json({
				ok: false,
				message: 'El usuario no existe'
			})
		}

		return res.status(200).json({
			ok: true,
			user
		})
	} catch (error) {
		console.error(error)
		return res.status(500).json({
			ok: false,
			message: 'Error al obtener el usuario',
			error: error.message
		})
	}

}




const getUsers = async (req, res = response) => {
	try {
		const users = await User.find()

		return res.status(200).json({
			ok: true,
			users
		})
	} catch (error) {
		console.error(error)
		return res.status(500).json({
			ok: false,
			message: 'Error al obtener los usuarios',
			error: error.message
		})
	}
}


const deleteUser = async (req, res = response) => {
	const { id } = req.params

	try {
		const user = await User.findById(id)

		if (!user) {
			return res.status(404).json({
				ok: false,
				message: 'El usuario no existe'
			})
		}

		await User.findByIdAndDelete(id)

		return res.status(200).json({
			ok: true,
			message: 'Usuario eliminado correctamente'
		})
	} catch (error) {
		console.error(error)
		return res.status(500).json({
			ok: false,
			message: 'Error al eliminar el usuario',
			error: error.message
		})
	}
}


const togglePremium = async (req, res = response) => {
	const { id } = req.params

	try {
		const user = await User.findById(id)

		if (!user) {
			return res.status(404).json({
				ok: false,
				message: 'El usuario no existe'
			})
		}

		user.premium = !user.premium
		await user.save()

		return res.status(200).json({
			ok: true,
			message: 'Usuario actualizado correctamente',
			user
		})
	} catch (error) {
		console.error(error)
		return res.status(500).json({
			ok: false,
			message: 'Error al actualizar el usuario',
			error: error.message
		})
	}
}

module.exports = {
	getUsers,
	getUserById,
	deleteUser,
	togglePremium
}