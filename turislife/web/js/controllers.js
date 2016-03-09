/* HOME */
app.controller('HomeCtrl', ['$rootScope', '$scope', '$location', '$routeParams', 'PublicacaoService',
    function($rootScope, $scope, $location, $routeParams, PublicacaoService){
		$rootScope.activetab = $location.path();
		
		var area = "";
		var page = 1;
		console.log("Path: " + $location.path());
		if("/" != $location.path()){	
			console.log("Area: " + $routeParams.area);
			switch($routeParams.area){
				case "estabelecimentos":
				case "trabalho":
				case "lugares":
					area = $routeParams.area;
					if($routeParams.page != null) page = $routeParams.page;
					break;
				default: $location.path('/404');
			}
		}

		console.log("Chamando servico com parametros:");
		console.log("area: " + area);
		console.log("page: " + page);
		PublicacaoService.getPublicacoes(area, page).then(function(resp){
			$scope.posts = resp;
		});
	}
]);

/* LUGARES */
app.controller('LugaresCtrl', ['$rootScope', '$scope', '$location',
    function($rootScope, $scope, $location){
		$rootScope.activetab = $location.path();
	}
]);

/* ESTABELECIMENTOS */
app.controller('EstabelecimentosCtrl', ['$rootScope', '$scope', '$location',
    function($rootScope, $scope, $location){
		$rootScope.activetab = $location.path();
	}
]);

/* TRABALHO */
app.controller('TrabalhoCtrl', ['$rootScope', '$scope', '$location',
    function($rootScope, $scope, $location){
		$rootScope.activetab = $location.path();     
	}
]);

/* PUBLICACAO */
app.controller('PublicacaoCtrl', ['$rootScope', '$scope', '$location', '$routeParams', '$window', 'PublicacaoService',
    function($rootScope, $scope, $location, $routeParams, $window, PublicacaoService){
		$rootScope.activetab = $location.path();   
		
		PublicacaoService.getPublicacao($routeParams.id).then(function(resp){
			$scope.post = resp;
			console.log($scope.post);
		},
		function(error){
			$location.path("/404");
		});
		$window.page_id = $routeParams.id;
		
	}
]);

/* PublicarCtrl */
app.controller('PublicarCtrl', ['$rootScope', '$scope', '$location', '$routeParams', '$window', 'PublicacaoService',
  function($rootScope, $scope, $location, $routeParams, $window, PublicacaoService){
	$rootScope.activetab = $location.path();   
	var scope = $scope;
	
	$scope.func = function(){
		scope.nome = scope.titulo.toLowerCase().split(" ").join("-");
		scope.nome = scope.nome.split("á").join("a");
		
		scope.nome = scope.nome.split("à").join("a");
		scope.nome = scope.nome.split("é").join("e");
		scope.nome = scope.nome.split("í").join("i");
		scope.nome = scope.nome.split("ó").join("o");
		scope.nome = scope.nome.split("ú").join("u");
		
		scope.nome = scope.nome.split("â").join("a");
		scope.nome = scope.nome.split("ê").join("e");
		scope.nome = scope.nome.split("î").join("i");
		scope.nome = scope.nome.split("ô").join("o");
		scope.nome = scope.nome.split("û").join("u");

		scope.nome = scope.nome.split("ã").join("a");
		scope.nome = scope.nome.split("õ").join("o");
		
		scope.nome = scope.nome.split("ç").join("c");
	}
  }	
]);

app.service('PublicacaoService', ['$http', function($http){
	var baseUrl = "/api/publicacoes/";

	this.getPublicacao = function(id){
		return $http.get(baseUrl + "/" + id)
	    	.then(function(response) {
	    		return response.data;
	        });
	}
	
	this.getPublicacoes = function(area, page){
		console.log("Dentro do servico com parametros:");
		console.log("area: " + area);
		console.log("page: " + page);
		var thisUrl = this.createUrl(area, page);
		console.log("URL criada: " + thisUrl);
		return $http.get(thisUrl)
	    	.then(function(response) {
	    		return response.data;
	        });
	};
	
	this.createUrl = function(area, page){
		console.log("Criando URL:");
		console.log("area: " + area);
		console.log("page: " + page);
		if(page === null) page = 1;
		if(area === "") return baseUrl + page + "/";
		
		return baseUrl + area + "/" + page + "/";
	}
	
}]);