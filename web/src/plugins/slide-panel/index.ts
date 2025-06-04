import SlideContainer from './SlideContainer.vue'
import SidePanelWrapper from './SidePanelWrapper.vue'

export default {
  install(app: any) {
    app.component('SlideContainer', SlideContainer)
    app.component('SidePanelWrapper', SidePanelWrapper)
  },
}

export { SlideContainer, SidePanelWrapper }
