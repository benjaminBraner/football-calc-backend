const jwt = require("jsonwebtoken");

const validateJwt = (token = '') => {

	try {
		
		const payload = jwt.verify(token, process.env.SECRET_JWT_SEED);
		return payload
		
	} catch (error) {
		return false
	}
}


module.exports = {
	validateJwt
}
