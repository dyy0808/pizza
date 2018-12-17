import Vue from 'vue'
import Vuex from 'vuex'//引入vuex

Vue.use(Vuex)//使用vuex



//实例化，export让外部可以使用

export const store = new Vuex.Store({
    state:{//承载对应属性，用来存储数据【设置属性】
        menuItems:{},
        currenUser:null,
        isLogin:false,
    },
    //getters其实就是获取state里面的属性然后用到组件上目的是不像外界暴露state里面的属性名
    getters:{//对应方法用来获取state里面的数据[获取属性的状态]
        getMenuItems:state => state.menuItems,//这样外界就不知道你的menuItems属性名了
        // return this.$store.getters.getMenuItems 在组件使用就可以这样写

        currenUser: state => state.currenUser,
        isLogin: state =>state.isLogin,
    },
    mutations:{//改变属性的状态
        setMenuItems(state,data){//第一个参数是最上面的state，第二个参数是你NewPizza里面从服务器传过来的参数
            state.menuItems = data //将传过来的参数赋值给上的menuItems
            //这个时候我们的数据就从野狗上拿到了并且存储到了vuex中了
            //console.log(state.menuItems)
        },
        //将匹配到的对象，在menuItems数组中删除
        //同步删除，点击删除按钮会立马删除不需要刷新
        removeMenuItems(state,data){//data就是admin组件deleteData方法里面的参数item
            state.menuItems.forEach(item,index => {//遍历menuItems
                if(item == data){
                    state.menuItems.splice(index,1)
                }
            });
        },
        //将新添加的披萨push到menuItems属性中
        pushToMenuItems(state,data){
            state.menuItems.push(data)//把当前到data也push到menuItems这个里面
        },
        //更改用户的状态信息
        userStatus(state,user){
            if(user){
                state.currenUser = user
                state.isLogin = true
            }else{
                state.currenUser = null
                state.isLogin = false
            }
        }
    },
    actions:{//不直接操作，应用 mutations
        //处理的是mutations里面的逻辑
        //user传过来的数据可能是邮箱也可能是null
        setUser({commit},user){
            commit("userStatus", user)
        }
    }
})