import { genAI, model, modelFirst, API_KEY } from "./api-gemini.js";

let dataBase = { pessoalInformacao: [] };
let firstInteraction = true; // Variável para controlar a primeira interação

async function sendMessageDB(userMessage = null) {
  console.log(dataBase);

  const chatArea = document.querySelector(".chat-container .chat-area");
  const inputElement = document.querySelector(".chat-container input");

  let currentMessage = userMessage;
  if (userMessage === null && inputElement) {
    currentMessage = inputElement.value.trim();
  }

  if (firstInteraction || (currentMessage && currentMessage.length > 0)) {
    try {
      if (currentMessage && currentMessage.length > 0) {
        inputElement.value = "";
        chatArea.insertAdjacentHTML(
          "beforeend",
          `
          <div class="user">
            <p>${currentMessage}</p>
          </div>`
        );
      }

      chatArea.insertAdjacentHTML("beforeend", '<div class="loader"></div>');

      const chat = modelFirst.startChat(dataBase);
      let result;

      if (firstInteraction) {
        result = await chat.sendMessage("Olá! Qual é o seu nome?");
        firstInteraction = false;
      } else if (currentMessage) {
        result = await chat.sendMessageStream(currentMessage);
      } else {
        document.querySelector(".chat-container .chat-area .loader").remove();
        return; // Não faz nada se não houver mensagem na primeira interação após o bot
      }

      chatArea.insertAdjacentHTML(
        "beforeend",
        `
        <div class="model">
          <p></p>
        </div>`
      );

      const modelMessageDiv = chatArea.lastElementChild;
      const modelParagraph = modelMessageDiv.querySelector("p");
      let fullResponseMessage = "";

      if (result && result.stream) {
        for await (const chunk of result.stream) {
          const chunkText = await chunk.text();
          modelParagraph.insertAdjacentHTML(
            "beforeend",
            `
            ${chunkText}
            `
          );
          fullResponseMessage += chunkText;
        }
      } else if (result && result.response && result.response.text) {
        modelParagraph.textContent = result.response.text();
        fullResponseMessage = result.response.text();
      }

      if (currentMessage) {
        dataBase.pessoalInformacao.push({
          role: "user",
          parts: [{ text: currentMessage }],
        });

        dataBase.pessoalInformacao.push({
          role: "modelFirst",
          parts: [
            {
              text: fullResponseMessage,
            },
          ],
        });
      } else if (firstInteraction === false) {
        dataBase.pessoalInformacao.push({
          role: "modelFirst",
          parts: [
            {
              text: fullResponseMessage,
            },
          ],
        });
      }
    } catch (error) {
      console.error("Ocorreu um erro:", error);
      chatArea.insertAdjacentHTML(
        "beforeend",
        `
        <div class="error">
          <p>The message could not be sent. Please try again.</p>
        </div>`
      );
    }

    document.querySelector(".chat-container .chat-area .loader").remove();
  }
}

// Executa sendMessageDB na carga da página para a primeira mensagem da IA
window.addEventListener("load", () => {
  sendMessageDB();
});

document
  .querySelector(".chat-container .input-area button")
  .addEventListener("click", () => sendMessageDB());
