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
    // const GRID_SIZE: number = 1;
    const w: number = 20;
    const cols: number = 51;
    const rows: number = 33;
    // マップの変数を空の配列に初期化
    const map: number[][] = [];

    const width = w * cols; //Math.floor(cols / 2.0); + GRID_SIZE * Math.ceil(cols / 2.0);
    const height = w * rows; //Math.floor(rows / 2.0); + GRID_SIZE * Math.ceil(rows / 2.0);;

    const sketch = (p: p5) => {
      p.setup = () => {
        // キャンバスのサイズを800x500に設定
        p.createCanvas(width, height);
        // 再描画無しに設定
        p.noLoop();
        // マップの初期化
        for (let i = 0; i < rows; i++) {
          map[i] = [];
          for (let j = 0; j < cols; j++) {
            if (i % 2 == 0 && j % 2 == 0) {
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
          // const Y: number = (GRID_SIZE * Math.ceil(i / 2.0)) + (w * Math.floor(i / 2.0));
          for (let j = 0; j < cols; j++) {
            // const X: number = (GRID_SIZE * Math.ceil(j / 2.0)) + (w * Math.floor(j / 2.0));
            // if (map[i][j] == 1) {
            // p.fill(255);
            // p.rect(X, Y, GRID_SIZE, GRID_SIZE);
            // } else {
            p.fill(
              (Math.abs(Math.sin((((i * j) / (cols * rows)) / 360.0) * 360 + ((Math.PI * 2) / 3.0)))) * 230,
              (Math.abs(Math.sin((((i * j) / (cols * rows)) / 360.0) * 360 + ((Math.PI * 2) / 6.0)))) * 230,
              (Math.abs(Math.sin((((i * j) / (cols * rows)) / 360.0) * 360 + ((Math.PI * 2) / 4.0)))) * 230
            );
            p.rect(j * w, i * w, w, w);
            // }
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

<style scoped></style>
