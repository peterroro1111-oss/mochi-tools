import { Link } from '@/i18n/routing';

export function VideoCompressionToolsZh() {
  return (
    <>
      <p>
        拍了一段影片想傳給朋友，結果檔案太大傳不出去？LINE、Telegram、Email 都有檔案大小限制，
        但你不想上傳到不知名的網站去壓縮。這篇文章推薦你幾個可以直接在瀏覽器處理的免費影片壓縮工具。
      </p>

      <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">影片為什麼這麼大？</h2>
      <p>
        一段 1 分鐘的手機影片（1080p）通常在 100-200 MB 左右。4K 影片更是動輒數 GB。
        這是因為影片是由大量的圖片幀組成，每秒 30-60 幀，每幀都包含完整的畫面資訊。
      </p>
      <p>
        影片壓縮的原理是透過編碼器（Codec）分析相鄰幀之間的差異，只儲存變化的部分，
        大幅減少需要儲存的資料量。
      </p>

      <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">為什麼選擇瀏覽器端壓縮？</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li><strong>隱私安全</strong> — 影片不會上傳到任何伺服器，個人影片不怕外洩</li>
        <li><strong>不用安裝軟體</strong> — 不需要下載 HandBrake、FFmpeg 等專業軟體</li>
        <li><strong>跨平台</strong> — 任何有瀏覽器的裝置都能用</li>
        <li><strong>免費</strong> — 不需要付費，不限使用次數</li>
      </ul>

      <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">推薦：Mochi Tools 影片壓縮</h2>
      <p>
        <Link href="/video/compress" className="text-pink-500 hover:text-pink-600 font-medium">Mochi Tools 的影片壓縮工具</Link>是目前最好用的瀏覽器端影片壓縮方案之一：
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-2">支援多種格式</h3>
      <p>支援 MP4、WebM、MOV 格式，涵蓋了最常見的影片格式。iPhone 拍的 MOV 也能直接處理。</p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-2">三段壓縮程度</h3>
      <ul className="list-disc pl-6 space-y-2">
        <li><strong>輕度壓縮</strong> — 畫質幾乎不變，適合保留高畫質的影片</li>
        <li><strong>推薦壓縮</strong> — 畫質與大小的最佳平衡，適合大多數情況</li>
        <li><strong>最大壓縮</strong> — 大幅縮小檔案，適合需要快速分享的場景</li>
      </ul>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-2">完全本地處理</h3>
      <p>
        所有壓縮都在你的瀏覽器中完成，影片檔案不會上傳到任何伺服器。
        這代表你的私人影片 100% 安全。
      </p>

      <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">影片壓縮小技巧</h2>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-2">1. 選擇適當的壓縮程度</h3>
      <p>
        如果影片只是要分享到社群或傳給朋友，使用「推薦」壓縮程度就夠了。
        如果需要保留最高畫質（例如作品集），使用「輕度」壓縮。
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-2">2. 考慮轉換格式</h3>
      <p>有時候轉換格式也能有效減小檔案大小：</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>MOV 轉 MP4 → <Link href="/convert/mov-to-mp4" className="text-pink-500 hover:text-pink-600 font-medium">MOV 轉 MP4 工具</Link>（iPhone 影片轉通用格式）</li>
        <li>MP4 轉 WebM → <Link href="/convert/mp4-to-webm" className="text-pink-500 hover:text-pink-600 font-medium">MP4 轉 WebM 工具</Link>（網頁使用更小）</li>
        <li>影片轉 GIF → <Link href="/convert/mp4-to-gif" className="text-pink-500 hover:text-pink-600 font-medium">MP4 轉 GIF 工具</Link>（短片轉動圖）</li>
      </ul>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-2">3. 在電腦上處理</h3>
      <p>
        影片壓縮需要較多的運算資源。雖然手機也能用，但在電腦上處理會更快更穩定。
        如果在手機上遇到問題，試試用電腦處理。
      </p>

      <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">其他實用的影片工具</h2>
      <p>
        除了影片壓縮，Mochi Tools 還提供完整的<Link href="/video" className="text-pink-500 hover:text-pink-600 font-medium">影片工具</Link>系列：
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li><Link href="/convert/mp4-to-webm" className="text-pink-500 hover:text-pink-600 font-medium">MP4 轉 WebM</Link></li>
        <li><Link href="/convert/webm-to-mp4" className="text-pink-500 hover:text-pink-600 font-medium">WebM 轉 MP4</Link></li>
        <li><Link href="/convert/mp4-to-gif" className="text-pink-500 hover:text-pink-600 font-medium">MP4 轉 GIF</Link></li>
        <li><Link href="/convert/mov-to-mp4" className="text-pink-500 hover:text-pink-600 font-medium">MOV 轉 MP4</Link></li>
      </ul>

      <div className="bg-pink-50 border-2 border-pink-200 rounded-2xl p-5 mt-8">
        <p className="font-bold text-gray-800 mb-2">立即壓縮你的影片！</p>
        <p className="text-sm text-gray-600">
          前往 <Link href="/video/compress" className="text-pink-500 hover:text-pink-600 font-medium">影片壓縮工具</Link>，
          選擇影片即可開始壓縮。完全免費、不上傳伺服器。
        </p>
      </div>
    </>
  );
}

export function VideoCompressionToolsEn() {
  return (
    <>
      <p>
        Recorded a video to share with friends but the file is too large? LINE, Telegram, and Email all have file size limits,
        but you don&apos;t want to upload your personal videos to unknown websites. This article recommends free video compression
        tools that work directly in your browser.
      </p>

      <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">Why Are Videos So Large?</h2>
      <p>
        A 1-minute phone video (1080p) is typically 100-200 MB. 4K videos can be several GB.
        This is because videos consist of many image frames — 30-60 frames per second, each containing full image data.
      </p>
      <p>
        Video compression works by analyzing differences between adjacent frames and only storing the changes,
        dramatically reducing the amount of data that needs to be stored.
      </p>

      <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">Why Browser-Based Compression?</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li><strong>Privacy</strong> — Videos never upload to any server; personal videos stay private</li>
        <li><strong>No software needed</strong> — No need to download HandBrake, FFmpeg, or other professional tools</li>
        <li><strong>Cross-platform</strong> — Works on any device with a browser</li>
        <li><strong>Free</strong> — No payment, no usage limits</li>
      </ul>

      <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">Recommended: Mochi Tools Video Compression</h2>
      <p>
        <Link href="/video/compress" className="text-pink-500 hover:text-pink-600 font-medium">Mochi Tools Video Compression</Link> is
        one of the best browser-based video compression solutions available:
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-2">Multiple Format Support</h3>
      <p>Supports MP4, WebM, and MOV — covering the most common video formats. iPhone MOV files can be processed directly.</p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-2">Three Compression Levels</h3>
      <ul className="list-disc pl-6 space-y-2">
        <li><strong>Light</strong> — Nearly lossless quality, ideal for preserving high-quality footage</li>
        <li><strong>Recommended</strong> — Best balance of quality and size, suitable for most situations</li>
        <li><strong>Maximum</strong> — Dramatically smaller files, great for quick sharing</li>
      </ul>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-2">Fully Local Processing</h3>
      <p>
        All compression happens in your browser. Video files never upload to any server,
        meaning your private videos are 100% secure.
      </p>

      <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">Video Compression Tips</h2>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-2">1. Choose the Right Compression Level</h3>
      <p>
        For sharing on social media or with friends, the &quot;Recommended&quot; level is usually sufficient.
        For preserving maximum quality (e.g., portfolio work), use &quot;Light&quot; compression.
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-2">2. Consider Format Conversion</h3>
      <p>Sometimes converting formats can also effectively reduce file size:</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>MOV to MP4 → <Link href="/convert/mov-to-mp4" className="text-pink-500 hover:text-pink-600 font-medium">MOV to MP4 tool</Link> (iPhone videos to universal format)</li>
        <li>MP4 to WebM → <Link href="/convert/mp4-to-webm" className="text-pink-500 hover:text-pink-600 font-medium">MP4 to WebM tool</Link> (smaller for web use)</li>
        <li>Video to GIF → <Link href="/convert/mp4-to-gif" className="text-pink-500 hover:text-pink-600 font-medium">MP4 to GIF tool</Link> (short clips to animated images)</li>
      </ul>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-2">3. Process on Desktop</h3>
      <p>
        Video compression requires significant computing resources. While mobile devices can handle it,
        desktop processing is faster and more stable. If you encounter issues on mobile, try using a desktop computer.
      </p>

      <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">Other Useful Video Tools</h2>
      <p>
        Beyond video compression, Mochi Tools offers a complete <Link href="/video" className="text-pink-500 hover:text-pink-600 font-medium">Video Tools</Link> suite:
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li><Link href="/convert/mp4-to-webm" className="text-pink-500 hover:text-pink-600 font-medium">MP4 to WebM</Link></li>
        <li><Link href="/convert/webm-to-mp4" className="text-pink-500 hover:text-pink-600 font-medium">WebM to MP4</Link></li>
        <li><Link href="/convert/mp4-to-gif" className="text-pink-500 hover:text-pink-600 font-medium">MP4 to GIF</Link></li>
        <li><Link href="/convert/mov-to-mp4" className="text-pink-500 hover:text-pink-600 font-medium">MOV to MP4</Link></li>
      </ul>

      <div className="bg-pink-50 border-2 border-pink-200 rounded-2xl p-5 mt-8">
        <p className="font-bold text-gray-800 mb-2">Compress your video now!</p>
        <p className="text-sm text-gray-600">
          Visit <Link href="/video/compress" className="text-pink-500 hover:text-pink-600 font-medium">Video Compression tool</Link> and
          select your video to start compressing. Completely free, no server uploads.
        </p>
      </div>
    </>
  );
}
