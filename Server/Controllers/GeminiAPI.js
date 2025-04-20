import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  }  from "@google/generative-ai";

  const apiKey = process.env.GEMINI_API_KEY; 
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 1192,
    responseMimeType: "text/plain",
  };
  
  async function Gemini(prompt) {
    const chatSession = model.startChat({
      generationConfig,
      history: [
      ],
    });
  
    const promptText = String(prompt);
    const result = await chatSession.sendMessage(promptText);
    const Final_result = result.response.text();
    return Final_result;
  }
  
  export default Gemini;
