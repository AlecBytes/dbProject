<template>
  <q-page padding>
    <div class="q-gutter-md">
      <q-card>
        <q-card-section>
          <div class="text-h6">
            Select a range of seasons and click the run visualization button.
          </div>
        </q-card-section>
        <q-card-section>
          <q-range
            @change="setTeamsInRange"
            name="year_range"
            v-model="year_range"
            label-always
            color="primary"
            :markers="false"
            :min="1985"
            :max="2016"
            :step="1"
            :drag-range="false"
          />
        </q-card-section>

        <q-card-section>
          <q-select
            outlined
            v-model="team"
            :options="teams"
            label="Select a team"
          />
        </q-card-section>

        <q-card-section>
          <q-btn
            class="glossy"
            :loading="progress"
            color="accent"
            @click="runQuery"
          >
            Run Visualization
            <template v-slot:loading>
              <q-spinner-gears class="on-left" />
              Calculating...
            </template>
          </q-btn>
          <q-btn
            class="glossy q-ml-sm"
            :loading="progress"
            color="primary"
            @click="reset"
            label="Reset"
          />
        </q-card-section>
      </q-card>

      <q-card>
        <q-linear-progress
          v-if="showLoading"
          indeterminate
          rounded
          size="20px"
          color="secondary"
        />
        <chartCard
          v-if="showVisualization"
          :chartTitle="chartTitle"
          :labels_xaxis="xAxisLabels"
          :lineTension="smoothCurve"
          :dataSets="dataSets"
          :yaxisTitle="yAxisTitle"
        ></chartCard>

        <q-img
          v-if="showPlaceHolder"
          fit="fill"
          src="~/assets/q2-cardImage.png"
          class="query-img-card"
        />
      </q-card>

      <div class="q-gutter-md flex justify-center q-mr-lg">
        <q-btn
          size="lg"
          class="glossy"
          rounded
          color="accent"
          icon="home"
          to="/"
        />
        <q-btn
          class="glossy"
          rounded
          size="lg"
          color="accent"
          icon="navigate_before"
          to="/spendingPerWin"
        />
        <q-btn
          class="glossy"
          rounded
          size="lg"
          color="accent"
          icon-right="navigate_next"
          to="sizePerformance"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import chartCard from "../components/chartCard.vue";

export default {
  components: {
    chartCard,
  },
  data() {
    return {
      smoothCurve: 0.5,
      fill1: false,
      yAxisTitle: "Percentage",
      xAxisLabels: [],
      chartTitle: "The Effect of Foreign-born Team Percentage on Winning",

      dataSets: [
        {
          data: [],
          label: "",
          borderColor: "#1976D2",
          fill: false,
          fill: {
            target: "1",

          }
        },
        {
          data: [],
          label: "",
          borderColor: "#26A69A",
          fill: {
            target: "2",
            above: "#26A69A",
            below: "#9C27B0",
          }
        },
        {
          data: [],
          label: "",
          borderColor: "#1D1D1D",
          fill: false,
          pointRadius: 0,
        }
      ],
      progress: false,
      year_range: {
        min: 1985,
        max: 2016,
      },
      showVisualization: false,
      showPlaceHolder: true,
      showLoading: false,
      teams: [
        {
          label: "",
          value: "",
        },
      ],

      team: {
        label: "",
        value: "",
      },
    };
  },
  mounted() {
    this.setTeamsInRange();
  },
  methods: {
    debug() {
      console.log("debug clicked");
      console.log(this.year_range.min, this.year_range.max);
    },

    updateTeamLabels() {
      this.dataSets[0].label = this.team.value + " Foreign-born %";
      this.dataSets[1].label = this.team.value + " Win %";
      this.dataSets[2].label = "All Teams Win %";
    },

    async setTeamsInRange() {
      let response = await fetch(
        `https://www.baseballdatatrends.com/q3/teams_in_range?startYear=${this.year_range.min}&endYear=${this.year_range.max}`
      );
      let data = await response.json();

      // console.log(data);
      // console.log(this.year_range.min);
      // console.log(this.year_range.max);

      this.teams = data.map((item) => ({ label: item[1], value: item[0] }));
    },

    async runQuery() {
      this.showLoading = true;
      this.showVisualization = false;
      // console.log(this.year_range.min, this.year_range.max);

      this.updateTeamLabels();

      this.progress = true;

      let response = await fetch(
        `https://www.baseballdatatrends.com/q3?startYear=${this.year_range.min}&endYear=${this.year_range.max}&team=${this.team.value}`
      );
      let data = await response.json();
      this.xAxisLabels = data.map((item) => item[0]);

      this.dataSets[0].data = data.map((item) => item[1]);
      this.dataSets[1].data = data.map((item) => item[2]);
      this.dataSets[2].data = data.map((item) => item[3]);

      this.progress = false;
      this.showPlaceHolder = false;
      this.showLoading = false;
      this.showVisualization = true;
    },

    reset() {
      this.showVisualization = false;
      this.year_range.min = 1871;
      this.year_range.max = 2022;
    },
  },
};
</script>
