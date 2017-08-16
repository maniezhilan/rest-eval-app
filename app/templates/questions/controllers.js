angular.module('myApp.services').factory('Question', function($resource) {
  return $resource('api/v1/questions/:id.json', { id:'@questions.id' }, {
    update: {
      method: 'PATCH',
      
     
     
    }
    }, {
    stripTrailingSlashes: false
    });
});


angular.module('myApp.controllers').controller('QuestionListController', function($scope, $state,  Question, $auth, toaster, 
                                                                                     DTOptionsBuilder) {
        
        
        $scope.dtOptions = DTOptionsBuilder.newOptions()
                            .withBootstrap();
          
        Question.get(function(data) {
                     $scope.questions = [];
                     angular.forEach(data.data, function(value, key)
                                                        {
                                                       this.question = value.attributes;
                                                       this.question['id'] = value.id;
                                                       this.push(this.question);                    
                                                        },   $scope.questions); 
                  
                               }, 
                function(error){
                      $scope.error = error.data;
                                              });
  
  
   $scope.deleteQuestion = function(selected_id) { // Delete a Question. Issues a DELETE to /api/questions/:id
      question = Question.get({ id: selected_id});
      question.$delete({ id: selected_id},function() {
        toaster.pop({
                type: 'success',
                title: 'Sucess',
                body: "Question deleted successfully",
                showCloseButton: true,
                timeout: 0
                });
      
        $state.reload();
      }, function(error) {
         toaster.pop({
                type: 'error',
                title: 'Error',
                body: error,
                showCloseButton: true,
                timeout: 0
                });;
    });
    };
  
}).controller('QuestionEditController', function($scope, $state, $stateParams, toaster, $window, Question) {
     $scope.loading = false;
     $scope.updateQuestion = function() { //Update the question. Issues a PATCH to /v1/api/questions/:id
     
     $scope.loading = true;
    $scope.question.$update({ id: $stateParams.id },function() {
     toaster.pop({
                type: 'success',
                title: 'Sucess',
                body: "Update was a success",
                showCloseButton: true,
                timeout: 0
                });
        
       $state.go('questions.list');
       $scope.loading = false;
      //$state.go('sites'); // on success go back to home i.e. sites state.
    }, function(error) {
    toaster.pop({
                type: 'error',
                title: 'Error',
                body: error,
                showCloseButton: true,
                timeout: 0
                });
      $scope.loading = false;
    });
  };

  
  $scope.loadQuestion = function() { //Issues a GET request to /api/questions/:id to get a question to update
                       $scope.question = Question.get({ id: $stateParams.id },
                                       function() {}, function(error) {
                                          toaster.pop({
                                                type: 'error',
                                                title: 'Error',
                                                body: error,
                                                showCloseButton: true,
                                                timeout: 0
                                                });
                                                });
                                };

  $scope.loadQuestion(); // Load a question 
  }).controller('QuestionCreateController', function($scope, $state, Question, toaster) {
          $scope.question = new Question(); 
          $scope.loading = false;

         $scope.addQuestion = function() { //Issues a POST to v1/api/question.json
                                $scope.loading = true;
                                $scope.question.data.type = "questions";
                                $scope.question.$save(function() {
                                toaster.pop({
                                            type: 'success',
                                            title: 'Sucess',
                                            body: "Question saved successfully",
                                            showCloseButton: true,
                                            timeout: 0
                                            });
                                   $state.go('questions.list');
                                   $scope.loading = false; 
                                }, function(error) {
                                toaster.pop({
                                            type: 'error',
                                            title: 'Error',
                                            body: error,
                                            showCloseButton: true,
                                            timeout: 0
                                            });
                                 $scope.loading = false;
                                           });
                                 };
});




  