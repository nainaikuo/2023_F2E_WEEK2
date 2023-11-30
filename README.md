# 2023 F2E WEEK2 總統即時開票全台地圖


<a href="https://nainaikuo.github.io/2023_F2E_WEEK2/" target="_blank">點此連結觀看前端畫面</a>
<p>介面為 Yuni 設計</p>
<h2 style="padding-bottom:16px;border-bottom: 1px solid #000;">作品說明</h2> 
      <p>由六角學院主辦的2023年F2E競賽<br>
        主題為總統開票全台地圖<br>
            主要功能為讓user可依照想檢視的地區篩選出資料及圖表觀看<br>
        資料來源：<a href="https://db.cec.gov.tw/ElecTable/Election/ElecTickets?dataType=tickets&typeId=ELC&subjectId=P0&legisId=00&themeId=1f7d9f4f6bfe06fdaf4db7df2ed4d60c&dataLevel=N&prvCode=00&cityCode=000&areaCode=00&deptCode=000&liCode=0000">2020年總統選舉資料</a><br>
      使用前端原生語言並搭配第三方圖表套件建構<br>
      </p>
      <h2 style="padding-bottom:16px;border-bottom: 1px solid #000;">程式架構</h2> 
      <ul>
      <li>資料處理與取得
      <p>
            將中選會提供資料整理格式後轉為json陣列資料<br>
            並使用fetch方式access資料
      </p>
      </li>
            <li>篩選資料
      <p>
            透過監聽畫面事件（如：改變下拉選單及點擊地圖）<br>
            取得目前select值或埋於地圖svg內的id value<br>
            filter出符合條件的資料
      </p>
      </li>
            <li>頁面文字渲染
      <p>
            依據篩選出陣列資料<br>
            計算出所需數值（如總票數及投票率）
            建構出html結構並寫入指定DOM<br>
      </p>
      </li>
            <li>頁面圖表渲染
      <p>
            依據篩選出陣列資料<br>
            計算出所需數值（如總票數及投票率）<br>
            依照chart.js所要求格式建構資料<br>
            並寫入指定DOM
      </p>
      </li>
      </ul>
      <h2 style="padding-bottom:16px;border-bottom: 1px solid #000;">執行流程</h2> 
      <p>如需下載至本地執行，HTML檔案請使用live server開啟
      </p>
    <h2 style="padding-bottom:16px;border-bottom: 1px solid #000;">資料夾說明</h2>
      <ul>
      <li>scss - scss檔案放置處，並分為font color reset及style主檔</li>
      <li>img - 網頁內圖片元素</li>
      <li>data - 選舉資料放置處</li>
      </ul>
      <h2 style="padding-bottom:16px;border-bottom: 1px solid #000;">使用技術</h2>
      <ul>
      <li>HTML5</li>
      <li>CSS3</li>
      <li>JavaScript ES6</li>
      </ul>
      <h2 style="padding-bottom:16px;border-bottom: 1px solid #000;">第三方服務</h2>
      <ul>
      <li>chart.js</li>
      </ul>


