import styles from './index.module.css';
import { select_active_subject, select_topic_list, get_topic_list_async, set_active_topic, } from "@/store/slice/subject";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "@/store"; 

function LeftContent() {
    const topic_list = useSelector(select_topic_list);
    const active_subject: any = useSelector(select_active_subject);
    const dispatch: AppDispatch = useDispatch();

    // 删除题目
    async function deleteClick(id: string) {
        await axios.delete(`/api/topic/${id}`);
        dispatch(get_topic_list_async(active_subject.value));
    }

    //点击题目，右侧显示详情
    function handleClick(topic: any) {
        dispatch(set_active_topic(topic));

    }
        


    return (
        <div className={styles.wrap}>
            {topic_list.map((item: any) => {
                return (
                    <div key={item._id} className={styles.item} onClick={() => handleClick(item)}>
                        <div className={styles.left}>
                            {item.title}
                        </div>
                        <div onClick={() => deleteClick(item._id)} className={styles.right_span}>
                            <span>删除</span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default LeftContent;