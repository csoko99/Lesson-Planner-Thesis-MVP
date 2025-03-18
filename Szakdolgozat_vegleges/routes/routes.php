<?php
 
require_once __DIR__ . '/../controllers/TantargyakController.php';
require_once __DIR__ . '/../controllers/TankonyvekController.php';
require_once __DIR__ . '/../controllers/TemakController.php';
require_once __DIR__ . '/../controllers/CelokController.php';
require_once __DIR__ . '/../controllers/DidaktikaiFeladatokController.php';
require_once __DIR__ . '/../controllers/TkFeladatokController.php'; 
require_once __DIR__ . '/../controllers/ModszerekController.php'; 
require_once __DIR__ . '/../controllers/TanuloiMunkaformakController.php'; 
require_once __DIR__ . '/../controllers/EszkozokController.php'; 
require_once __DIR__ . '/../views/Database.php';

error_reporting(E_ALL);
ini_set('display_errors', 1);

$database = new Database();
$db = $database->getConnection();

$tantargyakController = new TantargyakController($db);
$tankonyvekController = new TankonyvekController($db);
$temakController = new TemakController($db);
$celokController = new CelokController($db);
$didacticTasksController = new DidacticTasksController($db);
$tkFeladatokController = new TkFeladatokController($db); 
$modszerekController = new ModszerekController($db); 
$tanuloiMunkaformakController = new TanuloiMunkaformakController($db); 
$eszkozokController = new EszkozokController($db); 

if (isset($_GET['action'])) {
    $action = $_GET['action'];
    if ($action === 'getTantargyak') {
        echo json_encode($tantargyakController->getTantargyak());
    } elseif ($action === 'getTankonyvek' && isset($_GET['targy_id'])) {
        echo json_encode($tankonyvekController->getTankonyvekByTargyId($_GET['targy_id']));
    } elseif ($action === 'getTemakByTankonyv' && isset($_GET['tk_id'])) {
        echo json_encode($temakController->getTemakByTankonyv($_GET['tk_id']));
    } elseif ($action === 'getTanuloiMunkaformak') {
        echo json_encode($tanuloiMunkaformakController->getTanuloiMunkaformak());
    } elseif ($action === 'getModszerek') {
        echo json_encode($modszerekController->getModszerek());
    } elseif ($action === 'getCelok') {
        echo json_encode($celokController->getCelok());
    } elseif ($action === 'getEszkozok') {
        echo json_encode($eszkozokController->getEszkozok());
    } elseif ($action === 'getAvailableTasks' && isset($_GET['tk_id']) && isset($_GET['tema_id']) && isset($_GET['excluded_ids'])) {
        $tk_id = $_GET['tk_id'];
        $tema_id = $_GET['tema_id'];
        $excluded_ids = explode(",", $_GET['excluded_ids']);
        $result = $tkFeladatokController->getAvailableTasks($tk_id, $tema_id, $excluded_ids);
        echo json_encode($result);
    }elseif ($action === 'getDidacticTasks') {
        echo json_encode($didacticTasksController->getDidacticTasks());
    } elseif ($action === 'getTankonyvAdatok' && isset($_GET['tk_id'])) {
        $result = $tankonyvekController->getTankonyvAdatok($_GET['tk_id']);
        if ($result) {
            echo json_encode($result);
        } else {
            http_response_code(404);  
            echo json_encode(["error" => "A tankönyv nem található."]);
        }
    } elseif ($action === 'getTankonyviFeladatok' && isset($_GET['tk_id']) && isset($_GET['tema_id']) && isset($_GET['celok'])) {
        $tk_id = $_GET['tk_id'];
        $tema_id = $_GET['tema_id'];
        $celok = explode(",", $_GET['celok']);
        $result = $tkFeladatokController->getTankonyviFeladatok($tk_id, $tema_id, $celok);
        if ($result) {
            echo json_encode($result);
        } else {
            http_response_code(404);  
            echo json_encode(["error" => "Nincsenek feladatok a megadott feltételek alapján."]);
        }
    } else {
        http_response_code(400);  
        echo json_encode(["error" => "Érvénytelen művelet."]);
    }
} else {
    http_response_code(400);  
    echo json_encode(["error" => "Nincs művelet megadva."]);
}
?>