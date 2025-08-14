let savedDist = localStorage.getItem("distance");
if (savedDist) {
  const list = document.createElement("li");
  list.innerText = `${parseFloat(savedDist).toFixed(2)} Km Away`;
  document.querySelector(".List").appendChild(list);
}

const feeCal =(savedDist)=>{
  console.log((500 + savedDist*50))
  return (500 + savedDist*20)
}

const feeLi=document.getElementsByClassName("fee")[0]
const fees = feeCal(savedDist)
feeLi.innerText=fees;

