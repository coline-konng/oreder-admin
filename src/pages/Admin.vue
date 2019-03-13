<template>
  <div class="layout">
    <Layout>
      <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
        <Menu
          :active-name="activeName"
          theme="dark"
          width="auto"
          :open-names="openNames"
          :class="menuitemClasses"
        >
          <Submenu v-for="(item,index) in menus" :key="index" :name="`${index+1}`">
            <template slot="title">
              <Icon :type="item.icon"></Icon>
              <span>{{item.title}}</span>
            </template>
            <MenuItem
              v-for="(subItem,subIndex) in item.options"
              :key="subIndex"
              :name="`${index+1}-${subIndex+1}`"
              v-if="!isCollapsed"
            >
              <router-link :to="subItem.src" class="asideLink"><span>{{subItem.title}}</span></router-link>
            </MenuItem>
          </Submenu>
        </Menu>
      </Sider>
      <Layout>
        <Header :style="{padding: 0}" class="layout-header-bar">
          <Row type="flex" justify="space-between" align="middle">
            <Icon
              @click.native="collapsedSider"
              :class="rotateIcon"
              :style="{margin: '0 20px'}"
              type="md-menu"
              size="24"
            ></Icon>
            <div>
              {{username}}{{identity}}
              <a href="javascript:;" @click="handleLogout">退出</a>
            </div>
          </Row>
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
import { mapState } from 'vuex';
import Breadcrumb from "../components/Breadcrumb";
export default {
  components: {
    "braed-crumb":Breadcrumb
  },
  data() {
    return {
      isCollapsed: false,
      activeName:'1-1',
      openNames:['1'],
      menus: [
        {
          icon: "md-cart",
          title: "购物商城",
          options: [
            { title: "商品管理", src: "/admin/goods-list" },
            { title: "栏目管理", src: "/admin/category-list" }
          ]
        },
        {
          icon: "md-person",
          title: "会员管理",
          options: [{ title: "会员列表", src: "/admin/account-list" }]
        },
        {
          icon: "ios-paper",
          title: "商城订单",
          options: [{ title: "订单管理", src: "/admin/order-list" }]
        }
      ]
    };
  },
  computed: {
    //mapState可以订阅store中数据，第一个参数user是命令空间
    ...mapState("user", {
      username: "username",
      identity: "identity"
    }),
    rotateIcon() {
      return ["menu-icon", this.isCollapsed ? "rotate-icon" : ""];
    },
    menuitemClasses() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    }
  },
  methods: {
    collapsedSider() {
      this.$refs.side1.toggleCollapse();
    },
    handleLogout(){
      this.$store.dispatch("user/logout",()=>{
        this.$router.push('/login');
      })
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
.menu-icon {
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
}
/* 设置侧边栏a标签字体颜色 */
.asideLink {
  color: inherit;
}
.ivu-layout-content{
  background: unset !important;
}
</style>