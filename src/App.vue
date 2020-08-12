<template>
  <div id="app">
    <Header>
      <div slot="left">
      <i class="icon icon-header">&#xe627;</i>
      </div>
      <div slot="center">
        <span>Kingsley</span>
      </div>
      <div slot="right">
        <router-link tag="div" to="/user"><i class="icon icon-header">&#xe645;</i></router-link>
      </div>
    </Header>
    <tab-ber />
    <keep-alive>
      <router-view />
    </keep-alive>
    <player/>
  </div>
</template>

<script>
import Header from "common/header/Header";
import TabBer from "common/TabBer/TabBer";

import Player from "./views/player/Player"

import Axios from "network/axios";
export default {
  name: "App",
  components: {
    Header,
    TabBer,
    Player
  }
};
</script>

<style>
*{
  margin: 0;
  padding: 0;
  -webkit-overflow-scrolling: touch;
  list-style: none;
  touch-action: none;
}
@font-face {
  font-family: 'icon';  /* project id 1795257 */
  src: url('https://at.alicdn.com/t/font_1795257_uf7wopy1r9l.eot');
  src: url('https://at.alicdn.com/t/font_1795257_uf7wopy1r9l.eot?#iefix') format('embedded-opentype'),
  url('https://at.alicdn.com/t/font_1795257_uf7wopy1r9l.woff2') format('woff2'),
  url('https://at.alicdn.com/t/font_1795257_uf7wopy1r9l.woff') format('woff'),
  url('https://at.alicdn.com/t/font_1795257_uf7wopy1r9l.ttf') format('truetype'),
  url('https://at.alicdn.com/t/font_1795257_uf7wopy1r9l.svg#iconfont') format('svg');
}
.icon {
  font-family: "icon" !important;
  font-size: 25px;
  font-style: normal;
  color: #ffffff;
}
</style>
