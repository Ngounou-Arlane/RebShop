<?php
class Cart {
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function addToCart($user_id, $product_id, $quantity) {
        $stmt = $this->conn->prepare("INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)");
        $stmt->bind_param("iii", $user_id, $product_id, $quantity);
        return $stmt->execute();
    }

    public function getCartItems($user_id) {
        $stmt = $this->conn->prepare("SELECT cart.id , cart.quantity, products.name, products.image, products.price FROM cart JOIN products ON cart.product_id = products.id WHERE cart.user_id = ?");
        $stmt->bind_param("i", $user_id);
        $stmt->execute();
        $result = $stmt->get_result();

        $cartItems = [];
        while ($row = $result->fetch_assoc()) {
            $cartItems[] = $row;
        }

        return $cartItems;
    }


    public function removeFromCart($productid) {
        $stmt = $this->conn->prepare("DELETE FROM cart WHERE id = ?");
        if ($stmt) {
            $stmt->bind_param("i", $productid);
            
            if ($stmt->execute()) {
                echo "Product deleted successfully.";
            } else {
                echo "Error deleting product: " . $stmt->error;
            }
            
            $stmt->close(); // Close the statement
        } else {
            echo "Error preparing statement: " . $this->conn->error;
        }
    }        

    public function updateQuantity($productid , $value) {
        $stmt = $this->conn->prepare("update cart set quantity= ? WHERE id = ? ");
        if ($stmt) {
            $stmt->bind_param("ii", $value ,$productid );
            
            if ($stmt->execute()) {
                echo "Product updated successfully.";
            } else {
                echo "Error updating product: " . $stmt->error;
            }
            
            $stmt->close(); // Close the statement
        } else {
            echo "Error preparing statement: " . $this->conn->error;
        }
    }        


    
    
}
?>
