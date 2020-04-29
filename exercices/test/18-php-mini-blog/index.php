<?php 

    $articlesContent = file_get_contents('./articles.json');
    $articles = json_decode($articlesContent);

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mini blog</title>
    <style>
        th, td
        {
            padding: 10px;
        }
    </style>
</head>
<body>
    <h1>Mini blog</h1>
    <section>
        <?php foreach($articles as $_article): ?>
            <article>
                <h2><?= $_article->title; ?></h2>
                <h3><?= $_article->description; ?></h3>
                <small><?= $_article->author; ?> - <?= date('Y-m-d H:i:s', $_article->date) ?></small>
                <p><a href="#">Read more</a></p>
            </article>
        <?php endforeach ?>
    </section>
</body>
</html>