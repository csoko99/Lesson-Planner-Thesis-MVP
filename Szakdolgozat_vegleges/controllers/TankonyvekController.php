<?php
require_once __DIR__ . '/../models/TankonyvekModel.php';

class TankonyvekController {
    private $model;
    private $db;

    public function __construct($db) {
        $this->db = $db;
        $this->model = new TankonyvekModel($db);
    }

    public function getTankonyvekByTargyId($targy_id) {
        return $this->model->getTankonyvekByTargyId($targy_id);
    }

    public function getTankonyvAdatok($tk_id) {
        $query = "SELECT tk_cim AS cim, tk_szerzo AS szerzo, tk_kiadas_ev AS kiadas_ev FROM tankonyvek_uj WHERE tk_id = :tk_id";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(":tk_id", $tk_id);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}
?>