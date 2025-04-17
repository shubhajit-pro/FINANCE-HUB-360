// Create chatbot button
const chatbotBtn = document.createElement('div');
chatbotBtn.innerHTML = '💬';
chatbotBtn.style.position = 'fixed';
chatbotBtn.style.bottom = '20px';
chatbotBtn.style.right = '20px';
chatbotBtn.style.background = '#007bff';
chatbotBtn.style.color = 'white';
chatbotBtn.style.padding = '10px 15px';
chatbotBtn.style.borderRadius = '50%';
chatbotBtn.style.fontSize = '24px';
chatbotBtn.style.cursor = 'pointer';
chatbotBtn.style.zIndex = '9999';
document.body.appendChild(chatbotBtn);

// Chat window
const chatWindow = document.createElement('div');
chatWindow.style.position = 'fixed';
chatWindow.style.bottom = '80px';
chatWindow.style.right = '20px';
chatWindow.style.width = '320px';
chatWindow.style.maxHeight = '420px';
chatWindow.style.background = 'white';
chatWindow.style.border = '1px solid #ccc';
chatWindow.style.borderRadius = '10px';
chatWindow.style.boxShadow = '0 0 10px rgba(0,0,0,0.1)';
chatWindow.style.display = 'none';
chatWindow.style.flexDirection = 'column';
chatWindow.style.overflow = 'hidden';
chatWindow.style.zIndex = '9999';
document.body.appendChild(chatWindow);

// Header
const chatHeader = document.createElement('div');
chatHeader.innerHTML = 'Finance Q&A Bot';
chatHeader.style.background = '#007bff';
chatHeader.style.color = 'white';
chatHeader.style.padding = '10px';
chatHeader.style.fontWeight = 'bold';
chatWindow.appendChild(chatHeader);

// Message area
const messages = document.createElement('div');
messages.style.flex = '1';
messages.style.padding = '10px';
messages.style.overflowY = 'auto';
messages.style.maxHeight = '280px';
messages.style.fontSize = '14px';
chatWindow.appendChild(messages);

// Input area
const chatInputContainer = document.createElement('div');
chatInputContainer.style.display = 'flex';
chatInputContainer.style.borderTop = '1px solid #ccc';

const chatInput = document.createElement('input');
chatInput.type = 'text';
chatInput.placeholder = 'Ask about GST, TDS, Income Tax...';
chatInput.style.flex = '1';
chatInput.style.padding = '10px';
chatInput.style.border = 'none';

const sendBtn = document.createElement('button');
sendBtn.innerText = 'Send';
sendBtn.style.padding = '10px 15px';
sendBtn.style.border = 'none';
sendBtn.style.background = '#007bff';
sendBtn.style.color = 'white';
sendBtn.style.cursor = 'pointer';

chatInputContainer.appendChild(chatInput);
chatInputContainer.appendChild(sendBtn);
chatWindow.appendChild(chatInputContainer);

// Toggle window visibility
chatbotBtn.addEventListener('click', () => {
  chatWindow.style.display = chatWindow.style.display === 'none' ? 'flex' : 'none';
});

// Bot reply logic using faqData
function getBotReply(msg) {
  msg = msg.toLowerCase();
  for (let keyword in faqData) {
    if (msg.includes(keyword)) return faqData[keyword];
  }
  return null;
}

// Handle message send
sendBtn.addEventListener('click', () => {
  const userMsg = chatInput.value.trim();
  if (!userMsg) return;

  messages.innerHTML += `<div><strong>You:</strong> ${userMsg}</div>`;

  const response = getBotReply(userMsg);
  if (response) {
    messages.innerHTML += `<div><strong>Bot:</strong> ${response}</div>`;
  } else {
    messages.innerHTML += `<div><strong>Bot:</strong> Sorry, I couldn’t understand. Please use the form below.</div>`;
    messages.innerHTML += `
      <form name="manual-qa" method="POST" data-netlify="true" style="margin-top: 10px;">
        <input type="hidden" name="form-name" value="manual-qa" />
        <input name="question" placeholder="Type your question" required style="width: 100%; padding: 5px; margin: 5px 0;" />
        <input name="email" type="email" placeholder="Your email (optional)" style="width: 100%; padding: 5px; margin: 5px 0;" />
        <button type="submit" style="padding: 6px 12px; background: #28a745; color: white; border: none;">Submit</button>
      </form>
    `;
  }

  chatInput.value = '';
  messages.scrollTop = messages.scrollHeight;
});
