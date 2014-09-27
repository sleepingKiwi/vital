<?php
/**
 * CUSTOM FUNCTIONALITY - MISC CUSTOM FUNCTIONALITY...
 * This is a bit lazy isn't it... these could probably be better organised than just dumped into a
 * 'custom.php' file...
 */



/**
 * SET SEO BY YOAST META BOXES TO LOWER PRIORITY
 */
add_filter( 'wpseo_metabox_prio', function() { return 'low';});



/**
 * SET IMAGE QUALITY TO MAXIMUM (USE AS NEEDED)
 */
add_filter( 'wp_editor_set_quality', 'vital_image_full_quality' );
function vital_image_full_quality( $quality ) {
    return 100;
}





/**
 * EXPAND/COLLAPSE SHORTCODE
 */
function vital_hidden_shortcode( $atts, $content = null ) {
    if($content === null){
        return '';
    }else{

    global $post;

    extract( 
        shortcode_atts( 
        array( 
            'link_show' => 'View Whole Post',
            'link_hide' => 'Collapse Post',
        ), 
        $atts ) 
    );

    //is there a better way to ensure these are unique if there are two expanders in one post???
    $expandID = $post->post_name.'-'.rand();
    return '<div class="vitally-expandable" id="'.$expandID.'">' . $content . '</div> <a href="'.get_permalink().'" data-expander="'.$expandID.'" class="expand-link" data-hide="' . $link_hide . '" data-show="' . $link_show . '">' . $link_show . '</a>';
    }
}
add_shortcode('whole_post', 'vital_hidden_shortcode');

add_filter("mce_external_plugins", "vital_add_buttons");
add_filter('mce_buttons_3', 'vital_register_buttons');
function vital_add_buttons($plugin_array) {
    $plugin_array['vital'] = get_template_directory_uri() . '/lib/tinyMCE/wholepost-plugin.js';
    return $plugin_array;
}
function vital_register_buttons($buttons) {
    array_push( $buttons, 'wholepost' );
    return $buttons;
}





/**
 * RESPONSIVE VIDEOS
 *
 * Is there a better way to handle this yet? Don't like using text matching...
 *
 * http://designisphilosophy.com/tutorials/automatic-responsive-videos-in-wordpress-with-oembed-fitvids-and-a-little-php-magic/
 * http://amobil.se/2011/11/responsive-embeds/
 */
function strposa($haystack, $needles=array(), $offset=0) {
    $chr = array();
    foreach($needles as $needle) {
        $res = strpos($haystack, $needle, $offset);
        if ($res !== false) $chr[$needle] = $res;
    }
    if(empty($chr)) return false;
    return min($chr);
}

function vital_embed_filter( $output, $data, $url ) {

    //http://core.trac.wordpress.org/browser/tags/4.0/src/wp-includes/class-oembed.php
    $vital_oembed_videos = array( 
        'funnyordie', 
        'wordpress.tv', 
        'revision3.com', 
        'qik.com', 
        'hulu', 
        'vimeo', 
        'youtube', 
        'youtu.be', 
        'blip.tv', 
        'dailymotion', 
        'http://dai.ly', 
        'animoto.com', 
        'video214.com', 
        'collegehumor.com', 
        'ted.com' 
    );

    //Check the URL against a list of providers if it looks like it's from a video site add the responsible video
    if( strposa($url, $vital_oembed_videos, 0) ){
        $return = '<div class="responsible-video">'.$output.'</div>';
        return $return;
    }

    return $output;
 
}

add_filter('oembed_dataparse', 'vital_embed_filter', 90, 3 );
//styling that actually makes this work in the css!




/**
 * REMOVE <P> FROM AROUND IMAGES
 * http://css-tricks.com/snippets/wordpress/remove-paragraph-tags-from-around-images/
 */
function filter_ptags_on_images($content){
   	return preg_replace('/<p>\s*(<a .*>)?\s*(<img .* \/>)\s*(<\/a>)?\s*<\/p>/iU', '\1\2\3', $content);
   	//edited to also remove <p class="whatever"> if needed.....
	//return preg_replace('/<\s*p[^>]*>\s*(<a .*>)?\s*(<img .* \/>)\s*(<\/a>)?\s*<\s*\/\s*p\s*>/iU', '\1\2\3', $content);
}
//add_filter('the_content', 'filter_ptags_on_images');





/**
 * AUTOMATIC FEATURED IMAGES
 * http://wpforce.com/automatically-set-the-featured-image-in-wordpress/
 */
function vital_autoset_featured($new_status, $old_status, $post ) {
    if( $new_status != 'publish' ) return;

    $already_has_thumb = has_post_thumbnail($post->ID);
    if (!$already_has_thumb)  {
        $attached_image = get_children( "post_parent=$post->ID&post_type=attachment&post_mime_type=image&numberposts=1" );
        if ($attached_image) {
            foreach ($attached_image as $attachment_id => $attachment) {
                set_post_thumbnail($post->ID, $attachment_id);
            }
        }
    }
}  //end function
add_action( 'transition_post_status', 'vital_autoset_featured', 10, 3 );

?>