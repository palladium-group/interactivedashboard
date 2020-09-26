
export const csvtojson = (data, delimiter = ',') => {
    let arr = data.split('\n');
    var jsonObj = [];
    var headers = arr[0].split(',');
    for(var i = 1; i < arr.length-1; i++) {
        var dataObj = arr[i].split(',');
        var obj = {};
        for(var j = 0; j < dataObj.length; j++) {
            obj[headers[j].trim()] = dataObj[j].trim();
        }
        jsonObj.push(obj);
    }
    JSON.stringify(jsonObj);
    return {data:jsonObj,headers:headers}
};

export function chartDataFetchHelperCsv(url,source,headers){
    let header = new Headers();

    if(source != 'local')for (const[key,value] of Object.entries(headers)){
        header.append(key, value);
    }
    let requestOptions={
        method: 'GET',
        headers: header,
        redirect: 'follow',
    }
    return fetch(url, requestOptions)
        .then(response => {

            if (response.headers.get("content-type").indexOf("csv") !== -1) {// checking response header
                return response.text().then(result=>{
                    return {message:"success", data:result};
                })

            } else {
                return {message:'Response from "' + url + '" has unexpected "content-type"'}
            }
        })
        .catch(error=>{
            return {message:'Response from "' + url + '" has unexpected "content-type"'};
        })
}
