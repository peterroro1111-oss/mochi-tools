import { Link } from '@/i18n/routing';

export function VideoCompressionToolsZh() {
  return (
    <>
      <p className="text-gray-300 leading-relaxed mb-4">
        你有沒有遇過這種情況？拍了一段精彩的影片想透過 LINE 傳給朋友，結果跳出「檔案太大，無法傳送」的提示；
        或者想把旅遊影片附在 Email 裡寄給家人，結果附件大小超過限制；甚至想上傳到社群媒體，
        卻因為檔案太大而等了半天還上傳失敗。這些都是現代人在分享影片時經常碰到的痛點。
        別擔心，這篇文章將帶你全面了解影片壓縮的原理、各種編碼格式的差異，
        並推薦你最好用的免費影片壓縮工具，讓你輕鬆解決檔案過大的困擾。
      </p>

      <h2 id="why-videos-large" className="text-2xl font-bold text-gray-100 mt-10 mb-4">影片為什麼這麼大？</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        在了解如何壓縮影片之前，我們先來搞懂為什麼影片檔案會這麼大。影片其實是由大量的靜態圖片（稱為「幀」或 Frame）
        快速連續播放所組成的。當這些圖片以每秒 24、30 或 60 幀的速度播放時，人眼就會感覺到連續的動態畫面。
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        影響影片檔案大小的三個關鍵因素：
      </p>
      <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4">
        <li><strong className="text-gray-100">幀率（FPS）</strong>：每秒顯示的畫面數量。30 FPS 代表每秒有 30 張圖片，60 FPS 就是 60 張。幀率越高，影片越流暢，但檔案也越大。</li>
        <li><strong className="text-gray-100">解析度（Resolution）</strong>：每一幀的像素數量。1080p（1920x1080）有超過 200 萬像素，4K（3840x2160）更是超過 800 萬像素。解析度越高，畫面越清晰，檔案自然也越大。</li>
        <li><strong className="text-gray-100">位元率（Bitrate）</strong>：每秒用多少資料來記錄影片。位元率越高，畫質越好，但檔案大小也成正比增長。一段 1080p 30fps 的影片，位元率通常在 8-12 Mbps 左右。</li>
      </ul>
      <p className="text-gray-300 leading-relaxed mb-4">
        舉個例子：一段 1 分鐘的 1080p 30fps 手機影片，原始大小通常在 100-200 MB 之間。
        如果是 4K 60fps 的影片，一分鐘甚至可以超過 500 MB。這就是為什麼你的手機拍幾段影片就滿了的原因。
      </p>

      <h2 id="video-codec-basics" className="text-2xl font-bold text-gray-100 mt-10 mb-4">影片編碼格式（Codec）基礎知識</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        影片編碼器（Video Codec）是影片壓縮的核心技術。它負責分析影片中的每一幀，找出相鄰幀之間的相似之處，
        然後只儲存有變化的部分，大幅減少需要記錄的資料量。不同的編碼格式在壓縮效率、相容性和速度上各有優劣。
        以下是目前最主流的四種影片編碼格式：
      </p>

      <h3 id="codec-h264" className="text-lg font-bold text-gray-200 mt-6 mb-3">H.264（AVC）</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        H.264 是目前最廣泛使用的影片編碼格式，幾乎所有裝置和平台都支援。它在壓縮效率和相容性之間取得了良好的平衡，
        是大多數影片的預設選擇。無論是手機、電腦、電視還是串流平台，H.264 都能順暢播放。
        壓縮比適中，編碼速度快，是最穩定可靠的選擇。
      </p>

      <h3 id="codec-h265" className="text-lg font-bold text-gray-200 mt-6 mb-3">H.265（HEVC）</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        H.265 是 H.264 的後繼者，壓縮效率提升了約 50%，意味著同樣畫質的影片可以用更小的檔案來儲存。
        但由於授權費用的問題，H.265 的支援度不如 H.264 那麼普及。較新的裝置和軟體大多已經支援，
        但一些舊設備可能無法播放。如果你知道接收者的設備支援 HEVC，這是一個很好的選擇。
      </p>

      <h3 id="codec-vp9" className="text-lg font-bold text-gray-200 mt-6 mb-3">VP9</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        VP9 是 Google 開發的開源影片編碼格式，主要用於網頁影片。YouTube 就大量使用 VP9 來串流影片。
        它的壓縮效率與 H.265 相當，但因為是開源的，所以沒有授權費用的問題。
        所有主流瀏覽器都支援 VP9，非常適合網頁端的影片播放。
      </p>

      <h3 id="codec-av1" className="text-lg font-bold text-gray-200 mt-6 mb-3">AV1</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        AV1 是最新的開源影片編碼格式，由 Alliance for Open Media（包含 Google、Apple、Netflix 等大廠）共同開發。
        它的壓縮效率比 H.265 和 VP9 還要好約 30%，是目前壓縮比最高的格式。
        缺點是編碼速度較慢，需要更多的運算資源。隨著硬體支援的普及，AV1 正在逐漸成為主流。
      </p>

      <h3 id="codec-comparison" className="text-lg font-bold text-gray-200 mt-6 mb-3">編碼格式比較表</h3>
      <div className="overflow-x-auto my-6">
        <table className="w-full text-sm text-gray-300">
          <thead className="bg-gray-800/50 text-gray-200">
            <tr>
              <th className="border border-gray-700 px-4 py-2">編碼格式</th>
              <th className="border border-gray-700 px-4 py-2">壓縮比</th>
              <th className="border border-gray-700 px-4 py-2">相容性</th>
              <th className="border border-gray-700 px-4 py-2">編碼速度</th>
              <th className="border border-gray-700 px-4 py-2">畫質表現</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-700 px-4 py-2">H.264（AVC）</td>
              <td className="border border-gray-700 px-4 py-2">中等</td>
              <td className="border border-gray-700 px-4 py-2">極佳（幾乎所有裝置）</td>
              <td className="border border-gray-700 px-4 py-2">快</td>
              <td className="border border-gray-700 px-4 py-2">良好</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">H.265（HEVC）</td>
              <td className="border border-gray-700 px-4 py-2">高（比 H.264 好 50%）</td>
              <td className="border border-gray-700 px-4 py-2">良好（較新裝置）</td>
              <td className="border border-gray-700 px-4 py-2">中等</td>
              <td className="border border-gray-700 px-4 py-2">優秀</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">VP9</td>
              <td className="border border-gray-700 px-4 py-2">高（與 H.265 相當）</td>
              <td className="border border-gray-700 px-4 py-2">良好（所有瀏覽器）</td>
              <td className="border border-gray-700 px-4 py-2">中等</td>
              <td className="border border-gray-700 px-4 py-2">優秀</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">AV1</td>
              <td className="border border-gray-700 px-4 py-2">極高（最佳）</td>
              <td className="border border-gray-700 px-4 py-2">逐漸普及</td>
              <td className="border border-gray-700 px-4 py-2">慢</td>
              <td className="border border-gray-700 px-4 py-2">極優秀</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="browser-vs-server" className="text-2xl font-bold text-gray-100 mt-10 mb-4">瀏覽器端壓縮 vs 伺服器端壓縮</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        市面上的影片壓縮工具大致分為兩種：一種是將影片上傳到伺服器進行壓縮的「伺服器端壓縮」，
        另一種是直接在你的瀏覽器中處理的「瀏覽器端壓縮」。兩者各有特點，以下從四個面向來比較：
      </p>

      <h3 id="privacy-comparison" className="text-lg font-bold text-gray-200 mt-6 mb-3">隱私安全比較</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        伺服器端壓縮需要你將影片上傳到第三方伺服器，這代表你的私人影片可能被儲存、分析甚至外洩。
        對於包含個人、家庭或工作敏感資訊的影片，這是一個不小的風險。
        瀏覽器端壓縮則完全不同 — 你的影片始終留在自己的裝置上，不會傳送到任何地方，100% 保障隱私。
      </p>

      <h3 id="speed-comparison" className="text-lg font-bold text-gray-200 mt-6 mb-3">速度比較</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        伺服器端壓縮需要先上傳影片、等待伺服器處理、再下載結果，整個過程受網路速度影響很大。
        一段 500 MB 的影片，光是上傳可能就要好幾分鐘。瀏覽器端壓縮省去了上傳和下載的時間，
        但壓縮速度取決於你裝置的運算能力。在現代電腦上，瀏覽器端壓縮通常更快。
      </p>

      <h3 id="quality-comparison" className="text-lg font-bold text-gray-200 mt-6 mb-3">畫質比較</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        兩種方式的壓縮畫質差異不大，主要取決於使用的編碼參數而非處理位置。
        好的瀏覽器端工具可以提供與伺服器端相同的壓縮品質。關鍵在於工具本身的壓縮演算法是否優秀。
      </p>

      <h3 id="cost-comparison" className="text-lg font-bold text-gray-200 mt-6 mb-3">費用比較</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        伺服器端壓縮工具因為需要維護伺服器和頻寬，通常會收費或限制免費使用次數。
        瀏覽器端壓縮不需要伺服器資源，因此可以提供完全免費、不限次數的服務。
      </p>

      <div className="overflow-x-auto my-6">
        <table className="w-full text-sm text-gray-300">
          <thead className="bg-gray-800/50 text-gray-200">
            <tr>
              <th className="border border-gray-700 px-4 py-2">比較項目</th>
              <th className="border border-gray-700 px-4 py-2">瀏覽器端壓縮</th>
              <th className="border border-gray-700 px-4 py-2">伺服器端壓縮</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-700 px-4 py-2">隱私安全</td>
              <td className="border border-gray-700 px-4 py-2">極佳（檔案不離開裝置）</td>
              <td className="border border-gray-700 px-4 py-2">有風險（需上傳至伺服器）</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">速度</td>
              <td className="border border-gray-700 px-4 py-2">取決於裝置性能</td>
              <td className="border border-gray-700 px-4 py-2">取決於網路速度 + 伺服器</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">畫質</td>
              <td className="border border-gray-700 px-4 py-2">取決於壓縮演算法</td>
              <td className="border border-gray-700 px-4 py-2">取決於壓縮演算法</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">費用</td>
              <td className="border border-gray-700 px-4 py-2">完全免費</td>
              <td className="border border-gray-700 px-4 py-2">通常有免費限制或需付費</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 my-6">
        <p className="font-bold text-emerald-400 mb-2">💡 提示</p>
        <p className="text-gray-300 leading-relaxed">
          如果你的影片包含任何私人或敏感內容（家庭影片、工作檔案等），強烈建議使用瀏覽器端壓縮工具，確保影片不會外洩。
        </p>
      </div>

      <h2 id="platform-specs" className="text-2xl font-bold text-gray-100 mt-10 mb-4">各平台影片規格與限制</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        不同平台對影片有不同的規格要求和檔案大小限制。了解這些限制可以幫助你在壓縮時選擇最合適的參數，
        避免壓縮不夠或過度壓縮。以下是幾個常見平台的影片規格：
      </p>

      <h3 id="spec-youtube" className="text-lg font-bold text-gray-200 mt-6 mb-3">YouTube</h3>
      <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4">
        <li><strong className="text-gray-100">建議解析度</strong>：1080p（1920x1080）或 4K（3840x2160）</li>
        <li><strong className="text-gray-100">支援格式</strong>：MP4（推薦）、MOV、AVI、WebM 等</li>
        <li><strong className="text-gray-100">建議位元率</strong>：1080p 建議 8 Mbps，4K 建議 35-45 Mbps</li>
        <li><strong className="text-gray-100">最大檔案大小</strong>：256 GB 或 12 小時（以先到的為準）</li>
        <li><strong className="text-gray-100">建議編碼</strong>：H.264 或 VP9</li>
      </ul>

      <h3 id="spec-instagram" className="text-lg font-bold text-gray-200 mt-6 mb-3">Instagram</h3>
      <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4">
        <li><strong className="text-gray-100">Reels</strong>：最長 90 秒，建議 1080x1920（9:16 直式），最大 4 GB</li>
        <li><strong className="text-gray-100">Stories</strong>：每段最長 60 秒，建議 1080x1920（9:16 直式），最大 4 GB</li>
        <li><strong className="text-gray-100">Feed 貼文影片</strong>：最長 60 分鐘，建議 1080x1080（1:1）或 1080x1350（4:5），最大 4 GB</li>
        <li><strong className="text-gray-100">建議格式</strong>：MP4（H.264 編碼）</li>
        <li><strong className="text-gray-100">建議位元率</strong>：3.5 Mbps</li>
      </ul>

      <h3 id="spec-tiktok" className="text-lg font-bold text-gray-200 mt-6 mb-3">TikTok</h3>
      <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4">
        <li><strong className="text-gray-100">建議解析度</strong>：1080x1920（9:16 直式）</li>
        <li><strong className="text-gray-100">最長時間</strong>：10 分鐘</li>
        <li><strong className="text-gray-100">支援格式</strong>：MP4、MOV</li>
        <li><strong className="text-gray-100">最大檔案大小</strong>：iOS 287.6 MB、Android 72 MB、網頁版 10 GB</li>
        <li><strong className="text-gray-100">建議位元率</strong>：516 kbps 以上</li>
      </ul>

      <h3 id="spec-messaging" className="text-lg font-bold text-gray-200 mt-6 mb-3">通訊軟體（LINE / WhatsApp）</h3>
      <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4">
        <li><strong className="text-gray-100">LINE</strong>：影片傳送會自動壓縮，原始檔案建議不超過 5 分鐘。若要保持原始畫質，檔案大小限制約 300 MB</li>
        <li><strong className="text-gray-100">WhatsApp</strong>：單一影片最大 16 MB（部分地區為 64 MB），超過會自動壓縮或無法傳送</li>
      </ul>

      <h3 id="platform-comparison-table" className="text-lg font-bold text-gray-200 mt-6 mb-3">平台規格比較表</h3>
      <div className="overflow-x-auto my-6">
        <table className="w-full text-sm text-gray-300">
          <thead className="bg-gray-800/50 text-gray-200">
            <tr>
              <th className="border border-gray-700 px-4 py-2">平台</th>
              <th className="border border-gray-700 px-4 py-2">建議解析度</th>
              <th className="border border-gray-700 px-4 py-2">格式</th>
              <th className="border border-gray-700 px-4 py-2">最大檔案大小</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-700 px-4 py-2">YouTube</td>
              <td className="border border-gray-700 px-4 py-2">1080p / 4K</td>
              <td className="border border-gray-700 px-4 py-2">MP4（H.264）</td>
              <td className="border border-gray-700 px-4 py-2">256 GB</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">Instagram Reels</td>
              <td className="border border-gray-700 px-4 py-2">1080x1920</td>
              <td className="border border-gray-700 px-4 py-2">MP4（H.264）</td>
              <td className="border border-gray-700 px-4 py-2">4 GB</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">TikTok</td>
              <td className="border border-gray-700 px-4 py-2">1080x1920</td>
              <td className="border border-gray-700 px-4 py-2">MP4 / MOV</td>
              <td className="border border-gray-700 px-4 py-2">287.6 MB（iOS）</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">LINE</td>
              <td className="border border-gray-700 px-4 py-2">無硬性限制</td>
              <td className="border border-gray-700 px-4 py-2">MP4</td>
              <td className="border border-gray-700 px-4 py-2">~300 MB</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">WhatsApp</td>
              <td className="border border-gray-700 px-4 py-2">無硬性限制</td>
              <td className="border border-gray-700 px-4 py-2">MP4</td>
              <td className="border border-gray-700 px-4 py-2">16-64 MB</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 my-6">
        <p className="font-bold text-amber-400 mb-2">⚠️ 注意</p>
        <p className="text-gray-300 leading-relaxed">
          WhatsApp 的檔案大小限制非常嚴格（16 MB），如果你要透過 WhatsApp 分享影片，建議使用「最大壓縮」模式，
          或者先縮短影片長度再進行壓縮。
        </p>
      </div>

      <h2 id="step-by-step-guide" className="text-2xl font-bold text-gray-100 mt-10 mb-4">使用 Mochi Tools 壓縮影片：完整步驟教學</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        <Link href="/video/compress" className="text-pink-400 hover:text-pink-300 font-medium underline decoration-pink-400/30 hover:decoration-pink-300">Mochi Tools 影片壓縮工具</Link>是一個完全免費、在瀏覽器中運行的影片壓縮方案。
        你的影片不會上傳到任何伺服器，隱私完全有保障。以下是詳細的操作步驟：
      </p>

      <h3 id="step-1" className="text-lg font-bold text-gray-200 mt-6 mb-3">步驟一：開啟工具</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        前往 <Link href="/video/compress" className="text-pink-400 hover:text-pink-300 font-medium underline decoration-pink-400/30 hover:decoration-pink-300">Mochi Tools 影片壓縮頁面</Link>。
        無需註冊帳號、無需安裝任何軟體，打開網頁就能直接使用。支援 Chrome、Firefox、Safari、Edge 等所有主流瀏覽器。
      </p>

      <h3 id="step-2" className="text-lg font-bold text-gray-200 mt-6 mb-3">步驟二：選擇影片檔案</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        點擊上傳區域或將影片檔案直接拖曳到頁面中。支援 MP4、WebM、MOV 等常見影片格式。
        iPhone 拍攝的 MOV 檔案也可以直接處理，不需要先轉檔。工具會自動辨識影片的格式、解析度和大小。
      </p>

      <h3 id="step-3" className="text-lg font-bold text-gray-200 mt-6 mb-3">步驟三：選擇壓縮程度</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Mochi Tools 提供三種壓縮程度供你選擇：
      </p>
      <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4">
        <li><strong className="text-gray-100">輕度壓縮</strong>：畫質幾乎不變，檔案大小大約縮小 20-30%。適合要保留高畫質的影片，例如攝影作品、重要活動紀錄。</li>
        <li><strong className="text-gray-100">推薦壓縮</strong>：畫質與大小的最佳平衡，檔案大小大約縮小 50-60%。適合大多數場景，例如分享到社群媒體或傳給朋友。</li>
        <li><strong className="text-gray-100">最大壓縮</strong>：大幅縮小檔案，檔案大小大約縮小 70-80%。適合需要快速分享或檔案大小限制嚴格的場景，例如透過 WhatsApp 傳送。</li>
      </ul>

      <h3 id="step-4" className="text-lg font-bold text-gray-200 mt-6 mb-3">步驟四：壓縮並下載</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        選好壓縮程度後，點擊壓縮按鈕。壓縮過程會在你的瀏覽器中進行，你可以看到進度條顯示目前的處理進度。
        壓縮完成後，工具會顯示壓縮前後的檔案大小比較，讓你一目瞭然省下了多少空間。
        點擊下載按鈕即可將壓縮後的影片儲存到你的裝置上。
      </p>

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 my-6">
        <p className="font-bold text-blue-400 mb-2">ℹ️ 資訊</p>
        <p className="text-gray-300 leading-relaxed">
          壓縮速度取決於你的裝置性能和影片大小。一般來說，一段 5 分鐘的 1080p 影片在現代電腦上大約需要 1-3 分鐘完成壓縮。
          在手機上可能會稍慢一些，建議處理較長或較大的影片時使用電腦。
        </p>
      </div>

      <h2 id="format-conversion" className="text-2xl font-bold text-gray-100 mt-10 mb-4">格式轉換：另一種有效的檔案瘦身方式</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        除了直接壓縮，有時候轉換影片格式也能有效縮小檔案大小。不同格式使用不同的編碼方式，
        某些格式天生就比較小。Mochi Tools 提供完整的影片格式轉換工具：
      </p>

      <h3 id="convert-mov-to-mp4" className="text-lg font-bold text-gray-200 mt-6 mb-3">MOV 轉 MP4</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        iPhone 和 Mac 預設的影片格式是 MOV，但 MP4 的相容性更好且通常檔案更小。
        使用 <Link href="/convert/mov-to-mp4" className="text-pink-400 hover:text-pink-300 font-medium underline decoration-pink-400/30 hover:decoration-pink-300">MOV 轉 MP4 工具</Link> 可以快速將 iPhone 影片轉成通用格式，
        方便在 Android 手機、Windows 電腦等任何裝置上播放。轉換過程同樣在瀏覽器本地完成。
      </p>

      <h3 id="convert-mp4-to-webm" className="text-lg font-bold text-gray-200 mt-6 mb-3">MP4 轉 WebM</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        WebM 是 Google 開發的網頁影片格式，使用 VP9 編碼，在相同畫質下檔案更小。
        如果你的影片主要用於網頁展示，使用 <Link href="/convert/mp4-to-webm" className="text-pink-400 hover:text-pink-300 font-medium underline decoration-pink-400/30 hover:decoration-pink-300">MP4 轉 WebM 工具</Link> 可以顯著縮小檔案大小，
        加速網頁載入。所有主流瀏覽器都支援 WebM 格式。
      </p>

      <h3 id="convert-mp4-to-gif" className="text-lg font-bold text-gray-200 mt-6 mb-3">MP4 轉 GIF</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        有些時候你只是想要一個短短的動態圖片，而不是完整的影片。
        使用 <Link href="/convert/mp4-to-gif" className="text-pink-400 hover:text-pink-300 font-medium underline decoration-pink-400/30 hover:decoration-pink-300">MP4 轉 GIF 工具</Link> 可以將影片中的精彩片段轉成 GIF 動圖，
        非常適合在社群媒體、部落格或通訊軟體中分享。GIF 格式幾乎可以在任何地方顯示。
      </p>

      <h3 id="convert-webm-to-mp4" className="text-lg font-bold text-gray-200 mt-6 mb-3">WebM 轉 MP4</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        如果你收到了一個 WebM 格式的影片但需要在不支援 WebM 的裝置上播放，
        使用 <Link href="/convert/webm-to-mp4" className="text-pink-400 hover:text-pink-300 font-medium underline decoration-pink-400/30 hover:decoration-pink-300">WebM 轉 MP4 工具</Link> 可以快速轉換成最通用的 MP4 格式。
        MP4 格式在幾乎所有裝置和平台上都能無縫播放。
      </p>

      <h2 id="best-practices" className="text-2xl font-bold text-gray-100 mt-10 mb-4">影片壓縮的最佳實踐技巧</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        掌握以下技巧，可以幫助你在壓縮影片時獲得最好的效果：
      </p>

      <h3 id="tip-right-level" className="text-lg font-bold text-gray-200 mt-6 mb-3">1. 根據用途選擇壓縮程度</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        不要盲目追求最小檔案。如果影片是要上傳到 YouTube 或保存為紀念，使用「輕度壓縮」保留最好的畫質。
        如果只是要傳給朋友或發到社群，「推薦壓縮」就夠了。只有在檔案大小限制很嚴格的情況下（如 WhatsApp），
        才需要使用「最大壓縮」。
      </p>

      <h3 id="tip-trim-first" className="text-lg font-bold text-gray-200 mt-6 mb-3">2. 先剪輯再壓縮</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        如果你的影片有不需要的片段（例如開頭和結尾的多餘部分），先把它們剪掉再進行壓縮。
        縮短影片長度是最直接有效的縮小檔案方式。一段 5 分鐘的影片剪到 3 分鐘，檔案大小可以直接減少 40%。
      </p>

      <h3 id="tip-resolution" className="text-lg font-bold text-gray-200 mt-6 mb-3">3. 考慮降低解析度</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        如果影片是要在手機上觀看，4K 解析度其實是多餘的。在手機的小螢幕上，1080p 和 4K 的差異肉眼幾乎看不出來。
        將 4K 影片降為 1080p，檔案大小可以減少 50-75%，而觀看體驗幾乎不受影響。
      </p>

      <h3 id="tip-desktop" className="text-lg font-bold text-gray-200 mt-6 mb-3">4. 優先在電腦上處理</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        影片壓縮需要大量的運算資源。雖然現代手機也能處理，但在電腦上壓縮速度會快很多，而且更穩定。
        特別是處理長時間或 4K 影片時，強烈建議使用電腦。如果在手機上壓縮遇到問題或速度太慢，
        請嘗試用電腦的瀏覽器來處理。
      </p>

      <h3 id="tip-format" className="text-lg font-bold text-gray-200 mt-6 mb-3">5. 選擇合適的輸出格式</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        MP4 是最通用的格式，適合大多數情況。如果影片主要用於網頁，可以考慮轉成 WebM 格式以獲得更小的檔案。
        如果你只需要短短的動態效果，轉成 GIF 可能是更好的選擇。
      </p>

      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 my-6">
        <p className="font-bold text-emerald-400 mb-2">💡 提示</p>
        <p className="text-gray-300 leading-relaxed">
          壓縮影片後，建議先播放一遍確認畫質是否符合你的需求，再進行分享或上傳。
          如果畫質不理想，可以嘗試降低一級壓縮程度重新處理。
        </p>
      </div>

      <h2 id="faq" className="text-2xl font-bold text-gray-100 mt-10 mb-4">常見問題 FAQ</h2>

      <h3 id="faq-1" className="text-lg font-bold text-gray-200 mt-6 mb-3">Q1：影片壓縮後畫質會變差嗎？</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        這取決於你選擇的壓縮程度。使用「輕度壓縮」時，畫質幾乎不會有明顯變化。「推薦壓縮」在一般觀看條件下也很難察覺差異。
        只有在「最大壓縮」模式下，仔細觀察才可能看到一些細節的損失，但對於分享到社群或通訊軟體來說通常是完全可以接受的。
      </p>

      <h3 id="faq-2" className="text-lg font-bold text-gray-200 mt-6 mb-3">Q2：瀏覽器端壓縮安全嗎？我的影片會被上傳嗎？</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        完全安全。Mochi Tools 的影片壓縮完全在你的瀏覽器中運行，使用 WebAssembly 技術在本地進行處理。
        你的影片檔案不會被上傳到任何伺服器，所有資料都留在你的裝置上。你甚至可以在斷網的情況下使用（載入頁面後）。
      </p>

      <h3 id="faq-3" className="text-lg font-bold text-gray-200 mt-6 mb-3">Q3：可以壓縮多大的影片？</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        理論上沒有硬性的檔案大小限制，但由於是在瀏覽器中處理，受到裝置記憶體的影響。
        一般來說，建議單個影片不超過 2 GB。如果你的影片超過這個大小，建議先分段或在電腦上使用以獲得最佳體驗。
      </p>

      <h3 id="faq-4" className="text-lg font-bold text-gray-200 mt-6 mb-3">Q4：支援哪些影片格式？</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        目前支援 MP4、WebM 和 MOV 三種最常見的影片格式。MP4 是最通用的格式，WebM 適合網頁使用，
        MOV 是 iPhone / Mac 的預設格式。這三種格式涵蓋了日常使用中超過 95% 的影片。
      </p>

      <h3 id="faq-5" className="text-lg font-bold text-gray-200 mt-6 mb-3">Q5：壓縮後的影片可以再次壓縮嗎？</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        技術上可以，但不建議這麼做。每次壓縮都會有一定程度的畫質損失（即使是輕度壓縮也是如此）。
        反覆壓縮會讓畫質持續下降。建議從原始影片開始壓縮，一次選擇合適的壓縮程度即可。
      </p>

      <h3 id="faq-6" className="text-lg font-bold text-gray-200 mt-6 mb-3">Q6：壓縮影片需要多長時間？</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        壓縮時間取決於影片的大小、長度和你的裝置性能。大致參考：一段 5 分鐘的 1080p 影片在現代筆記型電腦上大約需要
        1-3 分鐘。較舊的裝置或手機可能需要更長時間。4K 影片和較長的影片自然需要更多時間。
      </p>

      <h3 id="faq-7" className="text-lg font-bold text-gray-200 mt-6 mb-3">Q7：手機可以使用嗎？</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        可以！Mochi Tools 支援所有裝置的瀏覽器，包括手機和平板。不過由於影片壓縮需要較多運算資源，
        在手機上處理大型影片可能會比較慢。如果遇到效能問題，建議改用電腦處理。
      </p>

      <h2 id="conclusion" className="text-2xl font-bold text-gray-100 mt-10 mb-4">總結</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        影片壓縮是現代數位生活中不可或缺的技能。無論你是要透過 LINE 分享家庭影片、上傳作品到 YouTube、
        還是在網頁中嵌入影片，選擇一個安全、高效、免費的壓縮工具都非常重要。
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        Mochi Tools 的影片壓縮工具提供了瀏覽器端處理的最佳體驗 — 完全免費、不限次數、不上傳伺服器、
        三種壓縮程度可選。搭配完整的格式轉換工具（MOV 轉 MP4、MP4 轉 WebM、MP4 轉 GIF、WebM 轉 MP4），
        幾乎可以滿足所有影片處理需求。
      </p>

      <div className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20 rounded-2xl p-6 mt-10">
        <p className="font-bold text-gray-100 text-lg mb-2">立即免費壓縮你的影片！</p>
        <p className="text-gray-300 leading-relaxed mb-3">
          不需要註冊、不需要安裝，打開瀏覽器就能使用。你的影片不會離開你的裝置，100% 隱私安全。
        </p>
        <p className="text-gray-300 leading-relaxed">
          前往 <Link href="/video/compress" className="text-pink-400 hover:text-pink-300 font-medium underline decoration-pink-400/30 hover:decoration-pink-300">Mochi Tools 影片壓縮工具</Link> 開始壓縮，
          或探索更多 <Link href="/video" className="text-pink-400 hover:text-pink-300 font-medium underline decoration-pink-400/30 hover:decoration-pink-300">影片工具</Link> 和{' '}
          <Link href="/convert/mov-to-mp4" className="text-pink-400 hover:text-pink-300 font-medium underline decoration-pink-400/30 hover:decoration-pink-300">格式轉換工具</Link>。
        </p>
      </div>
    </>
  );
}

export function VideoCompressionToolsEn() {
  return (
    <>
      <p className="text-gray-300 leading-relaxed mb-4">
        Have you ever been in a situation where you recorded an amazing video and tried to send it to a friend via LINE,
        only to see the dreaded &quot;file too large&quot; error? Or perhaps you wanted to attach a vacation video to an email
        for your family, but the attachment exceeded the size limit? Maybe you tried uploading to social media, and the upload
        failed or took forever because the file was just too big. These are common pain points for anyone who shares videos
        in the modern digital age. Don&apos;t worry — this comprehensive guide will walk you through the fundamentals of
        video compression, the differences between various codecs, and recommend the best free video compression tools
        so you can effortlessly solve the problem of oversized files.
      </p>

      <h2 id="why-videos-large" className="text-2xl font-bold text-gray-100 mt-10 mb-4">Why Are Videos So Large?</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Before learning how to compress videos, let&apos;s understand why video files are so large in the first place.
        A video is essentially a rapid sequence of still images (called &quot;frames&quot;) played in succession. When these
        images are displayed at 24, 30, or 60 frames per second, your eyes perceive smooth, continuous motion.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        Three key factors determine video file size:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4">
        <li><strong className="text-gray-100">Frame Rate (FPS)</strong>: The number of frames displayed per second. 30 FPS means 30 images every second; 60 FPS means 60. Higher frame rates produce smoother video but larger files.</li>
        <li><strong className="text-gray-100">Resolution</strong>: The number of pixels in each frame. 1080p (1920x1080) has over 2 million pixels; 4K (3840x2160) has over 8 million. Higher resolution means sharper images and naturally larger files.</li>
        <li><strong className="text-gray-100">Bitrate</strong>: The amount of data used to encode each second of video. Higher bitrate means better quality but proportionally larger files. A typical 1080p 30fps video runs at about 8-12 Mbps.</li>
      </ul>
      <p className="text-gray-300 leading-relaxed mb-4">
        For example, a 1-minute 1080p 30fps smartphone video typically weighs in at 100-200 MB.
        A 4K 60fps video can easily exceed 500 MB per minute. That&apos;s why your phone fills up so quickly after shooting just a few videos.
      </p>

      <h2 id="video-codec-basics" className="text-2xl font-bold text-gray-100 mt-10 mb-4">Video Codec Basics</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        A video codec (coder-decoder) is the core technology behind video compression. It analyzes each frame of video,
        identifies similarities between adjacent frames, and then stores only the differences — dramatically reducing
        the amount of data that needs to be recorded. Different codecs have varying strengths in compression efficiency,
        compatibility, and speed. Here are the four most widely used video codecs today:
      </p>

      <h3 id="codec-h264" className="text-lg font-bold text-gray-200 mt-6 mb-3">H.264 (AVC)</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        H.264 is the most widely used video codec in the world, supported by virtually every device and platform.
        It strikes an excellent balance between compression efficiency and compatibility, making it the default choice
        for most videos. Whether you&apos;re watching on a phone, computer, TV, or streaming platform, H.264 plays smoothly everywhere.
        It offers moderate compression with fast encoding speed — the most stable and reliable choice.
      </p>

      <h3 id="codec-h265" className="text-lg font-bold text-gray-200 mt-6 mb-3">H.265 (HEVC)</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        H.265 is the successor to H.264, offering approximately 50% better compression efficiency. This means the same
        video quality can be stored in a much smaller file. However, due to licensing fee complications, H.265 support
        is not as universal as H.264. Most newer devices and software support it, but some older equipment may not be able
        to play HEVC videos. If you know the recipient&apos;s device supports HEVC, it&apos;s an excellent choice.
      </p>

      <h3 id="codec-vp9" className="text-lg font-bold text-gray-200 mt-6 mb-3">VP9</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        VP9 is an open-source video codec developed by Google, primarily used for web video. YouTube extensively uses VP9
        for streaming. Its compression efficiency is comparable to H.265, and because it&apos;s open-source, there are no
        licensing fee concerns. All major browsers support VP9, making it ideal for web-based video playback.
      </p>

      <h3 id="codec-av1" className="text-lg font-bold text-gray-200 mt-6 mb-3">AV1</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        AV1 is the newest open-source video codec, developed collaboratively by the Alliance for Open Media (including Google,
        Apple, Netflix, and other major companies). Its compression efficiency is about 30% better than H.265 and VP9,
        making it the codec with the highest compression ratio available today. The downside is that encoding is slower
        and requires more computational resources. As hardware support becomes more widespread, AV1 is gradually becoming mainstream.
      </p>

      <h3 id="codec-comparison" className="text-lg font-bold text-gray-200 mt-6 mb-3">Codec Comparison Table</h3>
      <div className="overflow-x-auto my-6">
        <table className="w-full text-sm text-gray-300">
          <thead className="bg-gray-800/50 text-gray-200">
            <tr>
              <th className="border border-gray-700 px-4 py-2">Codec</th>
              <th className="border border-gray-700 px-4 py-2">Compression Ratio</th>
              <th className="border border-gray-700 px-4 py-2">Compatibility</th>
              <th className="border border-gray-700 px-4 py-2">Encoding Speed</th>
              <th className="border border-gray-700 px-4 py-2">Quality</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-700 px-4 py-2">H.264 (AVC)</td>
              <td className="border border-gray-700 px-4 py-2">Moderate</td>
              <td className="border border-gray-700 px-4 py-2">Excellent (nearly all devices)</td>
              <td className="border border-gray-700 px-4 py-2">Fast</td>
              <td className="border border-gray-700 px-4 py-2">Good</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">H.265 (HEVC)</td>
              <td className="border border-gray-700 px-4 py-2">High (50% better than H.264)</td>
              <td className="border border-gray-700 px-4 py-2">Good (newer devices)</td>
              <td className="border border-gray-700 px-4 py-2">Moderate</td>
              <td className="border border-gray-700 px-4 py-2">Excellent</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">VP9</td>
              <td className="border border-gray-700 px-4 py-2">High (comparable to H.265)</td>
              <td className="border border-gray-700 px-4 py-2">Good (all browsers)</td>
              <td className="border border-gray-700 px-4 py-2">Moderate</td>
              <td className="border border-gray-700 px-4 py-2">Excellent</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">AV1</td>
              <td className="border border-gray-700 px-4 py-2">Very High (best)</td>
              <td className="border border-gray-700 px-4 py-2">Growing adoption</td>
              <td className="border border-gray-700 px-4 py-2">Slow</td>
              <td className="border border-gray-700 px-4 py-2">Outstanding</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="browser-vs-server" className="text-2xl font-bold text-gray-100 mt-10 mb-4">Browser-Based vs Server-Based Compression</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Video compression tools on the market fall into two broad categories: &quot;server-based compression&quot; that uploads
        your video to a remote server for processing, and &quot;browser-based compression&quot; that processes everything directly
        in your browser. Each approach has its own characteristics. Let&apos;s compare them across four dimensions:
      </p>

      <h3 id="privacy-comparison" className="text-lg font-bold text-gray-200 mt-6 mb-3">Privacy Comparison</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Server-based compression requires uploading your video to a third-party server, meaning your personal videos
        could potentially be stored, analyzed, or even leaked. For videos containing personal, family, or work-sensitive
        content, this poses a significant risk. Browser-based compression is fundamentally different — your video stays
        on your device at all times and is never transmitted anywhere, ensuring 100% privacy.
      </p>

      <h3 id="speed-comparison" className="text-lg font-bold text-gray-200 mt-6 mb-3">Speed Comparison</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Server-based compression requires uploading the video, waiting for server processing, and then downloading the result.
        The entire process is heavily influenced by network speed. A 500 MB video might take several minutes just to upload.
        Browser-based compression eliminates upload and download time, though compression speed depends on your device&apos;s
        computing power. On modern computers, browser-based compression is typically faster overall.
      </p>

      <h3 id="quality-comparison" className="text-lg font-bold text-gray-200 mt-6 mb-3">Quality Comparison</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        The quality difference between the two approaches is minimal — it primarily depends on the encoding parameters used,
        not where the processing happens. A well-built browser-based tool can deliver compression quality equal to server-based
        solutions. The key factor is the quality of the compression algorithm itself.
      </p>

      <h3 id="cost-comparison" className="text-lg font-bold text-gray-200 mt-6 mb-3">Cost Comparison</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Server-based tools need to maintain servers and bandwidth, which usually means they charge fees or limit free usage.
        Browser-based compression requires no server resources, so it can offer a completely free service with unlimited usage.
      </p>

      <div className="overflow-x-auto my-6">
        <table className="w-full text-sm text-gray-300">
          <thead className="bg-gray-800/50 text-gray-200">
            <tr>
              <th className="border border-gray-700 px-4 py-2">Comparison</th>
              <th className="border border-gray-700 px-4 py-2">Browser-Based</th>
              <th className="border border-gray-700 px-4 py-2">Server-Based</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-700 px-4 py-2">Privacy</td>
              <td className="border border-gray-700 px-4 py-2">Excellent (files never leave device)</td>
              <td className="border border-gray-700 px-4 py-2">Risky (uploaded to server)</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">Speed</td>
              <td className="border border-gray-700 px-4 py-2">Depends on device performance</td>
              <td className="border border-gray-700 px-4 py-2">Depends on network + server</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">Quality</td>
              <td className="border border-gray-700 px-4 py-2">Depends on algorithm</td>
              <td className="border border-gray-700 px-4 py-2">Depends on algorithm</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">Cost</td>
              <td className="border border-gray-700 px-4 py-2">Completely free</td>
              <td className="border border-gray-700 px-4 py-2">Often limited or paid</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 my-6">
        <p className="font-bold text-emerald-400 mb-2">💡 Tip</p>
        <p className="text-gray-300 leading-relaxed">
          If your video contains any private or sensitive content (family videos, work files, etc.), we strongly recommend
          using a browser-based compression tool to ensure your videos are never exposed.
        </p>
      </div>

      <h2 id="platform-specs" className="text-2xl font-bold text-gray-100 mt-10 mb-4">Platform-Specific Video Specs &amp; Limits</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Different platforms have different video specifications and file size limits. Understanding these limitations helps you
        choose the right compression parameters, avoiding both under-compression and over-compression. Here are the specs
        for several popular platforms:
      </p>

      <h3 id="spec-youtube" className="text-lg font-bold text-gray-200 mt-6 mb-3">YouTube</h3>
      <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4">
        <li><strong className="text-gray-100">Recommended Resolution</strong>: 1080p (1920x1080) or 4K (3840x2160)</li>
        <li><strong className="text-gray-100">Supported Formats</strong>: MP4 (recommended), MOV, AVI, WebM, etc.</li>
        <li><strong className="text-gray-100">Recommended Bitrate</strong>: 8 Mbps for 1080p, 35-45 Mbps for 4K</li>
        <li><strong className="text-gray-100">Maximum File Size</strong>: 256 GB or 12 hours (whichever comes first)</li>
        <li><strong className="text-gray-100">Recommended Codec</strong>: H.264 or VP9</li>
      </ul>

      <h3 id="spec-instagram" className="text-lg font-bold text-gray-200 mt-6 mb-3">Instagram</h3>
      <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4">
        <li><strong className="text-gray-100">Reels</strong>: Up to 90 seconds, recommended 1080x1920 (9:16 portrait), max 4 GB</li>
        <li><strong className="text-gray-100">Stories</strong>: Up to 60 seconds per segment, recommended 1080x1920 (9:16 portrait), max 4 GB</li>
        <li><strong className="text-gray-100">Feed Post Videos</strong>: Up to 60 minutes, recommended 1080x1080 (1:1) or 1080x1350 (4:5), max 4 GB</li>
        <li><strong className="text-gray-100">Recommended Format</strong>: MP4 (H.264 codec)</li>
        <li><strong className="text-gray-100">Recommended Bitrate</strong>: 3.5 Mbps</li>
      </ul>

      <h3 id="spec-tiktok" className="text-lg font-bold text-gray-200 mt-6 mb-3">TikTok</h3>
      <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4">
        <li><strong className="text-gray-100">Recommended Resolution</strong>: 1080x1920 (9:16 portrait)</li>
        <li><strong className="text-gray-100">Maximum Duration</strong>: 10 minutes</li>
        <li><strong className="text-gray-100">Supported Formats</strong>: MP4, MOV</li>
        <li><strong className="text-gray-100">Maximum File Size</strong>: iOS 287.6 MB, Android 72 MB, Web 10 GB</li>
        <li><strong className="text-gray-100">Recommended Bitrate</strong>: 516 kbps minimum</li>
      </ul>

      <h3 id="spec-messaging" className="text-lg font-bold text-gray-200 mt-6 mb-3">Messaging Apps (LINE / WhatsApp)</h3>
      <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4">
        <li><strong className="text-gray-100">LINE</strong>: Videos are automatically compressed when sent; original files recommended under 5 minutes. To maintain original quality, file size limit is approximately 300 MB</li>
        <li><strong className="text-gray-100">WhatsApp</strong>: Maximum 16 MB per video (64 MB in some regions); files exceeding the limit are auto-compressed or cannot be sent</li>
      </ul>

      <h3 id="platform-comparison-table" className="text-lg font-bold text-gray-200 mt-6 mb-3">Platform Specs Comparison Table</h3>
      <div className="overflow-x-auto my-6">
        <table className="w-full text-sm text-gray-300">
          <thead className="bg-gray-800/50 text-gray-200">
            <tr>
              <th className="border border-gray-700 px-4 py-2">Platform</th>
              <th className="border border-gray-700 px-4 py-2">Recommended Resolution</th>
              <th className="border border-gray-700 px-4 py-2">Format</th>
              <th className="border border-gray-700 px-4 py-2">Max File Size</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-700 px-4 py-2">YouTube</td>
              <td className="border border-gray-700 px-4 py-2">1080p / 4K</td>
              <td className="border border-gray-700 px-4 py-2">MP4 (H.264)</td>
              <td className="border border-gray-700 px-4 py-2">256 GB</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">Instagram Reels</td>
              <td className="border border-gray-700 px-4 py-2">1080x1920</td>
              <td className="border border-gray-700 px-4 py-2">MP4 (H.264)</td>
              <td className="border border-gray-700 px-4 py-2">4 GB</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">TikTok</td>
              <td className="border border-gray-700 px-4 py-2">1080x1920</td>
              <td className="border border-gray-700 px-4 py-2">MP4 / MOV</td>
              <td className="border border-gray-700 px-4 py-2">287.6 MB (iOS)</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">LINE</td>
              <td className="border border-gray-700 px-4 py-2">No hard limit</td>
              <td className="border border-gray-700 px-4 py-2">MP4</td>
              <td className="border border-gray-700 px-4 py-2">~300 MB</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">WhatsApp</td>
              <td className="border border-gray-700 px-4 py-2">No hard limit</td>
              <td className="border border-gray-700 px-4 py-2">MP4</td>
              <td className="border border-gray-700 px-4 py-2">16-64 MB</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 my-6">
        <p className="font-bold text-amber-400 mb-2">⚠️ Warning</p>
        <p className="text-gray-300 leading-relaxed">
          WhatsApp has a very strict file size limit (16 MB). If you need to share a video via WhatsApp, use the &quot;Maximum
          Compression&quot; mode, or trim the video length before compressing.
        </p>
      </div>

      <h2 id="step-by-step-guide" className="text-2xl font-bold text-gray-100 mt-10 mb-4">Step-by-Step Guide: Compress Videos with Mochi Tools</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        <Link href="/video/compress" className="text-pink-400 hover:text-pink-300 font-medium underline decoration-pink-400/30 hover:decoration-pink-300">Mochi Tools Video Compression</Link> is a completely free, browser-based video compression solution.
        Your videos are never uploaded to any server, ensuring complete privacy. Here are the detailed steps:
      </p>

      <h3 id="step-1" className="text-lg font-bold text-gray-200 mt-6 mb-3">Step 1: Open the Tool</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Navigate to the <Link href="/video/compress" className="text-pink-400 hover:text-pink-300 font-medium underline decoration-pink-400/30 hover:decoration-pink-300">Mochi Tools Video Compression page</Link>.
        No account registration or software installation required — just open the webpage and start using it immediately.
        Supports all major browsers including Chrome, Firefox, Safari, and Edge.
      </p>

      <h3 id="step-2" className="text-lg font-bold text-gray-200 mt-6 mb-3">Step 2: Select Your Video File</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Click the upload area or drag and drop your video file directly onto the page. Supports MP4, WebM, MOV, and other
        common video formats. iPhone MOV files can be processed directly without prior conversion. The tool automatically
        detects your video&apos;s format, resolution, and file size.
      </p>

      <h3 id="step-3" className="text-lg font-bold text-gray-200 mt-6 mb-3">Step 3: Choose Compression Level</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Mochi Tools offers three compression levels for you to choose from:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4">
        <li><strong className="text-gray-100">Light Compression</strong>: Nearly lossless quality with about 20-30% file size reduction. Ideal for preserving high-quality footage such as portfolio work or important event recordings.</li>
        <li><strong className="text-gray-100">Recommended Compression</strong>: The best balance of quality and file size, reducing files by about 50-60%. Suitable for most scenarios like sharing on social media or sending to friends.</li>
        <li><strong className="text-gray-100">Maximum Compression</strong>: Dramatically smaller files with about 70-80% reduction. Ideal for quick sharing or platforms with strict size limits, such as sending via WhatsApp.</li>
      </ul>

      <h3 id="step-4" className="text-lg font-bold text-gray-200 mt-6 mb-3">Step 4: Compress and Download</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        After selecting your compression level, click the compress button. The compression process runs entirely in your
        browser, and you can monitor progress via the progress bar. Once complete, the tool displays a before-and-after
        file size comparison so you can see exactly how much space you saved. Click the download button to save the compressed
        video to your device.
      </p>

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 my-6">
        <p className="font-bold text-blue-400 mb-2">ℹ️ Info</p>
        <p className="text-gray-300 leading-relaxed">
          Compression speed depends on your device&apos;s performance and the video size. Generally, a 5-minute 1080p video takes
          about 1-3 minutes on a modern computer. It may take slightly longer on mobile devices, so using a desktop computer
          is recommended for longer or larger videos.
        </p>
      </div>

      <h2 id="format-conversion" className="text-2xl font-bold text-gray-100 mt-10 mb-4">Format Conversion: Another Effective Way to Reduce File Size</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Besides direct compression, converting video formats can also effectively reduce file size. Different formats
        use different encoding methods, and some formats are inherently smaller than others. Mochi Tools provides
        a complete suite of video format conversion tools:
      </p>

      <h3 id="convert-mov-to-mp4" className="text-lg font-bold text-gray-200 mt-6 mb-3">MOV to MP4</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        iPhones and Macs default to the MOV video format, but MP4 offers better compatibility and typically smaller file sizes.
        Use the <Link href="/convert/mov-to-mp4" className="text-pink-400 hover:text-pink-300 font-medium underline decoration-pink-400/30 hover:decoration-pink-300">MOV to MP4 converter</Link> to quickly convert iPhone videos
        to a universal format that plays seamlessly on Android phones, Windows PCs, and any other device. The conversion
        process is also handled entirely in your browser.
      </p>

      <h3 id="convert-mp4-to-webm" className="text-lg font-bold text-gray-200 mt-6 mb-3">MP4 to WebM</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        WebM is Google&apos;s web video format using VP9 encoding, which produces smaller files at the same quality level.
        If your video is primarily for web display, use the <Link href="/convert/mp4-to-webm" className="text-pink-400 hover:text-pink-300 font-medium underline decoration-pink-400/30 hover:decoration-pink-300">MP4 to WebM converter</Link> to
        significantly reduce file size and speed up webpage loading. All major browsers support the WebM format.
      </p>

      <h3 id="convert-mp4-to-gif" className="text-lg font-bold text-gray-200 mt-6 mb-3">MP4 to GIF</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Sometimes all you need is a short animated image rather than a full video.
        Use the <Link href="/convert/mp4-to-gif" className="text-pink-400 hover:text-pink-300 font-medium underline decoration-pink-400/30 hover:decoration-pink-300">MP4 to GIF converter</Link> to turn the best moments
        of your video into animated GIFs, perfect for sharing on social media, blogs, or messaging apps. GIF format
        can be displayed virtually anywhere.
      </p>

      <h3 id="convert-webm-to-mp4" className="text-lg font-bold text-gray-200 mt-6 mb-3">WebM to MP4</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        If you received a WebM video but need to play it on a device that doesn&apos;t support WebM,
        use the <Link href="/convert/webm-to-mp4" className="text-pink-400 hover:text-pink-300 font-medium underline decoration-pink-400/30 hover:decoration-pink-300">WebM to MP4 converter</Link> to quickly convert it
        to the most universal video format. MP4 plays seamlessly on virtually every device and platform.
      </p>

      <h2 id="best-practices" className="text-2xl font-bold text-gray-100 mt-10 mb-4">Best Practices for Video Compression</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Master these tips to get the best results when compressing your videos:
      </p>

      <h3 id="tip-right-level" className="text-lg font-bold text-gray-200 mt-6 mb-3">1. Choose Compression Level Based on Purpose</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Don&apos;t blindly pursue the smallest file. If the video is for YouTube upload or long-term preservation,
        use &quot;Light Compression&quot; to retain the best quality. For sharing with friends or posting on social media,
        &quot;Recommended Compression&quot; is sufficient. Only use &quot;Maximum Compression&quot; when facing strict file size
        limits (like WhatsApp).
      </p>

      <h3 id="tip-trim-first" className="text-lg font-bold text-gray-200 mt-6 mb-3">2. Trim Before Compressing</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        If your video has unnecessary segments (like extra footage at the beginning or end), trim them before compressing.
        Shortening the video length is the most direct and effective way to reduce file size. A 5-minute video trimmed
        to 3 minutes can reduce file size by 40% right away.
      </p>

      <h3 id="tip-resolution" className="text-lg font-bold text-gray-200 mt-6 mb-3">3. Consider Lowering the Resolution</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        If the video will be watched on a phone, 4K resolution is overkill. On a phone&apos;s small screen, the difference
        between 1080p and 4K is barely noticeable to the human eye. Downscaling a 4K video to 1080p can reduce file size
        by 50-75% with virtually no impact on viewing experience.
      </p>

      <h3 id="tip-desktop" className="text-lg font-bold text-gray-200 mt-6 mb-3">4. Prefer Desktop Processing</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Video compression requires significant computing resources. While modern smartphones can handle it, compression
        is much faster and more stable on a desktop or laptop. This is especially true for long-duration or 4K videos.
        If compression on your phone is slow or problematic, try processing through your computer&apos;s browser instead.
      </p>

      <h3 id="tip-format" className="text-lg font-bold text-gray-200 mt-6 mb-3">5. Choose the Right Output Format</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        MP4 is the most universal format and suitable for most situations. If your video is primarily for web use,
        consider converting to WebM for even smaller files. If you only need a short animated clip,
        converting to GIF might be the better choice.
      </p>

      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 my-6">
        <p className="font-bold text-emerald-400 mb-2">💡 Tip</p>
        <p className="text-gray-300 leading-relaxed">
          After compressing a video, play it through once to verify the quality meets your needs before sharing or uploading.
          If the quality isn&apos;t satisfactory, try one compression level lower and reprocess.
        </p>
      </div>

      <h2 id="faq" className="text-2xl font-bold text-gray-100 mt-10 mb-4">Frequently Asked Questions</h2>

      <h3 id="faq-1" className="text-lg font-bold text-gray-200 mt-6 mb-3">Q1: Will video quality degrade after compression?</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        It depends on the compression level you choose. With &quot;Light Compression,&quot; quality change is nearly imperceptible.
        &quot;Recommended Compression&quot; is also difficult to distinguish under normal viewing conditions. Only with
        &quot;Maximum Compression&quot; might you notice some loss of detail upon close inspection, but for sharing on social media
        or messaging apps, it&apos;s typically perfectly acceptable.
      </p>

      <h3 id="faq-2" className="text-lg font-bold text-gray-200 mt-6 mb-3">Q2: Is browser-based compression safe? Will my video be uploaded?</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Completely safe. Mochi Tools video compression runs entirely in your browser using WebAssembly technology
        for local processing. Your video files are never uploaded to any server — all data stays on your device.
        You can even use it offline (after the page has loaded).
      </p>

      <h3 id="faq-3" className="text-lg font-bold text-gray-200 mt-6 mb-3">Q3: How large a video can I compress?</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        There&apos;s no hard file size limit in theory, but since processing happens in the browser, it&apos;s affected by your
        device&apos;s available memory. Generally, we recommend keeping individual videos under 2 GB. For larger files,
        consider splitting them first or using a desktop computer for the best experience.
      </p>

      <h3 id="faq-4" className="text-lg font-bold text-gray-200 mt-6 mb-3">Q4: Which video formats are supported?</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Currently supported formats include MP4, WebM, and MOV — the three most common video formats. MP4 is the most
        universal format, WebM is ideal for web use, and MOV is the default format for iPhone / Mac.
        These three formats cover over 95% of videos in everyday use.
      </p>

      <h3 id="faq-5" className="text-lg font-bold text-gray-200 mt-6 mb-3">Q5: Can I compress an already-compressed video again?</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Technically yes, but it&apos;s not recommended. Each compression pass introduces some degree of quality loss (even
        with light compression). Repeated compression will cause quality to degrade progressively. We recommend starting
        from the original video and choosing the appropriate compression level in a single pass.
      </p>

      <h3 id="faq-6" className="text-lg font-bold text-gray-200 mt-6 mb-3">Q6: How long does video compression take?</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Compression time depends on the video&apos;s size, length, and your device&apos;s performance. As a rough guide:
        a 5-minute 1080p video takes about 1-3 minutes on a modern laptop. Older devices or phones may take longer.
        4K videos and longer clips naturally require more time.
      </p>

      <h3 id="faq-7" className="text-lg font-bold text-gray-200 mt-6 mb-3">Q7: Can I use this on my phone?</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Yes! Mochi Tools supports browsers on all devices, including phones and tablets. However, since video compression
        requires significant computing resources, processing large videos on a phone may be slower. If you encounter
        performance issues, we recommend switching to a desktop computer.
      </p>

      <h2 id="conclusion" className="text-2xl font-bold text-gray-100 mt-10 mb-4">Conclusion</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Video compression is an essential skill in modern digital life. Whether you&apos;re sharing family videos via LINE,
        uploading content to YouTube, or embedding videos on a website, choosing a secure, efficient, and free
        compression tool is critically important.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        Mochi Tools video compression delivers the best browser-based experience — completely free, unlimited usage,
        no server uploads, and three compression levels to choose from. Combined with a full suite of format conversion
        tools (MOV to MP4, MP4 to WebM, MP4 to GIF, WebM to MP4), it can handle virtually any video processing need.
      </p>

      <div className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20 rounded-2xl p-6 mt-10">
        <p className="font-bold text-gray-100 text-lg mb-2">Compress your videos for free right now!</p>
        <p className="text-gray-300 leading-relaxed mb-3">
          No registration, no installation — just open your browser and start. Your videos never leave your device, ensuring 100% privacy.
        </p>
        <p className="text-gray-300 leading-relaxed">
          Visit <Link href="/video/compress" className="text-pink-400 hover:text-pink-300 font-medium underline decoration-pink-400/30 hover:decoration-pink-300">Mochi Tools Video Compression</Link> to start compressing,
          or explore more <Link href="/video" className="text-pink-400 hover:text-pink-300 font-medium underline decoration-pink-400/30 hover:decoration-pink-300">Video Tools</Link> and{' '}
          <Link href="/convert/mov-to-mp4" className="text-pink-400 hover:text-pink-300 font-medium underline decoration-pink-400/30 hover:decoration-pink-300">Format Conversion Tools</Link>.
        </p>
      </div>
    </>
  );
}
