<?php
require_once __DIR__ . '/../models/DidaktikaiFeladatokModel.php';

class DidacticTasksController {
    private $model;

    public function __construct($db) {
        $this->model = new DidacticTasksModel($db);
    }

    public function getDidacticTasks() {
        return $this->model->getDidacticTasks();
    }
}
?>