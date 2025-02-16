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
      "Kitchen Bar",
      40.632775624518196, 
      22.93520641450249,
      "images/restaurant-waiter-svgrepo-com.svg",
      36,
      29
    ],
    [
      "Loupino",
      40.63456748610225,  
      22.937065203938825,
      "images/restaurant-waiter-svgrepo-com.svg",
      36,
      29
    ],
    
    [
      "Η Ρούγα",
      40.63944720574883, 
      22.939376131346165,
      "images/restaurant-waiter-svgrepo-com.svg",
      36,
      29
    ],
    [
      
      "Τα Τρία Γουρουνάκια",
      40.63746491386248,   
      22.939746463972888,
      "images/restaurant-waiter-svgrepo-com.svg",
      36,
      29
    ],
    [
      "Sofi's House",
      40.63945002503069, 
      22.93904365784678, 
      "images/restaurant-waiter-svgrepo-com.svg",
      36,
      29
    ],
    [
       
      "Ούζο στον πίνακα",
      40.63577604147424, 
      22.94404139064068 ,
      "images/restaurant-waiter-svgrepo-com.svg",
      36,
      29
    ],
    [
    
      "Το Δίχτυ",
      40.63545011381421,  
      22.94490037590592,
      "images/restaurant-waiter-svgrepo-com.svg",
      36,
      31
    ],
    [
        
      "Το Ελληνικό",
      40.62860526541268, 
      22.947438286916874, 
      "images/restaurant-waiter-svgrepo-com.svg",
      36,
      29
    ],
    [
        
        "Οινοχόος",
        40.63521307451665,  
        22.953997810760555,
        "images/restaurant-waiter-svgrepo-com.svg",
        36,
        29
      ],
      [
        
        "Μούργα",
        40.63589456022884, 
        22.949585750079983,
        "images/restaurant-waiter-svgrepo-com.svg",
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
  
    