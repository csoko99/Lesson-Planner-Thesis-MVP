<?php
require_once __DIR__ . '/../models/CelokModel.php';

class CelokController {
    private $model;

    public function __construct($db) {
        $this->model = new CelokModel($db);
    }

    public function getCelok() {
        return $this->model->getCelok();
    }
}
?>
