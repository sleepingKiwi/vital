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


<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
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
<link rel="icon" type="image/png" href="<?php echo get_template_directory_uri(); ?>/assets/img/favicons/favicon-192x192.png" sizes="192x192">
<link rel="icon" type="image/png" href="<?php echo get_template_directory_uri(); ?>/assets/img/favicons/favicon-160x160.png" sizes="160x160">
<link rel="icon" type="image/png" href="<?php echo get_template_directory_uri(); ?>/assets/img/favicons/favicon-96x96.png" sizes="96x96">
<link rel="icon" type="image/png" href="<?php echo get_template_directory_uri(); ?>/assets/img/favicons/favicon-16x16.png" sizes="16x16">
<link rel="icon" type="image/png" href="<?php echo get_template_directory_uri(); ?>/assets/img/favicons/favicon-32x32.png" sizes="32x32">
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


<script>
    var doc = document, docEl = doc.documentElement;
    docEl.className = docEl.className.replace(/(^|\s)no-js(\s|$)/, " js ");
</script>





<?php // GET RID OF THIS! ?>
<?php //jquery served up the html5bp way - see lib > scripts.php for some reasoning behind this ?>
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
<script>window.jQuery || document.write('<script src="<?php echo get_template_directory_uri(); ?>/assets/js/vendor/jquery-1.11.0.min.js"><\/script>')</script>





<?php wp_head(); ?>


<?php //preferable to chuck humans.txt at site root 
/*
 * <!-- http://humanstxt.org/ -->
 * <link rel="author" href="<?php echo get_template_directory_uri(); ?>/assets/extras/humans.txt" />
 */
?>
        
</head>
    
<body <?php body_class(); ?>>
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

                <a class="menu-toggle" title="Open site menu" href="#footer-navigation">
                    <?php _e( 'Menu', 'vital' ); ?>
                </a>

                <?php wp_nav_menu( array( 'theme_location' => 'main-nav' ) ); ?>
            </nav><!-- #site-navigation -->
            <?php } ?>

        </div><!-- .wrap -->
    </header><!-- #masthead -->

    <div id="content" class="site-content wrap">