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
                    label: 'Merit Results Entry',
                    icon: 'pi pi-fw pi-home',
                    to: '/addmeritview'
                },
                {
                    label: 'Youth Merit Results Entry',
                    icon: 'pi pi-fw pi-star',
                    to: '/addyouthview'
                },
                {
                    label: 'Hitch Merit Results Entry',
                    icon: 'pi pi-fw pi-bookmark',
                    to: '/addhitchview'
                }
            ]
        }
    },    
    onMounted(){
        router.push({ path: 'addmeritview' })
    }


}
</script>