<template>
  <div class="global-loading">
    <div class="loading-logo"></div>
    <div class="loading-bg"></div>
    <div class="global-loading-cont">
      <div id="loading-center-absolute">
        <div class="object"></div>
        <div class="object"></div>
        <div class="object"></div>
        <div class="object"></div>
        <div class="object"></div>
        <div class="object"></div>
        <div class="object"></div>
        <div class="object"></div>
        <div class="object"></div>
        <div class="object"></div>
        <div class="object"></div>
        <div class="object"></div>
        <div class="object"></div>
        <div class="object"></div>
        <div class="object"></div>
        <div class="object"></div>
        <div class="object"></div>
        <div class="object"></div>
        <div class="object"></div>
        <div class="object"></div>
      </div>
      <p class="text">加载中...</p>
    </div>
    <div class="ft-record">Copyright@2020 深圳市智汇奇策科技有限公司 版权所有 <a href="http://www.miitbeian.gov.cn" target="_blank">粤ICP备17140632号-1</a></div>
  </div>
</template>

<script>
    export default {
        name: "index"
    }
</script>

<style scoped>
  .global-loading{
    width: 100%;
    height:100vh;
    position: relative;
    overflow: hidden;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
  }
  .loading-logo{
    position: absolute;
    top:20px;
    left: 20px;
    width: 220px;
    height: 66px;
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAABaCAMAAAA1r5svAAABp1BMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7/v////////////8Alt8AmOAAhdoAj90Ah9sAi9wAkt4Af9gAld8AgdkAg9kAetfz+/7l9fze8/zA5feU0vJkwOxKs+gAdNXK6/mi2PRuv+wxpeQno+MhnOERmeD4/v/Y8Pt5yO9StenR7fq55Pey3PVyxu5CrOY0rOYcoePF6PmO0fKGzPCAye8PlN/s+f2o3PWd0/JBsuhbvOtiueoFmuEHkt8tmOAAX8/e7vrLpxzsAAAAVnRSTlMAGklO/uwFOY8cA4eB3WPoCPfzo5tlqpx2TF4S++GTgIw0zr15Dswu44Wt1rumPB4WbiIQVQuxclrvazHatEEp0seXRuXCn1El7X3QaTYBs7i2ifxIUE7puP0AAAtUSURBVHja7ZtpX9NYFIcvFMoObRFsaQEBC0IRKFBaxGGHARR1ttMm6cq+76CA4+7oLB967k1C9rZJ0HkxzfNCf0nXPD333P9NArKwsLCwsLCwsLCwsLCwsLCwsPg/MF4fcIJenJN3y1DBMjACRmkcQoVJ1ygYp24QFSJFLjBDaUHW1hSY4wUqPIpBzuqrdZDx6q/D6+39j6CiDxUa3ucg53on/hKk7O1QcSadOXqpavKo0PDMgozTeIL6ugpS3qTpaDRKMRsg5zGSs2DzeCqREYY8Hs+M5CVdxTaPJray7KnH5rHNoOw4PJ7IgOaQ8vzYhoxxH+ScJaMpRlFE75LYVmzlD2Xe8iMZLtz1kSaDXRL6JQcKGAfiGZ6ErEyiLDQB5meUnR78uJasCN5vQ8ZoATmv41iWskG9pVJY1j4oIIctP/IWzRjXATJ6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');
    background-repeat: no-repeat;
    background-size: 220px;
    z-index: 2;
  }
  .global-loading .loading-bg{
    position: absolute;
    height: 100%;
    width: 100%;
    background-image: url('../../../src/assets/bg5.jpg');
    background-position: 50% 50%;
    background-size: cover;
    background-repeat: no-repeat;
    z-index: 1;
    animation: myfirst 2s linear 1s infinite alternate;
    /* Firefox: */
    -moz-animation: myfirst 2s linear 1s infinite alternate;
    /* Safari 和 Chrome: */
    -webkit-animation: myfirst 2s linear 1s infinite alternate;
  }
  @keyframes myfirst
  {
    from {background-position: center 0;}
    to {background-position: center -20px;}
  }

  @-moz-keyframes myfirst /* Firefox */
  {
    from {background-position: center 0;}
    to {background-position: center -20px;}
  }

  @-webkit-keyframes myfirst /* Safari 和 Chrome */
  {
    from {background-position: center 0;}
    to {background-position: center -20px;}
  }
  .global-loading .loading-bg:after{
    position: absolute;
    z-index: 2;
    width: 100%;
    height: 100%;
    content: "";
    display: block;
    background: #0072ff;
    background-image: -webkit-linear-gradient(45deg,#00c6ff,#0072ff);
    background-image: linear-gradient(45deg,#00c6ff,#0072ff);
    background-repeat: repeat-x;
    opacity: .92;
    -webkit-backdrop-filter: blur(3px);
    backdrop-filter: blur(3px);
  }

  .global-loading-cont{
    -webkit-backdrop-filter: blur(3px);
    backdrop-filter: blur(3px);
    border-radius: 8px;
    position: relative;
    z-index: 100;
    width: 100px;
    text-align: center;
    color: #fff;
    margin-top: 120px;
  }
  .global-loading-cont .text{
    font-size: 18px;
    font-weight: 700;
  }


  .global-loading .ft-record{
    position: absolute;
    width: 100%;
    padding: 10px 0;
    bottom: 0;
    z-index: 2;
    text-align: center;
    color: #fff;
    font-size: 12px;
    background-color: rgba(0,0,0,0.1);
  }
  .global-loading .ft-record a{
    color: #fff;
  }


  /*加载动画*/
  #loading-center-absolute {
    height: 110px;
  }
  .object{
    position: absolute;
    height: 10px;
    width: 50px;
    background-color: rgba(255,255,255,0.6);
  }
  .object:nth-child(2n+0) {
    -webkit-animation: animate_right 2s infinite;
    animation: animate_right 2s infinite;
  }
  .object:nth-child(2n+1) {
    -webkit-animation: animate_left 2s infinite;
    animation: animate_left 2s infinite;
  }
  .object:nth-child(1){
    top: 0px;
    left: 0px;
  }
  .object:nth-child(2){
    top: 0px;
    left: 50px;
  }
  .object:nth-child(3){
    top: 10px;
    left: 0px;
    -webkit-animation-delay: 0.1s;
    animation-delay: 0.1s;
  }
  .object:nth-child(4){
    top: 10px;
    left: 50px;
    -webkit-animation-delay: 0.1s;
    animation-delay: 0.1s;
  }
  .object:nth-child(5){
    top: 20px;
    left: 0px;
    -webkit-animation-delay: 0.2s;
    animation-delay: 0.2s;
  }
  .object:nth-child(6){
    top: 20px;
    left: 50px;
    -webkit-animation-delay: 0.2s;
    animation-delay: 0.2s;
  }
  .object:nth-child(7){
    top: 30px;
    left: 0px;
    -webkit-animation-delay: 0.3s;
    animation-delay: 0.3s;
  }
  .object:nth-child(8){
    top: 30px;
    left: 50px;
    -webkit-animation-delay: 0.3s;
    animation-delay: 0.3s;
  }
  .object:nth-child(9){
    top: 40px;
    left: 0px;
    -webkit-animation-delay: 0.4s;
    animation-delay: 0.4s;
  }
  .object:nth-child(10){
    top: 40px;
    left: 50px;
    -webkit-animation-delay: 0.4s;
    animation-delay: 0.4s;
  }
  .object:nth-child(11){
    top: 50px;
    left: 0px;
    -webkit-animation-delay: 0.5s;
    animation-delay: 0.5s;
  }
  .object:nth-child(12){
    top: 50px;
    left: 50px;
    -webkit-animation-delay: 0.5s;
    animation-delay: 0.5s;
  }
  .object:nth-child(13){
    top: 60px;
    left: 0px;
    -webkit-animation-delay: 0.6s;
    animation-delay: 0.6s;
  }
  .object:nth-child(14){
    top: 60px;
    left: 50px;
    -webkit-animation-delay: 0.6s;
    animation-delay: 0.6s;
  }
  .object:nth-child(15){
    top: 70px;
    left: 0px;
    -webkit-animation-delay: 0.7s;
    animation-delay: 0.7s;
  }
  .object:nth-child(16){
    top: 70px;
    left: 50px;
    -webkit-animation-delay: 0.7s;
    animation-delay: 0.7s;
  }
  .object:nth-child(17){
    top: 80px;
    left: 0px;
    -webkit-animation-delay: 0.8s;
    animation-delay: 0.8s;
  }
  .object:nth-child(18){
    top: 80px;
    left: 50px;
    -webkit-animation-delay: 0.8s;
    animation-delay: 0.8s;
  }
  .object:nth-child(19){
    top: 90px;
    left: 0px;
    -webkit-animation-delay: 0.9s;
    animation-delay: 0.9s;
  }
  .object:nth-child(20){
    top: 90px;
    left: 50px;
    -webkit-animation-delay: 0.9s;
    animation-delay: 0.9s;
  }
  @-webkit-keyframes animate_right {
    50% {
      -ms-transform: translate(200px,-200px) rotate(180deg);
      -webkit-transform: translate(200px,-200px) rotate(180deg);
      transform: translate(200px,-200px) rotate(180deg);
    }
  }
  @keyframes animate_right {
    50% {
      -ms-transform: translate(200px,-200px) rotate(180deg);
      -webkit-transform: translate(200px,-200px) rotate(180deg);
      transform: translate(200px,-200px) rotate(180deg);
    }
  }
  @-webkit-keyframes animate_left {
    50% {
      -ms-transform: translate(-200px,-200px) rotate(180deg);
      -webkit-transform: translate(-200px,-200px) rotate(180deg);
      transform: translate(-200px,-200px) rotate(180deg);
    }
  }

  @keyframes animate_left {

    50% {
      -ms-transform: translate(-200px,-200px) rotate(180deg);
      -webkit-transform: translate(-200px,-200px) rotate(180deg);
      transform: translate(-200px,-200px) rotate(180deg);
    }
  }

  @media screen and (max-width:640px){
    .loading-logo{top:15px;left: 15px;width: 180px;height: 54px;background-size: 180px;}
  }
</style>
