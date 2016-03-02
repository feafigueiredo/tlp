/* HOME */
app.controller('HomeCtrl', ['$rootScope', '$scope', '$location', 
    function($rootScope, $scope, $location){
		$rootScope.activetab = $location.path();
		
		$scope.posts = [
			{
				'id': 'Publicacao-Um',
				'header': 'Cabeçalho, 02/06/2016',
				'img': 'http://static8.depositphotos.com/1003368/893/i/950/depositphotos_8937962-Old-town---illustration-sketch.jpg',
				'title': 'Segunda Publicação',
				'abstract': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean non mi quis ligula viverra volutpat at sed massa. Etiam euismod luctus massa id malesuada. Proin interdum metus ac lacus sodales, vel egestas dui tincidunt. Suspendisse nec ligula a neque pulvinar pulvinar. Sed sagittis imperdiet sagittis. In ut massa maximus, finibus tortor sit amet, lacinia mi. Mauris lobortis nisl non metus luctus blandit. Vivamus maximus nibh nec mollis efficitur. Duis a orci ut velit consequat eleifend.'
			},
			{
				'id': 'Publicacao-Dois',
				'header': 'Cabeçalho, 01/06/2016',
				'img': 'http://www.gazetadopovo.com.br/viver-bem/wp-content/uploads/import/memoriaas_viagens_desenhos_110413.jpg',
				'title': 'Publicação de estréia',
				'abstract': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean non mi quis ligula viverra volutpat at sed massa. Etiam euismod luctus massa id malesuada. Proin interdum metus ac lacus sodales, vel egestas dui tincidunt. Suspendisse nec ligula a neque pulvinar pulvinar. Sed sagittis imperdiet sagittis. In ut massa maximus, finibus tortor sit amet, lacinia mi. Mauris lobortis nisl non metus luctus blandit. Vivamus maximus nibh nec mollis efficitur. Duis a orci ut velit consequat eleifend.'
			}
		];
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
		console.log($routeParams.id);
	}
]);