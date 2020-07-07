let fs = require('fs');
fs.readFile('system9.txt', function(err, data) {

  if(err) throw err;
  let matrix = [];
  let vec = [];

  let arr = data.toString().split('\n');
  for (let i=0; i<arr.length - 1; i++) {
    matrix[i] = arr[i].split(' ');
    for (let j = 0; j < matrix[i].length; j++) {
      matrix[i][j] = Number(matrix[i][j]);
    }
  }

  let size = matrix.length;

  for(let i =0; i < size; i++) {
    vec.push(matrix[i][size]);
    matrix[i].splice(size,1);
  }

  const readline = require('readline');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Введите епсилон ', (eps) => {
  rl.close();

  printMatrix(matrix, vec);
  let newVec = transformationsVector(matrix, vec, size);
  let newMatr = transformationsMatrix(matrix, vec, size);
  console.log("Преобразованная матрица");
  printMatrix(newMatr, newVec);
  x = iter(newMatr, newVec, size, eps);
  console.log(x);
  });

})

function printMatrix(matr, vec) { //вывод матрицы
  console.log("Матрица: ");
  console.table(matr);
  console.log("Вектор свободных коэффициентов: ");
  console.table(vec);
  }

function transformationsVector (a, b, size) { //преобразование вектора
  for (let i = 0; i<size; i++) {
    b[i] *=  a[i][i];
  }
  return b;
}

function transformationsMatrix (a, b, size) { //преобразование матрицы
  for (let i = 0; i<size; i++) {
    let temp = a[i][i];
    a[i][i] = 0;
    for(let j = 0; j<size; j++) {
      a[i][j] /= temp;
    }
  }
  return a;
}


function compRatio(a, size) { //коэффициент сжатия < 1
    let sum = 0;
    let max = 0;
    for (let i = 0; i < size; i++)
    {
      for (let j = 0; j < size; j++)
      {
        sum +=Math.abs(a[i][j]);
        if (sum > max)
        max = sum;
      }
    sum = 0;
      }
    return max;
  }

function error (a, size, e) { //погрешность
  let norma = compRatio(a, size);
  let eps = ((1-norma) / norma)*e;
  return eps;
}

function iter(a, b, size, e)
	{
    let c = a; //копия матрицы
    let v = b; // копия вектора
		let x = [];
		let x0 = [];
		let err = [];
		let maxErr = 0;
		myErr = error(a, size, e); //вычисление погрешности с заданным е

		for (let i = 0; i < size; i++)
			x0[i] = 1; //начальное приближение
		let counter = 0; //счётчик итераций
		do
		{
			for (let i = 0; i < size; i++)
			{
				x[i] = b[i];
				for (let j = 0; j < size; j++)
				{
					x[i] -= a[i][j] * x0[j];
				}
				err[i] = Math.abs(x[i] - x0[i]);
			}
			maxErr = 0;
			for (let i = 0; i < size; i++)
			{
				if (maxErr < err[i]) maxErr = err[i];
				x0[i] = x[i];
			}
      console.log("Результаты итераций: ");
      console.log(maxErr);
			counter++;
		} while (maxErr > myErr); //продолжаем

    console.log("Количество итераций: " + counter);
    console.log("Ответ: ");
    console.table(x); // Вывод ответа
	}
