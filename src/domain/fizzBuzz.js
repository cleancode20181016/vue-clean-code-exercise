export class FizzBuzz{
     Show(num) {
        var result = [];
        if(num % 3 == 0){
            result.push('Fizz');
        }
    
        if(num % 5 == 0){
            result.push('Buzz');
        }
        

        return result.length ? result.join('') : num.toString();
    }
}

