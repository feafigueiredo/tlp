/* HOME */
app.controller('HomeCtrl', ['$rootScope', '$scope', '$location', '$routeParams', 'PublicacaoService',
    function($rootScope, $scope, $location, $routeParams, PublicacaoService){
		$rootScope.activetab = $location.path();
		
		var area = "";
		var page = 1;
		console.log("Path: " + $location.path());
		if("/" != $location.path()){	
			switch($routeParams.area){
				case "estudar-turismo":
				case "pe-na-estrada":
				case "turismo-em-casa":
				case "profissional":
					area = $routeParams.area;
					if($routeParams.page != null) page = $routeParams.page;
					break;
				default: $location.path('/404');
			}
		}

		PublicacaoService.getPublicacoes(area, page).then(function(resp){
			$scope.posts = resp;
		});
	}
]);

/* PUBLICACAO */
app.controller('PublicacaoCtrl', ['$rootScope', '$scope', '$location', '$routeParams', '$window', '$sce', 'PublicacaoService',
    function($rootScope, $scope, $location, $routeParams, $window, $sce, PublicacaoService){
		$rootScope.activetab = $location.path();   
		$window.disqusLoaded = true;
		
		PublicacaoService.getPublicacao($routeParams.id).then(function(resp){
			$scope.post = resp[0];
			$scope.post.texto = $sce.trustAsHtml($scope.post.texto);
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
		var thisUrl = "/api/post/" + id + "/";
		return this.exec(thisUrl);
	};
	
	this.getPublicacoes = function(area, page){
		var thisUrl = this.createUrl(area, page);
		return this.exec(thisUrl);
	};
	
	this.exec = function(url){
		console.log("Calling: " + url);
		return $http.get(url).then(function(response) {
    		return response.data;
        });
	};
	
	this.createUrl = function(area, page){
		if(page === null) page = 1;
		if(area === "") return baseUrl + page + "/";
		
		return baseUrl + area + "/" + page + "/";
	};
	
}]);