import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../util/http';
import { AxiosRes } from '../../util/http';
import { RootState } from '../index';

// 初始状态
const initialState = {
    subject_tree: [], //课程树状结构数据
    active_subject: {},//当前选中的课程
    topic_list: [],//当前课程下的题目列表
    active_topic: null//当前选中的题目
};

// 获取课程树状结构
export const get_subject_tree_async = createAsyncThunk(
    'get/sbuject_tree',
    async (action, state) => {
        const res: AxiosRes = await axios.get('/api/subject');
        return res.data.data;
    }
);

// 获取课程列表
export const get_topic_list_async :any = createAsyncThunk(
    'get/topic_two_list',
    async (action,state) => {
        const res: AxiosRes = await axios.get(`/api/topic/${action}`);
        return res.data.data;
    }
);


export const subjectSlice = createSlice({
    name: 'subject',
    initialState,

    reducers: {
        set_active_subject: (state, action) => {
            state.active_subject = action.payload;
        },
        set_active_topic:(state,action) => {
            state.active_topic = action.payload;
         }
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_subject_tree_async.fulfilled, (state, res) => {
                state.subject_tree = res.payload;
            })
            .addCase(get_topic_list_async.fulfilled, (state, res) => {
                state.topic_list = res.payload;
            });
    }
});

export const select_subject_tree = (state: RootState) => state.subject.subject_tree;
export const select_active_subject = (state: RootState) => state.subject.active_subject;
export const select_topic_list = (state: RootState) => state.subject.topic_list;
export const select_active_topic = (state: RootState) => state.subject.active_topic;

export const { set_active_subject, set_active_topic} = subjectSlice.actions;

export default subjectSlice.reducer;