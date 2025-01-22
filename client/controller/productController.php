<?php
require_once 'config/database.php';
require_once 'model/product.php';

class ProductController {
    private $productModel;

    public function __construct($db) {
        $this->productModel = new Product($db);
    }

    public function search() {
        $query = $_GET['query'] ?? '';
        $category = $_GET['category'] ?? '';
        $color = $_GET['color'] ?? '';
        $type = $_GET['type'] ?? '';
        $priceRange = $_GET['priceRange'] ?? '';

        $products = $this->productModel->search($query, $category, $color, $type, $priceRange);
        header('Content-Type: application/json');
        echo json_encode($products);
    }

    public function listProducts() {
        $products = $this->productModel->getAllProducts();
      
        include 'view/page/product_index.php';
    }
}
?>
