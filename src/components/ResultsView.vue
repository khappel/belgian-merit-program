<template>
    <card>
        <template #title class="flexrow">
            <Dropdown v-model="defaultFileSelected" :options="fileYears" optionLabel="year" placeholder="Select a year"
                class="w-full md:w-14rem" @change="downloadFile()" />
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
import axios from 'axios'
import { Dropbox } from 'dropbox';
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
            defaultFileSelected: {},
            fileYears: [],
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

            /* const config = {
                 headers: {
 
                 }
             };*/

            store.showData = [];

            this.getShowFiles();

            /*axios.get(this.defaultFileSelected.file, {
                method: 'GET',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                params: {
                    dl: '1',
                },
                withCredentials: false,

            })
                .then((response) => { store.showData = response.data })
*/

            /*fetch(this.defaultFileSelected.file)
                .then(response => response.json())
                .then(data => (
                    //showDataList = data
                    store.showData = data
                    //this.showDataList = new showViewData(data)
                    //this.horseDataList = new showViewData(data).ReturnHorseResults()
                    //this.horseDataList = Array.from(new showViewData(data).ReturnHorseResults()).map(([name, value]) => ({value}))
                    //this.horseData = new showViewData(data).ReturnHorseResults()
                    //this.horseDataList = this.horseData.map(d => Array.from(Object.values(d)))
                ))*/
        },
        getShowFiles() {
            const ACCESS_TOKEN = 'sl.Bh97ZtdCHg_U-R2kt5luBO738ClLfdoinsorMQse-6X1YmDX4gmoJYQMXkfPv1A7iJ3oZY3zzQDHLY5s2mfDc-dm-DsiqVlJxB7q9SMLhAj3mVLywenZ-UZiCZTZxLQSXNeakaX_';

            var dbx = new Dropbox({ accessToken: ACCESS_TOKEN });

            dbx.filesListFolder({ path: '/Master Files' })
                .then((response) => {
                    response.result.entries.forEach(entry => {
                        this.fileYears.push({ year: entry.name, file: entry.id })
                        this.fileYears.sort(function (a, b) { return a.name - b.name });
                        this.defaultFileSelected = this.fileYears[0];
                    });
                })
                .catch((err) => {
                    console.log(err);
                });

            /*dbx.filesDownload({
                path: "/MasterFiles/2022BelgianMeritPlacings.json"
            }).then(function (response) {
                store.showData = response.data
            })*/
        },
        downloadFile() {
            const ACCESS_TOKEN = 'sl.Bh97ZtdCHg_U-R2kt5luBO738ClLfdoinsorMQse-6X1YmDX4gmoJYQMXkfPv1A7iJ3oZY3zzQDHLY5s2mfDc-dm-DsiqVlJxB7q9SMLhAj3mVLywenZ-UZiCZTZxLQSXNeakaX_';

            var dbx = new Dropbox({ accessToken: ACCESS_TOKEN });

            dbx.filesDownload({ path: this.defaultFileSelected.file })
                .then(function (response) {
                    var blob = response.result.fileBlob;
                    var reader = new FileReader();

                    reader.addEventListener("loadend", function () {
                        store.showData = JSON.parse(reader.result);
                        
                    });

                if (blob != undefined){
                    reader.readAsText(blob);
                }
                    

                })
                .catch(function (error) {
                })
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