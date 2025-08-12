const bookNowBtns = document.querySelectorAll(".Booknow");

bookNowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        const docName = btn.dataset.doctorid;
        const docSpec = btn.dataset.specialization;
        const docLocation = btn.dataset.location;

        document.getElementById("specialization").innerText = docSpec;
        document.getElementById("DocName").innerText = docName;
        document.getElementById("location").innerText = docLocation;
    });
});






// const DocName =Booknowbtn.dataset.doctorid;
// const DocSpec =Booknowbtn.dataset.specialization;
// const DocLocation =Booknowbtn.dataset.location;
// Booknowbtn.addEventListener("click"  , ()=>{
//     const pS=document.getElementById("specialization")
//     const pN=document.getElementById("DocName")
//     const pL=document.getElementById("location")
//     pS.innerText=DocSpec
//     pN.innerText=DocName
//     pL.innerText=DocLocation

// })
