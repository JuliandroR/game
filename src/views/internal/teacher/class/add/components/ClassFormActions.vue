<template>
  <div>
    <button type="submit" class="nes-btn is-success full-width-button margin-bottom-1">Criar classe</button>
    <button @click="goToTeacherClass" type="button" class="nes-btn full-width-button is-error">Cancelar</button>
  </div>
</template>

<script>
export default {
  name: "class-form-actions",
  methods: {
    goToTeacherClass() {
      this.$router.push({name: "teacherClass"})
    }
  }
};
</script>
