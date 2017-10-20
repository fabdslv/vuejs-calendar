import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import moment from 'moment-timezone';
moment.tz.setDefault('UTC');

import Axios from 'axios';

export default new Vuex.Store({
    state: {
        currentYear: 2017,
        currentMonth: 10,
        eventFormPosX: 0,
        eventFormPosY: 0,
        eventFormActive: false,
        eventFormDate: null,
        events: []
    },
    mutations: {
        setCurrentMonth(state, payload) {
            state.currentMonth = payload;
        },
        setCurrentYear(state, payload) {
            state.currentYear = payload;
        },
        eventFormPos(state, payload) {
            state.eventFormPosX = payload.x;
            state.eventFormPosY = payload.y;
        },
        eventFormActive(state, payload) {
            state.eventFormActive = payload;
        },
        eventFormDate(state, payload) {
            state.eventFormDate = payload;
        },
        addEvent(state, payload) {
            state.events.push(payload);
        }
    },
    actions: {
        addEvent(context, payload) {
            let ev = {
                description: payload,
                date: context.state.eventFormDate
            };
            return Axios.post('/add_event', ev).then(() => {
                context.commit('addEvent', ev);
            });
        }
    }
});