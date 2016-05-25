/*------------------------------------*\
    force heights
\*------------------------------------*/

/**
 * forcing heights to match the screen height for various elements
 */
    

vital.forceHeights = (function(){

    /**
     * PRIVATE
     */
         //default options for the scroll function
    var _defaultResizeOptions = {
            // debug determines whether we should log to console or not.
        debug : false,
    };

    var _originalHeight = 0;

    /**
     * PUBLIC
     */
        //called on resize events
    function resize(_opts){
        /**
         * optional _opts object can apply the debug option which outputs to console at various stages
         */

            //we first extend a blank object with our defaults which effectively makes a copy 
            //because the extend method would otherwise overwrite the defaults array.
        var opts = vital.u_extend.extend( {}, _defaultResizeOptions );
            //then we extend our new copy with any supplied options
        vital.u_extend.extend( opts, _opts );

        if(opts.debug){
            console.log('%c [DEBUG] vital.forceHeights resize update ticked', 'color:#559999; font-size:0.9em;');
        }


        /**
         * Forced heights - used for hero images etc.
         */
        var forcedHeights = document.querySelectorAll('.js--force-my-height');
        var fh = forcedHeights.length;
        //console.log(forcedHeights);
        if(fh){
            fh = forcedHeights.length - 1;
            var curHeight = verge.viewportH();
                //to avoid jumps caused by mobile address bars we're only changing the height if 
                //there's been a large enough change from the original height..
                //this is super hacky but....
                //a transition on height in the css helps make this feel a little smoother at least
            if( Math.abs(curHeight - _originalHeight) > 125 ){
                for (fh; fh >= 0; fh--) {
                        //we've changed height more than 125px from our last change...

                            /**
                             * Optionally adjust height based on the height of another element 
                             * provided as an ID.
                             */
                        var adjustForElements = 0;
                        var worryAbout = forcedHeights[fh].getAttribute('data-worry-about');
                        if( worryAbout ){
                            var worryAboutElem = document.getElementById(worryAbout);
                            adjustForElements = worryAboutElem ? worryAboutElem.offsetHeight : 0;
                        }

                        var targetHeight = (curHeight* parseFloat(forcedHeights[fh].getAttribute('data-screen-height')));
                            console.log(targetHeight, adjustForElements);

                        
                        forcedHeights[fh].style.height = targetHeight - adjustForElements +'px';
                }

                _originalHeight = curHeight;
            }
        }

    }//resize()




        //revealing public methods
    return {
        resize : resize,
    };

}()); //vital.forceHeights