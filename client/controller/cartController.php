<?php
require_once 'config/database.php';
require_once 'model/cart.php';

class CartController {
    private $cartModel;

    public function __construct($db) {
        $this->cartModel = new Cart($db);
    }
    public function addToCart() {
        if ($_SERVER['REQUEST_METHOD'] === 'GET') {
           
       
            $user_id = $_GET['user_id'];
            $product_id = $_GET['product_id'];
            $quantity = $_GET['quantity'];
            
            $this->cartModel->addToCart($user_id, $product_id, $quantity);
            
        }
    }
    

    public function viewCart() {
        $user_id = $_GET['user_id']; 
        $cartItems = $this->cartModel->getCartItems($user_id);
        header('Content-Type: application/json');
        echo json_encode($cartItems);
       
    }
    public function  removeFromCart() {
        $productid = $_GET['productId']; 
       $this->cartModel->removeFromCart($productid);
       
       
    }

    public function  updateQuantity() {
        $productid = $_GET['productId']; 
        $value = $_GET['value']; 
       $this->cartModel->updateQuantity($productid  , $value);
       
       
    }
    
   
}
?>
