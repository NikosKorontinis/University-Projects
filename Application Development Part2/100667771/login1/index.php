<?php
session_start();

include("connection.php");
include("functions.php");

$user_data = check_login($con);

require_once __DIR__ . '/config.php';

class API
{
    function Select()
    {
        $db = new Connect;
        $maps = array();
        $data = $db->prepare('SELECT * FROM maps ORDER BY id');
        $data->execute();
        while ($output = $data->fetch(PDO::FETCH_ASSOC)) {
            $maps[] = array(
                'id' => $output['id'],
                'name' => $output['name'],
                'places' => $output['places']
            );
        }
        return json_encode($maps);
    }
}

$API = new API;
if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
    // Set response header to JSON
    header('Content-Type: application/json');
    
    // Echo the result of the Select method
    $json_response = $API->Select();
    echo $json_response;

    // Debug statement to output JSON response directly to the browser console
    echo '<script>console.log(' . json_encode($json_response) . ');</script>';
} else {
    // Include your HTML content here
}

?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Find-N-Go</title>
    <link rel="stylesheet" href="styles.css" />
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

</head>

<body>
    <div id="nav-bar">

        <ul>

            <li><img src="images/find-location-phone-smartphone-svgrepo-com.svg" alt="find image" class="find-icon" /></li>
            <li><a href="index.php">Find-N-Go</a></li>
            <li><a href="index.php">Home</a></li>
            <li><button id="fetch-data">Fetch Data</button></li>


            </li>
            <li><a href="./aboutpage.html">About</a></li>
            <li style="float:right"><a href="logout.php">Log out </a></li>
        </ul>

    </div>
    <br>


    <h1> Hello, <?php echo $user_data['user_name']; ?> what would you like to find today?</h1>
    <br>
    <div class="grid-container">
        <div class="grid-item">
            <a href="./cinema.html"><img src="images/cinema-svgrepo-com.svg" alt="cinema icon"></a>

        </div>
        <div class="grid-item">
            <a href="./restaurants.html"><img src="images/restaurant-waiter-svgrepo-com.svg" alt="restaurant icon"></a>

        </div>
        <div class="grid-item">
            <a href="./groceriesstore.html"><img src="images/groceries-svgrepo-com.svg" alt="groceries icon"></a>

        </div>
        <div class="grid-item">
            <a href="./gasstation.html"><img src="images/gas-station-fuel-svgrepo-com.svg" alt="gas-station icon"></a>

        </div>
        <div class="grid-item">
            <a href="./pharmacies.html"><img src="images/pharmacy-symbol-svgrepo-com.svg" alt="pharmacy icon"></a>

        </div>
        <div class="grid-item">
            <a href="./hospitals.html"><img src="images/hospital-4-svgrepo-com.svg" alt="hospital icon"></a>

        </div>
    </div>
    <footer class="container">

        <p style="text-align: center;">© 2023–2024 <span>·</span> <a href="#">Privacy</a> <span>·</span> <a href="#">Terms</a></p>
    </footer>
    <script>
        $(document).ready(function() {
            $('#fetch-data').on('click', function() {
                // Make AJAX request to fetch data
                $.ajax({
                    url: 'index.php',
                    type: 'GET',
                    dataType: 'json',
                    success: function(data) {
                        console.log(data); // Log the response to the console for debugging
                        var gridContainer = $('.grid-container');
                        gridContainer.empty();
                        $.each(data, function(key, value) {
                            var gridItem = $('<div class="grid-item"></div>');
                            var link = $('<a href="' + value.name.toLowerCase() + '.html"></a>');
                            var img = $('<img src="images/' + value.name.toLowerCase() + '-svgrepo-com.svg" alt="' + value.name + ' icon">');
                            link.append(img);
                            gridItem.append(link);
                            gridContainer.append(gridItem);
                        });
                    },
                    error: function(xhr, status, error) {
                        console.error('AJAX request failed:', error);
                    }
                });
            });
        });
    </script>
</body>

</html>