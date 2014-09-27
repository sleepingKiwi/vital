<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

    <header class="entry-header">

        <h1 class="entry-title">
            <a href="<?php echo esc_url( get_permalink() ); ?>" rel="bookmark">
                <?php if(get_the_title() == ''){ 
                    _ex('{untitled}', 'An untitled post title', 'vital'); 
                }else{
                    the_title();
                } ?>
            </a>
        </h1>

        <?php if ( 'post' == get_post_type() ) : ?>
        <div class="entry-meta">
            <?php vital_posted_on(); ?>
        </div><!-- .entry-meta -->
        <?php endif; ?>

    </header><!-- .entry-header -->


    <div class="entry-content clearfix">

        <?php 
            if( class_exists('Vitally_Responsible') ){
                 do_action( 'vitally_responsible_content', __('Continue reading <span class="meta-nav">&rarr;</span>', 'vital') );
            }else{
                the_content( __('Continue reading <span class="meta-nav">&rarr;</span>', 'vital') );
            }
        ?>

        <?php
            wp_link_pages( array(
                'before' => '<div class="page-links">' . __( 'Pages:', 'vital' ),
                'after'  => '</div>',
            ) );
        ?>
    </div><!-- .entry-content -->


    <footer class="entry-footer">
        <?php vital_entry_footer(); ?>
    </footer><!-- .entry-footer -->
    
</article><!-- #post-## -->