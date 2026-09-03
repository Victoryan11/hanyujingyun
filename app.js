const config = window.BIBLE_AUDIO_CONFIG;

if (!config) {
  throw new Error("找不到 config.js，请确认它和 index.html 放在同一个文件夹中。");
}

const chapters = config.chapters;
const audio = document.querySelector("#audio");
const chapterList = document.querySelector("#chapterList");
const player = document.querySelector("#player");
const playerToggle = document.querySelector("#playerToggle");
const playerTitle = document.querySelector("#playerTitle");
const playerStatus = document.querySelector("#playerStatus");
const timeline = document.querySelector("#timeline");
const currentTime = document.querySelector("#currentTime");
const duration = document.querySelector("#duration");
const closePlayer = document.querySelector("#closePlayer");
const toast = document.querySelector("#toast");
let activeIndex = -1;
let toastTimer;

function setImage(element, localPath, fallbackPath) {
  let fallbackUsed = false;
  element.addEventListener("error", () => {
    if (!fallbackUsed && fallbackPath) {
      fallbackUsed = true;
      element.src = fallbackPath;
    }
  });
  element.src = localPath;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>\"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#039;"
  })[character]);
}

function applySiteContent() {
  document.title = `${config.site.title} · ${config.site.book}`;
  document.querySelector(".brand span:last-child").textContent = config.site.title;
  document.querySelector("footer span:first-child").textContent = config.site.title;
  document.querySelector("#heroEyebrow").textContent = `${config.site.category} · ${config.site.book}`;
  document.querySelector("#page-title").innerHTML = config.site.heroTitle
    .split("\n")
    .map(escapeHtml)
    .join("<br />");
  document.querySelector("#heroDescription").textContent = config.site.heroDescription;
  document.querySelector("#verseText").textContent = config.site.verse;
  document.querySelector("#verseSource").textContent = config.site.verseSource;

  setImage(document.querySelector("#heroImage"), config.images.hero, config.fallbackImages.hero);
  setImage(document.querySelector("#galleryReading"), config.images.galleryReading, config.fallbackImages.galleryReading);
  setImage(document.querySelector("#galleryListening"), config.images.galleryListening, config.fallbackImages.galleryListening);
  setImage(document.querySelector("#galleryMeditation"), config.images.galleryMeditation, config.fallbackImages.galleryMeditation);
  setImage(document.querySelector("#playerCover"), config.images.chapterCover, config.fallbackImages.chapterCover);
}

applySiteContent();

chapterList.innerHTML = chapters.map((chapter, index) => `
  <article class="chapter" data-index="${index}">
    <span class="chapter-number">${escapeHtml(chapter.number)}</span>
    <button class="cover-button" type="button" data-play="${index}" aria-label="播放${escapeHtml(chapter.title)}">
      <img data-cover-index="${index}" alt="${escapeHtml(chapter.title)}封面" />
      <span class="play-icon" aria-hidden="true">▶</span>
    </button>
    <div class="chapter-copy">
      <h3>${escapeHtml(chapter.title)}</h3>
      <p>${escapeHtml(chapter.description)}</p>
    </div>
    <button class="listen-button" type="button" data-play="${index}">播放章节</button>
  </article>
`).join("");

document.querySelectorAll("[data-cover-index]").forEach((image) => {
  setImage(image, config.images.chapterCover, config.fallbackImages.chapterCover);
});

function formatTime(value) {
  if (!Number.isFinite(value)) return "0:00";
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3800);
}

function syncUi() {
  const playing = !audio.paused;
  playerToggle.textContent = playing ? "Ⅱ" : "▶";
  playerToggle.setAttribute("aria-label", playing ? "暂停" : "播放");
  document.querySelectorAll(".chapter").forEach((row, index) => {
    const isActive = index === activeIndex;
    row.classList.toggle("is-active", isActive);
    row.querySelector(".play-icon").textContent = isActive && playing ? "Ⅱ" : "▶";
    row.querySelector(".listen-button").textContent = isActive && playing ? "暂停" : "播放章节";
  });
}

async function playChapter(index) {
  if (activeIndex === index) {
    if (audio.paused) {
      try {
        await audio.play();
      } catch (_) {
        showToast("找不到音频文件，请检查 config.js 里的音频文件名。");
      }
    } else {
      audio.pause();
    }
    syncUi();
    return;
  }

  activeIndex = index;
  const chapter = chapters[index];
  audio.src = chapter.audio;
  playerTitle.textContent = chapter.title;
  playerStatus.textContent = `正在载入 · ${config.site.book}`;
  player.classList.add("is-visible");
  player.setAttribute("aria-hidden", "false");
  syncUi();

  try {
    await audio.play();
    playerStatus.textContent = `正在播放 · ${config.site.book}`;
  } catch (_) {
    playerStatus.textContent = "等待音频文件";
    showToast("找不到音频文件，请检查文件位置和 config.js 里的名称。");
  }
  syncUi();
}

chapterList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-play]");
  if (button) playChapter(Number(button.dataset.play));
});

playerToggle.addEventListener("click", () => {
  if (activeIndex >= 0) playChapter(activeIndex);
});

closePlayer.addEventListener("click", () => {
  audio.pause();
  player.classList.remove("is-visible");
  player.setAttribute("aria-hidden", "true");
  syncUi();
});

audio.addEventListener("play", () => {
  playerStatus.textContent = `正在播放 · ${config.site.book}`;
  syncUi();
});
audio.addEventListener("pause", syncUi);
audio.addEventListener("loadedmetadata", () => {
  duration.textContent = formatTime(audio.duration);
});
audio.addEventListener("timeupdate", () => {
  currentTime.textContent = formatTime(audio.currentTime);
  timeline.value = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
});
audio.addEventListener("ended", () => {
  if (activeIndex < chapters.length - 1) playChapter(activeIndex + 1);
  else syncUi();
});
audio.addEventListener("error", () => {
  if (activeIndex >= 0) {
    playerStatus.textContent = "等待音频文件";
    showToast("找不到这一章的 MP3，请检查 config.js 里的文件名。");
  }
  syncUi();
});

timeline.addEventListener("input", () => {
  if (audio.duration) audio.currentTime = (Number(timeline.value) / 100) * audio.duration;
});
