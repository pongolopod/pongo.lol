document.addEventListener("DOMContentLoaded", function () {
  const box = document.querySelector("#box");
  const audioFolder = "https://api.github.com/repos/pongolopod/pongo.lol/contents/audio";
  let audioFiles = [];
  let currentAudio;

  fetch(audioFolder)
    .then(res => res.json())
    .then(data => {
      audioFiles = data.map(file => file.download_url);
    });

  box.addEventListener("click", function () {
    if (audioFiles.length) {
      const randomAudio = audioFiles[Math.floor(Math.random() * audioFiles.length)];
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }
      currentAudio = new Audio(randomAudio);
      currentAudio.play();
    }
  });


  const position = { x: 0, y: 0 }

  interact('.draggable')
    .draggable({
      inertia: true,
      modifiers: [
        interact.modifiers.restrictRect({
          restriction: 'parent',
          endOnly: true
        })
      ],
      autoScroll: true,
      snap: {
        targets: [null],
      },
      listeners: {
        move: dragMoveListener,
        end(event) {
          var textEl = event.target.querySelector('p')
          textEl && (textEl.textContent =
            'moved a distance of ' +
            (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
              Math.pow(event.pageY - event.y0, 2) | 0))
              .toFixed(2) + 'px')
        }
      }
    })
  function dragMoveListener(event) {
    var target = event.target
    var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
    var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy
    target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'
    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)
  }
  window.dragMoveListener = dragMoveListener
})
