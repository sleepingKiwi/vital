<?php
    
/**
 * COMMENTS CALLBACK
 *
 * Used as a callback by wp_list_comments() for displaying the comments.
 */
function vital_comment( $comment, $args, $depth ) {
    $GLOBALS['comment'] = $comment;
    $bgauthemail = get_comment_author_email();

    if ( 'pingback' == $comment->comment_type || 'trackback' == $comment->comment_type ) : ?>

    <li id="comment-<?php comment_ID(); ?>" <?php comment_class(); ?>>
        <div class="comment-body">
            <?php _e( 'Pingback:', 'vital' ); ?> <?php comment_author_link(); ?> <?php edit_comment_link( __( 'Edit', 'vital' ), '<span class="edit-link">', '</span>' ); ?>
        </div>

    <?php else : ?>

    <li id="comment-<?php comment_ID(); ?>" <?php comment_class( empty( $args['has_children'] ) ? '' : 'parent' ); ?>>
        <article id="div-comment-<?php comment_ID(); ?>" class="comment-body">
            <footer class="comment-meta">
                <div class="comment-author vcard">
                    <?php if ( 0 != $args['avatar_size'] ){ 
                        //echo get_avatar( $comment, $args['avatar_size'] ); 
                        //using custom bones style loading of gravatars only at desktop sizes
                    ?>
                    
                        <?php 
                        /**
                         * changing default gravatar - https://en.gravatar.com/site/implement/images/
                         * e.g. &amp;d=mm
                         */ 
                        ?>
                        <img data-gravatar="http://www.gravatar.com/avatar/<?php echo md5($bgauthemail); ?>?s=48&amp;d=mm" class="load-gravatar avatar avatar-48 photo" height="48" width="48" src="<?php echo get_template_directory_uri(); ?>/assets/img/pixel.gif" />

                    <?php } ?>
                    <?php printf( __( '%s <span class="says">says:</span>', 'vital' ), sprintf( '<cite class="fn">%s</cite>', get_comment_author_link() ) ); ?>
                </div><!-- .comment-author -->

                <div class="comment-metadata">
                    <a href="<?php echo esc_url( get_comment_link( $comment->comment_ID ) ); ?>">
                        <time datetime="<?php comment_time( 'c' ); ?>">
                            <?php printf( _x( '%1$s at %2$s', '1: date, 2: time', 'vital' ), get_comment_date(), get_comment_time() ); ?>
                        </time>
                    </a>
                    <?php edit_comment_link( __( 'Edit', 'vital' ), '<span class="edit-link">', '</span>' ); ?>
                </div><!-- .comment-metadata -->

                <?php if ( '0' == $comment->comment_approved ) : ?>
                <p class="comment-awaiting-moderation"><?php _e( 'Your comment is awaiting moderation.', 'vital' ); ?></p>
                <?php endif; ?>
            </footer><!-- .comment-meta -->

            <div class="comment-content">
                <?php comment_text(); ?>
            </div><!-- .comment-content -->

            <div class="reply">
                <?php comment_reply_link( array_merge( $args, array( 'add_below' => 'div-comment', 'depth' => $depth, 'max_depth' => $args['max_depth'] ) ) ); ?>
            </div><!-- .reply -->
        </article><!-- .comment-body -->

    <?php
    endif;
}


?>