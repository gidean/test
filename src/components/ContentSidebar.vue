<!--
  * Component Name: ContentSidebar
  * Description: Content sidebar layout module
  * Props:
      content
  * Components:
      Image, Text
  * Usage:
      <content-sidebar :content="value" />
-->

<template>
  <div class="grid-container mx-auto py-10 xxl:py-11 px-4 xxl:px-6">
    <div class="mb-11 grid gap-x-4 grid-cols-4 md:grid-cols-8 xl:grid-cols-12">
      <div class="col-span-full xl:col-span-6 order-2">
        <div class="content-item">
          <accordion :content="contentData.content"/>
        </div>
      </div>
      <div class="col-span-full xl:col-span-5 xl:col-start-8 mb-10 xl:mb-0 order-1">
        <div class="sidebar-item">
          <generic-form
            :content="contentData.sidebar"
            :wrapper-class="'m-in-page'"
          />
        </div>
      </div>
    </div>
    <div class="asterisk">
      <span>*</span>
      <span>
        {{ contentData.asterisks }}
      </span>
    </div>
  </div>
</template>

<script>
import MixinContent from './mixins/MixinContent'

import Accordion from './modules/Accordion'
import GenericForm from './modules/GenericForm'

export default {
  name: 'ContentSidebar',
  props: {
    content: {
      type: Object,
      default: null,
      required: true
    }
  },
  mixins: [MixinContent],
  components: {
    GenericForm,
    Accordion
  },
  computed: {
    contentData() {
      return {
        asterisks: this.getContent(this.content, 'content[0].contentData.asterisks.value', null),
        content: this.getContent(this.content, 'content[0].contentData', null),
        sidebar: this.getContent(this.content, 'sidebar[0]', null)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/assets/styles/utils/_variables.scss';

.asterisk {
  background-color: $x-quartz-100;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  display: flex;
  gap: 16px;
}

@media screen and (max-width: ($g-desktop-breakpoint-min-width - 1)) {
  .order-1 {
    order: 1;
  }

  .order-2 {
    order: 2;
  }
}
</style>
