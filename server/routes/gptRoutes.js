const { Configuration, OpenAIApi } = require('openai');
const router = require('express').Router();
const Chat = require('../db/chats');
const auth = require('../middleware/auth');

const config = new Configuration({
    apiKey: process.env.API_KEY
});

const openai = new OpenAIApi(config);

//Make request to open AI API.
const reqOpenAI = async (prompt) => {
    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: 256,
            temperature: 1,
        });
        return response;
    } catch (error) {
    }
}

//Receiving user question, saving chat history and sending back answer in response.
router.post('/', auth, async (req, res, next) => {
    try {
        if (!req.body.question) {
            throw new Error('question is missing');
        }
        const prompt = `
        ${req.body.question}. Return response in the following parsable JSON format:
        {
            "Q": "question",
            "A": "answer"
        }
    `;

        const response = reqOpenAI(prompt);

        if (response.status !== 200) {
            return res.status(200).send({ Q: '', A: 'This static as no API key provided' });
        }
        const parsableJSONresponse = response.data.choices[0].text;
        const parsedResponse = JSON.parse(parsableJSONresponse);

        const chatMessage = new Chat({
            question: parsedResponse.Q,
            answer: parsedResponse.A,
            user_id: req.user._id
        });

        await chatMessage.save();
        return res.status(200).send(parsedResponse);

    } catch (error) {
        error.status = 400;
        next(error);
    }
});

// Returning user's previous chats history with paginaiton.
router.get('/chats', auth, async (req, res, next) => {
    try {
        const chats = await Chat.find({ user_id: req.user._id })
            .limit(parseInt(req.query.limit))
            .skip(parseInt(req.query.skip))
            .exec();
        return res.status(200).send(chats);
    } catch (error) {
        next(error)
    }
});


module.exports = router;




