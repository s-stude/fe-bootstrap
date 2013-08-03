module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        vars: {
            dist         : 'wwwroot',
            distjs       : 'main.js',
            distcss      : 'styles.css',
            distvendorcss: 'vendor.css',
            distappcss   : 'app.css'
        },

        jshint: {
            options: {
                curly  : true,
                eqeqeq : true,
                eqnull : true,
                browser: true,
                globals: {
                    jQuery: true
                }
            },

            gruntfile: ['gruntfile.js'],

            appjs: ['app/widgets/main.js', 'app/widgets/**/*.js']
        },

        cssmin: {
            appcss : {
                files: {
                    '<%= vars.dist %>/css/<%= vars.distappcss %>': ['app/widgets/**/*.css']
                }
            },
            distcss: {
                files: { '<%= vars.dist %>/css/<%= vars.distcss %>': ['<%= vars.dist %>/css/<%= vars.distvendorcss %>', '<%= vars.dist %>/css/<%= vars.distappcss %>']}
            }
        },

        requirejs: {
            appcss : {
                options: {
                    optimizeCss    : 'standard.keepLines',
                    cssImportIgnore: null,
                    cssIn          : 'app/css/<%= vars.distvendorcss %>',
                    out            : '<%= vars.dist %>/css/<%= vars.distvendorcss %>'

                }
            },
            release: {
                options: {
                    mainConfigFile         : "app/widgets/main.js",
                    name                   : "main",
                    dir                    : '<%= vars.dist %>/widgets/',
                    preserveLicenseComments: false,
                    optimize               : "uglify2",
                    generateSourceMaps     : true
                }

            }
        },

        watch: {
            appjs       : {
                files: ['app/widgets/main.js', 'app/widgets/**/*.js'],
                tasks: ['jshint', 'copy:appjs']
            },
            vendorjs    : {
                files: ['app/components/**/*.js'],
                tasks: ['copy:vendorjs']
            },
            appcss      : {
                files: ['app/css/includes.css', 'app/widgets/**/*.css'],
                tasks: ['requirejs:appcss', 'cssmin:appcss', 'cssmin:distcss']
            },
            apptemplates: {
                files: ['app/*.html', 'app/widgets/**/*.html'],
                tasks: ['copy:apptemplates']
            }
        },

        copy: {
            appapi: {
                files:[
                    {
                        expand: true,
                        src   : ['api/**'],
                        dest  : '<%= vars.dist %>/'
                    }
                ]
            },

            appjs: {
                files: [
                    {
                        expand: true,
                        cwd   : 'app/',
                        src   : ['widgets/main.js', 'widgets/**'],
                        dest  : '<%= vars.dist %>/'
                    }
                ]
            },

            vendorjs: {
                files: [
                    {
                        expand: true,
                        cwd   : 'app/',
                        src   : ['components/**'],
                        dest  : '<%= vars.dist %>/'
                    }
                ]
            },

            apptemplates: {
                files: [
                    {
                        expand: true,
                        cwd   : 'app/',
                        src   : ['*.html', 'widgets/**/*.html'],
                        dest  : '<%= vars.dist %>/'
                    }
                ]
            },

            release: {
                files: [
                    {
                        expand: true,
                        cwd   : 'app/',
                        src   : ['*.html', 'components/requirejs/require.js'],
                        dest  : '<%= vars.dist %>/'
                    }
                ]
            }
        },

        connect: {
            dev    : {
                options: {
                    port: 4000,
                    base: '<%= vars.dist %>'
                }
            },
            release: {
                options: {
                    keepalive: true,
                    port     : 4000,
                    base     : '<%= vars.dist %>'
                }
            }
        },


        clean: ['<%= vars.dist %>/']
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask(

        'default',

        [
            'clean',
            'jshint',
            'copy:appjs',
            'copy:vendorjs',
            'copy:appapi',
            'requirejs:appcss',
            'cssmin:appcss',
            'cssmin:distcss',
            'copy:apptemplates'
        ]);

    grunt.registerTask('live', ['default', 'connect:dev', 'watch']);


    grunt.registerTask('release', ['clean', 'jshint', 'copy:release', 'requirejs']);
    grunt.registerTask('live-release', ['release', 'connect:release']);


};























