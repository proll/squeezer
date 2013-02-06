module.exports = function(grunt) {
	var path = require('path');
	var fs = require('fs');
	var _ = require('underscore');
	// var util = require('util');

	var sprite 	= require('node-sprite');

	grunt.registerTask('sprite', 'Simple sprite generation', function() {
		var basePath = path.resolve(grunt.config('sprites.sourcePath'));
		var done = this.async();

		sprite.sprites({path: basePath}, function(err, result) {

			// console.log(util.inspect(result, false, null)+"\n");
			var lessStr = "// This file was generated automaticly, so don't modify it!\n";
			_.each(result, function(pack){
				lessStr += "." + pack.name + "{\n";
				lessStr += '\tbackground: url("' + grunt.config('sprites.webPath') + pack.filename() + '") no-repeat 0 0;\n';
				lessStr += '\tvertical-align:text-top;\n';
				lessStr += "}\n";
				_.each(pack.images, function(file){
					lessStr += "." + pack.name + "-" + file.name + "{";
					lessStr += "\n";
					lessStr += "\twidth: " + file.width + "px;\n";
					lessStr += "\theight: " + file.height + "px;\n";
					lessStr += "\tbackground-position: " + (-file.positionX) + "px " + (-file.positionY) + "px;\n";
					lessStr += "}\n";
				});
			});
			fs.writeFile(path.resolve(grunt.config('sprites.lessPath')), lessStr, function(){
				if (err) throw err;
				console.log('File ' + grunt.config('sprites.lessPath').cyan + ' was updated.');
				done(true);
			});

		});
	})
}