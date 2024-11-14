import COS from 'cos-js-sdk-v5'

export const upload_imgs = function (files: any) {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	var cos = new COS({
		
	})

	return new Promise((resolve) => {
		var cos = new COS({
			
		})

		let upload_files_data = files.map((item: any) => {
			const file_name = item.name
			const ramdom = Math.random().toString(36).slice(-8)
			const result_file_name = `topic/${ramdom}_${file_name}`

			return {
				Bucket: 'exam-project-1255639690' /* 填写自己的 bucket，必须字段 */,
				Region: 'ap-nanjing' /* 存储桶所在地域，必须字段 */,
				Key: result_file_name /* 存储在桶里的对象键（例如:1.jpg，a/b/test.txt，图片.jpg）支持中文，必须字段 */,
				Body: item.originFileObj, // 上传文件对象
				SliceSize: 1024 * 1024 * 5 /* 触发分块上传的阈值，超过5MB使用分块上传，小于5MB使用简单上传。可自行设置，非必须 */,
			}
		})

		console.log('upload_files_data', upload_files_data)

		cos.uploadFiles(
			{
				files: upload_files_data,
				SliceSize: 1024 * 1024 * 10,
				onFileFinish: function (err, data, options) {
					console.log(options.Key + '上传' + (err ? '失败' : '完成'))
				},
			},
			async function (err, res_data) {
				if (err) {
					console.log('err', err)
				} else {
					console.log('上传成功data', res_data)
					const img_urls = res_data.files.map((item) => {
						return item.data.Location
					})
					resolve(img_urls)
                    console.log('img_urls', img_urls)
				}
			}
		)
	})
}

// 从当前对象选择指定key生成新对象
// export const pick = <T, K extends keyof T>(obj: T | null | undefined, keys: K[]): Pick<T, K> | null | undefined => {
// 	if (!obj || !keys?.length) return obj

// 	keys = typeof keys === 'string' ? [keys] : keys

// 	return Object.assign({}, ...keys.map((key) => ({ [key]: obj[key] })))
// }
// export function obj2Query(data:Record<string,string>){
// 	return Object.keys(data).reduce((pre,cur)=>{
// 		return pre+cur+"="+data[cur]+"&"
// 	},"?")
// }
