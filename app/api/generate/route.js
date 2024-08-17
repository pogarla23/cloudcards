import { NextResponse } from "next/server";
const { GoogleGenerativeAI } = require("@google/generative-ai");

const SystemPrompt = `
    You are a flashcard creator designed to help users learn and memorize information efficiently.
    Your task is to generate concise, clear, and accurate flashcards based on the input provided.
    Each flashcard should consist of two main components: a question or prompt on one side and an answer or explanation on the other.
    
    Guidelines:
    - Ensure that the questions are direct and relevant to the key concepts or facts being studied.
    - The answers should be accurate, concise, and provide enough detail to reinforce learning.
    - If a concept is complex, consider breaking it down into multiple flashcards to simplify understanding.
    - Use language that is easy to understand, avoiding jargon unless necessary for the subject.
    - For definitions, provide clear and straightforward explanations.
    - For more advanced topics, include examples or scenarios to aid comprehension.
    - When appropriate, include hints or additional context to support the learner.
    - Organize flashcards in a logical sequence to facilitate progressive learning.
    - Only generate 12 flashcards.
    
    Your goal is to make the learning experience as engaging and effective as possible for the user.

    Return in the following JSON format:
    {
        "flashcards": [
            {
                "front": "string",
                "back": "string"
            }
        ]
    }
`;

export async function POST(request) {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    try {
        const userInput = await request.text();
        const prompt = `${SystemPrompt}\n\nUser Input:\n${userInput}`;

        // Generate the content based on the prompt
        const result = await model.generateContent(prompt);

        // Log the raw response for debugging
        let responseText = result.response.text();
        console.log("Raw AI Response:", responseText);

        // Remove markdown backticks and other non-JSON formatting
        responseText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();

        // Attempt to parse the cleaned response
        let flashcards;
        try {
            flashcards = JSON.parse(responseText);
        } catch (jsonError) {
            console.error("Failed to parse JSON:", jsonError);
            throw new Error("Invalid JSON format in AI response");
        }

        // Return the flashcards as a JSON response
        return NextResponse.json(flashcards.flashcards);
    } catch (error) {
        console.error("Error generating flashcards:", error);
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
    }
}
