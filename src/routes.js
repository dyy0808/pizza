import Home from './components/Home'
import Menu from './components/Menu'
import Admin from './components/Admin'
import Login from './components/Login'
import Register from './components/Register'
import About from './components/about/About'
//about里的二级路由引入
import Contact from './components/about/Contact'
import Delivery from './components/about/Delivery'
import History from './components/about/History'
import OrderingGuide from './components/about/OrderingGuide'
//about/contact里的三级路由引入
import Phone from './components/about/contact/Phone'
import PersonName from './components/about/contact/PersonName'


export const routes = [
    {path:'/',components:{
        default:Home,
        'orderingGuide':OrderingGuide,
        'delivery':Delivery,
        'history':History
        }
    },
    {path:'/menu', name:'menulink',component:Menu},
    {path:'/admin', component:Admin,
    //   beforeEnter: (to, from, next) => {
    //   //路由独享守卫
    //   //alert("非登录状态不能访问")
    //  // next(false);//点击admin这个路由会弹出然后会显示admin页面，
    //  //如果next加上false admin页面就不会显示只会留在原地
    //  if(to.path == '/login' || to.path == '/register'){
    //       //只有路由是login和register才可以显示，其他组建都是不显示的
    //       next()
    //     }else{
    //       alert('请先登录');
    //       next('/login')//否则只能显示登录页面，弹框后会自动跳转到登录下
    //     }
    // }
  },
    {path:'/login', name:'loginLink', component:Login},
    {path:'/register', component:Register},
    {path:'/about', component:About, redirect:'/about/contact', children:[
      {path:'/about/contact',name:"contactLink" , redirect:'/personname' ,component:Contact,children:[
        {path:'/phone', component:Phone},
        {path:'/personname', component:PersonName},
      ]},
      {path:'delivery',name:"deliveryLink" ,component:Delivery},
      {path:'/about/history',name:"historyLink" ,component:History},
      {path:'/about/orderingGuide',name:"orderingGuideLink" ,component:OrderingGuide},
  ]},
    {path:'*',redirect:'/'},//访问链接错了直接调整到主页上
  ]