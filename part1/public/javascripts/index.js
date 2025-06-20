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