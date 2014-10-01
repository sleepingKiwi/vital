<?php

/**
 * CUSTOM SEARCH FORM LAYOUT - FROM BONES
 */
function vital_wpsearch($form) {
    $form = '<form role="search" method="get" id="searchform" class="search-form" action="' . home_url( '/' ) . '" >
    <input type="search" value="' . get_search_query() . '" name="s" id="s" class="search-input" x-webkit-speech /><label class="search-label" for="s">'.__('Search','vital').'</label>
    ' . /*INPUT BUTTON COMMENTED OUT BY DEFAULT... <input type="submit" id="searchsubmit" value="'. esc_attr__('Search') .'" /> .*/ '
    </form>';
    return $form;
}
add_filter('get_search_form', 'vital_wpsearch');



/**
 * REDIRECTS SEARCH RESULTS FROM /?S=QUERY TO /SEARCH/QUERY/, CONVERTS %20 TO +
 */
function vital_nice_search_redirect() {
    global $wp_rewrite;
    if (!isset($wp_rewrite) || !is_object($wp_rewrite) || !$wp_rewrite->using_permalinks()) {
        return;
    }

    $search_base = $wp_rewrite->search_base;
    if (is_search() && !is_admin() && strpos($_SERVER['REQUEST_URI'], "/{$search_base}/") === false) {
        wp_redirect(home_url("/{$search_base}/" . urlencode(get_query_var('s'))));
        exit();
    }
}
add_action('template_redirect', 'vital_nice_search_redirect');

?>