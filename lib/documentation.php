<?php
/**
 * DOCUMENTATION
 */

/**********************************************************************************************
http://codex.wordpress.org/Administration_Menus
http://codex.wordpress.org/Plugin_API/Action_Reference/admin_enqueue_scripts
**********************************************************************************************/


// Hook for adding admin menus
add_action('admin_menu', 'vital_admin_add_pages');



//Actually adding the menus
//add_menu_page( $page_title, $menu_title, $capability, $menu_slug, $function, $icon_url, $position );
function vital_admin_add_pages() {
    add_menu_page( 
        'Design Database Documentation', 
        'Documentation', 
        'publish_posts', 
        'vital-documentation', 
        'vital_documentation_content' 
    );
}





//En-queueing scripts and styles on this page only
function vital_docs_enqueue($hook) {

    //echo $hook;
    if( 'toplevel_page_vital-documentation' != $hook ){
        return;
    }

    //wp_register_script( $handle, $src, $deps, $ver, $in_footer );
    wp_register_script( 
        'vital-doc-scripts', 
        get_template_directory_uri() . '/assets/js/dist/vital-docs.min.js', 
        array( 'jquery' ), 
        '', 
        true 
    );
    wp_enqueue_script('vital-doc-scripts');

    //wp_register_style( $handle, $src, $deps, $ver, $media );
    wp_register_style( 
        'vital-doc-styles', 
        get_stylesheet_directory_uri() . '/assets/styles/dist/vital-docs.min.css', 
        array(), 
        '', 
        'all' 
    );
    wp_enqueue_style('vital-doc-styles');

}
add_action( 'admin_enqueue_scripts', 'vital_docs_enqueue' );





//Layout and content for documentation
function vital_documentation_content() {

  if ( !current_user_can('publish_posts') )  {
    wp_die( 'You do not have sufficient permissions to access this page.' );
  }

?>


  <div class="vital-documentation">
    


    <header role="banner" class="vital-doc-header">

        <?php $this_theme = wp_get_theme(); ?>
        <h2>
            <a href="http://tedworthandoscar.co.uk" target="_blank">
                <img src="<?php echo get_template_directory_uri(); ?>/assets/img/documentation/header.png" alt="Tedworth &amp; Oscar" />
            </a>
        </h2>
        <h2 class="vital-doc-main-header">
            <?php echo $this_theme->get( 'Name' ) . ' <br><small class="vital-doc-version-number">- version ' . $this_theme->get( 'Version' ) . ' -</small>';?>
        </h2>
        <h2 class="vital-doc-sub-header">
            Theme Documentation
        </h2>
    
    </header> <!-- end header -->



    <main class="vital-doc-main-content" >

        <div id="contents" class="vital-doc-contents">
            <ul>
                <li class="vital-doc-section-header">
                    <h3>Contents</h3>
                </li>
                <li>
                    <a href="#intro">Introduction</a>
                </li>
                <li>
                    <a href="#basics">WordPress - The Basics</a>
                </li>
                <li class="vital-doc-section-header">
                    <h3>Using The Site</h3>
                </li>
                <li>
                    <a href="#cadencia">Using The Site</a>
                    <ul>
                        <li><a href="#cadencia-general">Sub Option</a></li>
                        <li><a href="#cadencia-social">Sub Option</a></li>
                        <li><a href="#cadencia-translations">Sub Option</a></li>
                    </ul>
                </li>
                <li class="vital-doc-section-header">
                    <h3>Adding Entries &amp; Using The Admin Dashboard</h3>
                </li>
                <li>
                    <a href="#pages">Some Other Section</a>
                    <ul>
                        <li><a href="#pages-menus">Some Other Sub Option</a></li>
                        <li><a href="#pages-menus">Some Other Sub Option</a></li>
                        <li><a href="#pages-menus">Some Other Sub Option</a></li>
                        <li><a href="#pages-menus">Some Other Sub Option</a></li>
                    </ul>
                </li>
                <?php if ( current_user_can('manage_options') )  { ?>
                <li class="vital-doc-section-header">
                    <h3>Administrator Only Functions</h3>
                </li>
                <li>
                    <a href="#pages">Only for admins</a>
                    <ul>
                        <li><a href="#pages-menus">Not for anyone else</a></li>
                    </ul>
                </li>
                <?php } ?>
            </ul>
        </div><!-- end .vital-doc-contents -->





        <section class="vital-doc-section">

            <header>
                <h2 id="basics" class="vital-doc-heading">WordPress - The Basics</h2>
            </header>

            <div class="vital-doc-section-content">

                <p>To avoid this documentation becoming massive we're not going to cover the basics of WordPress here instead we'll focus on the custom features built into your theme.</p>

                <p>WordPress is quite a deep system but it's also quite easy to pick up, if you're having problems with any of the basic WordPress functionality or with getting anything to work, please just get in touch; we're always happy to help!</p>

                <p>For now here are a couple of great resources that cover the basics of using WordPress for blogging:</p>

                <ul>
                    <li><a href="http://easywpguide.com/" target="_blank">http://easywpguide.com/</a> <br>This covers a lot of the basics and is a great resource for learning how the core WordPress functionality works.<br><br></li>

                    <li><a href="http://codex.wordpress.org/Getting_Started_with_WordPress" target="_blank">http://codex.wordpress.org/Getting_Started_with_WordPress</a> <br>This is the official WordPress <em>Codex</em> it's a great place for more in depth information or if you're searching for a really specific answer.<br><br></li>
                </ul>

            </div>

            <footer>
                <div class="divider"></div>
                <div class="back-to-wrapper clearfix"><a href="#contents" class="back-to-contents"><span class="genericon genericon-top"></span> BACK TO CONTENTS</a></div>
            </footer>

        </section><!-- section #basics -->





        <section class="vital-doc-section">

            <header>
                <h2 id="basics" class="vital-doc-heading">Some Other Section</h2>
            </header>

            <div class="vital-doc-section-content">

                <p>Some more content in it's own little wrap!</p>

                <p>images are centred by default</p>

                <img src="<?php echo get_template_directory_uri(); ?>/assets/img/documentation/header.png" alt="Tedworth &amp; Oscar" />

                <h3 class="vital-doc-subsection">This one has a subsection!</h3>

                <p>What a treat! It also features <code>code tags for path names</code></p>

                <p class="vital-doc-highlight">And a highlighted bit of text - used for key facts or information...</p>

            </div>

            <footer>
                <div class="divider"></div>
                <div class="back-to-wrapper clearfix"><a href="#contents" class="back-to-contents"><span class="genericon genericon-top"></span> BACK TO CONTENTS</a></div>
            </footer>

        </section><!--section #another-section -->



    </main><!-- end .vital-doc-main-content -->


    <footer class="vital-doc-footer">
        <h4>Theme: 
            <a href="<?php echo get_admin_url(); ?>themes.php?theme=<?php echo $this_theme->get_stylesheet(); ?>" >
                <?php echo $this_theme->get( 'Name' ); ?>
            </a>
        </h4>

        <a class="vital-doc-theme-image-link" href="<?php echo get_admin_url(); ?>themes.php?theme=<?php echo $this_theme->get_stylesheet(); ?>" >
            <img class="vital-doc-theme-image" src="<?php echo $this_theme->get_screenshot(); ?>" />
        </a>
    </footer>
    
  </div> <!-- end .vital-documentation -->

  <?php
}//admin control functions menu layout and content

?>