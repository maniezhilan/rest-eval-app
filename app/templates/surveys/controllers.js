angular.module('myApp.services').factory('Survey', function($resource) {
  return $resource('api/v1/surveys/:id.json', { id:'@surveys.id' }, {
    update: {
      method: 'PATCH',
      
     
     
    }
    }, {
    stripTrailingSlashes: false
    });
});


angular.module('myApp.controllers').controller('SurveyListController', function($scope, $state,  Survey, $auth, toaster, 
                                                                                     DTOptionsBuilder) {
        
        
        $scope.dtOptions = DTOptionsBuilder.newOptions()
                            .withBootstrap();
          
        Survey.get(function(data) {
                     $scope.surveys = [];
                     angular.forEach(data.data, function(value, key)
                                                        {
                                                       this.survey = value.attributes;
                                                       this.survey['id'] = value.id;
                                                       this.push(this.survey);                    
                                                        },   $scope.surveys); 
                  
                               }, 
                function(error){
                      $scope.error = error.data;
                                              });
  
  
   $scope.deleteSurvey = function(selected_id) { // Delete a Survey. Issues a DELETE to /api/surveys/:id
      survey = Survey.get({ id: selected_id});
      survey.$delete({ id: selected_id},function() {
        toaster.pop({
                type: 'success',
                title: 'Sucess',
                body: "Survey deleted successfully",
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
  
}).controller('SurveyEditController', function($scope, $state, $stateParams, toaster, $window, Survey) {
     $scope.loading = false;
     $scope.updateSurvey = function() { //Update the survey. Issues a PATCH to /v1/api/surveys/:id
     
     $scope.loading = true;
    $scope.survey.$update({ id: $stateParams.id },function() {
     toaster.pop({
                type: 'success',
                title: 'Sucess',
                body: "Update was a success",
                showCloseButton: true,
                timeout: 0
                });
        
       $state.go('surveys.list');
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

  
  $scope.loadSurvey = function() { //Issues a GET request to /api/surveys/:id to get a survey to update
                       $scope.survey = Survey.get({ id: $stateParams.id },
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

  $scope.loadSurvey(); // Load a survey 
  }).controller('SurveyCreateController', function($scope, $state, Survey, toaster) {
          $scope.survey = new Survey(); 
          $scope.loading = false;

         $scope.addSurvey = function() { //Issues a POST to v1/api/survey.json
                                $scope.loading = true;
                                $scope.survey.data.type = "surveys";
                                $scope.survey.$save(function() {
                                toaster.pop({
                                            type: 'success',
                                            title: 'Sucess',
                                            body: "Survey saved successfully",
                                            showCloseButton: true,
                                            timeout: 0
                                            });
                                   $state.go('surveys.list');
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




  