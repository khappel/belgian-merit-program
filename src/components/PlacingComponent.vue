<template>
    <!--<Panel toggleable>
        <template #header> {{ ShowClass }} </template>-->
        <div class="card">
            <DataTable :value="Placings" stripedRows :class="p-datatable-sm" tableStyle="min-width: 50rem">
                <template #header>
                    <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                        <span class="text-base text-900 font-bold">{{ShowClass}}</span>
                        <!---<Button icon="pi pi-refresh" rounded raised />-->
                    </div>
                </template>
                <Column field="placing" header="Placing"></Column>
                <Column field="registrationNumber" header="Registraion"></Column>
                <Column field="horseName" header="Horse"></Column>
                <Column field="sire" header="Sire"></Column>
                <Column field="dam" header="Dam"></Column>
                <Column field="championshipPoints" header="Championship Points"></Column>
                <Column field="placingPoints" header="Placing Points"></Column>
                <Column field="pointsTotal" header="Total Points" sortable>
                        <template #body="slotProps">
                            {{ sumTotalPoints(slotProps.data) }}
                        </template>
                    </Column>
            </DataTable>
        </div>

    <!--</Panel>-->
</template>

<script>
export default {
    props: {
        ShowClass: String,
        Placings: Array,
        HorseCount: Number,
    },
    methods:{
        sumTotalPoints(item) {
            return item.placingPoints + item.championshipPoints * this.showIndex(this.HorseCount);
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
    }


}
</script>

<!-- 
    "placings": [
                    {
                        "placing": 1,
                        "registrationNumber": "S7000",
                        "horseName": "T-Rex",
                        "owner": "smith, sam",
                        "sire": "tt",
                        "dam": "ff",
                        "championshipPoints": 6,
                        "placingPoints": 10
                    }]
-->