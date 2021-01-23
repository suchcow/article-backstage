const resMesssge = {
    message_err: { errcode: 10, message: '参数错误' },
    delete_success: { errcode: 0, message: '删除成功' },
    delete_fail: { errcode: 11, message: '删除失败' },
    delete_abnormal: { errcode: 12, message: '服务器繁忙' },
    insert_success: { errcode: 0, message: '添加成功' },
    insert_fail: { errcode: 13, message: '添加失败' },
    getData_fail: { errcode: 14, message: '获取失败' },
    update_success: { errcode: 0, message: '编辑成功' },
    update_fail: { errcode: 15, message: '编辑失败' },
    upload_success: { errcode: 0, message: '上传成功' },
    upload_fail: { errcode: 16, message: '上传失败' }
};
// 暴露给 module 模块
module.exports = resMesssge;