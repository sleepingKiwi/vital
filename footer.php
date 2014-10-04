    from sidebar or main content --></div><!-- #content -->

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
<!-- https://github.com/h5bp/html5-boilerplate/blob/master/doc/html.md#google-analytics-tracking-code -->
<script>
!function(t,a,n,d,o){t.GoogleAnalyticsObject=n,t[n]||(t[n]=function(){(t[n].q=t[n].q||[]).push(arguments)}),t[n].l=+new Date,d=a.createElement("script"),o=a.scripts[0],d.src="//www.google-analytics.com/analytics.js",o.parentNode.insertBefore(d,o)}(this,document,"ga");
ga("create", "<?php echo GOOGLE_ANALYTICS_ID; ?>");
ga("send", "pageview");
</script>


<?php } ?>

</body>
</html>