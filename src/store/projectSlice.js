import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  filtersData: [],
  oilCompaniesData: [],
  oilsData: [],
  tireCompaniesData: [],
  tireData: [],
  batteryData: [],
  engineOilData: [],
  engineOilPetrolData: [],
  batteryCompaniesData: [],
  myOrdersData: [],
  supportServicesData: [],
  mySupportServicesData: [],
  allTeamsData: [],
  teamMembersData: [],
  allSupervisorsData: [],
  freeServices: [],
  cashBack: '',
  cityArr: [],
  neighborArr: [],
  employsData: [],
};

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setEngineOilData: (state, action) => {
      if (action.payload.engineOilData === null) {
        state.engineOilData = [];
      } else {
        state.engineOilData = action.payload.engineOilData;
      }
    },
    setEngineOilPetrolData: (state, action) => {
      if (action.payload.engineOilPetrolData === null) {
        state.engineOilPetrolData = [];
      } else {
        state.engineOilPetrolData = action.payload.engineOilPetrolData;
      }
    },
    setFiltersDta: (state, action) => {
      if (action.payload.filtersData === null) {
        state.filtersData = [];
      } else {
        state.filtersData = action.payload.filtersData;
      }
    },
    setOilCompaniesData: (state, action) => {
      if (action.payload.oilCompaniesData === null) {
        state.oilCompaniesData = [];
      } else {
        state.oilCompaniesData = action.payload.oilCompaniesData;
      }
    },
    setOilsData: (state, action) => {
      if (action.payload.oilsData === null) {
        state.oilsData = [];
      } else {
        state.oilsData = action.payload.oilsData;
      }
    },
    setTireCompaniesData: (state, action) => {
      if (action.payload.tireCompaniesData === null) {
        state.tireCompaniesData = [];
      } else {
        state.tireCompaniesData = action.payload.tireCompaniesData;
      }
    },
    setTireData: (state, action) => {
      if (action.payload.tireData === null) {
        state.tireData = [];
      } else {
        state.tireData = action.payload.tireData;
      }
    },
    setBatteryData: (state, action) => {
      if (action.payload.batteryData === null) {
        state.batteryData = [];
      } else {
        state.batteryData = action.payload.batteryData;
      }
    },
    setBatteryCompaniesData: (state, action) => {
      if (action.payload.batteryCompaniesData === null) {
        state.batteryCompaniesData = [];
      } else {
        state.batteryCompaniesData = action.payload.batteryCompaniesData;
      }
    },
    setMyOrdersData: (state, action) => {
      if (action.payload.myOrdersData === null) {
        state.myOrdersData = [];
      } else {
        state.myOrdersData = action.payload.myOrdersData;
      }
    },
    setSupportServicesData: (state, action) => {
      if (action.payload.supportServicesData === null) {
        state.supportServicesData = [];
      } else {
        state.supportServicesData = action.payload.supportServicesData;
      }
    },
    setMySupportServicesData: (state, action) => {
      if (action.payload.mySupportServicesData === null) {
        state.mySupportServicesData = [];
      } else {
        state.mySupportServicesData = action.payload.mySupportServicesData;
      }
    },
    setAllTeamsData: (state, action) => {
      if (action.payload.allTeamsData === null) {
        state.allTeamsData = [];
      } else {
        state.allTeamsData = action.payload.allTeamsData;
      }
    },
    setAllSupervisorsData: (state, action) => {
      if (action.payload.allSupervisorsData === null) {
        state.allSupervisorsData = [];
      } else {
        state.allSupervisorsData = action.payload.allSupervisorsData;
      }
    },
    setTeamMembersData: (state, action) => {
      if (action.payload.teamMembersData === null) {
        state.teamMembersData = [];
      } else {
        state.teamMembersData = action.payload.teamMembersData;
      }
    },
    setFreeServices: (state, action) => {
      if (action.payload.freeServices === null) {
        state.freeServices = [];
      } else {
        state.freeServices = action.payload.freeServices;
      }
    },
    setCityArr: (state, action) => {
      if (action.payload.cityArr === null) {
        state.cityArr = [];
      } else {
        state.cityArr = action.payload.cityArr;
      }
    },
    setNeighborArr: (state, action) => {
      if (action.payload.neighborArr === null) {
        state.neighborArr = [];
      } else {
        state.neighborArr = action.payload.neighborArr;
      }
    },
    setEmploysData: (state, action) => {
      if (action.payload.employsData === null) {
        state.employsData = [];
      } else {
        state.employsData = action.payload.employsData;
      }
    },
    setCashBack: (state, action) => {
      state.cashBack = `${action.payload?.cashBack}`;
    },
  },
});

export const {
  setEngineOilData,
  setBatteryData,
  setFiltersDta,
  setOilCompaniesData,
  setOilsData,
  setEngineOilPetrolData,
  setTireCompaniesData,
  setTireData,
  setBatteryCompaniesData,
  setMyOrdersData,
  setSupportServicesData,
  setMySupportServicesData,
  setEmploysData,
  setTeamMembersData,
  setAllSupervisorsData,
  setFreeServices,
  setCashBack,
  setCityArr,
  setNewTeamsData,
  setNeighborArr,
  setAllTeamsData,
} = projectSlice.actions;

export default projectSlice.reducer;
