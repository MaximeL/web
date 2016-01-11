'use strict';

/**
 * @ngdoc function
 * @name webClientSideApp.controller:LiveCtrl
 * @description
 * # LiveCtrl
 * Controller of the webClientSideApp
 */
angular.module('webClientSideApp')
  .controller('LiveCtrl', [ '$window', '$log', 'Inputnode', 'Outputnode',
    function ($window, $log, , Inputnode, Outputnode) {
    var vm = this;

    vm.audionodes = [];

    var init = function() {

      navigator.getUserMedia = (navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia);

      // set up forked web audio context, for multiple browsers
      // window. is needed otherwise Safari explodes
      vm.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      vm.source;
      vm.stream;

      //set up the different audio nodes we will use for the app

      //var analyser = vm.audioCtx.createAnalyser();
      //analyser.minDecibels = -90;
      //analyser.maxDecibels = -10;
      //analyser.smoothingTimeConstant = 0.85;
      var gainNode = vm.audioCtx.createGain();

      //var soundSource, concertHallBuffer;
      //
      //var ajaxRequest = new XMLHttpRequest();
      //
      //ajaxRequest.open('GET', 'http://mdn.github.io/voice-change-o-matic/audio/concert-crowd.ogg', true);
      //
      //ajaxRequest.responseType = 'arraybuffer';
      //
      //
      //ajaxRequest.onload = function() {
      //  var audioData = ajaxRequest.response;
      //
      //  vm.audioCtx.decodeAudioData(audioData, function(buffer) {
      //    concertHallBuffer = buffer;
      //    soundSource = vm.audioCtx.createBufferSource();
      //    soundSource.buffer = concertHallBuffer;
      //  }, function(e){"Error with decoding audio data" + e.err});
      //
      //  //soundSource.connect(vm.audioCtx.destination);
      //  //soundSource.loop = true;
      //  //soundSource.start();
      //};

      //ajaxRequest.send();

// set up canvas context for visualizer

      var canvas = document.querySelector('.visualizer');
      var canvasCtx = canvas.getContext("2d");

      var intendedWidth = document.querySelector('.wrapper').clientWidth;

      canvas.setAttribute('width',intendedWidth);

      var drawVisual;

//main block for doing the audio recording

      if (navigator.getUserMedia) {
        console.log('getUserMedia supported.');
        navigator.getUserMedia (
          // constraints - only audio needed for this app
          {
            audio: true
          },

          // Success callback
          function(stream) {
            //vm.source = vm.audioCtx.createMediaStreamSource(stream);
            //vm.source.connect(analyser);
            //analyser.connect(gainNode);
            //gainNode.connect(vm.audioCtx.destination);

            vm.INPUT = Inputnode.create(vm.audioCtx, stream);
            $log.debug(vm.INPUT);
            vm.OUTPUT = Outputnode.create(vm.audioCtx);
            $log.debug(vm.OUTPUT);

            //visualize();
          },

          // Error callback
          function(err) {
            console.log('The following gUM error occured: ' + err);
          }
        );
      } else {
        console.log('getUserMedia not supported on your browser!');
      }

      /*function visualize() {
        var WIDTH = canvas.width;
        var HEIGHT = canvas.height;
        analyser.fftSize = 2048;
        var bufferLength = analyser.fftSize;
        console.log(bufferLength);
        var dataArray = new Uint8Array(bufferLength);

        canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

        function draw() {

          var drawVisual = requestAnimationFrame(draw);

          analyser.getByteTimeDomainData(dataArray);

          canvasCtx.fillStyle = 'rgb(200, 200, 200)';
          canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

          canvasCtx.lineWidth = 2;
          canvasCtx.strokeStyle = 'rgb(0, 0, 0)';

          canvasCtx.beginPath();

          var sliceWidth = WIDTH * 1.0 / bufferLength;
          var x = 0;

          for(var i = 0; i < bufferLength; i++) {

            var v = dataArray[i] / 128.0;
            var y = v * HEIGHT/2;

            if(i === 0) {
              canvasCtx.moveTo(x, y);
            } else {
              canvasCtx.lineTo(x, y);
            }

            x += sliceWidth;
          }

          canvasCtx.lineTo(canvas.width, canvas.height/2);
          canvasCtx.stroke();
        }

        draw();

      }*/
    };

    init();

  }]);
