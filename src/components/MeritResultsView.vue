<template>
    <TabMenu v-model:activeIndex="activeMerit" :model="items" /> 
    <router-view/>
</template>
<script>

import { onMounted } from 'vue';
export default {
    data() {
        return {
            activeMerit: 1,
            items: [
                {                    
                    label: 'Merit Results',
                    icon: 'pi pi-fw pi-home',
                    to: '/resultsview'
                },
                {
                    label: 'Youth Merit Results',
                    icon: 'pi pi-fw pi-star',
                    to: '/youthresultsview'
                },
                {
                    label: 'Hitch Merit Results',
                    icon: 'pi pi-fw pi-bookmark',
                    to: '/hitchresultsview'
                }
            ]
        }
    },    
    onMounted() {
        router.push({ path: 'resultsview' })
    }
}
</script>