import profile from '@/views/Profile.vue'
import {shallowMount} from '@vue/test-utils'
import Api from '@/api'

describe('profile', () => {

    function wrapper() {
        Api.getProfile = jest.fn().mockReturnValue(null);
        return shallowMount(profile)
    }

    it('save', () => {
        var vm = wrapper().vm;
        // Api.updateProfile = jest.fn()
        let saveProfile
        Api.updateProfile = profile => { saveProfile = profile }
        vm.save()
        // expect(Api.updateProfile).toHaveBeenCalledWith(vm.profile)
        expect(saveProfile).toEqual(vm.profile)
    })
})
