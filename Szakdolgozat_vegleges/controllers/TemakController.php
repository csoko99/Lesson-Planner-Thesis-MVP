<?php
require_once __DIR__ . '/../models/TemakModel.php';

class TemakController {
    private $model;

    public function __construct($db) {
        $this->model = new TemakModel($db);
    }

    public function getTemakByTankonyv($tk_id) {
        return $this->model->getTemakByTankonyv($tk_id);
    }
}
?>