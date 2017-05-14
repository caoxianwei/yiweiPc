import {calcNumber, combin, calcNumberSum,arrySameNum, calcSingle, calcHappyThreeDiffSumCount, calcHappyThreeSumCount } from '../../../tools/command'

export default {
    two_diff : {
        two_diff_standard(data){
            var rst = { count: 0, numbers: ''}
            var sel = data['number'] || []
            if(sel && sel.length >= 2){
                var len = sel.length
                rst.count = combin(len, 2)
                rst.numbers = sel.join('').replace(/s_/gi, '')
            }
            return rst
        },
        two_diff_single(data){
            return calcSingle(data, 2)
        },
        two_diff_dan_tuo(data){
            var rst = { count: 0, numbers: '' }
            var dan = data['dan'] || []
            var tuo = data['tuo'] || []
            if(dan.length == 1 && tuo.length > 0){
                rst.count = dan.length * tuo.length
                rst.numbers = calcNumber(dan, tuo)
            }
            return rst
        },
    },
    two_same_simple : {
        two_same_simple_standard(data) {
            var rst = { count: 0, numbers: '' }
            var two_same = data['two_same'] || []
            var diff = data['diff'] || []
            if(two_same.length > 0 && diff.length > 0) {
                rst.count = two_same.length * diff.length
                rst.numbers = calcNumber(two_same, diff)
            }
            return rst
        },
        two_same_single(data) {
            var rst = { count: 0, numbers: '' }
            if(data) {
                var re = /[\s,$]/g
                var dataArray = data.split(re)
                var valid = dataArray.some(elem => isNaN(elem) || elem.length !== 3 || !arrySameNum(elem, 2) || arrySameNum(elem, 3))
                if(!valid){
                    rst.count = dataArray.length
                    rst.numbers = dataArray.join('$')
                } else {
                    rst.msg = '输入的注单号码格式不正确,请重新输入'
                }
            }
            return rst
        }
    },
    two_same_complex : {
        two_same_complex(data){
            var rst = { count: 0, numbers: ''}
            var sel = data['number'] || []
            if(sel && sel.length > 0){
                var len = sel.length
                rst.count = combin(len, 2)
                rst.numbers = sel.join('').replace(/s_/gi, '')
            }
            return rst
        }
    },
    three_diff : {
        three_diff_standard(data){
            var rst = { count: 0, numbers: ''}
            var sel = data['number'] || []
            if(sel && sel.length >= 3){
                var len = sel.length
                rst.count = combin(len, 3)
                rst.numbers = sel.join('').replace(/s_/gi, '')
            }
            return rst
        },
        three_diff_single(data){
            var rst = { count: 0, numbers: '' }
            if(data) {
                var re = /[\s,$]/g
                var dataArray = data.split(re)
                var valid = dataArray.some(elem => isNaN(elem) || elem.length !== 3 || arrySameNum(elem, 2) || arrySameNum(elem, 3))
                if(!valid){
                    rst.count = dataArray.length
                    rst.numbers = dataArray.join('$')
                } else {
                    rst.msg = '输入的注单号码格式不正确,请重新输入'
                }
            }
            return rst
        },
        three_diff_dan_tuo(data) {
            var rst = { count: 0, numbers: '' }
            var dan = data['dan'] || []
            var tuo = data['tuo'] || []
            if(dan.length > 0 && dan.length <= 2 && tuo.length > 0){
                if(dan.length == 1){
                    rst.count = combin(tuo.length, 3)
                    rst.numbers = calcNumber(dan, tuo)
                } else if(dan.length == 2){
                    rst.count = tuo.length
                    rst.numbers = calcNumber(dan, tuo)
                }
            }
            return rst
        },
        three_diff_sum(data){
            var rst = { count: 0, numbers: '' }
            var sum_value = data['sum']
            if (sum_value && sum_value.length > 0) {
                rst.numbers = calcNumberSum(sum_value)
                var count = 0
                sum_value.forEach(function(element) {
                    count += calcHappyThreeDiffSumCount(element.replace(/s_/gi, ''))
                })
                rst.count = count
            }
            return rst
        },
    },
    three_same_simple : {
        three_same_simple(data){
            var rst = { count: 0, numbers: ''}
            var sel = data['number'] || []
            if(sel && sel.length > 0){
                rst.count = sel.length
                rst.numbers = sel.join(',').replace(/s_/gi, '')
            }
            return rst
        }
    },
    three_same_all : {
        three_same_all(data){
            var rst = { count: 0, numbers: ''}
            var sel = data['number'] || []
            if(sel && sel.length > 0){
                rst.count = 1
                rst.numbers = sel.join(',').replace(/s_/gi, '')
            }
            return rst
        }
    },
    three_of_order_all : {
        three_of_order_all(data){
            var rst = { count: 0, numbers: ''}
            var sel = data['number'] || []
            if(sel && sel.length > 0){
                rst.count = 1
                rst.numbers = sel.join(',').replace(/s_/gi, '')
            }
            return rst
        }
    },
    three_sum : {
        three_sum(data){
            var rst = { count: 0, numbers: '' }
            var sum_value = data['sum']
            if (sum_value && sum_value.length > 0) {
                rst.numbers = calcNumberSum(sum_value)
                var count = 0
                sum_value.forEach(function(element) {
                    count += calcHappyThreeSumCount(element.replace(/s_/gi, ''))
                })
                rst.count = count
            }
            return rst
        }
    }
}