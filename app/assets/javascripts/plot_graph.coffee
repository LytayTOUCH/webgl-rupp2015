# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/
$(document).on 'ready page:load', ->
  $('#tgr-line-equation').click ->
    alert('line equation event !')

  $('#tgr-circle').click ->
    alert('circle equation event !')

  $('#tgr-ellipse').click ->
    alert('ellipse equation event !')

  $('#tgr-hyperbola').click ->
    alert('hyperbola equation event !')

  $('#tgr-parabola').click ->
    alert('parabola equation event !')

  $('#tgr-sphere').click ->
    alert('sphere equation event !')
