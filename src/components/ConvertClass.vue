<template>
    <textarea v-model="convertText">

    </textarea>
    <textarea v-model="outputTextOutput" row="20" cols="10">
    </textarea>

    <button @click="this.convertToShowClass">Convert</button>
</template>
<script>
import { showViewData } from '../classess/showResults.js'
import { ref } from 'vue';

export default {
    name: "Results",
    props: ['showData'],
    data() {
        return {
            convertTextInput: this.convertText,
            outputTextOutput: ref()
        };
    },
    components: {

    },
    methods: {
        convertToShowClass() {
            if (this.convertText.length > 0) {
                var show = {
                    "show": "",
                    "horseCount": "",
                    "classes": []
                }

                var separateLines = this.convertText.split(/\r?\n|\r|\n/g);
                var showClass = {};
                var currentPlacing = 0;
                for (var r = 0; r < separateLines.length; r++) {
                    var columns = separateLines[r].split(",")
                    for (var c = 0; c < columns.length; c++) {
                        if (r == 0 && c == 0) {
                            //this row has the class and the row headers
                            show.show = columns[0];
                            showClass.class = columns[2];
                            showClass.placings = [];

                            show.classes.push(showClass);
                            break;
                        }
                        else {
                            if (c == 0) {
                                if (columns[c] == 'Number of Registered horses shown') {
                                    show.horseCount = parseInt(columns[1]) || 0;
                                    c = c + 1;
                                }
                            }
                            else if (c == 2) {
                                if (columns[c] == "First") {
                                    if (columns[3].length != 0) {
                                        show.placings = [];
                                        var placing = {};
                                        placing.placing = 1;
                                        placing.registrationNumber = columns[3];
                                        placing.horseName = columns[4];
                                        placing.owner = columns[5];
                                        placing.sire = columns[6];
                                        placing.dam = columns[7];
                                        placing.championshipPoints = parseInt(columns[9]) || 0;
                                        placing.placingPoints = parseInt(columns[10]) || 0;

                                        showClass.placings.push(placing);
                                    }

                                    break;
                                }
                                else if (columns[c] == "Second") {
                                    if (columns[3].length != 0) {
                                        show.placings = [];
                                        var placing = {};
                                        placing.placing = 2;
                                        placing.registrationNumber = columns[3];
                                        placing.horseName = columns[4];
                                        placing.owner = columns[5];
                                        placing.sire = columns[6];
                                        placing.dam = columns[7];
                                        placing.championshipPoints = parseInt(columns[9]) || 0;
                                        placing.placingPoints = parseInt(columns[10]) || 0;

                                        showClass.placings.push(placing);
                                    }
                                    break;
                                }
                                else if (columns[c] == "Third") {
                                    if (columns[3].length != 0) {
                                        show.placings = [];
                                        var placing = {};
                                        placing.placing = 3;
                                        placing.registrationNumber = columns[3];
                                        placing.horseName = columns[4];
                                        placing.owner = columns[5];
                                        placing.sire = columns[6];
                                        placing.dam = columns[7];
                                        placing.championshipPoints = parseInt(columns[9]) || 0;
                                        placing.placingPoints = parseInt(columns[10]) || 0;

                                        showClass.placings.push(placing);
                                    }
                                    break;
                                }
                                else if (columns[c] == "Fourth") {
                                    if (columns[3].length != 0) {
                                        show.placings = [];
                                        var placing = {};
                                        placing.placing = 4;
                                        placing.registrationNumber = columns[3];
                                        placing.horseName = columns[4];
                                        placing.owner = columns[5];
                                        placing.sire = columns[6];
                                        placing.dam = columns[7];
                                        placing.championshipPoints = parseInt(columns[9]) || 0;
                                        placing.placingPoints = parseInt(columns[10]) || 0;

                                        showClass.placings.push(placing);
                                    }
                                    break;
                                }
                                else if (columns[c] == "Fifth") {
                                    if (columns[3].length != 0) {
                                        show.placings = [];
                                        var placing = {};
                                        placing.placing = 5;
                                        placing.registrationNumber = columns[3];
                                        placing.horseName = columns[4];
                                        placing.owner = columns[5];
                                        placing.sire = columns[6];
                                        placing.dam = columns[7];
                                        placing.championshipPoints = parseInt(columns[9]) || 0;
                                        placing.placingPoints = parseInt(columns[10]) || 0;

                                        showClass.placings.push(placing);
                                    }
                                    break;
                                }
                                else {
                                    //this is either a class name or empty
                                    if (columns[c] != "") {
                                        //should be a class name
                                        showClass = {};
                                        showClass.class = columns[2];
                                        showClass.placings = [];

                                        show.classes.push(showClass);
                                    }
                                    else {
                                        //this is an empty row
                                        break;
                                    }
                                }
                            }

                        }
                    }
                }

                this.outputTextOutput = JSON.stringify(show);
            }
        }

    },
    computed: {
        horseData() {
            return new showViewData(store.showData).ReturnDamResults()
        },

    },
    created: function () {
        //this.getShowData();
    }
};
</script>