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
import { showViewData } from '../classess/showResults.js'

export default {
    name: "Results",
    props: ['showData'],
    data() {
        return {
            defaultViewSelected: {
                label: 'Show Results',
                icon: 'pi pi-fw pi-home',
                to: '/youthresultsview'
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
                    to: '/youthshowresultsview'
                },
                {
                    label: 'Exhibitor Results',
                    icon: 'pi pi-fw pi-plus-circle',
                    to: '/youthexhibitorresultsview'
                },
                {
                    label: 'Class Results',
                    icon: 'fa-solid fa-horse',
                    to: '/youthclassresultsview'
                },                
            ],
            //ACCESS_TOKEN: {},
        };
    },
    components: {
        PlacingComponent
    },
    methods: {
        getYouthShowData() {
            store.youthShowData = [];

            this.getShowFiles();
        },
        async getShowFiles() {
            if (Object.keys(store.ACCESS_TOKEN).length === 0) {
                await store.getAccessToken();
            }

            if (Object.keys(store.ACCESS_TOKEN).length > 0) {
                var dbx = new Dropbox({ accessToken: store.ACCESS_TOKEN.access_token });

                dbx.filesListFolder({ path: '/Youth Master Files' })
                    .then((response) => {
                        response.result.entries.forEach(entry => {
                            this.fileYears.push({ year: entry.name, file: entry.id })
                            this.fileYears.sort(function (a, b) { return a.name - b.name }).reverse();
                            this.defaultFileSelected = this.fileYears[0];
                            this.downloadFile();
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                    });

            }
        },
        downloadFile() {
            if (Object.keys(store.ACCESS_TOKEN).length === 0) {
                store.getAccessToken();
            }

            var dbx = new Dropbox({ accessToken: store.ACCESS_TOKEN.access_token });

            dbx.filesDownload({ path: this.defaultFileSelected.file })
                .then(function (response) {
                    var blob = response.result.fileBlob;
                    var reader = new FileReader();

                    reader.addEventListener("loadend", function () {
                        //clean up shows
                        store.youthShowData = new showViewData(JSON.parse(reader.result)).CleanupYouthShowData();
                        
                    });

                    if (blob != undefined) {
                        reader.readAsText(blob);
                    }


                })
                .catch(function (error) {
                })
        },
        removeEmpty(obj){

        },
        changeView() {
            this.$router.push({ path: this.defaultViewSelected.to })
            //this.$router.push('/')
        },      
    },
    created: function () {
        store.getAccessToken();
        //defaultFileSelected = defaultFile;
        this.getYouthShowData();
        //showDataList = showData
    }
};
</script>