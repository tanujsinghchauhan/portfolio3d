import * as THREE from "three";

let audioCtx, analyser, dataArray, source;
let isPlaying = false;
let trackIndex = 0;

// PRODUCTION FIX: Ensure these files are in your /public/tracks/ folder
const playlist = [
  { name: "Ain't No Sunshine", src: "/tracks/track2.mp3" },
  { name: "Time in a Bottle", src: "/tracks/track5.mp3" },
  { name: "Great Balls of Fire", src: "/tracks/track3.mp3" },
  { name: "Paint it Black", src: "/tracks/track4.mp3" },
  { name: "Back on The Rocks", src: "/tracks/track1.mp3" },
];

const audio = new Audio();
// Essential for Web Audio API visualizers in production
audio.crossOrigin = "anonymous";

export function createTapePanel() {
  const panel = document.createElement("div");
  panel.id = "tape-deck";

  // Style: Brutalist Analog Hardware
  Object.assign(panel.style, {
    position: "fixed",
    top: "40px",
    right: "40px",
    padding: "20px",
    background: "rgba(10, 15, 10, 0.98)",
    color: "#d9ff8a",
    fontFamily: "'Courier New', monospace",
    border: "1px solid rgba(217, 255, 138, 0.3)",
    display: "none",
    zIndex: "200000",
    width: "300px",
    boxShadow: "0 0 30px rgba(0,0,0,0.8)",
    backgroundImage:
      "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.1) 50%)",
    backgroundSize: "100% 4px",
    pointerEvents: "auto",
    userSelect: "none",
  });

  panel.innerHTML = `
    <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #3d5244; padding-bottom: 8px; margin-bottom: 15px;">
      <span style="font-size: 10px; letter-spacing: 1px;">MAGNETIC_REEL_DECK // 01</span>
      <span id="tape-status" style="font-size: 10px; color: #f44336;">STOPPED</span>
    </div>
    
    <div id="track-display" style="background: #000; padding: 10px; border: 1px solid #222; margin-bottom: 15px; text-align: center;">
      <div id="track-name" style="font-size: 12px; color: #fff; white-space: nowrap; overflow: hidden;">${playlist[trackIndex].name}</div>
    </div>

    <canvas id="visualizer" width="260" height="60" style="width: 100%; background: #050805; border: 1px solid #1a221a; margin-bottom: 15px;"></canvas>

    <div style="display: flex; justify-content: space-around; align-items: center; margin-bottom: 10px;">
      <button id="prevTrack" class="tape-btn" style="background:none; border:1px solid #d9ff8a; color:#d9ff8a; cursor:pointer; padding: 5px;">[<<]</button>
      <button id="playToggle" class="tape-btn" style="background:#d9ff8a; border:none; color:#000; cursor:pointer; padding: 8px 20px; font-weight:bold; font-size: 12px;">LOAD_TAPE</button>
      <button id="nextTrack" class="tape-btn" style="background:none; border:1px solid #d9ff8a; color:#d9ff8a; cursor:pointer; padding: 5px;">[>>]</button>
    </div>

    <button id="closeTape" style="width: 100%; background: none; border: 1px solid rgba(217, 255, 138, 0.2); color: rgba(217, 255, 138, 0.5); cursor: pointer; font-size: 9px; padding: 4px; margin-top: 5px;">EJECT_INTERFACE</button>
  `;

  document.body.appendChild(panel);
  setupAudioLogic(panel);
  return panel;
}

function setupAudioLogic(panel) {
  const canvas = panel.querySelector("#visualizer");
  const ctx = canvas.getContext("2d");
  const playBtn = panel.querySelector("#playToggle");
  const statusDisp = panel.querySelector("#tape-status");
  const trackNameDisp = panel.querySelector("#track-name");

  function initAnalyzer() {
    if (audioCtx) return;
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioCtx.createAnalyser();
    source = audioCtx.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);
    analyser.fftSize = 64;
    dataArray = new Uint8Array(analyser.frequencyBinCount);
    drawVisualizer();
  }

  function drawVisualizer() {
    requestAnimationFrame(drawVisualizer);
    if (!analyser) return;
    analyser.getByteFrequencyData(dataArray);

    ctx.fillStyle = "#050805";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const barWidth = (canvas.width / dataArray.length) * 2.5;
    let x = 0;

    for (let i = 0; i < dataArray.length; i++) {
      const barHeight = dataArray[i] / 4;
      ctx.fillStyle = `rgb(217, 255, 138)`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = "#d9ff8a";
      ctx.fillRect(x, (canvas.height - barHeight) / 2, barWidth - 2, barHeight);
      x += barWidth;
    }
  }

  function loadTrack() {
    audio.src = playlist[trackIndex].src;
    trackNameDisp.innerText = playlist[trackIndex].name;
    if (isPlaying) {
      audio.play().catch((e) => console.error("Playback failed:", e));
    }
  }

  playBtn.onclick = () => {
    initAnalyzer();
    if (audioCtx.state === "suspended") audioCtx.resume();

    if (isPlaying) {
      audio.pause();
      playBtn.innerText = "PLAY_REEL";
      statusDisp.innerText = "STOPPED";
      statusDisp.style.color = "#f44336";
    } else {
      audio.play().catch((e) => console.error("Playback failed:", e));
      playBtn.innerText = "STOP_REEL";
      statusDisp.innerText = "PLAYING";
      statusDisp.style.color = "#d9ff8a";
    }
    isPlaying = !isPlaying;
  };

  panel.querySelector("#nextTrack").onclick = () => {
    trackIndex = (trackIndex + 1) % playlist.length;
    loadTrack();
  };

  panel.querySelector("#prevTrack").onclick = () => {
    trackIndex = (trackIndex - 1 + playlist.length) % playlist.length;
    loadTrack();
  };

  panel.querySelector("#closeTape").onclick = () => {
    panel.style.display = "none";
  };

  loadTrack();
}
