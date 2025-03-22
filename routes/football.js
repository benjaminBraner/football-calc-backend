const { Router } = require('express')
const {getMatchesFromCompetition } = require('../controllers/football')
const router = Router()
const axios = require("axios");

router.get(
	"/leagues/:leagueId",
	getMatchesFromCompetition
)

















// Ruta para obtener los precios de USDT en P2P
router.post("/binance/p2p", async (req, res) => {
	try {
	    const url = "https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search";
	    const payload = {
		   asset: "USDT",  // Criptomoneda a buscar
		   fiat: "BOB",  // Moneda fiduciaria (cambia según el país)
		   tradeType: "BUY",  // "BUY" para comprar, "SELL" para vender
		   page: 1,
		   rows: 10,
		   payTypes: [],
		   publisherType: null
	    };
 
	    const response = await axios.post(url, payload, {
		   headers: { "Content-Type": "application/json" }
	    });
 
	    res.json(response.data);
	} catch (error) {
	    console.error("Error al obtener datos de Binance:", error);
	    res.status(500).json({ error: "Error en la solicitud a Binance" });
	}
 });
 
module.exports = router