import Header from '@/components/Header.vue'
import {shallowMount} from '@vue/test-utils'

describe('add budget', () => {
  let today = new Date();
  const OrigDate = Date;
  Date = function () {
    return today;
  }
  const createWrapper = () => shallowMount(Header, {
    stubs: {
      'router-link': true,
    }
  })
  afterAll(() => {
    Date = OrigDate
  })
  it('no cake', () => {
    today = new OrigDate(2018, 9, 16)
    const wrapper = createWrapper()
    return Promise.resolve().then(() => {
      expect(wrapper.vm.profileCaption).toEqual('Jackson')
    })
  })
  it('have cake', () => {
    today = new OrigDate(2018, 9, 18)
    const wrapper = createWrapper()
    return Promise.resolve().then(() => {
      expect(wrapper.vm.profileCaption).toEqual('Jackson🎂')
    });
  })
  it('empty name', () => {
    const wrapper = createWrapper()
    wrapper.vm.profile.name = ''
    expect(wrapper.vm.profileCaption).toEqual('Profile')
  })
})
