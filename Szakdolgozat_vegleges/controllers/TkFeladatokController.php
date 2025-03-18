<?php
require_once __DIR__ . '/../models/TkFeladatokModel.php';

class TkFeladatokController {
    private $model;

    public function __construct($db) {
        $this->model = new TkFeladatokModel($db);
    }

    public function getTankonyviFeladatok($tk_id, $tema_id, $celok) {
        return $this->model->getTankonyviFeladatok($tk_id, $tema_id, $celok);
    }
    public function getAvailableTasks($tk_id, $tema_id, $excluded_ids) {
        return $this->model->getAvailableTasks($tk_id, $tema_id, $excluded_ids);
    }
}
?>