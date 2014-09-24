<?php
// The main template file. http://codex.wordpress.org/Template_Hierarchy
get_header(); ?>

    <div id="primary" class="content-area">
        <main id="main" class="site-main" role="main">

        <?php if ( have_posts() ) : ?>

            <?php //start that loop ?>
            <?php while ( have_posts() ) : the_post(); ?>

                <?php
                    /** 
                    * Include the Post-Format-specific template for the content.
                    * For good specific examples see Twenty Thirteen theme
                    * As an example content-gallery.php would be loaded for gallery formatted posts.
                    */
                    get_template_part( 'template-parts/content', get_post_format() );
                ?>

            <?php endwhile; ?>

            <?php 
                //for numbered nav call vital_number_nav( 'nav-below' );
                vital_content_nav( 'nav-below' ); 
            ?>

        <?php else : ?>

            <?php get_template_part( 'template-parts/content', 'none' ); ?>

        <?php endif; ?>

        </main><!-- #main -->
    </div><!-- #primary --><!-- inline-block-fix

<?php get_sidebar(); ?>
<?php get_footer(); ?>