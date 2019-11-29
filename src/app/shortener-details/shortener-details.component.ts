import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { StorageService } from '../storage.service';
import { Shortening } from '../models/shortening-response.interface';
import { Router} from '@angular/router';

@Component({
  selector: 'app-shortener-details',
  templateUrl: './shortener-details.component.html',
  styleUrls: ['./shortener-details.component.css']
})
export class ShortenerDetailsComponent implements OnInit {
  shortId = '';
  shortening : Shortening = null;
  constructor(private route: ActivatedRoute, private location: Location,
    private storageService: StorageService, private router: Router) { }

  ngOnInit() {
    this.route.params.forEach(param=> this.shortId = param['id']);
    this.shortening = this.storageService.getShorteningById(this.shortId);
    console.log(this.shortening);
  }

  deleteShortening(shortening:Shortening){
    if(this.storageService.deleteShortening(shortening)) this.router.navigate(["shortener"]);
  }
}
