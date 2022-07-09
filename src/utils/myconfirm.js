import { MessageBox } from 'element-ui'

// 删除弹框
export default function myconfirm(text) {
  return new Promise((resolve, reject) => {
    MessageBox.confirm(text, 'System Prompt', {
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      type: 'warning'
    }).then(() => {
      resolve(true)
    }).catch(() => {
      reject(false)
    })
  }).catch(() => {})
}
