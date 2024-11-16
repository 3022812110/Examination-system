import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosRes, ResData } from '@/util/http'
import { RootState } from '../index'

//单个课程类型
export type LessonType = {
    title: string
    value: string
    children:LessonType[]
}
//单个题目类型
export type TopicType = {
    two_id: string   
    title: string    
    dec: string     
    img: string     
    _id: string
}

//题库状态类型
type SubjectState = {
    loading: boolean
    //课程树状数据
    subject_tree: LessonType[]
    //当前选中的课程
    active_subject: LessonType | null
    //题目列表
    topic_list: TopicType[]
    //当前选中的题目
    active_Topic: TopicType | null
    //当前选中的题目数据
    exam_active_data:[]
}

//初始化状态
const initialState: SubjectState = {
    loading: false,
    subject_tree: [],
    active_subject: null,
    topic_list: [],
    active_Topic: null,
    exam_active_data:[]
} as SubjectState


export const get_subject_tree_async = createAsyncThunk<LessonType[],void>('get/subject_tree',async (action,state)=>{
    const res: AxiosRes<ResData<LessonType[]>> = await axios.get('/subject/subject_tree')
    return res.data.data
})

export const get_topic_list_async = createAsyncThunk<TopicType[],string>('get/topic_list',async (action,state)=>{
    const res = await axios.get(`/api/topic/${action}`)
    return res.data.data
})

export const subjectSlice = createSlice({
    name: 'subject',
    initialState,
    reducers: {
        set_subject_active: (state, action) => {
            state.active_subject = action.payload
        },
        set_topic_active: (state, action) => {
            state.active_Topic = action.payload
        },
        set_exam_active_data: (state, action) => {
            state.exam_active_data = action.payload
        }
    },
    extraReducers:(builder) =>{
        builder
        //获取课程列表fulfilled
        .addCase(get_subject_tree_async.fulfilled, (state, res) => {
            state.subject_tree = res.payload
            state.exam_active_data = res.payload as []
            state.active_subject = (res.payload?.[0]?.children?.[0] as LessonType) || null
        })
        //获取题目列表pending
        .addCase(get_topic_list_async.pending, (state) => {
            state.loading = true
        })
        //获取题目列表fulfilled
        .addCase(get_topic_list_async.fulfilled, (state, res) => {
            state.topic_list = res.payload
            state.loading = false
        })
    }
})

//获取loading状态
export const select_subject_loading = (state: RootState) => {
     return state.subject.loading
}

//获取课程树状数据
export const select_subject_tree = (state: RootState) => {
    return state.subject.subject_tree
}

//获取当前选中的课程
export const select_active_subject = (state:RootState) => {
    return state.subject.active_subject
}
//获取题目列表
export const select_topic_list = (state:RootState) => {
    return state.subject.topic_list
}
//获取当前选中的题目
export const select_active_topic = (state:RootState) =>{
    return state.subject.active_Topic
}

//获取当前选中的题目数据
export const get_exam_active_data = (state:RootState) =>{
    return state.subject.exam_active_data
}
export const { set_exam_active_data,set_subject_active ,set_topic_active} = subjectSlice.actions

export default subjectSlice.reducer