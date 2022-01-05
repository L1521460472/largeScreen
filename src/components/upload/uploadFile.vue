<template>
  <div class="upload-div">
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
      :disabled="!this.canUpload"
      accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
    >
      <i slot="default" class="el-icon-plus"></i>
      <div slot="file" slot-scope="{ file }" class="img_wrap">
        <div>{{ file.fileType }}</div>
        <img
          v-if="file.fileType && file.fileType.toLowerCase() == '.pdf'"
          class="el-upload-list__item-thumbnail"
          src="data:image/png;base64,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"
          :alt="file.name"
        />
        <img
          v-else
          class="el-upload-list__item-thumbnail"
          :src="file.url"
          :alt="file.name"
        />
        <span class="el-upload-list__item-actions">
          <!--@click="handlePictureCardPreview(file)"-->
          <span class="el-upload-list__item-preview" @click="showViewer(file)">
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
    </el-upload>
    <image-viewer
      :z-index="imageView.zIndex"
      :initial-index="imageView.imageIndex"
      v-show="imageView.showViewer"
      :on-close="closeViewer"
      :url-list="imageView.previewSrcList"
    />
    <el-dialog
      :visible.sync="pdfDialog.dialogVisible"
      :fullscreen="pdfDialog.fullscreen"
      :modal="pdfDialog.modal"
      :title="pdfDialog.title"
    >
      <canvas
        v-for="page in pdfDialog.pages"
        :id="'the-canvas' + page"
        :key="page"
      ></canvas>
    </el-dialog>
  </div>
</template>

<script>
import ImageViewer from "./image-viewer";

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
  name: "zhqcUploadFile",
  components: { ImageViewer },
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
      maxSize: 2 * 1024 * 1024, //上传文件大小限制-2MB
      dialogVisible: false,
      dialogImageUrl: "",
      appenToBody: true,
      viewerImage: [],
      imageView: {
        zIndex: 3333,
        imageIndex: 0,
        showViewer: false,
        previewSrcList: [],
      },

      pdfDialog: {
        pages: 0,
        pdfDoc: null,
        dialogVisible: false,
        fullscreen: true,
        modal: false,
        title: "",
      },
    };
  },
  props: {
    moduleName: { type: String, require: true },
    fileType: { type: String, require: true },
    limitNum: { type: Number, require: false, default: 9 },
    disabled: { type: Boolean, default: false },
    canUpload: { type: Boolean, default: true },
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
            name: obj.fileName,
            fileType: obj.fileType,
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
      if (file.size > this.maxSize) {
        this.$message({
          showClose: true,
          message: "文件大小不能超过2MB",
          type: "fail",
        });
        return false;
      }
    },
    handleSuccess(response, file, fileList) {
      if (response.code === this.$successCode) {
        file.url = this.imageBase + response.fileId;
        file.fileId = response.fileId;
        if (file.name && file.name.lastIndexOf(".") != -1) {
          file.fileType = file.name.substring(
            file.name.lastIndexOf("."),
            file.name.length
          );
        }
        this.addList.push(file);
        this.fileList = fileList;
      }
    },
    handleExceed(files, fileList) {
      this.$message({
        showClose: true,
        message: "最多上传" + this.limitNum + "个文件",
        type: "fail",
      });
    },
    handleDownload(file) {
      window.open(file.url);
    },
    handleRemove(file) {
      if (!file.id) {
        for (let i in this.addList) {
          if (this.addList[i].uid === file.uid) {
            this.addList.splice(i, 1);
          }
        }
      } else {
        this.deleteImages.push({ id: file.id, fileId: file.fileId });
      }
      for (let i in this.fileList) {
        if (this.fileList[i].uid == file.uid) {
          this.fileList.splice(i, 1);
        }
      }
    },

    showViewer(obj) {
      if (obj.fileType.toLowerCase() == ".pdf") {
        this.pdfDialog.title = obj.name;
        this._loadFile(obj.url + "?.pdf");

        // this.$message({
        //   showClose: true,
        //   message: "暂时不能预览PDF文件，请下载后查看",
        //   type: "fail"
        // });
      } else {
        let imageArray = [];
        for (let i in this.fileList) {
          if (this.fileList[i].fileType.toLowerCase() != ".pdf") {
            imageArray.push(this.fileList[i].url);
          }
        }
        let index = imageArray.indexOf(obj.url);
        this.imageView.imageIndex = index >= 0 ? index : 0;
        this.imageView.previewSrcList = imageArray;
        this.imageView.showViewer = true;
      }
    },

    _renderPage(num) {
      this.pdfDialog.pdfDoc.getPage(num).then((page) => {
        let canvas = document.getElementById("the-canvas" + num);
        let ctx = canvas.getContext("2d");
        let dpr = window.devicePixelRatio || 1;
        let bsr =
          ctx.webkitBackingStorePixelRatio ||
          ctx.mozBackingStorePixelRatio ||
          ctx.msBackingStorePixelRatio ||
          ctx.oBackingStorePixelRatio ||
          ctx.backingStorePixelRatio ||
          1;
        let ratio = dpr / bsr;
        let viewport = page.getViewport(
          screen.availWidth / page.getViewport(1).width
        );
        canvas.width = viewport.width * ratio;
        canvas.height = viewport.height * ratio;
        canvas.style.width = viewport.width + "px";
        canvas.style.height = viewport.height + "px";
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
        let renderContext = {
          canvasContext: ctx,
          viewport: viewport,
        };
        page.render(renderContext);
        if (this.pdfDialog.pages > num) {
          this._renderPage(num + 1);
        }
      });
    },
    _loadFile(url) {
      PDFJS.getDocument(url).then((pdf) => {
        console.log(pdf);

        this.pdfDialog.dialogVisible = true;
        this.pdfDialog.pdfDoc = pdf;
        this.pdfDialog.pages = pdf.numPages;
        this.$nextTick(() => {
          this._renderPage(1);
        });
      });
    },
    closeViewer() {
      this.imageView.showViewer = false;
      this.imageView.imageIndex = 0;
      this.imageView.previewSrcList = [];
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
<style lang="scss" scoped>
.img_wrap {
  width: 100%;
  height: 100%;
}
</style>
