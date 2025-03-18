<?php
class TanuloiMunkaformakModel {
    private $db;

    public function __construct($db) {
        $this->db = $db;
    }

    public function getTanuloiMunkaformak() {
        $query = "SELECT munkf_id, munkf_nev FROM munkaformak";
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
?>