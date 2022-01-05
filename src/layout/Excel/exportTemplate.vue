<template>
  <div style="display: inline-block">
    <el-button :type="isTextType ? 'text' : ''" icon="el-icon-download" @click="exportTemplateExcel" v-waves :disabled="$hasPerm('download')">{{this.$t('table.download')}}</el-button>
  </div>
</template>
<script>
  import service from '@/utils/server';

  service.interceptors.request.use(config => {
    let token1 = localStorage.getItem("token");
    config.headers.Authorization = token1;
    return config;
  });
  export default {
    components: {},
    data() {
      return {};
    },
    props: {
      isTextType: { type: Boolean, default: () => false },
      templateUrl: {type: String, require: true},
      exportName:{type:String,require:true}
    },
    methods: {
      exportTemplateExcel() {
        let config = {
          responseType: 'blob',
          timeout: 50000, // 请求超时时间
          headers: {
            'Content-Type': 'application/json'
          }
        };
        var exportVO = {};
        //exportVO.templateName = this.templateUrl;
        exportVO.exportName = this.exportName;
        service.post(this.templateUrl, exportVO, config).then((res) => {
          if(res.type === "application/json"){
            var blob = new Blob([res])
            var reader = new FileReader();
            reader.readAsText(blob, 'utf-8');
            var that = this;
            reader.onload = function (e) {
              var resp = JSON.parse(reader.result);
              if(resp.code === 200){
                that.$message.success(resp.msg);
              }else{
                this.$message.error("下载异常，请稍后重试");
              }
            }
          }else if(res.type === "application/vnd.ms-excel"){
            var blob = new Blob([res], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'}); //application/vnd.openxmlformats-officedocument.spreadsheetml.sheet这里表示xlsx类型
            var downloadElement = document.createElement('a');
            var href = window.URL.createObjectURL(blob); //创建下载的链接
            downloadElement.href = href;
            downloadElement.download = this.exportName+".xlsx"; //下载后文件名
            document.body.appendChild(downloadElement);
            downloadElement.click(); //点击下载
            document.body.removeChild(downloadElement); //下载完成移除元素
            window.URL.revokeObjectURL(href); //释放掉blob对象
            this.$message.success("成功");
          }
        }).catch(e => {
          this.$message.error("下载异常，请稍后重试");
        });
      },
    }
  }
</script>

<style scoped>
.underline{
  text-decoration: underline;
}
</style>
