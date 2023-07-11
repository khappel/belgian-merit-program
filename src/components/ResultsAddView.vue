<template>
    <Card class="m-0">
        <template #title>
            <Button label="New" icon="pi pi-plus" class="mr-2" @click="SetNewMode" />
            <input type="file" accept=".json" ref="file" style="display:none" @change="ReadFile" />
            <Button label="Open" icon="pi pi-upload" severity="success" class="mr-2" @click="OpenFile" />
            <Button label="Save" icon="" class="mr-2" @click="SaveFile" />

        </template>
        <template #content class="m-0">
            <Fieldset legend="Show" class="w-full m-1 p-1" :toggleable="true">
                <Dropdown v-model="defaultFileSelected" :options="fileYears" optionLabel="year" placeholder="Select a year"
                    class="w-full mb-1 md:w-20rem" />

                <Listbox v-model="selectedShow" :options="showList" optionLabel="show" class="w-full mb-1" />
                <Button label="Add Show" icon="pi pi-plus" @click="visibleRight = true" />
            </Fieldset>

            <Sidebar v-model:visible="visibleRight" position="right">

                <Dropdown v-model="defaultShowSelected" :options="shows" optionLabel="show" placeholder="Select show"
                    class="w-full mb-1" />

                <div class="flex flex-row gap-2" style="align-items: center;">
                    <label for="horseCount">Horse Count</label>
                    <InputNumber v-model="horseCount" inputId="integeronly" required />
                </div>
                <Button label="New Class" icon="pi pi-plus" class="mr-2" @click="StartClassEntry" />
            </Sidebar>

            <form @submit="handleSubmit" class="placing-form; mr-0">
                <h1>Enter Results</h1>
                <Accordion :multiple="true" :activeIndex="setAccordianCount()">
                    <AccordionTab v-for="cls in selectedShow?.classes" :key="cls.class" :header="cls.class">
                        <PlacingEntryComponent :show="selectedShow.show" :ShowClass="cls" :Placings="cls.placings"
                            @input="(e, c) => handleChange(e, c)"></PlacingEntryComponent>

                    </AccordionTab>
                </Accordion>
                <!--<button>Submit</button>-->
            </form>

            <!-- {{ selectedShow }} -->


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
            defaultShowSelected: {},
            showYear: { "year": "", "shows": [] },
            selectedShow: { "show": "", "horseCount": 0, "classes": [] },
            showList: [],
            enableForm: false,
            enableYearMode: false,
            visibleRight: false,
            horseCount: 0,
            form: { "show": "", "horseCount": 0, "classes": [] },
        };
    },
    components: {
        PlacingEntryComponent
    },
    methods: {
        OpenFile() {
            let fileInputElement = this.$refs.file;
            fileInputElement.click();

            // Do something with chosen file 
            const file = fileInputElement.files[0]
            this.ReadFile();
        },
        ReadFile() {
            this.file = this.$refs.file.files[0];
            const reader = new FileReader();
            if (this.file.name.includes(".json")) {
                reader.onload = (res) => {
                    this.showList = JSON.parse(res.target.result);
                };
                reader.onerror = (err) => console.log(err);
                reader.readAsText(this.file);
            }
        },
        Savefile() {

        },
        SetNewMode() { },
        StartClassEntry() {
            let showcls = JSON.parse(JSON.stringify(this.form.classes));
            this.showList.push({ "show": this.defaultShowSelected.show, "horseCount": this.horseCount, "classes": showcls });
            this.visibleRight = false;

            this.selectedShow = this.showList[this.showList.length - 1];
        },
        /*getShowData() {
    
             this.showDataList = store.showData;
             if (this.showDataList.classes != null) {
                 this.form.showClasses = this.showDataList.classsess
             }
         },*/
        getShowDef() {
            fetch("Definition Files/Shows.json")
                .then(response => response.json())
                .then(data => (this.shows = data));
        },
        getClassDef() {
            fetch("Definition Files/Classes.json")
                .then(response => response.json())
                .then(data => (this.form.classes = data));
        },
        setAccordianCount() {
            let length = 0;

            if (this.selectedShow?.classes?.length != null) {
                length = this.selectedShow.classes.length;
            }

            let arr = [];
            for (let i = 0; i < length; i++) {
                arr.push(i);
            }

            return arr;
        },
        handleSubmit() {
            const data = JSON.stringify(this.form)
            window.localStorage.setItem('form', data);
            console.log(JSON.parse(window.localStorage.getItem('form')))
        },
        handleChange(placing, showclass) {
            const foundClass = this.selectedShow.classes.find(c => c.class == showclass.class);
            if (foundClass != null) {
                foundClass.placings = placing;
            }
            else {
                this.selectedShow.classes.push({ showclass, placing })
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