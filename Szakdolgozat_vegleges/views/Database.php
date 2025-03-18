<?php
class Database {
    private $host = "localhost";
    private $db_name = "lali";
    private $username = "lali_user"; 
    private $password = "CvLEP4O2tn0z3Dub5pzygM5q9p2O5TX0";
    public $conn;

    public function getConnection() {
        $this->conn = null;
        try {
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            $this->conn->exec("set names utf8");
        } catch (PDOException $exception) {
            echo "Adatbázis kapcsolati hiba: " . $exception->getMessage();
        }
        return $this->conn;
    }
}
?>