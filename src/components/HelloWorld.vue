<template>
  <div class="hello">
    <p>Mon ip</p>
    <h1>{{ip}}</h1>
    <p>😹😹😹</p>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return { ip: null };
  },
  methods: {
    getUserIP(onNewIP) {
      //  onNewIp - your listener function for new IPs
      //compatibility for firefox and chrome
      var myPeerConnection =
        window.RTCPeerConnection ||
        window.mozRTCPeerConnection ||
        window.webkitRTCPeerConnection;
      var pc = new myPeerConnection({
          iceServers: []
        }),
        noop = function() {},
        localIPs = {},
        ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g;

      function iterateIP(ip) {
        if (!localIPs[ip]) onNewIP(ip);
        localIPs[ip] = true;
      }

      //create a bogus data channel
      pc.createDataChannel("");

      // create offer and set local description
      pc.createOffer().then(function(sdp) {
        sdp.sdp.split("\n").forEach(function(line) {
          if (line.indexOf("candidate") < 0) return;
          line.match(ipRegex).forEach(iterateIP);
        });

        pc.setLocalDescription(sdp, noop, noop);
      });

      //listen for candidate events
      pc.onicecandidate = function(ice) {
        if (
          !ice ||
          !ice.candidate ||
          !ice.candidate.candidate ||
          !ice.candidate.candidate.match(ipRegex)
        )
          return;
        ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
      };
    }
  },
  mounted() {
    this.getUserIP(ip => {
      this.ip = ip;
    });
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
