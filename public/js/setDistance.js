let savedDist = localStorage.getItem("distance");
if (savedDist) {
  const list = document.createElement("li");
  list.innerText = `${parseFloat(savedDist).toFixed(2)} Km Away`;
  document.querySelector(".List").appendChild(list);
}
