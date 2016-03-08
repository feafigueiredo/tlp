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
		
		PublicacaoService.getPublicacao($routeParams.id).then(function(resp){
			$scope.post = resp;
			console.log(resp);
		},
		function(error){
			$location.path("/404");
		});
		$window.page_id = $routeParams.id;
		
	}
]);

app.service('PublicacaoService', ['$http', function($http){
	var baseUrl = "/turislife/api/services/PublicacaoService.php";

	this.getPublicacao = function(id){
		var data = {
				"id": id
		};
		return $http.get(baseUrl, data)
	    	.then(function(response) {
	    		return response.data;
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