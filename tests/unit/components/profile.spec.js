import Profile from '@/views/Profile'
import Api from '@/api'
import {shallowMount} from '@vue/test-utils'

describe('Profile', () => {
  it('save', () => {
    Api.updateProfile = jest.fn()
    let wrapper = shallowMount(Profile)
    let profile = {name: 'Jackson', birthday: {month: 9, day: 18}}
    wrapper.vm.profile = profile
    wrapper.vm.save()
    expect(Api.updateProfile).toHaveBeenCalledWith(profile)
  })
})