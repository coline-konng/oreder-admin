<template>
  <div>
    <Row class="toolBar mt20" type="flex" justify="end" align="middle">
      <Col span="6" class="selectTool">
        <Select style="width:200px" @on-change="handleOrderStatus">
          <Option v-for="item in orderStatus" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </Col>
      <Col span="6">
        <Input search enter-button placeholder="会员名称" v-model="vipname" @on-search="handleSearch"/>
      </Col>
    </Row>
    <!-- 表格部分 -->
    <Table ref="selection" :columns="columns" :data="data" class="mt20"></Table>
    <!-- 分页器 -->
    <Page
      :total="totalcount"
      :current="pageIndex"
      :page-size-opts="[5, 10, 15, 20]"
      :page-size="pageSize"
      @on-change="handleCurrentChange"
      @on-page-size-change="handleSizeChange"
      show-total
      show-sizer
      show-elevator
      class="mt20"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderStatus: [
        {
          value: 0,
          label: "全部"
        },
        {
          value: 1,
          label: "待付款"
        },
        {
          value: 2,
          label: "已付款"
        },
        {
          value: 3,
          label: "已发货"
        },
        {
          value: 4,
          label: "已签收"
        },
        {
          value: 5,
          label: "取消"
        }
      ],
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "订单id",
          key: "id"
        },
        {
          title: "会员名称",
          key: "user_name"
        },
        {
          title: "地址",
          key: "area"
        },
        {
          title: "快递",
          key: "expressTitle"
        },
        {
          title: "状态",
          key: "statusName"
        },
        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.edit(params.row);
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.view(params.row);
                    }
                  }
                },
                "查看"
              )
            ]);
          }
        }
      ],
      data: [],
      orderstatus: "",
      vipname: "",
      totalcount: 1,
      pageIndex: 1,
      pageSize: 5
    };
  },
  mounted() {
    this.getOrdersList();
  },
  methods: {
    // 获取订单列表信息
    getOrdersList() {
      this.$axios
        .get(
          `/admin/order/getorderlist?orderstatus=${this.orderstatus}
          &vipname=${this.vipname}&pageIndex=${this.pageIndex}
          &pageSize=${this.pageSize}`
        )
        .then(res => {
          //console.log(res);
          //通过解构，获取商品信息
          const { data } = res;
          //将商品信息赋值给tableData
          this.data = data.message;
          //获取商品总条数
          this.totalcount = data.totalcount;
        });
    },
    // 修改当前页码
    handleCurrentChange(pageIndex) {
      //console.log(pageIndex);
      this.pageIndex = pageIndex;
      this.getOrdersList();
    },
    // 修改页容量
    handleSizeChange(pageSize) {
      //console.log(pageSize);
      this.pageSize = pageSize;
      this.getOrdersList();
    },
    // 筛选订单状态
    handleOrderStatus(orderstatus) {
      //console.log(orderstatus);
      this.pageIndex = 1;
      this.orderstatus = orderstatus;
      this.getOrdersList();
    },
    // 搜索用户名
    handleSearch(value) {
      //console.log(value);
      this.pageIndex = 1;
      this.getOrdersList();
    },
    edit(data) {
      //console.log(data);
      const { id } = data;
      this.$router.push(`/admin/order-edit/${id}`);
    },
    view(data) {
      const { id } = data;
      this.$router.push(`/admin/order-detail/${id}`);
    }
  }
};
</script>

<style scoped>
.selectTool {
  margin-right: 10px;
}
</style>
