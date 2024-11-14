import styles from './index.module.css';
import { Button, TreeSelect } from 'antd';
import { useEffect } from 'react';
import { AppDispatch } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { get_subject_tree_async, select_subject_tree, set_active_subject, select_active_subject, get_topic_list_async } from '@/store/slice/subject';
import LeftContent from './leftContent';
import RightContent from './rightContent';

function SubjectAdd() {
    const dispatch: AppDispatch = useDispatch();
    const treeData = useSelector(select_subject_tree);
    const active_subject: any = useSelector(select_active_subject);

    useEffect(() => {
        // 获取课程树状结构
        dispatch(get_subject_tree_async()).then((res) => {
            const active_subject = res.payload[0].children[0];
            dispatch(set_active_subject(active_subject));
        });
    }, []);

    useEffect(() => {
        dispatch(get_topic_list_async(active_subject.value));
    }, [active_subject.value]);

    const onChange = (newValue: string, nameArr: any) => {
        dispatch(set_active_subject({
            title: nameArr[0],
            value: newValue
        }));
    };

    return (
        <div className={styles.wrap}>
            <div className={styles.top}>
                <div className={styles.left}>
                    {active_subject.title}
                </div>
                <div className={styles.right}>
                    <TreeSelect
                        style={{ width: '100%', minWidth: 200 }}
                        value={active_subject.value}
                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                        treeData={treeData}
                        placeholder="Please select"
                        treeDefaultExpandAll
                        onChange={onChange}
                    />
                    <Button type='primary' className={styles.add_button}>新增题目</Button>
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.left}>
                    <LeftContent />
                </div>
                <div className={styles.right}>
                    <RightContent />
                </div>
            </div>
        </div>
    );
}

export default SubjectAdd;