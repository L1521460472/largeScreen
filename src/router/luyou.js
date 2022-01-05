import Layout from './../layout/Home'
const router = [
  // 数据中心
  {
    path: '/trackCar',
    component: Layout,
    redirect: '',
    children: [
      {
        path: '',
        component: () => import('@/page/dataCenter/vehicleMonitoringCenter/trackCar.vue'),
        name: 'trackCar',
        bz: '',
        meta: {
          title: 'trackCar'
        }
      }
    ]
  },
  {
    path: '/trackCarL',
    component: Layout,
    redirect: '',
    children: [
      {
        path: '',
        component: () => import('@/page/dataCenter/vehicleMonitoringCenter/track.vue'),
        name: 'trackCarL',
        bz: '',
        meta: {
          title: 'trackCarL'
        }
      }
    ]
  },
  {
    path: '/carTrajectory',
    component: Layout,
    redirect: '',
    children: [
      {
        path: '',
        component: () => import('@/page/dataCenter/vehicleMonitoringCenter/carTrajectory.vue'),
        name: 'carTrajectory',
        bz: '',
        meta: {
          title: '车辆轨迹'
        }
      }
    ]
  },
  {
    path: '/carTrajectory',
    component: Layout,
    redirect: '',
    children: [
      {
        path: '',
        component: () => import('@/page/dataCenter/vehicleMonitoringCenter/carTrajectory.vue'),
        name: 'carTrajectory',
        bz: '',
        meta: {
          title: '车辆轨迹'
        }
      }
    ]
  },
  {
    path: '/vehicleTrack',
    component: Layout,
    redirect: '',
    children: [
      {
        path: '',
        component: () => import('@/page/dataCenter/vehicleMonitoringCenter/vehicleTrack.vue'),
        name: 'vehicleTrack',
        bz: '',
        meta: {
          title: '车辆跟踪'
        }
      }
    ]
  },
  {
    path: '/dataStands_solidWasteTypeSum',
    component: Layout,
    redirect: '',
    children: [
      {
        path: '',
        component: () => import('@/page/wasteTypeSum/solidWasteTypeSum.vue'),
        name: 'solidWasteTypeSum',
        bz: '',
        meta: {
          title: '固废类型汇总'
        }
      }
    ]
  }

]
export default router

