<template>
  <div class="app-container">
    <h1>
      栏目：{{rtit}}
    </h1>
    <h2>
      序号:{{rid}}|API:{{api}}
    </h2>
    <br>
    <rlink href="/news/1">1</rlink>
    <rlink href="/news/2">2</rlink>
  </div>
</template>

<script>
import { fetchList } from '@/api/article'
import { scrollTo } from '@/utils/scrollTo'
import { VueTinymce , TinymceSetting } from '@packy-tang/vue-tinymce'

export default {
  name: 'forms1',
  components: {
    VueTinymce
  },
  data() {
    return {
      list: [],
      content: '<p>html content</p>',
      setting: {
          height: 200,
          language_url: "langs/zh_CN.js",
          block_formats: "Paragraph=p;Heading 1=h1;Heading 2=h2;Heading 3=h3;Heading 4=h4;Heading 5=h5;Heading 6=h6;"
      },
      listQuery: { //API入口参数
          page: 1,
          limit: 35,
          importance: undefined,
          title: undefined,
          type: undefined,
          sort: '+id'
        },
    }
  },
  computed: {
    api(){
      return this.$route.meta.api
    },
    rid(){
      return this.$route.params.id
    },
    rtit(){
      return this.$route.meta.sub[this.$route.params.id]
    }
  },
  mounted() {
    console.log("------",this.$route.meta.sub,this.$route.params.id);
    
    /* fetchList(this.listQuery).then(response => {
      this.list = response.data.items
      console.log(this.list);
      setTimeout(() => {
        scrollTo(500, 800)
      }, 2000);
    }) */
  },
  methods: {
    guide() {
    }
  }
}
</script>
<style>
  td{ border: 1px solid #ccc; padding: 15px;}
</style>
