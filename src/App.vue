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

    const SIZE: number = 20;
    const GRID_SIZE: number = 5;

    const rows: number = 35;
    const cols: number = 23;
    const map: Array<number[]> = [];

    const sketch = (p: p5) => {
      p.setup = () => {
        p.createCanvas(800, 500);
        // p.colorMode(p.HSB, 255);
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

        for (let i = 0; i < map.length; i++) {
          for (let j = 0; j < map[i].length; j++) {
            if (map[i][j] === 1) {
              p.fill(255);
            } else {
              p.fill(50);
            }
            let w = SIZE;
            let h = SIZE;
            if (i % 2 == 0)
              w = GRID_SIZE;
            else if (j % 2 == 0)
              h = GRID_SIZE;
            p.rect(
              SIZE * Math.floor(i / 2.0) + GRID_SIZE * Math.ceil(i / 2.0),
              SIZE * Math.floor(j / 2.0) + GRID_SIZE * Math.ceil(j / 2.0),
              w, h
            );
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
