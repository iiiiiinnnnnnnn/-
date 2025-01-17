browser.browserAction.onClicked.addListener(async (tab) => {
  console.log("Extension clicked. Current tab URL:", tab.url);

  if (tab.url && tab.url.startsWith("https://www.nicovideo.jp/watch/")) {
    // ビデオIDを抽出
    const videoId = tab.url.match(/watch\/(sm\d+)/)?.[1];
    if (videoId) {
      console.log("Video ID found:", videoId);

      // ext.nicovideo.jp にアクセスするURLを作成
      const extUrl = `https://ext.nicovideo.jp/?${videoId}`;

      // 新しいタブを開く
      const newTab = await browser.tabs.create({ url: extUrl });
      console.log("New tab created with URL:", extUrl);

      // スクリプトを挿入
      try {
        await browser.tabs.executeScript(newTab.id, { file: "content.js" });
        console.log("Content script injected successfully.");
      } catch (error) {
        console.error("Error injecting content script:", error);
      }
    } else {
      console.error("Could not extract video ID from URL.");
    }
  } else {
    console.warn("This extension only works on Niconico video watch pages.");
  }
});
