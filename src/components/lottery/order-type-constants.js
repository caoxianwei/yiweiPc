// 各分组彩票玩法对应的 lottery_type.id
// 时时彩
var cai1 = {
	    five_star : {
	    	'direct_single' : 34,
	    	'direct_duplex' : 31,
	    	'group_120' : 53,
	    	'group_60' : 54,
	    	'group_30' : 55,
	    	'group_20' : 56,
	    	'group_10' : 57,
	    	'group_5' : 58,
	    },
	    four_star : {
	    	'direct_first_four_single' : 35,
	    	'direct_first_four_duplex' : 32,
	    	'direct_last_four_single' : 36,
	    	'direct_last_four_duplex' : 33,
	    	'group_24' : 59,
	    	'group_12' : 60,
	    	'group_6' : 61,
	    	'group_4' : 62,
	    },
	    first_three: {
	    	'direct_first_three_single' : 22,
	    	'direct_first_three_duplex' : 21,
	    	'direct_first_three_sum' : 63,
	    	'group_first_three_three_duplex' : 24,
	    	'group_first_three_three_single' : 25,
	    	'group_first_three_six_duplex' : 26,
	    	'group_first_three_six_single' : 27,
	    	'group_first_three_mix_single' : 69,

	    },
	    middle_three: {
	    	'direct_middle_three_single' : 38,
	    	'direct_middle_three_duplex' : 37,
	    	'direct_middle_three_sum' : 64,
	    	'group_middle_three_three_duplex' : 39,
	    	'group_middle_three_three_single' : 40,
	    	'group_middle_three_six_duplex' : 41,
	    	'group_middle_three_six_single' : 42,
	    	'group_middle_three_mix_single' : 70,

	    },
	    last_three: {
	    	'direct_last_three_single' : 3,
  			'direct_last_three_duplex' : 2,
  			'direct_last_three_sum' : 8,
  			'group_last_three_three_duplex' : 4,
  			'group_last_three_three_single' : 5,
  			'group_last_three_six_duplex' : 6,
  			'group_last_three_six_single' : 7,
  			'group_last_three_mix_single' : 71
	    },
	    any_three: {
	    	'direct_any_three_single' : 44,
	    	'direct_any_three_duplex' : 43,
	    	'direct_any_three_sum' : 65,
	    	'group_any_three_three_duplex' : 45,
	    	'group_any_three_three_single' : 46,
	    	'group_any_three_six_duplex' : 47,
	    	'group_any_three_six_single' : 48,
	    	'group_any_three_mix_single' : 72,

	    },
	    first_two: {
	    	'direct_first_two_single' : 15,
	    	'direct_first_two_duplex' : 14,
	    	'direct_first_two_sum' : 66,
	    	'group_first_two_duplex' : 28,
	    	'group_first_two_single' : 29,
	    },
	    last_two: {
	    	'direct_last_two_single' : 17,
	    	'direct_last_two_duplex' : 16,
	    	'direct_last_two_sum' : 67,
	    	'group_last_two_duplex' : 18,
	    	'group_last_two_single' : 19,
	    },
	    any_two: {
	    	'direct_any_two_single' : 50,
	    	'direct_any_two_duplex' : 49,
	    	'direct_any_two_sum' : 68,
	    	'group_any_two_duplex' : 51,
	    	'group_any_two_single' : 52,
	    },
	    location_gall: {
	    	'location_gall_type' : 9,
	    },
	    not_location: {
	    	'not_location_last_three_one_code' : 1,
	    	'not_location_first_three_one_code' : 23,
	    	'not_location_last_three_two_code' : 73,
	    	'not_location_first_three_two_code' : 74,
	    },
	    big_little_odd_even: {
	    	'big_little_odd_even_first_two' : 30,
	    	'big_little_odd_even_last_two' : 20,
	    },
	    interesting: {
	    	'interesting_one' : 75,
	    	'interesting_two' : 76,
	    	'interesting_three' : 77,
	    	'interesting_four' : 78,
	    }
	}
// 11选5
var cai8 = {
    select_eleven_five_any_one : {
        "select_eleven_five_any_one_duplex" : 101,
        "select_eleven_five_any_one_single" : 125,
    },
    select_eleven_five_any_two : {
        'select_eleven_five_any_two_duplex' : 102,
        'select_eleven_five_any_two_single' : 103,
    },
    select_eleven_five_any_three : {
        'select_eleven_five_any_three_duplex' : 104,
        'select_eleven_five_any_three_single' : 105,
    },
    select_eleven_five_any_four : {
        'select_eleven_five_any_four_single' : 107,
        'select_eleven_five_any_four_duplex' : 106,
    },
    select_eleven_five_any_five : {
        'select_eleven_five_any_five_single' : 109,
        'select_eleven_five_any_five_duplex' : 108,
    },
    select_eleven_five_any_six : {
        'select_eleven_five_any_six_single' : 111,
        'select_eleven_five_any_six_duplex' : 110,
    },
    select_eleven_five_any_seven : {
        'select_eleven_five_any_seven_single' : 113,
        'select_eleven_five_any_seven_duplex' : 112,
    },
    select_eleven_five_any_eight : {
        'select_eleven_five_any_eight_single' : 115,
        'select_eleven_five_any_eight_duplex' : 114,
    },
    select_eleven_five_first_three : {
        'select_eleven_five_first_three_group_single' : 124,
        'select_eleven_five_first_three_group_duplex' : 123,
        'select_eleven_five_first_three_direct_single' : 120,
        'select_eleven_five_first_three_direct_duplex' : 119,
    },
    select_eleven_five_first_two : {
        'select_eleven_five_first_two_group_single' : 122,
        'select_eleven_five_first_two_group_duplex' : 121,
        'select_eleven_five_first_two_direct_single' : 118,
        'select_eleven_five_first_two_direct_duplex' : 117,
    },
    select_eleven_five_location : {
        'select_eleven_five_location_direct_duplex' : 116,
    }
}

// 3D排列三
var cai4 = {
    select_three_direct: {
        'select_three_direct_duplex' : 201,
        'select_three_direct_single' : 202,
    },
    select_three_group: {
        'select_three_group_suplex' : 203,
        'select_three_group_single' : 204,
        'select_three_group_six_duplex' : 205,
        'select_three_group_six_single' : 206,
    },
    select_three_not_location: {
        'select_three_not_location_three' : 210,
    },
    select_three_direct_sum: {
        'select_three_direct_sum_three' : 214,
    },
    select_three_direct_two: {
        'select_three_direct_two_last_direct_duplex' : 212,
        'select_three_direct_two_last_direct_single' : 213,
        'select_three_direct_two_first_direct_duplex' : 208,
        'select_three_direct_two_first_direct_single' : 209,
    },
    select_three_direct_one: {
        'select_three_direct_one_last_direct' : 211,
        'select_three_direct_one_first_direct' : 207,
    },
}

// 北京赛车PK10
var pk10 = {
    pk10_guess_one: {
        'pk10_guess_one_duplex': 301,
    },
    pk10_guess_one_two: {
        'pk10_guess_one_two_duplex' : 302,
        'pk10_guess_one_two_single' : 303,
    },
    pk10_guess_first_three: {
        'pk10_guess_first_three_duplex' : 304,
        'pk10_guess_first_three_single' : 305,
    },
    pk10_guess_location: {
        'pk10_guess_location_one_five' : 306,
        'pk10_guess_location_six_ten' : 307,
    },
    pk10_guess_daxiao: {
        'pk10_guess_daxiao_one' : 308,
        'pk10_guess_daxiao_two' : 309,
        'pk10_guess_daxiao_three' : 310,
    },
    pk10_guess_danshuang: {
        'pk10_guess_danshuang_one' : 311,
        'pk10_guess_danshuang_two' : 312,
        'pk10_guess_danshuang_three' : 313,
    },
}

// 六合彩
var lhc = {
    lhc_tm: {
        'lhc_tm_type' : 401,
    },
    lhc_zm: {
        'lhc_zm_type' : 402,
    },
    lhc_zmt: {
        'lhc_zmt_one' : 403,
        'lhc_zmt_two' : 404,
        'lhc_zmt_three' : 405,
        'lhc_zmt_four' : 406,
        'lhc_zmt_five' : 407,
        'lhc_zmt_six' : 408,
    },
    lhc_tmsx: {
        'lhc_tmsx_type' : 409,
    },
    lhc_tmdxds: {
        'lhc_tmdxds_type' : 410,
    },
    lhc_tmsb: {
        'lhc_tmsb_type' : 411,
    },
}

//快三

var happyThree = {
    two_diff : {
        'two_diff_standard' : 501,
        'two_diff_single' : 502,
        'two_diff_dan_tuo' : 503,
    },
    two_same_simple : {
        'two_same_simple_standard' : 504,
        'two_same_single' : 505,
    },
    two_same_complex : {
        'two_same_complex' : 506,
    },
    three_diff : {
        'three_diff_standard' : 507,
        'three_diff_single' : 508,
        'three_diff_dan_tuo' : 509,
        'three_diff_sum' : 510,
    },
    three_same_simple : {
        'three_same_simple' : 511,
    },
    three_same_all : {
        'three_same_all' : 512,
    },
    three_of_order_all : {
        'three_of_order_all' : 513,
    },
    three_sum : {
        'three_sum' : 514,
    }
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
    cai17 : happyThree,
}
