<?php
/**
 * CUSTOM TEMPLATE TAGS
 *
 * Mostly from the _S theme.
 */


/**
 * _S PREV/NEXT PAGING FUNCTION
 * Display navigation to next/previous pages when applicable
 */
function vital_content_nav( $nav_id ) {
    global $wp_query, $post;

    // Don't print empty markup on single pages if there's nowhere to navigate.
    if ( is_single() ) {
        $previous = ( is_attachment() ) ? get_post( $post->post_parent ) : get_adjacent_post( false, '', true );
        $next = get_adjacent_post( false, '', false );

        if ( ! $next && ! $previous )
            return;
    }

    // Don't print empty markup in archives if there's only one page.
    if ( $wp_query->max_num_pages < 2 && ( is_home() || is_archive() || is_search() ) ){
        return;
    }

    $nav_class = ( is_single() ) ? 'post-navigation' : 'paging-navigation';

    ?>
    <nav role="navigation" id="<?php echo esc_attr( $nav_id ); ?>" class="<?php echo $nav_class; ?> clearfix">
        <h4 class="screen-reader-text"><?php _e( 'Post navigation', 'vital' ); ?></h4>

    <?php if ( is_single() ) : // navigation links for single posts ?>

        <?php 
        $gpp = get_previous_post();
        $prev_post = !empty( $gpp ) ? $gpp : (object)array('post_title'=>'previous');
        //print_r($prev_post);
        previous_post_link( '<div class="nav-previous">%link</div>', '<span class="vitalicon vitalicon-backward-main"></span><span class="pn-nav">'.strip_tags($prev_post->post_title).'</span>' ); ?>
        <?php 
        $gnp = get_next_post();
        $next_post = !empty( $gnp ) ? $gnp : (object)array('post_title'=>'next');
        //print_r($next_post);
        next_post_link( '<div class="nav-next">%link</div>', '<span class="pn-nav">'.strip_tags($next_post->post_title).'</span><span class="vitalicon vitalicon-forward-main"></span>' ); ?>

    <?php elseif ( $wp_query->max_num_pages > 1 && ( is_home() || is_archive() || is_search() ) ) : // navigation links for home, archive, and search pages ?>

        <?php if ( get_next_posts_link() ) : ?>
        <div class="nav-previous"><?php next_posts_link( __( '<span class="meta-nav">&laquo;</span> Older posts', 'vital' ) ); ?></div>
        <?php endif; ?>

        <?php if ( get_previous_posts_link() ) : ?>
        <div class="nav-next"><?php previous_posts_link( __( 'Newer posts <span class="meta-nav">&raquo;</span>', 'vital' ) ); ?></div>
        <?php endif; ?>

    <?php endif; ?>

    </nav><!-- #<?php echo esc_html( $nav_id ); ?> -->
    <?php
}




/**
 * NUMBERED PAGE NAVIGATION
 * Tweaked from Bones
 */
function vital_number_nav( $nav_id, $before = '', $after = '' ) {
	global $wpdb, $wp_query;
    $request = $wp_query->request;
    $posts_per_page = intval(get_query_var('posts_per_page'));
    $paged = intval(get_query_var('paged'));
    if( !get_query_var('paged') ){ 
        $paged = intval(get_query_var('page')); 
    }
    $numposts = $wp_query->found_posts;
    $max_page = $wp_query->max_num_pages;
    if ( $numposts <= $posts_per_page ) { return; }
    if(empty($paged) || $paged == 0) {
        $paged = 1;
    }
    $pages_to_show = 8;
    $pages_to_show_minus_1 = $pages_to_show-1;
    $half_page_start = floor($pages_to_show_minus_1/2);
    $half_page_end = ceil($pages_to_show_minus_1/2);
    $start_page = $paged - $half_page_start;
    if($start_page <= 0) {
        $start_page = 1;
    }
    $end_page = $paged + $half_page_end;
    if(($end_page - $start_page) != $pages_to_show_minus_1) {
        $end_page = $start_page + $pages_to_show_minus_1;
    }
    if($end_page > $max_page) {
        $start_page = $max_page - $pages_to_show_minus_1;
        $end_page = $max_page;
    }
    if($start_page <= 0) {
        $start_page = 1;
    }

    echo $before.'<nav role="navigation" id="'. esc_attr( $nav_id ) .'" class="number-navigation"><h4 class="screen-reader-text">'. __( 'Post navigation', 'vital' ) .'</h4><ol class="vital-page-nav clearfix">'."";

    $first_page_text = '&laquo; First <span class="mobile-nav-text">Page</span>';
    if ($paged >= 2) {
        echo '<li class="vnn-first-page-link"><a title="First Page" href="'.get_pagenum_link().'" data-page-num="1"><span class="vitalicon vitalicon-previous-main"></span> <span class="mobile-nav-text">First Page</span></a></li>';
        echo '<li class="vnn-prev-link"><a title="Previous Page" href="'.get_pagenum_link($paged-1).'" data-page-num="'.($paged-1).'"><span class="vitalicon vitalicon-backward-main"></span> <span class="mobile-nav-text">Previous Page</span></a></li>';
    }else{
        echo '<li class="vnn-first-page-link vnn-no-link"><span class="vitalicon vitalicon-previous-main"></span> <span class="mobile-nav-text">First Page</span></li>';
        echo '<li class="vnn-prev-link vnn-no-link"><span class="vitalicon vitalicon-backward-main"></span> <span class="mobile-nav-text">Previous Page</span></li>';
    }


    for($i = $start_page; $i  <= $end_page; $i++) {
        if($i == $paged) {
            echo '<li class="vnn-current standard-page-number page-num-'.$i.'">'.$i.'</li>';
        } else {
            echo '<li class="standard-page-number page-num-'.$i.'"><a href="'.get_pagenum_link($i).'" data-page-num="'.$i.'">'.$i.'</a></li>';
        }
    }
    $last_page_text = 'Last <span class="mobile-nav-text">Page</span> &raquo;';
    if ($paged < $max_page) {
        echo '<li class="vnn-next-link"><a title="Next Page" href="'.get_pagenum_link($paged+1).'" data-page-num="'.($paged+1).'"><span class="mobile-nav-text">Next Page</span> <span class="vitalicon vitalicon-forward-main"></span></a></li>';
        echo '<li class="vnn-last-page-link"><a title="Last Page" href="'.get_pagenum_link($max_page).'" data-page-num="'.$max_page.'"><span class="vitalicon vitalicon-next-main"></span> <span class="mobile-nav-text">Last Page</span></a></li>';
    }else{
        echo '<li class="vnn-next-link vnn-no-link"><span class="mobile-nav-text">Next Page</span> <span class="vitalicon vitalicon-forward-main"></span></li>';
        echo '<li class="vnn-last-page-link vnn-no-link"><span class="vitalicon vitalicon-next-main"></span> <span class="mobile-nav-text">Last Page</span></li>';
    }
    echo '</ol></nav>'.$after."";
} /* end page navi */





/**
 * LOAD MORE LINKS
 * Called above the main navigation on pages that want inf scrolling type ability...
 *
 * $paired_nav argument gives the ID of a traditional nav. 
 * If it's available a class of .also-included will be added to page numbers in that nav
 * following the naming pattern $(navID+' .page-num-'+currentPage).addClass('also-included');
 */
function vital_load_more_link( $paired_nav ){
    global $wp_query;

    $max = $wp_query->max_num_pages;
    $paged = ( get_query_var('paged') > 1 ) ? get_query_var('paged') : 1;
    $npl=explode('"',get_next_posts_link()); 
    if( isset($npl[1]) ){
        $npl_url = $npl[1]; 
        $last_page_class = '';
    }else{
        $npl_url = ''; 
        $last_page_class = 'not-needed';
    }
    $paired_nav_id = isset($paired_nav) ? $paired_nav : '';

    //building the more-posts div
    $load_more_nav = '<div class="more-posts ' . $last_page_class . '" '; 
        $load_more_nav .= 'data-max-pages="' . $max . '" '; 
        $load_more_nav .= 'data-current-page="' . $paged . '" '; 
        $load_more_nav .= 'data-npl="' . $npl_url . '" ';
        $load_more_nav .= 'data-nav-id="' . $paired_nav_id . '"';
    $load_more_nav .= '>';

        if( isset($npl[1]) ){
            $load_more_nav .= get_next_posts_link(
                '<span class="load-more-icon"></span> 
                <span class="load-text">'.__('Load more posts', 'vital').'</span>'
            ); 
        }else{
            $load_more_nav .= '<span class="load-more-icon"></span> 
            <span class="load-text">'.__('Load more posts', 'vital').'</span>';
        }

    $load_more_nav .=  '</div>';

    echo $load_more_nav;
}





/**
 * _S posted_on() FUNCTION - USED IN POST META
 * Prints HTML with meta information for the current post-date/time and author.
 */
function vital_posted_on() {
	$time_string = '<time class="entry-date published updated" datetime="%1$s">%2$s</time>';

	/* 
	// Useful to display 'updated' date next to original published date. but disabled by default
    if ( get_the_time( 'U' ) !== get_the_modified_time( 'U' ) ) {
        $time_string = '<time class="entry-date published" datetime="%1$s">%2$s</time><time class="updated" datetime="%3$s">%4$s</time>';
    }
    */

    $time_string = sprintf( $time_string,
        esc_attr( get_the_date( 'c' ) ),
        esc_html( get_the_date() ),
        esc_attr( get_the_modified_date( 'c' ) ),
        esc_html( get_the_modified_date() )
    );

    $posted_on = sprintf(
        _x( 'Posted on %s', 'post date', 'vital' ),
        '<a href="' . esc_url( get_permalink() ) . '" rel="bookmark">' . $time_string . '</a>'
    );

    $byline = sprintf(
        _x( 'by %s', 'post author', 'vital' ),
        '<span class="author vcard"><a class="url fn n" href="' . esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ) . '">' . esc_html( get_the_author() ) . '</a></span>'
    );

    echo '<span class="posted-on">' . $posted_on . '</span><span class="byline"> ' . $byline . '</span>';
}



/**
 * _S FUNCTION FOR POST META IN ENTRY FOOTERS
 * Prints HTML with meta information for the categories, tags and comments.
 */
function vital_entry_footer() {
    // Hide category and tag text for pages.
    if ( 'post' == get_post_type() ) {
        /* translators: used between list items, there is a space after the comma */
        $categories_list = get_the_category_list( __( ', ', 'vital' ) );
        if ( $categories_list && vital_categorised_blog() ) {
            printf( '<span class="cat-links footer-meta-item">' . __( 'Posted in %1$s', 'vital' ) . '</span>', $categories_list );
        }

        /* translators: used between list items, there is a space after the comma */
        $tags_list = get_the_tag_list( '', __( ', ', 'vital' ) );
        if ( $tags_list ) {
            printf( '<span class="tags-links footer-meta-item">' . __( 'Tagged %1$s', 'vital' ) . '</span>', $tags_list );
        }
    }

    if ( ! is_single() && ! post_password_required() && ( comments_open() || get_comments_number() ) ) {
        echo '<span class="comments-link footer-meta-item">';
        comments_popup_link( __( 'Leave a comment', 'vital' ), __( '1 Comment', 'vital' ), __( '% Comments', 'vital' ) );
        echo '</span>';
    }

    edit_post_link( __( 'Edit', 'vital' ), '<span class="edit-link footer-meta-item">', '</span>' );
}



/**
 * _S FUNCTION TO DETECT MULTIPLE CATEGORIES
 * Returns true if a blog has more than 1 category
 */
function vital_categorised_blog() {
	if ( false === ( $all_the_cool_cats = get_transient( 'all_the_cool_cats' ) ) ) {
		// Create an array of all the categories that are attached to posts
		$all_the_cool_cats = get_categories( array(
			'fields'     => 'ids',
            'hide_empty' => 1,

            // We only need to know if there is more than one category.
            'number'     => 2,
		) );

		// Count the number of categories that are attached to the posts
		$all_the_cool_cats = count( $all_the_cool_cats );

		set_transient( 'all_the_cool_cats', $all_the_cool_cats );
	}

	if ( $all_the_cool_cats > 1 ) {
		// This blog has more than 1 category so vital_categorised_blog should return true
		return true;
	} else {
		// This blog has only 1 category so vital_categorised_blog should return false
		return false;
	}
}

/**
 * Flush out the transients used in vital_categorised_blog
 */
function vital_category_transient_flusher() {
	// Like, beat it. Dig?
	delete_transient( 'all_the_cool_cats' );
}
add_action( 'edit_category', 'vital_category_transient_flusher' );
add_action( 'save_post',     'vital_category_transient_flusher' );