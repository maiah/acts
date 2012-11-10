angular.module('TodoApp', ['ngResource']);

function TodoCtrl($scope, $http, $resource) {
  $scope.todos = [];

  var Todo = $resource('/api/todos/:id', {}, { update: { method: 'PUT' } });
  Todo.get(function(result) {
    angular.forEach(result, function(todo) {
      $scope.todos.push(todo);
    });
  });

  $scope.getById = function() {
    Todo.get({ id: 3000 }, function(result) {
      console.log(result);
    });
  };

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
    var todo = { text: $scope.todoText, done: false };
    $scope.todos.push(todo);
    $scope.todoText= '';

    Todo.save(todo, function(savedTodo) {
      console.dir(savedTodo);
    });
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

  $scope.update = function() {
    var sampleTodoUpdate = { 5000: {text: 'Hey you', done: false } };
    Todo.update(sampleTodoUpdate, function(updatedTodo) {
      console.log(updatedTodo);
    });
  };
}
