import Header from '@/components/Header.vue'
import {shallowMount} from '@vue/test-utils'
import TimeProvider from '@/domain/timeProvider.js';

describe('add budget', () => {
  const createWrapper = () => shallowMount(Header, {
    stubs: {
      'router-link': true,
    }
  })
  let originalNow = TimeProvider.now
  afterAll(() => {
    TimeProvider.now = originalNow
  })
  it('no cake', () => {
    TimeProvider.now = () => new Date(2018, 9, 16)
    const wrapper = createWrapper()
    expect(wrapper.vm.profileCaption).toEqual('Jackson')
  })
  it('have cake', () => {
    TimeProvider.now = () => new Date(2018, 9, 18)
    const wrapper = createWrapper()
    expect(wrapper.vm.profileCaption).toEqual('Jackson🎂')
  })
  it('empty name', () => {
    TimeProvider.now = () => new Date()
    const wrapper = createWrapper()
    wrapper.vm.profile.name = ''
    expect(wrapper.vm.profileCaption).toEqual('Profile')
  })
})
