<template>
    <DataTable v-model:expandedRows="expandedRows" :value="showDataList" @rowExpand="onRowExpand"
        @rowCollapse="onRowCollapse" dataKey="show" :class="p-datatable-sm" tableStyle="min-width: 50rem">

        <Column expander style="width: 5rem" />
        <Column field="show" header="Show" sortable></Column>
        <Column field="horseCount" header="Horse Count"></Column>

        <template #expansion="slotProps">
            <!--<div v-for="cls in slotProps.data.classes">
                <PlacingComponent :ShowClass=cls.class :Placings=cls.placings :HorseCount=slotProps.data.horseCount />
            </div>-->
            <DataTable v-model:expandedRows="expandedClassRows" :value="slotProps.data.classes" @rowExpand="onRowExpand"
                @rowCollapse="onRowCollapse" dataKey="class" :class="p-datatable-sm" tableStyle="min-width: 50rem">
                <Column expander style="width: 5rem" />
                <Column field="class" header="Classes" sortable></Column>

                <template #expansion="slotProps">
                    <DataTable :value="slotProps.data.placings" stripedRows :class="p-datatable-sm"
                        tableStyle="min-width: 50rem">
                        
                        <Column field="placing" header="Placing"></Column>
                        <Column field="registrationNumber" header="Registraion"></Column>
                        <Column field="horseName" header="Horse"></Column>
                        <Column field="sire" header="Sire"></Column>
                        <Column field="dam" header="Dam"></Column>
                        <Column field="ChampionshipPoints" header="Championship Points"></Column>
                        <Column field="placingPoints" header="Placing Points"></Column>
                        <Column field="pointsTotal" header="Total Points" sortable>
                            <template #body="slotProps">
                                {{ sumTotalPoints(slotProps.data) }}
                            </template>
                        </Column>
                    </DataTable>
                </template>
            </DataTable>
        </template>
    </DataTable>


    <!--<Accordion :multiple="true" :activeIndex="setAccordianCount(showDataList.length)">
                <AccordionTab v-for="show in showDataList" :key="show.show" :header="show.show">
                    <div v-for="cls in show.classes">
                        <PlacingComponent :ShowClass=cls.class :Placings=cls.placings :HorseCount=show.horseCount />
                    </div>
                </AccordionTab>
            </Accordion>-->
    <!--<Card>
        <template #title>
            <MultiSelect v-model="defaultShowSelected" :options="shows" optionLabel="show" placeholder="Select show(s)"
                :maxSelectedLabels="5" class="w-full md:w-20rem" @update:modelValue="getShowData" />

        </template>
        <template #content>            
            
        </template>
    </Card>-->
</template>

<script>
import PlacingComponent from './PlacingComponent.vue'
import { store } from '../classess/store.js'

export default {
    name: "Results",
    data() {
        return {
            store,
            /*placingDataList: [],
            placingFile: 'Placings/2023BelgianMeritPlacings.json',
            defaultFileSelected: {
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
            //showDataList: getShowData(),
            accordianCount: [],
            expandedRows: [],
            expandedClassRows: []
        };
    },
    components: {
        PlacingComponent
    },
    methods: {
        sumTotalPoints(item) {
            return item.placingPoints + item.ChampionshipPoints * this.showIndex(this.HorseCount);
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
        },
        /*getShowData() {
            fetch(this.defaultFileSelected.file)
                .then(response => response.json())
                .then(data => (this.showDataList = data));
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
        showDataList() {
            return store.showData
            //this.showDataList = store.showData
        }
    },
    created: function () {
        //this.getShowData();
    }
};
</script>