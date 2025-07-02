<template>
    <DataTable v-model:expandedRows="expandedRows" :value="Array.from(ownerData.values())" stripedRows
        @rowExpand="onRowExpand" @rowCollapse="onRowCollapse" dataKey="owner" :class="p-datatable-sm"
        tableStyle="min-width: 50rem" sortField="showTotals" :sortOrder="-1">
        <template #header>
            <div class="flex flex-wrap justify-content-end gap-2">
                <Button text icon="pi pi-plus" label="Expand" @click="expandAll" />
                <Button text icon="pi pi-minus" label="Collapse" @click="collapseAll" />
            </div>
        </template>
        <Column expander style="width: 1rem" />
        <Column field="owner" header="Owner" sortable></Column>
        <Column field="showTotals" header="Total Points" sortable>
        </Column>
        <template #expansion="slotProps">
            <div class="p-3">
                <DataTable :value="slotProps.data.shows">
                    <Column field="show" header="Show" sortable></Column>                    
                    <Column field="class" header="Class" sortable></Column>
                    <Column field="placing" header="Placing" sortable></Column>
                    <Column field="registrationNumber" header="Registration" sortable></Column>
                    <Column field="horseName" header="Horse" sortable></Column>
                    <Column field="sire" header="Sire" sortable></Column>
                    <Column field="dam" header="Dam" sortable></Column>
                    <Column field="championshipPoints" header="Championship Points" sortable></Column>
                    <Column field="placingPoints" header="Placing Points" sortable></Column>
                    <Column field="pointsTotal" header="Points" sortable>
                        <!--<template #body="slotProps">
                            {{ store.sumTotalPoints(slotProps.data,slotProps.data.class.classType,slotProps.data.halterHorseCount) }}
                        </template>-->
                    </Column>
                </DataTable>
            </div>
        </template>
    </DataTable>
</template>

<script>

import { showViewData } from '../../classess/showResults.js'
import { store } from '../../classess/store.js'

export default {
    name: "Results",
    data() {
        return {
            store,
            /*defaultFileSelected: {
                year: "2023-2024",
                file: "Placings/2023BelgianMeritPlacings.json"
            },
            ownerData: [],*/
            accordianCount: [],
            expandedRows: []
        };
    },
    components: {
    },
    methods: {       
        expandAll() {
            this.expandedRows = Array.from(this.ownerData.values()).filter((p) => p.owner);
        },
        collapseAll() {
            this.expandedRows = null;
        },
    },
    computed:{
        ownerData() {
            return new showViewData(store.showData).ReturnOwnerResults()
        }
    },
    created: function () {
        //this.getOwnerData();
    }
};
</script>