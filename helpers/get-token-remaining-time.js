const jwt = require("jsonwebtoken");

const getTokenRemainingTime = (token) => {
    try {
        const decoded = jwt.decode(token); 
        if (!decoded || !decoded.exp) {
            return "Token inválido o sin fecha de expiración";
        }

        const now = Math.floor(Date.now() / 1000); 
        const timeLeft = decoded.exp - now;

        if (timeLeft <= 0) {
            return "El token ha expirado";
        }

        // Cálculo de días, horas y minutos
        const days = Math.floor(timeLeft / 86400); // 86400 segundos = 1 día
        const hours = Math.floor((timeLeft % 86400) / 3600);
        const minutes = Math.floor((timeLeft % 3600) / 60);

        // Formato condicional según lo que falta
        if (days > 0) {
            return `${days} d ${hours} hr`;
        } else if (hours > 0) {
            return `${hours} hr ${minutes} min`;
        } else {
            return `${minutes} min`;
        }
    } catch (error) {
        return "Error al decodificar el token";
    }
};

module.exports = { getTokenRemainingTime };