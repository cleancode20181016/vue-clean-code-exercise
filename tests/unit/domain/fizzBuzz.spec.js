import {
    FizzBuzz,
  } from '@/domain/fizzBuzz'
  
  describe('FizzBuzz', () => {
    let fizzBuzz
    beforeEach(() => {
        fizzBuzz = new FizzBuzz()
    })
    it('normal number should return itself', ()=>{
        expect(fizzBuzz.Show(1)).toEqual('1');
        expect(fizzBuzz.Show(8)).toEqual('8');
    })

    it('3 times should return Fizz', ()=>{
        expect(fizzBuzz.Show(3)).toEqual('Fizz');
        expect(fizzBuzz.Show(9)).toEqual('Fizz');
    })

    it('5 times should return Buzz', ()=>{
        expect(fizzBuzz.Show(5)).toEqual('Buzz');
        expect(fizzBuzz.Show(20)).toEqual('Buzz');
    })

    it('15 times should return FizzBuzz', ()=>{
        expect(fizzBuzz.Show(15)).toEqual('FizzBuzz');
        expect(fizzBuzz.Show(60)).toEqual('FizzBuzz');
    })
    
})


