import Profile from '@/views/Profile.vue'
import Api from '@/api.js'
import {shallowMount} from '@vue/test-utils'

describe('Profile', () => {
    it('should call api.update on save', () => {
        Api.updateProfile = jest.fn();
        const wrapper = shallowMount(Profile);

        wrapper.vm.save();

        expect(Api.updateProfile).toHaveBeenCalledWith({
            name: '',
            birthday: {
                year: 1980,
                month: 1,
                day: 1,
            }
        })
    })
})