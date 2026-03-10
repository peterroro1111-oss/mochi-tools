import { Link } from '@/i18n/routing';

export function FreeIdPhotoMakerGuideZh() {
  return (
    <>
      <p className="text-gray-600 leading-relaxed mb-4">
        你有沒有遇過這種情況？護照快到期了，需要一張新的證件照才能換發，但上次去快拍機拍的時候花了 200
        多塊，照出來還不太滿意 😩。或者你急著要報名考試、辦理證件，結果發現快拍機前面大排長龍，
        光是等拍照就等了半小時。更慘的是，好不容易拍完了，拿到成品一看——眼睛半閉、表情僵硬，
        但因為趕時間只能硬著頭皮交出去。
      </p>
      <p className="text-gray-600 leading-relaxed mb-4">
        其實在 2026 年的今天，你完全不需要再跑一趟照相館或快拍機。只要一支手機、一面白牆，
        再加上一個好用的線上工具，就能在家輕鬆製作出符合規格的證件照。不僅省錢、省時間，
        而且想拍幾次就拍幾次，直到你滿意為止 ✨。
      </p>
      <p className="text-gray-600 leading-relaxed mb-4">
        這篇教學將手把手帶你從拍攝到完成，教你如何用免費的線上工具製作專業級的證件照。
        不管你是要辦護照、身分證、駕照還是各種申請文件，這篇文章都能幫到你！
      </p>

      <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4" id="why-online">
        為什麼要用線上工具做證件照？
      </h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        可能有人會問：「自己做的證件照真的能用嗎？」答案是：當然可以！只要照片符合規定的尺寸、
        背景色、頭部比例等要求，不管你是去照相館拍的還是自己在家做的，效力都是一樣的。
        來看看線上製作證件照有哪些優勢：
      </p>
      <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
        <li><strong className="text-gray-800">完全免費</strong>：不用花 200-300 元去快拍機，也不用花 500 元以上去照相館，線上工具讓你零成本搞定</li>
        <li><strong className="text-gray-800">無限重拍</strong>：在照相館如果對照片不滿意，重拍可能還要加錢。自己拍的話，想拍幾次就拍幾次</li>
        <li><strong className="text-gray-800">隨時可用</strong>：不受營業時間限制，半夜三點突然想到明天要用證件照？打開手機馬上就能處理</li>
        <li><strong className="text-gray-800">保留電子檔</strong>：製作完成後你會得到一份電子檔，之後線上申請各種服務時可以直接上傳，非常方便</li>
        <li><strong className="text-gray-800">隱私安全</strong>：像 Mochi Tools 這樣的工具，所有處理都在瀏覽器本地完成，你的照片不會被上傳到任何伺服器</li>
      </ul>

      <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-4 my-6">
        <p className="font-bold text-emerald-600 mb-2">💡 提示</p>
        <p className="text-gray-600">
          線上申請護照、報名考試等越來越多場合接受電子版證件照直接上傳，有一份隨時可用的電子檔真的很方便。
          建議製作完成後存一份在手機和雲端硬碟裡備用。
        </p>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4" id="photo-specs">
        各種證件照尺寸規格
      </h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        製作證件照之前，最重要的就是搞清楚你需要的尺寸和規格。不同的證件有不同的照片要求，
        搞錯尺寸的話很可能會被退件，白忙一場。以下幫你整理了台灣最常見的證件照規格。
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3" id="specs-table">
        台灣常見證件照尺寸表
      </h3>
      <div className="overflow-x-auto my-6">
        <table className="w-full border-collapse border border-gray-200 text-sm">
          <thead>
            <tr>
              <th className="bg-pink-50 border border-gray-200 px-4 py-2 text-left">證件類型</th>
              <th className="bg-pink-50 border border-gray-200 px-4 py-2 text-left">尺寸</th>
              <th className="bg-pink-50 border border-gray-200 px-4 py-2 text-left">像素（300 DPI）</th>
              <th className="bg-pink-50 border border-gray-200 px-4 py-2 text-left">背景色</th>
              <th className="bg-pink-50 border border-gray-200 px-4 py-2 text-left">備註</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-200 px-4 py-2">護照 / 台胞證</td>
              <td className="border border-gray-200 px-4 py-2">2 x 2 吋（5.1 x 5.1 cm）</td>
              <td className="border border-gray-200 px-4 py-2">600 x 600 px</td>
              <td className="border border-gray-200 px-4 py-2">白色</td>
              <td className="border border-gray-200 px-4 py-2">頭頂到下巴 3.2-3.6 cm</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2">身分證 / 健保卡</td>
              <td className="border border-gray-200 px-4 py-2">2 x 2 吋（5.1 x 5.1 cm）</td>
              <td className="border border-gray-200 px-4 py-2">600 x 600 px</td>
              <td className="border border-gray-200 px-4 py-2">白色</td>
              <td className="border border-gray-200 px-4 py-2">6 個月內近照</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2">駕照</td>
              <td className="border border-gray-200 px-4 py-2">1 吋（2.5 x 3 cm）</td>
              <td className="border border-gray-200 px-4 py-2">300 x 360 px</td>
              <td className="border border-gray-200 px-4 py-2">白色</td>
              <td className="border border-gray-200 px-4 py-2">半身正面脫帽</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2">履歷 / 求職照</td>
              <td className="border border-gray-200 px-4 py-2">2 x 2 吋或 1 吋</td>
              <td className="border border-gray-200 px-4 py-2">依需求</td>
              <td className="border border-gray-200 px-4 py-2">白色或淺藍色</td>
              <td className="border border-gray-200 px-4 py-2">建議使用正式照</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2">學生證</td>
              <td className="border border-gray-200 px-4 py-2">1 吋（2.5 x 3 cm）</td>
              <td className="border border-gray-200 px-4 py-2">300 x 360 px</td>
              <td className="border border-gray-200 px-4 py-2">白色或藍色</td>
              <td className="border border-gray-200 px-4 py-2">依各校規定</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2">簽證（美國）</td>
              <td className="border border-gray-200 px-4 py-2">2 x 2 吋（5.1 x 5.1 cm）</td>
              <td className="border border-gray-200 px-4 py-2">600 x 600 px</td>
              <td className="border border-gray-200 px-4 py-2">白色</td>
              <td className="border border-gray-200 px-4 py-2">6 個月內近照</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2">簽證（申根 / 日本）</td>
              <td className="border border-gray-200 px-4 py-2">3.5 x 4.5 cm</td>
              <td className="border border-gray-200 px-4 py-2">413 x 531 px</td>
              <td className="border border-gray-200 px-4 py-2">白色</td>
              <td className="border border-gray-200 px-4 py-2">頭部比例有嚴格要求</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-gray-600 leading-relaxed mb-4">
        可以看到，台灣最常用的證件照尺寸就是 <strong className="text-gray-800">2 x 2 吋</strong>，
        護照、身分證、健保卡都是用這個規格。如果你要申請國外的簽證，
        則需要注意該國的特殊要求。建議在製作之前先上該機關的官方網站確認最新的照片規格。
      </p>

      <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4" id="step-by-step">
        用 Mochi Tools 製作證件照（詳細步驟）
      </h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        接下來就是重頭戲了！我們要用{' '}
        <Link href="/photo" className="text-pink-500 hover:text-pink-600 font-medium underline decoration-pink-300/40 hover:decoration-pink-600">
          Mochi Tools 的證件照工具
        </Link>{' '}
        來實際製作一張證件照。整個過程只需要幾分鐘，跟著做就對了 👇
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3">步驟一：準備一張合適的照片</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        首先你需要一張正面免冠的大頭照。可以請家人或朋友用手機幫你拍一張，
        或者把手機架好用自拍計時器拍攝。拍攝時注意以下幾點：
      </p>
      <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
        <li>找一面乾淨的白色或淺色牆壁當背景</li>
        <li>面向窗戶或光源，確保臉部光線均勻</li>
        <li>相機與眼睛同高，保持正面平視</li>
        <li>表情自然，嘴巴閉合，不要露齒笑</li>
        <li>不要戴帽子或有色眼鏡</li>
      </ul>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3">步驟二：開啟 Mochi Tools 證件照工具</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        打開瀏覽器，前往{' '}
        <Link href="/photo" className="text-pink-500 hover:text-pink-600 font-medium underline decoration-pink-300/40 hover:decoration-pink-600">
          Mochi Tools 證件照製作頁面
        </Link>
        。這個工具完全免費，而且所有處理都在你的瀏覽器裡完成，照片不會被上傳到任何伺服器，隱私完全有保障。
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3">步驟三：上傳照片</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        點擊頁面上的上傳區域，或直接把照片拖曳進去。支援 JPG、PNG 等常見格式。
        上傳後工具會自動偵測你的臉部位置。
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3">步驟四：選擇證件照規格</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        從預設的規格列表中選擇你需要的證件照類型。工具內建了各國常用的證件照尺寸，
        包括台灣護照（2x2 吋）、美國簽證、日本簽證、歐洲申根簽證等。
        選擇後系統會自動幫你裁切到正確的尺寸和比例。
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3">步驟五：調整裁切範圍</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        工具會自動偵測臉部並進行初步裁切，但你可以手動微調裁切框的位置，
        確保頭頂到下巴的比例符合規定。大部分證件照要求頭部佔照片高度的 70-80%。
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3">步驟六：選擇背景色</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        大部分證件照都要求白色背景。如果你拍攝時的背景不夠乾淨，
        可以利用工具的背景色功能來調整。工具提供白色、淺藍色、紅色等常用的證件照背景色選項。
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3">步驟七：下載完成的證件照</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        確認一切都 OK 之後，點擊下載按鈕就能把證件照存到你的裝置裡了 🎉。
        你會得到一個高解析度的 JPG 或 PNG 檔案，可以直接拿去列印或線上上傳使用。
      </p>

      <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-4 my-6">
        <p className="font-bold text-emerald-600 mb-2">💡 提示</p>
        <p className="text-gray-600">
          建議同時下載一張單張版（用於線上上傳）和一張排版好的多張版（用於列印）。
          這樣不管是數位用途還是紙本用途都準備好了。
        </p>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4" id="shooting-tips">
        自拍證件照的拍攝技巧
      </h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        工具再好用，如果原始照片品質不佳，做出來的證件照也不會好看。
        以下分享幾個專業級的拍攝技巧，讓你在家就能拍出堪比照相館的證件照 📸。
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3" id="lighting">
        光線與背景
      </h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        光線是拍攝好照片最重要的因素，沒有之一。好的光線能讓你的膚色看起來更均勻、更有氣色。
      </p>
      <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
        <li><strong className="text-gray-800">善用自然光</strong>：在白天靠近窗戶的地方拍攝是最好的選擇。面對窗戶站立，讓自然光均勻打在臉上。避免陽光直射，薄紗窗簾是天然的柔光罩</li>
        <li><strong className="text-gray-800">避免頂光和側光</strong>：頭頂的燈光會在眼窩和鼻子下方產生明顯的陰影，讓你看起來很疲憊。側面的光線則會讓臉部一半亮一半暗</li>
        <li><strong className="text-gray-800">白色牆壁當背景</strong>：找一面乾淨的白色牆壁站在前面。距離牆壁約 30-50 公分，這樣可以避免身體在牆上產生陰影</li>
        <li><strong className="text-gray-800">如果沒有白牆</strong>：可以用一張大的白色紙板或白色床單掛在身後當作臨時背景</li>
      </ul>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3" id="pose-expression">
        姿勢與表情
      </h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        證件照對姿勢和表情有明確的要求，以下是務必遵守的重點：
      </p>
      <ol className="list-decimal pl-6 space-y-2 text-gray-600 mb-4">
        <li>正面面對鏡頭，頭不要歪斜或轉向一側</li>
        <li>雙眼平視鏡頭，目光直視前方</li>
        <li>表情自然，嘴巴自然閉合。微笑是可以的，但不要露齒笑</li>
        <li>不要皺眉或瞇眼</li>
        <li>下巴微微收一點點，但不要低頭</li>
        <li>肩膀放鬆、自然下垂，不要聳肩</li>
      </ol>
      <p className="text-gray-600 leading-relaxed mb-4">
        小技巧：拍攝前先對著鏡子練習一下表情，找到一個看起來自然又好看的角度。
        拍攝時可以連拍多張，之後再從中挑選最好的一張 😊。
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3" id="clothing">
        穿著建議
      </h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        穿著雖然不是證件照被拒絕的主要原因，但適當的穿著能讓整體看起來更專業。
      </p>
      <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
        <li><strong className="text-gray-800">避免白色上衣</strong>：因為證件照的背景通常是白色的，穿白色衣服會跟背景混在一起，看起來像「漂浮的頭」</li>
        <li><strong className="text-gray-800">深色系或飽和色系</strong>：深藍、深灰、黑色或酒紅色等深色衣服是最安全的選擇，在白色背景下對比鮮明</li>
        <li><strong className="text-gray-800">簡單的領口設計</strong>：圓領或 V 領的素面上衣最適合，避免過於花俏的圖案或配件</li>
        <li><strong className="text-gray-800">不要穿無袖上衣</strong>：雖然證件照主要拍頭部和肩膀，但無袖上衣可能會讓你看起來像沒穿衣服</li>
      </ul>

      <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4" id="common-mistakes">
        常見錯誤與拒絕原因
      </h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        辛辛苦苦做好了證件照，結果去辦證件的時候被退件，那真的會很崩潰 😤。
        以下列出最常見的證件照被拒絕的原因，提前避開這些地雷：
      </p>
      <ol className="list-decimal pl-6 space-y-2 text-gray-600 mb-4">
        <li><strong className="text-gray-800">尺寸不對</strong>：這是最常見的原因。不同證件要求不同尺寸，務必在製作前確認清楚</li>
        <li><strong className="text-gray-800">背景不是純白色</strong>：很多人以為「差不多白」就好，但其實偏灰、偏黃都可能被退件</li>
        <li><strong className="text-gray-800">頭部比例不對</strong>：頭太大或太小都不行。護照照片通常要求頭頂到下巴佔照片高度的 70-80%</li>
        <li><strong className="text-gray-800">光線不均勻</strong>：臉部有明顯的陰影、一邊亮一邊暗，都會被視為不合格</li>
        <li><strong className="text-gray-800">表情不當</strong>：露齒笑、皺眉、瞇眼、嘟嘴等都不被接受</li>
        <li><strong className="text-gray-800">配戴飾品</strong>：帽子、頭巾（宗教因素除外）、太陽眼鏡、有色隱形眼鏡等都不允許</li>
        <li><strong className="text-gray-800">照片模糊</strong>：手機拍攝時手抖或對焦不準，導致照片不夠清晰</li>
        <li><strong className="text-gray-800">修圖過度</strong>：美肌、瘦臉、大眼等 APP 濾鏡效果會被視為「不像本人」而被拒絕</li>
        <li><strong className="text-gray-800">照片太舊</strong>：大部分證件要求 6 個月內的近照，明顯與本人目前外貌不同的照片會被退件</li>
      </ol>

      <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-4 my-6">
        <p className="font-bold text-emerald-600 mb-2">💡 提示</p>
        <p className="text-gray-600">
          如果你戴眼鏡，拍攝時建議把眼鏡拿下來，或者確保鏡片上沒有反光。
          許多國家（包括台灣）的護照照片已經允許戴眼鏡，但鏡片反光仍然是常見的退件原因。
          最保險的做法就是不戴眼鏡拍攝。
        </p>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4" id="print-guide">
        證件照列印指南
      </h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        做好了電子版證件照之後，很多場合還是需要紙本照片。以下教你幾種列印的方式：
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3">方法一：便利商店列印</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        這是最方便也最便宜的方式。把排版好的證件照檔案存到手機或 USB，
        去 7-11 的 ibon 或全家的 FamiPort 就能列印。選擇 4x6 相片紙列印，
        一張大約只要 6-8 元，上面可以排 4-8 張證件照，算下來每張證件照不到 2 元！
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3">方法二：家用印表機</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        如果你家有支援相片列印的噴墨印表機，可以購買相片紙自己列印。
        建議使用 200g 以上的相片紙，列印品質設定為最高。不過要注意，
        家用印表機的色彩準確度可能不如專業列印，顏色可能會有些偏差。
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3">方法三：線上沖印</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        如果你不趕時間，可以使用線上沖印服務。上傳排版好的照片檔案，
        選擇 4x6 相片沖印，通常一兩天就能收到。沖印的品質比便利商店列印更好，
        顏色更準確，價格也很便宜。
      </p>

      <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-4 my-6">
        <p className="font-bold text-emerald-600 mb-2">💡 提示</p>
        <p className="text-gray-600">
          不管用哪種方式列印，都建議先印一張試試看，確認尺寸正確再大量列印。
          你可以用尺量一下列印出來的照片是否符合規定的尺寸。
          另外，列印前不要對照片做任何額外的縮放或裁切，直接列印原始尺寸的檔案就好。
        </p>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4" id="faq">
        常見問題 FAQ
      </h2>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3">Q1：自己做的證件照去辦護照真的會過嗎？</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        會的！只要你的照片符合外交部規定的規格（尺寸、背景色、頭部比例、表情等），
        不管是照相館拍的還是自己做的，審核標準都是一樣的。關鍵是要仔細遵守各項規定。
        使用{' '}
        <Link href="/photo" className="text-pink-500 hover:text-pink-600 font-medium underline decoration-pink-300/40 hover:decoration-pink-600">
          Mochi Tools
        </Link>{' '}
        的預設規格可以幫你自動處理好尺寸和比例的問題。
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3">Q2：手機拍的照片解析度夠嗎？</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        現在的智慧型手機基本上都有 1200 萬像素以上的相機，拍攝出來的照片遠遠超過證件照所需的解析度
        （通常只需要 600x600 像素左右）。所以手機拍攝的品質絕對足夠，你完全不需要專業相機。
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3">Q3：可以用美肌或濾鏡嗎？</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        <strong className="text-gray-800">絕對不行！</strong>證件照的目的是讓別人能識別你的真實樣貌，
        任何修圖、美肌、瘦臉、大眼等效果都會被視為「與本人不符」而被拒絕。
        拍攝時請關閉手機相機的所有美肌功能，使用原始模式拍攝。微小的亮度和對比度調整是可以接受的，
        但不要做任何會改變五官特徵的修改。
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3">Q4：證件照可以戴眼鏡嗎？</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        台灣的護照和身分證照片目前允許戴眼鏡，但鏡片不能有反光，鏡框不能遮住眼睛。
        不過，許多國家的簽證照片要求不戴眼鏡。為了一勞永逸，最保險的做法是拍攝時不戴眼鏡，
        這樣一張照片就能通用於各種證件。
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3">Q5：在便利商店列印的品質夠好嗎？</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        完全夠用！便利商店的相片列印機品質已經相當不錯，解析度通常有 300 DPI，
        符合證件照的要求。筆者自己就是用便利商店列印的證件照去辦護照，完全沒有問題。
        記得選擇「相片紙」而不是「普通紙」列印喔。
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3">Q6：一張證件照可以用多久？</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        大部分證件規定照片必須是 6 個月內拍攝的近照。但如果你的外貌在這段期間沒有明顯變化，
        實務上通常不會被刁難。不過建議還是定期更新，尤其是髮型、體重有明顯改變的時候。
        用線上工具製作證件照幾乎零成本，隨時可以重新拍一張。
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3">Q7：線上工具做的證件照安全嗎？我的照片會不會被外洩？</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        這取決於你選擇的工具。有些線上工具會將你的照片上傳到伺服器處理，確實存在隱私風險。
        但像{' '}
        <Link href="/photo" className="text-pink-500 hover:text-pink-600 font-medium underline decoration-pink-300/40 hover:decoration-pink-600">
          Mochi Tools
        </Link>{' '}
        這樣的工具，所有的照片處理都在你的瀏覽器本地完成，照片完全不會被上傳到任何伺服器，
        所以不用擔心隱私問題。你可以透過瀏覽器的開發者工具（F12）來確認，
        處理照片時不會有任何網路請求傳送你的照片資料。
      </p>

      <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4" id="conclusion">
        結論
      </h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        製作證件照其實一點都不難，也完全不需要花錢。只要準備好一張合適的照片，
        搭配好用的線上工具，幾分鐘就能搞定。讓我們回顧一下整個流程：
      </p>
      <ol className="list-decimal pl-6 space-y-2 text-gray-600 mb-4">
        <li>確認你需要的證件照規格（尺寸、背景色等）</li>
        <li>在光線充足的白色背景前拍攝一張正面免冠照片</li>
        <li>使用{' '}
          <Link href="/photo" className="text-pink-500 hover:text-pink-600 font-medium underline decoration-pink-300/40 hover:decoration-pink-600">
            Mochi Tools 證件照工具
          </Link>{' '}
          上傳照片、選擇規格、調整裁切
        </li>
        <li>下載完成的證件照（電子檔 + 列印排版檔）</li>
        <li>到便利商店或用家用印表機列印出來</li>
      </ol>
      <p className="text-gray-600 leading-relaxed mb-4">
        整個過程不花一毛錢（好吧，列印的話要花幾塊錢 😆），而且你可以無限重拍直到滿意為止。
        下次需要證件照的時候，記得試試看線上製作的方式，你一定會愛上這種方便又省錢的體驗！
      </p>

      <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-4 my-6">
        <p className="font-bold text-emerald-600 mb-2">💡 提示</p>
        <p className="text-gray-600">
          把這篇文章收藏起來，下次需要證件照的時候就不用再到處找資料了。
          也歡迎分享給身邊有需要的朋友，讓大家都能輕鬆省錢做出好看的證件照！
        </p>
      </div>
    </>
  );
}

export function FreeIdPhotoMakerGuideEn() {
  return (
    <>
      <p className="text-gray-600 leading-relaxed mb-4">
        We have all been there. You need a passport photo urgently, but the nearest photo booth has
        a long queue, and you are not sure it is worth spending $15-20 for a set of photos you might
        not even like. Or maybe your passport is expiring, your driver&apos;s license needs renewing, or
        you are applying for a visa, and you just need one simple photo that meets the official
        requirements. Sounds familiar?
      </p>
      <p className="text-gray-600 leading-relaxed mb-4">
        Here is the good news: in 2026, you absolutely do not need to visit a photo studio or hunt
        for a photo booth. With just your smartphone, a plain wall, and a free online tool, you can
        create a professional-quality ID photo from the comfort of your home. You can retake it as
        many times as you need until you are happy with the result, and it will not cost you a cent.
      </p>
      <p className="text-gray-600 leading-relaxed mb-4">
        This comprehensive guide will walk you through the entire process, from capturing the
        perfect shot to downloading a print-ready file. Whether you need a photo for a passport,
        visa application, driver&apos;s license, or any other official document, this article has you
        covered.
      </p>

      <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4" id="why-online-en">
        Why Use an Online Tool for ID Photos?
      </h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        You might be wondering: &quot;Will a self-made ID photo actually be accepted?&quot; The answer is a
        resounding yes. As long as your photo meets the required specifications for size, background
        color, head proportions, and expression, it does not matter whether it was taken at a
        professional studio or in your living room. Here are the key advantages of making your own
        ID photos online:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
        <li><strong className="text-gray-800">Completely free</strong>: No more paying $10-20 at photo booths or $25+ at professional studios. Online tools let you create ID photos at zero cost</li>
        <li><strong className="text-gray-800">Unlimited retakes</strong>: At a photo studio, retaking your photo usually means extra charges. When you do it yourself, you can take as many shots as you need</li>
        <li><strong className="text-gray-800">Available 24/7</strong>: Not limited by business hours. Need an ID photo at midnight before an early morning appointment? Just open your browser</li>
        <li><strong className="text-gray-800">Digital file included</strong>: You get a digital copy that you can use for online applications, saving you from scanning printed photos</li>
        <li><strong className="text-gray-800">Privacy-first</strong>: Tools like Mochi Tools process everything locally in your browser. Your photos are never uploaded to any server</li>
      </ul>

      <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-4 my-6">
        <p className="font-bold text-emerald-600 mb-2">💡 Tip</p>
        <p className="text-gray-600">
          More and more government agencies and institutions now accept digital ID photos for online
          applications. Having a ready-to-use digital file can save you significant time. We recommend
          keeping a copy on your phone and in cloud storage for quick access whenever you need it.
        </p>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4" id="photo-specs-en">
        ID Photo Size Specifications
      </h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        Before creating your ID photo, the most important step is understanding the exact
        specifications required. Different documents and different countries have different
        requirements, and submitting the wrong size will result in rejection. Here is a
        comprehensive reference table for the most commonly needed ID photo sizes.
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3" id="specs-table-en">
        Common ID Photo Sizes by Country and Document
      </h3>
      <div className="overflow-x-auto my-6">
        <table className="w-full border-collapse border border-gray-200 text-sm">
          <thead>
            <tr>
              <th className="bg-pink-50 border border-gray-200 px-4 py-2 text-left">Document Type</th>
              <th className="bg-pink-50 border border-gray-200 px-4 py-2 text-left">Size</th>
              <th className="bg-pink-50 border border-gray-200 px-4 py-2 text-left">Pixels (300 DPI)</th>
              <th className="bg-pink-50 border border-gray-200 px-4 py-2 text-left">Background</th>
              <th className="bg-pink-50 border border-gray-200 px-4 py-2 text-left">Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-200 px-4 py-2">US Passport</td>
              <td className="border border-gray-200 px-4 py-2">2 x 2 in (5.1 x 5.1 cm)</td>
              <td className="border border-gray-200 px-4 py-2">600 x 600 px</td>
              <td className="border border-gray-200 px-4 py-2">White</td>
              <td className="border border-gray-200 px-4 py-2">Head height 1-1.375 in</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2">US Visa</td>
              <td className="border border-gray-200 px-4 py-2">2 x 2 in (5.1 x 5.1 cm)</td>
              <td className="border border-gray-200 px-4 py-2">600 x 600 px</td>
              <td className="border border-gray-200 px-4 py-2">White</td>
              <td className="border border-gray-200 px-4 py-2">Taken within 6 months</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2">UK Passport</td>
              <td className="border border-gray-200 px-4 py-2">3.5 x 4.5 cm</td>
              <td className="border border-gray-200 px-4 py-2">413 x 531 px</td>
              <td className="border border-gray-200 px-4 py-2">Light gray or cream</td>
              <td className="border border-gray-200 px-4 py-2">No glasses allowed</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2">EU / Schengen Visa</td>
              <td className="border border-gray-200 px-4 py-2">3.5 x 4.5 cm</td>
              <td className="border border-gray-200 px-4 py-2">413 x 531 px</td>
              <td className="border border-gray-200 px-4 py-2">White or light gray</td>
              <td className="border border-gray-200 px-4 py-2">Strict head proportion rules</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2">Canadian Passport</td>
              <td className="border border-gray-200 px-4 py-2">5 x 7 cm</td>
              <td className="border border-gray-200 px-4 py-2">591 x 827 px</td>
              <td className="border border-gray-200 px-4 py-2">White</td>
              <td className="border border-gray-200 px-4 py-2">Face height 31-36 mm</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2">Australian Passport</td>
              <td className="border border-gray-200 px-4 py-2">3.5 x 4.5 cm</td>
              <td className="border border-gray-200 px-4 py-2">413 x 531 px</td>
              <td className="border border-gray-200 px-4 py-2">White</td>
              <td className="border border-gray-200 px-4 py-2">Taken within 6 months</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2">Japanese Visa</td>
              <td className="border border-gray-200 px-4 py-2">4.5 x 4.5 cm</td>
              <td className="border border-gray-200 px-4 py-2">531 x 531 px</td>
              <td className="border border-gray-200 px-4 py-2">White</td>
              <td className="border border-gray-200 px-4 py-2">Taken within 6 months</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2">Indian Passport</td>
              <td className="border border-gray-200 px-4 py-2">3.5 x 3.5 cm</td>
              <td className="border border-gray-200 px-4 py-2">413 x 413 px</td>
              <td className="border border-gray-200 px-4 py-2">White</td>
              <td className="border border-gray-200 px-4 py-2">Face covers 70-80% of frame</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-gray-600 leading-relaxed mb-4">
        As you can see, the <strong className="text-gray-800">2 x 2 inch</strong> format is the
        most widely used, especially for US passports and visa applications. European and many
        Asian countries commonly use the <strong className="text-gray-800">3.5 x 4.5 cm</strong> format.
        Always check the official website of the issuing authority before creating your photo
        to confirm the latest requirements.
      </p>

      <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4" id="step-by-step-en">
        How to Create an ID Photo with Mochi Tools (Step-by-Step)
      </h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        Now for the main event. Let us walk through the entire process of creating a
        professional ID photo using{' '}
        <Link href="/photo" className="text-pink-500 hover:text-pink-600 font-medium underline decoration-pink-300/40 hover:decoration-pink-600">
          Mochi Tools&apos; ID Photo Maker
        </Link>
        . The whole thing takes just a few minutes.
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3">Step 1: Take a Suitable Photo</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        Start by capturing a front-facing photo of yourself. Ask a friend or family member to
        take the picture, or use your phone&apos;s self-timer feature with a tripod or stable surface.
        Keep these tips in mind while shooting:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
        <li>Stand in front of a clean white or light-colored wall</li>
        <li>Face a window or light source so your face is evenly lit</li>
        <li>Hold the camera at eye level, looking straight ahead</li>
        <li>Keep a natural expression with your mouth closed — no toothy smiles</li>
        <li>Remove hats, sunglasses, and tinted lenses</li>
      </ul>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3">Step 2: Open the Mochi Tools ID Photo Maker</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        Open your browser and navigate to the{' '}
        <Link href="/photo" className="text-pink-500 hover:text-pink-600 font-medium underline decoration-pink-300/40 hover:decoration-pink-600">
          Mochi Tools ID Photo page
        </Link>
        . The tool is completely free to use, and all processing happens locally in your
        browser. Your photos are never uploaded to any server, so your privacy is fully protected.
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3">Step 3: Upload Your Photo</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        Click the upload area on the page or drag and drop your photo directly into it. The tool
        supports common formats like JPG and PNG. Once uploaded, it will automatically detect your
        face position.
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3">Step 4: Select Your ID Photo Specification</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        Choose the document type you need from the preset specification list. The tool includes
        built-in sizes for commonly used ID photos worldwide, including US passport (2x2 inches),
        UK passport, EU Schengen visa, Canadian passport, and many more. Once selected, the system
        will automatically crop your photo to the correct dimensions and proportions.
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3">Step 5: Adjust the Crop Area</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        The tool automatically detects your face and performs an initial crop, but you can manually
        fine-tune the crop frame position to ensure the head-to-chin ratio meets the requirements.
        Most ID photos require the head to occupy 70-80% of the photo height.
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3">Step 6: Choose Background Color</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        Most ID photos require a white background. If your shooting background was not perfectly
        clean, you can use the tool&apos;s background color feature to adjust it. The tool offers
        white, light blue, red, and other commonly used ID photo background colors.
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3">Step 7: Download Your Finished ID Photo</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        Once everything looks good, click the download button to save the ID photo to your device.
        You will get a high-resolution JPG or PNG file that is ready for printing or online
        submission.
      </p>

      <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-4 my-6">
        <p className="font-bold text-emerald-600 mb-2">💡 Tip</p>
        <p className="text-gray-600">
          We recommend downloading both a single photo version (for online uploads) and a
          multi-photo layout version (for printing). This way you are prepared for both digital
          and print applications.
        </p>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4" id="shooting-tips-en">
        Tips for Taking the Perfect ID Photo at Home
      </h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        Even the best editing tool cannot fix a poorly taken photo. Here are some professional-level
        tips to help you capture a studio-quality shot right at home.
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3" id="lighting-en">
        Lighting and Background
      </h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        Lighting is the single most important factor in getting a good photo. Proper lighting makes
        your skin tone look even and healthy.
      </p>
      <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
        <li><strong className="text-gray-800">Use natural light</strong>: The best approach is to stand near a window during the day, facing it directly. Natural light through a sheer curtain acts as a perfect diffuser, creating soft, even illumination on your face</li>
        <li><strong className="text-gray-800">Avoid overhead and side lighting</strong>: Ceiling lights create harsh shadows under your eyes and nose, making you look tired. Side lighting creates an uneven half-lit, half-dark appearance</li>
        <li><strong className="text-gray-800">Use a white wall</strong>: Stand in front of a clean white wall. Position yourself about 12-20 inches away from the wall to prevent your body from casting shadows on it</li>
        <li><strong className="text-gray-800">No white wall available?</strong> Use a large sheet of white poster board or a white bedsheet hung behind you as a temporary backdrop</li>
      </ul>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3" id="pose-expression-en">
        Pose and Expression
      </h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        ID photos have very specific requirements for pose and facial expression. Here are the
        essential rules to follow:
      </p>
      <ol className="list-decimal pl-6 space-y-2 text-gray-600 mb-4">
        <li>Face the camera directly — do not tilt or turn your head to one side</li>
        <li>Look straight into the camera lens with both eyes open</li>
        <li>Maintain a natural expression with your mouth gently closed. A slight smile is acceptable, but avoid showing teeth</li>
        <li>Do not frown or squint</li>
        <li>Tuck your chin slightly, but do not look down</li>
        <li>Relax your shoulders — do not hunch or shrug</li>
      </ol>
      <p className="text-gray-600 leading-relaxed mb-4">
        Pro tip: Practice your expression in a mirror before shooting. When it is time to take the
        photo, use burst mode to capture multiple shots and pick the best one afterward.
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3" id="clothing-en">
        What to Wear
      </h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        While clothing is rarely a reason for rejection, wearing the right outfit can make your ID
        photo look much more professional.
      </p>
      <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
        <li><strong className="text-gray-800">Avoid white tops</strong>: Since ID photos typically have a white background, a white shirt will blend into the background and make you look like a floating head</li>
        <li><strong className="text-gray-800">Stick to dark or saturated colors</strong>: Navy, dark gray, black, or burgundy create strong contrast against a white background and look polished</li>
        <li><strong className="text-gray-800">Keep it simple</strong>: A plain crew neck or V-neck top works best. Avoid busy patterns, logos, or flashy accessories</li>
        <li><strong className="text-gray-800">Skip sleeveless tops</strong>: Although ID photos mainly capture your head and shoulders, sleeveless tops can create the illusion that you are not wearing a shirt</li>
      </ul>

      <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4" id="common-mistakes-en">
        Common Mistakes and Rejection Reasons
      </h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        There is nothing more frustrating than putting effort into creating an ID photo only to
        have it rejected at the office. Here are the most common reasons ID photos get turned down,
        so you can avoid these pitfalls:
      </p>
      <ol className="list-decimal pl-6 space-y-2 text-gray-600 mb-4">
        <li><strong className="text-gray-800">Wrong dimensions</strong>: This is the number one reason for rejection. Different documents require different sizes, so always verify before you start</li>
        <li><strong className="text-gray-800">Background is not plain white</strong>: Many people think &quot;close to white&quot; is good enough, but even slightly gray or yellowish backgrounds can be rejected</li>
        <li><strong className="text-gray-800">Incorrect head proportions</strong>: If your head is too large or too small in the frame, it will not pass. Passport photos typically require the head to occupy 70-80% of the frame height</li>
        <li><strong className="text-gray-800">Uneven lighting</strong>: Visible shadows on the face, or one side being brighter than the other, will be deemed unacceptable</li>
        <li><strong className="text-gray-800">Inappropriate expression</strong>: Showing teeth, frowning, squinting, or pouting are all grounds for rejection</li>
        <li><strong className="text-gray-800">Wearing accessories</strong>: Hats, headbands (except for religious reasons), sunglasses, and colored contact lenses are not allowed</li>
        <li><strong className="text-gray-800">Blurry image</strong>: Camera shake or poor focus results in an image that does not meet the clarity requirements</li>
        <li><strong className="text-gray-800">Over-editing</strong>: Beauty filters, skin smoothing, face slimming, and eye enlargement effects will be flagged as not representing your true appearance</li>
        <li><strong className="text-gray-800">Outdated photo</strong>: Most documents require a photo taken within the last 6 months. A photo that no longer resembles your current appearance will be rejected</li>
      </ol>

      <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-4 my-6">
        <p className="font-bold text-emerald-600 mb-2">💡 Tip</p>
        <p className="text-gray-600">
          If you wear glasses, consider removing them for the photo. While some countries allow
          glasses in ID photos, lens glare remains one of the most common reasons for rejection.
          The safest approach is to take the photo without glasses. In fact, since 2016 the US
          State Department has recommended removing glasses for passport photos to avoid glare issues.
        </p>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4" id="print-guide-en">
        How to Print Your ID Photos
      </h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        Once you have your digital ID photo ready, many applications still require a physical
        printed copy. Here are several ways to get your photos printed.
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3">Option 1: Pharmacy or Retail Store Printing</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        This is the most convenient and affordable option for most people. Stores like CVS,
        Walgreens, Walmart, and Target all offer photo printing kiosks. Simply transfer your
        multi-photo layout file to a USB drive or send it to the store&apos;s printing service via
        their app. Print on 4x6 glossy photo paper. The cost is typically under $1 for a sheet
        that contains 4-8 ID photos, making each individual photo essentially free.
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3">Option 2: Home Printer</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        If you have an inkjet printer that supports photo printing, you can purchase glossy photo
        paper (at least 200gsm) and print at home. Set your print quality to the highest available
        setting. Keep in mind that home printers may not match the color accuracy of professional
        printing services, so colors might be slightly off.
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3">Option 3: Online Printing Services</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        If you are not in a rush, online printing services like Shutterfly, Snapfish, or Amazon
        Photos offer excellent quality at low prices. Upload your layout file, select 4x6 photo
        printing, and your prints will arrive in a few days. The quality is usually superior to
        retail store kiosks, and the cost is comparable.
      </p>

      <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-4 my-6">
        <p className="font-bold text-emerald-600 mb-2">💡 Tip</p>
        <p className="text-gray-600">
          Regardless of which printing method you choose, always print a test sheet first to verify
          that the dimensions are correct before printing in bulk. Use a ruler to measure the
          printed photo against the required specifications. Also, make sure you print at the
          original size without any scaling or fitting options enabled in the print dialog.
        </p>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4" id="faq-en">
        Frequently Asked Questions
      </h2>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3">Q1: Will a self-made ID photo actually be accepted for a passport application?</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        Absolutely. Government agencies do not care where or how your photo was taken. They only
        care that it meets the published specifications for size, background color, head
        proportions, expression, and image quality. Using{' '}
        <Link href="/photo" className="text-pink-500 hover:text-pink-600 font-medium underline decoration-pink-300/40 hover:decoration-pink-600">
          Mochi Tools
        </Link>{' '}
        with the correct preset ensures your photo automatically meets the dimensional and
        proportion requirements.
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3">Q2: Is my smartphone camera good enough for ID photos?</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        Yes, modern smartphones easily exceed the resolution requirements for ID photos. Most ID
        photos only need about 600x600 pixels (for 2x2 inch at 300 DPI), while even budget
        smartphones today capture images at 12 megapixels or more. The quality of your smartphone
        camera is more than sufficient. The key factors are proper lighting and a steady hand, not
        the camera hardware.
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3">Q3: Can I use beauty filters or photo editing apps?</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        <strong className="text-gray-800">Absolutely not.</strong> The purpose of an ID photo is to
        accurately represent your real appearance so that officials can verify your identity.
        Any beauty filters, skin smoothing, face slimming, or eye enlargement effects will be
        grounds for rejection. Shoot in your camera&apos;s standard mode with all beauty features
        turned off. Minor adjustments to brightness and contrast are generally acceptable, but do
        not alter any facial features.
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3">Q4: Can I wear glasses in my ID photo?</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        This varies by country and document type. The US State Department now recommends removing
        glasses for passport photos due to frequent issues with lens glare. The UK requires
        glasses to be removed entirely. Some countries still allow glasses as long as there is no
        glare and the frames do not obscure your eyes. For maximum versatility, take your photo
        without glasses so you can use it across multiple applications and countries.
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3">Q5: How long is an ID photo valid?</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        Most official documents require a photo taken within the last 6 months. However, if your
        appearance has not changed significantly, older photos may still be accepted in practice.
        That said, it is always best to use a recent photo. Since creating an ID photo with an
        online tool costs nothing, there is no reason not to take a fresh one whenever you need it.
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3">Q6: Are online ID photo tools safe? Could my photo be leaked?</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        This depends entirely on the tool you choose. Some online tools upload your photo to their
        servers for processing, which does present a privacy risk. However, tools like{' '}
        <Link href="/photo" className="text-pink-500 hover:text-pink-600 font-medium underline decoration-pink-300/40 hover:decoration-pink-600">
          Mochi Tools
        </Link>{' '}
        process everything locally in your browser. Your photo never leaves your device, so there
        is zero risk of it being leaked or stored on a remote server. You can verify this yourself
        by opening your browser&apos;s developer tools (F12) and checking the Network tab while
        processing your photo — you will see that no image data is transmitted.
      </p>

      <h3 className="text-lg font-bold text-gray-700 mt-6 mb-3">Q7: What if my photo gets rejected? Do I need to start over?</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        If your photo is rejected, first identify the specific reason. Common issues like wrong
        dimensions, poor lighting, or incorrect background are easy to fix. You might just need to
        retake the photo with better conditions or adjust the crop settings in the tool. Since{' '}
        <Link href="/photo" className="text-pink-500 hover:text-pink-600 font-medium underline decoration-pink-300/40 hover:decoration-pink-600">
          Mochi Tools
        </Link>{' '}
        is free and unlimited, you can create as many versions as needed until you get it right.
        The key advantage of doing it yourself is exactly this: the ability to iterate quickly at
        no cost.
      </p>

      <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4" id="conclusion-en">
        Conclusion
      </h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        Creating a professional ID photo is surprisingly simple and does not need to cost you
        anything. With the right preparation and a good online tool, you can have a compliant,
        print-ready ID photo in just minutes. Here is a quick recap of the process:
      </p>
      <ol className="list-decimal pl-6 space-y-2 text-gray-600 mb-4">
        <li>Verify the exact specifications required for your document (size, background color, etc.)</li>
        <li>Take a well-lit, front-facing photo against a plain white background</li>
        <li>Upload it to{' '}
          <Link href="/photo" className="text-pink-500 hover:text-pink-600 font-medium underline decoration-pink-300/40 hover:decoration-pink-600">
            Mochi Tools ID Photo Maker
          </Link>
          , select your specification, and adjust the crop
        </li>
        <li>Download the finished photo (single version for digital use and layout version for printing)</li>
        <li>Print at a local store, at home, or through an online printing service</li>
      </ol>
      <p className="text-gray-600 leading-relaxed mb-4">
        The entire process costs nothing (well, maybe a few cents for printing), and you can retake
        and redo it as many times as you want until you are completely satisfied. Next time you need
        an ID photo, skip the photo booth queue and try the online approach. Once you see how easy
        it is, you will never go back to the old way.
      </p>

      <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-4 my-6">
        <p className="font-bold text-emerald-600 mb-2">💡 Tip</p>
        <p className="text-gray-600">
          Bookmark this guide for the next time you need an ID photo. Feel free to share it with
          friends and family who might find it useful. Everyone deserves to save time and money on
          something as simple as an ID photo.
        </p>
      </div>
    </>
  );
}
