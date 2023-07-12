<!--
  * Component Name: Accordion
  * Description: Accordion for FAQ, contains a header title, questions and answer
  * Props:
      header, accordionItems, link
  * Components:
      CtaButton
  * Usage:
      <accordion :header="value" :accordionItems="value" :link="value" />
-->

<template>
  <div class="accordion">
    <div v-html="contentData.header" class="accordion-header mb-6" />
    <div class="accordion-item" 
          v-for="(accordionItem, index) in contentData.accordionItems" 
          :key="index"
          :id="'accordion-btn-' + index"
          :aria-controls="'accordion-panel-' + index"
          :aria-expanded="openedIndex === index ? 'true' : 'false'"
          @click="toggleAcordion(index)">
      <div class="accordion-question py-4" >
        <button
          type="button"
          class="accordion-question-button"
        >
          {{ accordionItem.elements.question.value }}
        </button>
        <div class="arrow">
          <ArrowDark></ArrowDark> 
        </div>
      </div>
      <transition 
        name="accordion-slide"
        @enter="start"
        @after-enter="end"
        @before-leave="start"
        @after-leave="end"
      >
        <div
          v-show="openedIndex === index"
          class="accordion-answer"
          v-html="accordionItem.elements.answer.value"
        />
      </transition>
    </div>
    <div class="accordion-footer mt-6" v-if="contentData.linkText">
      <a :href="contentData.linkUrl" class="cta-btn m-tertiary">
        {{ contentData.linkText }}
        <ArrowRight class="mr-8"></ArrowRight> 
      </a>
      
    </div>
  </div>
</template>

<script>
import MixinContent from '../mixins/MixinContent'
import ArrowDark from '@/components/icons/ArrowDark.vue';
import ArrowRight from '@/components/icons/ArrowRight.vue';

export default {
  components: {
    ArrowDark,
    ArrowRight
  },
  name: 'AccordionModule',
  props: {
    content:{
      type: Object,
      default: null
    }
  },
  mixins: [MixinContent],
  data () {
    return {
      openedIndex: null
    }
  },
  computed: {
    contentData () {
      return {
        header: this.getContent(this.content, 'header.value', null),
        accordionItems: this.getContent(this.content, 'accordion_items.linkedItems', null),
        linkText: this.getContent(this.content, 'module_cta.linkedItems[0].elements.link_text.value', null),
        linkUrl: this.getContent(this.content, 'module_cta.linkedItems[0].elements.site_link.linkedItems[0].elements.url.value', '')
      }
    }
  },
  methods: {
    // Toggle accordion
    toggleAcordion(index) {
      this.openedIndex = this.openedIndex === index ? null : index;
    },
    start(el) {
      el.style.height = el.scrollHeight + "px";
    },
    end(el) {
      el.style.height = "";
    }
  }
}
</script>

<style lang="scss">

@import 'src/assets/styles/utils/_variables.scss';

.accordion {
  margin-right: auto;
}

.accordion-header {

  h3 {
    font-weight: $w-heading;
    font-size: 3.2rem;
    line-height: 40px;
    color: $c-core-font;
    margin-bottom: 24px;
  }

  h4 {
    font-weight: $w-heading;
    font-size: 2.4rem;
    line-height: 32px;
    color: $c-core-logo;
  }

  p {
    font-weight: $w-body;
    font-size: 1.8rem;
    line-height: 30px;
    color: $c-core-font;
    margin: 12px 0;

    a {
      color: $c-core-font;
      text-decoration: underline;
    }
  }
}

.accordion-item {
  border-bottom: 1px solid $c-border-card;

  .accordion-question {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;

    &:hover {

      .accordion-question-button {
        color: $c-links;
      }

      .arrow {
        path {
          stroke: $c-links;
        }
      }
    }

    .accordion-question-button {
      appearance: none;
      cursor: pointer;
      text-align: left;
      font-family: $f-heading-font;
      padding: 0;
      background-color: inherit;
      font-weight: $w-cta;
      font-size: 1.8rem;
      line-height: 36px;
      color: $c-core-font;
      width: 90%;
    }

    .arrow {
      transform: rotate(0deg);
      transition: all .3s ease-in-out;
      fill: none;
    }
  }

  &[aria-expanded="true"] {
    .accordion-question-button {
        color: $c-links;
      }

      .arrow {
        path {
          stroke: $c-links;
        }
      }

    .accordion-question {
      .arrow {
        transform: rotate(180deg);
      }
    }
  }

  .accordion-answer {

    a {
      color: $c-core-font;
      text-decoration: underline;

      &:hover {
        color: $c-links;
      }
    }
    
    p:last-child {
      padding-bottom: $spacing-4;
    }

    p {
      margin: 0;
      padding: 0 0 $spacing-4 0;
      font-weight: 400;
    }

    b {
      font-weight: $w-heading;
    }

    ul {
      margin-left: 30px;

      li {
        margin-bottom: 16px;
        position: relative;
        font-weight: 400;
      }

      li:before {
        content: '';
        display: inline-block;
        position: absolute;
        background-color: $c-core-font;
        border-radius: 50px;
        left: -22px;
        top: 12px;
        height: 8px;
        width: 8px;
      }
    }

    ol {
      counter-reset: my-counter;
      list-style: none;

      li {
        counter-increment: my-counter;
        position: relative;
        margin-bottom: 16px;
        font-weight: 400;
      }

      li:before {
        content: counter(my-counter);
        width: 32px;
        height: 32px;
        display: inline-block;
        border-radius: 50%;
        color: $white;
        background-color: $c-core-font;
        text-align: center;
        font-size: 1.6rem;
        margin-right: 16px;
      }
    }
  }
}

.accordion-footer {
  .cta-btn.m-tertiary {
    text-align: left;
    padding: 0;
    height: auto;
    min-width: auto;
  }
}

.accordion-slide-enter-active,
.accordion-slide-leave-active {
  will-change: height,opacity;
  transition: height 1s ease,all .5s ease;
  overflow: hidden;
}

.accordion-slide-enter,
.accordion-slide-leave-to {
  height: 0 !important;
  opacity: 0;
}
</style>
