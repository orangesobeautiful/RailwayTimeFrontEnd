import { Module } from 'vuex';
import { StateInterface } from '../index';
import state from './state';
import mutations from './mutations';
import { RegionState } from './state';

const regionMapModule: Module<RegionState, StateInterface> = {
  namespaced: true,
  mutations,
  state,
};

export default regionMapModule;
