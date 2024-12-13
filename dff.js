const fs = require('fs');

let newMain;
fs.readFile('newMainv3.json', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    newMain = JSON.parse(data);
    console.log(newMain);

    var organ = ['五臟', '六腑', '心', '肝', '脾', '肺', '腎', '腸', '胃', '膀胱', '膽', '骨', '髓', '筋', '肌肉', '皮', '血脈', '子宮', '子藏', '乳', '目', '耳', '口', '舌', '齒', '喉', '鼻', '頭', '頭禿', '面', '髮', '眉', '四肢', '胸膈', '小便水道', '陰蝕', '咽痛', '腹中', '頸下核', '肢滿', '氣癃', '月閉', '三蟲', '五癃', '產難', '小便', '精氣', '胎', '胸', '強陰', '陰漏', '腰', '漏下', '咳逆', '寒熱', '煩滿', '下利赤白', '血閉', '鼠瘺', '癰傷', '癥瘕結氣', '惡瘡', '黃疸', '消渴', '濕痺', '痙疸', '賁豚', '帶下病', '癩疾', '癥瘕積聚', '鬼注', '蠱毒', '癰腫', '驚癇', '蝕惡肉', '熱病', '七傷','息肉','邪氣','止血','女子崩中下血','風攣','下利','瘴氣','聾','耐老','補中'];

    newMain.forEach(item => {
        item.organ = organ.filter(o => item.context.includes(o));
    });


    var organCount = {};
    newMain.forEach(item => {
        item.organ.forEach(o => {
            organCount[o] = organCount[o] ? organCount[o] + 1 : 1;
        });
    });

    organ.forEach(o => {
        console.log(o, organCount[o] || 0);
    });


    var filename = 'medWorganv9.json';
    fs.writeFile(filename, JSON.stringify(newMain), (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('File has been saved as newMainv4.json');
        let newMain;
        fs.readFile(filename, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            newMain = JSON.parse(data);

            newMain.forEach(item => {
                if (item.organ.length === 0) {
                    console.log(item.context);
                }
            });
        });
    });
});

