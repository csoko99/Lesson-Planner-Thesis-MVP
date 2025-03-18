<?php
class TkFeladatokModel {
    private $db;

    public function __construct($db) {
        $this->db = $db;
    }

    public function getTankonyviFeladatok($tk_id, $tema_id, $celok) {
        $query = "SELECT * FROM tankonyvi_feladatok 
                  WHERE f_tk_id = :tk_id 
                  AND f_tema_id = :tema_id 
                  AND f_didaktikai_cel_id IN (" . implode(",", $celok) . ")";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(":tk_id", $tk_id);
        $stmt->bindParam(":tema_id", $tema_id);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    public function getAvailableTasks($tk_id, $tema_id, $excluded_ids) {
        $query = "SELECT * FROM tankonyvi_feladatok 
                  WHERE f_tk_id = :tk_id 
                  AND f_tema_id = :tema_id";
        
        if (!empty($excluded_ids)) {
            $placeholders = array_map(function($key) {
                return ":excluded_id_" . $key;
            }, array_keys($excluded_ids));
            
            $query .= " AND f_id NOT IN (" . implode(",", $placeholders) . ")";
        }
        
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(":tk_id", $tk_id);
        $stmt->bindParam(":tema_id", $tema_id);
        foreach ($excluded_ids as $key => $id) {
            $stmt->bindValue(":excluded_id_" . $key, $id);
        }
        
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
?>