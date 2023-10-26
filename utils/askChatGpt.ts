export const $askChatGpt = async (question = "") => 
   await $fetch('/api/chat-gpt', {method: 'post', body: {question}})
