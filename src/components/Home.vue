<template>
     <div class="row">
    <div id="home" class="col-sm-12 text-center">
      <div class="background">
        <h1>欢迎大家品尝pizza!</h1>
        <h2>这里有你非常喜欢的pizza!</h2>
        <button class="btn btn-success">Let's order!</button>
      </div>
    </div>
  </div>
</template>
<style>
#home{
  background: url('../../src/assets/pizza.jpg');
  height: 85vh;
  /* 85vh：整个屏幕占85% 的高度 只有谷歌支持这个单位*/
  padding: 10%;
}

h1,h2{
  margin: 6%;
}

.background{
  background: #eee;
  opacity: 0.8;
  max-width: 70vw;
  margin: 0 auto;
  padding: 20px 0;
}
</style>
