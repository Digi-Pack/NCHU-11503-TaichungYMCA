import arts1 from '@/assets/img/course/courseImg/arts-crafts1.jpeg'
import arts2 from '@/assets/img/course/courseImg/arts-crafts2.jpeg'
import arts3 from '@/assets/img/course/courseImg/arts-crafts3.jpeg'

import civic1 from '@/assets/img/course/courseImg/civic-local1.jpeg'
import civic2 from '@/assets/img/course/courseImg/civic-local2.jpeg'
import civic3 from '@/assets/img/course/courseImg/civic-local3.jpeg'

import digital1 from '@/assets/img/course/courseImg/digital-technology1.jpeg'
import digital2 from '@/assets/img/course/courseImg/digital-technology2.jpeg'
import digital3 from '@/assets/img/course/courseImg/digital-technology3.jpeg'

import health1 from '@/assets/img/course/courseImg/health-fitness1.jpeg'
import health2 from '@/assets/img/course/courseImg/health-fitness2.jpeg'
import health3 from '@/assets/img/course/courseImg/health-fitness3.jpeg'

import language1 from '@/assets/img/course/courseImg/language-culture1.jpeg'
import language2 from '@/assets/img/course/courseImg/language-culture2.jpeg'
import language3 from '@/assets/img/course/courseImg/language-culture3.jpeg'

import life1 from '@/assets/img/course/courseImg/life-skills1.jpeg'
import life2 from '@/assets/img/course/courseImg/life-skills2.jpeg'
import life3 from '@/assets/img/course/courseImg/life-skills3.jpeg'

import music1 from '@/assets/img/course/courseImg/music1.jpeg'
import music2 from '@/assets/img/course/courseImg/music2.jpeg'
import music3 from '@/assets/img/course/courseImg/music3.jpeg'

export const categoryImages = {
  '公民與在地': {
    thumbnail: civic1,
    detailImages: [civic2, civic3],
  },

  '生活應用': {
    thumbnail: life1,
    detailImages: [life2, life3],
  },

  '音樂表演': {
    thumbnail: music1,
    detailImages: [music2, music3],
  },

  '健康運動': {
    thumbnail: health1,
    detailImages: [health2, health3],
  },

  '語言文化': {
    thumbnail: language1,
    detailImages: [language2, language3],
  },

  '數位科技': {
    thumbnail: digital1,
    detailImages: [digital2, digital3],
  },

  '藝術手作': {
    thumbnail: arts1,
    detailImages: [arts2, arts3],
  },
}