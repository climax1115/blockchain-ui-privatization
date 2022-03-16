import countryMinix from '../../../../PC/common-mixin/countryList/countryList';

export default {
  name: 'bindPhone',
  mixins: [countryMinix],
  watch: {
    userInfo(userinfo) {
      this.googleCode = !!Number(userinfo.googleStatus);
    },
    sendSmsCode(sendSmsCode) {
      if (sendSmsCode !== null) {
        if (sendSmsCode.text === 'success') {
          this.$bus.$emit('tip', { text: sendSmsCode.msg, type: 'success' });
          this.$store.dispatch('resetType');
        } else {
          this.$bus.$emit('tip', { text: sendSmsCode.msg, type: 'error' });
          this.$store.dispatch('resetType');
        }
      }
    },
    mobileBindSave(mobileBindSave) {
      if (mobileBindSave !== null) {
        this.loading = false;
        if (mobileBindSave.text === 'success') {
          this.$bus.$emit('tip', { text: mobileBindSave.msg, type: 'success' });
          this.$store.dispatch('resetType');
          this.$router.push('/personal/userManagement');
        } else {
          this.$bus.$emit('tip', { text: mobileBindSave.msg, type: 'error' });
          this.$store.dispatch('resetType');
          if (mobileBindSave.code !== '10009') {
            this.$bus.$emit('getCode-clear', 'phone');
          }
        }
      }
    },
  },
  computed: {
    userInfo() {
      return this.$store.state.baseData.userInfo;
    },
    sendSmsCode() {
      return this.$store.state.personal.sendSmsCode;
    },
    mobileBindSave() {
      return this.$store.state.personal.mobileBindSave;
    },
  },
  data() {
    return {
      promptText: this.$t('personal.label.promptText'),
      errorText: this.$t('personal.label.errorText'),
      loading: false,
      checkValue1: '',
      checkValue2: '',
      checkValue3: '',
      promptText1: this.$t('personal.label.phone'),
      promptText2: this.$t('personal.label.smsCodeText'),
      promptText3: this.$t('personal.label.googleCodeText'),
      errorText1: this.$t('personal.prompt.errorPhone'),
      errorText2: this.$t('personal.prompt.errorPhone'),
      errorText3: this.$t('personal.prompt.errorCode'),
      checkErrorFlag1: false,
      checkErrorFlag2: false,
      checkErrorFlag3: false,
      disabled: true,
      googleCode: false,
      countryErrorFlag: false,
    };
  },
  methods: {
    init() {
      if (this.userInfo) {
        this.googleCode = !!Number(this.userInfo.googleStatus);
      }
    },
    // 手机正则
    phoneFlag(val) {
      return this.$store.state.regExp.phone.test(val);
    },
    codeFlag(val) {
      return this.$store.state.regExp.verification.test(val);
    },
    getCodeClick() {
      if (this.checkValue1 && !this.checkErrorFlag1) {
        this.$bus.$emit('getCode-start', 'phone');
        const info = {
          countryCode: this.countryKeyCode,
          mobile: this.checkValue1,
          operationType: 2,
        };
        this.$store.dispatch('sendSmsCode', info);
      } else {
        this.checkErrorFlag1 = true;
        this.errorText1 = this.$t('personal.prompt.errorPhoneText');
      }
    },
    inputChanges(value, name) {
      switch (name) {
        case 'phone': { // phone
          this.checkValue1 = value;
          if (this.phoneFlag(value)) {
            this.checkErrorFlag1 = false;
          } else {
            this.checkErrorFlag1 = true;
            this.errorText1 = this.$t('personal.prompt.errorPhone');
          }
          break;
        }
        case 'phoneCode': {
          this.checkValue2 = value;
          if (this.codeFlag(value)) {
            this.checkErrorFlag2 = false;
          } else {
            this.checkErrorFlag2 = true;
          }
          break;
        }
        default: { // google验证码
          this.checkValue3 = value;
          if (this.codeFlag(value)) {
            this.checkErrorFlag3 = false;
          } else {
            this.checkErrorFlag3 = true;
          }
        }
      }
      if (this.checkValue1 && this.checkValue2 && !this.checkErrorFlag1
        && !this.checkErrorFlag2 && !this.checkErrorFlag3) {
        if (this.googleCode) {
          if (this.checkValue3) {
            this.disabled = !this.checkValue3;
          }
        } else {
          this.disabled = false;
        }
      } else {
        this.disabled = true;
      }
    },
    btnLink() {
      this.loading = true;
      const info = {
        countryCode: this.countryKeyCode,
        mobileNumber: this.checkValue1,
        smsAuthCode: this.checkValue2,
        googleCode: this.checkValue3,
      };
      this.$store.dispatch('mobileBindSave', info);
    },
  },
};
