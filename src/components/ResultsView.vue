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
                /*{
                    label: 'Horse Results',
                    icon: 'fa-solid fa-horse',
                    to: '/horseresultsview'
                },*/
                {
                    label: 'Sire Results',
                    icon: 'fa-solid fa-horse',
                    to: '/sireresultsview'
                },
                {
                    label: 'Dam Results',
                    icon: 'fa-solid fa-horse',
                    to: '/damresultsview'
                },
                {
                    label: 'Versatility Results',
                    icon: 'fa-solid fa-horse',
                    to: '/versatilityresultsview'
                }
            ],
            //ACCESS_TOKEN: {},
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
        async getShowFiles() {
            if (Object.keys(store.ACCESS_TOKEN).length === 0) {
                await store.getAccessToken();
            }

            if (Object.keys(store.ACCESS_TOKEN).length > 0) {
                var dbx = new Dropbox({ accessToken: store.ACCESS_TOKEN.access_token });

                dbx.filesListFolder({ path: '/Master Files' })
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

            /*dbx.filesDownload({
                path: "/MasterFiles/2022BelgianMeritPlacings.json"
            }).then(function (response) {
                store.showData = response.data
            })*/
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
                        store.showData = new showViewData(JSON.parse(reader.result)).CleanupShowData();
                        
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
        //async getAccessToken() {
        //    const REFRESH_TOKEN = "qUeWkhRi2LkAAAAAAAAAAYOQK2eHCE3MZX3EIFoM9x4WxnglJcoHj7I_e-Z4Jkc1";
        //    const CI = "54g6f5g8af25kk4";
        //    const CS = "09b2xez7yiy40uj";

        //    await fetch("https://api.dropbox.com/oauth2/token?refresh_token=qUeWkhRi2LkAAAAAAAAAAYOQK2eHCE3MZX3EIFoM9x4WxnglJcoHj7I_e-Z4Jkc1&grant_type=refresh_token&client_id=54g6f5g8af25kk4&client_secret=09b2xez7yiy40uj", {
        //        method: 'POST',
        //        mode: 'cors',
        //        cache: 'no-cache',
        //        headers: {
        //            'Content-Type': 'application/json'
        //        },
        //    })
        //        .then((response) => {
        //            if (response.status === 404) {
        //                throw new Error('404 (Not Found)');
        //            } else {
        //                return response.json().then((json) => {
        //                    console.log('save poster response: ', json);
        //                    this.ACCESS_TOKEN = json;
        //                });
        //            }
        //        });

        //    /*axios.get("https://api.dropbox.com/oauth2/token", {
        //        method: 'POST',
        //        mode: 'cors',
        //        cache: 'no-cache',
        //        headers: {
        //            'Content-Type': 'text/plain; charset=dropbox-cors-hack'
        //        },
        //        params: {

        //            refresh_token: REFRESH_TOKEN,
        //            grant_type: "refresh_token",
        //            client_id: CI,
        //            client_secret: CS,
        //        },
        //    })
        //        .then((response) => { this.ACCESS_TOKEN = response.data })*/


        //} 
    },
    created: function () {
        store.getAccessToken();
        //defaultFileSelected = defaultFile;
        this.getShowData();
        //showDataList = showData
    }
};
</script>