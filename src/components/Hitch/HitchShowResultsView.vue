<template>
    <DataTable v-model:expandedRows="expandedRows" :value="showDataList" @rowExpand="onRowExpand"
        @rowCollapse="onRowCollapse" dataKey="show" :class="p-datatable-sm" tableStyle="min-width: 50rem">
        <template #header>
            <div class="flex flex-wrap justify-content-end gap-2">
                <Button text icon="pi pi-plus" label="Expand" @click="expandAll" />
                <Button text icon="pi pi-minus" label="Collapse" @click="collapseAll" />
            </div>
        </template>
        <Column expander style="width: 1rem" />
        <Column field="show" header="Show" sortable></Column>
        <Column field="hitchCount" header="Hitch Count"></Column>

        <template #expansion="slotPropsClass">
            <!--<div v-for="cls in slotProps.data.classes">
                <PlacingComponent :ShowClass=cls.class :Placings=cls.placings :HorseCount=slotProps.data.horseCount />
            </div>-->
            <DataTable v-model:expandedRows="expandedClassRows" :value="slotPropsClass.data.classes" @rowExpand="onRowExpand"
                @rowCollapse="onRowCollapse" dataKey="class" :class="p-datatable-sm" tableStyle="min-width: 50rem">
                <Column expander style="width: 1rem" />
                <Column field="class" header="Classes" sortable></Column>
                <Column field="classCount" header="Class Count" sortable></Column>

                <template #expansion="slotProps">
                    <DataTable :value="slotProps.data.placings" stripedRows :class="p-datatable-sm"
                        tableStyle="min-width: 50rem">
                        
                        <Column field="placing" header="Placing"></Column>
                        <Column field="hitchFarmName" header="Hitch/Farm Name"></Column>
                        <Column field="membershipNum" header="Membership #"></Column>
                        <Column field="championshipPoints" header="Championship Points"></Column>
                        <Column field="placingPoints" header="Placing Points"></Column>
                        <Column field="pointsTotal" header="Total Points" sortable>
                            <!--<template #body="slotProps">
                               {{ store.sumTotalPoints(slotProps.data,slotPropsClass.data.classes[slotProps.index].classType,slotPropsClass.data.halterHorseCount) }}
                            </template>-->
                        </Column>
                    </DataTable>
                </template>
            </DataTable>
        </template>
    </DataTable>
</template>

<script>
import PlacingComponent from '../PlacingComponent.vue'
import { store } from '../../classess/store.js'

export default {
    name: "Results",
    data() {
        return {
            store,            
            accordianCount: [],
            expandedRows: [],
            expandedClassRows: []
        };
    },
    components: {
        PlacingComponent
    },
    methods: {
        expandAll() {
            this.expandedRows = this.showDataList.filter((p) => p.show);
        },
        collapseAll() {
            this.expandedRows = null;
        },        
    },
    computed: {
        showDataList() {
            return store.hitchShowData
            //this.showDataList = store.showData
        }
    },
    created: function () {
        //this.getShowData();
    }
};
</script>