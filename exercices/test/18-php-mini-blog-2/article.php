<?php

    require './includes/config.php';
    require './includes/articles.php';

    $article = $articles[$_GET['id']];

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Article</title>
</head>
<body>
    <h1><a href="/">Mini Blog</a></h1>
    <h3><?php echo $article['title']; ?></h3>
    <small><?php echo $article['author']; ?></small>
    <p><?php echo $article['description']; ?></p>
    <img src="<?php echo $article['image']; ?>">
    <p><?php echo $article['content']; ?></p>
</body>
</html>