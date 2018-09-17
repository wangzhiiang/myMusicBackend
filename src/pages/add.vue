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
            <FormItem label="海报链接">
                <Input v-model="music.posterURL" placeholder=""></Input>
            </FormItem>
            <FormItem label="上传海报">
              <div class="demo-upload-list" v-for="item in uploadList" :key="item.id">
                <template v-if="item.status === 'finished'">
                    <img :src="'http:\\\\localhost:3000' + item.response.url">
                    <div class="demo-upload-list-cover">
                        <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                        <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                    </div>
                </template>
                <template v-else>
                    <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
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
                  <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
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
        posterURL: ''
      },
      uploadList: [],
      postertList: [],
      visible: false,
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
      this.imgName = name;
      this.visible = true;
    },
    handleRemove (file) {
      const fileList = this.$refs.upload.fileList;
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
    },
    handleSuccess (res, file) {
      console.log(file)
      let url = res.data
      let name = file.name
      this.uploadList.push(file)
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
      const check = this.uploadList.length < 5;
      if (!check) {
        this.$Notice.warning({
          title: 'Up to five pictures can be uploaded.'
        });
      }
      return check;
    }
  }
}
</script>

<style scoped>
.demo-upload-list {
  display: block;
  float: left;
  margin-right: 30px;
}
</style>
