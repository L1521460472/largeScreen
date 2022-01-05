<template>
  <section class="app-main">
    <vueToTop style="z-index: 10000" />
    <keep-alive
      :exclude="[
        'InGoodsRegister',
        'trackCarL',
        'trackCar',
        'vehicleMonitoringGl',
        'vehicleMonitoring',

        'bdWasteProductionAdd',
        'bdWasteProductionEdit',
        'bdWasteProductionSearch',

        'bdSupervisePoint',
        'bdSupervisePointAdd',
        'bdSupervisePointEditor',
        'bdSupervisePointSearch',

        'bdTransUnitInfoEditor',
        'bdTransUnitInfoAdd',
        'bdTransUnitInfoSearch',

        'bdDispositionAdd',
        'bdDispositionSearch',
        'bdDispositionEdit',

        'Intelligent',
      ]"
      :include="tagsList"
    >
      <router-view />
    </keep-alive>
  </section>
</template>

<script>
export default {
  name: "AppMain",
  computed: {
    tagsList() {
      return this.$store.state['tagsView'].tagsList.filter(item => item.name).map(item => item.name)
    }
  }
};
</script>

<style scoped>
.app-main {
  flex: 1;
  width: 100%;
  position: relative;
  overflow: hidden;
}
</style>

