<template>
  <div>
    <Form :model="formData" label-position="right" :label-width="100" class="mt20">
      <FormItem label="订单id">{{formData.id}}</FormItem>
      <FormItem label="快递单号">
        <Input v-model="formData.express_no"></Input>
      </FormItem>
      <FormItem label="快递费用">
        <Input v-model="formData.express_fee"></Input>
      </FormItem>
      <FormItem label="收件人">
        <Input v-model="formData.accept_name"></Input>
      </FormItem>
      <FormItem label="收件人电话">
        <Input v-model="formData.telphone"></Input>
      </FormItem>
      <FormItem label="收件人手机">
        <Input v-model="formData.mobile"></Input>
      </FormItem>
      <FormItem label="收件人邮箱">
        <Input v-model="formData.email"></Input>
      </FormItem>
      <FormItem label="收件人地区">
        <Input v-model="formData.area"></Input>
      </FormItem>
      <FormItem label="收件人地址">
        <Input
          v-model="formData.address"
          type="textarea"
          :autosize="{minRows: 2,maxRows: 5}"
          placeholder="Enter something..."
        ></Input>
      </FormItem>
      <FormItem label="订单备注">
        <Input
          v-model="formData.message"
          type="textarea"
          :autosize="{minRows: 2,maxRows: 5}"
          placeholder="Enter something..."
        ></Input>
      </FormItem>
      <FormItem label="订单总金额">
        <Input v-model="formData.order_amount"></Input>
      </FormItem>
      <FormItem label="订单状态">
        <Select style="width:200px" @on-change="handleOrderStatus" v-model="formData.orderstatus">
          <Option v-for="item in orderStatus" :value="item.orderstatus" :key="item.orderstatus">{{ item.label }}</Option>
        </Select>
      </FormItem>
      <FormItem>
            <Button type="primary" @click="handleSubmit">保存</Button>
            <Button @click="handleCancel" style="margin-left: 8px">取消</Button>
        </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderStatus: [
        {
          orderstatus: "0",
          label: "全部"
        },
        {
          orderstatus: "1",
          label: "待付款"
        },
        {
          orderstatus: "2",
          label: "已付款"
        },
        {
          orderstatus: "3",
          label: "已发货"
        },
        {
          orderstatus: "4",
          label: "已签收"
        },
        {
          orderstatus: "5",
          label: "取消"
        }
      ],
      formData: {
        id: "",
        express_no: "",
        express_fee: "",
        accept_name: "",
        telphone:"",
        mobile:"",
        email:"",
        area:"",
        address:"",
        message:"",
        order_amount:"",
        orderstatus:""
      }
    };
  },
  mounted(){
      const {id}=this.$route.params;
      this.$axios({
          url:`/admin/order/getorderdetial/${id}`
      }   
      ).then(res=>{
          //console.log(res);
          const {status,message}=res.data;
          if(status===0){
              this.formData=message.orderinfo;
          }
      })
  },
  methods: {
    handleOrderStatus() {},
    handleSubmit(){
      const orderinfo=this.formData;
      const data=JSON.parse(JSON.stringify({orderinfo}));
      //console.log(data);
      this.$axios({
        url:'/admin/order/updateorder',
        method:'POST',
        data,
        withCredentials: true
      }).then((res)=>{
        const {status,message}=res.data;
        //console.log(res);
        if(status===0){
          this.$Message.success(message.message);
          setTimeout(()=>{
            this.$router.back();
          },1000);
        }
      });
    },
    handleCancel(){
      this.$router.push('/admin/order-list');
    }
  }
};
</script>

<style scoped>
</style>
