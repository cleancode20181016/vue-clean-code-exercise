export class FizzBuzz{
     Show2(number) {
        var result = [];
        if(number % 3 == 0){
            result.push('Fizz');
        }
    
        if(number % 5 == 0){
            result.push('Buzz');
        }
        
       return result.length ? result.join('') : number.toString();
    }

    Show(number){
        let result = [[15, 'FizzBuzz'], [5, 'Buzz'], [3, 'Fizz']].find(divisor => number % divisor[0] === 0);
        // console.log(result);
        return result && result[1] || number.toString();
    }
}

