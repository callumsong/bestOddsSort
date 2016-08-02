var betApp = angular.module('betApp', []),
    sortBest = function(a, b) {
      return b.price - a.price;
    };

betApp.controller('mainCtrl', ['$http', '$scope', function($http, $scope) {

  $http.get('/bets').then(function success(res) {

    var allBets = res.data.runners;

    for (var i = 0; i < allBets.length; i++) {

      if (allBets[i].exchange.availableToBack) {
        allBets[i].bestOddsToBack = allBets[i].exchange.availableToBack.sort(sortBest)[0].price;
      }

      if (allBets[i].exchange.availableToLay) {
        allBets[i].bestOddsToLay = allBets[i].exchange.availableToLay.sort(sortBest)[0].price;
      }

    }

    $scope.bets = allBets;

  }, function errorCallback(err) {
    console.log(err);
  });


  $scope.reverse = false;

  $scope.backOddsIndex = null;
  $scope.layOddsIndex = null;

  $scope.sort = function() {
    $scope.reverse = !$scope.reverse;
  };

  $scope.showTeamOddsToBack = function(index) {
    $scope.backOddsIndex = index;
  };

  $scope.showTeamOddsToLay = function(index) {
    $scope.layOddsIndex = index;
  };

  $scope.resetIndex = function() {
    $scope.backOddsIndex = null;
    $scope.layOddsIndex = null;
  };
  
}]);