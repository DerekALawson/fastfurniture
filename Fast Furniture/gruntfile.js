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
                        "css/libs/bootstrap.lean.min.css",
                        "css/libs/spa.css",
                        "css/dev/ui/animations.css",
                        "css/libs/toolbar.css",
                        "css/libs/touch.css",
                        "css/dev/app.css",
                        "css/dev/ui/typography.css",
                        "css/dev/ui/navigation.css",
                        "css/dev/ui/action-menu.css",
                        "css/dev/ui/grid.css",
                        "css/dev/views/*.css"
                        ]
				}
			},
			deferred: {
			    options: {
			        banner: '/* My minified css file */'
			    },
			    files: {
			        "css/deferred.min.css": [
                        "css/dev/views/deferred/*.css"
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
			        "js/libs/spa.js",
                    "js/libs/class.js",
                    "js/libs/controller.js",
                    "js/libs/dollarbill.min.js",
                    "js/libs/simpleViewEngine.js",
                    "js/libs/l2Storagecache.js",
                    "js/libs/deeptissue.js",
                    "js/libs/toolbar.min.js",
                    "js/dev/Fast-Furniture.app.js",
                    "js/dev/services/Fast-Furniture.data.js",
                    "js/dev/fastFurnitureController.js",
                    "js/dev/fastFurnitureAuthenticatedController.js",
                    "js/dev/controllers/*.js",
                    "js/dev/Fast-Furniture.bootstrap.js"
                
			    ],
			    dest: 'js/Fast-Furniture.app.min.js'
			},
			deferred: {
			    src: [
                    "js/dev/services/deferred/*.js",
                    "js/dev/controllers/deferred/*.js"

			    ],
			    dest: 'js/deferred.min.js'
			}
		},
		uncss: {
		    critical: {
		        files: {
		            'css/critical.site.css': ['http://localhost:7856/critical.html']
		        }
		    },
		    initial: {
		        files: {
		            'css/initial.site.css': ['http://localhost:7856/initial.html']
		        }
		    },
		    deferred: {
		        files: {
		            'css/deferred.site.css': ['http://localhost:7856/deferred.html']
		        }
		    }

		}
	});


	// Default task.
	grunt.registerTask('default', ['uglify', 'cssmin']);

};