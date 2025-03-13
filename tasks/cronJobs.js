// tasks/cronJobs.js
const cron = require('node-cron')
const User = require('../models/User')
const { getTokenRemainingTime } = require('../helpers/get-token-remaining-time') // Asegúrate de importar el helper

// Tarea programada que corre cada 10 minutos
cron.schedule('*/10 * * * *', async () => {
	try {
		const users = await User.find({ authorized: true })

		for (const user of users) {
			const remainingTime = getTokenRemainingTime(user.token) // Usamos el helper para obtener el tiempo restante

			if (remainingTime === 'El token ha expirado' || remainingTime === 'Token inválido o sin fecha de expiración') {
				// Si el token ha expirado o es inválido, desautorizamos al usuario
				user.authorized = false
				await user.save() // Guarda los cambios
				console.log(`Usuario ${user.email} ha sido desautorizado`)
			}
		}
	} catch (error) {
		console.error('Error en el cron job:', error)
	}
})
