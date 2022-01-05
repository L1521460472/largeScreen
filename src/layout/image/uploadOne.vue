<template>
  <div class="upload-div">
    <el-upload
      class="avatar-uploader"
      :name="name"
      :action="uploadUrl"
      :data="uploadData"
      :show-file-list="false"
      accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,"
      :on-success="handleSuccess"
      :before-upload="beforeUpload"
      :headers="headers"
      :disabled="disabled"
    >
      <div class="slot-div" v-if="value" @click.stop="">
        <img :src="value" alt="">
        <span class="item-actions">
          <i class="el-icon-zoom-in" @click="handlePreview"></i>
          <!-- <i class="el-icon-download" @click="handleDownload"></i> -->
          <i class="el-icon-delete" @click="handleRemove"></i>
        </span>
      </div>
      <i v-else slot="default" class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" title="预览" :modal-append-to-body="false">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    name: { type: String, default: () => 'uploadFile' },
    uploadData: { type: Object, default: () => {} },
    value: { type: String, require: true },
    disabled: { type: Boolean, default: false },
    beforeUploadProp: { type: Function, default: null}
  },
  data() {
    return {
      uploadUrl: `${process.env.VUE_APP_FILE_URL}/fileMgr/fileManager/upload2Path`,
      dialogVisible: false,
      dialogImageUrl: '',
      headers: {
        Authorization: localStorage.getItem('token')
      },
    }
  },
  methods: {
    initData(data, disabled) {
      this.image = data
      this.disabled = disabled
    },
    beforeUpload(file) {
      if (!file) {
        return false
      }
      if (this.beforeUploadProp) {
        return this.beforeUploadProp(file)
      }
    },
    handleSuccess(response, file, fileList) {
      if (response.code === this.$successCode) {
        this.$emit('input', response.obj)
      }
    },
    handlePreview() {
      this.dialogImageUrl = this.value;
      this.dialogVisible = true;
    },
    handleDownload() {

    },
    handleRemove() {
      this.$emit('remove')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.upload-div{
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .slot-div{
    position: relative;
    width: 178px;
    height: 178px;
    img{
      width: 100%;
      height: 100%;
    }
    .item-actions {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      cursor: default;
      text-align: center;
      color: #fff;
      opacity: 0;
      font-size: 20px;
      background-color: rgba(0,0,0,.5);
      transition: opacity .3s;
      display: flex;
      align-items: center;
      justify-content: center;
      i {
        margin: 0 8px;
        cursor: pointer;
      }
    }
    &:hover .item-actions{
      opacity: 1;
    }
  }
}
</style>
