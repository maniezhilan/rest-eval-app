// spec.js
describe('Testing Questions CRUD Module', function() {

var Question = function() {
        
        var name = element(by.id('name'));
        this.setName = function(nameText) { name.clear(); name.sendKeys(nameText); };
        

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

it('Should add a new Question', function() {

    var question = new Question();

    // Get questions URL
    question.get();

    // Goto the new menu
    element(by.linkText('Questions')).click();
    element(by.linkText('New')).click();

    // Fill in the Fields
    
        question.setName("Your Title text here");

    //Expectations
    question.toast("Question saved successfully");

  });

it('Should  edit a Question', function() {

    var question = new Question();

    question.get();

    //Goto the edit menu
    element(by.linkText('Questions')).click();
     element(by.id('editButton')).click();

    // Fill in the fields
    
        question.setName("Your Updated Title text here");

    //Expectations
    question.toast("Update was a success");



});

it('Should  delete a Question', function() {
    browser.get('http://localhost:5000/');
    element(by.linkText('Questions')).click();
    element(by.id('deleteButton')).click()

    .then(function(){

        var EC = protractor.ExpectedConditions;
        var toastMessage = $('.toast-message');

         browser.wait(EC.visibilityOf(toastMessage), 60) //wait until toast is displayed
            .then(function(){

                expect(toastMessage.getText()).toBe("Question deleted successfully")

      });

  });
});

  });
