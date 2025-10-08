<template>
    <card>
        <template #title class="flexrow">
            <Dropdown v-model="defaultFileSelected" :options="fileYears" optionLabel="year" placeholder="Select a year"
                class="w-full md:w-27rem" @change="downloadFile()" />
            <Dropdown v-model="defaultViewSelected" :options="items" optionLabel="label" placeholder="Select a view"
                class="w-full md:w-12rem" @change="changeView()" />
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
import { store } from '../../classess/store.js'

export default {
    name: "Results",
    props: ['showData'],
    data() {
        return {
            defaultViewSelected: {
                label: 'Show Results',
                icon: 'pi pi-fw pi-home',
                to: '/hitchshowresultsview'
            },
            defaultFileSelected: {},
            fileYears: [],
            items: [
                {
                    label: 'Show Results',
                    icon: 'pi pi-fw pi-home',
                    to: '/hitchshowresultsview'
                },
                {
                    label: 'Exhibitor Results',
                    icon: 'pi pi-fw pi-plus-circle',
                    to: '/hitchexhibitorresultsview'
                },
                {
                    label: 'Class Results',
                    icon: 'fa-solid fa-horse',
                    to: '/hitchclassresultsview'
                },
            ],
        };
    },
    components: {
    },
    methods: {
        async getHitchShowData() {
            store.hitchShowData = [];

            await this.getShowFiles();
        },
        async getShowFiles() {
            try {
                const response = await store.getShowFiles("Hitch", this.fileYears, this.defaultFileSelected);

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
            store.downloadFile("Hitch", this.defaultFileSelected.file);
            this.changeView();
        },
        removeEmpty(obj) {

        },
        changeView() {
            this.$router.push({ path: this.defaultViewSelected.to })
            //this.$router.push('/')
        },
    },
    created: function () {
        store.getAccessToken();
        this.getHitchShowData();
    }
};
</script>