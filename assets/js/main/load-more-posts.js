/*------------------------------------*\
    $Loading more posts with ajax
\*------------------------------------*/

jQuery_vital(document).ready(function($) {
    var $morePosts = $('.more-posts');
   
    if($morePosts.length){

        var maxPages = parseInt($morePosts.attr('data-max-pages'),10);
        var currentPage = parseInt($morePosts.attr('data-current-page'),10);
        var nextLink = $morePosts.attr('data-npl');
        var holderDiv = $('<div>');
        var navID = $morePosts.attr('data-nav-id') !== '' ? $morePosts.attr('data-nav-id') : false;

        $('.more-posts a').click(function(e){

            //click event for left clicks only! http://www.jacklmoore.com/notes/click-events
            if (!(e.which > 1 || e.shiftKey || e.altKey || e.metaKey)) {

                e.preventDefault();

                if( (currentPage+1) <= maxPages ){
                    //there's still stuff to load...
                    $morePosts.find('a').addClass('loading-content');


                    holderDiv.load(nextLink + ' .js-load-more-content',
                        function(response, status, xhr) {

                            if ( status === 'error' ) {
                                var msg = 'Sorry but there was an error: ';
                                $morePosts.find('.load-text').html( msg + xhr.status + ' ' + xhr.statusText );
                            }else{

                                currentPage ++;

                                if(navID){
                                    $('#'+navID+' .page-num-'+currentPage).addClass('also-included');
                                }
                                
                                nextLink = nextLink.replace(/\/page\/[0-9]?/, '/page/'+ (currentPage+1));
                                $morePosts.attr('data-current-page', currentPage);
                                $morePosts.attr('data-npl', nextLink).find('a').attr('href',nextLink);
                                $morePosts.find('.load-text').html( 'load more posts' );
                                $morePosts.find('a').removeClass('loading-content');

                                holderDiv.find('.vitally-expandable .picturefill-wrap').addClass('data-deferred').attr('data-deferred', '');

                                $morePosts.before( holderDiv.html() );

                                //add any listeners that might be needed on newly ajaxed content
                                VitalUtility.contentListeners();
                                //VitalUtility.requestAnimationTick('scroll');
                            }

                        }
                    );

                }//current <- max
                else{
                    $morePosts.find('.load-text').html('All posts have been loaded');
                    $morePosts.delay(1500).slideUp(200);
                }

            }

        });

    }// $morePosts.length > 0

});//jQuery ready