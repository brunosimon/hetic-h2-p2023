<?php

    $url = 'https://pokeapi.co/api/v2/pokemon?limit=151';
    $data = json_decode(file_get_contents($url));

    echo '<pre>';
    print_r($data);
    echo '</pre>';

    die('ok');

    include './config.php';
    
    // City
    $city = 'Paris';

    if(isset($_GET['city']))
    {
        $city = $_GET['city'];
    }
    
    // Fetch weather data
    $url = 'http://api.openweathermap.org/data/2.5/weather?q='.$city.'&units=metric&appid='.OPEN_WEATHER_MAP_API_KEY;
    $data = @file_get_contents($url);
    $data = json_decode($data);

    // Static map API URL
    if($data)
    {
        $coordinates = $data->coord->lat.','.$data->coord->lon;
        $staticMapAPIURL = "https://maps.googleapis.com/maps/api/staticmap?size=400x400&key=AIzaSyB6u8RLqSXjwSCunqI-U9Mzz0s-JYNKWrc&zoom=6&center=$coordinates&markers=$coordinates";
    }

    // // Debug
    // echo '<pre>';
    // print_r($staticMapAPIURL);
    // echo '</pre>';
    
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Météo des villes</title>
</head>
<body>
    
    <h1>Météo des villes</h1>

    <form action="#" method="get">
        <input type="text" name="city" value="<?= $city ?>">
        <input type="submit">
    </form>

    <?php if($data) { ?>

        <h2>Météo de <?= $city ?></h2>

        <table>
            <tr>
                <th>Tendance</th>
                <td><?= ucfirst($data->weather[0]->description) ?></td>
            </tr>
            <tr>
                <th>Température</th>
                <td><?= $data->main->temp ?>°</td>
            </tr>
            <tr>
                <th>Pression</th>
                <td><?= $data->main->pressure ?>hPa</td>
            </tr>
            <tr>
                <th>Humidité</th>
                <td><?= $data->main->humidity ?>%</td>
            </tr>
            <tr>
                <th>Vent</th>
                <td><?= $data->wind->speed ?>km/h</td>
            </tr>
        </table>

        <img src="<?= $staticMapAPIURL ?>">

    <?php } else { ?>

        <h2>Aucune donnée pour <?= $city ?></h2>

    <?php } ?>

</body>
</html>