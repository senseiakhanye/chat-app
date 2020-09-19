const socket = io();

const submitButton = document.querySelector("#mybutton");
const locationButton = document.querySelector("#sendlocation");
const messages = document.querySelector("#message-form");
const messageTemplates = document.querySelector("#message-template");

// Options

const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true} );

submitButton.addEventListener("click", () => {
    const messageGiven = document.querySelector("#mymessage").value;
    socket.emit("sendMessage", messageGiven, () => {
        console.log("The message was delivered!");
    });
})

socket.on('message', (message) => {
    const html = Mustache.render(messageTemplates.innerHTML, {
        message
    });
    messages.insertAdjacentHTML("beforeend", html);
});

socket.on("locationMessage", (url) => {
    console.log(url);
})

locationButton.addEventListener("click", () => {
    if (!navigator.geolocation) {
        return alert("Geolocation is not supported by your browser.");
    }

    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit("sendLocation", {
            longitude: position.coords.longitude,
            latitude: position.coords.latitude
        }, () => {
            console.log("Location shared");
        });
    });
});

socket.emit('join', { username, room });