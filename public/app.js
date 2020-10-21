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
      url: "/activities",
      method: "get",
    })
      .then((response) => {
        this.items = response.data.collection;
        this.items?.forEach((item) => {
          if (item.wpArea === "Citizenship with Global Perspe")
            item.wpArea = "Citizenship with Global Perspectives";
          if (item.wpArea === "Interpersonal Relation and Tea")
            item.wpArea = "Interpersonal Relation and Teamwork";
        });
        this.activities = this.items;
        this.loading = false;
      })
      .catch((err) => {
        console.log(err);
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
