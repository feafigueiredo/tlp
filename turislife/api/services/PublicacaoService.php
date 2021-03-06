<?php

// instantiate dao object
include_once $_SERVER['DOCUMENT_ROOT'].'/turislife/api/config/Database.php';
$db = new Database();

// instantiate dao object
include_once $_SERVER['DOCUMENT_ROOT'].'/turislife/api/dao/PublicacaoDAO.php';
$dao = new PublicacaoDAO($db);

include_once $_SERVER['DOCUMENT_ROOT'].'/turislife/api/model/Publicacao.php';
$pub = new Publicacao();


error_log( "########## Publicacao Service ##########");

switch($_SERVER['REQUEST_METHOD']){
	case 'POST':
		// get posted data
// 		$json = file_get_contents("php://input");
// 		error_log( "POST:");

// 		$obj = json_decode($json);

// 		$jwt = new JWT($obj->token);

// 		if($jwt->id == null){
// 			error_log( "Unable to create user." );
// 			http_response_code(403);
// 			die();
// 		}

// 		error_log("  ID: $jwt->id\nUser: $jwt->user");

// 		$user->id = $jwt->id;
// 		$user->user = $jwt->user;
// 		$user->points = 0;
// 		$userDao->userData = $user;

// 		// create the product
// 		if($userDao->insert()){
// 			error_log(  "User was created." );
// 			http_response_code(200);
// 		}
// 		// if unable to create the product, tell the user
// 		else{
// 			if($userDao->login()){
// 				error_log(  "User has logged in." );
// 				http_response_code(200);
// 			}else{
// 				error_log( "Unable to create user." );
// 				http_response_code(403);
// 			}
// 		}
		break;// POST

	case 'GET':
		error_log("GET");
		$json = file_get_contents("php://input");
		$obj = json_decode($json);
		
		if(isset($_GET['id'])) {
			$pub->nome = $_GET["id"];
		}
		if(isset($_GET['area'])) {
			$pub->area = $_GET["area"];
		}
		if(isset($_GET['page'])) {
			$pub->pag = $_GET["page"];
		}
		
		error_log("(#)Publicacao(#)");
		error_log("Nome: $pub->nome");
		error_log("Area: $pub->area");
		error_log(" Pag: $pub->pag");
		$dao->publicacao = $pub;

		if($dao->get()){
			error_log("Retornando a lista.");
			error_log($dao->list[0]->img);
			echo json_encode($dao->list);
			break; // GET
		}

	default:
		error_log( "Solicitacao invalida." );
		http_response_code(404);

}

?>