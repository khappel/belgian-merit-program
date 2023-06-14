<template>
    <DataTable v-model:expandedRows="expandedRows" :value="Array.from(ownerData.values())" stripedRows
        @rowExpand="onRowExpand" @rowCollapse="onRowCollapse" dataKey="owner" :class="p - datatable - sm"
        tableStyle="min-width: 50rem">

        <Column expander style="width: 5rem" />
        <Column field="owner" header="Owner"></Column>
        <Column field="ExhibitorPointsSummary" header="Total Points" sortable>
            <template #body="slotProps">
                {{ ExhibitorPointsSummary(slotProps.data.shows) }}
            </template>
        </Column>
        <template #expansion="slotProps">
            <div class="p-3">
                <DataTable :value="slotProps.data.shows">
                    <Column field="show" header="Show" sortable></Column>
                    <Column field="horseCount" header="HorseCount" sortable></Column>
                    <Column field="class" header="Class" sortable></Column>
                    <Column field="registrationNumber" header="Registraion"></Column>
                    <Column field="horseName" header="Horse"></Column>
                    <Column field="sire" header="Sire"></Column>
                    <Column field="dam" header="Dam"></Column>
                    <Column field="championshipPoints" header="Championship Points" sortable></Column>
                    <Column field="placingPoints" header="Placing Points" sortable></Column>
                    <Column field="pointsTotal" header="Points" sortable>
                        <template #body="slotProps">
                            {{ sumTotalPoints(slotProps.data) }}
                        </template>
                    </Column>
                </DataTable>
            </div>
        </template>
    </DataTable>
</template>

<script>

import { showViewData } from '../classess/showResults.js'
import { store } from '../classess/store.js'

export default {
    name: "Results",
    data() {
        return {
            store,
            /*defaultFileSelected: {
                year: "2023-2024",
                file: "Placings/2023BelgianMeritPlacings.json"
            },*/
            ownerData: [],
            accordianCount: [],
            expandedRows: []
        };
    },
    components: {
    },
    methods: {
        getOwnerData() {
            this.ownerData = new showViewData(store.showData).ReturnOwnerResults()
        },
        /*getOwnerData() {
            fetch(this.defaultFileSelected.file)
                .then(response => response.json())
                .then(data => (                    
                    this.ownerData = new showViewData(data).ReturnOwnerResults()                    
                ))
        },*/
        setAccordianCount(length) {
            let arr = [];
            for (let i = 0; i < length; i++) {
                arr.push(i);
            }

            return arr;
        },

        sumTotalPoints(item) {
            return item.placingPoints + item.championshipPoints * this.showIndex(item.horseCount);
        },
        ExhibitorPointsSummary(itemClasses) {
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
        }
    },
    created: function () {
        this.getOwnerData();
    }
};
</script>