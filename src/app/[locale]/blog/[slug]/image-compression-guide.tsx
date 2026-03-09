import { Link } from '@/i18n/routing';

export function ImageCompressionGuideZh() {
  return (
    <>
      <p className="text-gray-300 leading-relaxed mb-4">
        在這個數位化的時代，圖片無處不在。無論你是經營網站的開發者、在社群媒體上分享生活的使用者、
        還是需要透過 Email 傳送文件的上班族，圖片檔案大小都直接影響你的使用體驗。一張未經處理的手機照片
        可能高達 5-10 MB，而一個網頁上可能有數十張這樣的圖片。如果不加以壓縮，網頁載入速度會變得極慢，
        儲存空間會迅速耗盡，檔案傳輸也會變得困難重重。
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        這篇完全指南將深入淺出地解釋圖片壓縮的原理，比較各種圖片格式的優缺點，
        並教你如何使用免費的線上工具，在不損失畫質的前提下大幅縮小圖片檔案大小。
        無論你是初學者還是有經驗的使用者，都能從這篇文章中學到實用的技巧。
      </p>

      {/* Section 1: Why compression matters */}
      <h2 id="why-compress" className="text-2xl font-bold text-gray-100 mt-10 mb-4">為什麼圖片壓縮很重要？</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        圖片壓縮不只是「把檔案變小」這麼簡單，它對網站效能、使用者體驗、搜尋引擎排名都有深遠的影響。
        以下是你應該重視圖片壓縮的四大理由：
      </p>

      <h3 id="web-performance" className="text-lg font-bold text-gray-200 mt-6 mb-3">提升網頁效能</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        根據 HTTP Archive 的統計，圖片平均佔網頁總大小的 50% 以上。這意味著如果你能有效壓縮圖片，
        就能將整個網頁的載入時間縮短一半。研究顯示，網頁載入每延遲一秒，跳出率就會增加 32%。
        對於電商網站來說，載入速度每慢一秒，轉換率可能下降 7%。這些數據清楚地表明，
        圖片壓縮直接影響你的業績和使用者體驗。
      </p>

      <h3 id="sharing" className="text-lg font-bold text-gray-200 mt-6 mb-3">方便分享與傳輸</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        許多通訊軟體和 Email 服務都有檔案大小限制。LINE 的圖片傳送限制約 300 MB，
        但會自動壓縮畫質；Gmail 附件限制為 25 MB；Slack 免費版則限制 5 MB。
        如果你需要傳送大量圖片，提前壓縮不僅能加速上傳，還能確保圖片品質由你自己掌控，
        而不是被通訊軟體的演算法隨意壓縮。
      </p>

      <h3 id="storage" className="text-lg font-bold text-gray-200 mt-6 mb-3">節省儲存空間</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        無論是雲端空間（Google Drive、iCloud、Dropbox）還是本地硬碟，
        儲存空間都是有成本的。一台手機每天拍攝 20 張照片，一年下來就有 7300 張，
        以平均每張 5 MB 計算，就需要 36.5 GB 的空間。如果經過合理壓縮（品質損失肉眼幾乎看不出），
        可以輕鬆節省 60-80% 的空間，大幅延長裝置的使用壽命。
      </p>

      <h3 id="seo" className="text-lg font-bold text-gray-200 mt-6 mb-3">提升 SEO 排名</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Google 在 2021 年推出的 Core Web Vitals 將頁面載入效能列為搜尋排名的重要指標。
        其中 LCP（Largest Contentful Paint，最大內容繪製）指標直接與頁面上最大的圖片載入速度有關。
        如果你的網站圖片過大，LCP 分數就會偏低，進而影響在 Google 搜尋結果中的排名。
        壓縮圖片是改善 LCP 分數最直接有效的方法之一。
      </p>

      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 my-6">
        <p className="font-bold text-emerald-400 mb-2">💡 提示</p>
        <p className="text-gray-300">
          Google PageSpeed Insights 是一個免費工具，可以分析你的網站效能並指出需要壓縮的圖片。
          建議定期使用此工具檢查你的網站。
        </p>
      </div>

      {/* Section 2: Compression principles */}
      <h2 id="compression-principles" className="text-2xl font-bold text-gray-100 mt-10 mb-4">圖片壓縮的原理</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        要有效地壓縮圖片，首先需要了解壓縮的基本原理。圖片壓縮主要分為兩大類：
        有損壓縮（Lossy Compression）和無損壓縮（Lossless Compression）。
        了解它們的差異是選擇正確壓縮策略的關鍵。
      </p>

      <h3 id="lossy-compression" className="text-lg font-bold text-gray-200 mt-6 mb-3">有損壓縮（Lossy Compression）</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        有損壓縮的核心概念是「捨棄人眼不容易察覺的細節」。它透過分析圖片中的色彩資訊，
        移除那些人類視覺系統不敏感的資料。例如，在一片天空的照片中，相鄰像素之間的顏色差異可能非常微小，
        有損壓縮會將這些幾乎相同的顏色合併為一個顏色值，從而大幅減少需要儲存的資料量。
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        有損壓縮的壓縮率通常很高，可以將檔案大小縮小到原來的 10-30%。但需要注意的是，
        每次儲存都會再損失一些細節，所以不建議對同一張圖片反覆進行有損壓縮。
        JPG 和 WebP（有損模式）都使用這種壓縮方式。
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        舉個具體的例子：一張 4000x3000 像素的風景照片，原始 BMP 格式約 36 MB。
        轉換為 JPG 格式後，品質設為 85%，檔案大小可能只有 2-3 MB，縮小了超過 90%。
        而且在螢幕上觀看時，你幾乎無法分辨壓縮前後的差異。
      </p>

      <h3 id="lossless-compression" className="text-lg font-bold text-gray-200 mt-6 mb-3">無損壓縮（Lossless Compression）</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        無損壓縮則不會丟棄任何資訊。它透過找出資料中的重複模式，用更高效的方式來表示這些資料。
        想像一下，如果圖片中有一排 100 個相同顏色的像素，無損壓縮不會儲存 100 個相同的值，
        而是記錄「這個顏色重複 100 次」，這就是所謂的遊程編碼（Run-Length Encoding）。
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        無損壓縮的優點是圖片品質完全不會下降，解壓後與原始圖片完全一致。
        但缺點是壓縮率相對較低，通常只能縮小 20-50%。
        PNG 和 WebP（無損模式）使用這種壓縮方式。適合需要精確保留每個像素的場景，
        例如技術截圖、線條圖、文字圖片等。
      </p>

      <h3 id="human-eye" className="text-lg font-bold text-gray-200 mt-6 mb-3">人眼感知與壓縮的關係</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        有損壓縮能夠有效運作，關鍵在於人類視覺系統的特性。人眼對亮度（明暗）的變化比對色彩（色相、飽和度）
        的變化更敏感。這就是為什麼 JPG 壓縮會優先保留亮度資訊，而對色彩資訊進行更大幅度的壓縮，
        這個過程稱為色度抽樣（Chroma Subsampling）。
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        此外，人眼對高頻細節（如銳利的邊緣、細小的紋理）也有一定的感知閾值。
        當細節低於這個閾值時，我們就無法察覺它的存在或消失。有損壓縮正是利用了這個特性，
        透過離散餘弦變換（DCT）等數學工具，將圖片分解為不同頻率的分量，
        然後捨棄那些人眼不太能感知的高頻分量，從而達到壓縮的效果。
      </p>

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 my-6">
        <p className="font-bold text-blue-400 mb-2">ℹ️ 資訊</p>
        <p className="text-gray-300">
          人眼大約能分辨 1000 萬種不同的顏色，但對於相鄰顏色之間的微小差異，
          我們的辨別能力非常有限。這就是為什麼 JPG 壓縮在品質 75-85% 時，
          大多數人無法看出與原圖的差異。
        </p>
      </div>

      {/* Section 3: Format comparison */}
      <h2 id="format-comparison" className="text-2xl font-bold text-gray-100 mt-10 mb-4">圖片格式詳細比較</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        選擇正確的圖片格式是優化檔案大小的第一步。以下是各種常見格式的詳細比較，
        幫助你根據不同的使用場景做出最佳選擇。
      </p>

      <h3 id="jpeg-format" className="text-lg font-bold text-gray-200 mt-6 mb-3">JPEG / JPG</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        JPEG（Joint Photographic Experts Group）是目前最廣泛使用的圖片格式，
        幾乎所有裝置和軟體都支援。它使用有損壓縮，特別擅長處理色彩豐富、漸層平滑的照片。
      </p>
      <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4">
        <li><strong className="text-gray-100">適用場景：</strong>風景照片、人像攝影、產品圖片、社群媒體貼文</li>
        <li><strong className="text-gray-100">優點：</strong>壓縮率高、相容性最好、檔案小</li>
        <li><strong className="text-gray-100">缺點：</strong>不支援透明背景、有損壓縮會逐漸降低品質、不適合線條圖或文字</li>
        <li><strong className="text-gray-100">建議品質：</strong>網頁用 75-85%，列印用 90-95%</li>
      </ul>

      <h3 id="png-format" className="text-lg font-bold text-gray-200 mt-6 mb-3">PNG</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        PNG（Portable Network Graphics）使用無損壓縮，能完美保留圖片的每一個細節。
        它最大的特色是支援透明背景（Alpha 通道），這使得它成為網頁設計中不可或缺的格式。
      </p>
      <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4">
        <li><strong className="text-gray-100">適用場景：</strong>Logo、圖示、截圖、需要透明背景的圖片、技術圖表</li>
        <li><strong className="text-gray-100">優點：</strong>無損品質、支援透明、適合銳利邊緣和文字</li>
        <li><strong className="text-gray-100">缺點：</strong>檔案通常比 JPG 大很多、不適合大尺寸照片</li>
        <li><strong className="text-gray-100">優化方式：</strong>移除不必要的 metadata、降低色彩深度（24-bit 降為 8-bit）</li>
      </ul>

      <h3 id="webp-format" className="text-lg font-bold text-gray-200 mt-6 mb-3">WebP</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        WebP 是 Google 於 2010 年推出的現代圖片格式，結合了 JPG 和 PNG 的優點。
        它同時支援有損和無損壓縮，也支援透明背景和動畫。在相同畫質下，
        WebP 比 JPG 小 25-34%，比 PNG 小 26%。
      </p>
      <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4">
        <li><strong className="text-gray-100">適用場景：</strong>網站圖片（所有類型）、網頁應用程式、追求最小檔案大小</li>
        <li><strong className="text-gray-100">優點：</strong>同時支援有損和無損、支援透明、檔案最小、支援動畫</li>
        <li><strong className="text-gray-100">缺點：</strong>部分較舊的圖片編輯軟體不支援、不適合印刷</li>
        <li><strong className="text-gray-100">瀏覽器支援：</strong>Chrome、Firefox、Safari、Edge 等所有主流瀏覽器均支援</li>
      </ul>

      <h3 id="avif-format" className="text-lg font-bold text-gray-200 mt-6 mb-3">AVIF</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        AVIF（AV1 Image File Format）是基於 AV1 影片編碼標準的新一代圖片格式，
        由開放媒體聯盟（Alliance for Open Media）開發。它的壓縮效率比 WebP 更高，
        在相同畫質下，檔案大小比 WebP 還小 20-30%。
      </p>
      <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4">
        <li><strong className="text-gray-100">適用場景：</strong>追求極致壓縮的網站、頻寬敏感的應用</li>
        <li><strong className="text-gray-100">優點：</strong>壓縮率最高、支援 HDR、支援透明、色彩表現優秀</li>
        <li><strong className="text-gray-100">缺點：</strong>編碼速度較慢、部分瀏覽器支援不完全、生態系統尚在發展</li>
        <li><strong className="text-gray-100">瀏覽器支援：</strong>Chrome 85+、Firefox 93+、Safari 16.4+（支援逐漸擴大中）</li>
      </ul>

      {/* Format comparison table */}
      <div className="overflow-x-auto my-6">
        <table className="w-full text-sm text-gray-300">
          <thead className="bg-gray-800/50 text-gray-200">
            <tr>
              <th className="border border-gray-700 px-4 py-2">特性</th>
              <th className="border border-gray-700 px-4 py-2">JPEG</th>
              <th className="border border-gray-700 px-4 py-2">PNG</th>
              <th className="border border-gray-700 px-4 py-2">WebP</th>
              <th className="border border-gray-700 px-4 py-2">AVIF</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-700 px-4 py-2">壓縮方式</td>
              <td className="border border-gray-700 px-4 py-2">有損</td>
              <td className="border border-gray-700 px-4 py-2">無損</td>
              <td className="border border-gray-700 px-4 py-2">有損 / 無損</td>
              <td className="border border-gray-700 px-4 py-2">有損 / 無損</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">透明背景</td>
              <td className="border border-gray-700 px-4 py-2">不支援</td>
              <td className="border border-gray-700 px-4 py-2">支援</td>
              <td className="border border-gray-700 px-4 py-2">支援</td>
              <td className="border border-gray-700 px-4 py-2">支援</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">動畫</td>
              <td className="border border-gray-700 px-4 py-2">不支援</td>
              <td className="border border-gray-700 px-4 py-2">APNG 支援</td>
              <td className="border border-gray-700 px-4 py-2">支援</td>
              <td className="border border-gray-700 px-4 py-2">支援</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">壓縮率</td>
              <td className="border border-gray-700 px-4 py-2">高</td>
              <td className="border border-gray-700 px-4 py-2">中</td>
              <td className="border border-gray-700 px-4 py-2">很高</td>
              <td className="border border-gray-700 px-4 py-2">最高</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">瀏覽器支援</td>
              <td className="border border-gray-700 px-4 py-2">全部</td>
              <td className="border border-gray-700 px-4 py-2">全部</td>
              <td className="border border-gray-700 px-4 py-2">全部主流</td>
              <td className="border border-gray-700 px-4 py-2">大部分主流</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">最適合</td>
              <td className="border border-gray-700 px-4 py-2">照片</td>
              <td className="border border-gray-700 px-4 py-2">截圖 / Logo</td>
              <td className="border border-gray-700 px-4 py-2">網頁全能</td>
              <td className="border border-gray-700 px-4 py-2">極致壓縮</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Section 4: Compression effect comparison */}
      <h2 id="compression-comparison" className="text-2xl font-bold text-gray-100 mt-10 mb-4">壓縮效果實測比較</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        以下是一張典型的 4000x3000 像素風景照片，在不同格式和不同品質設定下的壓縮效果模擬數據。
        這些數據可以幫助你直觀地了解各種設定對檔案大小的影響。
      </p>

      <div className="overflow-x-auto my-6">
        <table className="w-full text-sm text-gray-300">
          <thead className="bg-gray-800/50 text-gray-200">
            <tr>
              <th className="border border-gray-700 px-4 py-2">格式</th>
              <th className="border border-gray-700 px-4 py-2">原始大小</th>
              <th className="border border-gray-700 px-4 py-2">品質 90%</th>
              <th className="border border-gray-700 px-4 py-2">品質 75%</th>
              <th className="border border-gray-700 px-4 py-2">品質 50%</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-700 px-4 py-2">JPEG</td>
              <td className="border border-gray-700 px-4 py-2">8.2 MB</td>
              <td className="border border-gray-700 px-4 py-2">3.1 MB（-62%）</td>
              <td className="border border-gray-700 px-4 py-2">1.5 MB（-82%）</td>
              <td className="border border-gray-700 px-4 py-2">0.7 MB（-91%）</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">PNG</td>
              <td className="border border-gray-700 px-4 py-2">15.6 MB</td>
              <td className="border border-gray-700 px-4 py-2">12.8 MB（-18%）</td>
              <td className="border border-gray-700 px-4 py-2">不適用*</td>
              <td className="border border-gray-700 px-4 py-2">不適用*</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">WebP（有損）</td>
              <td className="border border-gray-700 px-4 py-2">8.2 MB</td>
              <td className="border border-gray-700 px-4 py-2">2.3 MB（-72%）</td>
              <td className="border border-gray-700 px-4 py-2">1.1 MB（-87%）</td>
              <td className="border border-gray-700 px-4 py-2">0.5 MB（-94%）</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">AVIF</td>
              <td className="border border-gray-700 px-4 py-2">8.2 MB</td>
              <td className="border border-gray-700 px-4 py-2">1.8 MB（-78%）</td>
              <td className="border border-gray-700 px-4 py-2">0.8 MB（-90%）</td>
              <td className="border border-gray-700 px-4 py-2">0.4 MB（-95%）</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-gray-300 leading-relaxed mb-4">
        * PNG 為無損格式，不支援品質百分比設定。PNG 的優化主要透過移除 metadata、降低色彩深度等方式進行。
      </p>

      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 my-6">
        <p className="font-bold text-emerald-400 mb-2">💡 提示</p>
        <p className="text-gray-300">
          從表中可以看出，WebP 和 AVIF 在各個品質等級下都比 JPEG 有更好的壓縮效果。
          如果你的目標受眾使用的都是現代瀏覽器，強烈建議使用 WebP 格式來獲得最佳的檔案大小與畫質平衡。
        </p>
      </div>

      {/* Section 5: Use-case recommendations */}
      <h2 id="use-case-recommendations" className="text-2xl font-bold text-gray-100 mt-10 mb-4">不同使用場景的壓縮建議</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        不同的使用場景對圖片品質和檔案大小有不同的要求。以下是針對各種常見場景的具體建議。
      </p>

      <h3 id="for-websites" className="text-lg font-bold text-gray-200 mt-6 mb-3">網站 / 部落格</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        網站圖片的核心目標是在保持可接受的視覺品質的同時，盡可能縮小檔案大小以加快載入速度。
      </p>
      <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4">
        <li><strong className="text-gray-100">推薦格式：</strong>WebP（首選）、JPEG（備選）</li>
        <li><strong className="text-gray-100">建議品質：</strong>75-85%</li>
        <li><strong className="text-gray-100">建議解析度：</strong>最大寬度 1920px（配合 2x Retina 顯示器）</li>
        <li><strong className="text-gray-100">單張圖片目標大小：</strong>200 KB 以下</li>
        <li><strong className="text-gray-100">Hero 圖片：</strong>可以稍大，但建議不超過 500 KB</li>
        <li><strong className="text-gray-100">縮圖：</strong>50 KB 以下，品質可降至 60-70%</li>
      </ul>

      <h3 id="for-social-media" className="text-lg font-bold text-gray-200 mt-6 mb-3">社群媒體（Facebook、Instagram、Twitter）</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        社群平台會對上傳的圖片進行自動壓縮，但如果你上傳時圖片就已經過大，
        平台的壓縮演算法可能會過度壓縮，導致畫質嚴重下降。提前自己壓縮到適當大小，
        反而能獲得更好的最終效果。
      </p>
      <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4">
        <li><strong className="text-gray-100">Facebook：</strong>建議 1200x630px（連結預覽）或 2048px 長邊（照片），JPG 格式，品質 85%</li>
        <li><strong className="text-gray-100">Instagram：</strong>建議 1080x1080px（正方形）或 1080x1350px（直式），JPG 格式，品質 85-90%</li>
        <li><strong className="text-gray-100">Twitter/X：</strong>建議 1600x900px（推文圖片），JPG 格式，品質 85%，單張不超過 5 MB</li>
        <li><strong className="text-gray-100">LINE：</strong>建議長邊 2048px 以內，JPG 格式，品質 85%</li>
      </ul>

      <h3 id="for-printing" className="text-lg font-bold text-gray-200 mt-6 mb-3">印刷輸出</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        印刷對圖片品質的要求遠高於螢幕顯示。印刷時需要考慮 DPI（每英吋像素數），
        一般螢幕顯示只需要 72 DPI，但印刷至少需要 300 DPI。
      </p>
      <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4">
        <li><strong className="text-gray-100">推薦格式：</strong>TIFF（最佳）或 JPG（品質 95-100%）</li>
        <li><strong className="text-gray-100">DPI 要求：</strong>300 DPI 以上</li>
        <li><strong className="text-gray-100">色彩模式：</strong>CMYK（專業印刷）</li>
        <li><strong className="text-gray-100">壓縮建議：</strong>盡量使用無損壓縮或最低限度的有損壓縮（品質 95% 以上）</li>
      </ul>

      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 my-6">
        <p className="font-bold text-amber-400 mb-2">⚠️ 注意</p>
        <p className="text-gray-300">
          印刷用圖片不建議過度壓縮。一旦細節因為壓縮而丟失，就無法再恢復。
          如果不確定印刷尺寸，建議保留原始高解析度版本作為備份。
        </p>
      </div>

      <h3 id="for-email" className="text-lg font-bold text-gray-200 mt-6 mb-3">Email 附件</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Email 附件有嚴格的大小限制，而且收件人的網路速度可能不快。壓縮圖片不僅能確保
        Email 能順利寄送，也能減少收件人下載附件的等待時間。
      </p>
      <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4">
        <li><strong className="text-gray-100">Gmail 限制：</strong>單封 25 MB（含所有附件）</li>
        <li><strong className="text-gray-100">Outlook 限制：</strong>單封 20 MB</li>
        <li><strong className="text-gray-100">建議格式：</strong>JPG（相容性最好）</li>
        <li><strong className="text-gray-100">建議品質：</strong>75-80%</li>
        <li><strong className="text-gray-100">建議解析度：</strong>長邊不超過 1920px（除非收件人需要高解析度）</li>
        <li><strong className="text-gray-100">小技巧：</strong>多張圖片可以先壓縮後再用 ZIP 打包，進一步減小總大小</li>
      </ul>

      {/* Section 6: Step-by-step guide */}
      <h2 id="step-by-step" className="text-2xl font-bold text-gray-100 mt-10 mb-4">使用 Mochi Tools 壓縮圖片 — 步驟教學</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        <Link href="/" className="text-pink-400 hover:text-pink-300 font-medium underline decoration-pink-400/30 hover:decoration-pink-300">Mochi Tools</Link> 提供了一系列完全免費的圖片處理工具，
        所有處理都在你的瀏覽器本地完成，不會將任何檔案上傳到伺服器，確保你的隱私安全。
        以下是使用圖片壓縮工具的詳細步驟。
      </p>

      <h3 id="step1" className="text-lg font-bold text-gray-200 mt-6 mb-3">步驟一：開啟圖片壓縮工具</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        前往{' '}
        <Link href="/image/compress" className="text-pink-400 hover:text-pink-300 font-medium underline decoration-pink-400/30 hover:decoration-pink-300">Mochi Tools 圖片壓縮</Link>
        {' '}頁面。你會看到一個簡潔的操作介面，中央有一個大型的拖放區域。
        你可以直接將圖片檔案拖放到這個區域，也可以點擊選擇檔案按鈕來上傳圖片。
        支援 JPG、PNG、WebP 等常見格式，也支援一次上傳多張圖片進行批次處理。
      </p>

      <h3 id="step2" className="text-lg font-bold text-gray-200 mt-6 mb-3">步驟二：選擇壓縮程度</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        上傳圖片後，你可以選擇三種壓縮程度：
      </p>
      <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4">
        <li><strong className="text-gray-100">輕度壓縮（品質約 90%）：</strong>適合攝影作品、產品圖片等需要保持高畫質的場景。壓縮後檔案大小通常能縮小 40-60%，但肉眼幾乎看不出品質差異。</li>
        <li><strong className="text-gray-100">推薦壓縮（品質約 75%）：</strong>這是大多數情況下的最佳選擇，在畫質和檔案大小之間取得完美平衡。壓縮後檔案大小通常能縮小 60-80%。</li>
        <li><strong className="text-gray-100">最大壓縮（品質約 50%）：</strong>適合縮圖、預覽圖或需要快速傳輸的場景。壓縮後檔案大小通常能縮小 80-90%，但細節處可能會出現壓縮痕跡。</li>
      </ul>

      <h3 id="step3" className="text-lg font-bold text-gray-200 mt-6 mb-3">步驟三：下載壓縮後的圖片</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        壓縮完成後，你可以預覽壓縮效果，並看到壓縮前後的檔案大小對比。
        確認滿意後，點擊下載按鈕即可儲存壓縮後的圖片。如果你上傳了多張圖片，
        還可以一鍵打包下載所有壓縮後的檔案。
      </p>

      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 my-6">
        <p className="font-bold text-emerald-400 mb-2">💡 提示</p>
        <p className="text-gray-300">
          如果你的圖片尺寸過大（例如相機拍攝的 6000x4000 像素），建議先使用{' '}
          <Link href="/image/resize" className="text-pink-400 hover:text-pink-300 font-medium underline decoration-pink-400/30 hover:decoration-pink-300">圖片縮放工具</Link>
          {' '}縮小尺寸，再進行壓縮，效果會更好。
        </p>
      </div>

      <h3 id="format-conversion" className="text-lg font-bold text-gray-200 mt-6 mb-3">額外推薦：格式轉換工具</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        有時候，最有效的「壓縮」方式就是轉換到更高效的格式。Mochi Tools 提供了多種格式轉換工具：
      </p>
      <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4">
        <li>
          <Link href="/convert/png-to-jpg" className="text-pink-400 hover:text-pink-300 font-medium underline decoration-pink-400/30 hover:decoration-pink-300">PNG 轉 JPG</Link>
          {' '}— 如果 PNG 圖片不需要透明背景，轉成 JPG 可以大幅縮小檔案（通常縮小 70% 以上）
        </li>
        <li>
          <Link href="/convert/jpg-to-webp" className="text-pink-400 hover:text-pink-300 font-medium underline decoration-pink-400/30 hover:decoration-pink-300">JPG 轉 WebP</Link>
          {' '}— 將 JPG 照片轉為 WebP 格式，在相同畫質下進一步縮小 25-34%
        </li>
        <li>
          <Link href="/convert/png-to-webp" className="text-pink-400 hover:text-pink-300 font-medium underline decoration-pink-400/30 hover:decoration-pink-300">PNG 轉 WebP</Link>
          {' '}— 將 PNG 圖片轉為 WebP 格式，無損模式下可縮小約 26%
        </li>
      </ul>

      {/* Section 7: Advanced tips */}
      <h2 id="advanced-tips" className="text-2xl font-bold text-gray-100 mt-10 mb-4">進階壓縮技巧</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        掌握以下進階技巧，可以讓你的圖片壓縮效果更上一層樓。
      </p>

      <h3 id="resize-first" className="text-lg font-bold text-gray-200 mt-6 mb-3">先縮小尺寸，再壓縮</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        這是最有效的壓縮策略之一。一張 4000x3000 像素的照片包含 1200 萬個像素，
        如果你的用途只需要 800x600 像素（例如網頁縮圖），那麼先縮小尺寸就能將像素數從 1200 萬
        降低到 48 萬，減少了 96% 的資料量。在此基礎上再進行品質壓縮，效果會非常顯著。
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        使用{' '}
        <Link href="/image/resize" className="text-pink-400 hover:text-pink-300 font-medium underline decoration-pink-400/30 hover:decoration-pink-300">Mochi Tools 圖片縮放工具</Link>
        {' '}可以輕鬆調整圖片尺寸。建議先確認最終用途所需的尺寸，再進行縮放。
      </p>

      <h3 id="batch-processing" className="text-lg font-bold text-gray-200 mt-6 mb-3">善用批次處理</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        如果你有大量圖片需要壓縮，逐一處理會非常耗時。Mochi Tools 的圖片壓縮工具支援批次上傳，
        你可以一次選擇或拖放多張圖片，統一設定壓縮程度，然後一次性完成壓縮並打包下載。
        這對於網站管理員、部落格作者、電商賣家來說特別實用。
      </p>

      <h3 id="choose-format-first" className="text-lg font-bold text-gray-200 mt-6 mb-3">先選對格式，再壓縮</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        在壓縮之前，先考慮是否需要轉換格式。常見的格式選擇邏輯如下：
      </p>
      <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4">
        <li><strong className="text-gray-100">照片、風景、人像</strong> → JPG 或 WebP（有損壓縮效果好）</li>
        <li><strong className="text-gray-100">Logo、圖示、截圖</strong> → PNG 或 WebP（需要銳利邊緣和可能的透明背景）</li>
        <li><strong className="text-gray-100">網頁通用</strong> → WebP（在所有場景都表現優秀，檔案最小）</li>
        <li><strong className="text-gray-100">追求極致壓縮</strong> → AVIF（壓縮率最高，但需確認目標瀏覽器支援）</li>
      </ul>

      <h3 id="preserve-originals" className="text-lg font-bold text-gray-200 mt-6 mb-3">保留原始檔案</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        有損壓縮是不可逆的過程，壓縮後的圖片無法恢復到原始品質。因此建議你始終保留一份原始的高品質圖片作為備份。
        特別是重要的攝影作品、商業用圖或可能需要不同尺寸和品質的素材。你可以將原始檔案儲存在雲端或外接硬碟中，
        需要使用時再根據用途進行壓縮。
      </p>

      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 my-6">
        <p className="font-bold text-amber-400 mb-2">⚠️ 注意</p>
        <p className="text-gray-300">
          不要對已經壓縮過的 JPG 圖片再次進行有損壓縮，這會導致「世代損失」（generation loss），
          每次壓縮都會進一步降低品質。如果需要不同品質的版本，請始終從原始檔案重新壓縮。
        </p>
      </div>

      {/* Section 8: FAQ */}
      <h2 id="faq" className="text-2xl font-bold text-gray-100 mt-10 mb-4">常見問題（FAQ）</h2>

      <h3 id="faq-1" className="text-lg font-bold text-gray-200 mt-6 mb-3">Q：壓縮圖片會損失畫質嗎？</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        這取決於你使用的壓縮方式。如果使用無損壓縮（如 PNG 優化），畫質完全不會損失。
        如果使用有損壓縮（如 JPG 品質設為 75-85%），理論上會有輕微的畫質損失，
        但在正常螢幕觀看條件下，人眼幾乎無法分辨差異。只有在極度放大或與原圖逐像素比較時，
        才可能發現微小的差異。
      </p>

      <h3 id="faq-2" className="text-lg font-bold text-gray-200 mt-6 mb-3">Q：JPG 品質設多少最好？</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        最佳品質設定取決於用途。一般來說：網頁展示建議 75-85%，社群媒體分享建議 80-90%，
        列印用途建議 90-100%，縮圖或預覽建議 50-70%。品質 75% 通常被認為是網頁用途的最佳平衡點，
        此時檔案大小約為原來的 20-30%，但視覺品質損失極小。
      </p>

      <h3 id="faq-3" className="text-lg font-bold text-gray-200 mt-6 mb-3">Q：WebP 格式所有瀏覽器都支援嗎？</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        截至 2026 年，所有主流瀏覽器（Chrome、Firefox、Safari、Edge、Opera）都已經支援 WebP 格式。
        全球瀏覽器市佔率中，支援 WebP 的瀏覽器已超過 97%。除非你的目標受眾使用非常老舊的瀏覽器版本，
        否則可以放心使用 WebP。如果需要向後相容，可以使用 HTML 的 {'<picture>'} 標籤，
        同時提供 WebP 和 JPG 版本。
      </p>

      <h3 id="faq-4" className="text-lg font-bold text-gray-200 mt-6 mb-3">Q：Mochi Tools 會上傳我的圖片到伺服器嗎？</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        不會。Mochi Tools 的所有圖片處理功能都在你的瀏覽器中本地執行。
        你的圖片檔案不會離開你的電腦，不會被上傳到任何遠端伺服器。
        這意味著你可以安心處理包含個人隱私或商業機密的圖片，完全不用擔心資料外洩的風險。
      </p>

      <h3 id="faq-5" className="text-lg font-bold text-gray-200 mt-6 mb-3">Q：壓縮後的圖片還能恢復原來的品質嗎？</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        如果使用無損壓縮（如 PNG），解壓後可以完全恢復原始品質。
        但如果使用有損壓縮（如 JPG），被捨棄的細節資訊是無法恢復的。
        這就是為什麼我們建議始終保留一份原始檔案作為備份，特別是對於重要的圖片素材。
      </p>

      <h3 id="faq-6" className="text-lg font-bold text-gray-200 mt-6 mb-3">Q：圖片壓縮和圖片縮放有什麼區別？</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        圖片壓縮是透過壓縮演算法來減少檔案的資料量，而不改變圖片的顯示尺寸（像素寬高）。
        圖片縮放則是改變圖片的實際像素尺寸（例如從 4000x3000 縮小到 800x600）。
        兩者都能減少檔案大小，而且可以搭配使用以獲得最佳效果：先縮小尺寸到目標大小，
        再進行品質壓縮。
      </p>

      <h3 id="faq-7" className="text-lg font-bold text-gray-200 mt-6 mb-3">Q：網站圖片應該用什麼格式？</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        2026 年的最佳實踐是以 WebP 作為首選格式。WebP 在所有主流瀏覽器上都有良好的支援，
        並且在同等畫質下比 JPG 和 PNG 都有更小的檔案大小。對於追求極致效能的網站，
        可以考慮使用 AVIF 作為更進階的選項。建議使用 HTML 的 {'<picture>'} 標籤搭配多種格式，
        讓瀏覽器自動選擇它支援的最佳格式。
      </p>

      {/* Section 9: CTA */}
      <div className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20 rounded-2xl p-6 mt-10">
        <p className="font-bold text-gray-100 text-lg mb-2">立即開始壓縮你的圖片！</p>
        <p className="text-gray-300 mb-4">
          Mochi Tools 提供完全免費、不需要註冊、在瀏覽器本地處理的圖片壓縮工具。
          支援 JPG、PNG、WebP 格式，批次處理多張圖片，壓縮前後即時預覽比較。
        </p>
        <p className="text-gray-300">
          <Link href="/image/compress" className="text-pink-400 hover:text-pink-300 font-medium underline decoration-pink-400/30 hover:decoration-pink-300">前往圖片壓縮工具 →</Link>
          {' '}|{' '}
          <Link href="/image/resize" className="text-pink-400 hover:text-pink-300 font-medium underline decoration-pink-400/30 hover:decoration-pink-300">圖片縮放工具 →</Link>
          {' '}|{' '}
          <Link href="/convert/jpg-to-webp" className="text-pink-400 hover:text-pink-300 font-medium underline decoration-pink-400/30 hover:decoration-pink-300">JPG 轉 WebP →</Link>
        </p>
      </div>
    </>
  );
}

export function ImageCompressionGuideEn() {
  return (
    <>
      <p className="text-gray-300 leading-relaxed mb-4">
        In today&apos;s digital world, images are everywhere. Whether you&apos;re a developer managing a website, a social media
        user sharing your life, or an office worker sending documents via email, image file size directly impacts
        your experience. A single unprocessed smartphone photo can be 5-10 MB, and a web page might contain dozens
        of such images. Without compression, web pages load painfully slowly, storage fills up fast, and file
        transfers become a struggle.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        This complete guide will explain image compression principles in an accessible way, compare the pros and
        cons of various image formats, and teach you how to use free online tools to dramatically reduce image
        file sizes without sacrificing quality. Whether you&apos;re a beginner or an experienced user, you&apos;ll find
        practical tips in this article.
      </p>

      {/* Section 1: Why compression matters */}
      <h2 id="why-compress" className="text-2xl font-bold text-gray-100 mt-10 mb-4">Why Image Compression Matters</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Image compression is more than just &quot;making files smaller.&quot; It has far-reaching effects on website
        performance, user experience, and search engine rankings. Here are four key reasons why you should
        prioritize image compression:
      </p>

      <h3 id="web-performance" className="text-lg font-bold text-gray-200 mt-6 mb-3">Improved Web Performance</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        According to HTTP Archive, images account for over 50% of total page weight on average. This means
        effectively compressing your images can cut your entire page load time in half. Research shows that
        every one-second delay in page load increases bounce rate by 32%. For e-commerce sites, each second
        of delay can reduce conversion rates by 7%. These statistics clearly demonstrate that image compression
        directly impacts your bottom line and user experience.
      </p>

      <h3 id="sharing" className="text-lg font-bold text-gray-200 mt-6 mb-3">Easier Sharing and Transfer</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Many messaging apps and email services impose file size limits. LINE&apos;s image transfer limit is around
        300 MB but automatically compresses quality; Gmail attachments are limited to 25 MB; Slack&apos;s free plan
        limits files to 5 MB. By compressing images beforehand, you not only speed up uploads but also maintain
        control over image quality, rather than letting a platform&apos;s algorithm decide how to compress your images.
      </p>

      <h3 id="storage" className="text-lg font-bold text-gray-200 mt-6 mb-3">Save Storage Space</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Whether it&apos;s cloud storage (Google Drive, iCloud, Dropbox) or local hard drives, storage comes at a cost.
        A phone taking 20 photos daily produces 7,300 photos per year. At an average of 5 MB per photo, that&apos;s
        36.5 GB of space. With reasonable compression (where quality loss is virtually imperceptible), you can
        easily save 60-80% of that space, significantly extending your device&apos;s usable life.
      </p>

      <h3 id="seo" className="text-lg font-bold text-gray-200 mt-6 mb-3">Better SEO Rankings</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Google&apos;s Core Web Vitals, introduced in 2021, lists page load performance as a key ranking signal. The
        LCP (Largest Contentful Paint) metric is directly tied to how quickly the largest image on the page loads.
        If your website images are too large, your LCP score will suffer, which in turn affects your ranking
        in Google search results. Compressing images is one of the most direct and effective ways to improve
        your LCP score.
      </p>

      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 my-6">
        <p className="font-bold text-emerald-400 mb-2">💡 Tip</p>
        <p className="text-gray-300">
          Google PageSpeed Insights is a free tool that analyzes your website&apos;s performance and identifies images
          that need compression. We recommend using it regularly to audit your site.
        </p>
      </div>

      {/* Section 2: Compression principles */}
      <h2 id="compression-principles" className="text-2xl font-bold text-gray-100 mt-10 mb-4">How Image Compression Works</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        To compress images effectively, you first need to understand the fundamentals. Image compression falls
        into two main categories: Lossy Compression and Lossless Compression. Understanding the difference
        is key to choosing the right compression strategy.
      </p>

      <h3 id="lossy-compression" className="text-lg font-bold text-gray-200 mt-6 mb-3">Lossy Compression</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        The core concept of lossy compression is &quot;discarding details that the human eye can&apos;t easily perceive.&quot;
        It analyzes color information in an image and removes data that the human visual system is insensitive to.
        For example, in a photo of the sky, color differences between adjacent pixels may be extremely subtle.
        Lossy compression merges these nearly identical colors into a single value, dramatically reducing the
        amount of data that needs to be stored.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        Lossy compression typically achieves very high compression ratios, reducing file size to 10-30% of
        the original. However, each save loses additional detail, so it&apos;s not recommended to repeatedly apply
        lossy compression to the same image. JPG and WebP (lossy mode) both use this compression method.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        For a concrete example: a 4000x3000 pixel landscape photo in raw BMP format is about 36 MB. After
        converting to JPG at 85% quality, the file size might be just 2-3 MB, a reduction of over 90%. When
        viewed on screen, you&apos;d find it nearly impossible to distinguish the compressed version from the original.
      </p>

      <h3 id="lossless-compression" className="text-lg font-bold text-gray-200 mt-6 mb-3">Lossless Compression</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Lossless compression doesn&apos;t discard any information. It works by finding repetitive patterns in the data
        and representing them more efficiently. Imagine if an image contains a row of 100 pixels of the same color.
        Instead of storing 100 identical values, lossless compression records &quot;this color repeated 100 times&quot;
        — this is known as Run-Length Encoding (RLE).
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        The advantage of lossless compression is that image quality remains completely unchanged; the decompressed
        image is identical to the original. The downside is relatively lower compression ratios, typically reducing
        file size by only 20-50%. PNG and WebP (lossless mode) use this approach. It&apos;s ideal for scenarios
        requiring pixel-perfect accuracy, such as technical screenshots, line art, and text images.
      </p>

      <h3 id="human-eye" className="text-lg font-bold text-gray-200 mt-6 mb-3">Human Eye Perception and Compression</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Lossy compression works effectively because of characteristics of the human visual system. The human eye is
        more sensitive to changes in luminance (brightness) than to changes in chrominance (hue and saturation).
        This is why JPG compression prioritizes preserving luminance information while compressing chrominance data
        more aggressively — a process called Chroma Subsampling.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        Additionally, the human eye has a perception threshold for high-frequency details (such as sharp edges
        and fine textures). When details fall below this threshold, we simply cannot perceive their presence or
        absence. Lossy compression exploits this characteristic by using mathematical tools like the Discrete
        Cosine Transform (DCT) to decompose images into different frequency components, then discarding the
        high-frequency components that human eyes can barely perceive.
      </p>

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 my-6">
        <p className="font-bold text-blue-400 mb-2">ℹ️ Info</p>
        <p className="text-gray-300">
          The human eye can distinguish approximately 10 million different colors, but our ability to differentiate
          subtle differences between adjacent colors is very limited. This is why most people cannot see the
          difference between the original and a JPG compressed at 75-85% quality.
        </p>
      </div>

      {/* Section 3: Format comparison */}
      <h2 id="format-comparison" className="text-2xl font-bold text-gray-100 mt-10 mb-4">Detailed Image Format Comparison</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Choosing the right image format is the first step in optimizing file size. Here&apos;s a detailed comparison
        of common formats to help you make the best choice for different use cases.
      </p>

      <h3 id="jpeg-format" className="text-lg font-bold text-gray-200 mt-6 mb-3">JPEG / JPG</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        JPEG (Joint Photographic Experts Group) is currently the most widely used image format, supported
        by virtually every device and software. It uses lossy compression and excels at handling photos
        with rich colors and smooth gradients.
      </p>
      <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4">
        <li><strong className="text-gray-100">Best for:</strong> Landscape photos, portraits, product images, social media posts</li>
        <li><strong className="text-gray-100">Pros:</strong> High compression ratio, best compatibility, small file size</li>
        <li><strong className="text-gray-100">Cons:</strong> No transparency support, lossy compression degrades quality over time, poor for line art or text</li>
        <li><strong className="text-gray-100">Recommended quality:</strong> 75-85% for web, 90-95% for print</li>
      </ul>

      <h3 id="png-format" className="text-lg font-bold text-gray-200 mt-6 mb-3">PNG</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        PNG (Portable Network Graphics) uses lossless compression and perfectly preserves every detail of an image.
        Its standout feature is support for transparent backgrounds (alpha channel), making it indispensable
        in web design.
      </p>
      <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4">
        <li><strong className="text-gray-100">Best for:</strong> Logos, icons, screenshots, images needing transparency, technical diagrams</li>
        <li><strong className="text-gray-100">Pros:</strong> Lossless quality, transparency support, excellent for sharp edges and text</li>
        <li><strong className="text-gray-100">Cons:</strong> Files are usually much larger than JPG, not ideal for large photographs</li>
        <li><strong className="text-gray-100">Optimization:</strong> Remove unnecessary metadata, reduce color depth (24-bit to 8-bit)</li>
      </ul>

      <h3 id="webp-format" className="text-lg font-bold text-gray-200 mt-6 mb-3">WebP</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        WebP is a modern image format developed by Google in 2010 that combines the best of JPG and PNG.
        It supports both lossy and lossless compression, as well as transparency and animation. At the same
        quality level, WebP is 25-34% smaller than JPG and 26% smaller than PNG.
      </p>
      <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4">
        <li><strong className="text-gray-100">Best for:</strong> Website images (all types), web applications, achieving minimum file size</li>
        <li><strong className="text-gray-100">Pros:</strong> Both lossy and lossless support, transparency, smallest files, animation support</li>
        <li><strong className="text-gray-100">Cons:</strong> Some older image editing software lacks support, not ideal for print</li>
        <li><strong className="text-gray-100">Browser support:</strong> Chrome, Firefox, Safari, Edge and all major browsers support it</li>
      </ul>

      <h3 id="avif-format" className="text-lg font-bold text-gray-200 mt-6 mb-3">AVIF</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        AVIF (AV1 Image File Format) is a next-generation image format based on the AV1 video codec standard,
        developed by the Alliance for Open Media. Its compression efficiency is higher than WebP — at the same
        quality level, file sizes are 20-30% smaller than WebP.
      </p>
      <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4">
        <li><strong className="text-gray-100">Best for:</strong> Websites pursuing maximum compression, bandwidth-sensitive applications</li>
        <li><strong className="text-gray-100">Pros:</strong> Highest compression ratio, HDR support, transparency support, excellent color reproduction</li>
        <li><strong className="text-gray-100">Cons:</strong> Slower encoding speed, incomplete browser support, ecosystem still developing</li>
        <li><strong className="text-gray-100">Browser support:</strong> Chrome 85+, Firefox 93+, Safari 16.4+ (support expanding)</li>
      </ul>

      {/* Format comparison table */}
      <div className="overflow-x-auto my-6">
        <table className="w-full text-sm text-gray-300">
          <thead className="bg-gray-800/50 text-gray-200">
            <tr>
              <th className="border border-gray-700 px-4 py-2">Feature</th>
              <th className="border border-gray-700 px-4 py-2">JPEG</th>
              <th className="border border-gray-700 px-4 py-2">PNG</th>
              <th className="border border-gray-700 px-4 py-2">WebP</th>
              <th className="border border-gray-700 px-4 py-2">AVIF</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-700 px-4 py-2">Compression</td>
              <td className="border border-gray-700 px-4 py-2">Lossy</td>
              <td className="border border-gray-700 px-4 py-2">Lossless</td>
              <td className="border border-gray-700 px-4 py-2">Lossy / Lossless</td>
              <td className="border border-gray-700 px-4 py-2">Lossy / Lossless</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">Transparency</td>
              <td className="border border-gray-700 px-4 py-2">No</td>
              <td className="border border-gray-700 px-4 py-2">Yes</td>
              <td className="border border-gray-700 px-4 py-2">Yes</td>
              <td className="border border-gray-700 px-4 py-2">Yes</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">Animation</td>
              <td className="border border-gray-700 px-4 py-2">No</td>
              <td className="border border-gray-700 px-4 py-2">APNG Yes</td>
              <td className="border border-gray-700 px-4 py-2">Yes</td>
              <td className="border border-gray-700 px-4 py-2">Yes</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">Compression Ratio</td>
              <td className="border border-gray-700 px-4 py-2">High</td>
              <td className="border border-gray-700 px-4 py-2">Medium</td>
              <td className="border border-gray-700 px-4 py-2">Very High</td>
              <td className="border border-gray-700 px-4 py-2">Highest</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">Browser Support</td>
              <td className="border border-gray-700 px-4 py-2">All</td>
              <td className="border border-gray-700 px-4 py-2">All</td>
              <td className="border border-gray-700 px-4 py-2">All Major</td>
              <td className="border border-gray-700 px-4 py-2">Most Major</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">Best For</td>
              <td className="border border-gray-700 px-4 py-2">Photos</td>
              <td className="border border-gray-700 px-4 py-2">Screenshots / Logos</td>
              <td className="border border-gray-700 px-4 py-2">Web All-rounder</td>
              <td className="border border-gray-700 px-4 py-2">Max Compression</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Section 4: Compression effect comparison */}
      <h2 id="compression-comparison" className="text-2xl font-bold text-gray-100 mt-10 mb-4">Real-World Compression Effect Comparison</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Below is simulated compression data for a typical 4000x3000 pixel landscape photograph across different
        formats and quality settings. This data helps you intuitively understand how various settings affect
        file size.
      </p>

      <div className="overflow-x-auto my-6">
        <table className="w-full text-sm text-gray-300">
          <thead className="bg-gray-800/50 text-gray-200">
            <tr>
              <th className="border border-gray-700 px-4 py-2">Format</th>
              <th className="border border-gray-700 px-4 py-2">Original Size</th>
              <th className="border border-gray-700 px-4 py-2">90% Quality</th>
              <th className="border border-gray-700 px-4 py-2">75% Quality</th>
              <th className="border border-gray-700 px-4 py-2">50% Quality</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-700 px-4 py-2">JPEG</td>
              <td className="border border-gray-700 px-4 py-2">8.2 MB</td>
              <td className="border border-gray-700 px-4 py-2">3.1 MB (-62%)</td>
              <td className="border border-gray-700 px-4 py-2">1.5 MB (-82%)</td>
              <td className="border border-gray-700 px-4 py-2">0.7 MB (-91%)</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">PNG</td>
              <td className="border border-gray-700 px-4 py-2">15.6 MB</td>
              <td className="border border-gray-700 px-4 py-2">12.8 MB (-18%)</td>
              <td className="border border-gray-700 px-4 py-2">N/A*</td>
              <td className="border border-gray-700 px-4 py-2">N/A*</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">WebP (Lossy)</td>
              <td className="border border-gray-700 px-4 py-2">8.2 MB</td>
              <td className="border border-gray-700 px-4 py-2">2.3 MB (-72%)</td>
              <td className="border border-gray-700 px-4 py-2">1.1 MB (-87%)</td>
              <td className="border border-gray-700 px-4 py-2">0.5 MB (-94%)</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">AVIF</td>
              <td className="border border-gray-700 px-4 py-2">8.2 MB</td>
              <td className="border border-gray-700 px-4 py-2">1.8 MB (-78%)</td>
              <td className="border border-gray-700 px-4 py-2">0.8 MB (-90%)</td>
              <td className="border border-gray-700 px-4 py-2">0.4 MB (-95%)</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-gray-300 leading-relaxed mb-4">
        * PNG is a lossless format and doesn&apos;t support quality percentage settings. PNG optimization is primarily
        done through metadata removal and color depth reduction.
      </p>

      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 my-6">
        <p className="font-bold text-emerald-400 mb-2">💡 Tip</p>
        <p className="text-gray-300">
          As the table shows, WebP and AVIF outperform JPEG at every quality level. If your target audience uses
          modern browsers, we strongly recommend using WebP format for the best balance of file size and quality.
        </p>
      </div>

      {/* Section 5: Use-case recommendations */}
      <h2 id="use-case-recommendations" className="text-2xl font-bold text-gray-100 mt-10 mb-4">Compression Recommendations by Use Case</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Different use cases have different requirements for image quality and file size. Here are specific
        recommendations for common scenarios.
      </p>

      <h3 id="for-websites" className="text-lg font-bold text-gray-200 mt-6 mb-3">Websites / Blogs</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        The core goal for website images is to minimize file size while maintaining acceptable visual quality
        to speed up page loading.
      </p>
      <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4">
        <li><strong className="text-gray-100">Recommended format:</strong> WebP (primary), JPEG (fallback)</li>
        <li><strong className="text-gray-100">Suggested quality:</strong> 75-85%</li>
        <li><strong className="text-gray-100">Suggested resolution:</strong> Max width 1920px (for 2x Retina displays)</li>
        <li><strong className="text-gray-100">Target size per image:</strong> Under 200 KB</li>
        <li><strong className="text-gray-100">Hero images:</strong> Can be slightly larger, but ideally under 500 KB</li>
        <li><strong className="text-gray-100">Thumbnails:</strong> Under 50 KB, quality can drop to 60-70%</li>
      </ul>

      <h3 id="for-social-media" className="text-lg font-bold text-gray-200 mt-6 mb-3">Social Media (Facebook, Instagram, Twitter)</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Social platforms automatically compress uploaded images. However, if your image is too large when uploaded,
        the platform&apos;s compression algorithm may over-compress it, causing severe quality degradation. Pre-compressing
        to an appropriate size actually yields better final results.
      </p>
      <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4">
        <li><strong className="text-gray-100">Facebook:</strong> 1200x630px (link previews) or 2048px long edge (photos), JPG, 85% quality</li>
        <li><strong className="text-gray-100">Instagram:</strong> 1080x1080px (square) or 1080x1350px (portrait), JPG, 85-90% quality</li>
        <li><strong className="text-gray-100">Twitter/X:</strong> 1600x900px (tweet images), JPG, 85% quality, max 5 MB per image</li>
        <li><strong className="text-gray-100">LINE:</strong> Long edge under 2048px, JPG, 85% quality</li>
      </ul>

      <h3 id="for-printing" className="text-lg font-bold text-gray-200 mt-6 mb-3">Print Output</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Print demands much higher image quality than screen display. When printing, you need to consider DPI
        (dots per inch). Standard screen display only requires 72 DPI, but printing needs at least 300 DPI.
      </p>
      <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4">
        <li><strong className="text-gray-100">Recommended format:</strong> TIFF (best) or JPG (95-100% quality)</li>
        <li><strong className="text-gray-100">DPI requirement:</strong> 300 DPI or higher</li>
        <li><strong className="text-gray-100">Color mode:</strong> CMYK (professional printing)</li>
        <li><strong className="text-gray-100">Compression advice:</strong> Use lossless compression or minimal lossy compression (95%+ quality)</li>
      </ul>

      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 my-6">
        <p className="font-bold text-amber-400 mb-2">⚠️ Warning</p>
        <p className="text-gray-300">
          Print images should not be over-compressed. Once details are lost through compression, they cannot be
          recovered. If you&apos;re unsure about the print size, keep the original high-resolution version as a backup.
        </p>
      </div>

      <h3 id="for-email" className="text-lg font-bold text-gray-200 mt-6 mb-3">Email Attachments</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Email attachments have strict size limits, and recipients may not have fast internet connections.
        Compressing images not only ensures your email can be sent successfully, but also reduces the time
        recipients spend downloading attachments.
      </p>
      <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4">
        <li><strong className="text-gray-100">Gmail limit:</strong> 25 MB per email (total attachments)</li>
        <li><strong className="text-gray-100">Outlook limit:</strong> 20 MB per email</li>
        <li><strong className="text-gray-100">Recommended format:</strong> JPG (best compatibility)</li>
        <li><strong className="text-gray-100">Suggested quality:</strong> 75-80%</li>
        <li><strong className="text-gray-100">Suggested resolution:</strong> Long edge no more than 1920px (unless recipient needs high resolution)</li>
        <li><strong className="text-gray-100">Pro tip:</strong> Compress multiple images first, then ZIP them together for even smaller total size</li>
      </ul>

      {/* Section 6: Step-by-step guide */}
      <h2 id="step-by-step" className="text-2xl font-bold text-gray-100 mt-10 mb-4">Compress Images with Mochi Tools — Step-by-Step Guide</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        <Link href="/" className="text-pink-400 hover:text-pink-300 font-medium underline decoration-pink-400/30 hover:decoration-pink-300">Mochi Tools</Link> offers a suite of completely free image
        processing tools. All processing is done locally in your browser — no files are ever uploaded to any
        server, ensuring your privacy is protected. Here&apos;s a detailed walkthrough of the image compression tool.
      </p>

      <h3 id="step1" className="text-lg font-bold text-gray-200 mt-6 mb-3">Step 1: Open the Image Compression Tool</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Navigate to the{' '}
        <Link href="/image/compress" className="text-pink-400 hover:text-pink-300 font-medium underline decoration-pink-400/30 hover:decoration-pink-300">Mochi Tools Image Compression</Link>
        {' '}page. You&apos;ll see a clean interface with a large drag-and-drop zone in the center. You can drag and
        drop image files directly into this zone, or click the file select button to upload. It supports JPG,
        PNG, WebP and other common formats, and allows uploading multiple images at once for batch processing.
      </p>

      <h3 id="step2" className="text-lg font-bold text-gray-200 mt-6 mb-3">Step 2: Choose Your Compression Level</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        After uploading your images, you can choose from three compression levels:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4">
        <li><strong className="text-gray-100">Light compression (~90% quality):</strong> Ideal for photography, product images, and other scenarios requiring high quality. File size typically shrinks 40-60%, with virtually no visible quality difference.</li>
        <li><strong className="text-gray-100">Recommended compression (~75% quality):</strong> The best choice for most situations, achieving a perfect balance between quality and file size. File size typically shrinks 60-80%.</li>
        <li><strong className="text-gray-100">Maximum compression (~50% quality):</strong> Suitable for thumbnails, previews, or scenarios requiring fast transfer. File size typically shrinks 80-90%, though compression artifacts may be visible in detailed areas.</li>
      </ul>

      <h3 id="step3" className="text-lg font-bold text-gray-200 mt-6 mb-3">Step 3: Download Your Compressed Images</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        After compression is complete, you can preview the results and see a before-and-after file size comparison.
        Once satisfied, click the download button to save your compressed images. If you uploaded multiple images,
        you can download all compressed files at once as a package.
      </p>

      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 my-6">
        <p className="font-bold text-emerald-400 mb-2">💡 Tip</p>
        <p className="text-gray-300">
          If your images are oversized (e.g., camera photos at 6000x4000 pixels), we recommend first using the{' '}
          <Link href="/image/resize" className="text-pink-400 hover:text-pink-300 font-medium underline decoration-pink-400/30 hover:decoration-pink-300">Image Resize tool</Link>
          {' '}to reduce dimensions, then compressing for even better results.
        </p>
      </div>

      <h3 id="format-conversion" className="text-lg font-bold text-gray-200 mt-6 mb-3">Bonus: Format Conversion Tools</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Sometimes the most effective &quot;compression&quot; is simply converting to a more efficient format. Mochi Tools
        offers several format conversion tools:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4">
        <li>
          <Link href="/convert/png-to-jpg" className="text-pink-400 hover:text-pink-300 font-medium underline decoration-pink-400/30 hover:decoration-pink-300">PNG to JPG</Link>
          {' '}— If your PNG doesn&apos;t need transparency, converting to JPG can dramatically reduce file size (typically 70%+ reduction)
        </li>
        <li>
          <Link href="/convert/jpg-to-webp" className="text-pink-400 hover:text-pink-300 font-medium underline decoration-pink-400/30 hover:decoration-pink-300">JPG to WebP</Link>
          {' '}— Convert JPG photos to WebP format for an additional 25-34% size reduction at the same quality
        </li>
        <li>
          <Link href="/convert/png-to-webp" className="text-pink-400 hover:text-pink-300 font-medium underline decoration-pink-400/30 hover:decoration-pink-300">PNG to WebP</Link>
          {' '}— Convert PNG images to WebP format for approximately 26% size reduction in lossless mode
        </li>
      </ul>

      {/* Section 7: Advanced tips */}
      <h2 id="advanced-tips" className="text-2xl font-bold text-gray-100 mt-10 mb-4">Advanced Compression Tips</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Master these advanced techniques to take your image compression results to the next level.
      </p>

      <h3 id="resize-first" className="text-lg font-bold text-gray-200 mt-6 mb-3">Resize First, Then Compress</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        This is one of the most effective compression strategies. A 4000x3000 pixel photo contains 12 million
        pixels. If your use case only requires 800x600 pixels (e.g., a web thumbnail), resizing first reduces the
        pixel count from 12 million to 480,000 — a 96% reduction in data. Applying quality compression on top
        of this yields remarkably small file sizes.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4">
        Use the{' '}
        <Link href="/image/resize" className="text-pink-400 hover:text-pink-300 font-medium underline decoration-pink-400/30 hover:decoration-pink-300">Mochi Tools Image Resize tool</Link>
        {' '}to easily adjust image dimensions. We recommend determining the required dimensions for your target
        use case before resizing.
      </p>

      <h3 id="batch-processing" className="text-lg font-bold text-gray-200 mt-6 mb-3">Leverage Batch Processing</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        If you have a large number of images to compress, processing them one by one is extremely time-consuming.
        Mochi Tools&apos; image compression tool supports batch uploads — select or drag in multiple images at once,
        set a uniform compression level, and compress everything in one go with a packaged download. This is
        especially useful for website administrators, blog authors, and e-commerce sellers.
      </p>

      <h3 id="choose-format-first" className="text-lg font-bold text-gray-200 mt-6 mb-3">Choose the Right Format First, Then Compress</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Before compressing, consider whether you need to convert formats. Here&apos;s the general format selection logic:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4">
        <li><strong className="text-gray-100">Photos, landscapes, portraits</strong> → JPG or WebP (excellent lossy compression)</li>
        <li><strong className="text-gray-100">Logos, icons, screenshots</strong> → PNG or WebP (sharp edges and possible transparency needed)</li>
        <li><strong className="text-gray-100">General web use</strong> → WebP (excellent performance in all scenarios, smallest file size)</li>
        <li><strong className="text-gray-100">Maximum compression</strong> → AVIF (highest compression ratio, but verify target browser support)</li>
      </ul>

      <h3 id="preserve-originals" className="text-lg font-bold text-gray-200 mt-6 mb-3">Preserve Original Files</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Lossy compression is an irreversible process — compressed images cannot be restored to their original quality.
        Therefore, we recommend always keeping a copy of the original high-quality image as a backup. This is
        especially important for photography work, commercial images, or assets that may need different sizes and
        quality levels. You can store originals in cloud storage or on an external drive and compress from the
        original whenever needed.
      </p>

      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 my-6">
        <p className="font-bold text-amber-400 mb-2">⚠️ Warning</p>
        <p className="text-gray-300">
          Do not apply lossy compression to an already-compressed JPG image. This causes &quot;generation loss&quot;
          — each compression cycle further degrades quality. If you need different quality versions, always
          re-compress from the original file.
        </p>
      </div>

      {/* Section 8: FAQ */}
      <h2 id="faq" className="text-2xl font-bold text-gray-100 mt-10 mb-4">Frequently Asked Questions (FAQ)</h2>

      <h3 id="faq-1" className="text-lg font-bold text-gray-200 mt-6 mb-3">Q: Does compressing images reduce quality?</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        It depends on the compression method. Lossless compression (like PNG optimization) preserves quality
        completely. Lossy compression (like JPG at 75-85% quality) theoretically causes slight quality loss,
        but under normal viewing conditions on screen, the human eye can barely detect the difference. Only
        when zooming in extremely close or comparing pixel-by-pixel with the original would you notice minor
        differences.
      </p>

      <h3 id="faq-2" className="text-lg font-bold text-gray-200 mt-6 mb-3">Q: What&apos;s the best JPG quality setting?</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        The optimal quality setting depends on the use case. Generally: web display 75-85%, social media
        sharing 80-90%, print 90-100%, thumbnails or previews 50-70%. Quality 75% is generally considered the
        sweet spot for web use — file size drops to about 20-30% of the original, with minimal visual quality loss.
      </p>

      <h3 id="faq-3" className="text-lg font-bold text-gray-200 mt-6 mb-3">Q: Is WebP supported by all browsers?</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        As of 2026, all major browsers (Chrome, Firefox, Safari, Edge, Opera) support WebP format. Browsers
        supporting WebP account for over 97% of global browser market share. Unless your target audience uses
        very outdated browser versions, you can confidently use WebP. For backward compatibility, you can use
        the HTML {'<picture>'} tag to provide both WebP and JPG versions.
      </p>

      <h3 id="faq-4" className="text-lg font-bold text-gray-200 mt-6 mb-3">Q: Does Mochi Tools upload my images to a server?</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        No. All image processing in Mochi Tools runs locally in your browser. Your image files never leave
        your computer and are never uploaded to any remote server. This means you can safely process images
        containing personal privacy or business secrets without any risk of data leakage.
      </p>

      <h3 id="faq-5" className="text-lg font-bold text-gray-200 mt-6 mb-3">Q: Can compressed images be restored to original quality?</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        With lossless compression (like PNG), decompression fully restores original quality. However, with
        lossy compression (like JPG), the discarded detail information cannot be recovered. This is why we
        recommend always keeping a copy of the original file as a backup, especially for important image assets.
      </p>

      <h3 id="faq-6" className="text-lg font-bold text-gray-200 mt-6 mb-3">Q: What&apos;s the difference between image compression and image resizing?</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        Image compression uses compression algorithms to reduce the data volume of a file without changing the
        image&apos;s display dimensions (pixel width and height). Image resizing changes the actual pixel dimensions
        (e.g., from 4000x3000 down to 800x600). Both reduce file size, and they can be combined for optimal
        results: first resize to the target dimensions, then apply quality compression.
      </p>

      <h3 id="faq-7" className="text-lg font-bold text-gray-200 mt-6 mb-3">Q: What format should I use for website images?</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        The best practice in 2026 is to use WebP as the primary format. WebP has excellent support across all
        major browsers and offers smaller file sizes than both JPG and PNG at equivalent quality. For websites
        pursuing maximum performance, AVIF is a more advanced option to consider. We recommend using the HTML
        {' '}{'<picture>'} tag with multiple formats so browsers automatically select the best format they support.
      </p>

      {/* Section 9: CTA */}
      <div className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20 rounded-2xl p-6 mt-10">
        <p className="font-bold text-gray-100 text-lg mb-2">Start Compressing Your Images Now!</p>
        <p className="text-gray-300 mb-4">
          Mochi Tools offers completely free image compression that runs locally in your browser — no registration
          needed. Supports JPG, PNG, and WebP formats with batch processing and instant before/after previews.
        </p>
        <p className="text-gray-300">
          <Link href="/image/compress" className="text-pink-400 hover:text-pink-300 font-medium underline decoration-pink-400/30 hover:decoration-pink-300">Go to Image Compression Tool →</Link>
          {' '}|{' '}
          <Link href="/image/resize" className="text-pink-400 hover:text-pink-300 font-medium underline decoration-pink-400/30 hover:decoration-pink-300">Image Resize Tool →</Link>
          {' '}|{' '}
          <Link href="/convert/jpg-to-webp" className="text-pink-400 hover:text-pink-300 font-medium underline decoration-pink-400/30 hover:decoration-pink-300">JPG to WebP →</Link>
        </p>
      </div>
    </>
  );
}
