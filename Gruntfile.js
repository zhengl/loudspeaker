module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		jasmine: {
			src: 'client/scripts/*.js',
			options: {
				specs: 'client/spec/*.js',
				// keepRunner: true,
				template: require('grunt-template-jasmine-requirejs'),
				templateOptions: {
         			requireConfig: {
         				urlArgs: "bust=" + (new Date()).getTime(),
						paths: {
							Kinetic: 'lib/kinetic/kinetic-v4.5.3.min'
						}
					}
        		}
			}
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
};
