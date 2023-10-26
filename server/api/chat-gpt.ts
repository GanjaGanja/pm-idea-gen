export default defineEventHandler(async (event) => {
  const payload = await readBody(event);

  const url =
    "https://iogpt-api-management-service.azure-api.net/openai/api/proxy/openai/chat/completions";

  const headers = {
    "Content-Type": "application/json",
    "iO-GPT-Subscription-Key": "ae8b142148264d3b98dc726c9954ecab",
  };

  const body = JSON.stringify({
    model: "gpt-35-turbo",
    messages: [
      {
        role: "user",
        content: payload.question,
      },
    ],
  });

  const answer = fetch(url, {
    method: "POST",
    headers,
    body
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data.choices[0].message.content;
    })
    .catch((error) => console.error("Error:", error));

  return answer;
});
