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
                    label: 'Merit Rules and Info',
                    icon: 'pi pi-fw pi-home',
                    to: '/meritrulesandinfo'
                },
                {
                    label: 'Youth Merit Rules and Info',
                    icon: 'pi pi-fw pi-star',
                    to: '/youthmeritrulesandinfo'
                },
                {
                    label: 'Hitch Merit Rules and Info',
                    icon: 'pi pi-fw pi-bookmark',
                    to: '/hitchmeritrulesandinfo'
                }
            ]
        }
    },    
    onMounted() {
        router.push({ path: 'meritrulesandinfo' })
    }
}
</script>