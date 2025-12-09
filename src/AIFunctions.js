import { GoogleGenerativeAI } from "@google/generative-ai";


export async function createStudySetWithAI(studyNotes, numQuestions) {
    try {
        const AI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
        const model = AI.getGenerativeModel({model: 'gemini-2.5-flash'});
        const prompt = `You are an AI that generates structured quiz data. Create ${numQuestions} multiple-choice questions based on the study notes provided below. Adjust the difficulty based on the complexity of the notes. Strict Output Rules: 1. Return ONLY a raw JSON array. Do not use Markdown formatting (no json). 2. Do not include any conversational text before or after the JSON. 3. Each question object must follow this exact structure: { "id": (a unique number starting from 1), "question": (string), "options": (an array of exactly 4 strings), "answer": (string, must match one of the options exactly) } Here are the study notes: ${studyNotes}`;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const textValue = response.text();
        const cleanedResponse = textValue.replace(/```json|```/g, '').trim();
        const questionsArray = JSON.parse(cleanedResponse);
        console.log(questionsArray);
        return questionsArray;
    } catch(error) {
        alert("Error with AI");
        console.log("Error with AI: ", error);
        return [];
    }
}