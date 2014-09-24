<?php get_header(); ?>
            
<div id="primary" class="content-area">
    <main id="main" class="site-main" role="main">

        <section class="error-404 not-found">
            <header class="page-header">
                <h1 class="page-title"><?php _e( '404', 'vital'); ?></h1>
                <h3 class="page-subtitle"><?php _e( 'Page cannot not be found', 'vital'); ?></h3>
            </header><!-- .page-header -->
        
            <div class="page-content">
            
                <p>
                <?php _e('Sorry the requested resource could not be found. Maybe using the search form below or menu above can help you find what you\'re looking for?', 'vital'); ?>
                </p>

                <?php get_search_form(); ?>
    
            </div> <!-- .page-content -->
        </section><!-- .error-404 -->

    </main><!-- #main -->
</div><!-- #primary --><!--

<?php get_footer(); ?>