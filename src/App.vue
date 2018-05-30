<template>
  <div id="box">
    <header>
      <mt-header fixed :title="$route.meta.title">
        <mt-button v-if="$route.meta.back" @click.native="callBack" icon="back" slot="left">返回</mt-button>
        <mt-button v-if="$route.meta.back" @click.native="callBack" slot="right">保存</mt-button>
        <mt-button v-if="$route.meta.add" @click.native="addList" slot="right"><span class="fontB">+</span></mt-button>
      </mt-header>
    </header>
    <article>
      <router-view/>
    </article>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {

    }
  },
  methods: {
    //返回
    callBack() {
      this.$router.back(-1);
    },
    //新建
    addList() {
      this.$router.push({name: 'detail'})
    }
  }
}
</script>
