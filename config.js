/*
 * ================================================================
 * 你只需要修改这个文件，不需要改 index.html、app.js 或 styles.css。
 * 图片放在 assets/images/，音频放在 assets/audio/。
 * 然后把下面对应的文件名改成你实际使用的文件名。
 * ================================================================
 */

window.BIBLE_AUDIO_CONFIG = {
  site: {
    title: "罕语经韵",
    book: "创世记",
    category: "中文有声圣经",
    heroTitle: "让话语在\n安静中被听见",
    heroDescription: "从起初的创造开始，聆听信仰、选择与生命的故事。",
    verse: "“起初，神创造天地。”",
    verseSource: "创世记 1:1"
  },

  /* 修改这里的 5 个图片文件名 */
  images: {
    hero: "assets/images/1.png",
    galleryReading: "assets/images/2.png",
    galleryListening: "assets/images/3.png",
    galleryMeditation: "assets/images/4.png",
    chapterCover: "assets/images/5.png"
  },

  /* 图片还没放进去时，网站会显示以下临时网络图片。 */
  fallbackImages: {
    hero: "https://images.unsplash.com/photo-1480561807109-e2aa33f23be8?auto=format&fit=crop&w=2200&q=90",
    galleryReading: "https://images.unsplash.com/photo-1500950930960-3da3abfbd354?auto=format&fit=crop&w=1000&q=86",
    galleryListening: "https://images.unsplash.com/photo-1632230997264-b2bfc65cb8b4?auto=format&fit=crop&w=1000&q=86",
    galleryMeditation: "https://images.unsplash.com/photo-1495175448924-1d9a30c90a42?auto=format&fit=crop&w=1400&q=86",
    chapterCover: "https://images.unsplash.com/photo-1480561807109-e2aa33f23be8?auto=format&fit=crop&w=600&q=84"
  },

  /* 修改每一章的名称、说明和音频文件名 */
  chapters: [
    { number: "01", title: "第1章 · 神的创造", description: "天地、光与生命的起初", audio: "assets/audio/创世记-第1章 神的创造(2).mp3" },
    { number: "02", title: "第2章 · 伊甸园", description: "人与伊甸园的故事", audio: "assets/audio/创世记-第2章 伊甸园(2).mp3" },
    { number: "03", title: "第3章 · 人违背命令", description: "试探、选择与离开", audio: "assets/audio/创世记-第3章 人违背命令.mp3" },
    { number: "04", title: "第4章 · 该隐和亚伯", description: "兄弟、嫉妒与警醒", audio: "assets/audio/创世记-第4章 该隐和亚伯.mp3" },
    { number: "05", title: "第5章 · 亚当的后代", description: "从亚当到挪亚的世代", audio: "assets/audio/创世记-第5章 亚当的后代(2).mp3" }
  ]
};
