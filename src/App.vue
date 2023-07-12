<template>
  <div id="app">
    <div class="landing-page-template">
      <ContentSidebar :content="content" />
    </div>
  </div>
</template>

<script>
import ContentSidebar from './components/ContentSidebar.vue'
import contentData from '/content/contentSidebar.json'

export default {
  name: 'App',
  components: {
    ContentSidebar
  },
  data () {
    return {
      content: contentData
    }
  }
}
</script>

<style lang="scss"> 
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@300;400;500;600&family=Ubuntu:wght@300;400;500;700&display=swap');
@import 'src/assets/styles/utils/_variables.scss';

html,
body {
  font-family: $f-global-font;
}
</style>
