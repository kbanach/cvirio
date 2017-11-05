module.exports = function(grunt){

    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-inject');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        eslint: {
            target: ['src/']
        },

        clean: {
            dist: ['dist/']
        },

        browserify: {
            dist: {
                files: {
                    'dist/js/script.js': ['src/**/*.js'],
                },
            },
        },

        uglify: {
            dist: {
                files: {
                    'dist/js/script.min.js': ['dist/js/script.js'],
                },
            },
        },

        copy: {
            dist: {
                files: [
                    { expand: true, cwd: 'public/', src: '**', dest: 'dist' },
                    { expand: true, cwd: 'node_modules/phaser-ce/build/', src: 'phaser.min.js', dest: 'dist/static/' },
                ],
            },
        },

        watch: {
            options: {
                livereload: true,
            },
            src: {
                files: ['src/**/*.js', 'public/*'],
                tasks: ['generateDist', 'inject'],
                options: {
                    interrupt: true,
                },
            }
        },

        inject: {
            livereloadClient: { 
                scriptSrc: 'injections/livereload-inject.js',
                files: {
                    'dist/index.html': 'public/index.html',
                },
            },
        },

        connect: {
            server: {
                options: {
                    port: 8000,
                    base: 'dist/'
                }
            },
        },
    }); 

    grunt.registerTask('generateDist', ['clean', 'browserify', 'uglify', 'copy']);

    grunt.registerTask('build', ['eslint', 'generateDist']);
    
    grunt.registerTask('serve', ['build', 'inject', 'connect', 'watch']);

    grunt.registerTask('default', ['build']);
};