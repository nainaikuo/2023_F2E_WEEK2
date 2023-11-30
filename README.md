# 2023 F2E WEEK2 總統即時開票全台地圖


<a href="https://nainaikuo.github.io/2023_F2E_WEEK2/" target="_blank">點此連結觀看前端畫面</a>
<p>介面為 Yuni 設計</p>
<h2 style="padding-bottom:16px;border-bottom: 1px solid #000;">作品說明</h2> 
      <p>由六角學院主辦的2023年F2E競賽<br>
        主題為總統開票全台地圖<br>
        資料來源為2020年總統選舉資料<br>
      主要使用原生語言<br>
            並搭配第三方圖表套件建構
      </p>
      <h2 style="padding-bottom:16px;border-bottom: 1px solid #000;">程式架構</h2> 
      <ul>
      <li>資料處理
      <p>
            將中選會提供資料整理格式後轉為json<br>
            並使用fetch方式access資料
      </p></li>
      <li>前端畫面渲染
      <p>1. 依access到的資料利用陣列方式建構出html架構並渲染</p>
      <p>2. 監聽頁面事件（如下拉選單值的變更、點選地圖等），並依照需要條件filter出所需資料再做渲染</p>
      <p>3. 圖表使用filter出的資料，並依照chart.js要求格式寫入</p>
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


