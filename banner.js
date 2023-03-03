const canvasContainer = document.getElementById("canvas-container");
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
  const img = new Image();
  img.src = frame.imageUrl;
  img.onload = () => {
    // create a new canvas to use as a temporary buffer
    const buffer = document.createElement("canvas");
    buffer.width = canvas.width;
    buffer.height = canvas.height;
    const bufferCtx = buffer.getContext("2d");
    bufferCtx.drawImage(img, 0, 0, buffer.width, buffer.height);

    // Create a new image element from the buffer canvas
    const bufferImg = new Image();
    bufferImg.src = buffer.toDataURL();
    bufferImg.style.opacity = 0;
    bufferImg.style.position = "absolute";
    bufferImg.style.top = "0";
    bufferImg.style.left = "0";
    canvasContainer.appendChild(bufferImg);

    // Fade in the image using a CSS animation
    const fadeInDuration = 1000;
    bufferImg.style.opacity = 0;
    bufferImg.style.transition = `opacity ${
      fadeInDuration / 1000
    }s ease-in-out`;
    canvasContainer.appendChild(bufferImg);
    requestAnimationFrame(() => {
      bufferImg.style.opacity = 1;
    });

    // Wait for the duration of the frame
    setTimeout(() => {
      // Fade out image using a CSS animation
      const fadeOutDuration = 1000;
      bufferImg.style.opacity = 0;
      bufferImg.style.transition = `opacity ${
        fadeOutDuration / 1000
      }s ease-in-out`;
      requestAnimationFrame(() => {
        bufferImg.style.opacity = 0;
        setTimeout(() => {
          canvasContainer.removeChild(bufferImg);
        }, fadeOutDuration);
      });
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
        clearInterval(intervalID);
        frameIndex = 0;
        return;
      }
      drawFrame(frames[frameIndex]);
    }
  }, 100);
}

window.addEventListener("load", () => {
  playAnimation();
});
