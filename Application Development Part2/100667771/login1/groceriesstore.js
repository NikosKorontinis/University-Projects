function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 40.63710019983287,  lng: 22.94907170883991 },
      zoom: 14,
      mapID: 'efb721ff5eefd0f4',
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: false
  
    });
  
    const markers = [
      
    [
      "ΚΡΗΤΙΚΟΣ Super Market",
      40.635082739218625,  
      22.93857115905407 , 
      "images/groceries-svgrepo-com.svg",
      36,
      29
    ],
    
    [
      "ΑΒ Βασιλόπουλος",
      40.64065980758026, 
      22.937747040379467, 
      "images/groceries-svgrepo-com.svg",
      36,
      29
    ],
    [
      
      "Lidl",
      40.64190368400254, 
      22.949000584117616 ,
      "images/groceries-svgrepo-com.svg",
      36,
      29
    ],
    [
        
        "ΣΚΛΑΒΕΝΙΤΗΣ",
        40.63211878988917,  
        22.950998972315194 ,
        "images/groceries-svgrepo-com.svg",
        36,
        29
      ],
      [
        "Μασούτης",
        40.63396524004076, 
        22.94299057117789, 
        "images/groceries-svgrepo-com.svg",
        36,
        29
      ],
      
    
    
    
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
  
    