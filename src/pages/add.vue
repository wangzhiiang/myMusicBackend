<template>
  <section>
    <Card style="width:100%">
        <p slot="title">
          <Icon type="ios-film-outline"></Icon>
          添加
        </p>

        <Form :model="music" :label-width="80">
            <FormItem label="歌曲">
                <Input v-model="music.title" placeholder=""></Input>
            </FormItem>
            <FormItem label="歌手">
                <Input v-model="music.singer" placeholder=""></Input>
            </FormItem>
            <FormItem label="歌曲链接">
                <Input v-model="music.singUrl" placeholder=""></Input>
            </FormItem>
            <FormItem label="上传海报">
              <div class="demo-upload-list" v-if="posterURL.status">
                <template v-if="posterURL.status">
                    <img :src="posterURL.response.url">
                    <div class="demo-upload-list-cover">
                        <Icon type="ios-eye-outline" @click.native="handleView(posterURL.response.url)"></Icon>
                        <Icon type="ios-trash-outline" @click.native="handleRemove(posterURL)"></Icon>
                    </div>
                </template>
                <template v-else>
                    <Progress v-if="posterURL.showProgress" :percent="posterURL.percentage" hide-info></Progress>
                </template>
              </div>
              <Upload
                ref="upload"
                :show-upload-list="false"
                :default-file-list="postertList"
                :on-success="handleSuccess"
                :format="['jpg','jpeg','png']"
                :max-size="2048"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                :before-upload="handleBeforeUpload"
                multiple
                type="drag"
                action="http://localhost:3000/api/uploadFile"
                style="display: inline-block;width:200px;">
                <div style="width: 200px;height: 200px;line-height: 200px;">
                    <Icon type="ios-camera" size="20"></Icon>
                </div>
              </Upload>
              <Modal title="View Image" v-model="visible">
                  <img :src="viewImgSrc" v-if="visible" style="width: 100%">
              </Modal>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="submit">提交</Button>
                <Button style="margin-left: 8px" @click="backhome">返回</Button>
            </FormItem>
            
        </Form>
    </Card>
  </section>
</template>

<script>
export default {
  components: {

  },
  data () {
    return {
      music: {
        title: '',
        singer: '',
        singUrl: '',
      },
      posterURL: '',
      postertList: [],
      visible: false,
      viewImgSrc: ''
    }
  },
  created () {

  },
  mounted () {
    this.$nextTick(() => {
      // this.uploadList = this.$refs.upload.fileList;
    })
  },
  methods: {
    submit () {
      this.music.posterURL = this.posterURL.response.url
      this.$https({
        url: '/api/add',
        method: 'POST',
        data: this.music
      }).then((res) => {
        this.$router.push('/')
      }).catch(() => {

      })
    },
    backhome () {
      this.$router.push('/')
    },
    handleView (name) {
      this.viewImgSrc = name;
      this.visible = true;
    },
    handleRemove (file) {
      this.posterURL = ''
    },
    handleSuccess (res, file) {
      console.log(file)
      this.posterURL = file
    },
    handleFormatError (file) {
      this.$Notice.warning({
        title: 'The file format is incorrect',
        desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
      });
    },
    handleMaxSize (file) {
      this.$Notice.warning({
        title: 'Exceeding file size limit',
        desc: 'File  ' + file.name + ' is too large, no more than 2M.'
      });
    },
    handleBeforeUpload () {

    }
  }
}
</script>

<style scoped>
.demo-upload-list {
  display: block;
  float: left;
  margin-right: 30px;
  width: 200px;
  height: 200px;
}
img{
  width: 200px;
  height: 200px;
}
</style>
