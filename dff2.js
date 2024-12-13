const fs = require('fs');

let newMain;
fs.readFile('medWorganv4.json', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    newMain = JSON.parse(data);
    console.log(newMain);

    var organ = ['五臟', '六腑', '心', '肝', '脾', '肺', '腎', '腸', '胃', '膀胱', '膽', '骨', '髓', '筋', '肌肉', '皮', '血脈', '子宮','子藏', '乳', '目', '耳', '口', '舌', '齒', '喉', '鼻', '頭','頭禿', '面', '髮', '眉', '四肢','胸膈','小便水道','陰蝕','咽痛','腹中','頸下核','肢滿','氣癃','月閉','三蟲','五癃','產難','小便','精氣','胎','胸','強陰','陰漏','腰','息肉','邪氣','止血','女子崩中下血','風攣','下利','瘴氣','聾','耐老','補中'];
    var organCount = {};
    newMain.forEach(item => {
        item.organ.forEach(o => {
            organCount[o] = organCount[o] ? organCount[o] + 1 : 1;
        });
    });
    console.log(organCount);

    organ.forEach(o => {
        console.log(o, organCount[o] || 0);
    });
});