<template>
  <section>

    <el-upload class="avatar-uploader"
               id="avatar-uploader"
               action="/need-api/need/upload/uploadFile"
               :show-file-list="false"
               :before-upload="beforeAvatarUpload"
               :on-success="fileUploadSuccess">
      <img v-if="imageUrl"
           :src="imageUrl"
           class="avatar">
      <i v-else
         class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <div class="desc">
    </div>
  </section>
</template>
<script>
import util from "../../common/js/util";
import { debug } from 'util';
export default {
  data() {
    return {
      imageUrl: ''
    };
  },
  props: ['type'],
  methods: {
    beforeAvatarUpload(file) {
      let timechuo = new Date().getTime();
      let curDate = this.getCurDateForNum();
      let isJPG = /^image\/(jpeg|png|jpg)$/.test(file.type);
      this.showNoticeUploading = true;
      //上传图片
      const isLt2M = file.size / 1024 / 1024 < 5;
      if (this.type === 1) {
        if (!isJPG) {
          this.$message.error("上传图片的格式只能是 jpeg|png|jpg等 格式!");
          return false;
        } else {
          if (isLt2M) {
            return this.upload_dir = "/PWPlatform/V2.0.00/img/" + curDate + "/" + timechuo;
          } else {
            this.$message.error("上传图片的大小不能超过 5MB!");
            return false;
          }
        }
      }
    },

    getCurDateForNum() {
      let date = new Date();
      let month = date.getMonth() + 1;
      if (month < 10) {
        month = "0" + month;
      }
      var day = date.getDate();
      if (day < 10) {
        day = "0" + day;
      }
      return date.getFullYear() + month + day;
    },

    fileUploadSuccess(response, file, fileList) {
      this.uploadType = true;
      this.imageUrl = response;
      let file_path = response;
      let createTime = util.formatDate.format(new Date(), "yyyy-MM-dd hh:mm:ss");
      let files = {};
      files.slidePath = file_path;
      this.$emit("childByValue", files);
    },
  }
}
</script>
<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
#avatar-uploader .avatar-uploader-icon {
  width: 100px;
  height: 100px;
}
.avatar-uploader-icon {
  line-height: 100px;
}
.desc {
  margin-left: 50%;
  font-size: 10px;
  color: red;
  margin-top: -35%;
}
.update-top {
  margin-top: 60px;
}
</style>