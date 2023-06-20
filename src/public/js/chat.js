const socket = io();
let user = document.getElementById("chatBox");
user = user.className.split("-")[0];
let rol = document.getElementById("chatBox");
rol = rol.className.split("-")[1];

if (rol !== "admin") {
  const input = document.getElementById("input");
  input.onkeyup = (evt) => {
    if (evt.key === "Enter") {
      if (input.value.trim().length > 0) {
        socket.emit("message", { user: user, message: input.value });
        input.value = "";
      } else {
        alert(
          "Por favor escribir una palabra/mensaje, los espacios no son validos"
        );
      }
    }
  };
}

socket.on("messageLogs", (data) => {
  const messageLogs = document.getElementById("messageLogs");
  let logs = "";
  data.forEach((log) => {
    logs += `${log.user}: ${log.message}<br/>`;
  });
  messageLogs.innerHTML = logs;
});
