var app = angular.module('app',['ngRoute']);
 
app.config(function($routeProvider, $locationProvider)
{
   // remove o # da url
   $locationProvider.html5Mode(true);
 
   $routeProvider
 
   .when('/', {
      templateUrl : '/turislife/web/Views/home.html',
      controller     : 'HomeCtrl',
   })
 
   .when('/publicacao/:id', {
      templateUrl : '/turislife/web/Views/publicacao.html',
      controller  : 'PublicacaoCtrl',
   })
   
   .when('/:area', {
      templateUrl : '/turislife/web/Views/home.html',
      controller  : 'HomeCtrl',
   })
   
   .when('/:area/:page', {
      templateUrl : '/turislife/web/Views/home.html',
      controller  : 'HomeCtrl',
   }) 
   .otherwise ({ templateUrl : '/turislife/web/Views/404.html' });
});

app.run(["$rootScope", "$window", '$location', function($rootScope, $window,  $location) {

	$rootScope.$on('$stateChangeSuccess',function(){
		$("html, body").animate({ scrollTop: 0 }, 200); 
	});
}]);