<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
    <header class="entry-header">
        
        <h1 class="entry-title">
            <?php 
            if(get_the_title() == ''){ 
                _ex('{untitled}', 'An untitled page title', 'vital'); 
            }else{
                the_title();
            } ?>
        </h1>
        
    </header><!-- .entry-header -->

    <div class="entry-content clearfix">
        <?php 
            if( class_exists('Vitally_Responsible') ){
                 do_action( 'vitally_responsible_content');
            }else{
                the_content();
            }
        ?>
        <?php
            wp_link_pages( array(
                'before' => '<div class="page-links">' . __( 'Pages:', 'vital' ),
                'after'  => '</div>',
            ) );
        ?>
    </div><!-- .entry-content -->
    <?php edit_post_link( __( 'Edit', 'vital' ), '<footer class="entry-footer"><span class="edit-link">', '</span></footer>' ); ?>
</article><!-- #post-## -->