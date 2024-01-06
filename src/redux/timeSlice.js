import { createSlice } from '@reduxjs/toolkit'

export const timeSlice = createSlice({
    name: 'time',
    initialState: {
        breakTime: 5,
        sessionTime: 25,
        isRunning: false,
        timingType: "Session",
        timeLeft: 1500,
    },
    reducers: {
        incrementBreakTime: (state) => {
            if (state.breakTime < 60) {
                state.breakTime += 1;
            }
        },
        decrementBreakTime: (state) => {
            if (state.breakTime > 1) {
                state.breakTime -= 1;
            }
        },
        setBreakTime: (state,action) => {
            state.breakTime = action.payload;
        },
        incrementSessionTime: (state) => {
            if (state.sessionTime < 60) {
                state.sessionTime += 1;
                state.timeLeft += 60;
            }
        },
        decrementSessionTime: (state) => {
            if (state.sessionTime > 1) {
                state.sessionTime -= 1;
                state.timeLeft -= 60;
            }
        },
        setSessionTime: (state,action) => {
            state.sessionTime = action.payload;
        },
        setIsRunning: (state) => {
            state.isRunning = !state.isRunning;
        },
        startIsRunning: (state) => {
            state.isRunning = true;
        },
        stopIsRunning: (state) => {
            state.isRunning = false;
        },
        setTimingType: (state, action) => {
            state.timingType = action.payload;
        },
        setTimeLeft: (state,action) => {
            state.timeLeft = action.payload;
        },
    }
});
export const {
    incrementBreakTime,
    decrementBreakTime,
    incrementSessionTime,
    decrementSessionTime,
    setIsRunning,
    setTimingType,
    setTimeLeft,
    setBreakTime,
    setSessionTime,
    startIsRunning,
    stopIsRunning} = timeSlice.actions;
export default timeSlice.reducer;