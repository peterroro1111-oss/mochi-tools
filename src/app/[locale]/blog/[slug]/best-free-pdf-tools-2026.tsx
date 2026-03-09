import { Link } from '@/i18n/routing';

export function BestPdfToolsZh() {
  return (
    <>
      <p>
        2026 年，你還在為了處理 PDF 而下載各種軟體嗎？其實，現在已經有很多免費的線上 PDF 工具，
        可以直接在瀏覽器中完成合併、拆分、壓縮、加密等操作，而且完全不需要上傳檔案到伺服器。
      </p>

      <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">為什麼選擇線上 PDF 工具？</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li><strong>不用安裝軟體</strong> — 打開瀏覽器就能用，不佔電腦空間</li>
        <li><strong>跨平台使用</strong> — Windows、Mac、手機都能用</li>
        <li><strong>隱私安全</strong> — 最好的工具會在瀏覽器本地處理，檔案不離開你的電腦</li>
        <li><strong>完全免費</strong> — 不需要付費訂閱</li>
      </ul>

      <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">10 個最實用的免費 PDF 線上工具</h2>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-2">1. PDF 合併</h3>
      <p>
        需要把多個 PDF 合成一個？<Link href="/pdf/merge" className="text-pink-500 hover:text-pink-600 font-medium">Mochi Tools 的 PDF 合併工具</Link>支援拖曳排序，
        一鍵合併多個 PDF 檔案，而且完全在瀏覽器本地處理。
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-2">2. PDF 拆分</h3>
      <p>
        只需要 PDF 中的幾頁？使用<Link href="/pdf/split" className="text-pink-500 hover:text-pink-600 font-medium">PDF 拆分工具</Link>，
        輸入頁碼範圍（例如 1-3,5,7-9），快速擷取需要的頁面。
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-2">3. PDF 壓縮</h3>
      <p>
        PDF 檔案太大傳不出去？<Link href="/pdf/compress" className="text-pink-500 hover:text-pink-600 font-medium">PDF 壓縮工具</Link>可以移除多餘資料，
        大幅縮小檔案大小，方便透過 Email 或通訊軟體分享。
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-2">4. PDF 加密</h3>
      <p>
        機密文件需要保護？用<Link href="/pdf/encrypt" className="text-pink-500 hover:text-pink-600 font-medium">PDF 加密工具</Link>設定開啟密碼，
        防止未授權的人查看你的文件。
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-2">5. PDF 轉圖片</h3>
      <p>
        需要把 PDF 變成圖片分享？<Link href="/pdf/to-image" className="text-pink-500 hover:text-pink-600 font-medium">PDF 轉圖片工具</Link>支援
        PNG 和 JPG 格式，可調解析度，一鍵轉換所有頁面。
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-2">6. PDF 旋轉</h3>
      <p>
        掃描出來的 PDF 方向不對？<Link href="/pdf/rotate" className="text-pink-500 hover:text-pink-600 font-medium">PDF 旋轉工具</Link>支援
        90°、180°、270° 旋轉，快速修正頁面方向。
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-2">7. PDF 加頁碼</h3>
      <p>
        報告需要頁碼？<Link href="/pdf/page-numbers" className="text-pink-500 hover:text-pink-600 font-medium">PDF 加頁碼工具</Link>自動為每一頁加上頁碼，
        三種位置可選（底部置中、底部右側、頂部置中）。
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-2">8. PDF 浮水印</h3>
      <p>
        保護文件版權？<Link href="/pdf/watermark" className="text-pink-500 hover:text-pink-600 font-medium">PDF 浮水印工具</Link>可以加上文字浮水印，
        自訂字型大小、顏色、透明度和旋轉角度。
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-2">9. 圖片壓縮</h3>
      <p>
        PDF 裡面的圖片太大？可以先用<Link href="/image/compress" className="text-pink-500 hover:text-pink-600 font-medium">圖片壓縮工具</Link>壓縮圖片後再插入 PDF，
        有效減少最終檔案大小。
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-2">10. QR Code 產生器</h3>
      <p>
        需要在 PDF 中插入 QR Code？使用<Link href="/qrcode" className="text-pink-500 hover:text-pink-600 font-medium">QR Code 產生器</Link>快速生成，
        支援網址、Email、Wi-Fi 等多種類型。
      </p>

      <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">為什麼推薦 Mochi Tools？</h2>
      <p>
        <Link href="/" className="text-pink-500 hover:text-pink-600 font-medium">Mochi Tools</Link> 的所有 PDF 工具都有以下特點：
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li><strong>瀏覽器本地處理</strong> — 檔案不會上傳到任何伺服器，100% 隱私安全</li>
        <li><strong>完全免費</strong> — 不需要註冊帳號，沒有使用次數限制</li>
        <li><strong>手機也能用</strong> — 響應式設計，手機平板都能順暢使用</li>
        <li><strong>極速處理</strong> — 純前端運算，不需要等待伺服器回應</li>
      </ul>

      <div className="bg-pink-50 border-2 border-pink-200 rounded-2xl p-5 mt-8">
        <p className="font-bold text-gray-800 mb-2">立即試試看！</p>
        <p className="text-sm text-gray-600">
          前往 <Link href="/pdf" className="text-pink-500 hover:text-pink-600 font-medium">Mochi Tools PDF 工具頁</Link>，
          開始免費處理你的 PDF 檔案。
        </p>
      </div>
    </>
  );
}

export function BestPdfToolsEn() {
  return (
    <>
      <p>
        In 2026, are you still downloading software just to handle PDFs? There are now many free online PDF tools
        that can merge, split, compress, and encrypt directly in your browser — without uploading files to any server.
      </p>

      <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">Why Choose Online PDF Tools?</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li><strong>No installation needed</strong> — Works right in your browser, no storage used</li>
        <li><strong>Cross-platform</strong> — Works on Windows, Mac, and mobile devices</li>
        <li><strong>Privacy-first</strong> — The best tools process locally in your browser, files never leave your computer</li>
        <li><strong>Completely free</strong> — No paid subscriptions required</li>
      </ul>

      <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">10 Most Useful Free Online PDF Tools</h2>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-2">1. PDF Merge</h3>
      <p>
        Need to combine multiple PDFs into one? <Link href="/pdf/merge" className="text-pink-500 hover:text-pink-600 font-medium">Mochi Tools PDF Merge</Link> supports
        drag-and-drop reordering, one-click merging, and processes everything locally in your browser.
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-2">2. PDF Split</h3>
      <p>
        Only need specific pages? Use the <Link href="/pdf/split" className="text-pink-500 hover:text-pink-600 font-medium">PDF Split tool</Link> to
        enter page ranges (e.g., 1-3,5,7-9) and quickly extract the pages you need.
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-2">3. PDF Compress</h3>
      <p>
        PDF too large to send? The <Link href="/pdf/compress" className="text-pink-500 hover:text-pink-600 font-medium">PDF Compress tool</Link> removes
        redundant data to significantly reduce file size, making it easy to share via email or messaging apps.
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-2">4. PDF Encrypt</h3>
      <p>
        Need to protect confidential documents? Use <Link href="/pdf/encrypt" className="text-pink-500 hover:text-pink-600 font-medium">PDF Encrypt</Link> to
        set a password and prevent unauthorized access.
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-2">5. PDF to Image</h3>
      <p>
        Need to share PDF pages as images? <Link href="/pdf/to-image" className="text-pink-500 hover:text-pink-600 font-medium">PDF to Image</Link> supports
        PNG and JPG formats with adjustable resolution, converting all pages with one click.
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-2">6. PDF Rotate</h3>
      <p>
        Scanned PDF has wrong orientation? <Link href="/pdf/rotate" className="text-pink-500 hover:text-pink-600 font-medium">PDF Rotate</Link> supports
        90°, 180°, and 270° rotation to quickly fix page orientation.
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-2">7. PDF Page Numbers</h3>
      <p>
        Report needs page numbers? <Link href="/pdf/page-numbers" className="text-pink-500 hover:text-pink-600 font-medium">PDF Page Numbers</Link> automatically
        adds page numbers with three position options (bottom center, bottom right, top center).
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-2">8. PDF Watermark</h3>
      <p>
        Protect document copyright? <Link href="/pdf/watermark" className="text-pink-500 hover:text-pink-600 font-medium">PDF Watermark</Link> adds
        text watermarks with customizable font size, color, opacity, and rotation.
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-2">9. Image Compression</h3>
      <p>
        Images in your PDF too large? Use <Link href="/image/compress" className="text-pink-500 hover:text-pink-600 font-medium">Image Compression</Link> to
        compress images before inserting them into your PDF, effectively reducing the final file size.
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-2">10. QR Code Generator</h3>
      <p>
        Need a QR code for your PDF? Use the <Link href="/qrcode" className="text-pink-500 hover:text-pink-600 font-medium">QR Code Generator</Link> for
        quick creation, supporting URLs, email, Wi-Fi, and many more types.
      </p>

      <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">Why Mochi Tools?</h2>
      <p>
        All PDF tools on <Link href="/" className="text-pink-500 hover:text-pink-600 font-medium">Mochi Tools</Link> share these features:
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li><strong>Local browser processing</strong> — Files never upload to any server, 100% privacy</li>
        <li><strong>Completely free</strong> — No registration, no usage limits</li>
        <li><strong>Mobile friendly</strong> — Responsive design, works smoothly on phones and tablets</li>
        <li><strong>Lightning fast</strong> — Pure frontend processing, no server wait time</li>
      </ul>

      <div className="bg-pink-50 border-2 border-pink-200 rounded-2xl p-5 mt-8">
        <p className="font-bold text-gray-800 mb-2">Try it now!</p>
        <p className="text-sm text-gray-600">
          Visit <Link href="/pdf" className="text-pink-500 hover:text-pink-600 font-medium">Mochi Tools PDF page</Link> and
          start processing your PDFs for free.
        </p>
      </div>
    </>
  );
}
