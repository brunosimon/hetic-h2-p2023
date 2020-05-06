<?php

    include './config.php';
    include './form-handler.php';

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHP Form</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Form</h1>

    <?php foreach($errorMessages as $_message): ?>
        <div class="message error"><?= $_message ?></div>
    <?php endforeach; ?>

    <?php foreach($successMessages as $_message): ?>
        <div class="message success"><?= $_message ?></div>
    <?php endforeach; ?>

    <form action="#" method="post">
        <fieldset>
            <label for="login">Login</label>
            <br>
            <input type="text" name="login" id="login" placeholder="totoDu93">
        </fieldset>
        
        <fieldset>
            <label for="password">Password</label>
            <br>
            <input type="text" name="password" id="password" placeholder="*******">
        </fieldset>
        
        <fieldset>
            <label for="age">Age</label>
            <br>
            <input type="text" name="age" id="age" placeholder="25">
        </fieldset>

        <fieldset>
            <label for="gender">Gender</label>
            <br>
            <?php foreach($genders as $_gender): ?>
                <br>
                <input id="gender-<?= $_gender ?>" name="gender" type="radio" value="<?= $_gender ?>">
                <label for="gender-<?= $_gender ?>"><?= ucfirst($_gender) ?></label>
            <?php endforeach; ?>
        </fieldset>

        <fieldset>
            <input type="submit">
        </fieldset>
    </form>
</body>
</html>