<template>
  <div id="s_index">
    <div class="concern">
      <swiper :options="swiperOption" ref="mySwiper">
        <!-- slides -->
        <swiper-slide v-for="(item,index) in data" :key="index">
          <v-touch v-on:press="test()">
            <img :src="item.qrcodeUrl" height="200" width="200">
          </v-touch>
        </swiper-slide>
        <!-- Optional controls -->
        <div class="swiper-pagination" slot="pagination"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
      <!-- <button btn = "1" class="changan">点击关注公众号</button> -->
    </div>
    <router-link tag="div" to="/s_pay" class="pay" >
      <div>
        <!--<img src="../assets/logo.png" height="50" width="50">-->
        <p v-if="status">请扫码进去</p>
        <p v-else-if="data.length >= 1 ">您还能获取{{data.length}}次游戏币！</p>
        <p v-else="data.length === 0 ">今天游戏币已获取完，欢迎明天再来！</p>
      </div>
    </router-link>
  </div>
</template>

<script>

  // var wifi = true;
  //    var ua = window.navigator.userAgent;
  //    var con = window.navigator.connection;
  //    // 如果是微信
  //    if(/MicroMessenger/.test(ua)){
  //        // 如果是微信6.0以上版本，用UA来判断
  //        if(/NetType/.test(ua)){
  //            if(ua.match(/NetType\/(\S*)$/)[1] != 'WIFI'){
  //                wifi = false;
  //            }
  //        // 如果是微信6.0以下版本，调用微信私有接口WeixinJSBridge
  //        }else{
  //            document.addEventListener("WeixinJSBridgeReady",function onBridgeReady(){
  //                WeixinJSBridge.invoke('getNetworkType',{},function(e){
  //                    if(e.err_msg != "network_type:wifi"){
  //                        wifi = false;
  //                    }
  //                });
  //            });
  //        }
  //    // 如果支持navigator.connection
  //    }else if(con){
  //        var network = con.type;
  //        if(network != "wifi" && network != "2" && network != "unknown"){  // unknown是为了兼容Chrome Canary
  //            wifi = false;
  //        }
  //    }
  //    alert(wifi)
  // window.networkWIFI = wifi
  var con = window.navigator
  //	if(con.connection){
  //		alert(con.connection.type)
  //	}
  //	if(con.userAgent.match(/Android/i)){
  //		alert('android')
  //	}
  //	if(con.userAgent.match(/iPhone/i)){
  //		alert('ios')
  //	}
  import Vue from 'vue'

  import VueAwesomeSwiper from 'vue-awesome-swiper'

  Vue.use(VueAwesomeSwiper)
  // if (process.BROWSER_BUILD) {
  //   const VueAwesomeSwiper = require('vue-awesome-swiper/ssr')
  //   Vue.use(VueAwesomeSwiper)
  // }
  import {swiper, swiperSlide} from 'vue-awesome-swiper'

  import Vuwe from 'vuwe'

  Vue.use(Vuwe)

  import VueResource from 'vue-resource'

  Vue.use(VueResource)
//长按
  var VueTouch = require('vue-touch');
  Vue.use(VueTouch, {name: 'v-touch'});

  function GetRequest(strName) {
    var strHref = window.location.href
    var intPos = strHref.indexOf("?");
    var strRight = strHref.substr(intPos + 1);
    var arrTmp = strRight.split("&");
    for (var i = 0; i < arrTmp.length; i++) {
      var arrTemp = arrTmp[i].split("=")
      if (arrTemp[0].toUpperCase() == strName.toUpperCase()) {
        return arrTemp[1]
      }
    }
    return false;
  }
  export default {
    components: {
      swiper,
      swiperSlide
    },
    data() {
      return {
        swiperOption: {
          pagination: '.swiper-pagination',
          nextButton: '.swiper-button-next',
          prevButton: '.swiper-button-prev',
          slidesPerView: 1,
          paginationClickable: true,
          spaceBetween: 30,
          loop: true
        },
        status:false,
        data: [
          {
            qrcodeUrl:"http://orrumi7ur.bkt.clouddn.com/wechat/qusaosaologo.jpg"
          }
        ]
      }
    },
    methods: {
      imgs(appid, deviceid) {
//      长按调用的方法
        this.$http.get('/admin/coin/create_token?appid=' + appid + '&openid=' + openid)
          .then(function (res) {
            console.log(res.data)
            if (res.data["success"]) {
              localStorage.setItem("token", res.data["token"]);
            } else {
              this.status="ture";
            }
          }, function (err) {
            console.log(err)
          })
      },
      test(){
        console.log("222222")
      }
    },
    beforeCreate() {
    },
    mounted() {
      var innerHeight = window.innerHeight;
      $('.concern').css('height', (innerHeight - 60) / 2 + 'px');
      $('.pay').css('height', (innerHeight - 60) / 2 + 'px');
      var appid = GetRequest("appid");
      var deviceid = GetRequest("deviceid");

//      if (appid && deviceid) {
//        localStorage.setItem("appid", appid);
//        localStorage.setItem("deviceid", deviceid);
//        this.$http.get('/api/qrcode')
//          .then(function (res) {
//            console.log(res.data);
//            this.data = res.data;
//          }, function (err) {
//            console.log(err)
//          })
//      } else if (localStorage.getItem("appid") && localStorage.getItem("deviceid")) {
//        this.$http.get('/api/qrcode')
//          .then(function (res) {
//            console.log(res.data);
//            this.data = res.data;
//          }, function (err) {
//            console.log(err)
//          })
//      } else {
//        this.status = true;
//      }

    }
  }
</script>

<style lang="less">
  @import '../less/s_index.less';
</style>
