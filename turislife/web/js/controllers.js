/* HOME */
app.controller('HomeCtrl', ['$rootScope', '$scope', '$location', 'PublicacaoService',
    function($rootScope, $scope, $location, PublicacaoService){
		$rootScope.activetab = $location.path();
		
		console.log("Iniciando HomeCtrl!");
		$scope.posts = PublicacaoService.getPublicacoes();
		console.log("Recuperado os dados:");
		console.log($scope.posts[0]);
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
		$scope.img = 'http://www.gazetadopovo.com.br/viver-bem/wp-content/uploads/import/memoriaas_viagens_desenhos_110413.jpg';
		$scope.title = 'Publicação de estréia';
		$scope.msg = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean non mi quis ligula viverra volutpat at sed massa. Etiam euismod luctus massa id malesuada. Proin interdum metus ac lacus sodales, vel egestas dui tincidunt. Suspendisse nec ligula a neque pulvinar pulvinar. Sed sagittis imperdiet sagittis. In ut massa maximus, finibus tortor sit amet, lacinia mi. Mauris lobortis nisl non metus luctus blandit. Vivamus maximus nibh nec mollis efficitur. Duis a orci ut velit consequat eleifend.';
	}
]);

app.service('PublicacaoService', ['$http', function($http){
	var baseUrl = "/turislife/web/js/Mock/publicacao.json";

	this.getPublicacoes = function(){
		var data = "";
		return $http.get(baseUrl, data)
	    	.then(function(response) {
	    		console.log("JSON DATA: " + response.data.length);
	    		return response.data;
	        });
	};
	
}]);