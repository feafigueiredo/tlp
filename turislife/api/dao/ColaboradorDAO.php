<?php

include_once $_SERVER['DOCUMENT_ROOT'].'/turislife/api/config/Database.php';
include_once $_SERVER['DOCUMENT_ROOT'].'/turislife/api/model/Colaborador.php';

class ColaboradorDAO{
      
    // database connection and table name
    private $conn;
    private $table_name = "Colaborador";

    public $list;
    public $colaborador;
    
    // constructor with $db as database connection
    public function __construct($db){
    	// get database connection
    	$database = new Database();
        $this->conn = $database->getConnection();
    }
    
    public function get(){
    	
    	$colab = $this->colaborador;
    	
    	$query = "SELECT id, nome, foto, resumo FROM $this->table_name";
    	if($colab->id != null){
    		$query = $query . " WHERE id = '$colab->id'";
    	}
    	
    	if(!$rs = $this->conn->query($query)){
    		return false;
    	}
    	
    	$this->list = array();

    	$newColab = new Colaborador();
    	foreach ($rs as $dados){

    		$newColab->id     = utf8_encode($dados["id"]);
    		$newColab->nome   = utf8_encode($dados["nome"]);
    		$newColab->foto   = utf8_encode($dados["foto"]);
    		$newColab->resumo = utf8_encode($dados["resumo"]);
    		
    	}
    	
    	return $newColab;
    }
}
?>