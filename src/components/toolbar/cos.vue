<template>
  <!-- -->
  <section>
    <el-upload action=""
               id="upload"
               ref="upload"
               :file-list="fileList"
               :on-change="changeUpload"
               :list-type="pictureCards"
               :http-request="handleUploads"
               :on-exceed="handleExceed"
               :before-upload="beforeAvatarUpload"
               :on-remove="handleRemove">
      <div id="card"
           v-if="type!==1 && type!==2 ">
        <i class="el-icon-plus"></i></div>
      <img :src="videUrl"
           v-if="type===1 && videUrl!==''">

      <i class="el-icon-plus"
         v-if="type===1 || type===2"
         id="plus"></i>
      <!-- 播放视频-->
      <video :src="videUrl"
             v-if="type===3 && videUrl!==''"
             controls="controls"
             id="videoPlayer"
             style="width: 140px;height: 140px;"></video>
    </el-upload>
  </section>
</template>
<script>
import util from '../../common/js/util'
import { debug, debuglog } from 'util'

export default {
  data () {
    return {
      delFileList: [],
      fileList: [], // 此数组中存入所有提交的文档信息
      childFile: [],
      videUrl: '',
      pictureCards: 'picture-card',
      filePath: [],
      file: {},
      fileType: 1,
      newFilePath: [],
      imgSize: 0// 图片上传数量
    }
  },
  props: ['type'],

  mounted () {
    // 上传图片页面样式
    if (this.type === 1) {
      let element = document.getElementById('upload')
      element = element.children[1]
      element.style.cssText = 'height:50px !important;width: 50px !important;line-height: 0px !important;'
      let i = document.getElementById('plus')
      i.style.cssText = 'margin-top: 10px;'
    } else if (this.type === 3) {
      this.pictureCards = 'text'
    } else if (this.type === 2) {
      this.pictureCards = 'picture-card'
    }
  },
  methods: {
    // 删除
    handleRemove (file) {
      let filePathList = this.fileList
      for (let i = 0; i < filePathList.length; i++) {
        if (filePathList[i].url !== file.url) {
          this.newFilePath.push(filePathList[i])
        } else if (file.orderId !== undefined) {
          this.delFileList.push(filePathList[i].fileId)
        }
      }
      if (this.type === 3 && file.raw.type === 'video/mp4') {
        this.videUrl = ''
      }
      if (this.type === 1) {
        this.fileList = ''
      }
      this.childFile = this.newFilePath
      this.fileList = this.newFilePath
      this.$emit('childByValue', this.newFilePath, this.delFileList)
    },
    handleExceed () {
      this.$message.warning({
        message: '不能超过5个附件'
      })
    },
    // 上传时回显
    changeUpload (file) {
      this.fileList = []
      if (this.type === 3 && file.raw.type === 'video/mp4') {
        this.pictureCards = ''
        // this.videUrl = file.url;
        this.fileList.push(file)
      } else if (this.type === 1) {
        // this.fileList.push(file);
        this.videUrl = file.url
        let element = document.getElementById('plus')
        element.style.display = 'none'
      }
    },
    // 编辑回显
    change (file, fileList, type) {
      if (type === 3) {
        this.videUrl = ''
        this.fileList = []
      } else if (type === 1) {
        let files = {}
        files.name = ''
        files.uid = (new Date()).getTime()
        // files.url = file;
        // this.fileList.push(files);
        let element = document.getElementById('plus')
        element.style.display = 'none'
        this.videUrl = file
      } else {
        this.fileList.name = fileList.fileName
        this.fileList = fileList
        this.childFile = fileList
      }
    },
    change2 (file, fileList, type) {
      if (type === 3) {
        this.videUrl = file
        this.fileList = []
      } else if (type === 1) {
        let files = {}
        files.name = ''
        files.uid = (new Date()).getTime()
        // files.url = file;
        // this.fileList.push(files);
        let element = document.getElementById('plus')
        element.style.display = 'none'
        this.videUrl = file
      } else {
        this.fileList.name = fileList.fileName
        this.fileList = fileList
        this.childFile = fileList
      }
    },
    /**
       * 描述 :上传文件之前做的校验
       * type===1 上传单张
       * type===2 上传多张图片
       * type===3 上传视频
       */
    beforeAvatarUpload (file) {
      let timechuo = new Date().getTime()
      let curDate = this.getCurDateForNum()
      let isJPG = /^image\/(jpeg|png|jpg|bmp|jpg)$/.test(file.type)
      let isVideo = /^video\/(mp4)$/.test(file.type)
      this.showNoticeUploading = true
      // mp4/pdf/doc
      const isLtMp4 = file.size / 1024 / 1024 < 20
      // 上传图片
      const isLt2M = file.size / 1024 / 1024 < 4

      
      // 上传视频文件
      if (this.type === 3) {
        if (file.type !== 'video/mp4') {
          this.$message.error('上传的视频文件只能是MP4格式')
          return isVideo
        } else {
          if (!isLtMp4) {
            this.$message.error('上传视频文件的大小不能超过 20MB!')
            return isLtMp4
          }
        }
        // 视频目录
        if (file.type === 'video/mp4') {
          return this.upload_dir = '/PWPlatform/V2.0.00/mp4/' + curDate + '/' + timechuo
        }
      } else if (this.type === 1) { // 上传单张图片
        if (isLt2M) {
          if (!isJPG) {
            this.$message.error('上传图片的格式只能是 jpeg|png|jpg|bmp|jpg等 格式!')
            return false
          }
          return this.upload_dir = '/PWPlatform/V2.0.00/img/' + curDate + '/' + timechuo
        } else {
          this.$message.error('上传图片的大小不能超过 4MB!')
          return false
        };
      } else if (this.type === 2) {
        if (isLt2M) {
          if (!isJPG) {
            this.$message.error('上传图片的格式只能是 jpeg|png|jpg|bmp|jpg等 格式!')
            return false
          }
          this.imgSize += 1
          if (this.imgSize > 5 && this.type == 2) {
            this.$message.error('上传广告图片最多只能上传5张')
            return false
          }
          return this.upload_dir = '/PWPlatform/V2.0.00/img/' + curDate + '/' + timechuo
        };
      }
    },

    getCurDateForNum () {
      let date = new Date()
      let month = date.getMonth() + 1
      if (month < 10) {
        month = '0' + month
      }
      var day = date.getDate()
      if (day < 10) {
        day = '0' + day
      }
      return date.getFullYear() + month + day
    },
    // 文件上传
    handleUploads (param) {
      const self = this
      let file = param.file
      const formData = new FormData()
      formData.append('file', file)
      formData.append('type', file.type)
      formData.append('fileType', this.type)
      return this.$axios.request({
        url: '/platform-api/platform/upload/uploadFile',
        method: 'post',
        data: formData
      }).then(res => {
        let file_path = res.data
        self.videUrl = file_path
        let files = {}
        files.url = file_path
        files.name = file.name
        files.fileSize = file.size
        files.uid = file.uid
        let createTime = util.formatDate.format(new Date(), 'yyyy-MM-dd hh:mm:ss')
        files.createTime = createTime
        if (self.type === 3) { // 上传视频
          self.$emit('childByValue', files)
        } else if (self.type === 1) { // 上传单张图片.
          self.$emit('childByValue', files)
        } else if (self.type === 2) { // 上传多个
          self.childFile.push(files)
          self.fileList = self.childFile
          self.$emit('childByValue', self.fileList)
        }
        console.log('文件上传成功 ' + files)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  img {
    width: 50px;
    height: 50px;
  }
  #card {
    background-color: #fbfdff;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    box-sizing: border-box;
    width: 148px;
    height: 148px;
    line-height: 146px;
    vertical-align: top;
  }
</style>
