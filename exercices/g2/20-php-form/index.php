<?php

    include_once './config.php';
    include './form-handler.php';

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHP Form</title>
    <link rel="stylesheet" href="./style.css">
</head>
<body>
    <h1>Form</h1>

    <!-- Messages -->
    <?php foreach($errorMessages as $_message): ?>
        <div class="message error"><?= $_message ?></div>
    <?php endforeach ?>
    <?php foreach($successMessages as $_message): ?>
        <div class="message success"><?= $_message ?></div>
    <?php endforeach ?>

    <!-- Form -->
    <form action="#" method="post">

        <!-- Login -->
        <fieldset>
            <label for="login">Login</label>
            <br>
            <input id="login" type="text" name="login" value="<?= $login ?>">
        </fieldset>
        
        <!-- Password -->
        <fieldset>
            <label for="password">Password</label>
            <br>
            <input id="password" type="password" name="password">
        </fieldset>
        
        <!-- Age -->
        <fieldset>
            <label for="age">Age</label>
            <br>
            <input id="age" type="text" name="age" value="<?= $age ?>">
        </fieldset>
        
        <!-- Gender -->
        <fieldset>
            <label>Gender</label>
            <?php foreach($genders as $_gender): ?>
                <br>
                <label>
                    <input
                        type="radio"
                        name="gender"
                        value="<?= $_gender ?>"
                        <?= $_gender === $gender ? 'checked' : '' ?>
                    >
                    <?= ucfirst($_gender) ?>
                </label>
            <?php endforeach ?>
        </fieldset>

        <!-- Submit -->
        <fieldset>
            <input type="submit">
        </fieldset>

    </form>

</body>
</html>