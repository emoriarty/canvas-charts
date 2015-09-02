module.exports = function( grunt ) {
  'user strict';
  
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  var config = require('grunt-library-builder')( grunt );

  config.connect = {
    options: {
      port: 9001,
      livereload: 35729,
      hostname: '0.0.0.0'
    },
    livereload: {
      options: {
        open: true,
        base: [ 
          '.'
        ]
      }
    }
  };

  config.watch = {
    configFiles: {
      files: [ 'Gruntfile.js' ],
      options: {
        reload: true
      }
    },
    js: {
      files: [ 'src/{,*}*.js' ],
      tasks: [ 'jshint', 'build-dev' ],
      options: {
        livereload: true
      }
    },
    livereload: {
      options: {
        livereload: '<%= connect.options.livereload %>'
      },
      files: [
        'index.html',
        'site/{,*/}*.*',
        'src/{,*/}*.*'
      ],
      tasks: [ 'jshint', 'build-dev' ]
    }
  };

  grunt.initConfig( config );

  grunt.registerTask('serve', function (target) {
    grunt.task.run([
      'connect:livereload',
      'watch'
    ]);
  });
};
