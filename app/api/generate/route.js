import { NextResponse } from "next/server";
const { GoogleGenerativeAI } = require("@google/generative-ai");


SystemPrompt = ` 
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
    
    Your goal is to make the learning experience as engaging and effective as possible for the user.

    Return in the following JSON format
    {
        "flashcards":[{
            "front":str,
            "back":str
        }]
    }
`
const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
const model = genAI.getGenerativeModel({model: "gemini-1.5-flash"});

export async function POST(request){
    try{
        const data = await request.text()
        const result = await module.generateContent.create({
            messages: [
              { role: model, content: SystemPrompt },
              { role: "user", content: data },
            ],
            response_format: { type: 'json_object' }
          });
        const flashcards = JSON.parse(result.choices[0].message.content);
        return NextResponse.json(flashcards.flashcards);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}

