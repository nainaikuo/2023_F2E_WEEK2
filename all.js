
// 取得資料並render出citySelect    
function init(){
    fetch('google_sheet_download.json')
        .then(function (response) {
            return response.json();

        })
        .then(function (result) {
            const data = result ;
            getCityList(data)
        });
}



function getCityList(data){
    const cityList = []
    data.forEach(i=>{
        if(cityList.indexOf(i.city)===-1){
            cityList.push(i.city)
        }else{
            return
        }
    })
    renderCitySelect(cityList)
    renderInitTable(data);
}


function renderInitTable(data){
    console.log(data)
    const table = document.querySelector(".table-content")
    console.log(table)
    let tableContent = ""
    data.forEach(i=>{
        tableContent += `<tr>
        <td>${i.city}</td>
        <td>${i.area}</td>
        <td>${i.village}</td>
        <td>${i.total_num}</td>
    </tr>`
    })
    table.innerHTML=tableContent
}
const citySelect = document.querySelector("#city")
const areaSelect = document.querySelector("#area")

function renderCitySelect(cityList){
    let citySelectOption = "<option value='all'>全部縣市</option>"
    cityList.forEach(i=>{
        citySelectOption+= `<option value="${i}">${i}</option>`
    })
    citySelect.innerHTML = citySelectOption
}
citySelect.addEventListener("change",renderSelectData)


function renderSelectData(){
    queryArea();
}
function queryArea(){
    const nowSelectCity = citySelect.value
    fetch('google_sheet_download.json')
    .then(function (response) {
        return response.json();

    })
    .then(function (result) {
        const data = result ;
        // console.log(data)
        const areaList = data.filter(i=> i.city === nowSelectCity)
        // console.log(areaList)
        renderAreaSelect(areaList)
    });
}

function renderAreaSelect(data){
    // console.log(data)
    const queryAreaData = []
    data.forEach(i=>{
        console.log(i.area)
        if(queryAreaData.indexOf(i.area)===-1){
            queryAreaData.push(i.area)
        }else{
            return
        }
        // return
    })
    console.log(queryAreaData)
    let areaSelectOption ="<option value='all'>全部區域</option>" ;
    queryAreaData.forEach(i=>{
        areaSelectOption+= `<option value='${i}'>${i}</option>`
    })
    areaSelect.innerHTML = areaSelectOption
}

init()
