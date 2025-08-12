document.querySelectorAll(".find-Distance").forEach(button=>{
    button.addEventListener("click" , ()=>{
        const doctorLat = parseFloat(button.dataset.lat);
        const doctorLng = parseFloat(button.dataset.lng);
        console.log(doctorLat)
        console.log(doctorLng)
        console.log(button.dataset.userlat)
        console.log(button.dataset.userlng)

            navigator.geolocation.getCurrentPosition(position => {
                const userLat = button.dataset.userlat;
                const userLng = button.dataset.userlng;

                const distance = geolib.getPreciseDistance(
                    { latitude: userLat, longitude: userLng },
                    { latitude: doctorLat, longitude: doctorLng },
                    2
                );
                
               alert(`Distance From Your Location is : ${(distance/1000) }Km`);
            });
       
    })

})


