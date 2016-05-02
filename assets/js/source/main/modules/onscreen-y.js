/*------------------------------------*\
    onscreen Y class
\*------------------------------------*/

/**
 * this class just adds a css class (js--seen-in-y) to any elements that want to know 
 * whether they're within a certain distance of viewport in the Y axis
 */


vital.onscreeny = (function(){

    /**
     * PRIVATE
     */

        //default distance to check if the elements don't override with 'data-in-y-distance'
    var _defaultDistance = 250;

        //default options for the scroll function
    var _defaultScrollOptions = {
            // debug determines whether we should log to console or not.
        debug : false,
    };



    /**
     * PUBLIC
     */
    function update(_opts){
        /**
         * To be run on scroll events and also on resize events
         * optional _opts object can apply the debug option which outputs to console at various stages
         */

            //we first extend a blank object with our defaults which effectively makes a copy 
            //because the extend method would otherwise overwrite the defaults array.
        var opts = vital.u_extend.extend( {}, _defaultScrollOptions );
            //then we extend our new copy with any supplied options
        vital.u_extend.extend( opts, _opts );

        if(opts.debug){
            console.log('%c [DEBUG] vital.onscreeny update (scroll/resize) ticked', 'color:#3399ff; font-size:0.9em;');
        }

            //grabbing all backgrounds that aren't already active
        var inactiveBackgrounds = document.querySelectorAll('.js--am-i-onscreen-y:not(.js--seen-in-y)');

        var i, l;
        l = inactiveBackgrounds.length;

        if(opts.debug){
            console.log('%c [DEBUG] vital.onscreeny found '+l+' inactive backgrounds', 'color:#3399ff; font-size:0.9em;');
            //console.log(inactiveBackgrounds);
        }

            //loop through all inactive backgrounds and activate them if in viewport
        for(i=0; i<l; i++){

            var bg = inactiveBackgrounds[i];
            var distanceData = bg.getAttribute('data-in-y-distance');

            var distanceToCheck = distanceData ? distanceData : _defaultDistance;

            if(opts.debug){
                console.log('%c [DEBUG] vital.onscreeny looping: '+i, 'color:#3399ff; font-size:0.9em;');
                console.log(bg);
            }

                //if they're not within distance of screen (on Y axis) they're ignored
            if( verge.inY(bg, distanceToCheck) ){

                apollo.addClass(bg, 'js--seen-in-y');

                if(opts.debug){
                    console.log('%c [DEBUG] vital.onscreeny '+i+' was in '+distanceToCheck+'px of Y - it\'s been activated.', 'color:#3399ff; font-size:0.9em;');
                }

            }//if in 250px of Y
        }// for loop of inactiveBackgrounds 

    }//function update(_opts){

    //revealing public methods
    return {
        update : update,
    };

}()); //vital.onscreeny