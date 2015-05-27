module.exports = function (grunt) {


	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		cssmin: {
			sitecss: {
				options: {
					banner: '/* My minified css file */'
				},
				files: {
				    "css/site.min.css": [
                        "css/libs/**.css",
                        "css/dev/app.css",
                        "css/dev/ui/**.css",
                        "css/dev/views/**.css"
                        ]
				}
			},
			criticalcss: {
			    files: {
			        "views/home/views/criticalcssmin.cshtml": ["css/critical.site.css"],
			    }
			}
		},
		uglify: {
			options: {
			    compress: {}
			},
			applib: {
			    src: [
			        "js/libs/*.js",
                    "js/dev/Fast-Furniture.app.js",
                    "js/dev/services/*.js",
                    "js/dev/controllers/*.js",
                    "js/dev/Fast-Furniture.bootstrap.js"
                
			    ],
			    dest: 'js/Fast-Furniture.app.min.js'
			}
		},
		uncss: {
		    dist: {
		        files: {
		            'css/critical.site.css': ['http://localhost:7856/critical.html']
		        }
		    }
		}
	});


	// Default task.
	grunt.registerTask('default', ['uglify', 'cssmin']);

};