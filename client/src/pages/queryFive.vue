<template>
  <q-page padding>
    <div class="q-gutter-md">
      <q-card>

        <q-card-section>
          <q-knob

            :min="0"
            :max="100"
            :inner-min="50"
            :inner-max="97"
            v-model="percentile"
            show-value
            size="90px"
            :thickness="0.22"
            color="primary"
            track-color="grey-3"
            class="q-ma-md"
          >{{ percentile }}%
          </q-knob>
          <q-range
          name="year_range"
          v-model="year_range"
          label-always
          color="primary"
          :markers="false"
          :min="1871"
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
          :labels_xaxis="xlabels"
          :lineTension="smoothCurve"
          :dataSets="dataSets"
          :yaxisTitle="yaxisTitle"
        ></chartCard>

        <q-img
          v-if="showPlaceHolder"
          fit="fill"
          src="~/assets/q5-cardImage.png"
          class="query-img-card"
        />
      </q-card>

      <q-card>
        <q-card-section>
          <q-list dense bordered class="rounded-borders">
            <q-item clickable v-ripple>
              <q-item-section>
                1903: World series started
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section>
                1904: No World Series due to a dispute between the National League and the American League.
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section>
                1969: Increased number of teams in postseason due to league expansion and the introduction of the League Championship Series. 
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section>
                1994: No World Series due to a player strike.
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section>
                1995: Increased number of teams in postseason due to introduction of the Wild Card and the Division Series.
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section>
                1981: Increased number of teams in postseason due to players strike.
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section>
                2020: Increased number of teams in postseason due to COVID-19.
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>

      <q-card>
        <q-card-section>
          <q-list dense bordered class="rounded-borders">
            <q-item clickable v-ripple>
              <q-item-section>
                Being a top home run hitter generally correlates with a higher likelihood of appearing in the postseason.
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section>
                Adjusting the percentile shows that it doesn't take much more than the average number of home runs to see increase postseason appearances.
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
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
          icon-right="feedback"
          to="feedback"
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
        min: 1903, // first year of World Series
        max: 2022,
      },
      percentile: 95.0,
      progress: false,
      showVisualization: false,
      showPlaceHolder: true,
      showLoading: false,

      smoothCurve: 0.5,
      yaxisTitle: "% hitters in Postseason",
      xlabels: [],
      chartTitle: "Do players who hit the most HRs appear in the Postseason?",
      dataSets: [
        {
          data: [],
          label: "Top HR hitters",
          borderColor: "#FFA000",
          fill: "1",
          pointRadius: 0,
        },
        {
          data: [],
          label: "All hitters",
          borderColor: "#1976D2",
          fill: false,
          pointRadius: 0,
        },
      ],
      dataFromOracle: [],
    };
  },
  mounted() {},
  methods: {
    async runQuery() {
      this.showPlaceHolder = false;
      this.showVisualization = false;
      this.showLoading = true;
      //console.log(this.year_range.min, this.year_range.max);

      this.progress = true;
      
      // console.log("percentile: " + this.percentile);
      let percent_formatted = this.percentile.toFixed(2);
      percent_formatted *= 0.01;
      // console.log("percent_formatted: " + percent_formatted);
      try {
        let response = await fetch(
          // `http://158.101.115.160:4000/q5?startYear=${this.year_range.min}&endYear=${this.year_range.max}`
          // `http://158.101.115.160:4000/q5?startYear=${this.percentile}&endYear=${this.year_range.min}&percentile=${this.year_range.max}`
          `https://www.baseballdatatrends.com/q5?percentile=${percent_formatted}&startYear=${this.year_range.min}&endYear=${this.year_range.max}`
        );
        let data = await response.json();
        this.dataFromOracle = data;
  
        // console.log(data);
  
        this.xlabels = data.map((item) => item[0]);
        this.dataSets[0].data = data.map((item) => item[1]);
        this.dataSets[1].data = data.map((item) => item[2]);
  
        this.progress = false;
        this.showLoading = false;
        this.showVisualization = true;

      }
      catch (error) {
        console.log(error);
        this.progress = false;
        this.showLoading = false;
        this.showVisualization = false;
        this.showPlaceHolder = true;
      }
    },
    reset() {
      this.dataFromOracle = [];
      this.showVisualization = false;
      this.year_range.min = 1903;
      this.year_range.max = 2022;
      this.dataSets.forEach((dataset) => (dataset.data = []));
      this.percentile = 95;
    },
  },
};
</script>
