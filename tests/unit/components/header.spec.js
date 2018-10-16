import header from '@/components/Header'
import {shallowMount} from '@vue/test-utils'

describe('Header', () => {
    function wrapper() {
        return shallowMount(header)
    }

    function wrapperInject(date) {
        return shallowMount(header, {
            methods : {
                getDate() {
                    return date;
                }
            }
        })
    }

    it('default value', () => {
        expect(wrapper().vm.profile).toEqual({name : 'Jackson', birthday : {month : 10, day : 18}})
    })

    it('not birthday', () => {
      var wrapper = wrapperInject(new Date(2018, 9, 17))
        expect(wrapper.vm.profileCaption).toEqual('Jackson')
    })

    it('is birthday', () => {
        var wrapper = wrapperInject(new Date(2018, 9, 18))
        expect(wrapper.vm.profileCaption).toEqual('Jackson🎂')
    })
})
