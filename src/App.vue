<template>
    <div ref="p5Canvas"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import p5 from 'p5';

export default defineComponent({
  name: 'P5Sketch',
  setup() {
    const p5Canvas = ref<HTMLDivElement | null>(null);

    // プロパティーの設定
    // 420*142
    const w: number = (5580 / 5.0) / 51.0;
    const cols: number = 51;
    const rows: number = Math.ceil((1733.0 / 5.0) / w);
    // マップの変数を空の配列に初期化
    const map: number[][] = [];

    const width = w * cols;
    const height = w * rows;
    let canvas: p5.Renderer;

    const sketch = (p: p5) => {
      p.setup = () => {
        // キャンバスのサイズを800x500に設定
        canvas = p.createCanvas(width, height);
        // 再描画無しに設定
        p.noLoop();

        for (let i = 0; i < rows; i++) {
          map[i] = [];
          for (let j = 0; j < cols; j++) {
            if (i == 0 || i == rows - 1 || j == 0 || j == cols - 1 || (i % 2 == 0 && j % 2 == 0)) {
              map[i][j] = 1;
            } else {
              map[i][j] = 0;
            }
          }
        }
      };

      p.draw = () => {
        p.background(0);
        p.noStroke();
        for (let i = 0; i < rows; i++) {
          for (let j = 0; j < cols; j++) {
            p.fill(
              (Math.abs(Math.sin((((i * j) / (cols * rows)) / 360.0) * 360 + ((Math.PI * 2) / 3.1)))) * 230,
              (Math.abs(Math.sin((((i * j) / (cols * rows)) / 360.0) * 360 + ((Math.PI * 2) / 6.1)))) * 230,
              (Math.abs(Math.sin((((i * j) / (cols * rows)) / 360.0) * 360 + ((Math.PI * 2) / 4.1)))) * 230
            );
            p.rect(j * w, i * w, w, w);
            p.fill(0);
            p.circle(j * w, i * w, 2);
            p.fill(0, 0, 0, 20);
            p.triangle(j * w, i * w, j * w + w, i * w, j * w, i * w + w);
          }
        }
      };
    };

    onMounted(() => {
      if (p5Canvas.value) {
        new p5(sketch, p5Canvas.value);
      }
    });

    return {
      p5Canvas,
    };
  },
});
</script>