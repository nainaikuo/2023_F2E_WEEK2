const dataUrl = "2020總統選舉資料.json"

// 拿資料整理格式並render
function getData(url){
    fetch(url)
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
            const voteData = result ;
            // console.log(data)
            renderData(voteData,"city")
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
// render表格資料
function renderTable(data){
    const table = document.querySelector(".table-content")

    let tableContent = ""
    data.forEach(i=>{
        tableContent+= `<tr>
        <td>${i.city}</td>
        <td>${i.area}</td>
        <td>${i.village}</td>
        <td>${i.one_vote_num}</td>
        <td>${i.two_vote_num}</td>
        <td>${i.three_vote_num}</td>
        <td>${i.valid_vote_num}</td>
        <td>${i.invalid_vote_num}</td>
        <td>${i.total_vote_num}</td>
        <td>${i.vote_rate}%</td>
    </tr>`
    })
    table.innerHTML = tableContent
}
// 把上面兩個加在一起
function renderData(data,selectId){
    renderSelect(data,selectId)  
    renderTable(data);

}

getData(dataUrl)

const filterArea =  document.querySelector(".filter")

// console.log(filter)

filterArea.addEventListener("change",filter)

function filter(e) {
    const value =  e.target.value;
    const id = e.target.id
    // console.log(id)
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
                renderData(filterData,"area")
            }else if(id==="area"){
                const citySelectValue = document.querySelector("select#city").value
                console.log(citySelectValue)
                const filterData = result.filter(i=>i["city"]===citySelectValue&&i["area"]===value)
                renderData(filterData,"village")
            }else if(id==="village"){
                const citySelectValue = document.querySelector("select#city").value
                const areaSelectValue = document.querySelector("select#area").value
                const filterData = result.filter(i=>i["city"]===citySelectValue&&i["area"]===areaSelectValue&&i["village"]===value)
                renderTable(filterData);
            }
            
        });
    
    
  }


  