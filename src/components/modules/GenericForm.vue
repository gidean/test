<!--
  * Component Name: Generic Form
  * Description: Generic Form Structure for use in different form types.
  * Props:
      wrapperClass, content
  * Components:

  * Usage:
      <generic-form :content="content" :wrapper-class="'m-focused'" />
-->

<template>
  <div class="quote-container p-4 sm:p-6">
    <div class="header">
      <h2 class="title" v-html="contentData.title" />
      <p class="desc" v-html="contentData.description" />
    </div>
    <ValidationObserver v-slot="{ handleSubmit }" slim>
      <form class="form-container" @submit.prevent="handleSubmit(submitForm)">
        <div class="flex flex-col md:flex-row">
          <div class="input-wrapper md:pr-6 pb-4 md:pb-0">
            <ValidationProvider rules="required" v-slot="{ errors }" slim>
              <label class="label" :for="firstName">
                {{ contentData.firstName }}
              </label>
              <input @input="alphaOnly('firstName', $event)" :name="contentData.firstName" v-model="firstName" type="text"
                :aria-label="contentData.firstName">
              <small v-show="errors[0]" class="form-error">
                {{ errors[0] }}
              </small>
            </ValidationProvider>
          </div>
          <div class="input-wrapper">
            <ValidationProvider rules="required" v-slot="{ errors }" slim>
              <label class="label" :for="lastName">
                {{ contentData.lastName }}
              </label>
              <input @input="alphaOnly('lastName', $event)" :name="contentData.lastName" v-model="lastName" type="text"
                :aria-label="contentData.lastName">
              <small v-show="errors[0]" class="form-error">
                {{ errors[0] }}
              </small>
            </ValidationProvider>
          </div>
        </div>
        <div class="input-wrapper">
          <ValidationProvider rules="required" v-slot="{ errors }" slim>
            <label class=" label" :for="phoneNumber">
              {{ contentData.phoneLabel }}
            </label>
            <input @input="numericOnly('firstName', $event)" v-model="phoneNumber" type="number"
              :name="contentData.phoneLabel" :aria-label="contentData.phoneLabel">
            <small v-show="errors[0]" class="form-error">
              {{ errors[0] }}
            </small>
          </ValidationProvider>
        </div>
        <p class="terms-copy" v-html="contentData.termsCopy" />
        <button class="cta-btn m-primary" type="submit">
          {{ contentData.submitCopy }}
        </button>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import MixinContent from '../mixins/MixinContent'

export default {
  name: 'GenericForm',
  props: {
    content: {
      type: Object,
      default: null
    }
  },
  mixins: [MixinContent],
  data () {
    return {
      firstName: '',
      lastName: '',
      phoneNumber: ''
    }
  },
  computed: {
    contentData () {
      return {
        title: this.getContent(this.content, 'title.value', null),
        description: this.getContent(this.content, 'description.value', null),
        firstName: this.getContent(this.content, 'first_name_label.value', null),
        lastName: this.getContent(this.content, 'last_name_label.value', null),
        emailLabel: this.getContent(this.content, 'email_label.value', null),
        phoneLabel: this.getContent(this.content, 'phone_number_label.value', null),
        submitCopy: this.getContent(this.content, 'submit_copy.value', null),
        termsCopy: this.getContent(this.content, 'terms_copy.value')
      }
    }
  },
  methods: {
    alphaOnly(input, event) {
      const regex = /^[a-zA-Z\s]*$/;
      if (!regex.test(event.target.value)) {
        this[input] = this[input].replace(/[^a-zA-Z\s]/g, '');
      }
    },
    numericOnly(input, event) {
      const regex = /^\d+$/;
      if (!regex.test(event.target.value)) {
        this[input] = this[input].replace(/[^a-zA-Z\s]/g, '');
      }
    },
    submitForm() {
      alert('Form has been submitted!');
    }
  }
}
</script>

<style lang="scss">
@import 'src/assets/styles/utils/_mixin.scss';
@import 'src/assets/styles/utils/_variables.scss';
@import 'src/assets/styles/structure/_forms.scss';

.quote-container {
  background-color: $x-astronaut;
  border-radius: 8px;
  color: $white;
  display: flex;
  flex-direction: column;
  gap: 24px;

  .title {
    color: $white;
    font-family: $f-heading-font;
    font-size: 24px;
    font-weight: 700;
    line-height: 32px;
    margin-bottom: 8px;
  }

  .desc,
  .desc > p {
    font-size: 14px;
    font-weight: 400;
    line-height: 24px;
    margin-bottom: 0;
  }

  .terms {
    text-align: center;
    font-size: 14px;
    font-weight: 300;
    line-height: 24px;
  }
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 24px;

  .label {
    font-size: 16px;
    font-family: $f-heading-font;
    font-weight: 600;
    line-height: 24px;
    display: block;
    margin-bottom: 4px;
  }
}

.terms-copy {
  text-align: center;
  font-family: $f-heading-font;
  font-size: 14px;
  font-weight: 300;
  line-height: 24px;
  margin-bottom: 0;
}

.error {
  display: block;
  margin-top: 8px;
  font-size: 1.4rem;
  line-height: 1.8rem;
  font-weight: 300;
  color: $x-red;
}
</style>
