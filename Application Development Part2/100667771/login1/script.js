function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 40.63710019983287,  lng: 22.94907170883991 },
    zoom: 15,
    mapID: 'efb721ff5eefd0f4',
    mapTypeControl: false,
    fullscreenControl: false,
    streetViewControl: false

  });

  const markers = [
    [
    "Cineplex",
    40.64715762140303,
    22.92054258349168,
    "images/cinema-svgrepo-com.svg",
    38,
    31
  ],
  [
    "Κινηματοθέατρο Αλέξης Μινωτής",
    40.654156568242236, 
    22.92515506975349,
    "images/cinema-svgrepo-com.svg",
    38,
    31
  ],
  
  [
    "Cinema Vakoura",
    40.632473887107665, 
    22.950213625890637,
    "images/cinema-svgrepo-com.svg",
    38,
    31
  ],
  [
    
    "Odeon",
    40.63445820331931, 
    22.942141452714033,
    "images/cinema-svgrepo-com.svg",
    38,
    31
  ],
  [
    "Φεστιβάλ Κινηματογράφου Θεσσαλονίκης",
    40.63458847353914, 
    22.94076816180763,
    "images/cinema-svgrepo-com.svg",
    38,
    31
  ],
  [
     
    "Options Cinemas Thessaloniki",
    40.58063487537369, 
    22.97389880697252,
    "images/cinema-svgrepo-com.svg",
    38,
    31
  ],
  [
  
    "Apollon Open Air Cinema",
    40.6220813737323, 
    22.953986088829666,
    "images/cinema-svgrepo-com.svg",
    38,
    31
  ],
  [
    
    "Θερινός Κινηματογράφος ΝΑΤΑΛΙ",
    40.62403576252846, 
    22.95209781383336,
    "images/cinema-svgrepo-com.svg",
    38,
    31
  ]

];

for(let i = 0; i<markers.length; i++){
  const currMarker = markers[i];

  const marker = new google.maps.Marker({
    position: { lat: currMarker[1], lng: currMarker[2] },
    map,
    title: currMarker[0],
    icon:{
      url: currMarker[3],
      scaledSize: new google.maps.Size(currMarker[4], currMarker[5])
    },
    animation: google.maps.Animation.DROP
  });
  
  
  
  const infowindow = new google.maps.InfoWindow({
    content: currMarker[0],
   
  });
  
  marker.addListener("click", () => {
    infowindow.open(map, marker); // Corrected the parameters here
  });
}

}

