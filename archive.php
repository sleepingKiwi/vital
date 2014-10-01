<?php get_header(); ?>

<section id="primary" class="content-area has-sidebar">
    <main id="main" class="site-main" role="main">

    <?php if ( have_posts() ) : ?>

        <header class="page-header">
            <h1 class="page-title">
                <?php
                    if ( is_category() ) :
                        single_cat_title();

                    elseif ( is_tag() ) :
                        single_tag_title();

                    elseif ( is_author() ) :
                        printf( __( 'Author: %s', 'vital' ), 
                            '<span class="vcard">' . get_the_author() . '</span>' 
                        );

                    elseif ( is_day() ) :
                        printf( __( 'Day: %s', 'vital' ), 
                            '<span>' . get_the_date() . '</span>' 
                        );

                    elseif ( is_month() ) :
                        printf( __( 'Month: %s', 'vital' ), 
                            '<span>' . 
                            get_the_date( _x( 'F Y', 'monthly archives date format', 'vital' ) ) . 
                            '</span>' 
                        );

                    elseif ( is_year() ) :
                        printf( __( 'Year: %s', 'vital' ), 
                            '<span>' . 
                            get_the_date( _x( 'Y', 'yearly archives date format', 'vital' ) ) . 
                            '</span>' 
                        );

                    elseif ( is_tax( 'post_format', 'post-format-aside' ) ) :
                        _e( 'Asides', 'vital' );

                    elseif ( is_tax( 'post_format', 'post-format-gallery' ) ) :
                        _e( 'Galleries', 'vital' );

                    elseif ( is_tax( 'post_format', 'post-format-image' ) ) :
                        _e( 'Images', 'vital' );

                    elseif ( is_tax( 'post_format', 'post-format-video' ) ) :
                        _e( 'Videos', 'vital' );

                    elseif ( is_tax( 'post_format', 'post-format-quote' ) ) :
                        _e( 'Quotes', 'vital' );

                    elseif ( is_tax( 'post_format', 'post-format-link' ) ) :
                        _e( 'Links', 'vital' );

                    elseif ( is_tax( 'post_format', 'post-format-status' ) ) :
                        _e( 'Statuses', 'vital' );

                    elseif ( is_tax( 'post_format', 'post-format-audio' ) ) :
                        _e( 'Audios', 'vital' );

                    elseif ( is_tax( 'post_format', 'post-format-chat' ) ) :
                        _e( 'Chats', 'vital' );

                    else :
                        _e( 'Archives', 'vital' );

                    endif;
                ?>
            </h1>
            <?php
                // Show an optional term description.
                $term_description = term_description();
                if ( ! empty( $term_description ) ) :
                    printf( '<div class="taxonomy-description">%s</div>', $term_description );
                endif;
            ?>
        </header><!-- .page-header -->
        
        <?php //Start the Loop ?>
        <?php while ( have_posts() ) : the_post(); ?>

            <?php
                /* displaying full content by default */
                get_template_part( 'template-parts/content', get_post_format() );
            ?>

        <?php endwhile; ?>

        <?php 
            // link for ajax based loading of the next page
            // if you want it to interact with the nav below pass the same ID
            vital_load_more_link( 'nav-below' );

            // for text nav call vital_content_nav( 'nav-below' );
            vital_number_nav( 'nav-below' );
        ?>

    <?php else : ?>

        <?php get_template_part( 'template-parts/content', 'none' ); ?>

    <?php endif; ?>

    </main><!-- #main -->
</section><!-- #primary --><!-- inline-block-fix

<?php get_sidebar(); ?>
<?php get_footer(); ?>