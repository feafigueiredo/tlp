/* HOME */
app.controller('HomeCtrl', ['$rootScope', '$scope', '$location', '$routeParams', 'PublicacaoService',
    function($rootScope, $scope, $location, $routeParams, PublicacaoService){
		$rootScope.activetab = $location.path();
		
		console.log("Path: " + $location.path());
		console.log("Area: " + $routeParams.area);
		switch($routeParams.area){
			case "estabelecimentos":
			case "trabalho":
			case "lugares":
				console.log("Area: " + $routeParams.area);
				console.log("Page: " + $routeParams.page);
				break;
			default $location.path('/404');
		};

		
		console.log("Iniciando HomeCtrl!");
		$scope.posts = PublicacaoService.getPublicacoes();
		console.log("Recuperado os dados:");
		console.log($scope.posts);
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
app.controller('PublicacaoCtrl', ['$rootScope', '$scope', '$location', '$routeParams', 'PublicacaoService',
    function($rootScope, $scope, $location, $routeParams, PublicacaoService){
		$rootScope.activetab = $location.path();     
		console.log($routeParams.id);
		$scope.post = PublicacaoService.getPublicacao($routeParams.id);
		console.log("Achei -> " + $scope.post.id);
		$window.page_id = $routeParams.id;
	}
]);

app.service('PublicacaoService', ['$http', function($http){
	var baseUrl = "/turislife/web/js/Mock/publicacao.json";

	this.getPublicacao = function(id){
		console.log("Procurando a publicacao -> " + id);
		var posts = this.getPublicacoes();
		console.log("Posts totais: " + posts.length);
		for (i = 0; i < posts.length; i++) { 
		    if(id === posts[i].id){
		    	console.log("Achei");
		    	return posts[i]; 
		    }
		    console.log("Nao Achei");
		}
	}
	
	this.getPublicacoes = function(){
		var data = "";
		return $http.get(baseUrl, data)
	    	.then(function(response) {
	    		console.log("JSON DATA: " + response.data[0].id);
	    		return response.data;
	        });
	};
	
}]);