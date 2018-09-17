<template>
  <div id="app">
    <Menu theme="light" active-name="1">
        <MenuGroup title="歌曲管理">
            <MenuItem name="1" to="/">
                <Icon type="md-heart" />
                歌曲列表
            </MenuItem>
        </MenuGroup>
    </Menu>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { Menu, MenuItem } from 'iview';
export default {
  name: 'app',
  components: {
    Menu,
    MenuItem
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding-left: 240px;
}
#app .ivu-menu {
  position: fixed;
  height: 100%;
  top: 0;
  left: 0;
}
.content {
  padding: 48px;
}
</style>
