const { createApp } = Vue;

createApp({
  data() {
    return {

    };
  },
  async mounted() {
    // try {
    //   const res = await fetch('/api/all_book_listing');
    //   this.book_list = await res.json();
    // } catch (err) {
    //   console.error(err);
    // }
  },
  methods: {
    closeModal() {
        this.showModal = false;
        this.book_id = '';
        this.message = '';
    },
    openModal(book) {
      this.showModal = true;
      this.selectedBook = book;
    },
    sendMessage() {
      fetch('/message/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          book_id: this.selectedBook.book_id,
          message: this.message
        })
      });
      this.closeModal();
    }
  }
})
.mount('#app');