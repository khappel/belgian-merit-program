import { createWebHistory, createRouter } from 'vue-router';
import Results from './components/ResultsView.vue';
import AddResults from './components/ResultsAddView.vue';
import RulesAndInfo from './components/RulesAndInfoView.vue';
import ShowResults from './components/ShowResultView.vue';
import ExhibitorResults from './components/ExhibitorResultView.vue';
import ClassResults from './components/ClassResultView.vue';
import HorseResults from './components/HorseResultView.vue';
import SireResults from './components/SireResultView.vue';
import DamResults from './components/DamResultView.vue';
import VersatilityResults from './components/VersatilityResultView.vue';
import Converter from './components/ConvertClass.vue';

const routes = [
    { path: "/resultsview", name:Results, component: Results, alias: "/", 
    children: [
      { path: "/showresultsview", name:ShowResults, component: ShowResults, alias: "/" },
      { path: "/exhibitorresultsview", name:ExhibitorResults, component: ExhibitorResults },
      { path: "/classresultsview", name:ClassResults, component: ClassResults },
      { path: "/horseresultsview", name:HorseResults, component: HorseResults },
      { path: "/sireresultsview", name:SireResults, component: SireResults },
      { path: "/damresultsview", name:DamResults, component: DamResults },
      { path: "/versatilityresultsview", name:VersatilityResults, component: VersatilityResults },
    ]},
    { path: "/addview", name:AddResults, component: AddResults },
    { path: "/convertview", name:Converter, component: Converter },
    { path: "/rulesandinfoview", name:RulesAndInfo, component: RulesAndInfo},
    
  ];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;