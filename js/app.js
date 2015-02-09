/* Created by Andrey Savelev on 09.02.2015. */
// Определение модели и зависимостей
angular.module('todoapp', ['firebase']);

// Основная логика
function TodoCtrl($scope, 'angularFire'){
    $scope.todos = [];
    $scope.addTodo = function (){
      var newTodo = {
          done: false,
          text: $scope.todoText
      };
        // по сабмиту добавлем в массив todos
        // элементы с инпутом и чекбоксом;
      $scope.todos.push(newTodo);
        // Очищаем инпут после сабмита;
      $scope.todoText = "";
    };

    // Удаление задач из списка.
    // В start передается текущий
    // элемент списка, который будет удален
    // по клику на ссылку рядом;
    $scope.removeTodo = function (start) {
        // Уадление задачи осуществляется
        // с помощью JS метода splice(),
        // в кторый передается текущая
        // позиция и кол-во элементов;
        $scope.todos.splice(start, 1);
    };
    // Перемещение элементов списка
    $scope.move = function (index, direction) {
        // Start: Ничего не происходит если
        // A,
        // B,
        // C

        // Если direction === 'up' index = index -1
        // элемент списка пермещается вверх;
        if(direction === 'up' ){
            // Но если индекс элемента равен 0, ничего не происходит;
            if(index === 0){
                return;
            }
            index -= 1;
        }

        // Элемент списка перемещается вниз;
        if(direction === 'down'){
            if(index === $scope.todos.length - 1){
                return;
            }
        }

        // Middle: Копируем элемент с текущим индексом
        // и пермещаем на две позиции ниже (index + 2)
        // A,
        // B,
        // A,
        // C
        var todo = $scope.todos[index];
        $scope.todos.splice(index + 2, 0, todo);

        // End: Затем оригинальный элемент удаляется
        // B,
        // A,
        // C
        $scope.todos.splice(index, 1);

    }
}