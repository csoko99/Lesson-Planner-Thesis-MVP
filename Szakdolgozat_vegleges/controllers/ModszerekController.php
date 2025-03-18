<?php
    require_once __DIR__ . '/../models/ModszerekModel.php';

    class ModszerekController {
        private $model;

        public function __construct($db) {
            $this->model = new ModszerekModel($db);
        }

        public function getModszerek() {
            return $this->model->getModszerek();
        }
    }
?>