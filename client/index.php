<?php
require_once 'config/database.php';
require_once 'controller/productController.php';
require_once 'controller/cartController.php';

$db = require 'config/database.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action'])) {

    $action = $_GET['action'];
    $productController = new ProductController($db);
    $cartController = new CartController($db);


    $cartController = new CartController($db);

    if ($action === 'addToCart') {

        $cartController->addToCart();
    }

    if ($action === 'search') {
   
        $productController->search();
    } elseif ($action === 'listProducts') {
        $productController->listProducts();
    } elseif ($action === 'viewCart') {
        $cartController->viewCart();
    }elseif ($action === 'removeFromCart') {
        $cartController->removeFromCart();
    }elseif ($action === 'updateQuantity') {
        $cartController->updateQuantity();
    }
} elseif (isset($_GET['action']) && $_GET['action'] === 'addToCart') {

    $action = $_GET['action'];
    $cartController = new CartController($db);
    file_put_contents("out.txt" , "merde");
    if ($action === 'addToCart') {

        file_put_contents("hello.txt" , "merde");
        $cartController->addToCart();
    }
}
 else {
    $productController = new ProductController($db);
    $productController->listProducts();
}
?>
