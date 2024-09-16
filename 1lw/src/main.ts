function calc(expression: string): number | string {
    try {
        // Преобразуем выражение в массив токенов
        const tokens = tokenize(expression);

        // Вычисляем результат с использованием рекурсивной функции
        const result = evaluate(tokens);

        // Если токенов больше не осталось, возвращаем результат
        if (tokens.length === 0) {
            return result;
        } else {
            throw new Error("Неправильное выражение.");
        }
    } catch (error) {
        return (error as Error).message;
    }
}

// Функция для токенизации выражения (разделение на операторы и операнды)
function tokenize(expression: string): string[] {
    return expression
        .replace(/\(/g, " ( ")
        .replace(/\)/g, " ) ")
        .trim()
        .split(/\s+/); // Разделяем строку по пробелам
}

// Рекурсивная функция для вычисления выражения
function evaluate(tokens: string[]): number {
    if (tokens.length === 0) {
        throw new Error("Неправильное выражение.");
    }
    //вынимаем 1 элемент
    const token = tokens.shift();

    // Если это скобка, продолжаем вычисление вложенного выражения
    if (token === "(") {
        const result = evaluate(tokens);

        if (tokens.shift() !== ")") {
            throw new Error("Ожидалась закрывающая скобка.");
        }

        return result;
    }

    // Если это оператор, вычисляем его
    if (isOperator(token!)) {
        const operand1 = evaluate(tokens);
        const operand2 = evaluate(tokens);

        return performOperation(token!, operand1, operand2);
    }

    // в самом конце, если последнее что осталось в масиве это число, возвращаем его как результат
    const number = parseFloat(token!);
    if (isNaN(number)) {
        throw new Error(`Неправильный операнд: ${token}`);
    }

    return number;
}

// Функция для проверки, является ли токен оператором
function isOperator(token: string): boolean {
    return ["+", "-", "*", "/"].indexOf(token) !== -1;
}


// Функция для выполнения операции
function performOperation(operator: string, operand1: number, operand2: number): number {
    switch (operator) {
        case "+":
            return operand1 + operand2;
        case "-":
            return operand1 - operand2;
        case "*":
            return operand1 * operand2;
        case "/":
            if (operand2 === 0) {
                throw new Error("Деление на ноль.");
            }
            return operand1 / operand2;
        default:
            throw new Error(`Неизвестный оператор: ${operator}`);
    }
}

console.log(calc("((- 5 6) "));   // с ошибкой
console.log(calc("*(- 5 6) 7"));       // -7
console.log(calc("+( / 10 5 ) 2"));      // 4
console.log(calc("*( + 2 3 ) ( + 1 1 )"));// 10