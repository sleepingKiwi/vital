<?php


/**
 * CLEANING UP wp_head()
 *
 * Originally from http://wpengineer.com/1438/wordpress-header/ via Roots
 */
function vital_head_cleanup() {
    //remove_action('wp_head', 'feed_links', 2);
    //remove_action('wp_head', 'feed_links_extra', 3);
    //remove_action('wp_head', 'rsd_link');
    remove_action('wp_head', 'wlwmanifest_link');
    remove_action('wp_head', 'adjacent_posts_rel_link_wp_head', 10, 0);
    remove_action('wp_head', 'wp_generator');
    remove_action('wp_head', 'wp_shortlink_wp_head', 10, 0);

    global $wp_widget_factory;
    if(isset($wp_widget_factory->widgets['WP_Widget_Recent_Comments'])) {
        remove_action('wp_head', 
            array(
                $wp_widget_factory->widgets['WP_Widget_Recent_Comments'], 
                'recent_comments_style'
            )
        );
    }

    if (!class_exists('WPSEO_Frontend')) {
        remove_action('wp_head', 'rel_canonical');
        add_action('wp_head', 'vital_rel_canonical');
    }
}

function vital_rel_canonical() {
    global $wp_the_query;

    if (!is_singular()) {
        return;
    }

    if (!$id = $wp_the_query->get_queried_object_id()) {
        return;
    }

    $link = get_permalink($id);
    echo "\t<link rel=\"canonical\" href=\"$link\">\n";
}

add_action('init', 'vital_head_cleanup');




/**
 * REMOVE THE WORDPRESS VERSION FROM RSS FEEDS
 */
add_filter('the_generator', '__return_false');





/**
 * CLEAN UP LANGUAGE_ATTRIBUTES() USED IN <HTML> TAG
 *
 * Remove dir="ltr"
 */
function vital_language_attributes() {

    $attributes = array();
    $output = '';

    if (is_rtl()) {
        $attributes[] = 'dir="rtl"';
    }

    $lang = get_bloginfo('language');

    if ($lang && $lang !== 'en-US') {
        $attributes[] = "lang=\"$lang\"";
    } else {
        $attributes[] = 'lang="en"';
    }

    $output = implode(' ', $attributes);
    $output = apply_filters('vital_language_attributes', $output);

    return $output;
}
add_filter('language_attributes', 'vital_language_attributes');






/**
 * CLEAN UP OUTPUT OF STYLESHEET <LINK> TAGS
 */
function vital_clean_style_tag($input) {
    preg_match_all("!<link rel='stylesheet'\s?(id='[^']+')?\s+href='(.*)' type='text/css' media='(.*)' />!", $input, $matches);
    // Only display media if it is meaningful
    $media = $matches[3][0] !== '' && $matches[3][0] !== 'all' ? ' media="' . $matches[3][0] . '"' : '';
    return '<link rel="stylesheet" href="' . $matches[2][0] . '"' . $media . '>' . "\n";
}
add_filter('style_loader_tag', 'vital_clean_style_tag');





/**
 * ADD AND REMOVE BODY_CLASS() CLASSES
 */
function vital_body_class($classes) {
    // Add post/page slug
    if (is_single() || is_page() && !is_front_page()) {
        $classes[] = basename(get_permalink());
    }

    // Remove unnecessary classes
    $home_id_class = 'page-id-' . get_option('page_on_front');
    $remove_classes = array(
        'page-template-default',
        $home_id_class
    );
    $classes = array_diff($classes, $remove_classes);

    return $classes;
}

add_filter('body_class', 'vital_body_class');





/**
 * WRAP EMBEDDED MEDIA AS SUGGESTED BY READABILITY
 *
 * https://gist.github.com/965956
 * http://www.readability.com/publishers/guidelines#publisher
 */
function vital_embed_wrap($cache, $url, $attr = '', $post_ID = '') {
    return '<div class="entry-content-asset">' . $cache . '</div>';
}
add_filter('embed_oembed_html', 'vital_embed_wrap', 10, 4);





/**
 * CLEAN UP THE_EXCERPT()
 */
function vital_excerpt_length($length) {
    return POST_EXCERPT_LENGTH;
}
add_filter('excerpt_length', 'vital_excerpt_length');

function vital_excerpt_more($more) {
    return ' &hellip; <a class="excerpt-more" href="' . 
            get_permalink() . '">' . __('Continued', 'vital') . '</a>';
}

add_filter('excerpt_more', 'vital_excerpt_more');





/**
 * DON'T RETURN THE DEFAULT DESCRIPTION IN THE RSS FEED IF IT HASN'T BEEN CHANGED
 */
function vital_remove_default_description($bloginfo) {
    $default_tagline = 'Just another WordPress site';
    return ($bloginfo === $default_tagline) ? '' : $bloginfo;
}

add_filter('get_bloginfo_rss', 'vital_remove_default_description');






/**
 * ADD ADDITIONAL CLASSES ONTO WIDGETS
 * http://wordpress.org/support/topic/how-to-first-and-last-css-classes-for-sidebar-widgets
 */
function vital_widget_first_last_classes($params) {
    global $my_widget_num;

    $this_id = $params[0]['id'];
    $arr_registered_widgets = wp_get_sidebars_widgets();

    if (!$my_widget_num) {
        $my_widget_num = array();
    }

    if (!isset($arr_registered_widgets[$this_id]) || !is_array($arr_registered_widgets[$this_id])) {
        return $params;
    }

    if (isset($my_widget_num[$this_id])) {
        $my_widget_num[$this_id] ++;
    } else {
        $my_widget_num[$this_id] = 1;
    }

    $class = 'class="widget-' . $my_widget_num[$this_id] . ' ';

    if ($my_widget_num[$this_id] == 1) {
        $class .= 'widget-first ';
    } elseif ($my_widget_num[$this_id] == count($arr_registered_widgets[$this_id])) {
        $class .= 'widget-last ';
    }

    $params[0]['before_widget'] = preg_replace('/class=\"/', "$class", $params[0]['before_widget'], 1);

    return $params;
}

add_filter('dynamic_sidebar_params', 'vital_widget_first_last_classes');






/** 
 * FIX FOR GET_SEARCH_QUERY() RETURNING +'S BETWEEN SEARCH TERMS
 */
function vital_search_query($escaped = true) {
    $query = apply_filters('vital_search_query', get_query_var('s'));

    if ($escaped) {
        $query = esc_attr($query);
    }

    return urldecode($query);
}

add_filter('get_search_query', 'vital_search_query');





/**
 * FIX FOR EMPTY SEARCH QUERIES REDIRECTING TO HOME PAGE
 *
 * http://wordpress.org/support/topic/blank-search-sends-you-to-the-homepage#post-1772565
 * http://core.trac.wordpress.org/ticket/11330
 */
function vital_request_filter($query_vars) {
    if (isset($_GET['s']) && empty($_GET['s']) && !is_admin()) {
    $query_vars['s'] = ' ';
  }

  return $query_vars;
}
add_filter('request', 'vital_request_filter');

?>