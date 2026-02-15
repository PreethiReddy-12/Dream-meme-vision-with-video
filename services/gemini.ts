
import { GoogleGenAI, Type } from "@google/genai";
import { DreamAnalysis } from "../types";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzeDream = async (description: string): Promise<DreamAnalysis> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analyze this dream description: "${description}"`,
    config: {
      systemInstruction: "You are a professional dream interpreter and creative director. Break down the user's dream into a structured JSON response. Provide a title, a brief interpretation, the mood, a high-quality visual art prompt for image generation, a specific meme prompt (funny/relatable version), and a punchy meme caption.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          interpretation: { type: Type.STRING },
          mood: { type: Type.STRING },
          visualPrompt: { type: Type.STRING, description: "Detailed artistic prompt for a surreal dream-like painting" },
          memePrompt: { type: Type.STRING, description: "A funny or relatable image description based on the dream context" },
          memeCaption: { type: Type.STRING, description: "A relatable caption for the meme" }
        },
        required: ["title", "interpretation", "mood", "visualPrompt", "memePrompt", "memeCaption"]
      }
    }
  });

  return JSON.parse(response.text || '{}') as DreamAnalysis;
};

export const generateImage = async (prompt: string): Promise<string> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        { text: `${prompt}. High quality, detailed, professional digital art style.` }
      ]
    },
    config: {
      imageConfig: {
        aspectRatio: "1:1"
      }
    }
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  
  throw new Error("No image data returned from Gemini");
};
