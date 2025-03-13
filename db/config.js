const mongoose = require('mongoose');


const dbConnection = () => {
	try {
			
		mongoose.connect(process.env.DB_CONN);
		console.log("db online");
		
	} catch (error) {
		console.log(error)
		throw new Error("Error a la hora de inicializar la base de datos");
	}
}

module.exports = {
	dbConnection
}