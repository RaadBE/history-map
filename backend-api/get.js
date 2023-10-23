const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

app.post('/api/get-recommendations', async (req, res) => {
    const { lat, lng } = req.body;
    const prompt = `Recommend historical places near latitude ${lat}, longitude ${lng}.`;

    try {
        const openAIResponse = await axios.post(
            'https://api.openai.com/v1/engines/text-davinci-003/completions',
            { prompt, max_tokens: 100 },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer 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`
                }
            }
        );
        res.json(openAIResponse.data.choices[0].text.trim().split(', '));
    } catch (error) {
        console.error("Error fetching data from OpenAI:", error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = app;