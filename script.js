document.addEventListener("DOMContentLoaded", () => {
  const palettes = document.querySelectorAll(".palette");

  // Utility: random color in hex
  const randomHex = () =>
    "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");

  // Utility: adjust color brightness (for washed-out effect)
  const lighten = (hex, factor = 0.5) => {
    let r = parseInt(hex.substr(1, 2), 16);
    let g = parseInt(hex.substr(3, 2), 16);
    let b = parseInt(hex.substr(5, 2), 16);

    r = Math.min(255, r + (255 - r) * factor);
    g = Math.min(255, g + (255 - g) * factor);
    b = Math.min(255, b + (255 - b) * factor);

    return `rgb(${Math.round(r)},${Math.round(g)},${Math.round(b)})`;
  };

  // Palette generators
  const generators = {
    "vibrant colors": () => {
      return Array.from({ length: 4 }, randomHex);
    },
    "retro colors": () => {
      const retroSet = ["#FF6F61", "#6B5B95", "#88B04B", "#FFA500", "#009688"];
      return Array.from({ length: 4 }, () => retroSet[Math.floor(Math.random() * retroSet.length)]);
    },
    "washed out colors": () => {
      return Array.from({ length: 4 }, () => lighten(randomHex(), 0.7));
    },
    "color gradients": () => {
      const start = randomHex();
      const end = randomHex();
      return [
        `linear-gradient(45deg, ${start}, ${end})`,
        `linear-gradient(90deg, ${start}, ${end})`,
        `linear-gradient(135deg, ${start}, ${end})`,
        `linear-gradient(180deg, ${start}, ${end})`,
      ];
    },
  };

  // Handle button clicks
  document.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const type = btn.textContent.trim().toLowerCase();
      const colors = generators[type]();

      palettes.forEach((box, i) => {
        if (colors[i].includes("gradient")) {
          box.style.background = colors[i];
        } else {
          box.style.backgroundColor = colors[i];
          box.style.background = colors[i];
        }
        box.textContent = colors[i]; // show the code/gradient
      });
    });
  });
});

