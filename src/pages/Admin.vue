<template>
  <div class="layout">
    <Layout>
      <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
        <app-aside :isCollapsed="isCollapsed"></app-aside>
      </Sider>
      <Layout>
        <Header :style="{padding: 0}" class="layout-header-bar">
          <app-header @collapsedSider="handleChange"></app-header>
        </Header>
        <Content :style="{margin: '20px', background: '#fff', minHeight: '260px'}">
          <braed-crumb></braed-crumb>
          <router-view></router-view>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>
<script>
import Aside from "../components/Aside";
import Header from "../components/Header";
import Breadcrumb from "../components/Breadcrumb";
export default {
  components: {
    "braed-crumb": Breadcrumb,
    "app-aside": Aside,
    "app-header": Header
  },
  data() {
    return {
      isCollapsed: false
    };
  },
  methods: {
    handleChange() {
      //this.$refs.side1.toggleCollapse();
      this.isCollapsed=!this.isCollapsed;
    }
  }
};
</script>
<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  border-radius: 4px;
  overflow: hidden;
}
.ivu-layout {
  height: 100%;
}
.layout-header-bar {
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.layout-logo-left {
  width: 90%;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  margin: 15px auto;
}
/* .menu-icon {
  transition: all 0.3s;
}
.rotate-icon {
  transform: rotate(-90deg);
}
.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}
.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
} */
/* 设置侧边栏a标签字体颜色 */
/* .asideLink {
  color: inherit;
}  */
.ivu-layout-content {
  background: unset !important;
}
</style>