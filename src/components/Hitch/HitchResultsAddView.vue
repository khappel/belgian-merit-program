<template>
    <Card class="m-0">
        <template #title>
            <Menubar :model="items" />
            <input type="file" accept=".json" ref="file" style="display:none" @change="ReadFile" />
            
        </template>
        <template #content class="m-0">
            <Fieldset legend="Show" class="w-full m-1 p-1" :toggleable="true">
                <div class="flex flex-column gap-2">
                    <label for="inputYear">Show Year</label>
                    <InputText id="inputYear" v-model="inputYear" />
                </div>

                <Listbox v-model="selectedShow" :options="showList" optionLabel="show" class="w-full mb-1" listStyle="max-height:300px" />
                <Button label="Add Show" icon="pi pi-plus" @click="visibleRight = true" />
                <div class="flex flex-row gap-2" style="align-items: center;" v-if="selectedShow">
                <label for="hitchCount">Hitch Count</label>
                <InputNumber
                    id="hitchCount"
                    v-model.number="selectedShow.hitchCount"
                    @change="componentChange"
                    required
                />

                <label for="ridingCount">Riding Count</label>
                <InputNumber
                    id="ridingCount"
                    v-model.number="selectedShow.ridingCount"
                    @change="componentChange"
                    required
                />
                </div>
            </Fieldset>

            <Sidebar v-model:visible="visibleRight" position="right" style="height:99vh">
                <Listbox v-model="defaultShowSelected" :options="shows" multiple optionLabel="show" class="w-full mb-1"
                listStyle="max-height:80vh" />
               
                <Button label="Add Show" icon="pi pi-plus" class="mr-2" @click="StartClassEntry" />

            </Sidebar>

            <form @submit="handleSubmit" class="placing-form; mr-0">
                <h1>Enter Results for {{ selectedShow?.show }}</h1>
                <Accordion :multiple="true" :activeIndex="setAccordianCount()">
                    <AccordionTab v-for="cls in selectedShow?.classes" :key="cls.class" :header="cls.class">
                        
                        <div class="flex flex-row gap-2" style="align-items: center;">
                            <label :for="cls.classCount">Class Count</label>
                            <InputNumber v-model.number="cls.classCount" @change="componentChange()" />
                        </div>
                        
                        <PlacingEntryComponent :EntryMode="entryMode" :Show="selectedShow?.show" :ShowClass="cls"
                            :HitchCount="selectedShow?.hitchCount" 
                            :RidingCount="selectedShow?.ridingCount"
                            :ClassType="cls.classType"
                            :Placings="cls.placings" @input="(e, c, d) => handleChange(e, c, d)"
                            @valueChange="() => componentChange()"></PlacingEntryComponent>
                        
                    </AccordionTab>
                </Accordion>
                
            </form>
        </template>
    </Card>
</template>

<script>
import PlacingEntryComponent from '../PlacingEntryComponent.vue'
import { store } from '../../classess/store.js'
import { onMounted, ref, computed } from "vue";

export default {
    name: "Results",
    data() {
        return {
            //store,
            entryMode: "Hitch",
            shows: ref(''), // store.showListData, // [],
            //showListData: ref([]),
            //showListData: showListData(),
            showDataList: [],
            accordianCount: [],
            defaultShowSelected: [],
            //showYear: { "year": "", "shows": currentShowList() },
            inputYear: "",
            selectedShow: { "show": "", "hitchCount": 0, "ridingCount": 0, "classes": [] },
            showList: [],
            enableForm: false,
            enableYearMode: false,
            visibleRight: false,
            youthCount: 0,
            form: { "show": "", "hitchCount": 0, "ridingCount":0, "classes": [] },
            items: [
                {                    
                    label: 'New',
                    icon: 'pi pi-plus',
                    command: () => this.SetNewMode()
                },
                {
                    label: 'Open',
                    icon:'pi pi-upload',
                    severity:'success',
                    command: () => this.OpenFile()
                },
                {
                    label: 'Save',
                    icon:'',
                    command: () => this.SaveFile()
                }
            ]



            
             //<Button label="New" icon="pi pi-plus" class="mr-2" @click="SetNewMode" />
            //<input type="file" accept=".json" ref="file" style="display:none" @change="ReadFile" />
            //<Button label="Open" icon="pi pi-upload" severity="success" class="mr-2" @click="OpenFile" />
            //<Button label="Save" icon="" class="mr-2" @click="SaveFile" />

            
        };
    },
    setup() {

    onMounted(() => {
        store.getAccessToken();
        store.getShowDef();
        store.getHitchClassDef();
        //this.showListData = store.showListData;
        //store.getClassDef();
    });

    //function submitForm() {
    //  alert(`Selected state: ${selectedState.value}`);
    //}

    //return { store, selectedState, submitForm };
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
            if (this.file?.name.includes(".json")) {
                reader.onload = (res) => {
                    var FileParse = JSON.parse(res.target.result);

                    if (FileParse.year != undefined) {
                        this.inputYear = FileParse.year;
                        this.showList = FileParse.shows;
                    }
                    else {
                        this.showList = FileParse;
                    }

                    //this.showYear = JSON.parse(res.target.result);
                };
                reader.onerror = (err) => console.log(err);
                reader.readAsText(this.file);
            }
        },
        SaveFile() {
            const a = document.createElement("a");
            a.href = URL.createObjectURL(new Blob([JSON.stringify(this.showYear)], {
                type: "text/plain"
            }));
            a.setAttribute("download", this.showYear.year + " Belgian Hitch Merit Program.json");
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        },
        SetNewMode() {
            this.inputYear = "";
            this.showList = [];
            this.selectedShow = form;
            
            localStorage.removeItem("showHitchData");

        },
        StartClassEntry() {
            //if (this.form.classes == undefined){

            //}
            let showcls = JSON.parse(JSON.stringify(this.classes));
            this.defaultShowSelected.forEach(showItem => {
                const foundShow = this.showList.find(({ show }) => show === showItem.show)
                //if (foundClass.has(placeItem.registrationNumber)) 
                if (foundShow == undefined) {
                    this.showList.push({ "show": showItem.show, "hitchCount": 0, "ridingCount":0, "classes": showcls });
                }
            })

            this.defaultShowSelected = [];
            this.visibleRight = false;
            this.selectedShow = this.showList[this.showList.length - 1];
        },
        //depgetShowDef() {
        //    fetch("Definition Files/Shows.json")
        //        .then(response => response.json())
        //        .then(data => (this.shows = data));
        //},
        //depgetClassDef() {
        //    fetch("Definition Files/HitchClasses.json")
        //        .then(response => response.json())
        //        .then(data => (this.form.classes = data));
        //},
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
            //const data = JSON.stringify(this.form)
            //window.localStorage.setItem('form', data);
            //console.log(JSON.parse(window.localStorage.getItem('form')))
        },
        handleChange(placing, showclass, classCount) {
            const foundClass = this.selectedShow.classes.find(c => c.class == showclass.class);
            if (foundClass != null) {
                foundClass.placings = placing;
                //foundClass.classCount = classCount;
            }
            else {
                this.selectedShow.classes.push({ showclass, placing, classCount })
            }

            const parsed = JSON.stringify(this.showYear);
            localStorage.setItem('showHitchData', parsed);
        },
        componentChange() {
            const parsed = JSON.stringify(this.showYear);
            localStorage.setItem('showHitchData', parsed);
        },
        addResults() {

        }
    },
    computed: {
        showYear() {
            return { year: this.inputYear, shows: this.showList };
        },
        shows() {
            return store.showListData;
        },
        classes() {
            return store.hitchClassListData; //store.getHitchClassDef;
        }
    },
    created: function () {
        //store.getAccessToken();
        //store.getShowDef();

        //store.getClassDef();
        //this.getShowDef();
        //this.getClassDef();
        //this.showListData = store.showListData;
        
    },
    mounted() {
        if (localStorage.getItem('showHitchData')) {
            try {
                var FileParse = JSON.parse(localStorage.getItem('showHitchData'));

                if (FileParse.year != undefined) {
                    this.inputYear = FileParse.year;
                    this.showList = FileParse.shows;
                }
                else {
                    this.showList = FileParse;
                }
            } catch (e) {
                //localStorage.removeItem('showData');
            }
        }

       
        //store.getShowDef();
    },
    watch: {      
        inputYear(newYear) {
            const parsed = JSON.stringify(this.showYear);
            localStorage.setItem('showHitchData', parsed);
        },
        shows(showList){
            shows = store.showListData;
        },
        classess(classList){
            this.form.classes = store.hitchClassListData;
        }
    }
};
</script>