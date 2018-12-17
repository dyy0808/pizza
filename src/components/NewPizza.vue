<template>
  <form>
    <h3 class="text-muted my-5">添加新的Pizza</h3>
    <div class="form-group row">
      <label class="col-sm-1">品种</label>
      <div class="col-sm-11">
        <input type="text" class="form-control" v-model="newPizza.name">
      </div>
    </div>
    <div class="form-group row">
      <label class="col-sm-1">描述</label>
      <div class="col-sm-11">
        <textarea rows="5" class="form-control" v-model="newPizza.description"></textarea>
      </div>
    </div>
    <p><strong>选项1</strong></p>
    <div class="form-group row">
      <label class="col-sm-1">尺寸</label>
      <div class="col-sm-11">
        <input type="text" class="form-control" v-model="newPizza.size1">
      </div>
    </div>
     <div class="form-group row">
      <label class="col-sm-1">价格</label>
      <div class="col-sm-11">
        <input type="text" class="form-control" v-model="newPizza.price1">
      </div>
    </div>

    <p><strong>选项2</strong></p>
    <div class="form-group row">
      <label class="col-sm-1">尺寸</label>
      <div class="col-sm-11">
        <input type="text" class="form-control" v-model="newPizza.size2">
      </div>
    </div>
     <div class="form-group row">
      <label class="col-sm-1">价格</label>
      <div class="col-sm-11">
        <input type="text" class="form-control" v-model="newPizza.price2">
      </div>
    </div>
    <div class="form-group row">
      <button @click="addMenuItem" type="button" class="btn btn-success btn-block">添加</button>
    </div>
  </form>
</template>
<script>
  export default{
      data(){
          return{
              newPizza:{}
          }
      },
      methods:{
          addMenuItem(){
              //console.log(this.newPizza)
              let data = {
                  name:this.newPizza.name,
                  description:this.newPizza.description,
                  options:[
                      {
                          size:this.newPizza.size1,
                          price: this.newPizza.price1
                      },
                      {
                          size:this.newPizza.size2,
                          price: this.newPizza.price2
                      }
                  ]
              }
              //axios vue-resource es6里的fetch [这三个意义是一样的]
                //vue-resource官方已经不在更新了，

              //fetch的好处是不需要安装任何东西，其他两个都需要安装
              //点击添加按钮往野狗云传数据【menu.json 新建的存错数据名字，不用自己创建会自动生成】
              // 一，fetch往野狗云传数据的方式
              /*
              fetch("https://wd3406675684wibmtw.wilddogio.com/menu.json",{
                  method:"POST",
                  headers: {"Content-type":'application/json'},
                  body:JSON.stringify(data)//data是要传入野狗云的数据
              })
              .then(res => res.json())//转换成json
              .then(data => this.$router.push("/menu"))
              .catch(err => console.log(err))
              */
             // 二 axios 往野狗云传数据的方式
            //  this.http.post("menu.json",data)
            //             .then( res => this.$store.push("/menu")）
                        /*vuex的方法mutations 通过commit来传参数
        
                        这句话是去你的store里面找setMenuItem方法
                        将拿回的数据res.data放到setMenuItems这个方法里面，这个方法是在
                        vuex的方法mutations里面定义
                        */
            //数据同步到vuex中，这样就可以实现不刷新页面就可以显示添加的内容
            this.http.post("menu.json",data)
                         .then( res => this.$store.commit("pushToMenuItems",data))     
                         //把data数据放到store里面到pushToMenuItems方法
          }
      },
  }
</script>
