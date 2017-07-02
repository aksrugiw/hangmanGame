import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
	selector: 'hangman',
	templateUrl: './hangman.component.html',
	styleUrls: ['./hangman.component.scss']
})
export class HangmanComponent implements OnInit, OnChanges {
	private hangmanParts = [];
	private bodyParts = [];
	@Input() failHits = null;

	ngOnInit() {
	  this.bodyParts = [
	  	'',
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
	}

	ngOnChanges() {
		this.renderHangman();
		
	}

	renderHangman() {
		if(this.failHits) {
			this.hangmanParts.push(this.bodyParts[this.failHits]);
		}
		else {
			this.hangmanParts = [];
		}
	}

}