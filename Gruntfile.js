module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		requirejs: {
			compile: {
				options: {
					baseUrl: "client/scripts",
					mainConfigFile: "client/config.js",
					out: "client/main.min.js",
					optimize: "none",
					name: "../main"
				}
			}
		},

		jasmine: {
			src: 'client/scripts/*/*.js',
			options: {
				specs: 'client/spec/*Spec.js',
				keepRunner: true,
				template: require('grunt-template-jasmine-requirejs'),
				templateOptions: {
         			requireConfigFile: 'client/config.js',
         			requireConfig: {
         				baseUrl: "client/scripts",
         				urlArgs: "bust=" + Math.random()
         			}
        		}
			}
		},

		jasmine_node: {
			projectRoot: "server/spec",
		},

		less: {
            dev: {
                files: {
                    "./client/styles/main.css": "./client/assets/less/main.less",
                }
            }
        },

		watch: {
			scripts: {
				files: ['client/scripts/**/*.js'],
				tasks: ['requirejs'],
				options: {
					spawn: false,
				},
			},
			styles: {
				files: ['client/assets/**/*.less'],
				tasks: ['less'],
				options: {
					spawn: false,
				},
			},
			tests: {
				files: ['client/spec/**/*Spec.js'],
				tasks: ['test'],
				options: {
					spawn: false,
				},
			}
		},

        clean: ["./client/styles"]
	});

	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-jasmine-node');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('test', ['jasmine', 'jasmine_node']);
	grunt.registerTask('default', ['test', 'requirejs', 'less']);
};
