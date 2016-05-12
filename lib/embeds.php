<?php

    /**
     * customising oEmbeds...
     * -
     * to heavily customise the oEmbed template look at the embed.php file in the theme root
     */


        // replacing the oEmbed site title with one that doesn't include a WordPress fallback icon!
        // https://developer.wordpress.org/reference/functions/the_embed_site_title/
    function vital_embed_title( $site_title ) {

        $site_title = sprintf(
            '<a href="%s" target="_top" style="padding-left:0;" ><span>%s</span></a>',
            esc_url( home_url() ),
            esc_html( get_bloginfo( 'name' ) )
        ); 
        $site_title = '<div class="wp-embed-site-title">' . $site_title . '</div>';

        return $site_title;
    }
    add_filter( 'embed_site_title_html', 'vital_embed_title' );



    /**
     * Removing oEmbed functionality.
     */
        //use https://wordpress.org/plugins/disable-embeds/
?>