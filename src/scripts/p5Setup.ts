// vue ファイルで p5 インスタンスに渡す関数
const p5Setup = function (p5: any) {
    // はじめに呼ばれる
    p5.setup = () => {
        // canvas 生成
        const canvas = p5.createCanvas(500, 500);
        // <div id="canvas"> に canvas を配置
        canvas.parent('canvas');
        // canvas の背景色
        p5.background("#FFFFFF");
        // canvas 内の動きをなめらかにする
        p5.smooth();
        // draw()を 1/30秒ごとに実行
        p5.frameRate(30);
    };
};

export default p5Setup;