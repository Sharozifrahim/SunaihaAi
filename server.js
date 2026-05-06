require('dotenv').config();
const express = require('express');
const { Groq } = require('groq-sdk');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public')); // Serves our HTML/CSS

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.post('/api/chat', async (req, res) => {
    try {
        const { messages } = req.body;
        
        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                { 
                    role: "system", 
                    content: "You are SunaihaScriptureAi. Provide deep Biblical insights. Use markdown tables for comparisons. Developer: Sunaiha Sabir." 
                },
                ...messages
            ],
            temperature: 0.7,
        });

        res.json(completion);
    } catch (error) {
        console.error("Groq Error:", error);
        res.status(500).json({ error: "Failed to fetch scripture data" });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});