<template>
  <!-- class="bg-image" -->
  <q-page >
    <!-- <q-btn class="glossy q-mb-sm" color="primary" label="Start Here" to="queryOne"/> -->
    <div class=" row justify-center">
      <q-img  src="~/assets/feedback3.png" style="max-width: 1300px;" class="justify-center q-mb-sm"/>

    </div>
    <div class="row q-gutter-md justify-center">

      <q-card class="queryCards">
        <q-img fit="cover" src="~/assets/q1-cardImage.png" class="query-img-card">
          <div class="absolute-full transparent">
            <q-list class="absolute-full transparent">
              <q-item to="queryOne" class="absolute-full transparent"></q-item>
            </q-list>
          </div>
          <div class="absolute-bottom text-h6">
            {{ q1_title }}
          </div>
        </q-img>
        
          <q-card-section>
            {{ q1_description }}
          </q-card-section>
      </q-card>

      <q-card fit="contain" class="queryCards" >
        <q-img src="~/assets/q2-cardImage.png" class="query-img-card">
          <div class="absolute-full transparent">
            <q-list class="absolute-full transparent">
              <q-item to="queryTwo" class="absolute-full transparent"></q-item>
            </q-list>
          </div>
          <div class="absolute-bottom text-h6">
            {{ q2_title }}
          </div>
        </q-img>

        <q-card-section>
          {{ q2_description }}
        </q-card-section>
      </q-card>

      <q-card class="queryCards">
        <q-img src="~/assets/q3-cardImage1.png" class="query-img-card">
          <div class="absolute-full transparent">
            <q-list class="absolute-full transparent">
              <q-item to="queryThree" class="absolute-full transparent"></q-item>
            </q-list>
          </div>
          <div class="absolute-bottom text-h6">
            {{ q3_title }}
          </div>
        </q-img>

        <q-card-section>
          {{ q3_description }}
        </q-card-section>
      </q-card>

      <q-card class="queryCards">
        <q-img src="~/assets/q4-cardImage1.png" class="query-img-card" fit="cover">
          <div class="absolute-full transparent">
            <q-list class="absolute-full transparent">
              <q-item to="queryFour" class="absolute-full transparent"></q-item>
            </q-list>
          </div>
          <div class="absolute-bottom text-h6">
            {{ q4_title }}
          </div>
        </q-img>

        <q-card-section>
          {{ q4_description }}
        </q-card-section>
      </q-card>

      <q-card class="queryCards">
        <q-img src="~/assets/q5-cardImage.png" class="query-img-card">
          <div class="absolute-full transparent">
            <q-list class="absolute-full transparent">
              <q-item to="queryFive" class="absolute-full transparent"></q-item>
            </q-list>
          </div>
          <div class="absolute-bottom text-h6">
            {{ q5_title }}
          </div>
        </q-img>

        <q-card-section>
          {{ q5_description }}
        </q-card-section>
      </q-card>

      <q-card class="queryCards">
        <q-img src="~/assets/howMany2.png" class="query-img-card">
          <div class="absolute-full transparent">
            <q-list class="absolute-full transparent">
              <q-item @click="countTuples" clickable class="absolute-full transparent"></q-item>
            </q-list>
          </div>

        </q-img>

        <q-card-section>
          Click the button to run a query that counts of all tuples in this website's database.
        </q-card-section>
        <q-card-actions class="flex-center q-gutter-md">
          <q-btn class="glossy" icon-right="arrow_right_alt" color="accent" label="Get Count" @click="countTuples" />
          <div class="text-h6">{{ tuple_count }}</div>
        </q-card-actions>
      </q-card>

    </div>

    <div class="row justify-center">
      <q-btn class="glossy q-my-sm" color="accent" label="Start Here" to="queryOne"/>
    </div>

  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomePage',
  data () {
    return {
        q1_title: 'Runs-to-Outs by Salary Range',
        q1_description: 'The connection between runs-to-outs by salary range, which helps explore whether higher paid players tend to have better offensive performance and how this relationship evolves over different seasons',
        q2_title: 'Team Spending Per Win',
        q2_description: 'Team spending and winning percentage, which sheds light on whether higher team spending translates into more victories',
        q3_title: 'Foreign-born Wins/Losses',
        q3_description: 'The distribution of foreign-born MLB players and their relation to team wins/losses, which aims to understand the contributions of increasingly global players',
        q4_title: 'Player Hieght and Performance',
        q4_description: 'The influence of player height on performance, which addresses questions about whether taller or shorter players have advantages in specific aspects of the game',
        q5_title: 'Home Runs and Post season',
        q5_description: 'The effect homeruns have on the chances of a player appearing in the postseason, which explores whether prolific home run hitters are likely to impact their team’s chances of making it to the postseason.',

        tuple_count: '?'
      }
  }
  ,
  methods: {
    async countTuples () {
      // console.log('counting tuples')
      let response = await fetch(
        `https://www.baseballdatatrends.com/count`
      );
      let data = await response.json();
      this.tuple_count = data[0][0].toLocaleString();
      //console.log(data);
      //console.log(data[0]);
    }
  }
})
</script>

<style >
  .text.color {
    color: black;
  }
  .queryCards
  {
    width: 100%;
    max-width: 350px;
  }

</style>
