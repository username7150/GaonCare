socket.on("notification", (data) => {
  alert("Realtime Notification: " + data.message);
});
