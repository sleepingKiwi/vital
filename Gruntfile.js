'use strict';
module.exports = function(grunt) {

    // show elapsed time at the end
    //https://github.com/sindresorhus/time-grunt
    require('time-grunt')(grunt);

    // load all grunt tasks named grunt-* from package.json
    // https://github.com/sindresorhus/load-grunt-tasks
    require('load-grunt-tasks')(grunt);


    // configurable paths
    var vitalConfig = {
        css : 'assets/styles',
        sass : 'assets/styles'
    };

    grunt.initConfig({
        
        //never seem to use this...
        //pkg: grunt.file.readJSON('package.json'),


        clean: {
            styles: ['assets/styles/dist/'],
            js: ['assets/js/dist/'],
            icons: ['assets/img/icons/dist']
        },


        // watch for changes and trigger sass, jshint, uglify and livereload
        watch: {
            sass: {
                files: ['assets/styles/source/**/*.{scss,sass}'],
                tasks: ['sass:watch', 'newer:autoprefixer', 'notify:styles']
            },
            js: {
                files: '<%= jshint.all %>',
                tasks: ['newer:jshint', 'newer:concat', 'newer:uglify', 'notify:js']
            },
            //images: {
                //files: ['assets/img/**/*.{png,jpg,gif}'],
                /**
                 * the newer: prefix comes from
                 * https://github.com/tschaub/grunt-newer
                 * means only newer images are optimised!
                 */
                //tasks: ['newer:imageoptim']
            //},
            livereload: {
                files: [
                    'assets/styles/dist/*.min.css',
                    'assets/js/dist/*.min.js',
                    //'assets/img/**/*.{png,jpg,gif}'
                ],
                options: { livereload: true }
            }
        },

        // sass
        sass: {
            dist: {
                options: {
                    style: 'compressed',
                    loadPath: 'assets/bower_components',
                    sourcemap: 'auto'
                },
                files: {
                    'assets/styles/dist/style.css': 'assets/styles/source/style.scss',
                    'assets/styles/dist/editor-style.css': 'assets/styles/source/editor-style.scss',
                    'assets/styles/dist/admin.css': 'assets/styles/source/admin.scss',
                    'assets/styles/dist/ie.css': 'assets/styles/source/ie.scss',
                    'assets/styles/dist/login.css': 'assets/styles/source/login.scss',
                    'assets/styles/dist/tedworth-colours.css': 'assets/styles/source/tedworth-colours.scss',
                    'assets/styles/dist/vital-docs.css': 'assets/styles/source/vital-docs.scss',
                }
            },
            // uses the update parameter to only build files that have been updated
            watch: {
                options: {
                    style: 'compressed',
                    loadPath: 'assets/bower_components',
                    sourcemap: 'auto',
                    update: true
                },
                files: '<%= sass.dist.files %>'
            }
        },

        // autoprefixer
        autoprefixer: {
            options: {
                browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1', 'ie >= 8', 'ios >= 4', 'android >= 3'],
                map: true
            },
            files: {
                // explains this expanded syntax well: 
                // http://gruntjs.com/configuring-tasks#building-the-files-object-dynamically
                expand: true,
                flatten: true,
                cwd: 'assets/styles/dist',
                src: ['*.css', '!*.min.css'],
                dest: 'assets/styles/dist',
                ext: '.min.css'
            },
        },



        // css minify - no longer used - sass is compressing for us!
        /*
        cssmin: {
            options: {
                keepSpecialComments: 1
            },
            minify: {
                // explains this expanded syntax well: 
                // http://gruntjs.com/configuring-tasks#building-the-files-object-dynamically
                expand: true,
                cwd: 'assets/styles/dist',
                src: ['*.css', '!*.min.css'],
                dest: 'assets/styles/dist',
                ext: '.min.css'
            }
        },
        */



        // javascript linting with jshint
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                "force": true
            },
            all: [
                //we don't hint vendor or bower_components...
                'assets/js/main/**/*.js',
                'assets/js/plugins/**/*.js',
                'assets/js/docs/**/*.js'
            ]
        },



        concat: {
            main: {
                options: {
                    sourceMap: true
                },
                files: {
                    'assets/js/dist/main.js': [
                        'assets/js/mustard/pre.js',
                        'assets/bower_components/jquery/dist/jquery.js',
                        //'assets/bower_components/filament-fixed/fixedfixed.js',
                        //currently using custom version of above inside plugins...
                        'assets/js/jquery-compat.js',
                        'assets/js/vendor/**/*.js',
                        'assets/js/plugins/**/*.js',
                        //'assets/bower_components/**/*.js',
                        // THESE COME IN MANUALLY TO ENSURE CORRECT ORDER (especially for IE8)
                        'assets/js/main/vital-utilities.js',
                        'assets/js/main/load-more-posts.js',
                        'assets/js/main/nav.js',
                        'assets/js/main/main.js',
                        'assets/js/main/window-load.js',
                        'assets/js/mustard/post.js'
                    ],
                    'assets/js/dist/vital-docs.js': [
                        'assets/js/docs/**/*.js'
                    ]
                }
            }
        },

        // uglify to concat, minify, and make source maps
        uglify: {
            main: {
                options: {
                    sourceMap: true,
                    sourceMapIn: 'assets/js/dist/main.js.map',
                    preserveComments: 'some'
                },
                files: {
                    'assets/js/dist/main.min.js': [
                        'assets/js/dist/main.js'
                    ],
                    'assets/js/dist/vital-docs.min.js': [
                        'assets/js/dist/vital-docs.js'
                    ]
                }
            }
        },



        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'assets/img/icons/source',
                    src: ['*.svg'],
                    dest: 'assets/img/icons/dist/svg'
                }]
            }
        },
        grunticon: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'assets/img/icons/dist/svg',
                    src: ['*.svg', '*.png'],
                    dest: "assets/img/icons/dist"
                }],
                options: {
                    cssprefix: '.vitalicon-',
                    /**
                     * Colours can be automated through the filename using the parameters below.
                     * naming icon.svg to icon.colors-main-inverse-link-highlight.svg
                     * would generate 4 copies with all 4 colours listed below...
                     */
                    colors: {
                        main: '#333333',
                        inverse: '#fcfcfc',
                        link: '#220000',
                        highlight: '#660000'
                    }
                }
            }
        },




        /**
         * Not currently called anywhere - most images are handled manually for now
         */
        imageoptim: {
            dist: {
                options: {
                    jpegMini: false,
                    imageAlpha: true,
                    quitAfter: true
                },
                src: ['assets/img/source'],
                dest: ['assets/img/dist']
            }
        },



        notify: {
            styles: {
              options: {
                message: 'SASS compiled and prefixed', //required
              }
            },
            js: {
              options: {
                message: 'Javascript minified and checked'
              }
            },
            icons: {
              options: {
                message: 'Icons created'
              }
            }
        }


    });//grunt.initConfig


    // register task
    grunt.registerTask('styles', ['clean:styles', 'sass:dist', 'autoprefixer', 'notify:styles']);  

    grunt.registerTask('js', ['clean:js', 'jshint', 'concat', 'uglify', 'notify:js']);  

    grunt.registerTask('icons', ['clean:icons', 'svgmin', 'grunticon', 'notify:icons']);

    grunt.registerTask('default', ['styles', 'js', 'icons']);  


}//module.exports