<?php
class ModszerekModel {
    private $db;

    public function __construct($db) {
        $this->db = $db;
    }

    public function getModszerek() {
        $query = "SELECT modszer_id, modszer_nev FROM modszerek";
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
?>