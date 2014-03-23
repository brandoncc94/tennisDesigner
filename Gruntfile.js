
var BASE_URL = "";

module.exports = function(grunt) {

  // Configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Watch for changes on the CSS, JS and HTML files
    watch: {
      // Main JS files
      mainScripts: {
        files: [BASE_URL + 'js/main/**/*.js', BASE_URL + 'js/main/*.js'],
        tasks: ['jshint', 'uglify:main'],
        options: {
          spawn: false,
        },
      },
      // HTML Files
      htmlFiles: {
        files: [BASE_URL + '**/*.html'],
        tasks: ['htmlhint'],
        options: {
          spawn: false,
        },
      },
      // SCSS files
      scssFiles: {
        files: [BASE_URL + 'scss/**/*.scss'],
        tasks: ['compass'],
        options: {
          spawn: false,
        },
      }
    },

    // Runs compass on SCSS files
    compass : {
      dist: {
        options: {
          config: 'config.rb'
        }
      }
    },

    // Checks JS files
    jshint: {
      options : {
        reporter: 'jslint',
        force: 'true',
        reporterOutput: BASE_URL + 'js/main/errors.log',
      },
      all: [BASE_URL + 'js/main/*.js'],
    },

    //Check the html files
    htmlhint: {
      indexFiles: {
          options: {
            'tag-pair': true,
            'tagname-lowercase': true,
            'attr-lowercase': true,
            'attr-value-double-quotes': true,
            'attr-value-not-empty': true,
            'doctype-first': true,
            'tag-self-close': true,
            'id-unique': true,
            'src-not-empty': true
          },
          src: [BASE_URL + '*.html'] //Add other sources if needed
      }
    },

    // Concats and minify files
    uglify: {
      main: {
        options: {
          banner: '/*! Intelligent Sense <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        files: {
          'js/main.min.js': BASE_URL + 'js/main/*.js',
        }
      },
    }
  });

  // Load the plugins
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Default task
  grunt.registerTask('default', ['watch']);
};