import Greetings from '@/views/external/greetings/Greetings.vue'
import Signin from '@/views/external/signin/Signin.vue'
import Signup from '@/views/external/signup/Signup.vue'

export default [
    {
      path: '/',
      name: 'greetings',
      component: Greetings
    },
    {
      path: '/signin',
      name: 'signin',
      component: Signin
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
]
  