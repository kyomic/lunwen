const generateMock = require('merge-umi-mock-data');//合并umi mock数据
const path = require('path');
const fs = require('fs');
const rmdir = (path)=>{
	// 先判断当前filePath的类型(文件还是文件夹,如果是文件直接删除, 如果是文件夹, 去取当前文件夹下的内容, 拿到每一个递归)
	let files = [];
    if(fs.existsSync(path)){
        files = fs.readdirSync(path);
        files.forEach((file, index) => {
            let curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()){
                delDir(curPath); //递归删除文件夹
            } else {
                fs.unlinkSync(curPath); //删除文件
            }
        });
        fs.rmdirSync(path);
    }
}
rmdir("./mock/dist");
generateMock(path.join(__dirname, '../mock/'), path.join(__dirname, '../mock/dist/index.js'));
