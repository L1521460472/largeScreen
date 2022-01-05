<template>
  <div class="upload-div">
    <!--accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"

      class="upload-demo"
      list-type="picture-card"
      :data="uploadData"
      name="file"
      :action="uploadUrl"
      :multiple="false"
      :limit = "9"
      :before-upload="beforeUpload"
      :thumbnail-mode="true"
      :auto-upload="true"
      :on-success="uploadSuccess"
      :show-file-list="true"
      :file-list="fileList"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"

      -->
    <el-upload
      list-type="picture-card"
      :data="uploadData"
      name="file"
      :action="uploadUrl"
      :multiple="true"
      :limit="limitNum"
      :before-upload="beforeUpload"
      :file-list="fileList"
      :on-exceed="handleExceed"
      :on-success="handleSuccess"
      :on-preview="handlePictureCardPreview"
      accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
      :on-remove="handleRemove"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
const service = axios.create({
  baseURL: process.env.FILE_URL, // api的base_url
  timeout: 5000, // 请求超时时间
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
      fileList: [],
      deleteImages: [],
      addList: [],
      imageBase: process.env.FILE_URL + "/file/download/",
      uploadUrl:
        process.env.VUE_APP_FILE_URL +
        process.env.VUE_APP_WMS_MODEL +
        "/fileManager/upload",
      uploadData: {
        moduleName: this.moduleName,
        fileType: this.fileType,
      },
      dialogVisible: false,
      dialogImageUrl: "",
    };
  },
  props: {
    moduleName: { type: String, require: true },
    fileType: { type: String, require: true },
    limitNum: { type: Number, require: false, default: 9 },
  },
  methods: {
    initData(files) {
      let array = [];
      if (files) {
        for (let index in files) {
          let obj = files[index];
          array.push({
            id: obj.id,
            url: this.imageBase + obj.fileId,
            fileId: obj.fileId,
            status: "success",
          });
        }
      }
      this.fileList = array;
      this.deleteImages = [];
    },
    getAddList() {
      return this.addList;
    },
    getDeleteImages() {
      return this.deleteImages;
    },
    beforeUpload(file) {
      if (!file) {
        return false;
      }
    },
    handleSuccess(response, file, fileList) {
      console.log(response);
      console.log(fileList);
      console.log(file);
      if (response.code === this.$successCode) {
        file.url = this.imageBase + response.fileId;
        file.fileId = response.fileId;
        this.addList.push(file);
      }
    },
    handleExceed(files, fileList) {
      this.$message({
        showClose: true,
        message: "最多上传" + this.limitNum + "张图片",
        type: "fail",
      });
    },
    // uploadSuccess(response, file, fileList){
    //   console.log(response);
    //   if(response.code === this.$successCode){
    //     this.$message({message: response.msg, type: 'success'});
    //     let fileObj={
    //       fileId:response.fileId
    //     };
    //     this.fileList.push({
    //       url:this.imageBase+response.fileId,
    //       fileId:response.fileId,
    //       status: "success"
    //     });
    //     this.addImages.push(fileObj);
    //   }else{
    //     this.$message({message: response.msg, type: 'error'});
    //   }
    // },
    handleRemove(obj) {
      console.log(obj);
      if (obj.id) {
        this.deleteImages.push({ id: obj.id, fileId: obj.fileId });
      } else {
        for (let i in this.addList) {
          if (this.addList[i].uid == obj.uid) {
            this.addList.splice(i, 1);
          }
        }
      }
    },
    handlePictureCardPreview(obj) {
      console.log(obj);
      this.dialogVisible = true;
      this.dialogImageUrl = obj.url;
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
