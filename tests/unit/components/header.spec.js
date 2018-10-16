import AddBudget from '@/components/Header'
import {shallowMount} from '@vue/test-utils'

describe('birthday', () => {
    let wrapper
    let $router = {push: () => {}}
    let push = jest.spyOn($router, 'push')
    beforeEach(() => {
      wrapper = shallowMount(AddBudget, {
        mocks: {
          $router
        }
      })
      push.mockClear()
    })
    let getMyToday = function (myDate) {
        return myDate;
    }
    it('default value', () => {
      expect(wrapper.vm.profile).toEqual({ name: 'Jackson', birthday: {month: 10, day: 18}})
    })
    it('is my birthday',()=>{
        wrapper.vm.getToday = function (params) {
            return new Date('2018-10-18')
        }
        expect(wrapper.vm._isBirthday()).toEqual(true);
    })
    it('is not my birthday',()=>{
        wrapper.vm.getToday = function (params) {
            return new Date('2018-10-19')
        }
        expect(wrapper.vm._isBirthday()).toEqual(false);
    })
})