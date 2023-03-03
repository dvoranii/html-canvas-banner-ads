const canvasContainer = document.getElementById("#canvas-container");
const canvas = document.querySelector("canvas");
canvas.width = 300;
canvas.height = 250;
const ctx = canvas.getContext("2d");

const frames = [
  { color: "red", duration: 5000, imageUrl: "./images/img1.png" },
  { color: "green", duration: 5000, imageUrl: "./images/img2.png" },
  { color: "blue", duration: 5000, imageUrl: "./images/img3.png" },
];

function drawFrame(frame) {
  //   ctx.fillStyle = frame.color;
  //   ctx.fillRect(0, 0, canvas.width, canvas.height);

  const img = new Image();
  img.src = frame.imageUrl;
  img.onload = () => {
    // fade in the image
    let opacity = 0;
    const fadeInInterval = setInterval(() => {
      opacity += 0.1;
      if (opacity >= 1) {
        opacity = 1;
        clearInterval(fadeInInterval);
      }
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      ctx.restore();
    }, 100);

    // Wait for the duration of the frame
    setTimeout(() => {
      // Fade out image
      let opacity = 1;
      const fadeOutInterval = setInterval(() => {
        opacity -= 0.1;
        if (opacity <= 0) {
          opacity = 0;
          clearInterval(fadeOutInterval);
        }
        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        ctx.restore();
      }, 100);
    }, frame.duration - 1000);
  };
}

function playAnimation() {
  let frameIndex = 0;
  let timeElapsed = 0;
  drawFrame(frames[frameIndex]);
  const intervalID = setInterval(() => {
    timeElapsed += 100;
    if (timeElapsed >= frames[frameIndex].duration) {
      timeElapsed = 0;
      frameIndex++;

      if (frameIndex >= frames.length) {
        frameIndex = 0;
      }
      drawFrame(frames[frameIndex]);
    }
  }, 100);
}

window.addEventListener("load", () => {
  playAnimation();
});
