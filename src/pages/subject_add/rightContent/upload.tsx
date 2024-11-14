import { InboxOutlined } from '@ant-design/icons';
// import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';

const { Dragger } = Upload;

function UploadComponent(props:any) {
const config={
  name: 'file',
  onChange(info :any) {
    const { status } = info.file;
      console.log('change',info);
      props.change(info)
  },
  
  onDrop(e :any) {
    console.log('Dropped files', e.dataTransfer.files);
  },
  customRequest(option: any) {
    const urlData = URL.createObjectURL(option.file);
    setTimeout(() => {
      option.onSuccess(urlData);
    }, 0);
  },

  maxCount: 1,
  beforeUpload:() =>{
    return false;
  },
  multiple: true
};


    return(
    <Dragger {...config}>
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">点击或拖拽上传</p>
    <p className="ant-upload-hint">请上传图片
    </p>
  </Dragger>
    )
}

export default UploadComponent; 