<?php
class CelokModel {
    private $db;

    public function __construct($db) {
        $this->db = $db;
    }

    public function getCelok() {
        $query = "SELECT * FROM celok WHERE cel_targy_id IS NULL";
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
?>
