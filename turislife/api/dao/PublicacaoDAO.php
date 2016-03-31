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
    	$PUB_PER_PAGE = 10;
    	
    	$pub = $this->publicacao;
    	$inicio = ($pub->pag - 1) * $PUB_PER_PAGE;
    	
    	$query = "SELECT id, nome, data, area, autor, resumo, titulo, img FROM $this->table_name";
    	if($pub->nome != null){
    		$query = $query . " WHERE UPPER(nome) like UPPER('%$pub->nome%')";
    	}else{
	    	if($pub->area != null){
	    		$query = $query . " WHERE area like UPPER('%$pub->area%')";
	    	}
    		
	    	$query = $query . " LIMIT $inicio, $PUB_PER_PAGE";
    	}
    	
    	
    	error_log("# Query: $query");
    	
    	if(!$rs = $this->conn->query($query)){
    		return false;
    	}
    	
    	$this->list = array();

    	$cont = 0;
    	foreach ($rs as $dados){
    		$cont++;
    		error_log("Linha: $cont");
    		$newPub = new Publicacao();
    		
    		$newPub->id     = utf8_encode($dados["id"]);
    		$newPub->nome   = utf8_encode($dados["nome"]);
    		$newPub->data   = utf8_encode($dados["data"]);
    		$newPub->area   = utf8_encode($dados["area"]);
    		$newPub->resumo = utf8_encode($dados["resumo"]);
    		$newPub->titulo = utf8_encode($dados["titulo"]);
    		$newPub->img    = utf8_encode($dados["img"]);
    		
    		$colabDAO = new ColaboradorDAO($this->conn);
    		$colab = new Colaborador();
    		$colab->id = utf8_encode($dados["autor"]);
    		
    		$colabDAO->colaborador = $colab;
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