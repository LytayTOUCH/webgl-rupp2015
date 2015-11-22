# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

$(document).on 'ready page:load', ->
  $('#tgr-rotating-triangle').click ->
    # console.log($('canvas')[0])
    main_rotating_triangle($('canvas')[0])

  $('#tgr-rotating-triangle-2d').click ->
    main_2d_colored_triangle($('canvas')[0])

  $('#tgr-rotating-cube').click ->
    main_rotating_cube($('canvas')[0])

  $('#tgr-cube-mouse-event').click ->
    main_cube_mouse_event($('canvas')[0])