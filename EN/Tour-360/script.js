(function(){
    var script = {
 "mouseWheelEnabled": true,
 "start": "this.playAudioList([this.audio_A889449F_BACA_C7FB_41D8_44747BEAABA0]); this.init(); this.syncPlaylists([this.ThumbnailList_B4C70303_BA1B_3C09_41E7_1963A5FB58CE_playlist,this.mainPlayList]); if(!this.get('fullscreenAvailable')) { [this.IconButton_7B364B59_742E_2DCB_41C4_D25B9741B33A].forEach(function(component) { component.set('visible', false); }) }",
 "scrollBarWidth": 10,
 "id": "rootPlayer",
 "mobileMipmappingEnabled": false,
 "vrPolyfillScale": 0.5,
 "propagateClick": false,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "layout": "absolute",
 "paddingRight": 0,
 "class": "Player",
 "backgroundPreloadEnabled": true,
 "children": [
  "this.MainViewer",
  "this.IconButton_B4F1C830_BA1B_2C08_41B1_CC948FC34917",
  "this.ThumbnailList_B4C70303_BA1B_3C09_41E7_1963A5FB58CE",
  "this.IconButton_7A90D7E7_6F02_7FCA_41BB_14B5D033CCAD",
  "this.IconButton_7B364B59_742E_2DCB_41C4_D25B9741B33A",
  "this.veilPopupPanorama",
  "this.zoomImagePopupPanorama",
  "this.closeButtonPopupPanorama"
 ],
 "borderSize": 0,
 "desktopMipmappingEnabled": false,
 "minHeight": 20,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "buttonToggleFullscreen": "this.IconButton_7B364B59_742E_2DCB_41C4_D25B9741B33A",
 "scripts": {
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "registerKey": function(key, value){  window[key] = value; },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "unregisterKey": function(key){  delete window[key]; },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "existsKey": function(key){  return key in window; },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "getKey": function(key){  return window[key]; }
 },
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 20,
 "verticalAlign": "top",
 "defaultVRPointer": "laser",
 "horizontalAlign": "left",
 "gap": 10,
 "height": "100%",
 "paddingBottom": 0,
 "buttonToggleMute": "this.IconButton_7A90D7E7_6F02_7FCA_41BB_14B5D033CCAD",
 "downloadEnabled": false,
 "shadow": false,
 "paddingTop": 0,
 "borderRadius": 0,
 "overflow": "visible",
 "definitions": [{
 "duration": 500,
 "id": "FadeInEffect_7BDE54A5_7422_3B7B_41D6_5A7D2DFAE471",
 "easing": "cubic_in",
 "class": "FadeInEffect"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -6.22,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_60480364_7426_3DF9_41D4_661D964B731A"
},
{
 "viewerArea": "this.MainViewer",
 "displayPlaybackBar": true,
 "class": "PanoramaPlayer",
 "touchControlMode": "drag_rotation",
 "id": "MainViewerPanoramaPlayer",
 "gyroscopeVerticalDraggingEnabled": true,
 "mouseControlMode": "drag_acceleration"
},
{
 "id": "ImageResource_21603D75_31E1_D626_4185_9EC156994181",
 "class": "ImageResource",
 "levels": [
  {
   "url": "media/popup_A2CDBEA5_BBB0_958E_41C1_80D65946A23C_0_0.png",
   "width": 2000,
   "class": "ImageResourceLevel",
   "height": 2000
  },
  {
   "url": "media/popup_A2CDBEA5_BBB0_958E_41C1_80D65946A23C_0_1.png",
   "width": 1024,
   "class": "ImageResourceLevel",
   "height": 1024
  },
  {
   "url": "media/popup_A2CDBEA5_BBB0_958E_41C1_80D65946A23C_0_2.png",
   "width": 512,
   "class": "ImageResourceLevel",
   "height": 512
  }
 ]
},
{
 "items": [
  {
   "media": "this.panorama_AA62C6E2_BB51_758A_41E5_B86C9FFBCEB8",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_AA62C6E2_BB51_758A_41E5_B86C9FFBCEB8_camera"
  },
  {
   "media": "this.panorama_3A059A6B_304F_BF1B_417E_9D1170254D2A",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3A059A6B_304F_BF1B_417E_9D1170254D2A_camera"
  },
  {
   "media": "this.panorama_3A7D98B9_304E_5B07_41B3_0EA7B832B210",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3A7D98B9_304E_5B07_41B3_0EA7B832B210_camera"
  },
  {
   "media": "this.panorama_3AD8E193_3521_F8FB_41B4_C7EC9E46BED1",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3AD8E193_3521_F8FB_41B4_C7EC9E46BED1_camera"
  },
  {
   "media": "this.panorama_3A7C946B_304F_AB1B_41B9_F4FC4958B0DD",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3A7C946B_304F_AB1B_41B9_F4FC4958B0DD_camera"
  },
  {
   "media": "this.panorama_38A1AA40_3521_C855_41AE_EAFC900E8D5B",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_38A1AA40_3521_C855_41AE_EAFC900E8D5B_camera"
  },
  {
   "media": "this.panorama_3A7C6042_304F_AB05_41BB_9E5BDE610A16",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3A7C6042_304F_AB05_41BB_9E5BDE610A16_camera"
  },
  {
   "media": "this.panorama_3A01C6A8_304F_D706_41B6_6891195BF8E4",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 7, 8)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3A01C6A8_304F_D706_41B6_6891195BF8E4_camera"
  },
  {
   "media": "this.panorama_3A7CACB1_304F_DB06_4171_D242DDD6A640",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 8, 9)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3A7CACB1_304F_DB06_4171_D242DDD6A640_camera"
  },
  {
   "media": "this.panorama_3A1EC2B5_304F_EF0E_4198_A2503B9406DD",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 9, 10)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3A1EC2B5_304F_EF0E_4198_A2503B9406DD_camera"
  },
  {
   "media": "this.panorama_3A7DCC94_304E_7B0D_41C0_BE373044AD04",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 10, 11)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3A7DCC94_304E_7B0D_41C0_BE373044AD04_camera"
  },
  {
   "media": "this.panorama_3A1A02A4_304E_6F0E_41C5_AC4A3516F2EE",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 11, 12)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3A1A02A4_304E_6F0E_41C5_AC4A3516F2EE_camera"
  },
  {
   "media": "this.panorama_AB090F57_BB50_948A_41AB_C9B9971030AD",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 12, 13)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_AB090F57_BB50_948A_41AB_C9B9971030AD_camera"
  },
  {
   "media": "this.panorama_3A1D961B_304E_773A_41B3_DB48EC1F9BB9",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 13, 14)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3A1D961B_304E_773A_41B3_DB48EC1F9BB9_camera"
  },
  {
   "media": "this.panorama_3B09714D_304E_AD1E_4199_D052CEA2C9CA",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 14, 15)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3B09714D_304E_AD1E_4199_D052CEA2C9CA_camera"
  },
  {
   "media": "this.panorama_4B217AF1_5F2C_5F1C_418B_6359B28A1ECF",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 15, 16)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_4B217AF1_5F2C_5F1C_418B_6359B28A1ECF_camera"
  },
  {
   "media": "this.panorama_3A7DD01D_304E_6B3E_41C0_CDFC2AF5C1B5",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 16, 17)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3A7DD01D_304E_6B3E_41C0_CDFC2AF5C1B5_camera"
  },
  {
   "media": "this.panorama_3A7CF4F2_304F_EB0A_41C4_9CC1C3CEF207",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 17, 18)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3A7CF4F2_304F_EB0A_41C4_9CC1C3CEF207_camera"
  },
  {
   "media": "this.panorama_3A0172E9_304F_AF07_41B5_6F764155656E",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 18, 19)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3A0172E9_304F_AF07_41B5_6F764155656E_camera"
  },
  {
   "media": "this.panorama_3A7B68D1_304E_5B07_41C0_CD9E794756C0",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 19, 20)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3A7B68D1_304E_5B07_41C0_CD9E794756C0_camera"
  },
  {
   "media": "this.panorama_B67D7675_BB50_B48E_4194_BA9CBDCEFC89",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 20, 21)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_B67D7675_BB50_B48E_4194_BA9CBDCEFC89_camera"
  },
  {
   "media": "this.panorama_3A7B50D0_304F_AB05_41B3_D8035AC7BF4F",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 21, 22)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3A7B50D0_304F_AB05_41B3_D8035AC7BF4F_camera"
  },
  {
   "media": "this.panorama_3A04272A_304F_B51A_41C4_E50EE9F2652F",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 22, 23)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3A04272A_304F_B51A_41C4_E50EE9F2652F_camera"
  },
  {
   "media": "this.panorama_3A7B0CF2_304F_BB05_41C7_8B0505061C09",
   "camera": "this.panorama_3A7B0CF2_304F_BB05_41C7_8B0505061C09_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 23, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "end": "this.trigger('tourEnded')"
  }
 ],
 "id": "mainPlayList",
 "class": "PlayList"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_3A7DCC94_304E_7B0D_41C0_BE373044AD04_camera"
},
{
 "adjacentPanoramas": [
  {
   "yaw": 10.71,
   "backwardYaw": -179.57,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3A1A02A4_304E_6F0E_41C5_AC4A3516F2EE",
   "distance": 1
  },
  {
   "yaw": 176.47,
   "backwardYaw": -72.89,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3A1D961B_304E_773A_41B3_DB48EC1F9BB9",
   "distance": 1
  }
 ],
 "hfov": 360,
 "label": "Way to Beji 6",
 "id": "panorama_AB090F57_BB50_948A_41AB_C9B9971030AD",
 "thumbnailUrl": "media/panorama_AB090F57_BB50_948A_41AB_C9B9971030AD_t.jpg",
 "hfovMax": 130,
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AB090F57_BB50_948A_41AB_C9B9971030AD_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_AB090F57_BB50_948A_41AB_C9B9971030AD_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_AB090F57_BB50_948A_41AB_C9B9971030AD_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AB090F57_BB50_948A_41AB_C9B9971030AD_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_AB090F57_BB50_948A_41AB_C9B9971030AD_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_AB090F57_BB50_948A_41AB_C9B9971030AD_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AB090F57_BB50_948A_41AB_C9B9971030AD_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_AB090F57_BB50_948A_41AB_C9B9971030AD_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_AB090F57_BB50_948A_41AB_C9B9971030AD_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AB090F57_BB50_948A_41AB_C9B9971030AD_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_AB090F57_BB50_948A_41AB_C9B9971030AD_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_AB090F57_BB50_948A_41AB_C9B9971030AD_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AB090F57_BB50_948A_41AB_C9B9971030AD_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_AB090F57_BB50_948A_41AB_C9B9971030AD_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_AB090F57_BB50_948A_41AB_C9B9971030AD_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_AB090F57_BB50_948A_41AB_C9B9971030AD_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AB090F57_BB50_948A_41AB_C9B9971030AD_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_AB090F57_BB50_948A_41AB_C9B9971030AD_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_AB090F57_BB50_948A_41AB_C9B9971030AD_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_B529529A_BB53_8DBA_41E0_08470D413541",
  "this.overlay_B4210589_BB50_F786_41D0_8D06E1DF3C43"
 ]
},
{
 "adjacentPanoramas": [
  {
   "yaw": -49.89,
   "backwardYaw": 164.21,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3A059A6B_304F_BF1B_417E_9D1170254D2A",
   "distance": 1
  },
  {
   "yaw": -91.21,
   "backwardYaw": 142.92,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3A7D98B9_304E_5B07_41B3_0EA7B832B210",
   "distance": 1
  },
  {
   "yaw": 138.78,
   "backwardYaw": 50.64,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3A7C946B_304F_AB1B_41B9_F4FC4958B0DD",
   "distance": 1
  }
 ],
 "hfov": 360,
 "label": "Jaba Pura 3",
 "id": "panorama_3AD8E193_3521_F8FB_41B4_C7EC9E46BED1",
 "thumbnailUrl": "media/panorama_3AD8E193_3521_F8FB_41B4_C7EC9E46BED1_t.jpg",
 "hfovMax": 130,
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3AD8E193_3521_F8FB_41B4_C7EC9E46BED1_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3AD8E193_3521_F8FB_41B4_C7EC9E46BED1_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3AD8E193_3521_F8FB_41B4_C7EC9E46BED1_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3AD8E193_3521_F8FB_41B4_C7EC9E46BED1_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3AD8E193_3521_F8FB_41B4_C7EC9E46BED1_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3AD8E193_3521_F8FB_41B4_C7EC9E46BED1_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3AD8E193_3521_F8FB_41B4_C7EC9E46BED1_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3AD8E193_3521_F8FB_41B4_C7EC9E46BED1_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3AD8E193_3521_F8FB_41B4_C7EC9E46BED1_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3AD8E193_3521_F8FB_41B4_C7EC9E46BED1_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3AD8E193_3521_F8FB_41B4_C7EC9E46BED1_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3AD8E193_3521_F8FB_41B4_C7EC9E46BED1_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3AD8E193_3521_F8FB_41B4_C7EC9E46BED1_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3AD8E193_3521_F8FB_41B4_C7EC9E46BED1_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3AD8E193_3521_F8FB_41B4_C7EC9E46BED1_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_3AD8E193_3521_F8FB_41B4_C7EC9E46BED1_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3AD8E193_3521_F8FB_41B4_C7EC9E46BED1_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3AD8E193_3521_F8FB_41B4_C7EC9E46BED1_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3AD8E193_3521_F8FB_41B4_C7EC9E46BED1_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_3AB92451_3522_7877_41BC_D83B7D5265FD",
  "this.overlay_25BF5EC2_3522_C855_41C1_EA93485BC64A",
  "this.overlay_AA890382_BB51_B38A_41E5_79FB3A61F02D"
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -149.64,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_60654330_7426_3D59_41C4_BA56D39F4A5A"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0.31,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_636212A8_7426_3F49_41D1_7477D6A4117A"
},
{
 "adjacentPanoramas": [
  {
   "yaw": 95.15,
   "backwardYaw": -0.3,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3A1A02A4_304E_6F0E_41C5_AC4A3516F2EE",
   "distance": 1
  },
  {
   "yaw": 7.45,
   "backwardYaw": 176.66,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3A1EC2B5_304F_EF0E_4198_A2503B9406DD",
   "distance": 1
  }
 ],
 "hfov": 360,
 "label": "Lake ",
 "id": "panorama_3A7DCC94_304E_7B0D_41C0_BE373044AD04",
 "thumbnailUrl": "media/panorama_3A7DCC94_304E_7B0D_41C0_BE373044AD04_t.jpg",
 "hfovMax": 130,
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7DCC94_304E_7B0D_41C0_BE373044AD04_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A7DCC94_304E_7B0D_41C0_BE373044AD04_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A7DCC94_304E_7B0D_41C0_BE373044AD04_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7DCC94_304E_7B0D_41C0_BE373044AD04_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A7DCC94_304E_7B0D_41C0_BE373044AD04_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A7DCC94_304E_7B0D_41C0_BE373044AD04_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7DCC94_304E_7B0D_41C0_BE373044AD04_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A7DCC94_304E_7B0D_41C0_BE373044AD04_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A7DCC94_304E_7B0D_41C0_BE373044AD04_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7DCC94_304E_7B0D_41C0_BE373044AD04_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A7DCC94_304E_7B0D_41C0_BE373044AD04_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A7DCC94_304E_7B0D_41C0_BE373044AD04_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7DCC94_304E_7B0D_41C0_BE373044AD04_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A7DCC94_304E_7B0D_41C0_BE373044AD04_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A7DCC94_304E_7B0D_41C0_BE373044AD04_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_3A7DCC94_304E_7B0D_41C0_BE373044AD04_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7DCC94_304E_7B0D_41C0_BE373044AD04_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A7DCC94_304E_7B0D_41C0_BE373044AD04_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A7DCC94_304E_7B0D_41C0_BE373044AD04_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_27059348_307E_ED06_4180_2684075CDA57",
  "this.overlay_287ACCC1_307F_BB06_4198_6E6F9728615E"
 ]
},
{
 "adjacentPanoramas": [
  {
   "yaw": -164,
   "backwardYaw": -93.96,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3A0172E9_304F_AF07_41B5_6F764155656E",
   "distance": 1
  },
  {
   "yaw": 27.05,
   "backwardYaw": 30.36,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3A1D961B_304E_773A_41B3_DB48EC1F9BB9",
   "distance": 1
  }
 ],
 "hfov": 360,
 "label": "Way to Luhur",
 "id": "panorama_3A7CF4F2_304F_EB0A_41C4_9CC1C3CEF207",
 "thumbnailUrl": "media/panorama_3A7CF4F2_304F_EB0A_41C4_9CC1C3CEF207_t.jpg",
 "hfovMax": 130,
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7CF4F2_304F_EB0A_41C4_9CC1C3CEF207_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A7CF4F2_304F_EB0A_41C4_9CC1C3CEF207_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A7CF4F2_304F_EB0A_41C4_9CC1C3CEF207_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7CF4F2_304F_EB0A_41C4_9CC1C3CEF207_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A7CF4F2_304F_EB0A_41C4_9CC1C3CEF207_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A7CF4F2_304F_EB0A_41C4_9CC1C3CEF207_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7CF4F2_304F_EB0A_41C4_9CC1C3CEF207_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A7CF4F2_304F_EB0A_41C4_9CC1C3CEF207_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A7CF4F2_304F_EB0A_41C4_9CC1C3CEF207_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7CF4F2_304F_EB0A_41C4_9CC1C3CEF207_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A7CF4F2_304F_EB0A_41C4_9CC1C3CEF207_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A7CF4F2_304F_EB0A_41C4_9CC1C3CEF207_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7CF4F2_304F_EB0A_41C4_9CC1C3CEF207_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A7CF4F2_304F_EB0A_41C4_9CC1C3CEF207_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A7CF4F2_304F_EB0A_41C4_9CC1C3CEF207_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_3A7CF4F2_304F_EB0A_41C4_9CC1C3CEF207_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7CF4F2_304F_EB0A_41C4_9CC1C3CEF207_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A7CF4F2_304F_EB0A_41C4_9CC1C3CEF207_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A7CF4F2_304F_EB0A_41C4_9CC1C3CEF207_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_2CCEA81B_304E_5B3B_41B7_873AFDA23828",
  "this.overlay_2C91EFA1_304E_5507_41B5_0FF056452CFF"
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_4B217AF1_5F2C_5F1C_418B_6359B28A1ECF_camera"
},
{
 "adjacentPanoramas": [
  {
   "yaw": 11.54,
   "backwardYaw": -144.99,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3A7B0CF2_304F_BB05_41C7_8B0505061C09",
   "distance": 1
  },
  {
   "yaw": 152.91,
   "backwardYaw": 71.85,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3A7B50D0_304F_AB05_41B3_D8035AC7BF4F",
   "distance": 1
  }
 ],
 "hfov": 360,
 "label": "Luhur 4",
 "id": "panorama_3A04272A_304F_B51A_41C4_E50EE9F2652F",
 "thumbnailUrl": "media/panorama_3A04272A_304F_B51A_41C4_E50EE9F2652F_t.jpg",
 "hfovMax": 130,
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A04272A_304F_B51A_41C4_E50EE9F2652F_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A04272A_304F_B51A_41C4_E50EE9F2652F_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A04272A_304F_B51A_41C4_E50EE9F2652F_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A04272A_304F_B51A_41C4_E50EE9F2652F_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A04272A_304F_B51A_41C4_E50EE9F2652F_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A04272A_304F_B51A_41C4_E50EE9F2652F_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A04272A_304F_B51A_41C4_E50EE9F2652F_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A04272A_304F_B51A_41C4_E50EE9F2652F_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A04272A_304F_B51A_41C4_E50EE9F2652F_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A04272A_304F_B51A_41C4_E50EE9F2652F_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A04272A_304F_B51A_41C4_E50EE9F2652F_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A04272A_304F_B51A_41C4_E50EE9F2652F_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A04272A_304F_B51A_41C4_E50EE9F2652F_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A04272A_304F_B51A_41C4_E50EE9F2652F_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A04272A_304F_B51A_41C4_E50EE9F2652F_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_3A04272A_304F_B51A_41C4_E50EE9F2652F_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A04272A_304F_B51A_41C4_E50EE9F2652F_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A04272A_304F_B51A_41C4_E50EE9F2652F_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A04272A_304F_B51A_41C4_E50EE9F2652F_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_2FD6E34D_3056_ED1E_41BD_9CED08273859",
  "this.overlay_115B56F1_3051_D707_41A3_E857D8D5520E"
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -3.34,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_608F23A2_7426_3D79_41DA_B14663263A0F"
},
{
 "id": "ImageResource_A04CA367_BBB7_8C8A_41D2_081492E6E3FB",
 "class": "ImageResource",
 "levels": [
  {
   "url": "media/popup_AC07FBAF_BB51_739A_41CF_BAE29C7973CA_0_0.png",
   "width": 2000,
   "class": "ImageResourceLevel",
   "height": 2000
  },
  {
   "url": "media/popup_AC07FBAF_BB51_739A_41CF_BAE29C7973CA_0_1.png",
   "width": 1024,
   "class": "ImageResourceLevel",
   "height": 1024
  },
  {
   "url": "media/popup_AC07FBAF_BB51_739A_41CF_BAE29C7973CA_0_2.png",
   "width": 512,
   "class": "ImageResourceLevel",
   "height": 512
  }
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -27.09,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_626171AB_7426_3D4F_41D9_BB7886615700"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_3A7C946B_304F_AB1B_41B9_F4FC4958B0DD_camera"
},
{
 "duration": 500,
 "id": "FadeOutEffect_7BDE44A5_7422_3B7B_41D4_2584218218B9",
 "easing": "cubic_out",
 "class": "FadeOutEffect"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -15.79,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_60FA33AA_7426_3D49_41D4_64B4B49BFAD2"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -168.46,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_60693339_7426_3D4B_41D2_D59FC52F41D5"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_3A059A6B_304F_BF1B_417E_9D1170254D2A_camera"
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupMaxWidth": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hfov": 7.25,
 "hideDuration": 500,
 "yaw": 122.41,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "id": "popup_A2CDBEA5_BBB0_958E_41C1_80D65946A23C",
 "class": "PopupPanoramaOverlay",
 "pitch": -4.86,
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_A2CDBEA5_BBB0_958E_41C1_80D65946A23C_0_1.png",
    "width": 1024,
    "class": "ImageResourceLevel",
    "height": 1024
   }
  ]
 },
 "popupDistance": 100
},
{
 "adjacentPanoramas": [
  {
   "yaw": -34.3,
   "backwardYaw": 126.57,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3A7B68D1_304E_5B07_41C0_CD9E794756C0",
   "distance": 1
  },
  {
   "yaw": -171.85,
   "backwardYaw": -30.88,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3A7B50D0_304F_AB05_41B3_D8035AC7BF4F",
   "distance": 1
  }
 ],
 "hfov": 360,
 "label": "Luhur 2",
 "id": "panorama_B67D7675_BB50_B48E_4194_BA9CBDCEFC89",
 "thumbnailUrl": "media/panorama_B67D7675_BB50_B48E_4194_BA9CBDCEFC89_t.jpg",
 "hfovMax": 130,
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B67D7675_BB50_B48E_4194_BA9CBDCEFC89_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B67D7675_BB50_B48E_4194_BA9CBDCEFC89_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B67D7675_BB50_B48E_4194_BA9CBDCEFC89_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B67D7675_BB50_B48E_4194_BA9CBDCEFC89_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B67D7675_BB50_B48E_4194_BA9CBDCEFC89_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B67D7675_BB50_B48E_4194_BA9CBDCEFC89_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B67D7675_BB50_B48E_4194_BA9CBDCEFC89_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B67D7675_BB50_B48E_4194_BA9CBDCEFC89_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B67D7675_BB50_B48E_4194_BA9CBDCEFC89_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B67D7675_BB50_B48E_4194_BA9CBDCEFC89_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B67D7675_BB50_B48E_4194_BA9CBDCEFC89_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B67D7675_BB50_B48E_4194_BA9CBDCEFC89_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B67D7675_BB50_B48E_4194_BA9CBDCEFC89_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B67D7675_BB50_B48E_4194_BA9CBDCEFC89_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B67D7675_BB50_B48E_4194_BA9CBDCEFC89_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_B67D7675_BB50_B48E_4194_BA9CBDCEFC89_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B67D7675_BB50_B48E_4194_BA9CBDCEFC89_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B67D7675_BB50_B48E_4194_BA9CBDCEFC89_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B67D7675_BB50_B48E_4194_BA9CBDCEFC89_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_B4232791_BB57_7386_4154_FAA440142CAE",
  "this.overlay_AA1F9706_BB51_748A_41A5_E01D25268C93"
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 5.89,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_62FB2245_7426_3F3B_41B9_C662A2B80F71"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_AA62C6E2_BB51_758A_41E5_B86C9FFBCEB8_camera"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 61.9,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_60B8937A_7426_3DC9_41D9_9B119C5CA5F3"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 35.01,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_62C57272_7426_3FD9_41BA_52AD0F34D798"
},
{
 "adjacentPanoramas": [
  {
   "yaw": 120.8,
   "backwardYaw": 156.57,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3B09714D_304E_AD1E_4199_D052CEA2C9CA",
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3A7DD01D_304E_6B3E_41C0_CDFC2AF5C1B5"
  }
 ],
 "hfov": 360,
 "label": "Beji 2",
 "id": "panorama_4B217AF1_5F2C_5F1C_418B_6359B28A1ECF",
 "thumbnailUrl": "media/panorama_4B217AF1_5F2C_5F1C_418B_6359B28A1ECF_t.jpg",
 "hfovMax": 130,
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_4B217AF1_5F2C_5F1C_418B_6359B28A1ECF_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_4B217AF1_5F2C_5F1C_418B_6359B28A1ECF_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_4B217AF1_5F2C_5F1C_418B_6359B28A1ECF_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_4B217AF1_5F2C_5F1C_418B_6359B28A1ECF_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_4B217AF1_5F2C_5F1C_418B_6359B28A1ECF_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_4B217AF1_5F2C_5F1C_418B_6359B28A1ECF_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_4B217AF1_5F2C_5F1C_418B_6359B28A1ECF_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_4B217AF1_5F2C_5F1C_418B_6359B28A1ECF_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_4B217AF1_5F2C_5F1C_418B_6359B28A1ECF_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_4B217AF1_5F2C_5F1C_418B_6359B28A1ECF_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_4B217AF1_5F2C_5F1C_418B_6359B28A1ECF_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_4B217AF1_5F2C_5F1C_418B_6359B28A1ECF_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_4B217AF1_5F2C_5F1C_418B_6359B28A1ECF_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_4B217AF1_5F2C_5F1C_418B_6359B28A1ECF_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_4B217AF1_5F2C_5F1C_418B_6359B28A1ECF_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_4B217AF1_5F2C_5F1C_418B_6359B28A1ECF_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_4B217AF1_5F2C_5F1C_418B_6359B28A1ECF_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_4B217AF1_5F2C_5F1C_418B_6359B28A1ECF_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_4B217AF1_5F2C_5F1C_418B_6359B28A1ECF_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_4C848896_5F2C_DB04_41A2_9C962319E57F",
  "this.overlay_4CC0ED59_5F2D_D50D_41B2_AEEE95E2864E",
  "this.overlay_4720EB99_5F2C_DD0C_41BC_187EEC9F8652",
  "this.popup_4A6511F5_5F2C_CD05_41D5_B18E220B93F6"
 ]
},
{
 "adjacentPanoramas": [
  {
   "yaw": 4.4,
   "backwardYaw": -179.69,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3A0172E9_304F_AF07_41B5_6F764155656E",
   "distance": 1
  },
  {
   "yaw": 126.57,
   "backwardYaw": -34.3,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_B67D7675_BB50_B48E_4194_BA9CBDCEFC89",
   "distance": 1
  }
 ],
 "hfov": 360,
 "label": "Luhur",
 "id": "panorama_3A7B68D1_304E_5B07_41C0_CD9E794756C0",
 "thumbnailUrl": "media/panorama_3A7B68D1_304E_5B07_41C0_CD9E794756C0_t.jpg",
 "hfovMax": 130,
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7B68D1_304E_5B07_41C0_CD9E794756C0_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A7B68D1_304E_5B07_41C0_CD9E794756C0_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A7B68D1_304E_5B07_41C0_CD9E794756C0_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7B68D1_304E_5B07_41C0_CD9E794756C0_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A7B68D1_304E_5B07_41C0_CD9E794756C0_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A7B68D1_304E_5B07_41C0_CD9E794756C0_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7B68D1_304E_5B07_41C0_CD9E794756C0_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A7B68D1_304E_5B07_41C0_CD9E794756C0_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A7B68D1_304E_5B07_41C0_CD9E794756C0_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7B68D1_304E_5B07_41C0_CD9E794756C0_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A7B68D1_304E_5B07_41C0_CD9E794756C0_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A7B68D1_304E_5B07_41C0_CD9E794756C0_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7B68D1_304E_5B07_41C0_CD9E794756C0_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A7B68D1_304E_5B07_41C0_CD9E794756C0_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A7B68D1_304E_5B07_41C0_CD9E794756C0_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_3A7B68D1_304E_5B07_41C0_CD9E794756C0_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7B68D1_304E_5B07_41C0_CD9E794756C0_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A7B68D1_304E_5B07_41C0_CD9E794756C0_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A7B68D1_304E_5B07_41C0_CD9E794756C0_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_10443EE8_3053_F706_41C1_7AE31052EDE2",
  "this.overlay_2DCF9F65_3052_550E_4186_495059D1A031"
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 88.79,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_63AEA2D5_7426_3CDA_41C2_5158BF1873AD"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -163.35,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_60531342_7426_3D39_41C3_C05114C4784D"
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupMaxWidth": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hfov": 6.39,
 "hideDuration": 500,
 "yaw": 2.73,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "id": "popup_AC07FBAF_BB51_739A_41CF_BAE29C7973CA",
 "class": "PopupPanoramaOverlay",
 "pitch": -8.15,
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_AC07FBAF_BB51_739A_41CF_BAE29C7973CA_0_1.png",
    "width": 1024,
    "class": "ImageResourceLevel",
    "height": 1024
   }
  ]
 },
 "popupDistance": 100
},
{
 "adjacentPanoramas": [
  {
   "yaw": -5.73,
   "backwardYaw": 170.22,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_AA62C6E2_BB51_758A_41E5_B86C9FFBCEB8",
   "distance": 1
  },
  {
   "yaw": -137.29,
   "backwardYaw": 53.75,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3A7D98B9_304E_5B07_41B3_0EA7B832B210",
   "distance": 1
  },
  {
   "yaw": 164.21,
   "backwardYaw": -49.89,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3AD8E193_3521_F8FB_41B4_C7EC9E46BED1",
   "distance": 1
  }
 ],
 "hfov": 360,
 "label": "Jaba Pura",
 "id": "panorama_3A059A6B_304F_BF1B_417E_9D1170254D2A",
 "thumbnailUrl": "media/panorama_3A059A6B_304F_BF1B_417E_9D1170254D2A_t.jpg",
 "hfovMax": 130,
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A059A6B_304F_BF1B_417E_9D1170254D2A_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A059A6B_304F_BF1B_417E_9D1170254D2A_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A059A6B_304F_BF1B_417E_9D1170254D2A_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A059A6B_304F_BF1B_417E_9D1170254D2A_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A059A6B_304F_BF1B_417E_9D1170254D2A_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A059A6B_304F_BF1B_417E_9D1170254D2A_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A059A6B_304F_BF1B_417E_9D1170254D2A_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A059A6B_304F_BF1B_417E_9D1170254D2A_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A059A6B_304F_BF1B_417E_9D1170254D2A_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A059A6B_304F_BF1B_417E_9D1170254D2A_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A059A6B_304F_BF1B_417E_9D1170254D2A_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A059A6B_304F_BF1B_417E_9D1170254D2A_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A059A6B_304F_BF1B_417E_9D1170254D2A_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A059A6B_304F_BF1B_417E_9D1170254D2A_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A059A6B_304F_BF1B_417E_9D1170254D2A_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_3A059A6B_304F_BF1B_417E_9D1170254D2A_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A059A6B_304F_BF1B_417E_9D1170254D2A_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A059A6B_304F_BF1B_417E_9D1170254D2A_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A059A6B_304F_BF1B_417E_9D1170254D2A_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_3F292C39_3052_BB06_41B5_5FFA0845092D",
  "this.overlay_218AB53B_3052_557A_41BF_78AED4277802",
  "this.overlay_22A4969D_3051_F73F_41B5_F7C84706E6AA"
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 12.29,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_60A7C383_7426_3D3F_41D8_28525EAF2F0A"
},
{
 "adjacentPanoramas": [
  {
   "yaw": 175.87,
   "backwardYaw": 5.02,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3A01C6A8_304F_D706_41B6_6891195BF8E4",
   "distance": 1
  },
  {
   "yaw": -4.16,
   "backwardYaw": 173.78,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_38A1AA40_3521_C855_41AE_EAFC900E8D5B",
   "distance": 1
  }
 ],
 "hfov": 360,
 "label": "Way to Beji 2",
 "id": "panorama_3A7C6042_304F_AB05_41BB_9E5BDE610A16",
 "thumbnailUrl": "media/panorama_3A7C6042_304F_AB05_41BB_9E5BDE610A16_t.jpg",
 "hfovMax": 130,
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7C6042_304F_AB05_41BB_9E5BDE610A16_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A7C6042_304F_AB05_41BB_9E5BDE610A16_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A7C6042_304F_AB05_41BB_9E5BDE610A16_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7C6042_304F_AB05_41BB_9E5BDE610A16_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A7C6042_304F_AB05_41BB_9E5BDE610A16_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A7C6042_304F_AB05_41BB_9E5BDE610A16_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7C6042_304F_AB05_41BB_9E5BDE610A16_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A7C6042_304F_AB05_41BB_9E5BDE610A16_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A7C6042_304F_AB05_41BB_9E5BDE610A16_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7C6042_304F_AB05_41BB_9E5BDE610A16_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A7C6042_304F_AB05_41BB_9E5BDE610A16_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A7C6042_304F_AB05_41BB_9E5BDE610A16_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7C6042_304F_AB05_41BB_9E5BDE610A16_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A7C6042_304F_AB05_41BB_9E5BDE610A16_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A7C6042_304F_AB05_41BB_9E5BDE610A16_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_3A7C6042_304F_AB05_41BB_9E5BDE610A16_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7C6042_304F_AB05_41BB_9E5BDE610A16_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A7C6042_304F_AB05_41BB_9E5BDE610A16_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A7C6042_304F_AB05_41BB_9E5BDE610A16_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_254E22A0_304E_AF05_41C4_8809A67E4302",
  "this.overlay_78D6B092_77A2_D31F_41DA_A29DD5B25361"
 ]
},
{
 "id": "ImageResource_4CA677B2_5F5B_051E_4177_C59371F9E064",
 "class": "ImageResource",
 "levels": [
  {
   "url": "media/popup_4A6511F5_5F2C_CD05_41D5_B18E220B93F6_0_0.png",
   "width": 2000,
   "class": "ImageResourceLevel",
   "height": 2000
  },
  {
   "url": "media/popup_4A6511F5_5F2C_CD05_41D5_B18E220B93F6_0_1.png",
   "width": 1024,
   "class": "ImageResourceLevel",
   "height": 1024
  },
  {
   "url": "media/popup_4A6511F5_5F2C_CD05_41D5_B18E220B93F6_0_2.png",
   "width": 512,
   "class": "ImageResourceLevel",
   "height": 512
  }
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 86.04,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_60618327_7426_3D47_41DA_8CE0D0E71821"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -59.2,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_60B1F36F_7426_3DC7_41DA_E0D632D0C1C9"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -174.98,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_6046635B_7426_3DCF_41C9_806BE01A30DC"
},
{
 "adjacentPanoramas": [
  {
   "yaw": -144.99,
   "backwardYaw": 11.54,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3A04272A_304F_B51A_41C4_E50EE9F2652F",
   "distance": 1
  }
 ],
 "hfov": 360,
 "label": "Luhur 5",
 "id": "panorama_3A7B0CF2_304F_BB05_41C7_8B0505061C09",
 "thumbnailUrl": "media/panorama_3A7B0CF2_304F_BB05_41C7_8B0505061C09_t.jpg",
 "hfovMax": 130,
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7B0CF2_304F_BB05_41C7_8B0505061C09_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A7B0CF2_304F_BB05_41C7_8B0505061C09_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A7B0CF2_304F_BB05_41C7_8B0505061C09_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7B0CF2_304F_BB05_41C7_8B0505061C09_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A7B0CF2_304F_BB05_41C7_8B0505061C09_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A7B0CF2_304F_BB05_41C7_8B0505061C09_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7B0CF2_304F_BB05_41C7_8B0505061C09_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A7B0CF2_304F_BB05_41C7_8B0505061C09_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A7B0CF2_304F_BB05_41C7_8B0505061C09_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7B0CF2_304F_BB05_41C7_8B0505061C09_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A7B0CF2_304F_BB05_41C7_8B0505061C09_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A7B0CF2_304F_BB05_41C7_8B0505061C09_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7B0CF2_304F_BB05_41C7_8B0505061C09_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A7B0CF2_304F_BB05_41C7_8B0505061C09_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A7B0CF2_304F_BB05_41C7_8B0505061C09_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_3A7B0CF2_304F_BB05_41C7_8B0505061C09_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7B0CF2_304F_BB05_41C7_8B0505061C09_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A7B0CF2_304F_BB05_41C7_8B0505061C09_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A7B0CF2_304F_BB05_41C7_8B0505061C09_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_1207A990_3052_BD06_41C1_1A910E36428A",
  "this.overlay_AA974CE4_BABD_474D_41E2_0FAC0557B84F",
  "this.popup_AC07FBAF_BB51_739A_41CF_BAE29C7973CA"
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_3A1A02A4_304E_6F0E_41C5_AC4A3516F2EE_camera"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -41.22,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_62AE520C_7426_3F49_41D7_3BF4D208D1D3"
},
{
 "adjacentPanoramas": [
  {
   "yaw": -118.1,
   "backwardYaw": -147.46,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3B09714D_304E_AD1E_4199_D052CEA2C9CA",
   "distance": 1
  }
 ],
 "hfov": 360,
 "label": "Beji 3",
 "id": "panorama_3A7DD01D_304E_6B3E_41C0_CDFC2AF5C1B5",
 "thumbnailUrl": "media/panorama_3A7DD01D_304E_6B3E_41C0_CDFC2AF5C1B5_t.jpg",
 "hfovMax": 130,
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7DD01D_304E_6B3E_41C0_CDFC2AF5C1B5_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A7DD01D_304E_6B3E_41C0_CDFC2AF5C1B5_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A7DD01D_304E_6B3E_41C0_CDFC2AF5C1B5_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7DD01D_304E_6B3E_41C0_CDFC2AF5C1B5_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A7DD01D_304E_6B3E_41C0_CDFC2AF5C1B5_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A7DD01D_304E_6B3E_41C0_CDFC2AF5C1B5_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7DD01D_304E_6B3E_41C0_CDFC2AF5C1B5_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A7DD01D_304E_6B3E_41C0_CDFC2AF5C1B5_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A7DD01D_304E_6B3E_41C0_CDFC2AF5C1B5_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7DD01D_304E_6B3E_41C0_CDFC2AF5C1B5_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A7DD01D_304E_6B3E_41C0_CDFC2AF5C1B5_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A7DD01D_304E_6B3E_41C0_CDFC2AF5C1B5_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7DD01D_304E_6B3E_41C0_CDFC2AF5C1B5_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A7DD01D_304E_6B3E_41C0_CDFC2AF5C1B5_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A7DD01D_304E_6B3E_41C0_CDFC2AF5C1B5_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_3A7DD01D_304E_6B3E_41C0_CDFC2AF5C1B5_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7DD01D_304E_6B3E_41C0_CDFC2AF5C1B5_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A7DD01D_304E_6B3E_41C0_CDFC2AF5C1B5_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A7DD01D_304E_6B3E_41C0_CDFC2AF5C1B5_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_2B082CF8_3073_BB05_41C0_F18A783927C5"
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_3B09714D_304E_AD1E_4199_D052CEA2C9CA_camera"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 130.11,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_621FA178_7426_3DC9_41B8_D5838E820E7E"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 20.37,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_60C1A3C9_7426_3CCB_41CF_866BE5118321"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 149.12,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_609B9393_7426_3D5F_41C3_0FFE015F3F17"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 8.15,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_625381C0_7426_3D39_41C8_A3968D899396"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 175.84,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_6370229F_7426_3F47_4183_B019A8D861A8"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -84.85,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_6243E1D4_7426_3CD9_41DC_63CD6689DE07"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_3A7B0CF2_304F_BB05_41C7_8B0505061C09_camera"
},
{
 "items": [
  {
   "media": "this.panorama_AA62C6E2_BB51_758A_41E5_B86C9FFBCEB8",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_B4C70303_BA1B_3C09_41E7_1963A5FB58CE_playlist, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_AA62C6E2_BB51_758A_41E5_B86C9FFBCEB8_camera"
  },
  {
   "media": "this.panorama_3A059A6B_304F_BF1B_417E_9D1170254D2A",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_B4C70303_BA1B_3C09_41E7_1963A5FB58CE_playlist, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3A059A6B_304F_BF1B_417E_9D1170254D2A_camera"
  },
  {
   "media": "this.panorama_3A7D98B9_304E_5B07_41B3_0EA7B832B210",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_B4C70303_BA1B_3C09_41E7_1963A5FB58CE_playlist, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3A7D98B9_304E_5B07_41B3_0EA7B832B210_camera"
  },
  {
   "media": "this.panorama_3AD8E193_3521_F8FB_41B4_C7EC9E46BED1",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_B4C70303_BA1B_3C09_41E7_1963A5FB58CE_playlist, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3AD8E193_3521_F8FB_41B4_C7EC9E46BED1_camera"
  },
  {
   "media": "this.panorama_3A7C946B_304F_AB1B_41B9_F4FC4958B0DD",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_B4C70303_BA1B_3C09_41E7_1963A5FB58CE_playlist, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3A7C946B_304F_AB1B_41B9_F4FC4958B0DD_camera"
  },
  {
   "media": "this.panorama_38A1AA40_3521_C855_41AE_EAFC900E8D5B",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_B4C70303_BA1B_3C09_41E7_1963A5FB58CE_playlist, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_38A1AA40_3521_C855_41AE_EAFC900E8D5B_camera"
  },
  {
   "media": "this.panorama_3A7C6042_304F_AB05_41BB_9E5BDE610A16",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_B4C70303_BA1B_3C09_41E7_1963A5FB58CE_playlist, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3A7C6042_304F_AB05_41BB_9E5BDE610A16_camera"
  },
  {
   "media": "this.panorama_3A01C6A8_304F_D706_41B6_6891195BF8E4",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_B4C70303_BA1B_3C09_41E7_1963A5FB58CE_playlist, 7, 8)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3A01C6A8_304F_D706_41B6_6891195BF8E4_camera"
  },
  {
   "media": "this.panorama_3A7CACB1_304F_DB06_4171_D242DDD6A640",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_B4C70303_BA1B_3C09_41E7_1963A5FB58CE_playlist, 8, 9)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3A7CACB1_304F_DB06_4171_D242DDD6A640_camera"
  },
  {
   "media": "this.panorama_3A1EC2B5_304F_EF0E_4198_A2503B9406DD",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_B4C70303_BA1B_3C09_41E7_1963A5FB58CE_playlist, 9, 10)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3A1EC2B5_304F_EF0E_4198_A2503B9406DD_camera"
  },
  {
   "media": "this.panorama_3A7DCC94_304E_7B0D_41C0_BE373044AD04",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_B4C70303_BA1B_3C09_41E7_1963A5FB58CE_playlist, 10, 11)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3A7DCC94_304E_7B0D_41C0_BE373044AD04_camera"
  },
  {
   "media": "this.panorama_3A1A02A4_304E_6F0E_41C5_AC4A3516F2EE",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_B4C70303_BA1B_3C09_41E7_1963A5FB58CE_playlist, 11, 12)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3A1A02A4_304E_6F0E_41C5_AC4A3516F2EE_camera"
  },
  {
   "media": "this.panorama_AB090F57_BB50_948A_41AB_C9B9971030AD",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_B4C70303_BA1B_3C09_41E7_1963A5FB58CE_playlist, 12, 13)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_AB090F57_BB50_948A_41AB_C9B9971030AD_camera"
  },
  {
   "media": "this.panorama_3A1D961B_304E_773A_41B3_DB48EC1F9BB9",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_B4C70303_BA1B_3C09_41E7_1963A5FB58CE_playlist, 13, 14)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3A1D961B_304E_773A_41B3_DB48EC1F9BB9_camera"
  },
  {
   "media": "this.panorama_3B09714D_304E_AD1E_4199_D052CEA2C9CA",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_B4C70303_BA1B_3C09_41E7_1963A5FB58CE_playlist, 14, 15)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3B09714D_304E_AD1E_4199_D052CEA2C9CA_camera"
  },
  {
   "media": "this.panorama_4B217AF1_5F2C_5F1C_418B_6359B28A1ECF",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_B4C70303_BA1B_3C09_41E7_1963A5FB58CE_playlist, 15, 16)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_4B217AF1_5F2C_5F1C_418B_6359B28A1ECF_camera"
  },
  {
   "media": "this.panorama_3A7DD01D_304E_6B3E_41C0_CDFC2AF5C1B5",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_B4C70303_BA1B_3C09_41E7_1963A5FB58CE_playlist, 16, 17)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3A7DD01D_304E_6B3E_41C0_CDFC2AF5C1B5_camera"
  },
  {
   "media": "this.panorama_3A7CF4F2_304F_EB0A_41C4_9CC1C3CEF207",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_B4C70303_BA1B_3C09_41E7_1963A5FB58CE_playlist, 17, 18)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3A7CF4F2_304F_EB0A_41C4_9CC1C3CEF207_camera"
  },
  {
   "media": "this.panorama_3A0172E9_304F_AF07_41B5_6F764155656E",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_B4C70303_BA1B_3C09_41E7_1963A5FB58CE_playlist, 18, 19)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3A0172E9_304F_AF07_41B5_6F764155656E_camera"
  },
  {
   "media": "this.panorama_3A7B68D1_304E_5B07_41C0_CD9E794756C0",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_B4C70303_BA1B_3C09_41E7_1963A5FB58CE_playlist, 19, 20)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3A7B68D1_304E_5B07_41C0_CD9E794756C0_camera"
  },
  {
   "media": "this.panorama_B67D7675_BB50_B48E_4194_BA9CBDCEFC89",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_B4C70303_BA1B_3C09_41E7_1963A5FB58CE_playlist, 20, 21)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_B67D7675_BB50_B48E_4194_BA9CBDCEFC89_camera"
  },
  {
   "media": "this.panorama_3A7B50D0_304F_AB05_41B3_D8035AC7BF4F",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_B4C70303_BA1B_3C09_41E7_1963A5FB58CE_playlist, 21, 22)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3A7B50D0_304F_AB05_41B3_D8035AC7BF4F_camera"
  },
  {
   "media": "this.panorama_3A04272A_304F_B51A_41C4_E50EE9F2652F",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_B4C70303_BA1B_3C09_41E7_1963A5FB58CE_playlist, 22, 23)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3A04272A_304F_B51A_41C4_E50EE9F2652F_camera"
  },
  {
   "media": "this.panorama_3A7B0CF2_304F_BB05_41C7_8B0505061C09",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_B4C70303_BA1B_3C09_41E7_1963A5FB58CE_playlist, 23, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3A7B0CF2_304F_BB05_41C7_8B0505061C09_camera"
  }
 ],
 "id": "ThumbnailList_B4C70303_BA1B_3C09_41E7_1963A5FB58CE_playlist",
 "class": "PlayList"
},
{
 "id": "ImageResource_A040D35E_BBB7_8CBA_41D5_15FAB81D180E",
 "class": "ImageResource",
 "levels": [
  {
   "url": "media/popup_AC051C79_BB50_9486_41E6_E29ABA7FC22E_0_0.png",
   "width": 2000,
   "class": "ImageResourceLevel",
   "height": 2000
  },
  {
   "url": "media/popup_AC051C79_BB50_9486_41E6_E29ABA7FC22E_0_1.png",
   "width": 1024,
   "class": "ImageResourceLevel",
   "height": 1024
  },
  {
   "url": "media/popup_AC051C79_BB50_9486_41E6_E29ABA7FC22E_0_2.png",
   "width": 512,
   "class": "ImageResourceLevel",
   "height": 512
  }
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 179.03,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_62891231_7426_3F5B_41DB_CAD34C354E4C"
},
{
 "adjacentPanoramas": [
  {
   "yaw": 170.22,
   "backwardYaw": -5.73,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3A059A6B_304F_BF1B_417E_9D1170254D2A",
   "distance": 1
  }
 ],
 "hfov": 360,
 "label": "Enterance",
 "id": "panorama_AA62C6E2_BB51_758A_41E5_B86C9FFBCEB8",
 "thumbnailUrl": "media/panorama_AA62C6E2_BB51_758A_41E5_B86C9FFBCEB8_t.jpg",
 "hfovMax": 130,
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AA62C6E2_BB51_758A_41E5_B86C9FFBCEB8_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_AA62C6E2_BB51_758A_41E5_B86C9FFBCEB8_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_AA62C6E2_BB51_758A_41E5_B86C9FFBCEB8_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AA62C6E2_BB51_758A_41E5_B86C9FFBCEB8_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_AA62C6E2_BB51_758A_41E5_B86C9FFBCEB8_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_AA62C6E2_BB51_758A_41E5_B86C9FFBCEB8_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AA62C6E2_BB51_758A_41E5_B86C9FFBCEB8_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_AA62C6E2_BB51_758A_41E5_B86C9FFBCEB8_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_AA62C6E2_BB51_758A_41E5_B86C9FFBCEB8_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AA62C6E2_BB51_758A_41E5_B86C9FFBCEB8_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_AA62C6E2_BB51_758A_41E5_B86C9FFBCEB8_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_AA62C6E2_BB51_758A_41E5_B86C9FFBCEB8_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AA62C6E2_BB51_758A_41E5_B86C9FFBCEB8_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_AA62C6E2_BB51_758A_41E5_B86C9FFBCEB8_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_AA62C6E2_BB51_758A_41E5_B86C9FFBCEB8_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_AA62C6E2_BB51_758A_41E5_B86C9FFBCEB8_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AA62C6E2_BB51_758A_41E5_B86C9FFBCEB8_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_AA62C6E2_BB51_758A_41E5_B86C9FFBCEB8_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_AA62C6E2_BB51_758A_41E5_B86C9FFBCEB8_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_AA0E4B68_BB50_BC86_41BF_C0202750630B",
  "this.overlay_AA08E899_BB50_BD86_41DC_F976A2D5E47E",
  "this.popup_A2CDBEA5_BBB0_958E_41C1_80D65946A23C"
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_3A04272A_304F_B51A_41C4_E50EE9F2652F_camera"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 179.16,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_62BC51FB_7426_3CCF_41D5_C7977F0C63BF"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 107.11,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_6316328C_7426_3F49_41DB_458A07A20609"
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupMaxWidth": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hfov": 6.14,
 "hideDuration": 500,
 "yaw": -147.76,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "id": "popup_A33E30FA_BB50_8D7A_41A5_57A5201D7E96",
 "class": "PopupPanoramaOverlay",
 "pitch": -5.89,
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_A33E30FA_BB50_8D7A_41A5_57A5201D7E96_0_1.png",
    "width": 1024,
    "class": "ImageResourceLevel",
    "height": 1024
   }
  ]
 },
 "popupDistance": 100
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_3A0172E9_304F_AF07_41B5_6F764155656E_camera"
},
{
 "adjacentPanoramas": [
  {
   "yaw": -159.63,
   "backwardYaw": -0.84,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3A0172E9_304F_AF07_41B5_6F764155656E",
   "distance": 1
  },
  {
   "yaw": 50.64,
   "backwardYaw": 138.78,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3AD8E193_3521_F8FB_41B4_C7EC9E46BED1",
   "distance": 1
  }
 ],
 "hfov": 360,
 "label": "Jaba Pura 4",
 "id": "panorama_3A7C946B_304F_AB1B_41B9_F4FC4958B0DD",
 "thumbnailUrl": "media/panorama_3A7C946B_304F_AB1B_41B9_F4FC4958B0DD_t.jpg",
 "hfovMax": 130,
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7C946B_304F_AB1B_41B9_F4FC4958B0DD_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A7C946B_304F_AB1B_41B9_F4FC4958B0DD_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A7C946B_304F_AB1B_41B9_F4FC4958B0DD_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7C946B_304F_AB1B_41B9_F4FC4958B0DD_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A7C946B_304F_AB1B_41B9_F4FC4958B0DD_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A7C946B_304F_AB1B_41B9_F4FC4958B0DD_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7C946B_304F_AB1B_41B9_F4FC4958B0DD_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A7C946B_304F_AB1B_41B9_F4FC4958B0DD_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A7C946B_304F_AB1B_41B9_F4FC4958B0DD_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7C946B_304F_AB1B_41B9_F4FC4958B0DD_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A7C946B_304F_AB1B_41B9_F4FC4958B0DD_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A7C946B_304F_AB1B_41B9_F4FC4958B0DD_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7C946B_304F_AB1B_41B9_F4FC4958B0DD_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A7C946B_304F_AB1B_41B9_F4FC4958B0DD_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A7C946B_304F_AB1B_41B9_F4FC4958B0DD_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_3A7C946B_304F_AB1B_41B9_F4FC4958B0DD_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7C946B_304F_AB1B_41B9_F4FC4958B0DD_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A7C946B_304F_AB1B_41B9_F4FC4958B0DD_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A7C946B_304F_AB1B_41B9_F4FC4958B0DD_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_25BAD68D_3052_D71E_41C1_79894CB68108",
  "this.overlay_23A420C6_3053_AB0A_41AA_D29FFF0AAC46"
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 172.21,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_62EBA258_7426_3FC9_41C6_C75363E394F5"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_B67D7675_BB50_B48E_4194_BA9CBDCEFC89_camera"
},
{
 "adjacentPanoramas": [
  {
   "yaw": -1.38,
   "backwardYaw": -92.86,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3A7D98B9_304E_5B07_41B3_0EA7B832B210",
   "distance": 1
  },
  {
   "yaw": 173.78,
   "backwardYaw": -4.16,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3A7C6042_304F_AB05_41BB_9E5BDE610A16",
   "distance": 1
  }
 ],
 "hfov": 360,
 "label": "Way to Beji",
 "id": "panorama_38A1AA40_3521_C855_41AE_EAFC900E8D5B",
 "thumbnailUrl": "media/panorama_38A1AA40_3521_C855_41AE_EAFC900E8D5B_t.jpg",
 "hfovMax": 130,
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_38A1AA40_3521_C855_41AE_EAFC900E8D5B_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_38A1AA40_3521_C855_41AE_EAFC900E8D5B_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_38A1AA40_3521_C855_41AE_EAFC900E8D5B_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_38A1AA40_3521_C855_41AE_EAFC900E8D5B_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_38A1AA40_3521_C855_41AE_EAFC900E8D5B_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_38A1AA40_3521_C855_41AE_EAFC900E8D5B_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_38A1AA40_3521_C855_41AE_EAFC900E8D5B_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_38A1AA40_3521_C855_41AE_EAFC900E8D5B_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_38A1AA40_3521_C855_41AE_EAFC900E8D5B_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_38A1AA40_3521_C855_41AE_EAFC900E8D5B_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_38A1AA40_3521_C855_41AE_EAFC900E8D5B_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_38A1AA40_3521_C855_41AE_EAFC900E8D5B_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_38A1AA40_3521_C855_41AE_EAFC900E8D5B_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_38A1AA40_3521_C855_41AE_EAFC900E8D5B_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_38A1AA40_3521_C855_41AE_EAFC900E8D5B_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_38A1AA40_3521_C855_41AE_EAFC900E8D5B_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_38A1AA40_3521_C855_41AE_EAFC900E8D5B_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_38A1AA40_3521_C855_41AE_EAFC900E8D5B_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_38A1AA40_3521_C855_41AE_EAFC900E8D5B_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_2447696C_3526_482D_41B8_D8900E736CC2",
  "this.overlay_277504A1_3526_F8D7_41BD_9B1B76735AC3"
 ]
},
{
 "adjacentPanoramas": [
  {
   "yaw": -167.71,
   "backwardYaw": 16.65,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3B09714D_304E_AD1E_4199_D052CEA2C9CA",
   "distance": 1
  },
  {
   "yaw": -72.89,
   "backwardYaw": 176.47,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_AB090F57_BB50_948A_41AB_C9B9971030AD",
   "distance": 1
  },
  {
   "yaw": 30.36,
   "backwardYaw": 27.05,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3A7CF4F2_304F_EB0A_41C4_9CC1C3CEF207",
   "distance": 1
  }
 ],
 "hfov": 360,
 "label": "Beji Enterance ",
 "id": "panorama_3A1D961B_304E_773A_41B3_DB48EC1F9BB9",
 "thumbnailUrl": "media/panorama_3A1D961B_304E_773A_41B3_DB48EC1F9BB9_t.jpg",
 "hfovMax": 130,
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A1D961B_304E_773A_41B3_DB48EC1F9BB9_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A1D961B_304E_773A_41B3_DB48EC1F9BB9_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A1D961B_304E_773A_41B3_DB48EC1F9BB9_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A1D961B_304E_773A_41B3_DB48EC1F9BB9_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A1D961B_304E_773A_41B3_DB48EC1F9BB9_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A1D961B_304E_773A_41B3_DB48EC1F9BB9_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A1D961B_304E_773A_41B3_DB48EC1F9BB9_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A1D961B_304E_773A_41B3_DB48EC1F9BB9_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A1D961B_304E_773A_41B3_DB48EC1F9BB9_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A1D961B_304E_773A_41B3_DB48EC1F9BB9_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A1D961B_304E_773A_41B3_DB48EC1F9BB9_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A1D961B_304E_773A_41B3_DB48EC1F9BB9_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A1D961B_304E_773A_41B3_DB48EC1F9BB9_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A1D961B_304E_773A_41B3_DB48EC1F9BB9_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A1D961B_304E_773A_41B3_DB48EC1F9BB9_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_3A1D961B_304E_773A_41B3_DB48EC1F9BB9_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A1D961B_304E_773A_41B3_DB48EC1F9BB9_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A1D961B_304E_773A_41B3_DB48EC1F9BB9_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A1D961B_304E_773A_41B3_DB48EC1F9BB9_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_29A82D65_3072_550F_41C3_67B3BC4D60D2",
  "this.overlay_2943C6C5_3071_D70E_41C3_CB6876898BD0",
  "this.overlay_B528FD7C_BA0B_313C_41D8_E5EF06087803"
 ]
},
{
 "adjacentPanoramas": [
  {
   "yaw": 53.75,
   "backwardYaw": -137.29,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3A059A6B_304F_BF1B_417E_9D1170254D2A",
   "distance": 1
  },
  {
   "yaw": 142.92,
   "backwardYaw": -91.21,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3AD8E193_3521_F8FB_41B4_C7EC9E46BED1",
   "distance": 1
  },
  {
   "yaw": -92.86,
   "backwardYaw": -1.38,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_38A1AA40_3521_C855_41AE_EAFC900E8D5B",
   "distance": 1
  }
 ],
 "hfov": 360,
 "label": "Jaba Pura 2",
 "id": "panorama_3A7D98B9_304E_5B07_41B3_0EA7B832B210",
 "thumbnailUrl": "media/panorama_3A7D98B9_304E_5B07_41B3_0EA7B832B210_t.jpg",
 "hfovMax": 130,
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7D98B9_304E_5B07_41B3_0EA7B832B210_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A7D98B9_304E_5B07_41B3_0EA7B832B210_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A7D98B9_304E_5B07_41B3_0EA7B832B210_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7D98B9_304E_5B07_41B3_0EA7B832B210_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A7D98B9_304E_5B07_41B3_0EA7B832B210_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A7D98B9_304E_5B07_41B3_0EA7B832B210_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7D98B9_304E_5B07_41B3_0EA7B832B210_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A7D98B9_304E_5B07_41B3_0EA7B832B210_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A7D98B9_304E_5B07_41B3_0EA7B832B210_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7D98B9_304E_5B07_41B3_0EA7B832B210_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A7D98B9_304E_5B07_41B3_0EA7B832B210_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A7D98B9_304E_5B07_41B3_0EA7B832B210_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7D98B9_304E_5B07_41B3_0EA7B832B210_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A7D98B9_304E_5B07_41B3_0EA7B832B210_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A7D98B9_304E_5B07_41B3_0EA7B832B210_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_3A7D98B9_304E_5B07_41B3_0EA7B832B210_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7D98B9_304E_5B07_41B3_0EA7B832B210_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A7D98B9_304E_5B07_41B3_0EA7B832B210_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A7D98B9_304E_5B07_41B3_0EA7B832B210_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_21E6CC2C_305F_DB1E_41AF_0B5832A712A7",
  "this.overlay_207C6F69_305F_D506_41C1_0F90D8501A98",
  "this.overlay_21637B53_305E_5D0B_41AE_F15838014C2F",
  "this.overlay_3DD60C54_334E_DC80_41B9_9568CA800DCB",
  "this.popup_AC051C79_BB50_9486_41E6_E29ABA7FC22E"
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0.43,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_6327C284_7426_3F39_41B9_BF247D008151"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 145.7,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_635242B1_7426_3F5B_41D7_B0238F78FE27"
},
{
 "adjacentPanoramas": [
  {
   "yaw": -0.3,
   "backwardYaw": 95.15,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3A7DCC94_304E_7B0D_41C0_BE373044AD04",
   "distance": 1
  },
  {
   "yaw": -179.57,
   "backwardYaw": 10.71,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_AB090F57_BB50_948A_41AB_C9B9971030AD",
   "distance": 1
  }
 ],
 "hfov": 360,
 "label": "Lake 2",
 "id": "panorama_3A1A02A4_304E_6F0E_41C5_AC4A3516F2EE",
 "thumbnailUrl": "media/panorama_3A1A02A4_304E_6F0E_41C5_AC4A3516F2EE_t.jpg",
 "hfovMax": 130,
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A1A02A4_304E_6F0E_41C5_AC4A3516F2EE_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A1A02A4_304E_6F0E_41C5_AC4A3516F2EE_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A1A02A4_304E_6F0E_41C5_AC4A3516F2EE_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A1A02A4_304E_6F0E_41C5_AC4A3516F2EE_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A1A02A4_304E_6F0E_41C5_AC4A3516F2EE_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A1A02A4_304E_6F0E_41C5_AC4A3516F2EE_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A1A02A4_304E_6F0E_41C5_AC4A3516F2EE_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A1A02A4_304E_6F0E_41C5_AC4A3516F2EE_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A1A02A4_304E_6F0E_41C5_AC4A3516F2EE_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A1A02A4_304E_6F0E_41C5_AC4A3516F2EE_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A1A02A4_304E_6F0E_41C5_AC4A3516F2EE_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A1A02A4_304E_6F0E_41C5_AC4A3516F2EE_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A1A02A4_304E_6F0E_41C5_AC4A3516F2EE_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A1A02A4_304E_6F0E_41C5_AC4A3516F2EE_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A1A02A4_304E_6F0E_41C5_AC4A3516F2EE_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_3A1A02A4_304E_6F0E_41C5_AC4A3516F2EE_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A1A02A4_304E_6F0E_41C5_AC4A3516F2EE_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A1A02A4_304E_6F0E_41C5_AC4A3516F2EE_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A1A02A4_304E_6F0E_41C5_AC4A3516F2EE_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_2814B7C7_307E_D50A_41BB_EA3584CB1011",
  "this.overlay_285CE7FD_307E_74FE_41BA_E96D437CEDB5"
 ]
},
{
 "adjacentPanoramas": [
  {
   "yaw": 176.66,
   "backwardYaw": 7.45,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3A7DCC94_304E_7B0D_41C0_BE373044AD04",
   "distance": 1
  },
  {
   "yaw": -7.79,
   "backwardYaw": 174.94,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3A7CACB1_304F_DB06_4171_D242DDD6A640",
   "distance": 1
  }
 ],
 "hfov": 360,
 "label": "Way to Beji 5",
 "id": "panorama_3A1EC2B5_304F_EF0E_4198_A2503B9406DD",
 "thumbnailUrl": "media/panorama_3A1EC2B5_304F_EF0E_4198_A2503B9406DD_t.jpg",
 "hfovMax": 130,
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A1EC2B5_304F_EF0E_4198_A2503B9406DD_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A1EC2B5_304F_EF0E_4198_A2503B9406DD_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A1EC2B5_304F_EF0E_4198_A2503B9406DD_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A1EC2B5_304F_EF0E_4198_A2503B9406DD_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A1EC2B5_304F_EF0E_4198_A2503B9406DD_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A1EC2B5_304F_EF0E_4198_A2503B9406DD_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A1EC2B5_304F_EF0E_4198_A2503B9406DD_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A1EC2B5_304F_EF0E_4198_A2503B9406DD_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A1EC2B5_304F_EF0E_4198_A2503B9406DD_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A1EC2B5_304F_EF0E_4198_A2503B9406DD_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A1EC2B5_304F_EF0E_4198_A2503B9406DD_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A1EC2B5_304F_EF0E_4198_A2503B9406DD_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A1EC2B5_304F_EF0E_4198_A2503B9406DD_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A1EC2B5_304F_EF0E_4198_A2503B9406DD_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A1EC2B5_304F_EF0E_4198_A2503B9406DD_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_3A1EC2B5_304F_EF0E_4198_A2503B9406DD_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A1EC2B5_304F_EF0E_4198_A2503B9406DD_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A1EC2B5_304F_EF0E_4198_A2503B9406DD_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A1EC2B5_304F_EF0E_4198_A2503B9406DD_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_268DC782_3072_D505_418C_5D5E34C64523",
  "this.overlay_B7D2C8A5_BA07_7FCC_41E3_5AE6EAC40572"
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -169.29,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_624DC1E6_7426_3CC6_41CE_783D010A7451"
},
{
 "id": "ImageResource_A04EC366_BBB7_8C8A_41C9_92557ED8588B",
 "class": "ImageResource",
 "levels": [
  {
   "url": "media/popup_A33E30FA_BB50_8D7A_41A5_57A5201D7E96_0_0.png",
   "width": 2000,
   "class": "ImageResourceLevel",
   "height": 2000
  },
  {
   "url": "media/popup_A33E30FA_BB50_8D7A_41A5_57A5201D7E96_0_1.png",
   "width": 1024,
   "class": "ImageResourceLevel",
   "height": 1024
  },
  {
   "url": "media/popup_A33E30FA_BB50_8D7A_41A5_57A5201D7E96_0_2.png",
   "width": 512,
   "class": "ImageResourceLevel",
   "height": 512
  }
 ]
},
{
 "adjacentPanoramas": [
  {
   "yaw": 5.02,
   "backwardYaw": 175.87,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3A7C6042_304F_AB05_41BB_9E5BDE610A16",
   "distance": 1
  },
  {
   "yaw": -174.11,
   "backwardYaw": -0.97,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3A7CACB1_304F_DB06_4171_D242DDD6A640",
   "distance": 1
  }
 ],
 "hfov": 360,
 "label": "Way to Beji 3",
 "id": "panorama_3A01C6A8_304F_D706_41B6_6891195BF8E4",
 "thumbnailUrl": "media/panorama_3A01C6A8_304F_D706_41B6_6891195BF8E4_t.jpg",
 "hfovMax": 130,
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A01C6A8_304F_D706_41B6_6891195BF8E4_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A01C6A8_304F_D706_41B6_6891195BF8E4_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A01C6A8_304F_D706_41B6_6891195BF8E4_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A01C6A8_304F_D706_41B6_6891195BF8E4_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A01C6A8_304F_D706_41B6_6891195BF8E4_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A01C6A8_304F_D706_41B6_6891195BF8E4_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A01C6A8_304F_D706_41B6_6891195BF8E4_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A01C6A8_304F_D706_41B6_6891195BF8E4_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A01C6A8_304F_D706_41B6_6891195BF8E4_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A01C6A8_304F_D706_41B6_6891195BF8E4_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A01C6A8_304F_D706_41B6_6891195BF8E4_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A01C6A8_304F_D706_41B6_6891195BF8E4_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A01C6A8_304F_D706_41B6_6891195BF8E4_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A01C6A8_304F_D706_41B6_6891195BF8E4_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A01C6A8_304F_D706_41B6_6891195BF8E4_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_3A01C6A8_304F_D706_41B6_6891195BF8E4_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A01C6A8_304F_D706_41B6_6891195BF8E4_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A01C6A8_304F_D706_41B6_6891195BF8E4_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A01C6A8_304F_D706_41B6_6891195BF8E4_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_257FA19A_3072_6D05_41C6_74BF2819494C",
  "this.overlay_2600A3A7_3072_AD0A_41C1_1FADC82A4707"
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_3A7CACB1_304F_DB06_4171_D242DDD6A640_camera"
},
{
 "autoplay": true,
 "audio": {
  "mp3Url": "media/audio_A889449F_BACA_C7FB_41D8_44747BEAABA0.mp3",
  "oggUrl": "media/audio_A889449F_BACA_C7FB_41D8_44747BEAABA0.ogg",
  "class": "AudioResource"
 },
 "class": "MediaAudio",
 "id": "audio_A889449F_BACA_C7FB_41D8_44747BEAABA0",
 "data": {
  "label": "Musik 360"
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_AB090F57_BB50_948A_41AB_C9B9971030AD_camera"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_3A01C6A8_304F_D706_41B6_6891195BF8E4_camera"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -126.25,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_6213E165_7426_3DFB_41D2_458AD7E2B5D0"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_3AD8E193_3521_F8FB_41B4_C7EC9E46BED1_camera"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_3A7B68D1_304E_5B07_41C0_CD9E794756C0_camera"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_3A7C6042_304F_AB05_41BB_9E5BDE610A16_camera"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -53.43,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_60AD038A_7426_3D49_41D5_B474D8C11912"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 16,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_60CDE3D1_7426_3CDB_41B5_E074470085D8"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -152.95,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_605E0352_7426_3DD9_41AD_97FD98EFE9C0"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 87.14,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_6301E296_7426_3F59_41D3_67756C85CC74"
},
{
 "adjacentPanoramas": [
  {
   "yaw": 156.57,
   "backwardYaw": 120.8,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_4B217AF1_5F2C_5F1C_418B_6359B28A1ECF",
   "distance": 1
  },
  {
   "yaw": -147.46,
   "backwardYaw": -118.1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3A7DD01D_304E_6B3E_41C0_CDFC2AF5C1B5",
   "distance": 1
  },
  {
   "yaw": 16.65,
   "backwardYaw": -167.71,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3A1D961B_304E_773A_41B3_DB48EC1F9BB9",
   "distance": 1
  }
 ],
 "hfov": 360,
 "label": "Beji 1",
 "id": "panorama_3B09714D_304E_AD1E_4199_D052CEA2C9CA",
 "thumbnailUrl": "media/panorama_3B09714D_304E_AD1E_4199_D052CEA2C9CA_t.jpg",
 "hfovMax": 130,
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3B09714D_304E_AD1E_4199_D052CEA2C9CA_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3B09714D_304E_AD1E_4199_D052CEA2C9CA_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3B09714D_304E_AD1E_4199_D052CEA2C9CA_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3B09714D_304E_AD1E_4199_D052CEA2C9CA_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3B09714D_304E_AD1E_4199_D052CEA2C9CA_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3B09714D_304E_AD1E_4199_D052CEA2C9CA_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3B09714D_304E_AD1E_4199_D052CEA2C9CA_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3B09714D_304E_AD1E_4199_D052CEA2C9CA_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3B09714D_304E_AD1E_4199_D052CEA2C9CA_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3B09714D_304E_AD1E_4199_D052CEA2C9CA_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3B09714D_304E_AD1E_4199_D052CEA2C9CA_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3B09714D_304E_AD1E_4199_D052CEA2C9CA_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3B09714D_304E_AD1E_4199_D052CEA2C9CA_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3B09714D_304E_AD1E_4199_D052CEA2C9CA_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3B09714D_304E_AD1E_4199_D052CEA2C9CA_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_3B09714D_304E_AD1E_4199_D052CEA2C9CA_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3B09714D_304E_AD1E_4199_D052CEA2C9CA_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3B09714D_304E_AD1E_4199_D052CEA2C9CA_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3B09714D_304E_AD1E_4199_D052CEA2C9CA_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_29FABB0F_3076_DD1B_41B1_B55EF5CF7E67",
  "this.overlay_2A410398_3076_6D06_41C1_899618B0F715",
  "this.overlay_2A5CC569_3071_F506_41B2_B7B9A730E4CF"
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -175.6,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_60DBF3C2_7426_3D39_41D6_90DE88D2089C"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 42.71,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_63BCE2CC_7426_3CC9_4169_92C870CE423D"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_3A7D98B9_304E_5B07_41B3_0EA7B832B210_camera"
},
{
 "adjacentPanoramas": [
  {
   "yaw": -179.69,
   "backwardYaw": 4.4,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3A7B68D1_304E_5B07_41C0_CD9E794756C0",
   "distance": 1
  },
  {
   "yaw": -0.84,
   "backwardYaw": -159.63,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3A7C946B_304F_AB1B_41B9_F4FC4958B0DD",
   "distance": 1
  },
  {
   "yaw": -93.96,
   "backwardYaw": -164,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3A7CF4F2_304F_EB0A_41C4_9CC1C3CEF207",
   "distance": 1
  }
 ],
 "hfov": 360,
 "label": "Luhur Enterance ",
 "id": "panorama_3A0172E9_304F_AF07_41B5_6F764155656E",
 "thumbnailUrl": "media/panorama_3A0172E9_304F_AF07_41B5_6F764155656E_t.jpg",
 "hfovMax": 130,
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A0172E9_304F_AF07_41B5_6F764155656E_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A0172E9_304F_AF07_41B5_6F764155656E_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A0172E9_304F_AF07_41B5_6F764155656E_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A0172E9_304F_AF07_41B5_6F764155656E_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A0172E9_304F_AF07_41B5_6F764155656E_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A0172E9_304F_AF07_41B5_6F764155656E_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A0172E9_304F_AF07_41B5_6F764155656E_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A0172E9_304F_AF07_41B5_6F764155656E_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A0172E9_304F_AF07_41B5_6F764155656E_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A0172E9_304F_AF07_41B5_6F764155656E_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A0172E9_304F_AF07_41B5_6F764155656E_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A0172E9_304F_AF07_41B5_6F764155656E_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A0172E9_304F_AF07_41B5_6F764155656E_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A0172E9_304F_AF07_41B5_6F764155656E_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A0172E9_304F_AF07_41B5_6F764155656E_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_3A0172E9_304F_AF07_41B5_6F764155656E_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A0172E9_304F_AF07_41B5_6F764155656E_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A0172E9_304F_AF07_41B5_6F764155656E_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A0172E9_304F_AF07_41B5_6F764155656E_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_2CD7DC5F_304E_7B3B_41A5_C7E22A11F7D4",
  "this.overlay_100839D9_3053_FD07_41C5_CBD3EAC319B0",
  "this.overlay_AA052B39_BABB_C2C7_41D9_464F05381E29"
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_3A7DD01D_304E_6B3E_41C0_CDFC2AF5C1B5_camera"
},
{
 "adjacentPanoramas": [
  {
   "yaw": 71.85,
   "backwardYaw": 152.91,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3A04272A_304F_B51A_41C4_E50EE9F2652F",
   "distance": 1
  },
  {
   "yaw": -30.88,
   "backwardYaw": -171.85,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_B67D7675_BB50_B48E_4194_BA9CBDCEFC89",
   "distance": 1
  }
 ],
 "hfov": 360,
 "label": "Luhur 3",
 "id": "panorama_3A7B50D0_304F_AB05_41B3_D8035AC7BF4F",
 "thumbnailUrl": "media/panorama_3A7B50D0_304F_AB05_41B3_D8035AC7BF4F_t.jpg",
 "hfovMax": 130,
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7B50D0_304F_AB05_41B3_D8035AC7BF4F_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A7B50D0_304F_AB05_41B3_D8035AC7BF4F_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A7B50D0_304F_AB05_41B3_D8035AC7BF4F_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7B50D0_304F_AB05_41B3_D8035AC7BF4F_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A7B50D0_304F_AB05_41B3_D8035AC7BF4F_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A7B50D0_304F_AB05_41B3_D8035AC7BF4F_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7B50D0_304F_AB05_41B3_D8035AC7BF4F_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A7B50D0_304F_AB05_41B3_D8035AC7BF4F_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A7B50D0_304F_AB05_41B3_D8035AC7BF4F_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7B50D0_304F_AB05_41B3_D8035AC7BF4F_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A7B50D0_304F_AB05_41B3_D8035AC7BF4F_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A7B50D0_304F_AB05_41B3_D8035AC7BF4F_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7B50D0_304F_AB05_41B3_D8035AC7BF4F_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A7B50D0_304F_AB05_41B3_D8035AC7BF4F_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A7B50D0_304F_AB05_41B3_D8035AC7BF4F_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_3A7B50D0_304F_AB05_41B3_D8035AC7BF4F_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7B50D0_304F_AB05_41B3_D8035AC7BF4F_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A7B50D0_304F_AB05_41B3_D8035AC7BF4F_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A7B50D0_304F_AB05_41B3_D8035AC7BF4F_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_2FD2385E_3056_7B3D_41BC_0CDAFC492D5F",
  "this.overlay_10C4AC89_3057_DB06_41A2_6F7E732A51D9",
  "this.overlay_AA7A4DDA_BABE_C145_41D7_E0AD3C993BC6",
  "this.popup_A33E30FA_BB50_8D7A_41A5_57A5201D7E96"
 ]
},
{
 "id": "ImageResource_7BDE74A3_7422_3B7F_41BA_1A0C200EB661",
 "class": "ImageResource",
 "levels": [
  {
   "url": "media/zoomImage_7B2A07D8_7422_24CA_41C8_C973EF8666EE_0_0.png",
   "width": 6912,
   "class": "ImageResourceLevel",
   "height": 3456
  },
  {
   "url": "media/zoomImage_7B2A07D8_7422_24CA_41C8_C973EF8666EE_0_1.png",
   "width": 4096,
   "class": "ImageResourceLevel",
   "height": 2048
  },
  {
   "url": "media/zoomImage_7B2A07D8_7422_24CA_41C8_C973EF8666EE_0_2.png",
   "width": 2048,
   "class": "ImageResourceLevel",
   "height": 1024
  },
  {
   "url": "media/zoomImage_7B2A07D8_7422_24CA_41C8_C973EF8666EE_0_3.png",
   "width": 1024,
   "class": "ImageResourceLevel",
   "height": 512
  },
  {
   "url": "media/zoomImage_7B2A07D8_7422_24CA_41C8_C973EF8666EE_0_4.png",
   "width": 512,
   "class": "ImageResourceLevel",
   "height": 256
  }
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 174.27,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_620A9188_7426_3D49_41A5_6CDD2E48E970"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_3A7CF4F2_304F_EB0A_41C4_9CC1C3CEF207_camera"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -172.55,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_6342D2B9_7426_3F4B_415D_810D21E8A0F9"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -9.78,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_6225D155_7426_3DDB_41D3_1242982970F2"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 178.62,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_639EF2DE_7426_3CC6_41D5_2C020FF9F3DD"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_3A1EC2B5_304F_EF0E_4198_A2503B9406DD_camera"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -108.15,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_6335D27B_7426_3FCE_41D2_E59687FF851A"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -4.13,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_62990220_7426_3F79_41DA_5B9C148FCFBA"
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupMaxWidth": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hfov": 5.07,
 "hideDuration": 500,
 "yaw": 128.45,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "id": "popup_AC051C79_BB50_9486_41E6_E29ABA7FC22E",
 "class": "PopupPanoramaOverlay",
 "pitch": -2.52,
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_AC051C79_BB50_9486_41E6_E29ABA7FC22E_0_1.png",
    "width": 1024,
    "class": "ImageResourceLevel",
    "height": 1024
   }
  ]
 },
 "popupDistance": 100
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 32.54,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_62D57267_7426_3FC7_41D3_431B78018F39"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_38A1AA40_3521_C855_41AE_EAFC900E8D5B_camera"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -5.06,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_634C62C2_7426_3F39_41A6_ADC25FC8B0F2"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -3.53,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_605AE34A_7426_3DC9_41DB_F0C802E42B06"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -23.43,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_6276319D_7426_3D4B_41C1_0F654B9A991B"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_3A1D961B_304E_773A_41B3_DB48EC1F9BB9_camera"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_3A7B50D0_304F_AB05_41B3_D8035AC7BF4F_camera"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -129.36,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_60EFC3BA_7426_3D49_41C4_8E66725671D5"
},
{
 "adjacentPanoramas": [
  {
   "yaw": -0.97,
   "backwardYaw": -174.11,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3A01C6A8_304F_D706_41B6_6891195BF8E4",
   "distance": 1
  },
  {
   "yaw": 174.94,
   "backwardYaw": -7.79,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_3A1EC2B5_304F_EF0E_4198_A2503B9406DD",
   "distance": 1
  }
 ],
 "hfov": 360,
 "label": "Way to Beji 4",
 "id": "panorama_3A7CACB1_304F_DB06_4171_D242DDD6A640",
 "thumbnailUrl": "media/panorama_3A7CACB1_304F_DB06_4171_D242DDD6A640_t.jpg",
 "hfovMax": 130,
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7CACB1_304F_DB06_4171_D242DDD6A640_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A7CACB1_304F_DB06_4171_D242DDD6A640_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A7CACB1_304F_DB06_4171_D242DDD6A640_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7CACB1_304F_DB06_4171_D242DDD6A640_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A7CACB1_304F_DB06_4171_D242DDD6A640_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A7CACB1_304F_DB06_4171_D242DDD6A640_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7CACB1_304F_DB06_4171_D242DDD6A640_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A7CACB1_304F_DB06_4171_D242DDD6A640_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A7CACB1_304F_DB06_4171_D242DDD6A640_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7CACB1_304F_DB06_4171_D242DDD6A640_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A7CACB1_304F_DB06_4171_D242DDD6A640_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A7CACB1_304F_DB06_4171_D242DDD6A640_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7CACB1_304F_DB06_4171_D242DDD6A640_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A7CACB1_304F_DB06_4171_D242DDD6A640_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A7CACB1_304F_DB06_4171_D242DDD6A640_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_3A7CACB1_304F_DB06_4171_D242DDD6A640_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7CACB1_304F_DB06_4171_D242DDD6A640_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_3A7CACB1_304F_DB06_4171_D242DDD6A640_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_3A7CACB1_304F_DB06_4171_D242DDD6A640_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_260DAB5D_3076_BD3F_41B9_62BEA0240485",
  "this.overlay_273C773B_3077_B57B_41BB_F4220863C9FB"
 ]
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupMaxWidth": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hfov": 8.7,
 "hideDuration": 500,
 "yaw": -16.83,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "id": "popup_4A6511F5_5F2C_CD05_41D5_B18E220B93F6",
 "class": "PopupPanoramaOverlay",
 "pitch": -8.35,
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_4A6511F5_5F2C_CD05_41D5_B18E220B93F6_0_1.png",
    "width": 1024,
    "class": "ImageResourceLevel",
    "height": 1024
   }
  ]
 },
 "popupDistance": 100
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 179.7,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_6086639B_7426_3D4F_41C9_8E761FFE7188"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -37.08,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_60E083B2_7426_3D59_41C5_E72D655DC7F9"
},
{
 "transitionDuration": 500,
 "data": {
  "name": "Main Viewer"
 },
 "progressBackgroundColorDirection": "vertical",
 "id": "MainViewer",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarBottom": 5,
 "paddingLeft": 0,
 "playbackBarHeadOpacity": 1,
 "progressBorderColor": "#000000",
 "class": "ViewerArea",
 "right": -0.4,
 "toolTipShadowSpread": 0,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipBorderColor": "#767676",
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "width": "99.984%",
 "minHeight": 50,
 "toolTipOpacity": 1,
 "toolTipShadowBlurRadius": 3,
 "toolTipFontSize": "1.11vmin",
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "playbackBarRight": 0,
 "playbackBarHeight": 10,
 "minWidth": 100,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "playbackBarHeadShadowVerticalLength": 0,
 "toolTipShadowColor": "#333333",
 "height": "100%",
 "playbackBarHeadShadowHorizontalLength": 0,
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionMode": "blending",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "shadow": false,
 "toolTipShadowOpacity": 1,
 "progressLeft": 0,
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "toolTipShadowVerticalLength": 0,
 "propagateClick": false,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "paddingRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressRight": 0,
 "borderSize": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 0,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "top": 0,
 "playbackBarOpacity": 1,
 "displayTooltipInTouchScreens": true,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "toolTipPaddingRight": 6,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "paddingBottom": 0,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "toolTipPaddingTop": 4,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0
 ],
 "paddingTop": 0,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#000000",
 "playbackBarHeadHeight": 15
},
{
 "transparencyActive": false,
 "maxHeight": 512,
 "propagateClick": false,
 "id": "IconButton_B4F1C830_BA1B_2C08_41B1_CC948FC34917",
 "paddingRight": 0,
 "class": "IconButton",
 "right": "0.78%",
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 62.61,
 "minHeight": 1,
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_B4F1C830_BA1B_2C08_41B1_CC948FC34917.png",
 "bottom": "2.81%",
 "minWidth": 1,
 "mode": "push",
 "click": "this.showPopupImage(this.ImageResource_7BDE74A3_7422_3B7F_41BA_1A0C200EB661, null, '90%', '90%', this.FadeInEffect_7BDE54A5_7422_3B7B_41D6_5A7D2DFAE471, this.FadeOutEffect_7BDE44A5_7422_3B7B_41D4_2584218218B9, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingBottom':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'paddingTop':5,'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, null, null, false)",
 "horizontalAlign": "center",
 "height": 52.14,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "borderRadius": 0,
 "paddingTop": 0,
 "cursor": "hand",
 "maxWidth": 512,
 "data": {
  "name": "IconButton9215"
 }
},
{
 "backgroundColorRatios": [
  0
 ],
 "itemThumbnailWidth": 75,
 "id": "ThumbnailList_B4C70303_BA1B_3C09_41E7_1963A5FB58CE",
 "left": "0%",
 "paddingLeft": 20,
 "scrollBarColor": "#FFFFFF",
 "horizontalAlign": "left",
 "itemLabelFontStyle": "normal",
 "class": "ThumbnailList",
 "width": 194,
 "itemLabelHorizontalAlign": "center",
 "itemMode": "normal",
 "itemPaddingRight": 3,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "minHeight": 20,
 "itemThumbnailOpacity": 1,
 "itemBorderRadius": 0,
 "itemThumbnailShadowOpacity": 0.27,
 "verticalAlign": "top",
 "minWidth": 20,
 "itemLabelFontFamily": "Arial",
 "itemPaddingLeft": 3,
 "selectedItemLabelFontColor": "#FFCC00",
 "itemLabelPosition": "bottom",
 "backgroundColor": [
  "#000000"
 ],
 "itemOpacity": 1,
 "itemHorizontalAlign": "center",
 "itemThumbnailShadowSpread": 1,
 "height": "99.935%",
 "itemBackgroundOpacity": 0,
 "itemThumbnailBorderRadius": 5,
 "shadow": false,
 "backgroundOpacity": 0.33,
 "itemPaddingTop": 3,
 "itemBackgroundColor": [],
 "itemBackgroundColorRatios": [],
 "propagateClick": false,
 "rollOverItemBackgroundOpacity": 0,
 "rollOverItemLabelFontWeight": "bold",
 "layout": "vertical",
 "paddingRight": 20,
 "borderSize": 0,
 "backgroundColorDirection": "vertical",
 "itemLabelFontWeight": "normal",
 "itemLabelTextDecoration": "none",
 "selectedItemLabelFontWeight": "bold",
 "playList": "this.ThumbnailList_B4C70303_BA1B_3C09_41E7_1963A5FB58CE_playlist",
 "itemThumbnailShadowBlurRadius": 8,
 "bottom": "-0.07%",
 "itemLabelFontSize": 14,
 "scrollBarMargin": 2,
 "itemVerticalAlign": "middle",
 "itemLabelFontColor": "#FFFFFF",
 "itemThumbnailScaleMode": "fit_outside",
 "itemThumbnailShadowVerticalLength": 3,
 "gap": 13,
 "itemBackgroundColorDirection": "vertical",
 "itemThumbnailHeight": 75,
 "paddingBottom": 10,
 "itemThumbnailShadow": true,
 "paddingTop": 10,
 "borderRadius": 5,
 "itemPaddingBottom": 3,
 "itemLabelGap": 8,
 "scrollBarWidth": 10,
 "itemThumbnailShadowHorizontalLength": 3,
 "data": {
  "name": "ThumbnailList35762"
 },
 "itemThumbnailShadowColor": "#000000"
},
{
 "transparencyActive": false,
 "propagateClick": false,
 "id": "IconButton_7A90D7E7_6F02_7FCA_41BB_14B5D033CCAD",
 "paddingRight": 0,
 "class": "IconButton",
 "right": "1.09%",
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 54.05,
 "minHeight": 0,
 "iconURL": "skin/IconButton_7A90D7E7_6F02_7FCA_41BB_14B5D033CCAD.png",
 "bottom": "9.48%",
 "minWidth": 0,
 "mode": "toggle",
 "verticalAlign": "middle",
 "horizontalAlign": "center",
 "height": 58,
 "rollOverIconURL": "skin/IconButton_7A90D7E7_6F02_7FCA_41BB_14B5D033CCAD_rollover.png",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_7A90D7E7_6F02_7FCA_41BB_14B5D033CCAD_pressed.png",
 "paddingTop": 0,
 "cursor": "hand",
 "data": {
  "name": "Button27672"
 }
},
{
 "transparencyActive": true,
 "maxHeight": 128,
 "toolTipFontFamily": "Arial",
 "propagateClick": false,
 "id": "IconButton_7B364B59_742E_2DCB_41C4_D25B9741B33A",
 "toolTipShadowSpread": 0,
 "paddingRight": 0,
 "class": "IconButton",
 "right": "0.9%",
 "paddingLeft": 0,
 "borderSize": 0,
 "toolTipBorderColor": "#767676",
 "width": 95,
 "minHeight": 1,
 "toolTip": "Fullscreen",
 "paddingTop": 0,
 "toolTipFontSize": 12,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "toolTipShadowBlurRadius": 3,
 "toolTipTextShadowColor": "#000000",
 "toolTipOpacity": 1,
 "iconURL": "skin/IconButton_7B364B59_742E_2DCB_41C4_D25B9741B33A.png",
 "verticalAlign": "middle",
 "minWidth": 1,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "mode": "toggle",
 "toolTipTextShadowBlurRadius": 3,
 "horizontalAlign": "center",
 "height": 80,
 "top": "1.87%",
 "toolTipBorderSize": 1,
 "toolTipShadowColor": "#333333",
 "paddingBottom": 0,
 "toolTipPaddingLeft": 6,
 "backgroundOpacity": 0,
 "toolTipDisplayTime": 600,
 "shadow": false,
 "toolTipPaddingRight": 6,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "toolTipShadowOpacity": 1,
 "toolTipShadowHorizontalLength": 0,
 "toolTipPaddingTop": 4,
 "toolTipFontStyle": "normal",
 "cursor": "hand",
 "toolTipShadowVerticalLength": 0,
 "maxWidth": 128,
 "data": {
  "name": "IconButton1493"
 },
 "toolTipTextShadowOpacity": 0
},
{
 "backgroundColorRatios": [
  0
 ],
 "id": "veilPopupPanorama",
 "left": 0,
 "propagateClick": false,
 "paddingLeft": 0,
 "paddingRight": 0,
 "class": "UIComponent",
 "right": 0,
 "borderSize": 0,
 "minHeight": 0,
 "backgroundColorDirection": "vertical",
 "showEffect": {
  "duration": 350,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "bottom": 0,
 "minWidth": 0,
 "backgroundColor": [
  "#000000"
 ],
 "top": 0,
 "paddingBottom": 0,
 "shadow": false,
 "backgroundOpacity": 0.55,
 "borderRadius": 0,
 "visible": false,
 "paddingTop": 0,
 "data": {
  "name": "UIComponent9112"
 }
},
{
 "backgroundColorRatios": [],
 "id": "zoomImagePopupPanorama",
 "left": 0,
 "propagateClick": false,
 "paddingLeft": 0,
 "paddingRight": 0,
 "class": "ZoomImage",
 "right": 0,
 "borderSize": 0,
 "minHeight": 0,
 "backgroundColorDirection": "vertical",
 "bottom": 0,
 "minWidth": 0,
 "backgroundColor": [],
 "top": 0,
 "paddingBottom": 0,
 "shadow": false,
 "backgroundOpacity": 1,
 "scaleMode": "custom",
 "borderRadius": 0,
 "visible": false,
 "paddingTop": 0,
 "data": {
  "name": "ZoomImage9113"
 }
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "data": {
  "name": "CloseButton9114"
 },
 "id": "closeButtonPopupPanorama",
 "rollOverIconColor": "#666666",
 "propagateClick": false,
 "paddingLeft": 5,
 "layout": "horizontal",
 "paddingRight": 5,
 "fontFamily": "Arial",
 "class": "CloseButton",
 "right": 10,
 "fontColor": "#FFFFFF",
 "shadowColor": "#000000",
 "borderSize": 0,
 "iconHeight": 20,
 "minHeight": 0,
 "backgroundColorDirection": "vertical",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "showEffect": {
  "duration": 350,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "iconColor": "#000000",
 "minWidth": 0,
 "iconLineWidth": 5,
 "mode": "push",
 "fontSize": "1.29vmin",
 "label": "",
 "horizontalAlign": "center",
 "backgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "shadowBlurRadius": 6,
 "top": 10,
 "gap": 5,
 "iconBeforeLabel": true,
 "fontStyle": "normal",
 "pressedIconColor": "#888888",
 "paddingBottom": 5,
 "shadow": false,
 "backgroundOpacity": 0.3,
 "borderRadius": 0,
 "visible": false,
 "paddingTop": 5,
 "iconWidth": 20,
 "cursor": "hand",
 "fontWeight": "normal"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 18.13,
   "image": "this.AnimatedImageResource_A021F33F_BBB7_8CFA_41D7_801BADAE0E26",
   "pitch": -20.02,
   "yaw": 10.71,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3A1A02A4_304E_6F0E_41C5_AC4A3516F2EE, this.camera_6327C284_7426_3F39_41B9_BF247D008151); this.mainPlayList.set('selectedIndex', 11)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_B529529A_BB53_8DBA_41E0_08470D413541",
 "data": {
  "label": "Arrow 06a"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 18.13,
   "yaw": 10.71,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -20.02,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AB090F57_BB50_948A_41AB_C9B9971030AD_0_HS_0_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 19.11,
   "image": "this.AnimatedImageResource_A021433F_BBB7_8CFA_41C0_0C70A18AF353",
   "pitch": -7.88,
   "yaw": 176.47,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3A1D961B_304E_773A_41B3_DB48EC1F9BB9, this.camera_6316328C_7426_3F49_41DB_458A07A20609); this.mainPlayList.set('selectedIndex', 13)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_B4210589_BB50_F786_41D0_8D06E1DF3C43",
 "data": {
  "label": "Arrow 06a"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 19.11,
   "yaw": 176.47,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -7.88,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AB090F57_BB50_948A_41AB_C9B9971030AD_0_HS_1_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 21.51,
   "image": "this.AnimatedImageResource_A01FA338_BBB7_8C86_4198_B727AC790E8E",
   "pitch": -13.97,
   "yaw": -49.89,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3A059A6B_304F_BF1B_417E_9D1170254D2A, this.camera_60FA33AA_7426_3D49_41D4_64B4B49BFAD2); this.mainPlayList.set('selectedIndex', 1)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_3AB92451_3522_7877_41BC_D83B7D5265FD",
 "data": {
  "label": "Arrow 06a"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 21.51,
   "yaw": -49.89,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -13.97,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3AD8E193_3521_F8FB_41B4_C7EC9E46BED1_0_HS_0_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 21.83,
   "image": "this.AnimatedImageResource_A01FE338_BBB7_8C86_4193_FC576BD7095C",
   "pitch": -13.36,
   "yaw": 138.78,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3A7C946B_304F_AB1B_41B9_F4FC4958B0DD, this.camera_60EFC3BA_7426_3D49_41C4_8E66725671D5); this.mainPlayList.set('selectedIndex', 4)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_25BF5EC2_3522_C855_41C1_EA93485BC64A",
 "data": {
  "label": "Arrow 06a"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 21.83,
   "yaw": 138.78,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -13.36,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3AD8E193_3521_F8FB_41B4_C7EC9E46BED1_0_HS_1_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 19.73,
   "image": "this.AnimatedImageResource_A01F233D_BBB7_8CFE_41D6_B1B7EEB383D8",
   "pitch": -11.31,
   "yaw": -91.21,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3A7D98B9_304E_5B07_41B3_0EA7B832B210, this.camera_60E083B2_7426_3D59_41C5_E72D655DC7F9); this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_AA890382_BB51_B38A_41E5_79FB3A61F02D",
 "data": {
  "label": "Arrow 06a"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 19.73,
   "yaw": -91.21,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -11.31,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3AD8E193_3521_F8FB_41B4_C7EC9E46BED1_0_HS_2_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 21.92,
   "image": "this.AnimatedImageResource_A022933E_BBB7_8CFA_41E7_17C002C63889",
   "pitch": -6.09,
   "yaw": 7.45,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3A1EC2B5_304F_EF0E_4198_A2503B9406DD, this.camera_608F23A2_7426_3D79_41DA_B14663263A0F); this.mainPlayList.set('selectedIndex', 9)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_27059348_307E_ED06_4180_2684075CDA57",
 "data": {
  "label": "Arrow 06a"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 21.92,
   "yaw": 7.45,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -6.09,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7DCC94_304E_7B0D_41C0_BE373044AD04_0_HS_0_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 18.52,
   "image": "this.AnimatedImageResource_A022F33F_BBB7_8CFA_41DF_237F9FD677D4",
   "pitch": -13.16,
   "yaw": 95.15,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3A1A02A4_304E_6F0E_41C5_AC4A3516F2EE, this.camera_6086639B_7426_3D4F_41C9_8E761FFE7188); this.mainPlayList.set('selectedIndex', 11)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_287ACCC1_307F_BB06_4198_6E6F9728615E",
 "data": {
  "label": "Arrow 06a"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 18.52,
   "yaw": 95.15,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -13.16,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7DCC94_304E_7B0D_41C0_BE373044AD04_0_HS_1_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 20.52,
   "image": "this.AnimatedImageResource_A026A340_BBB7_8C86_41C0_DCDFA3A890DE",
   "pitch": -17.28,
   "yaw": 27.05,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3A1D961B_304E_773A_41B3_DB48EC1F9BB9, this.camera_60654330_7426_3D59_41C4_BA56D39F4A5A); this.mainPlayList.set('selectedIndex', 13)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_2CCEA81B_304E_5B3B_41B7_873AFDA23828",
 "data": {
  "label": "Arrow 06a"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 20.52,
   "yaw": 27.05,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -17.28,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7CF4F2_304F_EB0A_41C4_9CC1C3CEF207_0_HS_0_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 21.76,
   "image": "this.AnimatedImageResource_A0260345_BBB7_8C8E_41DE_BEF09EA3C248",
   "pitch": -1.08,
   "yaw": -164,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3A0172E9_304F_AF07_41B5_6F764155656E, this.camera_60618327_7426_3D47_41DA_8CE0D0E71821); this.mainPlayList.set('selectedIndex', 18)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_2C91EFA1_304E_5507_41B5_0FF056452CFF",
 "data": {
  "label": "Arrow 06a"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 21.76,
   "yaw": -164,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.08,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7CF4F2_304F_EB0A_41C4_9CC1C3CEF207_0_HS_1_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 19.07,
   "image": "this.AnimatedImageResource_A02A4347_BBB7_8C8A_41DD_772643A488B9",
   "pitch": -24.42,
   "yaw": 11.54,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3A7B0CF2_304F_BB05_41C7_8B0505061C09, this.camera_62C57272_7426_3FD9_41BA_52AD0F34D798); this.mainPlayList.set('selectedIndex', 23)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_2FD6E34D_3056_ED1E_41BD_9CED08273859",
 "data": {
  "label": "Arrow 06a"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 19.07,
   "yaw": 11.54,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -24.42,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A04272A_304F_B51A_41C4_E50EE9F2652F_0_HS_0_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 17.58,
   "image": "this.AnimatedImageResource_A029C347_BBB7_8C8A_41C9_79228FD9ED6D",
   "pitch": -24.97,
   "yaw": 152.91,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3A7B50D0_304F_AB05_41B3_D8035AC7BF4F, this.camera_6335D27B_7426_3FCE_41D2_E59687FF851A); this.mainPlayList.set('selectedIndex', 21)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_115B56F1_3051_D707_41A3_E857D8D5520E",
 "data": {
  "label": "Arrow 06a Left-Up"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 17.58,
   "yaw": 152.91,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -24.97,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A04272A_304F_B51A_41C4_E50EE9F2652F_0_HS_1_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 18.41,
   "image": "this.AnimatedImageResource_A0247346_BBB7_8C8A_41CA_2413439BC99A",
   "pitch": -21.86,
   "yaw": -171.85,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3A7B50D0_304F_AB05_41B3_D8035AC7BF4F, this.camera_609B9393_7426_3D5F_41C3_0FFE015F3F17); this.mainPlayList.set('selectedIndex', 21)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_B4232791_BB57_7386_4154_FAA440142CAE",
 "data": {
  "label": "Arrow 06a"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 18.41,
   "yaw": -171.85,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -21.86,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B67D7675_BB50_B48E_4194_BA9CBDCEFC89_0_HS_0_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 17.96,
   "image": "this.AnimatedImageResource_A02BC346_BBB7_8C8A_41D0_54B0CB7A1674",
   "pitch": -19.12,
   "yaw": -34.3,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3A7B68D1_304E_5B07_41C0_CD9E794756C0, this.camera_60AD038A_7426_3D49_41D5_B474D8C11912); this.mainPlayList.set('selectedIndex', 19)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_AA1F9706_BB51_748A_41A5_E01D25268C93",
 "data": {
  "label": "Arrow 06a"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 17.96,
   "yaw": -34.3,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -19.12,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B67D7675_BB50_B48E_4194_BA9CBDCEFC89_0_HS_1_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 19.66,
   "image": "this.AnimatedImageResource_4C8C8791_5F5B_051B_41A2_108B316B1500",
   "pitch": -20.29,
   "yaw": 71.65,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 16)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_4C848896_5F2C_DB04_41A2_9C962319E57F",
 "data": {
  "label": "Arrow 06a"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 19.66,
   "yaw": 71.65,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -20.29,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_4B217AF1_5F2C_5F1C_418B_6359B28A1ECF_1_HS_0_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 24.54,
   "image": "this.AnimatedImageResource_4C8C1791_5F5B_051A_41C6_E6BF479BA959",
   "pitch": -28.07,
   "yaw": 120.8,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3B09714D_304E_AD1E_4199_D052CEA2C9CA, this.camera_6276319D_7426_3D4B_41C1_0F654B9A991B); this.mainPlayList.set('selectedIndex', 14)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_4CC0ED59_5F2D_D50D_41B2_AEEE95E2864E",
 "data": {
  "label": "Arrow 06a Right-Up"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 24.54,
   "yaw": 120.8,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -28.07,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_4B217AF1_5F2C_5F1C_418B_6359B28A1ECF_1_HS_1_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_4B217AF1_5F2C_5F1C_418B_6359B28A1ECF_1_HS_2_0.png",
      "width": 148,
      "class": "ImageResourceLevel",
      "height": 131
     }
    ]
   },
   "hfov": 8.7,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -8.35,
   "yaw": -16.83
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_4A6511F5_5F2C_CD05_41D5_B18E220B93F6, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingBottom':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'paddingTop':5,'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_4CA677B2_5F5B_051E_4177_C59371F9E064, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_4720EB99_5F2C_DD0C_41BC_187EEC9F8652",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 8.7,
   "yaw": -16.83,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -8.35,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_4B217AF1_5F2C_5F1C_418B_6359B28A1ECF_1_HS_2_0_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 23.62,
   "image": "this.AnimatedImageResource_A024B346_BBB7_8C8A_41E1_8FA3F89D19D3",
   "pitch": -22.7,
   "yaw": 126.57,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_B67D7675_BB50_B48E_4194_BA9CBDCEFC89, this.camera_635242B1_7426_3F5B_41D7_B0238F78FE27); this.mainPlayList.set('selectedIndex', 20)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_10443EE8_3053_F706_41C1_7AE31052EDE2",
 "data": {
  "label": "Arrow 06b Right-Up"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 23.62,
   "yaw": 126.57,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -22.7,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7B68D1_304E_5B07_41C0_CD9E794756C0_0_HS_0_0_0_map.gif",
      "width": 34,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 19.2,
   "image": "this.AnimatedImageResource_A0241346_BBB7_8C8A_41B6_15FAEF83FD03",
   "pitch": -17.42,
   "yaw": 4.4,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3A0172E9_304F_AF07_41B5_6F764155656E, this.camera_636212A8_7426_3F49_41D1_7477D6A4117A); this.mainPlayList.set('selectedIndex', 18)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_2DCF9F65_3052_550E_4186_495059D1A031",
 "data": {
  "label": "Arrow 06a"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 19.2,
   "yaw": 4.4,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -17.42,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7B68D1_304E_5B07_41C0_CD9E794756C0_0_HS_1_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 20.83,
   "image": "this.AnimatedImageResource_A01A7337_BBB7_8C8A_41E6_5A133C6C6036",
   "pitch": -16.87,
   "yaw": -5.73,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_AA62C6E2_BB51_758A_41E5_B86C9FFBCEB8, this.camera_6225D155_7426_3DDB_41D3_1242982970F2); this.mainPlayList.set('selectedIndex', 0)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_3F292C39_3052_BB06_41B5_5FFA0845092D",
 "data": {
  "label": "Arrow 06a"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 20.83,
   "yaw": -5.73,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -16.87,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A059A6B_304F_BF1B_417E_9D1170254D2A_0_HS_0_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 20.05,
   "image": "this.AnimatedImageResource_A0198337_BBB7_8C8A_41E5_FCAE6F625920",
   "pitch": -16.04,
   "yaw": 164.21,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3AD8E193_3521_F8FB_41B4_C7EC9E46BED1, this.camera_621FA178_7426_3DC9_41B8_D5838E820E7E); this.mainPlayList.set('selectedIndex', 3)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_218AB53B_3052_557A_41BF_78AED4277802",
 "data": {
  "label": "Arrow 06b"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 20.05,
   "yaw": 164.21,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -16.04,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A059A6B_304F_BF1B_417E_9D1170254D2A_0_HS_1_0_0_map.gif",
      "width": 32,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 18.62,
   "image": "this.AnimatedImageResource_A019E337_BBB7_8C8A_41C1_47AD2893E3E1",
   "pitch": -19.61,
   "yaw": -137.29,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3A7D98B9_304E_5B07_41B3_0EA7B832B210, this.camera_6213E165_7426_3DFB_41D2_458AD7E2B5D0); this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_22A4969D_3051_F73F_41B5_F7C84706E6AA",
 "data": {
  "label": "Arrow 06b"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 18.62,
   "yaw": -137.29,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -19.61,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A059A6B_304F_BF1B_417E_9D1170254D2A_0_HS_2_0_0_map.gif",
      "width": 32,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 19.35,
   "image": "this.AnimatedImageResource_A01DD33E_BBB7_8CFA_41E4_ED3583C71B3C",
   "pitch": -8.56,
   "yaw": -4.16,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_38A1AA40_3521_C855_41AE_EAFC900E8D5B, this.camera_60480364_7426_3DF9_41D4_661D964B731A); this.mainPlayList.set('selectedIndex', 5)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_254E22A0_304E_AF05_41C4_8809A67E4302",
 "data": {
  "label": "Arrow 06a"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 19.35,
   "yaw": -4.16,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -8.56,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7C6042_304F_AB05_41BB_9E5BDE610A16_0_HS_0_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 20.74,
   "image": "this.AnimatedImageResource_A01D233E_BBB7_8CFA_41C3_8D72360A0A76",
   "pitch": -21.69,
   "yaw": 175.87,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3A01C6A8_304F_D706_41B6_6891195BF8E4, this.camera_6046635B_7426_3DCF_41C9_806BE01A30DC); this.mainPlayList.set('selectedIndex', 7)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_78D6B092_77A2_D31F_41DA_A29DD5B25361",
 "data": {
  "label": "Arrow 06a"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 20.74,
   "yaw": 175.87,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -21.69,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7C6042_304F_AB05_41BB_9E5BDE610A16_0_HS_2_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 19.81,
   "image": "this.AnimatedImageResource_A0295347_BBB7_8C8A_41E0_CFCD4E56DD98",
   "pitch": -19.68,
   "yaw": -144.99,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3A04272A_304F_B51A_41C4_E50EE9F2652F, this.camera_60693339_7426_3D4B_41D2_D59FC52F41D5); this.mainPlayList.set('selectedIndex', 22)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1207A990_3052_BD06_41C1_1A910E36428A",
 "data": {
  "label": "Arrow 06a Left-Up"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 19.81,
   "yaw": -144.99,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -19.68,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7B0CF2_304F_BB05_41C7_8B0505061C09_0_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7B0CF2_304F_BB05_41C7_8B0505061C09_0_HS_1_0.png",
      "width": 108,
      "class": "ImageResourceLevel",
      "height": 159
     }
    ]
   },
   "hfov": 6.39,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -8.15,
   "yaw": 2.73
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_AC07FBAF_BB51_739A_41CF_BAE29C7973CA, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingBottom':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'paddingTop':5,'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_A04CA367_BBB7_8C8A_41D2_081492E6E3FB, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_AA974CE4_BABD_474D_41E2_0FAC0557B84F",
 "data": {
  "label": "Pelinggih Luhur"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 6.39,
   "yaw": 2.73,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -8.15,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7B0CF2_304F_BB05_41C7_8B0505061C09_0_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 23
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 22.49,
   "image": "this.AnimatedImageResource_A0272340_BBB7_8C86_41E5_883B077569B6",
   "pitch": -20.23,
   "yaw": -118.1,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3B09714D_304E_AD1E_4199_D052CEA2C9CA, this.camera_62D57267_7426_3FC7_41D3_431B78018F39); this.mainPlayList.set('selectedIndex', 14)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_2B082CF8_3073_BB05_41C0_F18A783927C5",
 "data": {
  "label": "Arrow 06a"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 22.49,
   "yaw": -118.1,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -20.23,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7DD01D_304E_6B3E_41C0_CDFC2AF5C1B5_0_HS_0_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AA62C6E2_BB51_758A_41E5_B86C9FFBCEB8_0_HS_0_0.png",
      "width": 122,
      "class": "ImageResourceLevel",
      "height": 113
     }
    ]
   },
   "hfov": 7.25,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -4.86,
   "yaw": 122.41
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_A2CDBEA5_BBB0_958E_41C1_80D65946A23C, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingBottom':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'paddingTop':5,'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_21603D75_31E1_D626_4185_9EC156994181, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_AA0E4B68_BB50_BC86_41BF_C0202750630B",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 7.25,
   "yaw": 122.41,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -4.86,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AA62C6E2_BB51_758A_41E5_B86C9FFBCEB8_0_HS_0_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 16.63,
   "image": "this.AnimatedImageResource_A01A0337_BBB7_8C8A_41DF_B0477BD15BF5",
   "pitch": -8.58,
   "yaw": 170.22,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3A059A6B_304F_BF1B_417E_9D1170254D2A, this.camera_620A9188_7426_3D49_41A5_6CDD2E48E970); this.mainPlayList.set('selectedIndex', 1)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_AA08E899_BB50_BD86_41DC_F976A2D5E47E",
 "data": {
  "label": "Arrow 06a"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 16.63,
   "yaw": 170.22,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -8.58,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AA62C6E2_BB51_758A_41E5_B86C9FFBCEB8_0_HS_1_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 28.23,
   "image": "this.AnimatedImageResource_A01E933D_BBB7_8CFE_41D5_0E957A4D3481",
   "pitch": -21.67,
   "yaw": 50.64,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3AD8E193_3521_F8FB_41B4_C7EC9E46BED1, this.camera_62AE520C_7426_3F49_41D7_3BF4D208D1D3); this.mainPlayList.set('selectedIndex', 3)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_25BAD68D_3052_D71E_41C1_79894CB68108",
 "data": {
  "label": "Arrow 06a Left-Up"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 28.23,
   "yaw": 50.64,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -21.67,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7C946B_304F_AB1B_41B9_F4FC4958B0DD_0_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 21.21,
   "image": "this.AnimatedImageResource_A01EF33D_BBB7_8CFE_418C_CAAC6BF2FB08",
   "pitch": -1.22,
   "yaw": -159.63,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3A0172E9_304F_AF07_41B5_6F764155656E, this.camera_62BC51FB_7426_3CCF_41D5_C7977F0C63BF); this.mainPlayList.set('selectedIndex', 18)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_23A420C6_3053_AB0A_41AA_D29FFF0AAC46",
 "data": {
  "label": "Arrow 06a"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 21.21,
   "yaw": -159.63,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.22,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7C946B_304F_AB1B_41B9_F4FC4958B0DD_0_HS_1_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 19.08,
   "image": "this.AnimatedImageResource_A01E233D_BBB7_8CFE_41E7_3606BF61B2DF",
   "pitch": -23.83,
   "yaw": -1.38,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3A7D98B9_304E_5B07_41B3_0EA7B832B210, this.camera_6301E296_7426_3F59_41D3_67756C85CC74); this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_2447696C_3526_482D_41B8_D8900E736CC2",
 "data": {
  "label": "Arrow 06a"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 19.08,
   "yaw": -1.38,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -23.83,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_38A1AA40_3521_C855_41AE_EAFC900E8D5B_0_HS_0_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 18.42,
   "image": "this.AnimatedImageResource_A01E633D_BBB7_8CFE_41B4_C60B23299864",
   "pitch": -24.2,
   "yaw": 173.78,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3A7C6042_304F_AB05_41BB_9E5BDE610A16, this.camera_6370229F_7426_3F47_4183_B019A8D861A8); this.mainPlayList.set('selectedIndex', 6)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_277504A1_3526_F8D7_41BD_9B1B76735AC3",
 "data": {
  "label": "Arrow 06a"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 18.42,
   "yaw": 173.78,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -24.2,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_38A1AA40_3521_C855_41AE_EAFC900E8D5B_0_HS_1_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 19.09,
   "image": "this.AnimatedImageResource_A020833F_BBB7_8CFA_41E2_A05D13CCA51E",
   "pitch": -15.84,
   "yaw": -72.89,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_AB090F57_BB50_948A_41AB_C9B9971030AD, this.camera_605AE34A_7426_3DC9_41DB_F0C802E42B06); this.mainPlayList.set('selectedIndex', 12)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_29A82D65_3072_550F_41C3_67B3BC4D60D2",
 "data": {
  "label": "Arrow 06a"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 19.09,
   "yaw": -72.89,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -15.84,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A1D961B_304E_773A_41B3_DB48EC1F9BB9_0_HS_0_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 21.28,
   "image": "this.AnimatedImageResource_A022633F_BBB7_8CFA_41E0_92F73F1012E6",
   "pitch": -12.13,
   "yaw": 30.36,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3A7CF4F2_304F_EB0A_41C4_9CC1C3CEF207, this.camera_605E0352_7426_3DD9_41AD_97FD98EFE9C0); this.mainPlayList.set('selectedIndex', 17)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_2943C6C5_3071_D70E_41C3_CB6876898BD0",
 "data": {
  "label": "Arrow 06a"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 21.28,
   "yaw": 30.36,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -12.13,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A1D961B_304E_773A_41B3_DB48EC1F9BB9_0_HS_1_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 21.18,
   "image": "this.AnimatedImageResource_A021C33F_BBB7_8CFA_41E6_4439C34E264A",
   "pitch": -27.92,
   "yaw": -167.71,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3B09714D_304E_AD1E_4199_D052CEA2C9CA, this.camera_60531342_7426_3D39_41C3_C05114C4784D); this.mainPlayList.set('selectedIndex', 14)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_B528FD7C_BA0B_313C_41D8_E5EF06087803",
 "data": {
  "label": "Arrow 06a"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 21.18,
   "yaw": -167.71,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -27.92,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A1D961B_304E_773A_41B3_DB48EC1F9BB9_0_HS_3_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 17.95,
   "image": "this.AnimatedImageResource_A0197337_BBB7_8C8A_41C1_3BAEA03BC9FB",
   "pitch": -23.46,
   "yaw": 53.75,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3A059A6B_304F_BF1B_417E_9D1170254D2A, this.camera_63BCE2CC_7426_3CC9_4169_92C870CE423D); this.mainPlayList.set('selectedIndex', 1)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_21E6CC2C_305F_DB1E_41AF_0B5832A712A7",
 "data": {
  "label": "Arrow 06a"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 17.95,
   "yaw": 53.75,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -23.46,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7D98B9_304E_5B07_41B3_0EA7B832B210_0_HS_0_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 21.45,
   "image": "this.AnimatedImageResource_A018A337_BBB7_8C8A_4199_44F8573E7E71",
   "pitch": -16.03,
   "yaw": -92.86,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_38A1AA40_3521_C855_41AE_EAFC900E8D5B, this.camera_639EF2DE_7426_3CC6_41D5_2C020FF9F3DD); this.mainPlayList.set('selectedIndex', 5)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_207C6F69_305F_D506_41C1_0F90D8501A98",
 "data": {
  "label": "Arrow 06a"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 21.45,
   "yaw": -92.86,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -16.03,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7D98B9_304E_5B07_41B3_0EA7B832B210_0_HS_1_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 18.96,
   "image": "this.AnimatedImageResource_A0181337_BBB7_8C8A_41DE_F4F382D03233",
   "pitch": -14.4,
   "yaw": 142.92,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3AD8E193_3521_F8FB_41B4_C7EC9E46BED1, this.camera_63AEA2D5_7426_3CDA_41C2_5158BF1873AD); this.mainPlayList.set('selectedIndex', 3)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_21637B53_305E_5D0B_41AE_F15838014C2F",
 "data": {
  "label": "Arrow 06a"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 18.96,
   "yaw": 142.92,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -14.4,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7D98B9_304E_5B07_41B3_0EA7B832B210_0_HS_2_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7D98B9_304E_5B07_41B3_0EA7B832B210_0_HS_3_0.png",
      "width": 85,
      "class": "ImageResourceLevel",
      "height": 104
     }
    ]
   },
   "hfov": 5.07,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -2.52,
   "yaw": 128.45
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_AC051C79_BB50_9486_41E6_E29ABA7FC22E, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingBottom':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'paddingTop':5,'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_A040D35E_BBB7_8CBA_41D5_15FAB81D180E, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_3DD60C54_334E_DC80_41B9_9568CA800DCB",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 5.07,
   "yaw": 128.45,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.52,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7D98B9_304E_5B07_41B3_0EA7B832B210_0_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 19
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 18.93,
   "image": "this.AnimatedImageResource_A022233F_BBB7_8CFA_41E4_8BD74D631A71",
   "pitch": -11.17,
   "yaw": -0.3,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3A7DCC94_304E_7B0D_41C0_BE373044AD04, this.camera_6243E1D4_7426_3CD9_41DC_63CD6689DE07); this.mainPlayList.set('selectedIndex', 10)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_2814B7C7_307E_D50A_41BB_EA3584CB1011",
 "data": {
  "label": "Arrow 06a"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 18.93,
   "yaw": -0.3,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -11.17,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A1A02A4_304E_6F0E_41C5_AC4A3516F2EE_0_HS_0_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 17.57,
   "image": "this.AnimatedImageResource_A021B33F_BBB7_8CFA_41AF_BA80FC20D246",
   "pitch": -15.12,
   "yaw": -179.57,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_AB090F57_BB50_948A_41AB_C9B9971030AD, this.camera_624DC1E6_7426_3CC6_41CE_783D010A7451); this.mainPlayList.set('selectedIndex', 12)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_285CE7FD_307E_74FE_41BA_E96D437CEDB5",
 "data": {
  "label": "Arrow 06a"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 17.57,
   "yaw": -179.57,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -15.12,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A1A02A4_304E_6F0E_41C5_AC4A3516F2EE_0_HS_1_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 23.96,
   "image": "this.AnimatedImageResource_A023C33E_BBB7_8CFA_41C7_ED36EA5A5596",
   "pitch": -0.05,
   "yaw": -7.79,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3A7CACB1_304F_DB06_4171_D242DDD6A640, this.camera_634C62C2_7426_3F39_41A6_ADC25FC8B0F2); this.mainPlayList.set('selectedIndex', 8)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_268DC782_3072_D505_418C_5D5E34C64523",
 "data": {
  "label": "Arrow 06a"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 23.96,
   "yaw": -7.79,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.05,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A1EC2B5_304F_EF0E_4198_A2503B9406DD_0_HS_0_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 19.81,
   "image": "this.AnimatedImageResource_A023233E_BBB7_8CFA_41DD_B513FB98A0AD",
   "pitch": -18.93,
   "yaw": 176.66,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3A7DCC94_304E_7B0D_41C0_BE373044AD04, this.camera_6342D2B9_7426_3F4B_415D_810D21E8A0F9); this.mainPlayList.set('selectedIndex', 10)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_B7D2C8A5_BA07_7FCC_41E3_5AE6EAC40572",
 "data": {
  "label": "Arrow 06a"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 19.81,
   "yaw": 176.66,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -18.93,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A1EC2B5_304F_EF0E_4198_A2503B9406DD_0_HS_2_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 19.59,
   "image": "this.AnimatedImageResource_A01C933E_BBB7_8CFA_41DC_196AE3B9CFF5",
   "pitch": -16.18,
   "yaw": 5.02,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3A7C6042_304F_AB05_41BB_9E5BDE610A16, this.camera_62990220_7426_3F79_41DA_5B9C148FCFBA); this.mainPlayList.set('selectedIndex', 6)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_257FA19A_3072_6D05_41C6_74BF2819494C",
 "data": {
  "label": "Arrow 06a"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 19.59,
   "yaw": 5.02,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -16.18,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A01C6A8_304F_D706_41B6_6891195BF8E4_0_HS_0_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 19.12,
   "image": "this.AnimatedImageResource_A01CC33E_BBB7_8CFA_41E5_2465B08B1660",
   "pitch": -29.84,
   "yaw": -174.11,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3A7CACB1_304F_DB06_4171_D242DDD6A640, this.camera_62891231_7426_3F5B_41DB_CAD34C354E4C); this.mainPlayList.set('selectedIndex', 8)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_2600A3A7_3072_AD0A_41C1_1FADC82A4707",
 "data": {
  "label": "Arrow 06a"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 19.12,
   "yaw": -174.11,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -29.84,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A01C6A8_304F_D706_41B6_6891195BF8E4_0_HS_1_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 18.42,
   "image": "this.AnimatedImageResource_A0213340_BBB7_8C86_41E5_3AE1FFE42F9D",
   "pitch": -14.47,
   "yaw": 16.65,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3A1D961B_304E_773A_41B3_DB48EC1F9BB9, this.camera_60A7C383_7426_3D3F_41D8_28525EAF2F0A); this.mainPlayList.set('selectedIndex', 13)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_29FABB0F_3076_DD1B_41B1_B55EF5CF7E67",
 "data": {
  "label": "Arrow 06a"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 18.42,
   "yaw": 16.65,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -14.47,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3B09714D_304E_AD1E_4199_D052CEA2C9CA_0_HS_0_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 18.44,
   "image": "this.AnimatedImageResource_A0208340_BBB7_8C86_41E6_A79D4DB1F2F3",
   "pitch": -17.14,
   "yaw": -147.46,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3A7DD01D_304E_6B3E_41C0_CDFC2AF5C1B5, this.camera_60B8937A_7426_3DC9_41D9_9B119C5CA5F3); this.mainPlayList.set('selectedIndex', 16)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_2A410398_3076_6D06_41C1_899618B0F715",
 "data": {
  "label": "Arrow 06a"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 18.44,
   "yaw": -147.46,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -17.14,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3B09714D_304E_AD1E_4199_D052CEA2C9CA_0_HS_1_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 17.88,
   "image": "this.AnimatedImageResource_A020F340_BBB7_8C86_41E0_7AE3CD35FCB2",
   "pitch": -22.08,
   "yaw": 156.57,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_4B217AF1_5F2C_5F1C_418B_6359B28A1ECF, this.camera_60B1F36F_7426_3DC7_41DA_E0D632D0C1C9); this.mainPlayList.set('selectedIndex', 15)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_2A5CC569_3071_F506_41B2_B7B9A730E4CF",
 "data": {
  "label": "Arrow 06a"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 17.88,
   "yaw": 156.57,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -22.08,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3B09714D_304E_AD1E_4199_D052CEA2C9CA_0_HS_2_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 16.63,
   "image": "this.AnimatedImageResource_A0267345_BBB7_8C8E_41E1_185A26F5E68C",
   "pitch": -23.94,
   "yaw": -0.84,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3A7C946B_304F_AB1B_41B9_F4FC4958B0DD, this.camera_60C1A3C9_7426_3CCB_41CF_866BE5118321); this.mainPlayList.set('selectedIndex', 4)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_2CD7DC5F_304E_7B3B_41A5_C7E22A11F7D4",
 "data": {
  "label": "Arrow 06a"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 16.63,
   "yaw": -0.84,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -23.94,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A0172E9_304F_AF07_41B5_6F764155656E_0_HS_0_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 20.29,
   "image": "this.AnimatedImageResource_A025F345_BBB7_8C8E_41E0_B2D2ADFA59EA",
   "pitch": -14.4,
   "yaw": -93.96,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3A7CF4F2_304F_EB0A_41C4_9CC1C3CEF207, this.camera_60CDE3D1_7426_3CDB_41B5_E074470085D8); this.mainPlayList.set('selectedIndex', 17)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_100839D9_3053_FD07_41C5_CBD3EAC319B0",
 "data": {
  "label": "Arrow 06a"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 20.29,
   "yaw": -93.96,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -14.4,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A0172E9_304F_AF07_41B5_6F764155656E_0_HS_2_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 16.17,
   "image": "this.AnimatedImageResource_A0253346_BBB7_8C8A_41DE_73FAEB687C78",
   "pitch": -23.66,
   "yaw": -179.69,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3A7B68D1_304E_5B07_41C0_CD9E794756C0, this.camera_60DBF3C2_7426_3D39_41D6_90DE88D2089C); this.mainPlayList.set('selectedIndex', 19)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_AA052B39_BABB_C2C7_41D9_464F05381E29",
 "data": {
  "label": "Arrow 06a"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 16.17,
   "yaw": -179.69,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -23.66,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A0172E9_304F_AF07_41B5_6F764155656E_0_HS_3_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 16.78,
   "image": "this.AnimatedImageResource_A02B4346_BBB7_8C8A_41E2_0D05FECC1939",
   "pitch": -20.57,
   "yaw": -30.88,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_B67D7675_BB50_B48E_4194_BA9CBDCEFC89, this.camera_625381C0_7426_3D39_41C8_A3968D899396); this.mainPlayList.set('selectedIndex', 20)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_2FD2385E_3056_7B3D_41BC_0CDAFC492D5F",
 "data": {
  "label": "Arrow 06a"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 16.78,
   "yaw": -30.88,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -20.57,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7B50D0_304F_AB05_41B3_D8035AC7BF4F_0_HS_0_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 20.91,
   "image": "this.AnimatedImageResource_A02AA346_BBB7_8C8A_41E1_A198EF10AFBB",
   "pitch": -18.45,
   "yaw": 71.85,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3A04272A_304F_B51A_41C4_E50EE9F2652F, this.camera_626171AB_7426_3D4F_41D9_BB7886615700); this.mainPlayList.set('selectedIndex', 22)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_10C4AC89_3057_DB06_41A2_6F7E732A51D9",
 "data": {
  "label": "Arrow 06a"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 20.91,
   "yaw": 71.85,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -18.45,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7B50D0_304F_AB05_41B3_D8035AC7BF4F_0_HS_1_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7B50D0_304F_AB05_41B3_D8035AC7BF4F_0_HS_2_0.png",
      "width": 104,
      "class": "ImageResourceLevel",
      "height": 146
     }
    ]
   },
   "hfov": 6.14,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -5.89,
   "yaw": -147.76
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_A33E30FA_BB50_8D7A_41A5_57A5201D7E96, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingBottom':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'paddingTop':5,'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_A04EC366_BBB7_8C8A_41C9_92557ED8588B, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_AA7A4DDA_BABE_C145_41D7_E0AD3C993BC6",
 "data": {
  "label": "Luhur Batukaru"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 6.14,
   "yaw": -147.76,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -5.89,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7B50D0_304F_AB05_41B3_D8035AC7BF4F_0_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 22
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 22.59,
   "image": "this.AnimatedImageResource_A01C333E_BBB7_8CFA_41CE_55B0DB27E178",
   "pitch": -19.48,
   "yaw": -0.97,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3A01C6A8_304F_D706_41B6_6891195BF8E4, this.camera_62FB2245_7426_3F3B_41B9_C662A2B80F71); this.mainPlayList.set('selectedIndex', 7)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_260DAB5D_3076_BD3F_41B9_62BEA0240485",
 "data": {
  "label": "Arrow 06a"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 22.59,
   "yaw": -0.97,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -19.48,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7CACB1_304F_DB06_4171_D242DDD6A640_0_HS_0_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 18.35,
   "image": "this.AnimatedImageResource_A01C633E_BBB7_8CFA_41B7_4462D43F330B",
   "pitch": -35.67,
   "yaw": 174.94,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3A1EC2B5_304F_EF0E_4198_A2503B9406DD, this.camera_62EBA258_7426_3FC9_41C6_C75363E394F5); this.mainPlayList.set('selectedIndex', 9)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_273C773B_3077_B57B_41BB_F4220863C9FB",
 "data": {
  "label": "Arrow 06a"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 18.35,
   "yaw": 174.94,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -35.67,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3A7CACB1_304F_DB06_4171_D242DDD6A640_0_HS_1_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A021F33F_BBB7_8CFA_41D7_801BADAE0E26",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_AB090F57_BB50_948A_41AB_C9B9971030AD_0_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A021433F_BBB7_8CFA_41C0_0C70A18AF353",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_AB090F57_BB50_948A_41AB_C9B9971030AD_0_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A01FA338_BBB7_8C86_4198_B727AC790E8E",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_3AD8E193_3521_F8FB_41B4_C7EC9E46BED1_0_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A01FE338_BBB7_8C86_4193_FC576BD7095C",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_3AD8E193_3521_F8FB_41B4_C7EC9E46BED1_0_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A01F233D_BBB7_8CFE_41D6_B1B7EEB383D8",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_3AD8E193_3521_F8FB_41B4_C7EC9E46BED1_0_HS_2_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A022933E_BBB7_8CFA_41E7_17C002C63889",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_3A7DCC94_304E_7B0D_41C0_BE373044AD04_0_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A022F33F_BBB7_8CFA_41DF_237F9FD677D4",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_3A7DCC94_304E_7B0D_41C0_BE373044AD04_0_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A026A340_BBB7_8C86_41C0_DCDFA3A890DE",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_3A7CF4F2_304F_EB0A_41C4_9CC1C3CEF207_0_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A0260345_BBB7_8C8E_41DE_BEF09EA3C248",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_3A7CF4F2_304F_EB0A_41C4_9CC1C3CEF207_0_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A02A4347_BBB7_8C8A_41DD_772643A488B9",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_3A04272A_304F_B51A_41C4_E50EE9F2652F_0_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A029C347_BBB7_8C8A_41C9_79228FD9ED6D",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_3A04272A_304F_B51A_41C4_E50EE9F2652F_0_HS_1_0.png",
   "width": 520,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A0247346_BBB7_8C8A_41CA_2413439BC99A",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_B67D7675_BB50_B48E_4194_BA9CBDCEFC89_0_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A02BC346_BBB7_8C8A_41D0_54B0CB7A1674",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_B67D7675_BB50_B48E_4194_BA9CBDCEFC89_0_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_4C8C8791_5F5B_051B_41A2_108B316B1500",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_4B217AF1_5F2C_5F1C_418B_6359B28A1ECF_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_4C8C1791_5F5B_051A_41C6_E6BF479BA959",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_4B217AF1_5F2C_5F1C_418B_6359B28A1ECF_1_HS_1_0.png",
   "width": 520,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A024B346_BBB7_8C8A_41E1_8FA3F89D19D3",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_3A7B68D1_304E_5B07_41C0_CD9E794756C0_0_HS_0_0.png",
   "width": 520,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A0241346_BBB7_8C8A_41B6_15FAEF83FD03",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_3A7B68D1_304E_5B07_41C0_CD9E794756C0_0_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A01A7337_BBB7_8C8A_41E6_5A133C6C6036",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_3A059A6B_304F_BF1B_417E_9D1170254D2A_0_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A0198337_BBB7_8C8A_41E5_FCAE6F625920",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_3A059A6B_304F_BF1B_417E_9D1170254D2A_0_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A019E337_BBB7_8C8A_41C1_47AD2893E3E1",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_3A059A6B_304F_BF1B_417E_9D1170254D2A_0_HS_2_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A01DD33E_BBB7_8CFA_41E4_ED3583C71B3C",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_3A7C6042_304F_AB05_41BB_9E5BDE610A16_0_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A01D233E_BBB7_8CFA_41C3_8D72360A0A76",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_3A7C6042_304F_AB05_41BB_9E5BDE610A16_0_HS_2_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A0295347_BBB7_8C8A_41E0_CFCD4E56DD98",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_3A7B0CF2_304F_BB05_41C7_8B0505061C09_0_HS_0_0.png",
   "width": 520,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A0272340_BBB7_8C86_41E5_883B077569B6",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_3A7DD01D_304E_6B3E_41C0_CDFC2AF5C1B5_0_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A01A0337_BBB7_8C8A_41DF_B0477BD15BF5",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_AA62C6E2_BB51_758A_41E5_B86C9FFBCEB8_0_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A01E933D_BBB7_8CFE_41D5_0E957A4D3481",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_3A7C946B_304F_AB1B_41B9_F4FC4958B0DD_0_HS_0_0.png",
   "width": 520,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A01EF33D_BBB7_8CFE_418C_CAAC6BF2FB08",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_3A7C946B_304F_AB1B_41B9_F4FC4958B0DD_0_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A01E233D_BBB7_8CFE_41E7_3606BF61B2DF",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_38A1AA40_3521_C855_41AE_EAFC900E8D5B_0_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A01E633D_BBB7_8CFE_41B4_C60B23299864",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_38A1AA40_3521_C855_41AE_EAFC900E8D5B_0_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A020833F_BBB7_8CFA_41E2_A05D13CCA51E",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_3A1D961B_304E_773A_41B3_DB48EC1F9BB9_0_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A022633F_BBB7_8CFA_41E0_92F73F1012E6",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_3A1D961B_304E_773A_41B3_DB48EC1F9BB9_0_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A021C33F_BBB7_8CFA_41E6_4439C34E264A",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_3A1D961B_304E_773A_41B3_DB48EC1F9BB9_0_HS_3_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A0197337_BBB7_8C8A_41C1_3BAEA03BC9FB",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_3A7D98B9_304E_5B07_41B3_0EA7B832B210_0_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A018A337_BBB7_8C8A_4199_44F8573E7E71",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_3A7D98B9_304E_5B07_41B3_0EA7B832B210_0_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A0181337_BBB7_8C8A_41DE_F4F382D03233",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_3A7D98B9_304E_5B07_41B3_0EA7B832B210_0_HS_2_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A022233F_BBB7_8CFA_41E4_8BD74D631A71",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_3A1A02A4_304E_6F0E_41C5_AC4A3516F2EE_0_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A021B33F_BBB7_8CFA_41AF_BA80FC20D246",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_3A1A02A4_304E_6F0E_41C5_AC4A3516F2EE_0_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A023C33E_BBB7_8CFA_41C7_ED36EA5A5596",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_3A1EC2B5_304F_EF0E_4198_A2503B9406DD_0_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A023233E_BBB7_8CFA_41DD_B513FB98A0AD",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_3A1EC2B5_304F_EF0E_4198_A2503B9406DD_0_HS_2_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A01C933E_BBB7_8CFA_41DC_196AE3B9CFF5",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_3A01C6A8_304F_D706_41B6_6891195BF8E4_0_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A01CC33E_BBB7_8CFA_41E5_2465B08B1660",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_3A01C6A8_304F_D706_41B6_6891195BF8E4_0_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A0213340_BBB7_8C86_41E5_3AE1FFE42F9D",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_3B09714D_304E_AD1E_4199_D052CEA2C9CA_0_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A0208340_BBB7_8C86_41E6_A79D4DB1F2F3",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_3B09714D_304E_AD1E_4199_D052CEA2C9CA_0_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A020F340_BBB7_8C86_41E0_7AE3CD35FCB2",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_3B09714D_304E_AD1E_4199_D052CEA2C9CA_0_HS_2_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A0267345_BBB7_8C8E_41E1_185A26F5E68C",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_3A0172E9_304F_AF07_41B5_6F764155656E_0_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A025F345_BBB7_8C8E_41E0_B2D2ADFA59EA",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_3A0172E9_304F_AF07_41B5_6F764155656E_0_HS_2_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A0253346_BBB7_8C8A_41DE_73FAEB687C78",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_3A0172E9_304F_AF07_41B5_6F764155656E_0_HS_3_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A02B4346_BBB7_8C8A_41E2_0D05FECC1939",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_3A7B50D0_304F_AB05_41B3_D8035AC7BF4F_0_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A02AA346_BBB7_8C8A_41E1_A198EF10AFBB",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_3A7B50D0_304F_AB05_41B3_D8035AC7BF4F_0_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A01C333E_BBB7_8CFA_41CE_55B0DB27E178",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_3A7CACB1_304F_DB06_4171_D242DDD6A640_0_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A01C633E_BBB7_8CFA_41B7_4462D43F330B",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_3A7CACB1_304F_DB06_4171_D242DDD6A640_0_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ]
}],
 "width": "100%",
 "data": {
  "name": "Player445"
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
