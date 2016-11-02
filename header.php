<!doctype html>  
<html class ="no-js" <?php language_attributes(); ?> >
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">

<!--************************************************
Welcome to the source. Please make yourself at home.
-
We hope that you enjoy your stay - Tedworth & Oscar.
*************************************************-->

<!-- https://github.com/h5bp/html5-boilerplate/blob/master/dist/doc/html.md -->
<meta http-equiv="X-UA-Compatible" content="IE=edge">


<title><?php wp_title('-', true, 'right'); ?></title>


<meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no"/>
<meta name="HandheldFriendly" content="True">
<?php //http://speckyboy.com/2012/05/16/creating-a-mobile-web-application-with-meta-tags/ ?>

    
<?php 
/*
 *
 * For more icon/favicon options and to generate: http://css-tricks.com/favicon-quiz/
 * Generator: http://realfavicongenerator.net/
 * Make sure to put files at root even if you're including links below too...
 * Generate icons at the above link from the icon-300.psd file in the assets folder
 *
 * CURRENTLY NOT INCLUDING THE MULTIPLE PNG ICON SIZES BECAUSE THEY ARE ALL REQUESTED BY CHROME/FIREFOX...
 *
*/ 
?>
<!-- favicons -->
<link rel="shortcut icon" href="<?php echo get_template_directory_uri(); ?>/assets/img/favicons/favicon.ico">
<link rel="apple-touch-icon" sizes="57x57" href="<?php echo get_template_directory_uri(); ?>/assets/img/favicons/apple-touch-icon-57x57.png">
<link rel="apple-touch-icon" sizes="114x114" href="<?php echo get_template_directory_uri(); ?>/assets/img/favicons/apple-touch-icon-114x114.png">
<link rel="apple-touch-icon" sizes="72x72" href="<?php echo get_template_directory_uri(); ?>/assets/img/favicons/apple-touch-icon-72x72.png">
<link rel="apple-touch-icon" sizes="144x144" href="<?php echo get_template_directory_uri(); ?>/assets/img/favicons/apple-touch-icon-144x144.png">
<link rel="apple-touch-icon" sizes="60x60" href="<?php echo get_template_directory_uri(); ?>/assets/img/favicons/apple-touch-icon-60x60.png">
<link rel="apple-touch-icon" sizes="120x120" href="<?php echo get_template_directory_uri(); ?>/assets/img/favicons/apple-touch-icon-120x120.png">
<link rel="apple-touch-icon" sizes="76x76" href="<?php echo get_template_directory_uri(); ?>/assets/img/favicons/apple-touch-icon-76x76.png">
<link rel="apple-touch-icon" sizes="152x152" href="<?php echo get_template_directory_uri(); ?>/assets/img/favicons/apple-touch-icon-152x152.png">
<link rel="apple-touch-icon" sizes="180x180" href="<?php echo get_template_directory_uri(); ?>/assets/img/favicons/apple-touch-icon-180x180.png">
<meta name="msapplication-TileColor" content="#da532c">
<meta name="msapplication-TileImage" content="<?php echo get_template_directory_uri(); ?>/assets/img/favicons/mstile-144x144.png">
<meta name="msapplication-config" content="<?php echo get_template_directory_uri(); ?>/assets/img/favicons/browserconfig.xml">


<?php /*include if relevant 
<meta name="apple-mobile-web-app-capable" content="yes"/> 
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta name="apple-mobile-web-app-title" content="">
*/?>
<!-- allow pinned sites -->
<meta name="application-name" content="<?php bloginfo('name'); ?>" />


<link rel="pingback" href="<?php bloginfo('pingback_url'); ?>">


<?php
/**
 * JAVASCRIPT IN THIS THEME
 * ------------------------
 * There are a couple of inline snippets in the head here
 * Everything else is loaded in the footer!
 * JS in the footer is loaded asynchronously and queued up in lib/scripts.php
 * This article has great reference for javascript loading techniques:
 * https://www.igvita.com/2014/05/20/script-injected-async-scripts-considered-harmful/
 *
 * It's tempting to run a BBC style 'cutting the mustard' test to decide whether to load 
 * the main script file or not. However it means we can't use the async keyword on that script
 * and more worryingly would bypass the browsers 'speculative parser'
 * The approach we've taken is to run that test inside the main js file... it means users on
 * crummy browsers are downloading a lot of wasted .js so it should be weighed up on every project..
 * to conditionally load the file we could use https://github.com/filamentgroup/loadJS or
 * https://github.com/filamentgroup/enhance
 *
 * TODO:
 * Properly look into and run tests around filamentgroups core workflow: 
 * https://github.com/filamentgroup/Southstreet
 */
?>
<script>
    //cut the mustard test: http://gomakethings.com/ditching-jquery-for-vanilla-js/
    var doc = document, docEl = doc.documentElement;
    if ( 'querySelector' in document && 'addEventListener' in window ) {
        docEl.className = docEl.className.replace(/(^|\s)no-js(\s|$)/, " js ");

        try{
            //if we've cut the mustard we also check for our font loading sessionStorage:
            //not feature detecting just silently abandoning on an error as this isn't critical
            if( sessionStorage.mainfont ) { document.documentElement.className += ' js--main-fonts'; }
            if( sessionStorage.headerfont ) { document.documentElement.className += ' js--header-fonts'; }
            if( sessionStorage.boldfont ) { document.documentElement.className += ' js--bold-fonts'; }
        } catch(er){}

    }else{
        //this class is mostly for styling
        docEl.className = docEl.className.replace(/(^|\s)no-js(\s|$)/, " no-js haggard ");
    }
</script>



<?php wp_head(); ?>



<?php 
/**
 * GRUNTICONS
 * ----------
 * loading appropriate css for grunticons 
 */
?>
<script>
<?php
$grunticon_loader = get_template_directory_uri().'/assets/img/icons/dist/grunticon.loader.js';
echo file_get_contents($grunticon_loader);
?>
grunticon(["<?php echo get_template_directory_uri(); ?>/assets/img/icons/dist/icons.data.svg.css", "<?php echo get_template_directory_uri(); ?>/assets/img/icons/dist/icons.data.png.css", "<?php echo get_template_directory_uri(); ?>/assets/img/icons/dist/icons.fallback.css"]);
</script>
<noscript><link href="<?php echo get_template_directory_uri(); ?>/assets/img/icons/dist/icons.fallback.css" rel="stylesheet"></noscript>




<?php
/**
 * HTML5 SHIV
 * ----------
 * HTML5Shiv for IE - could inline this but bloats the head for non-ie browsers and IE < 9 can just suck it up.
 * https://github.com/aFarkas/html5shiv
 * would enqueue this through WP but there's no reliable way to filter scripts unlike style_loader_tag
 */
?>
<!--[if lt IE 9]>
    <script src="<?php echo get_template_directory_uri() . '/assets/bower_components/html5shiv/dist/html5shiv.min.js'; ?>"></script>
<![endif]-->





<?php //preferable to chuck humans.txt at site root 
/*
 * <!-- http://humanstxt.org/ -->
 * <link rel="author" href="<?php echo get_template_directory_uri(); ?>/assets/extras/humans.txt" />
 */
?>
        
</head>
    
<body <?php body_class(); ?>>

<!--[if lt IE 8]>
<div style="background:#efefef; padding:24px; margin-bottom:24px;">
<p>Because you're viewing this site using a very old browser you're being shown a simplified, text focused, version.</p>
<p>All of the site content is still present in this simpler design, but unfortunately the full (and beautiful) site layout is not compatible with such an old web browser!</p>
<h4 style="margin:0;">To see the full site layout please visit using <a href="http://browsehappy.com/">a more modern browser.</a></h4>
</div>
<![endif]-->

<div id="page" class="hfeed site">
    <a class="screen-reader-text skip-link" href="#content" title="Skip to content">
        <?php _e( 'Skip to content', 'vital' ); ?>
    </a>

    <header id="masthead" class="site-header" role="banner">

        <div class="wrap clearfix">

            <div class="site-branding">
                <?php $header_image = get_header_image();
                //CUSTOM HEADER IMAGES ENABLED IN init.php
                if ( ! empty( $header_image ) ){ ?>
                    <h2 class="site-logo">
                        <a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="nofollow">
                            <img class="logo" 
                                src="<?php echo esc_url( $header_image ); ?>"  
                                alt="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>"
                            />
                        </a>
                    </h2>
                <?php }else{ ?>
                    <h2 class="site-title">
                        <a href="<?php echo home_url(); ?>" rel="nofollow">
                            <?php bloginfo('name'); ?>
                        </a>
                    </h2>
                    <h3 class="site-description"><?php bloginfo( 'description' ); ?></h3>
                <?php } ?>
            </div><!-- .site-branding -->

            <?php 
                //stops debug errors appearing if nav menus don't exist
                if (has_nav_menu('main-nav')){ 
            ?> 
            <nav id="site-navigation" class="main-navigation" role="navigation">
                
                <a class="menu-toggle js--only" title="Open site menu" href="#menu--header" data-menu="menu--header">
                    <span class="hamburger"></span>
                    <span class="screen-reader-text"><?php _e( 'Menu', 'vital' ); ?></span>
                </a>

                <?php 
                    /**
                     * USING TRANSIENTS TO CACHE THE MENU
                     * ----------------------------------
                     * This isn't for every theme or situation... - menus cached this way save a ton 
                     * of queries on each page load BUT the 'active' classes won't function as
                     * intended etc. 
                     *
                     * This transient is deleted in lib/fragment-cache.php every time this menu is updated
                     * Currently there's no hook when the manage_locations tab is used to change menus
                     * as noted: http://leaves-and-love.net/transients-speed-up-wordpress-theme/#gist7431266
                     * so bare that in mind if there are issues...
                     */
                    vital_fragment_cache('nav_main-nav', WEEK_IN_SECONDS, function() {
                        wp_nav_menu( 
                            array( 
                                'theme_location' => 'main-nav',
                                'items_wrap' => '<ul id="menu--header" class="%2$s %1$s menu--header js--toggle-visuallyhidden">%3$s</ul>'
                            ) 
                        ); 
                    });
                ?>

                <?php 
                    /**
                     * DON'T WANT TRANSIENTS?
                     * ----------------------
                     */
                    //wp_nav_menu( array( 'theme_location' => 'main-nav' ) ); 
                ?>


            </nav><!-- #site-navigation -->
            <?php } ?>

        </div><!-- .wrap -->
    </header><!-- #masthead -->

    <div id="content" class="site-content wrap">
    <div class="site-content__center-container">