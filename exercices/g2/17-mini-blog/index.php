<?php

    $articlesFile = file_get_contents('./articles.json');
    $articles = json_decode($articlesFile);

    echo '<pre>';
    print_r($articles);
    echo '</pre>';