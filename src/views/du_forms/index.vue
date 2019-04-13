<template>
  <div class="app-container">
    报表1
    <vue-tinymce ref="tinymce" v-model="content" :setting="setting">
    </vue-tinymce>
    <!-- <table>
      <tr v-for="item in list" :key="item.id">
        <td> {{ item.id }} </td>
        <td> {{ item.author }} </td>
        <td> {{ item.title }} </td>
      </tr>
    </table> -->
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
  mounted() {
    console.log("------",this.vueTinymce);
    
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
