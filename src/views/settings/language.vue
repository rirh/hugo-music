<template>
  <div class="language">
    <h1>{{ $t("settings.language") }}</h1>
    <p>
      <strong>{{ $t("settings.languageTips") }}</strong>
    </p>

    <div class="cell" v-for="it in Object.keys(languages)" :key="it">
      <input
        v-model="language"
        type="radio"
        :id="it"
        name="locale"
        :value="it"
        :checked="!!it.match(language)"
        @change="change_language"
      />
      <label :for="it">{{ options[it] }} </label>
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
  de_de: "德语 - German - Deutsch ",
  en_us: "英语 - English - English",
  es: "西班牙语 - Spanish - Español",
  fr: "法语 - French - français",
  gr: "希腊语 - Greek (Greece) - Ελληνικά",
  ha: "豪萨语 - Hausa - Hausa",
  hi: "印地语 - Hindi - हिंदी ",
  hu_hu: "匈牙利语（匈牙利）- Hungarian (Hungary) - magyar (Magyarország)",
  ja: "日本語 - Japanese - 日本語",
  ko: "韩语 - Korean - 한국어",
  pt_br: "葡萄牙语（巴西）- Portuguese (Brazil) - Português (Brasil)",
  pt_pt: "葡萄牙语（葡萄牙） - Portuguese (Portugal) - Português (Portugal)",
  tw: "汉语 - Chinese (Traditional) - 中文（繁體）",
  zh: "汉语 - Chinese (Simplified) - 中文（简体）"
});
function change_language() {
  if (languages.value) {
    const value = availableLocales.find(it => it.match(language.value));
    locale.value = value;
    store.commit("update_locales", value);
    store.dispatch("postUpdateUser", {locales:value});
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
