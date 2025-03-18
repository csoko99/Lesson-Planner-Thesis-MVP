<?php
class DidacticTasksModel {
    private $db;

    public function __construct($db) {
        $this->db = $db;
    }

    public function getDidacticTasks() {
        $query = "SELECT didf_id, didf_nev FROM didaktikai_feladatok";
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
?>