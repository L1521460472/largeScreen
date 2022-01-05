//
export default {
  data() {
    return {
      tabHeight: null,
      contentHeight: null
    }
  },
  //
  methods: {
    //
    layoutHeight() {
      const that = this
      const height = document.getElementsByClassName('fn-layout-vertical-form')[0] ? document.getElementsByClassName('fn-layout-vertical-form')[0].offsetHeight : 0
      that.tabHeight = height
      that.contentHeight = document.getElementsByClassName('fn-layout-vertical-table')[0] ? document.getElementsByClassName('fn-layout-vertical-table')[0].offsetHeight : 0

      that.contentHeight =  that.contentHeight - 30
    }
  },
  //
  mounted() {
    const that = this
    const height = document.getElementsByClassName('fn-layout-vertical-form')[0] ? document.getElementsByClassName('fn-layout-vertical-form')[0].offsetHeight : 0
    that.tabHeight = height
    that.contentHeight = document.getElementsByClassName('fn-layout-vertical-table')[0] ? document.getElementsByClassName('fn-layout-vertical-table')[0].offsetHeight : 0

    that.contentHeight =  that.contentHeight - 30
  },
  //
  activated() {
    const that = this
    window.onresize = () => {
      const height = document.getElementsByClassName('fn-layout-vertical-form')[0] ? document.getElementsByClassName('fn-layout-vertical-form')[0].offsetHeight : 0
      that.tabHeight = height
      that.contentHeight = document.getElementsByClassName('fn-layout-vertical-table')[0] ? document.getElementsByClassName('fn-layout-vertical-table')[0].offsetHeight : 0

      that.contentHeight =  that.contentHeight - 30
    }
  },
  //
  deactivated() {
    window.onresize = null
  }
}
