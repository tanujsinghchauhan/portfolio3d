import { setupScene } from "./scene/setupScene";
import { addLighting } from "./scene/lighting";
import { addControls } from "./scene/controls";
import { loadModel } from "./scene/loadModel";
import { focusCamera } from "./interaction/cameraFocus";
import { setupRaycaster } from "./interaction/raycaster";
import { createUIPanel, showPanel } from "./interaction/uiPanel";
import { setupHover } from "./interaction/hoverHighlight";
import { createTapePanel } from "./interaction/tapeUi";
const { scene, camera, renderer } = setupScene();

addLighting(scene);

const controls = addControls(camera, renderer);

const defaultCameraPosition = camera.position.clone();
const defaultTarget = controls.target.clone();

loadModel(scene, camera);

setTimeout(() => {
  window.initialCameraPosition = camera.position.clone();
  window.initialCameraTarget = controls.target.clone();
}, 300);

setupHover(scene, camera, renderer);

const panelObj = createUIPanel();
const tapePanel = createTapePanel();

// --- HELPER FUNCTIONS (Moved outside to prevent duplication) ---

function resetCamera() {
  if (!window.initialCameraPosition) return;

  let t = 0;
  const startPos = camera.position.clone();
  const startTarget = controls.target.clone();

  function animateBack() {
    t += 0.02;
    camera.position.lerpVectors(startPos, window.initialCameraPosition, t);
    controls.target.lerpVectors(startTarget, window.initialCameraTarget, t);

    if (t < 1) requestAnimationFrame(animateBack);
  }

  animateBack();
}

// --- GLOBAL EVENT LISTENERS (Moved outside) ---

window.addEventListener("click", (e) => {
  if (e.target.id === "closePanel") {
    panelObj.panel.style.display = "none";
    // Relock controls if using PointerLock
    if (controls.lock) controls.lock();
    resetCamera();
  }
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    panelObj.panel.style.display = "none";
    if (controls.lock) controls.lock();
    resetCamera();
  }
});

// --- RAYCASTER SETUP ---

setupRaycaster(scene, camera, (name, object) => {
  if (!name) return;

  focusCamera(camera, controls, object);

  if (name.includes("taperecorder")) {
    tapePanel.style.display = "block";
    if (controls.unlock) controls.unlock(); // Free mouse for player
  } else if (name.includes("Monitor")) {
    showPanel(
      panelObj,
      "User Info",
      "Hello, I am Tanuj Singh Chauhan you are inside my portfolio. I am a developer that likes to develop things that are of interest to me. I am mostly focused on Full Stack Devlopment, Cloud Computing, Data Science and Machnine Learning, 2D and 3D design and anything else that comes to me as interesting. Feel free to explore around but, don't go outside the room in darkness.",
      controls,
    );
  } else if (name.includes("tv")) {
    showPanel(
      panelObj,
      "Final Message",
      "If you liked my portfolio, Do connect with me. You can find me at sites like Github and Linkedin at siteurl/tanujsinghchauhan. Also you can mail me at nish200036@gmail.com That's all thanks for spending your precious time on my portfolio ^_^",
      controls,
    );
  } else if (name.includes("poster1")) {
    showPanel(
      panelObj,
      "My Statement",
      "This is what I am showing you here.",
      controls,
    );
  } else if (name.includes("technology")) {
    showPanel(
      panelObj,
      "My technological know how",
      "The things I can do and am good at.",
      controls,
    );
  } else if (name.includes("photo2")) {
    showPanel(panelObj, "...", "...", controls);
  } else if (name.includes("photo")) {
    showPanel(panelObj, "...", "...", controls);
  } else if (name.includes("Plane1")) {
    showPanel(panelObj, "Emperor", "remains of good taste", controls);
  } else if (name.includes("poster2")) {
    showPanel(
      panelObj,
      "Piece of Art",
      "I draw as a hobby and it is one of my favorite paintings.",
      controls,
    );
  } else if (name.includes("tablecabinet1")) {
    showPanel(
      panelObj,
      "storage",
      "I store all my certificates and degrees here for good measure.",
      controls,
    );
  } else if (name.includes("tablecabinet2")) {
    showPanel(
      panelObj,
      "storage",
      "Here I store all the tools I use for my trade, they come real handy sometimes.",
      controls,
    );
  } else if (name.includes("fileholder2")) {
    showPanel(
      panelObj,
      "Project info section",
      "These cabinets are filled with information about my projects some are public info and some are not. You can look up each cabinet to see what I have worked on.",
      controls,
    );
  } else if (name.includes("fileholder3")) {
    showPanel(
      panelObj,
      "Work Experience",
      "I had a couple of great internships. As a Development Intern at VitaData Startup V-Nest, I worked on improving the Doctor login portal's UI/UX and developed role-based authentication. During my Summer Intern gig at Greaves Travel, I set up scalable cloud storage with MongoDB Atlas, built city autocomplete, and implemented secure role-based login. Before that, I spent time as a Full Stack Developer for the CodeChef Club, where I built the official website using React.js and Tailwind CSS, which boosted the load speed by 30%. I also did a lot of work on the CIMP platform, like designing the UI and updating the backend with Express.js, while collaborating in an Agile team.",
      controls,
    );
  } else if (name.includes("Cabinet9")) {
    showPanel(
      panelObj,
      "Nish-MusicBox",
      "A retro online music player where you can listen to music with unique astethetic different players and audio visualizations. You can even upload your own music to it",
      "https://github.com/tanujsinghchauhan/Nish-musicbox",
      controls,
    );
  } else if (name.includes("Cabinet10")) {
    showPanel(
      panelObj,
      "Club-Integration-and-Management-Platform",
      "Club-Integration-and-Management-Platform is a platform to manage the credits of students associated with CodeChef - VIT Chennai Chapter. Students can raise request for credit related to the work they performed for the club and board members can review the request and award the credits accordingly, this helps in management of FFCS credit system.",
      "https://github.com/tanujsinghchauhan/Club-Integration-and-Management-Platform",
      controls,
    );
  } else if (name.includes("Cabinet11")) {
    showPanel(
      panelObj,
      "ACCESS_DENIED",
      "Sorry the repo is private.",
      controls,
    );
  } else if (name.includes("Cabinet12")) {
    showPanel(panelObj, "ACCESS_DENIED", "I signed an NDA for that.", controls);
  } else if (name.includes("Cabinet8")) {
    showPanel(
      panelObj,
      "ACCESS_DENIED",
      "Trust me you don't want to see this.",
      controls,
    );
  } else if (name.includes("Cabinet7")) {
    showPanel(
      panelObj,
      "Speach-emotion-recognition",
      "A Machine Learning model trained on RAVDEES dataset to identify the emotions in the speech. It can be really helpfull in emergency hotlines and general voice based evidence gathering.",
      "https://github.com/tanujsinghchauhan/speech-emotion-recognition",
      controls,
    );
  } else if (name.includes("Cabinet6")) {
    showPanel(
      panelObj,
      "SecureVault",
      "SecureVault is a cloud-based encryption platform designed to securely store, manage, and retrieve files. It provides AES-256 encryption, SHA-256 integrity checks, and seamless integration with AWS services to ensure data privacy and reliability for individuals and organizations.",
      "https://github.com/tanujsinghchauhan/SecureVault",
      controls,
    );
  } else if (name.includes("Cabinet5")) {
    showPanel(
      panelObj,
      "CRAFTIQUE",
      "An E-commerce platform for artisans and small craftsmens. It is a platform to uplift the community of artisan and craftsmen and give new voice to their passion. You can directly buy the products listed on the store and you can even commission an artist or a craftsman if you want a personalized service.",
      "https://github.com/tanujsinghchauhan/Craftique",
      controls,
    );
  } else if (name.includes("Cabinet4")) {
    showPanel(panelObj, "ACCESS_DENIED", "Don't try to be a Hero.", controls);
  } else if (name.includes("cabinet3")) {
    showPanel(
      panelObj,
      "2D-Game-portfolio",
      "My older 2D arcade style game portfolio where you can walk around and explore the room to see my achievements.",
      "https://github.com/tanujsinghchauhan/Portfolio-2d",
      controls,
    );
  } else if (name.includes("cabinet2")) {
    showPanel(
      panelObj,
      "AI-risk-prediction-system",
      "This project predicts the risk of patient deterioration within the next 90 days using daily patient-level data including vitals, lab results, medication adherence, lifestyle, and demographics. The model leverages gradient-boosted trees (LightGBM) and provides explainable predictions using SHAP values for clinicians. The workflow is modular, allowing replacement of synthetic data with real clinical data for practical deployment.",
      "https://github.com/tanujsinghchauhan/AI-risk-prediction-system",
      controls,
    );
  } else if (name.includes("cabinet1")) {
    showPanel(
      panelObj,
      "PPVC",
      "A peer to peer video call platform. You can chat send files upto 10 MB and even screen share on it while being completely annoynmous.",
      "https://github.com/tanujsinghchauhan/PPVC",
      controls,
    );
  } else if (name.includes("skills")) {
    showPanel(panelObj, "Skills", "Tech stack and tools I use.", controls);
  } else if (name.includes("fileholder")) {
    showPanel(
      panelObj,
      "Instructions: ",
      "You can click on various objects to see what information about them. The objects that are most important are highlighted when hovered over, though there are few that can be clicked but are not highlighted and I want you to find them if you want some great references. If the camera gets all weird for you hit that ESC key as hard as you can and it will back to normal. Also for best view please open this site on a Desktop/Laptop. That's all ~",
      controls,
    );
  }
});

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();
