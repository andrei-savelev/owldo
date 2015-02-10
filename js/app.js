/* Created by Andrey Savelev on 09.02.2015. */
angular.module('TodoList', []).
    controller('TodoCtrl', ['$scope', function ($scope) {
        // Переменная, которая будет принимать
        // ключ для чтения LocalStrage и выводить в списке
        var key = '';
        // Маска для записи в localStrage
        var idMask = "key_";
        // Определяем переменную, которой в последствии будем 
        // присваивать ключ для сохранения в LocalStorage
        var keyId = '';
        // В общем скопе определяем массив для вывода данных через 
        // директиву ng-repeat
        $scope.todos = [];
        // Получаем ключи у значений LocalStorage,
        // кладем их в переменную key и присваеваем элементу 
        //со значением indx в массиве todos
        for(var indx = 0; indx < window.localStorage.length; indx++){
            key = localStorage.key(indx);
            $scope.data = JSON.parse(window.localStorage.getItem(key));
            $scope.todos[indx] = $scope.data;
        }
        // Функция для добавления новых задач в todos и сохранения в LocalStorage
        $scope.addTodo = function () {
            // Не добавлять пустые строки
            if($scope.todoText.length === 0){
                return;
            }
            var newTodo = {
                done: false,
                text: $scope.todoText
            };

            // Переменной id присваеваем длинну хранилища, 
            var id = localStorage.length+1;
            // Переменной keyId присваеваем маску 
            //с номером последнего элемента в хранилище
            keyId = idMask + id;
            // сохраняем в хранилище значение объекта newTodo
            // предварительно сериализуем данные 
            window.localStorage.setItem(keyId, JSON.stringify(newTodo));

            // добавлем в массив todos
            // для вывода в списке в реальном времени
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

            // Удаление задачи из localStorage
            var item = window.localStorage.key(start);
            window.localStorage.removeItem(item);
        };
        // Перемещение элементов списка
        $scope.move = function (index, direction) {
            // Start: Ничего не происходит если
            // A,
            // B,
            // C
            // Если direction === 'up' index = index -1
            // элемент списка пермещается вверх;
            if (direction === 'up') {
                // Но если индекс элемента равен 0, ничего не происходит;
                if (index === 0) {
                    return;
                }
                index -= 1;
            }
            // Элемент списка перемещается вниз;
            if (direction === 'down') {
                if (index === $scope.todos.length - 1) {
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
        };
        $scope.activityTodo = function (index) {
            // узнаем на каком элементе произошел клик
            var todo = $scope.todos[index];
            // ключ элемента в хранилище с этим нидексом кладем в перменную
            var tempKey = window.localStorage.key(index);
            //во временную перменную кладем эелмент с этим ключем 
            // предварительно его десереализуем;
            var tempItem = JSON.parse(window.localStorage.getItem(tempKey));
            if(todo.done === false){
                tempItem.done = false;
                window.localStorage.setItem(tempKey, JSON.stringify(tempItem));
                return;
            }
            if(todo.done === true){
                tempItem.done = true;
                window.localStorage.setItem(tempKey, JSON.stringify(tempItem));
                return;
            }

        }
    }]);
















/*// Основная логика
function TodoCtrl($scope, $firebase){

    var ref = new Firebase('https://owldo.firebaseio.com/');

    var sync = $firebase(ref);

    $scope.todos = sync.$asArray();

}*/