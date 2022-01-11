<template>
  <div class="language">
    <h1>{{ $t("settings.language") }}</h1>
    <p>
      <strong>{{ $t("settings.languageTips") }}</strong>
    </p>

    <div class="cell" v-for="it in Object.keys(options)" :key="it">
      <input
        v-model="language"
        type="radio"
        :id="it"
        name="locale"
        :value="it"
        :checked="!!it.match(language)"
        @change="change_language"
      />
      <label :for="it">{{ options[it] }}</label>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, watchEffect } from "vue";
import { useI18n } from "vue-i18n";
import { messages } from "@/locale";
import { useStore } from "vuex";
const store = useStore();
const language = ref("");
const { locale, availableLocales } = useI18n({ useScope: "global" });

watchEffect(() => {
  language.value = store.state.settings.locales;
  return store.state.settings.locales;
});

onMounted(() => {
  requestAnimationFrame(() => {});
});
const languages = ref(messages);

const options = reactive({
  zh: "zh - 简体中文",
  en: "en - 英语",
  yue: "yue - 粤语",
  kor: "kor - 韩语",
  th: "th - 泰语",
  pt: "pt - 葡萄牙语",
  el: "el - 希腊语",
  bul: "bul - 保加利亚语",
  fin: "fin - 芬兰语",
  slo: "slo - 斯洛文尼亚语",
  cht: "cht - 繁体中文",
  fra: "fra - 法语",
  ara: "ara - 阿拉伯语",
  de: "de - 德语",
  nl: "nl - 荷兰语",
  est: "est - 爱沙尼亚语",
  cs: "cs - 捷克语",
  swe: "swe - 瑞典语",
  vie: "vie - 越南语",
  jp: "jp - 日语",
  spa: "spa - 西班牙语",
  ru: "ru - 俄语",
  it: "it - 意大利语",
  pl: "pl - 波兰语",
  dan: "dan - 丹麦语",
  rom: "rom - 罗马尼亚语",
  hu: "hu - 匈牙利语",
});
function change_language() {
  if (languages.value) {
    const value = availableLocales.find((it) => it.match(language.value));
    locale.value = value;
    store.commit("update_locales", value);
    store.dispatch("postUpdateUser", { locales: value });
  }
}
</script>

<style lang="scss" scoped>
.language {
  padding: 0 40px;
  height: 80vh;
  overflow-y: scroll;
  padding-bottom: 20px;
  .cell {
    // line-height: 30px;
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    label {
      margin-right: 15px;
      line-height: 32px;
    }

    input {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;

      border-radius: 50%;
      width: 16px;
      height: 16px;

      border: 2px solid #999;
      transition: 0.2s all linear;
      outline: none;
      margin-right: 10px;

      position: relative;
    }

    input:checked {
      border: 6px solid black;
    }
  }
}
</style>
