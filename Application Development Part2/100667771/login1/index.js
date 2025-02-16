function getInfo() {


    // Fetch data from API endpoint
    fetch('http://localhost:80/login1/api.php')
        .then(response => response.json())
        .then(data => {
            // Handle the data
            console.log(data);
        })
        .catch(error => {
            // Handle errors
            console.error('Error:', error);
        });

    console.log("petuxe to koumpi");
}