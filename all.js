fetch('google_sheet_download.json')
        .then(function (response) {
            return response.json();

        })
        .then(function (result) {
            const data = result ;
            getData(data);
            getCityList(data)
        });

function getData(data){
    console.log(data)

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
    console.log(cityList)
}



