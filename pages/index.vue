<template>
  <VContainer>
    <VRow>
      <VCol>
        <h1>Tell me about your idea for a new product or service?</h1>
        <VTextField
          label="Give a name to your idea"
          v-model="formValues.name"
        />
        <VTextarea
          label="Insert the description of your idea"
          v-model="formValues.description"
        />

        <h2>Who is the target audience?</h2>
        <p>
          Understanding who will use the app can help in designing the app to
          meet their needs.
        </p>
        <VTextarea
          label="Describe you user like age, hobbies, location, etc."
          v-model="formValues.targetAudience"
        />

        <h2>What is the primary purpose or function of the product</h2>
        <p>
          The app should have a clear purpose. If it tries to do too much, it
          might not do anything particularly well
        </p>
        <VTextarea
          label="Describe you user like age, hobbies, location, etc."
          v-model="formValues.primaryPurpose"
        />

        <h2>What problem does this product solve?</h2>
        <p>
          The most successful products solve a specific problem for the user.
        </p>
        <VTextarea
          label="Describe you user like age, hobbies, location, etc."
          v-model="formValues.productSolves"
        />

        <h2>How will the app be monetized?</h2>
        <p>
          Will it be a paid app, or free with in-app purchases or advertising?
        </p>
        <VTextarea
          label="Describe you user like age, hobbies, location, etc."
          v-model="formValues.monetization"
        />

        <h2>
          Insert the problems your users has and the benefits your ideas
          deliver?
        </h2>
        <VForm @submit.prevent="onAddBenefit">
          <VRow>
            <VTextField
              label="Insert users benefits of your idea?"
              v-model="formValues.benefit"
            />
            <VBtn color="primary" type="submit">Add</VBtn>
          </VRow>
        </VForm>
        <VList>
          <VListItem v-for="benefit in store.userBenefits" :key="benefit">
            <VListItemTitle>{{ benefit }}</VListItemTitle>
          </VListItem>
        </VList>

        <VForm @submit.prevent="onAddProblem">
          <VRow>
            <VTextField
              label="Insert the problems you user has without your idea?"
              v-model="formValues.problem"
            />
            <VBtn color="primary" type="submit">Add</VBtn>
          </VRow>
        </VForm>
        <VList>
          <VListItem v-for="problem in store.userProblems" :key="problem">
            <VListItemTitle>{{ problem }}</VListItemTitle>
          </VListItem>
        </VList>

        <VBtn color="primary" @click="storeInitialProductIdea">Save</VBtn>

        <VBtn :loading="isLoading" color="primary" @click="submit"
          >Ask ChatGPT for Business model canvas</VBtn
        >

        <!-- ================== -->
        <fragment v-if="answer">
          <h3>answer</h3>
          <pre>{{ JSON.parse(answer) }}</pre>
        </fragment>
        <!-- ================== -->

      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup lang="ts">
import { useBizStore } from "@/stores/biz";

const store = useBizStore();
const answer = ref("");
const isLoading = ref(false);

const emptyFormValues = {
  name: "",
  description: "",
  targetAudience: "",
  primaryPurpose: "",
  productSolves: "",
  monetization: "",
  benifits: "",
  problem: "",
};

const formValues = ref(emptyFormValues);

const onAddBenefit = () => {
  store.addBenefit(formValues.value.benefit);
  formValues.value.benefit = "";
};

const onAddProblem = () => {
  store.addProblem(formValues.value.problem);
  formValues.value.problem = "";
};

const storeInitialProductIdea = () => {
  store.setInitialIdea(formValues.value);
  formValues.value = emptyFormValues;
};

const prompt = `
  I have an idea for a product named ${
    store.idea.name
  } that does the following: ${store.idea.description}.
  The primary purpose of this idea is ${store.idea.primaryPurpose}.
  The target audience for this idea is ${store.targetAudience}.
  The problem this idea solves is ${store.userProblems.join(", ")}.
  The benefits of this idea are ${store.userBenefits.join(", ")}.
  ${
    store.monetization
      ? `The monetization of this idea is ${store.monetization} with some added sugestions.`
      : "give me a suggestion of a monetization."
  }

  Give a business model canvas, a value propositon canvas, and a sales page copy for this idea with added suggestions. Make sure you just return the json value with the following scheme: 
  {
  "businessModelCanvas": {
    "customerSegments": {
      "description": "String",
      "segments": ["String"]
    },
    "valuePropositions": {
      "description": "String",
      "propositions": ["String"]
    },
    "channels": {
      "description": "String",
      "channelsList": ["String"]
    },
    "customerRelationships": {
      "description": "String",
      "relationships": ["String"]
    },
    "revenueStreams": {
      "description": "String",
      "streams": ["String"]
    },
    "keyResources": {
      "description": "String",
      "resources": ["String"]
    },
    "keyActivities": {
      "description": "String",
      "activities": ["String"]
    },
    "keyPartnerships": {
      "description": "String",
      "partnerships": ["String"]
    },
    "costStructure": {
      "description": "String",
      "costs": ["String"]
    }
  },
  "valueProposition": {
        "ProductsAndServices": ["String"],
          "PainRelievers": ["String"],
        "GainCreators": ["String"]
      },
      "CustomerSegment": {
        "CustomerJobs": ["String"],
        "Pains": ["String"],
        "Gains": ["String"]
    },
    "salesPageCopy": {
        "Headline": "String",
        "Subheadline": "String",
        "Benefits": ["String"],
        "Features": ["String"],
        "Testimonials": ["String"],
        "Guarantee": "String",
        "CallToAction": "String"
    }
}
`;

const submit = async () => {
  answer.value = "";
  isLoading.value = true;
  answer.value = await $askChatGpt(prompt);
  isLoading.value = false;
  store.setModel(JSON.parse(answer.value));
};
</script>
