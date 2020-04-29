<?php

    require './includes/articles.php';

    $id = $_GET['id'];
    $article = $articles[$id];

    $title = $article['title'].' - Blog';
    include './includes/header.php';

?>
    <img src="<?php echo $article['image']; ?>">
    <h2><?php echo $article['title']; ?></h2>
    <small><?php echo $article['author']; ?></small>
    -
    <small><?php echo date('d/m/Y H:i', $article['date']); ?></small>
    <p><?php echo $article['description']; ?></p>
    <p><?php echo $article['content']; ?></p>
    
<?php include './includes/footer.php'; ?>