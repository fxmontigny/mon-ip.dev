<template>
  <div class="hello">
    <p>Mon ip</p>
    <h1>{{ip}}</h1>
    <p>😹😹😹</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "HelloWorld",
  data() {
    return { ip: null };
  },
  methods: {
    loadIp() {
      axios.get("/ip").then(response => {
        this.ip = response.data.ipClient;
      });
    }
  },
  mounted() {
    this.loadIp();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
