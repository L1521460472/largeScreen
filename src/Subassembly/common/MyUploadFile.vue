<template>
  <div class="uploadFile">
    <el-upload
    ref="upload"
    :action="uploadUrl"
    :headers="headers"
    :data="data"
    :name="name"
    :show-file-list="showFileList"
    :accept="accept"
    :on-preview="preview"
    :on-success="success"
    :on-change="change"
    :before-upload="BfUpload"
    :before-remove="BfRemove"
    :list-type="listType"
    :file-list="fileList"
    :disabled="isDisabled"
    :limit="10"
    >
    <i slot="default" class="el-icon-plus"></i>
    <div slot="file" slot-scope="{file}">
      <img
        class="el-upload-list__item-thumbnail"
        :src="file.url" alt=""
      >
      <span class="el-upload-list__item-actions">
        <span
          class="el-upload-list__item-preview"
          @click="handlePictureCardPreview(file)"
        >
          <i class="el-icon-zoom-in"></i>
        </span>
        <span
          v-if="!disabled"
          class="el-upload-list__item-delete"
          @click="handleDownload(file)"
        >
          <i class="el-icon-download"></i>
        </span>
        <span
          v-if="!disabled"
          class="el-upload-list__item-delete"
          @click="handleRemove(file)"
        >
          <i class="el-icon-delete"></i>
        </span>
      </span>
    </div>
    <div slot="tip" class="el-upload__tip">只能上传10张照片</div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
export default {
  props:{
    uploadUrl:{
      type:String,
      default:''
    },
    showFileList:{
      type:Boolean,
      default:true
    },
    accept:{
      type:String,
      default:''
    },
    data:{
      type:Object,
      default:()=>{
        return {}
      }
    },
    name:{
      type:String,
      default:''
    },
    listType:{
      type:String,
      default:'picture-card'
    },
    headers:{
      type:Object,
      default:()=>{
        return {}
      }
    },
    isDisabled:{
      type:Boolean,
      default:false
    },
    fileList:{
      type:Array,
      default:()=>{
        return []
      }
    },
  },
  data(){
    return{
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false
    }
  },
  methods:{
    preview(file){
      this.$emit("preview",file)
    },//点击已上传文件的钩子

    remove(file, fileList){
      this.$emit("preview",file,fileList)
    },//文件列表移除文件的钩子

    success(response, file, fileList){
      console.log(response,file,fileList)
      if(response.code!==200||file.response.obj==null){
        this.$message('上传失败')
        fileList.splice(fileList.indexOf(file),1)
        return
      }
      this.$emit("success",file.response.obj)
    },//文件上传成功钩子
    change(file, fileList){
      this.$emit("preview",file)
    },//文件状态改变钩子

    BfUpload(file){
      this.$emit("preview",file)
    },//文件上传之前的钩子

    BfRemove(file, fileList){
      this.$emit("preview",file,fileList)
    },//文件删除前的钩子

    handleRemove(file){
      //this.$refs.upload.handleRemove(file)
      const uploadFiles = this.$refs.upload.uploadFiles;
      const index = uploadFiles.findIndex(item=>{return item.uid==file.uid});
      uploadFiles.splice(index,1);
      this.$emit('handleRemove', file)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      this.downloadCanvasIamge(file)
    },
    downloadCanvasIamge(selector, name) {
      const image = new Image()
      // 解决跨域 Canvas 污染问题
      image.setAttribute('crossOrigin', 'anonymous')
      image.onload = function () {
      const canvas = document.createElement('canvas')
        canvas.width = image.width
        canvas.height = image.height

        const context = canvas.getContext('2d')
        context.drawImage(image, 0, 0, image.width, image.height)
        const url = canvas.toDataURL('image/png')

        // 生成一个a元素
        const a = document.createElement('a')
        // 创建一个单击事件
        const event = new MouseEvent('click')

        // 将a的download属性设置为我们想要下载的图片名称，若name不存在则使用‘下载图片名称’作为默认名称
        a.download = selector.url   || '下载图片名称'
        // 将生成的URL设置为a.href属性
        a.href = url
        // 触发a的单击事件
        a.dispatchEvent(event)
      }
      image.src = selector.url
    },
  }
}
</script>
<style lang="scss" scoped>
.uploadFile{
  /deep/.el-upload{
    width: 100px;
    height: 100px;
    line-height: 107px;
  }
  
  /deep/.el-upload-list__item{
    width: 100px;
    height: 100px;
    &>div{
     width: 100%;
     height: 100%;
    }
  }
    
  
}
</style>