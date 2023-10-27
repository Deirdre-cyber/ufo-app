import { createRouter, createWebHistory } from 'vue-router'

import HelloWord from '@/components/HelloWorld.vue'
import Sightings from '@/views/SightingsList.vue'
import NewSighting from '@/views/NewSighting.vue'
import UpdateSighting from '@/views/UpdateSighting.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HelloWord
    },
    {
        path: '/sightings',
        name: 'Sightings',
        component: Sightings
    },
    {
        path: '/sightings/new',
        name: 'NewSighting',
        component: NewSighting
    },
    {
        path: '/sightings/:id',
        name: 'UpdateSighting',
        component: UpdateSighting,
      }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router
