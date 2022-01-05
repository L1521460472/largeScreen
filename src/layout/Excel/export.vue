<template>
  <div style="display: inline-block">
    <el-button :type="type || ''" icon="el-icon-download" @click="exportExcel" :disabled="$hasPerm('export')" v-waves >{{this.exportBtnName || this.btnName}}</el-button>
  </div>
</template>
<script>
  import service from '@/utils/server';

  service.interceptors.request.use(config => {
    let token1 = localStorage.getItem("token");
    config.headers.Authorization = token1;
    return config;
  });
  //
  export default {
    components: {},
    data(){
      return{
        paramMap: null,
        btnName:'导出',
      }
    },
    props:{
      type: {type:String,require:false},
      templateName:{type:String,require:true},
      exportName:{type:String,require:true},
      exportBtnName:{type:String,require:true},
      // checkParam:{type:Boolean,require:true},
      exportUrl:{type:String,require:true},
    },
    methods: {
      exportExcel(){
        //
        // if(this.checkParam === false){
        //   return;
        // }
        let callbacks = res => {
          this.paramMap = res
        }
        this.$emit('exportParam', {callback:callbacks})
        //
        if(this.paramMap == null){
          return;
        }
        this.$showLoading()
        let config = {
          responseType: 'blob',
          timeout: 50000, // 请求超时时间
          headers: {
            'Content-Type': 'application/json'
          }
        };
        var exportVO = {};
        exportVO.templateName = this.templateName;
        exportVO.paramMap = this.paramMap;
        service.post(this.exportUrl,exportVO,config).then( (res) => {
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
                  that.$message.error(resp.msg);
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
            this.$hideLoading()
            this.paramMap = null;
        }).catch(e => {
          this.$hideLoading()
          this.$message.error("下载异常，请稍后重试");
          this.paramMap = null;
          console.log(e);
        });
      },
    }
  }
</script>
