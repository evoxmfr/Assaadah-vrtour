(function(){
    var script = {
 "start": "this.playAudioList([this.audio_3680D83D_249E_2A66_41AA_AFDF8A7E0D89]); this.init()",
 "scrollBarWidth": 10,
 "layout": "absolute",
 "id": "rootPlayer",
 "mobileMipmappingEnabled": false,
 "vrPolyfillScale": 0.5,
 "propagateClick": false,
 "scrollBarColor": "#000000",
 "desktopMipmappingEnabled": false,
 "mouseWheelEnabled": true,
 "scrollBarOpacity": 0.5,
 "children": [
  "this.MainViewer",
  {
   "propagateClick": false,
   "children": [
    "this.Container_52344940_5F01_EFC4_41D4_ABA40101D8BF"
   ],
   "layout": "horizontal",
   "left": "0%",
   "scrollBarColor": "#000000",
   "scrollBarOpacity": 0.5,
   "borderSize": 0,
   "paddingRight": 0,
   "paddingLeft": 0,
   "scrollBarVisible": "rollOver",
   "minHeight": 1,
   "verticalAlign": "middle",
   "horizontalAlign": "center",
   "bottom": "0%",
   "contentOpaque": false,
   "minWidth": 1,
   "height": 142,
   "scrollBarMargin": 2,
   "width": "100%",
   "gap": 10,
   "paddingTop": 0,
   "class": "Container",
   "paddingBottom": 0,
   "backgroundOpacity": 0,
   "borderRadius": 0,
   "shadow": false,
   "data": {
    "name": "Container44746"
   },
   "overflow": "scroll",
   "scrollBarWidth": 10
  }
 ],
 "borderSize": 0,
 "paddingRight": 0,
 "backgroundPreloadEnabled": true,
 "paddingLeft": 0,
 "minHeight": 20,
 "scrollBarVisible": "rollOver",
 "horizontalAlign": "left",
 "scripts": {
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "existsKey": function(key){  return key in window; },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "unregisterKey": function(key){  delete window[key]; },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "registerKey": function(key, value){  window[key] = value; },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "getKey": function(key){  return window[key]; }
 },
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 20,
 "verticalAlign": "top",
 "defaultVRPointer": "laser",
 "height": "100%",
 "gap": 10,
 "paddingTop": 0,
 "buttonToggleMute": "this.IconButton_52344940_5F01_EFC4_41CC_9E18548B3CCC",
 "downloadEnabled": false,
 "paddingBottom": 0,
 "class": "Player",
 "borderRadius": 0,
 "shadow": false,
 "overflow": "visible",
 "definitions": [{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -88.81,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_37554222_2493_DE62_41A1_1E0F6C6F07E1"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 77.88,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_373651FE_2493_DDE2_41C1_853B386D09C0"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "manualZoomSpeed": 0,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 62.68,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_339A70D8_2493_DA2E_41A4_223CC794FD82"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -133.78,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_316CFFED_2493_E5E6_41C0_5F04B1270A04"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_1C749FB8_122E_E36C_4193_79DF9A264D45_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 155.88,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_300F3305_2493_DE26_419C_AD77DA7B04E3"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -93.04,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_32B64022_2493_DA62_41A5_0508EA819434"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 174.76,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_3003A311_2493_DE3E_41C1_0A553F755EC0"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -133.27,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_371F51AE_2493_DA62_41B3_5A132B9C486F"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 51.5,
   "distance": 1,
   "panorama": "this.panorama_1F7170A8_12AD_95B9_41B0_69B3D2D511F0",
   "backwardYaw": -97.73
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_1D2C1F2A_12D5_ACB8_41B0_5142BEAE6714",
 "thumbnailUrl": "media/panorama_1D2C1F2A_12D5_ACB8_41B0_5142BEAE6714_t.jpg",
 "label": "B8BASKET",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_1D2C1F2A_12D5_ACB8_41B0_5142BEAE6714_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1D2C1F2A_12D5_ACB8_41B0_5142BEAE6714_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1D2C1F2A_12D5_ACB8_41B0_5142BEAE6714_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1D2C1F2A_12D5_ACB8_41B0_5142BEAE6714_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1D2C1F2A_12D5_ACB8_41B0_5142BEAE6714_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1D2C1F2A_12D5_ACB8_41B0_5142BEAE6714_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1D2C1F2A_12D5_ACB8_41B0_5142BEAE6714_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1D2C1F2A_12D5_ACB8_41B0_5142BEAE6714_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1D2C1F2A_12D5_ACB8_41B0_5142BEAE6714_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1D2C1F2A_12D5_ACB8_41B0_5142BEAE6714_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1D2C1F2A_12D5_ACB8_41B0_5142BEAE6714_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1D2C1F2A_12D5_ACB8_41B0_5142BEAE6714_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_1D2C1F2A_12D5_ACB8_41B0_5142BEAE6714_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1D2C1F2A_12D5_ACB8_41B0_5142BEAE6714_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1D2C1F2A_12D5_ACB8_41B0_5142BEAE6714_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1D2C1F2A_12D5_ACB8_41B0_5142BEAE6714_t.jpg",
   "right": {
    "levels": [
     {
      "url": "media/panorama_1D2C1F2A_12D5_ACB8_41B0_5142BEAE6714_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1D2C1F2A_12D5_ACB8_41B0_5142BEAE6714_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1D2C1F2A_12D5_ACB8_41B0_5142BEAE6714_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_1C883BBC_12D6_AB99_4181_0D0E0BB44FA0"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 53.05,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_326520CB_2493_DA22_41B5_E3B53D2951F4"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -33.29,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_309AE269_2493_DEEE_41B9_7E6315394002"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 70.97,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_37F88174_2493_DAE6_4197_D24A8680618A"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_1C745916_122E_6F24_41B0_E0BDC7980538_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 53.13,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_3035F31C_2493_DE26_41BF_9F413F44C653"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 79.89,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_37C4FCBA_2493_EA62_4195_03474AAADD22"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 43.05,
   "distance": 1,
   "panorama": "this.panorama_1F76471E_12AA_BC99_417D_DD5A2084733C",
   "backwardYaw": -146.09
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 116.86,
   "distance": 1,
   "panorama": "this.panorama_1F2B9277_12D6_B497_418D_A66B17178836",
   "backwardYaw": -53.72
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 141.31,
   "distance": 1,
   "panorama": "this.panorama_1F7170A8_12AD_95B9_41B0_69B3D2D511F0",
   "backwardYaw": -15.32
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_1F2B6CEB_12D6_6DB8_41B2_62922D3306B8",
 "thumbnailUrl": "media/panorama_1F2B6CEB_12D6_6DB8_41B2_62922D3306B8_t.jpg",
 "label": "B9",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_1F2B6CEB_12D6_6DB8_41B2_62922D3306B8_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1F2B6CEB_12D6_6DB8_41B2_62922D3306B8_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1F2B6CEB_12D6_6DB8_41B2_62922D3306B8_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1F2B6CEB_12D6_6DB8_41B2_62922D3306B8_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1F2B6CEB_12D6_6DB8_41B2_62922D3306B8_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1F2B6CEB_12D6_6DB8_41B2_62922D3306B8_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1F2B6CEB_12D6_6DB8_41B2_62922D3306B8_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1F2B6CEB_12D6_6DB8_41B2_62922D3306B8_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1F2B6CEB_12D6_6DB8_41B2_62922D3306B8_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1F2B6CEB_12D6_6DB8_41B2_62922D3306B8_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1F2B6CEB_12D6_6DB8_41B2_62922D3306B8_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1F2B6CEB_12D6_6DB8_41B2_62922D3306B8_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1F2B6CEB_12D6_6DB8_41B2_62922D3306B8_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1F2B6CEB_12D6_6DB8_41B2_62922D3306B8_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1F2B6CEB_12D6_6DB8_41B2_62922D3306B8_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_1F2B6CEB_12D6_6DB8_41B2_62922D3306B8_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1F2B6CEB_12D6_6DB8_41B2_62922D3306B8_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1F2B6CEB_12D6_6DB8_41B2_62922D3306B8_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1F2B6CEB_12D6_6DB8_41B2_62922D3306B8_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_1C75EDA8_12D5_AFB8_41B0_704BFBAC3AF9",
  "this.overlay_009DB5B8_12DA_FF98_41B2_57F94BA7CBB1",
  "this.overlay_1C278140_12DB_B4E9_41AE_17FA3E516F16"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -63.14,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_30F8C2D5_2493_DE26_41B1_916985FFB1EB"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 25.04,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_32DAD03A_2493_DA62_41C1_D8DED063B454"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -158.42,
  "pitch": -3.83
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_1F1F5301_1216_A31C_41A0_CF4AED19D1F5_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 9.55,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_37E131A2_2493_DA62_41B8_9E01413C4907"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -136.29,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_31D15EDB_2493_E622_41BA_2DBF798DA881"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -109.12,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_305D9335_2493_DE66_41A8_DFA8922F09C2"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_1C4AA941_122D_AF1C_4194_652BF1171E50_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_1F7039BE_12B5_9798_41B0_325FFC1AF137_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -117.32,
   "distance": 1,
   "panorama": "this.panorama_0154F527_0C22_07FC_4193_06409B7D0536",
   "backwardYaw": 70.34
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_02181B5D_0879_47EF_4194_05F745303325",
 "thumbnailUrl": "media/panorama_02181B5D_0879_47EF_4194_05F745303325_t.jpg",
 "label": "A1",
 "pitch": 0,
 "hfovMax": 120,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_02181B5D_0879_47EF_4194_05F745303325_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_02181B5D_0879_47EF_4194_05F745303325_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_02181B5D_0879_47EF_4194_05F745303325_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_02181B5D_0879_47EF_4194_05F745303325_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_02181B5D_0879_47EF_4194_05F745303325_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_02181B5D_0879_47EF_4194_05F745303325_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_02181B5D_0879_47EF_4194_05F745303325_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_02181B5D_0879_47EF_4194_05F745303325_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_02181B5D_0879_47EF_4194_05F745303325_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_02181B5D_0879_47EF_4194_05F745303325_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_02181B5D_0879_47EF_4194_05F745303325_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_02181B5D_0879_47EF_4194_05F745303325_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_02181B5D_0879_47EF_4194_05F745303325_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_02181B5D_0879_47EF_4194_05F745303325_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_02181B5D_0879_47EF_4194_05F745303325_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_02181B5D_0879_47EF_4194_05F745303325_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_02181B5D_0879_47EF_4194_05F745303325_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_02181B5D_0879_47EF_4194_05F745303325_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_02181B5D_0879_47EF_4194_05F745303325_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_1FC0C62C_1215_E565_41A3_3D15BD3ADE2A"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 166.47,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_37C6F15C_2493_DA26_419B_72B3DC3C3045"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 45.01,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_3082DD9B_2493_EA22_41BC_5470C1171F61"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -43.05,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_32E57BB5_2493_EE66_4195_46823C5FAB7F"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -154.12,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_3740223A_2493_DE62_41B2_97086A8BC350"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 41.62,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_308B3D90_2493_EA3D_41BB_77B34C44EB31"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_59E47185_136B_F468_41AE_60E9A934E07E_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "manualZoomSpeed": 0,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -126.32,
  "pitch": -8.08
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_02181B5D_0879_47EF_4194_05F745303325_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 17.25,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_3053DE5A_2493_E622_41B4_5A31E4A4F11C"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 153.28,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_32182BC1_2493_EE1E_41B6_BBB6EEA40969"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 62.84,
   "distance": 1,
   "panorama": "this.panorama_1C69EC6F_1232_65E3_41A9_5362BA7F1A83",
   "backwardYaw": -98.1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -16.33,
   "distance": 1,
   "panorama": "this.panorama_1E35133E_1216_E365_418A_E512CC92AE96",
   "backwardYaw": 154
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1E261A0A_1216_AD2C_41A3_6B0EE11D4D7E"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 159.53,
   "distance": 1,
   "panorama": "this.panorama_1E3059D8_1216_AF2D_4182_4B71A1D76684",
   "backwardYaw": -4.02
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_1E351DCE_1216_A725_41AA_C2237F5681B0",
 "thumbnailUrl": "media/panorama_1E351DCE_1216_A725_41AA_C2237F5681B0_t.jpg",
 "label": "A4",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_1E351DCE_1216_A725_41AA_C2237F5681B0_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E351DCE_1216_A725_41AA_C2237F5681B0_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E351DCE_1216_A725_41AA_C2237F5681B0_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1E351DCE_1216_A725_41AA_C2237F5681B0_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E351DCE_1216_A725_41AA_C2237F5681B0_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E351DCE_1216_A725_41AA_C2237F5681B0_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1E351DCE_1216_A725_41AA_C2237F5681B0_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E351DCE_1216_A725_41AA_C2237F5681B0_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E351DCE_1216_A725_41AA_C2237F5681B0_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1E351DCE_1216_A725_41AA_C2237F5681B0_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E351DCE_1216_A725_41AA_C2237F5681B0_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E351DCE_1216_A725_41AA_C2237F5681B0_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1E351DCE_1216_A725_41AA_C2237F5681B0_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E351DCE_1216_A725_41AA_C2237F5681B0_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E351DCE_1216_A725_41AA_C2237F5681B0_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_1E351DCE_1216_A725_41AA_C2237F5681B0_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E351DCE_1216_A725_41AA_C2237F5681B0_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E351DCE_1216_A725_41AA_C2237F5681B0_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1E351DCE_1216_A725_41AA_C2237F5681B0_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_1CA17E28_121E_E56D_41A3_00627B2529A9",
  "this.overlay_1CED806A_121E_BDED_41AF_11F28D8B92D4",
  "this.overlay_1D1721B5_121E_9F64_4190_F911F01D45DC",
  "this.overlay_0AF4E044_12EE_74E8_4174_5B590490AB56"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 72.6,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_30CC62BD_2493_DE66_41C1_0F60EF0A11A3"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 133.65,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_31010F64_2493_E6E6_41B9_C9CC602654B7"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -35.17,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_3761B25D_2493_DE26_41A8_1F88C73BB025"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 175.56,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_3047FE66_2493_E6E2_41AE_8AA615793DA3"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -12.81,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_322DABE4_2493_EDE6_41AA_4AD089B141DE"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -98.1,
   "distance": 1,
   "panorama": "this.panorama_1E351DCE_1216_A725_41AA_C2237F5681B0",
   "backwardYaw": 62.84
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 78.04,
   "distance": 1,
   "panorama": "this.panorama_1D51A53A_1232_676C_419B_FB05E8EE5A1C",
   "backwardYaw": -126.95
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_1C69EC6F_1232_65E3_41A9_5362BA7F1A83",
 "thumbnailUrl": "media/panorama_1C69EC6F_1232_65E3_41A9_5362BA7F1A83_t.jpg",
 "label": "AKB GURU",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_1C69EC6F_1232_65E3_41A9_5362BA7F1A83_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C69EC6F_1232_65E3_41A9_5362BA7F1A83_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C69EC6F_1232_65E3_41A9_5362BA7F1A83_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1C69EC6F_1232_65E3_41A9_5362BA7F1A83_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C69EC6F_1232_65E3_41A9_5362BA7F1A83_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C69EC6F_1232_65E3_41A9_5362BA7F1A83_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1C69EC6F_1232_65E3_41A9_5362BA7F1A83_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C69EC6F_1232_65E3_41A9_5362BA7F1A83_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C69EC6F_1232_65E3_41A9_5362BA7F1A83_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1C69EC6F_1232_65E3_41A9_5362BA7F1A83_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C69EC6F_1232_65E3_41A9_5362BA7F1A83_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C69EC6F_1232_65E3_41A9_5362BA7F1A83_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1C69EC6F_1232_65E3_41A9_5362BA7F1A83_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C69EC6F_1232_65E3_41A9_5362BA7F1A83_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C69EC6F_1232_65E3_41A9_5362BA7F1A83_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_1C69EC6F_1232_65E3_41A9_5362BA7F1A83_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C69EC6F_1232_65E3_41A9_5362BA7F1A83_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C69EC6F_1232_65E3_41A9_5362BA7F1A83_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1C69EC6F_1232_65E3_41A9_5362BA7F1A83_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_1C4AC2F0_1237_E2FC_4191_10C8DE6815B5",
  "this.overlay_1D4E0722_1237_A31C_41AE_9C69F5AEEF16"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 65.44,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_37238216_2493_DE22_41B2_31CD0EBA68FF"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -151.36,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_30BB028D_2493_DE26_41A5_F85B79FDDF2F"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -83.91,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_321F206A_2493_DAE2_41C2_4D4A2FE5E025"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -72.98,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_3389E0E3_2493_DBE2_41A8_ABCAE9F29BAD"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -101.96,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_30C97DD6_2493_EA22_41B7_7F480C44A6BA"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 28.64,
   "distance": 1,
   "panorama": "this.panorama_1EC76234_1216_9D64_41A9_AF64765A9F9F",
   "backwardYaw": -148.47
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -150.48,
   "distance": 1,
   "panorama": "this.panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC",
   "backwardYaw": -11.81
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1C6F6FB5_1212_A367_41B1_97BA031975B7"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_1F1F5301_1216_A31C_41A0_CF4AED19D1F5",
 "thumbnailUrl": "media/panorama_1F1F5301_1216_A31C_41A0_CF4AED19D1F5_t.jpg",
 "label": "A17",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_1F1F5301_1216_A31C_41A0_CF4AED19D1F5_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1F1F5301_1216_A31C_41A0_CF4AED19D1F5_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1F1F5301_1216_A31C_41A0_CF4AED19D1F5_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1F1F5301_1216_A31C_41A0_CF4AED19D1F5_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1F1F5301_1216_A31C_41A0_CF4AED19D1F5_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1F1F5301_1216_A31C_41A0_CF4AED19D1F5_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1F1F5301_1216_A31C_41A0_CF4AED19D1F5_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1F1F5301_1216_A31C_41A0_CF4AED19D1F5_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1F1F5301_1216_A31C_41A0_CF4AED19D1F5_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1F1F5301_1216_A31C_41A0_CF4AED19D1F5_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1F1F5301_1216_A31C_41A0_CF4AED19D1F5_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1F1F5301_1216_A31C_41A0_CF4AED19D1F5_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1F1F5301_1216_A31C_41A0_CF4AED19D1F5_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1F1F5301_1216_A31C_41A0_CF4AED19D1F5_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1F1F5301_1216_A31C_41A0_CF4AED19D1F5_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_1F1F5301_1216_A31C_41A0_CF4AED19D1F5_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1F1F5301_1216_A31C_41A0_CF4AED19D1F5_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1F1F5301_1216_A31C_41A0_CF4AED19D1F5_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1F1F5301_1216_A31C_41A0_CF4AED19D1F5_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_1CBF9E1B_1212_A52C_4196_F0907F21E5BE",
  "this.overlay_1CEEFD15_1212_E727_419E_6096CD899B43",
  "this.overlay_1D83D92E_1212_AF65_41AA_B23B917E6C75"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 19.34,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_32811016_2493_DA22_41A8_D36590FB9E3D"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -66.7,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_37F7A17F_2493_DAE2_41B5_D2B611D18452"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -7.87,
   "distance": 1,
   "panorama": "this.panorama_1E2C3554_1217_A725_41A3_8E48640695C2",
   "backwardYaw": 136.95
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_1C79B467_1212_65E4_41A9_397DB7948749",
 "thumbnailUrl": "media/panorama_1C79B467_1212_65E4_41A9_397DB7948749_t.jpg",
 "label": "AB PERPUS",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_1C79B467_1212_65E4_41A9_397DB7948749_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C79B467_1212_65E4_41A9_397DB7948749_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C79B467_1212_65E4_41A9_397DB7948749_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1C79B467_1212_65E4_41A9_397DB7948749_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C79B467_1212_65E4_41A9_397DB7948749_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C79B467_1212_65E4_41A9_397DB7948749_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1C79B467_1212_65E4_41A9_397DB7948749_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C79B467_1212_65E4_41A9_397DB7948749_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C79B467_1212_65E4_41A9_397DB7948749_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1C79B467_1212_65E4_41A9_397DB7948749_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C79B467_1212_65E4_41A9_397DB7948749_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C79B467_1212_65E4_41A9_397DB7948749_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1C79B467_1212_65E4_41A9_397DB7948749_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C79B467_1212_65E4_41A9_397DB7948749_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C79B467_1212_65E4_41A9_397DB7948749_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_1C79B467_1212_65E4_41A9_397DB7948749_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C79B467_1212_65E4_41A9_397DB7948749_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C79B467_1212_65E4_41A9_397DB7948749_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1C79B467_1212_65E4_41A9_397DB7948749_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_1D17C1AC_122E_BF65_4183_8161E3331EA2"
 ]
},
{
 "autoplay": true,
 "class": "MediaAudio",
 "audio": {
  "class": "AudioResource",
  "mp3Url": "media/audio_3680D83D_249E_2A66_41AA_AFDF8A7E0D89.mp3",
  "oggUrl": "media/audio_3680D83D_249E_2A66_41AA_AFDF8A7E0D89.ogg"
 },
 "id": "audio_3680D83D_249E_2A66_41AA_AFDF8A7E0D89",
 "data": {
  "label": "Winter Morning Ambience Sound Effect Copyright Free Nature Sounds"
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -82.02,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_30E162EE_2493_DFE2_41C1_DFBB6599320E"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_49AFE1F3_135A_97A8_4187_C6E968ACA6B8_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_1C6B4747_122D_A323_4183_68A8F7F1D0BB_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 53.51,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_30784E71_2493_E6FE_41BF_FDF52A7A4A3D"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 146.75,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_370461DD_2493_DA26_41B7_03CDD049EC2F"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_5EF35374_136E_B4A8_4191_7E72995B3ECD_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 168.19,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_3739C1F4_2493_DDE5_4188_DAFCC588DDB7"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 102.5,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_325640A6_2493_DA62_4177_3B34CBA60C26"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -160.66,
   "distance": 1,
   "panorama": "this.panorama_1C4B5BF2_122D_A2FC_419B_609BAA032087",
   "backwardYaw": 8.92
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_1C6F6FB5_1212_A367_41B1_97BA031975B7",
 "thumbnailUrl": "media/panorama_1C6F6FB5_1212_A367_41B1_97BA031975B7_t.jpg",
 "label": "AB MASJID",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_1C6F6FB5_1212_A367_41B1_97BA031975B7_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C6F6FB5_1212_A367_41B1_97BA031975B7_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C6F6FB5_1212_A367_41B1_97BA031975B7_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1C6F6FB5_1212_A367_41B1_97BA031975B7_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C6F6FB5_1212_A367_41B1_97BA031975B7_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C6F6FB5_1212_A367_41B1_97BA031975B7_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1C6F6FB5_1212_A367_41B1_97BA031975B7_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C6F6FB5_1212_A367_41B1_97BA031975B7_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C6F6FB5_1212_A367_41B1_97BA031975B7_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1C6F6FB5_1212_A367_41B1_97BA031975B7_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C6F6FB5_1212_A367_41B1_97BA031975B7_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C6F6FB5_1212_A367_41B1_97BA031975B7_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1C6F6FB5_1212_A367_41B1_97BA031975B7_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C6F6FB5_1212_A367_41B1_97BA031975B7_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C6F6FB5_1212_A367_41B1_97BA031975B7_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_1C6F6FB5_1212_A367_41B1_97BA031975B7_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C6F6FB5_1212_A367_41B1_97BA031975B7_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C6F6FB5_1212_A367_41B1_97BA031975B7_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1C6F6FB5_1212_A367_41B1_97BA031975B7_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_1C75CA75_122E_EDE4_4181_599F8E2C58F1"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_49AF6E44_135A_6CE9_414A_9C058452CF94_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_1E3059D8_1216_AF2D_4182_4B71A1D76684_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 151.61,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_374E722E_2493_DE62_419E_495E1B7F8590"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_1CC7CD8C_1233_E724_41A4_7036FC9FAFBA_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 154,
   "distance": 1,
   "panorama": "this.panorama_1E351DCE_1216_A725_41AA_C2237F5681B0",
   "backwardYaw": -16.33
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -123.6,
   "distance": 1,
   "panorama": "this.panorama_1E261A0A_1216_AD2C_41A3_6B0EE11D4D7E",
   "backwardYaw": 29.14
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -26.63,
   "distance": 1,
   "panorama": "this.panorama_1E3E7C89_1216_A52F_41B0_E95358B2767C",
   "backwardYaw": 144.83
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_1E35133E_1216_E365_418A_E512CC92AE96",
 "thumbnailUrl": "media/panorama_1E35133E_1216_E365_418A_E512CC92AE96_t.jpg",
 "label": "A5",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_1E35133E_1216_E365_418A_E512CC92AE96_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E35133E_1216_E365_418A_E512CC92AE96_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E35133E_1216_E365_418A_E512CC92AE96_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1E35133E_1216_E365_418A_E512CC92AE96_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E35133E_1216_E365_418A_E512CC92AE96_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E35133E_1216_E365_418A_E512CC92AE96_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1E35133E_1216_E365_418A_E512CC92AE96_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E35133E_1216_E365_418A_E512CC92AE96_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E35133E_1216_E365_418A_E512CC92AE96_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1E35133E_1216_E365_418A_E512CC92AE96_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E35133E_1216_E365_418A_E512CC92AE96_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E35133E_1216_E365_418A_E512CC92AE96_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1E35133E_1216_E365_418A_E512CC92AE96_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E35133E_1216_E365_418A_E512CC92AE96_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E35133E_1216_E365_418A_E512CC92AE96_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_1E35133E_1216_E365_418A_E512CC92AE96_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E35133E_1216_E365_418A_E512CC92AE96_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E35133E_1216_E365_418A_E512CC92AE96_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1E35133E_1216_E365_418A_E512CC92AE96_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_1CC5F1FB_121F_9EE3_415D_376335E24752",
  "this.overlay_1D27D0EB_121F_BEE3_419A_8904A71B3700",
  "this.overlay_1CEEC4D8_121D_A52D_41B0_D908E1BCA50E"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 125.23,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_37F32CD1_2493_EA3E_41BF_19352CA864B8"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -53.89,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_37A42C7F_2493_EAE2_41BD_52149D77FF11"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -136.9,
  "pitch": 0.05
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_1EF5F0E8_1217_9EEC_4186_EB28B5BB56EA_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 166.85,
   "distance": 1,
   "panorama": "this.panorama_7178E80E_13B6_9478_4187_6F7683DD2190",
   "backwardYaw": 17.12
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 97.98,
   "distance": 1,
   "panorama": "this.panorama_71772D8C_13B6_6C78_41B2_9EB26FDA544E",
   "backwardYaw": -85.79
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_7719D67F_13B6_9C98_41A2_D5E02E95A3B2",
 "thumbnailUrl": "media/panorama_7719D67F_13B6_9C98_41A2_D5E02E95A3B2_t.jpg",
 "label": "C KOLAM 2",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_7719D67F_13B6_9C98_41A2_D5E02E95A3B2_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7719D67F_13B6_9C98_41A2_D5E02E95A3B2_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7719D67F_13B6_9C98_41A2_D5E02E95A3B2_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_7719D67F_13B6_9C98_41A2_D5E02E95A3B2_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7719D67F_13B6_9C98_41A2_D5E02E95A3B2_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7719D67F_13B6_9C98_41A2_D5E02E95A3B2_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_7719D67F_13B6_9C98_41A2_D5E02E95A3B2_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7719D67F_13B6_9C98_41A2_D5E02E95A3B2_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7719D67F_13B6_9C98_41A2_D5E02E95A3B2_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_7719D67F_13B6_9C98_41A2_D5E02E95A3B2_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7719D67F_13B6_9C98_41A2_D5E02E95A3B2_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7719D67F_13B6_9C98_41A2_D5E02E95A3B2_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_7719D67F_13B6_9C98_41A2_D5E02E95A3B2_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7719D67F_13B6_9C98_41A2_D5E02E95A3B2_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7719D67F_13B6_9C98_41A2_D5E02E95A3B2_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_7719D67F_13B6_9C98_41A2_D5E02E95A3B2_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7719D67F_13B6_9C98_41A2_D5E02E95A3B2_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7719D67F_13B6_9C98_41A2_D5E02E95A3B2_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_7719D67F_13B6_9C98_41A2_D5E02E95A3B2_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_769D3F39_13BB_AC98_41AE_E98F29510728",
  "this.overlay_7986757E_13BE_BC99_41A9_653D16268D42"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 70.34,
   "distance": 1,
   "panorama": "this.panorama_02181B5D_0879_47EF_4194_05F745303325",
   "backwardYaw": -117.32
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -107.4,
   "distance": 1,
   "panorama": "this.panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC",
   "backwardYaw": 107.02
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_0154F527_0C22_07FC_4193_06409B7D0536",
 "thumbnailUrl": "media/panorama_0154F527_0C22_07FC_4193_06409B7D0536_t.jpg",
 "label": "A2",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_0154F527_0C22_07FC_4193_06409B7D0536_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0154F527_0C22_07FC_4193_06409B7D0536_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0154F527_0C22_07FC_4193_06409B7D0536_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_0154F527_0C22_07FC_4193_06409B7D0536_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0154F527_0C22_07FC_4193_06409B7D0536_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0154F527_0C22_07FC_4193_06409B7D0536_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_0154F527_0C22_07FC_4193_06409B7D0536_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0154F527_0C22_07FC_4193_06409B7D0536_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0154F527_0C22_07FC_4193_06409B7D0536_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_0154F527_0C22_07FC_4193_06409B7D0536_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0154F527_0C22_07FC_4193_06409B7D0536_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0154F527_0C22_07FC_4193_06409B7D0536_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_0154F527_0C22_07FC_4193_06409B7D0536_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0154F527_0C22_07FC_4193_06409B7D0536_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0154F527_0C22_07FC_4193_06409B7D0536_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_0154F527_0C22_07FC_4193_06409B7D0536_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0154F527_0C22_07FC_4193_06409B7D0536_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0154F527_0C22_07FC_4193_06409B7D0536_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_0154F527_0C22_07FC_4193_06409B7D0536_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_1F7507C3_1212_A31C_4183_83418A8BA979",
  "this.overlay_1FCAF628_1212_E56C_4194_FF80F7393174"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -157.14,
   "distance": 1,
   "panorama": "this.panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC",
   "backwardYaw": 42.71
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 8.92,
   "distance": 1,
   "panorama": "this.panorama_1C6F6FB5_1212_A367_41B1_97BA031975B7",
   "backwardYaw": -160.66
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_1C4B5BF2_122D_A2FC_419B_609BAA032087",
 "thumbnailUrl": "media/panorama_1C4B5BF2_122D_A2FC_419B_609BAA032087_t.jpg",
 "label": "AB VOLI",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_1C4B5BF2_122D_A2FC_419B_609BAA032087_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C4B5BF2_122D_A2FC_419B_609BAA032087_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C4B5BF2_122D_A2FC_419B_609BAA032087_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1C4B5BF2_122D_A2FC_419B_609BAA032087_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C4B5BF2_122D_A2FC_419B_609BAA032087_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C4B5BF2_122D_A2FC_419B_609BAA032087_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1C4B5BF2_122D_A2FC_419B_609BAA032087_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C4B5BF2_122D_A2FC_419B_609BAA032087_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C4B5BF2_122D_A2FC_419B_609BAA032087_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1C4B5BF2_122D_A2FC_419B_609BAA032087_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C4B5BF2_122D_A2FC_419B_609BAA032087_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C4B5BF2_122D_A2FC_419B_609BAA032087_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1C4B5BF2_122D_A2FC_419B_609BAA032087_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C4B5BF2_122D_A2FC_419B_609BAA032087_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C4B5BF2_122D_A2FC_419B_609BAA032087_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_1C4B5BF2_122D_A2FC_419B_609BAA032087_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C4B5BF2_122D_A2FC_419B_609BAA032087_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C4B5BF2_122D_A2FC_419B_609BAA032087_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1C4B5BF2_122D_A2FC_419B_609BAA032087_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_1C572589_122D_A72C_41AE_E3A751615EB4",
  "this.overlay_1D311414_122D_E524_41AA_98671529126D"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 22.86,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_30AC5299_2493_DE2E_4180_F46C7186A4EC"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 53.51,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_32E9505E_2493_DA22_418E_CE98BD6154AF"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1C63E5B5_122F_A764_412F_D3ADED669290"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_1C740D40_122E_671C_41A5_F8F6717860CD",
 "thumbnailUrl": "media/panorama_1C740D40_122E_671C_41A5_F8F6717860CD_t.jpg",
 "label": "AKB LAB KOM 2",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_1C740D40_122E_671C_41A5_F8F6717860CD_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C740D40_122E_671C_41A5_F8F6717860CD_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C740D40_122E_671C_41A5_F8F6717860CD_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1C740D40_122E_671C_41A5_F8F6717860CD_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C740D40_122E_671C_41A5_F8F6717860CD_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C740D40_122E_671C_41A5_F8F6717860CD_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1C740D40_122E_671C_41A5_F8F6717860CD_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C740D40_122E_671C_41A5_F8F6717860CD_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C740D40_122E_671C_41A5_F8F6717860CD_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1C740D40_122E_671C_41A5_F8F6717860CD_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C740D40_122E_671C_41A5_F8F6717860CD_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C740D40_122E_671C_41A5_F8F6717860CD_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1C740D40_122E_671C_41A5_F8F6717860CD_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C740D40_122E_671C_41A5_F8F6717860CD_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C740D40_122E_671C_41A5_F8F6717860CD_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_1C740D40_122E_671C_41A5_F8F6717860CD_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C740D40_122E_671C_41A5_F8F6717860CD_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C740D40_122E_671C_41A5_F8F6717860CD_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1C740D40_122E_671C_41A5_F8F6717860CD_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_021B5170_1212_9FFD_41AA_5CE005AFDE17"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_1E35133E_1216_E365_418A_E512CC92AE96_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -66.72,
  "pitch": -0.14
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 101.74,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_308C7275_2493_DEE6_4191_80322A1039AF"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 29.52,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_30DB22B1_2493_DE7E_4163_4283192415AE"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_1E351DCE_1216_A725_41AA_C2237F5681B0_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 31.53,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_370361E8_2493_DDEE_41B6_4F50036E8E97"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_1F53F5D9_12AA_FF98_41A3_6B669E91923B_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -170.45,
   "distance": 1,
   "panorama": "this.panorama_7176E1A8_13B7_B7B9_419E_B2A83EBA5F99",
   "backwardYaw": -0.88
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -85.79,
   "distance": 1,
   "panorama": "this.panorama_7719D67F_13B6_9C98_41A2_D5E02E95A3B2",
   "backwardYaw": 97.98
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_71772D8C_13B6_6C78_41B2_9EB26FDA544E",
 "thumbnailUrl": "media/panorama_71772D8C_13B6_6C78_41B2_9EB26FDA544E_t.jpg",
 "label": "C KOLAM",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_71772D8C_13B6_6C78_41B2_9EB26FDA544E_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_71772D8C_13B6_6C78_41B2_9EB26FDA544E_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_71772D8C_13B6_6C78_41B2_9EB26FDA544E_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_71772D8C_13B6_6C78_41B2_9EB26FDA544E_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_71772D8C_13B6_6C78_41B2_9EB26FDA544E_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_71772D8C_13B6_6C78_41B2_9EB26FDA544E_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_71772D8C_13B6_6C78_41B2_9EB26FDA544E_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_71772D8C_13B6_6C78_41B2_9EB26FDA544E_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_71772D8C_13B6_6C78_41B2_9EB26FDA544E_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_71772D8C_13B6_6C78_41B2_9EB26FDA544E_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_71772D8C_13B6_6C78_41B2_9EB26FDA544E_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_71772D8C_13B6_6C78_41B2_9EB26FDA544E_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_71772D8C_13B6_6C78_41B2_9EB26FDA544E_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_71772D8C_13B6_6C78_41B2_9EB26FDA544E_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_71772D8C_13B6_6C78_41B2_9EB26FDA544E_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_71772D8C_13B6_6C78_41B2_9EB26FDA544E_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_71772D8C_13B6_6C78_41B2_9EB26FDA544E_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_71772D8C_13B6_6C78_41B2_9EB26FDA544E_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_71772D8C_13B6_6C78_41B2_9EB26FDA544E_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_76356DC0_13BA_6FE8_41A7_472FCD8F2F43",
  "this.overlay_7676AAD0_13BA_B5E8_41AA_11CB8CE16872"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -91.7,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_313BAF75_2493_E6E6_41B3_B9C9C4CA61C6"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -13.53,
   "distance": 1,
   "panorama": "this.panorama_1CC7CD8C_1233_E724_41A4_7036FC9FAFBA",
   "backwardYaw": 40.61
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -126.95,
   "distance": 1,
   "panorama": "this.panorama_1C69EC6F_1232_65E3_41A9_5362BA7F1A83",
   "backwardYaw": 78.04
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_1D51A53A_1232_676C_419B_FB05E8EE5A1C",
 "thumbnailUrl": "media/panorama_1D51A53A_1232_676C_419B_FB05E8EE5A1C_t.jpg",
 "label": "AKB GURU1",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_1D51A53A_1232_676C_419B_FB05E8EE5A1C_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1D51A53A_1232_676C_419B_FB05E8EE5A1C_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1D51A53A_1232_676C_419B_FB05E8EE5A1C_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1D51A53A_1232_676C_419B_FB05E8EE5A1C_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1D51A53A_1232_676C_419B_FB05E8EE5A1C_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1D51A53A_1232_676C_419B_FB05E8EE5A1C_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1D51A53A_1232_676C_419B_FB05E8EE5A1C_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1D51A53A_1232_676C_419B_FB05E8EE5A1C_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1D51A53A_1232_676C_419B_FB05E8EE5A1C_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1D51A53A_1232_676C_419B_FB05E8EE5A1C_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1D51A53A_1232_676C_419B_FB05E8EE5A1C_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1D51A53A_1232_676C_419B_FB05E8EE5A1C_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1D51A53A_1232_676C_419B_FB05E8EE5A1C_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1D51A53A_1232_676C_419B_FB05E8EE5A1C_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1D51A53A_1232_676C_419B_FB05E8EE5A1C_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_1D51A53A_1232_676C_419B_FB05E8EE5A1C_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1D51A53A_1232_676C_419B_FB05E8EE5A1C_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1D51A53A_1232_676C_419B_FB05E8EE5A1C_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1D51A53A_1232_676C_419B_FB05E8EE5A1C_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_1D98A1F2_1213_9EFC_41AE_90E981188E90",
  "this.overlay_2265BE3F_136E_EC97_41A0_BBA79CB45A42"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_5829C03C_1376_7498_41AC_130D2B81793F_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -124.86,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_37A99C73_2493_EAE2_41BC_2C5D325B084B"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 148.76,
   "distance": 1,
   "panorama": "this.panorama_1C7AA7ED_1212_62E4_4189_A60955E10E08",
   "backwardYaw": 4.94
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1E2C3554_1217_A725_41A3_8E48640695C2"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 91.19,
   "distance": 1,
   "panorama": "this.panorama_1ED7C008_1217_BD2C_41B0_159A6CBF8842",
   "backwardYaw": -76.87
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_1E3E8A7F_1217_EDE4_41A9_9F5BCA609E87",
 "thumbnailUrl": "media/panorama_1E3E8A7F_1217_EDE4_41A9_9F5BCA609E87_t.jpg",
 "label": "A12",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_1E3E8A7F_1217_EDE4_41A9_9F5BCA609E87_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E3E8A7F_1217_EDE4_41A9_9F5BCA609E87_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E3E8A7F_1217_EDE4_41A9_9F5BCA609E87_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1E3E8A7F_1217_EDE4_41A9_9F5BCA609E87_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E3E8A7F_1217_EDE4_41A9_9F5BCA609E87_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E3E8A7F_1217_EDE4_41A9_9F5BCA609E87_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1E3E8A7F_1217_EDE4_41A9_9F5BCA609E87_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E3E8A7F_1217_EDE4_41A9_9F5BCA609E87_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E3E8A7F_1217_EDE4_41A9_9F5BCA609E87_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1E3E8A7F_1217_EDE4_41A9_9F5BCA609E87_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E3E8A7F_1217_EDE4_41A9_9F5BCA609E87_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E3E8A7F_1217_EDE4_41A9_9F5BCA609E87_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1E3E8A7F_1217_EDE4_41A9_9F5BCA609E87_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E3E8A7F_1217_EDE4_41A9_9F5BCA609E87_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E3E8A7F_1217_EDE4_41A9_9F5BCA609E87_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_1E3E8A7F_1217_EDE4_41A9_9F5BCA609E87_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E3E8A7F_1217_EDE4_41A9_9F5BCA609E87_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E3E8A7F_1217_EDE4_41A9_9F5BCA609E87_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1E3E8A7F_1217_EDE4_41A9_9F5BCA609E87_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_1CFD2DB3_1216_A77C_416E_66DEBF97806A",
  "this.overlay_1D4D7210_1216_9D3C_4171_0ADE2F42A7D4",
  "this.overlay_0255BC19_1216_652F_41A6_C066A016D75E"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 113.34,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_30567340_2493_DE1E_41A5_728548948E48"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 163.46,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_37569D3C_2493_EA66_419C_30464AEA1F1C"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -10.98,
  "pitch": -1.31
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_1C5160C8_122D_9D2D_41B1_024A8D5AFA43_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 131.14,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_30A99DB2_2493_EA62_41A3_8FF3DE68AF76"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_1F7646C7_12AA_9DF7_41A3_6118C47853B8_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 170.74,
  "pitch": 6.06
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_1E590196_1216_7F24_41A7_D1A1589C2A9E_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 163.67,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_37752246_2493_DE22_41BE_820E66D5C91B"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_1E261A0A_1216_AD2C_41A3_6B0EE11D4D7E_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 97.14,
   "distance": 1,
   "panorama": "this.panorama_49AFE1F3_135A_97A8_4187_C6E968ACA6B8",
   "backwardYaw": -65.78
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_49AE96EF_135B_9DB8_419C_15F53F06D743",
 "thumbnailUrl": "media/panorama_49AE96EF_135B_9DB8_419C_15F53F06D743_t.jpg",
 "label": "CB 1",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_49AE96EF_135B_9DB8_419C_15F53F06D743_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_49AE96EF_135B_9DB8_419C_15F53F06D743_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_49AE96EF_135B_9DB8_419C_15F53F06D743_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_49AE96EF_135B_9DB8_419C_15F53F06D743_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_49AE96EF_135B_9DB8_419C_15F53F06D743_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_49AE96EF_135B_9DB8_419C_15F53F06D743_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_49AE96EF_135B_9DB8_419C_15F53F06D743_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_49AE96EF_135B_9DB8_419C_15F53F06D743_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_49AE96EF_135B_9DB8_419C_15F53F06D743_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_49AE96EF_135B_9DB8_419C_15F53F06D743_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_49AE96EF_135B_9DB8_419C_15F53F06D743_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_49AE96EF_135B_9DB8_419C_15F53F06D743_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_49AE96EF_135B_9DB8_419C_15F53F06D743_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_49AE96EF_135B_9DB8_419C_15F53F06D743_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_49AE96EF_135B_9DB8_419C_15F53F06D743_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_49AE96EF_135B_9DB8_419C_15F53F06D743_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_49AE96EF_135B_9DB8_419C_15F53F06D743_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_49AE96EF_135B_9DB8_419C_15F53F06D743_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_49AE96EF_135B_9DB8_419C_15F53F06D743_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_74AA5A0C_13BA_7478_41B0_90F2D30D4E01"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -50.37,
   "distance": 1,
   "panorama": "this.panorama_1C74D9CF_122E_AF24_41AA_174DA8673956",
   "backwardYaw": 167.19
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1F7039BE_12B5_9798_41B0_325FFC1AF137"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_1C745916_122E_6F24_41B0_E0BDC7980538",
 "thumbnailUrl": "media/panorama_1C745916_122E_6F24_41B0_E0BDC7980538_t.jpg",
 "label": "AKB KANTIN 2",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_1C745916_122E_6F24_41B0_E0BDC7980538_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C745916_122E_6F24_41B0_E0BDC7980538_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C745916_122E_6F24_41B0_E0BDC7980538_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1C745916_122E_6F24_41B0_E0BDC7980538_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C745916_122E_6F24_41B0_E0BDC7980538_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C745916_122E_6F24_41B0_E0BDC7980538_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1C745916_122E_6F24_41B0_E0BDC7980538_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C745916_122E_6F24_41B0_E0BDC7980538_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C745916_122E_6F24_41B0_E0BDC7980538_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1C745916_122E_6F24_41B0_E0BDC7980538_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C745916_122E_6F24_41B0_E0BDC7980538_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C745916_122E_6F24_41B0_E0BDC7980538_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1C745916_122E_6F24_41B0_E0BDC7980538_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C745916_122E_6F24_41B0_E0BDC7980538_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C745916_122E_6F24_41B0_E0BDC7980538_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_1C745916_122E_6F24_41B0_E0BDC7980538_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C745916_122E_6F24_41B0_E0BDC7980538_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C745916_122E_6F24_41B0_E0BDC7980538_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1C745916_122E_6F24_41B0_E0BDC7980538_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_1C8217D9_12AA_BB98_41AF_A2F3EC91AC0E",
  "this.overlay_1CD5ECAE_12AA_6DB9_41A5_8E830ECB7E1B"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -4.02,
   "distance": 1,
   "panorama": "this.panorama_1E351DCE_1216_A725_41AA_C2237F5681B0",
   "backwardYaw": 159.53
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -113.8,
   "distance": 1,
   "panorama": "this.panorama_027D9014_12BA_7468_41AE_B7601C694ED1",
   "backwardYaw": 76.37
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 103.5,
   "distance": 1,
   "panorama": "this.panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC",
   "backwardYaw": -115.06
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 44.76,
   "distance": 1,
   "panorama": "this.panorama_1C5160C8_122D_9D2D_41B1_024A8D5AFA43",
   "backwardYaw": -100.11
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_1E3059D8_1216_AF2D_4182_4B71A1D76684",
 "thumbnailUrl": "media/panorama_1E3059D8_1216_AF2D_4182_4B71A1D76684_t.jpg",
 "label": "A3",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_1E3059D8_1216_AF2D_4182_4B71A1D76684_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E3059D8_1216_AF2D_4182_4B71A1D76684_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E3059D8_1216_AF2D_4182_4B71A1D76684_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1E3059D8_1216_AF2D_4182_4B71A1D76684_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E3059D8_1216_AF2D_4182_4B71A1D76684_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E3059D8_1216_AF2D_4182_4B71A1D76684_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1E3059D8_1216_AF2D_4182_4B71A1D76684_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E3059D8_1216_AF2D_4182_4B71A1D76684_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E3059D8_1216_AF2D_4182_4B71A1D76684_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1E3059D8_1216_AF2D_4182_4B71A1D76684_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E3059D8_1216_AF2D_4182_4B71A1D76684_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E3059D8_1216_AF2D_4182_4B71A1D76684_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1E3059D8_1216_AF2D_4182_4B71A1D76684_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E3059D8_1216_AF2D_4182_4B71A1D76684_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E3059D8_1216_AF2D_4182_4B71A1D76684_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_1E3059D8_1216_AF2D_4182_4B71A1D76684_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E3059D8_1216_AF2D_4182_4B71A1D76684_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E3059D8_1216_AF2D_4182_4B71A1D76684_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1E3059D8_1216_AF2D_4182_4B71A1D76684_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_1CA6244A_121D_A52C_41A9_F6D1528CF2A2",
  "this.overlay_1D119548_121D_A72D_41AA_4E2453D72711",
  "this.overlay_1D48DAA0_121E_6D1C_41AC_DFD8A9F98E0B",
  "this.overlay_1CE3126A_121E_BDEC_4197_7CA1B7E86B73"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 75.12,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_30E85DFA_2493_E5E2_4183_1BC3F89A3964"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -41.95,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_30A1A2A5_2493_DE66_41C0_AE15BD1523FF"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 172.13,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_31DDBECF_2493_E622_41C0_E7FAFBF3095C"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -163.04,
   "distance": 1,
   "panorama": "this.panorama_49AFE1F3_135A_97A8_4187_C6E968ACA6B8",
   "backwardYaw": 15.2
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_49AEEB3E_135B_F498_41A5_157725750FD2",
 "thumbnailUrl": "media/panorama_49AEEB3E_135B_F498_41A5_157725750FD2_t.jpg",
 "label": "CB AS",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_49AEEB3E_135B_F498_41A5_157725750FD2_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_49AEEB3E_135B_F498_41A5_157725750FD2_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_49AEEB3E_135B_F498_41A5_157725750FD2_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_49AEEB3E_135B_F498_41A5_157725750FD2_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_49AEEB3E_135B_F498_41A5_157725750FD2_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_49AEEB3E_135B_F498_41A5_157725750FD2_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_49AEEB3E_135B_F498_41A5_157725750FD2_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_49AEEB3E_135B_F498_41A5_157725750FD2_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_49AEEB3E_135B_F498_41A5_157725750FD2_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_49AEEB3E_135B_F498_41A5_157725750FD2_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_49AEEB3E_135B_F498_41A5_157725750FD2_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_49AEEB3E_135B_F498_41A5_157725750FD2_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_49AEEB3E_135B_F498_41A5_157725750FD2_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_49AEEB3E_135B_F498_41A5_157725750FD2_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_49AEEB3E_135B_F498_41A5_157725750FD2_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_49AEEB3E_135B_F498_41A5_157725750FD2_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_49AEEB3E_135B_F498_41A5_157725750FD2_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_49AEEB3E_135B_F498_41A5_157725750FD2_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_49AEEB3E_135B_F498_41A5_157725750FD2_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_76D5058D_13BA_BC78_41A5_583AEB626F68"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -99.99,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_30592E4E_2493_E622_41B1_D87B49F85125"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 145.21,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_3008CE1E_2493_E622_41B8_6A762C006719"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 129.63,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_37108CF4_2493_EBE6_41BA_319DD2E74029"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 80.01,
   "distance": 1,
   "panorama": "this.panorama_1F7039BE_12B5_9798_41B0_325FFC1AF137",
   "backwardYaw": -46.35
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -126.49,
   "distance": 1,
   "panorama": "this.panorama_49AF9DC3_135A_EFE8_41B0_A74AB8E7B2D6",
   "backwardYaw": 88.3
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_5829C03C_1376_7498_41AC_130D2B81793F",
 "thumbnailUrl": "media/panorama_5829C03C_1376_7498_41AC_130D2B81793F_t.jpg",
 "label": "C1",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_5829C03C_1376_7498_41AC_130D2B81793F_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_5829C03C_1376_7498_41AC_130D2B81793F_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_5829C03C_1376_7498_41AC_130D2B81793F_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_5829C03C_1376_7498_41AC_130D2B81793F_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_5829C03C_1376_7498_41AC_130D2B81793F_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_5829C03C_1376_7498_41AC_130D2B81793F_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_5829C03C_1376_7498_41AC_130D2B81793F_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_5829C03C_1376_7498_41AC_130D2B81793F_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_5829C03C_1376_7498_41AC_130D2B81793F_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_5829C03C_1376_7498_41AC_130D2B81793F_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_5829C03C_1376_7498_41AC_130D2B81793F_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_5829C03C_1376_7498_41AC_130D2B81793F_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_5829C03C_1376_7498_41AC_130D2B81793F_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_5829C03C_1376_7498_41AC_130D2B81793F_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_5829C03C_1376_7498_41AC_130D2B81793F_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_5829C03C_1376_7498_41AC_130D2B81793F_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_5829C03C_1376_7498_41AC_130D2B81793F_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_5829C03C_1376_7498_41AC_130D2B81793F_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_5829C03C_1376_7498_41AC_130D2B81793F_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_45F47B1C_1355_B498_41AA_7A0F0BB39A3B",
  "this.overlay_44AAC325_135A_94A8_4193_14C3B5256996"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -84.16,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_314BFFC4_2493_E626_41AF_7CF22B274C0A"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -63.39,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_3154AFB3_2493_E662_41A5_CF59785ACA69"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_1F2B6CEB_12D6_6DB8_41B2_62922D3306B8_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -124.86,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_33DDA107_2493_DA22_41B8_541685AE5763"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 103.13,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_37763D5F_2493_EA22_41B2_E7CB8289D839"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_1E31C113_1217_9F23_41AF_9721C1EE070D_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 82.27,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_370FE1D1_2493_DA3E_41C2_42D3889FB37A"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 94.21,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_3762DD77_2493_EAE2_41A8_7AE67DC34093"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 146.71,
   "distance": 1,
   "panorama": "this.panorama_49AEC247_135B_B4E8_41A5_746131D61342",
   "backwardYaw": -54.77
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 5.15,
   "distance": 1,
   "panorama": "this.panorama_7176E1A8_13B7_B7B9_419E_B2A83EBA5F99",
   "backwardYaw": -164.17
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_49AF6E44_135A_6CE9_414A_9C058452CF94",
 "thumbnailUrl": "media/panorama_49AF6E44_135A_6CE9_414A_9C058452CF94_t.jpg",
 "label": "C6",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_49AF6E44_135A_6CE9_414A_9C058452CF94_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_49AF6E44_135A_6CE9_414A_9C058452CF94_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_49AF6E44_135A_6CE9_414A_9C058452CF94_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_49AF6E44_135A_6CE9_414A_9C058452CF94_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_49AF6E44_135A_6CE9_414A_9C058452CF94_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_49AF6E44_135A_6CE9_414A_9C058452CF94_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_49AF6E44_135A_6CE9_414A_9C058452CF94_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_49AF6E44_135A_6CE9_414A_9C058452CF94_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_49AF6E44_135A_6CE9_414A_9C058452CF94_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_49AF6E44_135A_6CE9_414A_9C058452CF94_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_49AF6E44_135A_6CE9_414A_9C058452CF94_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_49AF6E44_135A_6CE9_414A_9C058452CF94_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_49AF6E44_135A_6CE9_414A_9C058452CF94_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_49AF6E44_135A_6CE9_414A_9C058452CF94_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_49AF6E44_135A_6CE9_414A_9C058452CF94_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_49AF6E44_135A_6CE9_414A_9C058452CF94_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_49AF6E44_135A_6CE9_414A_9C058452CF94_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_49AF6E44_135A_6CE9_414A_9C058452CF94_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_49AF6E44_135A_6CE9_414A_9C058452CF94_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_718BB5E3_13AE_9FA8_4182_522CA66C1E11",
  "this.overlay_79C14A31_13B6_74A8_41B2_DDBEB87B1F17"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_49AF6A22_135A_94A9_41AA_E036F21F6533_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -97.82,
  "pitch": -9.7
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_0154F527_0C22_07FC_4193_06409B7D0536_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 118.7,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_372E820A_2493_DE22_41BA_51FAD86425C1"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -54.77,
   "distance": 1,
   "panorama": "this.panorama_49AF6E44_135A_6CE9_414A_9C058452CF94",
   "backwardYaw": 146.71
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 114.05,
   "distance": 1,
   "panorama": "this.panorama_5EF35374_136E_B4A8_4191_7E72995B3ECD",
   "backwardYaw": -78.26
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_49AEC247_135B_B4E8_41A5_746131D61342",
 "thumbnailUrl": "media/panorama_49AEC247_135B_B4E8_41A5_746131D61342_t.jpg",
 "label": "C7",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_49AEC247_135B_B4E8_41A5_746131D61342_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_49AEC247_135B_B4E8_41A5_746131D61342_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_49AEC247_135B_B4E8_41A5_746131D61342_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_49AEC247_135B_B4E8_41A5_746131D61342_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_49AEC247_135B_B4E8_41A5_746131D61342_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_49AEC247_135B_B4E8_41A5_746131D61342_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_49AEC247_135B_B4E8_41A5_746131D61342_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_49AEC247_135B_B4E8_41A5_746131D61342_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_49AEC247_135B_B4E8_41A5_746131D61342_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_49AEC247_135B_B4E8_41A5_746131D61342_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_49AEC247_135B_B4E8_41A5_746131D61342_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_49AEC247_135B_B4E8_41A5_746131D61342_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_49AEC247_135B_B4E8_41A5_746131D61342_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_49AEC247_135B_B4E8_41A5_746131D61342_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_49AEC247_135B_B4E8_41A5_746131D61342_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_49AEC247_135B_B4E8_41A5_746131D61342_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_49AEC247_135B_B4E8_41A5_746131D61342_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_49AEC247_135B_B4E8_41A5_746131D61342_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_49AEC247_135B_B4E8_41A5_746131D61342_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_78305CD8_13B6_6D98_4181_5A0AB08E5EEE",
  "this.overlay_787331BD_13B5_9798_419B_07EA5F7278D9"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 15.07,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_371A51BA_2493_DA62_418E_96B1694AB6CB"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -31.24,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_301512FA_2493_DFE2_418E_00B14001B72E"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 18.43,
   "distance": 1,
   "panorama": "this.panorama_1F76471E_12AA_BC99_417D_DD5A2084733C",
   "backwardYaw": 163.04
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1F2B6CEB_12D6_6DB8_41B2_62922D3306B8"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_1F769998_12AA_9798_41A9_9421299474C3",
 "thumbnailUrl": "media/panorama_1F769998_12AA_9798_41A9_9421299474C3_t.jpg",
 "label": "B6",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_1F769998_12AA_9798_41A9_9421299474C3_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1F769998_12AA_9798_41A9_9421299474C3_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1F769998_12AA_9798_41A9_9421299474C3_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1F769998_12AA_9798_41A9_9421299474C3_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1F769998_12AA_9798_41A9_9421299474C3_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1F769998_12AA_9798_41A9_9421299474C3_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1F769998_12AA_9798_41A9_9421299474C3_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1F769998_12AA_9798_41A9_9421299474C3_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1F769998_12AA_9798_41A9_9421299474C3_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1F769998_12AA_9798_41A9_9421299474C3_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1F769998_12AA_9798_41A9_9421299474C3_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1F769998_12AA_9798_41A9_9421299474C3_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1F769998_12AA_9798_41A9_9421299474C3_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1F769998_12AA_9798_41A9_9421299474C3_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1F769998_12AA_9798_41A9_9421299474C3_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_1F769998_12AA_9798_41A9_9421299474C3_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1F769998_12AA_9798_41A9_9421299474C3_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1F769998_12AA_9798_41A9_9421299474C3_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1F769998_12AA_9798_41A9_9421299474C3_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_1DA96FB6_12AB_ABA8_417A_2178CB02BCAD",
  "this.overlay_0053C474_12AA_FCA8_419F_A52EB4B894BD"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 25.88,
   "distance": 1,
   "panorama": "this.panorama_1ED7C008_1217_BD2C_41B0_159A6CBF8842",
   "backwardYaw": -124.1
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_1EF5F0E8_1217_9EEC_4186_EB28B5BB56EA",
 "thumbnailUrl": "media/panorama_1EF5F0E8_1217_9EEC_4186_EB28B5BB56EA_t.jpg",
 "label": "A14",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_1EF5F0E8_1217_9EEC_4186_EB28B5BB56EA_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1EF5F0E8_1217_9EEC_4186_EB28B5BB56EA_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1EF5F0E8_1217_9EEC_4186_EB28B5BB56EA_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1EF5F0E8_1217_9EEC_4186_EB28B5BB56EA_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1EF5F0E8_1217_9EEC_4186_EB28B5BB56EA_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1EF5F0E8_1217_9EEC_4186_EB28B5BB56EA_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1EF5F0E8_1217_9EEC_4186_EB28B5BB56EA_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1EF5F0E8_1217_9EEC_4186_EB28B5BB56EA_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1EF5F0E8_1217_9EEC_4186_EB28B5BB56EA_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1EF5F0E8_1217_9EEC_4186_EB28B5BB56EA_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1EF5F0E8_1217_9EEC_4186_EB28B5BB56EA_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1EF5F0E8_1217_9EEC_4186_EB28B5BB56EA_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1EF5F0E8_1217_9EEC_4186_EB28B5BB56EA_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1EF5F0E8_1217_9EEC_4186_EB28B5BB56EA_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1EF5F0E8_1217_9EEC_4186_EB28B5BB56EA_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_1EF5F0E8_1217_9EEC_4186_EB28B5BB56EA_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1EF5F0E8_1217_9EEC_4186_EB28B5BB56EA_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1EF5F0E8_1217_9EEC_4186_EB28B5BB56EA_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1EF5F0E8_1217_9EEC_4186_EB28B5BB56EA_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_1CBCD90E_1216_EF25_417B_8C373F237210"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_71772D8C_13B6_6C78_41B2_9EB26FDA544E_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -105.14,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_3029E329_2493_DE6E_418F_F9E67B7F1895"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -171.08,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_37303D18_2493_EA2E_41C2_1D4CD7731159"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_7178E80E_13B6_9478_4187_6F7683DD2190_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_1F2B9277_12D6_B497_418D_A66B17178836_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_49AEEB3E_135B_F498_41A5_157725750FD2_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_1D4CDF0B_12AA_AC78_4190_C5BCACDF8F2B_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 78.38,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_37E8E196_2493_DA22_41B6_B77352EE0E18"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -149.85,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_303F3E2A_2493_E662_4190_16E250A01BF6"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -126.49,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_30602E88_2493_E62E_41B4_1D9A10B70CD5"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 46.22,
   "distance": 1,
   "panorama": "this.panorama_1E36C7D9_1217_E32F_419A_CA22B2D4E0D8",
   "backwardYaw": -117.57
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 136.95,
   "distance": 1,
   "panorama": "this.panorama_1C79B467_1212_65E4_41A9_397DB7948749",
   "backwardYaw": -7.87
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -109.03,
   "distance": 1,
   "panorama": "this.panorama_1E31C113_1217_9F23_41AF_9721C1EE070D",
   "backwardYaw": 43.71
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_1E2C3554_1217_A725_41A3_8E48640695C2",
 "thumbnailUrl": "media/panorama_1E2C3554_1217_A725_41A3_8E48640695C2_t.jpg",
 "label": "A10",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_1E2C3554_1217_A725_41A3_8E48640695C2_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E2C3554_1217_A725_41A3_8E48640695C2_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E2C3554_1217_A725_41A3_8E48640695C2_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1E2C3554_1217_A725_41A3_8E48640695C2_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E2C3554_1217_A725_41A3_8E48640695C2_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E2C3554_1217_A725_41A3_8E48640695C2_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1E2C3554_1217_A725_41A3_8E48640695C2_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E2C3554_1217_A725_41A3_8E48640695C2_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E2C3554_1217_A725_41A3_8E48640695C2_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1E2C3554_1217_A725_41A3_8E48640695C2_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E2C3554_1217_A725_41A3_8E48640695C2_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E2C3554_1217_A725_41A3_8E48640695C2_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1E2C3554_1217_A725_41A3_8E48640695C2_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E2C3554_1217_A725_41A3_8E48640695C2_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E2C3554_1217_A725_41A3_8E48640695C2_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_1E2C3554_1217_A725_41A3_8E48640695C2_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E2C3554_1217_A725_41A3_8E48640695C2_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E2C3554_1217_A725_41A3_8E48640695C2_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1E2C3554_1217_A725_41A3_8E48640695C2_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_1C904779_1212_63EC_41B1_E4B0F83824DC",
  "this.overlay_1CFAEBEF_1215_A2E3_4184_543FCBB4B1D7",
  "this.overlay_1DB396D8_1215_A52C_4199_745955ADFD84"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_1C7AA7ED_1212_62E4_4189_A60955E10E08_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -171.46,
   "distance": 1,
   "panorama": "this.panorama_1F76471E_12AA_BC99_417D_DD5A2084733C",
   "backwardYaw": 46.73
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 11.68,
   "distance": 1,
   "panorama": "this.panorama_1F53F5D9_12AA_FF98_41A3_6B669E91923B",
   "backwardYaw": -164.93
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -77.5,
   "distance": 1,
   "panorama": "this.panorama_5EF35374_136E_B4A8_4191_7E72995B3ECD",
   "backwardYaw": 102.12
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_1F7646C7_12AA_9DF7_41A3_6118C47853B8",
 "thumbnailUrl": "media/panorama_1F7646C7_12AA_9DF7_41A3_6118C47853B8_t.jpg",
 "label": "B4",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_1F7646C7_12AA_9DF7_41A3_6118C47853B8_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1F7646C7_12AA_9DF7_41A3_6118C47853B8_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1F7646C7_12AA_9DF7_41A3_6118C47853B8_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1F7646C7_12AA_9DF7_41A3_6118C47853B8_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1F7646C7_12AA_9DF7_41A3_6118C47853B8_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1F7646C7_12AA_9DF7_41A3_6118C47853B8_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1F7646C7_12AA_9DF7_41A3_6118C47853B8_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1F7646C7_12AA_9DF7_41A3_6118C47853B8_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1F7646C7_12AA_9DF7_41A3_6118C47853B8_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1F7646C7_12AA_9DF7_41A3_6118C47853B8_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1F7646C7_12AA_9DF7_41A3_6118C47853B8_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1F7646C7_12AA_9DF7_41A3_6118C47853B8_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1F7646C7_12AA_9DF7_41A3_6118C47853B8_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1F7646C7_12AA_9DF7_41A3_6118C47853B8_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1F7646C7_12AA_9DF7_41A3_6118C47853B8_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_1F7646C7_12AA_9DF7_41A3_6118C47853B8_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1F7646C7_12AA_9DF7_41A3_6118C47853B8_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1F7646C7_12AA_9DF7_41A3_6118C47853B8_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1F7646C7_12AA_9DF7_41A3_6118C47853B8_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_1CFE408D_12AF_B47B_41B0_89091D51B03A",
  "this.overlay_1CC33FE1_12AF_ABA8_41B1_D77C0579FD6F",
  "this.overlay_1C77300A_12AF_F479_41B0_5F6EB8A5A65F"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -158.86,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_32704C13_2493_EA23_418E_8C68A2EB1F00"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -134.99,
   "distance": 1,
   "panorama": "this.panorama_1C5160C8_122D_9D2D_41B1_024A8D5AFA43",
   "backwardYaw": 21.14
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_1C4E751F_122D_E723_41A5_6A1A4D3D0A25",
 "thumbnailUrl": "media/panorama_1C4E751F_122D_E723_41A5_6A1A4D3D0A25_t.jpg",
 "label": "AB2",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_1C4E751F_122D_E723_41A5_6A1A4D3D0A25_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C4E751F_122D_E723_41A5_6A1A4D3D0A25_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C4E751F_122D_E723_41A5_6A1A4D3D0A25_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1C4E751F_122D_E723_41A5_6A1A4D3D0A25_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C4E751F_122D_E723_41A5_6A1A4D3D0A25_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C4E751F_122D_E723_41A5_6A1A4D3D0A25_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1C4E751F_122D_E723_41A5_6A1A4D3D0A25_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C4E751F_122D_E723_41A5_6A1A4D3D0A25_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C4E751F_122D_E723_41A5_6A1A4D3D0A25_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1C4E751F_122D_E723_41A5_6A1A4D3D0A25_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C4E751F_122D_E723_41A5_6A1A4D3D0A25_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C4E751F_122D_E723_41A5_6A1A4D3D0A25_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1C4E751F_122D_E723_41A5_6A1A4D3D0A25_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C4E751F_122D_E723_41A5_6A1A4D3D0A25_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C4E751F_122D_E723_41A5_6A1A4D3D0A25_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_1C4E751F_122D_E723_41A5_6A1A4D3D0A25_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C4E751F_122D_E723_41A5_6A1A4D3D0A25_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C4E751F_122D_E723_41A5_6A1A4D3D0A25_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1C4E751F_122D_E723_41A5_6A1A4D3D0A25_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_1C83A7D0_1232_A33C_41AB_91E4712EE930"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -135.24,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_3097ED83_2493_EA22_418B_1BBA6D98E45A"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -15.32,
   "distance": 1,
   "panorama": "this.panorama_1F2B6CEB_12D6_6DB8_41B2_62922D3306B8",
   "backwardYaw": 141.31
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -97.73,
   "distance": 1,
   "panorama": "this.panorama_1D2C1F2A_12D5_ACB8_41B0_5142BEAE6714",
   "backwardYaw": 51.5
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1F769998_12AA_9798_41A9_9421299474C3"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_1F7170A8_12AD_95B9_41B0_69B3D2D511F0",
 "thumbnailUrl": "media/panorama_1F7170A8_12AD_95B9_41B0_69B3D2D511F0_t.jpg",
 "label": "B7",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_1F7170A8_12AD_95B9_41B0_69B3D2D511F0_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1F7170A8_12AD_95B9_41B0_69B3D2D511F0_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1F7170A8_12AD_95B9_41B0_69B3D2D511F0_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1F7170A8_12AD_95B9_41B0_69B3D2D511F0_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1F7170A8_12AD_95B9_41B0_69B3D2D511F0_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1F7170A8_12AD_95B9_41B0_69B3D2D511F0_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1F7170A8_12AD_95B9_41B0_69B3D2D511F0_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1F7170A8_12AD_95B9_41B0_69B3D2D511F0_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1F7170A8_12AD_95B9_41B0_69B3D2D511F0_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1F7170A8_12AD_95B9_41B0_69B3D2D511F0_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1F7170A8_12AD_95B9_41B0_69B3D2D511F0_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1F7170A8_12AD_95B9_41B0_69B3D2D511F0_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1F7170A8_12AD_95B9_41B0_69B3D2D511F0_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1F7170A8_12AD_95B9_41B0_69B3D2D511F0_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1F7170A8_12AD_95B9_41B0_69B3D2D511F0_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_1F7170A8_12AD_95B9_41B0_69B3D2D511F0_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1F7170A8_12AD_95B9_41B0_69B3D2D511F0_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1F7170A8_12AD_95B9_41B0_69B3D2D511F0_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1F7170A8_12AD_95B9_41B0_69B3D2D511F0_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_1C3FED55_12AA_6CE8_41AE_E741D35B25FC",
  "this.overlay_1F35866D_12D5_9CBB_41A6_4D0C53613475",
  "this.overlay_1C4AD35E_12D5_B498_41A7_891AB5E22572"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 56.65,
   "distance": 1,
   "panorama": "this.panorama_1D835FBE_1212_A364_41A6_D59FED93F3EB",
   "backwardYaw": 74.86
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -114.56,
   "distance": 1,
   "panorama": "this.panorama_1ED7C008_1217_BD2C_41B0_159A6CBF8842",
   "backwardYaw": 70.88
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_1C6C0918_1212_EF2D_41AA_8CB6E207B7CA",
 "thumbnailUrl": "media/panorama_1C6C0918_1212_EF2D_41AA_8CB6E207B7CA_t.jpg",
 "label": "AB asrama",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_1C6C0918_1212_EF2D_41AA_8CB6E207B7CA_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C6C0918_1212_EF2D_41AA_8CB6E207B7CA_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C6C0918_1212_EF2D_41AA_8CB6E207B7CA_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1C6C0918_1212_EF2D_41AA_8CB6E207B7CA_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C6C0918_1212_EF2D_41AA_8CB6E207B7CA_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C6C0918_1212_EF2D_41AA_8CB6E207B7CA_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1C6C0918_1212_EF2D_41AA_8CB6E207B7CA_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C6C0918_1212_EF2D_41AA_8CB6E207B7CA_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C6C0918_1212_EF2D_41AA_8CB6E207B7CA_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1C6C0918_1212_EF2D_41AA_8CB6E207B7CA_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C6C0918_1212_EF2D_41AA_8CB6E207B7CA_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C6C0918_1212_EF2D_41AA_8CB6E207B7CA_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1C6C0918_1212_EF2D_41AA_8CB6E207B7CA_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C6C0918_1212_EF2D_41AA_8CB6E207B7CA_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C6C0918_1212_EF2D_41AA_8CB6E207B7CA_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_1C6C0918_1212_EF2D_41AA_8CB6E207B7CA_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C6C0918_1212_EF2D_41AA_8CB6E207B7CA_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C6C0918_1212_EF2D_41AA_8CB6E207B7CA_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1C6C0918_1212_EF2D_41AA_8CB6E207B7CA_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_1CAC8D5D_122E_A727_4177_B3860FDBAABB",
  "this.overlay_1CD824EB_122E_66E3_41B1_10BA8B2E6D14"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 124.27,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_30252E42_2493_E622_41BB_53B9A69D2859"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 42.71,
   "distance": 1,
   "panorama": "this.panorama_1C4B5BF2_122D_A2FC_419B_609BAA032087",
   "backwardYaw": -157.14
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -63.02,
   "distance": 1,
   "panorama": "this.panorama_1C5160C8_122D_9D2D_41B1_024A8D5AFA43",
   "backwardYaw": 138.05
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -11.81,
   "distance": 1,
   "panorama": "this.panorama_1F1F5301_1216_A31C_41A0_CF4AED19D1F5",
   "backwardYaw": -150.48
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 107.02,
   "distance": 1,
   "panorama": "this.panorama_0154F527_0C22_07FC_4193_06409B7D0536",
   "backwardYaw": -107.4
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -115.06,
   "distance": 1,
   "panorama": "this.panorama_1E3059D8_1216_AF2D_4182_4B71A1D76684",
   "backwardYaw": 103.5
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC",
 "thumbnailUrl": "media/panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC_t.jpg",
 "label": "A3.1",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_1FC698B9_1212_AD6F_4187_3AD510ACD884",
  "this.overlay_1C101505_1212_E724_4178_FBFCF3CF198E",
  "this.overlay_1C8B63C0_1212_E31C_4170_41546F365260",
  "this.overlay_1D775DA8_1212_A76D_41AD_4917755B7ED5",
  "this.overlay_1D7C03B7_121D_E364_41B0_97CDAEEE1DFA"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 8.54,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_320C1075_2493_DAE6_419C_4F38313DF4BC"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_49AF9DC3_135A_EFE8_41B0_A74AB8E7B2D6_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 4.94,
   "distance": 1,
   "panorama": "this.panorama_1E3E8A7F_1217_EDE4_41A9_9F5BCA609E87",
   "backwardYaw": 148.76
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_1C7AA7ED_1212_62E4_4189_A60955E10E08",
 "thumbnailUrl": "media/panorama_1C7AA7ED_1212_62E4_4189_A60955E10E08_t.jpg",
 "label": "AB SEKRE",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_1C7AA7ED_1212_62E4_4189_A60955E10E08_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C7AA7ED_1212_62E4_4189_A60955E10E08_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C7AA7ED_1212_62E4_4189_A60955E10E08_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1C7AA7ED_1212_62E4_4189_A60955E10E08_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C7AA7ED_1212_62E4_4189_A60955E10E08_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C7AA7ED_1212_62E4_4189_A60955E10E08_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1C7AA7ED_1212_62E4_4189_A60955E10E08_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C7AA7ED_1212_62E4_4189_A60955E10E08_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C7AA7ED_1212_62E4_4189_A60955E10E08_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1C7AA7ED_1212_62E4_4189_A60955E10E08_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C7AA7ED_1212_62E4_4189_A60955E10E08_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C7AA7ED_1212_62E4_4189_A60955E10E08_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1C7AA7ED_1212_62E4_4189_A60955E10E08_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C7AA7ED_1212_62E4_4189_A60955E10E08_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C7AA7ED_1212_62E4_4189_A60955E10E08_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_1C7AA7ED_1212_62E4_4189_A60955E10E08_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C7AA7ED_1212_62E4_4189_A60955E10E08_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C7AA7ED_1212_62E4_4189_A60955E10E08_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1C7AA7ED_1212_62E4_4189_A60955E10E08_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_1CB4F5AA_122E_676C_41A2_8A0B8BF69063"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_1C74D9CF_122E_AF24_41AA_174DA8673956_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_1E3E2E98_1216_652C_418E_1DBFF6445B9F_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -53.72,
   "distance": 1,
   "panorama": "this.panorama_1F2B6CEB_12D6_6DB8_41B2_62922D3306B8",
   "backwardYaw": 116.86
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_1F2B9277_12D6_B497_418D_A66B17178836",
 "thumbnailUrl": "media/panorama_1F2B9277_12D6_B497_418D_A66B17178836_t.jpg",
 "label": "B10 TAMAN",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_1F2B9277_12D6_B497_418D_A66B17178836_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1F2B9277_12D6_B497_418D_A66B17178836_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1F2B9277_12D6_B497_418D_A66B17178836_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1F2B9277_12D6_B497_418D_A66B17178836_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1F2B9277_12D6_B497_418D_A66B17178836_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1F2B9277_12D6_B497_418D_A66B17178836_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1F2B9277_12D6_B497_418D_A66B17178836_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1F2B9277_12D6_B497_418D_A66B17178836_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1F2B9277_12D6_B497_418D_A66B17178836_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1F2B9277_12D6_B497_418D_A66B17178836_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1F2B9277_12D6_B497_418D_A66B17178836_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1F2B9277_12D6_B497_418D_A66B17178836_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1F2B9277_12D6_B497_418D_A66B17178836_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1F2B9277_12D6_B497_418D_A66B17178836_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1F2B9277_12D6_B497_418D_A66B17178836_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_1F2B9277_12D6_B497_418D_A66B17178836_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1F2B9277_12D6_B497_418D_A66B17178836_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1F2B9277_12D6_B497_418D_A66B17178836_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1F2B9277_12D6_B497_418D_A66B17178836_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_1C7ED5AC_12DB_FFB8_41A1_14BAF639DE23"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -168.32,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_32520BFB_2493_EDE2_41BB_5B3EBFEF45BF"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_1C6FEA43_1212_ED23_419C_BCE14B6B6A04_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 70.88,
   "distance": 1,
   "panorama": "this.panorama_1C6C0918_1212_EF2D_41AA_8CB6E207B7CA",
   "backwardYaw": -114.56
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -76.87,
   "distance": 1,
   "panorama": "this.panorama_1E3E8A7F_1217_EDE4_41A9_9F5BCA609E87",
   "backwardYaw": 91.19
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 146.84,
   "distance": 1,
   "panorama": "this.panorama_1E590196_1216_7F24_41A7_D1A1589C2A9E",
   "backwardYaw": -28.39
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -124.1,
   "distance": 1,
   "panorama": "this.panorama_1EF5F0E8_1217_9EEC_4186_EB28B5BB56EA",
   "backwardYaw": 25.88
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_1ED7C008_1217_BD2C_41B0_159A6CBF8842",
 "thumbnailUrl": "media/panorama_1ED7C008_1217_BD2C_41B0_159A6CBF8842_t.jpg",
 "label": "A13",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_1ED7C008_1217_BD2C_41B0_159A6CBF8842_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1ED7C008_1217_BD2C_41B0_159A6CBF8842_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1ED7C008_1217_BD2C_41B0_159A6CBF8842_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1ED7C008_1217_BD2C_41B0_159A6CBF8842_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1ED7C008_1217_BD2C_41B0_159A6CBF8842_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1ED7C008_1217_BD2C_41B0_159A6CBF8842_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1ED7C008_1217_BD2C_41B0_159A6CBF8842_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1ED7C008_1217_BD2C_41B0_159A6CBF8842_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1ED7C008_1217_BD2C_41B0_159A6CBF8842_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1ED7C008_1217_BD2C_41B0_159A6CBF8842_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1ED7C008_1217_BD2C_41B0_159A6CBF8842_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1ED7C008_1217_BD2C_41B0_159A6CBF8842_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1ED7C008_1217_BD2C_41B0_159A6CBF8842_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1ED7C008_1217_BD2C_41B0_159A6CBF8842_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1ED7C008_1217_BD2C_41B0_159A6CBF8842_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_1ED7C008_1217_BD2C_41B0_159A6CBF8842_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1ED7C008_1217_BD2C_41B0_159A6CBF8842_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1ED7C008_1217_BD2C_41B0_159A6CBF8842_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1ED7C008_1217_BD2C_41B0_159A6CBF8842_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_1D5AB790_1217_A33D_418E_1AAEC50485DA",
  "this.overlay_1C53DCAA_1217_E56C_41A2_B50AA6DE8753",
  "this.overlay_1D1CBE6C_1217_A5E4_4190_E48981A49832",
  "this.overlay_1CABF008_1216_9D2D_41A4_05E11BD0513B"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_49AE96EF_135B_9DB8_419C_15F53F06D743_camera"
},
{
 "class": "PlayList",
 "id": "mainPlayList",
 "items": [
  {
   "media": "this.panorama_02181B5D_0879_47EF_4194_05F745303325",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_02181B5D_0879_47EF_4194_05F745303325_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_0154F527_0C22_07FC_4193_06409B7D0536",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_0154F527_0C22_07FC_4193_06409B7D0536_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_1E3059D8_1216_AF2D_4182_4B71A1D76684",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_1E3059D8_1216_AF2D_4182_4B71A1D76684_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_1E351DCE_1216_A725_41AA_C2237F5681B0",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_1E351DCE_1216_A725_41AA_C2237F5681B0_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_1E35133E_1216_E365_418A_E512CC92AE96",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_1E35133E_1216_E365_418A_E512CC92AE96_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_1E261A0A_1216_AD2C_41A3_6B0EE11D4D7E",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_1E261A0A_1216_AD2C_41A3_6B0EE11D4D7E_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_1E3E7C89_1216_A52F_41B0_E95358B2767C",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_1E3E7C89_1216_A52F_41B0_E95358B2767C_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 7, 8)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_1E3E2E98_1216_652C_418E_1DBFF6445B9F",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_1E3E2E98_1216_652C_418E_1DBFF6445B9F_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 8, 9)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_1E31C113_1217_9F23_41AF_9721C1EE070D",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_1E31C113_1217_9F23_41AF_9721C1EE070D_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 9, 10)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_1E2C3554_1217_A725_41A3_8E48640695C2",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_1E2C3554_1217_A725_41A3_8E48640695C2_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 10, 11)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_1E36C7D9_1217_E32F_419A_CA22B2D4E0D8",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_1E36C7D9_1217_E32F_419A_CA22B2D4E0D8_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 11, 12)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_1E3E8A7F_1217_EDE4_41A9_9F5BCA609E87",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_1E3E8A7F_1217_EDE4_41A9_9F5BCA609E87_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 12, 13)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_1ED7C008_1217_BD2C_41B0_159A6CBF8842",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_1ED7C008_1217_BD2C_41B0_159A6CBF8842_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 13, 14)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_1EF5F0E8_1217_9EEC_4186_EB28B5BB56EA",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_1EF5F0E8_1217_9EEC_4186_EB28B5BB56EA_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 14, 15)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_1E590196_1216_7F24_41A7_D1A1589C2A9E",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_1E590196_1216_7F24_41A7_D1A1589C2A9E_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 15, 16)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_1EC76234_1216_9D64_41A9_AF64765A9F9F",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_1EC76234_1216_9D64_41A9_AF64765A9F9F_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 16, 17)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_1F1F5301_1216_A31C_41A0_CF4AED19D1F5",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_1F1F5301_1216_A31C_41A0_CF4AED19D1F5_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 17, 18)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_1D835FBE_1212_A364_41A6_D59FED93F3EB",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_1D835FBE_1212_A364_41A6_D59FED93F3EB_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 18, 19)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_1C6C0918_1212_EF2D_41AA_8CB6E207B7CA",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_1C6C0918_1212_EF2D_41AA_8CB6E207B7CA_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 19, 20)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_1C6FEA43_1212_ED23_419C_BCE14B6B6A04",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_1C6FEA43_1212_ED23_419C_BCE14B6B6A04_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 20, 21)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_1C6F6FB5_1212_A367_41B1_97BA031975B7",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_1C6F6FB5_1212_A367_41B1_97BA031975B7_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 21, 22)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_1C79B467_1212_65E4_41A9_397DB7948749",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_1C79B467_1212_65E4_41A9_397DB7948749_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 22, 23)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_1C7AA7ED_1212_62E4_4189_A60955E10E08",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_1C7AA7ED_1212_62E4_4189_A60955E10E08_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 23, 24)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_1C4B5BF2_122D_A2FC_419B_609BAA032087",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_1C4B5BF2_122D_A2FC_419B_609BAA032087_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 24, 25)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_1C5160C8_122D_9D2D_41B1_024A8D5AFA43",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_1C5160C8_122D_9D2D_41B1_024A8D5AFA43_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 25, 26)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_1C4E751F_122D_E723_41A5_6A1A4D3D0A25",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_1C4E751F_122D_E723_41A5_6A1A4D3D0A25_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 26, 27)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_1C4AA941_122D_AF1C_4194_652BF1171E50",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_1C4AA941_122D_AF1C_4194_652BF1171E50_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 27, 28)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_1C69EC6F_1232_65E3_41A9_5362BA7F1A83",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_1C69EC6F_1232_65E3_41A9_5362BA7F1A83_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 28, 29)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_1D51A53A_1232_676C_419B_FB05E8EE5A1C",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_1D51A53A_1232_676C_419B_FB05E8EE5A1C_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 29, 30)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_1CC7CD8C_1233_E724_41A4_7036FC9FAFBA",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_1CC7CD8C_1233_E724_41A4_7036FC9FAFBA_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 30, 31)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_1C6B4747_122D_A323_4183_68A8F7F1D0BB",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_1C6B4747_122D_A323_4183_68A8F7F1D0BB_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 31, 32)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_1C7411C6_122E_7F24_4183_991262FE3F99",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_1C7411C6_122E_7F24_4183_991262FE3F99_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 32, 33)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_1C74B41E_122E_A525_418F_5DB5C0137B9B",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_1C74B41E_122E_A525_418F_5DB5C0137B9B_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 33, 34)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_1C74D9CF_122E_AF24_41AA_174DA8673956",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_1C74D9CF_122E_AF24_41AA_174DA8673956_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 34, 35)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_1C749FB8_122E_E36C_4193_79DF9A264D45",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_1C749FB8_122E_E36C_4193_79DF9A264D45_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 35, 36)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_1C74934B_122E_A32C_41AF_0A51BBA11B42",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_1C74934B_122E_A32C_41AF_0A51BBA11B42_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 36, 37)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_1C7416BE_122E_A565_41A7_E6DAA86F5840",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_1C7416BE_122E_A565_41A7_E6DAA86F5840_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 37, 38)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_1C745916_122E_6F24_41B0_E0BDC7980538",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_1C745916_122E_6F24_41B0_E0BDC7980538_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 38, 39)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_1C740D40_122E_671C_41A5_F8F6717860CD",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_1C740D40_122E_671C_41A5_F8F6717860CD_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 39, 40)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_1C63E5B5_122F_A764_412F_D3ADED669290",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_1C63E5B5_122F_A764_412F_D3ADED669290_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 40, 41)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_1C5A781B_122F_AD2C_419A_D55C87F1D7C4",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_1C5A781B_122F_AD2C_419A_D55C87F1D7C4_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 41, 42)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_1C5E8E0D_122F_E524_41AB_25431A77DDE1",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_1C5E8E0D_122F_E524_41AB_25431A77DDE1_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 42, 43)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_027D9014_12BA_7468_41AE_B7601C694ED1",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_027D9014_12BA_7468_41AE_B7601C694ED1_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 43, 44)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_1F7039BE_12B5_9798_41B0_325FFC1AF137",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_1F7039BE_12B5_9798_41B0_325FFC1AF137_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 44, 45)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_1C461727_12B7_9CA8_41A0_02E993644282",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_1C461727_12B7_9CA8_41A0_02E993644282_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 45, 46)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_1D392500_12B5_BC69_41B1_8B4E63350F5E",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_1D392500_12B5_BC69_41B1_8B4E63350F5E_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 46, 47)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_1D4CDF0B_12AA_AC78_4190_C5BCACDF8F2B",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_1D4CDF0B_12AA_AC78_4190_C5BCACDF8F2B_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 47, 48)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_1F53F5D9_12AA_FF98_41A3_6B669E91923B",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_1F53F5D9_12AA_FF98_41A3_6B669E91923B_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 48, 49)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_1F7646C7_12AA_9DF7_41A3_6118C47853B8",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_1F7646C7_12AA_9DF7_41A3_6118C47853B8_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 49, 50)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_1F76471E_12AA_BC99_417D_DD5A2084733C",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_1F76471E_12AA_BC99_417D_DD5A2084733C_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 50, 51)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_1F769998_12AA_9798_41A9_9421299474C3",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_1F769998_12AA_9798_41A9_9421299474C3_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 51, 52)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_1F7170A8_12AD_95B9_41B0_69B3D2D511F0",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_1F7170A8_12AD_95B9_41B0_69B3D2D511F0_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 52, 53)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_1D2C1F2A_12D5_ACB8_41B0_5142BEAE6714",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_1D2C1F2A_12D5_ACB8_41B0_5142BEAE6714_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 53, 54)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_1F2B6CEB_12D6_6DB8_41B2_62922D3306B8",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_1F2B6CEB_12D6_6DB8_41B2_62922D3306B8_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 54, 55)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_1F2B9277_12D6_B497_418D_A66B17178836",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_1F2B9277_12D6_B497_418D_A66B17178836_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 55, 56)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_5829C03C_1376_7498_41AC_130D2B81793F",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_5829C03C_1376_7498_41AC_130D2B81793F_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 56, 57)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_59E47185_136B_F468_41AE_60E9A934E07E",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_59E47185_136B_F468_41AE_60E9A934E07E_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 57, 58)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_5EF35374_136E_B4A8_4191_7E72995B3ECD",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_5EF35374_136E_B4A8_4191_7E72995B3ECD_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 58, 59)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_49AF9DC3_135A_EFE8_41B0_A74AB8E7B2D6",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_49AF9DC3_135A_EFE8_41B0_A74AB8E7B2D6_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 59, 60)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_49AFE1F3_135A_97A8_4187_C6E968ACA6B8",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_49AFE1F3_135A_97A8_4187_C6E968ACA6B8_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 60, 61)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_49AFA632_135A_BCA9_41A2_1F29C0D05566",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_49AFA632_135A_BCA9_41A2_1F29C0D05566_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 61, 62)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_49AF6A22_135A_94A9_41AA_E036F21F6533",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_49AF6A22_135A_94A9_41AA_E036F21F6533_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 62, 63)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_49AF6E44_135A_6CE9_414A_9C058452CF94",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_49AF6E44_135A_6CE9_414A_9C058452CF94_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 63, 64)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_49AEC247_135B_B4E8_41A5_746131D61342",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_49AEC247_135B_B4E8_41A5_746131D61342_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 64, 65)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_49AE96EF_135B_9DB8_419C_15F53F06D743",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_49AE96EF_135B_9DB8_419C_15F53F06D743_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 65, 66)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_49AEEB3E_135B_F498_41A5_157725750FD2",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_49AEEB3E_135B_F498_41A5_157725750FD2_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 66, 67)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_7719D67F_13B6_9C98_41A2_D5E02E95A3B2",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_7719D67F_13B6_9C98_41A2_D5E02E95A3B2_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 67, 68)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_7178E80E_13B6_9478_4187_6F7683DD2190",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_7178E80E_13B6_9478_4187_6F7683DD2190_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 68, 69)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_71772D8C_13B6_6C78_41B2_9EB26FDA544E",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_71772D8C_13B6_6C78_41B2_9EB26FDA544E_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 69, 70)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_7176E1A8_13B7_B7B9_419E_B2A83EBA5F99",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_7176E1A8_13B7_B7B9_419E_B2A83EBA5F99_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 70, 71)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_632FB807_13AA_9468_4199_F2D987E571CA",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_632FB807_13AA_9468_4199_F2D987E571CA_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 71, 72)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_618DAC0E_13DE_AC79_41B1_10B967991445",
   "class": "PanoramaPlayListItem",
   "end": "this.trigger('tourEnded')",
   "camera": "this.panorama_618DAC0E_13DE_AC79_41B1_10B967991445_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 72, 0)",
   "player": "this.MainViewerPanoramaPlayer"
  }
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_7719D67F_13B6_9C98_41A2_D5E02E95A3B2_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_1C69EC6F_1232_65E3_41A9_5362BA7F1A83_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -174.85,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_37EDD18B_2493_DA22_41B4_9171D58789DB"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_1C5E8E0D_122F_E524_41AB_25431A77DDE1_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 56.4,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_37F9ACC5_2493_EA26_41B4_927514CC2118"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -20.47,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_37D99C97_2493_EA22_41B5_7C30B812E492"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_1C74934B_122E_A32C_41AF_0A51BBA11B42_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -53.89,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_306C5E7D_2493_E6E6_41B3_87654AE03D30"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 63.81,
   "distance": 1,
   "panorama": "this.panorama_49AFE1F3_135A_97A8_4187_C6E968ACA6B8",
   "backwardYaw": -147.59
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -90.31,
   "distance": 1,
   "panorama": "this.panorama_49AF6A22_135A_94A9_41AA_E036F21F6533",
   "backwardYaw": 115.44
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_49AFA632_135A_BCA9_41A2_1F29C0D05566",
 "thumbnailUrl": "media/panorama_49AFA632_135A_BCA9_41A2_1F29C0D05566_t.jpg",
 "label": "C4",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_49AFA632_135A_BCA9_41A2_1F29C0D05566_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_49AFA632_135A_BCA9_41A2_1F29C0D05566_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_49AFA632_135A_BCA9_41A2_1F29C0D05566_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_49AFA632_135A_BCA9_41A2_1F29C0D05566_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_49AFA632_135A_BCA9_41A2_1F29C0D05566_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_49AFA632_135A_BCA9_41A2_1F29C0D05566_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_49AFA632_135A_BCA9_41A2_1F29C0D05566_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_49AFA632_135A_BCA9_41A2_1F29C0D05566_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_49AFA632_135A_BCA9_41A2_1F29C0D05566_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_49AFA632_135A_BCA9_41A2_1F29C0D05566_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_49AFA632_135A_BCA9_41A2_1F29C0D05566_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_49AFA632_135A_BCA9_41A2_1F29C0D05566_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_49AFA632_135A_BCA9_41A2_1F29C0D05566_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_49AFA632_135A_BCA9_41A2_1F29C0D05566_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_49AFA632_135A_BCA9_41A2_1F29C0D05566_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_49AFA632_135A_BCA9_41A2_1F29C0D05566_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_49AFA632_135A_BCA9_41A2_1F29C0D05566_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_49AFA632_135A_BCA9_41A2_1F29C0D05566_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_49AFA632_135A_BCA9_41A2_1F29C0D05566_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_7253670E_13AA_9C78_417F_14115AC43921",
  "this.overlay_729EDB84_13AA_F468_41A1_53A8EAA06C7A"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -48.86,
   "distance": 1,
   "panorama": "this.panorama_7178E80E_13B6_9478_4187_6F7683DD2190",
   "backwardYaw": 113.3
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -164.17,
   "distance": 1,
   "panorama": "this.panorama_49AF6E44_135A_6CE9_414A_9C058452CF94",
   "backwardYaw": 5.15
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 95.84,
   "distance": 1,
   "panorama": "this.panorama_49AF6A22_135A_94A9_41AA_E036F21F6533",
   "backwardYaw": -101.62
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -0.88,
   "distance": 1,
   "panorama": "this.panorama_71772D8C_13B6_6C78_41B2_9EB26FDA544E",
   "backwardYaw": -170.45
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_7176E1A8_13B7_B7B9_419E_B2A83EBA5F99",
 "thumbnailUrl": "media/panorama_7176E1A8_13B7_B7B9_419E_B2A83EBA5F99_t.jpg",
 "label": "C5PERTIGAAN KOLAM",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_7176E1A8_13B7_B7B9_419E_B2A83EBA5F99_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7176E1A8_13B7_B7B9_419E_B2A83EBA5F99_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7176E1A8_13B7_B7B9_419E_B2A83EBA5F99_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_7176E1A8_13B7_B7B9_419E_B2A83EBA5F99_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7176E1A8_13B7_B7B9_419E_B2A83EBA5F99_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7176E1A8_13B7_B7B9_419E_B2A83EBA5F99_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_7176E1A8_13B7_B7B9_419E_B2A83EBA5F99_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7176E1A8_13B7_B7B9_419E_B2A83EBA5F99_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7176E1A8_13B7_B7B9_419E_B2A83EBA5F99_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_7176E1A8_13B7_B7B9_419E_B2A83EBA5F99_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7176E1A8_13B7_B7B9_419E_B2A83EBA5F99_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7176E1A8_13B7_B7B9_419E_B2A83EBA5F99_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_7176E1A8_13B7_B7B9_419E_B2A83EBA5F99_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7176E1A8_13B7_B7B9_419E_B2A83EBA5F99_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7176E1A8_13B7_B7B9_419E_B2A83EBA5F99_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_7176E1A8_13B7_B7B9_419E_B2A83EBA5F99_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7176E1A8_13B7_B7B9_419E_B2A83EBA5F99_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7176E1A8_13B7_B7B9_419E_B2A83EBA5F99_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_7176E1A8_13B7_B7B9_419E_B2A83EBA5F99_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_71AB0DA6_13B6_6FA8_419D_8E6CF03C5B23",
  "this.overlay_71C42C77_13B6_6C97_41B2_9730DE4C9557",
  "this.overlay_7023A8E1_13B6_95A8_41B0_D54576255D4E",
  "this.overlay_60206EAA_13EA_6DB8_416E_9E1FF412C636"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -38.69,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_372BAD23_2493_EA62_41B7_2B96ACECE6AA"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 113.3,
   "distance": 1,
   "panorama": "this.panorama_7176E1A8_13B7_B7B9_419E_B2A83EBA5F99",
   "backwardYaw": -48.86
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 17.12,
   "distance": 1,
   "panorama": "this.panorama_7719D67F_13B6_9C98_41A2_D5E02E95A3B2",
   "backwardYaw": 166.85
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_7178E80E_13B6_9478_4187_6F7683DD2190",
 "thumbnailUrl": "media/panorama_7178E80E_13B6_9478_4187_6F7683DD2190_t.jpg",
 "label": "C KOLAM 3",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_7178E80E_13B6_9478_4187_6F7683DD2190_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7178E80E_13B6_9478_4187_6F7683DD2190_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7178E80E_13B6_9478_4187_6F7683DD2190_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_7178E80E_13B6_9478_4187_6F7683DD2190_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7178E80E_13B6_9478_4187_6F7683DD2190_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7178E80E_13B6_9478_4187_6F7683DD2190_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_7178E80E_13B6_9478_4187_6F7683DD2190_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7178E80E_13B6_9478_4187_6F7683DD2190_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7178E80E_13B6_9478_4187_6F7683DD2190_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_7178E80E_13B6_9478_4187_6F7683DD2190_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7178E80E_13B6_9478_4187_6F7683DD2190_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7178E80E_13B6_9478_4187_6F7683DD2190_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_7178E80E_13B6_9478_4187_6F7683DD2190_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7178E80E_13B6_9478_4187_6F7683DD2190_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7178E80E_13B6_9478_4187_6F7683DD2190_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_7178E80E_13B6_9478_4187_6F7683DD2190_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7178E80E_13B6_9478_4187_6F7683DD2190_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7178E80E_13B6_9478_4187_6F7683DD2190_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_7178E80E_13B6_9478_4187_6F7683DD2190_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_74D65B57_13BE_9497_419C_9D0189F1C352",
  "this.overlay_799FF1DA_13B6_B798_41A4_50BC7DBAEA54"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 74.86,
   "distance": 1,
   "panorama": "this.panorama_1C6C0918_1212_EF2D_41AA_8CB6E207B7CA",
   "backwardYaw": 56.65
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_1D835FBE_1212_A364_41A6_D59FED93F3EB",
 "thumbnailUrl": "media/panorama_1D835FBE_1212_A364_41A6_D59FED93F3EB_t.jpg",
 "label": "AB asrama 2",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_1D835FBE_1212_A364_41A6_D59FED93F3EB_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1D835FBE_1212_A364_41A6_D59FED93F3EB_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1D835FBE_1212_A364_41A6_D59FED93F3EB_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1D835FBE_1212_A364_41A6_D59FED93F3EB_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1D835FBE_1212_A364_41A6_D59FED93F3EB_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1D835FBE_1212_A364_41A6_D59FED93F3EB_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1D835FBE_1212_A364_41A6_D59FED93F3EB_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1D835FBE_1212_A364_41A6_D59FED93F3EB_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1D835FBE_1212_A364_41A6_D59FED93F3EB_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1D835FBE_1212_A364_41A6_D59FED93F3EB_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1D835FBE_1212_A364_41A6_D59FED93F3EB_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1D835FBE_1212_A364_41A6_D59FED93F3EB_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_1D835FBE_1212_A364_41A6_D59FED93F3EB_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1D835FBE_1212_A364_41A6_D59FED93F3EB_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1D835FBE_1212_A364_41A6_D59FED93F3EB_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1D835FBE_1212_A364_41A6_D59FED93F3EB_t.jpg",
   "right": {
    "levels": [
     {
      "url": "media/panorama_1D835FBE_1212_A364_41A6_D59FED93F3EB_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1D835FBE_1212_A364_41A6_D59FED93F3EB_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1D835FBE_1212_A364_41A6_D59FED93F3EB_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_1C9312D5_122E_9D24_41A3_8D20E52FEFA5"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_49AEC247_135B_B4E8_41A5_746131D61342_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 88.3,
   "distance": 1,
   "panorama": "this.panorama_5829C03C_1376_7498_41AC_130D2B81793F",
   "backwardYaw": -126.49
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -104.88,
   "distance": 1,
   "panorama": "this.panorama_49AFE1F3_135A_97A8_4187_C6E968ACA6B8",
   "backwardYaw": 96.09
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_49AF9DC3_135A_EFE8_41B0_A74AB8E7B2D6",
 "thumbnailUrl": "media/panorama_49AF9DC3_135A_EFE8_41B0_A74AB8E7B2D6_t.jpg",
 "label": "C2",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_49AF9DC3_135A_EFE8_41B0_A74AB8E7B2D6_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_49AF9DC3_135A_EFE8_41B0_A74AB8E7B2D6_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_49AF9DC3_135A_EFE8_41B0_A74AB8E7B2D6_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_49AF9DC3_135A_EFE8_41B0_A74AB8E7B2D6_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_49AF9DC3_135A_EFE8_41B0_A74AB8E7B2D6_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_49AF9DC3_135A_EFE8_41B0_A74AB8E7B2D6_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_49AF9DC3_135A_EFE8_41B0_A74AB8E7B2D6_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_49AF9DC3_135A_EFE8_41B0_A74AB8E7B2D6_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_49AF9DC3_135A_EFE8_41B0_A74AB8E7B2D6_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_49AF9DC3_135A_EFE8_41B0_A74AB8E7B2D6_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_49AF9DC3_135A_EFE8_41B0_A74AB8E7B2D6_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_49AF9DC3_135A_EFE8_41B0_A74AB8E7B2D6_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_49AF9DC3_135A_EFE8_41B0_A74AB8E7B2D6_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_49AF9DC3_135A_EFE8_41B0_A74AB8E7B2D6_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_49AF9DC3_135A_EFE8_41B0_A74AB8E7B2D6_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_49AF9DC3_135A_EFE8_41B0_A74AB8E7B2D6_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_49AF9DC3_135A_EFE8_41B0_A74AB8E7B2D6_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_49AF9DC3_135A_EFE8_41B0_A74AB8E7B2D6_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_49AF9DC3_135A_EFE8_41B0_A74AB8E7B2D6_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_72FB603B_1357_B498_41A8_7682D801DB0F",
  "this.overlay_710A5280_1357_9468_41A5_8B0C26B954B0"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_1D2C1F2A_12D5_ACB8_41B0_5142BEAE6714_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 114.22,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_32225BF0_2493_EDFE_41AC_A048780260F0"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_1C7411C6_122E_7F24_4183_991262FE3F99_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 166.47,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_31830EAC_2493_E666_41C2_2A4B498AA8C0"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 116.98,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_30B7CDA6_2493_EA63_4179_7756BC00A12B"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 71.97,
  "pitch": -1.23
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_1E3E8A7F_1217_EDE4_41A9_9F5BCA609E87_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_1F7170A8_12AD_95B9_41B0_69B3D2D511F0_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_1C7416BE_122E_A565_41A7_E6DAA86F5840_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -126.87,
   "distance": 1,
   "panorama": "this.panorama_1E3E2E98_1216_652C_418E_1DBFF6445B9F",
   "backwardYaw": 44.09
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 43.71,
   "distance": 1,
   "panorama": "this.panorama_1E2C3554_1217_A725_41A3_8E48640695C2",
   "backwardYaw": -109.03
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_1E31C113_1217_9F23_41AF_9721C1EE070D",
 "thumbnailUrl": "media/panorama_1E31C113_1217_9F23_41AF_9721C1EE070D_t.jpg",
 "label": "A9",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_1E31C113_1217_9F23_41AF_9721C1EE070D_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E31C113_1217_9F23_41AF_9721C1EE070D_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E31C113_1217_9F23_41AF_9721C1EE070D_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1E31C113_1217_9F23_41AF_9721C1EE070D_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E31C113_1217_9F23_41AF_9721C1EE070D_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E31C113_1217_9F23_41AF_9721C1EE070D_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1E31C113_1217_9F23_41AF_9721C1EE070D_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E31C113_1217_9F23_41AF_9721C1EE070D_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E31C113_1217_9F23_41AF_9721C1EE070D_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1E31C113_1217_9F23_41AF_9721C1EE070D_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E31C113_1217_9F23_41AF_9721C1EE070D_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E31C113_1217_9F23_41AF_9721C1EE070D_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1E31C113_1217_9F23_41AF_9721C1EE070D_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E31C113_1217_9F23_41AF_9721C1EE070D_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E31C113_1217_9F23_41AF_9721C1EE070D_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_1E31C113_1217_9F23_41AF_9721C1EE070D_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E31C113_1217_9F23_41AF_9721C1EE070D_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E31C113_1217_9F23_41AF_9721C1EE070D_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1E31C113_1217_9F23_41AF_9721C1EE070D_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_1C9577A2_1212_A31C_41AF_9BB2E924C67E",
  "this.overlay_1D8FB606_1212_A524_41B0_C121C8F56D54"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 89.69,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_317FBFDB_2493_E622_41AB_AF9E8E2336D0"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -162.75,
   "distance": 1,
   "panorama": "this.panorama_1C74B41E_122E_A525_418F_5DB5C0137B9B",
   "backwardYaw": -13.53
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_1C749FB8_122E_E36C_4193_79DF9A264D45",
 "thumbnailUrl": "media/panorama_1C749FB8_122E_E36C_4193_79DF9A264D45_t.jpg",
 "label": "AKB 1",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_1C749FB8_122E_E36C_4193_79DF9A264D45_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C749FB8_122E_E36C_4193_79DF9A264D45_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C749FB8_122E_E36C_4193_79DF9A264D45_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1C749FB8_122E_E36C_4193_79DF9A264D45_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C749FB8_122E_E36C_4193_79DF9A264D45_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C749FB8_122E_E36C_4193_79DF9A264D45_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1C749FB8_122E_E36C_4193_79DF9A264D45_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C749FB8_122E_E36C_4193_79DF9A264D45_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C749FB8_122E_E36C_4193_79DF9A264D45_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1C749FB8_122E_E36C_4193_79DF9A264D45_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C749FB8_122E_E36C_4193_79DF9A264D45_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C749FB8_122E_E36C_4193_79DF9A264D45_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1C749FB8_122E_E36C_4193_79DF9A264D45_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C749FB8_122E_E36C_4193_79DF9A264D45_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C749FB8_122E_E36C_4193_79DF9A264D45_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_1C749FB8_122E_E36C_4193_79DF9A264D45_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C749FB8_122E_E36C_4193_79DF9A264D45_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C749FB8_122E_E36C_4193_79DF9A264D45_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1C749FB8_122E_E36C_4193_79DF9A264D45_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_1C7BC23C_12AA_B498_41AF_F729EB318E24"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 167.19,
   "distance": 1,
   "panorama": "this.panorama_1C745916_122E_6F24_41B0_E0BDC7980538",
   "backwardYaw": -50.37
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -4.44,
   "distance": 1,
   "panorama": "this.panorama_1C74B41E_122E_A525_418F_5DB5C0137B9B",
   "backwardYaw": -124.23
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -102.12,
   "distance": 1,
   "panorama": "this.panorama_1C5A781B_122F_AD2C_419A_D55C87F1D7C4",
   "backwardYaw": 93.96
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_1C74D9CF_122E_AF24_41AA_174DA8673956",
 "thumbnailUrl": "media/panorama_1C74D9CF_122E_AF24_41AA_174DA8673956_t.jpg",
 "label": "AK3",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_1C74D9CF_122E_AF24_41AA_174DA8673956_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C74D9CF_122E_AF24_41AA_174DA8673956_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C74D9CF_122E_AF24_41AA_174DA8673956_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1C74D9CF_122E_AF24_41AA_174DA8673956_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C74D9CF_122E_AF24_41AA_174DA8673956_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C74D9CF_122E_AF24_41AA_174DA8673956_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1C74D9CF_122E_AF24_41AA_174DA8673956_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C74D9CF_122E_AF24_41AA_174DA8673956_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C74D9CF_122E_AF24_41AA_174DA8673956_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1C74D9CF_122E_AF24_41AA_174DA8673956_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C74D9CF_122E_AF24_41AA_174DA8673956_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C74D9CF_122E_AF24_41AA_174DA8673956_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1C74D9CF_122E_AF24_41AA_174DA8673956_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C74D9CF_122E_AF24_41AA_174DA8673956_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C74D9CF_122E_AF24_41AA_174DA8673956_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_1C74D9CF_122E_AF24_41AA_174DA8673956_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C74D9CF_122E_AF24_41AA_174DA8673956_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C74D9CF_122E_AF24_41AA_174DA8673956_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1C74D9CF_122E_AF24_41AA_174DA8673956_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_1CACDF8D_12AA_6C78_41A4_08CA5974F831",
  "this.overlay_1C086FEC_12AA_ABB8_41A0_393080691617",
  "this.overlay_1D88450E_12AA_9C78_41A1_6D2BAFAB6718"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_49AFA632_135A_BCA9_41A2_1F29C0D05566_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -131.51,
   "distance": 1,
   "panorama": "this.panorama_1D4CDF0B_12AA_AC78_4190_C5BCACDF8F2B",
   "backwardYaw": 30.15
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 53.51,
   "distance": 1,
   "panorama": "this.panorama_027D9014_12BA_7468_41AE_B7601C694ED1",
   "backwardYaw": -117.82
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 138.21,
   "distance": 1,
   "panorama": "this.panorama_1D392500_12B5_BC69_41B1_8B4E63350F5E",
   "backwardYaw": -55.73
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -46.35,
   "distance": 1,
   "panorama": "this.panorama_5829C03C_1376_7498_41AC_130D2B81793F",
   "backwardYaw": 80.01
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_1F7039BE_12B5_9798_41B0_325FFC1AF137",
 "thumbnailUrl": "media/panorama_1F7039BE_12B5_9798_41B0_325FFC1AF137_t.jpg",
 "label": "B1 PERTIGAAN ASPUT",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_1F7039BE_12B5_9798_41B0_325FFC1AF137_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1F7039BE_12B5_9798_41B0_325FFC1AF137_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1F7039BE_12B5_9798_41B0_325FFC1AF137_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1F7039BE_12B5_9798_41B0_325FFC1AF137_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1F7039BE_12B5_9798_41B0_325FFC1AF137_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1F7039BE_12B5_9798_41B0_325FFC1AF137_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1F7039BE_12B5_9798_41B0_325FFC1AF137_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1F7039BE_12B5_9798_41B0_325FFC1AF137_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1F7039BE_12B5_9798_41B0_325FFC1AF137_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1F7039BE_12B5_9798_41B0_325FFC1AF137_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1F7039BE_12B5_9798_41B0_325FFC1AF137_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1F7039BE_12B5_9798_41B0_325FFC1AF137_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1F7039BE_12B5_9798_41B0_325FFC1AF137_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1F7039BE_12B5_9798_41B0_325FFC1AF137_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1F7039BE_12B5_9798_41B0_325FFC1AF137_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_1F7039BE_12B5_9798_41B0_325FFC1AF137_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1F7039BE_12B5_9798_41B0_325FFC1AF137_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1F7039BE_12B5_9798_41B0_325FFC1AF137_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1F7039BE_12B5_9798_41B0_325FFC1AF137_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_1C0438D1_12B6_F5E8_41B1_5A31F3EACBB4",
  "this.overlay_1F62F511_12B6_9C68_41B0_F2A561B49BE3",
  "this.overlay_1DD0CF36_12AA_ACA8_41AF_2D4849CDE734",
  "this.overlay_55E3A4B5_1375_9DAB_41AA_D941D0ADF02C"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -161.54,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_312FDF8B_2493_E622_41AB_AC4FCE826732"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 126.11,
   "distance": 1,
   "panorama": "this.panorama_027D9014_12BA_7468_41AE_B7601C694ED1",
   "backwardYaw": -33.25
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_1C461727_12B7_9CA8_41A0_02E993644282",
 "thumbnailUrl": "media/panorama_1C461727_12B7_9CA8_41A0_02E993644282_t.jpg",
 "label": "AB FUTSAL",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_1C461727_12B7_9CA8_41A0_02E993644282_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C461727_12B7_9CA8_41A0_02E993644282_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C461727_12B7_9CA8_41A0_02E993644282_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1C461727_12B7_9CA8_41A0_02E993644282_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C461727_12B7_9CA8_41A0_02E993644282_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C461727_12B7_9CA8_41A0_02E993644282_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1C461727_12B7_9CA8_41A0_02E993644282_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C461727_12B7_9CA8_41A0_02E993644282_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C461727_12B7_9CA8_41A0_02E993644282_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1C461727_12B7_9CA8_41A0_02E993644282_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C461727_12B7_9CA8_41A0_02E993644282_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C461727_12B7_9CA8_41A0_02E993644282_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1C461727_12B7_9CA8_41A0_02E993644282_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C461727_12B7_9CA8_41A0_02E993644282_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C461727_12B7_9CA8_41A0_02E993644282_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_1C461727_12B7_9CA8_41A0_02E993644282_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C461727_12B7_9CA8_41A0_02E993644282_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C461727_12B7_9CA8_41A0_02E993644282_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1C461727_12B7_9CA8_41A0_02E993644282_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_1C9C8B75_12B6_94A8_4196_7E8296AD2638"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 144.83,
   "distance": 1,
   "panorama": "this.panorama_1E35133E_1216_E365_418A_E512CC92AE96",
   "backwardYaw": -26.63
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -24.12,
   "distance": 1,
   "panorama": "this.panorama_1E3E2E98_1216_652C_418E_1DBFF6445B9F",
   "backwardYaw": 154.63
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -111.04,
   "distance": 1,
   "panorama": "this.panorama_1C7411C6_122E_7F24_4183_991262FE3F99",
   "backwardYaw": 55.14
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_1E3E7C89_1216_A52F_41B0_E95358B2767C",
 "thumbnailUrl": "media/panorama_1E3E7C89_1216_A52F_41B0_E95358B2767C_t.jpg",
 "label": "A7",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_1E3E7C89_1216_A52F_41B0_E95358B2767C_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E3E7C89_1216_A52F_41B0_E95358B2767C_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E3E7C89_1216_A52F_41B0_E95358B2767C_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1E3E7C89_1216_A52F_41B0_E95358B2767C_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E3E7C89_1216_A52F_41B0_E95358B2767C_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E3E7C89_1216_A52F_41B0_E95358B2767C_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1E3E7C89_1216_A52F_41B0_E95358B2767C_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E3E7C89_1216_A52F_41B0_E95358B2767C_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E3E7C89_1216_A52F_41B0_E95358B2767C_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1E3E7C89_1216_A52F_41B0_E95358B2767C_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E3E7C89_1216_A52F_41B0_E95358B2767C_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E3E7C89_1216_A52F_41B0_E95358B2767C_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1E3E7C89_1216_A52F_41B0_E95358B2767C_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E3E7C89_1216_A52F_41B0_E95358B2767C_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E3E7C89_1216_A52F_41B0_E95358B2767C_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_1E3E7C89_1216_A52F_41B0_E95358B2767C_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E3E7C89_1216_A52F_41B0_E95358B2767C_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E3E7C89_1216_A52F_41B0_E95358B2767C_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1E3E7C89_1216_A52F_41B0_E95358B2767C_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_1C946A25_1212_AD64_4188_6D587C73AD36",
  "this.overlay_1CC21177_1212_9FE4_4183_54AC54E3A313",
  "this.overlay_1D2CAD93_1212_E73C_41A0_B46C20AF051A"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -165.24,
  "pitch": -5.38
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_1EC76234_1216_9D64_41A9_AF64765A9F9F_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -162.88,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_376B5D6B_2493_EAE2_41B5_BD9218BA250B"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_7176E1A8_13B7_B7B9_419E_B2A83EBA5F99_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_1E2C3554_1217_A725_41A3_8E48640695C2_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -13.53,
   "distance": 1,
   "panorama": "this.panorama_1C749FB8_122E_E36C_4193_79DF9A264D45",
   "backwardYaw": -162.75
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -124.23,
   "distance": 1,
   "panorama": "this.panorama_1C74D9CF_122E_AF24_41AA_174DA8673956",
   "backwardYaw": -4.44
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 55.14,
   "distance": 1,
   "panorama": "this.panorama_1C7411C6_122E_7F24_4183_991262FE3F99",
   "backwardYaw": -126.49
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_1C74B41E_122E_A525_418F_5DB5C0137B9B",
 "thumbnailUrl": "media/panorama_1C74B41E_122E_A525_418F_5DB5C0137B9B_t.jpg",
 "label": "AK2",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_1C74B41E_122E_A525_418F_5DB5C0137B9B_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C74B41E_122E_A525_418F_5DB5C0137B9B_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C74B41E_122E_A525_418F_5DB5C0137B9B_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1C74B41E_122E_A525_418F_5DB5C0137B9B_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C74B41E_122E_A525_418F_5DB5C0137B9B_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C74B41E_122E_A525_418F_5DB5C0137B9B_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1C74B41E_122E_A525_418F_5DB5C0137B9B_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C74B41E_122E_A525_418F_5DB5C0137B9B_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C74B41E_122E_A525_418F_5DB5C0137B9B_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1C74B41E_122E_A525_418F_5DB5C0137B9B_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C74B41E_122E_A525_418F_5DB5C0137B9B_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C74B41E_122E_A525_418F_5DB5C0137B9B_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1C74B41E_122E_A525_418F_5DB5C0137B9B_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C74B41E_122E_A525_418F_5DB5C0137B9B_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C74B41E_122E_A525_418F_5DB5C0137B9B_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_1C74B41E_122E_A525_418F_5DB5C0137B9B_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C74B41E_122E_A525_418F_5DB5C0137B9B_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C74B41E_122E_A525_418F_5DB5C0137B9B_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1C74B41E_122E_A525_418F_5DB5C0137B9B_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_1D577A19_1216_6D2C_418F_8E733FBA060C",
  "this.overlay_1DEDAB27_1217_A364_41B0_0B8E13CAB3FE",
  "this.overlay_1D0BEBC2_12AD_ABE8_41B1_ED3A34FDD43B"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -86.04,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_373F1D0C_2493_EA26_41AB_6B5D5E094941"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -5.24,
   "distance": 1,
   "panorama": "this.panorama_1E3E2E98_1216_652C_418E_1DBFF6445B9F",
   "backwardYaw": -16.54
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_618DAC0E_13DE_AC79_41B1_10B967991445",
 "thumbnailUrl": "media/panorama_618DAC0E_13DE_AC79_41B1_10B967991445_t.jpg",
 "label": "A STUDIO",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_618DAC0E_13DE_AC79_41B1_10B967991445_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_618DAC0E_13DE_AC79_41B1_10B967991445_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_618DAC0E_13DE_AC79_41B1_10B967991445_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_618DAC0E_13DE_AC79_41B1_10B967991445_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_618DAC0E_13DE_AC79_41B1_10B967991445_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_618DAC0E_13DE_AC79_41B1_10B967991445_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_618DAC0E_13DE_AC79_41B1_10B967991445_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_618DAC0E_13DE_AC79_41B1_10B967991445_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_618DAC0E_13DE_AC79_41B1_10B967991445_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_618DAC0E_13DE_AC79_41B1_10B967991445_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_618DAC0E_13DE_AC79_41B1_10B967991445_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_618DAC0E_13DE_AC79_41B1_10B967991445_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_618DAC0E_13DE_AC79_41B1_10B967991445_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_618DAC0E_13DE_AC79_41B1_10B967991445_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_618DAC0E_13DE_AC79_41B1_10B967991445_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_618DAC0E_13DE_AC79_41B1_10B967991445_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_618DAC0E_13DE_AC79_41B1_10B967991445_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_618DAC0E_13DE_AC79_41B1_10B967991445_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_618DAC0E_13DE_AC79_41B1_10B967991445_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_62C33E56_13DE_ACE9_4197_4222F9D5BF58"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -7.25,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_3016BE12_2493_E622_41A4_C5E0CDBB3C52"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_1D835FBE_1212_A364_41A6_D59FED93F3EB_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -55.73,
   "distance": 1,
   "panorama": "this.panorama_1F7039BE_12B5_9798_41B0_325FFC1AF137",
   "backwardYaw": 138.21
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_1D392500_12B5_BC69_41B1_8B4E63350F5E",
 "thumbnailUrl": "media/panorama_1D392500_12B5_BC69_41B1_8B4E63350F5E_t.jpg",
 "label": "BB BULTANG",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_1D392500_12B5_BC69_41B1_8B4E63350F5E_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1D392500_12B5_BC69_41B1_8B4E63350F5E_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1D392500_12B5_BC69_41B1_8B4E63350F5E_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1D392500_12B5_BC69_41B1_8B4E63350F5E_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1D392500_12B5_BC69_41B1_8B4E63350F5E_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1D392500_12B5_BC69_41B1_8B4E63350F5E_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1D392500_12B5_BC69_41B1_8B4E63350F5E_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1D392500_12B5_BC69_41B1_8B4E63350F5E_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1D392500_12B5_BC69_41B1_8B4E63350F5E_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1D392500_12B5_BC69_41B1_8B4E63350F5E_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1D392500_12B5_BC69_41B1_8B4E63350F5E_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1D392500_12B5_BC69_41B1_8B4E63350F5E_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1D392500_12B5_BC69_41B1_8B4E63350F5E_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1D392500_12B5_BC69_41B1_8B4E63350F5E_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1D392500_12B5_BC69_41B1_8B4E63350F5E_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_1D392500_12B5_BC69_41B1_8B4E63350F5E_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1D392500_12B5_BC69_41B1_8B4E63350F5E_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1D392500_12B5_BC69_41B1_8B4E63350F5E_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1D392500_12B5_BC69_41B1_8B4E63350F5E_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_1D9F8BD7_12AA_6BE8_41A2_7CE5244C8754"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -160.28,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_320C9BCD_2493_EE26_41B0_B0B18A89AB1A"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 68.96,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_3266BC1E_2493_EA22_41A1_A7E26B716FDF"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1C74D9CF_122E_AF24_41AA_174DA8673956"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -20.56,
   "distance": 1,
   "panorama": "this.panorama_1C7416BE_122E_A565_41A7_E6DAA86F5840",
   "backwardYaw": 86.96
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_1C74934B_122E_A32C_41AF_0A51BBA11B42",
 "thumbnailUrl": "media/panorama_1C74934B_122E_A32C_41AF_0A51BBA11B42_t.jpg",
 "label": "AKB 2",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_1C74934B_122E_A32C_41AF_0A51BBA11B42_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C74934B_122E_A32C_41AF_0A51BBA11B42_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C74934B_122E_A32C_41AF_0A51BBA11B42_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1C74934B_122E_A32C_41AF_0A51BBA11B42_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C74934B_122E_A32C_41AF_0A51BBA11B42_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C74934B_122E_A32C_41AF_0A51BBA11B42_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1C74934B_122E_A32C_41AF_0A51BBA11B42_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C74934B_122E_A32C_41AF_0A51BBA11B42_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C74934B_122E_A32C_41AF_0A51BBA11B42_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1C74934B_122E_A32C_41AF_0A51BBA11B42_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C74934B_122E_A32C_41AF_0A51BBA11B42_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C74934B_122E_A32C_41AF_0A51BBA11B42_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1C74934B_122E_A32C_41AF_0A51BBA11B42_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C74934B_122E_A32C_41AF_0A51BBA11B42_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C74934B_122E_A32C_41AF_0A51BBA11B42_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_1C74934B_122E_A32C_41AF_0A51BBA11B42_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C74934B_122E_A32C_41AF_0A51BBA11B42_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C74934B_122E_A32C_41AF_0A51BBA11B42_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1C74934B_122E_A32C_41AF_0A51BBA11B42_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_1CA887C2_12AA_9BE8_4160_E2185E3BE306",
  "this.overlay_1C848582_12AB_BC69_41A9_08EBDF913410"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1ED7C008_1217_BD2C_41B0_159A6CBF8842"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_1C6FEA43_1212_ED23_419C_BCE14B6B6A04",
 "thumbnailUrl": "media/panorama_1C6FEA43_1212_ED23_419C_BCE14B6B6A04_t.jpg",
 "label": "AB KANTIN",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_1C6FEA43_1212_ED23_419C_BCE14B6B6A04_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C6FEA43_1212_ED23_419C_BCE14B6B6A04_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C6FEA43_1212_ED23_419C_BCE14B6B6A04_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1C6FEA43_1212_ED23_419C_BCE14B6B6A04_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C6FEA43_1212_ED23_419C_BCE14B6B6A04_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C6FEA43_1212_ED23_419C_BCE14B6B6A04_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1C6FEA43_1212_ED23_419C_BCE14B6B6A04_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C6FEA43_1212_ED23_419C_BCE14B6B6A04_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C6FEA43_1212_ED23_419C_BCE14B6B6A04_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1C6FEA43_1212_ED23_419C_BCE14B6B6A04_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C6FEA43_1212_ED23_419C_BCE14B6B6A04_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C6FEA43_1212_ED23_419C_BCE14B6B6A04_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1C6FEA43_1212_ED23_419C_BCE14B6B6A04_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C6FEA43_1212_ED23_419C_BCE14B6B6A04_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C6FEA43_1212_ED23_419C_BCE14B6B6A04_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_1C6FEA43_1212_ED23_419C_BCE14B6B6A04_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C6FEA43_1212_ED23_419C_BCE14B6B6A04_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C6FEA43_1212_ED23_419C_BCE14B6B6A04_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1C6FEA43_1212_ED23_419C_BCE14B6B6A04_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_031A365A_122E_652D_417E_B90DA7D15DD2"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -147.59,
   "distance": 1,
   "panorama": "this.panorama_49AFA632_135A_BCA9_41A2_1F29C0D05566",
   "backwardYaw": 63.81
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 15.2,
   "distance": 1,
   "panorama": "this.panorama_49AEEB3E_135B_F498_41A5_157725750FD2",
   "backwardYaw": -163.04
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 96.09,
   "distance": 1,
   "panorama": "this.panorama_49AF9DC3_135A_EFE8_41B0_A74AB8E7B2D6",
   "backwardYaw": -104.88
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -65.78,
   "distance": 1,
   "panorama": "this.panorama_49AE96EF_135B_9DB8_419C_15F53F06D743",
   "backwardYaw": 97.14
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_49AFE1F3_135A_97A8_4187_C6E968ACA6B8",
 "thumbnailUrl": "media/panorama_49AFE1F3_135A_97A8_4187_C6E968ACA6B8_t.jpg",
 "label": "C3",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_49AFE1F3_135A_97A8_4187_C6E968ACA6B8_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_49AFE1F3_135A_97A8_4187_C6E968ACA6B8_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_49AFE1F3_135A_97A8_4187_C6E968ACA6B8_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_49AFE1F3_135A_97A8_4187_C6E968ACA6B8_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_49AFE1F3_135A_97A8_4187_C6E968ACA6B8_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_49AFE1F3_135A_97A8_4187_C6E968ACA6B8_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_49AFE1F3_135A_97A8_4187_C6E968ACA6B8_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_49AFE1F3_135A_97A8_4187_C6E968ACA6B8_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_49AFE1F3_135A_97A8_4187_C6E968ACA6B8_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_49AFE1F3_135A_97A8_4187_C6E968ACA6B8_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_49AFE1F3_135A_97A8_4187_C6E968ACA6B8_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_49AFE1F3_135A_97A8_4187_C6E968ACA6B8_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_49AFE1F3_135A_97A8_4187_C6E968ACA6B8_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_49AFE1F3_135A_97A8_4187_C6E968ACA6B8_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_49AFE1F3_135A_97A8_4187_C6E968ACA6B8_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_49AFE1F3_135A_97A8_4187_C6E968ACA6B8_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_49AFE1F3_135A_97A8_4187_C6E968ACA6B8_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_49AFE1F3_135A_97A8_4187_C6E968ACA6B8_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_49AFE1F3_135A_97A8_4187_C6E968ACA6B8_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_4EB441CC_1355_97F8_41A1_CE3B7B0403E0",
  "this.overlay_4EC542AD_1355_B5B8_4195_49DDEE30B0C5",
  "this.overlay_4E9C0D1D_13AA_AC9B_41AB_C947C61E59ED",
  "this.overlay_4C8AA6F6_13AA_7DA9_41AE_58863417B51A"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 172.75,
   "distance": 1,
   "panorama": "this.panorama_1C63E5B5_122F_A764_412F_D3ADED669290",
   "backwardYaw": -26.72
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_1C6B4747_122D_A323_4183_68A8F7F1D0BB",
 "thumbnailUrl": "media/panorama_1C6B4747_122D_A323_4183_68A8F7F1D0BB_t.jpg",
 "label": "AK LAB COM 3",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_1C6B4747_122D_A323_4183_68A8F7F1D0BB_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C6B4747_122D_A323_4183_68A8F7F1D0BB_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C6B4747_122D_A323_4183_68A8F7F1D0BB_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1C6B4747_122D_A323_4183_68A8F7F1D0BB_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C6B4747_122D_A323_4183_68A8F7F1D0BB_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C6B4747_122D_A323_4183_68A8F7F1D0BB_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1C6B4747_122D_A323_4183_68A8F7F1D0BB_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C6B4747_122D_A323_4183_68A8F7F1D0BB_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C6B4747_122D_A323_4183_68A8F7F1D0BB_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1C6B4747_122D_A323_4183_68A8F7F1D0BB_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C6B4747_122D_A323_4183_68A8F7F1D0BB_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C6B4747_122D_A323_4183_68A8F7F1D0BB_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1C6B4747_122D_A323_4183_68A8F7F1D0BB_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C6B4747_122D_A323_4183_68A8F7F1D0BB_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C6B4747_122D_A323_4183_68A8F7F1D0BB_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_1C6B4747_122D_A323_4183_68A8F7F1D0BB_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C6B4747_122D_A323_4183_68A8F7F1D0BB_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C6B4747_122D_A323_4183_68A8F7F1D0BB_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1C6B4747_122D_A323_4183_68A8F7F1D0BB_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_02AED202_1213_9D1D_41AA_D62677C584E0"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -77.88,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_3710F1C5_2493_DA26_41BE_7A6A48DD02BB"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_1C63E5B5_122F_A764_412F_D3ADED669290_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1E3E8A7F_1217_EDE4_41A9_9F5BCA609E87"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -117.57,
   "distance": 1,
   "panorama": "this.panorama_1E2C3554_1217_A725_41A3_8E48640695C2",
   "backwardYaw": 46.22
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_1E36C7D9_1217_E32F_419A_CA22B2D4E0D8",
 "thumbnailUrl": "media/panorama_1E36C7D9_1217_E32F_419A_CA22B2D4E0D8_t.jpg",
 "label": "A11",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_1E36C7D9_1217_E32F_419A_CA22B2D4E0D8_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E36C7D9_1217_E32F_419A_CA22B2D4E0D8_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E36C7D9_1217_E32F_419A_CA22B2D4E0D8_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1E36C7D9_1217_E32F_419A_CA22B2D4E0D8_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E36C7D9_1217_E32F_419A_CA22B2D4E0D8_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E36C7D9_1217_E32F_419A_CA22B2D4E0D8_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1E36C7D9_1217_E32F_419A_CA22B2D4E0D8_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E36C7D9_1217_E32F_419A_CA22B2D4E0D8_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E36C7D9_1217_E32F_419A_CA22B2D4E0D8_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1E36C7D9_1217_E32F_419A_CA22B2D4E0D8_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E36C7D9_1217_E32F_419A_CA22B2D4E0D8_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E36C7D9_1217_E32F_419A_CA22B2D4E0D8_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1E36C7D9_1217_E32F_419A_CA22B2D4E0D8_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E36C7D9_1217_E32F_419A_CA22B2D4E0D8_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E36C7D9_1217_E32F_419A_CA22B2D4E0D8_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_1E36C7D9_1217_E32F_419A_CA22B2D4E0D8_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E36C7D9_1217_E32F_419A_CA22B2D4E0D8_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E36C7D9_1217_E32F_419A_CA22B2D4E0D8_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1E36C7D9_1217_E32F_419A_CA22B2D4E0D8_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_1CEF95D3_1216_673C_4184_523CC02AC223",
  "this.overlay_1D7AC640_1216_A51C_41A0_D41E981546DE"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -82.86,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_30E2BE06_2493_E622_4161_728E76A5A316"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 134.33,
  "pitch": 14.31
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_1ED7C008_1217_BD2C_41B0_159A6CBF8842_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_1C5A781B_122F_AD2C_419A_D55C87F1D7C4_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_618DAC0E_13DE_AC79_41B1_10B967991445_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -76.5,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_30C792C9_2493_DE2E_41A8_CC6AF260D524"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 40.61,
   "distance": 1,
   "panorama": "this.panorama_1D51A53A_1232_676C_419B_FB05E8EE5A1C",
   "backwardYaw": -13.53
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_1CC7CD8C_1233_E724_41A4_7036FC9FAFBA",
 "thumbnailUrl": "media/panorama_1CC7CD8C_1233_E724_41A4_7036FC9FAFBA_t.jpg",
 "label": "AKB GURU3",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_1CC7CD8C_1233_E724_41A4_7036FC9FAFBA_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1CC7CD8C_1233_E724_41A4_7036FC9FAFBA_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1CC7CD8C_1233_E724_41A4_7036FC9FAFBA_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1CC7CD8C_1233_E724_41A4_7036FC9FAFBA_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1CC7CD8C_1233_E724_41A4_7036FC9FAFBA_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1CC7CD8C_1233_E724_41A4_7036FC9FAFBA_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1CC7CD8C_1233_E724_41A4_7036FC9FAFBA_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1CC7CD8C_1233_E724_41A4_7036FC9FAFBA_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1CC7CD8C_1233_E724_41A4_7036FC9FAFBA_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1CC7CD8C_1233_E724_41A4_7036FC9FAFBA_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1CC7CD8C_1233_E724_41A4_7036FC9FAFBA_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1CC7CD8C_1233_E724_41A4_7036FC9FAFBA_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1CC7CD8C_1233_E724_41A4_7036FC9FAFBA_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1CC7CD8C_1233_E724_41A4_7036FC9FAFBA_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1CC7CD8C_1233_E724_41A4_7036FC9FAFBA_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_1CC7CD8C_1233_E724_41A4_7036FC9FAFBA_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1CC7CD8C_1233_E724_41A4_7036FC9FAFBA_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1CC7CD8C_1233_E724_41A4_7036FC9FAFBA_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1CC7CD8C_1233_E724_41A4_7036FC9FAFBA_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_1D38D165_1213_FFE4_41A6_FDB32088127B"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -138.38,
   "distance": 1,
   "panorama": "this.panorama_1C5160C8_122D_9D2D_41B1_024A8D5AFA43",
   "backwardYaw": -14.53
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_1C4AA941_122D_AF1C_4194_652BF1171E50",
 "thumbnailUrl": "media/panorama_1C4AA941_122D_AF1C_4194_652BF1171E50_t.jpg",
 "label": "AB3",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_1C4AA941_122D_AF1C_4194_652BF1171E50_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C4AA941_122D_AF1C_4194_652BF1171E50_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C4AA941_122D_AF1C_4194_652BF1171E50_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1C4AA941_122D_AF1C_4194_652BF1171E50_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C4AA941_122D_AF1C_4194_652BF1171E50_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C4AA941_122D_AF1C_4194_652BF1171E50_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1C4AA941_122D_AF1C_4194_652BF1171E50_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C4AA941_122D_AF1C_4194_652BF1171E50_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C4AA941_122D_AF1C_4194_652BF1171E50_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1C4AA941_122D_AF1C_4194_652BF1171E50_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C4AA941_122D_AF1C_4194_652BF1171E50_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C4AA941_122D_AF1C_4194_652BF1171E50_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1C4AA941_122D_AF1C_4194_652BF1171E50_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C4AA941_122D_AF1C_4194_652BF1171E50_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C4AA941_122D_AF1C_4194_652BF1171E50_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_1C4AA941_122D_AF1C_4194_652BF1171E50_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C4AA941_122D_AF1C_4194_652BF1171E50_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C4AA941_122D_AF1C_4194_652BF1171E50_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1C4AA941_122D_AF1C_4194_652BF1171E50_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_1CB25454_1232_E524_41AA_10012A75BCE9"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -116.19,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_30C24DE2_2493_E5E2_41C0_8DE778EE153D"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_1C4E751F_122D_E723_41A5_6A1A4D3D0A25_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -137.29,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_3293E00A_2493_DA22_41A5_C2C61CBF7BB7"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -100.12,
  "pitch": -2.37
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_1C6F6FB5_1212_A367_41B1_97BA031975B7_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 64.94,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_37CE6CAE_2493_EA62_41A3_BF663610AA8C"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 55.14,
   "distance": 1,
   "panorama": "this.panorama_1E3E7C89_1216_A52F_41B0_E95358B2767C",
   "backwardYaw": -111.04
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -126.49,
   "distance": 1,
   "panorama": "this.panorama_1C74B41E_122E_A525_418F_5DB5C0137B9B",
   "backwardYaw": 55.14
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -34.79,
   "distance": 1,
   "panorama": "this.panorama_1C63E5B5_122F_A764_412F_D3ADED669290",
   "backwardYaw": 126.11
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_1C7411C6_122E_7F24_4183_991262FE3F99",
 "thumbnailUrl": "media/panorama_1C7411C6_122E_7F24_4183_991262FE3F99_t.jpg",
 "label": "AK1",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_1C7411C6_122E_7F24_4183_991262FE3F99_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C7411C6_122E_7F24_4183_991262FE3F99_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C7411C6_122E_7F24_4183_991262FE3F99_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1C7411C6_122E_7F24_4183_991262FE3F99_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C7411C6_122E_7F24_4183_991262FE3F99_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C7411C6_122E_7F24_4183_991262FE3F99_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1C7411C6_122E_7F24_4183_991262FE3F99_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C7411C6_122E_7F24_4183_991262FE3F99_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C7411C6_122E_7F24_4183_991262FE3F99_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1C7411C6_122E_7F24_4183_991262FE3F99_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C7411C6_122E_7F24_4183_991262FE3F99_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C7411C6_122E_7F24_4183_991262FE3F99_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_1C7411C6_122E_7F24_4183_991262FE3F99_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C7411C6_122E_7F24_4183_991262FE3F99_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C7411C6_122E_7F24_4183_991262FE3F99_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1C7411C6_122E_7F24_4183_991262FE3F99_t.jpg",
   "right": {
    "levels": [
     {
      "url": "media/panorama_1C7411C6_122E_7F24_4183_991262FE3F99_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C7411C6_122E_7F24_4183_991262FE3F99_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C7411C6_122E_7F24_4183_991262FE3F99_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_1D506121_1212_9F1C_41B1_A6C070D16CF8",
  "this.overlay_1D8DD225_1215_FD64_41A5_0E7D6E8CA3C7",
  "this.overlay_024F2EF7_1213_A2E4_41A2_93C12CE9552D"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_1C461727_12B7_9CA8_41A0_02E993644282_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -139.39,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_30D40DCA_2493_EA22_4195_50D527872602"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_1D51A53A_1232_676C_419B_FB05E8EE5A1C_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -61.3,
   "distance": 1,
   "panorama": "this.panorama_1C5A781B_122F_AD2C_419A_D55C87F1D7C4",
   "backwardYaw": -113.93
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_1C5E8E0D_122F_E524_41AB_25431A77DDE1",
 "thumbnailUrl": "media/panorama_1C5E8E0D_122F_E524_41AB_25431A77DDE1_t.jpg",
 "label": "AKB LT2",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_1C5E8E0D_122F_E524_41AB_25431A77DDE1_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C5E8E0D_122F_E524_41AB_25431A77DDE1_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C5E8E0D_122F_E524_41AB_25431A77DDE1_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1C5E8E0D_122F_E524_41AB_25431A77DDE1_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C5E8E0D_122F_E524_41AB_25431A77DDE1_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C5E8E0D_122F_E524_41AB_25431A77DDE1_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1C5E8E0D_122F_E524_41AB_25431A77DDE1_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C5E8E0D_122F_E524_41AB_25431A77DDE1_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C5E8E0D_122F_E524_41AB_25431A77DDE1_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1C5E8E0D_122F_E524_41AB_25431A77DDE1_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C5E8E0D_122F_E524_41AB_25431A77DDE1_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C5E8E0D_122F_E524_41AB_25431A77DDE1_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1C5E8E0D_122F_E524_41AB_25431A77DDE1_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C5E8E0D_122F_E524_41AB_25431A77DDE1_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C5E8E0D_122F_E524_41AB_25431A77DDE1_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_1C5E8E0D_122F_E524_41AB_25431A77DDE1_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C5E8E0D_122F_E524_41AB_25431A77DDE1_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C5E8E0D_122F_E524_41AB_25431A77DDE1_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1C5E8E0D_122F_E524_41AB_25431A77DDE1_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_1F7A14C8_12BD_BDF8_41A3_3BC9F5EA40CF"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -159.4,
   "distance": 1,
   "panorama": "this.panorama_1F53F5D9_12AA_FF98_41A3_6B669E91923B",
   "backwardYaw": 18.46
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 30.15,
   "distance": 1,
   "panorama": "this.panorama_1F7039BE_12B5_9798_41B0_325FFC1AF137",
   "backwardYaw": -131.51
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -66.66,
   "distance": 1,
   "panorama": "this.panorama_59E47185_136B_F468_41AE_60E9A934E07E",
   "backwardYaw": 116.61
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_1D4CDF0B_12AA_AC78_4190_C5BCACDF8F2B",
 "thumbnailUrl": "media/panorama_1D4CDF0B_12AA_AC78_4190_C5BCACDF8F2B_t.jpg",
 "label": "B2 PERPUS PUT",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_1D4CDF0B_12AA_AC78_4190_C5BCACDF8F2B_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1D4CDF0B_12AA_AC78_4190_C5BCACDF8F2B_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1D4CDF0B_12AA_AC78_4190_C5BCACDF8F2B_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1D4CDF0B_12AA_AC78_4190_C5BCACDF8F2B_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1D4CDF0B_12AA_AC78_4190_C5BCACDF8F2B_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1D4CDF0B_12AA_AC78_4190_C5BCACDF8F2B_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1D4CDF0B_12AA_AC78_4190_C5BCACDF8F2B_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1D4CDF0B_12AA_AC78_4190_C5BCACDF8F2B_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1D4CDF0B_12AA_AC78_4190_C5BCACDF8F2B_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1D4CDF0B_12AA_AC78_4190_C5BCACDF8F2B_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1D4CDF0B_12AA_AC78_4190_C5BCACDF8F2B_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1D4CDF0B_12AA_AC78_4190_C5BCACDF8F2B_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1D4CDF0B_12AA_AC78_4190_C5BCACDF8F2B_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1D4CDF0B_12AA_AC78_4190_C5BCACDF8F2B_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1D4CDF0B_12AA_AC78_4190_C5BCACDF8F2B_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_1D4CDF0B_12AA_AC78_4190_C5BCACDF8F2B_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1D4CDF0B_12AA_AC78_4190_C5BCACDF8F2B_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1D4CDF0B_12AA_AC78_4190_C5BCACDF8F2B_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1D4CDF0B_12AA_AC78_4190_C5BCACDF8F2B_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_1C894F57_12AE_ACE8_4183_A6922B4123E1",
  "this.overlay_1CC36158_12AE_F498_41AE_8E9E1E6418EC",
  "this.overlay_1C520593_12AE_9C68_4173_816FAB320426"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -109.66,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_371F6CE9_2493_EBEE_4174_87347CE1B9F6"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_1F76471E_12AA_BC99_417D_DD5A2084733C_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -103.63,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_37D68CA2_2493_EA62_41C0_491A61C54EA8"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 12.44,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_3081E282_2493_DE22_41A8_D71657B058F7"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_1C79B467_1212_65E4_41A9_397DB7948749_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 48.49,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_31205F9D_2493_E626_41A9_A691760E2773"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 32.41,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_32FCDB9E_2493_EE22_41C0_867E8503910B"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 55.77,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_37059D00_2493_EA1E_41BB_29770A616EA0"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 11.09,
   "distance": 1,
   "panorama": "this.panorama_5EF35374_136E_B4A8_4191_7E72995B3ECD",
   "backwardYaw": -154.96
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_632FB807_13AA_9468_4199_F2D987E571CA",
 "thumbnailUrl": "media/panorama_632FB807_13AA_9468_4199_F2D987E571CA_t.jpg",
 "label": "C8 MASJID",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_632FB807_13AA_9468_4199_F2D987E571CA_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_632FB807_13AA_9468_4199_F2D987E571CA_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_632FB807_13AA_9468_4199_F2D987E571CA_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_632FB807_13AA_9468_4199_F2D987E571CA_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_632FB807_13AA_9468_4199_F2D987E571CA_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_632FB807_13AA_9468_4199_F2D987E571CA_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_632FB807_13AA_9468_4199_F2D987E571CA_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_632FB807_13AA_9468_4199_F2D987E571CA_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_632FB807_13AA_9468_4199_F2D987E571CA_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_632FB807_13AA_9468_4199_F2D987E571CA_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_632FB807_13AA_9468_4199_F2D987E571CA_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_632FB807_13AA_9468_4199_F2D987E571CA_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_632FB807_13AA_9468_4199_F2D987E571CA_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_632FB807_13AA_9468_4199_F2D987E571CA_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_632FB807_13AA_9468_4199_F2D987E571CA_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_632FB807_13AA_9468_4199_F2D987E571CA_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_632FB807_13AA_9468_4199_F2D987E571CA_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_632FB807_13AA_9468_4199_F2D987E571CA_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_632FB807_13AA_9468_4199_F2D987E571CA_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_7D138A24_13AE_94A8_41AA_5EEECFBB35E0"
 ]
},
{
 "touchControlMode": "drag_rotation",
 "class": "PanoramaPlayer",
 "buttonMoveRight": "this.IconButton_52344940_5F01_EFC4_4184_BD88B8F3E7CC",
 "displayPlaybackBar": true,
 "buttonZoomOut": "this.IconButton_52344940_5F01_EFC4_41D7_BE81DEFE8744",
 "id": "MainViewerPanoramaPlayer",
 "buttonRestart": "this.IconButton_52344940_5F01_EFC4_41BB_2A5E51966695",
 "gyroscopeVerticalDraggingEnabled": true,
 "buttonPlayRight": "this.IconButton_52344940_5F01_EFC4_41C7_7571D1A24A33",
 "viewerArea": "this.MainViewer",
 "buttonPlayLeft": "this.IconButton_52344940_5F01_EFC4_41D4_A1CCD7021F0A",
 "buttonZoomIn": "this.IconButton_52344940_5F01_EFC4_41BB_7EDA152A8375",
 "buttonMoveUp": "this.IconButton_52344940_5F01_EFC4_41B6_26FA0557CEC9",
 "buttonMoveDown": "this.IconButton_52344940_5F01_EFC4_41B5_303051AFBE15",
 "buttonPause": "this.IconButton_52344940_5F01_EFC4_41CC_4A5BFB01C469",
 "buttonMoveLeft": "this.IconButton_52344940_5F01_EFC4_41D0_C6DE67446A2C",
 "mouseControlMode": "drag_acceleration"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -136.95,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_323DB081_2493_DA1E_4139_BFBF83FA37DE"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 126.28,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_31FE2EFF_2493_E7E2_41B1_7A09BBF70308"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -150.86,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_376E2252_2493_DE22_41C0_EB55971DEFDC"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1C6FEA43_1212_ED23_419C_BCE14B6B6A04"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -167.56,
   "distance": 1,
   "panorama": "this.panorama_1EC76234_1216_9D64_41A9_AF64765A9F9F",
   "backwardYaw": 19.72
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -28.39,
   "distance": 1,
   "panorama": "this.panorama_1ED7C008_1217_BD2C_41B0_159A6CBF8842",
   "backwardYaw": 146.84
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_1E590196_1216_7F24_41A7_D1A1589C2A9E",
 "thumbnailUrl": "media/panorama_1E590196_1216_7F24_41A7_D1A1589C2A9E_t.jpg",
 "label": "A15",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_1E590196_1216_7F24_41A7_D1A1589C2A9E_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E590196_1216_7F24_41A7_D1A1589C2A9E_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E590196_1216_7F24_41A7_D1A1589C2A9E_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1E590196_1216_7F24_41A7_D1A1589C2A9E_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E590196_1216_7F24_41A7_D1A1589C2A9E_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E590196_1216_7F24_41A7_D1A1589C2A9E_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1E590196_1216_7F24_41A7_D1A1589C2A9E_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E590196_1216_7F24_41A7_D1A1589C2A9E_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E590196_1216_7F24_41A7_D1A1589C2A9E_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1E590196_1216_7F24_41A7_D1A1589C2A9E_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E590196_1216_7F24_41A7_D1A1589C2A9E_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E590196_1216_7F24_41A7_D1A1589C2A9E_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1E590196_1216_7F24_41A7_D1A1589C2A9E_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E590196_1216_7F24_41A7_D1A1589C2A9E_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E590196_1216_7F24_41A7_D1A1589C2A9E_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_1E590196_1216_7F24_41A7_D1A1589C2A9E_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E590196_1216_7F24_41A7_D1A1589C2A9E_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E590196_1216_7F24_41A7_D1A1589C2A9E_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1E590196_1216_7F24_41A7_D1A1589C2A9E_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_1C92FEB6_1216_A564_41AD_D4A92A12217E",
  "this.overlay_1CF39957_1216_6F24_41A3_3E0232015378",
  "this.overlay_1D05663F_1215_E563_4176_AB6D6CFF379E"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_1C74B41E_122E_A525_418F_5DB5C0137B9B_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 159.44,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_318EAEA0_2493_E61E_416A_D2271B0A2A80"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 154.63,
   "distance": 1,
   "panorama": "this.panorama_1E3E7C89_1216_A52F_41B0_E95358B2767C",
   "backwardYaw": -24.12
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -16.54,
   "distance": 1,
   "panorama": "this.panorama_618DAC0E_13DE_AC79_41B1_10B967991445",
   "backwardYaw": -5.24
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 44.09,
   "distance": 1,
   "panorama": "this.panorama_1E31C113_1217_9F23_41AF_9721C1EE070D",
   "backwardYaw": -126.87
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_1E3E2E98_1216_652C_418E_1DBFF6445B9F",
 "thumbnailUrl": "media/panorama_1E3E2E98_1216_652C_418E_1DBFF6445B9F_t.jpg",
 "label": "A8",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_1E3E2E98_1216_652C_418E_1DBFF6445B9F_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E3E2E98_1216_652C_418E_1DBFF6445B9F_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E3E2E98_1216_652C_418E_1DBFF6445B9F_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1E3E2E98_1216_652C_418E_1DBFF6445B9F_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E3E2E98_1216_652C_418E_1DBFF6445B9F_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E3E2E98_1216_652C_418E_1DBFF6445B9F_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1E3E2E98_1216_652C_418E_1DBFF6445B9F_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E3E2E98_1216_652C_418E_1DBFF6445B9F_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E3E2E98_1216_652C_418E_1DBFF6445B9F_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1E3E2E98_1216_652C_418E_1DBFF6445B9F_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E3E2E98_1216_652C_418E_1DBFF6445B9F_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E3E2E98_1216_652C_418E_1DBFF6445B9F_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1E3E2E98_1216_652C_418E_1DBFF6445B9F_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E3E2E98_1216_652C_418E_1DBFF6445B9F_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E3E2E98_1216_652C_418E_1DBFF6445B9F_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_1E3E2E98_1216_652C_418E_1DBFF6445B9F_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E3E2E98_1216_652C_418E_1DBFF6445B9F_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E3E2E98_1216_652C_418E_1DBFF6445B9F_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1E3E2E98_1216_652C_418E_1DBFF6445B9F_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_1C9398FF_1213_EEE4_41AE_C90DA4AFD09C",
  "this.overlay_1D174B14_1213_A325_4178_72C6E65BFE96",
  "this.overlay_32C448CC_12AA_95F8_41A7_5DF11984F990"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 165.47,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_32A7502E_2493_DA62_419F_D85A7474CAE8"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 66.2,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_319AAE94_2493_E626_4155_1E2E8166CAA0"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 28.47,
  "pitch": -8.07
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_1C4B5BF2_122D_A2FC_419B_609BAA032087_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -175.06,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_377CAD53_2493_EA22_419E_2F136E6716BD"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 164.68,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_31F06F15_2493_E626_41B4_D185E5E47C6D"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -26.72,
   "distance": 1,
   "panorama": "this.panorama_1C6B4747_122D_A323_4183_68A8F7F1D0BB",
   "backwardYaw": 172.75
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 126.11,
   "distance": 1,
   "panorama": "this.panorama_1C7411C6_122E_7F24_4183_991262FE3F99",
   "backwardYaw": -34.79
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_1C63E5B5_122F_A764_412F_D3ADED669290",
 "thumbnailUrl": "media/panorama_1C63E5B5_122F_A764_412F_D3ADED669290_t.jpg",
 "label": "AKB LAB KOM",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_1C63E5B5_122F_A764_412F_D3ADED669290_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C63E5B5_122F_A764_412F_D3ADED669290_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C63E5B5_122F_A764_412F_D3ADED669290_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1C63E5B5_122F_A764_412F_D3ADED669290_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C63E5B5_122F_A764_412F_D3ADED669290_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C63E5B5_122F_A764_412F_D3ADED669290_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1C63E5B5_122F_A764_412F_D3ADED669290_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C63E5B5_122F_A764_412F_D3ADED669290_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C63E5B5_122F_A764_412F_D3ADED669290_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1C63E5B5_122F_A764_412F_D3ADED669290_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C63E5B5_122F_A764_412F_D3ADED669290_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C63E5B5_122F_A764_412F_D3ADED669290_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1C63E5B5_122F_A764_412F_D3ADED669290_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C63E5B5_122F_A764_412F_D3ADED669290_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C63E5B5_122F_A764_412F_D3ADED669290_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_1C63E5B5_122F_A764_412F_D3ADED669290_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C63E5B5_122F_A764_412F_D3ADED669290_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C63E5B5_122F_A764_412F_D3ADED669290_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1C63E5B5_122F_A764_412F_D3ADED669290_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_03ECDFE1_1216_A31C_4170_1FB725E4CD28",
  "this.overlay_1CD024C6_12B7_BDE8_41AC_5672AB4222BC"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 33.91,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_31CBEEE7_2493_E7E2_41B9_72922FD183BB"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -100.11,
   "distance": 1,
   "panorama": "this.panorama_1E3059D8_1216_AF2D_4182_4B71A1D76684",
   "backwardYaw": 44.76
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -14.53,
   "distance": 1,
   "panorama": "this.panorama_1C4AA941_122D_AF1C_4194_652BF1171E50",
   "backwardYaw": -138.38
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 21.14,
   "distance": 1,
   "panorama": "this.panorama_1C4E751F_122D_E723_41A5_6A1A4D3D0A25",
   "backwardYaw": -134.99
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 138.05,
   "distance": 1,
   "panorama": "this.panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC",
   "backwardYaw": -63.02
  }
 ],
 "hfovMin": "183%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_1C5160C8_122D_9D2D_41B1_024A8D5AFA43",
 "thumbnailUrl": "media/panorama_1C5160C8_122D_9D2D_41B1_024A8D5AFA43_t.jpg",
 "label": "AB1",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_1C5160C8_122D_9D2D_41B1_024A8D5AFA43_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C5160C8_122D_9D2D_41B1_024A8D5AFA43_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C5160C8_122D_9D2D_41B1_024A8D5AFA43_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1C5160C8_122D_9D2D_41B1_024A8D5AFA43_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C5160C8_122D_9D2D_41B1_024A8D5AFA43_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C5160C8_122D_9D2D_41B1_024A8D5AFA43_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1C5160C8_122D_9D2D_41B1_024A8D5AFA43_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C5160C8_122D_9D2D_41B1_024A8D5AFA43_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C5160C8_122D_9D2D_41B1_024A8D5AFA43_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1C5160C8_122D_9D2D_41B1_024A8D5AFA43_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C5160C8_122D_9D2D_41B1_024A8D5AFA43_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C5160C8_122D_9D2D_41B1_024A8D5AFA43_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1C5160C8_122D_9D2D_41B1_024A8D5AFA43_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C5160C8_122D_9D2D_41B1_024A8D5AFA43_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C5160C8_122D_9D2D_41B1_024A8D5AFA43_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_1C5160C8_122D_9D2D_41B1_024A8D5AFA43_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C5160C8_122D_9D2D_41B1_024A8D5AFA43_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C5160C8_122D_9D2D_41B1_024A8D5AFA43_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1C5160C8_122D_9D2D_41B1_024A8D5AFA43_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_1C4125D1_1232_673C_41A5_59703CE4972A",
  "this.overlay_1D2A0444_1232_6525_419F_57DC2653977B",
  "this.overlay_1CE01260_1212_9D1C_41AC_02CF8147CA6F",
  "this.overlay_1DB268A7_1212_ED64_41A3_38B566A01C08"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 29.14,
   "distance": 1,
   "panorama": "this.panorama_1E35133E_1216_E365_418A_E512CC92AE96",
   "backwardYaw": -123.6
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_1E261A0A_1216_AD2C_41A3_6B0EE11D4D7E",
 "thumbnailUrl": "media/panorama_1E261A0A_1216_AD2C_41A3_6B0EE11D4D7E_t.jpg",
 "label": "A6",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_1E261A0A_1216_AD2C_41A3_6B0EE11D4D7E_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E261A0A_1216_AD2C_41A3_6B0EE11D4D7E_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E261A0A_1216_AD2C_41A3_6B0EE11D4D7E_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1E261A0A_1216_AD2C_41A3_6B0EE11D4D7E_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E261A0A_1216_AD2C_41A3_6B0EE11D4D7E_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E261A0A_1216_AD2C_41A3_6B0EE11D4D7E_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1E261A0A_1216_AD2C_41A3_6B0EE11D4D7E_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E261A0A_1216_AD2C_41A3_6B0EE11D4D7E_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E261A0A_1216_AD2C_41A3_6B0EE11D4D7E_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1E261A0A_1216_AD2C_41A3_6B0EE11D4D7E_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E261A0A_1216_AD2C_41A3_6B0EE11D4D7E_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E261A0A_1216_AD2C_41A3_6B0EE11D4D7E_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1E261A0A_1216_AD2C_41A3_6B0EE11D4D7E_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E261A0A_1216_AD2C_41A3_6B0EE11D4D7E_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E261A0A_1216_AD2C_41A3_6B0EE11D4D7E_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_1E261A0A_1216_AD2C_41A3_6B0EE11D4D7E_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E261A0A_1216_AD2C_41A3_6B0EE11D4D7E_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E261A0A_1216_AD2C_41A3_6B0EE11D4D7E_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1E261A0A_1216_AD2C_41A3_6B0EE11D4D7E_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_1C8FB9E2_121D_AF1C_41AE_17FCFAB76257"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -135.91,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_37C24168_2493_DAEE_41BD_E25B50C09C50"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 81.9,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_31E4BF26_2493_E662_41BB_CAF08BE55200"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -13.15,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_30A2ADBE_2493_EA62_41A7_1C8C972CEC5A"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_1C740D40_122E_671C_41A5_F8F6717860CD_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 19.72,
   "distance": 1,
   "panorama": "this.panorama_1E590196_1216_7F24_41A7_D1A1589C2A9E",
   "backwardYaw": -167.56
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -148.47,
   "distance": 1,
   "panorama": "this.panorama_1F1F5301_1216_A31C_41A0_CF4AED19D1F5",
   "backwardYaw": 28.64
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_1EC76234_1216_9D64_41A9_AF64765A9F9F",
 "thumbnailUrl": "media/panorama_1EC76234_1216_9D64_41A9_AF64765A9F9F_t.jpg",
 "label": "A16",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_1EC76234_1216_9D64_41A9_AF64765A9F9F_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1EC76234_1216_9D64_41A9_AF64765A9F9F_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1EC76234_1216_9D64_41A9_AF64765A9F9F_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1EC76234_1216_9D64_41A9_AF64765A9F9F_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1EC76234_1216_9D64_41A9_AF64765A9F9F_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1EC76234_1216_9D64_41A9_AF64765A9F9F_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1EC76234_1216_9D64_41A9_AF64765A9F9F_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1EC76234_1216_9D64_41A9_AF64765A9F9F_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1EC76234_1216_9D64_41A9_AF64765A9F9F_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1EC76234_1216_9D64_41A9_AF64765A9F9F_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1EC76234_1216_9D64_41A9_AF64765A9F9F_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1EC76234_1216_9D64_41A9_AF64765A9F9F_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1EC76234_1216_9D64_41A9_AF64765A9F9F_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1EC76234_1216_9D64_41A9_AF64765A9F9F_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1EC76234_1216_9D64_41A9_AF64765A9F9F_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_1EC76234_1216_9D64_41A9_AF64765A9F9F_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1EC76234_1216_9D64_41A9_AF64765A9F9F_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1EC76234_1216_9D64_41A9_AF64765A9F9F_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1EC76234_1216_9D64_41A9_AF64765A9F9F_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_1D08E00C_1215_9D24_41A0_C1419062D233",
  "this.overlay_1D4706D5_1212_6524_419E_B5AA939CE98E"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 20.6,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_32406C07_2493_EA22_41A0_597DDA75FD42"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 62.18,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_3030EE36_2493_E662_41AC_C2067AABA567"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -16.96,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_31B73EB8_2493_E66E_41C0_202DC47ABE21"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -161.57,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_3233408D_2493_DA26_41B8_6A5B99F540EB"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -64.56,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_32F04BAA_2493_EE62_41BE_2760C1F279AC"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_1E3E7C89_1216_A52F_41B0_E95358B2767C_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -78.26,
   "distance": 1,
   "panorama": "this.panorama_49AEC247_135B_B4E8_41A5_746131D61342",
   "backwardYaw": 114.05
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 102.12,
   "distance": 1,
   "panorama": "this.panorama_1F7646C7_12AA_9DF7_41A3_6118C47853B8",
   "backwardYaw": -77.5
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -154.96,
   "distance": 1,
   "panorama": "this.panorama_632FB807_13AA_9468_4199_F2D987E571CA",
   "backwardYaw": 11.09
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_5EF35374_136E_B4A8_4191_7E72995B3ECD",
 "thumbnailUrl": "media/panorama_5EF35374_136E_B4A8_4191_7E72995B3ECD_t.jpg",
 "label": "C8",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_5EF35374_136E_B4A8_4191_7E72995B3ECD_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_5EF35374_136E_B4A8_4191_7E72995B3ECD_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_5EF35374_136E_B4A8_4191_7E72995B3ECD_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_5EF35374_136E_B4A8_4191_7E72995B3ECD_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_5EF35374_136E_B4A8_4191_7E72995B3ECD_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_5EF35374_136E_B4A8_4191_7E72995B3ECD_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_5EF35374_136E_B4A8_4191_7E72995B3ECD_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_5EF35374_136E_B4A8_4191_7E72995B3ECD_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_5EF35374_136E_B4A8_4191_7E72995B3ECD_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_5EF35374_136E_B4A8_4191_7E72995B3ECD_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_5EF35374_136E_B4A8_4191_7E72995B3ECD_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_5EF35374_136E_B4A8_4191_7E72995B3ECD_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_5EF35374_136E_B4A8_4191_7E72995B3ECD_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_5EF35374_136E_B4A8_4191_7E72995B3ECD_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_5EF35374_136E_B4A8_4191_7E72995B3ECD_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_5EF35374_136E_B4A8_4191_7E72995B3ECD_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_5EF35374_136E_B4A8_4191_7E72995B3ECD_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_5EF35374_136E_B4A8_4191_7E72995B3ECD_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_5EF35374_136E_B4A8_4191_7E72995B3ECD_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_4B393D3D_135A_6C98_41AA_419ADA546251",
  "this.overlay_4B747C31_135A_6CA8_4190_75C9DFFE5290",
  "this.overlay_7EBB33CA_13AA_9BF8_419A_8798508D1C4A"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -25.37,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_33AC70FB_2493_DBE2_41BB_2F0C62C07BA4"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -164.8,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_32CA4046_2493_DA22_4197_B6B0F0995E66"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_1E36C7D9_1217_E32F_419A_CA22B2D4E0D8_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1C74934B_122E_A32C_41AF_0A51BBA11B42"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 93.96,
   "distance": 1,
   "panorama": "this.panorama_1C74D9CF_122E_AF24_41AA_174DA8673956",
   "backwardYaw": -102.12
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -113.93,
   "distance": 1,
   "panorama": "this.panorama_1C5E8E0D_122F_E524_41AB_25431A77DDE1",
   "backwardYaw": -61.3
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_1C5A781B_122F_AD2C_419A_D55C87F1D7C4",
 "thumbnailUrl": "media/panorama_1C5A781B_122F_AD2C_419A_D55C87F1D7C4_t.jpg",
 "label": "AKB LB",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_1C5A781B_122F_AD2C_419A_D55C87F1D7C4_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C5A781B_122F_AD2C_419A_D55C87F1D7C4_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C5A781B_122F_AD2C_419A_D55C87F1D7C4_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1C5A781B_122F_AD2C_419A_D55C87F1D7C4_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C5A781B_122F_AD2C_419A_D55C87F1D7C4_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C5A781B_122F_AD2C_419A_D55C87F1D7C4_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1C5A781B_122F_AD2C_419A_D55C87F1D7C4_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C5A781B_122F_AD2C_419A_D55C87F1D7C4_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C5A781B_122F_AD2C_419A_D55C87F1D7C4_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1C5A781B_122F_AD2C_419A_D55C87F1D7C4_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C5A781B_122F_AD2C_419A_D55C87F1D7C4_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C5A781B_122F_AD2C_419A_D55C87F1D7C4_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1C5A781B_122F_AD2C_419A_D55C87F1D7C4_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C5A781B_122F_AD2C_419A_D55C87F1D7C4_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C5A781B_122F_AD2C_419A_D55C87F1D7C4_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_1C5A781B_122F_AD2C_419A_D55C87F1D7C4_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C5A781B_122F_AD2C_419A_D55C87F1D7C4_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C5A781B_122F_AD2C_419A_D55C87F1D7C4_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1C5A781B_122F_AD2C_419A_D55C87F1D7C4_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_1F350DD5_12BA_AFE8_41AD_2F8F558DD812",
  "this.overlay_1CBBCE29_12BA_ACB8_4191_4F052CB442DB",
  "this.overlay_1CF41B54_12BA_94E9_41B0_C7665E8E28F5"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -33.16,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_323C2BD9_2493_EE2E_41BC_7D651CC86067"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 174.04,
  "pitch": 0.34
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_1C6C0918_1212_EF2D_41AA_8CB6E207B7CA_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -168.91,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_3247C0B2_2493_DA62_41B7_E6BC952F372A"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_1F769998_12AA_9798_41A9_9421299474C3_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_027D9014_12BA_7468_41AE_B7601C694ED1_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 116.61,
   "distance": 1,
   "panorama": "this.panorama_1D4CDF0B_12AA_AC78_4190_C5BCACDF8F2B",
   "backwardYaw": -66.66
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_59E47185_136B_F468_41AE_60E9A934E07E",
 "thumbnailUrl": "media/panorama_59E47185_136B_F468_41AE_60E9A934E07E_t.jpg",
 "label": "BB PERPUS PUTRI",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_59E47185_136B_F468_41AE_60E9A934E07E_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_59E47185_136B_F468_41AE_60E9A934E07E_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_59E47185_136B_F468_41AE_60E9A934E07E_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_59E47185_136B_F468_41AE_60E9A934E07E_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_59E47185_136B_F468_41AE_60E9A934E07E_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_59E47185_136B_F468_41AE_60E9A934E07E_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_59E47185_136B_F468_41AE_60E9A934E07E_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_59E47185_136B_F468_41AE_60E9A934E07E_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_59E47185_136B_F468_41AE_60E9A934E07E_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_59E47185_136B_F468_41AE_60E9A934E07E_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_59E47185_136B_F468_41AE_60E9A934E07E_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_59E47185_136B_F468_41AE_60E9A934E07E_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_59E47185_136B_F468_41AE_60E9A934E07E_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_59E47185_136B_F468_41AE_60E9A934E07E_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_59E47185_136B_F468_41AE_60E9A934E07E_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_59E47185_136B_F468_41AE_60E9A934E07E_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_59E47185_136B_F468_41AE_60E9A934E07E_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_59E47185_136B_F468_41AE_60E9A934E07E_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_59E47185_136B_F468_41AE_60E9A934E07E_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_45B6A166_135A_94A9_41A2_C50B72B2839B"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -123.35,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_374B6D47_2493_EA22_41A5_6736FE8B4A50"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 175.98,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_310D7F4D_2493_E626_417F_12082B1AA47C"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -26,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_31189F3C_2493_E666_41B3_285F2C7207DD"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -33.25,
   "distance": 1,
   "panorama": "this.panorama_1C461727_12B7_9CA8_41A0_02E993644282",
   "backwardYaw": 126.11
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -117.82,
   "distance": 1,
   "panorama": "this.panorama_1F7039BE_12B5_9798_41B0_325FFC1AF137",
   "backwardYaw": 53.51
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 76.37,
   "distance": 1,
   "panorama": "this.panorama_1E3059D8_1216_AF2D_4182_4B71A1D76684",
   "backwardYaw": -113.8
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_027D9014_12BA_7468_41AE_B7601C694ED1",
 "thumbnailUrl": "media/panorama_027D9014_12BA_7468_41AE_B7601C694ED1_t.jpg",
 "label": "A3 DEPAN FUTSAL",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_027D9014_12BA_7468_41AE_B7601C694ED1_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_027D9014_12BA_7468_41AE_B7601C694ED1_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_027D9014_12BA_7468_41AE_B7601C694ED1_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_027D9014_12BA_7468_41AE_B7601C694ED1_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_027D9014_12BA_7468_41AE_B7601C694ED1_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_027D9014_12BA_7468_41AE_B7601C694ED1_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_027D9014_12BA_7468_41AE_B7601C694ED1_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_027D9014_12BA_7468_41AE_B7601C694ED1_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_027D9014_12BA_7468_41AE_B7601C694ED1_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_027D9014_12BA_7468_41AE_B7601C694ED1_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_027D9014_12BA_7468_41AE_B7601C694ED1_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_027D9014_12BA_7468_41AE_B7601C694ED1_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_027D9014_12BA_7468_41AE_B7601C694ED1_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_027D9014_12BA_7468_41AE_B7601C694ED1_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_027D9014_12BA_7468_41AE_B7601C694ED1_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_027D9014_12BA_7468_41AE_B7601C694ED1_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_027D9014_12BA_7468_41AE_B7601C694ED1_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_027D9014_12BA_7468_41AE_B7601C694ED1_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_027D9014_12BA_7468_41AE_B7601C694ED1_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_1F443117_12B6_9497_4186_D87B6D7706DD",
  "this.overlay_1C268E5D_12B6_EC9B_419B_151EBD8A23B4",
  "this.overlay_1DC8A46A_12B6_9CB8_4188_7643BB50C325"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -41.79,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_37A26C8B_2493_EA22_419B_D3E2A9978A2F"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_632FB807_13AA_9468_4199_F2D987E571CA_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -164.93,
   "distance": 1,
   "panorama": "this.panorama_1F7646C7_12AA_9DF7_41A3_6118C47853B8",
   "backwardYaw": 11.68
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 18.46,
   "distance": 1,
   "panorama": "this.panorama_1D4CDF0B_12AA_AC78_4190_C5BCACDF8F2B",
   "backwardYaw": -159.4
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_1F53F5D9_12AA_FF98_41A3_6B669E91923B",
 "thumbnailUrl": "media/panorama_1F53F5D9_12AA_FF98_41A3_6B669E91923B_t.jpg",
 "label": "B3",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_1F53F5D9_12AA_FF98_41A3_6B669E91923B_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1F53F5D9_12AA_FF98_41A3_6B669E91923B_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1F53F5D9_12AA_FF98_41A3_6B669E91923B_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1F53F5D9_12AA_FF98_41A3_6B669E91923B_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1F53F5D9_12AA_FF98_41A3_6B669E91923B_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1F53F5D9_12AA_FF98_41A3_6B669E91923B_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1F53F5D9_12AA_FF98_41A3_6B669E91923B_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1F53F5D9_12AA_FF98_41A3_6B669E91923B_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1F53F5D9_12AA_FF98_41A3_6B669E91923B_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1F53F5D9_12AA_FF98_41A3_6B669E91923B_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1F53F5D9_12AA_FF98_41A3_6B669E91923B_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1F53F5D9_12AA_FF98_41A3_6B669E91923B_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1F53F5D9_12AA_FF98_41A3_6B669E91923B_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1F53F5D9_12AA_FF98_41A3_6B669E91923B_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1F53F5D9_12AA_FF98_41A3_6B669E91923B_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_1F53F5D9_12AA_FF98_41A3_6B669E91923B_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1F53F5D9_12AA_FF98_41A3_6B669E91923B_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1F53F5D9_12AA_FF98_41A3_6B669E91923B_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1F53F5D9_12AA_FF98_41A3_6B669E91923B_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_1C5E13D1_12AE_9BE8_419A_6E8734B55629",
  "this.overlay_1DA2EEF4_12AE_6DA8_41A2_21EA0F6C9B45"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 66.07,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_32F9F052_2493_DA22_41BD_0B7A6808DB52"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -101.62,
   "distance": 1,
   "panorama": "this.panorama_7176E1A8_13B7_B7B9_419E_B2A83EBA5F99",
   "backwardYaw": 95.84
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 115.44,
   "distance": 1,
   "panorama": "this.panorama_49AFA632_135A_BCA9_41A2_1F29C0D05566",
   "backwardYaw": -90.31
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_49AF6A22_135A_94A9_41AA_E036F21F6533",
 "thumbnailUrl": "media/panorama_49AF6A22_135A_94A9_41AA_E036F21F6533_t.jpg",
 "label": "C5",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_49AF6A22_135A_94A9_41AA_E036F21F6533_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_49AF6A22_135A_94A9_41AA_E036F21F6533_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_49AF6A22_135A_94A9_41AA_E036F21F6533_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_49AF6A22_135A_94A9_41AA_E036F21F6533_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_49AF6A22_135A_94A9_41AA_E036F21F6533_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_49AF6A22_135A_94A9_41AA_E036F21F6533_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_49AF6A22_135A_94A9_41AA_E036F21F6533_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_49AF6A22_135A_94A9_41AA_E036F21F6533_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_49AF6A22_135A_94A9_41AA_E036F21F6533_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_49AF6A22_135A_94A9_41AA_E036F21F6533_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_49AF6A22_135A_94A9_41AA_E036F21F6533_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_49AF6A22_135A_94A9_41AA_E036F21F6533_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_49AF6A22_135A_94A9_41AA_E036F21F6533_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_49AF6A22_135A_94A9_41AA_E036F21F6533_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_49AF6A22_135A_94A9_41AA_E036F21F6533_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_49AF6A22_135A_94A9_41AA_E036F21F6533_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_49AF6A22_135A_94A9_41AA_E036F21F6533_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_49AF6A22_135A_94A9_41AA_E036F21F6533_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_49AF6A22_135A_94A9_41AA_E036F21F6533_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_72C4FBA8_13AD_ABB9_41A3_7F34B62A42F4",
  "this.overlay_71119DBF_13AE_6F98_41A7_787AB9BFAA44"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 55.9,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_31622FFF_2493_E5E2_41C2_1B4F9749BDD9"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 62.43,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_31A9AEC4_2493_E626_41C1_119905F79C65"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -128.5,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_375CFD2F_2493_EA62_4195_08809A619930"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_1D392500_12B5_BC69_41B1_8B4E63350F5E_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -117.16,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_327410BF_2493_DA62_41B6_F5702D66C49B"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 15.83,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_37E40CDD_2493_EA26_41BE_4D3B593C15DE"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 153.37,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_33BE90EF_2493_DBE2_41BB_25BAE2D4CE76"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 16.96,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_30F42DEE_2493_E5E2_41B9_64DF20EA62B2"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 46.73,
   "distance": 1,
   "panorama": "this.panorama_1F7646C7_12AA_9DF7_41A3_6118C47853B8",
   "backwardYaw": -171.46
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -146.09,
   "distance": 1,
   "panorama": "this.panorama_1F2B6CEB_12D6_6DB8_41B2_62922D3306B8",
   "backwardYaw": 43.05
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 163.04,
   "distance": 1,
   "panorama": "this.panorama_1F769998_12AA_9798_41A9_9421299474C3",
   "backwardYaw": 18.43
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_1F76471E_12AA_BC99_417D_DD5A2084733C",
 "thumbnailUrl": "media/panorama_1F76471E_12AA_BC99_417D_DD5A2084733C_t.jpg",
 "label": "B5",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_1F76471E_12AA_BC99_417D_DD5A2084733C_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1F76471E_12AA_BC99_417D_DD5A2084733C_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1F76471E_12AA_BC99_417D_DD5A2084733C_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1F76471E_12AA_BC99_417D_DD5A2084733C_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1F76471E_12AA_BC99_417D_DD5A2084733C_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1F76471E_12AA_BC99_417D_DD5A2084733C_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1F76471E_12AA_BC99_417D_DD5A2084733C_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1F76471E_12AA_BC99_417D_DD5A2084733C_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1F76471E_12AA_BC99_417D_DD5A2084733C_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1F76471E_12AA_BC99_417D_DD5A2084733C_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1F76471E_12AA_BC99_417D_DD5A2084733C_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1F76471E_12AA_BC99_417D_DD5A2084733C_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1F76471E_12AA_BC99_417D_DD5A2084733C_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1F76471E_12AA_BC99_417D_DD5A2084733C_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1F76471E_12AA_BC99_417D_DD5A2084733C_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_1F76471E_12AA_BC99_417D_DD5A2084733C_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1F76471E_12AA_BC99_417D_DD5A2084733C_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1F76471E_12AA_BC99_417D_DD5A2084733C_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1F76471E_12AA_BC99_417D_DD5A2084733C_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_1C82984B_12AF_94FF_41AA_488F6A66AC8B",
  "this.overlay_1CEBF8B1_12AE_95A8_41A6_5A0960F1CF59",
  "this.overlay_1C6239DD_12AE_9798_41A6_99ED44AA020C"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 86.96,
   "distance": 1,
   "panorama": "this.panorama_1C74934B_122E_A32C_41AF_0A51BBA11B42",
   "backwardYaw": -20.56
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_1C7416BE_122E_A565_41A7_E6DAA86F5840",
 "thumbnailUrl": "media/panorama_1C7416BE_122E_A565_41A7_E6DAA86F5840_t.jpg",
 "label": "AKB 3",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_1C7416BE_122E_A565_41A7_E6DAA86F5840_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C7416BE_122E_A565_41A7_E6DAA86F5840_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C7416BE_122E_A565_41A7_E6DAA86F5840_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_1C7416BE_122E_A565_41A7_E6DAA86F5840_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C7416BE_122E_A565_41A7_E6DAA86F5840_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C7416BE_122E_A565_41A7_E6DAA86F5840_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_1C7416BE_122E_A565_41A7_E6DAA86F5840_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C7416BE_122E_A565_41A7_E6DAA86F5840_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C7416BE_122E_A565_41A7_E6DAA86F5840_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_1C7416BE_122E_A565_41A7_E6DAA86F5840_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C7416BE_122E_A565_41A7_E6DAA86F5840_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C7416BE_122E_A565_41A7_E6DAA86F5840_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_1C7416BE_122E_A565_41A7_E6DAA86F5840_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C7416BE_122E_A565_41A7_E6DAA86F5840_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C7416BE_122E_A565_41A7_E6DAA86F5840_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_1C7416BE_122E_A565_41A7_E6DAA86F5840_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C7416BE_122E_A565_41A7_E6DAA86F5840_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C7416BE_122E_A565_41A7_E6DAA86F5840_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_1C7416BE_122E_A565_41A7_E6DAA86F5840_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_1CA93C76_12AA_ACA8_419F_6BB51832ED4E"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -65.95,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_3220809A_2493_DA22_41B2_1397578693EF"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 179.12,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_30ECF2E2_2493_DFE2_41A8_A54A8C0FEA0C"
},
{
 "progressBarBorderColor": "#000000",
 "data": {
  "name": "Main Viewer"
 },
 "progressBackgroundColorDirection": "vertical",
 "id": "MainViewer",
 "left": 0,
 "playbackBarBottom": 10,
 "toolTipShadowSpread": 0,
 "playbackBarHeadOpacity": 1,
 "progressBorderColor": "#AAAAAA",
 "progressBarBackgroundColorRatios": [
  0,
  1
 ],
 "toolTipBorderColor": "#767676",
 "width": "100%",
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#222222",
  "#444444"
 ],
 "progressBackgroundColor": [
  "#EEEEEE",
  "#CCCCCC"
 ],
 "playbackBarHeadShadowHorizontalLength": 0,
 "paddingLeft": 0,
 "minHeight": 50,
 "toolTipOpacity": 1,
 "toolTipShadowBlurRadius": 3,
 "toolTipFontSize": 12,
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#EEEEEE",
  "#CCCCCC"
 ],
 "playbackBarHeadWidth": 6,
 "playbackBarRight": 0,
 "playbackBarHeight": 20,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "minWidth": 100,
 "playbackBarProgressBorderSize": 0,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 4,
 "toolTipFontWeight": "normal",
 "height": "100%",
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "playbackBarBorderRadius": 4,
 "playbackBarHeadBorderRadius": 0,
 "transitionMode": "blending",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "toolTipShadowOpacity": 1,
 "progressLeft": 10,
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "shadow": false,
 "playbackBarBorderSize": 2,
 "toolTipShadowVerticalLength": 0,
 "propagateClick": false,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontStyle": "normal",
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowVerticalLength": 0,
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 10,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "borderSize": 0,
 "paddingRight": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 1,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 20,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "top": 0,
 "playbackBarOpacity": 1,
 "displayTooltipInTouchScreens": true,
 "playbackBarProgressBackgroundColor": [
  "#222222",
  "#444444"
 ],
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "playbackBarBorderColor": "#AAAAAA",
 "progressBorderSize": 2,
 "toolTipBorderSize": 1,
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 4,
 "paddingTop": 0,
 "class": "ViewerArea",
 "playbackBarProgressBackgroundColorRatios": [
  0,
  1
 ],
 "playbackBarLeft": 0,
 "paddingBottom": 0,
 "toolTipPaddingRight": 6,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "toolTipDisplayTime": 600,
 "playbackBarHeadHeight": 30,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "transitionDuration": 500,
 "progressBackgroundColorRatios": [
  0,
  1
 ]
},
{
 "shadow": false,
 "propagateClick": false,
 "children": [
  "this.IconButton_52344940_5F01_EFC4_41D7_BE81DEFE8744",
  "this.IconButton_52344940_5F01_EFC4_41BB_2A5E51966695",
  "this.IconButton_52344940_5F01_EFC4_41D4_A1CCD7021F0A",
  "this.IconButton_52344940_5F01_EFC4_41D0_C6DE67446A2C",
  "this.Container_52344940_5F01_EFC4_41D6_7E3303CC9C74",
  "this.IconButton_52344940_5F01_EFC4_4184_BD88B8F3E7CC",
  "this.IconButton_52344940_5F01_EFC4_41C7_7571D1A24A33",
  "this.IconButton_52344940_5F01_EFC4_41CC_9E18548B3CCC",
  "this.IconButton_52344940_5F01_EFC4_41BB_7EDA152A8375"
 ],
 "layout": "horizontal",
 "id": "Container_52344940_5F01_EFC4_41D4_ABA40101D8BF",
 "scrollBarColor": "#000000",
 "width": 421,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 20,
 "scrollBarOpacity": 0.5,
 "contentOpaque": false,
 "minWidth": 421,
 "verticalAlign": "middle",
 "height": "100%",
 "scrollBarMargin": 2,
 "horizontalAlign": "center",
 "gap": 4,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "class": "Container",
 "borderRadius": 0,
 "overflow": "hidden",
 "scrollBarWidth": 10,
 "data": {
  "name": "Container53059"
 }
},
{
 "transparencyActive": true,
 "propagateClick": false,
 "id": "IconButton_52344940_5F01_EFC4_41CC_9E18548B3CCC",
 "width": 40,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "minHeight": 0,
 "verticalAlign": "middle",
 "horizontalAlign": "center",
 "minWidth": 0,
 "mode": "toggle",
 "height": 40,
 "iconURL": "skin/IconButton_52344940_5F01_EFC4_41CC_9E18548B3CCC.png",
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "class": "IconButton",
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_52344940_5F01_EFC4_41CC_9E18548B3CCC_pressed.png",
 "shadow": false,
 "cursor": "hand",
 "data": {
  "name": "Button53070"
 }
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 34.44,
   "image": "this.AnimatedImageResource_943A58A0_13D6_95A8_4195_C491C6DA64B2",
   "pitch": -9.48,
   "yaw": 51.5,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1C883BBC_12D6_AB99_4181_0D0E0BB44FA0",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1F7170A8_12AD_95B9_41B0_69B3D2D511F0, this.camera_370FE1D1_2493_DA3E_41C2_42D3889FB37A); this.mainPlayList.set('selectedIndex', 52)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 34.44,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 51.5,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1D2C1F2A_12D5_ACB8_41B0_5142BEAE6714_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -9.48
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 06a Right"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 50.64,
   "image": "this.AnimatedImageResource_943D38A0_13D6_95A8_41A5_BB3BDDFE7332",
   "pitch": -44.78,
   "yaw": 141.31,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_1C75EDA8_12D5_AFB8_41B0_704BFBAC3AF9",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1F7170A8_12AD_95B9_41B0_69B3D2D511F0, this.camera_31F06F15_2493_E626_41B4_D185E5E47C6D); this.mainPlayList.set('selectedIndex', 52)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 50.64,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 141.31,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1F2B6CEB_12D6_6DB8_41B2_62922D3306B8_1_HS_0_0_0_map.gif",
      "width": 51,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -44.78
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 06a Left-Up"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 23.99,
   "image": "this.AnimatedImageResource_943CE8A0_13D6_95A8_418F_3E0BAC7F42F8",
   "pitch": -3.96,
   "yaw": 43.05,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_009DB5B8_12DA_FF98_41B2_57F94BA7CBB1",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1F76471E_12AA_BC99_417D_DD5A2084733C, this.camera_31CBEEE7_2493_E7E2_41B9_72922FD183BB); this.mainPlayList.set('selectedIndex', 50)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 23.99,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 43.05,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1F2B6CEB_12D6_6DB8_41B2_62922D3306B8_1_HS_1_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -3.96
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Arrow 03"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.38,
   "image": "this.AnimatedImageResource_943C78A0_13D6_95A8_41A5_AB93E7D2CF7A",
   "pitch": -2.61,
   "yaw": 116.86,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1C278140_12DB_B4E9_41AE_17FA3E516F16",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1F2B9277_12D6_B497_418D_A66B17178836, this.camera_31FE2EFF_2493_E7E2_41B1_7A09BBF70308); this.mainPlayList.set('selectedIndex', 55)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 13.38,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 116.86,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1F2B6CEB_12D6_6DB8_41B2_62922D3306B8_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -2.61
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 24.52,
   "image": "this.AnimatedImageResource_94109873_13D6_94A8_4190_1EFD2BC5542E",
   "pitch": -18.65,
   "yaw": -117.32,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1FC0C62C_1215_E565_41A3_3D15BD3ADE2A",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_0154F527_0C22_07FC_4193_06409B7D0536, this.camera_371F6CE9_2493_EBEE_4174_87347CE1B9F6); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 24.52,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -117.32,
   "image": {
    "levels": [
     {
      "url": "media/panorama_02181B5D_0879_47EF_4194_05F745303325_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -18.65
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 24.48,
   "image": "this.AnimatedImageResource_94140877_13D6_94A8_41AE_489110C0D356",
   "pitch": -18.9,
   "yaw": -16.33,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1CA17E28_121E_E56D_41A3_00627B2529A9",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1E35133E_1216_E365_418A_E512CC92AE96, this.camera_31189F3C_2493_E666_41B3_285F2C7207DD); this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 24.48,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -16.33,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1E351DCE_1216_A725_41AA_C2237F5681B0_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -18.9
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 25.66,
   "image": "this.AnimatedImageResource_94145877_13D6_94A8_41AA_9A297FFA7DCB",
   "pitch": -7.35,
   "yaw": 159.53,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1CED806A_121E_BDED_41AF_11F28D8B92D4",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1E3059D8_1216_AF2D_4182_4B71A1D76684, this.camera_310D7F4D_2493_E626_417F_12082B1AA47C); this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 25.66,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 159.53,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1E351DCE_1216_A725_41AA_C2237F5681B0_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -7.35
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 20.82,
   "image": "this.AnimatedImageResource_94179877_13D6_94A8_4179_DF443715FACC",
   "pitch": -15.39,
   "yaw": -58.41,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1D1721B5_121E_9F64_4190_F911F01D45DC",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 6)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 20.82,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -58.41,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1E351DCE_1216_A725_41AA_C2237F5681B0_1_HS_2_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -15.39
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.36,
   "image": "this.AnimatedImageResource_94173877_13D6_94A8_4181_DA87AF04A031",
   "pitch": -3.87,
   "yaw": 62.84,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_0AF4E044_12EE_74E8_4174_5B590490AB56",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1C69EC6F_1232_65E3_41A9_5362BA7F1A83, this.camera_31E4BF26_2493_E662_41BB_CAF08BE55200); this.mainPlayList.set('selectedIndex', 28)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 13.36,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 62.84,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1E351DCE_1216_A725_41AA_C2237F5681B0_1_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -3.87
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 21.12,
   "image": "this.AnimatedImageResource_94246886_13D6_9468_41B1_DFA8B06CDE8B",
   "pitch": -13.04,
   "yaw": 78.04,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1C4AC2F0_1237_E2FC_4191_10C8DE6815B5",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1D51A53A_1232_676C_419B_FB05E8EE5A1C, this.camera_326520CB_2493_DA22_41B5_E3B53D2951F4); this.mainPlayList.set('selectedIndex', 29)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 21.12,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 78.04,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1C69EC6F_1232_65E3_41A9_5362BA7F1A83_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -13.04
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 16.83,
   "image": "this.AnimatedImageResource_9427E886_13D6_9468_4183_2A287A2FC4A8",
   "pitch": -35.23,
   "yaw": -98.1,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1D4E0722_1237_A31C_41AE_9C69F5AEEF16",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1E351DCE_1216_A725_41AA_C2237F5681B0, this.camera_327410BF_2493_DA62_41B6_F5702D66C49B); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 16.83,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -98.1,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1C69EC6F_1232_65E3_41A9_5362BA7F1A83_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -35.23
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 20.16,
   "image": "this.AnimatedImageResource_941F7883_13D6_9468_41B2_56776A311B12",
   "pitch": -14.76,
   "yaw": -150.48,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1CBF9E1B_1212_A52C_4196_F0907F21E5BE",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC, this.camera_3739C1F4_2493_DDE5_4188_DAFCC588DDB7); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 20.16,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -150.48,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1F1F5301_1216_A31C_41A0_CF4AED19D1F5_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -14.76
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 23.02,
   "image": "this.AnimatedImageResource_941E8883_13D6_9468_41AF_CE3048B16EFD",
   "pitch": -31.09,
   "yaw": 28.64,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1CEEFD15_1212_E727_419E_6096CD899B43",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1EC76234_1216_9D64_41A9_AF64765A9F9F, this.camera_370361E8_2493_DDEE_41B6_4F50036E8E97); this.mainPlayList.set('selectedIndex', 16)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 23.02,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 28.64,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1F1F5301_1216_A31C_41A0_CF4AED19D1F5_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -31.09
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 28.74,
   "image": "this.AnimatedImageResource_941E3883_13D6_9468_418C_E9DE58D80AA2",
   "pitch": -21.54,
   "yaw": 107.02,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1D83D92E_1212_AF65_41AA_B23B917E6C75",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 21)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 28.74,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 107.02,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1F1F5301_1216_A31C_41A0_CF4AED19D1F5_1_HS_2_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -21.54
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 21.35,
   "image": "this.AnimatedImageResource_94204884_13D6_9468_41A2_38B8E71149BE",
   "pitch": -10.03,
   "yaw": -7.87,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1D17C1AC_122E_BF65_4183_8161E3331EA2",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1E2C3554_1217_A725_41A3_8E48640695C2, this.camera_32E57BB5_2493_EE66_4195_46823C5FAB7F); this.mainPlayList.set('selectedIndex', 10)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 21.35,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -7.87,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1C79B467_1212_65E4_41A9_397DB7948749_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -10.03
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 28.48,
   "image": "this.AnimatedImageResource_9420D884_13D6_9468_41AD_E1F98BE78F22",
   "pitch": -32.22,
   "yaw": -160.66,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1C75CA75_122E_EDE4_4181_599F8E2C58F1",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1C4B5BF2_122D_A2FC_419B_609BAA032087, this.camera_37303D18_2493_EA2E_41C2_1D4CD7731159); this.mainPlayList.set('selectedIndex', 24)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 28.48,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -160.66,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1C6F6FB5_1212_A367_41B1_97BA031975B7_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -32.22
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 24.79,
   "image": "this.AnimatedImageResource_94142878_13D6_9498_4183_9C394924CA1E",
   "pitch": -16.64,
   "yaw": -26.63,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1CC5F1FB_121F_9EE3_415D_376335E24752",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1E3E7C89_1216_A52F_41B0_E95358B2767C, this.camera_3761B25D_2493_DE26_41A8_1F88C73BB025); this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 24.79,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -26.63,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1E35133E_1216_E365_418A_E512CC92AE96_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -16.64
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 25.6,
   "image": "this.AnimatedImageResource_94146878_13D6_9498_41A5_B34C987920A8",
   "pitch": -8.35,
   "yaw": 154,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1D27D0EB_121F_BEE3_419A_8904A71B3700",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1E351DCE_1216_A725_41AA_C2237F5681B0, this.camera_37752246_2493_DE22_41BE_820E66D5C91B); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 25.6,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 154,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1E35133E_1216_E365_418A_E512CC92AE96_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.35
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 01a"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 17.05,
   "image": "this.AnimatedImageResource_9417B878_13D6_9498_41AA_25BE7973AD21",
   "pitch": -10.24,
   "yaw": -123.6,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1CEEC4D8_121D_A52D_41B0_D908E1BCA50E",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1E261A0A_1216_AD2C_41A3_6B0EE11D4D7E, this.camera_376E2252_2493_DE22_41C0_EB55971DEFDC); this.mainPlayList.set('selectedIndex', 6)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 17.05,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -123.6,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1E35133E_1216_E365_418A_E512CC92AE96_1_HS_2_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -10.24
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 37.86,
   "image": "this.AnimatedImageResource_94CB08AE_13D6_95B8_419E_7839F98F3E7F",
   "pitch": -37.12,
   "yaw": 97.98,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_769D3F39_13BB_AC98_41AE_E98F29510728",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_71772D8C_13B6_6C78_41B2_9EB26FDA544E, this.camera_3762DD77_2493_EAE2_41A8_7AE67DC34093); this.mainPlayList.set('selectedIndex', 69)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 37.86,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 97.98,
   "image": {
    "levels": [
     {
      "url": "media/panorama_7719D67F_13B6_9C98_41A2_D5E02E95A3B2_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -37.12
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Arrow 03"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.38,
   "image": "this.AnimatedImageResource_94CA98AE_13D6_95B8_41B1_4D46715C9BCC",
   "pitch": -2.87,
   "yaw": 166.85,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_7986757E_13BE_BC99_41A9_653D16268D42",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_7178E80E_13B6_9478_4187_6F7683DD2190, this.camera_376B5D6B_2493_EAE2_41B5_BD9218BA250B); this.mainPlayList.set('selectedIndex', 68)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 13.38,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 166.85,
   "image": {
    "levels": [
     {
      "url": "media/panorama_7719D67F_13B6_9C98_41A2_D5E02E95A3B2_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -2.87
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 20.92,
   "image": "this.AnimatedImageResource_6668D565_13DE_7CA8_41A3_AA7E5514284C",
   "pitch": -14.51,
   "yaw": -107.4,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1F7507C3_1212_A31C_4183_83418A8BA979",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC, this.camera_3389E0E3_2493_DBE2_41A8_ABCAE9F29BAD); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 20.92,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -107.4,
   "image": {
    "levels": [
     {
      "url": "media/panorama_0154F527_0C22_07FC_4193_06409B7D0536_0_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -14.51
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 25.39,
   "image": "this.AnimatedImageResource_9413B875_13D6_94A8_41AA_7EE7346BBEA4",
   "pitch": -11.12,
   "yaw": 70.34,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1FCAF628_1212_E56C_4194_FF80F7393174",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_02181B5D_0879_47EF_4194_05F745303325, this.camera_339A70D8_2493_DA2E_41A4_223CC794FD82); this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 25.39,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 70.34,
   "image": {
    "levels": [
     {
      "url": "media/panorama_0154F527_0C22_07FC_4193_06409B7D0536_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -11.12
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 26.73,
   "image": "this.AnimatedImageResource_94233885_13D6_9468_41B0_3616204D0D37",
   "pitch": -9.86,
   "yaw": 8.92,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1C572589_122D_A72C_41AE_E3A751615EB4",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1C6F6FB5_1212_A367_41B1_97BA031975B7, this.camera_32811016_2493_DA22_41A8_D36590FB9E3D); this.mainPlayList.set('selectedIndex', 21)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 26.73,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 8.92,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1C4B5BF2_122D_A2FC_419B_609BAA032087_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -9.86
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 32.85,
   "image": "this.AnimatedImageResource_94234885_13D6_9468_4191_6144A3359023",
   "pitch": -12.62,
   "yaw": -157.14,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1D311414_122D_E524_41AA_98671529126D",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC, this.camera_3293E00A_2493_DA22_41A5_C2C61CBF7BB7); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 32.85,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -157.14,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1C4B5BF2_122D_A2FC_419B_609BAA032087_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -12.62
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 24.27,
   "image": "this.AnimatedImageResource_942C5891_13D6_9468_41AD_B7DD3FE18D98",
   "pitch": -6.88,
   "yaw": 160.57,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_021B5170_1212_9FFD_41AA_5CE005AFDE17",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 40)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 24.27,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 160.57,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1C740D40_122E_671C_41A5_F8F6717860CD_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.88
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 24.83,
   "image": "this.AnimatedImageResource_94CC88AF_13D6_95B8_419F_8BED6D05B79E",
   "pitch": -18.15,
   "yaw": -85.79,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_76356DC0_13BA_6FE8_41A7_472FCD8F2F43",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_7719D67F_13B6_9C98_41A2_D5E02E95A3B2, this.camera_30E162EE_2493_DFE2_41C1_DFBB6599320E); this.mainPlayList.set('selectedIndex', 67)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 24.83,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -85.79,
   "image": {
    "levels": [
     {
      "url": "media/panorama_71772D8C_13B6_6C78_41B2_9EB26FDA544E_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -18.15
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 37.98,
   "image": "this.AnimatedImageResource_94CC68B0_13D6_95A8_41AB_3D516CAFEBBA",
   "pitch": -10.99,
   "yaw": -170.45,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_7676AAD0_13BA_B5E8_41AA_11CB8CE16872",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_7176E1A8_13B7_B7B9_419E_B2A83EBA5F99, this.camera_30ECF2E2_2493_DFE2_41A8_A54A8C0FEA0C); this.mainPlayList.set('selectedIndex', 70)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 37.98,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -170.45,
   "image": {
    "levels": [
     {
      "url": "media/panorama_71772D8C_13B6_6C78_41B2_9EB26FDA544E_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -10.99
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 21.35,
   "image": "this.AnimatedImageResource_94273887_13D6_9468_419B_021B89499B3B",
   "pitch": -10.03,
   "yaw": -126.95,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1D98A1F2_1213_9EFC_41AE_90E981188E90",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1C69EC6F_1232_65E3_41A9_5362BA7F1A83, this.camera_30C97DD6_2493_EA22_41B7_7F480C44A6BA); this.mainPlayList.set('selectedIndex', 28)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 21.35,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -126.95,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1D51A53A_1232_676C_419B_FB05E8EE5A1C_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -10.03
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.13,
   "image": "this.AnimatedImageResource_94275887_13D6_9468_4187_54913EB3B381",
   "pitch": -11.41,
   "yaw": -13.53,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_2265BE3F_136E_EC97_41A0_BBA79CB45A42",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1CC7CD8C_1233_E724_41A4_7036FC9FAFBA, this.camera_30D40DCA_2493_EA22_4195_50D527872602); this.mainPlayList.set('selectedIndex', 30)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 13.13,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -13.53,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1D51A53A_1232_676C_419B_FB05E8EE5A1C_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -11.41
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 31.28,
   "image": "this.AnimatedImageResource_941AD87B_13D6_9498_41B0_C02841D9A245",
   "pitch": -11.37,
   "yaw": -111.79,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1CFD2DB3_1216_A77C_416E_66DEBF97806A",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 10)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 31.28,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -111.79,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1E3E8A7F_1217_EDE4_41A9_9F5BCA609E87_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -11.37
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 30.69,
   "image": "this.AnimatedImageResource_941A687B_13D6_9498_41B1_247F7A8051A7",
   "pitch": -15.89,
   "yaw": 91.19,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1D4D7210_1216_9D3C_4171_0ADE2F42A7D4",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1ED7C008_1217_BD2C_41B0_159A6CBF8842, this.camera_37763D5F_2493_EA22_41B2_E7CB8289D839); this.mainPlayList.set('selectedIndex', 13)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 30.69,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 91.19,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1E3E8A7F_1217_EDE4_41A9_9F5BCA609E87_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -15.89
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.23,
   "image": "this.AnimatedImageResource_941D987B_13D6_9498_41A9_EF2517EE8769",
   "pitch": -8.89,
   "yaw": 148.76,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_0255BC19_1216_652F_41A6_C066A016D75E",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1C7AA7ED_1212_62E4_4189_A60955E10E08, this.camera_377CAD53_2493_EA22_419E_2F136E6716BD); this.mainPlayList.set('selectedIndex', 23)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 13.23,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 148.76,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1E3E8A7F_1217_EDE4_41A9_9F5BCA609E87_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.89
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 22.15,
   "image": "this.AnimatedImageResource_94C898AD_13D6_95B8_41B0_1BA5CF142AC1",
   "pitch": -3.24,
   "yaw": 97.14,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_74AA5A0C_13BA_7478_41B0_90F2D30D4E01",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_49AFE1F3_135A_97A8_4187_C6E968ACA6B8, this.camera_32225BF0_2493_EDFE_41AC_A048780260F0); this.mainPlayList.set('selectedIndex', 60)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 22.15,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 97.14,
   "image": {
    "levels": [
     {
      "url": "media/panorama_49AE96EF_135B_9DB8_419C_15F53F06D743_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -3.24
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 20.45,
   "image": "this.AnimatedImageResource_942CA890_13D6_9468_41AB_9701985D62AC",
   "pitch": -14.26,
   "yaw": -50.37,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1C8217D9_12AA_BB98_41AF_A2F3EC91AC0E",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1C74D9CF_122E_AF24_41AA_174DA8673956, this.camera_322DABE4_2493_EDE6_41AA_4AD089B141DE); this.mainPlayList.set('selectedIndex', 34)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 20.45,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -50.37,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1C745916_122E_6F24_41B0_E0BDC7980538_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -14.26
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 19.92,
   "image": "this.AnimatedImageResource_942CD890_13D6_9468_419C_390B32B96E98",
   "pitch": -19.28,
   "yaw": 130.51,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1CD5ECAE_12AA_6DB9_41A5_8E830ECB7E1B",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 44)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 19.92,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 130.51,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1C745916_122E_6F24_41B0_E0BDC7980538_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -19.28
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 24.29,
   "image": "this.AnimatedImageResource_94158876_13D6_94A8_41B1_4B3A1F39C4F4",
   "pitch": -20.16,
   "yaw": -113.8,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1CA6244A_121D_A52C_41A9_F6D1528CF2A2",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_027D9014_12BA_7468_41AE_B7601C694ED1, this.camera_37D68CA2_2493_EA62_41C0_491A61C54EA8); this.mainPlayList.set('selectedIndex', 43)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 24.29,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -113.8,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1E3059D8_1216_AF2D_4182_4B71A1D76684_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -20.16
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 24.37,
   "image": "this.AnimatedImageResource_94150876_13D6_94A8_41B1_836CDFDD4C27",
   "pitch": -19.66,
   "yaw": -4.02,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1D119548_121D_A72D_41AA_4E2453D72711",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1E351DCE_1216_A725_41AA_C2237F5681B0, this.camera_37D99C97_2493_EA22_41B5_7C30B812E492); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 24.37,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -4.02,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1E3059D8_1216_AF2D_4182_4B71A1D76684_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -19.66
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 25.72,
   "image": "this.AnimatedImageResource_94155876_13D6_94A8_41B1_2BBA759B777F",
   "pitch": -6.34,
   "yaw": 103.5,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1D48DAA0_121E_6D1C_41AC_DFD8A9F98E0B",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC, this.camera_37CE6CAE_2493_EA62_41A3_BF663610AA8C); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 25.72,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 103.5,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1E3059D8_1216_AF2D_4182_4B71A1D76684_1_HS_2_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.34
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 24.55,
   "image": "this.AnimatedImageResource_94149877_13D6_94A8_419B_CD498E0E5D8E",
   "pitch": 10.32,
   "yaw": 44.76,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1CE3126A_121E_BDEC_4197_7CA1B7E86B73",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1C5160C8_122D_9D2D_41B1_024A8D5AFA43, this.camera_37C4FCBA_2493_EA62_4195_03474AAADD22); this.mainPlayList.set('selectedIndex', 25)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 24.55,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 44.76,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1E3059D8_1216_AF2D_4182_4B71A1D76684_1_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 10.32
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 33.31,
   "image": "this.AnimatedImageResource_94C848AD_13D6_95B8_41A2_5BCA3E900FB3",
   "pitch": -25.56,
   "yaw": -163.04,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_76D5058D_13BA_BC78_41A5_583AEB626F68",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_49AFE1F3_135A_97A8_4187_C6E968ACA6B8, this.camera_32CA4046_2493_DA22_4197_B6B0F0995E66); this.mainPlayList.set('selectedIndex', 60)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 33.31,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -163.04,
   "image": {
    "levels": [
     {
      "url": "media/panorama_49AEEB3E_135B_F498_41A5_157725750FD2_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -25.56
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 25.94,
   "image": "this.AnimatedImageResource_943F58A1_13D6_95A8_41A0_A1403910D87D",
   "pitch": -6.85,
   "yaw": 80.01,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_45F47B1C_1355_B498_41AA_7A0F0BB39A3B",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1F7039BE_12B5_9798_41B0_325FFC1AF137, this.camera_31010F64_2493_E6E6_41B9_C9CC602654B7); this.mainPlayList.set('selectedIndex', 44)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 25.94,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 80.01,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5829C03C_1376_7498_41AC_130D2B81793F_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.85
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 24.24,
   "image": "this.AnimatedImageResource_943EE8A1_13D6_95A8_41A6_59172D820C55",
   "pitch": -21.92,
   "yaw": -126.49,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_44AAC325_135A_94A8_4193_14C3B5256996",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_49AF9DC3_135A_EFE8_41B0_A74AB8E7B2D6, this.camera_313BAF75_2493_E6E6_41B3_B9C9C4CA61C6); this.mainPlayList.set('selectedIndex', 59)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 24.24,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -126.49,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5829C03C_1376_7498_41AC_130D2B81793F_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -21.92
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 24.64,
   "image": "this.AnimatedImageResource_94C998AC_13D6_95B8_4142_C63842FDD74C",
   "pitch": -19.41,
   "yaw": 5.15,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_718BB5E3_13AE_9FA8_4182_522CA66C1E11",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_7176E1A8_13B7_B7B9_419E_B2A83EBA5F99, this.camera_37E40CDD_2493_EA26_41BE_4D3B593C15DE); this.mainPlayList.set('selectedIndex', 70)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 24.64,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 5.15,
   "image": {
    "levels": [
     {
      "url": "media/panorama_49AF6E44_135A_6CE9_414A_9C058452CF94_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -19.41
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 44.75,
   "image": "this.AnimatedImageResource_94C948AC_13D6_95B8_41B0_AF0157E5C992",
   "pitch": -19.53,
   "yaw": 146.71,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_79C14A31_13B6_74A8_41B2_DDBEB87B1F17",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_49AEC247_135B_B4E8_41A5_746131D61342, this.camera_37F32CD1_2493_EA3E_41BF_19352CA864B8); this.mainPlayList.set('selectedIndex', 64)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 44.75,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 146.71,
   "image": {
    "levels": [
     {
      "url": "media/panorama_49AF6E44_135A_6CE9_414A_9C058452CF94_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -19.53
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 40.25,
   "image": "this.AnimatedImageResource_94C648AC_13D6_95B8_41B1_1C9C7F870993",
   "pitch": -10.61,
   "yaw": 114.05,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_78305CD8_13B6_6D98_4181_5A0AB08E5EEE",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_5EF35374_136E_B4A8_4191_7E72995B3ECD, this.camera_308C7275_2493_DEE6_4191_80322A1039AF); this.mainPlayList.set('selectedIndex', 58)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 40.25,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 114.05,
   "image": {
    "levels": [
     {
      "url": "media/panorama_49AEC247_135B_B4E8_41A5_746131D61342_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -10.61
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 46.22,
   "image": "this.AnimatedImageResource_94C928AD_13D6_95B8_41AF_EA0EC1566E15",
   "pitch": -13.25,
   "yaw": -54.77,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_787331BD_13B5_9798_419B_07EA5F7278D9",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_49AF6E44_135A_6CE9_414A_9C058452CF94, this.camera_309AE269_2493_DEEE_41B9_7E6315394002); this.mainPlayList.set('selectedIndex', 63)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 46.22,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -54.77,
   "image": {
    "levels": [
     {
      "url": "media/panorama_49AEC247_135B_B4E8_41A5_746131D61342_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -13.25
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 06a Right"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 36.2,
   "image": "this.AnimatedImageResource_943B189E_13D6_9598_41A2_5054294203D8",
   "pitch": -20.66,
   "yaw": 142.07,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_1DA96FB6_12AB_ABA8_417A_2178CB02BCAD",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 54)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 36.2,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 142.07,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1F769998_12AA_9798_41A9_9421299474C3_1_HS_0_0_0_map.gif",
      "width": 51,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -20.66
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 06a Left-Up"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 32.05,
   "image": "this.AnimatedImageResource_943AF89E_13D6_9598_4170_C5205039A85E",
   "pitch": -2.58,
   "yaw": 18.43,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_0053C474_12AA_FCA8_419F_A52EB4B894BD",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1F76471E_12AA_BC99_417D_DD5A2084733C, this.camera_31B73EB8_2493_E66E_41C0_202DC47ABE21); this.mainPlayList.set('selectedIndex', 50)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 32.05,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 18.43,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1F769998_12AA_9798_41A9_9421299474C3_1_HS_1_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -2.58
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 20.16,
   "image": "this.AnimatedImageResource_941FB881_13D6_9468_41A4_7C58BD20E19A",
   "pitch": -14.76,
   "yaw": 25.88,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1CBCD90E_1216_EF25_417B_8C373F237210",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1ED7C008_1217_BD2C_41B0_159A6CBF8842, this.camera_31622FFF_2493_E5E2_41C2_1B4F9749BDD9); this.mainPlayList.set('selectedIndex', 13)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 20.16,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 25.88,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1EF5F0E8_1217_9EEC_4186_EB28B5BB56EA_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -14.76
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 25.64,
   "image": "this.AnimatedImageResource_9418387A_13D6_9498_41B0_83993DF03199",
   "pitch": -13.63,
   "yaw": -109.03,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1C904779_1212_63EC_41B1_E4B0F83824DC",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1E31C113_1217_9F23_41AF_9721C1EE070D, this.camera_31D15EDB_2493_E622_41BA_2DBF798DA881); this.mainPlayList.set('selectedIndex', 9)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 25.64,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -109.03,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1E2C3554_1217_A725_41A3_8E48640695C2_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -13.63
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 21.37,
   "image": "this.AnimatedImageResource_9418587A_13D6_9498_41B0_25DBA5DC336B",
   "pitch": -17.15,
   "yaw": 46.22,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1CFAEBEF_1215_A2E3_4184_543FCBB4B1D7",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1E36C7D9_1217_E32F_419A_CA22B2D4E0D8, this.camera_31A9AEC4_2493_E626_41C1_119905F79C65); this.mainPlayList.set('selectedIndex', 11)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 21.37,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 46.22,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1E2C3554_1217_A725_41A3_8E48640695C2_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -17.15
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 19.79,
   "image": "this.AnimatedImageResource_941BE87A_13D6_9498_41B1_7C5BB52FC330",
   "pitch": -6.63,
   "yaw": 136.95,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1DB396D8_1215_A52C_4199_745955ADFD84",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1C79B467_1212_65E4_41A9_397DB7948749, this.camera_31DDBECF_2493_E622_41C0_E7FAFBF3095C); this.mainPlayList.set('selectedIndex', 22)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 19.79,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 136.95,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1E2C3554_1217_A725_41A3_8E48640695C2_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.63
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 37.29,
   "image": "this.AnimatedImageResource_9436C89C_13D6_9598_41A4_06AB8F542AF5",
   "pitch": -20.03,
   "yaw": -171.46,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1CFE408D_12AF_B47B_41B0_89091D51B03A",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1F76471E_12AA_BC99_417D_DD5A2084733C, this.camera_371F51AE_2493_DA62_41B3_5A132B9C486F); this.mainPlayList.set('selectedIndex', 50)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 37.29,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -171.46,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1F7646C7_12AA_9DF7_41A3_6118C47853B8_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -20.03
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 38.51,
   "image": "this.AnimatedImageResource_9436589C_13D6_9598_41A8_5F4CA04DA186",
   "pitch": -14.01,
   "yaw": -77.5,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1CC33FE1_12AF_ABA8_41B1_D77C0579FD6F",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_5EF35374_136E_B4A8_4191_7E72995B3ECD, this.camera_3710F1C5_2493_DA26_41BE_7A6A48DD02BB); this.mainPlayList.set('selectedIndex', 58)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 38.51,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -77.5,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1F7646C7_12AA_9DF7_41A3_6118C47853B8_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -14.01
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 39,
   "image": "this.AnimatedImageResource_9439289D_13D6_9598_41B0_9EB96459EDFD",
   "pitch": -10.74,
   "yaw": 11.68,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1C77300A_12AF_F479_41B0_5F6EB8A5A65F",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1F53F5D9_12AA_FF98_41A3_6B669E91923B, this.camera_371A51BA_2493_DA62_418E_96B1694AB6CB); this.mainPlayList.set('selectedIndex', 48)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 39,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 11.68,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1F7646C7_12AA_9DF7_41A3_6118C47853B8_1_HS_2_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -10.74
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 21.66,
   "image": "this.AnimatedImageResource_94257886_13D6_9468_41AC_242EE28E7E81",
   "pitch": -2.49,
   "yaw": -134.99,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1C83A7D0_1232_A33C_41AB_91E4712EE930",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1C5160C8_122D_9D2D_41B1_024A8D5AFA43, this.camera_32704C13_2493_EA23_418E_8C68A2EB1F00); this.mainPlayList.set('selectedIndex', 25)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 21.66,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -134.99,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1C4E751F_122D_E723_41A5_6A1A4D3D0A25_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -2.49
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 31.56,
   "image": "this.AnimatedImageResource_943A789E_13D6_9598_41AC_1C8B47AAFFB0",
   "pitch": -8.48,
   "yaw": -15.32,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1C3FED55_12AA_6CE8_41AE_E741D35B25FC",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1F2B6CEB_12D6_6DB8_41B2_62922D3306B8, this.camera_372BAD23_2493_EA62_41B7_2B96ACECE6AA); this.mainPlayList.set('selectedIndex', 54)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 31.56,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -15.32,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1F7170A8_12AD_95B9_41B0_69B3D2D511F0_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.48
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 34.56,
   "image": "this.AnimatedImageResource_943DC89F_13D6_9598_41B3_2587901AC924",
   "pitch": -8.23,
   "yaw": 44.72,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1F35866D_12D5_9CBB_41A6_4D0C53613475",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 51)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 34.56,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 44.72,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1F7170A8_12AD_95B9_41B0_69B3D2D511F0_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.23
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 34.36,
   "image": "this.AnimatedImageResource_943AC89F_13D6_9598_41B0_105CBDC0DDD8",
   "pitch": -10.24,
   "yaw": -97.73,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1C4AD35E_12D5_B498_41A7_891AB5E22572",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1D2C1F2A_12D5_ACB8_41B0_5142BEAE6714, this.camera_375CFD2F_2493_EA62_4195_08809A619930); this.mainPlayList.set('selectedIndex', 53)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 34.36,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -97.73,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1F7170A8_12AD_95B9_41B0_69B3D2D511F0_1_HS_2_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -10.24
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 28.11,
   "image": "this.AnimatedImageResource_9421F883_13D6_9468_4197_5A3CE3332517",
   "pitch": -24.56,
   "yaw": -114.56,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1CAC8D5D_122E_A727_4177_B3860FDBAABB",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1ED7C008_1217_BD2C_41B0_159A6CBF8842, this.camera_305D9335_2493_DE66_41A8_DFA8922F09C2); this.mainPlayList.set('selectedIndex', 13)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 28.11,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -114.56,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1C6C0918_1212_EF2D_41AA_8CB6E207B7CA_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -24.56
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 22.11,
   "image": "this.AnimatedImageResource_94211884_13D6_9468_41A9_EC3E00E2C897",
   "pitch": -0.69,
   "yaw": 56.65,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1CD824EB_122E_66E3_41B1_10BA8B2E6D14",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1D835FBE_1212_A364_41A6_D59FED93F3EB, this.camera_3029E329_2493_DE6E_418F_F9E67B7F1895); this.mainPlayList.set('selectedIndex', 18)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 22.11,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 56.65,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1C6C0918_1212_EF2D_41AA_8CB6E207B7CA_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.69
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 25.06,
   "image": "this.AnimatedImageResource_9413C875_13D6_94A8_41AF_0F17EFF2E170",
   "pitch": -14.38,
   "yaw": -115.06,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1FC698B9_1212_AD6F_4187_3AD510ACD884",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1E3059D8_1216_AF2D_4182_4B71A1D76684, this.camera_30C792C9_2493_DE2E_41A8_CC6AF260D524); this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 25.06,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -115.06,
   "image": {
    "levels": [
     {
      "url": "media/panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -14.38
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 25.65,
   "image": "this.AnimatedImageResource_94133875_13D6_94A8_41B1_B2BE209C0013",
   "pitch": -7.6,
   "yaw": 42.71,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1C101505_1212_E724_4178_FBFCF3CF198E",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1C4B5BF2_122D_A2FC_419B_609BAA032087, this.camera_30AC5299_2493_DE2E_4180_F46C7186A4EC); this.mainPlayList.set('selectedIndex', 24)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 25.65,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 42.71,
   "image": {
    "levels": [
     {
      "url": "media/panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -7.6
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 24.52,
   "image": "this.AnimatedImageResource_9412B875_13D6_94A8_41B0_4DE8491AE809",
   "pitch": -18.65,
   "yaw": -11.81,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1C8B63C0_1212_E31C_4170_41546F365260",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1F1F5301_1216_A31C_41A0_CF4AED19D1F5, this.camera_30DB22B1_2493_DE7E_4163_4283192415AE); this.mainPlayList.set('selectedIndex', 17)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 24.52,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -11.81,
   "image": {
    "levels": [
     {
      "url": "media/panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC_1_HS_2_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -18.65
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 25.66,
   "image": "this.AnimatedImageResource_9412D876_13D6_94A8_41B2_725079A747E5",
   "pitch": -7.35,
   "yaw": 107.02,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1D775DA8_1212_A76D_41AD_4917755B7ED5",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_0154F527_0C22_07FC_4193_06409B7D0536, this.camera_30CC62BD_2493_DE66_41C1_0F60EF0A11A3); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 25.66,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 107.02,
   "image": {
    "levels": [
     {
      "url": "media/panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC_1_HS_3_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -7.35
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 20.91,
   "image": "this.AnimatedImageResource_9770FDDD_13EB_AF9B_41AB_EB7B8822CA23",
   "pitch": -2.49,
   "yaw": -63.02,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1D7C03B7_121D_E364_41B0_97CDAEEE1DFA",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1C5160C8_122D_9D2D_41B1_024A8D5AFA43, this.camera_30A1A2A5_2493_DE66_41C0_AE15BD1523FF); this.mainPlayList.set('selectedIndex', 25)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 20.91,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -63.02,
   "image": {
    "levels": [
     {
      "url": "media/panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC_0_HS_4_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -2.49
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 21.35,
   "image": "this.AnimatedImageResource_94238884_13D6_9468_41AC_248B24B66125",
   "pitch": -10.03,
   "yaw": 4.94,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1CB4F5AA_122E_676C_41A2_8A0B8BF69063",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1E3E8A7F_1217_EDE4_41A9_9F5BCA609E87, this.camera_301512FA_2493_DFE2_418E_00B14001B72E); this.mainPlayList.set('selectedIndex', 12)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 21.35,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 4.94,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1C7AA7ED_1212_62E4_4189_A60955E10E08_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -10.03
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Arrow 03"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 28.01,
   "image": "this.AnimatedImageResource_943FC8A1_13D6_95A8_4170_2575470DC3C1",
   "pitch": -10.28,
   "yaw": -53.72,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1C7ED5AC_12DB_FFB8_41A1_14BAF639DE23",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1F2B6CEB_12D6_6DB8_41B2_62922D3306B8, this.camera_30F8C2D5_2493_DE26_41B1_916985FFB1EB); this.mainPlayList.set('selectedIndex', 54)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 28.01,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -53.72,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1F2B9277_12D6_B497_418D_A66B17178836_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -10.28
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 19.16,
   "image": "this.AnimatedImageResource_941D087B_13D6_9498_41B1_8E4168D1F5F6",
   "pitch": -7.85,
   "yaw": -76.87,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1D5AB790_1217_A33D_418E_1AAEC50485DA",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1E3E8A7F_1217_EDE4_41A9_9F5BCA609E87, this.camera_37554222_2493_DE62_41A1_1E0F6C6F07E1); this.mainPlayList.set('selectedIndex', 12)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 19.16,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -76.87,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1ED7C008_1217_BD2C_41B0_159A6CBF8842_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -7.85
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 20.62,
   "image": "this.AnimatedImageResource_941D587B_13D6_949F_41AC_FABF73EF6070",
   "pitch": -8.48,
   "yaw": -124.1,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1C53DCAA_1217_E56C_41A2_B50AA6DE8753",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1EF5F0E8_1217_9EEC_4186_EB28B5BB56EA, this.camera_3740223A_2493_DE62_41B2_97086A8BC350); this.mainPlayList.set('selectedIndex', 14)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 20.62,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -124.1,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1ED7C008_1217_BD2C_41B0_159A6CBF8842_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.48
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 21.88,
   "image": "this.AnimatedImageResource_941CF881_13D6_9468_41AD_778797A730B3",
   "pitch": -18.78,
   "yaw": 146.84,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1D1CBE6C_1217_A5E4_4190_E48981A49832",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1E590196_1216_7F24_41A7_D1A1589C2A9E, this.camera_374E722E_2493_DE62_419E_495E1B7F8590); this.mainPlayList.set('selectedIndex', 15)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 21.88,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 146.84,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1ED7C008_1217_BD2C_41B0_159A6CBF8842_1_HS_2_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -18.78
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.39,
   "image": "this.AnimatedImageResource_941C3881_13D6_9468_419D_341125FEDC7A",
   "pitch": -1.36,
   "yaw": 70.88,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1CABF008_1216_9D2D_41A4_05E11BD0513B",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1C6C0918_1212_EF2D_41AA_8CB6E207B7CA, this.camera_37238216_2493_DE22_41B2_31CD0EBA68FF); this.mainPlayList.set('selectedIndex', 19)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 13.39,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 70.88,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1ED7C008_1217_BD2C_41B0_159A6CBF8842_1_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -1.36
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 32.19,
   "image": "this.AnimatedImageResource_94C408AA_13D6_95B8_4195_D4436F34E17E",
   "pitch": -22.8,
   "yaw": 63.81,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_7253670E_13AA_9C78_417F_14115AC43921",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_49AFE1F3_135A_97A8_4187_C6E968ACA6B8, this.camera_32FCDB9E_2493_EE22_41C0_867E8503910B); this.mainPlayList.set('selectedIndex', 60)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 32.19,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 63.81,
   "image": {
    "levels": [
     {
      "url": "media/panorama_49AFA632_135A_BCA9_41A2_1F29C0D05566_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -22.8
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 25.83,
   "image": "this.AnimatedImageResource_94C7F8AA_13D6_95B8_4191_BE628A8A114C",
   "pitch": -8.6,
   "yaw": -90.31,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_729EDB84_13AA_F468_41A1_53A8EAA06C7A",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_49AF6A22_135A_94A9_41AA_E036F21F6533, this.camera_32F04BAA_2493_EE62_41BE_2760C1F279AC); this.mainPlayList.set('selectedIndex', 62)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 25.83,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -90.31,
   "image": {
    "levels": [
     {
      "url": "media/panorama_49AFA632_135A_BCA9_41A2_1F29C0D05566_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.6
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 26.01,
   "image": "this.AnimatedImageResource_94CFF8B0_13D6_95A8_41AF_481EBCE5DFEB",
   "pitch": -5.34,
   "yaw": 95.84,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_71AB0DA6_13B6_6FA8_419D_8E6CF03C5B23",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_49AF6A22_135A_94A9_41AA_E036F21F6533, this.camera_37E8E196_2493_DA22_41B6_B77352EE0E18); this.mainPlayList.set('selectedIndex', 62)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 26.01,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 95.84,
   "image": {
    "levels": [
     {
      "url": "media/panorama_7176E1A8_13B7_B7B9_419E_B2A83EBA5F99_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -5.34
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 25.78,
   "image": "this.AnimatedImageResource_94CEB8B0_13D6_95A8_418E_7A84F2A65EA3",
   "pitch": -9.36,
   "yaw": -0.88,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_71C42C77_13B6_6C97_41B2_9730DE4C9557",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_71772D8C_13B6_6C78_41B2_9EB26FDA544E, this.camera_37E131A2_2493_DA62_41B8_9E01413C4907); this.mainPlayList.set('selectedIndex', 69)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 25.78,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -0.88,
   "image": {
    "levels": [
     {
      "url": "media/panorama_7176E1A8_13B7_B7B9_419E_B2A83EBA5F99_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -9.36
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 25.57,
   "image": "this.AnimatedImageResource_94CE68B1_13D6_95A8_4185_387AD5823AB9",
   "pitch": -11.87,
   "yaw": -164.17,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_7023A8E1_13B6_95A8_41B0_D54576255D4E",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_49AF6E44_135A_6CE9_414A_9C058452CF94, this.camera_37EDD18B_2493_DA22_41B4_9171D58789DB); this.mainPlayList.set('selectedIndex', 63)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 25.57,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -164.17,
   "image": {
    "levels": [
     {
      "url": "media/panorama_7176E1A8_13B7_B7B9_419E_B2A83EBA5F99_1_HS_2_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -11.87
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 25.39,
   "image": "this.AnimatedImageResource_97321E1B_13EB_AC9F_41A0_B59489FEFB72",
   "pitch": -13.63,
   "yaw": -48.86,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_60206EAA_13EA_6DB8_416E_9E1FF412C636",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_7178E80E_13B6_9478_4187_6F7683DD2190, this.camera_37F7A17F_2493_DAE2_41B5_D2B611D18452); this.mainPlayList.set('selectedIndex', 68)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 25.39,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -48.86,
   "image": {
    "levels": [
     {
      "url": "media/panorama_7176E1A8_13B7_B7B9_419E_B2A83EBA5F99_0_HS_3_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -13.63
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Arrow 03"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.39,
   "image": "this.AnimatedImageResource_94CA78AF_13D6_95B8_41B1_03C1E5698E4F",
   "pitch": 1.66,
   "yaw": 17.12,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_74D65B57_13BE_9497_419C_9D0189F1C352",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_7719D67F_13B6_9C98_41A2_D5E02E95A3B2, this.camera_30A2ADBE_2493_EA62_41A7_1C8C972CEC5A); this.mainPlayList.set('selectedIndex', 67)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 13.39,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 17.12,
   "image": {
    "levels": [
     {
      "url": "media/panorama_7178E80E_13B6_9478_4187_6F7683DD2190_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.66
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 46.02,
   "image": "this.AnimatedImageResource_94CD28AF_13D6_95B8_41A5_0CE359333778",
   "pitch": -14.26,
   "yaw": 113.3,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_799FF1DA_13B6_B798_41A4_50BC7DBAEA54",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_7176E1A8_13B7_B7B9_419E_B2A83EBA5F99, this.camera_30A99DB2_2493_EA62_41A3_8FF3DE68AF76); this.mainPlayList.set('selectedIndex', 70)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 46.02,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 113.3,
   "image": {
    "levels": [
     {
      "url": "media/panorama_7178E80E_13B6_9478_4187_6F7683DD2190_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -14.26
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 19,
   "image": "this.AnimatedImageResource_941E7883_13D6_9468_41A7_219493B29B42",
   "pitch": -24.31,
   "yaw": 74.86,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1C9312D5_122E_9D24_41A3_8D20E52FEFA5",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1C6C0918_1212_EF2D_41AA_8CB6E207B7CA, this.camera_374B6D47_2493_EA22_41A5_6736FE8B4A50); this.mainPlayList.set('selectedIndex', 19)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 19,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 74.86,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1D835FBE_1212_A364_41A6_D59FED93F3EB_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -24.31
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 26.08,
   "image": "this.AnimatedImageResource_94C048A3_13D6_95A8_41AA_26AD225DB6F3",
   "pitch": -3.58,
   "yaw": 88.3,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_72FB603B_1357_B498_41A8_7682D801DB0F",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_5829C03C_1376_7498_41AC_130D2B81793F, this.camera_32E9505E_2493_DA22_418E_CE98BD6154AF); this.mainPlayList.set('selectedIndex', 56)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 26.08,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 88.3,
   "image": {
    "levels": [
     {
      "url": "media/panorama_49AF9DC3_135A_EFE8_41B0_A74AB8E7B2D6_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -3.58
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 25.1,
   "image": "this.AnimatedImageResource_94C3D8A3_13D6_95A8_4196_20407A0566A1",
   "pitch": -16.14,
   "yaw": -104.88,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_710A5280_1357_9468_41A5_8B0C26B954B0",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_49AFE1F3_135A_97A8_4187_C6E968ACA6B8, this.camera_321F206A_2493_DAE2_41C2_4D4A2FE5E025); this.mainPlayList.set('selectedIndex', 60)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 25.1,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -104.88,
   "image": {
    "levels": [
     {
      "url": "media/panorama_49AF9DC3_135A_EFE8_41B0_A74AB8E7B2D6_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -16.14
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 27.98,
   "image": "this.AnimatedImageResource_94194879_13D6_9498_419A_9F0852F872D9",
   "pitch": -28.7,
   "yaw": -126.87,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1C9577A2_1212_A31C_41AF_9BB2E924C67E",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1E3E2E98_1216_652C_418E_1DBFF6445B9F, this.camera_37C24168_2493_DAEE_41BD_E25B50C09C50); this.mainPlayList.set('selectedIndex', 8)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 27.98,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -126.87,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1E31C113_1217_9F23_41AF_9721C1EE070D_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -28.7
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 24.35,
   "image": "this.AnimatedImageResource_94189879_13D6_9498_4191_2C5D6F238653",
   "pitch": -19.78,
   "yaw": 43.71,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1D8FB606_1212_A524_41B0_C121C8F56D54",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1E2C3554_1217_A725_41A3_8E48640695C2, this.camera_37F88174_2493_DAE6_4197_D24A8680618A); this.mainPlayList.set('selectedIndex', 10)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 24.35,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 43.71,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1E31C113_1217_9F23_41AF_9721C1EE070D_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -19.78
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 29.17,
   "image": "this.AnimatedImageResource_942B588F_13D6_9478_41B2_7A523D2A5848",
   "pitch": -8.14,
   "yaw": -162.75,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1C7BC23C_12AA_B498_41AF_F729EB318E24",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1C74B41E_122E_A525_418F_5DB5C0137B9B, this.camera_37C6F15C_2493_DA26_419B_72B3DC3C3045); this.mainPlayList.set('selectedIndex', 33)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 29.17,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -162.75,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1C749FB8_122E_E36C_4193_79DF9A264D45_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.14
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 17.73,
   "image": "this.AnimatedImageResource_9428388E_13D6_9478_41B0_29E153A67088",
   "pitch": -3.05,
   "yaw": -4.44,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1CACDF8D_12AA_6C78_41A4_08CA5974F831",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1C74B41E_122E_A525_418F_5DB5C0137B9B, this.camera_37059D00_2493_EA1E_41BB_29770A616EA0); this.mainPlayList.set('selectedIndex', 33)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 17.73,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -4.44,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1C74D9CF_122E_AF24_41AA_174DA8673956_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -3.05
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 26.08,
   "image": "this.AnimatedImageResource_9428588F_13D6_9478_4196_0609BA3EB297",
   "pitch": -16.02,
   "yaw": 167.19,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1C086FEC_12AA_ABB8_41A0_393080691617",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1C745916_122E_6F24_41B0_E0BDC7980538, this.camera_37108CF4_2493_EBE6_41BA_319DD2E74029); this.mainPlayList.set('selectedIndex', 38)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 26.08,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 167.19,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1C74D9CF_122E_AF24_41AA_174DA8673956_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -16.02
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 26.3,
   "image": "this.AnimatedImageResource_942B288F_13D6_9478_41AC_A58DB80A4C70",
   "pitch": -14.26,
   "yaw": -102.12,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1D88450E_12AA_9C78_41A1_6D2BAFAB6718",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1C5A781B_122F_AD2C_419A_D55C87F1D7C4, this.camera_373F1D0C_2493_EA26_41AB_6B5D5E094941); this.mainPlayList.set('selectedIndex', 41)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 26.3,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -102.12,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1C74D9CF_122E_AF24_41AA_174DA8673956_1_HS_2_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -14.26
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 36.85,
   "image": "this.AnimatedImageResource_9430E893_13D6_9468_4172_2120FDD36A96",
   "pitch": -10.11,
   "yaw": 53.51,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1C0438D1_12B6_F5E8_41B1_5A31F3EACBB4",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_027D9014_12BA_7468_41AE_B7601C694ED1, this.camera_3030EE36_2493_E662_41AC_C2067AABA567); this.mainPlayList.set('selectedIndex', 43)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 36.85,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 53.51,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1F7039BE_12B5_9798_41B0_325FFC1AF137_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -10.11
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 23.59,
   "image": "this.AnimatedImageResource_94306894_13D6_9468_41AF_EC6310DBE930",
   "pitch": -16.64,
   "yaw": -131.51,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1F62F511_12B6_9C68_41B0_F2A561B49BE3",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1D4CDF0B_12AA_AC78_4190_C5BCACDF8F2B, this.camera_303F3E2A_2493_E662_4190_16E250A01BF6); this.mainPlayList.set('selectedIndex', 47)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 23.59,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -131.51,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1F7039BE_12B5_9798_41B0_325FFC1AF137_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -16.64
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13,
   "image": "this.AnimatedImageResource_9433E894_13D6_9468_4197_330ADA36CA17",
   "pitch": 13.97,
   "yaw": 138.21,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1DD0CF36_12AA_ACA8_41AF_2D4849CDE734",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1D392500_12B5_BC69_41B1_8B4E63350F5E, this.camera_30252E42_2493_E622_41BB_53B9A69D2859); this.mainPlayList.set('selectedIndex', 46)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 13,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 138.21,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1F7039BE_12B5_9798_41B0_325FFC1AF137_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 13.97
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.9,
   "image": "this.AnimatedImageResource_94337894_13D6_9468_4170_D19E0EEEB7AE",
   "pitch": -22.8,
   "yaw": -46.35,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_55E3A4B5_1375_9DAB_41AA_D941D0ADF02C",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_5829C03C_1376_7498_41AC_130D2B81793F, this.camera_30592E4E_2493_E622_41B1_D87B49F85125); this.mainPlayList.set('selectedIndex', 56)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 13.9,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -46.35,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1F7039BE_12B5_9798_41B0_325FFC1AF137_1_HS_3_0_0_map.gif",
      "width": 32,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -22.8
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 35.41,
   "image": "this.AnimatedImageResource_9432D895_13D6_9468_4193_14B0F3D08239",
   "pitch": -18.9,
   "yaw": 126.11,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1C9C8B75_12B6_94A8_4196_7E8296AD2638",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_027D9014_12BA_7468_41AE_B7601C694ED1, this.camera_370461DD_2493_DA26_41B7_03CDD049EC2F); this.mainPlayList.set('selectedIndex', 43)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 35.41,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 126.11,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1C461727_12B7_9CA8_41A0_02E993644282_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -18.9
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 30.85,
   "image": "this.AnimatedImageResource_94177878_13D6_9498_41A6_EACB7D8E6E06",
   "pitch": -10.74,
   "yaw": -24.12,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1C946A25_1212_AD64_4188_6D587C73AD36",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1E3E2E98_1216_652C_418E_1DBFF6445B9F, this.camera_33AC70FB_2493_DBE2_41BB_2F0C62C07BA4); this.mainPlayList.set('selectedIndex', 8)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 30.85,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -24.12,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1E3E7C89_1216_A52F_41B0_E95358B2767C_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -10.74
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 33.5,
   "image": "this.AnimatedImageResource_9416B878_13D6_9498_41AA_33E29BCEF63C",
   "pitch": -21.17,
   "yaw": -111.04,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1CC21177_1212_9FE4_4183_54AC54E3A313",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1C7411C6_122E_7F24_4183_991262FE3F99, this.camera_33DDA107_2493_DA22_41B8_541685AE5763); this.mainPlayList.set('selectedIndex', 32)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 33.5,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -111.04,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1E3E7C89_1216_A52F_41B0_E95358B2767C_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -21.17
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 31.15,
   "image": "this.AnimatedImageResource_94163879_13D6_9498_415E_9371142A636C",
   "pitch": -22.3,
   "yaw": 144.83,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1D2CAD93_1212_E73C_41A0_B46C20AF051A",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1E35133E_1216_E365_418A_E512CC92AE96, this.camera_33BE90EF_2493_DBE2_41BB_25BAE2D4CE76); this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 31.15,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 144.83,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1E3E7C89_1216_A52F_41B0_E95358B2767C_1_HS_2_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -22.3
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 24.97,
   "image": "this.AnimatedImageResource_94298888_13D6_9478_41A6_F780DA5C92DB",
   "pitch": -23.05,
   "yaw": -124.23,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1D577A19_1216_6D2C_418F_8E733FBA060C",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1C74D9CF_122E_AF24_41AA_174DA8673956, this.camera_3047FE66_2493_E6E2_41AE_8AA615793DA3); this.mainPlayList.set('selectedIndex', 34)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 24.97,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -124.23,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1C74B41E_122E_A525_418F_5DB5C0137B9B_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -23.05
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 25.53,
   "image": "this.AnimatedImageResource_94290889_13D6_9478_41B0_EAB9B4B93956",
   "pitch": -19.78,
   "yaw": 55.14,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1DEDAB27_1217_A364_41B0_0B8E13CAB3FE",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1C7411C6_122E_7F24_4183_991262FE3F99, this.camera_30784E71_2493_E6FE_41BF_FDF52A7A4A3D); this.mainPlayList.set('selectedIndex', 32)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 25.53,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 55.14,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1C74B41E_122E_A525_418F_5DB5C0137B9B_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -19.78
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 18.4,
   "image": "this.AnimatedImageResource_9428B889_13D6_9478_41A5_8439477C33BD",
   "pitch": 2.41,
   "yaw": -13.53,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1D0BEBC2_12AD_ABE8_41B1_ED3A34FDD43B",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1C749FB8_122E_E36C_4193_79DF9A264D45, this.camera_3053DE5A_2493_E622_41B4_5A31E4A4F11C); this.mainPlayList.set('selectedIndex', 35)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 18.4,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -13.53,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1C74B41E_122E_A525_418F_5DB5C0137B9B_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 2.41
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 21.18,
   "image": "this.AnimatedImageResource_66228586_13DE_7C69_41B2_4F28E8B26C50",
   "pitch": -8.77,
   "yaw": -5.24,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_62C33E56_13DE_ACE9_4197_4222F9D5BF58",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1E3E2E98_1216_652C_418E_1DBFF6445B9F, this.camera_37569D3C_2493_EA66_419C_30464AEA1F1C); this.mainPlayList.set('selectedIndex', 8)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 21.18,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -5.24,
   "image": {
    "levels": [
     {
      "url": "media/panorama_618DAC0E_13DE_AC79_41B1_10B967991445_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.77
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 24.3,
   "image": "this.AnimatedImageResource_94325895_13D6_9468_419B_C33FAE1426BA",
   "pitch": -6.38,
   "yaw": -55.73,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1D9F8BD7_12AA_6BE8_41A2_7CE5244C8754",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1F7039BE_12B5_9798_41B0_325FFC1AF137, this.camera_37A26C8B_2493_EA22_419B_D3E2A9978A2F); this.mainPlayList.set('selectedIndex', 44)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 24.3,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -55.73,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1D392500_12B5_BC69_41B1_8B4E63350F5E_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.38
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 24.87,
   "image": "this.AnimatedImageResource_942AC88F_13D6_9478_4163_FBE5142F854A",
   "pitch": -23.55,
   "yaw": 58.91,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1CA887C2_12AA_9BE8_4160_E2185E3BE306",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 34)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 24.87,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 58.91,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1C74934B_122E_A32C_41AF_0A51BBA11B42_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -23.55
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 29.35,
   "image": "this.AnimatedImageResource_942A5890_13D6_9468_41A3_2D15E1165A5A",
   "pitch": -5.13,
   "yaw": -20.56,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1C848582_12AB_BC69_41A9_08EBDF913410",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1C7416BE_122E_A565_41A7_E6DAA86F5840, this.camera_32B64022_2493_DA62_41A5_0508EA819434); this.mainPlayList.set('selectedIndex', 37)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 29.35,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -20.56,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1C74934B_122E_A32C_41AF_0A51BBA11B42_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -5.13
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 20.67,
   "image": "this.AnimatedImageResource_9420A884_13D6_9468_41AC_566B3EA28843",
   "pitch": 17.61,
   "yaw": -37.27,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_031A365A_122E_652D_417E_B90DA7D15DD2",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 13)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 20.67,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -37.27,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1C6FEA43_1212_ED23_419C_BCE14B6B6A04_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 17.61
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 25.7,
   "image": "this.AnimatedImageResource_94C2B8A3_13D6_95A8_4191_3C2E4628A6F9",
   "pitch": -10.36,
   "yaw": 96.09,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_4EB441CC_1355_97F8_41A1_CE3B7B0403E0",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_49AF9DC3_135A_EFE8_41B0_A74AB8E7B2D6, this.camera_30E85DFA_2493_E5E2_4183_1BC3F89A3964); this.mainPlayList.set('selectedIndex', 59)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 25.7,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 96.09,
   "image": {
    "levels": [
     {
      "url": "media/panorama_49AFE1F3_135A_97A8_4187_C6E968ACA6B8_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -10.36
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 25.19,
   "image": "this.AnimatedImageResource_94C248A4_13D6_95A8_41B2_B7497B467EA2",
   "pitch": -15.39,
   "yaw": 15.2,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_4EC542AD_1355_B5B8_4195_49DDEE30B0C5",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_49AEEB3E_135B_F498_41A5_157725750FD2, this.camera_30F42DEE_2493_E5E2_41B9_64DF20EA62B2); this.mainPlayList.set('selectedIndex', 66)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 25.19,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 15.2,
   "image": {
    "levels": [
     {
      "url": "media/panorama_49AFE1F3_135A_97A8_4187_C6E968ACA6B8_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -15.39
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.32,
   "image": "this.AnimatedImageResource_94C5D8A4_13D6_95A8_4196_637E566A987E",
   "pitch": -6.13,
   "yaw": -65.78,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_4E9C0D1D_13AA_AC9B_41AB_C947C61E59ED",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_49AE96EF_135B_9DB8_419C_15F53F06D743, this.camera_30E2BE06_2493_E622_4161_728E76A5A316); this.mainPlayList.set('selectedIndex', 65)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 13.32,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -65.78,
   "image": {
    "levels": [
     {
      "url": "media/panorama_49AFE1F3_135A_97A8_4187_C6E968ACA6B8_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.13
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 25.85,
   "image": "this.AnimatedImageResource_94C4A8A5_13D6_95A8_41A7_B28E25D22B71",
   "pitch": -8.35,
   "yaw": -147.59,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_4C8AA6F6_13AA_7DA9_41AE_58863417B51A",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_49AFA632_135A_BCA9_41A2_1F29C0D05566, this.camera_30C24DE2_2493_E5E2_41C0_8DE778EE153D); this.mainPlayList.set('selectedIndex', 61)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 25.85,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -147.59,
   "image": {
    "levels": [
     {
      "url": "media/panorama_49AFE1F3_135A_97A8_4187_C6E968ACA6B8_1_HS_3_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.35
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 39.46,
   "image": "this.AnimatedImageResource_9427F887_13D6_9468_419B_D29F636525C2",
   "pitch": -11.53,
   "yaw": 172.75,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_02AED202_1213_9D1D_41AA_D62677C584E0",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1C63E5B5_122F_A764_412F_D3ADED669290, this.camera_32182BC1_2493_EE1E_41B6_BBB6EEA40969); this.mainPlayList.set('selectedIndex', 40)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 39.46,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 172.75,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1C6B4747_122D_A323_4183_68A8F7F1D0BB_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -11.53
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 21.49,
   "image": "this.AnimatedImageResource_941B687A_13D6_9498_41AF_905CEC80CB03",
   "pitch": -16.02,
   "yaw": -117.57,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1CEF95D3_1216_673C_4184_523CC02AC223",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1E2C3554_1217_A725_41A3_8E48640695C2, this.camera_316CFFED_2493_E5E6_41C0_5F04B1270A04); this.mainPlayList.set('selectedIndex', 10)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 21.49,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -117.57,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1E36C7D9_1217_E32F_419A_CA22B2D4E0D8_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -16.02
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 25.41,
   "image": "this.AnimatedImageResource_941AA87A_13D6_9498_41A6_F46A50295466",
   "pitch": -7.35,
   "yaw": 63.68,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1D7AC640_1216_A51C_41A0_D41E981546DE",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 12)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 25.41,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 63.68,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1E36C7D9_1217_E32F_419A_CA22B2D4E0D8_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -7.35
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 21.38,
   "image": "this.AnimatedImageResource_94247887_13D6_9468_41AE_53ECE01B9DBC",
   "pitch": -9.52,
   "yaw": 40.61,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1D38D165_1213_FFE4_41A6_FDB32088127B",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1D51A53A_1232_676C_419B_FB05E8EE5A1C, this.camera_31830EAC_2493_E666_41C2_2A4B498AA8C0); this.mainPlayList.set('selectedIndex', 29)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 21.38,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 40.61,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1CC7CD8C_1233_E724_41A4_7036FC9FAFBA_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -9.52
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 17.26,
   "image": "this.AnimatedImageResource_9424E886_13D6_9468_4196_CDEC8909310D",
   "pitch": -7.51,
   "yaw": -138.38,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1CB25454_1232_E524_41AA_10012A75BCE9",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1C5160C8_122D_9D2D_41B1_024A8D5AFA43, this.camera_32A7502E_2493_DA62_419F_D85A7474CAE8); this.mainPlayList.set('selectedIndex', 25)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 17.26,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -138.38,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1C4AA941_122D_AF1C_4194_652BF1171E50_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -7.51
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 25.53,
   "image": "this.AnimatedImageResource_94276888_13D6_9478_4194_501BE21F23F8",
   "pitch": -19.78,
   "yaw": 55.14,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1D506121_1212_9F1C_41B1_A6C070D16CF8",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1E3E7C89_1216_A52F_41B0_E95358B2767C, this.camera_3266BC1E_2493_EA22_41A1_A7E26B716FDF); this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 25.53,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 55.14,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1C7411C6_122E_7F24_4183_991262FE3F99_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -19.78
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 26.11,
   "image": "this.AnimatedImageResource_94269888_13D6_9478_41A7_0293FCC36109",
   "pitch": -15.76,
   "yaw": -126.49,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1D8DD225_1215_FD64_41A5_0E7D6E8CA3C7",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1C74B41E_122E_A525_418F_5DB5C0137B9B, this.camera_37A99C73_2493_EAE2_41BC_2C5D325B084B); this.mainPlayList.set('selectedIndex', 33)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 26.11,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -126.49,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1C7411C6_122E_7F24_4183_991262FE3F99_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -15.76
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 26.59,
   "image": "this.AnimatedImageResource_94260888_13D6_9478_418F_BC5FDFA35CA6",
   "pitch": -11.49,
   "yaw": -34.79,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_024F2EF7_1213_A2E4_41A2_93C12CE9552D",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1C63E5B5_122F_A764_412F_D3ADED669290, this.camera_37A42C7F_2493_EAE2_41BD_52149D77FF11); this.mainPlayList.set('selectedIndex', 40)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 26.59,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -34.79,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1C7411C6_122E_7F24_4183_991262FE3F99_1_HS_2_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -11.49
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 30.56,
   "image": "this.AnimatedImageResource_942EF892_13D6_9468_4193_81D5B3666F2F",
   "pitch": -49.93,
   "yaw": -61.3,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1F7A14C8_12BD_BDF8_41A3_3BC9F5EA40CF",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1C5A781B_122F_AD2C_419A_D55C87F1D7C4, this.camera_32F9F052_2493_DA22_41BD_0B7A6808DB52); this.mainPlayList.set('selectedIndex', 41)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 30.56,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -61.3,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1C5E8E0D_122F_E524_41AB_25431A77DDE1_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -49.93
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 29.75,
   "image": "this.AnimatedImageResource_9435D895_13D6_9468_41B2_953E2AAFE675",
   "pitch": -21.17,
   "yaw": 30.15,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1C894F57_12AE_ACE8_4183_A6922B4123E1",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1F7039BE_12B5_9798_41B0_325FFC1AF137, this.camera_31205F9D_2493_E626_41A9_A691760E2773); this.mainPlayList.set('selectedIndex', 44)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 29.75,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 30.15,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1D4CDF0B_12AA_AC78_4190_C5BCACDF8F2B_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -21.17
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 38.34,
   "image": "this.AnimatedImageResource_9434A895_13D6_9468_418B_02DF4B72E6EE",
   "pitch": -15.01,
   "yaw": -159.4,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1CC36158_12AE_F498_41AE_8E9E1E6418EC",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1F53F5D9_12AA_FF98_41A3_6B669E91923B, this.camera_312FDF8B_2493_E622_41AB_AC4FCE826732); this.mainPlayList.set('selectedIndex', 48)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 38.34,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -159.4,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1D4CDF0B_12AA_AC78_4190_C5BCACDF8F2B_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -15.01
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 15.99,
   "image": "this.AnimatedImageResource_94340896_13D6_9468_4188_74585E107C11",
   "pitch": -8.27,
   "yaw": -66.66,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1C520593_12AE_9C68_4173_816FAB320426",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_59E47185_136B_F468_41AE_60E9A934E07E, this.camera_3154AFB3_2493_E662_41A5_CF59785ACA69); this.mainPlayList.set('selectedIndex', 57)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 15.99,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -66.66,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1D4CDF0B_12AA_AC78_4190_C5BCACDF8F2B_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.27
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 21.43,
   "image": "this.AnimatedImageResource_94D1F8B1_13D6_95A8_41B3_1E45FFB9DDEE",
   "pitch": -0.98,
   "yaw": 11.09,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_7D138A24_13AE_94A8_41AA_5EEECFBB35E0",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_5EF35374_136E_B4A8_4191_7E72995B3ECD, this.camera_32DAD03A_2493_DA62_41C1_D8DED063B454); this.mainPlayList.set('selectedIndex', 58)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 21.43,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 11.09,
   "image": {
    "levels": [
     {
      "url": "media/panorama_632FB807_13AA_9468_4199_F2D987E571CA_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.98
  }
 ]
},
{
 "transparencyActive": true,
 "propagateClick": false,
 "id": "IconButton_52344940_5F01_EFC4_4184_BD88B8F3E7CC",
 "width": 40,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "minHeight": 0,
 "verticalAlign": "middle",
 "horizontalAlign": "center",
 "minWidth": 0,
 "mode": "push",
 "height": 40,
 "iconURL": "skin/IconButton_52344940_5F01_EFC4_4184_BD88B8F3E7CC.png",
 "rollOverIconURL": "skin/IconButton_52344940_5F01_EFC4_4184_BD88B8F3E7CC_rollover.png",
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "class": "IconButton",
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_52344940_5F01_EFC4_4184_BD88B8F3E7CC_pressed.png",
 "shadow": false,
 "cursor": "hand",
 "data": {
  "name": "Button53068"
 }
},
{
 "transparencyActive": true,
 "propagateClick": false,
 "id": "IconButton_52344940_5F01_EFC4_41D7_BE81DEFE8744",
 "width": 40,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "minHeight": 0,
 "verticalAlign": "middle",
 "horizontalAlign": "center",
 "minWidth": 0,
 "mode": "push",
 "height": 40,
 "iconURL": "skin/IconButton_52344940_5F01_EFC4_41D7_BE81DEFE8744.png",
 "rollOverIconURL": "skin/IconButton_52344940_5F01_EFC4_41D7_BE81DEFE8744_rollover.png",
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "class": "IconButton",
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_52344940_5F01_EFC4_41D7_BE81DEFE8744_pressed.png",
 "shadow": false,
 "cursor": "hand",
 "data": {
  "name": "Button53060"
 }
},
{
 "transparencyActive": true,
 "propagateClick": false,
 "id": "IconButton_52344940_5F01_EFC4_41BB_2A5E51966695",
 "width": 40,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "minHeight": 0,
 "verticalAlign": "middle",
 "horizontalAlign": "center",
 "minWidth": 0,
 "mode": "push",
 "height": 40,
 "iconURL": "skin/IconButton_52344940_5F01_EFC4_41BB_2A5E51966695.png",
 "rollOverIconURL": "skin/IconButton_52344940_5F01_EFC4_41BB_2A5E51966695_rollover.png",
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "class": "IconButton",
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_52344940_5F01_EFC4_41BB_2A5E51966695_pressed.png",
 "shadow": false,
 "cursor": "hand",
 "data": {
  "name": "Button53061"
 }
},
{
 "transparencyActive": true,
 "propagateClick": false,
 "id": "IconButton_52344940_5F01_EFC4_41C7_7571D1A24A33",
 "width": 40,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "minHeight": 0,
 "verticalAlign": "middle",
 "horizontalAlign": "center",
 "minWidth": 0,
 "mode": "push",
 "height": 40,
 "iconURL": "skin/IconButton_52344940_5F01_EFC4_41C7_7571D1A24A33.png",
 "rollOverIconURL": "skin/IconButton_52344940_5F01_EFC4_41C7_7571D1A24A33_rollover.png",
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "class": "IconButton",
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_52344940_5F01_EFC4_41C7_7571D1A24A33_pressed.png",
 "shadow": false,
 "cursor": "hand",
 "data": {
  "name": "Button53069"
 }
},
{
 "transparencyActive": true,
 "propagateClick": false,
 "id": "IconButton_52344940_5F01_EFC4_41D4_A1CCD7021F0A",
 "width": 40,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "minHeight": 0,
 "verticalAlign": "middle",
 "horizontalAlign": "center",
 "minWidth": 0,
 "mode": "push",
 "height": 40,
 "iconURL": "skin/IconButton_52344940_5F01_EFC4_41D4_A1CCD7021F0A.png",
 "rollOverIconURL": "skin/IconButton_52344940_5F01_EFC4_41D4_A1CCD7021F0A_rollover.png",
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "class": "IconButton",
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_52344940_5F01_EFC4_41D4_A1CCD7021F0A_pressed.png",
 "shadow": false,
 "cursor": "hand",
 "data": {
  "name": "Button53062"
 }
},
{
 "transparencyActive": true,
 "propagateClick": false,
 "id": "IconButton_52344940_5F01_EFC4_41BB_7EDA152A8375",
 "width": 40,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "minHeight": 0,
 "verticalAlign": "middle",
 "horizontalAlign": "center",
 "minWidth": 0,
 "mode": "push",
 "height": 40,
 "iconURL": "skin/IconButton_52344940_5F01_EFC4_41BB_7EDA152A8375.png",
 "rollOverIconURL": "skin/IconButton_52344940_5F01_EFC4_41BB_7EDA152A8375_rollover.png",
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "class": "IconButton",
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_52344940_5F01_EFC4_41BB_7EDA152A8375_pressed.png",
 "shadow": false,
 "cursor": "hand",
 "data": {
  "name": "Button53071"
 }
},
{
 "transparencyActive": true,
 "propagateClick": false,
 "id": "IconButton_52344940_5F01_EFC4_41B6_26FA0557CEC9",
 "width": 40,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "minHeight": 0,
 "verticalAlign": "middle",
 "horizontalAlign": "center",
 "minWidth": 0,
 "mode": "push",
 "height": 40,
 "iconURL": "skin/IconButton_52344940_5F01_EFC4_41B6_26FA0557CEC9.png",
 "rollOverIconURL": "skin/IconButton_52344940_5F01_EFC4_41B6_26FA0557CEC9_rollover.png",
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "class": "IconButton",
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_52344940_5F01_EFC4_41B6_26FA0557CEC9_pressed.png",
 "shadow": false,
 "cursor": "hand",
 "data": {
  "name": "Button53065"
 }
},
{
 "transparencyActive": true,
 "propagateClick": false,
 "id": "IconButton_52344940_5F01_EFC4_41B5_303051AFBE15",
 "width": 40,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "minHeight": 0,
 "verticalAlign": "middle",
 "horizontalAlign": "center",
 "minWidth": 0,
 "mode": "push",
 "height": 40,
 "iconURL": "skin/IconButton_52344940_5F01_EFC4_41B5_303051AFBE15.png",
 "rollOverIconURL": "skin/IconButton_52344940_5F01_EFC4_41B5_303051AFBE15_rollover.png",
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "class": "IconButton",
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_52344940_5F01_EFC4_41B5_303051AFBE15_pressed.png",
 "shadow": false,
 "cursor": "hand",
 "data": {
  "name": "Button53067"
 }
},
{
 "transparencyActive": true,
 "propagateClick": false,
 "id": "IconButton_52344940_5F01_EFC4_41CC_4A5BFB01C469",
 "width": 40,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "minHeight": 0,
 "verticalAlign": "middle",
 "horizontalAlign": "center",
 "minWidth": 0,
 "mode": "toggle",
 "height": 40,
 "iconURL": "skin/IconButton_52344940_5F01_EFC4_41CC_4A5BFB01C469.png",
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "class": "IconButton",
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_52344940_5F01_EFC4_41CC_4A5BFB01C469_pressed.png",
 "shadow": false,
 "cursor": "hand",
 "data": {
  "name": "Button53066"
 }
},
{
 "transparencyActive": true,
 "propagateClick": false,
 "id": "IconButton_52344940_5F01_EFC4_41D0_C6DE67446A2C",
 "width": 40,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "minHeight": 0,
 "verticalAlign": "middle",
 "horizontalAlign": "center",
 "minWidth": 0,
 "mode": "push",
 "height": 40,
 "iconURL": "skin/IconButton_52344940_5F01_EFC4_41D0_C6DE67446A2C.png",
 "rollOverIconURL": "skin/IconButton_52344940_5F01_EFC4_41D0_C6DE67446A2C_rollover.png",
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "class": "IconButton",
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_52344940_5F01_EFC4_41D0_C6DE67446A2C_pressed.png",
 "shadow": false,
 "cursor": "hand",
 "data": {
  "name": "Button53063"
 }
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 20.71,
   "image": "this.AnimatedImageResource_941F2882_13D6_9468_419F_5C20035EA5DF",
   "pitch": -6.72,
   "yaw": -167.56,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1C92FEB6_1216_A564_41AD_D4A92A12217E",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1EC76234_1216_9D64_41A9_AF64765A9F9F, this.camera_320C9BCD_2493_EE26_41B0_B0B18A89AB1A); this.mainPlayList.set('selectedIndex', 16)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 20.71,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -167.56,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1E590196_1216_7F24_41A7_D1A1589C2A9E_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.72
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 20.57,
   "image": "this.AnimatedImageResource_941F7882_13D6_9468_41A4_B8C404B351B5",
   "pitch": -9.48,
   "yaw": -28.39,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1CF39957_1216_6F24_41A3_3E0232015378",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1ED7C008_1217_BD2C_41B0_159A6CBF8842, this.camera_323C2BD9_2493_EE2E_41BC_7D651CC86067); this.mainPlayList.set('selectedIndex', 13)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 20.57,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -28.39,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1E590196_1216_7F24_41A7_D1A1589C2A9E_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -9.48
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.39,
   "image": "this.AnimatedImageResource_941EE882_13D6_9468_413B_B2C32AE6FF6C",
   "pitch": 1.41,
   "yaw": -104.72,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1D05663F_1215_E563_4176_AB6D6CFF379E",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 20)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 13.39,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -104.72,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1E590196_1216_7F24_41A7_D1A1589C2A9E_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.41
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 21.76,
   "image": "this.AnimatedImageResource_94165879_13D6_9498_4170_B079642F46E5",
   "pitch": -10.11,
   "yaw": 44.09,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1C9398FF_1213_EEE4_41AE_C90DA4AFD09C",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1E31C113_1217_9F23_41AF_9721C1EE070D, this.camera_3035F31C_2493_DE26_41BF_9F413F44C653); this.mainPlayList.set('selectedIndex', 9)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 21.76,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 44.09,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1E3E2E98_1216_652C_418E_1DBFF6445B9F_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -10.11
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 29,
   "image": "this.AnimatedImageResource_94199879_13D6_9498_41A0_F276DDE6077D",
   "pitch": -33.22,
   "yaw": 154.63,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1D174B14_1213_A325_4178_72C6E65BFE96",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1E3E7C89_1216_A52F_41B0_E95358B2767C, this.camera_300F3305_2493_DE26_419C_AD77DA7B04E3); this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 29,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 154.63,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1E3E2E98_1216_652C_418E_1DBFF6445B9F_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -33.22
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.04,
   "image": "this.AnimatedImageResource_94193879_13D6_9498_41A6_211A2EA94192",
   "pitch": 13.21,
   "yaw": -16.54,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_32C448CC_12AA_95F8_41A7_5DF11984F990",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_618DAC0E_13DE_AC79_41B1_10B967991445, this.camera_3003A311_2493_DE3E_41C1_0A553F755EC0); this.mainPlayList.set('selectedIndex', 72)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 13.04,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -16.54,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1E3E2E98_1216_652C_418E_1DBFF6445B9F_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 13.21
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 39.56,
   "image": "this.AnimatedImageResource_942FD891_13D6_9468_4176_6B79F8394C20",
   "pitch": -10.78,
   "yaw": -26.72,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_03ECDFE1_1216_A31C_4170_1FB725E4CD28",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1C6B4747_122D_A323_4183_68A8F7F1D0BB, this.camera_3016BE12_2493_E622_41A4_C5E0CDBB3C52); this.mainPlayList.set('selectedIndex', 31)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 39.56,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -26.72,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1C63E5B5_122F_A764_412F_D3ADED669290_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -10.78
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 31.15,
   "image": "this.AnimatedImageResource_942F5891_13D6_9468_41A5_DCC2DE5833BF",
   "pitch": -38.75,
   "yaw": 126.11,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1CD024C6_12B7_BDE8_41AC_5672AB4222BC",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1C7411C6_122E_7F24_4183_991262FE3F99, this.camera_3008CE1E_2493_E622_41B8_6A762C006719); this.mainPlayList.set('selectedIndex', 32)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 31.15,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 126.11,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1C63E5B5_122F_A764_412F_D3ADED669290_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -38.75
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 18.34,
   "image": "this.AnimatedImageResource_9422E885_13D6_9468_41A0_A465318CA99E",
   "pitch": -5.25,
   "yaw": -14.53,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1C4125D1_1232_673C_41A5_59703CE4972A",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1C4AA941_122D_AF1C_4194_652BF1171E50, this.camera_308B3D90_2493_EA3D_41BB_77B34C44EB31); this.mainPlayList.set('selectedIndex', 27)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 18.34,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -14.53,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1C5160C8_122D_9D2D_41B1_024A8D5AFA43_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -5.25
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 17.35,
   "image": "this.AnimatedImageResource_94226885_13D6_9468_41AC_30C540234E1E",
   "pitch": -5,
   "yaw": 21.14,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1D2A0444_1232_6525_419F_57DC2653977B",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1C4E751F_122D_E723_41A5_6A1A4D3D0A25, this.camera_3082DD9B_2493_EA22_41BC_5470C1171F61); this.mainPlayList.set('selectedIndex', 26)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 17.35,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 21.14,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1C5160C8_122D_9D2D_41B1_024A8D5AFA43_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -5
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 24.45,
   "image": "this.AnimatedImageResource_94258885_13D6_9468_4163_0F3454C798E6",
   "pitch": -25.69,
   "yaw": 138.05,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1CE01260_1212_9D1C_41AC_02CF8147CA6F",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC, this.camera_30B7CDA6_2493_EA63_4179_7756BC00A12B); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 24.45,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 138.05,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1C5160C8_122D_9D2D_41B1_024A8D5AFA43_1_HS_2_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -25.69
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 25.93,
   "image": "this.AnimatedImageResource_94252885_13D6_9468_419F_33255F630FC1",
   "pitch": -17.15,
   "yaw": -100.11,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1DB268A7_1212_ED64_41A3_38B566A01C08",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1E3059D8_1216_AF2D_4182_4B71A1D76684, this.camera_3097ED83_2493_EA22_418B_1BBA6D98E45A); this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 25.93,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -100.11,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1C5160C8_122D_9D2D_41B1_024A8D5AFA43_1_HS_3_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -17.15
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 25.01,
   "image": "this.AnimatedImageResource_9417C878_13D6_9498_4198_9A9F94E3D7B2",
   "pitch": -14.88,
   "yaw": 29.14,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1C8FB9E2_121D_AF1C_41AE_17FCFAB76257",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1E35133E_1216_E365_418A_E512CC92AE96, this.camera_37F9ACC5_2493_EA26_41B4_927514CC2118); this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 25.01,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 29.14,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1E261A0A_1216_AD2C_41A3_6B0EE11D4D7E_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -14.88
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 20.43,
   "image": "this.AnimatedImageResource_941E0882_13D6_9468_4195_1794F95411F4",
   "pitch": -11.49,
   "yaw": -148.47,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1D08E00C_1215_9D24_41A0_C1419062D233",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1F1F5301_1216_A31C_41A0_CF4AED19D1F5, this.camera_30BB028D_2493_DE26_41A5_F85B79FDDF2F); this.mainPlayList.set('selectedIndex', 17)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 20.43,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -148.47,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1EC76234_1216_9D64_41A9_AF64765A9F9F_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -11.49
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 24.26,
   "image": "this.AnimatedImageResource_941FC882_13D6_9468_41B2_EB177517901D",
   "pitch": -21.79,
   "yaw": 19.72,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1D4706D5_1212_6524_419E_B5AA939CE98E",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1E590196_1216_7F24_41A7_D1A1589C2A9E, this.camera_3081E282_2493_DE22_41A8_D71657B058F7); this.mainPlayList.set('selectedIndex', 15)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 24.26,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 19.72,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1EC76234_1216_9D64_41A9_AF64765A9F9F_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -21.79
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 25.64,
   "image": "this.AnimatedImageResource_94C1F8A2_13D6_95A8_41A9_6B60510E69E7",
   "pitch": -11.12,
   "yaw": 102.12,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_4B393D3D_135A_6C98_41AA_419ADA546251",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1F7646C7_12AA_9DF7_41A3_6118C47853B8, this.camera_325640A6_2493_DA62_4177_3B34CBA60C26); this.mainPlayList.set('selectedIndex', 49)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 25.64,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 102.12,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5EF35374_136E_B4A8_4191_7E72995B3ECD_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -11.12
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 24.41,
   "image": "this.AnimatedImageResource_94C118A2_13D6_95A8_41AC_1FB316BBB6F8",
   "pitch": -20.91,
   "yaw": -78.26,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_4B747C31_135A_6CA8_4190_75C9DFFE5290",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_49AEC247_135B_B4E8_41A5_746131D61342, this.camera_3220809A_2493_DA22_41B2_1397578693EF); this.mainPlayList.set('selectedIndex', 64)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 24.41,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -78.26,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5EF35374_136E_B4A8_4191_7E72995B3ECD_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -20.91
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 21.3,
   "image": "this.AnimatedImageResource_661CF57D_13DE_7C9B_4191_850C29BDE7EB",
   "pitch": 6.3,
   "yaw": -154.96,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_7EBB33CA_13AA_9BF8_419A_8798508D1C4A",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_632FB807_13AA_9468_4199_F2D987E571CA, this.camera_3247C0B2_2493_DA62_41B7_E6BC952F372A); this.mainPlayList.set('selectedIndex', 71)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 21.3,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -154.96,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5EF35374_136E_B4A8_4191_7E72995B3ECD_0_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 6.3
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 37.37,
   "image": "this.AnimatedImageResource_942E2891_13D6_9468_419F_ACF6A96B4616",
   "pitch": -20.66,
   "yaw": 93.96,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1F350DD5_12BA_AFE8_41AD_2F8F558DD812",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1C74D9CF_122E_AF24_41AA_174DA8673956, this.camera_373651FE_2493_DDE2_41C1_853B386D09C0); this.mainPlayList.set('selectedIndex', 34)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 37.37,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 93.96,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1C5A781B_122F_AD2C_419A_D55C87F1D7C4_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -20.66
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 28.11,
   "image": "this.AnimatedImageResource_942E4892_13D6_9468_41B1_60C07C4887AB",
   "pitch": -45.28,
   "yaw": -167.06,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1CBBCE29_12BA_ACB8_4191_4F052CB442DB",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 36)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 28.11,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -167.06,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1C5A781B_122F_AD2C_419A_D55C87F1D7C4_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -45.28
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 38.68,
   "image": "this.AnimatedImageResource_9431D892_13D6_9468_41B3_14C7569BD6C5",
   "pitch": -13,
   "yaw": -113.93,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1CF41B54_12BA_94E9_41B0_C7665E8E28F5",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1C5E8E0D_122F_E524_41AB_25431A77DDE1, this.camera_372E820A_2493_DE22_41BA_51FAD86425C1); this.mainPlayList.set('selectedIndex', 42)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 38.68,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -113.93,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1C5A781B_122F_AD2C_419A_D55C87F1D7C4_1_HS_2_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -13
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Arrow 03"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 21.78,
   "image": "this.AnimatedImageResource_943E48A2_13D6_95A8_41AF_4E7BB53BD14D",
   "pitch": -6.88,
   "yaw": 116.61,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_45B6A166_135A_94A9_41A2_C50B72B2839B",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1D4CDF0B_12AA_AC78_4190_C5BCACDF8F2B, this.camera_30567340_2493_DE1E_41A5_728548948E48); this.mainPlayList.set('selectedIndex', 47)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 21.78,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 116.61,
   "image": {
    "levels": [
     {
      "url": "media/panorama_59E47185_136B_F468_41AE_60E9A934E07E_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.88
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 37.06,
   "image": "this.AnimatedImageResource_942E5893_13D6_9468_4191_3E9180D07769",
   "pitch": -8.1,
   "yaw": 76.37,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1F443117_12B6_9497_4186_D87B6D7706DD",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1E3059D8_1216_AF2D_4182_4B71A1D76684, this.camera_319AAE94_2493_E626_4155_1E2E8166CAA0); this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 37.06,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 76.37,
   "image": {
    "levels": [
     {
      "url": "media/panorama_027D9014_12BA_7468_41AE_B7601C694ED1_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.1
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 36.34,
   "image": "this.AnimatedImageResource_94319893_13D6_9468_41AD_3E32D27113AE",
   "pitch": -13.88,
   "yaw": -117.82,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1C268E5D_12B6_EC9B_419B_151EBD8A23B4",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1F7039BE_12B5_9798_41B0_325FFC1AF137, this.camera_30602E88_2493_E62E_41B4_1D9A10B70CD5); this.mainPlayList.set('selectedIndex', 44)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 36.34,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -117.82,
   "image": {
    "levels": [
     {
      "url": "media/panorama_027D9014_12BA_7468_41AE_B7601C694ED1_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -13.88
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 15.85,
   "image": "this.AnimatedImageResource_94310893_13D6_9468_41A9_9DEAC094BB17",
   "pitch": -11.16,
   "yaw": -33.25,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1DC8A46A_12B6_9CB8_4188_7643BB50C325",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1C461727_12B7_9CA8_41A0_02E993644282, this.camera_306C5E7D_2493_E6E6_41B3_87654AE03D30); this.mainPlayList.set('selectedIndex', 45)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 15.85,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -33.25,
   "image": {
    "levels": [
     {
      "url": "media/panorama_027D9014_12BA_7468_41AE_B7601C694ED1_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -11.16
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 38.51,
   "image": "this.AnimatedImageResource_94379896_13D6_9468_418C_FD33FC1362CE",
   "pitch": -14.01,
   "yaw": -164.93,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1C5E13D1_12AE_9BE8_419A_6E8734B55629",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1F7646C7_12AA_9DF7_41A3_6118C47853B8, this.camera_32520BFB_2493_EDE2_41BB_5B3EBFEF45BF); this.mainPlayList.set('selectedIndex', 49)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 38.51,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -164.93,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1F53F5D9_12AA_FF98_41A3_6B669E91923B_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -14.01
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 36.86,
   "image": "this.AnimatedImageResource_94376896_13D6_9468_4194_FDFD15BFB4BC",
   "pitch": -21.79,
   "yaw": 18.46,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1DA2EEF4_12AE_6DA8_41A2_21EA0F6C9B45",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1D4CDF0B_12AA_AC78_4190_C5BCACDF8F2B, this.camera_32406C07_2493_EA22_41A0_597DDA75FD42); this.mainPlayList.set('selectedIndex', 47)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 36.86,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 18.46,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1F53F5D9_12AA_FF98_41A3_6B669E91923B_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -21.79
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 24.97,
   "image": "this.AnimatedImageResource_94C748AB_13D6_95B8_4186_44DA98675CF0",
   "pitch": -17.15,
   "yaw": 115.44,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_72C4FBA8_13AD_ABB9_41A3_7F34B62A42F4",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_49AFA632_135A_BCA9_41A2_1F29C0D05566, this.camera_317FBFDB_2493_E622_41AB_AF9E8E2336D0); this.mainPlayList.set('selectedIndex', 61)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 24.97,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 115.44,
   "image": {
    "levels": [
     {
      "url": "media/panorama_49AF6A22_135A_94A9_41AA_E036F21F6533_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -17.15
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 25.82,
   "image": "this.AnimatedImageResource_94C608AB_13D6_95B8_418A_064521FD3FFE",
   "pitch": -8.86,
   "yaw": -101.62,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_71119DBF_13AE_6F98_41A7_787AB9BFAA44",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_7176E1A8_13B7_B7B9_419E_B2A83EBA5F99, this.camera_314BFFC4_2493_E626_41AF_7CF22B274C0A); this.mainPlayList.set('selectedIndex', 70)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 25.82,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -101.62,
   "image": {
    "levels": [
     {
      "url": "media/panorama_49AF6A22_135A_94A9_41AA_E036F21F6533_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.86
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 34.34,
   "image": "this.AnimatedImageResource_9438B89D_13D6_9598_41A3_4B291434DE23",
   "pitch": -10.49,
   "yaw": 46.73,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1C82984B_12AF_94FF_41AA_488F6A66AC8B",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1F7646C7_12AA_9DF7_41A3_6118C47853B8, this.camera_320C1075_2493_DAE6_419C_4F38313DF4BC); this.mainPlayList.set('selectedIndex', 49)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 34.34,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 46.73,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1F76471E_12AA_BC99_417D_DD5A2084733C_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -10.49
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 32.84,
   "image": "this.AnimatedImageResource_9438389D_13D6_9598_41A0_E2FA548866BA",
   "pitch": -10.61,
   "yaw": 163.04,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1CEBF8B1_12AE_95A8_41A6_5A0960F1CF59",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1F769998_12AA_9798_41A9_9421299474C3, this.camera_3233408D_2493_DA26_41B8_6A5B99F540EB); this.mainPlayList.set('selectedIndex', 51)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 32.84,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 163.04,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1F76471E_12AA_BC99_417D_DD5A2084733C_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -10.61
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 04c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 29.85,
   "image": "this.AnimatedImageResource_943BB89D_13D6_9598_4143_792438EB6B72",
   "pitch": -13.13,
   "yaw": -146.09,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1C6239DD_12AE_9798_41A6_99ED44AA020C",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1F2B6CEB_12D6_6DB8_41B2_62922D3306B8, this.camera_323DB081_2493_DA1E_4139_BFBF83FA37DE); this.mainPlayList.set('selectedIndex', 54)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 29.85,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -146.09,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1F76471E_12AA_BC99_417D_DD5A2084733C_1_HS_2_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -13.13
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 29.16,
   "image": "this.AnimatedImageResource_942DD890_13D6_9468_419C_15F2D2EFF8EA",
   "pitch": -8.39,
   "yaw": 86.96,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_1CA93C76_12AA_ACA8_419F_6BB51832ED4E",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1C74934B_122E_A32C_41AF_0A51BBA11B42, this.camera_318EAEA0_2493_E61E_416A_D2271B0A2A80); this.mainPlayList.set('selectedIndex', 36)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 29.16,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 86.96,
   "image": {
    "levels": [
     {
      "url": "media/panorama_1C7416BE_122E_A565_41A7_E6DAA86F5840_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.39
  }
 ]
},
{
 "shadow": false,
 "propagateClick": false,
 "children": [
  "this.IconButton_52344940_5F01_EFC4_41B6_26FA0557CEC9",
  "this.IconButton_52344940_5F01_EFC4_41CC_4A5BFB01C469",
  "this.IconButton_52344940_5F01_EFC4_41B5_303051AFBE15"
 ],
 "layout": "vertical",
 "id": "Container_52344940_5F01_EFC4_41D6_7E3303CC9C74",
 "scrollBarColor": "#000000",
 "width": 40,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 20,
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 20,
 "verticalAlign": "middle",
 "height": "100%",
 "horizontalAlign": "center",
 "gap": 4,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "class": "Container",
 "borderRadius": 0,
 "overflow": "hidden",
 "scrollBarWidth": 10,
 "data": {
  "name": "Container53064"
 }
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_943A58A0_13D6_95A8_4195_C491C6DA64B2",
 "levels": [
  {
   "url": "media/panorama_1D2C1F2A_12D5_ACB8_41B0_5142BEAE6714_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_943D38A0_13D6_95A8_41A5_BB3BDDFE7332",
 "levels": [
  {
   "url": "media/panorama_1F2B6CEB_12D6_6DB8_41B2_62922D3306B8_1_HS_0_0.png",
   "width": 640,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_943CE8A0_13D6_95A8_418F_3E0BAC7F42F8",
 "levels": [
  {
   "url": "media/panorama_1F2B6CEB_12D6_6DB8_41B2_62922D3306B8_1_HS_1_0.png",
   "width": 520,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_943C78A0_13D6_95A8_41A5_AB93E7D2CF7A",
 "levels": [
  {
   "url": "media/panorama_1F2B6CEB_12D6_6DB8_41B2_62922D3306B8_1_HS_2_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_94109873_13D6_94A8_4190_1EFD2BC5542E",
 "levels": [
  {
   "url": "media/panorama_02181B5D_0879_47EF_4194_05F745303325_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_94140877_13D6_94A8_41AE_489110C0D356",
 "levels": [
  {
   "url": "media/panorama_1E351DCE_1216_A725_41AA_C2237F5681B0_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_94145877_13D6_94A8_41AA_9A297FFA7DCB",
 "levels": [
  {
   "url": "media/panorama_1E351DCE_1216_A725_41AA_C2237F5681B0_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_94179877_13D6_94A8_4179_DF443715FACC",
 "levels": [
  {
   "url": "media/panorama_1E351DCE_1216_A725_41AA_C2237F5681B0_1_HS_2_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_94173877_13D6_94A8_4181_DA87AF04A031",
 "levels": [
  {
   "url": "media/panorama_1E351DCE_1216_A725_41AA_C2237F5681B0_1_HS_3_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_94246886_13D6_9468_41B1_DFA8B06CDE8B",
 "levels": [
  {
   "url": "media/panorama_1C69EC6F_1232_65E3_41A9_5362BA7F1A83_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_9427E886_13D6_9468_4183_2A287A2FC4A8",
 "levels": [
  {
   "url": "media/panorama_1C69EC6F_1232_65E3_41A9_5362BA7F1A83_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_941F7883_13D6_9468_41B2_56776A311B12",
 "levels": [
  {
   "url": "media/panorama_1F1F5301_1216_A31C_41A0_CF4AED19D1F5_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_941E8883_13D6_9468_41AF_CE3048B16EFD",
 "levels": [
  {
   "url": "media/panorama_1F1F5301_1216_A31C_41A0_CF4AED19D1F5_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_941E3883_13D6_9468_418C_E9DE58D80AA2",
 "levels": [
  {
   "url": "media/panorama_1F1F5301_1216_A31C_41A0_CF4AED19D1F5_1_HS_2_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_94204884_13D6_9468_41A2_38B8E71149BE",
 "levels": [
  {
   "url": "media/panorama_1C79B467_1212_65E4_41A9_397DB7948749_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_9420D884_13D6_9468_41AD_E1F98BE78F22",
 "levels": [
  {
   "url": "media/panorama_1C6F6FB5_1212_A367_41B1_97BA031975B7_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_94142878_13D6_9498_4183_9C394924CA1E",
 "levels": [
  {
   "url": "media/panorama_1E35133E_1216_E365_418A_E512CC92AE96_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_94146878_13D6_9498_41A5_B34C987920A8",
 "levels": [
  {
   "url": "media/panorama_1E35133E_1216_E365_418A_E512CC92AE96_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 5,
 "frameCount": 20,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_9417B878_13D6_9498_41AA_25BE7973AD21",
 "levels": [
  {
   "url": "media/panorama_1E35133E_1216_E365_418A_E512CC92AE96_1_HS_2_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_94CB08AE_13D6_95B8_419E_7839F98F3E7F",
 "levels": [
  {
   "url": "media/panorama_7719D67F_13B6_9C98_41A2_D5E02E95A3B2_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_94CA98AE_13D6_95B8_41B1_4D46715C9BCC",
 "levels": [
  {
   "url": "media/panorama_7719D67F_13B6_9C98_41A2_D5E02E95A3B2_1_HS_1_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_6668D565_13DE_7CA8_41A3_AA7E5514284C",
 "levels": [
  {
   "url": "media/panorama_0154F527_0C22_07FC_4193_06409B7D0536_0_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_9413B875_13D6_94A8_41AA_7EE7346BBEA4",
 "levels": [
  {
   "url": "media/panorama_0154F527_0C22_07FC_4193_06409B7D0536_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_94233885_13D6_9468_41B0_3616204D0D37",
 "levels": [
  {
   "url": "media/panorama_1C4B5BF2_122D_A2FC_419B_609BAA032087_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_94234885_13D6_9468_4191_6144A3359023",
 "levels": [
  {
   "url": "media/panorama_1C4B5BF2_122D_A2FC_419B_609BAA032087_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_942C5891_13D6_9468_41AD_B7DD3FE18D98",
 "levels": [
  {
   "url": "media/panorama_1C740D40_122E_671C_41A5_F8F6717860CD_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_94CC88AF_13D6_95B8_419F_8BED6D05B79E",
 "levels": [
  {
   "url": "media/panorama_71772D8C_13B6_6C78_41B2_9EB26FDA544E_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_94CC68B0_13D6_95A8_41AB_3D516CAFEBBA",
 "levels": [
  {
   "url": "media/panorama_71772D8C_13B6_6C78_41B2_9EB26FDA544E_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_94273887_13D6_9468_419B_021B89499B3B",
 "levels": [
  {
   "url": "media/panorama_1D51A53A_1232_676C_419B_FB05E8EE5A1C_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_94275887_13D6_9468_4187_54913EB3B381",
 "levels": [
  {
   "url": "media/panorama_1D51A53A_1232_676C_419B_FB05E8EE5A1C_1_HS_1_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_941AD87B_13D6_9498_41B0_C02841D9A245",
 "levels": [
  {
   "url": "media/panorama_1E3E8A7F_1217_EDE4_41A9_9F5BCA609E87_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_941A687B_13D6_9498_41B1_247F7A8051A7",
 "levels": [
  {
   "url": "media/panorama_1E3E8A7F_1217_EDE4_41A9_9F5BCA609E87_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_941D987B_13D6_9498_41A9_EF2517EE8769",
 "levels": [
  {
   "url": "media/panorama_1E3E8A7F_1217_EDE4_41A9_9F5BCA609E87_1_HS_2_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_94C898AD_13D6_95B8_41B0_1BA5CF142AC1",
 "levels": [
  {
   "url": "media/panorama_49AE96EF_135B_9DB8_419C_15F53F06D743_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_942CA890_13D6_9468_41AB_9701985D62AC",
 "levels": [
  {
   "url": "media/panorama_1C745916_122E_6F24_41B0_E0BDC7980538_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_942CD890_13D6_9468_419C_390B32B96E98",
 "levels": [
  {
   "url": "media/panorama_1C745916_122E_6F24_41B0_E0BDC7980538_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_94158876_13D6_94A8_41B1_4B3A1F39C4F4",
 "levels": [
  {
   "url": "media/panorama_1E3059D8_1216_AF2D_4182_4B71A1D76684_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_94150876_13D6_94A8_41B1_836CDFDD4C27",
 "levels": [
  {
   "url": "media/panorama_1E3059D8_1216_AF2D_4182_4B71A1D76684_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_94155876_13D6_94A8_41B1_2BBA759B777F",
 "levels": [
  {
   "url": "media/panorama_1E3059D8_1216_AF2D_4182_4B71A1D76684_1_HS_2_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_94149877_13D6_94A8_419B_CD498E0E5D8E",
 "levels": [
  {
   "url": "media/panorama_1E3059D8_1216_AF2D_4182_4B71A1D76684_1_HS_3_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_94C848AD_13D6_95B8_41A2_5BCA3E900FB3",
 "levels": [
  {
   "url": "media/panorama_49AEEB3E_135B_F498_41A5_157725750FD2_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_943F58A1_13D6_95A8_41A0_A1403910D87D",
 "levels": [
  {
   "url": "media/panorama_5829C03C_1376_7498_41AC_130D2B81793F_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_943EE8A1_13D6_95A8_41A6_59172D820C55",
 "levels": [
  {
   "url": "media/panorama_5829C03C_1376_7498_41AC_130D2B81793F_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_94C998AC_13D6_95B8_4142_C63842FDD74C",
 "levels": [
  {
   "url": "media/panorama_49AF6E44_135A_6CE9_414A_9C058452CF94_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_94C948AC_13D6_95B8_41B0_AF0157E5C992",
 "levels": [
  {
   "url": "media/panorama_49AF6E44_135A_6CE9_414A_9C058452CF94_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_94C648AC_13D6_95B8_41B1_1C9C7F870993",
 "levels": [
  {
   "url": "media/panorama_49AEC247_135B_B4E8_41A5_746131D61342_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_94C928AD_13D6_95B8_41AF_EA0EC1566E15",
 "levels": [
  {
   "url": "media/panorama_49AEC247_135B_B4E8_41A5_746131D61342_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_943B189E_13D6_9598_41A2_5054294203D8",
 "levels": [
  {
   "url": "media/panorama_1F769998_12AA_9798_41A9_9421299474C3_1_HS_0_0.png",
   "width": 640,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_943AF89E_13D6_9598_4170_C5205039A85E",
 "levels": [
  {
   "url": "media/panorama_1F769998_12AA_9798_41A9_9421299474C3_1_HS_1_0.png",
   "width": 520,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_941FB881_13D6_9468_41A4_7C58BD20E19A",
 "levels": [
  {
   "url": "media/panorama_1EF5F0E8_1217_9EEC_4186_EB28B5BB56EA_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_9418387A_13D6_9498_41B0_83993DF03199",
 "levels": [
  {
   "url": "media/panorama_1E2C3554_1217_A725_41A3_8E48640695C2_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_9418587A_13D6_9498_41B0_25DBA5DC336B",
 "levels": [
  {
   "url": "media/panorama_1E2C3554_1217_A725_41A3_8E48640695C2_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_941BE87A_13D6_9498_41B1_7C5BB52FC330",
 "levels": [
  {
   "url": "media/panorama_1E2C3554_1217_A725_41A3_8E48640695C2_1_HS_2_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_9436C89C_13D6_9598_41A4_06AB8F542AF5",
 "levels": [
  {
   "url": "media/panorama_1F7646C7_12AA_9DF7_41A3_6118C47853B8_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_9436589C_13D6_9598_41A8_5F4CA04DA186",
 "levels": [
  {
   "url": "media/panorama_1F7646C7_12AA_9DF7_41A3_6118C47853B8_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_9439289D_13D6_9598_41B0_9EB96459EDFD",
 "levels": [
  {
   "url": "media/panorama_1F7646C7_12AA_9DF7_41A3_6118C47853B8_1_HS_2_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_94257886_13D6_9468_41AC_242EE28E7E81",
 "levels": [
  {
   "url": "media/panorama_1C4E751F_122D_E723_41A5_6A1A4D3D0A25_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_943A789E_13D6_9598_41AC_1C8B47AAFFB0",
 "levels": [
  {
   "url": "media/panorama_1F7170A8_12AD_95B9_41B0_69B3D2D511F0_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_943DC89F_13D6_9598_41B3_2587901AC924",
 "levels": [
  {
   "url": "media/panorama_1F7170A8_12AD_95B9_41B0_69B3D2D511F0_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_943AC89F_13D6_9598_41B0_105CBDC0DDD8",
 "levels": [
  {
   "url": "media/panorama_1F7170A8_12AD_95B9_41B0_69B3D2D511F0_1_HS_2_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_9421F883_13D6_9468_4197_5A3CE3332517",
 "levels": [
  {
   "url": "media/panorama_1C6C0918_1212_EF2D_41AA_8CB6E207B7CA_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_94211884_13D6_9468_41A9_EC3E00E2C897",
 "levels": [
  {
   "url": "media/panorama_1C6C0918_1212_EF2D_41AA_8CB6E207B7CA_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_9413C875_13D6_94A8_41AF_0F17EFF2E170",
 "levels": [
  {
   "url": "media/panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_94133875_13D6_94A8_41B1_B2BE209C0013",
 "levels": [
  {
   "url": "media/panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_9412B875_13D6_94A8_41B0_4DE8491AE809",
 "levels": [
  {
   "url": "media/panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC_1_HS_2_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_9412D876_13D6_94A8_41B2_725079A747E5",
 "levels": [
  {
   "url": "media/panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC_1_HS_3_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_9770FDDD_13EB_AF9B_41AB_EB7B8822CA23",
 "levels": [
  {
   "url": "media/panorama_19E375FE_1216_66E4_4191_BBB15E69B8DC_0_HS_4_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_94238884_13D6_9468_41AC_248B24B66125",
 "levels": [
  {
   "url": "media/panorama_1C7AA7ED_1212_62E4_4189_A60955E10E08_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_943FC8A1_13D6_95A8_4170_2575470DC3C1",
 "levels": [
  {
   "url": "media/panorama_1F2B9277_12D6_B497_418D_A66B17178836_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_941D087B_13D6_9498_41B1_8E4168D1F5F6",
 "levels": [
  {
   "url": "media/panorama_1ED7C008_1217_BD2C_41B0_159A6CBF8842_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_941D587B_13D6_949F_41AC_FABF73EF6070",
 "levels": [
  {
   "url": "media/panorama_1ED7C008_1217_BD2C_41B0_159A6CBF8842_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_941CF881_13D6_9468_41AD_778797A730B3",
 "levels": [
  {
   "url": "media/panorama_1ED7C008_1217_BD2C_41B0_159A6CBF8842_1_HS_2_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_941C3881_13D6_9468_419D_341125FEDC7A",
 "levels": [
  {
   "url": "media/panorama_1ED7C008_1217_BD2C_41B0_159A6CBF8842_1_HS_3_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_94C408AA_13D6_95B8_4195_D4436F34E17E",
 "levels": [
  {
   "url": "media/panorama_49AFA632_135A_BCA9_41A2_1F29C0D05566_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_94C7F8AA_13D6_95B8_4191_BE628A8A114C",
 "levels": [
  {
   "url": "media/panorama_49AFA632_135A_BCA9_41A2_1F29C0D05566_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_94CFF8B0_13D6_95A8_41AF_481EBCE5DFEB",
 "levels": [
  {
   "url": "media/panorama_7176E1A8_13B7_B7B9_419E_B2A83EBA5F99_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_94CEB8B0_13D6_95A8_418E_7A84F2A65EA3",
 "levels": [
  {
   "url": "media/panorama_7176E1A8_13B7_B7B9_419E_B2A83EBA5F99_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_94CE68B1_13D6_95A8_4185_387AD5823AB9",
 "levels": [
  {
   "url": "media/panorama_7176E1A8_13B7_B7B9_419E_B2A83EBA5F99_1_HS_2_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_97321E1B_13EB_AC9F_41A0_B59489FEFB72",
 "levels": [
  {
   "url": "media/panorama_7176E1A8_13B7_B7B9_419E_B2A83EBA5F99_0_HS_3_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_94CA78AF_13D6_95B8_41B1_03C1E5698E4F",
 "levels": [
  {
   "url": "media/panorama_7178E80E_13B6_9478_4187_6F7683DD2190_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_94CD28AF_13D6_95B8_41A5_0CE359333778",
 "levels": [
  {
   "url": "media/panorama_7178E80E_13B6_9478_4187_6F7683DD2190_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_941E7883_13D6_9468_41A7_219493B29B42",
 "levels": [
  {
   "url": "media/panorama_1D835FBE_1212_A364_41A6_D59FED93F3EB_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_94C048A3_13D6_95A8_41AA_26AD225DB6F3",
 "levels": [
  {
   "url": "media/panorama_49AF9DC3_135A_EFE8_41B0_A74AB8E7B2D6_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_94C3D8A3_13D6_95A8_4196_20407A0566A1",
 "levels": [
  {
   "url": "media/panorama_49AF9DC3_135A_EFE8_41B0_A74AB8E7B2D6_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_94194879_13D6_9498_419A_9F0852F872D9",
 "levels": [
  {
   "url": "media/panorama_1E31C113_1217_9F23_41AF_9721C1EE070D_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_94189879_13D6_9498_4191_2C5D6F238653",
 "levels": [
  {
   "url": "media/panorama_1E31C113_1217_9F23_41AF_9721C1EE070D_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_942B588F_13D6_9478_41B2_7A523D2A5848",
 "levels": [
  {
   "url": "media/panorama_1C749FB8_122E_E36C_4193_79DF9A264D45_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_9428388E_13D6_9478_41B0_29E153A67088",
 "levels": [
  {
   "url": "media/panorama_1C74D9CF_122E_AF24_41AA_174DA8673956_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_9428588F_13D6_9478_4196_0609BA3EB297",
 "levels": [
  {
   "url": "media/panorama_1C74D9CF_122E_AF24_41AA_174DA8673956_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_942B288F_13D6_9478_41AC_A58DB80A4C70",
 "levels": [
  {
   "url": "media/panorama_1C74D9CF_122E_AF24_41AA_174DA8673956_1_HS_2_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_9430E893_13D6_9468_4172_2120FDD36A96",
 "levels": [
  {
   "url": "media/panorama_1F7039BE_12B5_9798_41B0_325FFC1AF137_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_94306894_13D6_9468_41AF_EC6310DBE930",
 "levels": [
  {
   "url": "media/panorama_1F7039BE_12B5_9798_41B0_325FFC1AF137_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_9433E894_13D6_9468_4197_330ADA36CA17",
 "levels": [
  {
   "url": "media/panorama_1F7039BE_12B5_9798_41B0_325FFC1AF137_1_HS_2_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_94337894_13D6_9468_4170_D19E0EEEB7AE",
 "levels": [
  {
   "url": "media/panorama_1F7039BE_12B5_9798_41B0_325FFC1AF137_1_HS_3_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_9432D895_13D6_9468_4193_14B0F3D08239",
 "levels": [
  {
   "url": "media/panorama_1C461727_12B7_9CA8_41A0_02E993644282_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_94177878_13D6_9498_41A6_EACB7D8E6E06",
 "levels": [
  {
   "url": "media/panorama_1E3E7C89_1216_A52F_41B0_E95358B2767C_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_9416B878_13D6_9498_41AA_33E29BCEF63C",
 "levels": [
  {
   "url": "media/panorama_1E3E7C89_1216_A52F_41B0_E95358B2767C_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_94163879_13D6_9498_415E_9371142A636C",
 "levels": [
  {
   "url": "media/panorama_1E3E7C89_1216_A52F_41B0_E95358B2767C_1_HS_2_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_94298888_13D6_9478_41A6_F780DA5C92DB",
 "levels": [
  {
   "url": "media/panorama_1C74B41E_122E_A525_418F_5DB5C0137B9B_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_94290889_13D6_9478_41B0_EAB9B4B93956",
 "levels": [
  {
   "url": "media/panorama_1C74B41E_122E_A525_418F_5DB5C0137B9B_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_9428B889_13D6_9478_41A5_8439477C33BD",
 "levels": [
  {
   "url": "media/panorama_1C74B41E_122E_A525_418F_5DB5C0137B9B_1_HS_2_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_66228586_13DE_7C69_41B2_4F28E8B26C50",
 "levels": [
  {
   "url": "media/panorama_618DAC0E_13DE_AC79_41B1_10B967991445_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_94325895_13D6_9468_419B_C33FAE1426BA",
 "levels": [
  {
   "url": "media/panorama_1D392500_12B5_BC69_41B1_8B4E63350F5E_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_942AC88F_13D6_9478_4163_FBE5142F854A",
 "levels": [
  {
   "url": "media/panorama_1C74934B_122E_A32C_41AF_0A51BBA11B42_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_942A5890_13D6_9468_41A3_2D15E1165A5A",
 "levels": [
  {
   "url": "media/panorama_1C74934B_122E_A32C_41AF_0A51BBA11B42_1_HS_1_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_9420A884_13D6_9468_41AC_566B3EA28843",
 "levels": [
  {
   "url": "media/panorama_1C6FEA43_1212_ED23_419C_BCE14B6B6A04_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_94C2B8A3_13D6_95A8_4191_3C2E4628A6F9",
 "levels": [
  {
   "url": "media/panorama_49AFE1F3_135A_97A8_4187_C6E968ACA6B8_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_94C248A4_13D6_95A8_41B2_B7497B467EA2",
 "levels": [
  {
   "url": "media/panorama_49AFE1F3_135A_97A8_4187_C6E968ACA6B8_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_94C5D8A4_13D6_95A8_4196_637E566A987E",
 "levels": [
  {
   "url": "media/panorama_49AFE1F3_135A_97A8_4187_C6E968ACA6B8_1_HS_2_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_94C4A8A5_13D6_95A8_41A7_B28E25D22B71",
 "levels": [
  {
   "url": "media/panorama_49AFE1F3_135A_97A8_4187_C6E968ACA6B8_1_HS_3_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_9427F887_13D6_9468_419B_D29F636525C2",
 "levels": [
  {
   "url": "media/panorama_1C6B4747_122D_A323_4183_68A8F7F1D0BB_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_941B687A_13D6_9498_41AF_905CEC80CB03",
 "levels": [
  {
   "url": "media/panorama_1E36C7D9_1217_E32F_419A_CA22B2D4E0D8_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_941AA87A_13D6_9498_41A6_F46A50295466",
 "levels": [
  {
   "url": "media/panorama_1E36C7D9_1217_E32F_419A_CA22B2D4E0D8_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_94247887_13D6_9468_41AE_53ECE01B9DBC",
 "levels": [
  {
   "url": "media/panorama_1CC7CD8C_1233_E724_41A4_7036FC9FAFBA_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_9424E886_13D6_9468_4196_CDEC8909310D",
 "levels": [
  {
   "url": "media/panorama_1C4AA941_122D_AF1C_4194_652BF1171E50_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_94276888_13D6_9478_4194_501BE21F23F8",
 "levels": [
  {
   "url": "media/panorama_1C7411C6_122E_7F24_4183_991262FE3F99_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_94269888_13D6_9478_41A7_0293FCC36109",
 "levels": [
  {
   "url": "media/panorama_1C7411C6_122E_7F24_4183_991262FE3F99_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_94260888_13D6_9478_418F_BC5FDFA35CA6",
 "levels": [
  {
   "url": "media/panorama_1C7411C6_122E_7F24_4183_991262FE3F99_1_HS_2_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_942EF892_13D6_9468_4193_81D5B3666F2F",
 "levels": [
  {
   "url": "media/panorama_1C5E8E0D_122F_E524_41AB_25431A77DDE1_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_9435D895_13D6_9468_41B2_953E2AAFE675",
 "levels": [
  {
   "url": "media/panorama_1D4CDF0B_12AA_AC78_4190_C5BCACDF8F2B_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_9434A895_13D6_9468_418B_02DF4B72E6EE",
 "levels": [
  {
   "url": "media/panorama_1D4CDF0B_12AA_AC78_4190_C5BCACDF8F2B_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_94340896_13D6_9468_4188_74585E107C11",
 "levels": [
  {
   "url": "media/panorama_1D4CDF0B_12AA_AC78_4190_C5BCACDF8F2B_1_HS_2_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_94D1F8B1_13D6_95A8_41B3_1E45FFB9DDEE",
 "levels": [
  {
   "url": "media/panorama_632FB807_13AA_9468_4199_F2D987E571CA_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_941F2882_13D6_9468_419F_5C20035EA5DF",
 "levels": [
  {
   "url": "media/panorama_1E590196_1216_7F24_41A7_D1A1589C2A9E_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_941F7882_13D6_9468_41A4_B8C404B351B5",
 "levels": [
  {
   "url": "media/panorama_1E590196_1216_7F24_41A7_D1A1589C2A9E_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_941EE882_13D6_9468_413B_B2C32AE6FF6C",
 "levels": [
  {
   "url": "media/panorama_1E590196_1216_7F24_41A7_D1A1589C2A9E_1_HS_2_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_94165879_13D6_9498_4170_B079642F46E5",
 "levels": [
  {
   "url": "media/panorama_1E3E2E98_1216_652C_418E_1DBFF6445B9F_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_94199879_13D6_9498_41A0_F276DDE6077D",
 "levels": [
  {
   "url": "media/panorama_1E3E2E98_1216_652C_418E_1DBFF6445B9F_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_94193879_13D6_9498_41A6_211A2EA94192",
 "levels": [
  {
   "url": "media/panorama_1E3E2E98_1216_652C_418E_1DBFF6445B9F_1_HS_2_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_942FD891_13D6_9468_4176_6B79F8394C20",
 "levels": [
  {
   "url": "media/panorama_1C63E5B5_122F_A764_412F_D3ADED669290_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_942F5891_13D6_9468_41A5_DCC2DE5833BF",
 "levels": [
  {
   "url": "media/panorama_1C63E5B5_122F_A764_412F_D3ADED669290_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_9422E885_13D6_9468_41A0_A465318CA99E",
 "levels": [
  {
   "url": "media/panorama_1C5160C8_122D_9D2D_41B1_024A8D5AFA43_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_94226885_13D6_9468_41AC_30C540234E1E",
 "levels": [
  {
   "url": "media/panorama_1C5160C8_122D_9D2D_41B1_024A8D5AFA43_1_HS_1_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_94258885_13D6_9468_4163_0F3454C798E6",
 "levels": [
  {
   "url": "media/panorama_1C5160C8_122D_9D2D_41B1_024A8D5AFA43_1_HS_2_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_94252885_13D6_9468_419F_33255F630FC1",
 "levels": [
  {
   "url": "media/panorama_1C5160C8_122D_9D2D_41B1_024A8D5AFA43_1_HS_3_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_9417C878_13D6_9498_4198_9A9F94E3D7B2",
 "levels": [
  {
   "url": "media/panorama_1E261A0A_1216_AD2C_41A3_6B0EE11D4D7E_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_941E0882_13D6_9468_4195_1794F95411F4",
 "levels": [
  {
   "url": "media/panorama_1EC76234_1216_9D64_41A9_AF64765A9F9F_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_941FC882_13D6_9468_41B2_EB177517901D",
 "levels": [
  {
   "url": "media/panorama_1EC76234_1216_9D64_41A9_AF64765A9F9F_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_94C1F8A2_13D6_95A8_41A9_6B60510E69E7",
 "levels": [
  {
   "url": "media/panorama_5EF35374_136E_B4A8_4191_7E72995B3ECD_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_94C118A2_13D6_95A8_41AC_1FB316BBB6F8",
 "levels": [
  {
   "url": "media/panorama_5EF35374_136E_B4A8_4191_7E72995B3ECD_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_661CF57D_13DE_7C9B_4191_850C29BDE7EB",
 "levels": [
  {
   "url": "media/panorama_5EF35374_136E_B4A8_4191_7E72995B3ECD_0_HS_2_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_942E2891_13D6_9468_419F_ACF6A96B4616",
 "levels": [
  {
   "url": "media/panorama_1C5A781B_122F_AD2C_419A_D55C87F1D7C4_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_942E4892_13D6_9468_41B1_60C07C4887AB",
 "levels": [
  {
   "url": "media/panorama_1C5A781B_122F_AD2C_419A_D55C87F1D7C4_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_9431D892_13D6_9468_41B3_14C7569BD6C5",
 "levels": [
  {
   "url": "media/panorama_1C5A781B_122F_AD2C_419A_D55C87F1D7C4_1_HS_2_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_943E48A2_13D6_95A8_41AF_4E7BB53BD14D",
 "levels": [
  {
   "url": "media/panorama_59E47185_136B_F468_41AE_60E9A934E07E_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_942E5893_13D6_9468_4191_3E9180D07769",
 "levels": [
  {
   "url": "media/panorama_027D9014_12BA_7468_41AE_B7601C694ED1_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_94319893_13D6_9468_41AD_3E32D27113AE",
 "levels": [
  {
   "url": "media/panorama_027D9014_12BA_7468_41AE_B7601C694ED1_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_94310893_13D6_9468_41A9_9DEAC094BB17",
 "levels": [
  {
   "url": "media/panorama_027D9014_12BA_7468_41AE_B7601C694ED1_1_HS_2_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_94379896_13D6_9468_418C_FD33FC1362CE",
 "levels": [
  {
   "url": "media/panorama_1F53F5D9_12AA_FF98_41A3_6B669E91923B_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_94376896_13D6_9468_4194_FDFD15BFB4BC",
 "levels": [
  {
   "url": "media/panorama_1F53F5D9_12AA_FF98_41A3_6B669E91923B_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_94C748AB_13D6_95B8_4186_44DA98675CF0",
 "levels": [
  {
   "url": "media/panorama_49AF6A22_135A_94A9_41AA_E036F21F6533_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_94C608AB_13D6_95B8_418A_064521FD3FFE",
 "levels": [
  {
   "url": "media/panorama_49AF6A22_135A_94A9_41AA_E036F21F6533_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_9438B89D_13D6_9598_41A3_4B291434DE23",
 "levels": [
  {
   "url": "media/panorama_1F76471E_12AA_BC99_417D_DD5A2084733C_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_9438389D_13D6_9598_41A0_E2FA548866BA",
 "levels": [
  {
   "url": "media/panorama_1F76471E_12AA_BC99_417D_DD5A2084733C_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 21,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_943BB89D_13D6_9598_4143_792438EB6B72",
 "levels": [
  {
   "url": "media/panorama_1F76471E_12AA_BC99_417D_DD5A2084733C_1_HS_2_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_942DD890_13D6_9468_419C_15F2D2EFF8EA",
 "levels": [
  {
   "url": "media/panorama_1C7416BE_122E_A565_41A7_E6DAA86F5840_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
}],
 "width": "100%",
 "data": {
  "name": "Player43899"
 }
};

    
    function HistoryData(playList) {
        this.playList = playList;
        this.list = [];
        this.pointer = -1;
    }

    HistoryData.prototype.add = function(index){
        if(this.pointer < this.list.length && this.list[this.pointer] == index) {
            return;
        }
        ++this.pointer;
        this.list.splice(this.pointer, this.list.length - this.pointer, index);
    };

    HistoryData.prototype.back = function(){
        if(!this.canBack()) return;
        this.playList.set('selectedIndex', this.list[--this.pointer]);
    };

    HistoryData.prototype.forward = function(){
        if(!this.canForward()) return;
        this.playList.set('selectedIndex', this.list[++this.pointer]);
    };

    HistoryData.prototype.canBack = function(){
        return this.pointer > 0;
    };

    HistoryData.prototype.canForward = function(){
        return this.pointer >= 0 && this.pointer < this.list.length-1;
    };
    //

    if(script.data == undefined)
        script.data = {};
    script.data["history"] = {};    //playListID -> HistoryData

    TDV.PlayerAPI.defineScript(script);
})();
