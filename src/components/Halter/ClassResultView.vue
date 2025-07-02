<template>
    <DataTable v-model:expandedRows="expandedRows" :value="Array.from(classData.values())" stripedRows
        @rowExpand="onRowExpand" @rowCollapse="onRowCollapse" dataKey="class" :class="p-datatable-sm"
        tableStyle="min-width: 50rem" sortField="class" :sortOrder="1">
        <template #header>
            <div class="flex flex-wrap justify-content-end gap-2">
                <Button text icon="pi pi-plus" label="Expand" @click="expandAll" />
                <Button text icon="pi pi-minus" label="Collapse" @click="collapseAll" />
            </div>
        </template>
        <Column expander style="width: 1rem" />
        <Column field="class" header="Class" sortable></Column>
        <Column field="classCount" header="Class Count" sortable></Column>

        <template #expansion="slotExpansion">
            <div class="p-1">
                <DataTable v-model:expandedRows="expandedHorseRows" :value="slotExpansion.data.horses" @rowExpand="onRowExpand"
                @rowCollapse="onRowCollapse" dataKey="registrationNumber" :class="p-datatable-sm" tableStyle="min-width: 50rem"
                sortField="showTotals" :sortOrder="-1">
                    <Column expander style="width: 1rem" />
                    <Column field="registrationNumber" header="Registration" sortable></Column>
                    <Column field="horseName" header="Horse" sortable></Column>
                    <Column field="owner" header="Owner" sortable></Column>
                    <Column field="sire" header="Sire" sortable></Column>
                    <Column field="dam" header="Dam" sortable></Column>
                    <Column field="showTotals" header="Total Points" sortable>
                        <!--<template #body="slotProps">
                            {{ store.pointsSummary(slotProps.data.shows) }}
                        </template>-->
                    </Column>
                    <template #expansion="slotProps">
                        <div class="p-1">
                            <DataTable v-model:expandedRows="expandedShowRows" :value="slotProps.data.shows" @rowExpand="onRowExpand"
                @rowCollapse="onRowCollapse" dataKey="show" :class="p-datatable-sm" tableStyle="min-width: 50rem">
                                <Column field="show" header="Show" sortable></Column>                                
                                <Column field="class" header="Class" sortable></Column>
                                <Column field="placing" header="Placing" sortable></Column>
                                <Column field="championshipPoints" header="Championship Points" sortable></Column>
                                <Column field="placingPoints" header="Placing Points" sortable></Column>
                                <Column field="pointsTotal" header="Points" sortable>
                                    <!--<template #body="slotProps">
                                        {{ store.sumTotalPoints(slotProps.data,slotExpansion.data.classes[slotProps.index].classType,slotExpansion.data.halterHorseCount) }}
                                    </template>-->
                                </Column>
                            </DataTable>
                        </div>
                    </template>
                </DataTable>
            </div>

        </template>

    </DataTable>
</template>

<style>
    
</style>

<script>
import PlacingComponent from '../PlacingComponent.vue'
import { showViewData } from '../../classess/showResults.js'
import { store } from '../../classess/store.js'

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
            expandedRows: [],
            expandedHorseRows: [],
            expandedClassRows: []
        };
    },
    components: {
        PlacingComponent
    },
    methods: {
        expandAll() {
            this.expandedRows = Array.from(this.classData.values()).filter((p) => p.class);
        },
        collapseAll() {
            this.expandedRows = null;
        },
    },
    computed: {
        classData() {
            return new showViewData(store.showData).ReturnClassResults()
        },

    },
    created: function () {
    }
};
</script>