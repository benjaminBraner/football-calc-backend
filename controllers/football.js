const { response } = require('express')

// X-Auth-Token = 43e98340908a407cbaee5d154728e512

const getMatchesFromCompetition = async (req, res = response, next) => {
	
	const { leagueId } = req.params;
	
	try {
		const apiResponse = await fetch(`https://api.football-data.org/v4/competitions/${leagueId}/matches`, {
			headers: {
				'X-Auth-Token': '43e98340908a407cbaee5d154728e512',
				'Content-Type': 'application/json'
			}
		})

		const data = await apiResponse.json()

		return res.status(200).json({
			ok: true,
			data
		})
	} catch (error) {
		console.error('Error al obtener los partidos:', error)
		return res.status(500).json({
			ok: false,
			message: 'Error al obtener los datos',
			error: error.message
		})
	}
}

module.exports = {
	getMatchesFromCompetition
}
