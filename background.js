browser.browserAction.onClicked.addListener(async (tab) => {
  console.log("Extension clicked. Current tab URL:", tab.url);

  if (tab.url && tab.url.startsWith("https://www.nicovideo.jp/watch/")) {
    // ビデオIDを抽出
    const videoId = tab.url.match(/watch\/(sm\d+)/)?.[1];
    if (videoId) {
      console.log("Video ID found:", videoId);

      // リクエストURL
      const extUrl = `https://ext.nicovideo.jp/?${videoId}`;
      console.log("Sending request to:", extUrl);

      try {
        // バックグラウンドでリクエストを送信
        const response = await fetch(extUrl);
        if (response.ok) {
          console.log("Request succeeded. Status:", response.status);

          // 必要に応じてレスポンスを処理
          const text = await response.text();
          console.log("Response content:", text);

          // レスポンスを元に何らかの処理を実行 (例: ファイルのダウンロード)
        } else {
          console.error("Request failed. Status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching URL:", error);
      }
    } else {
      console.error("Could not extract video ID from URL.");
    }
  } else {
    console.warn("This extension only works on Niconico video watch pages.");
  }
});
