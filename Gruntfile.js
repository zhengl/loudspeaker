module.exports = function(grunt){
	var dependencies = [];
	grunt.file.recurse('client/scripts', function(abspath, rootdir, subdir, filename){
		var basename = filename.replace('.js', '');
		if (subdir){
			dependencies.push(basename + ': "' + subdir + '/' + basename + '",');
		} else {
			dependencies.push(basename + ': "' + basename + '",');
		}
	});

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		client: {
			folder: 'client',
			scripts: {
				folder: '<%= client.folder %>/scripts',
				all: '<%= client.scripts.folder %>/**/*.js'
			},
			spec: {
				folder: '<%= client.folder %>/spec',
				all: '<%= client.spec.folder %>/**/*.js',
				allSpec: '<%= client.spec.folder %>/**/*Spec.js',
				helper: '<%= client.spec.folder %>/helper.js'
			},
			styles: {
				folder: '<%= client.folder %>/styles',
				main: '<%= client.styles.folder %>/main.css',
				mainMin: '<%= client.styles.folder %>/main.min.css'
			},
			assets: {
				folder: '<%= client.folder %>/assets',
				less: {
					folder: '<%= client.assets.folder %>/less',
					main: '<%= client.assets.less.folder %>/main.less',
					all: '<%= client.assets.less.folder %>/**/*.less',
				}
			},
			templates: {
				folder: '<%= client.folder %>/templates',
				all: '<%= client.templates.folder %>/*.tmpl',
				index: '<%= client.templates.folder %>/index.html.tmpl',
				config: '<%= client.templates.folder %>/config.js.tmpl'
			},
			config: '<%= client.folder %>/config.js',
			index: '<%= client.folder %>/index.html'
		},

		requirejs: {
			main: {
				options: {
					baseUrl: '<%= client.scripts.folder %>',
					mainConfigFile: '<%= client.config %>',
					name: '../main',
					preserveLicenseComments: false,
					paths: {
							"Kinetic": '../../lib/kinetic/kinetic-v4.6.0',
							"uuid": '../../lib/uuid/uuid',
					},
					out: 'client/main.min.js'
				}
			},
			debug: {
				options: {
					baseUrl: '<%= client.scripts.folder %>',
					mainConfigFile: '<%= client.config %>',
					name: '../debug',
					optimize: 'none',
					paths: {
							"Kinetic": '../../lib/kinetic/kinetic-v4.6.0',
							"uuid": '../../lib/uuid/uuid',
					},
					out: 'client/debug.min.js'
				}
			}
		},

		jshint: {
			files: ['Gruntfile.js', '<%= client.scripts.all %>', '<%= client.spec.all %>'],
		},

		jasmine: {
			src: '<%= client.scripts.all %>',
			options: {
				specs: '<%= client.spec.allSpec %>',
				helpers: '<%= client.spec.helper %>',
				keepRunner: true,
				template: require('grunt-template-jasmine-requirejs'),
				templateOptions: {
				requireConfig: {
						baseUrl: '<% client.scripts.folder %>',
						urlArgs: 'bust=' + Math.random(),
						paths: {
							"Kinetic": 'lib/kinetic/kinetic-v4.6.0',
							"uuid": 'lib/uuid/uuid',
						},
					}
				}
			}
		},

		jasmine_node: {
			projectRoot: "server/spec",
		},

		less: {
			dev: {
				options: {
					cleancss: true            
				},
				files: {
				'<%= client.styles.main %>': '<%= client.assets.less.main %>',
				}
			}
		},

		watch: {
			scripts: {
				files: ['<%= client.scripts.all %>'],
				tasks: ['compile']				
			},
			styles: {
				files: ['<%= client.assets.less.all %>'],
				tasks: ['less']
			},
			tests: {
				files: ['<%= client.spec.all %>', '<%= client.scripts.all %>'],
				tasks: ['unit-test']
			},
			template: {
				files: ['<%= client.templates.all %>'],
				tasks: ['template']
			}
		},

		template: {
			dev: {
				files: [			
					{
						src: '<%= client.templates.config %>',
						dest: '<%= client.config %>',
						data: {
							paths: dependencies
						}
					}
				]
			},
		},

		server: {
			start: {},
			stop: {}
		},

        clean: ['<%= client.styles.folder %>', '<%= client.styles.mainMin %>', '<%= client.config %>']
	});

	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-jasmine-node');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.registerTask('compile', ['template', 'less', 'requirejs:debug']);
	grunt.registerTask('unit-test', ['jasmine']);
	grunt.registerTask('functional-test', ['compile', 'server:start', 'jasmine_node', 'server:stop']);
	grunt.registerTask('test', ['unit-test', 'functional-test']);
	grunt.registerTask('default', ['jshint', 'test']);
	grunt.registerMultiTask('template', 'Generate files from templates', function(){
		var files = this.data.files;
		for(var i = 0; i < files.length; i++) {
			grunt.log.writeln('Generate ' + files[i].dest);
			var template = grunt.file.read(files[i].src);
			grunt.file.write(files[i].dest, grunt.template.process(template, {data: files[i].data}));
		}
	});
	grunt.registerMultiTask('server', 'Start or stop server', function(){
		var server = require('./server/server');
		var repository = require('./server/spec/fakeDB');
		var fixture = require('./server/spec/fixture/boards');

		if(this.target == 'start') {
			repository.populate(fixture);
			server.start(8080, repository);
		} else if (this.target == 'stop') {
			server.stop();
		}
	});
};
