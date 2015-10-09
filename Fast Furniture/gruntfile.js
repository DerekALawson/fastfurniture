/// <binding />
module.exports = function (grunt) {


    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.loadNpmTasks("grunt-makeHTML");
    grunt.loadNpmTasks('grunt-browser-sync');


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
        browserSync: {
            bsFiles: {
                src: 'assets/css/*.css'
            },
            options: {
                server: {
                    baseDir: "./"
                }
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

        },
        less: {
            dev: {
                options: {
                    strictMath: true,
                    sourceMap: true,
                    outputSourceFiles: true
                },
                files: [
                    {
                        src: 'css/dev/ui/navigation.less',
                        dest: 'css/dev/ui/navigation.css'
                    }
                    , {
                        src: 'css/dev/ui/animations.less',
                        dest: 'css/dev/ui/animations.css'
                    }
                    , {
                        src: 'css/dev/ui/hamburger.less',
                        dest: 'css/dev/ui/hamburger.css'
                    }
                    , {
                        src: 'css/dev/ui/social.less',
                        dest: 'css/dev/ui/social.css'
                    }
                    , {
                        src: 'css/dev/ui/loader.less',
                        dest: 'css/dev/ui/loader.css'
                    }
                    , {
                        src: 'css/dev/ui/search.less',
                        dest: 'css/dev/ui/search.css'
                    }
                    , {
                        src: 'css/dev/ui/grid.less',
                        dest: 'css/dev/ui/grid.css'
                    }
                    , {
                        src: 'css/dev/ui/typography.less',
                        dest: 'css/dev/ui/typography.css'
                    }
                    , {
                        src: 'css/dev/views/categories.less',
                        dest: 'css/dev/views/categories.css'
                    }
                    , {
                        src: 'css/dev/views/category.less',
                        dest: 'css/dev/views/category.css'
                    }
                    , {
                        src: 'css/dev/views/forgotemail.less',
                        dest: 'css/dev/views/forgotemail.css'
                    }
                    , {
                        src: 'css/dev/views/forgotpassword.less',
                        dest: 'css/dev/views/forgotpassword.css'
                    }
                    , {
                        src: 'css/dev/views/home.less',
                        dest: 'css/dev/views/home.css'
                    }
                    , {
                        src: 'css/dev/views/login.less',
                        dest: 'css/dev/views/login.css'
                    }
                    , {
                        src: 'css/dev/views/notfound.less',
                        dest: 'css/dev/views/notfound.css'
                    }
                    , {
                        src: 'css/dev/views/product.less',
                        dest: 'css/dev/views/product.css'
                    }
                    , {
                        src: 'css/dev/views/search.less',
                        dest: 'css/dev/views/search.css'
                    }
                    , {
                        src: 'css/dev/views/deferred/account.less',
                        dest: 'css/dev/views/deferred/account.css'
                    }
                    , {
                        src: 'css/dev/views/deferred/changepassword.less',
                        dest: 'css/dev/views/deferred/changepassword.css'
                    }
                    , {
                        src: 'css/dev/views/deferred/my.favorites.less',
                        dest: 'css/dev/views/deferred/my.favorites.css'
                    }
                    , {
                        src: 'css/dev/views/deferred/new.account.less',
                        dest: 'css/dev/views/deferred/new.account.css'
                    }
                    , {
                        src: 'css/dev/views/deferred/order.confirmation.less',
                        dest: 'css/dev/views/deferred/order.confirmation.css'
                    }
                    , {
                        src: 'css/dev/views/deferred/orders.less',
                        dest: 'css/dev/views/deferred/orders.css'
                    }
                    , {
                        src: 'css/dev/views/deferred/payment.options.less',
                        dest: 'css/dev/views/deferred/payment.options.css'
                    }
                    , {
                        src: 'css/dev/views/deferred/place.order.less',
                        dest: 'css/dev/views/deferred/place.order.css'
                    }
                    , {
                        src: 'css/dev/views/deferred/register.less',
                        dest: 'css/dev/views/deferred/register.css'
                    }
                    , {
                        src: 'css/dev/views/deferred/registerstatus.less',
                        dest: 'css/dev/views/deferred/registerstatus.css'
                    }
                    , {
                        src: 'css/dev/views/deferred/shoppingcart.less',
                        dest: 'css/dev/views/deferred/shoppingcart.css'
                    }
                    , {
                        src: 'css/dev/views/deferred/social.less',
                        dest: 'css/dev/views/deferred/social.css'
                    }
                    , {
                        src: 'css/dev/views/deferred/static.less',
                        dest: 'css/dev/views/deferred/static.css'
                    }

                    , {
                        src: 'css/dev/app.less',
                        dest: 'css/dev/app.css'
                    }
                    , {
                        src: 'css/libs/spa.less',
                        dest: 'css/libs/spa.css'
                    }
                ]
            }
        },

        watch: {
            less: {
                files: [
                    'css/**/**.less'
                ],
                tasks: ['less']
            },
            makeHTML: {
                files: [
                    'views/**/**.html'
                ],
                tasks: ['makeHTML']
            }

        },
        makeHTML: {
            debug: {
                options: {
                    "scripts": [
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
                    "styles": [
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
                    ],
                    "indexSrc": "views/static.html",
                    "src": [
                      "Views/Home/layouts/*.html",
                      "Views/Home/views/*.html",
                      "Views/Home/templates/*.html"
                    ],
                    "dest": "index.html"
                }

            }
        },
        express: {
            options: {
                // Override defaults here
            },
            dev: {
                options: {
                    script: 'path/to/dev/server.js'
                }
            },
            prod: {
                options: {
                    script: 'path/to/prod/server.js',
                    node_env: 'production'
                }
            },
            test: {
                options: {
                    script: 'path/to/test/server.js'
                }
            }
        }
    });


    // Default task.
    grunt.registerTask('default', ['uglify', 'cssmin']);

};