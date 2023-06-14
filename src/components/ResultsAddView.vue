<template>
    <Card>
        <template #title>
            <Dropdown v-model="defaultFileSelected" :options="fileYears" optionLabel="year" placeholder="Select a year"
                class="w-full md:w-14rem" @update:modelValue="getShowData" />

            <Dropdown v-model="defaultShowSelected" :options="shows" optionLabel="show" placeholder="Select show(s)"
                class="w-full md:w-20rem" @update:modelValue="getShowData" />

        </template>
        <template #content>
            <Accordion :multiple="true" :activeIndex="setAccordianCount(showClasses.length)">
                <AccordionTab v-for="cls in showClasses" :key="cls.class" :header="cls.class">
                    <div>{{ cls }}</div>
                    <PlacingEntryComponent :ShowClass="cls"></PlacingEntryComponent>

                </AccordionTab>
            </Accordion>

        </template>
    </Card>
</template>

<script>
import PlacingEntryComponent from './PlacingEntryComponent.vue'
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
            shows: [],*/
            showClasses: [],
            showDataList: [],
            accordianCount: [],
        };
    },
    components: {
        PlacingEntryComponent
    },
    methods: {
        getShowData() {
            this.showDataList = store.showData;
            if (this.showDataList.classsess != null) {
                this.showClasses = this.showDataList.classsess
            }
            /*fetch(this.defaultFileSelected.file)
                .then(response => response.json())
                .then(function (data) {
                    this.showDataList = data.find(({ show }) => show === this.defaultShowSelected.show)

                    if (this.showDataList.classess != null) {
                        this.showClasses = this.showDataList.classes
                    }


                });*/
        },
        getShowDef() {
            fetch("Definition Files/Shows.json")
                .then(response => response.json())
                .then(data => (this.shows = data));
        },
        getClassDef() {
            fetch("Definition Files/Classes.json")
                .then(response => response.json())
                .then(data => (this.showClasses = data));
        },
        setAccordianCount(length) {
            let arr = [];
            for (let i = 0; i < length; i++) {
                arr.push(i);
            }

            return arr;
        }
    },
    created: function () {
        this.getShowDef();
        this.getClassDef();
    }
};
</script>