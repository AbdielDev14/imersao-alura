// import { GoogleGenerativeAI } from "@google/generative-ai";

// const API_KEY = "AIzaSyAmB2DfHGKBE4FjeX4Yx77yD7FaN47KHAY";
// const genAI = new GoogleGenerativeAI(API_KEY);
// const model = genAI.getGenerativeModel({
//   model: "gemini-2.0-flash",
// });

import { genAI, model, API_KEY } from "../api-gemini.js";

let messages = { history: [] };

async function sendMessage() {
  console.log(messages);

  const userMessage = document.querySelector(".chat-window input").value;

  if (userMessage.length) {
    try {
      document.querySelector(".chat-window input").value = "";
      document.querySelector(".chat-window .chat").insertAdjacentHTML(
        "beforeend",
        `
       <div class="user">
          <p>${userMessage}</p>
        </div>`
      );

      const chat = model.startChat(messages);

      let result = await chat.sendMessage(userMessage);

      document.querySelector(".chat-window .chat").insertAdjacentHTML(
        "beforeend",
        `
       <div class="model">
          <p>${result.response.text()}</p>
        </div>`
      );

      messages.history.push({
        role: "user",
        parts: [{ text: userMessage }],
      });

      messages.history.push({
        role: "model",
        parts: [{ text: result.response.text() }],
      });
    } catch (error) {
      document.querySelector(".chat-window .chat").insertAdjacentHTML(
        "beforeend",
        `
       <div class="error">
          <p>The message could not be sent. Please try again.</p>
        </div>`
      );
    }
  }
}

document
  .querySelector(".chat-window .input-area button")
  .addEventListener("click", () => sendMessage());
