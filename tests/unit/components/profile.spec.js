import profile from '@/views/Profile.vue'
import {shallowMount} from '@vue/test-utils'
import Api from '@/api'

describe('profile', () => {
    function wrapper() {
        return shallowMount(profile)
    }

    it('save', () => {
        var vm = wrapper().vm;
        let updateProfile = Api.updateProfile = jest.fn()
        vm.save()
        expect(updateProfile).toHaveBeenCalledWith(vm.profile)
    })
})
