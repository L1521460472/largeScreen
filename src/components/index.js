import Vue from 'vue'
//

import pageTable from '@/Subassembly/ZhqcDayTable'  // import pageTable from 'zhqc-property-day-table'
// import pageTable from './../page/transmanage/tmDispatchOrder/components/zhqcTable'
import fullPop from 'zhqc-full-pop-layer'
import fullPopItem from 'zhqc-full-pop-layer-item'
import layoutBody from 'zhqc-property-layout-body'
import layoutBodyAuto from 'zhqc-property-layout-body-auto'
import zhqcDialog from 'zhqc-property-dialog'
// import zhqcForm from 'zhqc-property-dia-form'
import zhqcForm from 'zhqc-property-sh-dia-form'
// import zhqcForm from '../Subassembly/ZhqcDiaForm'
import zhqcTopForm from 'zhqc-property-sh-top-form'
import zhqcPage from 'zhqc-property-pagination'
import PageSonTabForm from 'zhqc-property-son-tab-form'
import vexDiaTable from 'zhqc-property-dia-edit-table'
import douNpmTreetable from '../Subassembly/TreeTable'
import zhqcBtn from '../Subassembly/ZhqcCustomizeBtn'

// import douNpmTreetable from 'zhqc-property-tree-table'
import zhqcDialogVxeGrid from 'zhqc-property-vxe-grid'
import douNpmPracticeSearch from 'zhqc-property-search'
import douNpmPracticeBreadcrumb from 'zhqc-property-breadcrumb'
import { uploadVue, exportVue, exportTemplateVue } from '@/layout/Excel/index.js'
import zhqcImage from '@/layout/image/imgAlart'

// 注意 有些组件使用异步加载会有影响
// Vue.component('zhqcCustomTableColumnBtn', zhqcCustomTableColumnBtn)
Vue.component('zhqc-table', pageTable)
Vue.component('layout-body', layoutBody)
Vue.component('layout-body-auto', layoutBodyAuto)
Vue.component('zhqc-dialog', zhqcDialog)
Vue.component('zhqc-form', zhqcForm)
Vue.component('zhqc-top-form', zhqcTopForm)
Vue.component('zhqc-page', zhqcPage)
Vue.component('zhqc-son-tab-form', PageSonTabForm)
Vue.component('full-pop', fullPop)
Vue.component('full-pop-item', fullPopItem)
Vue.component('upload-vue', uploadVue)
Vue.component('export-vue', exportVue)
Vue.component('export-template-vue', exportTemplateVue)
Vue.component('tree-table', douNpmTreetable)
Vue.component('zhqc-property-search', douNpmPracticeSearch)
Vue.component('breadcrumb', douNpmPracticeBreadcrumb)
Vue.component('vex-dia-table', vexDiaTable)
Vue.component('vex-dia-grid', zhqcDialogVxeGrid)
Vue.component('zhqc-image', zhqcImage)
Vue.component('zhqc-button', zhqcBtn)
