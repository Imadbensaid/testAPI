const API_KEY = "maxime_67ce33cd-5474-459f-bc4f-82f25b04894e"








const express = require('express')
const app = express()

const PORT = process.env.PORT || 4000

// Middleware pour vérifier l'API key
const checkApiKey = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    if (apiKey && apiKey === API_KEY) {
        next(); // API key est valide, passez à la route suivante
    } else {
        res.status(401).json({ message: "Unauthorized: Votre API Key n'est pas valide !" });
    }
};

// Utilisez le middleware pour votre route
app.get('/gadgetIP', checkApiKey, (req, res) => {
    // Extraire l'adresse IP de l'appelant
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const clientIp = ip.split(',')[0].trim();

    // Envoyer l'adresse IP dans la réponse JSON
    res.status(200).json({ message: `Votre adresse IP Gadget est : ${clientIp}` });
});

app.listen(PORT, () => { console.log(`Server listenning on port ${PORT}...`) })
