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
      "Pharma City",
      40.64079600437803, 
      22.93341716164014 , 
      "images/pharmacy-symbol-svgrepo-com.svg",
      36,
      29
    ],
    
    [
      "ΦΑΡΜΑΚΕΙΟ ΠΑΝΑΓΙΩΤΟΠΟΥΛΟΣ ΚΩΝ/ΝΟΣ",
      40.63857628580346, 
      22.939770379370415, 
      "images/pharmacy-symbol-svgrepo-com.svg",
      36,
      29
    ],
    [
      
      "ΦΑΡΜΑΚΕΙΟ ΔΑΝΙΛΟΥΛΗΣ ΝΙΚΟΛΑΟΣoil",
      40.63585478219135, 
      22.93842388255716 ,
      "images/pharmacy-symbol-svgrepo-com.svg",
      36,
      29
    ],
    [
        "ΦΑΡΜΑΚΕΙΟ ΞΑΝΘΟΥΛΗΣ",
        40.63538070559027, 
        22.945647168189318  ,
        "images/pharmacy-symbol-svgrepo-com.svg",
        36,
        29
      ],
      [
        "Φαρμακείο Δεληγιώργης",
        40.63315842682704, 
        22.94439773507624 ,
        "images/pharmacy-symbol-svgrepo-com.svg",
        36,
        29
      ],
      [
        "Φαρμακείο",
        40.632121338091395, 
        22.952245736817787 , 
        "images/pharmacy-symbol-svgrepo-com.svg",
        36,
        29
      ],
      [
        "Φαρμακείο, Μάττα Μερόπη",
        40.64032871392055,  
        22.94471009335451, 
        "images/pharmacy-symbol-svgrepo-com.svg",
        36,
        29
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
  
    