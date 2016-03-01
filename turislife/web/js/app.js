var app = angular.module('app',['ngRoute']);
 
app.config(function($routeProvider, $locationProvider)
{
   // remove o # da url
   //$locationProvider.html5Mode(true);
 
   $routeProvider
 
   .when('/', {
      templateUrl : '/turislife/web/Views/home.html',
      controller     : 'HomeCtrl',
   })
 
   .when('/lugares', {
      templateUrl : '/turislife/web/Views/lugares.html',
      controller  : 'LugaresCtrl',
   })
 
   .when('/estabelecimentos', {
      templateUrl : '/turislife/web/Views/estabelecimentos.html',
      controller  : 'EstabelecimentosCtrl',
   })

   .when('/trabalho', {
      templateUrl : '/turislife/web/Views/trabalho.html',
      controller  : 'TrabalhoCtrl',
   })
   
   .otherwise ({ redirectTo: '/' });
});