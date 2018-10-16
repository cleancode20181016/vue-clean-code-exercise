import Header from '@/components/Header'
import {shallowMount} from '@vue/test-utils'

describe('birthday', () => {
    let wrapper
    let $router = {push: () => {}}
    let push = jest.spyOn($router, 'push')
 
    it('is my birthday',()=>{
        let wrapper = shallowMount(Header, { methods: { getToday() {
            return new Date('2018-10-18')
        }}});

        expect(wrapper.vm._isBirthday()).toEqual(true);
        expect(wrapper.vm.profileCaption).toEqual('Jackson🎂');
    })

    it('is not my birthday',()=>{
        let wrapper = shallowMount(Header, { methods: { getToday() {
            return new Date('2018-10-19')
        }}});
        expect(wrapper.vm._isBirthday()).toEqual(false);
        expect(wrapper.vm.profileCaption).toEqual('Jackson');
    })
})