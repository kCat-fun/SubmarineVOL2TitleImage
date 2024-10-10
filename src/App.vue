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

    const sketch = (p: p5) => {
      p.setup = () => {
        p.createCanvas(800, 500);
        p.noLoop();
      };

      p.draw = () => {
        p.background(0);
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
