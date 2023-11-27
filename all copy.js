const dataUrl = "2020總統選舉資料.json"
const filterArea =  document.querySelector(".filter")
const map = document.querySelector(".map")
const clearBtn = document.querySelector(".clear")
// 拿資料整理格式並render
function init(){
    const hints = document.querySelector(".hints")
    hints.style.display="flex"
    const detail = document.querySelector(".detail")
    detail.style.display="none"
    fetch(dataUrl)
        .then(function (response) {
            return response.json();

        })
        .then(function (result) {
            // console.log(result)
            // 整理格式
            // 取出data內的物件名稱
            const keys = Object.keys(result[0])
            
            keys.splice(0,3)
            result.forEach(i=>{
                // 將得票數轉為數字
                keys.forEach(key=>{
                    i[key] = parseInt(i[key])
                })
            })
            const data = result ;
            // console.log(data)
            initSelect(data)
            renderLeftCard(data)
        });
}

function initSelect(data){
    let selectOption = []
    data.forEach(i=>{
        // console.log(i[selectId])
        if(selectOption.indexOf(i.city)===-1){
            selectOption.push(i.city)
        }else{
            return
        }
    })
    // 用整理出的資料loop出HTML結構
    // console.log(selectOption)
    let selectOptionContent = "<option value='all'>全部</option>"
    selectOption.forEach(selectId=>{
        selectOptionContent+= `<option value="${selectId}">${selectId}</option>`
    })
    console.log(selectOptionContent)
    const citySelect = document.querySelector(`select#city`);
    const areaSelect = document.querySelector(`select#area`);
    const villageSelect = document.querySelector(`select#village`);
    // 放進select中
    citySelect.innerHTML=selectOptionContent
    areaSelect.innerHTML=`<option value="all">請先選擇縣市</option>`
    villageSelect.innerHTML=`<option value="all">請先選擇區域</option>`
}

function filter(e) {
    display()
    // 取得所select的值
    const value =  e.target.value;
    // 是哪一個select
    const id = e.target.id
    const citySelectValue = document.querySelector("select#city").value
    const areaSelectValue = document.querySelector("select#area").value
    const villageSelectValue = document.querySelector("select#village").value
    
        fetch(dataUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (result) {
            // 整理格式
            // 取出data內的物件名稱
            const keys = Object.keys(result[0])
            keys.splice(0,3)
            result.forEach(i=>{
                // 將得票數轉為數字
                keys.forEach(key=>{
                    i[key] = parseInt(i[key])
                })
            })
            // 如果選縣市就filter出選到縣市的資料
            if(id==="city"){
                const filterData = result.filter(i=>i["city"]===value)
                renderSelect(filterData,"area")
                renderLeftCard(filterData)
                renderDetailCard(filterData)
            }else if(id==="area"){
                
                // console.log(citySelectValue)
                const filterData = result.filter(i=>i["city"]===citySelectValue&&i["area"]===value)
                renderSelect(filterData,"village")
                renderLeftCard(filterData)
            }else if(id==="village"){
                
                const filterData = result.filter(i=>i["city"]===citySelectValue&&i["area"]===areaSelectValue&&i["village"]===value)
                renderLeftCard(filterData)
            }
            

        });
    
    
  }

function display(){
    const hints = document.querySelector(".hints")
    hints.style.display="none"
    const detail = document.querySelector(".detail")
    detail.style.display="flex"
}

function mapFilter(e){
    display()
    const city = e.target.id
    if(!city){
        return
    }
    fetch(dataUrl)
        .then(function (response) {
            return response.json();

        })
        .then(function (result) {
            // console.log(result)
            // 整理格式
            // 取出data內的物件名稱
            const keys = Object.keys(result[0])
            
            keys.splice(0,3)
            result.forEach(i=>{
                // 將得票數轉為數字
                keys.forEach(key=>{
                    i[key] = parseInt(i[key])
                })
            })
            const data = result ;
            const filterData = data.filter(i=>i.city===city)
            const citySelector = document.querySelector("select#city")
            citySelector.value = city             
            renderSelect(filterData,"area")

            renderLeftCard(filterData)
            renderDetailCard(filterData,e)
            
        });

}

// render選單
function renderSelect(data,selectId){
    let selectOption = []
    data.forEach(i=>{
        // console.log(i[selectId])
        if(selectOption.indexOf(i[selectId])===-1){
            selectOption.push(i[selectId])
        }else{
            return
        }
    })
    // 用整理出的資料loop出HTML結構
    // console.log(selectOption)
    let selectOptionContent = "<option value='all'>全部</option>"
    selectOption.forEach(selectId=>{
        selectOptionContent+= `<option value="${selectId}">${selectId}</option>`
    })
    const select = document.querySelector(`select#${selectId}`);

    // 放進select中
    select.innerHTML=selectOptionContent
  }
function renderVoteNum(data){
    // console.log(data)
    // 有效
    let sumValidNum = 0
    // 無效
    let sumInvalidNum = 0
    // 總投票數
    let sumTotalVoteNum = 0
    // 總選舉人數
    let sumTotalNum = 0
    // 投票率
    let voteRate = 0
    // console.log(data)

    data.forEach((i,index)=>{
        // console.log(index,i.valid_vote_num,sumValidNum)
        sumValidNum += i.valid_vote_num
        sumInvalidNum += i.invalid_vote_num
        sumTotalVoteNum += i.total_vote_num
        sumTotalNum += i.total_num
    })
    voteRate = (sumTotalVoteNum/sumTotalNum*100).toFixed(1)
    
    const voteRateText = document.querySelector(".js-rate")
    voteRateText.textContent= `${voteRate}%`
    const allDetail = document.querySelector(".js-all-detail")
    allDetail.innerHTML=`
    <ul>
                                    <li>
                                        <p>投票數</p>
                                        <p class="xs js-total-num">${sumTotalVoteNum}</p>
                                        <p class="xs">票</p>
                                    </li>
                                    <li>
                                        <p>無效票數</p>
                                        <p class="xs js-invalid-num">${sumInvalidNum}</p>
                                        <p class="xs">票</p>
                                    </li>
                                    <li>
                                        <p>有效票數</p>
                                        <p class="xs js-valid-num">${sumValidNum}</p>
                                        <p class="xs">票</p>
                                    </li>
                                </ul>
    `
}
function renderLeftCard(data){
    // render概況上半部
    renderVoteNum(data)
    
    renderChart(data)
    renderPersonData(data)

    
}

function renderPersonData(data){
    let sumTotalValidNum = 0
    let sumOneNum = 0
    let onePercentage = 0
    let sumTwoNum = 0
    let twoPercentage = 0
    let sumThreeNum = 0
    let threePercentage = 0
    data.forEach(i=>{
        sumOneNum += i.one_vote_num
        sumTwoNum += i.two_vote_num
        sumThreeNum += i.three_vote_num
        sumTotalValidNum += i.valid_vote_num
    })
    onePercentage = (sumOneNum/sumTotalValidNum*100).toFixed(2)
    twoPercentage = (sumTwoNum/sumTotalValidNum*100).toFixed(2)
    threePercentage = (sumThreeNum/sumTotalValidNum*100).toFixed(2)


    const allCandidateData = 
    [   
        { no: 1,
        party: "親民黨",
        name: "宋楚瑜｜余湘", 
        voteNum: sumOneNum, 
        percentage: onePercentage,
        color:"#DFA175"},
        
        { no: 2,
            party: "中國國民黨",
            name: "韓國瑜｜張善政", 
            voteNum: sumTwoNum, 
            percentage: twoPercentage,
            color:"#8894D8"},
            
        { no: 3,
            party: "民主進步黨",
            name: "蔡英文｜賴清德", 
            voteNum: sumThreeNum, 
            percentage: threePercentage,
            color:"#84CB98"}
    ]
    const candidateList = document.querySelector(".candidate-list")
    // console.log(candidateList)
    let candidateListContent = ""
    allCandidateData.forEach(i=>{
        candidateListContent += `
        <li>

        <div class="candidate">
        <div class="no xs" style="background:${i.color}">${i.no}</div>
            <div class="info">
            
                <p>${i.party}</p>
            
                <p class="xs">${i.name}</p>
            </div>
        </div>
        <div class="vote_data">
            <div class="percentage">
                <p>${i.percentage}</p>
                <p>%</p>
            </div>
            <div class="num">
                <p class="xs">${i.voteNum}</p>
                <p class="xs">票</p>
            </div>
        </div>
    </li>
    `
    })

    candidateList.innerHTML = candidateListContent
    
}

function renderChart (data) {

    
  }

function renderDetailCard(data){
    // const cityCardTitle = e.target.id
    let sumOneNum = 0
    let sumTwoNum = 0
    let sumThreeNum = 0
    let sumTotalValidNum = 0

    data.forEach(i=>{
        sumOneNum += i.one_vote_num
        sumTwoNum += i.two_vote_num
        sumThreeNum += i.three_vote_num
        sumTotalValidNum += i.valid_vote_num
    })
    let onePercentage = (sumOneNum/sumTotalValidNum*100).toFixed(2)
    let twoPercentage = (sumTwoNum/sumTotalValidNum*100).toFixed(2)
    let threePercentage = (sumThreeNum/sumTotalValidNum*100).toFixed(2)
    

    const allCandidateData = 
    [   
        { no: 1,
        party: "親民黨",
        name: "宋楚瑜｜余湘", 
        voteNum: sumOneNum, 
        percentage: onePercentage,
        color:"#DFA175"},
        
        { no: 2,
            party: "中國國民黨",
            name: "韓國瑜｜張善政", 
            voteNum: sumTwoNum, 
            percentage: twoPercentage,
            color:"#8894D8"},
            
        { no: 3,
            party: "民主進步黨",
            name: "蔡英文｜賴清德", 
            voteNum: sumThreeNum, 
            percentage: threePercentage,
            color:"#84CB98"}
    ]
    const detailCardTitle = document.querySelector(".detail-card>.title")
    // detailCardTitle.textContent = cityCardTitle
    const candidateList = document.querySelector(".detail-card>.candidate-list")
    // console.log(candidateList)
    let candidateListContent = ""
    allCandidateData.forEach(i=>{
        candidateListContent += `
        <li>

        <div class="candidate">
        <div class="no xs" style="background:${i.color}">${i.no}</div>
            <div class="info">
            
                <p>${i.party}</p>
            
                <p class="xs">${i.name}</p>
            </div>
        </div>
        <div class="vote_data">
            <div class="percentage">
                <p>${i.percentage}</p>
                <p>%</p>
            </div>
            <div class="num">
                <p class="xs">${i.voteNum}</p>
                <p class="xs">票</p>
            </div>
        </div>
    </li>
    `
    })

    candidateList.innerHTML = candidateListContent
}
init()

filterArea.addEventListener("change",filter)


map.addEventListener("click",mapFilter)
clearBtn.addEventListener("click",init)
  




