export function createUIPanel() {
  const panel = document.createElement("div");

  // Aesthetic: Gritty CRT Terminal
  panel.style.position = "fixed";
  panel.style.bottom = "40px";
  panel.style.left = "40px";
  panel.style.padding = "24px";
  panel.style.background = "rgba(8, 12, 8, 0.98)";
  panel.style.color = "#d9ff8a";
  panel.style.fontFamily = "'Courier New', Courier, monospace";
  panel.style.fontSize = "14px";
  panel.style.display = "none";
  panel.style.maxWidth = "350px";
  panel.style.border = "1px solid rgba(217, 255, 138, 0.4)";
  panel.style.boxShadow = "0 0 20px rgba(217, 255, 138, 0.15)";

  // LAYER FIXES
  panel.style.zIndex = "200000";
  panel.style.pointerEvents = "auto";
  panel.style.userSelect = "text";

  panel.style.backgroundImage =
    "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.2) 50%)";
  panel.style.backgroundSize = "100% 3px";

  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes crtFlicker {
      0% { opacity: 0.98; }
      50% { opacity: 1; }
      100% { opacity: 0.99; }
    }
    .crt-active { animation: crtFlicker 0.1s infinite; }
    
    .panel-link {
      display: inline-block;
      margin-top: 15px;
      color: #000 !important;
      background: #F56527;
      padding: 6px 12px;
      text-decoration: none !important;
      font-weight: bold;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 1px;
      border-radius: 2px;
      cursor: pointer !important;
      transition: background 0.2s ease;
    }

    .panel-link:hover {
      background: #ff7e42;
      box-shadow: 0 0 10px rgba(245, 101, 39, 0.5);
    }
  `;
  document.head.appendChild(style);
  panel.classList.add("crt-active");

  document.body.appendChild(panel);
  return { panel };
}

export function showPanel(panelObj, title, text, link = "", controls = null) {
  panelObj.panel.style.display = "block";

  if (controls && typeof controls.unlock === "function") {
    controls.unlock();
  }

  if (document.exitPointerLock) {
    document.exitPointerLock();
  }

  // Added a link-container div below the typewriter content
  const header = `
    <div style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(217, 255, 138, 0.2); margin-bottom: 12px; padding-bottom: 8px;">
      <span style="font-size: 10px; letter-spacing: 1px; color: #d9ff8a;">FILE_ACCESS_CLEAR</span>
      <button id="closePanel" style="background: #d9ff8a; border: none; color: #000; cursor: pointer; font-size: 10px; font-weight: bold; padding: 2px 8px;">X</button>
    </div>
    <h3 style="margin: 0 0 10px 0; text-transform: uppercase; color: #fff;">${title}</h3>
    <div id="typewriter-content" style="min-height: 60px; line-height: 1.6; color: #d9ff8a;"></div>
    <div id="link-container"></div>
  `;

  panelObj.panel.innerHTML = header;
  const contentTarget = document.getElementById("typewriter-content");
  const linkContainer = document.getElementById("link-container");

  let i = 0;
  function typeWriter() {
    if (i < text.length) {
      if (text.charAt(i) === "<") {
        let tagEnd = text.indexOf(">", i);
        if (tagEnd !== -1) {
          contentTarget.innerHTML += text.substring(i, tagEnd + 1);
          i = tagEnd + 1;
          typeWriter();
          return;
        }
      }
      contentTarget.innerHTML += text.charAt(i);
      i++;
      setTimeout(typeWriter, 10);
    } else {
      // Typing finished: Show link if it exists
      if (link && link.trim() !== "") {
        linkContainer.innerHTML = `
          <a href="${link}" target="_blank" rel="noopener noreferrer" class="panel-link">
            Open Repository
          </a>
        `;
      }
    }
  }

  typeWriter();

  document.getElementById("closePanel").onclick = (e) => {
    e.stopPropagation();
    panelObj.panel.style.display = "none";
  };
}
