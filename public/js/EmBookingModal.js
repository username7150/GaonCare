// let selectedDocId = null; 


// const bookNowBtns = document.querySelectorAll(".Booknow");

// bookNowBtns.forEach((btn) => {
   

//   btn.addEventListener("click", () => {
//     selectedDocId = btn.dataset.docid;
//     const docName = btn.dataset.doctorid;
//     const docSpec = btn.dataset.specialization;
//     const docLocation = btn.dataset.location;

//     document.getElementById("specialization").innerText = docSpec;
//     document.getElementById("DocName").innerText = docName;
//     document.getElementById("location").innerText = docLocation;
//   });
// });


// document.getElementById("ConfirmEBooking").addEventListener("click", async() => {
//     console.log("arun")
//    try {
//         const response = await fetch(`/conEBooking/${selectedDocId}`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
            
//         });
//         // const result = await response.json();
//         console.log(response);
        
//     } catch (err) {
//         console.log( err);
//     }
// });
  
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
