<?php

    include './config.php';

    // City
    $city = 'Paris';

    if(!empty($_GET['city']))
    {
        $city = $_GET['city'];
    }

    // Fetch weather data
    $url = 'https://api.openweathermap.org/data/2.5/weather?q='.$city.'&units=metric&appid='.OPEN_WEATHER_MAP_API_KEY;

    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    $data = curl_exec($curl);
    curl_close($curl);
    
    $data = json_decode($data);

    // Static map URL
    if($data->cod === 200)
    {
        $coordinates = $data->coord->lat.','.$data->coord->lon;
        $staticMapUrl = 'https://maps.googleapis.com/maps/api/staticmap?key=AIzaSyB6u8RLqSXjwSCunqI-U9Mzz0s-JYNKWrc&size=300x300&zoom=6&center='.$coordinates.'&markers='.$coordinates;
    }

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

    <section>
        <?php if($data->cod !== 200): ?>
            <h2>Aucune donnée pour <?= $city ?></h2>
        <?php else: ?>
            <h2>Météo pour <?= $city ?></h2>
        <?php endif ?>

        <table>
            <tr>
                <th>Météo</th>
                <td><?= ucfirst($data->weather[0]->description) ?></td>
            </tr>
            <tr>
                <th>Température</th>
                <td><?= $data->main->temp ?>° (ressentie : <?= $data->main->feels_like ?>°, min : <?= $data->main->temp_min ?>°, max : <?= $data->main->temp_max ?>°)</td>
            </tr>
            <tr>
                <th>Pression</th>
                <td><?= $data->main->pressure ?> hPa</td>
            </tr>
            <tr>
                <th>Humidité</th>
                <td><?= $data->main->humidity ?> %</td>
            </tr>
            <tr>
                <th>Vent</th>
                <td><?= $data->wind->speed ?> km/h</td>
            </tr>
        </table>

        <img src="<?= $staticMapUrl ?>" alt="">

    </section>

</body>
</html>