/*------------------------------------*\
    $Loading more posts with ajax
\*------------------------------------*/

vital.loadMore = (function(){

    /**
     * PRIVATE
     */
    var _morePostsLink = document.querySelectorAll('.more-posts');
    var _maxPages;
    var _currentPage;
    var _nextLink;
    var _holderDiv;
    var _navID;
    var _morePostsLinkAnchor;

    function _hideMorePosts(){
        //called after everything is loaded
        //console.log('all loaded!');
        _morePostsLink.style.display = 'none';
    }

    function _loadMoreError(error){
        apollo.removeClass(_morePostsLinkAnchor, 'loading-content');
        var msg = 'Sorry but there was an error: ';
        _morePostsLink.getElementsByClassName('load-text')[0].textContent = msg + error;
    }

    function _loadMoreSuccess(resp){
        //We got an ajax response - let's deal with it!

            //hide spinner
        apollo.removeClass(_morePostsLinkAnchor, 'loading-content');
            //set the holder div to hold the full document/response temporarily so we can grab elements from it
        _holderDiv.innerHTML = resp;
            //get the content we want to load and empty the contents of the holder div
        var newContent = _holderDiv.querySelectorAll('.js-load-more-content');
        _holderDiv.innerHTML = '';

            //increase the page count
        _currentPage ++;

            //if there's a nav we need to keep in sync add some styling class to the newly added page
        if(_navID){
            var navPageSelector = '#'+_navID+' .page-num-'+_currentPage;
            apollo.addClass( document.querySelector(navPageSelector), 'also-included');
        }
        
            //set data- attributes
        _nextLink = _nextLink.replace(/\/page\/[0-9]?/, '/page/'+ (_currentPage+1));
        _morePostsLink.setAttribute('data-current-page', _currentPage);
        _morePostsLink.setAttribute('data-npl', _nextLink);
        _morePostsLinkAnchor.setAttribute('href',_nextLink);

            //reset text of loading element
        _morePostsLink.getElementsByClassName('load-text')[0].textContent =  _morePostsLink.getAttribute('data-default-text');

            //hide the loader gif
        apollo.removeClass(_morePostsLinkAnchor, 'loading-content');

            //not sure if this is needed as these should be on there by default?
        //holderDiv.find('.vitally-expandable .picturefill-wrap').addClass('data-deferred').attr('data-deferred', '');

            //for each of the bits of content we grabbed early push it infront of the load more link
        var i, l;
        l = newContent.length;
        for (i = 0; i < l; i++) {
            _morePostsLink.parentNode.insertBefore(newContent[i], _morePostsLink);
        }
        newContent = null;

            //add any listeners that might be needed on the newly ajaxed content
        vital.contentListeners.listen(document.querySelector('body'));
        
            //act like we've scrolled
        vital.debouncedEvents.requestAnimationTick('scroll');
    }


    function _loadMoreDataReceived(e){
        //the ajax call after clicking the load more link returned data
        //console.log(this);
        //console.log(e);
        var self = this;
        try {
                //this will be called 4 times - readyState of 4 = ready!
                /**
                 0: request not initialized 
                 1: server connection established
                 2: request received 
                 3: processing request 
                 4: request finished and response is ready
                 */
            if (self.readyState === 4) {
                    //status can be a bunch of things but only 200 is good for us (actually > 200 < 300...)
                if (self.status === 200) {
                    _loadMoreSuccess(self.responseText);
                } else {
                    _loadMoreError('Error code was ' + self.status);
                }
            }
        }
        catch( error ) {
            //console.log(error);
            _loadMoreError('Caught Exception: ' + error.message);
        }
    }

    function _loadMoreClicked(e){

        //click event for left clicks only! http://www.jacklmoore.com/notes/click-events
        if (!(e.which > 1 || e.shiftKey || e.altKey || e.metaKey)) {

            e.preventDefault();

            //check if we're already trying to run the ajax
            if( !apollo.hasClass(_morePostsLinkAnchor, 'loading-content') ){

                //console.log('attempting to load more posts');

                if( (_currentPage+1) <= _maxPages ){
                    //there's still stuff to load...
                    apollo.addClass(_morePostsLinkAnchor, 'loading-content');


                    var morePostRequest = new XMLHttpRequest();
                        //have to use this because event listeners and onload / onerror events aren't supported until IE 10....
                        //https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
                    morePostRequest.onreadystatechange = _loadMoreDataReceived;

                        //not sending anything so we don't need to set a MIME type
                    //morePostRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                    
                    morePostRequest.open(
                        'POST',
                        encodeURI(_nextLink)
                    );

                        //not sending anything just getting new posts!
                    morePostRequest.send(null);


                }//current <= max
                else{
                        //all of the pages have loaded already - set the text to tell users this and then hide the link
                    _morePostsLink.getElementsByClassName('load-text')[0].textContent =  _morePostsLink.getAttribute('data-finished-text');
                    window.setTimeout(_hideMorePosts, 1500);
                }

            }//if( !apollo.hasClass(_morePostsLinkAnchor, 'loading-content') )

        }//left clicks

    }//_loadMoreClicked(e)





    /**
     * PUBLIC
     */
    function init(){
        if(_morePostsLink.length){

            _morePostsLink = _morePostsLink[0];

            _morePostsLinkAnchor = _morePostsLink.getElementsByTagName('a')[0];

            _maxPages = parseInt( _morePostsLink.getAttribute('data-max-pages'), 10 );
            _currentPage = parseInt( _morePostsLink.getAttribute('data-current-page'), 10 );
            _nextLink = _morePostsLink.getAttribute('data-npl');
            _holderDiv = document.createElement('div');
            _navID = _morePostsLink.getAttribute('data-nav-id') !== '' ? _morePostsLink.getAttribute('data-nav-id') : false;

            _morePostsLink.addEventListener('click', _loadMoreClicked, false);

        }//if(morePostsLink.length)
    }//init()
       


    //revealing public methods
    return {
        init: init,
    };


}());//vital.loadMore