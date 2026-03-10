import { Link } from '@/i18n/routing';

export function AiBackgroundRemovalGuideZh() {
  return (
    <>
      <p className="text-gray-600 leading-relaxed mb-4">
        你有沒有遇過這種情況？想在蝦皮上架商品，結果拍出來的照片背景超亂——桌上有杯子、衛生紙、
        還有昨天吃剩的零食包裝 😅。或者，你需要一張白底的大頭照去辦護照，但手邊只有在家裡客廳自拍的照片，
        背景是亂七八糟的書架和電視。這時候你可能會想：「要是能把背景直接去掉就好了！」
      </p>
      <p className="text-gray-600 leading-relaxed mb-4">
        好消息是，現在有了 AI 去背技術，你真的可以一鍵搞定！不用學 Photoshop，不用花錢請人修圖，
        甚至不用下載任何軟體。這篇文章會帶你從頭了解 AI 去背的原理、常見用途、工具比較，
        還有手把手的操作教學，讓你輕鬆成為去背達人 ✨。
      </p>

      {/* Section 1: What is AI background removal */}
      <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4" id="what-is-bg-removal">什麼是 AI 去背？</h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        AI 去背（AI Background Removal）就是利用人工智慧技術，自動辨識圖片中的主體（例如人物、商品、動物），
        然後把背景移除，只保留主體的部分。去背後的圖片通常會變成透明背景（PNG 格式），
        你可以自由地把它放到任何新的背景上。
      </p>
      <p className="text-gray-600 leading-relaxed mb-4">
        以前要做去背，你得打開 Photoshop，用魔術棒、套索工具、或鋼筆工具一點一點地沿著邊緣描繪，
        頭髮絲那種複雜的邊緣更是讓人崩潰 😩。一張圖搞個 30 分鐘到一小時都是常有的事。
        但現在 AI 只需要幾秒鐘就能完成，而且效果通常比手動去背還要好，
        特別是在處理頭髮、毛髮、透明物體這些超難搞的細節時。
      </p>

      {/* Section 2: How AI works */}
      <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4" id="how-ai-works">AI 去背的原理</h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        AI 去背的核心技術是深度學習（Deep Learning），特別是語義分割（Semantic Segmentation）。
        簡單來說，AI 會分析圖片中的每一個像素，判斷它屬於「前景」還是「背景」。
      </p>
      <p className="text-gray-600 leading-relaxed mb-4">
        具體的運作過程是這樣的：
      </p>
      <ol className="list-decimal pl-6 space-y-2 text-gray-600 mb-4">
        <li><strong className="text-gray-800">大量訓練資料：</strong>開發者會用數百萬張已經標記好前景和背景的圖片來訓練 AI 模型。AI 從這些資料中學習「什麼是主體、什麼是背景」的規則。</li>
        <li><strong className="text-gray-800">特徵提取：</strong>AI 會辨識圖片中的形狀、顏色、紋理、邊緣等特徵，理解不同物件之間的關係。</li>
        <li><strong className="text-gray-800">像素分類：</strong>對每個像素進行分類，標記為前景或背景。進階的模型還會給出「信心值」，對於模糊的邊緣區域，AI 會計算半透明度，讓去背效果更自然。</li>
        <li><strong className="text-gray-800">遮罩生成：</strong>根據分類結果生成一個遮罩（Mask），白色區域代表保留、黑色區域代表移除、灰色區域代表半透明。</li>
        <li><strong className="text-gray-800">輸出結果：</strong>將遮罩套用到原圖上，背景部分變成透明，主體完整保留下來。</li>
      </ol>
      <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-4 my-6">
        <p className="font-bold text-emerald-600 mb-2">💡 提示</p>
        <p className="text-gray-600">
          現代 AI 去背模型（如 U²-Net、MODNet、IS-Net）對頭髮絲等細節的處理已經非常出色，
          邊緣的半透明處理讓去背結果看起來非常自然，幾乎看不出是自動處理的。
        </p>
      </div>

      {/* Section 3: Use cases */}
      <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4" id="use-cases">AI 去背的常見用途</h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        AI 去背的應用範圍比你想像的還要廣！以下是一些最常見的使用場景：
      </p>
      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3" id="ecommerce">🛒 電商商品圖</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        在蝦皮、momo、PChome 等電商平台上架商品時，白底或透明底的商品照片會讓你的商品看起來更專業。
        許多平台甚至要求主圖必須是白色背景。用 AI 去背可以快速把在家拍的商品照變成專業級的產品圖。
      </p>
      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3" id="id-photo">📷 證件照換底色</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        護照、身分證、簽證、求職照都需要特定顏色的背景（通常是白色或藍色）。
        去背後可以輕鬆換成需要的底色，省去重新拍攝或去相館的時間和費用。
      </p>
      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3" id="social-media">📱 社群媒體素材</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        做 IG 限時動態、YouTube 縮圖、Podcast 封面的時候，經常需要把人物或物件放到不同的背景上。
        去背是製作這類素材的第一步。
      </p>
      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3" id="design">🎨 設計與簡報</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        做簡報、海報、傳單設計時，需要把素材從原始背景中分離出來，組合成新的視覺作品。
        AI 去背大幅提升了設計工作的效率。
      </p>
      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3" id="fun">🤪 趣味合成</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        想把自己 P 到巴黎鐵塔前面？想幫寵物做搞笑梗圖？去背就是第一步！
        把主體去背後，就能隨心所欲地合成到任何場景中。
      </p>

      {/* Section 4: Tool comparison */}
      <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4" id="tool-comparison">去背工具比較</h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        市面上有很多去背工具，從免費的線上工具到專業的付費軟體都有。以下幫你整理了幾個最熱門的選擇，
        讓你快速找到最適合自己的工具：
      </p>
      <div className="overflow-x-auto my-6">
        <table className="w-full border-collapse border border-gray-200 text-sm">
          <thead>
            <tr>
              <th className="bg-pink-50 border border-gray-200 px-4 py-2 text-left">功能 / 工具</th>
              <th className="bg-pink-50 border border-gray-200 px-4 py-2 text-left">Mochi Tools</th>
              <th className="bg-pink-50 border border-gray-200 px-4 py-2 text-left">remove.bg</th>
              <th className="bg-pink-50 border border-gray-200 px-4 py-2 text-left">Canva</th>
              <th className="bg-pink-50 border border-gray-200 px-4 py-2 text-left">Photoshop</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-200 px-4 py-2">價格</td>
              <td className="border border-gray-200 px-4 py-2">完全免費 🎉</td>
              <td className="border border-gray-200 px-4 py-2">免費有限制，付費訂閱</td>
              <td className="border border-gray-200 px-4 py-2">去背需要 Pro 版</td>
              <td className="border border-gray-200 px-4 py-2">月費制（約 NT$672/月）</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2">需要註冊</td>
              <td className="border border-gray-200 px-4 py-2">不需要 ✅</td>
              <td className="border border-gray-200 px-4 py-2">免費版不用，高畫質需要</td>
              <td className="border border-gray-200 px-4 py-2">需要</td>
              <td className="border border-gray-200 px-4 py-2">需要</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2">處理速度</td>
              <td className="border border-gray-200 px-4 py-2">極快（數秒內）</td>
              <td className="border border-gray-200 px-4 py-2">快</td>
              <td className="border border-gray-200 px-4 py-2">快</td>
              <td className="border border-gray-200 px-4 py-2">依操作而定</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2">邊緣品質</td>
              <td className="border border-gray-200 px-4 py-2">優秀</td>
              <td className="border border-gray-200 px-4 py-2">優秀</td>
              <td className="border border-gray-200 px-4 py-2">良好</td>
              <td className="border border-gray-200 px-4 py-2">取決於使用者技巧</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2">輸出解析度</td>
              <td className="border border-gray-200 px-4 py-2">原始解析度</td>
              <td className="border border-gray-200 px-4 py-2">免費版有限制</td>
              <td className="border border-gray-200 px-4 py-2">原始解析度</td>
              <td className="border border-gray-200 px-4 py-2">原始解析度</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2">批次處理</td>
              <td className="border border-gray-200 px-4 py-2">支援多張</td>
              <td className="border border-gray-200 px-4 py-2">付費版支援</td>
              <td className="border border-gray-200 px-4 py-2">不支援</td>
              <td className="border border-gray-200 px-4 py-2">透過動作支援</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2">需要安裝</td>
              <td className="border border-gray-200 px-4 py-2">不需要（網頁版）</td>
              <td className="border border-gray-200 px-4 py-2">不需要（網頁版）</td>
              <td className="border border-gray-200 px-4 py-2">不需要（網頁版）</td>
              <td className="border border-gray-200 px-4 py-2">需要安裝軟體</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2">隱私性</td>
              <td className="border border-gray-200 px-4 py-2">本地處理，不上傳伺服器</td>
              <td className="border border-gray-200 px-4 py-2">上傳至伺服器處理</td>
              <td className="border border-gray-200 px-4 py-2">上傳至伺服器處理</td>
              <td className="border border-gray-200 px-4 py-2">本地處理</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-gray-600 leading-relaxed mb-4">
        從表格中可以看出，<Link href="/remove-bg" className="text-pink-500 hover:text-pink-600 font-medium underline decoration-pink-300/40 hover:decoration-pink-600">Mochi Tools 的去背工具</Link>在免費、隱私、速度等方面都有明顯的優勢，
        特別適合不想花錢、不想註冊、又重視隱私的使用者。
      </p>

      {/* Section 5: Step-by-step */}
      <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4" id="step-by-step">用 Mochi Tools 一鍵去背（詳細教學）</h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        接下來手把手教你怎麼用 <Link href="/remove-bg" className="text-pink-500 hover:text-pink-600 font-medium underline decoration-pink-300/40 hover:decoration-pink-600">Mochi Tools 去背工具</Link>來快速去除圖片背景。
        整個過程超簡單，保證你看一次就會 👍。
      </p>
      <ol className="list-decimal pl-6 space-y-2 text-gray-600 mb-4">
        <li>
          <strong className="text-gray-800">打開去背工具：</strong>前往 <Link href="/remove-bg" className="text-pink-500 hover:text-pink-600 font-medium underline decoration-pink-300/40 hover:decoration-pink-600">Mochi Tools 去背頁面</Link>，不需要登入或註冊，直接就能使用。
        </li>
        <li>
          <strong className="text-gray-800">上傳圖片：</strong>點擊頁面上的上傳區域，選擇你要去背的圖片。支援 JPG、PNG、WebP 等常見格式。你也可以直接把圖片拖曳到上傳區域。
        </li>
        <li>
          <strong className="text-gray-800">等待 AI 處理：</strong>上傳後，AI 會在幾秒鐘內自動辨識主體並去除背景。你會看到即時的處理進度。
        </li>
        <li>
          <strong className="text-gray-800">預覽效果：</strong>去背完成後，可以預覽結果。透明的部分通常以棋盤格來表示，你可以確認去背的邊緣是否乾淨。
        </li>
        <li>
          <strong className="text-gray-800">下載結果：</strong>滿意的話，點擊下載按鈕，會得到一張去背後的 PNG 圖片（透明背景）。
        </li>
      </ol>
      <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-4 my-6">
        <p className="font-bold text-emerald-600 mb-2">💡 提示</p>
        <p className="text-gray-600">
          Mochi Tools 的去背功能在你的瀏覽器本地運行，圖片不會被上傳到任何伺服器。
          這代表你的照片隱私是 100% 受保護的，即使是敏感的證件照也可以放心使用！
        </p>
      </div>

      {/* Section 6: Tips for better results */}
      <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4" id="tips-better-results">讓去背效果更好的技巧</h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        雖然 AI 去背已經很厲害了，但如果你想要更完美的結果，可以注意以下幾個小技巧：
      </p>
      <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
        <li><strong className="text-gray-800">確保主體和背景有足夠的對比度：</strong>如果你穿白色衣服站在白色牆前拍照，AI 會比較難區分邊界。盡量讓主體和背景的顏色有明顯差異。</li>
        <li><strong className="text-gray-800">使用高解析度的圖片：</strong>圖片越清晰，AI 能辨識到的細節越多，去背效果也會越好。避免使用模糊或低畫質的圖片。</li>
        <li><strong className="text-gray-800">光線均勻：</strong>充足且均勻的光線能幫助 AI 更準確地判斷邊緣。避免強烈的陰影或逆光拍攝。</li>
        <li><strong className="text-gray-800">主體完整在畫面內：</strong>如果主體的某些部分被裁切掉了（比如手或腳超出畫面），AI 可能會在斷裂處產生不自然的邊緣。</li>
        <li><strong className="text-gray-800">背景越簡單越好：</strong>雖然 AI 能處理複雜背景，但簡單的背景（如單色牆面）會讓結果更精確。</li>
        <li><strong className="text-gray-800">避免主體和背景的顏色太接近：</strong>例如綠色植物在草地背景上，會增加 AI 判斷的難度。</li>
      </ul>

      {/* Section 7: After removal */}
      <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4" id="after-removal">去背後可以做什麼？</h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        去背只是第一步！拿到透明背景的圖片後，你可以進行各種創意應用：
      </p>
      <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
        <li><strong className="text-gray-800">更換背景色：</strong>把透明背景替換為白色、藍色、粉色等純色，適合證件照或電商商品圖。</li>
        <li><strong className="text-gray-800">合成新場景：</strong>把人物放到風景照、室內設計圖或任何你想要的場景中。</li>
        <li><strong className="text-gray-800">製作貼紙：</strong>把去背後的圖片印出來做成個性化貼紙，或用在 LINE 貼圖上。</li>
        <li><strong className="text-gray-800">加入設計作品：</strong>在 Canva、Figma 或其他設計工具中使用去背後的素材。</li>
        <li><strong className="text-gray-800">製作商品展示：</strong>把商品放在不同的展示情境中，提升購買慾望。</li>
      </ul>
      <p className="text-gray-600 leading-relaxed mb-4">
        搭配 Mochi Tools 的其他圖片工具，你可以在去背後進一步壓縮圖片、轉換格式，一站式完成所有圖片處理需求 🚀。
      </p>

      {/* Section 8: Transparent vs white background */}
      <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4" id="transparent-bg">透明背景 vs 白色背景</h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        很多人分不清「透明背景」和「白色背景」的差別。這裡簡單幫你說明：
      </p>
      <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
        <li>
          <strong className="text-gray-800">透明背景：</strong>去背後的預設結果，背景是透明的（在編輯器中通常顯示為棋盤格）。儲存為 PNG 格式時可以保留透明度。這種格式適合用在需要疊加在其他內容上的場景，例如 Logo、貼紙、設計素材。
        </li>
        <li>
          <strong className="text-gray-800">白色背景：</strong>把透明背景填充為白色。如果你要上傳到某些不支援透明背景的平台（例如部分電商平台要求白底圖），或者要儲存為 JPG 格式（JPG 不支援透明），就需要把背景換成白色。
        </li>
      </ul>
      <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-4 my-6">
        <p className="font-bold text-emerald-600 mb-2">💡 提示</p>
        <p className="text-gray-600">
          建議先保留透明背景的 PNG 版本作為「原始素材」，需要白色背景時再另外製作。
          這樣你永遠有最大的彈性可以做後續編輯。
        </p>
      </div>

      {/* Section 9: FAQ */}
      <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4" id="faq">常見問題 FAQ</h2>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3" id="faq-1">Q1：AI 去背真的免費嗎？</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        是的！<Link href="/remove-bg" className="text-pink-500 hover:text-pink-600 font-medium underline decoration-pink-300/40 hover:decoration-pink-600">Mochi Tools 的去背工具</Link>完全免費，沒有次數限制，也不會在圖片上加浮水印。
        其他工具如 remove.bg 的免費版有解析度限制，Canva 的去背功能需要付費 Pro 版才能使用。
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3" id="faq-2">Q2：去背後的圖片畫質會變差嗎？</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        不會！AI 去背只是移除背景像素，不會壓縮或降低主體的畫質。去背後的圖片解析度與原圖相同，
        主體部分的每一個像素都完整保留。唯一的差異是背景從有色變成了透明。
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3" id="faq-3">Q3：哪些類型的圖片最適合 AI 去背？</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        人物照片（全身照、半身照、大頭照）、商品照片、動物照片、物品照片都非常適合。
        AI 對這些常見主體的辨識精確度最高。比較有挑戰性的包括：頭髮非常凌亂的照片、
        半透明物體（如玻璃杯）、和背景顏色極度相近的主體。
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3" id="faq-4">Q4：我的圖片會被上傳到伺服器嗎？隱私安全嗎？</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        使用 <Link href="/remove-bg" className="text-pink-500 hover:text-pink-600 font-medium underline decoration-pink-300/40 hover:decoration-pink-600">Mochi Tools</Link> 的話，完全不用擔心！所有的圖片處理都在你的瀏覽器本地完成，
        圖片不會被上傳到任何伺服器。你的照片只存在於你自己的電腦裡，關閉網頁後就不會留下任何資料。
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3" id="faq-5">Q5：去背後可以儲存為哪些格式？</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        去背後的標準輸出格式是 PNG，因為只有 PNG 支援透明背景。如果你需要 JPG 格式，
        透明部分會自動變成白色（因為 JPG 不支援透明度）。建議先存 PNG 保留最大彈性，
        之後有需要再用圖片轉檔工具轉換。
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3" id="faq-6">Q6：手機可以用嗎？</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        當然可以！<Link href="/remove-bg" className="text-pink-500 hover:text-pink-600 font-medium underline decoration-pink-300/40 hover:decoration-pink-600">Mochi Tools</Link> 是網頁版工具，手機、平板、電腦都可以直接在瀏覽器中使用，
        不需要下載任何 App。在手機上操作跟電腦一樣簡單方便。
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3" id="faq-7">Q7：一次可以處理多張圖片嗎？</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        可以！Mochi Tools 支援批次處理，你可以一次選擇多張圖片進行去背，
        省去逐一上傳的麻煩。處理完畢後可以一次全部下載。
      </p>

      {/* Section 10: Conclusion */}
      <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4" id="conclusion">結論</h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        AI 去背技術已經成熟到讓每個人都能輕鬆使用。無論你是要在電商平台上架商品、
        製作證件照、設計社群媒體素材，還是純粹想做有趣的圖片合成，AI 去背都能幫你在幾秒鐘內搞定。
      </p>
      <p className="text-gray-600 leading-relaxed mb-4">
        在眾多去背工具中，<Link href="/remove-bg" className="text-pink-500 hover:text-pink-600 font-medium underline decoration-pink-300/40 hover:decoration-pink-600">Mochi Tools 的免費去背工具</Link>以完全免費、無需註冊、本地處理保護隱私、
        處理速度快、去背品質高等優勢脫穎而出。如果你還沒試過，現在就去試試看吧 ✨！
      </p>
      <p className="text-gray-600 leading-relaxed mb-4">
        記住，去背最重要的技巧就是：原始圖片的品質越好，去背效果就越好。
        所以下次拍照時，稍微注意一下光線和背景，就能讓 AI 去背的結果更加完美。祝你去背愉快 🎉！
      </p>
    </>
  );
}

export function AiBackgroundRemovalGuideEn() {
  return (
    <>
      <p className="text-gray-600 leading-relaxed mb-4">
        Have you ever tried listing a product on an online marketplace, only to realize the photo you took has a
        messy background — dirty dishes, random clutter, yesterday&apos;s laundry? Or maybe you need a passport photo
        with a solid white background, but the only decent headshot you have was taken in your living room with a
        bookshelf and TV in the background. Wouldn&apos;t it be great if you could just remove the background instantly?
      </p>
      <p className="text-gray-600 leading-relaxed mb-4">
        Great news — with AI-powered background removal, you absolutely can! No Photoshop skills needed, no expensive
        software to buy, and no waiting around for a designer. This comprehensive guide will walk you through
        everything you need to know about AI background removal: how it works, common use cases, tool comparisons,
        and a detailed step-by-step tutorial to get you started.
      </p>

      {/* Section 1: What is AI background removal */}
      <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4" id="what-is-bg-removal-en">What Is AI Background Removal?</h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        AI background removal is a technology that uses artificial intelligence to automatically detect the main subject
        in an image (such as a person, product, or pet) and remove everything else — the background. The result is
        typically an image with a transparent background (saved as a PNG file), which you can then place on any new
        background you like.
      </p>
      <p className="text-gray-600 leading-relaxed mb-4">
        In the old days, removing a background meant opening Photoshop and painstakingly tracing around the subject
        with the pen tool, magic wand, or lasso. Complex edges like hair could take 30 minutes or more for a single
        image. Modern AI can accomplish the same task in just a few seconds — and often with better results, especially
        when dealing with tricky details like wispy hair, fur, or semi-transparent objects.
      </p>

      {/* Section 2: How AI works */}
      <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4" id="how-ai-works-en">How Does AI Background Removal Work?</h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        The core technology behind AI background removal is deep learning, specifically a technique called semantic
        segmentation. In simple terms, the AI analyzes every single pixel in your image and decides whether it belongs
        to the foreground (the subject you want to keep) or the background (everything you want to remove).
      </p>
      <p className="text-gray-600 leading-relaxed mb-4">
        Here is how the process works under the hood:
      </p>
      <ol className="list-decimal pl-6 space-y-2 text-gray-600 mb-4">
        <li><strong className="text-gray-800">Massive training data:</strong> Developers train AI models on millions of images that have been manually labeled with foreground and background masks. The AI learns patterns for what constitutes a &quot;subject&quot; versus a &quot;background.&quot;</li>
        <li><strong className="text-gray-800">Feature extraction:</strong> The AI identifies shapes, colors, textures, and edges within the image to understand the spatial relationships between different objects.</li>
        <li><strong className="text-gray-800">Pixel classification:</strong> Each pixel is classified as foreground or background. Advanced models also calculate a confidence score for ambiguous edge areas, producing semi-transparent values for a more natural look.</li>
        <li><strong className="text-gray-800">Mask generation:</strong> Based on the classification, the model generates a mask — white areas are kept, black areas are removed, and gray areas are partially transparent.</li>
        <li><strong className="text-gray-800">Output:</strong> The mask is applied to the original image, making the background transparent while preserving the subject completely.</li>
      </ol>
      <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-4 my-6">
        <p className="font-bold text-emerald-600 mb-2">💡 Tip</p>
        <p className="text-gray-600">
          Modern AI models like U²-Net, MODNet, and IS-Net handle fine details such as individual hair strands
          remarkably well. The semi-transparent edge processing makes the results look natural and professional —
          often indistinguishable from manual editing.
        </p>
      </div>

      {/* Section 3: Use cases */}
      <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4" id="use-cases-en">Common Use Cases for AI Background Removal</h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        The applications for AI background removal go far beyond what you might expect. Here are the most popular ways
        people use it:
      </p>
      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3" id="ecommerce-en">E-Commerce Product Photos</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        Online marketplaces like Amazon, eBay, Etsy, and Shopee often require (or strongly recommend) product photos
        with clean white backgrounds. AI background removal lets you turn a casual kitchen-table product shot into a
        professional-looking listing in seconds. This can significantly improve click-through rates and conversions.
      </p>
      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3" id="id-photo-en">ID and Passport Photos</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        Passports, visas, and official ID cards typically require a solid-colored background (usually white or blue).
        Instead of visiting a photo studio, you can remove the background from an existing headshot and replace it
        with the required color. This saves both time and money.
      </p>
      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3" id="social-media-en">Social Media Content</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        Creating eye-catching Instagram stories, YouTube thumbnails, or podcast covers often involves placing a person
        or object on a custom background. Background removal is the essential first step in creating these composites.
      </p>
      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3" id="design-en">Design and Presentations</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        Whether you are building a presentation, designing a poster, or creating a flyer, you frequently need to
        isolate subjects from their original backgrounds. AI background removal dramatically speeds up this workflow,
        allowing designers to focus on the creative aspects rather than tedious manual cutouts.
      </p>
      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3" id="fun-en">Fun and Creative Projects</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        Want to put yourself in front of the Eiffel Tower? Create a funny meme with your pet? Make custom stickers?
        Background removal is the starting point for all kinds of fun photo composites and creative projects.
      </p>

      {/* Section 4: Tool comparison */}
      <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4" id="tool-comparison-en">Background Removal Tool Comparison</h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        There are many background removal tools available, from free online services to professional desktop software.
        Here is a detailed comparison of the most popular options to help you choose the best one for your needs:
      </p>
      <div className="overflow-x-auto my-6">
        <table className="w-full border-collapse border border-gray-200 text-sm">
          <thead>
            <tr>
              <th className="bg-pink-50 border border-gray-200 px-4 py-2 text-left">Feature / Tool</th>
              <th className="bg-pink-50 border border-gray-200 px-4 py-2 text-left">Mochi Tools</th>
              <th className="bg-pink-50 border border-gray-200 px-4 py-2 text-left">remove.bg</th>
              <th className="bg-pink-50 border border-gray-200 px-4 py-2 text-left">Canva</th>
              <th className="bg-pink-50 border border-gray-200 px-4 py-2 text-left">Photoshop</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-200 px-4 py-2">Price</td>
              <td className="border border-gray-200 px-4 py-2">Completely free</td>
              <td className="border border-gray-200 px-4 py-2">Free with limits, paid plans</td>
              <td className="border border-gray-200 px-4 py-2">Requires Pro plan</td>
              <td className="border border-gray-200 px-4 py-2">Subscription (~$22/month)</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2">Registration required</td>
              <td className="border border-gray-200 px-4 py-2">No</td>
              <td className="border border-gray-200 px-4 py-2">Free preview: no, HD: yes</td>
              <td className="border border-gray-200 px-4 py-2">Yes</td>
              <td className="border border-gray-200 px-4 py-2">Yes</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2">Processing speed</td>
              <td className="border border-gray-200 px-4 py-2">Very fast (seconds)</td>
              <td className="border border-gray-200 px-4 py-2">Fast</td>
              <td className="border border-gray-200 px-4 py-2">Fast</td>
              <td className="border border-gray-200 px-4 py-2">Depends on skill level</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2">Edge quality</td>
              <td className="border border-gray-200 px-4 py-2">Excellent</td>
              <td className="border border-gray-200 px-4 py-2">Excellent</td>
              <td className="border border-gray-200 px-4 py-2">Good</td>
              <td className="border border-gray-200 px-4 py-2">Depends on user skill</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2">Output resolution</td>
              <td className="border border-gray-200 px-4 py-2">Original resolution</td>
              <td className="border border-gray-200 px-4 py-2">Limited on free plan</td>
              <td className="border border-gray-200 px-4 py-2">Original resolution</td>
              <td className="border border-gray-200 px-4 py-2">Original resolution</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2">Batch processing</td>
              <td className="border border-gray-200 px-4 py-2">Supported</td>
              <td className="border border-gray-200 px-4 py-2">Paid plans only</td>
              <td className="border border-gray-200 px-4 py-2">Not supported</td>
              <td className="border border-gray-200 px-4 py-2">Via Actions</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2">Installation required</td>
              <td className="border border-gray-200 px-4 py-2">No (web-based)</td>
              <td className="border border-gray-200 px-4 py-2">No (web-based)</td>
              <td className="border border-gray-200 px-4 py-2">No (web-based)</td>
              <td className="border border-gray-200 px-4 py-2">Yes (desktop app)</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2">Privacy</td>
              <td className="border border-gray-200 px-4 py-2">Local processing, no upload</td>
              <td className="border border-gray-200 px-4 py-2">Uploaded to servers</td>
              <td className="border border-gray-200 px-4 py-2">Uploaded to servers</td>
              <td className="border border-gray-200 px-4 py-2">Local processing</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-gray-600 leading-relaxed mb-4">
        As the comparison shows, <Link href="/remove-bg" className="text-pink-500 hover:text-pink-600 font-medium underline decoration-pink-300/40 hover:decoration-pink-600">Mochi Tools&apos; background removal tool</Link> stands out
        with its combination of being completely free, requiring no registration, processing images locally for maximum
        privacy, and delivering excellent edge quality.
      </p>

      {/* Section 5: Step-by-step */}
      <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4" id="step-by-step-en">How to Remove Backgrounds with Mochi Tools (Step-by-Step Guide)</h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        Let&apos;s walk through how to use <Link href="/remove-bg" className="text-pink-500 hover:text-pink-600 font-medium underline decoration-pink-300/40 hover:decoration-pink-600">Mochi Tools&apos; background removal tool</Link> to
        quickly remove image backgrounds. The entire process is straightforward and takes just a few moments.
      </p>
      <ol className="list-decimal pl-6 space-y-2 text-gray-600 mb-4">
        <li>
          <strong className="text-gray-800">Open the tool:</strong> Navigate to the <Link href="/remove-bg" className="text-pink-500 hover:text-pink-600 font-medium underline decoration-pink-300/40 hover:decoration-pink-600">Mochi Tools background removal page</Link>. No login or registration is required — you can start using it immediately.
        </li>
        <li>
          <strong className="text-gray-800">Upload your image:</strong> Click the upload area on the page and select the image you want to process. Common formats like JPG, PNG, and WebP are all supported. You can also drag and drop your image directly onto the upload area.
        </li>
        <li>
          <strong className="text-gray-800">Wait for AI processing:</strong> Once uploaded, the AI will automatically detect the subject and remove the background within a few seconds. You will see the processing progress in real time.
        </li>
        <li>
          <strong className="text-gray-800">Preview the result:</strong> After processing is complete, you can preview the result. Transparent areas are typically shown as a checkerboard pattern, making it easy to verify the edges are clean and accurate.
        </li>
        <li>
          <strong className="text-gray-800">Download:</strong> If you are satisfied with the result, click the download button to save the image as a PNG file with a transparent background.
        </li>
      </ol>
      <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-4 my-6">
        <p className="font-bold text-emerald-600 mb-2">💡 Tip</p>
        <p className="text-gray-600">
          Mochi Tools processes everything locally in your browser — your images are never uploaded to any server.
          This means your photos are 100% private, making it safe to use even with sensitive documents like ID photos.
        </p>
      </div>

      {/* Section 6: Tips for better results */}
      <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4" id="tips-better-results-en">Tips for Better Background Removal Results</h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        While AI background removal is already impressively accurate, following these tips can help you achieve
        even better results:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
        <li><strong className="text-gray-800">Ensure good contrast between subject and background:</strong> If you are wearing a white shirt against a white wall, the AI will have a harder time distinguishing the edges. Try to ensure there is a clear color difference between the subject and the background.</li>
        <li><strong className="text-gray-800">Use high-resolution images:</strong> The sharper and more detailed your image, the more information the AI has to work with, resulting in cleaner edges. Avoid using blurry or low-quality photos.</li>
        <li><strong className="text-gray-800">Ensure even lighting:</strong> Good, uniform lighting helps the AI accurately detect edges. Avoid harsh shadows or backlit shots, as these can confuse the segmentation model.</li>
        <li><strong className="text-gray-800">Keep the subject fully in frame:</strong> If parts of the subject are cropped out of the image (like a hand or foot extending beyond the frame), the AI may produce unnatural edges at the cut-off points.</li>
        <li><strong className="text-gray-800">Simpler backgrounds work best:</strong> Although AI can handle complex backgrounds, a simple, uncluttered background (like a solid-colored wall) will produce the most precise results.</li>
        <li><strong className="text-gray-800">Avoid matching colors:</strong> A green plant against a grassy background, or a person in blue against a blue wall, makes it harder for the AI to determine where the subject ends and the background begins.</li>
      </ul>

      {/* Section 7: After removal */}
      <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4" id="after-removal-en">What Can You Do After Removing the Background?</h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        Removing the background is just the beginning! Once you have a transparent-background image, here are some
        popular things you can do with it:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
        <li><strong className="text-gray-800">Change the background color:</strong> Replace the transparent background with a solid color like white, blue, or gray — perfect for ID photos or e-commerce listings.</li>
        <li><strong className="text-gray-800">Create composites:</strong> Place the subject onto a new scene, whether it is a scenic landscape, an interior design mockup, or a branded template.</li>
        <li><strong className="text-gray-800">Make stickers:</strong> Print the cut-out image as personalized stickers, or use it for messaging app sticker packs.</li>
        <li><strong className="text-gray-800">Use in design projects:</strong> Import the transparent-background image into design tools like Canva, Figma, or Adobe Illustrator for professional layouts.</li>
        <li><strong className="text-gray-800">Create product mockups:</strong> Place your product in various lifestyle scenarios to make your listings more appealing and boost buyer confidence.</li>
      </ul>
      <p className="text-gray-600 leading-relaxed mb-4">
        Combined with Mochi Tools&apos; other image utilities, you can compress, convert formats, and further edit your
        images all in one place — a complete image processing workflow without switching between multiple tools.
      </p>

      {/* Section 8: Transparent vs white background */}
      <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4" id="transparent-bg-en">Transparent Background vs. White Background</h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        A common point of confusion is the difference between a transparent background and a white background.
        Here is a clear explanation:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
        <li>
          <strong className="text-gray-800">Transparent background:</strong> This is the default result after background
          removal. The background contains no pixel data — it is completely see-through. In image editors, transparent
          areas are typically displayed as a checkerboard pattern. This format (PNG) is ideal when you need to overlay
          the image on other content, such as logos, stickers, or design elements.
        </li>
        <li>
          <strong className="text-gray-800">White background:</strong> The transparent area is filled with solid white.
          This is needed when uploading to platforms that do not support transparency (some e-commerce sites require
          white-background images), or when saving as JPG format (which does not support transparency). You can easily
          achieve this by placing your transparent PNG on a white canvas.
        </li>
      </ul>
      <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-4 my-6">
        <p className="font-bold text-emerald-600 mb-2">💡 Tip</p>
        <p className="text-gray-600">
          Always keep a copy of the transparent-background PNG as your &quot;master file.&quot; You can create a
          white-background version anytime you need one, but you cannot easily recover transparency from a
          white-background image. Keeping the transparent version gives you maximum flexibility for future edits.
        </p>
      </div>

      {/* Section 9: FAQ */}
      <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4" id="faq-en">Frequently Asked Questions (FAQ)</h2>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3" id="faq-1-en">Q1: Is AI background removal really free?</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        Yes! <Link href="/remove-bg" className="text-pink-500 hover:text-pink-600 font-medium underline decoration-pink-300/40 hover:decoration-pink-600">Mochi Tools&apos; background removal tool</Link> is completely free with
        no usage limits and no watermarks on your output. Other tools like remove.bg limit resolution on their free
        tier, and Canva requires a paid Pro subscription for background removal.
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3" id="faq-2-en">Q2: Will the image quality be reduced after background removal?</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        No! AI background removal only removes background pixels — it does not compress or degrade the quality of the
        subject. The output image retains the same resolution as the original, and every pixel of the subject is
        perfectly preserved. The only change is that the background goes from visible to transparent.
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3" id="faq-3-en">Q3: What types of images work best with AI background removal?</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        Portrait photos (full body, half body, headshots), product photos, animal photos, and isolated objects all
        work exceptionally well. The AI has the highest accuracy with these common subject types. More challenging
        scenarios include images with extremely messy hair, semi-transparent objects (like glass), and subjects that
        are very similar in color to the background.
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3" id="faq-4-en">Q4: Are my images uploaded to a server? Is it safe for privacy?</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        When using <Link href="/remove-bg" className="text-pink-500 hover:text-pink-600 font-medium underline decoration-pink-300/40 hover:decoration-pink-600">Mochi Tools</Link>, you have nothing to worry about. All
        image processing happens locally in your browser — nothing is uploaded to any server. Your photos exist only
        on your own device, and no data is retained after you close the page.
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3" id="faq-5-en">Q5: What formats can I save the result in?</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        The standard output format is PNG, as it is the only widely-supported format that preserves transparency. If
        you need a JPG file, the transparent areas will automatically become white (since JPG does not support
        transparency). We recommend saving as PNG first for maximum flexibility, then converting to other formats as
        needed using an image conversion tool.
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3" id="faq-6-en">Q6: Can I use this on my phone?</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        Absolutely! <Link href="/remove-bg" className="text-pink-500 hover:text-pink-600 font-medium underline decoration-pink-300/40 hover:decoration-pink-600">Mochi Tools</Link> is a web-based tool that works on any device
        with a modern browser — smartphones, tablets, and desktop computers alike. No app download is required, and
        the mobile experience is just as smooth as on a computer.
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3" id="faq-7-en">Q7: Can I process multiple images at once?</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        Yes! Mochi Tools supports batch processing, allowing you to select multiple images for background removal at
        the same time. This saves you from having to upload and process each image individually. Once all images are
        processed, you can download them all at once.
      </p>

      {/* Section 10: Conclusion */}
      <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4" id="conclusion-en">Conclusion</h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        AI background removal technology has matured to the point where anyone can use it effortlessly. Whether you
        need to create professional product photos for your online store, prepare an ID photo with the correct
        background color, design engaging social media content, or simply have fun with creative photo composites,
        AI background removal can get it done in seconds.
      </p>
      <p className="text-gray-600 leading-relaxed mb-4">
        Among the many available tools, <Link href="/remove-bg" className="text-pink-500 hover:text-pink-600 font-medium underline decoration-pink-300/40 hover:decoration-pink-600">Mochi Tools&apos; free background removal tool</Link> stands
        out with its winning combination of features: completely free with no hidden costs, no registration required,
        local processing that keeps your images private, lightning-fast speed, and excellent edge quality. If you
        have not tried it yet, now is the perfect time to give it a go.
      </p>
      <p className="text-gray-600 leading-relaxed mb-4">
        Remember, the single most important factor for great background removal results is the quality of your
        original image. So the next time you take a photo, pay a little attention to the lighting and background
        contrast, and the AI will reward you with even cleaner, more precise results. Happy background removing!
      </p>
    </>
  );
}
