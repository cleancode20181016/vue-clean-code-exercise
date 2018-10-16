import Profile from '@/views/Profile.vue'
import Api from '@/api.js'
import {shallowMount} from '@vue/test-utils'

//jest.mock('@/api.js')

describe('Profile', () => {
    const myProfile = {
        name: 'Ryan',
        birthday: {
          year: 1984,
          month: 10,
          day: 9,
        }
    };

    it('should call api.getProfile on beforeMount', () => {
        Api.getProfile = jest.fn()
          .mockReturnValue(myProfile)
        const wrapper = shallowMount(Profile);

        expect(wrapper.vm.profile).toEqual(myProfile);
    })
    it('should call api.update on save', () => {
        Api.updateProfile = jest.fn();
        const wrapper = shallowMount(Profile);

        Object.assign(wrapper.vm.$data.profile, myProfile);
        wrapper.vm.save();

        expect(Api.updateProfile).toHaveBeenCalledWith({
            name: 'Ryan',
            birthday: {
              year: 1984,
              month: 10,
              day: 9,
            }
        })
    })
})