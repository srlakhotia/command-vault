module.exports = function(grunt) {
    grunt.initConfig({
        jade: {
            compile: {
                options: {
                    pretty: true
                },
                files: {
                    'views/index.html': 'views/index.jade'
                }
            }
        },
        includeSource: {
            options: {
                baseUrl: 'public/js/',
                templates: {
                    jade: 'script(src="{filePath}", type="text/javascript")'
                }
            },
            sources: {
                "js": ["**/*.js"]
            },
            myTarget: {
                files: {
                    'views/index.html': 'views/index.html'
                }
            }
        },
        watch: {
            grunt: { files: ['Gruntfile.js'] },
            jade: {
                files: 'views/**/*.jade',
                tasks: ['jade']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-include-source');
    grunt.registerTask('default', []);
    grunt.registerTask('serve', 'Convert Jade templates into html templates', ['jade', 'includeSource', 'watch']);
    grunt.loadNpmTasks('grunt-contrib-watch');
};