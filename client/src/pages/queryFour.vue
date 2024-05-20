<template>
  <q-page padding>
    <div class="q-gutter-md">

      <!-- <q-card>
        <q-card-section>
          <div class="text-h6">Sub title</div>
          <div class="text-body1">text body...</div>
        </q-card-section>
      </q-card>
      <q-card>
        <q-card-section>
          <div class="text-h6">Methodology</div>
          <div class="text-body1">text body...</div>
        </q-card-section>
      </q-card>
      <q-card>
        <q-card-section>
          <div class="text-h6">Analysis and Visualization</div>
          <div class="text-body1">Text body..</div>
        </q-card-section>
      </q-card> -->

      <q-card>
        <q-card-section>
          <div class="text-h6">
            Select a range of seasons and click the run visualization button:
          </div>
        </q-card-section>
        <q-card-section>
          <q-range
            name="year_range"
            v-model="year_range"
            label-always
            color="primary"
            :markers="false"
            :min="1934"
            :max="2022"
            :step="1"
            :drag-range="false"
          />
        </q-card-section>

        <q-card-section>
          <div class="text-h6">
            Select a performance metric:
          </div>
          <q-option-group
            v-model="metric"
            :options="metric_options"
            color="primary"
            inline
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
        <q-img
          v-if="showPlaceholder"
          fit="fill"
          src="~/assets/q4-cardImage.png"
          class="query-img-card"
        />

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
          :labels_xaxis="xlabels"
          :lineTension="smoothCurve"
          :dataSets="dataSets"
          :yaxisTitle="yaxisTitle"
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
          icon="navigate_before"
          to="/queryThree"
        />
        <q-btn
          class="glossy"
          rounded
          size="lg"
          color="accent"
          icon-right="navigate_next"
          to="queryFive"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import chartCard from "../components/chartCard.vue";
import { ref } from 'vue';

export default {
  components: {
    chartCard,
  },
  data() {
    return {
      progress: false,
      year_range: {
        min: 1871,
        max: 2022,
      },
      showPlaceholder: true,
      showVisualization: false,
      showLoading: false,

      metric: ref("OBP"),
      metric_options: [
        {
          label: "OBP",
          value: "OBP",
        },
        {
          label: "RF",
          value: "RF",
        },
        {
          label: "OBPA",
          value: "OBPA",
        }
      ],

      smoothCurve: 0.5,
      yaxisTitle: "test",
      xlabels: [],
      chartTitle: "Player Performance Metric by Year",
      dataSets: [
        {
          data: [],
          label: "shortest",
          borderColor: "#26A69A",
          pointRadius: 0,
          fill: false,
        },
        {
          data: [],
          label: "short",
          borderColor: "#1976D2",
          pointRadius: 0,
          fill: false,
        },
        {
          data: [],
          label: "medium",
          borderColor: "#FFA000",
          pointRadius: 0,
          fill: false,
        },
        {
          data: [],
          label: "medium tall",
          borderColor: "#C10015",
          pointRadius: 0,
          fill: false,
        },
        {
          data: [],
          label: "tall",
          borderColor: "#21BA45",
          pointRadius: 0,
          fill: false,
        },
        {
          data: [],
          label: "tallest",
          borderColor: "#C10015",
          pointRadius: 0,
          fill: false,
        }
      ],

      dataFromOracle: [],
    };
  },
  methods: {
    async runQuery() {
      try {
        this.showPlaceholder = false;
        this.showVisualization = false;
        this.showLoading = true;
        console.log(this.year_range.min, this.year_range.max);

        this.progress = true;

        console.log(this.metric);
        let response;
        if (this.metric == "OBP") {
          if (this.year_range.min < 1955) {
            this.year_range.min = 1955;
          }

          response = await fetch(`https://158.101.115.160:3000/q4/obp?startYear=${this.year_range.min}&endYear=${this.year_range.max}`);
          this.yaxisTitle = "On Base Percentage";
        }
        else if (this.metric == "RF") {
          if (this.year_range.min < 1934) {
            this.year_range.min = 1934;
          }

          response = await fetch(`https://158.101.115.160:3000/q4/rf?startYear=${this.year_range.min}&endYear=${this.year_range.max}`);
          this.yaxisTitle = "Range Factor";
        }
        else if (this.metric == "OBPA") {
          if (this.year_range.min < 1970) {
            this.year_range.min = 1970;
          }

          response = await fetch(`https://158.101.115.160:3000/q4/obpa?startYear=${this.year_range.min}&endYear=${this.year_range.max}`);
          this.yaxisTitle = "On Base Percentage Against";
        }

        let data = await response.json();
        this.dataFromOracle = data;

        console.log(data);

        this.xlabels = data.map((item) => item[0]);
        this.dataSets[0].data = data.map((item) => item[1]);
        this.dataSets[1].data = data.map((item) => item[2]);
        this.dataSets[2].data = data.map((item) => item[3]);
        this.dataSets[3].data = data.map((item) => item[4]);
        this.dataSets[4].data = data.map((item) => item[5]);
        this.dataSets[5].data = data.map((item) => item[6]);

        this.progress = false;
        this.showLoading = false;
        this.showVisualization = true;
      } catch (error) {
        console.error(error);
        this.showLoading = false;
        this.progress = false;
      }
    },
    reset() {
      this.dataFromOracle = [];
      this.showPlaceholder = true;
      this.showVisualization = false;
      this.year_range.min = 1871;
      this.year_range.max = 2022;
    },
  },
};
</script>
