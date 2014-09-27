<?php
/**
 * Twenty Thirteen back compat functionality.
 *
 * Basically prevents this theme from running in WP < 3.6...
 *
 */

/**
 * Prevent switching to This theme on old versions of WordPress. Switches
 * to the default theme.
 */
function vital_switch_theme() {
	switch_theme( WP_DEFAULT_THEME, WP_DEFAULT_THEME );
	unset( $_GET['activated'] );
	add_action( 'admin_notices', 'vital_upgrade_notice' );
}
add_action( 'after_switch_theme', 'vital_switch_theme' );

/**
 * Prints an update nag after an unsuccessful attempt to switch to
 * This theme on WordPress versions prior to 3.6.
 */
function vital_upgrade_notice() {
	$message = sprintf( __( 'This theme requires at least WordPress version 3.6. You are running version %s. Please upgrade and try again.', 'vital' ), $GLOBALS['wp_version'] );
	printf( '<div class="error"><p>%s</p></div>', $message );
}

/**
 * Prevents the Customizer from being loaded on WordPress versions prior to 3.6.
 */
function vital_customize() {
	wp_die( sprintf( __( 'This theme requires at least WordPress version 3.6. You are running version %s. Please upgrade and try again.', 'vital' ), $GLOBALS['wp_version'] ), '', array(
		'back_link' => true,
	) );
}
add_action( 'load-customize.php', 'vital_customize' );

/**
 * Prevents the Theme Preview from being loaded on WordPress versions prior to 3.4.
 */
function vital_preview() {
	if ( isset( $_GET['preview'] ) ) {
		wp_die( sprintf( __( 'This theme requires at least WordPress version 3.6. You are running version %s. Please upgrade and try again.', 'vital' ), $GLOBALS['wp_version'] ) );
	}
}
add_action( 'template_redirect', 'vital_preview' );