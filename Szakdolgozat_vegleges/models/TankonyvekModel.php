<?php
class TankonyvekModel {
    private $db;

    public function __construct($db) {
        $this->db = $db;
    }

    public function getTankonyvekByTargyId($targy_id) {
        $query = "SELECT tk_id, tk_cim, tk_evfolyam FROM tankonyvek_uj WHERE tk_targy_id = :targy_id";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':targy_id', $targy_id, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
?>
