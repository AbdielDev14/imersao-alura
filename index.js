import { genAI, model, modelFirst, API_KEY } from "./api-gemini.js";

let dataBase = { pessoalInformacao: [] };
let learningLanguage = null;
let studyLevel = null;

const initialModal = document.getElementById("initial-modal");
const chatContainer = document.getElementById("chat-container");
const idiomaSelect = document.getElementById("idioma");
const nivelSelect = document.getElementById("nivel");
const confirmarSelecaoBtn = document.getElementById("confirmar-selecao");
const scheduleSection = document.getElementById("study-schedule");
const scheduleCardsContainer = document.getElementById("schedule-cards");
const chatArea = document.querySelector(".chat-container .chat-area");
const modalCronograma = document.getElementById("cronograma-modal"); // Referencia al modal
const mainContainer = document.querySelector(".main-container"); // Nuevo contenedor principal
const inputChat = document.querySelector(".chat-container .input-area input"); // Referencia al input de chat

const textosCartoes = {
  inglês: [
    { titulo: "Conversação", descricao: "Pratique conversas em inglês." },
    {
      titulo: "Gramática",
      descricao: "Estude as regras gramaticais do inglês.",
      exercicios: [
        "Complete as frases com o verbo 'to be': I ___ a student. You ___ my friend.",
        "Escolha o pronome correto: ___ is a cat. (It/She/He)",
      ],
    },
    { titulo: "Vocabulário", descricao: "Aprenda novas palavras em inglês." },
    { titulo: "Escrita", descricao: "Pratique a escrita em inglês." },
  ],
  espanhol: [
    {
      titulo: "Conversación",
      descricao: "Practica conversaciones en español.",
    },
    {
      titulo: "Gramática",
      descricao: "Estudia las reglas gramaticales del español.",
      exercicios: [
        "Completa las frases con el verbo 'ser': Yo ___ estudiante. Tú ___ mi amigo.",
        "Elige el pronombre correcto: ___ es un perro. (Él/Ella/Eso)",
      ],
    },
    { titulo: "Vocabulario", descricao: "Aprende nuevas palabras en español." },
    { titulo: "Escritura", descricao: "Practica la escritura en español." },
  ],
  português: [
    { titulo: "Conversação", descricao: "Pratique conversas em português." },
    {
      titulo: "Gramática",
      descricao: "Estude as regras gramaticais do português.",
      exercicios: [
        "Complete as frases com o verbo 'ser': Eu ___ um estudante. Você ___ meu amigo.",
        "Escolha o pronome correto: ___ é um livro. (Ele/Ela/Isso)",
      ],
    },
    {
      titulo: "Vocabulário",
      descricao: "Aprenda novas palavras em português.",
    },
    { titulo: "Escrita", descricao: "Pratique a escrita em português." },
  ],
  italiano: [
    {
      titulo: "Conversazione",
      descricao: "Pratica conversazioni in italiano.",
    },
    {
      titulo: "Grammatica",
      descricao: "Studia le regole grammaticali dell'italiano.",
      exercicios: [
        "Completa le frasi con il verbo 'essere': Io ___ uno studente. Tu ___ il mio amico.",
        "Scegli il pronome corretto: ___ è un gatto. (Lui/Lei/Esso)",
      ],
    },
    { titulo: "Vocabolario", descricao: "Impara nuove parole in italiano." },
    { titulo: "Scrittura", descricao: "Pratica la scrittura in italiano." },
  ],
};

confirmarSelecaoBtn.addEventListener("click", () => {
  learningLanguage = idiomaSelect.value;
  studyLevel = nivelSelect.value;

  if (learningLanguage && studyLevel) {
    initialModal.style.display = "none";
    mainContainer.classList.remove("hidden"); // Muestra el contenedor principal
    gerarCartoesCronograma(learningLanguage, studyLevel);
    adicionarMensagemBot(
      `Olá! Liami por aqui. 😉\n\nTô aqui pra te ajudar a aprender ${learningLanguage}! Explore as seções abaixo para começar.`
    );
  } else {
    alert("Por favor, selecione o idioma e o nível.");
  }
});

function adicionarMensagemBot(mensagem) {
  const mensagemDiv = document.createElement("div");
  mensagemDiv.classList.add("model");
  const textoParrafo = document.createElement("p");
  textoParrafo.textContent = mensagem;

  const botaoHablar = document.createElement("button");
  botaoHablar.classList.add("botao-hablar");
  botaoHablar.textContent = "▶"; // Puedes usar un icono en lugar de texto

  botaoHablar.addEventListener("click", () => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(mensagem);
      utterance.lang =
        learningLanguage === "inglês"
          ? "en-US"
          : learningLanguage === "espanhol"
          ? "es-ES"
          : learningLanguage === "português"
          ? "pt-BR"
          : learningLanguage === "italiano"
          ? "it-IT"
          : "en-US"; // Establecer el idioma
      speechSynthesis.speak(utterance);
    } else {
      alert("La síntesis de voz no es compatible con este navegador.");
    }
  });

  mensagemDiv.appendChild(textoParrafo);
  mensagemDiv.appendChild(botaoHablar);
  chatArea.appendChild(mensagemDiv);
  chatArea.scrollTop = chatArea.scrollHeight; // Mantener el scroll abajo al agregar mensaje
}

function gerarCartoesCronograma(idioma, nivel) {
  scheduleCardsContainer.innerHTML = "";
  const textosParaIdioma = textosCartoes[idioma.toLowerCase()];

  if (textosParaIdioma) {
    textosParaIdioma.forEach((secao, index) => {
      const card = document.createElement("div");
      card.classList.add("schedule-card");
      card.innerHTML = `
                <h3>${secao.titulo}</h3>
                <p>${secao.descricao}</p>
                <button class="iniciar-secao" data-secao="${secao.titulo}">Iniciar</button>
            `;
      scheduleCardsContainer.appendChild(card);
      console.log(`Cartão "${secao.titulo}" gerado.`);
    });
    console.log("Intentando adicionar listeners aos botões 'Iniciar'...");
    adicionarListenersIniciarSecao();
  } else {
    scheduleCardsContainer.innerHTML =
      "<p>Seções do cronograma não disponíveis para este idioma.</p>";
  }
}

function adicionarListenersIniciarSecao() {
  const botoesIniciarSecao = document.querySelectorAll(".iniciar-secao");
  console.log(
    `Número de botões 'Iniciar' encontrados: ${botoesIniciarSecao.length}`
  );
  botoesIniciarSecao.forEach((botao) => {
    botao.addEventListener("click", () => {
      const secaoTitulo = botao.dataset.secao;
      console.log(`Botão 'Iniciar' clicado para a seção: ${secaoTitulo}`);
      exibirConteudoSecao(secaoTitulo, learningLanguage, studyLevel);
    });
  });
  console.log("Listeners dos botões 'Iniciar' adicionados.");
}

function exibirConteudoSecao(tituloSecao, idioma, nivel) {
  const modalTitulo = document.getElementById("modal-titulo");
  const modalConteudo = document.getElementById("modal-conteudo");
  const modalConversacao = document.getElementById("modal-conversacao");
  const modalGramatica = document.getElementById("modal-gramatica");

  console.log(
    `Intentando exibir modal para: ${tituloSecao}, ${idioma}, ${nivel}`
  );

  modalTitulo.textContent = `Praticar ${tituloSecao} em ${idioma} (${nivel})`;
  modalConteudo.innerHTML = `<p>O conteúdo para a seção de ${tituloSecao} no nível ${nivel} será adicionado em breve.</p>`;
  modalConversacao.innerHTML = "";
  modalGramatica.innerHTML = "";

  const modalExercicios = document.getElementById("exercicios-modal"); // Assumindo um novo modal para exercícios
  const exerciciosLista = document.getElementById("exercicios-lista"); // Lista dentro do modal de exercícios
  const modalFecharExercicios = document.getElementById(
    "modal-fechar-exercicios"
  ); // Botão para fechar o modal de exercícios

  if (tituloSecao === "Gramática" || tituloSecao === "Gramática") {
    const idiomaLower = idioma.toLowerCase();
    const exercicios = textosCartoes[idiomaLower]?.find(
      (item) => item.titulo === tituloSecao
    )?.exercicios;

    if (exercicios && modalExercicios && exerciciosLista) {
      exerciciosLista.innerHTML = "";
      exercicios.forEach((exercicio) => {
        const listItem = document.createElement("li");
        listItem.textContent = exercicio;
        exerciciosLista.appendChild(listItem);
      });
      modalExercicios.classList.remove("hidden");

      if (modalFecharExercicios) {
        modalFecharExercicios.addEventListener("click", () => {
          modalExercicios.classList.add("hidden");
        });
      }

      window.addEventListener("click", (event) => {
        if (event.target === modalExercicios) {
          modalExercicios.classList.add("hidden");
        }
      });
      return; // Evita que o modal de cronograma seja exibido também
    } else {
      modalConteudo.innerHTML =
        "<p>Exercícios de gramática não disponíveis no momento.</p>";
    }
  }

  modalCronograma.classList.remove("hidden"); // Usa la referencia directa al modal
  console.log("Modal deve estar visível agora (classe 'hidden' removida).");

  // Asegúrate de que los listeners para cerrar el modal estén adjuntados (si no lo están ya)
  const modalFechar = document.getElementById("modal-fechar");
  if (modalFechar) {
    modalFechar.addEventListener("click", () => {
      modalCronograma.classList.add("hidden");
      console.log("Botão 'Fechar' do modal clicado.");
    });
  }

  window.addEventListener("click", (event) => {
    if (event.target === modalCronograma) {
      modalCronograma.classList.add("hidden");
      console.log("Clique fora do modal detectado.");
    }
  });
}

async function sendMessageDB(userMessage = null) {
  console.log(dataBase);
  console.log("Idioma escolhido:", learningLanguage);

  let currentMessage = userMessage;
  if (userMessage === null && inputChat) {
    currentMessage = inputChat.value.trim();
  }

  if (currentMessage && currentMessage.length > 0) {
    try {
      inputChat.value = "";
      chatArea.insertAdjacentHTML(
        "beforeend",
        `
                <div class="user">
                    <p>${currentMessage}</p>
                </div>`
      );
      chatArea.scrollTop = chatArea.scrollHeight;

      const mensagemBotDiv = document.createElement("div");
      mensagemBotDiv.classList.add("model");
      const textoParrafoBot = document.createElement("p");
      mensagemBotDiv.appendChild(textoParrafoBot);
      const botaoHablar = document.createElement("button");
      botaoHablar.classList.add("botao-hablar");
      botaoHablar.textContent = "▶";
      mensagemBotDiv.appendChild(botaoHablar);
      chatArea.appendChild(mensagemBotDiv);
      chatArea.scrollTop = chatArea.scrollHeight;

      const loaderDiv = document.createElement("div");
      loaderDiv.classList.add("loader");
      chatArea.appendChild(loaderDiv);
      chatArea.scrollTop = chatArea.scrollHeight;

      const chat = modelFirst.startChat(dataBase);
      let result;
      let fullResponse = "";

      const promptComIdioma = `Você está assistindo um usuário que está aprendendo ${learningLanguage}. Responda de forma útil e encorajadora. Use dois espaços no final de cada frase onde você gostaria de uma quebra de linha, seguido por um Enter. A mensagem do usuário é: ${currentMessage}`;

      result = await chat.sendMessageStream(promptComIdioma);

      textoParrafoBot.textContent = ""; // Inicializa el texto del bot como vacío
      for await (const chunk of result.stream) {
        const text = await chunk.text();
        fullResponse += text;
        textoParrafoBot.textContent = fullResponse; // Actualiza el texto con cada chunk
        chatArea.scrollTop = chatArea.scrollHeight; // Mantén el scroll abajo
      }

      // Adjuntar el listener ao botão de hablar após a resposta estar completa
      botaoHablar.addEventListener("click", () => {
        console.log("Botão 'falar' clicado. Texto:", fullResponse); // Adicione esta linha para debug
        if ("speechSynthesis" in window) {
          const utterance = new SpeechSynthesisUtterance(fullResponse);
          utterance.lang =
            learningLanguage === "inglês"
              ? "en-US"
              : learningLanguage === "espanhol"
              ? "es-ES"
              : learningLanguage === "português"
              ? "pt-BR"
              : learningLanguage === "italiano"
              ? "it-IT"
              : "en-US";
          speechSynthesis.speak(utterance);
        } else {
          alert("La síntesis de voz no es compatible con este navegador.");
        }
      });

      dataBase.pessoalInformacao.push({
        role: "user",
        parts: [{ text: currentMessage }],
      });
      dataBase.pessoalInformacao.push({
        role: "modelFirst",
        parts: [{ text: fullResponse }],
      });
    } catch (error) {
      console.error("Ocorreu um erro:", error);
      chatArea.insertAdjacentHTML(
        "beforeend",
        `
                <div class="error">
                    <p>The message could not be sent. Please try again.</p>
                </div>`
      );
      chatArea.scrollTop = chatArea.scrollHeight;
    }

    const loader = document.querySelector(".chat-container .chat-area .loader");
    if (loader) {
      loader.remove();
    }
  }
}

document
  .querySelector(".chat-container .input-area button")
  .addEventListener("click", () => sendMessageDB());

inputChat.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    sendMessageDB();
  }
});
