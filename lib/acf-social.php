<?php

/*
REGISTERS A SET OF SOCIAL MEDIA FIELDS IN DEFAULT OPTIONS PAGE
- remember to change options page location if you customise it...
all are supported by Genericons so can be shown dynamically in themes - see footer.php in Cadencia theme
*/

/*****
<div class="footer-social"><!--
    <?php

        $vital_social_array = array(
            array(
                'field' => get_field('facebook_link', 'option'),
                'icon' => 'genericon-facebook',
                'class' => 'facebook',
            ),
            array(
                'field' => get_field('twitter_link', 'option'),
                'icon' => 'genericon-twitter',
                'class' => 'twitter',
            ),
            array(
                'field' => get_field('google_link', 'option'),
                'icon' => 'genericon-googleplus',
                'class' => 'google-plus',
            ),
            array(
                'field' => get_field('pinterest_link', 'option'),
                'icon' => 'genericon-pinterest',
                'class' => 'pinterest',
            ),
            array(
                'field' => get_field('instagram_link', 'option'),
                'icon' => 'genericon-instagram',
                'class' => 'instagram',
            ),
            array(
                'field' => get_field('linkedin_link', 'option'),
                'icon' => 'genericon-linkedin',
                'class' => 'linkedin',
            ),
            array(
                'field' => get_field('vimeo_link', 'option'),
                'icon' => 'genericon-vimeo',
                'class' => 'vimeo',
            ),
            array(
                'field' => get_field('youtube_link', 'option'),
                'icon' => 'genericon-youtube',
                'class' => 'youtube',
            ),
            array(
                'field' => get_field('tumblr_link', 'option'),
                'icon' => 'genericon-tumblr',
                'class' => 'tumblr',
            ),
            array(
                'field' => get_field('dribble_link', 'option'),
                'icon' => 'genericon-dribble',
                'class' => 'dribble',
            ),
        );
        

        foreach ($vital_social_array as $v_soc) {
            if($v_soc['field']){
            ?>
                --><div class="social-icon social-icon-<?php echo $v_soc['class']; ?>">
                    <a href="<?php echo $v_soc['field']; ?>" target="_blank">
                        <span class="genericon <?php echo $v_soc['icon']; ?>" aria-hidden="true"></span>
                        <span class="visuallyhidden"><?php echo $v_soc['class']; ?></span>
                    </a>
                </div><!--
            <?php
            }
        }


    ?>
--></div><!-- end footer-social -->
*****/

if(function_exists("register_field_group"))
{
    register_field_group(array (
        'id' => 'acf_social-media-links-shown-in-site-footer',
        'title' => 'Social Media Links <small>- shown in site footer</small>',
        'fields' => array (
            array (
                'key' => 'field_vital_social_facebook',
                'label' => 'Facebook Link',
                'name' => 'facebook_link',
                'type' => 'text',
                'instructions' => 'Full URL to your Facebook profile',
                'default_value' => '',
                'placeholder' => 'http://facebook.com',
                'prepend' => '',
                'append' => '',
                'formatting' => 'none',
                'maxlength' => '',
            ),
            array (
                'key' => 'field_vital_social_twitter',
                'label' => 'Twitter Link',
                'name' => 'twitter_link',
                'type' => 'text',
                'instructions' => 'Full URL to your Twitter profile',
                'default_value' => '',
                'placeholder' => 'http://twitter.com',
                'prepend' => '',
                'append' => '',
                'formatting' => 'none',
                'maxlength' => '',
            ),
            array (
                'key' => 'field_vital_social_google',
                'label' => 'Google Plus Link',
                'name' => 'google_link',
                'type' => 'text',
                'instructions' => 'Full URL to your Google Plus profile',
                'default_value' => '',
                'placeholder' => 'http://plus.google.com',
                'prepend' => '',
                'append' => '',
                'formatting' => 'none',
                'maxlength' => '',
            ),
            array (
                'key' => 'field_vital_social_pinterest',
                'label' => 'Pinterest Link',
                'name' => 'pinterest_link',
                'type' => 'text',
                'instructions' => 'Full URL to your Pinterest profile',
                'default_value' => '',
                'placeholder' => 'http://pinterest.com',
                'prepend' => '',
                'append' => '',
                'formatting' => 'none',
                'maxlength' => '',
            ),
            array (
                'key' => 'field_vital_social_instagram',
                'label' => 'Instagram Link',
                'name' => 'instagram_link',
                'type' => 'text',
                'instructions' => 'Full URL to your Instagram profile',
                'default_value' => '',
                'placeholder' => 'http://instagram.com',
                'prepend' => '',
                'append' => '',
                'formatting' => 'none',
                'maxlength' => '',
            ),
            array (
                'key' => 'field_vital_social_linkedin',
                'label' => 'LinkedIn Link',
                'name' => 'linkedin_link',
                'type' => 'text',
                'instructions' => 'Full URL to your LinkedIn profile',
                'default_value' => '',
                'placeholder' => 'http://linkedin.com',
                'prepend' => '',
                'append' => '',
                'formatting' => 'none',
                'maxlength' => '',
            ),
            array (
                'key' => 'field_vital_social_vimeo',
                'label' => 'Vimeo Link',
                'name' => 'vimeo_link',
                'type' => 'text',
                'instructions' => 'Full URL to your Vimeo profile',
                'default_value' => '',
                'placeholder' => 'http://vimeo.com',
                'prepend' => '',
                'append' => '',
                'formatting' => 'none',
                'maxlength' => '',
            ),
            array (
                'key' => 'field_vital_social_youtube',
                'label' => 'YouTube Link',
                'name' => 'youtube_link',
                'type' => 'text',
                'instructions' => 'Full URL to your YouTube profile',
                'default_value' => '',
                'placeholder' => 'http://youtube.com',
                'prepend' => '',
                'append' => '',
                'formatting' => 'none',
                'maxlength' => '',
            ),
            array (
                'key' => 'field_vital_social_tumblr',
                'label' => 'Tumblr Link',
                'name' => 'tumblr_link',
                'type' => 'text',
                'instructions' => 'Full URL to your Tumblr profile',
                'default_value' => '',
                'placeholder' => 'http://tumblr.com',
                'prepend' => '',
                'append' => '',
                'formatting' => 'none',
                'maxlength' => '',
            ),
            array (
                'key' => 'field_vital_social_dribble',
                'label' => 'Dribble Link',
                'name' => 'dribble_link',
                'type' => 'text',
                'instructions' => 'Full URL to your Dribble profile',
                'default_value' => '',
                'placeholder' => 'http://dribble.com',
                'prepend' => '',
                'append' => '',
                'formatting' => 'none',
                'maxlength' => '',
            ),
        ),
        'location' => array (
            array (
                array (
                    'param' => 'options_page',
                    'operator' => '==',
                    'value' => 'acf-options',
                    'order_no' => 0,
                    'group_no' => 0,
                ),
            ),
        ),
        'options' => array (
            'position' => 'normal',
            'layout' => 'default',
            'hide_on_screen' => array (
            ),
        ),
        'menu_order' => 0,
    ));
}

?>