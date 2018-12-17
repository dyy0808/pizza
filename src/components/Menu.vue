<template>
   <div class="row">
       <!-- 菜单 -->
       <div class="col-sm-12 col-md-8">
           <table class="table">
               <thead class="thead-default">
                   <tr>
                       <th>尺寸</th>
                       <th>价格</th>
                       <th>加入</th>
                   </tr>
               </thead>
               <tbody v-for="item in getMenuItems" :key="item.name">
                   <tr>
                       <td><strong>{{item.name}}</strong></td>
                   </tr>
                   <tr v-for="option in item.options" :key="option.size">
                       <td>{{option.size}}寸</td>
                       <td>{{option.price}}rmb</td>
                       <td><button @click="addToBasket(item,option)" class="btn btn-sm btn-outline-success">+</button></td>
                   </tr>
               </tbody>
           </table>
       </div>
        <!-- {{baskets}} -->
        <!-- 购物车 -->
        <div class="col-sm-12 col-md-4">
            <div v-if="baskets.length > 0">
                <table class="table">
                    <thead class="thead-default">
                        <tr>
                            <th>数量</th>
                            <th>品种</th>
                            <th>价格</th>
                        </tr>
                    </thead>
                    <tbody v-for="item in baskets" :key="item.name">
                        <tr>
                            <td>
                                <button class="btn btn-sm" @click="sub(item)">-</button>
                                <span>{{item.quantity}}</span>
                                <button class="btn btn-sm" @click="add(item)">+</button>
                            </td>
                            <td>{{item.name}}{{item.size}}</td>
                            <td>{{item.quantity * item.price}}</td>
                        </tr>
                    </tbody>
                    <p>总价：{{total + "RMB"}}</p>
                    <button class="btn btn-success btn-block">提交</button>
                </table>
            </div>
            <div v-else>{{basketText}}</div>
        </div> 
        
   </div>
  
</template>
<script>
    //import axios from 'axios'
    export default{
        data(){
            return{
               //getMenuItems:{},//这个值已经没有用了，因为数据我们已经存储到了vuex中
                baskets:[],
                basketText:"购物车没有任何商品",
            }
        },
        computed:{
            getMenuItems(){
                /*数据已经存储到了vuex中，现在需要获取然后使用
                 返回store里的state属性里面的menuItems就可以使用vuex
                return this.$store.state.menuItems*/
                return this.$store.getters.getMenuItems
                //上面的方法获取vuex属性相当于你把menuItems这个属性暴露给了外边
          },
            total(){
                let totalCost = 0;
                for(let index in this.baskets){
                    let inItem = this.baskets[index]//baskets里面的每个对象
                    console.log(inItem)
                    totalCost += inItem.quantity * inItem.price;//总价
                }
                return totalCost
            }
        },
        created(){
            this.fetchData()
        },
        methods:{
            //这个方法是拿到野狗云里面的数据给getMenuItems，然后循环到页面上
            fetchData(){
            // 一，fetch方式
                //  fetch("https://wd3406675684wibmtw.wilddogio.com/menu.json")
                //         .then(res => {
                //             return res.json()
                //         })
                //         .then( data =>{
                //             this.getMenuItems = data
                //         })
            // 二，组件内引入axios使用方式
               // axios.get("menu.json").then( res =>  this.getMenuItems = res.data)
            // 三，全局引入axios使用方式
                // this.http.get("menu.json")
                //         .then( res =>  this.getMenuItems = res.data)
            
            //上面的请求的数据其他组件不能通用，只能通过参数传递

            //将请求下来的数据存储到vuex中
               // this.http.get("menu.json")
                 //.then( res => this.$store.commit("setMenuItems",res.data))//把请求回来的数据存储到vuex中
                  this.http.get("menu.json")
                 .then(res => {
                     this.$store.commit("setMenuItems",res.data) 
                     //console.log(res.data)
                     //console.log(11)
                 })
                 //console.log(res.data)
            },
            //传进来两个参数，这来个参数是上面for循环分解出来的，item里面有name,option里面有尺寸和数量
            addToBasket(item,option){
                let basket={
                    name:item.name,
                    size:option.size,
                    price:option.price,
                    quantity:1//点击的时候添加的数量，默认我们设置为一
                }
                if(this.baskets.length > 0){
                    //过滤
                    let result = this.baskets.filter((basket) => {//拿到baskets这个数组里面的没个对像给basket
                        return basket.name === item.name && basket.price === option.
                        console.log(basket)
                    })
                    if(result !=null && result.length >0){
                        result[0].quantity++
                    }else{
                        this.baskets.push(basket)
                    }
                }else{
                    this.baskets.push(basket)
                }
                // this.baskets.push({//点击的时候把下面那些都push到定义的数组里面
                //     name:item.name,
                //     size:option.size,
                //     price:option.price,
                //     quantity:1//点击的时候添加的数量，默认我们设置为一
                // })
            },
            add(item){
                item.quantity++
            },
            sub(item){
                item.quantity--
                if(item.quantity <= 0){
                    this.remove(item)
                }
            },
            remove(item){
                this.baskets.splice(this.baskets.indexOf(item),1)
                         //baskets这个里面包含了item//当前点击item的下标，删除这个
            }
        },
    }
</script>