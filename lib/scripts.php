<?php
// Scripts and styles

function vital_scripts() {
   // Modernizr - in header
  wp_register_script( 'modernizr', get_stylesheet_directory_uri() . '/assets/js/vendor/modernizr-2.7.1.min.js', array(), '2.7.1', false );
  wp_enqueue_script( 'modernizr' );

  // register main stylesheet
  wp_register_style( 'vital-styles', get_stylesheet_directory_uri() . '/assets/css/main.css', array(), '', 'all' );

  // ie-only style sheet
  wp_register_style( 'vital-ie-styles', get_stylesheet_directory_uri() . '/assets/css/ie.css', array(), '' );

  // Load style.css from child theme
  if (is_child_theme()) {
    wp_enqueue_style('vital_child', get_stylesheet_uri(), false, null);
  }

  // jQuery is loaded in header.php using the same method from HTML5 Boilerplate:
  // Grab Google CDN's jQuery, with a protocol relative URL; fall back to local if offline
  // It's kept in the header instead of footer to avoid conflicts with plugins....
  // Could conceivably just throw it in here if you have control over plugins or you're not worried about it!
  if (!is_admin()) {
    wp_deregister_script('jquery');
    wp_register_script('jquery', '', '', '1.11.0', false);
  }

  if (is_single() && comments_open() && get_option('thread_comments')) {
    wp_enqueue_script('comment-reply');
  }

  //adding scripts file in the footer
  wp_register_script( 'vital-scripts', get_template_directory_uri() . '/assets/js/main-ck.js', array( 'modernizr', 'jquery' ), '', true );

  //and the plugins.js with it
  wp_register_script( 'vital-plugins', get_template_directory_uri() . '/assets/js/plugins-ck.js', array( 'modernizr', 'jquery' ), '', true );


  wp_enqueue_style('vital-styles');
  wp_enqueue_style('vital-ie-styles');

  wp_enqueue_script('vital-scripts');
  wp_enqueue_script('vital-plugins');
}

add_action('wp_enqueue_scripts', 'vital_scripts', 100);


// adding the conditional wrapper around ie stylesheet
// source: http://code.garyjones.co.uk/ie-conditional-style-sheets-wordpress/
function vital_ie_conditional( $tag, $handle ) {
  if ( 'vital-ie-styles' == $handle )
    $tag = '<!--[if lt IE 9]>' . "\n" . $tag . '<![endif]-->' . "\n";
  return $tag;
}

// ie conditional wrapper
add_filter( 'style_loader_tag', 'vital_ie_conditional', 10, 2 );


//DEREGISTER CONTACT FORM 7 STYLES
add_action( 'wp_print_styles', 'vital_deregister_styles', 100 );

function vital_deregister_styles() {
  wp_deregister_style( 'contact-form-7' );
}

?>