import { Link } from '@/i18n/routing';

export function ImageCompressionGuideZh() {
  return (
    <>
      <p>
        網站載入太慢？社群貼文上傳失敗？很多時候問題出在圖片檔案太大。
        這篇完全指南教你如何壓縮圖片，在不損畫質的前提下大幅縮小檔案大小。
      </p>

      <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">為什麼圖片壓縮很重要？</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li><strong>加速網頁載入</strong> — 圖片通常佔網頁總大小的 50% 以上，壓縮後網頁載入速度顯著提升</li>
        <li><strong>節省儲存空間</strong> — 相簿中的照片壓縮後可以省下大量空間</li>
        <li><strong>方便分享</strong> — 壓縮後的圖片更容易透過 Email、LINE、Slack 等傳送</li>
        <li><strong>提升 SEO 排名</strong> — Google 的 Core Web Vitals 將頁面載入速度列為排名因素</li>
      </ul>

      <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">常見圖片格式的壓縮原理</h2>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-2">JPG / JPEG</h3>
      <p>
        JPG 使用有損壓縮（Lossy Compression），透過捨棄人眼不容易察覺的細節來縮小檔案。
        品質設定在 80-85% 通常是最佳平衡點 — 檔案大幅縮小，但畫質幾乎看不出差異。
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-2">PNG</h3>
      <p>
        PNG 使用無損壓縮（Lossless Compression），不會損失任何畫質。
        適合需要透明背景或銳利邊緣的圖片（如 Logo、截圖）。
        可以透過移除不必要的 metadata 和優化色彩深度來縮小。
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-2">WebP</h3>
      <p>
        Google 開發的現代格式，同時支援有損和無損壓縮。
        相比 JPG 可以縮小 25-34%，相比 PNG 可以縮小 26%，而且畫質相當。
        現在所有主流瀏覽器都支援 WebP。
      </p>

      <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">圖片壓縮實用技巧</h2>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-2">1. 選擇正確的格式</h3>
      <ul className="list-disc pl-6 space-y-2">
        <li>照片、風景 → 用 <strong>JPG</strong> 或 <strong>WebP</strong></li>
        <li>Logo、截圖、需要透明 → 用 <strong>PNG</strong> 或 <strong>WebP</strong></li>
        <li>網頁使用 → 盡量用 <strong>WebP</strong>（最小且品質好）</li>
      </ul>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-2">2. 先縮小尺寸，再壓縮</h3>
      <p>
        如果你的圖片是 4000×3000 像素，但網頁只需要 800×600，先用<Link href="/image/resize" className="text-pink-500 hover:text-pink-600 font-medium">圖片縮放工具</Link>縮小尺寸，
        再進行壓縮，可以得到最小的檔案大小。
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-2">3. 批次壓縮多張圖片</h3>
      <p>
        需要處理大量圖片？<Link href="/image/compress" className="text-pink-500 hover:text-pink-600 font-medium">Mochi Tools 的圖片壓縮工具</Link>支援批次處理，
        一次拖入多張圖片，選擇壓縮程度，全部壓縮後打包下載。
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-2">4. 使用適當的壓縮程度</h3>
      <ul className="list-disc pl-6 space-y-2">
        <li><strong>輕度壓縮（品質 90%）</strong> — 適合攝影作品、產品圖片，畫質幾乎不變</li>
        <li><strong>推薦壓縮（品質 75%）</strong> — 適合一般網頁圖片，畫質與大小的最佳平衡</li>
        <li><strong>最大壓縮（品質 50%）</strong> — 適合縮圖、預覽圖，追求最小檔案大小</li>
      </ul>

      <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">格式轉換也是壓縮的一環</h2>
      <p>
        有時候最有效的「壓縮」就是轉換格式。例如：
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>PNG 截圖轉成 JPG → <Link href="/convert/png-to-jpg" className="text-pink-500 hover:text-pink-600 font-medium">PNG 轉 JPG</Link></li>
        <li>JPG 照片轉成 WebP → <Link href="/convert/jpg-to-webp" className="text-pink-500 hover:text-pink-600 font-medium">JPG 轉 WebP</Link></li>
        <li>PNG 圖片轉成 WebP → <Link href="/convert/png-to-webp" className="text-pink-500 hover:text-pink-600 font-medium">PNG 轉 WebP</Link></li>
      </ul>

      <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">推薦工具</h2>
      <p>
        <Link href="/image/compress" className="text-pink-500 hover:text-pink-600 font-medium">Mochi Tools 圖片壓縮</Link>是一個免費的線上工具，具備以下特點：
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>支援 JPG、PNG、WebP 格式</li>
        <li>三段壓縮程度可選</li>
        <li>批次處理多張圖片</li>
        <li>全部在瀏覽器本地處理，不上傳伺服器</li>
        <li>壓縮後可以預覽並一鍵下載</li>
      </ul>

      <div className="bg-pink-50 border-2 border-pink-200 rounded-2xl p-5 mt-8">
        <p className="font-bold text-gray-800 mb-2">馬上試試！</p>
        <p className="text-sm text-gray-600">
          前往 <Link href="/image/compress" className="text-pink-500 hover:text-pink-600 font-medium">圖片壓縮工具</Link>，
          拖入圖片即可開始壓縮。完全免費、不需要註冊。
        </p>
      </div>
    </>
  );
}

export function ImageCompressionGuideEn() {
  return (
    <>
      <p>
        Website loading too slowly? Social media uploads failing? Often the culprit is oversized image files.
        This complete guide teaches you how to compress images — significantly reducing file size without sacrificing quality.
      </p>

      <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">Why Image Compression Matters</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li><strong>Faster page loads</strong> — Images typically account for 50%+ of total page weight; compression dramatically improves loading speed</li>
        <li><strong>Save storage space</strong> — Compressed photos in your library can free up significant storage</li>
        <li><strong>Easier sharing</strong> — Compressed images are easier to send via email, Slack, or messaging apps</li>
        <li><strong>Better SEO rankings</strong> — Google Core Web Vitals includes page load speed as a ranking factor</li>
      </ul>

      <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">How Image Compression Works by Format</h2>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-2">JPG / JPEG</h3>
      <p>
        JPG uses lossy compression, discarding details imperceptible to the human eye.
        A quality setting of 80-85% is typically the sweet spot — significantly smaller files with virtually no visible quality loss.
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-2">PNG</h3>
      <p>
        PNG uses lossless compression, preserving every detail.
        Ideal for images requiring transparency or sharp edges (logos, screenshots).
        Can be reduced by removing unnecessary metadata and optimizing color depth.
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-2">WebP</h3>
      <p>
        A modern format developed by Google, supporting both lossy and lossless compression.
        25-34% smaller than JPG and 26% smaller than PNG at comparable quality.
        Now supported by all major browsers.
      </p>

      <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">Practical Image Compression Tips</h2>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-2">1. Choose the Right Format</h3>
      <ul className="list-disc pl-6 space-y-2">
        <li>Photos, landscapes → Use <strong>JPG</strong> or <strong>WebP</strong></li>
        <li>Logos, screenshots, transparency needed → Use <strong>PNG</strong> or <strong>WebP</strong></li>
        <li>Web usage → Prefer <strong>WebP</strong> (smallest with great quality)</li>
      </ul>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-2">2. Resize First, Then Compress</h3>
      <p>
        If your image is 4000×3000 pixels but only needs to be 800×600 on a webpage,
        use the <Link href="/image/resize" className="text-pink-500 hover:text-pink-600 font-medium">Image Resize tool</Link> first,
        then compress for the smallest possible file size.
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-2">3. Batch Compress Multiple Images</h3>
      <p>
        Need to process many images? <Link href="/image/compress" className="text-pink-500 hover:text-pink-600 font-medium">Mochi Tools Image Compression</Link> supports
        batch processing — drag in multiple images, choose compression level, and download all at once.
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-2">4. Use the Right Compression Level</h3>
      <ul className="list-disc pl-6 space-y-2">
        <li><strong>Light (Quality 90%)</strong> — For photography, product images; nearly lossless quality</li>
        <li><strong>Recommended (Quality 75%)</strong> — For general web images; best balance of quality and size</li>
        <li><strong>Maximum (Quality 50%)</strong> — For thumbnails, previews; smallest file size</li>
      </ul>

      <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">Format Conversion as Compression</h2>
      <p>
        Sometimes the most effective &quot;compression&quot; is simply converting formats:
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>PNG screenshots to JPG → <Link href="/convert/png-to-jpg" className="text-pink-500 hover:text-pink-600 font-medium">PNG to JPG</Link></li>
        <li>JPG photos to WebP → <Link href="/convert/jpg-to-webp" className="text-pink-500 hover:text-pink-600 font-medium">JPG to WebP</Link></li>
        <li>PNG images to WebP → <Link href="/convert/png-to-webp" className="text-pink-500 hover:text-pink-600 font-medium">PNG to WebP</Link></li>
      </ul>

      <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">Recommended Tool</h2>
      <p>
        <Link href="/image/compress" className="text-pink-500 hover:text-pink-600 font-medium">Mochi Tools Image Compression</Link> is a free online tool featuring:
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>Support for JPG, PNG, WebP formats</li>
        <li>Three compression levels</li>
        <li>Batch processing for multiple images</li>
        <li>All processing done locally in your browser — no server uploads</li>
        <li>Preview and one-click download after compression</li>
      </ul>

      <div className="bg-pink-50 border-2 border-pink-200 rounded-2xl p-5 mt-8">
        <p className="font-bold text-gray-800 mb-2">Try it now!</p>
        <p className="text-sm text-gray-600">
          Visit <Link href="/image/compress" className="text-pink-500 hover:text-pink-600 font-medium">Image Compression tool</Link> and
          drag in your images to start compressing. Completely free, no registration needed.
        </p>
      </div>
    </>
  );
}
