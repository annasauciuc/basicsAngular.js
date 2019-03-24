const ninjaApp = angular.module("ninjaApp", ["ngRoute", "ngAnimate"]);
ninjaApp.config([
  "$routeProvider",
  "$locationProvider",
  function($routeProvider, $locationProvider) {
    //$locationProvider.html5Mode(true);

    $routeProvider
      .when("/home", {
        templateUrl: "views/home.html",
        controller: "toDoController"
      })
      .when("/directory", {
        templateUrl: "views/directory.html",
        controller: "toDoController"
      })
      .when("/contact-success", {
        templateUrl: "views/contact-success.html",
        controller: "ContactController"
      })
      .when("/contact", {
        templateUrl: "views/contact.html",
        controller: "ContactController"
      })
      .otherwise({
        redirectTo: "/home"
      });
  }
]);

ninjaApp.directive("randomNinja", [
  // our directive name random-ninja
  function() {
    return {
      restrict: "E", // element
      scope: {
        //
        ninjas: "=", // relates the directive to the same scope
        title: "="
      },
      templateUrl: "views/random.html", // where our directive info will go
      transclude: true, // allows to read the html from the directive into our templateUrl
      replace: true, // replace the random-user with a div in order to be semantic
      controller: function($scope) {
        $scope.random = Math.floor(Math.random() * 4); // creates a random index for the images
      }
    };
  }
]);
// ninjaApp.run(() => {});
ninjaApp.controller("toDoController", [
  "$scope",
  "$http",
  function($scope, $http) {
    $scope.removeNinja = ninja => {
      let removedNinja = $scope.ninjas.indexOf(ninja);
      $scope.ninjas.splice(removedNinja, 1);
    };

    $scope.addNinja = () => {
      $scope.ninjas.push({
        name: $scope.newninja.name,
        belt: $scope.newninja.belt,
        rate: Number(newninja.rate),
        available: true
      });

      $scope.newninja.name = "";
      $scope.newninja.belt = "";
      $scope.newninja.rate = "";
    };
    $scope.removeAll = function() {
      $scope.ninjas = "";
    };

    $http.get("../../data/ninjas.json").then(function(data) {
      $scope.ninjas = data.data;
    });
  }
]);

ninjaApp.controller("ContactController", [
  "$scope",
  "$location",
  function($scope, $location) {
    $scope.sendMessage = () => {
      $location.path("/contact-success");
    };
  }
]);
