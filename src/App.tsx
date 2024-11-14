import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.scss';
import Login from '@/pages/login';
import Layout from './common_components/layout';
import { routersDate } from './config';
import AdminManage from './pages/admin_manage';
import CorretExam from './pages/corret_exam';
import CorrtExamList from './pages/corret_exam_list';
import Exam from './pages/exam';
import ExamHistory from './pages/exam_history';
import ExamSelect from './pages/exam_select';
import PersionInfo from './pages/person_info';
import ReadExam from './pages/read_exam';
import StudentManage from './pages/student_manage';
import SubjectAdd from './pages/subject_add';
import SubjectManage from './pages/subject_manage';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={routersDate.login.path} />} />
      <Route element={<Layout />}>
      <Route path={routersDate.login.path} element={<Login />}></Route>
      <Route path={routersDate.admin_manage.path} element={<AdminManage />}></Route>
      <Route path={routersDate.corret_exam.path} element={<CorretExam />}></Route>
      <Route path={routersDate.corret_exam_list.path} element={<CorrtExamList />}></Route>
      <Route path={routersDate.exam.path} element={<Exam />}></Route>
      <Route path={routersDate.exam_history.path} element={<ExamHistory />}></Route>
      <Route path={routersDate.exam_select.path} element={<ExamSelect />}></Route>
      <Route path={routersDate.person_info.path} element={<PersionInfo />}></Route>
      <Route path={routersDate.read_exam.path} element={<ReadExam />}></Route>
      <Route path={routersDate.student_manage.path} element={<StudentManage />}></Route>
      <Route path={routersDate.subject_add.path} element={<SubjectAdd />}></Route>
      <Route path={routersDate.subject_manage.path} element={<SubjectManage />}></Route>
      </Route>
    </Routes>

  );
}

export default App;
