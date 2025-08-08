const textElement = document.getElementById("typing");

setInterval(() => {
    textElement.classList.remove("typing"); 
    void textElement.offsetWidth;            
    textElement.classList.add("typing");     
}, 4000);