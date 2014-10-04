<?php
/**
 * USING TRANSIENTS TO CACHE THINGS ALL ABOUT THE PLACE
 * The specifics of how these transients are handled in terms of deletion etc. 
 * should be handled in individual cases
 */


/**
 * TRANSIENT REFERENCES:
 * http://www.codeforest.net/wordpress-transients-api-caching-benchmarks
 * http://leaves-and-love.net/transients-speed-up-wordpress-theme/
 * http://codex.wordpress.org/Transients_API 
 * http://css-tricks.com/wordpress-fragment-caching-revisited/
 *
 * Lots of noise online about expired transients not being cleared. This is (sort of) in Core now
 * https://core.trac.wordpress.org/ticket/20316
 * and occurs with all database upgrades... however if it's required more regularly for you 
 * have a look at: 
 * http://www.stumiller.me/does-wordpress-delete-expired-transients-from-the-database/
 * https://github.com/Seebz/Snippets/blob/master/Wordpress/plugins/purge-transients/purge-transients.php
 * or install: https://wordpress.org/plugins/artiss-transient-cleaner/
 */


/**
 * CREATE TRANSIENTS USING OUTPUT BUFFER FOR OUTPUT OF PASSED FUNCTION.
 * http://css-tricks.com/wordpress-fragment-caching-revisited/
 */
function vital_fragment_cache($key, $ttl, $function) {
  $key = apply_filters('fragment_cache_prefix','frag_').$key;
  $output = get_transient($key);
  if ( false === $output ) {
    ob_start();
    call_user_func($function);
    $output = ob_get_clean();
    set_transient($key, $output, $ttl);
  }
  echo $output;
}



function vital_fragment_clear($key) {
    $key = apply_filters('fragment_cache_prefix','frag_').$key;
    delete_transient('vitalMainMenu');
}






/**
 * Clear transients when the menus are updated
 * http://leaves-and-love.net/transients-speed-up-wordpress-theme/
 */
function vital_updateMenu( $id ){
    /**
     * Nav is passed 'location' when it's created (main-nav or footer-nav for example)
     * we use the array_keys (http://php.net/manual/en/function.array-keys.php) function
     * to grab the keys associated with the ID for the nav that was just updated
     * those keys correspond to the locations where this nav appears and the  
     * strings we need to kill transients for...
     */
    $locations = get_nav_menu_locations();
    if( is_array( $locations ) && $locations )
    {
        $locations = array_keys( $locations, $id );
        if( $locations )
        {
            foreach( $locations as $location )
            {
                vital_fragment_clear( 'nav_' . $location );
            }
        }
    }

}
add_action( 'wp_update_nav_menu', 'vital_updateMenu' );



?>