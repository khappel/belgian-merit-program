<template>
    <DataTable v-model:expandedRows="expandedRows" :value="Array.from(horseData.values())" stripedRows
        @rowExpand="onRowExpand" @rowCollapse="onRowCollapse" dataKey="registrationNumber" :class="p-datatable-sm"
        tableStyle="min-width: 50rem" sortField="showTotals" :sortOrder="-1">
        <template #header>
            <div class="flex flex-wrap justify-content-end gap-2">
                <Button text icon="pi pi-plus" label="Expand" @click="expandAll" />
                <Button text icon="pi pi-minus" label="Collapse" @click="collapseAll" />
            </div>
        </template>
        <Column expander style="width: 1rem" />
        <Column field="registrationNumber" header="Registraion" sortable></Column>
        <Column field="horseName" header="Horse" sortable></Column>
        <Column field="owner" header="Owner" sortable></Column>
        <Column field="sire" header="Sire" sortable></Column>
        <Column field="dam" header="Dam" sortable></Column>
        <Column field="showTotals" header="Total Points" sortable>
            <!--<template #body="slotProps">
                {{ store.pointsSummary(slotProps.data.shows,slotProps.data.shows[0].class) }}
            </template>-->
        </Column>
        <template #expansion="slotExpansion">
            <div class="p-3">
                <DataTable :value="slotExpansion.data.shows" :class="p-datatable-sm">
                    <Column field="show" header="Show" sortable></Column>                    
                    <Column field="class" header="Class" sortable></Column>
                    <Column field="placing" header="Placing" sortable></Column>
                    <Column field="championshipPoints" header="Championship Points" sortable></Column>
                    <Column field="placingPoints" header="Placing Points" sortable></Column>
                    <Column field="pointsTotal" header="Points" sortable></Column>
                </DataTable>
            </div>
        </template>
    </DataTable>
</template>

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
            accordianCount: [],
            expandedRows: []
        };
    },
    components: {
        PlacingComponent
    },
    methods: {
        expandAll() {
            this.expandedRows = Array.from(this.horseData.values()).filter((p) => p.registrationNumber);
        },
        collapseAll() {
            this.expandedRows = null;
        },
    },
    computed: {
        horseData() {
            //var x = showViewData.showIndex(45);
            return new showViewData(store.showData).ReturnVersatilityResults()
        },

    },
    created: function () {
        //this.getShowData();
    }
};
</script>