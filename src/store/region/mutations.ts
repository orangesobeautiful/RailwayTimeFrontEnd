import { MutationTree } from 'vuex';

import { RegionState } from './state';
import { RegionMap } from 'src/lib/struct/station';

const mutation: MutationTree<RegionState> = {
  setNameList(state, inputNameList) {
    state.nameList = inputNameList as string[];
  },
  setMap(state, inputRegionMap) {
    state.map = inputRegionMap as RegionMap;
  },
};

export default mutation;
