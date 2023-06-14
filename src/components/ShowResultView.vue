<template>
    <Accordion :multiple="true" :activeIndex="setAccordianCount(showDataList.length)">
                <AccordionTab v-for="show in showDataList" :key="show.show" :header="show.show">
                    <div v-for="cls in show.classes">
                        <PlacingComponent :ShowClass=cls.class :Placings=cls.placings :HorseCount=show.horseCount />
                    </div>
                </AccordionTab>
            </Accordion>
    <Card>
        <template #title>
            <!--<MultiSelect v-model="defaultShowSelected" :options="shows" optionLabel="show" placeholder="Select show(s)"
                :maxSelectedLabels="5" class="w-full md:w-20rem" @update:modelValue="getShowData" />-->

        </template>
        <template #content>            
            
        </template>
    </Card>
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
            showDataList: [],
            accordianCount: [],
        };
    },
    components: {
        PlacingComponent
    },
    methods: {
        getShowData() {
            this.showDataList = store.showData
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
    created: function () {
        this.getShowData();
    }
};
</script>