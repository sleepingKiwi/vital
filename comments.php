<?php 

// modified slightly from _S

/*
** If the current post is protected by a password and
** the visitor has not yet entered the password we will
** return early without loading the comments.
*/
if ( post_password_required() )
    return;
?>

    <div id="comments" class="comments-area">

    <?php if ( have_comments() ) : ?>
        <h2 class="comments-title">
            <?php
                printf( 
                    _nx( 'One response to %2$s', '%1$s responses to %2$s', 
                    get_comments_number(), '
                    comments title', 
                    'vital' ),
                    number_format_i18n( get_comments_number() ), 
                    '<span class="comment-post-title">' . get_the_title() . '</span>' 
                );
            ?>
        </h2>

        <?php if ( get_comment_pages_count() > 1 && get_option( 'page_comments' ) ) : 
        // are there comments to navigate through ?>
        <nav id="comment-nav-above" class="comment-navigation" role="navigation">
            <h1 class="screen-reader-text">
                <?php _e( 'Comment navigation', 'vital' ); ?>
            </h1>
            <div class="nav-previous">
                <?php previous_comments_link( __( '&larr; Older Comments', 'vital' ) ); ?>
            </div>
            <div class="nav-next">
                <?php next_comments_link( __( 'Newer Comments &rarr;', 'vital' ) ); ?>
            </div>
        </nav><!-- #comment-nav-above -->
        <?php endif; // check for comment navigation ?>

        <ol class="comment-list">
            <?php
                /* Loop through and list the comments. Tell wp_list_comments()
                ** to use vital_comment() to format the comments.
                ** lib/template-tags.php for vital_comment()
                */
                wp_list_comments( array( 'callback' => 'vital_comment' ) );
            ?>
        </ol><!-- .comment-list -->

        <?php if ( get_comment_pages_count() > 1 && get_option( 'page_comments' ) ) : 
        // are there comments to navigate through ?>
        <nav id="comment-nav-below" class="comment-navigation" role="navigation">
            <h1 class="screen-reader-text">
                <?php _e( 'Comment navigation', 'vital' ); ?>
            </h1>
            <div class="nav-previous">
                <?php previous_comments_link( __( '&larr; Older Comments', 'vital' ) ); ?>
            </div>
            <div class="nav-next">
                <?php next_comments_link( __( 'Newer Comments &rarr;', 'vital' ) ); ?>
            </div>
        </nav><!-- #comment-nav-below -->
        <?php endif; // check for comment navigation ?>

    <?php endif; // have_comments() ?>

    <?php
        // If comments are closed and there are comments, let's leave a little note, shall we?
        if ( ! comments_open() && '0' != get_comments_number() && post_type_supports( get_post_type(), 'comments' ) ) :
    ?>
        <p class="no-comments"><?php _e( 'Comments are closed.', 'vital' ); ?></p>
    <?php endif; ?>

    <?php 
        // see http://codex.wordpress.org/Function_Reference/comment_form for customisation
        $comments_args = array(
            // remove "Text or HTML to be displayed after the set of comment fields"
            'comment_notes_after' => ''
        );
        comment_form($comments_args);
    ?>

</div><!-- #comments -->