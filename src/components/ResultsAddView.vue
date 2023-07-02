<template>
    <Card>
        <template #title>
            <Button label="New" icon="pi pi-plus" class="mr-2" />
            <Button label="Open" icon="pi pi-upload" severity="success" class="mr-2" />
            <Button label="Save" icon="" class="mr-2" />
        
        </template>
        <template #content>
            <form @submit="handleSubmit" class="placing-form; mr-0">
                <h1>Enter Results</h1>
                <div class="flex flex-row gap-2" style="align-items: center;">
                    <Dropdown v-model="defaultFileSelected" :options="fileYears" optionLabel="year"
                        placeholder="Select a year" class="w-full md:w-14rem" @update:modelValue="getShowData" />

                    <Dropdown v-model="defaultShowSelected" :options="shows" optionLabel="show" placeholder="Select show(s)"
                        class="w-full md:w-20rem" @update:modelValue="getShowData" />
                </div>
                <div class="flex flex-row gap-2" style="align-items: center;">
                    <label for="form.horseCount">Horse Count</label>
                    <InputNumber v-model="form.horseCount" inputId="integeronly" required />
                </div>

                <Accordion :multiple="true" :activeIndex="setAccordianCount(form.showClasses.length)">
                    <AccordionTab v-for="cls in form.showClasses" :key="cls.class" :header="cls.class">
                        <PlacingEntryComponent :ShowClass="cls" :placings="cls.placings"
                            @input="(e, c) => handleChange(e, c)"></PlacingEntryComponent>

                    </AccordionTab>
                </Accordion>
                <button>Submit</button>
            </form>

            {{ form }}


        </template>
    </Card>
</template>

<script>
import PlacingEntryComponent from './PlacingEntryComponent.vue'
import { store } from '../classess/store.js'
import { reactive } from "vue";

export default {
    name: "Results",
    data() {
        return {
            store,
            shows: [],
            showClasses: [],
            showDataList: [],
            accordianCount: [],
            form: { "show": "", "horseCount": 0, "showClasses": [] }
        };
    },
    components: {
        PlacingEntryComponent
    },
    methods: {
        getShowData() {
            this.showDataList = store.showData;
            if (this.showDataList.classes != null) {
                this.form.showClasses = this.showDataList.classsess
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
                .then(data => (this.form.showClasses = data));
        },
        setAccordianCount(length) {
            let arr = [];
            for (let i = 0; i < length; i++) {
                arr.push(i);
            }

            return arr;
        },
        handleSubmit() {
            var y = form;
        },
        handleChange(placing, showclass) {
            const foundClass = this.form.showClasses.find(c => c.class == showclass.class);
            if (foundClass != null) {
                foundClass.placings = placing;
            }
            else {
                this.form.showClasses.push({ showclass, placing })
            }

        },
        addResults() {

        }
    },
    /*setup() {
    const form: reactive([
                {"show": "",
                "horseCount": 0,
                "classes": [
                    {
                        "class": "",
                        "placings": [
                            {
                                "placing": 0,
                                "registrationNumber": "",
                                "horseName": "",
                                "owner": "",
                                "sire": "",
                                "dam": "",
                                "ChampionshipPoints": 0,
                                "placingPoints": 0
                            }
                        ]
                    }
                ]}]);
    return {
      form
    };
  },*/
    created: function () {
        this.getShowDef();
        this.getClassDef();
    }
};
</script>