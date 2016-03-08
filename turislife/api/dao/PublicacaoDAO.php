<?php

include_once $_SERVER['DOCUMENT_ROOT'].'/turislife/api/config/Database.php';
include_once $_SERVER['DOCUMENT_ROOT'].'/turislife/api/model/Publicacao.php';
include_once $_SERVER['DOCUMENT_ROOT'].'/turislife/api/model/Colaborador.php';
include_once $_SERVER['DOCUMENT_ROOT'].'/turislife/api/dao/ColaboradorDAO.php';

class PublicacaoDAO{
      
    // database connection and table name
    private $conn;
    private $table_name = "Publicacao";

    public $list;
    public $publicacao;
    
    // constructor with $db as database connection
    public function __construct($db){
    	// get database connection
    	$database = new Database();
        $this->conn = $database->getConnection();
    }
    
    public function insert(){
    	 
    	$user = $this->publicacao;
    	
    	// query to insert record
    	$query = "INSERT INTO $this->table_name
            SET
    			codigo=:codigo, 
    			usuario=:nome,
    			pontos=0";
    	 
    	// prepare query
    	$stmt = $this->conn->prepare($query);
    
    	// bind values
    	$stmt->bindParam(":codigo", $user->id);
    	$stmt->bindParam(":nome", $user->user);
    	 
    	// execute query
    	if($stmt->execute()){
    		return true;
    	}else{
    		$arr = $stmt->errorInfo();
    		
    		foreach ($arr as $line){
	    		error_log($line);
    		}
    		return false;
    	}
    }
    
    public function get(){
    	
    	$pub = $this->publicacao;
    	
    	$query = "SELECT id, nome, data, area, autor, resumo FROM $this->table_name";
    	if($user->user != null){
    		$query = $query . " WHERE area like '%$pub->area%'";
    	}
    	
    	if(!$rs = $this->conn->query($query)){
    		return false;
    	}
    	
    	$this->list = array();

    	foreach ($rs as $dados){
    		$newPub = new Publicacao();

    		$newPub->id     = $dados[id];
    		$newPub->nome   = $dados[nome];
    		$newPub->data   = $dados[data];
    		$newPub->area   = $dados[area];
    		$newPub->resumo = $dados[resumo];
    		
    		$colabDAO = new ColaboradorDAO($this->conn);
    		$colab = new Colaborador();
    		$colab->id = $dados[autor];
    		
    		$newPub->autor = $colabDAO->get();
    		
    		array_push($this->list, $newPub);
    	}
    	
    	return true;
    }
    
    public function login(){
    	$user = $this->publicacao;
    	 
    	$query = "UPDATE $this->table_name SET points=(points + 1) WHERE codigo=:codigo";
    	
    	// prepare query
    	$stmt = $this->conn->prepare($query);
    	
    	// bind values
    	$stmt->bindParam(":codigo", $user->id);
    	 
    	if(!$rs = $this->conn->query($query)){
    		return false;
    	}
    	return true;
    }
}
?>