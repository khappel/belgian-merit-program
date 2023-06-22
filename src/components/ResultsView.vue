<template>
    <card>
        <template #title class="flexrow">
            <Dropdown v-model="defaultFileSelected" :options="fileYears" optionLabel="year" placeholder="Select a year"
                class="w-full md:w-14rem" @change="getShowData()" />
            <Dropdown v-model="defaultViewSelected" :options="items" optionLabel="label" placeholder="Select a view"
                class="w-full md:w-14rem" @change="changeView()" />
        </template>
        <template #content>
            <!--<TabMenu :model="items" />-->
            <router-view />
        </template>
    </card>
</template>

<style scoped>
.flexrow {
  display: flex;
  flex-direction: row;
  gap: .15rem;
  align-items: center;
  width: 100%;
}
</style>
<script>
import PlacingComponent from './PlacingComponent.vue'
import { store } from '../classess/store.js'

export default {
    name: "Results",
    props: ['showData'],
    data() {
        return {
            defaultViewSelected: {
                label: 'Show Results',
                icon: 'pi pi-fw pi-home',
                to: '/showresultsview'
            },
            /*placingDataList: [],*/
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
            /*showDataList: [],
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
                    label: 'Class Results',
                    icon: 'fa-solid fa-horse',
                    to: '/classresultsview'
                },
                {
                    label: 'Horse Results',
                    icon: 'fa-solid fa-horse',
                    to: '/horseresultsview'
                },
                {
                    label: 'Sire Results',
                    icon: 'fa-solid fa-horse',
                    to: '/sireresultsview'
                },
                {
                    label: 'Dam Results',
                    icon: 'fa-solid fa-horse',
                    to: '/damresultsview'
                }
            ],
        };
    },
    components: {
        PlacingComponent
    },
    methods: {
        getShowData() {
            fetch(this.defaultFileSelected.file)
                .then(response => response.json())
                .then(data => (
                    //showDataList = data
                    store.showData = data
                    //this.showDataList = new showViewData(data)
                    //this.horseDataList = new showViewData(data).ReturnHorseResults()
                    //this.horseDataList = Array.from(new showViewData(data).ReturnHorseResults()).map(([name, value]) => ({value}))
                    //this.horseData = new showViewData(data).ReturnHorseResults()
                    //this.horseDataList = this.horseData.map(d => Array.from(Object.values(d)))
                ))
        },
        changeView() {
            this.$router.push({ path: this.defaultViewSelected.to })
            //this.$router.push('/')
        }
    },
    created: function () {
        //defaultFileSelected = defaultFile;
        this.getShowData();
        //showDataList = showData
    }
};
</script>