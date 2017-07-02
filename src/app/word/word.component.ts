import { Component, OnInit, HostListener } from '@angular/core';
import { WordService } from './word.service';

@Component({
	selector: 'word',
	templateUrl: './word.component.html',
	styleUrls: ['./word.component.scss'],
	providers: [WordService]
})
export class WordComponent implements OnInit {
	private word = '';
	private letters = [];
	private missLetters = [];
	private okLetters = [];
	private okLettersNumber = 0;
	private hangmanParts = [];
	private bodyParts = [];
	private emptyLetters = [];

	constructor(private _wordService: WordService) { }

	ngOnInit() {
		this._wordService.getRandomWord()
		.subscribe(res => {
			this.word = res.word.toLowerCase();
			this.prepareGame();
			console.log(this.word);
		});
	}

	@HostListener('document:keypress', ['$event'])
	handleKeyboardEvent(event: KeyboardEvent) { 
		let pressedKey = event.key;
		
		this.checkGuess(pressedKey);
	}

	prepareGame() {
		this.emptyLetters = Array(11 - this.word.length);

		for(let i = 0; i < this.word.length; i++) {
			if (this.letters[this.word[i]])
				this.letters[this.word[i]].push(i);
			else
				this.letters[this.word[i]] = [i];

			this.okLetters.push('_');
		}
		this.bodyParts = [
		'head',
		'neck',
		'corpus',
		'right-arm',
		'left-arm',
		'right-hand',
		'left-hand',
		'right-leg',
		'left-leg',
		'right-foot',
		'left-foot',
		];

		// this.hangmanParts = this.bodyParts;
		// this.missLetters = ['b', 'a', 'q'];

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

		if (this.okLettersNumber === this.word.length)
			alert('you win');
	}

	setIncorrectAnswer(letter) {
		if(this.missLetters.indexOf(letter.toUpperCase()) === -1) {
			this.renderHangman();
			this.missLetters.push(letter.toUpperCase());
		}

		if (this.missLetters.length > 10)
			alert('you lose :(, correct answer is: ' + this.word);
	}

	renderHangman() {
		let i = this.missLetters.length;
		this.hangmanParts.push(this.bodyParts[i]);
	}


}
