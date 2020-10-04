var LoadingBar = {
  template:
    '<div class="custom-progress" style="height: 10px"><div class="custom-bar" style="height: 10px"></div></div>',
};
new Vue({
  el: "#app",
  data: {
    activities: null,
    loading: true,
    items: null,
    areas: [
      "Citizenship with Global Perspectives",
      "Cultural Engagement",
      "Healthy Living",
      "Interpersonal Relation and Teamwork",
      "Leadership and Service ",
    ],
  },
  components: {
    "v-loading": LoadingBar,
  },
  mounted() {
    axios({
      // url: "https://wrapapi.com/use/ededdy/umwp/news/0.0.3",
      url: "/activities",
      method: "get",
      // data: {
      //   // "wrapAPIKey": "1RpF8AqqGz5fdUrzikjKB8ZD9Qy2RJ0G"
      //   wrapAPIKey: "1kL5Re2Vx3Evh5ITLS2oL0j26XObQjfE",
      // },
    }).then((response) => {
      // console.log(response.data);
      this.items = response.data.collection;
      this.loading = false;
    });
  },
  methods: {
    updateItems(area, evt) {
      document.querySelector(".active").classList.remove("active");
      evt.target.classList.add("active");
      if (area) {
        this.items = this.activities.filter((item) => item.wpArea === area);
      } else {
        this.items = this.activities.filter(Boolean);
      }
    },
  },
});
