import { Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { select_active_subject, get_topic_list_async,select_active_topic } from "@/store/slice/subject";
import axios from "axios";
import UploadComponent from "./upload";
import { useEffect } from "react";
const { TextArea } = Input;

function RightContent() {
    const [form] = Form.useForm();
    const dispatch = useDispatch(); 
    const active_subject: any = useSelector(select_active_subject);
    const active_topic: any = useSelector(select_active_topic);

    //添加题目
    async function submitClick() {
        const formData = await form.validateFields();
        if (formData) {
            formData.two_id= active_subject.value;
        }
        console.log('formData', formData);
        await axios.post('/api/topic', formData);
        dispatch(get_topic_list_async(active_subject.value));
        form.resetFields();
    } 

    //渲染被点击的题目
    useEffect(() => {
        if (active_topic) {
            form.setFieldsValue({
                title: active_topic.title,
                description: active_topic.description
            });
        }
    }, [active_topic]);



    return (
        <div>
            <p>题目详情</p>
            <Form
                name="basic"
                labelCol={{ span: 2 }}
                wrapperCol={{ span: 16 }}
                initialValues={{}}
                autoCapitalize="off"
                form={form}
            >
                <Form.Item
                    label="标题"
                    name="title"
                    rules={[{ required: true, message: '请输入标题!' }]}
                >
                    <Input />
                </Form.Item>
                
                <Form.Item
                    label="描述"
                    name="description"
                    rules={[{ required: true, message: '请输入描述!' }]}
                >
                    <TextArea />
                </Form.Item>
            </Form>

            <div style={{display:'flex',justifyContent:'center',margin:'10px 0 '}}>
                <Button onClick={submitClick} style={{margin:'auto' }} type='primary'>添加</Button>
            </div>

            <UploadComponent/>
        </div>
    );
}

export default RightContent;