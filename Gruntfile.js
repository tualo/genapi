module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		nodeunit:{
		  all: ['test/unit/*.js']
		}
	});
	grunt.loadNpmTasks('grunt-contrib-nodeunit');
	grunt.registerTask('test', ['nodeunit']);
}
