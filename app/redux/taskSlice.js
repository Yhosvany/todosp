import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tasks: [],
}

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        setTasks: (state, action) => {
            state.tasks = action.payload
        },
    }
});

export const { setTasks } = taskSlice.actions;
export default taskSlice.reducer;