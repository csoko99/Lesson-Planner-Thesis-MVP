<?php
    require_once __DIR__ . '/../models/EszkozokModel.php';

    class EszkozokController {
        private $model;

        public function __construct($db) {
            $this->model = new EszkozokModel($db);
        }

        public function getEszkozok() {
            return $this->model->getEszkozok();
        }
    }
?>