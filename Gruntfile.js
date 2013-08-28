module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		jasmine: {
			src: 'client/scripts/*/*.js',
			options: {
				specs: 'client/spec/*Spec.js',
				keepRunner: true,
				template: require('grunt-template-jasmine-requirejs'),
				templateOptions: {
         			requireConfigFile: 'client/spec/main.js'
        		}
			}
		},

		jasmine_node: {
			projectRoot: "server/spec",
		},

		uglify: {
			build: {
				src: 'client/scripts/*.js',
				dest: 'client/scripts/<%= pkg.name %>.min.js',
			}
		},
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-jasmine-node');

	grunt.registerTask('test', ['jasmine', 'jasmine_node']);
};
