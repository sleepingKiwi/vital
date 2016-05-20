    from sidebar or main content --></div><!-- .site-content__center-container -->
    </div><!-- #content -->

    <footer id="colophon" class="site-footer" role="contentinfo">
        
        <div class="wrap clearfix">

            <?php 
                //stops debug errors appearing if nav menus don't exist
                if (has_nav_menu('footer-nav')){ 
            ?> 
            <nav id="footer-navigation" class="footer-navigation" role="navigation">
                
                <?php 
                /**
                 * This transient is deleted in lib/fragment-cache.php every time this menu is updated
                 * See the nav in header.php for a fuller explanation!
                 */
                vital_fragment_cache('nav_footer-nav', WEEK_IN_SECONDS, function() {
                    wp_nav_menu( array( 'theme_location' => 'footer-nav' ) ); 
                });
                ?>

            </nav><!-- #site-navigation -->
            <?php }//has_nav_menu ?>
    
            <div class="attribution">
                <p class="copyright"><?php _e('Copyright', 'vital'); ?> 
                    <?php echo date('Y'); ?> <?php bloginfo('name'); ?></p>  
                <p>
                    Header Font: 
                    <a 
                    href="http://www.theleagueofmoveabletype.com/goudy-bookletter-1911/?" 
                    target="_blank"
                    >
                        Goudy Bookletter 1911
                    </a>
                </p>
                <div class="tando-footer">
                    <a href="http://tedworthandoscar.co.uk" target="_blank"><span class="amperbrand"></span></a>
                </div>
                <p class="promotional">site by Tedworth <span class="amp">&amp;</span> Oscar</p>
            </div>
        
        </div> <!-- .wrap -->

    </footer><!-- #colophon -->
</div><!-- #page -->

<?php wp_footer(); ?>

<?php if (GOOGLE_ANALYTICS_ID){ ?>

<script>
    (function(T,e,d,w,o,r,t,h){T.GoogleAnalyticsObject=w;T[w]||(T[w]=
    function(){(T[w].q=T[w].q||[]).push(arguments)});T[w].w=+new Date;
    o=e.createElement(d);r=e.getElementsByTagName(d)[0];
    o.src='https://www.google-analytics.com/analytics.js';
    r.parentNode.insertBefore(o,r)}(window,document,'script','ga'));
    ga('create','<?php echo GOOGLE_ANALYTICS_ID; ?>','auto');ga('send','pageview');
</script>

<?php } ?>

</body>
</html>