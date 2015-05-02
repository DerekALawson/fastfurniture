module.exports = function (grunt) {


	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		qunit: {
			all: ['js/specs/**/*.html']
		},
		jshint: {
			options: {
				browser: true
			},
			files: ['Gruntfile.js', 'public/js/dev/*.js', 'public/js/libs/*.js']
		},
		cssmin: {
			sitecss: {
				options: {
					banner: '/* My minified css file */'
				},
				files: {
					"public/css/site.min.css": ["public/css/site.css"],
				}
			},
			criticalcss: {
			    files: {
			        "views/home/views/criticalcssmin.cshtml": ["css/critical.site.css"],
			    }
			}
		},
		//less: {
        //  development: {
        //    options: {
        //      paths: ["css"]
        //    },
        //    files: {
        //      "*.css": "*.less"
        //    }
        //  },
        //  production: {
        //    options: {
        //      paths: ["css"],
        //      plugins: [
        //        new require('less-plugin-autoprefix')({browsers: ["last 2 versions"]}),
        //        new require('less-plugin-clean-css')(cleanCssOptions)
        //      ],
        //      modifyVars: {
        //        imgPath: '"http://images.professionalaspnet.com/"',
        //        bgColor: 'red'
        //      }
        //    },
        //    files: {
        //      "site.min.css": "*.less"
        //    }
        //  }

		//},
		uglify: {
			options: {
				compress: true
			},
			applib: {
				src: [
                "public/js/libs/alert.js",
                "public/js/libs/dollarbill.min.js",
                "public/js/libs/spa.js",
                "public/js/libs/class.js",
                "public/js/libs/controller.js",
                "public/js/libs/l2Storagecache.js",
                
                
                "public/js/libs/ajax.js",
                "public/js/dev/services/dataService.js",

                "public/js/dev/services/bizzy.data.js",
                "public/js/dev/services/bizzy.data.class.js",
                
                "public/js/dev/services/userData.js",

                "public/js/dev/.app.js",
                "public/js/dev/controllers/.js",
                "public/js/dev/.bootstrap.js",
                
                "public/js/dev/controllers/**.js"
				],
				dest: 'public/js/applib.js'
			}
		},
		bump: {
			options: {
				files: ['app.cache'],
				updateConfigs: [],
				commit: false,
				commitMessage: 'Release v%VERSION%',
				commitFiles: ['package.json'], // '-a' for all files
				createTag: true,
				tagName: 'v%VERSION%',
				tagMessage: 'Version %VERSION%',
				push: true,
				pushTo: 'upstream',
				gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d' // options to use with '$ git describe'
			}
		},
		watch: {
			src: {
				files: [
                    'public/css/**/*',
                    'public/less/**/*',
				],
				tasks: ['less', 'cssmin'],
			},
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