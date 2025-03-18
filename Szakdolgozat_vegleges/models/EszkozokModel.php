<?php
class EszkozokModel {
    private $db;

    public function __construct($db) {
        $this->db = $db;
    }

    public function getEszkozok() {
        $query = "SELECT eszkoz_id, eszkoz_nev FROM eszkozok";
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
?>