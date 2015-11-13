<?php

/**
 * CUSTOMISING THE TIMYMCE EDITOR
 */

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
    return '<div class="vitally-expandable" id="'.$expandID.'">' . do_shortcode($content) . '</div> <a href="'.get_permalink().'" data-expander="'.$expandID.'" class="expand-link" data-hide="' . $link_hide . '" data-show="' . $link_show . '">' . $link_show . '</a>';
    }
}
add_shortcode('whole_post', 'vital_hidden_shortcode');




/**
 * COLUMN SHORTCODE
 */
function vital_column_left_shortcode( $atts, $content = null ) {
    if($content === null){
        return '';
    }else{

    global $post;

    extract( 
        shortcode_atts( 
        array( 
            'width_percent' => '50',
            'pad_r' => '12',
            'pad_l' => '0',
            'seamless_grid' => 'false'
        ), 
        $atts ) 
    );

     $image_margin_class = '';

    if($seamless_grid === 'true'){
        $image_margin_class = 'no-image-margins';
    }

    return '<div class="vital-column-left clearfix '.$image_margin_class.'" style="width:'.$width_percent.'%; padding-right:'.$pad_r.'px; padding-left:'.$pad_l.'px;">' . do_shortcode($content) . '</div>';
    }
}
function vital_column_right_shortcode( $atts, $content = null ) {
    if($content === null){
        return '';
    }else{

    global $post;

    extract( 
        shortcode_atts( 
        array( 
            'width_percent' => '50',
            'pad_l' => '12',
            'pad_r' => '0',
            'seamless_grid' => 'false'
        ), 
        $atts ) 
    );

    $image_margin_class = '';

    if($seamless_grid === 'true'){
        $image_margin_class = 'no-image-margins';
    }

    return '<div class="vital-column-right clearfix '.$image_margin_class.'" style="width:'.$width_percent.'%; padding-left:'.$pad_l.'px; padding-right:'.$pad_r.'px;">' . do_shortcode($content) . '</div><div class="vital-column-clear"></div>';
    }
}
add_shortcode('column_left', 'vital_column_left_shortcode');
add_shortcode('column_right', 'vital_column_right_shortcode');




/**
 * SHORT TEXT SHORTCODE
 */
function vital_constrain_shortcode( $atts, $content = null ) {
    if($content === null){
        return '';
    }else{

    global $post;

    extract( 
        shortcode_atts( 
        array( 
            'content_width' => '690'
        ), 
        $atts ) 
    );

    return '<div class="vitally-constrained" style="margin:0 auto; max-width:'.$content_width.'px;">' . do_shortcode($content) . '</div>';
    }
}
add_shortcode('narrow_text', 'vital_constrain_shortcode');





add_filter('mce_external_plugins', 'vital_add_buttons');
add_filter('mce_buttons_3', 'vital_register_buttons');
function vital_add_buttons($plugin_array) {
    $plugin_array['vital'] = get_template_directory_uri() . '/lib/tinyMCE/vital-plugins.js';
    return $plugin_array;
}
function vital_register_buttons($buttons) {
    array_push( $buttons, 'wholepost', 'column_left', 'column_right', 'narrow_text' );
    return $buttons;
}





/**
 * And Adding Button Class to Tiny MCE
 * http://alisothegeek.com/2011/05/tinymce-styles-dropdown-wordpress-visual-editor/
 */
add_filter( 'mce_buttons_3', 'my_mce_buttons_2' );

function my_mce_buttons_2( $buttons ) {
    array_unshift( $buttons, 'styleselect' );
    return $buttons;
}
add_filter( 'tiny_mce_before_init', 'my_mce_before_init' );

function my_mce_before_init( $settings ) {

    $style_formats = array(
        array(
            'title' => 'CTA style Button',
            'selector' => 'a',
            'classes' => 'button'
        ),
        /*array(
            'title' => 'Red (alt) Button',
            'selector' => 'a',
            'classes' => 'button alt-button'
        ),
        array(
            'title' => 'Callout Box',
            'block' => 'div',
            'classes' => 'callout',
            'wrapper' => true
        ),
        array(
            'title' => 'Bold Red Text',
            'inline' => 'span',
            'styles' => array(
                'color' => '#f00',
                'fontWeight' => 'bold'
            )
        )*/
    );

    $settings['style_formats'] = json_encode( $style_formats );

    return $settings;
}


?>