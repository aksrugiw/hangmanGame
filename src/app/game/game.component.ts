import { Component, OnInit, HostListener } from '@angular/core';
import { WordService } from './word.service';

@Component({
	selector: 'game',
	templateUrl: './game.component.html',
	styleUrls: ['./game.component.scss'],
	providers: [WordService]
})
export class GameComponent implements OnInit {
	private word = '';
	private letters = [];
	private missLetters = [];
	private okLetters = [];
	private okLettersNumber = 0;
	private emptyLetters = [];
	private isGameEnd = false;
	private isGameOver = false;
	private isGameWin = false;

	constructor(private _wordService: WordService) { }

	ngOnInit() {
		this._wordService.getRandomWord()
		.subscribe(res => {
			this.word = res.word.toLowerCase();
			this.prepareGame();
			console.log(this.word);
		},
		err => {
			alert('Something wen\'t wrong. Please reload game.')
		});
	}

	@HostListener('document:keypress', ['$event'])
	handleKeyboardEvent(event: KeyboardEvent) { 
		let code = event.keyCode;

		if ((code > 64 && code < 91)
			|| (code > 96 && code < 123)
			|| code === 32 
			|| code === 45)
		{
		let pressedKey = event.key;
		this.checkGuess(pressedKey);

		}
		
	}

	prepareGame() {
		this.emptyLetters = Array(11 - this.word.length);

		for(let i = 0; i < this.word.length; i++) {
			if (this.letters[this.word[i]]) {
				this.letters[this.word[i]].push(i);
			}
			else {
				this.letters[this.word[i]] = [i];
			}

			this.okLetters.push('_');
		}

	}

	checkGuess(letter) {
		if(this.word.includes(letter)) {
			this.setCorrectAnswer(letter);
		}
		else {
			this.setIncorrectAnswer(letter);
		}
	}

	setCorrectAnswer(letter) {
		let indexes = this.letters[letter];

		if (this.okLetters.indexOf(letter) === -1) {
			for(let i = 0; i < indexes.length; i++) {
				this.okLetters[indexes[i]] = letter;
				this.okLettersNumber++;
			}
		}

		if (this.okLettersNumber === this.word.length) {
			this.isGameEnd = true;
			this.isGameWin = true;
		}
	}

	setIncorrectAnswer(letter) {
		if(this.missLetters.indexOf(letter.toUpperCase()) === -1) {
			this.missLetters.push(letter.toUpperCase());
		}

		if (this.missLetters.length > 10) {
			this.isGameEnd = true;
			this.isGameOver = true;
		}
	}

	resetGame() {
		this.okLetters = [];
		this.emptyLetters = [];
		this.letters = [];
		this.missLetters = [];
		this.okLettersNumber = 0;
		this.isGameEnd = false;
		this.isGameOver = false;
		this.isGameWin = false;
	}

	newGame() {
		this.resetGame();
		this._wordService.getRandomWord()
		.subscribe(res => {
			this.word = res.word.toLowerCase();
			this.prepareGame();
			console.log(this.word);
		},
		err => {
			alert('Something wen\'t wrong. Please reload game.')
		});
	}


}
