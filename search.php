<?php get_header(); ?>

    <section id="primary" class="content-area has-sidebar">
        <main id="main" class="site-main" role="main">

            <header class="page-header">
                <h1 class="page-title">
                    <?php global $wp_query;
                    $total_results = $wp_query->found_posts;
                    if($total_results == 0){ ?>
                        <span>No Results for:</span> <?php echo esc_attr(get_search_query()); ?>
                    <?php }elseif($total_results == 1){ ?>
                        <span>1 Search Result for:</span> <?php echo esc_attr(get_search_query()); ?>
                    <?php }else{ ?>
                        <span><?php echo $total_results; ?> Search Results for:</span> <?php echo esc_attr(get_search_query()); ?>
                    <?php } ?>
                </h1>
            </header><!-- .page-header -->

        <?php if ( have_posts() ) : ?>

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

            <?php get_template_part( 'template-parts/content', 'none' ); ?>

        <?php endif; ?>

        </main><!-- #main -->
    </section><!-- #primary --><!-- inline-block-fix

<?php get_sidebar(); ?>
<?php get_footer(); ?>