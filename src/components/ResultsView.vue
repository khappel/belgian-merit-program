<template>
    <TabMenu :model="items" />    
    <router-view/>
</template>

<script>
import PlacingComponent from './PlacingComponent.vue'

export default {
    name: "Results",
    props: ['showData'],
    data() {
        return {
            /*placingDataList: [],
            placingFile: 'Placings/2023BelgianMeritPlacings.json',
            defaultFileSelected: {
                year: "2023-2024",
                file: "Placings/2023BelgianMeritPlacings.json"
            },
            fileYears: [
                {
                    year: "2023-2024",
                    file: "Placings/2023BelgianMeritPlacings.json"
                },
                {
                    year: "2022-2023",
                    file: "Placings/2022BelgianMeritPlacings.json"
                }
            ],
            defaultShowSelected: [{
                id: 1,
                show: "ISF"
            }],
            shows: [
                {
                    id: 1,
                    show: "ISF"
                },
                {
                    id: 2,
                    show: "Great Lakes"
                }
            ],
            showDataList: [],
            accordianCount: [],*/
            items: [
                {
                    label: 'Show Results',
                    icon: 'pi pi-fw pi-home',
                    to: '/showresultsview'
                },
                {
                    label: 'Exhibitor Results',
                    icon: 'pi pi-fw pi-plus-circle',
                    to: '/exhibitorresultsview'
                },
                {
                    label: 'Horse Results',
                    icon: 'fa-solid fa-horse',
                    to: '/horseresultsview'
                }
            ],
        };
    },
    components: {
        PlacingComponent
    },
    methods: {

    },
    created: function () {
        //showDataList = showData
    }
};
</script>