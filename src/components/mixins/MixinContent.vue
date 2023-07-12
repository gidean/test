<script>
import lodashGet from 'lodash/get'

const emptyRichText = '<p><br></p>'

export default {
  data () {
    return {
    }
  },
  methods: {
    
    getContent (object, path, defaultValue = '') {
      const content = lodashGet(object?.elements ?? object, path, defaultValue)
      return this.cleanRichText(content) || defaultValue
    },
    cleanRichText (content) {
      return content === emptyRichText ? '' : content
    }
  }
}
</script>
