module.exports = function(grunt) {
    // grunt.loadNpmTasks('grunt-include-source');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // app: {
        //     scripts: ['public/js/**/*.js']
        // },
        // watch: {
        //     includeSource: {
        //         files: 'public/js/**/*.js',
        //         tasks: 'includeSource',
        //         options: ['added', 'deleted']
        //     }
        // },
        // includeSource: {
        //     options: {
        //         basePath: 'public',
        //         ordering: 'top-down'
        //     },
        //     myTarget: {
        //         files: {
        //             'views/index.jade': 'views/index.jade'
        //         }
        //     }
        // },
        concat: {
          options: {
            // define a string to put between each file in the concatenated output
            separator: ';'
          },
          dist: {
            // the files to concatenate
            src: ['public/js/**/*.js'],
            // the location of the resulting JS file
            dest: 'full.js'
          }
        }
    });

    grunt.registerTask('concat');
    grunt.registerTask('default', ['concat']);
};