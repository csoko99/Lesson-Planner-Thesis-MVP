<?php
class TantargyakModel {
    private $db;

    public function __construct($db) {
        $this->db = $db;
    }

    public function getTantargyak() {
        $query = "SELECT targy_id, targy_nev FROM tantargyak";
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
?>