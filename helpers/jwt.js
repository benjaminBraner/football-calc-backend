const jwt = require("jsonwebtoken");

const generateJWT = (uid, name, email, role) => {
	return new Promise((resolve, reject) => {
		const payload = {uid, name, email, role};
		jwt.sign(payload, process.env.SECRET_JWT_SEED, {
			// expiresIn: "15m"
			expiresIn: "30d"
		}, (err, token) => {
			if (err) {
				console.log(err);
				reject("No se pudo generar el token");
			} else {
				resolve(token);
			}
		})
	})
}

module.exports = {
	generateJWT
}