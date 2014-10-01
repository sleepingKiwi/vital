<?php get_header(); ?>

    <section id="primary" class="content-area has-sidebar">
        <main id="main" class="site-main" role="main">

        <?php if ( have_posts() ) : ?>

            <header class="page-header">
                <h1 class="page-title">
                    <?php printf( 
                        __( 'Search Results for: %s', 'vital' ), 
                        '<span>' . get_search_query() . '</span>' 
                    ); ?>
                </h1>
            </header><!-- .page-header -->

            <?php // doing a loop ?>
            <?php while ( have_posts() ) : the_post(); ?>

                <?php get_template_part( 'template-parts/content', 'search' ); ?>

            <?php endwhile; ?>

            <?php 
                // link for ajax based loading of the next page
                // if you want it to interact with the nav below pass the same ID
                vital_load_more_link( 'nav-below' );

                // for text nav call vital_content_nav( 'nav-below' );
                vital_number_nav( 'nav-below' );
            ?>

        <?php else : ?>

            <?php get_template_part( 'no-results', 'search' ); ?>

        <?php endif; ?>

        </main><!-- #main -->
    </section><!-- #primary --><!-- inline-block-fix

<?php get_sidebar(); ?>
<?php get_footer(); ?>