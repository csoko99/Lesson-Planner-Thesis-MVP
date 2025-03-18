<?php
require_once __DIR__ . '/../models/TantargyakModel.php';

class TantargyakController {
    private $model;

    public function __construct($db) {
        $this->model = new TantargyakModel($db);
    }

    public function getTantargyak() {
        return $this->model->getTantargyak();
    }
}
?>