<template>
  <div class="footer">
    <a href="https://github.com/yaonggod"
      ><b-icon class="github left" icon="github"></b-icon
    ></a>
    <a href="https://github.com/dreammandoo"
      ><b-icon class="github" icon="github"></b-icon
    ></a>
  </div>
</template>

<script>
export default {
  name: "FooterView",
};
</script>

<style scoped>
.footer {
  background-color: aquamarine;
  position: fixed;
  bottom: 0;
  width: 100%;
}

.github {
  margin-top: 5px;
  margin-bottom: 5px;
  font-size: 30px;
  color: white;
}
.left {
  margin-right: 10px;
}
</style>
