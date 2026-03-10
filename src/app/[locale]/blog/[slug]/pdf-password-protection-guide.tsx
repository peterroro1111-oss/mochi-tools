import { Link } from '@/i18n/routing';

export function PdfPasswordProtectionGuideZh() {
  return (
    <>
      <p className="text-gray-600 leading-relaxed mb-4">
        想像一下這個場景：你剛整理好一份包含公司財務報表的 PDF，準備透過 Email 寄給客戶。
        或者你需要把一份含有個人身分資料的合約寄給律師。你的手指停在「傳送」按鈕上，
        心裡突然冒出一個念頭——「萬一這封信被第三方截獲怎麼辦？」「如果收件人不小心轉寄給其他人呢？」
      </p>
      <p className="text-gray-600 leading-relaxed mb-4">
        這些擔心一點都不多餘。根據統計，每年有數以百萬計的電子郵件遭到攔截或誤發。
        未加密的 PDF 就像是一封沒有封口的信件，任何人拿到都能輕鬆閱讀裡面的內容。
        好消息是，為 PDF 設定密碼保護其實非常簡單，而且完全免費！🔐
      </p>
      <p className="text-gray-600 leading-relaxed mb-4">
        這篇教學會從頭到尾帶你了解 PDF 加密的所有知識，包括加密原理、密碼類型、
        實際操作步驟，以及安全密碼的設定技巧。不管你是第一次接觸 PDF 加密，
        還是想更深入了解，這篇文章都能幫到你。
      </p>

      {/* Section: 為什麼你需要加密 PDF？ */}
      <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4" id="why-encrypt">
        為什麼你需要加密 PDF？🤔
      </h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        你可能會想：「我平常傳的 PDF 也沒什麼機密內容啊，有必要加密嗎？」
        其實，PDF 加密的重要性可能超乎你的想像。以下是幾個你應該認真考慮加密 PDF 的理由：
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3" id="protect-sensitive-data">
        保護敏感資訊 🛡️
      </h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        無論是財務報表、醫療紀錄、法律合約、還是個人身分證明文件，
        這些 PDF 都包含不應該被未授權人士看到的資訊。一旦這些文件外洩，
        可能導致身分盜用、商業間諜、甚至法律糾紛。加密 PDF 是防止資料外洩的第一道防線。
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3" id="compliance">
        合規要求 📋
      </h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        許多行業法規要求在傳輸敏感文件時必須進行加密。例如，歐盟的 GDPR（一般資料保護規範）
        要求企業在傳輸個人資料時採取適當的安全措施。台灣的個人資料保護法也有類似的規定。
        如果你的工作涉及處理他人的個人資料，加密 PDF 不只是「建議」，而是「必要」的。
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3" id="prevent-tampering">
        防止文件竄改 ✏️
      </h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        PDF 加密不只能防止別人「看」你的文件，還能防止別人「改」你的文件。
        透過設定適當的權限，你可以禁止他人編輯、複製、列印你的 PDF。
        這在傳送正式合約或法律文件時特別重要，確保文件內容的完整性不被破壞。
      </p>

      <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-4 my-6">
        <p className="font-bold text-emerald-600 mb-2">💡 提示</p>
        <p className="text-gray-600">
          即使你覺得文件內容不太敏感，養成加密的習慣也是好事。你可以使用{' '}
          <Link href="/pdf/encrypt" className="text-pink-500 hover:text-pink-600 font-medium underline decoration-pink-300/40 hover:decoration-pink-600">
            Mochi Tools 的 PDF 加密工具
          </Link>{' '}
          快速為任何 PDF 加上密碼，整個過程不到 30 秒。
        </p>
      </div>

      {/* Section: PDF 加密的兩種類型 */}
      <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4" id="encryption-types">
        PDF 加密的兩種類型 🔑
      </h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        PDF 加密並不是單純的「設一個密碼」這麼簡單。PDF 格式支援兩種不同的加密機制，
        分別對應不同的保護需求。了解這兩種類型的差異，能幫助你選擇最適合自己情境的加密方式。
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3" id="password-encryption">
        密碼加密（Password-based Encryption）
      </h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        這是最常見也最簡單的加密方式。你設定一個密碼，收件人必須輸入正確的密碼才能打開 PDF。
        密碼加密使用 AES（Advanced Encryption Standard）或 RC4 演算法來加密文件內容，
        安全性很高。只要你的密碼夠強，幾乎不可能被暴力破解。
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3" id="certificate-encryption">
        憑證加密（Certificate-based Encryption）
      </h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        憑證加密使用數位憑證（Digital Certificate）來加密文件。這種方式更適合企業環境，
        因為它不需要收件人記住密碼，只要擁有對應的私鑰就能解密。不過，對於一般個人使用者來說，
        密碼加密已經足夠安全且方便。本篇教學主要聚焦在密碼加密的操作方式。
      </p>

      {/* Section: 使用者密碼 vs 擁有者密碼 */}
      <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4" id="owner-vs-user">
        使用者密碼 vs 擁有者密碼 🔐
      </h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        這是很多人搞混的地方！PDF 密碼保護其實有兩種不同的密碼，
        各自控制不同的權限。搞清楚它們的差別非常重要：
      </p>

      <div className="overflow-x-auto my-6">
        <table className="w-full border-collapse border border-gray-200 text-sm">
          <thead>
            <tr>
              <th className="bg-pink-50 border border-gray-200 px-4 py-2 text-left">比較項目</th>
              <th className="bg-pink-50 border border-gray-200 px-4 py-2 text-left">使用者密碼（User Password）</th>
              <th className="bg-pink-50 border border-gray-200 px-4 py-2 text-left">擁有者密碼（Owner Password）</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-200 px-4 py-2"><strong className="text-gray-800">別名</strong></td>
              <td className="border border-gray-200 px-4 py-2">開啟密碼、文件密碼</td>
              <td className="border border-gray-200 px-4 py-2">權限密碼、主密碼</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2"><strong className="text-gray-800">功能</strong></td>
              <td className="border border-gray-200 px-4 py-2">控制誰能「打開」文件</td>
              <td className="border border-gray-200 px-4 py-2">控制誰能「編輯、列印、複製」文件</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2"><strong className="text-gray-800">不輸入密碼時</strong></td>
              <td className="border border-gray-200 px-4 py-2">完全無法打開文件</td>
              <td className="border border-gray-200 px-4 py-2">可以打開但受限於權限設定</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2"><strong className="text-gray-800">安全等級</strong></td>
              <td className="border border-gray-200 px-4 py-2">高（文件內容被加密）</td>
              <td className="border border-gray-200 px-4 py-2">中（僅限制操作權限）</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2"><strong className="text-gray-800">適用場景</strong></td>
              <td className="border border-gray-200 px-4 py-2">機密文件、個資文件</td>
              <td className="border border-gray-200 px-4 py-2">防止文件被修改或複製</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-gray-600 leading-relaxed mb-4">
        簡單來說，如果你想確保「只有特定的人才能看到文件」，就設定<strong className="text-gray-800">使用者密碼</strong>。
        如果你想讓所有人都能看，但「不希望他們亂改或複製內容」，就設定<strong className="text-gray-800">擁有者密碼</strong>。
        當然，你也可以兩個都設定，提供最全面的保護！
      </p>

      <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4 my-6">
        <p className="font-bold text-amber-600 mb-2">⚠️ 注意</p>
        <p className="text-gray-600">
          擁有者密碼的保護並不是萬無一失的。某些第三方 PDF 軟體可以繞過擁有者密碼的限制。
          如果你需要真正的安全保護，建議一定要設定使用者密碼（開啟密碼）。
        </p>
      </div>

      {/* Section: PDF 加密教學步驟 */}
      <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4" id="how-to-encrypt">
        PDF 加密教學步驟 📝
      </h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        為 PDF 加密的方法有很多種，從桌面軟體到線上工具都有。
        以下我們先快速列出幾種常見的方法，然後重點介紹最簡單、最快速的線上加密方式。
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3" id="method-overview">
        常見的 PDF 加密方法
      </h3>
      <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
        <li><strong className="text-gray-800">Adobe Acrobat Pro</strong>：功能最完整，但需要付費訂閱（每月約 NT$680）</li>
        <li><strong className="text-gray-800">Microsoft Word</strong>：可以在儲存為 PDF 時設定密碼，但功能有限</li>
        <li><strong className="text-gray-800">macOS 預覽程式</strong>：Mac 內建，但加密選項較少</li>
        <li><strong className="text-gray-800">命令列工具（如 qpdf）</strong>：功能強大但需要技術知識</li>
        <li><strong className="text-gray-800">線上工具（如 Mochi Tools）</strong>：免費、快速、不需安裝，支援完整加密選項 ✅</li>
      </ul>
      <p className="text-gray-600 leading-relaxed mb-4">
        對大多數人來說，線上工具是最方便的選擇。接下來就讓我們用{' '}
        <Link href="/pdf/encrypt" className="text-pink-500 hover:text-pink-600 font-medium underline decoration-pink-300/40 hover:decoration-pink-600">
          Mochi Tools 的 PDF 加密功能
        </Link>{' '}
        來示範完整的操作流程。
      </p>

      {/* Section: 使用 Mochi Tools 加密 PDF（詳細步驟） */}
      <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4" id="step-by-step">
        使用 Mochi Tools 加密 PDF（詳細步驟）🚀
      </h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        Mochi Tools 是一款完全免費的線上 PDF 工具，最大的特色是所有檔案處理都在你的瀏覽器本地完成，
        不會上傳到任何伺服器。這意味著你的機密文件永遠不會離開你的電腦，隱私安全有保障。
      </p>

      <ol className="list-decimal pl-6 space-y-2 text-gray-600 mb-4">
        <li>
          <strong className="text-gray-800">打開工具頁面</strong>：前往{' '}
          <Link href="/pdf/encrypt" className="text-pink-500 hover:text-pink-600 font-medium underline decoration-pink-300/40 hover:decoration-pink-600">
            Mochi Tools PDF 加密頁面
          </Link>
          。你會看到一個簡潔的上傳介面。
        </li>
        <li>
          <strong className="text-gray-800">上傳 PDF 檔案</strong>：點擊上傳區域或直接把 PDF 拖曳到頁面上。
          你可以一次上傳一個或多個 PDF 檔案。
        </li>
        <li>
          <strong className="text-gray-800">設定密碼</strong>：在密碼欄位中輸入你想設定的密碼。
          建議使用至少 8 個字元，包含大小寫字母、數字和特殊符號。
        </li>
        <li>
          <strong className="text-gray-800">選擇加密選項</strong>：根據需求選擇加密強度和權限設定。
          你可以選擇是否允許列印、複製文字等操作。
        </li>
        <li>
          <strong className="text-gray-800">點擊加密</strong>：按下加密按鈕，工具會在幾秒內完成加密。
        </li>
        <li>
          <strong className="text-gray-800">下載加密後的 PDF</strong>：加密完成後，直接下載新的 PDF 檔案。
          原始檔案不會被修改。
        </li>
      </ol>

      <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-4 my-6">
        <p className="font-bold text-emerald-600 mb-2">💡 提示</p>
        <p className="text-gray-600">
          整個加密過程在瀏覽器本地完成，所以即使你的網路斷線了，工具依然可以正常運作。
          這也表示你的 PDF 檔案永遠不會被上傳到雲端，完全不用擔心隱私問題！
        </p>
      </div>

      {/* Section: 設定安全密碼的技巧 */}
      <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4" id="password-tips">
        設定安全密碼的技巧 💪
      </h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        密碼就像門鎖一樣，鎖的品質再好，如果鑰匙太簡單也等於白搭。
        以下是幾個幫助你設定安全密碼的實用技巧：
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3" id="password-length">
        長度至少 12 個字元
      </h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        密碼的長度是安全性最重要的因素。一個 8 位的純數字密碼，現代電腦可以在幾秒鐘內破解。
        但如果增加到 12 位並混合使用各種字元，暴力破解需要的時間會增加到數千年。
        所以，密碼越長越好！
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3" id="password-complexity">
        混合字元類型
      </h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        好的密碼應該包含以下四種字元中的至少三種：
      </p>
      <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
        <li>大寫字母（A-Z）</li>
        <li>小寫字母（a-z）</li>
        <li>數字（0-9）</li>
        <li>特殊符號（!@#$%^&* 等）</li>
      </ul>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3" id="password-donts">
        避免常見錯誤
      </h3>
      <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
        <li>不要使用生日、電話號碼、「123456」或「password」等常見密碼</li>
        <li>不要對多個文件使用相同的密碼</li>
        <li>不要把密碼寫在 Email 正文中與加密 PDF 一起寄出</li>
        <li>不要使用字典中可以查到的完整單字</li>
      </ul>

      <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-4 my-6">
        <p className="font-bold text-emerald-600 mb-2">💡 提示</p>
        <p className="text-gray-600">
          建議使用「密碼短語」的方式來建立密碼。例如「My-Cat-Loves-Tuna-2024!」，
          這樣的密碼既長又好記，安全性也非常高。傳送密碼給收件人時，
          建議使用不同的通訊管道（例如 PDF 用 Email 寄，密碼用 LINE 傳）。
        </p>
      </div>

      {/* Section: 加密強度比較 */}
      <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4" id="encryption-strength">
        加密強度比較（128-bit vs 256-bit）🔒
      </h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        當你在加密 PDF 時，通常會看到「128-bit AES」和「256-bit AES」兩個選項。
        這兩者到底有什麼差別呢？讓我們來比較一下：
      </p>

      <div className="overflow-x-auto my-6">
        <table className="w-full border-collapse border border-gray-200 text-sm">
          <thead>
            <tr>
              <th className="bg-pink-50 border border-gray-200 px-4 py-2 text-left">比較項目</th>
              <th className="bg-pink-50 border border-gray-200 px-4 py-2 text-left">128-bit AES</th>
              <th className="bg-pink-50 border border-gray-200 px-4 py-2 text-left">256-bit AES</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-200 px-4 py-2"><strong className="text-gray-800">加密金鑰長度</strong></td>
              <td className="border border-gray-200 px-4 py-2">128 位元</td>
              <td className="border border-gray-200 px-4 py-2">256 位元</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2"><strong className="text-gray-800">可能的金鑰組合</strong></td>
              <td className="border border-gray-200 px-4 py-2">3.4 x 10³⁸</td>
              <td className="border border-gray-200 px-4 py-2">1.1 x 10⁷⁷</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2"><strong className="text-gray-800">暴力破解時間</strong></td>
              <td className="border border-gray-200 px-4 py-2">數十億年</td>
              <td className="border border-gray-200 px-4 py-2">宇宙壽命的數倍</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2"><strong className="text-gray-800">加密速度</strong></td>
              <td className="border border-gray-200 px-4 py-2">較快</td>
              <td className="border border-gray-200 px-4 py-2">稍慢（差異極小）</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2"><strong className="text-gray-800">相容性</strong></td>
              <td className="border border-gray-200 px-4 py-2">Acrobat 7+ 支援</td>
              <td className="border border-gray-200 px-4 py-2">Acrobat 9+ 支援</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2"><strong className="text-gray-800">安全等級</strong></td>
              <td className="border border-gray-200 px-4 py-2">非常安全</td>
              <td className="border border-gray-200 px-4 py-2">極度安全（軍事等級）</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2"><strong className="text-gray-800">推薦用途</strong></td>
              <td className="border border-gray-200 px-4 py-2">一般文件保護</td>
              <td className="border border-gray-200 px-4 py-2">高度機密文件</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-gray-600 leading-relaxed mb-4">
        簡單來說，128-bit AES 對於絕大多數場景來說已經足夠安全了。
        目前全世界沒有任何已知的方法可以在合理時間內破解 128-bit AES 加密。
        但如果你處理的是政府機密或極度敏感的商業資料，256-bit AES 能提供額外的安全保障。
      </p>
      <p className="text-gray-600 leading-relaxed mb-4">
        在{' '}
        <Link href="/pdf/encrypt" className="text-pink-500 hover:text-pink-600 font-medium underline decoration-pink-300/40 hover:decoration-pink-600">
          Mochi Tools 的 PDF 加密工具
        </Link>{' '}
        中，你可以自由選擇加密強度，滿足不同等級的安全需求。
      </p>

      {/* Section: 常見使用情境 */}
      <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4" id="common-scenarios">
        常見使用情境 📂
      </h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        不確定什麼時候該加密 PDF？以下是一些最常見的使用情境，看看有沒有跟你相似的：
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3" id="scenario-business">
        商業與工作場景
      </h3>
      <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
        <li>傳送薪資單或人事資料給員工</li>
        <li>與合作夥伴分享商業計畫書或財務報表</li>
        <li>寄出招標文件或報價單</li>
        <li>傳送未公開的產品設計文件</li>
        <li>保存公司內部的會議紀錄</li>
      </ul>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3" id="scenario-personal">
        個人與日常場景
      </h3>
      <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
        <li>傳送身分證、護照或戶籍謄本的掃描檔</li>
        <li>保存稅務申報文件</li>
        <li>分享醫療報告或體檢結果</li>
        <li>傳送銀行對帳單或信用卡帳單</li>
        <li>備份重要的法律文件（如遺囑、合約）</li>
      </ul>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3" id="scenario-education">
        教育與學術場景
      </h3>
      <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
        <li>保護考試題目和答案</li>
        <li>加密研究論文草稿（防止提前外洩）</li>
        <li>保護含有學生個資的成績單</li>
      </ul>

      <p className="text-gray-600 leading-relaxed mb-4">
        不管是哪種場景，使用{' '}
        <Link href="/pdf/encrypt" className="text-pink-500 hover:text-pink-600 font-medium underline decoration-pink-300/40 hover:decoration-pink-600">
          Mochi Tools PDF 加密
        </Link>{' '}
        都能在幾秒鐘內完成保護。完全免費，不限次數，也不限檔案大小。
      </p>

      {/* Section: 如何移除 PDF 密碼？ */}
      <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4" id="remove-password">
        如何移除 PDF 密碼？🔓
      </h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        如果你知道密碼但想移除 PDF 的密碼保護（例如不再需要加密的舊文件），
        操作方法也很簡單。以下是幾種常見的移除方式：
      </p>

      <ol className="list-decimal pl-6 space-y-2 text-gray-600 mb-4">
        <li>
          <strong className="text-gray-800">使用瀏覽器</strong>：用 Chrome 或 Edge 打開加密的 PDF（需輸入密碼），
          然後選擇「列印」→「另存為 PDF」，新的 PDF 就不會有密碼了。
        </li>
        <li>
          <strong className="text-gray-800">使用 Adobe Acrobat</strong>：打開加密 PDF，前往「檔案」→「屬性」→「安全性」，
          選擇「無安全性」即可移除密碼。
        </li>
        <li>
          <strong className="text-gray-800">使用 macOS 預覽程式</strong>：打開加密 PDF，前往「檔案」→「輸出為 PDF」，
          在儲存時不勾選加密選項。
        </li>
      </ol>

      <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4 my-6">
        <p className="font-bold text-amber-600 mb-2">⚠️ 注意</p>
        <p className="text-gray-600">
          移除 PDF 密碼必須先知道原始密碼。如果你忘記了密碼，基本上是無法恢復的
          （這恰好說明了 PDF 加密的安全性有多高）。所以請務必妥善保管你設定的密碼！
        </p>
      </div>

      {/* Section: 常見問題 FAQ */}
      <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4" id="faq">
        常見問題 FAQ ❓
      </h2>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3" id="faq-1">
        Q1：PDF 加密後檔案大小會變大嗎？
      </h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        加密後的 PDF 檔案大小幾乎不會改變。加密過程只是對現有的資料進行加密運算，
        並不會增加額外的資料量。通常加密後的檔案大小增加不到 1%，可以忽略不計。
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3" id="faq-2">
        Q2：加密的 PDF 可以在手機上打開嗎？
      </h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        可以！大多數手機的 PDF 閱讀器（如 iOS 內建的 Files 應用、Android 的 Google Drive）
        都支援打開加密的 PDF。打開時會跳出密碼輸入框，輸入正確密碼即可閱讀。
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3" id="faq-3">
        Q3：Mochi Tools 的加密安全嗎？檔案會不會被上傳？
      </h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        絕對安全！{' '}
        <Link href="/pdf/encrypt" className="text-pink-500 hover:text-pink-600 font-medium underline decoration-pink-300/40 hover:decoration-pink-600">
          Mochi Tools
        </Link>{' '}
        的所有檔案處理都在你的瀏覽器本地完成。你的 PDF 檔案和密碼永遠不會離開你的電腦，
        也不會被上傳到任何伺服器。你可以使用瀏覽器的開發者工具（F12）驗證這一點。
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3" id="faq-4">
        Q4：我忘記了 PDF 密碼，有辦法找回嗎？
      </h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        如果你忘記的是使用者密碼（開啟密碼），很遺憾，基本上無法找回。
        AES 加密的安全性非常高，暴力破解幾乎不可能成功（除非你的密碼非常短或非常簡單）。
        這就是為什麼我們一再強調要妥善保管密碼的原因。建議使用密碼管理工具（如 Bitwarden、1Password）
        來安全地儲存你的密碼。
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3" id="faq-5">
        Q5：加密後的 PDF 還能被編輯嗎？
      </h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        這取決於你設定了什麼類型的密碼和權限。如果你只設定了使用者密碼，
        輸入密碼打開後通常可以正常編輯。如果你同時設定了擁有者密碼並限制了編輯權限，
        則只有知道擁有者密碼的人才能進行編輯。
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3" id="faq-6">
        Q6：同一份 PDF 可以設定不同的使用者密碼和擁有者密碼嗎？
      </h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        是的，這是 PDF 加密的標準功能。你可以為同一份 PDF 設定一個使用者密碼（用來控制開啟權限）
        和一個擁有者密碼（用來控制編輯權限），而且這兩個密碼可以完全不同。
        這樣你就能精細地控制不同人對文件的存取權限。
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3" id="faq-7">
        Q7：PDF 加密和壓縮可以同時進行嗎？
      </h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        可以的！你可以先壓縮 PDF 減小檔案大小，再進行加密。或者先加密再壓縮也行，
        不過先壓縮再加密通常能得到更好的壓縮效果。Mochi Tools 同時提供了{' '}
        <Link href="/pdf/encrypt" className="text-pink-500 hover:text-pink-600 font-medium underline decoration-pink-300/40 hover:decoration-pink-600">
          PDF 加密
        </Link>{' '}
        和 PDF 壓縮工具，搭配使用效果更好！
      </p>

      {/* Section: 結論 */}
      <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4" id="conclusion">
        結論 🎯
      </h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        在這個資訊安全日益重要的時代，為 PDF 加密已經不再是「可有可無」的事，
        而是保護自己和他人資料安全的基本動作。無論你是傳送商業文件、個人資料、
        還是學術研究，加密 PDF 都能為你提供一層可靠的保護。
      </p>
      <p className="text-gray-600 leading-relaxed mb-4">
        重新回顧一下今天學到的重點：
      </p>
      <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
        <li>PDF 加密分為使用者密碼和擁有者密碼，各有不同的保護功能</li>
        <li>256-bit AES 提供軍事等級的加密強度，128-bit AES 也已足夠安全</li>
        <li>密碼要夠長（至少 12 字元）、夠複雜（混合字元類型）</li>
        <li>密碼要透過不同的通訊管道傳送給收件人</li>
        <li>使用瀏覽器本地處理的工具（如 Mochi Tools），確保檔案不會被上傳</li>
      </ul>
      <p className="text-gray-600 leading-relaxed mb-4">
        現在就去試試吧！前往{' '}
        <Link href="/pdf/encrypt" className="text-pink-500 hover:text-pink-600 font-medium underline decoration-pink-300/40 hover:decoration-pink-600">
          Mochi Tools PDF 加密工具
        </Link>
        ，為你的下一份 PDF 加上密碼保護。整個過程不到一分鐘，而且完全免費。
        你的資料安全，值得這一分鐘的投資！🔐
      </p>
    </>
  );
}

export function PdfPasswordProtectionGuideEn() {
  return (
    <>
      <p className="text-gray-600 leading-relaxed mb-4">
        Picture this: you have just finished putting together a PDF containing your company&apos;s financial
        statements, and you are about to email it to a client. Or maybe you need to send a contract
        with sensitive personal information to your lawyer. Your finger hovers over the &quot;Send&quot; button,
        and a thought crosses your mind: &quot;What if this email gets intercepted?&quot; &quot;What if the recipient
        accidentally forwards it to the wrong person?&quot;
      </p>
      <p className="text-gray-600 leading-relaxed mb-4">
        These concerns are entirely valid. According to research, millions of emails are intercepted
        or misdirected every year. An unencrypted PDF is like an unsealed letter — anyone who gets
        their hands on it can easily read its contents. The good news is that password-protecting
        a PDF is surprisingly simple and completely free.
      </p>
      <p className="text-gray-600 leading-relaxed mb-4">
        This comprehensive guide will walk you through everything you need to know about PDF encryption,
        from the underlying principles and password types to step-by-step instructions and tips for
        creating strong passwords. Whether you are a complete beginner or looking to deepen your
        understanding, this article has you covered.
      </p>

      {/* Section: Why You Need to Encrypt Your PDFs */}
      <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4" id="why-encrypt-en">
        Why You Need to Encrypt Your PDFs
      </h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        You might be thinking, &quot;The PDFs I send are not that confidential — do I really need encryption?&quot;
        The truth is, PDF encryption is more important than most people realize. Here are several
        compelling reasons to take it seriously:
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3" id="protect-sensitive-data-en">
        Protecting Sensitive Information
      </h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        Whether it is financial reports, medical records, legal contracts, or personal identification
        documents, these PDFs contain information that should not be seen by unauthorized individuals.
        If such documents are leaked, the consequences can include identity theft, corporate espionage,
        or even legal action. Encrypting your PDF is the first line of defense against data breaches.
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3" id="compliance-en">
        Meeting Compliance Requirements
      </h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        Many industry regulations require encryption when transmitting sensitive documents. For example,
        the EU&apos;s GDPR (General Data Protection Regulation) mandates that organizations take appropriate
        security measures when transferring personal data. Similar requirements exist under HIPAA in the
        United States, PIPEDA in Canada, and various data protection laws worldwide. If your work involves
        handling other people&apos;s personal data, encrypting PDFs is not just a recommendation — it is a necessity.
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3" id="prevent-tampering-en">
        Preventing Document Tampering
      </h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        PDF encryption does not just prevent others from reading your documents — it can also prevent
        them from modifying the content. By setting appropriate permissions, you can prohibit editing,
        copying, and printing of your PDF. This is particularly important when sending official contracts
        or legal documents, ensuring the integrity of the document is preserved.
      </p>

      <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-4 my-6">
        <p className="font-bold text-emerald-600 mb-2">💡 Tip</p>
        <p className="text-gray-600">
          Even if you feel your document content is not particularly sensitive, developing a habit of
          encryption is still wise. You can use{' '}
          <Link href="/pdf/encrypt" className="text-pink-500 hover:text-pink-600 font-medium underline decoration-pink-300/40 hover:decoration-pink-600">
            Mochi Tools&apos; PDF Encrypt tool
          </Link>{' '}
          to quickly add a password to any PDF in under 30 seconds.
        </p>
      </div>

      {/* Section: Two Types of PDF Encryption */}
      <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4" id="encryption-types-en">
        Two Types of PDF Encryption
      </h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        PDF encryption is not simply a matter of &quot;setting a password.&quot; The PDF format supports two
        distinct encryption mechanisms, each designed for different protection needs. Understanding
        the difference helps you choose the right approach for your situation.
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3" id="password-encryption-en">
        Password-based Encryption
      </h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        This is the most common and straightforward method. You set a password, and the recipient must
        enter the correct password to open the PDF. Password-based encryption uses AES (Advanced
        Encryption Standard) or RC4 algorithms to encrypt the document content. As long as your
        password is strong enough, it is virtually impossible to crack through brute force.
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3" id="certificate-encryption-en">
        Certificate-based Encryption
      </h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        Certificate-based encryption uses digital certificates to encrypt documents. This method is
        more suited to enterprise environments because recipients do not need to remember a password —
        they only need the corresponding private key to decrypt the file. However, for most individual
        users, password-based encryption is perfectly secure and far more convenient. This guide
        focuses primarily on password-based encryption.
      </p>

      {/* Section: User Password vs Owner Password */}
      <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4" id="owner-vs-user-en">
        User Password vs Owner Password
      </h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        This is where many people get confused. PDF password protection actually involves two
        different types of passwords, each controlling different permissions. Understanding
        the distinction is crucial:
      </p>

      <div className="overflow-x-auto my-6">
        <table className="w-full border-collapse border border-gray-200 text-sm">
          <thead>
            <tr>
              <th className="bg-pink-50 border border-gray-200 px-4 py-2 text-left">Comparison</th>
              <th className="bg-pink-50 border border-gray-200 px-4 py-2 text-left">User Password</th>
              <th className="bg-pink-50 border border-gray-200 px-4 py-2 text-left">Owner Password</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-200 px-4 py-2"><strong className="text-gray-800">Also Known As</strong></td>
              <td className="border border-gray-200 px-4 py-2">Open password, Document password</td>
              <td className="border border-gray-200 px-4 py-2">Permissions password, Master password</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2"><strong className="text-gray-800">Function</strong></td>
              <td className="border border-gray-200 px-4 py-2">Controls who can open the document</td>
              <td className="border border-gray-200 px-4 py-2">Controls who can edit, print, or copy</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2"><strong className="text-gray-800">Without Password</strong></td>
              <td className="border border-gray-200 px-4 py-2">Cannot open the document at all</td>
              <td className="border border-gray-200 px-4 py-2">Can open but restricted by permissions</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2"><strong className="text-gray-800">Security Level</strong></td>
              <td className="border border-gray-200 px-4 py-2">High (content is encrypted)</td>
              <td className="border border-gray-200 px-4 py-2">Medium (only restricts operations)</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2"><strong className="text-gray-800">Best For</strong></td>
              <td className="border border-gray-200 px-4 py-2">Confidential, sensitive documents</td>
              <td className="border border-gray-200 px-4 py-2">Preventing modification or copying</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-gray-600 leading-relaxed mb-4">
        In simple terms, if you want to ensure that <strong className="text-gray-800">only specific people can view the document</strong>,
        set a user password. If you want everyone to be able to read it but <strong className="text-gray-800">prevent them from editing
        or copying the content</strong>, set an owner password. You can also set both for maximum protection.
      </p>

      <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4 my-6">
        <p className="font-bold text-amber-600 mb-2">⚠️ Warning</p>
        <p className="text-gray-600">
          Owner password protection is not entirely foolproof. Some third-party PDF software can bypass
          owner password restrictions. If you need genuine security, always set a user password (open password)
          in addition to the owner password.
        </p>
      </div>

      {/* Section: How to Encrypt a PDF */}
      <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4" id="how-to-encrypt-en">
        How to Encrypt a PDF
      </h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        There are several ways to encrypt a PDF, ranging from desktop software to online tools.
        Here is a quick overview of the most common methods, followed by a detailed walkthrough
        of the simplest and fastest approach.
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3" id="method-overview-en">
        Common PDF Encryption Methods
      </h3>
      <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
        <li><strong className="text-gray-800">Adobe Acrobat Pro</strong>: The most feature-rich option, but requires a paid subscription (~$22.99/month)</li>
        <li><strong className="text-gray-800">Microsoft Word</strong>: Can set a password when saving as PDF, but options are limited</li>
        <li><strong className="text-gray-800">macOS Preview</strong>: Built-in on Mac, but encryption options are minimal</li>
        <li><strong className="text-gray-800">Command-line tools (e.g., qpdf)</strong>: Powerful but require technical knowledge</li>
        <li><strong className="text-gray-800">Online tools (e.g., Mochi Tools)</strong>: Free, fast, no installation needed, full encryption options</li>
      </ul>
      <p className="text-gray-600 leading-relaxed mb-4">
        For most people, online tools offer the most convenient solution. Let us walk through the
        complete process using{' '}
        <Link href="/pdf/encrypt" className="text-pink-500 hover:text-pink-600 font-medium underline decoration-pink-300/40 hover:decoration-pink-600">
          Mochi Tools&apos; PDF Encrypt feature
        </Link>.
      </p>

      {/* Section: Step-by-Step with Mochi Tools */}
      <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4" id="step-by-step-en">
        Encrypt a PDF with Mochi Tools (Step-by-Step)
      </h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        Mochi Tools is a completely free online PDF toolkit. Its standout feature is that all file
        processing happens locally in your browser — nothing is ever uploaded to any server.
        This means your confidential documents never leave your computer, guaranteeing full privacy.
      </p>

      <ol className="list-decimal pl-6 space-y-2 text-gray-600 mb-4">
        <li>
          <strong className="text-gray-800">Open the tool page</strong>: Navigate to the{' '}
          <Link href="/pdf/encrypt" className="text-pink-500 hover:text-pink-600 font-medium underline decoration-pink-300/40 hover:decoration-pink-600">
            Mochi Tools PDF Encrypt page
          </Link>
          . You will see a clean, intuitive upload interface.
        </li>
        <li>
          <strong className="text-gray-800">Upload your PDF</strong>: Click the upload area or drag and drop your PDF onto the page.
          You can upload one or multiple PDF files at once.
        </li>
        <li>
          <strong className="text-gray-800">Set your password</strong>: Enter your desired password in the password field.
          We recommend using at least 8 characters, including uppercase and lowercase letters, numbers,
          and special symbols.
        </li>
        <li>
          <strong className="text-gray-800">Choose encryption options</strong>: Select your preferred encryption strength and
          permission settings. You can choose whether to allow printing, text copying, and other operations.
        </li>
        <li>
          <strong className="text-gray-800">Click Encrypt</strong>: Hit the encrypt button, and the tool will complete the
          encryption within seconds.
        </li>
        <li>
          <strong className="text-gray-800">Download the encrypted PDF</strong>: Once encryption is complete, download the new
          PDF file directly. Your original file remains unchanged.
        </li>
      </ol>

      <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-4 my-6">
        <p className="font-bold text-emerald-600 mb-2">💡 Tip</p>
        <p className="text-gray-600">
          The entire encryption process runs locally in your browser, so even if your internet
          connection drops, the tool continues to work. This also means your PDF files are never
          uploaded to the cloud — zero privacy concerns.
        </p>
      </div>

      {/* Section: Tips for Creating a Strong Password */}
      <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4" id="password-tips-en">
        Tips for Creating a Strong Password
      </h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        A password is like a lock on a door. No matter how good the lock is, if the key is too
        simple, it defeats the purpose. Here are practical tips to help you create a secure password:
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3" id="password-length-en">
        Use at Least 12 Characters
      </h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        Password length is the single most important factor in security. An 8-digit numeric password
        can be cracked by a modern computer in mere seconds. But extend it to 12 characters with
        mixed character types, and the time needed for brute-force cracking increases to thousands
        of years. The longer your password, the better.
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3" id="password-complexity-en">
        Mix Character Types
      </h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        A strong password should include at least three of the following four character types:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
        <li>Uppercase letters (A-Z)</li>
        <li>Lowercase letters (a-z)</li>
        <li>Numbers (0-9)</li>
        <li>Special characters (!@#$%^&* etc.)</li>
      </ul>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3" id="password-donts-en">
        Common Mistakes to Avoid
      </h3>
      <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
        <li>Do not use birthdays, phone numbers, &quot;123456,&quot; or &quot;password&quot;</li>
        <li>Do not reuse the same password across multiple documents</li>
        <li>Do not include the password in the same email as the encrypted PDF</li>
        <li>Do not use complete dictionary words</li>
      </ul>

      <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-4 my-6">
        <p className="font-bold text-emerald-600 mb-2">💡 Tip</p>
        <p className="text-gray-600">
          Consider using a passphrase approach. For example, &quot;My-Cat-Loves-Tuna-2024!&quot; is long,
          easy to remember, and highly secure. When sharing the password with the recipient, use a
          different communication channel (e.g., send the PDF via email, but share the password
          via a messaging app like WhatsApp or Signal).
        </p>
      </div>

      {/* Section: Encryption Strength Comparison */}
      <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4" id="encryption-strength-en">
        Encryption Strength Comparison (128-bit vs 256-bit)
      </h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        When encrypting a PDF, you will typically see two options: &quot;128-bit AES&quot; and &quot;256-bit AES.&quot;
        What is the actual difference between these two? Let us break it down:
      </p>

      <div className="overflow-x-auto my-6">
        <table className="w-full border-collapse border border-gray-200 text-sm">
          <thead>
            <tr>
              <th className="bg-pink-50 border border-gray-200 px-4 py-2 text-left">Comparison</th>
              <th className="bg-pink-50 border border-gray-200 px-4 py-2 text-left">128-bit AES</th>
              <th className="bg-pink-50 border border-gray-200 px-4 py-2 text-left">256-bit AES</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-200 px-4 py-2"><strong className="text-gray-800">Key Length</strong></td>
              <td className="border border-gray-200 px-4 py-2">128 bits</td>
              <td className="border border-gray-200 px-4 py-2">256 bits</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2"><strong className="text-gray-800">Possible Key Combinations</strong></td>
              <td className="border border-gray-200 px-4 py-2">3.4 x 10³⁸</td>
              <td className="border border-gray-200 px-4 py-2">1.1 x 10⁷⁷</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2"><strong className="text-gray-800">Brute-force Time</strong></td>
              <td className="border border-gray-200 px-4 py-2">Billions of years</td>
              <td className="border border-gray-200 px-4 py-2">Multiple lifetimes of the universe</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2"><strong className="text-gray-800">Encryption Speed</strong></td>
              <td className="border border-gray-200 px-4 py-2">Faster</td>
              <td className="border border-gray-200 px-4 py-2">Slightly slower (negligible difference)</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2"><strong className="text-gray-800">Compatibility</strong></td>
              <td className="border border-gray-200 px-4 py-2">Acrobat 7+ supported</td>
              <td className="border border-gray-200 px-4 py-2">Acrobat 9+ supported</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2"><strong className="text-gray-800">Security Level</strong></td>
              <td className="border border-gray-200 px-4 py-2">Very secure</td>
              <td className="border border-gray-200 px-4 py-2">Extremely secure (military-grade)</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2"><strong className="text-gray-800">Recommended For</strong></td>
              <td className="border border-gray-200 px-4 py-2">General document protection</td>
              <td className="border border-gray-200 px-4 py-2">Highly confidential documents</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-gray-600 leading-relaxed mb-4">
        In practical terms, 128-bit AES is already more than secure enough for the vast majority of
        use cases. There are currently no known methods to crack 128-bit AES encryption within a
        reasonable timeframe. However, if you are handling government secrets or extremely sensitive
        commercial data, 256-bit AES provides an additional layer of security.
      </p>
      <p className="text-gray-600 leading-relaxed mb-4">
        With{' '}
        <Link href="/pdf/encrypt" className="text-pink-500 hover:text-pink-600 font-medium underline decoration-pink-300/40 hover:decoration-pink-600">
          Mochi Tools&apos; PDF Encrypt tool
        </Link>
        , you can freely choose your encryption strength to match your specific security requirements.
      </p>

      {/* Section: Common Use Cases */}
      <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4" id="common-scenarios-en">
        Common Use Cases
      </h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        Not sure when you should encrypt a PDF? Here are some of the most common scenarios
        where PDF encryption proves invaluable:
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3" id="scenario-business-en">
        Business and Workplace
      </h3>
      <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
        <li>Sending payroll documents or HR records to employees</li>
        <li>Sharing business plans or financial statements with partners</li>
        <li>Distributing tender documents or price quotes</li>
        <li>Transmitting unreleased product design files</li>
        <li>Archiving internal meeting minutes</li>
      </ul>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3" id="scenario-personal-en">
        Personal and Everyday
      </h3>
      <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
        <li>Sending scans of IDs, passports, or other personal documents</li>
        <li>Storing tax filing documents securely</li>
        <li>Sharing medical reports or health check results</li>
        <li>Sending bank statements or credit card statements</li>
        <li>Backing up important legal documents (wills, contracts)</li>
      </ul>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3" id="scenario-education-en">
        Education and Academia
      </h3>
      <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
        <li>Protecting exam questions and answer sheets</li>
        <li>Encrypting research paper drafts to prevent premature leaks</li>
        <li>Securing grade reports containing student personal information</li>
      </ul>

      <p className="text-gray-600 leading-relaxed mb-4">
        Regardless of your scenario, using{' '}
        <Link href="/pdf/encrypt" className="text-pink-500 hover:text-pink-600 font-medium underline decoration-pink-300/40 hover:decoration-pink-600">
          Mochi Tools PDF Encrypt
        </Link>{' '}
        lets you secure your documents in seconds. It is completely free, with no usage limits
        and no file size restrictions.
      </p>

      {/* Section: How to Remove a PDF Password */}
      <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4" id="remove-password-en">
        How to Remove a PDF Password
      </h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        If you know the password and want to remove the protection from a PDF (for example, an old
        document that no longer needs encryption), the process is straightforward. Here are several
        common methods:
      </p>

      <ol className="list-decimal pl-6 space-y-2 text-gray-600 mb-4">
        <li>
          <strong className="text-gray-800">Using a browser</strong>: Open the encrypted PDF in Chrome or Edge (you will need
          to enter the password), then select &quot;Print&quot; and choose &quot;Save as PDF.&quot; The new PDF will not
          have password protection.
        </li>
        <li>
          <strong className="text-gray-800">Using Adobe Acrobat</strong>: Open the encrypted PDF, go to &quot;File&quot; then &quot;Properties&quot;
          then &quot;Security,&quot; and select &quot;No Security&quot; to remove the password.
        </li>
        <li>
          <strong className="text-gray-800">Using macOS Preview</strong>: Open the encrypted PDF, go to &quot;File&quot; then &quot;Export as PDF,&quot;
          and save without the encryption option checked.
        </li>
      </ol>

      <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4 my-6">
        <p className="font-bold text-amber-600 mb-2">⚠️ Warning</p>
        <p className="text-gray-600">
          Removing a PDF password requires knowing the original password first. If you have forgotten
          the password, recovery is essentially impossible (which actually demonstrates just how
          strong PDF encryption really is). Always store your passwords securely using a password
          manager.
        </p>
      </div>

      {/* Section: FAQ */}
      <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4" id="faq-en">
        Frequently Asked Questions (FAQ)
      </h2>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3" id="faq-1-en">
        Q1: Does encrypting a PDF increase the file size?
      </h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        The file size of an encrypted PDF remains virtually unchanged. The encryption process applies
        cryptographic operations to the existing data without adding significant extra data. Typically,
        the file size increase after encryption is less than 1% — completely negligible.
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3" id="faq-2-en">
        Q2: Can encrypted PDFs be opened on mobile devices?
      </h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        Absolutely. Most mobile PDF readers — including the built-in Files app on iOS and Google Drive
        on Android — fully support opening encrypted PDFs. A password prompt will appear when you open
        the file, and entering the correct password grants full access.
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3" id="faq-3-en">
        Q3: Is Mochi Tools encryption secure? Will my files be uploaded?
      </h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        It is completely secure.{' '}
        <Link href="/pdf/encrypt" className="text-pink-500 hover:text-pink-600 font-medium underline decoration-pink-300/40 hover:decoration-pink-600">
          Mochi Tools
        </Link>{' '}
        processes all files locally in your browser. Your PDF files and passwords never leave your
        computer and are never uploaded to any server. You can verify this yourself using your
        browser&apos;s developer tools (F12) to monitor network activity.
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3" id="faq-4-en">
        Q4: I forgot my PDF password. Can I recover it?
      </h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        If you have forgotten the user password (open password), unfortunately, recovery is essentially
        impossible. AES encryption is extremely strong, and brute-force attacks are impractical unless
        your password was very short or very simple. This is precisely why we emphasize the importance
        of storing your passwords securely. We recommend using a password manager like Bitwarden or
        1Password to keep your passwords safe.
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3" id="faq-5-en">
        Q5: Can an encrypted PDF still be edited?
      </h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        It depends on the type of password and permissions you have set. If you only set a user
        password, the document can typically be edited normally after entering the password. If you
        also set an owner password with editing restrictions, only someone who knows the owner
        password can make modifications.
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3" id="faq-6-en">
        Q6: Can I set different user and owner passwords for the same PDF?
      </h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        Yes, this is a standard feature of PDF encryption. You can set one user password (to control
        who can open the document) and a separate owner password (to control who can edit, print, or
        copy). These two passwords can be entirely different, giving you fine-grained control over
        document access and permissions.
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3" id="faq-7-en">
        Q7: Can I compress and encrypt a PDF at the same time?
      </h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        Yes, you can. You can first compress the PDF to reduce its file size and then encrypt it.
        Alternatively, you can encrypt first and then compress, though compressing before encryption
        typically yields better compression ratios. Mochi Tools offers both{' '}
        <Link href="/pdf/encrypt" className="text-pink-500 hover:text-pink-600 font-medium underline decoration-pink-300/40 hover:decoration-pink-600">
          PDF encryption
        </Link>{' '}
        and PDF compression tools that work great together.
      </p>

      {/* Section: Conclusion */}
      <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4" id="conclusion-en">
        Conclusion
      </h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        In an era where information security is increasingly critical, encrypting your PDFs is no
        longer optional — it is a fundamental step in protecting both your own data and the data
        of others. Whether you are sending business documents, personal information, or academic
        research, PDF encryption provides a reliable layer of protection.
      </p>
      <p className="text-gray-600 leading-relaxed mb-4">
        Let us recap the key takeaways from this guide:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
        <li>PDF encryption uses two password types — user and owner — each serving a different purpose</li>
        <li>256-bit AES provides military-grade encryption, while 128-bit AES is already extremely secure</li>
        <li>Passwords should be long (at least 12 characters) and complex (mixed character types)</li>
        <li>Always share passwords through a separate communication channel from the encrypted PDF</li>
        <li>Use browser-based tools like Mochi Tools to ensure your files are never uploaded to external servers</li>
      </ul>
      <p className="text-gray-600 leading-relaxed mb-4">
        Ready to get started? Head over to the{' '}
        <Link href="/pdf/encrypt" className="text-pink-500 hover:text-pink-600 font-medium underline decoration-pink-300/40 hover:decoration-pink-600">
          Mochi Tools PDF Encrypt tool
        </Link>{' '}
        and add password protection to your next PDF. The entire process takes less than a minute
        and is completely free. Your data security is worth that one minute of effort.
      </p>
    </>
  );
}
