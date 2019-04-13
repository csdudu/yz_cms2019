<template>
  <div>
    <h1 @click="clickH">aaaaaaaa[{{href}}]</h1>
    <rlink href='ddd' v-bind="$attrs">sss</rlink>
  </div>
</template>

<script>
  export default {
    name: 'aaa',
    props: ["href"],
    methods: {
      clickH() {
        console.log("click!");
        this.$emit("update:href", "变了");
      }
    }
  }

</script>
