<template>
  <VContainer>
    <VRow>
      <VCol>
        <h1>Index page</h1>
        <VForm @submit.prevent="submit">
          <VTextField label="Ask a question" v-model="question" />
          <VBtn :loading="isLoading" color="primary" type="submit">Button</VBtn>
        </VForm>

        <fragment v-if="answer">
          <h3>answer</h3>
          <pre>{{ answer }}</pre>
        </fragment>

      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup>
const question = ref("");
const answer = ref("");
const isLoading = ref(false);

const submit = async () => {
  answer.value = ""
  isLoading.value = true;
  answer.value = await $askChatGpt(question.value);
  isLoading.value = false;
};
</script>
