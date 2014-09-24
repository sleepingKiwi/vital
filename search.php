<?php get_header(); ?>

    <section id="primary" class="content-area">
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

            <?php vital_content_nav( 'nav-below' ); ?>

        <?php else : ?>

            <?php get_template_part( 'no-results', 'search' ); ?>

        <?php endif; ?>

        </main><!-- #main -->
    </section><!-- #primary --><!-- inline-block-fix

<?php get_sidebar(); ?>
<?php get_footer(); ?>