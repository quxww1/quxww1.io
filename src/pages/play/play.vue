<template>
  <div class="countainer" @click="wNone">
      <!-- 顶部导航 -->
      <div class="nav">
          <div class="item"><i> Welcome!</i></div>
          <span class="hidden-sm-and-down">|</span>
          <div class="item hidden-sm-and-down" @click=skip(0)>About</div>
          <span>|</span>
          <div class="item" @click=skip(1)>Blog</div>
          <span>|</span>
          <i class="item fa fa-github" @click=skip(2)></i>
          <span>|</span>
          <i class="item fa fa-weibo" @click=skip(3)></i>
          <span class="hidden-sm-and-down">|</span>
          <i class="item fa fa-wechat hidden-sm-and-down" @click.stop=weixin></i>
          <span class="hidden-sm-and-down">|</span>
          <div class="item zhihu hidden-sm-and-down " @click=skip(4)>知</div>
          <!-- 微信二维码 -->
          <img class="qrcode" :style="{top:top + 'px'}" src="https://quxww1.oss-cn-beijing.aliyuncs.com/githubio/weixin.jpg" alt="">
      </div>
      <!-- 背景图 -->
      <div class="bg-box"  :style="{width:w + 'px',height:h + 'px',opacity:opacity}">
        <img :src="bg" :class="{skew:skew}" id="bg" alt="" v-show="!isChange">
        <img src="https://io-bg.oss-cn-beijing.aliyuncs.com/info/buffer.jpg" id="buffer" v-show="isChange" alt="">
      </div>
      <!-- 左上角换新壁纸按钮 -->
      <i class="hidden-sm-and-down el-icon-refresh change-bg" :class="{a:isA}" @click="changeBg"></i>
      <!-- 英文欢迎语 -->
      <h2 class="p1" :style="{marginTop:h/2 - 50 + 'px'}">
        <span > HI，I'M ~~[Qu Xiang]. GLAD TO SEE U，WELCOME TO HERE</span>
      </h2>
      <!-- 中文欢迎语 -->
      <h2 class="p2 ">人生不仅有眼前的苟且，还有永远填不满的远程仓库 &emsp;-- <span class="qux">qux</span> </h2>
      <!-- 右下角按钮 -->
      <p class="to-old" @click=skip(-1)>去旧版</p>
      <!-- 更换壁纸提示语 -->
      <p class="tips" :style="{top:tipsTop + 'px'}" >Wallpaper Is Loading...</p>
      <!-- 右上角按钮 -->
      <i class="el-icon-setting setting hidden-sm-and-down" @click.stop="rightShow"></i>
      <!-- 底部版权信息 -->
      <p class="design">{{text}}</p>
      <!-- 右侧弹出盒子 -->
      <div class="right hidden-sm-and-down" @click.stop="rightBoxClick" :style="{height:h + 'px',right:right+'px'}">
        <div class="bg"></div>
        <div class="content">
          <img class="head-img" src="https://io-bg.oss-cn-beijing.aliyuncs.com/info/headimg.jpg" alt="">
          <p class="title">屈向的地盘</p>
          <h1>滑我改变背景透明度</h1>
          <div class="block">
            <el-slider v-model="value2"></el-slider>
          </div>
        </div>
      </div>
      <p class="look" @click="look">LOOK</p>
  </div>
</template>
<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      //顶部导航
      me: [
        {
          title: "关于我",
          url: "https://github.com/quxww1/blog/issues/2"
        },
        {
          title: "blog",
          url: "https://github.com/quxww1/blog"
        },
        {
          title: "Github",
          icon: "github",
          url: "https://github.com/quxww1"
        },
        {
          title: "微博",
          icon: "",
          url: "https://weibo.com/u/3559072667"
        },
        {
          title: "知乎",
          url: "https://www.zhihu.com/people/canismajori/activities"
        }
      ],
      //微信距顶部距离
      top: -90,
      //获取的浏览器窗口款高
      w: 0,
      h: 0,
      //背景图序号
      num: 1,
      //左上角按钮
      //是否开启旋转动画类isAnimate??
      isA: false,
      //是否已经点击过换壁纸按钮
      isClick: false,
      //是否正则更换壁纸
      isChange: true,
      tipsTop: -100,

      //投影度滑块的值
      value2: 70,
      // right:-400,
      right: -350,
      skew: true
    };
  },
  mounted: function() {
    let imgLoad = (img, callback) => {
      let timer1 = setInterval(() => {
        if (img.complete) {
          // console.log(1);
          callback();
          clearInterval(timer1);
        }
      }, 50);
    };
    imgLoad(bg, () => {
      this.isChange = false;
      //从旧版过来的不用去移除加载动画
      if (this.$route.params.root == 1) return;
      document.body.removeChild(document.getElementById("loading"));
    });
    console.log(
      "%c大胆！竟敢打开我的控制台 哼！",
      "color:#2985FB;font-weight:bold"
    );
  },
  created() {
    //创建随机背景图序号
    this.createNum();
    //开启自动轮换背景图
    this.bgAutoChange();
    //获取浏览器窗口宽高
    this.getWH();
    //禁用滚动条
    document.body.parentNode.style.overflow = "hidden";
    //监听浏览器款高变化
    window.onresize = () => {
      this.getWH();
    };
  },
  computed: {
    //背景图地址
    bg() {
      return `https://io-bg.oss-cn-beijing.aliyuncs.com/bg/bg${
        this.num
      }.jpg`;
    },
    //背景透明度
    opacity() {
      return this.value2 / 100;
    },
    text() {
      let year = new Date().getFullYear();
      return `@ Copyright 2018 - ${year} Design and Creation By quxiang  All Rights Reserved`;
    }
  },
  watch: {},
  methods: {
    //跳转
    skip(e) {
      if (e == -1) {
        this.$router.push({ name: "HelloWorld" });
        return;
      }
      window.open(this.me[e].url);
    },
    //显示微信二维码
    weixin() {
      this.top = 200;
    },
    //全局隐藏弹出框
    wNone() {
      this.top = -90;
      this.right = -350;
    },
    //获取宽高
    getWH() {
      this.w = document.body.clientWidth;
      this.h = window.innerHeight;
    },
    //左上角按钮手动更换壁纸
    changeBg() {
      let t = this;
      t.isClick = true;
      //小圆圈转起
      t.isA = true;
      let timer = setTimeout(() => {
        t.isA = false;
        clearTimeout(timer);
      }, 3020);
      //换壁纸
      t.createNum();
      t.isChange = true;
      t.tipsTop = 200;
      let imgLoad = (img, callback) => {
        let timer2 = setInterval(() => {
          if (img.complete) {
            callback();
            clearInterval(timer2);
          }
        }, 50);
      };
      imgLoad(bg, () => {
        t.isChange = false;
        t.tipsTop = -100;
      });
    },
    //背景自动轮换
    bgAutoChange() {
      let t = this;
      let AutoChange = setInterval(() => {
        if (t.isClick) {
          clearInterval(AutoChange);
          t.isClick = false;
          t.bgAutoChange();
          return false;
        }
        t.createNum();
      }, 10000);
    },
    //产生(min,max)随机数
    createNum() {
      let maxNum = 44;
      let minNum = 1;
      this.skew = false;
      this.num = parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
      this.skew = true;
    },
    //显示右侧弹出盒子
    rightShow() {
      this.right = 0;
    },
    //点击空白处隐藏右侧弹出盒子
    rightBoxClick() {},
    look() {
      const { href } = this.$router.resolve({
        name: "look"
      });
      window.open(href, "_blank", "toolbar=yes, width=1300, height=900");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang= 'scss'>
@import "element-ui/lib/theme-chalk/display.css";

.nav {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 40px;
  background: transparent;
  position: fixed;
  top: 0;
  left: 0;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  font-family: $en;
  div {
    font-size: 14px;
    font-weight: 500;
    transition: all 0.5s linear;
  }
  .zhihu {
    font-family: $cn;
    &:hover {
      color: rgb(85, 132, 238);
      transition: all 0.1s linear;
      font-weight: 600;
    }
  }
  .fa-github {
    &:hover {
      color: rgb(85, 132, 138);
      transition: all 0.1s linear;
      font-weight: 500;
    }
  }
  .fa-weibo {
    &:hover {
      color: rgb(219, 74, 74);
      transition: all 0.1s linear;
      font-weight: 500;
    }
  }
  .fa-wechat {
    &:hover {
      color: rgb(0, 184, 31);
      transition: all 0.1s linear;
      font-weight: 500;
    }
  }
  .item {
    margin: 0 10px;
    cursor: pointer;
  }
  span {
    font-size: 12px;
    margin: 0 5px;
  }
}
.qrcode {
  position: absolute;
  width: 90px;
  height: 90px;
  transition: all 0.3s ease-in-out;
}
.bg-box {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  @media screen and (min-width: 1200px) {
    img {
      width: 100%;
      height: auto;
      min-width: 1650px;
    }
  }
  @media screen and (max-width: 1200px) {
    img {
      width: 100%;
      height: 100%;
      min-width: 1200px;
    }
  }
  .skew {
    animation: skew 26s infinite linear;
  }
  @keyframes skew {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(1.5);
    }
  }
}
/*左上角按钮*/
.change-bg {
  font-size: 20px;
  font-weight: 500;
  position: fixed;
  top: 12px;
  left: 16px;
  cursor: pointer;
}
.a {
  animation: rot 3s ease-in-out;
}
.anmitate {
  @keyframes rot {
    0% {
      transform: rotate(0deg);
      color: rgb(85, 132, 238);
    }
    100% {
      transform: rotate(-1080deg);
    }
  }
}
.p1 {
  font-size: 30px;
  text-align: center;
  margin-bottom: 40px;
  position: relative;
  height: 60px;
  width: fit-content;
  margin: 0 auto;
  font-family: $en;
  &:after {
    content: "";
    position: absolute;
    left: 0%;
    top: auto;
    bottom: 0;
    right: auto;
    height: 5px;
    width: 0px;
    transition: all 1s ease-in-out;
    background-color: rgba($color: #000, $alpha: 0.5);
  }
  &:hover:after {
    width: 100%;
    transition: all 1s ease-in-out;
  }
}

.p2 {
  width: fit-content;
  position: relative;
  font-weight: 300;
  font-size: 20px;
  margin: 10px auto;
  text-align: center;
  height: 40px;
  font-family: $cn;
  &:after {
    content: "";
    position: absolute;
    left: auto;
    top: auto;
    bottom: 0;
    right: 0%;
    height: 5px;
    width: 0px;
    transition: all 1s ease-in-out;
    /* background-color: #c0c0c0; */
    background-color: rgba($color: #000, $alpha: 0.5);
  }
  &:hover:after {
    width: 100%;
    transition: all 1s ease-in-out;
  }
}

@media screen and (max-width: 800px) {
  .p1 {
    font-size: 20px;
  }
  .p2 {
    font-size: 10px;
  }
}
.to-old {
  font-size: 13px;
  position: fixed;
  bottom: 10px;
  right: 30px;
  color: gray;
  cursor: pointer;
  font-family: $cn;
  &:hover {
    color: rgb(85, 132, 238);
  }
}

/*跟换壁纸提示*/
.tips {
  position: fixed;
  width: 100%;
  height: 50px;
  text-align: center;
  font-size: 30px;
  font-family: $en;
  transition: all 0.1s ease-in-out;
}

/*右上角按钮*/
.setting {
  position: fixed;
  font-size: 20px;
  font-weight: 500;
  top: 12px;
  right: 20px;
  cursor: pointer;
  transition: all 1s ease-in-out;
  &:hover {
    transform: rotate(360deg);
    transition: all 1s ease-in-out;
  }
}

/*右侧弹出盒子*/
.right {
  width: 350px;
  position: fixed;
  top: 0;
  transition: all 0.3s ease-in-out;
  .bg {
    position: absolute;
    width: 100%;
    height: 100%;
    $blur: 5px;
    background: rgba(255, 255, 255, 0.5);
    -webkit-filter: blur($blur);
    -moz-filter: blur($blur);
    -o-filter: blur($blur);
    -ms-filter: blur($blur);
    filter: blur($blur);
    z-index: -2;
  }
  .content {
    width: 80%;
    margin: 60px auto;
    h1 {
      font-size: 15px;
      margin: 20px 0;
      font-family: $cn;
    }
    .head-img {
      width: 80px;
      height: 80px;
      margin: 30px auto;
      display: block;
      margin-bottom: 0;
      box-shadow: 0 0 0 2px #e8e2d6, 0 0 0 4px #c0c0c0;
      &:hover {
        box-shadow: 0 0 0 2px #e8e2d6, 0 0 0 4px #e1d9c9;
      }
    }
    .title {
      font-family: $cn;
      margin: 10px 0;
      text-align: center;
      transition: all 1s linear;
      &:hover {
        transform: translate(5px);
        transition: all 1s linear;
      }
    }
  }
}

.design {
  position: fixed;
  bottom: 10px;
  font-size: 12px;
  left: 50%;
  transform: translate(-50%);
  font-family: $en;
}
.qux {
  font-family: $en;
}
.look {
  font-size: 13px;
  position: fixed;
  bottom: 10px;
  left: 30px;
  color: gray;
  cursor: pointer;
  font-family: $en;
  &:hover {
    color: rgb(85, 132, 238);
  }
}
</style>
