import Header from '@/components/Header'
import {shallowMount} from '@vue/test-utils'

describe('birthday', () => {
    let wrapper

    function InitShallowMount(today) {
        return shallowMount(Header, 
            { 
                methods: { 
                    getToday() {
                        return today || new Date();
                    }
                }
            });
    }
 
    it('is my birthday',()=>{
        let today = new Date('2018-10-18');
        let wrapper = InitShallowMount(today) 
        
        expect(wrapper.vm._isBirthday()).toEqual(true);
        expect(wrapper.vm.profileCaption).toEqual('Jackson🎂');
    })

    it('is not my birthday',()=>{
        let today = new Date('2018-10-19');
        let wrapper = InitShallowMount(today) 
        
        expect(wrapper.vm._isBirthday()).toEqual(false);
        expect(wrapper.vm.profileCaption).toEqual('Jackson');
    })
})