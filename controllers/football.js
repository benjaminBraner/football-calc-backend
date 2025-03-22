const { response } = require('express')
const NodeCache = require('node-cache')

// X-Auth-Token = 43e98340908a407cbaee5d154728e512

const  cache = new NodeCache({ stdTTL: 86400 }) // 24 horas 

const getMatchesFromCompetition = async (req, res = response) => {
	const { leagueId } = req.params

	// Verifica si ya hay datos en la caché
	const cachedData = cache.get(leagueId)
	if (cachedData) {
		return res.status(200).json({ ok: true, data: cachedData })
	}

	try {
		const apiResponse = await fetch(`https://api.football-data.org/v4/competitions/${leagueId}/matches`, {
			headers: {
				'X-Auth-Token': '43e98340908a407cbaee5d154728e512',
				'Content-Type': 'application/json'
			}
		})
		
		const data = await apiResponse.json()
		cache.set(leagueId, data) // Guarda en caché por 24 horas
		console.log("llamada a la api")
		return res.status(200).json({ ok: true, data })
	} catch (error) {
		console.error('Error al obtener los partidos:', error)
		return res.status(500).json({ ok: false, message: 'Error al obtener los datos' })
	}
}



module.exports = {
	getMatchesFromCompetition,
}
