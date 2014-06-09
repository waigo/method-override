module.exports = (grunt) ->
  require('matchdep').filterDev('grunt-*').forEach (contrib) ->
    grunt.loadNpmTasks contrib

  config =
    src: 'src'
    test: 'test'

  grunt.initConfig
    config: config

    jshint:
      options:
        jshintrc: './.jshintrc'
      all:
        src: [
          "<%= config.src %>/**/*.js"
        ]

    mochaTest:
      test:
        options:
          ui: 'exports'
          reporter: 'spec'
        src: [
          '<%= config.test %>/integration.js'
        ]

  grunt.registerTask "default", ["jshint", "mochaTest"]
  
