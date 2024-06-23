import { createWebHistory, createRouter } from 'vue-router';
import MeritResults from './components/MeritResultsView.vue';
import Results from './components/Halter/ResultsView.vue';
import RulesAndInfo from './components/RulesAndInfoView.vue';
import MeritRulesAndInfo from './components/Halter/RulesAndInfoView.vue';
import YouthMeritRulesAndInfo from './components/Youth/YouthRulesAndInfoView.vue';
import HitchMeritRulesAndInfo from './components/Hitch/HitchRulesAndInfoView.vue';
import AddResults from './components/ResultsEntryView.vue';
import AddMeritResults from './components/Halter/ResultsAddView.vue';
import AddYouthResults from './components/Youth/YouthResultsAddView.vue';
import AddHitchResults from './components/Hitch/HitchResultsAddView.vue';
import ShowResults from './components/Halter/ShowResultView.vue';
import ExhibitorResults from './components/Halter/ExhibitorResultView.vue';
import ClassResults from './components/Halter/ClassResultView.vue';
import HorseResults from './components/Halter/HorseResultView.vue';
import SireResults from './components/Halter/SireResultView.vue';
import DamResults from './components/Halter/DamResultView.vue';
import VersatilityResults from './components/Halter/VersatilityResultView.vue';
import Converter from './components/ConvertClass.vue';
import YouthResults from './components/Youth/YouthResultsView.vue';
import YouthShowResults from './components/Youth/YouthShowResultsView.vue'
import YouthExhibitorResults from './components/Youth/YouthExhibitorResultsView.vue'
import YouthClassResults from './components/Youth/YouthClassResultsView.vue'
import HitchResults from './components/Hitch/HitchResultsView.vue';
import HitchShowResults from './components/Hitch/HitchShowResultsView.vue'
import HitchExhibitorResults from './components/Hitch/HitchExhibitorResultsView.vue'
import HitchClassResults from './components/Hitch/HitchClassResultsView.vue'

const routes = [
  //{
  //  path: "/resultsview", name: Results, component: Results,
  //  children: [
  //    { path: "/showresultsview", name: ShowResults, component: ShowResults, alias: "/" },
  //    { path: "/exhibitorresultsview", name: ExhibitorResults, component: ExhibitorResults },
  //    { path: "/classresultsview", name: ClassResults, component: ClassResults },
  //    { path: "/horseresultsview", name: HorseResults, component: HorseResults },
  //    { path: "/sireresultsview", name: SireResults, component: SireResults },
  //    { path: "/damresultsview", name: DamResults, component: DamResults },
  //    { path: "/versatilityresultsview", name: VersatilityResults, component: VersatilityResults },
  //  ]
  //},
  //{
  //  path: "/youthresultsview", name: YouthResults, component: YouthResults,
  //  children: [
  //    { path: "/youthshowresultsview", name: YouthShowResults, component: YouthShowResults, alias: "/" },
  //    { path: "/youthexhibitorresultsview", name: YouthExhibitorResults, component: YouthExhibitorResults },
  //    { path: "/youthclassresultsview", name: YouthClassResults, component: YouthClassResults },
  //  ]
  //},
  //{
  //  path: "/hitchresultsview", name: HitchResults, component: HitchResults,
  //  children: [
  //    { path: "/hitchshowresultsview", name: HitchShowResults, component: HitchShowResults, alias: "/" },
  //    { path: "/hitchexhibitorresultsview", name: HitchExhibitorResults, component: HitchExhibitorResults },
  //    { path: "/hitchclassresultsview", name: HitchClassResults, component: HitchClassResults },
  //  ]
  //},
  {
    path: "/meritresultsview", name: MeritResults, component: MeritResults, alias: "/", redirect: "/resultsview",
    children: [
      { path: "/resultsview", name: Results, component: Results,
        children: [
          { path: "/showresultsview", name: ShowResults, component: ShowResults, alias: "/" },
          { path: "/exhibitorresultsview", name: ExhibitorResults, component: ExhibitorResults },
          { path: "/classresultsview", name: ClassResults, component: ClassResults },
          { path: "/horseresultsview", name: HorseResults, component: HorseResults },
          { path: "/sireresultsview", name: SireResults, component: SireResults },
          { path: "/damresultsview", name: DamResults, component: DamResults },
          { path: "/versatilityresultsview", name: VersatilityResults, component: VersatilityResults },
      ]
      },
      { path: "/youthresultsview", name: YouthResults, component: YouthResults,
        children: [
          { path: "/youthresultsview/youthshowresultsview", name: YouthShowResults, component: YouthShowResults, alias: "/" },
          { path: "/youthresultsview/youthexhibitorresultsview", name: YouthExhibitorResults, component: YouthExhibitorResults },
          { path: "/youthresultsview/youthclassresultsview", name: YouthClassResults, component: YouthClassResults },
        ]
      },
      { path: "/hitchresultsview", name: HitchResults, component: HitchResults,
        children: [
        { path: "/hitchshowresultsview", name: HitchShowResults, component: HitchShowResults, alias: "/" },
        { path: "/hitchexhibitorresultsview", name: HitchExhibitorResults, component: HitchExhibitorResults },
        { path: "/hitchclassresultsview", name: HitchClassResults, component: HitchClassResults },
      ] },
    ]
  },
  {
    path: "/addview", name: AddResults, component: AddResults, redirect: "/addmeritview",
    children: [
      { path: "/addmeritview", name: AddMeritResults, component: AddMeritResults },
      { path: "/addyouthview", name: AddYouthResults, component: AddYouthResults },
      { path: "/addhitchview", name: AddHitchResults, component: AddHitchResults },
    ]
  },
  { path: "/convertview", name: Converter, component: Converter },
  {
    path: "/rulesandinfoview", name: RulesAndInfo, component: RulesAndInfo, redirect: "/meritrulesandinfo",
    children: [
      { path: "/meritrulesandinfo", name: MeritRulesAndInfo, component: MeritRulesAndInfo },
      { path: "/youthmeritrulesandinfo", name: YouthMeritRulesAndInfo, component: YouthMeritRulesAndInfo },
      { path: "/hitchmeritrulesandinfo", name: HitchMeritRulesAndInfo, component: HitchMeritRulesAndInfo },
    ]
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;