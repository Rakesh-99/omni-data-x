import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialStateType } from "@/constants/data";



const initialState: InitialStateType = {
    teachers: [],
    error: null,
    isLoading: false
}

// Slice : 
const teacherSlice = createSlice({
    name: "teacherslice",
    initialState,
    reducers: {

        // Add teacher : 
        addTeacherPending: (state: InitialStateType) => {
            state.isLoading = true
        },
        addTeacherFullfilled: (state: InitialStateType) => {
            state.isLoading = false;
        },
        addTeacherRejected: (state: InitialStateType, action: PayloadAction<string | null>) => {
            state.isLoading = false;
            state.error = action.payload
        },

        // Get All Teachers : 
        getTeachersPending: (state) => {
            state.isLoading = true
        },
        getTeachersFullfilled: (state) => {
            state.isLoading = false;

        },
        getTeachersRejected: (state, action: PayloadAction<string | null>) => {
            state.isLoading = false;
            state.error = action.payload
        }


    },
});
export default teacherSlice.reducer;
export const { addTeacherFullfilled, addTeacherPending, addTeacherRejected, getTeachersFullfilled, getTeachersPending, getTeachersRejected } = teacherSlice.actions;