<template>
  <div class="animation" @mousewheel="disableScroll">
    <div v-if="$windowWidth <= 768" class="animation__burger">
      <Burger />
    </div>
    <navigation-menu v-if="$windowWidth <= 768" />
    <div id="animation">
      <div class="animation__content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import "./particles.js";
import NavigationMenu from "@/components/layout/navigationMenu/NavigationMenu.vue";
import Burger from "@/components/layout/Burger.vue";

export default {
  name: "Animation",
  components: { NavigationMenu, Burger },
  mounted() {
    particlesJS("animation", {
      particles: {
        number: { value: 40, density: { enable: true, value_area: 500 } },
        color: { value: "#ffffff" },
        shape: {
          type: "circle",
          stroke: { width: 0, color: "#000000" },
          polygon: { nb_sides: 5 },
          image: { src: "img/github.svg", width: 100, height: 100 },
        },
        opacity: {
          value: 0.5,
          random: false,
          anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false },
        },
        size: {
          value: 3,
          random: true,
          anim: { enable: false, speed: 40, size_min: 0.1, sync: false },
        },
        line_linked: {
          enable: true,
          distance: 190,
          color: "#ffffff",
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 6,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: { enable: false, rotateX: 600, rotateY: 1200 },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "repulse" },
          onclick: { enable: false, mode: "push" },
          resize: true,
        },
        modes: {
          grab: { distance: 400, line_linked: { opacity: 1 } },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3,
          },
          repulse: { distance: 150, duration: 0.4 },
          push: { particles_nb: 4 },
          remove: { particles_nb: 2 },
        },
      },
      retina_detect: true,
    });
  },
  unmounted() {
    window.pJSDom[0].pJS.fn.vendors.destroypJS();
    window["pJSDom"] = [];
  },
  methods: {
    disableScroll(evt) {
      if (evt.ctrlKey) {
        evt.preventDefault();
        return false;
      }
    },
  },
};
</script>

<style scoped>
#animation {
  background-color: var(--purple);
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
}
.animation__content {
  position: absolute;
  background-color: var(--light-grey);
  border-radius: 12px;
  box-shadow: 0 2px 7px 0 rgb(0 0 0 / 70%), 3px 27px 54px -34px rgb(0 0 0 / 47%);
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.animation__burger {
  background-color: var(--white);
  border-radius: 50%;
  box-shadow: 0 2px 7px 0 rgb(0 0 0 / 70%), 3px 27px 54px -34px rgb(0 0 0 / 47%);
  position: fixed;
  top: 9px;
  left: 18px;
  z-index: 2000;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
}
@media (max-width: 768px) {
  .animation__content {
    --width: 270px;
    --height: 220px;
  }
}
</style>


