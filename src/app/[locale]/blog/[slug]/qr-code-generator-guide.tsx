import { Link } from '@/i18n/routing';

export function QrCodeGeneratorGuideZh() {
  return (
    <>
      <p className="text-gray-600 leading-relaxed mb-4">
        想像一下這個場景：你剛開了一家小咖啡店，想讓客人掃碼就能看到菜單，不用再印一堆紙本菜單。
        或者你是一位自由接案者，想把自己的 LinkedIn、作品集、LINE 帳號通通做成一張 QR Code 名片，
        遞出去的時候超方便。又或者你正在辦一場活動，需要讓參加者掃碼填寫報名表單。
      </p>
      <p className="text-gray-600 leading-relaxed mb-4">
        不管是哪種情境，你都需要一個好用的 <strong className="text-gray-800">QR Code 產生器</strong>。
        好消息是，製作 QR Code 其實超簡單，完全不需要任何設計或技術背景！
        這篇文章會手把手教你如何免費製作 QR Code，從基礎知識到進階技巧一次搞定 🎯
      </p>

      {/* Section 1: What is QR Code */}
      <h2 id="what-is-qrcode" className="text-2xl font-bold text-gray-800 mt-10 mb-4">什麼是 QR Code？</h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        QR Code 的全名是 Quick Response Code（快速回應碼），是一種二維條碼。跟傳統的一維條碼（就是超市商品上那種直線條碼）不同，
        QR Code 可以在水平和垂直兩個方向上儲存資訊，因此能夠容納更多的資料 📊
      </p>
      <p className="text-gray-600 leading-relaxed mb-4">
        QR Code 最早是 1994 年由日本 Denso Wave 公司發明的，原本是用在汽車零件的追蹤管理。
        但因為它使用方便、掃描速度快，很快就被廣泛應用在各種場景中。
        現在你只要用手機相機對準 QR Code 一掃，就能立刻打開網頁、加好友、連 WiFi，超級方便！
      </p>
      <p className="text-gray-600 leading-relaxed mb-4">
        一個標準的 QR Code 最多可以儲存 <strong className="text-gray-800">7,089 個數字</strong> 或{' '}
        <strong className="text-gray-800">4,296 個英數字元</strong>。
        而且 QR Code 有內建的錯誤修正功能，即使部分被遮住或損壞，仍然能正常掃描讀取，可靠度非常高 ✅
      </p>

      {/* Section 2: QR Code Types */}
      <h2 id="qrcode-types" className="text-2xl font-bold text-gray-800 mt-10 mb-4">QR Code 可以包含哪些內容？</h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        很多人以為 QR Code 只能放網址，其實它可以包含各式各樣的內容！
        以下是最常見的幾種 QR Code 類型：
      </p>

      <h3 id="url-type" className="text-lg font-bold text-gray-700 mt-6 mb-3">🔗 網址（URL）</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        這是最常見的用法。掃描後會直接在瀏覽器中打開指定的網頁。
        適合用在行銷活動、產品包裝、名片等場景，讓使用者一掃就能到達你的網站、社群頁面或活動頁面。
      </p>

      <h3 id="text-type" className="text-lg font-bold text-gray-700 mt-6 mb-3">📝 純文字</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        QR Code 也可以儲存一段純文字。掃描後會在裝置上顯示文字內容。
        適合用在需要傳遞簡短訊息、通關密語、序號等場景。
      </p>

      <h3 id="wifi-type" className="text-lg font-bold text-gray-700 mt-6 mb-3">📶 WiFi 連線資訊</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        這個超實用！你可以把 WiFi 的名稱和密碼做成 QR Code，
        客人到你店裡只要一掃就能自動連上 WiFi，再也不用到處貼密碼了。
        支援 WPA、WPA2、WEP 等加密方式。
      </p>

      <h3 id="vcard-type" className="text-lg font-bold text-gray-700 mt-6 mb-3">👤 vCard 電子名片</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        把你的聯絡資訊（姓名、電話、Email、公司、職稱、地址等）做成 QR Code。
        對方掃描後可以直接將你的資訊存入手機通訊錄，省去手動輸入的麻煩。
        在商務場合非常實用！
      </p>

      <h3 id="email-type" className="text-lg font-bold text-gray-700 mt-6 mb-3">📧 Email</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        掃描後會自動打開 Email 應用程式，並預先填好收件人地址、主旨和內容。
        適合用在客服、意見回饋、活動報名等場景。
      </p>

      <h3 id="phone-type" className="text-lg font-bold text-gray-700 mt-6 mb-3">📞 電話號碼</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        掃描後會直接撥打指定的電話號碼。
        適合放在廣告、傳單、名片上，讓客人一掃就能打電話給你。
      </p>

      {/* Section 3: Type Comparison Table */}
      <h2 id="type-comparison" className="text-2xl font-bold text-gray-800 mt-10 mb-4">QR Code 類型比較表</h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        下面這張表格幫你快速了解各種 QR Code 類型的特色和適用場景：
      </p>

      <div className="overflow-x-auto my-6">
        <table className="w-full border-collapse border border-gray-200 text-sm">
          <thead>
            <tr>
              <th className="bg-pink-50 border border-gray-200 px-4 py-2 text-left">類型</th>
              <th className="bg-pink-50 border border-gray-200 px-4 py-2 text-left">內容</th>
              <th className="bg-pink-50 border border-gray-200 px-4 py-2 text-left">掃描後動作</th>
              <th className="bg-pink-50 border border-gray-200 px-4 py-2 text-left">適用場景</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-200 px-4 py-2">URL</td>
              <td className="border border-gray-200 px-4 py-2">網址連結</td>
              <td className="border border-gray-200 px-4 py-2">打開瀏覽器前往網頁</td>
              <td className="border border-gray-200 px-4 py-2">行銷活動、產品頁面、社群連結</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2">純文字</td>
              <td className="border border-gray-200 px-4 py-2">文字訊息</td>
              <td className="border border-gray-200 px-4 py-2">顯示文字內容</td>
              <td className="border border-gray-200 px-4 py-2">通關密語、序號、備忘錄</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2">WiFi</td>
              <td className="border border-gray-200 px-4 py-2">WiFi 名稱 + 密碼</td>
              <td className="border border-gray-200 px-4 py-2">自動連接 WiFi</td>
              <td className="border border-gray-200 px-4 py-2">餐廳、飯店、辦公室、民宿</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2">vCard</td>
              <td className="border border-gray-200 px-4 py-2">聯絡人資訊</td>
              <td className="border border-gray-200 px-4 py-2">儲存到通訊錄</td>
              <td className="border border-gray-200 px-4 py-2">名片、商務交流、活動</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2">Email</td>
              <td className="border border-gray-200 px-4 py-2">Email 地址 + 主旨</td>
              <td className="border border-gray-200 px-4 py-2">打開郵件應用程式</td>
              <td className="border border-gray-200 px-4 py-2">客服、意見回饋、報名</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2">電話</td>
              <td className="border border-gray-200 px-4 py-2">電話號碼</td>
              <td className="border border-gray-200 px-4 py-2">撥打電話</td>
              <td className="border border-gray-200 px-4 py-2">廣告、傳單、緊急聯繫</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2">SMS</td>
              <td className="border border-gray-200 px-4 py-2">電話號碼 + 訊息</td>
              <td className="border border-gray-200 px-4 py-2">打開簡訊應用程式</td>
              <td className="border border-gray-200 px-4 py-2">行銷簡訊、客服</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-4 my-6">
        <p className="font-bold text-emerald-600 mb-2">💡 提示</p>
        <p className="text-gray-600">
          如果你不確定該選哪種類型，URL 類型是最萬用的選擇。你可以把任何內容放在網頁上，
          然後用 QR Code 連結到那個網頁。這樣日後要更新內容時，只需要修改網頁，不需要重新製作 QR Code。
        </p>
      </div>

      {/* Section 4: Step by Step Guide */}
      <h2 id="step-by-step" className="text-2xl font-bold text-gray-800 mt-10 mb-4">用 Mochi Tools 製作 QR Code（詳細教學）</h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        接下來我們用{' '}
        <Link href="/qrcode" className="text-pink-500 hover:text-pink-600 font-medium underline decoration-pink-300/40 hover:decoration-pink-600">Mochi Tools QR Code 產生器</Link>{' '}
        來實際操作一次。整個過程不到一分鐘，完全免費，而且不需要註冊帳號！🚀
      </p>

      <h3 id="step1" className="text-lg font-bold text-gray-700 mt-6 mb-3">步驟一：打開 QR Code 產生器</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        前往{' '}
        <Link href="/qrcode" className="text-pink-500 hover:text-pink-600 font-medium underline decoration-pink-300/40 hover:decoration-pink-600">Mochi Tools 的 QR Code 產生器頁面</Link>。
        你會看到一個簡潔的介面，所有功能一目瞭然，完全不需要花時間摸索。
      </p>

      <h3 id="step2" className="text-lg font-bold text-gray-700 mt-6 mb-3">步驟二：選擇 QR Code 類型</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        根據你要做的內容，選擇對應的類型。最常見的是 URL（網址），但你也可以選擇文字、WiFi、vCard 等。
        選好類型後，介面會自動切換到對應的輸入欄位。
      </p>

      <h3 id="step3" className="text-lg font-bold text-gray-700 mt-6 mb-3">步驟三：輸入內容</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        把你要編碼的內容填進去。如果是網址，就貼上你的連結（記得要包含 https://）；
        如果是 WiFi，就填入 WiFi 名稱和密碼；如果是 vCard，就填入你的聯絡資訊。
        填完之後，QR Code 會即時預覽生成，讓你馬上看到效果 ⚡
      </p>

      <h3 id="step4" className="text-lg font-bold text-gray-700 mt-6 mb-3">步驟四：自訂外觀（選擇性）</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        想讓你的 QR Code 更有個性？你可以調整前景色和背景色，讓它符合你的品牌配色。
        不過要注意，前景色和背景色的對比度要夠高，否則可能會影響掃描成功率。
      </p>

      <h3 id="step5" className="text-lg font-bold text-gray-700 mt-6 mb-3">步驟五：下載 QR Code</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        確認 QR Code 沒問題後，點擊下載按鈕。建議下載 PNG 格式，適用於大多數場景。
        如果你需要放大印刷（例如製作海報），建議選擇 SVG 格式，因為它是向量圖，放大不會模糊。
      </p>

      <h3 id="step6" className="text-lg font-bold text-gray-700 mt-6 mb-3">步驟六：測試掃描</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        這一步非常重要！下載後請一定要用手機掃描測試，確認 QR Code 能正確開啟你預期的內容。
        建議用不同的手機和掃描 App 各測一次，確保相容性沒問題 📱
      </p>

      <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-4 my-6">
        <p className="font-bold text-emerald-600 mb-2">💡 提示</p>
        <p className="text-gray-600">
          Mochi Tools 的 QR Code 產生器完全在瀏覽器端運作，你輸入的資料不會上傳到任何伺服器，隱私安全有保障！
          而且完全免費、不限次數，想做幾個就做幾個 🎉
        </p>
      </div>

      {/* Section 5: Customize */}
      <h2 id="customize" className="text-2xl font-bold text-gray-800 mt-10 mb-4">自訂 QR Code 外觀</h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        雖然黑白的 QR Code 最為經典，但適當的自訂可以讓你的 QR Code 更有辨識度、更符合品牌形象。
        以下是一些自訂技巧：
      </p>

      <h3 id="color-customization" className="text-lg font-bold text-gray-700 mt-6 mb-3">🎨 顏色自訂</h3>
      <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
        <li><strong className="text-gray-800">前景色：</strong>QR Code 方塊的顏色。你可以改成品牌的主色調，例如深藍、深紅、深綠等。</li>
        <li><strong className="text-gray-800">背景色：</strong>QR Code 的底色。建議保持白色或淺色，以確保足夠的對比度。</li>
        <li><strong className="text-gray-800">對比度原則：</strong>前景色和背景色之間的對比度必須夠高。淺色前景 + 淺色背景是大忌！</li>
      </ul>

      <h3 id="size-customization" className="text-lg font-bold text-gray-700 mt-6 mb-3">📐 尺寸建議</h3>
      <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
        <li><strong className="text-gray-800">螢幕顯示：</strong>至少 200 x 200 像素以上</li>
        <li><strong className="text-gray-800">名片印刷：</strong>至少 2 x 2 公分（約 240 x 240 像素，300 DPI）</li>
        <li><strong className="text-gray-800">海報印刷：</strong>建議用 SVG 向量格式，可以無限放大而不失真</li>
        <li><strong className="text-gray-800">大型看板：</strong>掃描距離每增加 1 公尺，QR Code 至少要大 10 公分</li>
      </ul>

      <h3 id="error-correction" className="text-lg font-bold text-gray-700 mt-6 mb-3">🛡️ 錯誤修正等級</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        QR Code 有四種錯誤修正等級，等級越高，容錯能力越強，但 QR Code 也會越複雜（點越密）：
      </p>
      <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
        <li><strong className="text-gray-800">L（Low，7%）：</strong>適合螢幕顯示、乾淨環境</li>
        <li><strong className="text-gray-800">M（Medium，15%）：</strong>最常用的等級，適合大多數場景</li>
        <li><strong className="text-gray-800">Q（Quartile，25%）：</strong>適合印刷品、可能被部分遮蔽的情況</li>
        <li><strong className="text-gray-800">H（High，30%）：</strong>適合在 QR Code 中間加 Logo，或惡劣環境</li>
      </ul>

      {/* Section 6: Use Cases */}
      <h2 id="use-cases" className="text-2xl font-bold text-gray-800 mt-10 mb-4">QR Code 實用場景</h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        QR Code 的應用場景真的非常廣泛，以下分成商業用途和個人用途來介紹：
      </p>

      <h3 id="business" className="text-lg font-bold text-gray-700 mt-6 mb-3">🏢 商業用途</h3>
      <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
        <li><strong className="text-gray-800">餐廳電子菜單：</strong>桌上貼一個 QR Code，客人掃碼看菜單。省印刷費，改菜單也超方便，改網頁就好。</li>
        <li><strong className="text-gray-800">店面 WiFi：</strong>把 WiFi 密碼做成 QR Code 貼在牆上，客人掃碼就能連線，不用再一個字一個字念密碼。</li>
        <li><strong className="text-gray-800">行動支付：</strong>收款碼是 QR Code 最成功的商業應用之一，LINE Pay、街口支付等都使用 QR Code 收款。</li>
        <li><strong className="text-gray-800">產品包裝：</strong>在產品上印 QR Code，連結到使用說明、教學影片、產品註冊頁面等。</li>
        <li><strong className="text-gray-800">活動行銷：</strong>傳單、海報上放 QR Code，讓潛在客戶快速到達活動頁面或報名表單。</li>
        <li><strong className="text-gray-800">問卷調查：</strong>把 Google 表單的連結做成 QR Code，現場掃碼填寫問卷，收集意見超方便。</li>
      </ul>

      <h3 id="personal" className="text-lg font-bold text-gray-700 mt-6 mb-3">👤 個人用途</h3>
      <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
        <li><strong className="text-gray-800">個人名片：</strong>把你的 vCard 資訊做成 QR Code，印在名片上或設為手機桌布，交換聯絡方式超快速。</li>
        <li><strong className="text-gray-800">社群帳號：</strong>把 Instagram、Facebook、YouTube 頻道的連結做成 QR Code，方便別人追蹤你。</li>
        <li><strong className="text-gray-800">家用 WiFi：</strong>在家裡的客廳貼一個 WiFi QR Code，朋友來訪時掃碼就能上網。</li>
        <li><strong className="text-gray-800">婚禮邀請函：</strong>在請帖上印 QR Code，連結到婚禮網站或 Google 地圖位置。</li>
        <li><strong className="text-gray-800">履歷作品集：</strong>在紙本履歷上放個 QR Code，連結到你的線上作品集或 LinkedIn 頁面。</li>
      </ul>

      {/* Section 7: Best Practices */}
      <h2 id="best-practices" className="text-2xl font-bold text-gray-800 mt-10 mb-4">QR Code 最佳實踐</h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        要讓你的 QR Code 發揮最大效果，請牢記以下幾點：
      </p>

      <ol className="list-decimal pl-6 space-y-2 text-gray-600 mb-4">
        <li><strong className="text-gray-800">永遠要測試：</strong>製作完成後一定要實際掃描測試，確認內容正確。最好用不同品牌的手機各測一次。</li>
        <li><strong className="text-gray-800">保持足夠大小：</strong>太小的 QR Code 很難掃描成功。印刷品上至少要 2 x 2 公分。</li>
        <li><strong className="text-gray-800">確保對比度：</strong>深色圖案 + 淺色背景是最安全的組合。避免使用對比度低的配色。</li>
        <li><strong className="text-gray-800">周圍留白：</strong>QR Code 四周需要留出至少 4 個模組寬度的空白區域（quiet zone），否則可能影響掃描。</li>
        <li><strong className="text-gray-800">內容越短越好：</strong>QR Code 儲存的資料越少，生成的圖案越簡單，掃描成功率越高。盡量使用短網址。</li>
        <li><strong className="text-gray-800">提供掃描提示：</strong>在 QR Code 旁邊加上「掃描看菜單」「Scan to connect」之類的文字說明，引導使用者掃碼。</li>
        <li><strong className="text-gray-800">不要扭曲變形：</strong>QR Code 必須保持正方形，任何拉伸或壓縮都可能導致無法掃描。</li>
        <li><strong className="text-gray-800">選擇適當的錯誤修正等級：</strong>如果 QR Code 會印在可能被磨損的地方（例如地板貼紙），請使用較高的錯誤修正等級。</li>
      </ol>

      {/* Section 8: Size Guide */}
      <h2 id="size-guide" className="text-2xl font-bold text-gray-800 mt-10 mb-4">QR Code 尺寸指南</h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        QR Code 的大小應該根據使用場景和掃描距離來決定。以下是一份實用的尺寸參考表：
      </p>

      <div className="overflow-x-auto my-6">
        <table className="w-full border-collapse border border-gray-200 text-sm">
          <thead>
            <tr>
              <th className="bg-pink-50 border border-gray-200 px-4 py-2 text-left">使用場景</th>
              <th className="bg-pink-50 border border-gray-200 px-4 py-2 text-left">建議尺寸</th>
              <th className="bg-pink-50 border border-gray-200 px-4 py-2 text-left">掃描距離</th>
              <th className="bg-pink-50 border border-gray-200 px-4 py-2 text-left">建議格式</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-200 px-4 py-2">名片</td>
              <td className="border border-gray-200 px-4 py-2">2 x 2 公分</td>
              <td className="border border-gray-200 px-4 py-2">10-20 公分</td>
              <td className="border border-gray-200 px-4 py-2">PNG（300 DPI）</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2">傳單 / DM</td>
              <td className="border border-gray-200 px-4 py-2">3 x 3 公分</td>
              <td className="border border-gray-200 px-4 py-2">20-30 公分</td>
              <td className="border border-gray-200 px-4 py-2">PNG（300 DPI）</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2">桌面立牌</td>
              <td className="border border-gray-200 px-4 py-2">5 x 5 公分</td>
              <td className="border border-gray-200 px-4 py-2">30-50 公分</td>
              <td className="border border-gray-200 px-4 py-2">PNG / SVG</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2">海報</td>
              <td className="border border-gray-200 px-4 py-2">10 x 10 公分以上</td>
              <td className="border border-gray-200 px-4 py-2">1-2 公尺</td>
              <td className="border border-gray-200 px-4 py-2">SVG</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2">大型看板</td>
              <td className="border border-gray-200 px-4 py-2">30 x 30 公分以上</td>
              <td className="border border-gray-200 px-4 py-2">3-5 公尺</td>
              <td className="border border-gray-200 px-4 py-2">SVG</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2">螢幕顯示</td>
              <td className="border border-gray-200 px-4 py-2">200 x 200 像素以上</td>
              <td className="border border-gray-200 px-4 py-2">10-30 公分</td>
              <td className="border border-gray-200 px-4 py-2">PNG</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-4 my-6">
        <p className="font-bold text-emerald-600 mb-2">💡 提示</p>
        <p className="text-gray-600">
          一個簡單的經驗法則：QR Code 的邊長大約是掃描距離的 1/10。
          也就是說，如果你希望人們在 1 公尺外就能掃描，QR Code 至少要 10 x 10 公分。
        </p>
      </div>

      {/* Section 9: FAQ */}
      <h2 id="faq" className="text-2xl font-bold text-gray-800 mt-10 mb-4">常見問題 FAQ</h2>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3">Q1：QR Code 會過期嗎？</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        用{' '}
        <Link href="/qrcode" className="text-pink-500 hover:text-pink-600 font-medium underline decoration-pink-300/40 hover:decoration-pink-600">Mochi Tools</Link>{' '}
        等工具生成的靜態 QR Code 本身不會過期，它裡面的內容是永久編碼的。
        但如果你的 QR Code 連結到一個網頁，而那個網頁被關閉了，那掃描後就會顯示錯誤。
        所以要確保你連結的內容持續有效。
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3">Q2：QR Code 可以免費製作嗎？</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        當然可以！{' '}
        <Link href="/qrcode" className="text-pink-500 hover:text-pink-600 font-medium underline decoration-pink-300/40 hover:decoration-pink-600">Mochi Tools 的 QR Code 產生器</Link>{' '}
        完全免費，不限次數，不需要註冊帳號，也沒有浮水印。
        生成的 QR Code 可以自由使用在任何商業或個人用途上。
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3">Q3：QR Code 內容生成後可以修改嗎？</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        靜態 QR Code 生成後內容就固定了，無法修改。如果需要更改內容，就要重新製作一個新的 QR Code。
        如果你預期內容會頻繁更新（例如菜單），建議讓 QR Code 連結到一個你可以隨時修改的網頁，
        這樣只要更新網頁內容就好，QR Code 本身不需要改。
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3">Q4：掃描 QR Code 安全嗎？</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        QR Code 本身是安全的，它只是一種資料編碼方式。但你要注意掃描來路不明的 QR Code 時，
        不要隨意在打開的網頁上輸入個人資訊或密碼。就像你不會隨意點開陌生連結一樣，
        對 QR Code 也要保持同樣的警覺心。現代手機的掃碼功能通常會先顯示網址讓你確認，再決定是否開啟。
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3">Q5：手機沒有 QR Code 掃描器怎麼辦？</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        現在大部分的智慧型手機都內建 QR Code 掃描功能。iPhone 只要打開相機對準 QR Code 就會自動辨識；
        Android 手機大多也內建掃描功能（通常在相機或 Google Lens 中）。
        如果真的沒有，可以在應用商店搜尋「QR Code Scanner」下載免費的掃描 App。
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3">Q6：QR Code 可以印多小？</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        理論上，QR Code 最小可以印到 1 x 1 公分，但不建議這麼做，因為掃描成功率會大幅下降。
        建議最小尺寸為 2 x 2 公分，並確保印刷品質清晰。內容越複雜（資料越多），QR Code 就需要越大才能確保可掃描性。
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3">Q7：彩色 QR Code 可以正常掃描嗎？</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        可以！只要前景色和背景色之間有足夠的對比度就行。一般建議深色圖案 + 淺色背景的組合。
        要避免的是：淺色圖案 + 淺色背景、漸層色、彩虹色等低對比度配色。
        如果不確定，製作完後一定要用手機測試掃描。
      </p>

      {/* Section 10: Conclusion */}
      <h2 id="conclusion" className="text-2xl font-bold text-gray-800 mt-10 mb-4">結論</h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        QR Code 是一項簡單卻強大的技術，無論你是經營商家、舉辦活動，還是想在日常生活中更方便地分享資訊，
        QR Code 都能派上用場。製作 QR Code 完全不需要技術背景，只要幾個簡單的步驟就能搞定。
      </p>
      <p className="text-gray-600 leading-relaxed mb-4">
        現在就試試{' '}
        <Link href="/qrcode" className="text-pink-500 hover:text-pink-600 font-medium underline decoration-pink-300/40 hover:decoration-pink-600">Mochi Tools 的免費 QR Code 產生器</Link>，
        幾秒鐘就能做出你的第一個 QR Code！不管是店面菜單、WiFi 密碼、個人名片還是活動報名連結，
        通通都能輕鬆搞定 🎉
      </p>
      <p className="text-gray-600 leading-relaxed mb-4">
        記住幾個關鍵原則：保持足夠大小、確保高對比度、一定要測試掃描、內容越簡短越好。
        掌握這些，你就能做出既美觀又好用的 QR Code！
      </p>

      <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-4 my-6">
        <p className="font-bold text-emerald-600 mb-2">💡 提示</p>
        <p className="text-gray-600">
          收藏{' '}
          <Link href="/qrcode" className="text-pink-500 hover:text-pink-600 font-medium underline decoration-pink-300/40 hover:decoration-pink-600">Mochi Tools QR Code 產生器</Link>{' '}
          到你的書籤列，下次需要製作 QR Code 時就能立刻使用，不用再搜尋工具了！
        </p>
      </div>
    </>
  );
}

export function QrCodeGeneratorGuideEn() {
  return (
    <>
      <p className="text-gray-600 leading-relaxed mb-4">
        Picture this: you just opened a cozy little cafe and want customers to scan a code to see your menu
        instead of printing stacks of paper menus. Or maybe you are a freelancer who wants to turn your
        LinkedIn profile, portfolio, and contact info into a single QR Code business card. Perhaps you are
        organizing an event and need attendees to scan a code to register.
      </p>
      <p className="text-gray-600 leading-relaxed mb-4">
        Whatever the scenario, you need a reliable <strong className="text-gray-800">QR Code generator</strong>.
        The good news? Creating a QR Code is incredibly simple, completely free, and requires zero design
        or technical skills. This guide walks you through everything from the basics to advanced tips,
        so you can create perfect QR Codes every time.
      </p>

      {/* Section 1: What is QR Code */}
      <h2 id="what-is-qrcode-en" className="text-2xl font-bold text-gray-800 mt-10 mb-4">What is a QR Code?</h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        QR Code stands for Quick Response Code. It is a type of two-dimensional barcode that can store
        information both horizontally and vertically, unlike traditional one-dimensional barcodes (the kind
        you see on grocery store products) that only encode data in one direction. This means QR Codes can
        hold significantly more data in a much smaller space.
      </p>
      <p className="text-gray-600 leading-relaxed mb-4">
        QR Codes were invented in 1994 by Denso Wave, a Japanese company, originally for tracking automotive
        parts during manufacturing. Thanks to their speed and ease of use, QR Codes quickly spread to
        countless other applications. Today, all you need is your smartphone camera to scan a QR Code and
        instantly open a webpage, connect to WiFi, add a contact, or perform many other actions.
      </p>
      <p className="text-gray-600 leading-relaxed mb-4">
        A standard QR Code can store up to <strong className="text-gray-800">7,089 numeric characters</strong> or{' '}
        <strong className="text-gray-800">4,296 alphanumeric characters</strong>. QR Codes also feature
        built-in error correction, which means they can still be scanned even if part of the code is
        damaged, obscured, or dirty. This makes them incredibly reliable for real-world use.
      </p>

      {/* Section 2: QR Code Types */}
      <h2 id="qrcode-types-en" className="text-2xl font-bold text-gray-800 mt-10 mb-4">What Can a QR Code Contain?</h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        Many people think QR Codes can only store website URLs, but they are actually far more versatile.
        Here are the most common types of QR Code content:
      </p>

      <h3 id="url-type-en" className="text-lg font-bold text-gray-700 mt-6 mb-3">URL (Website Link)</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        The most popular use case. When scanned, the QR Code opens a specific webpage in the user&apos;s browser.
        Perfect for marketing campaigns, product packaging, business cards, and event promotions.
      </p>

      <h3 id="text-type-en" className="text-lg font-bold text-gray-700 mt-6 mb-3">Plain Text</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        QR Codes can store plain text messages. When scanned, the text is displayed on the device.
        Useful for sharing short messages, passwords, serial numbers, or instructions.
      </p>

      <h3 id="wifi-type-en" className="text-lg font-bold text-gray-700 mt-6 mb-3">WiFi Network</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        This is an incredibly practical use case. You can encode your WiFi network name and password into
        a QR Code. Guests simply scan the code and their device automatically connects to your WiFi network.
        No more spelling out complicated passwords! Supports WPA, WPA2, and WEP encryption.
      </p>

      <h3 id="vcard-type-en" className="text-lg font-bold text-gray-700 mt-6 mb-3">vCard (Digital Business Card)</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        Encode your contact information (name, phone, email, company, title, address, etc.) into a QR Code.
        When someone scans it, they can save your details directly to their phone contacts with a single tap.
        This is a game-changer for networking events and business meetings.
      </p>

      <h3 id="email-type-en" className="text-lg font-bold text-gray-700 mt-6 mb-3">Email</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        Scanning the QR Code opens the user&apos;s email app with the recipient address, subject line, and
        body pre-filled. Great for customer service, feedback collection, and event registration.
      </p>

      <h3 id="phone-type-en" className="text-lg font-bold text-gray-700 mt-6 mb-3">Phone Number</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        The QR Code triggers a phone call to the specified number when scanned.
        Ideal for advertisements, flyers, and business cards where you want customers to reach you instantly.
      </p>

      {/* Section 3: Type Comparison Table */}
      <h2 id="type-comparison-en" className="text-2xl font-bold text-gray-800 mt-10 mb-4">QR Code Type Comparison</h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        Here is a quick reference table to help you choose the right QR Code type for your needs:
      </p>

      <div className="overflow-x-auto my-6">
        <table className="w-full border-collapse border border-gray-200 text-sm">
          <thead>
            <tr>
              <th className="bg-pink-50 border border-gray-200 px-4 py-2 text-left">Type</th>
              <th className="bg-pink-50 border border-gray-200 px-4 py-2 text-left">Content</th>
              <th className="bg-pink-50 border border-gray-200 px-4 py-2 text-left">Scan Action</th>
              <th className="bg-pink-50 border border-gray-200 px-4 py-2 text-left">Best For</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-200 px-4 py-2">URL</td>
              <td className="border border-gray-200 px-4 py-2">Website link</td>
              <td className="border border-gray-200 px-4 py-2">Opens browser to webpage</td>
              <td className="border border-gray-200 px-4 py-2">Marketing, product pages, social links</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2">Plain Text</td>
              <td className="border border-gray-200 px-4 py-2">Text message</td>
              <td className="border border-gray-200 px-4 py-2">Displays text content</td>
              <td className="border border-gray-200 px-4 py-2">Passwords, serial numbers, notes</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2">WiFi</td>
              <td className="border border-gray-200 px-4 py-2">Network name + password</td>
              <td className="border border-gray-200 px-4 py-2">Auto-connects to WiFi</td>
              <td className="border border-gray-200 px-4 py-2">Restaurants, hotels, offices, homes</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2">vCard</td>
              <td className="border border-gray-200 px-4 py-2">Contact information</td>
              <td className="border border-gray-200 px-4 py-2">Saves to phone contacts</td>
              <td className="border border-gray-200 px-4 py-2">Business cards, networking, events</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2">Email</td>
              <td className="border border-gray-200 px-4 py-2">Email address + subject</td>
              <td className="border border-gray-200 px-4 py-2">Opens email app</td>
              <td className="border border-gray-200 px-4 py-2">Support, feedback, registration</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2">Phone</td>
              <td className="border border-gray-200 px-4 py-2">Phone number</td>
              <td className="border border-gray-200 px-4 py-2">Initiates phone call</td>
              <td className="border border-gray-200 px-4 py-2">Ads, flyers, emergency contact</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2">SMS</td>
              <td className="border border-gray-200 px-4 py-2">Phone number + message</td>
              <td className="border border-gray-200 px-4 py-2">Opens messaging app</td>
              <td className="border border-gray-200 px-4 py-2">Marketing SMS, customer service</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-4 my-6">
        <p className="font-bold text-emerald-600 mb-2">💡 Tip</p>
        <p className="text-gray-600">
          Not sure which type to choose? URL is the most versatile option. You can put any content on a
          webpage and link to it via QR Code. This way, if you ever need to update the content, you just
          edit the webpage without creating a new QR Code.
        </p>
      </div>

      {/* Section 4: Step by Step Guide */}
      <h2 id="step-by-step-en" className="text-2xl font-bold text-gray-800 mt-10 mb-4">How to Create a QR Code with Mochi Tools (Step-by-Step)</h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        Let us walk through the process using the{' '}
        <Link href="/qrcode" className="text-pink-500 hover:text-pink-600 font-medium underline decoration-pink-300/40 hover:decoration-pink-600">Mochi Tools QR Code Generator</Link>.
        The whole process takes less than a minute, is completely free, and requires no account registration.
      </p>

      <h3 id="step1-en" className="text-lg font-bold text-gray-700 mt-6 mb-3">Step 1: Open the QR Code Generator</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        Head over to the{' '}
        <Link href="/qrcode" className="text-pink-500 hover:text-pink-600 font-medium underline decoration-pink-300/40 hover:decoration-pink-600">Mochi Tools QR Code Generator page</Link>.
        You will see a clean, intuitive interface with all the options clearly laid out. No learning curve required.
      </p>

      <h3 id="step2-en" className="text-lg font-bold text-gray-700 mt-6 mb-3">Step 2: Choose Your QR Code Type</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        Select the type of QR Code you want to create based on your content. The most common choice is URL,
        but you can also choose from text, WiFi, vCard, email, phone, and more. The interface will
        automatically update to show the relevant input fields for your selected type.
      </p>

      <h3 id="step3-en" className="text-lg font-bold text-gray-700 mt-6 mb-3">Step 3: Enter Your Content</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        Fill in the information you want to encode. For a URL, paste your full link (make sure to include
        https://). For WiFi, enter the network name and password. For vCard, fill in your contact details.
        As you type, the QR Code preview updates in real-time so you can see the result instantly.
      </p>

      <h3 id="step4-en" className="text-lg font-bold text-gray-700 mt-6 mb-3">Step 4: Customize the Appearance (Optional)</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        Want your QR Code to stand out? You can customize the foreground and background colors to match
        your brand identity. Just make sure to maintain high contrast between the two colors, as low
        contrast can make the code difficult or impossible to scan.
      </p>

      <h3 id="step5-en" className="text-lg font-bold text-gray-700 mt-6 mb-3">Step 5: Download Your QR Code</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        Once you are happy with your QR Code, click the download button. PNG format works great for most
        use cases. If you need to print the QR Code at a large size (such as on a poster or banner),
        choose SVG format instead, as it is a vector format that scales to any size without losing quality.
      </p>

      <h3 id="step6-en" className="text-lg font-bold text-gray-700 mt-6 mb-3">Step 6: Test Your QR Code</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        This step is critical. After downloading, always scan your QR Code with a real smartphone to
        verify it works correctly and leads to the right content. Test with different phones and scanning
        apps if possible to ensure broad compatibility.
      </p>

      <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-4 my-6">
        <p className="font-bold text-emerald-600 mb-2">💡 Tip</p>
        <p className="text-gray-600">
          The Mochi Tools QR Code Generator runs entirely in your browser. Your data is never uploaded to
          any server, ensuring your privacy and security. It is completely free, with no limits on the
          number of QR Codes you can create.
        </p>
      </div>

      {/* Section 5: Customize */}
      <h2 id="customize-en" className="text-2xl font-bold text-gray-800 mt-10 mb-4">Customizing Your QR Code</h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        While classic black-and-white QR Codes are perfectly functional, customization can make your codes
        more recognizable and aligned with your brand. Here are some customization techniques to consider:
      </p>

      <h3 id="color-customization-en" className="text-lg font-bold text-gray-700 mt-6 mb-3">Color Customization</h3>
      <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
        <li><strong className="text-gray-800">Foreground color:</strong> The color of the QR Code modules (squares). You can change this to match your brand colors, such as dark blue, dark red, or dark green.</li>
        <li><strong className="text-gray-800">Background color:</strong> The base color behind the modules. Keep this white or a light color to ensure adequate contrast.</li>
        <li><strong className="text-gray-800">Contrast rule:</strong> The contrast between foreground and background must be high. Light foreground on light background is a recipe for scanning failure.</li>
      </ul>

      <h3 id="size-customization-en" className="text-lg font-bold text-gray-700 mt-6 mb-3">Size Recommendations</h3>
      <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
        <li><strong className="text-gray-800">Screen display:</strong> At least 200 x 200 pixels</li>
        <li><strong className="text-gray-800">Business card:</strong> At least 2 x 2 cm (approximately 240 x 240 pixels at 300 DPI)</li>
        <li><strong className="text-gray-800">Poster printing:</strong> Use SVG vector format for unlimited scaling without quality loss</li>
        <li><strong className="text-gray-800">Large signage:</strong> For every additional meter of scanning distance, increase QR Code size by about 10 cm</li>
      </ul>

      <h3 id="error-correction-en" className="text-lg font-bold text-gray-700 mt-6 mb-3">Error Correction Levels</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        QR Codes have four error correction levels. Higher levels provide more resilience against damage
        but result in a denser, more complex pattern:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
        <li><strong className="text-gray-800">L (Low, 7%):</strong> Best for screen display and clean environments</li>
        <li><strong className="text-gray-800">M (Medium, 15%):</strong> The most commonly used level, suitable for most situations</li>
        <li><strong className="text-gray-800">Q (Quartile, 25%):</strong> Good for printed materials that might get partially covered</li>
        <li><strong className="text-gray-800">H (High, 30%):</strong> Best when adding a logo to the center of the QR Code or for harsh environments</li>
      </ul>

      {/* Section 6: Use Cases */}
      <h2 id="use-cases-en" className="text-2xl font-bold text-gray-800 mt-10 mb-4">Practical QR Code Use Cases</h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        QR Codes are incredibly versatile. Here are some of the most popular use cases, organized by
        business and personal applications:
      </p>

      <h3 id="business-en" className="text-lg font-bold text-gray-700 mt-6 mb-3">Business Applications</h3>
      <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
        <li><strong className="text-gray-800">Digital menus:</strong> Place a QR Code on each table so customers can scan to view the menu. Saves printing costs and makes menu updates effortless since you only need to update the webpage.</li>
        <li><strong className="text-gray-800">Guest WiFi:</strong> Create a WiFi QR Code and display it in your store. Customers scan and connect instantly without having to type in a complicated password.</li>
        <li><strong className="text-gray-800">Mobile payments:</strong> QR Code-based payment systems are among the most successful commercial applications, used by services like PayPal, Venmo, and various regional payment platforms.</li>
        <li><strong className="text-gray-800">Product packaging:</strong> Print QR Codes on products linking to user manuals, tutorial videos, warranty registration, or product authentication pages.</li>
        <li><strong className="text-gray-800">Event marketing:</strong> Add QR Codes to flyers, posters, and banners that direct potential customers to event pages, registration forms, or promotional offers.</li>
        <li><strong className="text-gray-800">Surveys and feedback:</strong> Turn a Google Forms or survey link into a QR Code for on-site feedback collection at events, stores, or restaurants.</li>
      </ul>

      <h3 id="personal-en" className="text-lg font-bold text-gray-700 mt-6 mb-3">Personal Applications</h3>
      <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
        <li><strong className="text-gray-800">Personal business card:</strong> Encode your vCard into a QR Code, print it on your business card or set it as your phone wallpaper for lightning-fast contact sharing.</li>
        <li><strong className="text-gray-800">Social media profiles:</strong> Create QR Codes for your Instagram, Facebook, YouTube channel, or other social profiles so people can follow you with a quick scan.</li>
        <li><strong className="text-gray-800">Home WiFi:</strong> Post a WiFi QR Code in your living room so guests can get online without asking for the password.</li>
        <li><strong className="text-gray-800">Wedding invitations:</strong> Include a QR Code on your invitations that links to your wedding website, RSVP form, or Google Maps location.</li>
        <li><strong className="text-gray-800">Resume and portfolio:</strong> Add a QR Code to your printed resume that links to your online portfolio, LinkedIn profile, or personal website.</li>
      </ul>

      {/* Section 7: Best Practices */}
      <h2 id="best-practices-en" className="text-2xl font-bold text-gray-800 mt-10 mb-4">QR Code Best Practices</h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        Follow these guidelines to make sure your QR Codes work flawlessly every time:
      </p>

      <ol className="list-decimal pl-6 space-y-2 text-gray-600 mb-4">
        <li><strong className="text-gray-800">Always test:</strong> After creating your QR Code, scan it with a real phone to verify the content is correct. Test on multiple devices from different brands if possible.</li>
        <li><strong className="text-gray-800">Maintain adequate size:</strong> QR Codes that are too small are difficult to scan. For printed materials, keep the minimum size at 2 x 2 cm.</li>
        <li><strong className="text-gray-800">Ensure high contrast:</strong> Dark pattern on a light background is the safest combination. Avoid low-contrast color schemes at all costs.</li>
        <li><strong className="text-gray-800">Include a quiet zone:</strong> Leave at least 4 module widths of white space around the QR Code borders. Without this quiet zone, scanners may have trouble detecting the code.</li>
        <li><strong className="text-gray-800">Keep content short:</strong> The less data stored in the QR Code, the simpler the pattern and the higher the scan success rate. Use URL shorteners when possible.</li>
        <li><strong className="text-gray-800">Add a call to action:</strong> Place text near the QR Code like &quot;Scan for menu&quot; or &quot;Scan to connect&quot; to guide users on what to do.</li>
        <li><strong className="text-gray-800">Never distort:</strong> QR Codes must remain perfectly square. Any stretching, skewing, or compression can make them unscannable.</li>
        <li><strong className="text-gray-800">Choose appropriate error correction:</strong> If your QR Code will be printed on surfaces prone to wear (such as floor stickers), use a higher error correction level.</li>
      </ol>

      {/* Section 8: Size Guide */}
      <h2 id="size-guide-en" className="text-2xl font-bold text-gray-800 mt-10 mb-4">QR Code Size Guide</h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        The appropriate size for your QR Code depends on the use case and the expected scanning distance.
        Here is a practical reference table:
      </p>

      <div className="overflow-x-auto my-6">
        <table className="w-full border-collapse border border-gray-200 text-sm">
          <thead>
            <tr>
              <th className="bg-pink-50 border border-gray-200 px-4 py-2 text-left">Use Case</th>
              <th className="bg-pink-50 border border-gray-200 px-4 py-2 text-left">Recommended Size</th>
              <th className="bg-pink-50 border border-gray-200 px-4 py-2 text-left">Scan Distance</th>
              <th className="bg-pink-50 border border-gray-200 px-4 py-2 text-left">Recommended Format</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-200 px-4 py-2">Business card</td>
              <td className="border border-gray-200 px-4 py-2">2 x 2 cm</td>
              <td className="border border-gray-200 px-4 py-2">10-20 cm</td>
              <td className="border border-gray-200 px-4 py-2">PNG (300 DPI)</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2">Flyer / Brochure</td>
              <td className="border border-gray-200 px-4 py-2">3 x 3 cm</td>
              <td className="border border-gray-200 px-4 py-2">20-30 cm</td>
              <td className="border border-gray-200 px-4 py-2">PNG (300 DPI)</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2">Table tent</td>
              <td className="border border-gray-200 px-4 py-2">5 x 5 cm</td>
              <td className="border border-gray-200 px-4 py-2">30-50 cm</td>
              <td className="border border-gray-200 px-4 py-2">PNG / SVG</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2">Poster</td>
              <td className="border border-gray-200 px-4 py-2">10 x 10 cm+</td>
              <td className="border border-gray-200 px-4 py-2">1-2 meters</td>
              <td className="border border-gray-200 px-4 py-2">SVG</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2">Large banner</td>
              <td className="border border-gray-200 px-4 py-2">30 x 30 cm+</td>
              <td className="border border-gray-200 px-4 py-2">3-5 meters</td>
              <td className="border border-gray-200 px-4 py-2">SVG</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2">Screen display</td>
              <td className="border border-gray-200 px-4 py-2">200 x 200 px+</td>
              <td className="border border-gray-200 px-4 py-2">10-30 cm</td>
              <td className="border border-gray-200 px-4 py-2">PNG</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-4 my-6">
        <p className="font-bold text-emerald-600 mb-2">💡 Tip</p>
        <p className="text-gray-600">
          A simple rule of thumb: the QR Code side length should be roughly 1/10 of the scanning distance.
          So if you want people to scan from 1 meter away, your QR Code should be at least 10 x 10 cm.
        </p>
      </div>

      {/* Section 9: FAQ */}
      <h2 id="faq-en" className="text-2xl font-bold text-gray-800 mt-10 mb-4">Frequently Asked Questions</h2>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3">Q1: Do QR Codes expire?</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        Static QR Codes generated with tools like{' '}
        <Link href="/qrcode" className="text-pink-500 hover:text-pink-600 font-medium underline decoration-pink-300/40 hover:decoration-pink-600">Mochi Tools</Link>{' '}
        never expire. The data is permanently encoded in the pattern itself. However, if your QR Code
        links to a webpage and that page is taken down, scanning the code will lead to an error. Make sure
        the linked content remains accessible for as long as you plan to use the QR Code.
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3">Q2: Can I create QR Codes for free?</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        Absolutely! The{' '}
        <Link href="/qrcode" className="text-pink-500 hover:text-pink-600 font-medium underline decoration-pink-300/40 hover:decoration-pink-600">Mochi Tools QR Code Generator</Link>{' '}
        is completely free with no limits on usage, no account registration required, and no watermarks on
        your generated codes. You can use them freely for both commercial and personal purposes.
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3">Q3: Can I edit a QR Code after creating it?</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        Static QR Codes cannot be edited once generated. If you need to change the content, you will need
        to create a new QR Code. If you anticipate frequent updates (like a restaurant menu), the best
        strategy is to have your QR Code link to a webpage that you can update anytime. That way, the
        QR Code stays the same while the content it points to can change freely.
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3">Q4: Is scanning QR Codes safe?</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        QR Codes themselves are perfectly safe since they are simply a data encoding format. However, you
        should be cautious when scanning QR Codes from unknown sources. Never enter personal information
        or passwords on a webpage opened via an unfamiliar QR Code. Modern smartphones will display the
        URL before opening it, giving you a chance to verify the destination before proceeding.
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3">Q5: What if my phone does not have a QR Code scanner?</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        Most modern smartphones have built-in QR Code scanning. On iPhone, simply open the Camera app and
        point it at the QR Code. Most Android phones also include native scanning in the camera app or
        through Google Lens. If your device does not have built-in support, you can download a free QR Code
        scanner app from the App Store or Google Play Store.
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3">Q6: How small can a QR Code be printed?</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        Technically, a QR Code can be printed as small as 1 x 1 cm, but this is not recommended because
        the scan success rate drops significantly. The minimum recommended size is 2 x 2 cm with clear
        print quality. Keep in mind that more complex QR Codes (those encoding more data) need to be
        larger to remain scannable.
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3">Q7: Can colored QR Codes be scanned successfully?</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        Yes, as long as there is sufficient contrast between the foreground and background colors. The
        general rule is to use a dark foreground on a light background. Avoid combinations like light
        foreground on light background, gradient colors, or rainbow patterns that reduce contrast. If you
        are unsure whether your color scheme works, always test by scanning with a real phone.
      </p>

      {/* Section 10: Conclusion */}
      <h2 id="conclusion-en" className="text-2xl font-bold text-gray-800 mt-10 mb-4">Conclusion</h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        QR Codes are a simple yet powerful technology that can benefit anyone, whether you run a business,
        organize events, or just want a more convenient way to share information in your daily life.
        Creating a QR Code requires no technical expertise and takes just a few simple steps.
      </p>
      <p className="text-gray-600 leading-relaxed mb-4">
        Ready to get started? Try the{' '}
        <Link href="/qrcode" className="text-pink-500 hover:text-pink-600 font-medium underline decoration-pink-300/40 hover:decoration-pink-600">Mochi Tools free QR Code Generator</Link>{' '}
        right now and create your first QR Code in seconds. Whether it is a restaurant menu, WiFi password,
        digital business card, or event registration link, you can have it ready in no time.
      </p>
      <p className="text-gray-600 leading-relaxed mb-4">
        Remember the key principles: maintain adequate size, ensure high contrast, always test your codes,
        and keep the encoded content as short as possible. Follow these guidelines and you will create
        QR Codes that are both visually appealing and reliably functional every single time.
      </p>

      <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-4 my-6">
        <p className="font-bold text-emerald-600 mb-2">💡 Tip</p>
        <p className="text-gray-600">
          Bookmark the{' '}
          <Link href="/qrcode" className="text-pink-500 hover:text-pink-600 font-medium underline decoration-pink-300/40 hover:decoration-pink-600">Mochi Tools QR Code Generator</Link>{' '}
          so you can access it instantly the next time you need to create a QR Code. No more searching for
          tools when you need one in a hurry.
        </p>
      </div>
    </>
  );
}
