<?php
class Product {
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }
    public function search($query, $category, $color, $type, $priceRange) {
      
        $sql = "SELECT * FROM products WHERE name LIKE ?";
        
        $params = ["%$query%"];
        $types = 's'; 
    
        if ($category) {
            $sql .= " AND category=?";
            $params[] = $category;
            $types .= 's'; 
        }
    
        if ($color) {
            $sql .= " AND color=?";
            $params[] = $color;
            $types .= 's';
        }
    
        if ($type) {
            $sql .= " AND type=?";
            $params[] = $type;
            $types .= 's'; 
        }
    
        if ($priceRange) {

          
            $sql .= " AND price BETWEEN ? AND ?";
            $params[] = 0;
            $params[] = $priceRange;
            $types .= 'dd';
        }
  
        $stmt = $this->conn->prepare($sql);
        
        $stmt->bind_param($types, ...$params);
        
        $stmt->execute();

        $result = $stmt->get_result();
        $products = [];
        

        while ($row = $result->fetch_assoc()) {
            $products[] = $row;
        }
    
        return $products;
    }
    
    public function getAllProducts() {
        $stmt = $this->conn->prepare("SELECT * FROM products");
        $stmt->execute();
        $result = $stmt->get_result();

        $products = [];
        while ($row = $result->fetch_assoc()) {
            $products[] = $row;
        }

        return $products;
    }
}
?>
