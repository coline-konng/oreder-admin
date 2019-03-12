<template>
  <Breadcrumb separator=">" class="breadCrumb">
    <BreadcrumbItem :to="item.src" 
    v-for="(item,index) in routeInfo"
    :key="index">{{item.title}}</BreadcrumbItem>
  </Breadcrumb>
</template>

<script>
export default {
  computed: {
    // 监听路由的变化，生成一个数组用于渲染面包屑信息
    routeInfo() {
      //console.log(this.$route);
      //获取多个路由信息,并生成一个新数组存放需要的信息(对象类型)
      const matched = this.$route.matched;
      const newArr = matched.map(v => {
        return {
          src: v.path,
          title: v.meta
        };
      });
      return newArr;
    }
  }
};
</script>

<style scoped>
.breadCrumb {
  padding-bottom: 20px;
  border-bottom: 1px solid #ccc;
}
</style>
