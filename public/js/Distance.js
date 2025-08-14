const Distance = (userLat, userLng, doctorLat, doctorLng) => {
  return geolib.getPreciseDistance(
    { latitude: userLat, longitude: userLng },
    { latitude: doctorLat, longitude: doctorLng },
    2
  );
};

document.querySelectorAll(".find-Distance").forEach((button) => {
  button.addEventListener("click", () => {
    const doctorLat = parseFloat(button.dataset.lat);
    const doctorLng = parseFloat(button.dataset.lng);

    navigator.geolocation.getCurrentPosition((position) => {
      const userLat = parseFloat(button.dataset.userlat);
      const userLng = parseFloat(button.dataset.userlng);
      const distance = Distance(userLat, userLng, doctorLat, doctorLng);
      alert(`Distance From Your Location is : ${distance / 1000}Km`);
    });
  });
});

const book = document.querySelectorAll(".Booknow");

book.forEach((btn) => {
  const doctorLat = parseFloat(btn.dataset.latt);
  const doctorLng = parseFloat(btn.dataset.lngg);
  const userLat = parseFloat(btn.dataset.userlatt);
  const userLng = parseFloat(btn.dataset.userlngg);
  const DocId = btn.dataset.docid;
  btn.addEventListener("click", (e) => {
      e.preventDefault();
    dist = Distance(userLat, userLng, doctorLat, doctorLng) / 1000;
       localStorage.setItem("distance", dist);
    // const list = document.createElement("li");
    // list.innerText = `${dist / 1000} Km Away`;
window.location.href = `/EBookingForm/${DocId}`;
    // document.querySelector(".List").appendChild(list);
  });
});

// window.location.href = "/EBookingForm/<%=doctor.id%>";
// const list =document.createElement("li")
// list.innerText=`${(dist/1000)} Km Away`
// document.querySelector(".List").appendChild(list)
