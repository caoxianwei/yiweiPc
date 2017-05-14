import Vue from 'vue'
import { Message } from 'element-ui'
import $ from 'jquery'

export const ua = () => {
    var userAgentInfo = navigator.userAgent
    var Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPod']
    var flag = 'PC'
    for (var vv = 0; vv < Agents.length; vv++) {
        if (userAgentInfo.indexOf(Agents[vv]) > 0) {
            flag = Agents[vv]
            break
        }
    }
    return flag
}

export const  winHeight = () => {
    let winHeight = ""
    if (window.innerHeight)
        winHeight = window.innerHeight;
    else if ((document.body) && (document.body.clientHeight))
        winHeight = document.body.clientHeight;
    if (document.documentElement && document.documentElement.clientHeight) {
        winHeight = document.documentElement.clientHeight;
    }
    return winHeight
}

export const hasClass = (elem, className) => {
    if(elem && className){
        var clsArray = elem.className.split(/\s+/)
        if(clsArray && clsArray.length > 0){
            var clsIndex = clsArray.indexOf(className)
            if(clsIndex > -1){
                return true
            }
        }
    }
    return false
}

export const addClass = (elem, className) => {
    if(elem && className && !hasClass(elem, className)){
        elem.className = elem.className + " " + className
    }
}

export const removeClass = (elem, className) => {
    if(elem && className){
        var clsArray = elem.className.split(/\s+/)
        if(clsArray && clsArray.length > 0){
            var clsIndex = clsArray.indexOf(className)
            if(clsIndex > -1){
                clsArray.splice(clsIndex, 1)
                elem.className = clsArray.join(' ')
            }
        }
    }
}

export const toggleClass = (elem, className) => {
    if(elem && className){
        if(hasClass(elem, className)){
            removeClass(elem, className)
        } else {
            addClass(elem, className)
        }
    }
}


//计算日期
export const datePick =  (value1,value2) =>{
    var month1 = value1.getMonth() +1;
    if (month1 < 10) {
        month1 = '0' + month1;
    } else {
        month1 = '' + month1;
    }
    var day1 = value1.getDate();
    if (day1 < 10) {
        day1 = '0' + day1;
    } else {
        day1 = '' + day1;
    }
    var month2 = value2.getMonth() +1;
    if (month2 < 10) {
        month2 = '0' + month2;
    } else {
        month2 = '' + month2;
    }
    var day2 = value2.getDate();
    if (day2 < 10  ) {
        day2 = '0' + day2;
    } else {
        day2 = '' + day2;
    }
    return {month1,month2,day1,day2}
}

//大小单双转汉字
export const exchange = (value) => {
    var orderValue = '';
    for (var i = 0; i < value.length; i++) {
        switch(value[i]){
            case '9':
            orderValue += '大';
            break;
            case '1':
            orderValue += '小';
            break;
            case '3':
            orderValue += '单';
            break;
            case '2':
            orderValue += '双';
            break;
            case ',':
            orderValue += ',';
            break;
            case '0':
            orderValue += '';
            break;
            default :
            break;
        }
    }
    return orderValue
}

//倒计时
export const setTime = () => {
    var time = new Date();
    time.setFullYear(2017,11,31);
    time.setHours(0,0,0,0);
    var ms = time.getTime() - new Date().getTime();
    var oSec = parseInt(ms/1000);
    //秒转换成天
    var oDay = parseInt(oSec/86400);
    oDay = oDay + '';
    var dayFirst, daySecond, dayThird, houFirst, houSecond, minFirst, minSecond, secFirst, secSecond
    if (oDay.length === 3) {
        dayFirst = oDay.slice(0,1);
        daySecond = oDay.slice(1,2);
        dayThird = oDay.slice(2,3);
    } else if(oDay.length === 2){
        dayFirst = '0';
        daySecond = oDay.slice(0,1);
        dayThird = oDay.slice(1,2);
    } else {
        dayFirst = '0';
        daySecond = '0';
        dayThird = oDay.slice(0,1);
    }
    oSec%=86400;
    //转换成小时
    var oHour = parseInt(oSec/3600);
    oHour = oHour + '';
    if(oHour.length === 2){
        houFirst = oHour.slice(0,1);
        houSecond = oHour.slice(1,2);
    } else {
        houFirst = '0';
        houSecond = oHour.slice(0,1);
    }
    oSec%=3600;
    //转换成分钟
    var oMin = parseInt(oSec/60);
    oMin = oMin + '';
    if(oMin.length === 2){
        minFirst = oMin.slice(0,1);
        minSecond = oMin.slice(1,2);
    } else {
        minFirst = '0';
        minSecond = oMin.slice(0,1);
    }
    oSec%=60;
    oSec = oSec + '';
    if(oSec.length === 2){
        secFirst = oSec.slice(0,1);
        secSecond = oSec.slice(1,2);
    } else {
        secFirst = '0';
        secSecond = oSec.slice(0,1);
    }
    return {dayFirst,daySecond,dayThird,houFirst,houSecond,minFirst,minSecond,secFirst,secSecond}
}

//计算阶乘 factorial

export const factorial = function(n) {
    if (n === 0 || n === 1) {
        return 1
    }
    if(n > 1){
        return n*factorial(n-1)
    }
}

//计算组合公式C n m = n!/(m! * (n-m)!)
export const combin = function(n, m){
   if(n < 1 || m <1 || n < m){
        return 0
   } else if(n === m){
        return 1
   }
   return factorial(n)/(factorial(m)*factorial(n-m))
}

export const filterElem = function(arr, elem){
   if(!arr || arr.length < 1 || !elem){
        return arr
   }
   return arr.filter(function(element) {
       return element !== elem
   })
}

export const calcSum = function(a, b, c){
    var count = 0
    a.forEach( function(element) {
        count += combin(filterElem(b, element).length, c)
    })
    return count
}

export const calcNumberCommon = function(...item){
    var rst = ''
    var len = item.length
    item.forEach( function(element, index) {
        if(index === len -1){
            rst += element.join('')
        } else{
            rst += element.join('') + ','
        }
    })
    return rst
}

export const calcNumber = function(...item){
    var rst = calcNumberCommon(...item)
    return rst.replace(/s_/gi,'')
}

export const calcNumberSum = function(...item){
    var rst = calcNumberCommon(...item)
    return rst.replace(/s_/gi, ',').slice(1)
}

export const calcThreeSumCount = function(sum){
    var a = [0,1,2,3,4,5,6,7,8,9]
    var b = [0,1,2,3,4,5,6,7,8,9]
    var c = [0,1,2,3,4,5,6,7,8,9]
    var count = 0
    a.forEach( function(elema) {
        b.forEach( function(elemb) {
            c.forEach( function(elemc) {
                if(elema + elemb + elemc == sum){
                    count ++
                }
            })
        })
    })
    return count
}

export const calcTwoSumCount = function(sum){
    var a = [0,1,2,3,4,5,6,7,8,9]
    var b = [0,1,2,3,4,5,6,7,8,9]
    var count = 0
    a.forEach( function(elema) {
        b.forEach( function(elemb) {
            if(elema + elemb == sum){
                count ++
            }
        })
    })
    return count
}

export const calcHappyThreeDiffSumCount = (sum) => {
    var a = [1,2,3,4,5,6]
    var b = [1,2,3,4,5,6]
    var c = [1,2,3,4,5,6]
    var count = 0
    a.forEach( function(elema) {
        b.forEach( function(elemb) {
            c.forEach( function(elemc) {
                if(elema != elemb && elema != elemc && elemb != elemc) {
                    if(elema + elemb + elemc == sum) {
                        count ++
                    }
                }
            })
        })
    })
    return count
}

export const calcHappyThreeSumCount = (sum) => {
    var a = [1,2,3,4,5,6]
    var b = [1,2,3,4,5,6]
    var c = [1,2,3,4,5,6]
    var count = 0
    a.forEach(function(elema) {
        b.forEach(function(elemb) {
            c.forEach(function(elemc) {
                if (elema + elemb + elemc == sum) {
                    count++
                }
            })
        })
    })
    return count
}

export const arrySameNum = function(value, num){
    if(!value){
        return false
    }
    var va = value.split('')
    var b = false
    va.forEach( function(elem1) {
        var count = 0
        va.forEach( function(elem2) {
            if(elem1 === elem2){
                count ++
            }
        })
        if(count === num){
            b = true
        }
    })
    return b
}

export const errorMsg = msg => {
                Message({
                  showClose: true,
                  duration:3000,
                  message: msg,
                  type: 'error'
                });
            }
export const succMsg = msg => {
                Message({
                  showClose: true,
                  duration:3000,
                  message: msg,
                  type: 'success'
                });
            }

export const lpad = function(val, len, pstr) {
    var valStr = val + ''
    if(valStr){
        var plen = valStr.length
        while (plen < len) {
            valStr = pstr + valStr
            plen = valStr.length
        }
    }
    return valStr
}

var num_01_11 = ['01','02','03','04','05','06','07','08','09','10','11']
var num_01_10 = ['01','02','03','04','05','06','07','08','09','10']

export const validNum = (str, all) => {
    var rst = true
    var strLen = str.length
    if(strLen % 2 !== 0){
        return false
    }
    var idx = 0
    var darray = []
    while (idx < strLen) {
        var subStr = str.substring(idx, idx + 2)
        darray.push(subStr)
        if(all.indexOf(subStr) === -1){
            return false
        }
        idx = idx + 2
    }
    //计算是否有重复值
    var dcount = false
    darray.forEach( function(elem1) {
        var dc= 0
        darray.forEach( function(elem2) {
            if(elem1 === elem2){
                dc ++
            }
        })
        if(dc > 1){
            dcount = true
        }
    })

    if(dcount){
        return false
    }

    return rst
}

export const calcSelecSevenFiveFingle = (data, len) => {
    var rst = { count: 0, numbers: '' }
    if(data){
        var re = /[\s,$]/g
        var dataArray = data.split(re)
        var valid = dataArray.some(elem => isNaN(elem) || elem.length !== len || !validNum(elem, num_01_11))
        if(!valid){
            rst.count = dataArray.length
            rst.numbers = dataArray.join('$')
        } else {
            rst.msg = '输入的注单号码格式不正确,请重新输入'
        }
    }
    return rst
}

export const calcPK10Single = (data, len) => {
    var rst = { count: 0, numbers: '' }
    if(data){
        var re = /[\s,$]/g
        var dataArray = data.split(re)
        var valid = dataArray.some(elem => isNaN(elem) || elem.length !== len || !validNum(elem, num_01_10))
        if(!valid){
            rst.count = dataArray.length
            rst.numbers = dataArray.join('$')
        } else {
            rst.msg = '输入的注单号码格式不正确,请重新输入'
        }
    }
    return rst
}

export const calcSelecSevenFiveDuplex = (data, len) => {
    var rst = { count: 0, numbers: '' }
    var duplex = data['select_eleven_five_duplex']
    if(duplex && duplex.length >= len){
        rst.count = combin(duplex.length, len)
        rst.numbers = calcNumberSum(duplex)
    }
    return rst
}

export const isIE = (ver) => {
    var b = document.createElement('b')
    b.innerHTML = '<!--[if IE ' + ver + ']><i></i><![endif]-->'
    return b.getElementsByTagName('i').length === 1
}

export const unselectable = (selector) => {
    if(isIE(9)){
        $(selector).bind('selectstart drag', function(event) {
           return false
        })
    }
}

export const formatDate = (dt) => {
    if(!dt){
        return
    }
    return dt.getFullYear() +"-"+ lpad(dt.getMonth() + 1, 2, '0') +"-"+ lpad(dt.getDate(), 2, '0')
}

export const calcSingle = (data, len) => {
    var rst = { count: 0, numbers: '' }
    if(data) {
        var re = /[\s,$]/g
        var dataArray = data.split(re)
        var valid = dataArray.some(elem => isNaN(elem) || elem.length !== len)
        if(!valid){
            rst.count = dataArray.length
            rst.numbers = dataArray.join('$')
        } else {
            rst.msg = '输入的注单号码格式不正确,请重新输入'
        }
    }
    return rst
}

export const happyEightAnySelect = (data, num) => {
    var rst = { count: 0, numbers: ''}
    var sel = data['number'] || []
    if(sel && sel.length >= num){
        var len = sel.length
        rst.count = combin(len, num)
        rst.numbers = sel.join(',').replace(/s_/gi, '')
    }
    return rst
}
