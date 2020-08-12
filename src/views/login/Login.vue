<template>
  <transition name="login">
    <div id="login">
       <div class="login-wraper">
          <div class="image">
             <img src="">
             <span>Kingsley</span>
          </div> 
       </div>
    </div>
  </transition>
</template>

<script>
  import Axios from "network/axios"
export default {
  name: "Login",

};
</script>

<style scoped>
#login {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  width: 0;
  bottom: 0;
  z-index: 300;
}
.login-wraper{
   position: absolute;
   top: 0;
   bottom: 0;
   left: 0;
   width: 50%;
   background: #add8e6;
}
.login-enter-active,.login-leave-active{
   transition: all 1s;
}
.login-enter,.login-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>