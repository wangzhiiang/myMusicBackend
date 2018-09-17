<template>
  <section>
    <Card style="width:100%">
        <p slot="title">
            <Icon type="ios-film-outline"></Icon>
            歌曲列表
        </p>
        <a href="/add" slot="extra" >
            <Icon type="ios-loop-strong"></Icon>
            添加
        </a>
        <Table :columns="tHeadList" :data="tBodyList"></Table>
    </Card>
  </section>
</template>

<script>
export default {
  components: {

  },
  data () {
    return {
      tHeadList: [
        {
          title: '歌曲名',
          key: 'title'
        },
        {
          title: '歌手',
          key: 'singer'
        },
        {
          title: '歌曲URL',
          key: 'singUrl'
        },
        {
          title: '海报Url',
          key: 'posterURL'
        },
        {
          title: '操作',
          key: '_id',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.editMusic(params)
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.deleteMusic(params)
                  }
                }
              }, '删除')
            ]);
          }
        }
      ],
      tBodyList: []
    }
  },
  created () {
    this.getList()
  },
  mounted () {
    this.$nextTick(() => {

    })
  },
  methods: {
    getList () {
      this.$https({
        url: '/api/list',
        method: 'GET'
      }).then((res) => {
        console.log(res)
        this.$nextTick(() => {
          this.tBodyList = res.data.data
        })
      }).catch(() => {

      })
    },
    deleteMusic (params) {
      console.log(params)
      this.$https({
        url: '/api/delete',
        method: 'DELETE',
        data: {
          id: params.row._id
        }
      }).then((res) => {
        if (res.data.code === 0) {
          this.getList()
        }
      }).catch(() => {

      })
    },
    editMusic (params) {
      this.$router.push({ path: '/edit?id=' + params.row._id })
    }
  }
}
</script>

<style lang="" scoped>
</style>
