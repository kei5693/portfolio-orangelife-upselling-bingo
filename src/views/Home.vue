<template>
  <div id="innerBox">
    <div class="wrap">
      <!-- title -->
      <div class="title">
        <h1>
          <img src="~@/assets/img/txt_home1.png" alt="생활습관으로 보는">
          <br>
          <strong><img src="~@/assets/img/txt_home2.png" alt="건강빙고!"></strong>
        </h1>
        <h2><img src="~@/assets/img/txt_home3.png" alt="생활습관으로 건강빙고를 맞혀보고 나에게 필요한 보장까지 한 번에 알아보세요!는"></h2>
      </div>
      <!-- //title -->

      <!-- contents -->
      <div
        class="contents"
        :class="{on : resultPage}"
      >
        <div class="reply-btn noApp" v-if="resultPage">
          <button type="button" @click="replayBingo"><span>다시하기</span></button>
          <p>
              본 정보는 질병의 주요 원인이 되는 생활습관들을<br>
              통해 앞으로의 질병과 필요한 보장을 예측해보는<br>
              단순 시뮬레이션으로서 정확한 질병 진단은 전문의의<br>
              상담을 받아보시기 바랍니다.
          </p>
        </div>
        <!-- puzzle-wrap -->
        <div class="puzzle-wrap">
          <div class="puzzle-box">
            <div class="empty-con">
              <div
                class="row"
                v-for="(row, rowIndex) in bingoList"
                :key="`bingo-row-${rowIndex}`"
              >
                <div
                  class="piece noApp"
                  v-for="(item, itemIndex) in row"
                  :key="`bingo-item-${itemIndex}`"
                  :id="`td-${rowIndex}-${itemIndex}`"
                  @click="clickItem(rowIndex, itemIndex)"
                >
                  <span v-html="item"></span>
                </div>
              </div>
            </div>
          </div>
          <!-- explan-wrap -->
          <div class="explan-wrap" ref="explanWrap">
            <div class="empty-con">
              <div class="rect-con" v-if="bingoPage">
                <div class="visual"></div>
                <div class="result-btn noApp" @click="showResult">
                  <div class="empty-con">
                    <div class="sub-txt">나의 건강빙고</div>
                    <span class="result-txt">결과보기</span>
                  </div>
                </div>
                <p>본 정보는 질병의 주요 원인이 되는 생활습관들을 통해 앞으로의 질병과 필요한 보장을 예측해보는 단순 시뮬레이션으로서 정확한 질병 진단은 전문의의 상담을 받아보시기 바랍니다.</p>
              </div>

              <div class="result-page" v-if="resultPage">
                <div class="inner">
                  <div class="visual">
                    <ul class="result-round-box">
                      <li>
                        <span>선택</span>
                        <strong>{{ selectItem }} <span>개</span></strong>
                      </li>
                      <li>
                        <span>완성</span>
                        <strong>{{ bingo }} <span>줄</span></strong>
                      </li>
                    </ul>

                    <div class="text-area">
                      <div class="sub-txt"
                        v-for="item in bottomSectionArr"
                        v-bind:key="item"
                        v-html="item"
                      >
                      </div>
                      <div class="result-explan"
                      >
                        <span
                          v-for="item in sectionArr"
                          v-bind:key="item"
                          v-html="item"
                        ></span>
                        
                      </div>
                    </div>
                  </div>
                  <!-- result-box -->
                  <div class="result-box">
                    <div class="inner">
                      <p>고객님에게 <strong>꼭 필요한 보장</strong>은?</p>
                      <div class="result-txt">
                        <div class="disease01" :class="{ on: disease01 }">
                          <p><span>암</span></p>
                        </div>
                        <div class="disease02" :class="{ on: disease02 }">
                          <p><span>질병</span></p>
                        </div>
                        <div class="disease03" :class="{ on: disease03 }">
                          <p><span>치매</span></p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- //result-box -->
                  
                </div>
              </div>

              <div class="reply-btn noApp">
                <button type="button" @click="replayBingo"><span>다시하기</span></button>
                <p>
                    본 정보는 질병의 주요 원인이 되는 생활습관들을
                    통해 앞으로의 질병과 필요한 보장을 예측해보는
                    단순 시뮬레이션으로서 정확한 질병 진단은 전문의의
                    상담을 받아보시기 바랍니다.
                </p>
              </div>
            </div>
          </div>
          <!-- //explan-wrap -->
        </div>
        <!-- //puzzle-wrap -->
      </div>
      <!-- //contents -->

      <button type="button" class="btnShare" @click="onClickShare()">팝업열기</button>

      <!-- POPUP share -->
      <div class="layerPopupBox" v-if="showUrlAlert">
        <div class="innerBox">
          <h2>공유하기</h2>
          <div class="contents-con">
            <ul class="share-list">
              <li @click="onClickKakao()">
                <img src="~@/assets/img/btn_kakao.png" alt="">
                <span>카카오톡</span>
              </li>
              <li
                class="url-copy"
                @click="onClickUrlCopy()"
              >
              <img src="~@/assets/img/btn_url.png" alt="">
              <span>URL복사</span>
              </li>
            </ul>
          </div>
          <button type="button" @click="onClickShare()">닫기</button>
        </div>
      </div>
      <!-- //POPUP -->
    </div>
  </div>
</template>

<script>
import smoothscroll from 'smoothscroll-polyfill';
smoothscroll.polyfill();

export default {
  name: "Home",
  components: {},

  data() {
    return {
      active: false,
      resultPage: false,
      bingoPage: true,
      disease01: false,
      disease02: false,
      disease03: false,
      nextPage: false,
      showUrlAlert: false,
      bingo: 0,
      selectItem: 0,
      sectionArr: [],
      recommendInsurance: [],
      bottomSectionArr: [],
      bingoList: [
        [
          "암<br> 가족력이 <br> 있다",
          "수육보다<br>훈제가<br>좋다",
          "야채·과일을<br>챙겨 먹지<br>못한다",
          "당뇨나<br>혈압이<br>있다",
          "음식을 빨리<br> 먹는편이다",
        ],
        [
          "65세 <br>이상이다",
          "가끔씩<br>과음한다",
          "혼자 있는<br>시간이<br>많다",
          "수면시간이<br> 충분하지<br>않다",
          "예민한<br>성격이다",
        ],
        [
          "과체중이다<br> <span>(BMI 23 이상)</span>",
          "규칙적으로<br>운동을<br>하지 않는다",
          "담배를 피고<br>있거나<br>핀적이 있다",
          "자리에<br>앉아있는<br>시간이 많다",
          "총 <br>콜레스테롤 <br>수치가높다 <br><span>(200mmHg↑)</span>",
        ],
        [
          "가까워도<br>차량으로<br>이용한다",
          "소시지 등<br>가공육류를<br>즐겨 먹는다",
          "만성질환을<br>가지고 있다<br><span>(천식, 골다공증 등)</span>",
          "스트레스는<br>쌓아 두는 편이다",
          "매운<br>음식을<br>선호한다",
        ],
        [
          "음주 시 2잔<br>이상이<br>기본이다",
          "달달한<br>간식을<br>즐겨먹는다",
          "아침식사는<br>거르는<br>편이다",
          "탄산음료를<br>즐겨먹는다",
          "정기적으로<br>건강검진을<br>받지않는다.",
        ],
      ],
      selectBingo: [
        [0, 1, 2, 3, 4],
        [5, 6, 7, 8, 9],
        [10, 11, 12, 13, 14],
        [15, 16, 17, 18, 19],
        [20, 21, 22, 23, 24],
      ],
      selectStar: [[], [], [], [], []],
      resultDiseaseTxt: [
        {txt: "암 발병 위험에 각별한 주의가 필요합니다."},
        {txt: "심장 뇌혈관질환에 대한 각별한 주의가 필요합니다."},
        {txt: "세상에서 가장 슬픈 병 치매,<br>치매예방이 필요합니다."},
        {txt: "과거 병력이나 혹은 나이때문에<br>보험가입을 망설이셨다면<br> 간편심사 상품을 알아보세요!"},
      ],
      resultAdvice: [
        {advice: "<p>개선이 시급합니다.</p> <span>오늘부터 꾸준한 운동과 올바른 생활습관으로 건강관리 시작!<br>더불어 3대 사망원인 질병과 치매, 장기요양에 대한 대비도 준비해보세요!</span>"},
        {advice: "<p>늦지 않았어요!</p> <span>꾸준한 운동과 올바른 생활습관으로<br> 건강을 챙겨보세요!<br>더불어 <strong>사망위험이 높은 질병</strong>에 대한<br>대비도 차근차근 준비하시는 것 어떨까요?</span>"},
        {advice: "<p>주의가 필요합니다.</p> <span>좋지 않은 생활습관들을 가지고 계시군요. 작은 습관들이 모여 큰 병을 만들 수 있습니다.<br>습관 개선과 함께 필수적으로 준비해야 할 보장도 챙겨보세요.</span>"},
        {advice: "<p>미리 준비하세요!</p> <span>100세 시대! 건강한 생활습관 점검 및 유지와 함께 든든한 보장설계를 추천드려요!</span>"},
        {advice: "<p>발병가능성이 높아요!</p> <span>건강에 좋지 않은 습관들이 있으시네요.<br>꾸준한 운동과 올바른 생활습관으로 건강을 챙기셔야 합니다.<br>더불어 든든한 보장도 미리미리 준비하세요!</span>"},
      ],
      healthGuide: [
        {txt: "<p>건강한 생활습관 가이드 </p><ul><li>적정 체중과 적정 체지방량을 유지한다.</li><li>전곡류와 콩류를 많이 먹는다.</li><li>여러가지 채소와 과일을 먹는다.</li><li>붉은색 육류를 적게 먹는다.</li><li>염분을 줄이고 싱겁게 먹는다.</li><li>저지방 우유를 매일 한 컵 마신다.</li></ul>"},
      ],
    };
  },
  created() {
    this.initKakao();
  },
  methods: {
    clickItem(rowIndex, itemIndex) {
      if (this.nextPage) {
        console.log("누르지마!");
        return;
      }
      //두번 누르면 아이템 -1 인덱스 들어옴
      var addValue = 5 * rowIndex + itemIndex; // 누른 아이템 인덱스
      var index = this.selectBingo[rowIndex][itemIndex]; //빙고 배열에서 숫자를 가져옴 : 누른 아이템 인덱스

      if (index == -1) {
        this.onAddSelectTd(rowIndex, itemIndex);
        this.$set(this.selectBingo[rowIndex], itemIndex, addValue);
        //눌러진 아이템 다시 누르면 원래 넘버로 채우기

        if (
          (rowIndex == 0 && itemIndex == 4) ||
          (rowIndex == 2 && itemIndex == 3) ||
          (rowIndex == 4 && itemIndex == 2)
        ) {
          this.$set(this.selectStar[rowIndex], itemIndex);
        }
        return;
      }
      this.onAddSelectTd(rowIndex, itemIndex);
      this.$set(this.selectBingo[rowIndex], itemIndex, -1);
      // 클릭하면 addClass 해주고 넘버링 -1 빙고배열에 넣어 줌

      if (
        (rowIndex == 0 && itemIndex == 4) ||
        (rowIndex == 2 && itemIndex == 3) ||
        (rowIndex == 4 && itemIndex == 2)
      ) {
        this.$set(this.selectStar[rowIndex], itemIndex, true);
      }
      //this.selectedItemNum();
    },
    selectedItemNum() {
      this.selectItem = 0;
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
          if (this.selectBingo[i][j] == -1) {
            this.selectItem += 1;
          }
        }
      }
    },
    onAddSelectTd(rowIndex, itemIndex) {
      this.$nextTick(() => {
        document
          .getElementById(`td-${rowIndex}-${itemIndex}`)
          .classList.toggle("on");
          this.selectedItemNum();
      });
    },
    showResult() {
      // 결과보기 버튼
      this.bingo = 0;
      this.bingoPage = !this.bingoPage;
      this.resultPage = !this.resultPage;
      this.checkHorizontal();     //FGHIJ, KLMNO
      this.checkVertical();       //BGLQV
      this.checkDiagonalLeft();   //AGMSY
      this.checkDiagonalRight();  //EIMQU
      this.section03Txt();
      this.checkInsurance();      // F or R or D
      this.noChecked();
      this.nextPage = true;

      this.$nextTick(() => {
        var scrollValue = this.$refs.explanWrap.getBoundingClientRect().top + window.pageYOffset -5; 
        window.scrollTo({ top: scrollValue, behavior: "smooth" })
      });
    },
    checkVertical() {
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
          if (this.selectBingo[j][i] === -1) {
            if (j === 4) {
              for (let k = 0; k < 5; k++) {
                if (k == 4 && i == 1) {
                  //세로줄 BGLQV
                  this.sectionIconAdd("health");
                  if ( !this.sectionArr.includes("심장 뇌혈관질환에 대한 각별한 주의가 필요합니다.") ) {
                    this.sectionArr.push(this.resultDiseaseTxt[1].txt);
                  }
                }
                document.getElementById(`td-${k}-${i}`).classList.add("bingo");
              }
              this.bingo++;
            }
          } else {
            break;
          }
        }
      }
    },
    checkHorizontal() {
      for (let i = 0; i < 5; i++) {
        if (
          this.selectBingo[i].every((x) => {
            return x === -1;
          })
        ) {
          for (let j = 0; j < 5; j++) {
            document.getElementById(`td-${i}-${j}`).classList.add("bingo");
            if (i == 1 && j == 4) {
              // FGHIJ 치매
              this.sectionArr.push(this.resultDiseaseTxt[2].txt);
              this.sectionIconAdd("alzheimer");
            } else if (i == 2 && j == 4) {
              // KLMNO 건강
              this.sectionArr.push(this.resultDiseaseTxt[1].txt);
              this.sectionIconAdd("health");
            }
          }
          this.bingo++;
        }
      }
    },
    checkDiagonalLeft() {
      var check = true;
      for (let i = 0; i < 5; i++) {
        if (this.selectBingo[i][i] !== -1) {
          check = false;
        }
      }
      if (check === true) {
        for (let i = 0; i < 5; i++) {
          if (this.selectBingo[i][i] == -1) {
            document.getElementById(`td-${i}-${i}`).classList.add("bingo");
          }
        }
        this.sectionArr.push(this.resultDiseaseTxt[0].txt);
        this.bingo++;
      }
      this.sectionIconAdd("cancer");
    },
    checkDiagonalRight() {
      var check = true;
      check = true;
      for (let i = 0; i < 5; i++) {
        if (this.selectBingo[i][4 - i] !== -1) {
          check = false;
        }
      }
      if (check === true) {
        for (let i = 0; i < 5; i++) {
          document.getElementById(`td-${i}-${4 - i}`).classList.add("bingo");
        }
        if ( !this.sectionArr.includes("암 발병 위험에 각별한 주의가 필요합니다.") ) {
          this.sectionArr.push(this.resultDiseaseTxt[0].txt);
        }
        this.bingo++;
      }
      this.sectionIconAdd("cancer");
    },
    section03Txt() {
      if (this.bingo > 3) {
        // 4줄 이상
        this.bottomSectionArr.push(this.resultAdvice[0].advice);
        this.sectionIconAdd("cancer/health/alzheimer");
      } else if (this.bingo == 3) {
        // 3줄
        this.bottomSectionArr.push(this.resultAdvice[1].advice);
        this.sectionIconAdd("cancer/health");
      } else if (this.bingo > 0 && this.bingo < 3) {
        // 1~1줄
        this.bottomSectionArr.push(this.resultAdvice[2].advice);
        this.sectionIconAdd("cancer/health");
      } else if (this.bingo == 0 && this.selectItem >= 6) {
        console.log(this.resultAdvice[2].advice);
        // 완성빙고 없음, 선택항목수 6개 이상
        this.bottomSectionArr.push(this.resultAdvice[4].advice);
        this.sectionIconAdd("cancer/health");
      } else if (this.selectItem < 6 && this.bingo == 0) {
        // 완성빙고 없음, 선택항목수 6개 미만
        this.bottomSectionArr.push(this.resultAdvice[3].advice);
        this.sectionIconAdd("cancer");
      }
    },
    checkInsurance() {
      // F or R or D
      if (this.selectBingo[1][0] == -1) {
        this.sectionArr.push(this.resultDiseaseTxt[3].txt);
        this.sectionIconAdd("health/alzheimer");
      }

      if (this.selectBingo[3][2] == -1) {
        if (!this.sectionArr.includes(this.resultDiseaseTxt[3].txt))
          this.sectionArr.push(this.resultDiseaseTxt[3].txt);
        this.sectionIconAdd("health/alzheimer");
      }

      if (this.selectBingo[0][3] == -1) {
        if (!this.sectionArr.includes(this.resultDiseaseTxt[3].txt))
          this.sectionArr.push(this.resultDiseaseTxt[3].txt);
        this.sectionIconAdd("health/alzheimer");
      }
    },
    noChecked() {
      if (this.sectionArr.length == 0) {
        this.sectionArr.push(this.healthGuide[0].txt);
      }
    },
    sectionIconAdd(desease) {
      switch (desease) {
        case "cancer":
          this.disease01 = true;
          break;
        case "health":
          this.disease02 = true;
          break;
        case "alzheimer":
          this.disease03 = true;
          break;
        case "cancer/health/alzheimer":
          this.disease01 = true;
          this.disease02 = true;
          this.disease03 = true;
          break;
        case "cancer/health":
          this.disease01 = true;
          this.disease02 = true;
          break;
        case "health/alzheimer":
          this.disease02 = true;
          this.disease03 = true;
          break;
      }
    },
    replayBingo() {
      window.scrollTo({ top: 0});

      this.resultPage = !this.resultPage;
      this.bingoPage = !this.bingoPage;
      this.active = false;
      this.resultPage = false;
      this.bingoPage = true;
      this.disease01 = false;
      this.disease02 = false;
      this.disease03 = false;
      this.nextPage = false;
      this.bingo = 0;
      this.selectItem = 0;
      this.sectionArr = [];
      this.recommendInsurance = [];
      this.bottomSectionArr = [];
      for (var i = 0; i < 5; i++) {
        for (var j = 0; j < 5; j++) {
          document.getElementById(`td-${i}-${j}`).classList.remove("bingo");
          document.getElementById(`td-${i}-${j}`).classList.remove("on");

          if (i == 0) {
            this.selectBingo[i][j] = j;
          } else if (i == 1) {
            this.selectBingo[i][j] = j + 5;
          } else if (i == 2) {
            this.selectBingo[i][j] = j + 10;
          } else if (i == 3) {
            this.selectBingo[i][j] = j + 15;
          } else if (i == 4) {
            this.selectBingo[i][j] = j + 20;
          }
        }
      }
    },
    initKakao(){
      // SDK를 초기화 합니다. 사용할 앱의 JavaScript 키를 설정해 주세요.
      Kakao.init('f4a7da4dc1366d9ec890931d259488c1');
      // SDK 초기화 여부를 판단합니다.
      //console.log(Kakao.isInitialized());
    },
    onClickShare(){
      this.showUrlAlert = !this.showUrlAlert;
    },
    onClickKakao(){
      Kakao.Link.sendCustom({
        templateId: 60356,
        templateArgs: {
          'title': '건강빙고 시뮬레이터',
          'description': '나의 생활습관으로 필요한 보장을 확인해보세요.'     
        }
      });
    },
    copyToClipboard(val) {
        const t = document.createElement("textarea");
        document.body.appendChild(t);
        t.value = val;
        t.select();
        document.execCommand('copy');
        document.body.removeChild(t);
    },
    onClickUrlCopy() {
      this.copyToClipboard('http://www.kyobo-letter.co.kr/simul/bingo/#/home');
      alert('URL이 복사되었습니다.');
    }
  },
};
</script>
