<template>
    <div class="row mt">
        <div class="col-md-12 col-lg-12">
            <div class="card">
                <div class="card-body">
                    <img class="mx-auto d-block" src="../../src/assets/icon.png" >
                    <form @submit.prevent="onSubmit">
                        <div class="form-group">
                            <label for="password">邮箱</label>
                            <input type="email" class="form-control" v-model="email">
                        </div>
                        <div class="form-group">
                            <label for="password">密码</label>
                            <input type="password" class="form-control" v-model="password">
                        </div>
                        <button type="submit" class="btn btn-block btn-success">登录</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
    export default{
        data(){
            return{
                email:"",
                password:"",
            }
        },
        //导航内的守卫，一进路由之前就需要清空邮箱名
        beforeRouteEnter (to, from, next) {
            // ...
        // this.$store.dispatch("setUser",null)
            next(vm => {
                vm.$store.dispatch("setUser",null)
                //点击退出后就会链接跳转到登录页面然后登录上的邮箱名字
            })
        },
        methods:{
            onSubmit(){
                axios.get('users.json')
                .then(res => {
                   //console.log(res.data)
                   const data = res.data
                   const users = []
                   for(let key in data){
                       users.push(data[key])
                   }
                   //console.log(user)
                    console.log(users)//users是一个数组，数组里面有所有的信息
                   //实现过滤
                   let result = users.filter((user) => {
                       console.log(user)//user是数组里面的每个对象
                       return user.email ===this.email && user.password === this.password
                              //当收入内容匹配那么就将输入内容给了result[result是个数组],否则是空
                   })
                   //console.log(result)
                   if(result != null && result.length > 0){
                       this.$store.dispatch("setUser",result[0].email)
                       //dispatch在actions里用的
                       this.$router.push("/")
                       //this.$router.push({name:“homeLink”}) 路由名字跳转要加花括号
                   }else{
                       alert("账号或密码错误")
                       this.$store.dispatch("setUser",null)
                   }

                })
            }
        }
    }
</script>