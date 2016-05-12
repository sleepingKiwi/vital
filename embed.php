<?php

/**
 * REMOVE THIS FILE UNLESS YOU PLAN TO CUSTOMISE THE EMBED TEMPLATE!
 * -----------------------------------------------------------------
 * 
 * We aren't customising anything here, this is just a copy of wp-includes/theme-compat/embed.php 
 * 
 * there is a function in lib/embeds.php which is used to remove the default WP icon 
 * added to embeds but this template itself mostly just exists to serve as a placeholder/reminder 
 * that embeds can be customised!
 */

/*-----------------------------------------------------------------------------------------------*\

    if you want to remove the oEmbed functionality there's a plugin which you can easily use or 
    pull the code from: https://wordpress.org/plugins/disable-embeds/


    EMBED TEMPLATES
    ---------------
    since WP 4.4 all posts are automatically embeddable for other oEmbed consumers
    there are five template files in wp-includes/theme-compat/ that will be used if this template 
    is left out.
    for more details: https://make.wordpress.org/core/2016/03/11/embeds-changes-in-wordpress-4-5/

\*-----------------------------------------------------------------------------------------------*/

get_header( 'embed' );

if ( have_posts() ) :
    while ( have_posts() ) : the_post();
        get_template_part( 'embed', 'content' );
    endwhile;
else :
    get_template_part( 'embed', '404' );
endif;

get_footer( 'embed' );
