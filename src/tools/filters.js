
import Decimal from 'decimal.js'

//六合彩生肖，转换生肖编码到中文生肖
export const lhcsx = (value) => {
    var data = ["鼠", "虎", "龙", "马", "猴", "狗", "牛", "兔", "蛇", "羊", "鸡", "猪"]
    var cdata = ["shu","hu","long","ma","hou","gou","niu","tu","she","yang","ji","zhu"]
    var ind = cdata.indexOf(value+"")
    return data[ind]
}

//大小单双
export const dxds = (value) => {
    var data = ["大", "小", "单", "双"]
    var cdata = ["9","1","3","2"]
    var ind = cdata.indexOf(value+"")
    return data[ind]
}

export const sscleak = (value, type, leaks, cai) => {
    if(!value || !type || !leaks || leaks.length < 1){
        return ''
    }
    var result = ''
    var select_3 = ['cai4','cai5']
    if(cai && select_3.indexOf(cai) > -1){
        switch (type) {
        case "bai":
            return result = leaks[0] ? leaks[0][value] : ''
        case "shi":
            return result = leaks[1] ? leaks[1][value] : ''
        case "ge":
            return result = leaks[2] ? leaks[2][value] : ''
        case "bai_wei":
            return result = leaks[0] ? leaks[0][value] : ''
        case "shi_wei":
            return result = leaks[1] ? leaks[1][value] : ''
        case "ge_wei":
            return result = leaks[2] ? leaks[2][value] : ''      
        default:
            return;
        }
    }
    var select_11_5 = ['cai8','cai9','cai10','cai13']
    if(cai && select_11_5.indexOf(cai) > -1){
        value = value - 1
    }
    switch (type) {
        case "wan":
            result = leaks[0] ? leaks[0][value] : ''
            break;
        case "qian":
            result = leaks[1] ? leaks[1][value] : ''
            break;
        case "bai":
            result = leaks[2] ? leaks[2][value] : ''
            break;
        case "shi":
            result = leaks[3] ? leaks[3][value] : ''
            break;
        case "ge":
            result = leaks[4] ? leaks[4][value] : ''
            break; 
        case "wan_wei":
            result = leaks[0] ? leaks[0][value] : ''
            break;
        case "qian_wei":
            result = leaks[1] ? leaks[1][value] : ''
            break;
        case "bai_wei":
            result = leaks[2] ? leaks[2][value] : ''
            break;
        case "shi_wei":
            result = leaks[3] ? leaks[3][value] : ''
            break;
        case "ge_wei":
            result = leaks[4] ? leaks[4][value] : ''
            break;    
        case "guess_one":
            result = leaks[0] ? leaks[0][value] : ''
            break;    
        case "guess_two":
            result = leaks[1] ? leaks[1][value] : ''
            break;    
        case "guess_three":
            result = leaks[2] ? leaks[2][value] : ''
            break; 
        case "guess_1":
            result = leaks[0] ? leaks[0][value] : ''
            break; 
        case "guess_2":
            result = leaks[1] ? leaks[1][value] : ''
            break; 
        case "guess_3":
            result = leaks[2] ? leaks[2][value] : ''
            break; 
        case "guess_4":
            result = leaks[3] ? leaks[3][value] : ''
            break; 
        case "guess_5":
            result = leaks[4] ? leaks[4][value] : ''
            break; 
        case "guess_6":
            result = leaks[5] ? leaks[5][value] : ''
            break; 
        case "guess_7":
            result = leaks[6] ? leaks[6][value] : ''
            break; 
        case "guess_8":
            result = leaks[7] ? leaks[7][value] : ''
            break; 
        case "guess_9":
            result = leaks[8] ? leaks[8][value] : ''
            break; 
        case "guess_10":
            result = leaks[9] ? leaks[9][value] : ''
            break; 
        default:
            break;
    }
    return result
}

export const calcSum = (...value) => {
    var rst = new Decimal('0')
    value.forEach(function(val){
        if(val){
            rst = rst.add(val)
        }
    })
    return rst.toNumber(rst)
}

export const calcSumColor = (...value) => {
    const val = calcSum(...value)
    return val >= 0 ? 'numRed' : 'numGreen'
}


