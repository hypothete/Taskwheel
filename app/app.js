/*global angular, console*/

'use strict';

angular.module('app.controllers',[]);
angular.module('app.directives',[]);
angular.module('app',['app.controllers','app.directives', 'ngAnimate']);
  
angular.module('app.controllers')
.controller('ctrl', ['$scope',
  function($scope){
    $scope.tasks = [
      {
        description: 'feed cat',
        timelogged: 0
      },
      {
        description: 'paint wall',
        timelogged: 0
      },
      {
        description: 'do dishes',
        timelogged: 0
      }
    ];
    
    $scope.addTask = function(){
      console.log($scope.workingtask);
      if($scope.workingtask.length){
        $scope.tasks.push({
          description: $scope.workingtask,
          timelogged: 0
        });
        $scope.workingtask = '';
      }
    };
  }
]);

angular.module('app.directives')
.directive('taskwheel', ['$timeout', function($timeout){
  return {
    scope: {
      tasks: '='
    },
    templateUrl: 'wheel.html',
    link: function(scope, elem){
      
      scope.increment = function(task){
        task.timelogged++;
      };
      
      scope.delete = function(index){
        scope.tasks.splice(index,1);
      };
      
      elem.bind('click', function(){
        spin();
        scope.$apply();
      });
      
      scope.$watch('tasks', function(newval, oldval){
        if(newval.length !== oldval.length){
          $timeout(function(){
            spin();
          },1000);
        }
      }, true);
      
      function spin(){
        elem.css({
          transform: 'rotate('+360*Math.round(Math.random()*scope.tasks.length)/scope.tasks.length+'deg)'
        });
      }
    }
  };
}]);