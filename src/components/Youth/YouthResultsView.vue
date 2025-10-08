<template>
    <card>
        <template #title class="flexrow">
            <Dropdown v-model="defaultFileSelected" :options="fileYears" optionLabel="year" placeholder="Select a year"
                class="w-full md:w-27rem" @change="downloadFile()" />
            <Dropdown v-model="defaultViewSelected" :options="items" optionLabel="label" placeholder="Select a view"
                class="w-full md:w-12rem" @change="changeView()" />
            
            <router-view />
        </template>
        <!--<template #content>
                      
        </template>-->
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
import { store } from '../../classess/store.js'

export default {
    name: "Results",
    props: ['showData'],
    data() {
        return {
            defaultViewSelected: {
                label: 'Show Results',
                icon: 'pi pi-fw pi-home',
                to: '/youthresultsview/youthshowresultsview'
            },
            defaultFileSelected: {},
            fileYears: [],
            items: [
                {
                    label: 'Show Results',
                    icon: 'pi pi-fw pi-home',
                    to: '/youthresultsview/youthshowresultsview'
                },
                {
                    label: 'Exhibitor Results',
                    icon: 'pi pi-fw pi-plus-circle',
                    to: '/youthresultsview/youthexhibitorresultsview'
                },
                {
                    label: 'Class Results',
                    icon: 'fa-solid fa-horse',
                    to: '/youthresultsview/youthclassresultsview'
                },                
            ],
        };
    },
    components: {
    },
    methods: {
        getYouthShowData() {
            store.youthShowData = [];

            this.getShowFiles();
        },
        async getShowFiles() {
            try {
                const response = await store.getShowFiles("Youth", this.fileYears, this.defaultFileSelected);
                
                if (response.length > 0) {
                    this.fileYears = response;
                    this.defaultFileSelected = this.fileYears[0];
                    this.changeView();
                }
            } catch (error) {
                console.error("Error fetching show files:", error);
            }
        },
        downloadFile(){
            store.downloadFile("Youth", this.defaultFileSelected.file);
            this.changeView();
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
        this.getYouthShowData();        
    }
};
</script>