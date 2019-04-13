<template>
  <router-link :to="href">
    {{$attrs['zzz']}}
    <slot></slot></router-link>
</template>

<script>
export default {
  name: 'rlink',
  props: ["href"]
}
</script>

