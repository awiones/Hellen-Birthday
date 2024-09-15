document.addEventListener("DOMContentLoaded", function () {
    const chatIcon = document.getElementById("chat-icon");
    let chatContainer;
    let isTyping = false; // Track if the cat is currently typing
    let typingTimeout; // Track typing timeout

    // Define an array of possible cat responses
    const catResponses = [
        "Meow Meow 🎂",
        "Meow meow",
        "Purr",
        "Hiss",
        "*Yawn*",
        "*Stretch*",
        "Mew",
        "Purr meow",
        "Hiss meow",
        "Meow? Meow!",
        "Meow.... meow meow?, mew... mew, Mewo... me- Hiss..."
    ];

    // Load chat history when the page loads
    function loadChatHistory() {
        const chatLog = chatContainer.querySelector(".chat-log");
        const chatHistory = localStorage.getItem("chatHistory");
        if (chatHistory) {
            chatLog.innerHTML = chatHistory;
            autoScroll(); // Scroll to the bottom after loading the chat history
        }
    }

    // Save chat history to localStorage
    function saveChatHistory() {
        const chatLog = chatContainer.querySelector(".chat-log");
        localStorage.setItem("chatHistory", chatLog.innerHTML);
    }

    // Auto scroll to the bottom of the chat log
    function autoScroll() {
        const chatLog = chatContainer.querySelector(".chat-log");
        chatLog.scrollTop = chatLog.scrollHeight; // Scroll to the bottom
    }

    chatIcon.addEventListener("click", function () {
        if (!chatContainer) {
            chatContainer = document.createElement("div");
            chatContainer.className = "chat-container";
            chatContainer.innerHTML = `
                <div class="chat-box">
                    <div class="chat-header">
                        <div class="profile-section">
                            <img src="data:image/jpeg;base64,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" class="profile-icon" alt="Profile Icon" />
                            <span class="cat-manager">Catto</span>
                        </div>
                        <div class="new-conversation">+</div>
                    </div>
                    <div class="chat-log"></div>
                    <div class="input-container">
                        <textarea placeholder="This Cat make you happy..."></textarea>
                        <button type="button">&#10148;</button>
                    </div>
                </div>`;
            document.body.appendChild(chatContainer);

            // Ensure chat box slides in and then scrolls to the bottom
            setTimeout(() => {
                chatContainer.classList.add("visible");
                autoScroll(); // Scroll to the bottom after showing the chat box
            }, 10);

            const sendButton = chatContainer.querySelector("button");
            const chatLog = chatContainer.querySelector(".chat-log");
            const textarea = chatContainer.querySelector("textarea");
            const catManager = chatContainer.querySelector(".cat-manager");
            const newConversation = chatContainer.querySelector(".new-conversation");

            loadChatHistory(); // Load chat history when chat box is opened

            sendButton.addEventListener("click", sendMessage);
            textarea.addEventListener("keypress", function (event) {
                if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    sendMessage();
                }
            });

            // Make the Cat Manager text unselectable and trigger a profile popup
            catManager.addEventListener("click", showProfile);

            // Clear chat log when the "+" is clicked
            newConversation.addEventListener("click", startNewConversation);

            // Add click animation to messages
            chatLog.addEventListener("click", function (event) {
                if (event.target.classList.contains("message")) {
                    event.target.classList.add("clicked");
                    setTimeout(() => {
                        event.target.classList.remove("clicked");
                    }, 300); // Duration of the animation
                }
            });

            function sendMessage() {
                const userMessage = textarea.value.trim();
                if (userMessage) {
                    const userMessageElement = document.createElement("div");
                    userMessageElement.className = "message-container user";
                    userMessageElement.innerHTML = `
                        <div class="message-name">You</div>
                        <div class="message-text">${userMessage}</div>`;
                    chatLog.appendChild(userMessageElement);

                    textarea.value = ""; // Clear the textarea after sending the message
                    autoScroll(); // Scroll to the bottom after adding user message

                    saveChatHistory(); // Save chat history after sending a message

                    if (!isTyping) {
                        isTyping = true;

                        // Simulate typing indicator
                        const typingIndicator = document.createElement("div");
                        typingIndicator.className = "typing-indicator";
                        typingIndicator.innerHTML = `<div class="cat-typing">Cat is typing...</div><div class="typing-dots"><span></span><span></span><span></span></div>`;
                        chatLog.appendChild(typingIndicator);

                        autoScroll(); // Scroll to the bottom while typing

                        // Delay before the cat's response
                        typingTimeout = setTimeout(() => {
                            // Remove the typing indicator
                            typingIndicator.remove();

                            // Create the cat's response element
                            const catResponseElement = document.createElement("div");
                            catResponseElement.className = "message-container cat";
                            // Select a random response from the array
                            const randomResponse = catResponses[Math.floor(Math.random() * catResponses.length)];
                            catResponseElement.innerHTML = `
                                <div class="message-name">Cat</div>
                                <div class="message-text">${randomResponse}</div>`;
                            chatLog.appendChild(catResponseElement);

                            autoScroll(); // Ensure scrolling to the bottom

                            isTyping = false; // Allow new typing status

                            saveChatHistory(); // Save chat history after the cat's response
                        }, 3000); // 3 seconds delay
                    }
                }
            }
        } else {
            if (!isTyping) {
                chatContainer.classList.remove("visible");
                setTimeout(() => {
                    chatContainer.remove();
                    chatContainer = null;
                }, 500);
            }
        }
    });

    // Function to show profile popup
    function showProfile() {
        alert("This is the Cat Manager's profile!");
    }

    // Function to start a new conversation
    function startNewConversation() {
        const chatLog = chatContainer.querySelector(".chat-log");
        chatLog.innerHTML = ""; // Clear the chat log in the UI
        localStorage.removeItem("chatHistory"); // Clear the chat history from storage
    }
});
