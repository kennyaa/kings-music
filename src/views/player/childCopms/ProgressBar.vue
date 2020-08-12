<template>
  <div class="progress-bar" ref="progressBar">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper" 
          ref="progressBtn"
          @touchstart.prevent="progressBtnStart"
          @touchmove.prevent="progressBtnMove"
          @touchend="progressBtnEnd">
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import {prefixStyle} from '../../../common/dom'
 
 const btnWidth = 15
 const transform = prefixStyle('transform')
 
export default {
  name: "ProgressBar",
  props:{
     percent:{
       type: Number,
       default: 0
     }
  },
  created(){
    this.touch = {}
  },
  methods:{
    progressBtnStart(e){
         this.touch.initiated = true
         this.touch.startX = e.touches[0].pageX
         this.touch.left = this.$refs.progress.clientWidth
    },
    progressBtnMove(e){
      if(!this.touch.initiated){
        return
      }
      const deltaX = e.touches[0].pageX - this.touch.startX
      const offsetWidth = Math.min(this.$refs.progressBar.clientWidth - btnWidth,Math.max(0,this.touch.left + deltaX))
      this._offset(offsetWidth)
   },
    progressBtnEnd(){
       this.touch.initiated = false
       this._triggerPercent()
    },
    _offset(setWidth){
       this.$refs.progress.style.width = `${setWidth}px`
       this.$refs.progressBtn.style[transform] = `translate3d(${setWidth}px,0,0)`
    },
    _triggerPercent(){
      const barWidth = this.$refs.progressBar.clientWidth - btnWidth
      const percent = this.$refs.progress.clientWidth / barWidth 
      this.$emit('percentChange',percent)
    }
  },
  watch:{
    percent(newPercent){
      if(newPercent >= 0 && !this.touch.initiated){
        const barWidth = this.$refs.progressBar.clientWidth - btnWidth
        const setWidth = newPercent * barWidth
        this._offset(setWidth)
      }
    }
  }
};
</script>

<style scoped>
.progress-bar {
  height: 30px;
  border-radius: 5px;
}
.bar-inner {
  position: relative;
  top: 13px;
  height: 4px;
  background: rgba(0, 0, 0, 0.3);
}
.progress {
  position: absolute;
  height: 100%;
  background: #BFEFFF;
}

.progress-btn-wrapper {
  position: absolute;
  left: -8px;
  top: -13px;
  width: 30px;
  height: 30px;
}
.progress-btn {
  position: relative;
  top: 7px;
  left: 7px;
  box-sizing: border-box;
  width: 16px;
  height: 16px;
  border: 3px solid #FFFFFF;
  border-radius: 50%;
  background: #BFEFFF;
}
</style>