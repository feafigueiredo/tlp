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
					page = $routeParams.page;
					break;
				default: $location.path('/404');
			}
		}

		
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
		
		console.log($routeParams.id);
		$scope.post = PublicacaoService.getPublicacao($routeParams.id);
		console.log($scope.post);
		
		$window.page_id = $routeParams.id;
	}
]);

app.service('PublicacaoService', ['$http', function($http){
	var baseUrl = "/turislife/web/js/Mock/publicacao.json";

	this.getPublicacao = function(id){
		console.log("Procurando a publicacao -> " + id);
		var posts;
		return this.getPublicacoes().then(function(resp){
			posts = resp;
			console.log("Posts totais: " + posts.length);
			
			for (i = 0; i < posts.length; i++) { 
			    if(id === posts[i].id){
			    	return posts[i]; 
			    }
			}
		});
		
		
	}
	
	this.getPublicacoes = function(area, page){
		var data = {
				"area": area,
				"page": page
		};
		return $http.get(baseUrl, data)
	    	.then(function(response) {
	    		return response.data;
	        });
	};
	
}]);