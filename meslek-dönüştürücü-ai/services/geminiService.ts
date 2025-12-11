import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Transforms an image based on a profession and background prompt.
 * Uses gemini-2.5-flash-image for image editing/transformation.
 * 
 * @param base64Image The source image in base64 format.
 * @param professionPrompt The target profession description.
 * @param backgroundPrompt The target background description.
 * @returns The generated image as a base64 data URI string.
 */
export const transformImage = async (
  base64Image: string,
  professionPrompt: string,
  backgroundPrompt: string
): Promise<string> => {
  try {
    let mimeType = 'image/jpeg';
    const match = base64Image.match(/^data:(image\/[a-zA-Z+]+);base64,/);
    if (match) {
        mimeType = match[1];
    }

    // Clean the base64 string if it contains the data URI prefix
    const cleanBase64 = base64Image.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, '');

    // Construct a strong prompt for the AI
    // We combine the profession and the background
    const prompt = `Transform the person in this image into a ${professionPrompt}. 
    Place them ${backgroundPrompt}.
    Keep the person's facial features and identity exactly the same.
    Ensure the clothing matches the profession and the lighting matches the background.
    High quality, photorealistic, cinematic.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image', // Using flash-image for editing capabilities
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: cleanBase64,
            },
          },
          {
            text: prompt,
          },
        ],
      },
    });

    // Iterate through parts to find the image
    const candidates = response.candidates;
    if (candidates && candidates.length > 0) {
      const parts = candidates[0].content.parts;
      for (const part of parts) {
        if (part.inlineData && part.inlineData.data) {
          // Construct the data URI for the new image
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }
    
    throw new Error("No image data found in response");

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};