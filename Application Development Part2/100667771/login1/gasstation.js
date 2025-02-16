function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 40.63710019983287,  lng: 22.94907170883991 },
      zoom: 12,
      mapID: 'efb721ff5eefd0f4',
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: false
  
    });
  
    const markers = [
      
    [
      "Eko",
      40.6424971430551, 
      22.928697538910132, 
      "images/gas-station-fuel-svgrepo-com.svg",
      36,
      29
    ],
    
    [
      "Eko",
      40.64264030986195, 
      22.939452205361487, 
      "images/gas-station-fuel-svgrepo-com.svg",
      36,
      29
    ],
    [
      
      "Kaoil",
      40.62977030572641, 
      22.95298815077736,
      "images/gas-station-fuel-svgrepo-com.svg",
      36,
      29
    ],
    [
        "AutoHf",
        40.62298100969156, 
        22.96169177123036 ,
        "images/gas-station-fuel-svgrepo-com.svg",
        36,
        29
      ],
      [
        "Shell",
        40.6185156009601, 
        22.97007303537028,
        "images/gas-station-fuel-svgrepo-com.svg",
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
  
    