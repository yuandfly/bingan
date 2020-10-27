export default {
    namespaced: true,
    state: {
        baza00: undefined, // 从随机或组合查询过来时设置，进入homepage就获取这个病案的详情
        randomSearchCondition: undefined, // 从随机查询过来，把查询条件带过来
        groupSearchCondition: undefined,

        notInDrgCondition: undefined,//drg未入组查询条件

        searchData: { // 当前的随机查询结果，有baza00时进入homepage需要设置到页面data中
            tableData: [],
            pager: {}
        }
    },
    getters: {

    },
    mutations: {
        setSearchInfo(state, {baza00, randomSearchCondition, groupSearchCondition,notInDrgCondition, searchData}) {
           // console.log('设置了', baza00)
            state.baza00 = baza00;
            state.randomSearchCondition = randomSearchCondition;
            state.groupSearchCondition = groupSearchCondition;
            state.notInDrgCondition = notInDrgCondition;
            state.searchData = searchData
        },
    },
    actions: {

    }
}
