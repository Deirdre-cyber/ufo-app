import { createRouter, createWebHistory } from 'vue-router'

import HelloWord from './components/HelloWorld.vue'
import Sightings from './components/SightingsList.vue'
import NewSighting from './components/NewSighting.vue'

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
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router
