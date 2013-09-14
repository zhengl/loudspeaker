module.exports = function(grunt){
	var dependencies = [];
	grunt.file.recurse("client/scripts", function(abspath, rootdir, subdir, filename){
		var basename = filename.replace(".js", "");
		if (subdir){
			dependencies.push(basename + ': "' + subdir + '/' + basename + '",');
		} else {
			dependencies.push(basename + ': "' + basename + '",');
		}
	});

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		requirejs: {
			dev: {
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
				specs: 'client/spec/**/*Spec.js',
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
			styles: {
				files: ['client/assets/**/*.less'],
				tasks: ['less'],
				options: {
					spawn: false,
				},
			},
			tests: {
				files: ['client/spec/**/*Spec.js', 'client/scripts/**/*.js'],
				tasks: ['template', 'test'],
				options: {
					spawn: false,
				},
			}
		},

		template: {
			dev: {
				files: [
					{
						src: "client/templates/index.html.tmpl",
						dest: "client/index.html",
						data: {
							main: "main",
							debug: false
						}
					},
					{
						src: "client/templates/index.html.tmpl",
						dest: "client/debug.html",
						data: {
							main: "debug",
							debug: true
						}
					},					
					{
						src: "client/templates/config.js.tmpl",
						dest: "client/config.js",
						data: {
							paths: dependencies
						}
					}
				]
			},
		},

        clean: ["./client/styles", "./client/index.html", "./client/main.min.js", "./client/config.js"]
	});

	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-jasmine-node');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('compile', ['template', 'less'])
	grunt.registerTask('test', ['template', 'jasmine', 'jasmine_node']);
	grunt.registerTask('default', ['compile', 'test']);
	grunt.registerMultiTask('template', 'aaa', function(){
		var files = this.data.files;
		for(var i = 0; i < files.length; i++) {
			grunt.log.writeln("Generate " + files[i].dest);
			var template = grunt.file.read(files[i].src);
			grunt.file.write(files[i].dest, grunt.template.process(template, {data: files[i].data}));
		}
	});
};
