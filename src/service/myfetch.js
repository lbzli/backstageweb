let baserUrl

export default async (url = '', data = {}, type = 'GET', method = 'fetch') => {
    type = type.toUpperCase()
    url = baserUrl + url


    if (type == 'GET') {
        let dataStr = ''
        Object.keys(data).forEach(key => {
            dataStr += key + '=' + data[key] + '&'
        })

        if (dataStr !== '') {
            dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
            url = url + '?' + dataStr
        }
    }

    if (window.fetch && method == 'fetch') {
        let requestConfig = {
            credentials: 'include',
            headers: {
                'Accept': 'applications/json',
                'Content-Type': 'application/json',
            },
            mode: 'cors'
        }
        if (type == 'POST') {
            Object.defineProperty(requestConfig ,'body', {
                value: JSON.stringify(data)
            })
        }

        let token = window.localStorage.getItem('token')
        if (token) {
            requestConfig.headers.Authorization = 'Bearer' + token
        }

        try {
            const response = await fetch(url, requestConfig)
            const reponseJson = await response.json()
            return reponseJson
        } catch (err) {
            throw new Error(err)
        }
    } else {
        return new Promise((resolve, reject) => {
            let requestObj;
            if(window.XMLHttpRequest) {
                requestObj = new XMLHttpRequest()
            } else {
                // eslint-disable-next-line no-undef
                requestObj = new ActiveXObject()
            }

            let sendData = ''
            if(type == 'POST') {
                sendData = JSON.stringify(data)
            }

            requestObj.open(type, url, true)
            requestObj.setRequestHeader('Content-type',"application/x-www-form-urlencoded")
            requestObj.send(sendData)

            requestObj.onreadystatechange = () => {
                if(requestObj.readyState == 4) {
                    if(requestObj.status == 200){
                        let obj = requestObj.response
                        if(typeof obj !== 'object') {
                            obj = JSON.parse(obj)
                        }

                        resolve(obj)
                    } else {
                        reject(requestObj)
                    }
                }
            }
        })
    }




}