import { Component, OnInit } from '@angular/core';
import { ShortenerApiService } from '../shortener-api.service';
import { StorageService } from '../storage.service';
import { Shortening } from '../models/shortening-response.interface';
import { Router} from '@angular/router';

@Component({
  selector: 'app-shortener',
  templateUrl: './shortener.component.html',
  styleUrls: ['./shortener.component.css']
})
export class ShortenerComponent implements OnInit {
  url = '';
  name = '';
  search = '';
  shortenings: Shortening[] = [];

  constructor(
    private shortAPI: ShortenerApiService,
    private storageService: StorageService,
    private router: Router 
  ) { }

  ngOnInit() {
    this.updateShortenings();
  }

  onInput(event : any) {
    const target = event.target;
    const matches = this.storageService.getShortenings()
    .filter(item => item.name.match(new RegExp(target.value,'i')));

    this.shortenings = event.target ? matches : this.storageService.getShortenings();
  }

  onSubmit() {
    if (!this.url || !this.name) {
      return;
    }

    this.shortAPI.shortenUrl(this.url).subscribe((res) => {
      console.log(res, res.result);
      this.storageService.saveShortening(res.result, this.name);
      this.updateShortenings();
    });
  }

  goToDetails(short: Shortening) {
    this.router.navigate(['shortener', short.code]);
  }

  deleteShortening(short:Shortening) {
    const shorteningForDelete = this.storageService.getShorteningById(short.code);
    this.storageService.deleteShortening(shorteningForDelete);
    this.updateShortenings();
  }

  updateShortenings() {
    this.shortenings = this.storageService.getShortenings();
  }
}
