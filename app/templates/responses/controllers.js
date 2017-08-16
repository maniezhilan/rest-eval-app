angular.module('myApp.services').factory('Response', function($resource) {
  return $resource('api/v1/responses/:id.json', { id:'@responses.id' }, {
    update: {
      method: 'PATCH',
      
     
     
    }
    }, {
    stripTrailingSlashes: false
    });
});


angular.module('myApp.controllers').controller('ResponseListController', function($scope, $state,  Response, $auth, toaster, 
                                                                                     DTOptionsBuilder) {
        
        
        $scope.dtOptions = DTOptionsBuilder.newOptions()
                            .withBootstrap();
          
        Response.get(function(data) {
                     $scope.responses = [];
                     angular.forEach(data.data, function(value, key)
                                                        {
                                                       this.response = value.attributes;
                                                       this.response['id'] = value.id;
                                                       this.push(this.response);                    
                                                        },   $scope.responses); 
                  
                               }, 
                function(error){
                      $scope.error = error.data;
                                              });
  
  
   $scope.deleteResponse = function(selected_id) { // Delete a Response. Issues a DELETE to /api/responses/:id
      response = Response.get({ id: selected_id});
      response.$delete({ id: selected_id},function() {
        toaster.pop({
                type: 'success',
                title: 'Sucess',
                body: "Response deleted successfully",
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
  
}).controller('ResponseEditController', function($scope, $state, $stateParams, toaster, $window, Response) {
     $scope.loading = false;
     $scope.updateResponse = function() { //Update the response. Issues a PATCH to /v1/api/responses/:id
     
     $scope.loading = true;
    $scope.response.$update({ id: $stateParams.id },function() {
     toaster.pop({
                type: 'success',
                title: 'Sucess',
                body: "Update was a success",
                showCloseButton: true,
                timeout: 0
                });
        
       $state.go('responses.list');
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

  
  $scope.loadResponse = function() { //Issues a GET request to /api/responses/:id to get a response to update
                       $scope.response = Response.get({ id: $stateParams.id },
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

  $scope.loadResponse(); // Load a response 
  }).controller('ResponseCreateController', function($scope, $state, Response, toaster) {
          $scope.response = new Response(); 
          $scope.loading = false;

         $scope.addResponse = function() { //Issues a POST to v1/api/response.json
                                $scope.loading = true;
                                $scope.response.data.type = "responses";
                                $scope.response.$save(function() {
                                toaster.pop({
                                            type: 'success',
                                            title: 'Sucess',
                                            body: "Response saved successfully",
                                            showCloseButton: true,
                                            timeout: 0
                                            });
                                   $state.go('responses.list');
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




  