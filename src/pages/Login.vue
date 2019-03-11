<template>
  <div class="loginContainer">
    <Form :label-width="100">
      <FormItem class="login-title">登录</FormItem>
      <FormItem label="账号">
        <Input v-model="userform.uname"></Input>
      </FormItem>
      <FormItem label="密码">
        <Input type="password" v-model="userform.upwd"></Input>
      </FormItem>
      <FormItem class="button-list">
        <Button type="primary" @click="handleSubmit">提交</Button>
        <Button @click="handleReset" style="margin-left: 8px">重置</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userform: {
        uname: "",
        upwd: ""
      }
    };
  },
  methods: {
    handleSubmit() {
      this.$store.dispatch("user/login",this.userform).then(res=>{
        const{status,message}=res;
        if(status===0){
            this.$router.back();
        }else{
            this.$Message.error(message);
        }
      })
    },
    handleReset() {
      this.userform.uname = "";
      this.userform.upwd = "";
    }
  }
};
</script>
<style scoped>
.loginContainer {
  width: 400px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.login-title >>> .ivu-form-item-content {
  color: #409eff;
  text-align: center;
  font-size: 20px;
}
.button-list {
  text-align: center;
}
.loginContainer >>> .ivu-form-item-label {
  font-size: 14px;
}
</style>
