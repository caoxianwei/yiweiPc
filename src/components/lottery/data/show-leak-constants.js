// 各分组彩票玩法对应的 lottery_type.id
// 时时彩
var cai1 = {
        five_star : [
            'direct_duplex'
        ],
        four_star : [
            'direct_first_four_duplex',
            'direct_last_four_duplex'
        ],
        first_three: [
            'direct_first_three_duplex',
        ],
        middle_three: [
            'direct_middle_three_duplex'
        ],
        last_three: [
            'direct_last_three_duplex'
        ],
        any_three: [
            'direct_any_three_duplex'
        ],
        first_two: [
            'direct_first_two_duplex'
        ],
        last_two: [
            'direct_last_two_duplex'
        ],
        any_two: [
            'direct_any_two_duplex'
        ],
        location_gall: [
            'location_gall_type'
        ],
        not_location: [],
        big_little_odd_even: [],
        interesting: []
    }
// 11选5
var cai8 = {
    select_eleven_five_any_one : [],
    select_eleven_five_any_two : [],
    select_eleven_five_any_three : [],
    select_eleven_five_any_four : [],
    select_eleven_five_any_five :[],
    select_eleven_five_any_six : [],
    select_eleven_five_any_seven : [],
    select_eleven_five_any_eight : [],
    select_eleven_five_first_three : [
        'select_eleven_five_first_three_direct_duplex'
    ],
    select_eleven_five_first_two : [
        'select_eleven_five_first_two_direct_duplex'
    ],
    select_eleven_five_location : [
        'select_eleven_five_location_direct_duplex'
    ]
}

// 3D排列三
var cai4 = {
    select_three_direct: [
        'select_three_direct_duplex'
    ],
    select_three_group: [],
    select_three_not_location: [],
    select_three_direct_sum: [],
    select_three_direct_two: [
        'select_three_direct_two_last_direct_duplex',
        'select_three_direct_two_first_direct_duplex'
    ],
    select_three_direct_one: [
        'select_three_direct_one_last_direct',
        'select_three_direct_one_first_direct'
    ],
}

// 北京赛车PK10
var pk10 = {
    pk10_guess_one: [
        'pk10_guess_one_duplex'
    ],
    pk10_guess_one_two: [
        'pk10_guess_one_two_duplex'
    ],
    pk10_guess_first_three: [
        'pk10_guess_first_three_duplex'
    ],
    pk10_guess_location: [
        'pk10_guess_location_one_five',
        'pk10_guess_location_six_ten'
    ],
    pk10_guess_daxiao: [],
    pk10_guess_danshuang: []
}

// 六合彩
var lhc = {
    lhc_tm: [],
    lhc_zm: [],
    lhc_zmt: [],
    lhc_tmsx: [],
    lhc_tmdxds: [],
    lhc_tmsb: []
}

export default {
    cai1 : cai1,
    cai2 : cai1,
    cai3 : cai1,
    cai4 : cai4,
    cai5 : cai4,
    cai6 : cai1,
    cai7 : cai1,
    cai8 : cai8,
    cai9 : cai8,
    cai10 : cai8,
    cai11 : cai1,
    cai12 : cai1,
    cai13 : pk10,
    cai14 : lhc,
    cai15 : cai1,
}
