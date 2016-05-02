/*------------------------------------*\
    adaptive content activators
\*------------------------------------*/

/**
 * activating nodes in adaptive content based on hrefs of .js--adaptive-content__activator
 */


vital.adaptiveContentActivators = (function(){

    /**
     * PRIVATE
     */
    function _activateContentNode(e){
        
       // console.log('activating Node');

        //click event for left clicks only! http://www.jacklmoore.com/notes/click-events
        if (!(e.which > 1 || e.shiftKey || e.altKey || e.metaKey)) {

            e.preventDefault();

            //console.log(e.target);
            var href = e.currentTarget.getAttribute('href');
            if( href.length > 0 ){
                
                var newNode = document.querySelector(href);
                if(newNode){
                   
                    var synced = vital.adaptiveContent.setActiveNode( newNode );

                        //the slideshow should automatically call the sync function of this class
                        //to keep nav in sync. If it hasn't we do it ourselves!
                    if(synced !== 'sync'){
                        var dataParent = e.currentTarget.getAttribute('data-parent');
                        //console.log(dataParent);
                        if(dataParent){
                            sync(dataParent, href);
                        }
                    }

                }//if(newNode)

            }//if(href.length)

        }//left clicks

    }//_activateContentNode(e){

    /**
     * PUBLIC
     */
        //takes the ID of nav as a string (i.e. 'nav-for-slider') and the href of the active content (i.e. '#content-4')
    function sync(navId, contentHref){

        var navNode = document.getElementById(navId);
        if(navNode){
            var activeLinks = navNode.getElementsByClassName('js--adaptive-content__activator--active');
            while(activeLinks.length){
                apollo.removeClass(activeLinks[0], 'js--adaptive-content__activator--active');
            }

            var newActiveLink = navNode.querySelector('.js--adaptive-content__activator[href="'+contentHref+'"]');
            if(newActiveLink){
                apollo.addClass(newActiveLink, 'js--adaptive-content__activator--active');
            }
        }

    }

    function listen(){
        var adaptiveContentActivatorLinks = document.querySelectorAll('.js--adaptive-content__activator');

        if(adaptiveContentActivatorLinks.length){
            var i = adaptiveContentActivatorLinks.length - 1;
            for (i; i >= 0; i--) {
                //console.log(adaptiveContentActivatorLinks[i]);
                //adaptiveContentActivatorLinks[i].addEventListener('click', _activateContentNode, false);

                adaptiveContentActivatorLinks[i].removeEventListener('mousedown', _activateContentNode, false);
                adaptiveContentActivatorLinks[i].addEventListener('mousedown', _activateContentNode, false);
                adaptiveContentActivatorLinks[i].removeEventListener('click', vital.u_clickKiller.clickKiller, false);
                adaptiveContentActivatorLinks[i].addEventListener('click', vital.u_clickKiller.clickKiller, false);
            }
        }//if(adaptiveContentActivatorLinks.length){
    }

    //revealing public methods
    return {
        listen : listen,
        sync : sync,
    };

}()); //vital.adaptiveContentActivators