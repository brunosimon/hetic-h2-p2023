<?php

    include './includes/config.php';

    $usersContent = file_get_contents('./includes/users.json');
    $users = json_decode($usersContent);

    $user = $users[$_GET['id']];

    include './partials/header.php';
?>

<table>
    <tr>
        <td>Prénom</td>
        <td><?= $user->first_name ?></td>
    </tr>
    <tr>
        <td>Nom</td>
        <td><?= $user->last_name ?></td>
    </tr>
    <tr>
        <td>Date de naissance</td>
        <td><?= date('d/m/Y', $user->date_of_birth) ?></td>
    </tr>
    <tr>
        <td>Genre</td>
        <td><?= $user->gender === 'f' ? 'femelle' : 'mâle' ?></td>
    </tr>
    <tr>
        <td>Marrié</td>
        <td><?= $user->married ? 'oui' : 'non' ?></td>
    </tr>
    <tr>
        <td>Taille</td>
        <td><?= $user->height ?>cm</td>
    </tr>
    <tr>
        <td>Poids</td>
        <td><?= $user->weight ?>kg</td>
    </tr>
    <tr>
        <td>Type</td>
        <td><?= $user_types[$user->typeId] ?></td>
    </tr>
    <tr>
        <td>Image</td>
        <td><img src="<?= $user->image ?>"></td>
    </tr>
</table>

<?php
    include './partials/footer.php';
?>