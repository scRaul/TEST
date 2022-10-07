const aspectRatio = 9 / 16;
const barMax = 10;
const clearColor = new Color(255, 255, 255);
var appInput = null;
var screen = null;
var game = null;
var currentGame = 1; //0) ShareAndTake Station    1) certificateGame
var certificateImg = "Images/certificate.png";

//global objects 
var spritePool = {

};
var audioFile = {
  correct: null,
  wrong: null,
  bg: null
};
window.onload = window['loadAssets'];
function loadAssets() {
  audioFile.correct = new Audio('Audio/Right.mp3');
  audioFile.wrong = new Audio('Audio/Wrong.mp3');
  audioFile.bg = new Audio('Audio/BackgroundMusic.mp3');

  var filePromises = [];
  filePromises.push(audioFile.correct);
  filePromises.push(audioFile.wrong);
  filePromises.push(audioFile.bg);
  Promise.all(filePromises).then(setUpAndInit());
}
function setUpAndInit() {
  var width = window.innerWidth - 100;
  var height = width * aspectRatio;
  const increments = 50;//increments from -x to x
  screen = new Screen("canvas", width, height, increments);
  appInput = new Input(screen);
  game = getNextGame();
  loop();
}
// ----------------- GAME LOOP ---------------------
const fps = 24;
const delay = 1000 / fps;
async function loop() {
  let start = new Date().getTime();
  screen.clearColor(clearColor)
  handleInput();
  render();
  await sleep(start + delay - new Date().getTime());
  if (!game.isGameOver())
    loop()
  else {
    currentGame++;
    game = getNextGame();
    loop();
  }
}

//----------------------HELPER FUNCTIONS --------------------
var vertColor = new Color(0, 0, 255);
function render() {

  screen.render();

  if (game != null) {
    game.staticList.forEach(sp => {
      screen.drawSprite(sp);
    });
    game.itemList.forEach(sp => {
      screen.drawSprite(sp);
    });
  }
}
function handleInput() {
  if (appInput == null) return;
  if (appInput.mouseDown && appInput.objSelected == null) {
    checkCollisions();
  }
}
function checkCollisions() {
  if (appInput == null) return;
  var items = game.itemList;
  for (let i = 0; i < items.length; i++) {
    if (items[i].collided(appInput.mousePosition)) {
      if (items[i].tag == TAG.BUTTON) {
        appInput.mouseDown = false;//behave like a button
        game.buttonPressed(items[i]);
      } else {
        appInput.setObj(items[i]);
      }
      return;
    }
  }
}
// takes sound as parameter and plays it
// added volume made correct sound quiet and wrong sound loud for testing purposes
// can stop sound after seconds if value passed in is negative sound is not stopped
// can change playback speed of sound; ex. 0.1 is 10% speed 2.0 is 2x as fast
function playSound(s, volume, duration, speed = 1) {
  if (duration < 0) { return; }
  s.currentTime = 0;
  s.volume = volume;
  s.playbackRate = speed;
  s.play();
  setTimeout(() => {
    stopSound(s);
  }, duration * 1000)
}
//param s should be an Audio object 
function stopSound(s) {
  s.pause();
  s.currentTime = 0;
}
//resize contents 
function adjustContent() {
  if (screen == null) return;
  var width = window.innerWidth - 100;
  var height = width * aspectRatio;
  screen.adjustScreen(width, height);
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
window.addEventListener("resize", adjustContent);

function getNextGame() {
  if (currentGame == 0) return new ShareAndTake()
  if (currentGame = 1) return new CertGame();
  return null;
}
function printCertificate() {
    let page = "Images/apple.png";
    if(page != undefined){
        console.log(page);
        setTimeout(() => {
        window.open(page,'_blank');
        },100);
    }
}
