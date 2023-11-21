

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


// function getList(data,name){
//     console.log(name)
//     data.forEach(i=>{
//         if(data.indexOf(i['name'])===-1){
//             data.push(i['name'])
//         }else{
//             return
//         }
//     })

// }

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
citySelect.addEventListener("change",queryArea)

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
