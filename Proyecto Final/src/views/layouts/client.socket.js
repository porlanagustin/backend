const socket = io();
const messageForm = document.getElementById("messageForm");
const usernameInput = document.getElementById("usernameInput");
const messageInput = document.getElementById("messageInput");
const messagesPool = document.getElementById("messagesPool");

const imgInput = document.getElementById("imgInput");

const sendMessage = async (messageInfo) => {
  socket.emit("client:message", messageInfo);
};

const renderMessage = (messagesData) => {
  const html = messagesData.map((messageInfo) => {
    return `<div> <strong style="color: blue">${messageInfo.username}</strong><span style="color: brown">[${messageInfo.time}]:</span> <em style="color: green; font-style: italic">${messageInfo.message}</em> </div>`;
  });

  messagesPool.innerHTML = html.join(" ");
};

const submitHandler = (event) => {
  event.preventDefault();

  const messageInfo = {
    username: usernameInput.value,
    message: messageInput.value,
  };

  sendMessage(messageInfo);

  messageInput.value = "";
  usernameInput.readOnly = true;
};

messageForm.addEventListener("submit", submitHandler);

socket.on("server:message", renderMessage);