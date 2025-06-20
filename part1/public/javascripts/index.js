const { createApp } = Vue;

createApp({
  data() {
    return {
        isOpen: false,
        firstButton: true,
        secondButton: false,
        imagePath: ''
    };
  },
  async mounted() {
    try {
        const res = await fetch('https://dog.ceo/api/breeds/image/random');
        this.imagePath =
    } catch (err) {

    }
  },
  methods: {
    open2rdButton() {
        this.firstButton = false;
        this.secondButton = true;
    },
    openPage() {
        this.secondButton = false;
        this.isOpen = true;
    }
  }
})
.mount('#app');