// spec.js
describe('Testing Responses CRUD Module', function() {

var Response = function() {
        
        var user = element(by.id('user'));
        this.setUser = function(userText) { user.clear(); user.sendKeys(userText); };
        
        var answer = element(by.id('answer'));
        this.setAnswer = function(answerText) { answer.clear(); answer.sendKeys(answerText); };
        
        var question = element(by.id('question'));
        this.setQuestion = function(questionText) { question.clear(); question.sendKeys(questionText); };
        
        var modification_time = element(by.id('modification_time'));
        this.setModification_Time = function(modification_timeText) { modification_time.clear(); modification_time.sendKeys(modification_timeText); };
        

        this.get = function() {
                                   browser.get('http://localhost:5000/');
                                       };

        this.toast = function(message){
                                        $('.btn.btn-primary').click()  // css selectors http://angular.github.io/protractor/#/api?view=build$
                                            .then(function() {
                                                  var EC = protractor.ExpectedConditions;
                                                  var toastMessage = $('.toast-message');
                                                  browser.wait(EC.visibilityOf(toastMessage), 6000) //wait until toast is displayed
                                                             .then(function(){
                                                                    expect(toastMessage.getText()).toBe(message);

                                                                        });
                                                                  });
                                    }
                    };

it('Should add a new Response', function() {

    var response = new Response();

    // Get responses URL
    response.get();

    // Goto the new menu
    element(by.linkText('Responses')).click();
    element(by.linkText('New')).click();

    // Fill in the Fields
    
        response.setUser("Your Title text here");
        response.setAnswer("Your Title text here");
        response.setQuestion("Your Title text here");
        response.setModification_Time("2014-12-22T03:12:58.019077+00:00"); 

    //Expectations
    response.toast("Response saved successfully");

  });

it('Should  edit a Response', function() {

    var response = new Response();

    response.get();

    //Goto the edit menu
    element(by.linkText('Responses')).click();
     element(by.id('editButton')).click();

    // Fill in the fields
    
        response.setUser("Your Updated Title text here");
        response.setAnswer("Your Updated Title text here");
        response.setQuestion("Your Updated Title text here");
        response.setModification_Time("2015-12-22T03:12:58.019077+00:00"); 

    //Expectations
    response.toast("Update was a success");



});

it('Should  delete a Response', function() {
    browser.get('http://localhost:5000/');
    element(by.linkText('Responses')).click();
    element(by.id('deleteButton')).click()

    .then(function(){

        var EC = protractor.ExpectedConditions;
        var toastMessage = $('.toast-message');

         browser.wait(EC.visibilityOf(toastMessage), 60) //wait until toast is displayed
            .then(function(){

                expect(toastMessage.getText()).toBe("Response deleted successfully")

      });

  });
});

  });
