<template>
  <q-page padding>
    <div class="q-gutter-md">

      <!-- <q-card>
        <q-card-section>
          <div class="text-h6">
            Exploring the Impact of Salaries on Performance
          </div>
          <div class="text-body1">
            This section delves into how a player's salary can influence their
            offensive performance over time. It’s critical to examine the
            efficiency of players in terms of their ability to score and bring
            in runs, in relation to the number of outs. This analytical approach
            takes into account different salary ranges, categorizing them as
            high, medium, and low based on specific percentiles.
          </div>
        </q-card-section>
      </q-card>
      <q-card>
        <q-card-section>
          <div class="text-h6">Methodology</div>
          <div class="text-body1">
            To conduct this analysis, we categorize players into different
            salary brackets. Players earning at or above the 75th percentile are
            considered in the high salary range. Those in the middle 50% (25th
            to 75th percentile) fall into the medium category, while those below
            the 25th percentile are deemed to be in the low salary bracket.
          </div>
        </q-card-section>
      </q-card>
      <q-card>
        <q-card-section>
          <div class="text-h6">Analysis and Visualization</div>
          <div class="text-body1">
            The study calculates the average of certain performance metrics
            (such as home runs, batting average, and strikeouts) for all players
            within each salary bracket. These averages are then plotted over
            multiple MLB seasons (spanning from 2000 to 2020) to visualize
            trends and derive insights on the correlation between salary and
            performance.
          </div>
        </q-card-section>
      </q-card> -->

      <q-card>
        <q-card-section>
          <div class="text-h6">
            Select a range of seasons and click the run visualization button.
          </div>
        </q-card-section>

        <q-card-section>
          <q-range
            name="year_range"
            v-model="year_range"
            label-always
            color="primary"
            :markers="false"
            :min="1985"
            :max="2022"
            :step="1"
            :drag-range="false"
          />
        </q-card-section>

        <q-card-section>
          <q-btn
            class="glossy"
            :loading="progress"
            color="accent"
            @click="runQuery"
            label="Run Visualization"
          >
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

        <q-img
          v-if="showPlaceholder"
          fit="fill"
          src="~/assets/q1-cardImage.png"
          class="query-img-card"
        />

        <chartCard
          v-if="showVisualization"
          :chartTitle="chartTitle"
          :labels_xaxis="xlabels"
          :dataSets="dataSets"
          :yaxisTitle="yAxisTitle"
          :line-tension="smoothCurve"
        ></chartCard>
      </q-card>

      <div class="q-gutter-md flex justify-center q-mr-lg">
        <q-btn
          class="glossy"
          rounded
          size="lg"
          color="accent"
          icon="home"
          to="/"
        />
        <q-btn
          class="glossy"
          rounded
          size="lg"
          color="accent"
          icon-right="navigate_next"
          to="queryTwo"
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
      year_range: {
        min: 1871,
        max: 2022,
      },
      dataFromOracle: [],
      progress: false,
      showPlaceholder: true,
      showVisualization: false,
      showLoading: false,
      chartTitle: "Runs-to-Outs Ratio by Salary Range",
      yAxisTitle: "Runs-to-Outs Ratio",
      xlabels: [],
      smoothCurve: 0.5,

      dataSets: [
        {
          data: [],
          label: "High Salary",
          borderColor: "#FFA000",
          fill: false,
          pointRadius: 0,
        },
        {
          data: [],
          label: "Medium Salary",
          borderColor: "#1976D2",
          fill: false,
          pointRadius: 0,
        },
        {
          data: [],
          label: "Low Salary",
          borderColor: "#FF0000",
          fill: false,
          pointRadius: 0,
        }
      ]

    };
  },
  methods: {
    async runQuery() {
      this.showPlaceholder = false;
      this.showVisualization = false;
      this.showLoading = true;
      this.progress = true;

      let response = await fetch(
        `http://158.101.115.160:3000/q1?startYear=${this.year_range.min}&endYear=${this.year_range.max}`
      );
      let data = await response.json();
      this.dataFromOracle = data;
      console.log(data);

      this.xlabels = data.map((item) => item[0]);
      this.dataSets[0].data = data.map((item) => item[1]);
      this.dataSets[1].data = data.map((item) => item[2]);
      this.dataSets[2].data = data.map((item) => item[3]);


      this.progress = false;
      this.showLoading = false;
      this.showVisualization = true;
    },
    reset() {
      this.dataFromOracle = [];
      this.showVisualization = false;
      this.year_range.min = 1871;
      this.year_range.max = 2022;
      this.dataSets.forEach((dataset) => (dataset.data = []));
    },
  },
};
</script>
