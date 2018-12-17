1，a链接会跳转刷新页面，但是router-link 不会刷新页面只是组件间的切换
路由
2,路由跳转的三种方式
    1，to="/" tag=“div” 可以把router-link 变成div标签

    2，router-link 里面可以动态绑定
        标签里面写 :to="homlink"
        script data 里面写 homlink:"/"

    3, :to="{name:'homelink'}" 这个是给路由起的名字

3,{path:'*',redirect:'/'},//访问链接错了直接调整到主页上 main里面配置
4,路由跳转
     <button @click="goToMenu" >Let's order!</button>
     goToMenu(){
        // 跳转到上一次浏览的页面
        // this.$router.go(-1)

        // 指定跳转的地址
        // this.$router.replace('/menu')

        // 指定跳转路由的名字下
        // this.$router.replace({name:'menuLink'})

        // 通过push进行跳转
        // this.$router.push('/menu')
        this.$router.push({name:'menuLink'})
      }
5，二级/三级路由嵌套
    <router-view></router-view>是需要改变的位置
6. 路由方面的守卫方式
    全局守卫，组件内守卫，路由独享守卫
    意思就是如果你没有登录其他的功能都允许你使用类似于这种情况就叫做守卫
    //全局守卫写在main.js
    //beforeEach路由独享守卫
    router.beforeEach((to,form,next)=>{
        //to要进入那个路由
        //form是从那个路由离开
        //next是对应的函数，这个函数是决定是否展示要看到的路由界面
    if(to.path == '/login' || to.path == '/register'){
        //只有路由是login和register才可以显示当前点击的页面，
        next()
    }else{
        alert('请先登录');
        next('/login')//否则只能显示登录页面，弹框后会自动跳转到登录下
        }
    })

//组建内守卫
    //在进入和离开路由进行操作
    // export default{
    //     data(){
    //         return{
    //             name:"Henry"
    //         }
    //     },
    //进入组建和离开组建不能同时出现，只能写一个
        // beforeRouteEnter (to, from, next) {
        //     // 进入组建
        //     //alert("hello"+this.name);//data渲染之前这个已经执行了，所以拿不到name的值
        //     next(vm => {
        //         alert("hello" +vm.name)//可以正常使用
        //     })
    //     // },
    //     beforeRouteLeave (to, from, next) {
    //         // 来开组建时
    //         if(confirm("确定离开吗？") == true){
    //             //confirm("确定离开吗？") 确定是true，取消是false
    //             next()//如果确定离开就会跳转到你点击的页面
    //         }else{
    //             next(false)//如果取消离开还会留在当前页面
    //         }
    //     },
    // }
