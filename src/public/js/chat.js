const socket = io();

const submitButton = document.querySelector("#mybutton");
submitButton.addEventListener("click", () => {
    const messageGiven = document.querySelector("#mymessage").value;
    socket.emit("sendMessage", messageGiven);
})

socket.on('message', (message) => {
    document.querySelector("#message").innerHTML = message;
    console.log(message);
});
