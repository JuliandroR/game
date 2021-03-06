import ClassSearch from '@/views/internal/student/class/search/ClassSearch.vue'
import ClassAdd from '@/views/internal/student/class/add/ClassAdd.vue'
import ClassAddCodeReader from '@/views/internal/student/class/add/ClassAddCodeReader.vue'
import ClassRoom from '@/views/internal/student/class/classroom/ClassRoom.vue'
import ClassExercises from '@/views/internal/student/class/exercises/ClassExercises.vue'
import ClassScore from '@/views/internal/student/class/score/ClassScore.vue'
import ClassRanking from '@/views/internal/student/class/ranking/ClassRanking'

export default [
    {
        path: '/student/:studentId/classes',
        name: 'studentClass',
        component: ClassSearch,
        meta: {
            requiresAuth: true,
            authorities: 'student'
        }
    },
    {
        path: '/student/:studentId/classes/add',
        name: 'studentClassAdd',
        component: ClassAdd,
        meta: {
            requiresAuth: true,
            authorities: 'student'
        }
    },
    {
        path: '/student/:studentId/classes/add/code-reader',
        name: 'studentClassAddCodeReader',
        component: ClassAddCodeReader,
        meta: {
            requiresAuth: true,
            authorities: 'student'
        }
    },
    {
        path: '/student/:studentId/classes/classroom/:classroomId',
        name: 'studentClassRoom',
        component: ClassRoom,
        meta: {
            requiresAuth: true,
            authorities: 'student'
        }
    },
    {
        path: '/student/:studentId/classes/classroom/:classroomId/exercises',
        name: 'studentExercises',
        component: ClassExercises,
        meta: {
            requiresAuth: true,
            authorities: 'student'
        }
    },
    {
        path: '/student/:studentId/classes/classroom/:classroomId/score',
        name: 'studentScore',
        component: ClassScore,
        meta: {
            requiresAuth: true,
            authorities: 'student'
        }
    },
    {
        path: '/student/:studentId/classes/classroom/:classroomId/ranking',
        name: 'studentRanking',
        component: ClassRanking,
        meta: {
            requiresAuth: true,
            authorities: 'student'
        }
    }
]
