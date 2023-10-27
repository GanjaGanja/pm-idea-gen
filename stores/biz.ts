import { defineStore } from "pinia";
import type { Idea } from "~/types/idea";

export const useBizStore = defineStore("biz", {
  state: () => ({
    idea: {
      name: "icecream app",
      description: "app where you can order italian icecream in one hour",
    },
    targetAudience: "Parents who have children in the Netherlands",
    userBenefits: ["fast delivery", "good quality", "less sugar"],
    userProblems: [
      "not enough time",
      "not enough money",
      "quick treath for children",
    ],
    monetizaton: "",
    primaryPurpose: "",
    businessModelCanvas: null,
    valuePropositionCanvas: null,
    salesPage: null,
  }),
  actions: {
    addBenefit(benefit: string) {
      this.userBenefits.push(benefit);
    },
    addProblem(problem: string) {
      this.userProblems.push(problem);
    },
    setInitialPojectIdea({
      name,
      description,
      targetAudience,
      userBenefits,
      userProblems,
      monetization,
      primaryPurpose,
    }) {
      this.idea.name = name;
      this.idea.description = description;
      this.targetAudience = targetAudience;
      this.userBenefits = userBenefits;
      this.userProblems = userProblems;
      this.monetizaton = monetization;
      this.primaryPurpose = primaryPurpose;
    },
    setModelsAndSalesPage({
      businessModelCanvas,
      valueProposition,
      salesPageCopy,
    }) {
      this.businessModelCanvas = businessModelCanvas;
      this.valuePropositionCanvas = valueProposition;
      this.salesPage = salesPageCopy;
    },
  },
});
