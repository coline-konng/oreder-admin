<template>
  <div>
    <!-- 订单详情 -->
    <h2 class="mt20">订单详情</h2>
    <table class="order-detail">
      <tr>
        <td>订单id:</td>
        <td>{{data.orderinfo.id}}</td>
      </tr>
      <tr>
        <td>会员名称:</td>
        <td>{{data.orderinfo.user_name}}</td>
      </tr>
      <tr>
        <td>地址:</td>
        <td>{{data.orderinfo.area}}{{data.orderinfo.address}}</td>
      </tr>
      <tr>
        <td>快递:</td>
        <td>{{data.orderinfo.expressTitle}}</td>
      </tr>
      <tr>
        <td>状态:</td>
        <td>{{data.orderinfo.orderstatus}}</td>
      </tr>
      <tr>
        <td>购买时间:</td>
        <td>{{data.orderinfo.payment_time}}</td>
      </tr>
    </table>
    <!-- 订单商品列表 -->
    <h2 class="mt20">订单商品列表</h2>
    <Table :columns="columns" :data="goodslist" class="mt20">
      <template slot-scope="{ row }" slot="goods">
          <div class="good-info">
          <img :src="row.imgurl" alt class="good-img" align=absmiddle>
          <p class="good-title">{{row.goods_title}}</p>
          </div>
      </template>
    </Table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {
        orderinfo: {}
      },
      columns: [
        {
          title: "商品",
          slot: "goods",
          align: "left",
        },
        {
          title: "类型",
          key: "goods_no"
        },
        {
          title: "价格",
          key: "goods_price"
        }
      ],
      goodslist: []
    };
  },
  mounted() {
    const { id } = this.$route.params;
    this.$axios({
      url: `/admin/order/getorderdetial/${id}`
    }).then(res => {
      console.log(res);
      const { status, message } = res.data;
      if (status === 0) {
        this.data.orderinfo = message.orderinfo;
        this.goodslist = message.goodslist;
      }
    });
  }
};
</script>

<style scoped>
.order-detail {
  font-size: 16px;
}
.order-detail tr {
  height: 30px;
  line-height: 30px;
}
.order-detail td {
  padding-right: 10px;
}
.good-info{
  display: flex;
  padding: 10px 0;
  align-items: center;
}
.good-img{
  width: 70px;
  height: 70px;
  margin-right: 10px;
}
.good-title{
  flex:1;
}
</style>
