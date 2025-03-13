const { Router } = require('express')
const {getMatchesFromCompetition } = require('../controllers/football')
const router = Router()


router.get(
	"/leagues/:leagueId",
	getMatchesFromCompetition
)


module.exports = router