<template>
  <div class="row">
    <div class="col-sm-12 col-md-8">
      <!-- new pizza -->
      <app-new-pizza></app-new-pizza>
    </div>
    <div class="col-sm-12 col-md-4">
      <!-- 品种展示 -->
      <h3 class="text-muted my-5">菜单</h3>
      <table class="table">
        <thead class="table table-default">
          <tr>
            <th>品种</th>
            <th>删除</th>
          </tr>
        </thead>
        <tbody v-for=" item in getMenuItems" :key="item.name">
          <tr>
            <td>{{item.name}}</td>
            <td>
              <button @click="deleteData(item)" class="btn btn-outline-danger btn-sm">&times;</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
    import NewPizza from './NewPizza.vue'//引入【这个就不用在routes里面在写路由了】
    export default{
        data(){
            return{
                //getMenuItems:[]
            }
        },
        components:{
            'app-new-pizza':NewPizza,//注册
        },
        computed:{
            /*
             getMenuItems(){
                //数据已经存储到了vuex中，现在需要获取然后使用
                return this.$store.state.menuItems
                //返回store里的state属性里面的menuItems就可以使用vuex
          },*///这个方法是从menu复制过来的但是在这个里面用会出问题，所以需要更改下
          getMenuItems:{
              get(){
                  //return this.$store.state.menuItems
                   return this.$store.getters.getMenuItems
              },
              set(){}
          },

        },
        created(){
            fetch("https://wd3406675684wibmtw.wilddogio.com/menu.json")
                .then(res => {//fetch拿到的数据是可读的数据流
                    return res.json()
                })
                .then( data => {
                    //console.log(data)//data拿到的数据形式是key:{对象}
                    let menuArray = []
                    for(let key in data){
                        //console.log(data[key])//就是每个对象
                        data[key].id = key //为每个对象增加一个id值，这个id值就是 获取数据里面的key
                        menuArray.push(data[key])//把每个对象放到menuArray数组中
                    }
                    //数据同步，将页面是新的数据保存到vuex中setMenuItems
                    this.$store.commit("setMenuItems",menuArray)
                    //this.getMenuItems = menuArray
                })
        },
        methods:{
            deleteData(item){
                 fetch("https://wd3406675684wibmtw.wilddogio.com/menu/"+item.id+"/.json",{
                     method:"DELETE",
                     headers:{
                         'Content-type':'application/json'
                     }//这个不是请求(post get)所以不用data
                 })
                 .then( res => res.json())
                 .then(data => {
                     //更新属性的状态就用commit
                 })
                 .then(err => {console.log(err)})
            }
        }
    }
</script>



