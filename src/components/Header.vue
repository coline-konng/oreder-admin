<template>
  
    <Row type="flex" justify="space-between" align="middle">
      <Icon
        @click.native="handleChange"
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
  
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    //mapState可以订阅store中数据，第一个参数user是命令空间
    ...mapState("user", {
      username: "username",
      identity: "identity"
    }),
    rotateIcon() {
      return ["menu-icon", this.isCollapsed ? "rotate-icon" : ""];
    }
  },
  methods: {
    //登出
    handleLogout() {
      this.$store.dispatch("user/logout", () => {
        this.$router.push("/login");
      });
    },
    handleChange(){
        this.$emit("collapsedSider");
    }
  }
};
</script>

<style scoped>
</style>
