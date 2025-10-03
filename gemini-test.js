import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function test() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

    const result = await model.generateContent("Hello Gemini! Can you say hi?");
    console.log("✅ Gemini response:", result.response.text());
  } catch (err) {
    console.error("❌ Error:", err);
  }
}

test();
