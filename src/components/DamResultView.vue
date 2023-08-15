<template>
    <DataTable v-model:expandedRows="expandedRows" :value="Array.from(horseData.values())" stripedRows
        @rowExpand="onRowExpand" @rowCollapse="onRowCollapse" dataKey="dam" :class="p-datatable-sm"
        tableStyle="min-width: 50rem">

        <Column expander style="width: 5rem" />        
        <Column field="dam" header="Dam"></Column>        
        <Column field="HorsePointsSummary" header="Total Points" sortable>
            <template #body="slotProps">
                {{ store.pointsSummary(slotProps.data.shows) }}
            </template>
        </Column>
        <template #expansion="slotProps">
            <div class="p-3">
                <DataTable :value="slotProps.data.shows" :class="p-datatable-sm">
                    <Column field="show" header="Show" sortable></Column>                    
                    <Column field="class" header="Class" sortable></Column>
                    <Column field="placing" header="Placing" sortable></Column>
                    <Column field="registrationNumber" header="Registraion"></Column>
                    <Column field="horseName" header="Horse"></Column>
                    <Column field="owner" header="Owner"></Column>
                    <Column field="sire" header="Sire"></Column>
                    <Column field="championshipPoints" header="Championship Points" sortable></Column>
                    <Column field="placingPoints" header="Placing Points" sortable></Column>
                    <Column field="pointsTotal" header="Points" sortable>
                        <template #body="slotProps">
                            {{ store.sumTotalPoints(slotProps.data,slotProps.data.class) }}
                        </template>
                    </Column>
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
            //placingDataList: [],
            //placingFile: 'Placings/2023BelgianMeritPlacings.json',           
            //storeShowData: store.showData,
            //horseData: refs(showViewData(store.showData).ReturnHorseResults()),
            //horseData: storeToRefs(showViewData(store.showData).ReturnHorseResults()),
            accordianCount: [],
            expandedRows: []
        };
    },
    components: {
        PlacingComponent
    },
    methods: {
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
        },
        /*sumTotalPoints(item) {
            return item.placingPoints + item.championshipPoints * this.showIndex(item.horseCount);
        },
        horsePointsSummary(itemClasses) {
            return itemClasses.reduce((partialSum, a) => partialSum + this.sumTotalPoints(a), 0);
        },
        showIndex(horseCount) {
            switch (true) {
                case horseCount >= 200:
                    return 9;
                    break;
                case horseCount >= 175:
                    return 8;
                    break;
                case horseCount >= 150:
                    return 7;
                    break;
                case horseCount >= 125:
                    return 6;
                    break;
                case horseCount >= 100:
                    return 5;
                    break;
                case horseCount >= 75:
                    return 4;
                    break;
                case horseCount >= 50:
                    return 3;
                    break;
                case horseCount >= 25:
                    return 2;
                    break;

                default:
                    return 1;
            }
        }*/
    },
    computed: {
        horseData() {
            return new showViewData(store.showData).ReturnDamResults()
        },

    },
    created: function () {
        //this.getShowData();
    }
};
</script>