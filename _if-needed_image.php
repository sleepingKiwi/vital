<?php
// could really get rid of this completely. 
// redirects to image source rather than showing in the confines of the site...
header ('HTTP/1.1 301 Moved Permanently');
$attachedimage = wp_get_attachment_image_src( $post->ID, 'full' );
header ('Location: '.$attachedimage[0]);
?>