/**
 * This wrap is placed around all of our custom code (everything in the js/main folder)
 * essentially we are just giving our own script a little privacy!
 *
 * This module passes a reference to itself as an argument (vital) using the loose augmentation
 * model to allow us to (theoretically) extend the module simply
 *
 * Initially each submodule was included using loose augmentation but now we have moved to
 * wrapping the whole lot of script in a closure and declaring the 'vital' argument as a 
 * globally available variable in jshint.
 *
 * to augment this module we could create another js file 
 * (which could be loaded before or after this one) structured like:
 *
    var vitalScripts = (function(vital){

        vital.someSubModule = (function(){

            function init(){
                //this function will now be available alongside all of the others in our module...
            }

            //revealing public methods
            return {
                init : init,
            };

        }()); //vital.someSubModule
    
        return vital;

    }( vitalScripts || {} ));//end of vitalScripts closure.
 *
 * -
 *
 * http://toddmotto.com/mastering-the-module-pattern/
 * http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html
 * https://carldanley.com/js-revealing-module-pattern/
 */

var vitalScripts = (function(vital){


//closed in js/structural/vital-closure-post.js:
/**
    return vital;
}( vitalScripts || {} ));//end of vitalScripts closure.
**/