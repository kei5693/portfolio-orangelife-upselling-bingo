<template>
  <div id="app" @click="onCallNativeInterface">
    <router-view />
  </div>
</template>
<script>
export default {
  methods: {
    /**
     * 웹뷰 터치 했을때 상단/하단을 나오고 숨기는 토글 함수
     *
     * @param event
     */
    onCallNativeInterface(event) {
      // 제외목록
      const tagNames = [
        "button",
        "input",
        "a",
        "span",
        "label",
        "select",
        "textarea",
        "img",
        "path",
        "svg",
      ];

      var userAgent = navigator.userAgent;
      if (
        !tagNames.includes(event.target.tagName.toLowerCase()) &&
        event.target.className.indexOf("noApp") < 0
      ) {
        if (userAgent.match(/(\(iPod|\(iPhone|\(iPad)/)) {
          window.location = "js://onWebViewTouch";
        } else if (userAgent.match(/(Android)/)) {
          Jsinterface.onwebviewtouch();
        }
        console.log("메뉴바 나옴~!!!!", event.target);
      } else {
        console.log("메뉴바 안나옴");
      }
    },
  },
};
</script>