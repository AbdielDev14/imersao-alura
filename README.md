![Liami Logo](src/portada.png)

# Liami - Seu Tutor de Idiomas com Gemini

[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
## Descrição do Projeto

O Liami é uma aplicação web inovadora projetada para auxiliar no aprendizado de idiomas de forma interativa e personalizada. Utilizando a poderosa API do Gemini (Google AI), o Liami oferece conversas inteligentes, explicações gramaticais, prática de vocabulário e muito mais, tudo adaptado ao seu nível e ao idioma que você deseja aprender.

## Funcionalidades Principais

* **Seleção de Idioma e Nível:** Escolha entre inglês, espanhol, português e italiano, e defina seu nível de estudo.
* **Cronograma de Estudos:** Um cronograma visual com seções para conversação, gramática, vocabulário e escrita.
* **Prática de Gramática:** Seção dedicada com explicações e exercícios interativos (atualmente com exemplos estáticos).
* **Chat Interativo com IA:** Converse com o Liami no idioma de aprendizado e receba respostas inteligentes e relevantes, com quebras de linha formatadas para melhor leitura.
* **Síntese de Voz:** Ouça as mensagens do Liami no idioma selecionado para aprimorar a compreensão auditiva e a pronúncia.
* **Reconhecimento de Voz (Implementado):** Fale com o Liami e veja suas palavras serem transcritas para interagir no chat.
* **Cartão Informativo do Cronograma:** Uma visão geral do seu idioma e nível de estudo diretamente no cronograma.

## Tecnologias Utilizadas

* **JavaScript:** Linguagem de programação principal para a lógica da aplicação no front-end.
* **HTML:** Estrutura da página web.
* **CSS:** Estilização da interface do usuário.
* **API Gemini (Google AI):** Para o processamento de linguagem natural e geração de respostas inteligentes.
* **API Web Speech (SpeechSynthesis e webkitSpeechRecognition):** Para funcionalidades de síntese e reconhecimento de voz no navegador.

## Como Utilizar

1.  **Clone o repositório:**
    ```bash
    git clone [https://docs.github.com/en/repositories/archiving-a-github-repository/referencing-and-citing-content](https://docs.github.com/en/repositories/archiving-a-github-repository/referencing-and-citing-content)
    ```
2.  **Abra o arquivo `index.html` no seu navegador.**
3.  **Selecione o idioma que deseja aprender e seu nível de estudo no modal inicial.**
4.  **Explore o cronograma de estudos e clique nas seções para acessar o conteúdo (atualmente, a seção de Gramática possui exemplos).**
5.  **Utilize a área de chat na parte inferior para enviar mensagens e interagir com o Liami.**
    * Digite sua mensagem na caixa de texto e clique no botão de enviar.
    * Clique no botão com o ícone de microfone para falar e enviar sua mensagem por voz.
    * Clique no botão "▶" ao lado das mensagens do Liami para ouvi-las.

## Configuração da API Gemini

Para que a funcionalidade de chat com a IA funcione corretamente, você precisará configurar sua própria chave da API Gemini.

1.  **Obtenha uma chave da API Gemini:** Siga as instruções na [documentação do Google AI](https://ai.google.dev/).
2.  **Abra o arquivo `./api-gemini.js`.**
3.  **Substitua o valor de `API_KEY` pela sua chave:**
    ```javascript
    export const API_KEY = "SUA_CHAVE_API_AQUI";
    ```

**Aviso:** Mantenha sua chave da API segura e não a compartilhe publicamente.

## Próximos Passos (Roadmap)

* Implementação de conteúdo dinâmico e exercícios interativos para todas as seções do cronograma (Conversação, Vocabulário, Escrita).
* Personalização do cronograma de estudos com base no progresso do usuário.
* Integração com outros recursos de aprendizado de idiomas.
* Melhorias na interface do usuário e experiência do usuário.
* Suporte para mais idiomas.

## Contribuição

Contribuições são bem-vindas! Se você tiver ideias para melhorias, correções de bugs ou novas funcionalidades, sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está licenciado sob a [MIT License](https://opensource.org/licenses/MIT). Consulte o arquivo `LICENSE` para obter mais detalhes.
## Autor

[Seu Nome/Nickname do GitHub]
[Seu Email (opcional)]
