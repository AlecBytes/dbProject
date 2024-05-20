export default [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),

    children: [
      { path: '', component: () => import('pages/homePage.vue'), meta: { title: 'Home' } },
      { path: 'runsToOuts', component: () => import('pages/queryOne.vue'), meta: { title: 'Runs-to-Outs by Salary range' } },
      { path: 'spendingPerWin', component: () => import('pages/queryTwo.vue'), meta: { title: 'Team Spending Per Win' } },
      { path: 'foreignBorn', component: () => import('pages/queryThree.vue'), meta: { title: 'Foreign-born MLB player distributions' } },
      { path: 'sizePerformance', component: () => import('pages/queryFour.vue'), meta: { title: 'Player Height & Performance' } },
      { path: 'hrPost', component: () => import('pages/queryFive.vue'), meta: { title: 'Home Runs & Post Season' } },
      { path: 'feedback', component: () => import('pages/submitFeedback.vue'), meta: { title: 'Feedback' } },
      { path: 'thanks', component: () => import('pages/thankYou.vue'), meta: { title: 'Thank You' } },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

//]

//export default routes
