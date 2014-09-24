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
            <?php _vital_posted_on(); ?>
        </div><!-- .entry-meta -->
        <?php endif; ?>
    </header><!-- .entry-header -->

    <div class="entry-summary">
        <?php the_excerpt(); ?>
    </div><!-- .entry-summary -->

    <footer class="entry-footer">
        <?php _vital_entry_footer(); ?>
    </footer><!-- .entry-footer -->
</article><!-- #post-## -->