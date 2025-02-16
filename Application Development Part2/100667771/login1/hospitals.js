function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 40.63710019983287,  lng: 22.94907170883991 },
      zoom: 13,
      mapID: 'efb721ff5eefd0f4',
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: false
  
    });
  
    const markers = [
      [
      "Γενικό Νοσοκομείο Θεσσαλονίκης «Γ. Γεννηματάς»",
      40.63432279710207, 
      22.95557673466745,
      "images/hospital-4-svgrepo-com.svg",
      36,
      29
    ],
    [
      "Γενικό Νοσοκομείο Θεσσαλονίκης «Ο Άγιος Δημήτριος»",
      40.63798134581957, 
      22.958597006780778 ,
      "images/hospital-4-svgrepo-com.svg",
      36,
      29
    ],
    
    [
      "Γενικό Νοσοκομείο Θεσσαλονίκης «Ιπποκράτειο»",
      40.61324843801076, 
      22.962539886836623, 
      "images/hospital-4-svgrepo-com.svg",
      36,
      29
    ],
    [
      
      "Πανεπιστημιακό Γενικό Νοσοκομείο Θεσσαλονίκης «ΑΧΕΠΑ»",
      40.62992625643851, 
      22.960093712327673 ,
      "images/hospital-4-svgrepo-com.svg",
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
  
    