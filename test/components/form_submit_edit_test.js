process.env.NODE_ENV = 'test';
var expect = require('expect');
import {driver, By, getIndex, clickEdit, reviseFormValues, clickSubmit, expectURL} from "../../helpers/test_web_driver.js";

describe("Form Submit", function(){
  this.timeout(15000)
  after(function(){  driver.quit(); })

  context("when visited on the 'edit' page", function(){
    context("when submitted with valid revised value(s)", function(){
      [
        {robotName: "CobblerBot 123"},
        {robotName: "CobblerBot 123", robotDescription: "Makes the shoes."}
      ].forEach(function(revisedValues){
        before(function(){
          return getIndex()
            .then(clickEdit)
            .then(reviseFormValues(revisedValues))
            .then(clickSubmit)
        })

        it("browser should redirect to index", function(){
          expectURL("http://localhost:3000/")
        });

        it("table row should include revised value(s)", function(){
          return driver.findElement(By.css('tbody tr')).then(function(element){
            element.getText().then(function(rowText){
              Object.values(revisedValues).forEach(function(revVal){
                expect(rowText).toInclude(revVal)
              })
            })
          });
        });
      }); // forEach
    }) // context

    //context("when submitted with invalid revised value(s)", function(){
    //  [
    //    {robotName: ""},
    //    {robotName: "", robotDescription: ""}
    //  ].forEach(function(invalidRevisedValues){
    //    //console.log("REVISED INVALID VALUE(S)", invalidRevisedValues)
    //    var expectedMessageCount = Object.keys(invalidRevisedValues).length
    //    //console.log("EXPECTED NUMBER OF ERROR MESSAGES", expectedMessageCount)
    //    it("browser should not redirect away from 'edit' page");
    //    it("flash should include error message(s)"); // expectedMessageCount
    //  })
    //})
  });
});
