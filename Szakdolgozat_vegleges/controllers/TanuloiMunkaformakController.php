<?php
require_once __DIR__ . '/../models/TanuloiMunkaformakModel.php';

class TanuloiMunkaformakController {
    private $model;

    public function __construct($db) {
        $this->model = new TanuloiMunkaformakModel($db);
    }

    public function getTanuloiMunkaformak() {
        return $this->model->getTanuloiMunkaformak();
    }
}
?>