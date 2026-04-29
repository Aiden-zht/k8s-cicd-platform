import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/cluster'
  },
  {
    path: '/cluster',
    component: () => import('../layouts/AppLayout.vue'),
    children: [
      {
        path: '',
        name: 'ClusterList',
        component: () => import('../views/cluster/ClusterList.vue')
      },
      {
        path: 'nodes',
        name: 'NodeList',
        component: () => import('../views/cluster/NodeList.vue')
      }
    ]
  },
  {
    path: '/apps',
    component: () => import('../layouts/AppLayout.vue'),
    children: [
      {
        path: '',
        name: 'AppList',
        component: () => import('../views/apps/AppList.vue')
      },
      {
        path: 'deployments',
        name: 'DeployHistory',
        component: () => import('../views/apps/DeployHistory.vue')
      }
    ]
  },
  {
    path: '/pipelines',
    component: () => import('../layouts/AppLayout.vue'),
    children: [
      {
        path: '',
        name: 'PipelineList',
        component: () => import('../views/pipelines/PipelineList.vue')
      },
      {
        path: 'history',
        name: 'PipelineHistory',
        component: () => import('../views/pipelines/PipelineHistory.vue')
      }
    ]
  },
  {
    path: '/registry',
    component: () => import('../layouts/AppLayout.vue'),
    children: [
      {
        path: '',
        name: 'ImageList',
        component: () => import('../views/registry/ImageList.vue')
      },
      {
        path: 'config',
        name: 'RegistryConfig',
        component: () => import('../views/registry/RegistryConfig.vue')
      }
    ]
  },
    {
      path: '/settings',
      redirect: '/cluster'
    },
    {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
