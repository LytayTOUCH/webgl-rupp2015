# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/
$(document).on 'ready page:load', ->
  $('#tgr-draw-grid').click ->
    # console.log($('canvas')[0])
    # graphstraightlineMain($('canvas')[0])
    # graphstraightlineMain()
    # alert('Draw Grid');
    drawgrid()
  $('#tgr-draw-grid-test').click ->
    graphstraightlineMain()