<template>
     <DataTable v-model:expandedRows="expandedRows" :value="Array.from(horseData.values())" stripedRows
                    @rowExpand="onRowExpand" @rowCollapse="onRowCollapse" dataKey="registrationNumber"
                    :class="p - datatable - sm" tableStyle="min-width: 50rem">
                   
                    <Column expander style="width: 5rem" />
                    <Column field="registrationNumber" header="Registraion"></Column>
                    <Column field="horseName" header="Horse"></Column>
                    <Column field="owner" header="Owner"></Column>
                    <Column field="sire" header="Sire"></Column>
                    <Column field="dam" header="Dam"></Column>
                    <template #expansion="slotProps">
                        <div class="p-3">                            
                            <DataTable :value="slotProps.data.shows">                                
                                <Column field="show" header="Show" sortable></Column>
                                <Column field="horseCount" header="HorseCount" sortable></Column>
                                <Column field="class" header="Class" sortable></Column>
                                <Column field="championshipPoints" header="Championship Points" sortable></Column>
                                <Column field="placingPoints" header="Placing Points" sortable></Column>
                               <!-- <Column field="pointsTotal" header="Points" sortable>
                                    <template #body="slotProps">
                                        <Tag :value="slotProps.data.status.toLowerCase()"
                                            :severity="getOrderSeverity(slotProps.data)" />
                                    </template>
                                </Column>
                                -->
                            </DataTable>
                        </div>
                    </template>
                </DataTable>    
</template>

<script>
import PlacingComponent from './PlacingComponent.vue'
import { showViewData } from '../classess/showResults.js'
import { store } from '../classess/store.js'

export default {
    name: "Results",
    props: ['showData'],
    data() {
        return {
            store,
            placingDataList: [],
            placingFile: 'Placings/2023BelgianMeritPlacings.json',
            /*defaultFileSelected: {
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
            ],*/
            storeShowData: store.showData,
            horseData: refs(showViewData(store.showData).ReturnHorseResults()),
            //horseData: storeToRefs(showViewData(store.showData).ReturnHorseResults()),
            accordianCount: [],
            expandedRows: []
        };
    },
    components: {
        PlacingComponent
    },
    methods: {
        getShowData(){
            //this.horseData = new showViewData(store.showData).ReturnHorseResults()
        },
        /*getShowData() {
            fetch(this.defaultFileSelected.file)
                .then(response => response.json())
                .then(data => (
                    //this.showDataList = data,
                    //this.horseDataList = new showViewData(data).ReturnHorseResults()
                    //this.horseDataList = Array.from(new showViewData(data).ReturnHorseResults()).map(([name, value]) => ({value}))
                    this.horseData = new showViewData(data).ReturnHorseResults()
                    //this.horseDataList = this.horseData.map(d => Array.from(Object.values(d)))
                ))
        },*/
        setAccordianCount(length) {
            let arr = [];
            for (let i = 0; i < length; i++) {
                arr.push(i);
            }

            return arr;
        }
    },
    computed: {
        totalPoints(){

        }

    },
    created: function () {
        //this.getShowData();
    }
};
</script>