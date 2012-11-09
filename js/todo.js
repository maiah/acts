angular.module('TodoApp', ['ngResource']);

function TodoCtrl($scope, $http, $resource) {
  $scope.todos = [];

  var Todo = $resource('/api/todos');
  Todo.get(function(result) {
    angular.forEach(result, function(todo) {
      $scope.todos.push(todo);
    });
  });

  // This is also working
  /*
  $http.get('/api/todos')
    .success(function(data, status) {
      angular.forEach(data, function(todo) {
        $scope.todos.push(todo);
    });
    });
  */

  $scope.addTodo = function() {
    $scope.todos.push({ text: $scope.todoText, done: false });
    $scope.todoText= '';
  };

  $scope.remaining = function() {
    var count = 0;
    angular.forEach($scope.todos, function(todo) {
      count += todo.done ? 0 : 1;
    });
    return count;
  };

  $scope.clearCompleted = function() {
    var oldTodos = $scope.todos;
    $scope.todos = [];
    angular.forEach(oldTodos, function(todo) {
      if (!todo.done) {
        $scope.todos.push(todo);
      }
    });
  };

  $scope.remove = function(todo) {
    var idx = $scope.todos.indexOf(todo);
    $scope.todos.splice(idx, 1);
  };
}
