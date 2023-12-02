<template>
  <div class="home-container">
    <video controls autoplay loop muted class="video-container">
      <source src="@/assets/Intro.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  </div>
</template>

<script>
export default {
  name: 'HomeView'
}
</script>

<style scoped>
.home-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh; /* Set the height to cover the entire viewport */
}

.video-container {
  width: 80%; /* Adjust the width as needed */
  max-width: 800px; /* Set a maximum width if desired */
}
</style>
