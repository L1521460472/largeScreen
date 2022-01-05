<template>
  <div class="upload-div">
    <div class="upload-btn">
      <!--accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"-->
      <el-upload
      class="upload-demo"
      :data="uploadData"
      name="file"
      :action="uploadUrl"
      :multiple="false"
      :limit = "9"
      :before-upload="beforeUpload"
      :thumbnail-mode="true"
      :auto-upload="true"
      :on-success="uploadSuccess"
      :show-file-list="false"
      >
      <el-button slot="trigger" size="small" type="primary">{{uploadBtnTxt}}</el-button>
      </el-upload>
    </div>
    <div class="upload-image">
      <ul>
      <template v-if="images && images.length>0">
          <template v-for="item in images" >
            <li>
              <div class="image-block" >
                <img  :src="imageBase+item.fileId" >
                <i class="el-dialog__close el-icon el-icon-close close-icon" @click="deleteImg(item.fileId)"></i>
              </div>

            </li>
          </template>
      </template>
      </ul>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  const service = axios.create({
    baseURL: process.env.FILE_URL,  // api的base_url
    timeout: 5000 // 请求超时时间
  });
  // service.interceptors.request.use(config => {
  //   let token1 = localStorage.getItem("token");
  //   config.headers.Authorization = token1;
  //   return config;
  // });
  export default {
    components: {},
    data() {
      return {
        fileList:[],
        submitObj:null,
        parmJson:null,
        doUpload:'#',
        imageBase:process.env.FILE_URL+"/file/download/",
        uploadUrl:process.env.FILE_URL+"/file/upload",
        uploadData:{
          'moduleName':this.moduleName,
          'fileType':this.fileType,
        },
      };
    },
    props:{
      uploadBtnTxt:{type:String,require:true},
      moduleName:{type:String,require:true},
      fileType:{type:String,require:true},
      images:{type:Array,require:false},
    },
    methods: {
      beforeUpload(file){
        if(!file){
          return false;
        }
        // this.submitObj={
        //   'moduleName':this.moduleName,
        //   'fileType':this.fileType,
        // }
        // console.log( this.submitObj);
        // this.submitObj = new FormData();
        // this.submitObj.append('moduleName', this.moduleName);
        // this.submitObj.append('fileType', this.fileType);
        // this.submitObj.append('file',file);
        // this.submitObj.append('uploadFileName', file.name);
      },

      uploadSuccess(response, file, fileList){
        console.log(response);
        if(response.code === this.$successCode){
          this.$message({message: response.msg, type: 'success'});
          let fileObj={
            fileId:response.fileId,
          };
          this.images.push(fileObj);
          this.updateFile();
        }else{
          this.$message({message: response.msg, type: 'error'});
        }
      },
      deleteImg(fileId){
        for(let index in this.images){
          let obj = this.images[index];
          if(obj.fileId == fileId){
            this.$emit("deleteFile",obj);
            this.images.splice(index, 1);
          }
        }
      },
      // submitUpload() {
      //   this.$showLoading("上传中...");
      //   this.$refs.upload.submit();
      //   let config = {
      //     responseType: 'blob',
      //     timeout: 500000, // 请求超时时间
      //     headers: {
      //       'Content-Type': 'multipart/form-data'
      //     }
      //   };
      //   let fileName = this.submitObj.get("uploadFileName");
      //   service.post("/file/upload", this.submitObj, config).then( (res) => {
      //     console.log(res);
      //     let that = this;
      //     if(res.type === "application/json"){
      //       let blob = new Blob([res]);
      //       let reader = new FileReader();
      //       reader.readAsText(blob, 'utf-8');
      //       console.log(reader);
      //       reader.onload = function (e) {
      //         let resp = JSON.parse(reader.result);
      //         if(resp.code === that.$successCode){
      //           that.$message({message: resp.msg, type: 'success'});
      //           that.$hideLoading();
      //           let fileObj={
      //             fileId:resp.fileId
      //           };
      //           console.log( that.fileIdArray);
      //           that.fileIdArray.push(fileObj);
      //           console.log( that.fileIdArray);
      //           that.updateFile();
      //         }else{
      //           that.$message({message: resp.msg, type: 'error'});
      //           that.$hideLoading();
      //         }
      //       }
      //     }else {
      //       that.$message({message: "上传失败", type: 'error'});
      //     }
      //   }).catch(e => {
      //     this.$message({message: "导入异常，请稍后重试", type: 'error'});
      //     this.$hideLoading();
      //     console.log(e);
      //   });
      // },
      updateFile(){
        this.$emit("updateFile",this.images);
      }
    },
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .el-dialog {
    margin-top: 10% !important;
    /*.el-dialog__header {
      .el-dialog__headerbtn {
        display: none;
      }
    }*/

    .el-dialog__body {
      .uploadCloseDialog {
        color: #909399;
        position: absolute;
        top: 20px;
        right: 20px;
        padding: 0;
        background: 0 0;
        border: none;
        outline: 0;
        cursor: pointer;
        font-size: 16px;
        z-index: 3000;
      }
    }
  }
  .zh-load-view{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: 0;
    z-index: 3000;
    .el-loading-mask{
      background: rgba(255, 255, 255, 0.2);
      .el-loading-spinner{
        z-index: 4000;
      }
    }
  }
  .image-block{
    width:200px;
    height: 200px;
    text-align:center;
    position: relative;
  }
  .upload-image img{
     max-height: 200px;
     max-width: 200px;
    object-fit: cover;
  }
  .upload-image li{
    display :inline-block;
  }

  .close-icon{
    position: absolute;
    top: 5px;
    right: 5px;
  }
</style>
