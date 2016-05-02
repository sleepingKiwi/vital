/*------------------------------------*\
    picturefill loader class
\*------------------------------------*/

/**
 * this class handles the loading of picturefill images 
 * includes any edge cases such as images inside expanders 
 * or as part of an adaptive-content carousel
 */


vital.picturefillLoader = (function(){

    /**
     * PRIVATE
     */

        //default options for the scroll function
    var _defaultScrollOptions = {
            // debug determines whether we should log to console or not.
        debug : false,
    };


        //this function is used to match expanders in a call to 'closest' below
    function _closestExpanderMatch(el) {
        return apollo.hasClass(el, 'vitally-expandable');
    }



    /**
     * PUBLIC
     */
    function scroll(_opts){
        /**
         * To be run on scroll events (obv)
         * optional _opts object can apply the debug option which outputs to console at various stages
         */

            //we first extend a blank object with our defaults which effectively makes a copy 
            //because the extend method would otherwise overwrite the defaults array.
        var opts = vital.u_extend.extend( {}, _defaultScrollOptions );
            //then we extend our new copy with any supplied options
        vital.u_extend.extend( opts, _opts );

        if(opts.debug){
            console.log('%c [DEBUG] vital.picturefillLoader scroll update ticked', 'color:#9999ff; font-size:0.9em;');
        }

        var fillArray = [];
            //var deferredImages = document.getElementsByClassName('data-deferred');
            /**
             * getElementsByClassName returns a Live NodeList - it's length updates dynamically
             * this is great most of the time but because our for loop was removing the applicable
             * classes the node list kept getting shorter and the for loop would never reach all elements
             * //http://stackoverflow.com/questions/11705171/can-not-modify-classes-of-dom-elements
             * we could loop backwards through the list or cast to a static array but we've switched
             * to use querySelectorAll which returns a static (non live) list anyway...
             */
        var deferredImages = document.querySelectorAll('.data-deferred');
        var i, l;
        l = deferredImages.length;

        if(opts.debug){
            console.log('%c [DEBUG] found '+l+' deferred images', 'color:#9999ff; font-size:0.9em;');
            //console.log(deferredImages);
        }

            //loop through all elements with .data-deferred class
        for(i=0; i<l; i++){
            var self = deferredImages[i];

            if(opts.debug){
                console.log('%c [DEBUG] looping: '+i, 'color:#9999ff; font-size:0.9em;');
            }

                //if they're not within 250px of screen (on Y axis) they're ignored
            if( verge.inY(self, 250) ){

                if(opts.debug){
                    console.log('%c [DEBUG] in Y', 'color:#9999ff; font-size:0.9em;');
                }

                    //by default we'll perform the deferred load unless we find a reason not to
                var visible = true;

                    //if true, this image is inside an expandable block 
                    //the class in-an-expander is dynamically added in the expandersClick() function 
                    //which is called whenever new content is loaded on the page
                if(apollo.hasClass(self, 'in-an-expander')){
                        //get the closest node with class of 'vitally-expandable'
                    var expandableContainer = vital.u_closest.closest( self, _closestExpanderMatch);
                        //if the container isn't expanded then don't load images inside it!
                    if( !apollo.hasClass(expandableContainer, 'expand-show') ){
                        visible = false;
                    }
                }else if(apollo.hasClass(self, 'deferred-in-slideshow')){
                        //a slideshow image that doesn't want to be loaded yet!
                        //this class is controlled by adaptive-content.js
                    visible = false;
                }

                if(visible){
                    apollo.removeClass(self, 'data-deferred');
                    self.removeAttribute('data-deferred');
                    fillArray.push(self);
                }

            }//if in 250px of Y
        }// for loop of deferredImages 


        /* global picturefill */
        picturefill(fillArray);
    }

    //revealing public methods
    return {
        scroll : scroll,
    };

}()); //vital.picturefillLoader