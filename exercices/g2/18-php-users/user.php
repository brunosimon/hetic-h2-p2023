<?php

    // Config
    include './includes/config.php';

    // Fetch users
    $usersContents = file_get_contents('./includes/users.json');
    $users = json_decode($usersContents);
    $user = $users[$_GET['id']];

    echo '<pre>';
    print_r($user);
    echo '</pre>';

    // Header
    include './includes/header.php';

?>

<table>
    <tr>
        <th>Prénom</th>
        <td><?= $user->first_name ?></td>
    </tr>
    <tr>
        <th>Nom</th>
        <td><?= $user->last_name ?></td>
    </tr>
    <tr>
        <th>Date de naissance</th>
        <td><?= date('d/m/Y', $user->date_of_birth) ?></td>
    </tr>
    <tr>
        <th>Genre</th>
        <td><?= $user->gender === 'f' ? 'Femme' : 'Homme' ?></td>
    </tr>
    <tr>
        <th><?= $user->gender === 'f' ? 'Mariée' : 'Marié' ?></th>
        <td><?= $user->married ? 'Oui' : 'Non' ?></td>
    </tr>
    <tr>
        <th>Taille</th>
        <td><?= $user->height ?>cm</td>
    </tr>
    <tr>
        <th>Poids</th>
        <td><?= $user->gender === 'm' ? "{$user->weight}kg" : '???' ?></td>
    </tr>
    <tr>
        <th>Type</th>
        <td><?= $userTypes[$user->typeId] ?></td>
    </tr>
    <tr>
        <th>Image</th>
        <td>
            <img
                src="<?= $user->image ?>"
                alt="<?= "$user->first_name $user->last_name" ?>"
            >
        </td>
    </tr>
</table>

<?php

    include './includes/footer.php';

?>
