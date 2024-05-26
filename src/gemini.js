import { GoogleGenerativeAI } from "@google/generative-ai";

// Access your API key (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);


export default async function getRankedList(prompt) {
    // For text-and-image input (multimodal), use the gemini-pro-vision model
    let model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;

   // return text;
}