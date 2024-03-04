document.addEventListener("DOMContentLoaded", function() {
  const chatInput = document.querySelector("#user-input");
  const sendChatBtn = document.querySelector("#send-button");
  const chatbox = document.querySelector("#chatbot-messages");
  let userMessage;
  const API_KEY = "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";

  
    $('.slider-container').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false,
        dots: true,
    });

    // Smooth scroll to sections
    $('.menu-bar a').on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800);
        }
    });

    const createChatLi = (message, className) => {
      const chatli = document.createElement("li");
      chatli.classList.add("chat", className);
      let chatContent =
        className === "outgoing"
          ? `<p>${message}</p>`
          : ` <span class="material-icons-outlined">smart_toy</span><p>${message}</p>`;
      chatli.innerHTML = chatContent;
      return chatli;
    };
    const generateResponse = async () => {
      const API_URL = "https://api.openai.com/v1/chat/completions";
      
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: userMessage }],
        }),
      };
      try {
        const response = await fetch(API_URL, requestOptions);
        const data = await response.json();
        const botReply = data.choices[0].message.content;
        if (userMessage.toLowerCase().includes('name')) {
          displayBotMessage("empowerminds chatbot");
        } else {
          displayBotMessage(botReply);
          console.log("Bot Reply:", botReply);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    
    const displayBotMessage = (message) => {
      chatbox.appendChild(createChatLi(message, "incoming"));
      chatbox.scrollTop = chatbox.scrollHeight;
    };
  
    const handleChat = () => {
      userMessage = chatInput.value.trim();
      if (!userMessage) return;
  
      chatbox.appendChild(createChatLi(userMessage, "outgoing"));
  
      chatInput.value = '';
      setTimeout(() => {
        generateResponse();
      }, 600);
    };
  
    chatInput.addEventListener("keypress", function(event) {
      if (event.keyCode === 13) { 
        handleChat(); 
      }
    });
  
    sendChatBtn.addEventListener("click", handleChat);
});