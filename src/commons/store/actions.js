import actionTypes from '@/commons/constants/action-types'
import mutationTypes from '@/commons/constants/mutation-types'
import firebase from 'firebase'

import createRandomId from '@/globals/utils/createRandomId'

export default {
    async [actionTypes.CREATE_CLASS]({dispatch}, classToSave) {
        try {
            const id = createRandomId()
            classToSave.uid = id
            await firebase.firestore().collection('classes').doc(id).set(classToSave)
            return classToSave
        } catch (error) {
            throw error
        }
    },

    async [actionTypes.CREATE_USER]({commit}, user) {
        try {
            await firebase.firestore().collection('users').doc(user.uid).set(user)
            commit(mutationTypes.SET_USER, user)
        } catch (error) {
            throw error
        }
    },

    async [actionTypes.FIND_CLASS]({commit}, uid) {
        try {
            const response = await firebase.firestore().collection('classes').doc(uid).get()
            const classFound = response.data()
            commit(mutationTypes.SET_CLASSROOM, classFound)
            return classFound
        } catch (error) {
            throw error
        }
    },

    async [actionTypes.FIND_CHALLENGES](context) {
        try {
            const response = await firebase.firestore().collection('challenges').get()

            const challengesFound = []
            response.forEach(doc =>  challengesFound.push(doc.data()))

            return challengesFound
        } catch (error) {
            throw error
        }
    },

    async [actionTypes.FIND_CHALLENGES_CLASS]({dispatch, commit}, classroomId) {
        try {
            const snapshot = await firebase.firestore().collection('classes').doc(classroomId).get()
            const response = snapshot.data().challenges

            let challengesDb = await dispatch(actionTypes.FIND_CHALLENGES)

            let challenges = []
            for (let i = 0; i < response.length; i++) {
                if(challengesDb[i].uid === response[i].uid.id) {
                    challenges.push(challengesDb[i])
                }
            }
            commit(mutationTypes.SET_CHALLENGES_CLASS, challenges)
            return challenges
        } catch (error) {
            throw error
        }
    },

    async [actionTypes.FIND_STUDENT_CLASSES]({commit}, uid) {
        try {
            const reference = firebase.firestore().collection('users').doc(uid)
            const snapshot = await firebase.firestore().collection('classes').where('students', 'array-contains', reference).get()

            const classes = []
            snapshot.forEach(doc =>  classes.push(doc.data()))

            commit(mutationTypes.SET_MYCLASSES, classes)
            return classes
        } catch (error) {
            throw error
        }
    },

    async [actionTypes.FIND_TEACHER_CLASSES](context, uid) {
        try {
            const reference = firebase.firestore().collection('users').doc(uid)
            const snapshot = await firebase.firestore().collection('classes').where('teacher', '==', reference).get()

            const classes = []
            snapshot.forEach(doc =>  classes.push(doc.data()))

            return classes
        } catch (error) {
            throw error
        }
    },

    async [actionTypes.FIND_MANY_USERS_BY_REFERENCE](context, references) {
        try {
            const users = []
            let response
            for (let i = 0; i < references.length; i++) {
                response = await references[i].get()
                users.push(response.data())
            }
            return users
        } catch (error) {
            throw error
        }
    },

    async [actionTypes.FIND_SCORE_USER]({commit}, uid) {
        try {
            const response = await firebase.firestore().collection('users').doc(uid).get()
            const score = response.data().score
            return score
        } catch (error) {
            throw error
        }
    },

    async [actionTypes.FIND_USER]({commit}, uid) {
        try {
            const response = await firebase.firestore().collection('users').doc(uid).get()
            const user = response.data()
            commit(mutationTypes.SET_USER, user)
            return user
        } catch (error) {
            throw error
        }
    },

    async [actionTypes.FIND_USER_BY_REFERENCE](context, reference) {
        try {
            const response = await reference.get()
            const user = response.data()
            return user
        } catch (error) {
            throw error
        }
    },

    async [actionTypes.JOIN_CLASS]({dispatch}, {code, user}) {
        try {
            const classFound = await dispatch(actionTypes.FIND_CLASS, code)
            
            if (!classFound) {
                const error = {code: 'business-rule/class-not-found'}
                throw error
            }

            await firebase.firestore().collection('classes').doc(classFound.uid).update({
                    students: firebase.firestore.FieldValue.arrayUnion(user)
                })

            return classFound
        } catch (error) {
            throw error
        }
    },

    async [actionTypes.RESET_PASSWORD](context, email) {
        try {
            await firebase.auth().sendPasswordResetEmail(email)
        } catch (error) {
            throw error
        }
    },

    async [actionTypes.SIGNIN](context, {email, password}) {
        try {
            const user = await firebase.auth().signInWithEmailAndPassword(email, password)
            return user
        } catch (error) {
            throw error
        }
    },

    async [actionTypes.SIGNOUT]({commit}) {
        try {
            await firebase.auth().signOut();

            const classroom = {}
            const myClasses = {}
            const user = {}

            commit(mutationTypes.SET_CLASSROOM, classroom)
            commit(mutationTypes.SET_MYCLASSES, myClasses)
            commit(mutationTypes.SET_USER, user)
        } catch (error) {
            throw error;
        }
    },

    async [actionTypes.SIGNUP](context, {email, password}) {
        try {
            const user = await firebase.auth().createUserWithEmailAndPassword(email, password)
            return user
        } catch (error) {
            throw error
        }
    },

    async [actionTypes.UPDATE_CLASS_CHALLENGE]({dispatch}, {classroomId, challengeId, userId, performance}) {
        try {
            const classFound = await dispatch(actionTypes.FIND_CLASS, classroomId)

            if (!classFound) {
                const error = {code: 'business-rule/class-not-found'}
                throw error
            }

            const snapshot = await firebase.firestore().collection('classes').doc(classroomId).get()
            const challenges = snapshot.data().challenges
            for (let i = 0; i < challenges.length; i++) {
                if(challenges[i].uid.id == challengeId) {
                    let hasPerformance = 0;

                    for (let j = 0; j < challenges[i].performances.length; j++) {
                        if(challenges[i].performances[j].studentUid.id == userId) {
                            challenges[i].performances[j] = performance
                            hasPerformance++;
                        }
                    }
                    if(hasPerformance === 0) {
                        challenges[i].performances.push(performance)
                    }
                }
            }

            await firebase.firestore().collection('classes').doc(classroomId).update({
                challenges: challenges
            })

        } catch (error) {
            throw error
        }
    },

    async [actionTypes.UPDATE_SCORE_USER](context, {userId, score}) {
        try {
            await firebase.firestore().collection('users').doc(userId).update({
                score: score
            })
        } catch (error) {
            throw error
        }
    }
}
