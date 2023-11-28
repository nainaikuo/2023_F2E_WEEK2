const dataUrl = "data/2020總統選舉資料.json"
const filterArea =  document.querySelector(".filter")
const map = document.querySelector(".map")
const clearBtn = document.querySelector(".clear")
const hints = document.querySelector(".hints")
const card = document.querySelector(".card")
console.log(card)
card.addEventListener("click",function(e){
    const content = document.querySelector(".card-content")
    content.classList.toggle("tablet-hide")
})
// 拿資料整理格式並render
function init(){
    display("off")

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
            removeStyle()
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
    let selectOptionContent = "<option value='all'>請選擇</option>"
    selectOption.forEach(selectId=>{
        selectOptionContent+= `<option value="${selectId}">${selectId}</option>`
    })
    // console.log(selectOptionContent)
    const citySelect = document.querySelector(`select#city`);
    const areaSelect = document.querySelector(`select#area`);
    const villageSelect = document.querySelector(`select#village`);
    // 放進select中
    citySelect.innerHTML=selectOptionContent
    areaSelect.innerHTML=`<option >請先選擇縣市</option>`
    villageSelect.innerHTML=`<option>請先選擇區域</option>`
}

function filter(e) {
    display("on")

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
                removeStyle()
                document.querySelector(`path#${value}`).classList.add("select")
                const filterData = result.filter(i=>i["city"]===value)

                renderSelect(filterData,"area")
                renderLeftCard(filterData)
                renderDetail(filterData,"city")
                const villageSelect = document.querySelector(`select#village`);
                
                villageSelect.innerHTML=`<option>請先選擇區域</option>`
                // renderSelect(filterData,"village")
            }else if(id==="area"){
                if(value==="all"){
                    console.log("aLL")
                }
                // console.log(citySelectValue)
                const filterData = result.filter(i=>i["city"]===citySelectValue&&i["area"]===value)
                renderSelect(filterData,"village")
                renderLeftCard(filterData)
                renderDetail(filterData,"area")
            }else if(id==="village"){
                
                const filterData = result.filter(i=>i["city"]===citySelectValue&&i["area"]===areaSelectValue&&i["village"]===value)
                renderLeftCard(filterData)
                renderDetail(filterData,"village")
            }
            

        });
    
    
  }

function display(action){
    if (action==="on"){
        const hints = document.querySelector(".hints")
        hints.style.opacity="0"
        const detail = document.querySelector(".detail")
        detail.style.opacity="1"
    }else if(action==="off"){
        const hints = document.querySelector(".hints")
        hints.style.opacity="1"
        const detail = document.querySelector(".detail")
        detail.style.opacity="0"
    }

}
function removeStyle() {
    const allPath = document.querySelectorAll(".map path")

    allPath.forEach(path=>{
        path.classList.remove("select")
    })
  }
function mapFilter(e){
    display("on")
    const city = e.target.id
    if(!city){
        return
    }
    removeStyle()
    const selectPath = e.target
    selectPath.classList.add("select")
    
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
            renderSelect(filterData,"village")
            renderLeftCard(filterData)
            renderDetail(filterData,"city")
            
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
    let valid = 0
    // 無效
    let invalid = 0
    // 總投票數
    let totalVote = 0
    // 總選舉人數
    let total = 0
    // 投票率

    data.forEach((i,index)=>{
        // console.log(index,i.valid_vote_num,sumValidNum)
        valid += i.valid_vote_num
        invalid += i.invalid_vote_num
        totalVote += i.total_vote_num
        total += i.total_num
        
    })
    const rate = (totalVote/total*100).toFixed(1)
    
    const voteRateText = document.querySelector(".js-rate")
    voteRateText.textContent= `${rate}%`
    const allDetail = document.querySelector(".js-all-detail")
    allDetail.innerHTML=`
    <ul>
                                    <li>
                                        <p>投票數</p>
                                        <p class="xs js-total-num hide">${totalVote}</p>
                                        <p class="xs">票</p>
                                    </li>
                                    <li>
                                        <p>無效票數</p>
                                        <p class="xs js-invalid-num hide">${invalid}</p>
                                        <p class="xs">票</p>
                                    </li>
                                    <li>
                                        <p>有效票數</p>
                                        <p class="xs js-valid-num hide">${valid}</p>
                                        <p class="xs">票</p>
                                    </li>
                                </ul>
    `
    showHide()

    
    renderVoteNumChart(total,totalVote)
}

function showHide(){
    const hides = [...document.querySelectorAll(".hide")]
    hides.forEach((i,index)=>{
        setTimeout(()=>{
            i.classList.remove("hide")
        },index*50)
        
    })

}


function renderVoteNumChart(total,totalVote){
    
    const removeChartArea = document.querySelector('.js-vote-rate-chart');
    removeChartArea.remove()
    const chartArea = document.querySelector(".js-chart-area")
    chartArea.innerHTML=`<canvas class="js-vote-rate-chart"></canvas>`
    const chart = document.querySelector('.js-vote-rate-chart');

    const notVote = total -totalVote
    const chartData = {
        // labels: [
        //   '有效票',
        //   '無效票',
        // ],
        datasets: [{
          data: [totalVote,notVote],
          backgroundColor: [
            '#262E49',
            '#CCCCCC',
          ],
          hoverOffset: 4
        }]
      };
      new Chart(chart, {
        type: 'doughnut',
        data: chartData,
      });

}

function renderPersonData(data){
    let total = 0
    let one = 0
    let two = 0
    let three = 0
    data.forEach(i=>{
        one += i.one_vote_num
        two += i.two_vote_num
        three += i.three_vote_num
        total += i.valid_vote_num
    })
    let onePercentage =  (one/total*100).toFixed(1)
    let twoPercentage = (two/total*100).toFixed(1)
    let threePercentage = (three/total*100).toFixed(1)


    const allCandidateData = 
    [   
        { no: 1,
        party: "親民黨",
        name: "宋楚瑜｜余湘", 
        voteNum: one, 
        percentage: onePercentage,
        color:"#DFA175"},
        
        { no: 2,
            party: "中國國民黨",
            name: "韓國瑜｜張善政", 
            voteNum: two, 
            percentage: twoPercentage,
            color:"#8894D8"},
            
        { no: 3,
            party: "民主進步黨",
            name: "蔡英文｜賴清德", 
            voteNum: three, 
            percentage: threePercentage,
            color:"#84CB98"}
    ]
    const candidateList = document.querySelector(".candidate-list")
    // console.log(candidateList)
    allCandidateData.sort(function(a,b){
        return b.voteNum - a.voteNum
    })
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
                <p class="hide">${i.percentage}</p>
                <p>%</p>
            </div>
            <div class="num">
                <p class="xs hide">${i.voteNum}</p>
                <p class="xs">票</p>
            </div>
        </div>
    </li>
    `
    })

    candidateList.innerHTML = candidateListContent
    showHide()
    renderPersonDataChart(one,two,three)
}
function renderPersonDataChart(one,two,three){
    
    const removeChartArea = document.querySelector('.js-person-chart');
    removeChartArea.remove()
    const chartArea = document.querySelector(".js-person-chart-area")
    chartArea.innerHTML=`<canvas class="js-person-chart"></canvas>`
    const chart = document.querySelector('.js-person-chart');

    const chartData = {
        // labels: [
        //   '有效票',
        //   '無效票',
        // ],
        datasets: [{
          data: [one,two,three],
          backgroundColor: [
            '#DFA175',
            '#8894D8',
            "#84CB98"
          ],
          hoverOffset: 4
        }]
      };
      new Chart(chart, {
        type: 'doughnut',
        data: chartData,
      });

}
function renderLeftCard(data){
    // render概況上半部
    renderVoteNum(data)
    
    renderPersonData(data)

    
}

function renderDetail(data,name){  
    // display("on")
    const card = document.querySelector(`.js-detail-card-${name}`)
    card.style.opacity="1"
    card.style.display="flex"
    if(name==="city"){
        document.querySelector(`.js-detail-card-area`).style.opacity="0"
        document.querySelector(`.js-detail-card-village`).style.opacity="0"
        
        
    }else if(name==="area"){
        document.querySelector(`.js-detail-card-village`).style.opacity="0"
    }


    const title = data[0][name]
    let one = 0
    let two = 0
    let three = 0
    let total = 0
    data.forEach(i=>{
        one += i.one_vote_num
        two += i.two_vote_num
        three += i.three_vote_num
        total += i.valid_vote_num
    })
    const onePercentage = (one/total*100).toFixed(1)
    const twoPercentage = (two/total*100).toFixed(1)
    const threePercentage = (three/total*100).toFixed(1)
    const allCandidateData = 
    [   
        { no: 1,
        party: "親民黨",
        name: "宋楚瑜｜余湘", 
        voteNum: one, 
        percentage: onePercentage,
        color:
                {
                    mainColor:"#DFA175",
                    bgColor:"#FCF6F1"
                }
        },
        
        { no: 2,
            party: "中國國民黨",
            name: "韓國瑜｜張善政", 
            voteNum: two, 
            percentage: twoPercentage,
            color:
                {
                    mainColor:"#8894D8",
                    bgColor:"#E9EBF8"
                }
        },
            
        { no: 3,
            party: "民主進步黨",
            name: "蔡英文｜賴清德", 
            voteNum: three, 
            percentage: threePercentage,
            color:
                {
                    mainColor:"#84CB98",
                    bgColor:"#F3FAF5"}
        }
            
    ]

    allCandidateData.sort(function(a,b){
        return b.voteNum - a.voteNum
    })

    card.style.backgroundColor=allCandidateData[0].color.bgColor 
    card.style.borderColor=allCandidateData[0].color.mainColor    


    let detailCardListContent=""
    allCandidateData.forEach(i=>{
        detailCardListContent +=
        `<li>

        <div class="candidate">
        <div class="no xs" style="background:${i.color.mainColor}">${i.no}</div>
            <div class="info">
            
                <p>${i.party}</p>
            
                <p class="xs ">${i.name}</p>
            </div>
        </div>
        <div class="vote_data">
            <div class="percentage">
                <p class="hide">${i.percentage}</p>
                <p>%</p>
            </div>
            <div class="num">
                <p class="xs hide">${i.voteNum}</p>
                <p class="xs">票</p>
            </div>
        </div>
    </li>`
    })

    const detailCardList = document.querySelector(`.js-detail-card-${name} ul`)
    const detailCardTitle = document.querySelector(`.js-detail-card-${name} .title`)

    detailCardTitle.textContent=title
    detailCardList.innerHTML= detailCardListContent
    showHide()
    
}

// function renderDetailCard(data){
//     // const cityCardTitle = e.target.id
//     let one = 0
//     let two = 0
//     let sumThreeNum = 0
//     let sumTotalValidNum = 0

//     data.forEach(i=>{
//         sumOneNum += i.one_vote_num
//         sumTwoNum += i.two_vote_num
//         sumThreeNum += i.three_vote_num
//         sumTotalValidNum += i.valid_vote_num
//     })
//     let onePercentage = (sumOneNum/sumTotalValidNum*100).toFixed(2)
//     let twoPercentage = (sumTwoNum/sumTotalValidNum*100).toFixed(2)
//     let threePercentage = (sumThreeNum/sumTotalValidNum*100).toFixed(2)
    

//     const allCandidateData = 
//     [   
//         { no: 1,
//         party: "親民黨",
//         name: "宋楚瑜｜余湘", 
//         voteNum: sumOneNum, 
//         percentage: onePercentage,
//         color:"#DFA175"},
        
//         { no: 2,
//             party: "中國國民黨",
//             name: "韓國瑜｜張善政", 
//             voteNum: sumTwoNum, 
//             percentage: twoPercentage,
//             color:"#8894D8"},
            
//         { no: 3,
//             party: "民主進步黨",
//             name: "蔡英文｜賴清德", 
//             voteNum: sumThreeNum, 
//             percentage: threePercentage,
//             color:"#84CB98"}
//     ]
//     const detailCardTitle = document.querySelector(".detail-card>.title")
//     // detailCardTitle.textContent = cityCardTitle
//     const candidateList = document.querySelector(".detail-card>.candidate-list")
//     // console.log(candidateList)
//     let candidateListContent = ""
//     allCandidateData.forEach(i=>{
//         candidateListContent += `
//         <li>

//         <div class="candidate">
//         <div class="no xs" style="background:${i.color}">${i.no}</div>
//             <div class="info">
            
//                 <p>${i.party}</p>
            
//                 <p class="xs">${i.name}</p>
//             </div>
//         </div>
//         <div class="vote_data">
//             <div class="percentage">
//                 <p>${i.percentage}</p>
//                 <p>%</p>
//             </div>
//             <div class="num">
//                 <p class="xs">${i.voteNum}</p>
//                 <p class="xs">票</p>
//             </div>
//         </div>
//     </li>
//     `
//     })

//     candidateList.innerHTML = candidateListContent
// }
init()

filterArea.addEventListener("change",filter)


map.addEventListener("click",mapFilter)
clearBtn.addEventListener("click",init)
  




