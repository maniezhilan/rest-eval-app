// spec.js
describe('Testing Surveys CRUD Module', function() {

var Survey = function() {
        
        var title = element(by.id('title'));
        this.setTitle = function(titleText) { title.clear(); title.sendKeys(titleText); };
        
        var description = element(by.id('description'));
        this.setDescription = function(descriptionText) { description.clear(); description.sendKeys(descriptionText); };
        
        var creation_time = element(by.id('creation_time'));
        this.setCreation_Time = function(creation_timeText) { creation_time.clear(); creation_time.sendKeys(creation_timeText); };
        
        var modification_time = element(by.id('modification_time'));
        this.setModification_Time = function(modification_timeText) { modification_time.clear(); modification_time.sendKeys(modification_timeText); };
        
        var question = element(by.id('question'));
        this.setQuestion = function(questionText) { question.clear(); question.sendKeys(questionText); };
        

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

it('Should add a new Survey', function() {

    var survey = new Survey();

    // Get surveys URL
    survey.get();

    // Goto the new menu
    element(by.linkText('Surveys')).click();
    element(by.linkText('New')).click();

    // Fill in the Fields
    
        survey.setTitle("Your Title text here");
        survey.setDescription("Your Title text here");
        element(by.css("input[type='radio'][value='0']")).click(); 
        survey.setCreation_Time("2014-12-22T03:12:58.019077+00:00"); 
        survey.setModification_Time("2014-12-22T03:12:58.019077+00:00"); 
        survey.setQuestion("Your Title text here");

    //Expectations
    survey.toast("Survey saved successfully");

  });

it('Should  edit a Survey', function() {

    var survey = new Survey();

    survey.get();

    //Goto the edit menu
    element(by.linkText('Surveys')).click();
     element(by.id('editButton')).click();

    // Fill in the fields
    
        survey.setTitle("Your Updated Title text here");
        survey.setDescription("Your Updated Title text here");
        element(by.css("input[type='radio'][value='1']")).click(); 
        survey.setCreation_Time("2015-12-22T03:12:58.019077+00:00"); 
        survey.setModification_Time("2015-12-22T03:12:58.019077+00:00"); 
        survey.setQuestion("Your Updated Title text here");

    //Expectations
    survey.toast("Update was a success");



});

it('Should  delete a Survey', function() {
    browser.get('http://localhost:5000/');
    element(by.linkText('Surveys')).click();
    element(by.id('deleteButton')).click()

    .then(function(){

        var EC = protractor.ExpectedConditions;
        var toastMessage = $('.toast-message');

         browser.wait(EC.visibilityOf(toastMessage), 60) //wait until toast is displayed
            .then(function(){

                expect(toastMessage.getText()).toBe("Survey deleted successfully")

      });

  });
});

  });
