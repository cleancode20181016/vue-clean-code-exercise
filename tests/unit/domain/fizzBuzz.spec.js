import {
    FizzBuzz,
  } from '../../../src/domain/fizzBuzz'
  
  describe('FizzBuzz', () => {
    let fizzBuzz
    beforeEach(() => {
        fizzBuzz = new FizzBuzz()
    })
    it('should return 1', ()=>{
        expect(fizzBuzz.Show(1)).toEqual('1');
    })

    it('should return Fizz', ()=>{
        expect(fizzBuzz.Show(3)).toEqual('Fizz');
    })

    it('should return Buzz', ()=>{
        expect(fizzBuzz.Show(5)).toEqual('Buzz');
    })

    it('should return FizzBuzz', ()=>{
        expect(fizzBuzz.Show(15)).toEqual('FizzBuzz');
    })
    
})


