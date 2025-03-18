<?php
class TemakModel {
    private $db;

    public function __construct($db) {
        $this->db = $db;
    }

    public function getTemakByTankonyv($tk_id) {
        $query = "SELECT t.tema_id, t.tema_nev
        FROM lali.temak t
        JOIN lali.tk_tema_kapcsolo k ON t.tema_id = k.kapcsolo_tema_id
        WHERE k.kapcsolo_tk_id = :tk_id;";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(":tk_id", $tk_id);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
?>