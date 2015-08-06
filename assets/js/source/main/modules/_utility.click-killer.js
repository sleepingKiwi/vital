/*------------------------------------*\
    _utility - clickKiller function
\*------------------------------------*/

/**
 * generic function to kill left click events on links etc. which rely on mousedown events.
 */

vital.u_clickKiller = (function(){

    
    function clickKiller(e){
      if (!(e.which > 1 || e.shiftKey || e.altKey || e.metaKey)) {
          e.preventDefault();
          e.stopImmediatePropagation();
      }
    }//clickKiller


    //revealing public methods
    return {
        clickKiller : clickKiller,
    };

}()); //vital.u_clickKiller