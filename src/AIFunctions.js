import { GoogleGenerativeAI } from "@google/generative-ai";

export async function createStudySetWithAI(studyNotes, numQuestions, numFlashcards, APIKey, usingUserAPIKey) {
    try {
        let AI;
        if(usingUserAPIKey) {
            AI = new GoogleGenerativeAI(APIKey);
        } else {
            AI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
        }
        const model = AI.getGenerativeModel({
            model: 'gemini-2.5-flash',
            generationConfig: { responseMimeType: "application/json" }
        });
        const prompt = `You are an AI that generates structured study data. Based on the study notes provided below, perform three tasks:
                        1. Create ${numQuestions} multiple-choice questions.
                        2. Create ${numFlashcards} flashcards.
                        3. Rewrite the study notes to be clearer, better formatted, and easier to understand (Enhanced Notes).

                        Strict Output Rules:
                        1. Return ONLY a raw JSON array.
                        2. The root JSON must be an array containing exactly three elements:
                        - Index 0: An array of question objects.
                        - Index 1: An array of flashcard objects.
                        - Index 2: A single string containing the Enhanced Notes.

                        IMPORTANT FORMATTING RULE FOR INDEX 2:
                        The Enhanced Notes (Index 2) must be a SINGLE STRING value. 
                        - Do NOT use actual line breaks (enter key) inside this string. 
                        - You MUST use literal '\\n' characters for newlines.
                        - You may use Markdown syntax inside the string (like # Headers, **bold**), but the string itself must be valid JSON.

                        Data Structure Requirements:
                        - Each **Question Object** (Index 0) must follow this exact structure:
                        {
                            "id": (unique number),
                            "question": (string),
                            "options": (an array of exactly 4 strings),
                            "answer": (string, MUST match the text of the correct option exactly)
                        }
                        - Each **Flashcard Object** (Index 1) must follow this exact structure:
                        {
                            "front": (string),
                            "back": (string)
                        }

                        Structure Example:
                        [
                        [ 
                            { "id": 1, "question": "...", "options": ["..."], "answer": "..." } 
                        ],
                        [ 
                            { "front": "...", "back": "..." } 
                        ],
                        "# Enhanced Notes\\n\\n## Key Concepts\\n- Point 1"
                        ]

                        Here are the study notes: ${studyNotes}`;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const textValue = response.text();
        const cleanedResponse = textValue.replace(/```json|```/g, '').trim();
        const JSONParsedCleanResponse = JSON.parse(cleanedResponse);
        return JSONParsedCleanResponse;
    } catch(error) {
        console.log("Error with AI: ", error);
        return [];
    }
}