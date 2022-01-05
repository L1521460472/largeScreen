<!--<template>-->
<!--  <div style="z-index: 20110" class="upload-image">-->
<!--    <el-upload-->
<!--      action="auto"-->
<!--      :http-request="uploadSectionFile"-->
<!--      list-type="picture-card"-->
<!--      :on-preview="handlePictureCardPreview"-->
<!--      :on-remove="handleRemove"-->
<!--      :file-list="imgData.fileList"-->
<!--      :limit="limit"-->
<!--      :disabled="disabled"-->
<!--      :on-change="handleEditChange"-->
<!--      :class="{ hide: showUpload }"-->
<!--      accept=".jpg,.jpeg,.png,.JPG,.JPEG"-->
<!--      :before-upload="beforeAvatarUpload"-->
<!--      class="contentImgStyle"-->
<!--    >-->
<!--      <i class="el-icon-plus"></i>-->
<!--    </el-upload>-->
<!--    &lt;!&ndash;    &ndash;&gt;-->
<!--    <div-->
<!--      v-if="dialogVisible"-->
<!--      @click="close"-->
<!--      class="addLeft"-->
<!--      style="-->
<!--        z-index: 30120;-->
<!--        position: fixed;-->
<!--        top: 0;-->
<!--        left: 0;-->
<!--        width: 100%;-->
<!--        height: 100%;-->
<!--        background-color: rgba(0, 0, 0, 0.6);-->
<!--        display: flex;-->
<!--        justify-content: center;-->
<!--        align-items: center;-->
<!--      "-->
<!--    >-->
<!--      <div-->
<!--        style="-->
<!--          display: flex;-->
<!--          flex-direction: row;-->
<!--          justify-content: center;-->
<!--          align-items: center;-->
<!--          z-index: 32121;-->
<!--          background-color: #fff;-->
<!--          width: 650px;-->
<!--          height: 650px;-->
<!--          position: relative;-->
<!--          border-radius: 10px;-->
<!--        "-->
<!--      >-->
<!--        <div-->
<!--          style="-->
<!--            display: flex;-->
<!--            flex-direction: row;-->
<!--            justify-content: space-between;-->
<!--            position: absolute;-->
<!--            bottom: 10px;-->
<!--          "-->
<!--        >-->
<!--          <el-button @click="close">关闭</el-button>-->
<!--        </div>-->
<!--        <div-->
<!--          style="-->
<!--            width: 570px;-->
<!--            height: 560px;-->
<!--            display: flex;-->
<!--            justify-content: center;-->
<!--            align-items: center;-->
<!--          "-->
<!--        >-->
<!--          <img-->
<!--            :src="dialogImageUrl"-->
<!--            alt=""-->
<!--            style="z-index: 32120; width: 100%; height: 100%"-->
<!--          />-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import service from "@/utils/server";-->
<!--service.interceptors.request.use((config) => {-->
<!--  let token1 = sessionStorage.getItem("token");-->
<!--  config.headers.Authorization = token1;-->
<!--  config.headers.add("company_code", "zhqc");-->

<!--  return config;-->
<!--});-->
<!--export default {-->
<!--  name: "upload",-->
<!--  props: {-->
<!--    imgDataTest: {-->
<!--      type: Object,-->
<!--    },-->
<!--    exportUrl: {-->
<!--      type: String,-->
<!--    },-->
<!--    disabled: {-->
<!--      type: Boolean,-->
<!--      default: false,-->
<!--    },-->
<!--  },-->
<!--  data() {-->
<!--    return {-->
<!--      limit: 9,-->
<!--      showUpload: false,-->
<!--      dialogImageUrl: "",-->
<!--      dialogVisible: false,-->
<!--      uploadFile: [],-->
<!--      thisTitle: "",-->
<!--      imgData: {-->
<!--        fileList: [],-->
<!--      },-->
<!--    };-->
<!--  },-->
<!--  //-->
<!--  created() {-->
<!--    if (-->
<!--      this.imgDataTest.fileList.length &&-->
<!--      this.imgDataTest.fileList.length > 0-->
<!--    ) {-->
<!--      this.imgData.fileList = this.imgDataTest.fileList;-->
<!--    }-->

<!--    this.imgData.fileList.splice(0, 1);-->
<!--  },-->

<!--  methods: {-->
<!--    //-->
<!--    beforeAvatarUpload: function (file) {-->
<!--      const isJPG = file.type === "image/jpeg";-->
<!--      const isPNG = file.type === "image/png";-->
<!--      const isPG = isJPG || isPNG; //限制图片格式为jpg / png-->
<!--      const isLt2M = file.size / 1024 / 1024 < 2; //限制图片大小-->
<!--      if (!isPG) {-->
<!--        this.$message.error("上传图片只能是 JPG 或 PNG 格式!");-->
<!--      }-->
<!--      if (!isLt2M) {-->
<!--        this.$message.error("上传图片大小不能超过 2MB!");-->
<!--      }-->
<!--      return isPG && isLt2M;-->
<!--    },-->
<!--    //-->
<!--    uploadSectionFile(param) {-->
<!--      let uploadFileLength = this.uploadFile.length;-->
<!--      let fileObj = param.file;-->
<!--      if (fileObj.type === "image/jpeg") {-->
<!--        let file = new File([fileObj], new Date().getTime() + ".jpg", {-->
<!--          type: "image/jpeg",-->
<!--        });-->
<!--        this.uploadFile[uploadFileLength] = {-->
<!--          title: this.thisTitle,-->
<!--          imgFile: file,-->
<!--        };-->
<!--      } else if (fileObj.type === "image/png") {-->
<!--        let file = new File([fileObj], new Date().getTime() + ".png", {-->
<!--          type: "image/png",-->
<!--        });-->
<!--        this.uploadFile[uploadFileLength] = {-->
<!--          title: this.thisTitle,-->
<!--          imgFile: file,-->
<!--        };-->
<!--      } else {-->
<!--        this.$message.error("只能上传jpg/png文件");-->
<!--        return false;-->
<!--      }-->
<!--    },-->
<!--    //-->
<!--    upload(data) {-->
<!--      let ff = []-->
<!--      var param = new FormData(); // FormData 对象-->
<!--      for (var int = 0; int < this.uploadFile.length; int++) {-->
<!--        // var param = new FormData(); // FormData 对象-->
<!--        var list = this.uploadFile[int];-->
<!--        var imgFiles = list.imgFile;-->
<!--        var name = list.title;-->
<!--        console.log(imgFiles)-->
<!--        console.log(name)-->
<!--        ff.push(imgFiles)-->
<!--        param.append("uploadFile", imgFiles); // 文件对象-->
<!--        param.append("ownerSkuCode", name); // 其他参数-->
<!--      }-->

<!--      //param.append("uploadFiles", ff);-->
<!--      //-->
<!--      // if (data.type === "add") {-->
<!--      //   param.append("addreq", JSON.stringify(data.data));-->
<!--      // } else {-->
<!--      //   param.append("updateReq ", JSON.stringify(data.data));-->
<!--      // }-->
<!--      let config = {-->
<!--        timeout: 50000, // 请求超时时间-->
<!--        headers: {-->
<!--          "Content-Type": "multipart/form-data",-->
<!--          "company_code":"zhqc"-->
<!--        },-->
<!--      };-->
<!--      service-->
<!--        .post(this.exportUrl, param, config)-->
<!--        .then((res) => {-->
<!--          alert('007')-->
<!--          this.$emit("handleRequest", res);-->
<!--          // if(res.type === "multipart/form-data"){-->
<!--          //   var blob = new Blob([res])-->
<!--          //   var reader = new FileReader();-->
<!--          //   reader.readAsText(blob, 'utf-8');-->
<!--          //   var that = this;-->
<!--          //   reader.onload = function (e) {-->
<!--          //     var resp = JSON.parse(reader.result);-->
<!--          //     if(resp.code === 200){-->
<!--          //       that.$message.success(resp.msg);-->
<!--          //     }else{-->
<!--          //       that.$message.error(resp.msg);-->
<!--          //     }-->
<!--          //   }-->
<!--          // }-->
<!--        })-->
<!--        .catch((e) => {-->
<!--          this.$message.error("下载异常，请稍后重试");-->
<!--          console.log(e);-->
<!--        });-->
<!--    },-->
<!--    handleRemove(file, fileList) {-->
<!--      this.$emit("handleRemove", file);-->
<!--    },-->
<!--    handlePictureCardPreview(file) {-->
<!--      this.dialogImageUrl = file.url;-->
<!--      this.dialogVisible = true;-->
<!--    },-->
<!--    handleEditChange(file, fileList) {-->
<!--      if (fileList.length >= this.limit) {-->
<!--        this.showUpload = true;-->
<!--        this.$message.error("最多只能上传9张！");-->
<!--      }-->
<!--    },-->
<!--    close() {-->
<!--      this.dialogVisible = false;-->
<!--    },-->
<!--  },-->
<!--};-->
<!--</script>-->

<!--<style scoped>-->
<!--.addLeft {-->
<!--  animation-name: slideInLeft;-->
<!--  animation-duration: 0.5s;-->
<!--}-->
<!--@keyframes slideInLeft {-->
<!--  0% {-->
<!--    transform: translateX(100%);-->
<!--    opacity: 0.5;-->
<!--  }-->

<!--  to {-->
<!--    transform: translateX(0px);-->
<!--    opacity: 1;-->
<!--  }-->
<!--}-->
<!--.upload-image >>> .hide .el-upload&#45;&#45;picture-card {-->
<!--  display: none;-->
<!--}-->
<!--</style>-->








<!--<template>-->
<!--  <div style="z-index: 20110" class="upload-image">-->
<!--    &lt;!&ndash; :http-request="uploadSectionFile" &ndash;&gt;-->
<!--    <el-upload-->
<!--      :action="url"-->
<!--      :headers="headers"-->
<!--      name="uploadFile"-->
<!--      list-type="picture-card"-->
<!--      :on-preview="handlePictureCardPreview"-->
<!--      :on-remove="handleRemove"-->
<!--      :file-list="fileList"-->
<!--      :limit="limit"-->
<!--      :disabled="disabled"-->
<!--      :on-change="handleEditChange"-->
<!--      :class="{ hide: showUpload }"-->
<!--      accept=".jpg,.jpeg,.png,.JPG,.JPEG"-->
<!--      :before-upload="beforeAvatarUpload"-->
<!--      class="contentImgStyle"-->
<!--    >-->
<!--      <i class="el-icon-plus" />-->
<!--    </el-upload>-->
<!--    &lt;!&ndash;    &ndash;&gt;-->
<!--    <div-->
<!--      v-if="dialogVisible"-->
<!--      class="addLeft"-->
<!--      style="-->
<!--        z-index: 30120;-->
<!--        position: fixed;-->
<!--        top: 0;-->
<!--        left: 0;-->
<!--        width: 100%;-->
<!--        height: 100%;-->
<!--        background-color: rgba(0, 0, 0, 0.6);-->
<!--        display: flex;-->
<!--        justify-content: center;-->
<!--        align-items: center;-->
<!--      "-->
<!--      @click="close"-->
<!--    >-->
<!--      <div-->
<!--        style="-->
<!--          display: flex;-->
<!--          flex-direction: row;-->
<!--          justify-content: center;-->
<!--          align-items: center;-->
<!--          z-index: 32121;-->
<!--          background-color: #fff;-->
<!--          width: 650px;-->
<!--          height: 650px;-->
<!--          position: relative;-->
<!--          border-radius: 10px;-->
<!--        "-->
<!--      >-->
<!--        <div-->
<!--          style="-->
<!--            display: flex;-->
<!--            flex-direction: row;-->
<!--            justify-content: space-between;-->
<!--            position: absolute;-->
<!--            bottom: 10px;-->
<!--          "-->
<!--        >-->
<!--          <el-button @click="close">关闭</el-button>-->
<!--        </div>-->
<!--        <div-->
<!--          style="-->
<!--            width: 700px;-->
<!--            height: auto;-->
<!--            display: flex;-->
<!--            justify-content: center;-->
<!--            align-items: center;-->
<!--          "-->
<!--        >-->
<!--          <img-->
<!--            :src="dialogImageUrl"-->
<!--            alt=""-->
<!--            style="z-index: 32120; width: 100%; height: 100%"-->
<!--          />-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  name: "Upload",-->
<!--  props: {-->
<!--    disabled: {-->
<!--      type: Boolean,-->
<!--      default: false,-->
<!--    },-->
<!--    fileList: {-->
<!--      type: Array,-->
<!--      default: [],-->
<!--    },-->
<!--  },-->
<!--  data() {-->
<!--    return {-->
<!--      headers: {-->
<!--        Authorization: localStorage.getItem("token"),-->
<!--      },-->
<!--      url: process.env.VUE_APP_FILE_URL + "/fileMgr/fileManager/upload",-->
<!--      // url: process.env.VUE_APP_FILE_URL  + "/common/common/uploadFile",-->
<!--      limit: 9,-->
<!--      showUpload: false,-->
<!--      dialogImageUrl: "",-->
<!--      dialogVisible: false,-->
<!--      uploadFile: [],-->
<!--      thisTitle: "",-->
<!--    };-->
<!--  },-->
<!--  mounted() {-->
<!--    alert(this.url);-->
<!--  },-->
<!--  computed: {-->
<!--    pictureIdList() {-->
<!--      return this.fileList.map((v) => {-->
<!--        console.log(v)-->
<!--        return v.name;-->
<!--      });-->
<!--    },-->
<!--    data() {-->
<!--      return {-->
<!--        headers: {-->
<!--          Authorization: localStorage.getItem("token"),-->
<!--        },-->
<!--        url: process.env.VUE_APP_FILE_URL + "/fileMgr/fileManager/upload",-->
<!--        // url: process.env.VUE_APP_FILE_URL + "/dispatch" + "/common/common/uploadFile",-->
<!--        limit: 9,-->
<!--        showUpload: false,-->
<!--        dialogImageUrl: "",-->
<!--        dialogVisible: false,-->
<!--        uploadFile: [],-->
<!--        thisTitle: "",-->
<!--      };-->
<!--      return isPG && isLt2M;-->
<!--    },-->
<!--    //-->
<!--    methods: {-->
<!--      //-->
<!--      beforeAvatarUpload: function(file) {-->
<!--        const isJPG = file.type === 'image/jpeg'-->
<!--        const isPNG = file.type === 'image/png'-->
<!--        const isPG = (isJPG || isPNG) // 限制图片格式为jpg / png-->
<!--        const isLt2M = file.size / 1024 / 1024 < 2 // 限制图片大小-->
<!--        if (!isPG) {-->
<!--          this.$message.error('上传图片只能是 JPG 或 PNG 格式!')-->
<!--        }-->
<!--        if (!isLt2M) {-->
<!--          this.$message.error('上传图片大小不能超过 2MB!')-->
<!--        }-->
<!--        return isPG && isLt2M-->
<!--      },-->
<!--      //-->
<!--      uploadSectionFile(param) {-->
<!--        const uploadFileLength = this.uploadFile.length-->
<!--        const fileObj = param.file-->
<!--        if (fileObj.type === 'image/jpeg') {-->
<!--          const file = new File([fileObj], new Date().getTime() + '.jpg', {-->
<!--            type: 'image/jpeg'-->
<!--          })-->
<!--          this.uploadFile[uploadFileLength] = { 'title': this.thisTitle, 'imgFile': file }-->
<!--        } else if (fileObj.type === 'image/png') {-->
<!--          const file = new File([fileObj], new Date().getTime() + '.png', {-->
<!--            type: 'image/png'-->
<!--          })-->
<!--          this.uploadFile[uploadFileLength] = { 'title': this.thisTitle, 'imgFile': file }-->
<!--        } else {-->
<!--          this.$message.error('只能上传jpg/png文件')-->
<!--          return false-->
<!--        }-->
<!--      },-->
<!--      handleRemove(file, fileList) {-->
<!--        this.$emit('handleRemove', file)-->
<!--        if (file.response && file.response.obj) {-->
<!--          this.pictureIdList.splice(this.pictureIdList.indexOf(file.response.obj), 1)-->
<!--        } else {-->
<!--          this.pictureIdList.splice(this.pictureIdList.indexOf(file.name), 1)-->
<!--        }-->
<!--        this.$emit('getImgIdList', this.pictureIdList)-->
<!--      },-->
<!--      handlePictureCardPreview(file) {-->
<!--        console.log(111)-->
<!--        this.dialogImageUrl = file.url-->
<!--        this.dialogVisible = true-->
<!--      },-->
<!--      handleEditChange(file, fileList) {-->
<!--        if (file.response) {-->
<!--          if (file.response.code === 200) {-->
<!--            this.pictureIdList.push(file.response.obj)-->
<!--            this.$emit('getImgIdList', this.pictureIdList)-->
<!--            if (fileList.length >= this.limit) {-->
<!--              this.showUpload = true-->
<!--              this.$message.error('最多只能上传9张！')-->
<!--            }-->
<!--          } else {-->
<!--            fileList.splice(fileList.indexOf(file), 1)-->
<!--            this.$message.error(file.response.msg)-->
<!--            return false-->
<!--          }-->
<!--        }-->
<!--        // if (fileList.length >= this.limit) {-->
<!--        //   console.log(fileList.length)-->
<!--        //   this.showUpload = true-->
<!--        //   console.log(1111)-->
<!--        //   this.$message.error('最多只能上传9张！')-->
<!--        // }-->
<!--      },-->
<!--      close() {-->
<!--        this.dialogVisible = false-->
<!--      }-->
<!--    }-->
<!--  },-->
<!--};-->
<!--</script>-->

<!--<style scoped lang="scss">-->
<!--.addLeft {-->
<!--  animation-name: slideInLeft;-->
<!--  animation-duration: 0.5s;-->
<!--}-->
<!--@keyframes slideInLeft {-->
<!--  0% {-->
<!--    transform: translateX(100%);-->
<!--    opacity: 0.5;-->
<!--  }-->

<!--  to {-->
<!--    transform: translateX(0px);-->
<!--    opacity: 1;-->
<!--  }-->
<!--}-->
<!--/*.upload-image >>> .hide .el-upload&#45;&#45;picture-card {*/-->
<!--/*  display: none;*/-->
<!--/*}*/-->

<!--/deep/.el-upload&#45;&#45;picture-card {-->
<!--  line-height: 92px;-->
<!--}-->
<!--/deep/.el-upload&#45;&#45;picture-card,-->
<!--/deep/.el-upload-list&#45;&#45;picture-card .el-upload-list__item {-->
<!--  width: 90px;-->
<!--  height: 90px;-->
<!--}-->
<!--</style>-->













<template>
  <div style="z-index: 20110;" class="upload-image">
    <!-- :http-request="uploadSectionFile" -->
    <el-upload
            :action="url"
            :headers="headers"
            name="uploadFile"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            :limit="limit"
            :disabled="disabled"
            :on-change="handleEditChange"
            :class="{hide:showUpload}"
            accept=".jpg,.jpeg,.png,.JPG,.JPEG"
            :before-upload="beforeAvatarUpload"
            class="contentImgStyle"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <!--    -->
    <div v-if="dialogVisible" class="addLeft" style="z-index: 30120;position: fixed;top: 0;left: 0;width: 100%;height: 100%;background-color:rgba(0,0,0,0.6);display: flex;justify-content: center;align-items: center" @click="close">
      <div style="display: flex;flex-direction: row;justify-content: center;align-items: center;z-index: 32121;background-color: #fff;width: 650px;height: 650px;position: relative;border-radius: 10px">
        <div style="display: flex;flex-direction: row;justify-content: space-between;position: absolute;bottom: 10px">
          <el-button @click="close">关闭</el-button>
        </div>
        <div style="width: 700px;height: auto;display: flex;justify-content: center;align-items: center;">
          <img :src="dialogImageUrl" alt="" style="z-index: 32120;width: 100%;height: 100%">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {clientId} from '@/config'
  export default {
    name: 'Upload',
    props: {
      disabled: {
        type: Boolean,
        default: false
      },
      fileList: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        headers: {
          Authorization: localStorage.getItem('token_' + clientId)
        },
        url:process.env.VUE_APP_FILE_URL + "/fileMgr/fileManager/upload",
        limit: 9,
        showUpload: false,
        dialogImageUrl: '',
        dialogVisible: false,
        uploadFile: [],
        thisTitle: ''
      }
    },
    computed: {
      pictureIdList() {
        return this.fileList.map(v => {
          return v.name
        })
      }
    },
    methods: {
      //
      beforeAvatarUpload: function(file) {
        const isJPG = file.type === 'image/jpeg'
        const isPNG = file.type === 'image/png'
        const isPG = (isJPG || isPNG) // 限制图片格式为jpg / png
        const isLt2M = file.size / 1024 / 1024 < 2 // 限制图片大小
        if (!isPG) {
          this.$message.error('上传图片只能是 JPG 或 PNG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!')
        }
        return isPG && isLt2M
      },
      //
      uploadSectionFile(param) {
        const uploadFileLength = this.uploadFile.length
        const fileObj = param.file
        if (fileObj.type === 'image/jpeg') {
          const file = new File([fileObj], new Date().getTime() + '.jpg', {
            type: 'image/jpeg'
          })
          this.uploadFile[uploadFileLength] = { 'title': this.thisTitle, 'imgFile': file }
        } else if (fileObj.type === 'image/png') {
          const file = new File([fileObj], new Date().getTime() + '.png', {
            type: 'image/png'
          })
          this.uploadFile[uploadFileLength] = { 'title': this.thisTitle, 'imgFile': file }
        } else {
          this.$message.error('只能上传jpg/png文件')
          return false
        }
      },
      handleRemove(file, fileList) {
        this.$emit('handleRemove', file)
        if (file.response && file.response.obj) {
          this.pictureIdList.splice(this.pictureIdList.indexOf(file.response.obj), 1)
        } else {
          this.pictureIdList.splice(this.pictureIdList.indexOf(file.name), 1)
        }
        this.$emit('getImgIdList', this.pictureIdList)
      },
      handlePictureCardPreview(file) {
        console.log(111)
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      handleEditChange(file, fileList) {
        if (file.response) {
          if (file.response.code === 200) {
            this.pictureIdList.push(file.response.obj)
            this.$emit('getImgIdList', this.pictureIdList)
            if (fileList.length >= this.limit) {
              this.showUpload = true
              this.$message.error('最多只能上传9张！')
            }
          } else {
            fileList.splice(fileList.indexOf(file), 1)
            this.$message.error(file.response.msg)
            return false
          }
        }
        // if (fileList.length >= this.limit) {
        //   console.log(fileList.length)
        //   this.showUpload = true
        //   console.log(1111)
        //   this.$message.error('最多只能上传9张！')
        // }
      },
      close() {
        this.dialogVisible = false
      }
    }
  }
</script>

<style scoped lang="scss">
  .addLeft{
    animation-name: slideInLeft;
    animation-duration: .5s;
  }
  @keyframes slideInLeft {
    0% {
      transform: translateX(100%);
      opacity: 0.5;
    }

    to {
      transform: translateX(0px);
      opacity: 1;
    }
  }
  /*.upload-image >>> .hide .el-upload--picture-card {*/
  /*  display: none;*/
  /*}*/

  /deep/.el-upload--picture-card{
    line-height: 92px;
  }
  /deep/.el-upload--picture-card,
  /deep/.el-upload-list--picture-card .el-upload-list__item{
    width: 90px;
    height: 90px;
  }
</style>
