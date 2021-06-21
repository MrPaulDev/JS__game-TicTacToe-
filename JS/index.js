'use strict'



const field = document.querySelector('#field');
const cells = 9;
const movies = generationMovies(cells);
const userMovies = [];
const computerMovies = [];
const combinationsList = [
	[0,1,2], [3,4,5], [6,7,8],
	[0,3,6], [1,4,7], [2,5,8],
	[0,4,8], [6,4,2],
]


for(let i = 0; i < cells; i++){
	const cell = document.createElement('div');
		 	cell.classList.add('cell');
			cell.setAttribute('cell-num', `${i}`);

			field.append(cell);
}

field.addEventListener('click', (event) =>{
	if(checkDoubleClick(event.target.getAttribute('cell-num'))){
		if(event.target.classList.contains('cell')){
			const cell = event.target;
			const cellNum = event.target.getAttribute('cell-num');
			setUserMove(cell, cellNum);
			setTimeout(()=>setComputerMove(), 360);
		}
	}
})


function checkDoubleClick(number){
	return movies.includes(parseInt(number));
}


function checkResult(list){
	if(list.length > 2 ){
		for(let i = 0; i < combinationsList.length; i++){
			if(compareCombination(list, combinationsList[i])) return true;
		}
	}
	return false
}

function compareCombination(list, combination){
	for(let i = 0, count = 0; i < combination.length; i++){
		for(let j = 0; j < list.length; j++){
			if(combination[i] === list[j]) count++;
			if(count === 3){
				colorWinCombination(combination);
				return true;
			}
		}
	}

	return false;
}

function colorWinCombination(combination){
	for(let index = 0; index < combination.length; index++){
		const cell = document.querySelector(`div[cell-num = "${combination[index]}"]`);
			   cell.classList.add('win');
	}
}


function setComputerMove(){
	const index = getRanodm(movies.length - 1, 0);
	const num = movies[index];
	const cell = document.querySelector(`div[cell-num = "${num}"]`);
	if(cell !== null){
		  	cell.innerHTML = '0';
			cell.classList.add('set');
			computerMovies.push(num);
			clearMovies(num);
			if(checkResult(computerMovies)) endGame('Computer Win');
	}
}

function setUserMove(cell, cellNum){
	const num = parseInt(cellNum)
		cell.innerHTML = 'X';
		cell.classList.add('set');
		userMovies.push(num);
		clearMovies(num);
		if(checkResult(userMovies)) endGame('You Win');
}

function clearMovies(cellNum){
	const number = parseInt(cellNum);
	const indexDel = movies.lastIndexOf(number);
	movies.splice(indexDel,1);
}

function endGame(str){
	setTimeout(() => field.innerHTML = `<div class = "score">${str}</div>`, 1200);
}


function generationMovies(cells){
	const list = []
	for(let i = 0; i < cells; i++){
		list.push(i);
	}
	
	return list;
}

function getRanodm(max, min){
	return Math.floor(Math.random() * (max - min + 1)) + min;
}