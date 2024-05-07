<template>
    <card>
        <template #content>
            <TabMenu v-model:activeIndex="active" :model="items">                
            </TabMenu>
            
            <router-view/>
        </template>
    </card>
</template>
<script>

import { onMounted } from 'vue';
export default {
    data() {
        return {
            active: 1,
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