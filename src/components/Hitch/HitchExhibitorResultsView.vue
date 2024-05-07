<template>
    <DataTable v-model:expandedRows="expandedRows" :value="Array.from(exhibitorData.values())" stripedRows
        @rowExpand="onRowExpand" @rowCollapse="onRowCollapse" dataKey="membershipNum" :class="p - datatable - sm"
        tableStyle="min-width: 50rem" sortField="title" :sortOrder="-1">
        <template #header>
            <div class="flex flex-wrap justify-content-end gap-2">
                <Button text icon="pi pi-plus" label="Expand" @click="expandAll" />
                <Button text icon="pi pi-minus" label="Collapse" @click="collapseAll" />
            </div>
        </template>

        <Column expander style="width: 1rem" />
        <Column field="hitchFarmName" header="Farm name" sortable></Column>
        <Column field="membershipNum" header="Membership #" sortable></Column>
        <Column field="showTotals" header="Total Points" sortable></Column>
        <template #expansion="slotPropsA">
            <div class="p-3">
                <DataTable :value="slotPropsA.data.shows" sortField="show" :sortOrder="-1">
                    <Column field="show" header="Show" sortable></Column>
                    <Column field="class" header="Class" sortable></Column>
                    <Column field="placing" header="Placing" sortable></Column>
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
            accordianCount: [],
            expandedRows: [],
            expandedHitchRows: []
        };
    },
    components: {
    },
    methods: {
        expandAll() {
            this.expandedRows = Array.from(this.exhibitorData.values()).filter((p) => p.youth);
        },
        collapseAll() {
            this.expandedRows = null;
        },
    },
    computed: {
        exhibitorData() {
            return new showViewData(store.hitchShowData).ReturnHitchExhibitorResults()
        }
    },
    created: function () {
        //this.getOwnerData();
    }
};
</script>