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

        <?php previous_post_link( '<div class="nav-previous">%link</div>', '<span class="pn-nav"><span class="meta-nav">' . _x( '&laquo;', 'Previous post link', 'vital' ) . '</span> %title</span>' ); ?>
        <?php next_post_link( '<div class="nav-next">%link</div>', '<span class="pn-nav">%title <span class="meta-nav">' . _x( '&raquo;', 'Next post link', 'vital' ) . '</span></span>' ); ?>

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

    echo $before.'<nav role="navigation" id="'. esc_attr( $nav_id ) .'" class="number-navigation"><h4 class="screen-reader-text">'. __( 'Post navigation', 'vital' ) .'</h4><ol class="vital_page_navi clearfix">'."";

    $first_page_text = '&laquo; First <span class="mobile-nav-text">Page</span>';
    if ($paged >= 2) {
        echo '<li class="bpn-first-page-link"><a title="First Page" href="'.get_pagenum_link().'" data-page-num="1"><span class="vitalicon vitalicon-skip-back" aria-hidden="true"></span> <span class="mobile-nav-text">First Page</span></a></li>';
        echo '<li class="bpn-prev-link"><a title="Previous Page" href="'.get_pagenum_link($paged-1).'" data-page-num="'.($paged-1).'"><span class="vitalicon vitalicon-previous" aria-hidden="true"></span> <span class="mobile-nav-text">Previous Page</span></a></li>';
    }else{
        echo '<li class="bpn-first-page-link bpn-no-link"><span class="vitalicon vitalicon-skip-back" aria-hidden="true"></span> <span class="mobile-nav-text">First Page</span></li>';
        echo '<li class="bpn-prev-link bpn-no-link"><span class="vitalicon vitalicon-previous" aria-hidden="true"></span> <span class="mobile-nav-text">Previous Page</span></li>';
    }


    for($i = $start_page; $i  <= $end_page; $i++) {
        if($i == $paged) {
            echo '<li class="bpn-current standard-page-number page-num-'.$i.'">'.$i.'</li>';
        } else {
            echo '<li class="standard-page-number page-num-'.$i.'"><a href="'.get_pagenum_link($i).'" data-page-num="'.$i.'">'.$i.'</a></li>';
        }
    }
    $last_page_text = 'Last <span class="mobile-nav-text">Page</span> &raquo;';
    if ($paged < $max_page) {
        echo '<li class="bpn-next-link"><a title="Next Page" href="'.get_pagenum_link($paged+1).'" data-page-num="'.($paged+1).'"><span class="mobile-nav-text">Next Page</span> <span class="vitalicon vitalicon-next" aria-hidden="true"></span></a></li>';
        echo '<li class="bpn-last-page-link"><a title="Last Page" href="'.get_pagenum_link($max_page).'" data-page-num="'.$max_page.'"><span class="vitalicon vitalicon-skip-ahead" aria-hidden="true"></span> <span class="mobile-nav-text">Last Page</span></a></li>';
    }else{
        echo '<li class="bpn-next-link bpn-no-link"><span class="mobile-nav-text">Next Page</span> <span class="vitalicon vitalicon-next" aria-hidden="true"></span></li>';
        echo '<li class="bpn-last-page-link bpn-no-link"><span class="vitalicon vitalicon-skip-ahead" aria-hidden="true"></span> <span class="mobile-nav-text">Last Page</span></li>';
    }
    echo '</ol></nav>'.$after."";
} /* end page navi */





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
            printf( '<span class="cat-links">' . __( 'Posted in %1$s', 'vital' ) . '</span>', $categories_list );
        }

        /* translators: used between list items, there is a space after the comma */
        $tags_list = get_the_tag_list( '', __( ', ', 'vital' ) );
        if ( $tags_list ) {
            printf( '<span class="tags-links">' . __( 'Tagged %1$s', 'vital' ) . '</span>', $tags_list );
        }
    }

    if ( ! is_single() && ! post_password_required() && ( comments_open() || get_comments_number() ) ) {
        echo '<span class="comments-link">';
        comments_popup_link( __( 'Leave a comment', 'vital' ), __( '1 Comment', 'vital' ), __( '% Comments', 'vital' ) );
        echo '</span>';
    }

    edit_post_link( __( 'Edit', 'vital' ), '<span class="edit-link">', '</span>' );
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