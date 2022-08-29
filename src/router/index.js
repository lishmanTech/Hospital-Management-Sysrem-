import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Project from '../views/Project.vue'
import Team from '../views/Team.vue'
import EditDoc from '../components/EditDoc.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/project',
    name: 'Project',
    component: Project,
  },
  {
    path: '/team',
    name: 'Team',
    component: Team,
  },
  {
    path: '/doctors/:doctorId',
    name: 'EditDoc',
    component: EditDoc,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
