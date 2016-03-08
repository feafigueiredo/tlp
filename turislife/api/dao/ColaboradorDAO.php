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

    		$newColab->id     = $dados[id];
    		$newColab->nome   = $dados[nome];
    		$newColab->foto   = $dados[foto];
    		$newColab->resumo = $dados[resumo];
    		
    	}
    	
    	return $newColab;
    }
}
?>