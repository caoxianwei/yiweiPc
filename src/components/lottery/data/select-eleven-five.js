//11 选 5 广东 江西 山东
import * as bettings from './betting-constants'
import * as examples from './examples'


const select_eleven_five_any_one_duplex =
[
    {
        type : "select_eleven_five_duplex",
        values : {
            titles: "复式",
            vulues: bettings.numbers_01_11,
        }
    },
]

const select_eleven_five_any_two_duplex = select_eleven_five_any_one_duplex
const select_eleven_five_any_three_duplex = select_eleven_five_any_one_duplex
const select_eleven_five_any_four_duplex = select_eleven_five_any_one_duplex
const select_eleven_five_any_five_duplex = select_eleven_five_any_one_duplex
const select_eleven_five_any_six_duplex = select_eleven_five_any_one_duplex
const select_eleven_five_any_seven_duplex = select_eleven_five_any_one_duplex
const select_eleven_five_any_eight_duplex = select_eleven_five_any_one_duplex
const select_eleven_five_first_three_group_duplex = select_eleven_five_any_one_duplex
const select_eleven_five_first_two_group_duplex = select_eleven_five_any_one_duplex

const select_eleven_five_first_three_direct_duplex =
[
    {
        type : "wan_wei",
        values : {
            titles: "万位",
            vulues: bettings.numbers_01_11,
        }
    },
    {
        type : "qian_wei",
        values : {
            titles: "千位",
            vulues: bettings.numbers_01_11,
        }
    },
    {
        type : "bai_wei",
        values : {
            titles: "百位",
            vulues: bettings.numbers_01_11,
        }
    },
]

const select_eleven_five_first_two_direct_duplex =
[
    {
        type : "wan_wei",
        values : {
            titles: "万位",
            vulues: bettings.numbers_01_11,
        }
    },
    {
        type : "qian_wei",
        values : {
            titles: "千位",
            vulues: bettings.numbers_01_11,
        }
    },
]

const select_eleven_five_location_direct_duplex = select_eleven_five_first_three_direct_duplex

export default {
    exapmleAndHelp : {
        select_eleven_five_any_one : {
            "select_eleven_five_any_one_duplex" : examples.select_eleven_five_any_one_duplex_example,
            "select_eleven_five_any_one_single" : examples.select_eleven_five_any_one_single_example,
        },
        select_eleven_five_any_two : {
            'select_eleven_five_any_two_duplex' : examples.select_eleven_five_any_two_duplex_example,
            'select_eleven_five_any_two_single' : examples.select_eleven_five_any_two_single_example,
        },
        select_eleven_five_any_three : {
            'select_eleven_five_any_three_duplex' : examples.select_eleven_five_any_three_duplex_example,
            'select_eleven_five_any_three_single' : examples.select_eleven_five_any_three_single_example,
        },
        select_eleven_five_any_four : {
            'select_eleven_five_any_four_single' : examples.select_eleven_five_any_four_single_example,
            'select_eleven_five_any_four_duplex' : examples.select_eleven_five_any_four_duplex_example,
        },
        select_eleven_five_any_five : {
            'select_eleven_five_any_five_single' : examples.select_eleven_five_any_five_single_example,
            'select_eleven_five_any_five_duplex' : examples.select_eleven_five_any_five_duplex_example,
        },
        select_eleven_five_any_six : {
            'select_eleven_five_any_six_single' : examples.select_eleven_five_any_six_single_example,
            'select_eleven_five_any_six_duplex' : examples.select_eleven_five_any_six_duplex_example,
        },
        select_eleven_five_any_seven : {
            'select_eleven_five_any_seven_single' : examples.select_eleven_five_any_seven_single_example,
            'select_eleven_five_any_seven_duplex' : examples.select_eleven_five_any_seven_duplex_example,
        },
        select_eleven_five_any_eight : {
            'select_eleven_five_any_eight_single' : examples.select_eleven_five_any_eight_single_example,
            'select_eleven_five_any_eight_duplex' : examples.select_eleven_five_any_eight_duplex_example,
        },
        select_eleven_five_first_three : {
            'select_eleven_five_first_three_group_single' : examples.select_eleven_five_first_three_group_single_example,
            'select_eleven_five_first_three_group_duplex' : examples.select_eleven_five_first_three_group_duplex_example,
            'select_eleven_five_first_three_direct_single' : examples.select_eleven_five_first_three_direct_single_example,
            'select_eleven_five_first_three_direct_duplex' : examples.select_eleven_five_first_three_direct_duplex_example,
        },
        select_eleven_five_first_two : {
            'select_eleven_five_first_two_group_single' : examples.select_eleven_five_first_two_group_single_example,
            'select_eleven_five_first_two_group_duplex' : examples.select_eleven_five_first_two_group_duplex_example,
            'select_eleven_five_first_two_direct_single' : examples.select_eleven_five_first_two_direct_single_example,
            'select_eleven_five_first_two_direct_duplex' : examples.select_eleven_five_first_two_direct_duplex_example,
        },
        select_eleven_five_location : {
            'select_eleven_five_location_direct_duplex' : examples.select_eleven_five_location_direct_duplex_example,
        }
    },
    playMethod : [
         bettings.select_eleven_five_any_one,
         bettings.select_eleven_five_any_two,
         bettings.select_eleven_five_any_three,
         bettings.select_eleven_five_any_four,
         bettings.select_eleven_five_any_five,
         bettings.select_eleven_five_any_six,
         bettings.select_eleven_five_any_seven,
         bettings.select_eleven_five_any_eight,
         bettings.select_eleven_five_first_three,
         bettings.select_eleven_five_first_two,
         bettings.select_eleven_five_location,
    ],
    methodType : {
        select_eleven_five_any_one :
        [
            {
                name : '',
                desc : '',
                items : [bettings.select_eleven_five_any_one_duplex, bettings.select_eleven_five_any_one_single],
                selectPlate : {
                    'select_eleven_five_any_one_duplex' : select_eleven_five_any_one_duplex,
                    'select_eleven_five_any_one_single' : "singlePlate",
                }
            },
        ],
        select_eleven_five_any_two :
        [
            {
                name : '',
                desc : '',
                items : [bettings.select_eleven_five_any_two_duplex, bettings.select_eleven_five_any_two_single],
                selectPlate : {
                    'select_eleven_five_any_two_duplex' : select_eleven_five_any_two_duplex,
                    'select_eleven_five_any_two_single' : "singlePlate",
                }
            },
        ],
        select_eleven_five_any_three :
        [
            {
                name : '',
                desc : '',
                items : [bettings.select_eleven_five_any_three_duplex, bettings.select_eleven_five_any_three_single],
                selectPlate : {
                    'select_eleven_five_any_three_duplex' : select_eleven_five_any_three_duplex,
                    'select_eleven_five_any_three_single' : "singlePlate",
                }
            },
        ],
        select_eleven_five_any_four :
        [
            {
                name : '',
                desc : '',
                items : [bettings.select_eleven_five_any_four_duplex, bettings.select_eleven_five_any_four_single],
                selectPlate : {
                    'select_eleven_five_any_four_duplex' : select_eleven_five_any_four_duplex,
                    'select_eleven_five_any_four_single' : "singlePlate",
                }
            },
        ],
        select_eleven_five_any_five :
        [
            {
                name : '',
                desc : '',
                items : [bettings.select_eleven_five_any_five_duplex, bettings.select_eleven_five_any_five_single],
                selectPlate : {
                    'select_eleven_five_any_five_duplex' : select_eleven_five_any_five_duplex,
                    'select_eleven_five_any_five_single' : "singlePlate",
                }
            },
        ],
        select_eleven_five_any_six :
        [
            {
                name : '',
                desc : '',
                items : [bettings.select_eleven_five_any_six_duplex, bettings.select_eleven_five_any_six_single],
                selectPlate : {
                    'select_eleven_five_any_six_duplex' : select_eleven_five_any_six_duplex,
                    'select_eleven_five_any_six_single' : "singlePlate",
                }
            },
        ],
        select_eleven_five_any_seven :
        [
            {
                name : '',
                desc : '',
                items : [bettings.select_eleven_five_any_seven_duplex, bettings.select_eleven_five_any_seven_single],
                selectPlate : {
                    'select_eleven_five_any_seven_duplex' : select_eleven_five_any_seven_duplex,
                    'select_eleven_five_any_seven_single' : "singlePlate",
                }
            },
        ],
        select_eleven_five_any_eight :
        [
            {
                name : '',
                desc : '',
                items : [bettings.select_eleven_five_any_eight_duplex, bettings.select_eleven_five_any_eight_single],
                selectPlate : {
                    'select_eleven_five_any_eight_duplex' : select_eleven_five_any_eight_duplex,
                    'select_eleven_five_any_eight_single' : "singlePlate",
                }
            },
        ],
        select_eleven_five_first_three :
        [
            {
                name : '',
                desc : '',
                items : [bettings.select_eleven_five_first_three_group_duplex, bettings.select_eleven_five_first_three_group_single,
                            bettings.select_eleven_five_first_three_direct_duplex, bettings.select_eleven_five_first_three_direct_single],
                selectPlate : {
                    'select_eleven_five_first_three_group_duplex' : select_eleven_five_first_three_group_duplex,
                    'select_eleven_five_first_three_group_single' : "singlePlate",
                    'select_eleven_five_first_three_direct_duplex' : select_eleven_five_first_three_direct_duplex,
                    'select_eleven_five_first_three_direct_single' : "singlePlate",
                }
            },
        ],
        select_eleven_five_first_two :
        [
            {
                name : '',
                desc : '',
                items : [bettings.select_eleven_five_first_two_group_duplex, bettings.select_eleven_five_first_two_group_single,
                            bettings.select_eleven_five_first_two_direct_duplex, bettings.select_eleven_five_first_two_direct_single],
                selectPlate : {
                    'select_eleven_five_first_two_group_duplex' : select_eleven_five_first_two_group_duplex,
                    'select_eleven_five_first_two_group_single' : "singlePlate",
                    'select_eleven_five_first_two_direct_duplex' : select_eleven_five_first_two_direct_duplex,
                    'select_eleven_five_first_two_direct_single' : "singlePlate",
                }
            },
        ],
        select_eleven_five_location :
        [
            {
                name : '',
                desc : '',
                items : [bettings.select_eleven_five_location_direct_duplex ],
                selectPlate : {
                    'select_eleven_five_location_direct_duplex' : select_eleven_five_location_direct_duplex,
                }
            },
        ],
    }

}
