import { primerAcesso } from "./database/db-primeracesso.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const API_KEY = "AIzaSyAmB2DfHGKBE4FjeX4Yx77yD7FaN47KHAY";
export const genAI = new GoogleGenerativeAI(API_KEY);
export const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});
export const modelFirst = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction: primerAcesso,
});
