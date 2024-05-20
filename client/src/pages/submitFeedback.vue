<template>
  <q-page padding class="column items-center">

    <div style="max-width: 800px;" >
      <q-card>
        <q-card-section>
          <div class="text-h5">
            Feedback Form
          </div>
          <div class="text-body1">
            Please complete the form below.
          </div>
        </q-card-section>
        <q-card-section>

          <q-form
            method="post"
            @submit="onSubmit"
            @reset="onReset"
            class="q-gutter-md"
          >
            <q-input
              filled
              v-model="name"
              label="Your name *"
              color="secondary"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
            />
      
            <q-input
              filled
              type="email"
              v-model="email"
              label="Email address*"
              lazy-rules
              color="secondary"
              :rules="[
                val => val && val.length > 0 || 'Please type something',
                val => /^.+@.+\..+$/.test(val) || 'Please type a valid email'
              ]"
            />
      
            <div class="text-h6">
              Select all visualizations for which you are leaving feedback:
            </div>

            <q-checkbox right-label v-model="q1" label="Runs-to-Outs by Salary Range" />
            <q-checkbox right-label v-model="q2" label="Team Spending Per Win" />
            <q-checkbox right-label v-model="q3" label="Foreign-born players" />
            <q-checkbox right-label v-model="q4" label="Player hieght and performance" />
            <q-checkbox right-label v-model="q5" label="Home Runs & Post Season" />
            
            <q-input
              v-model="feedbackBody"
              label="Write feedback here..."
              filled
              autogrow
            />
      
      
            <div>
              <q-btn label="Submit" type="submit" color="primary"/>
              <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
            </div>
          </q-form>
        </q-card-section> 
      </q-card>

      <q-img  src="~/assets/feedback3.png" style="max-width: 800px;"/>
  
    </div>
  </q-page>

</template>

<script>
import { useQuasar } from 'quasar'
import { Notify } from 'quasar'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
    components: { 
      
     },
    setup() {
        const $q = useQuasar();
        const router = useRouter();
        const name = ref(null);
        const email = ref(null);
        const feedbackBody = ref(null);
        const q1 = ref(false);
        const q2 = ref(false);
        const q3 = ref(false);
        const q4 = ref(false);
        const q5 = ref(false);


        return {
            q1,
            q2,
            q3,
            q4,
            q5,
            name,
            email,
            feedbackBody,
            debug() {
              console.log(name.value);
              console.log(email.value);
              console.log(q1.value);
              console.log(q2.value);
              console.log(q3.value);
              console.log(q4.value);
              console.log(q5.value);
              console.log(feedbackBody.value);
            },

            async onSubmit() {
              console.log(name.value);
              console.log(email.value);
              console.log(feedbackBody.value);

              let response = await fetch('https://www.baseballdatatrends.com/feedback', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                      email: email.value,
                      name: name.value,
                      q1: q1.value ? 1 : 0,
                      q2: q2.value ? 1 : 0,
                      q3: q3.value ? 1 : 0,
                      q4: q4.value ? 1 : 0,
                      q5: q5.value ? 1 : 0,
                      feedback: feedbackBody.value
                  })
              });

              console.log(response);
              if (response.ok) {
                // $q.notify({
                //       color: 'green-4',
                //       textColor: 'white',
                //       icon: 'cloud_done',
                //       message: 'Form submitted successfully'
                //   });

                  router.push('/thanks');
              }
              else {
                  $q.notify({
                      color: 'red-4',
                      textColor: 'white',
                      icon: 'cloud_done',
                      message: 'Form submission failed'
                  });
              }

      },
            onReset() {
                name.value = null;
                email.value = null;
                feedbackBody.value = null;
                // this.group = [];
                this.q1 = false;
                this.q2 = false;
                this.q3 = false;
                this.q4 = false;
                this.q5 = false;

            }
        };
    }
}
</script>
