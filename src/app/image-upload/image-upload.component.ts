import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { UploadService } from '../services/upload.service';
import { HttpClient } from '@angular/common/http';
import { from } from 'rxjs';
import { FormBuilder, FormGroup } from "@angular/forms";
import {Router} from '@angular/router'

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {
  currentFileUpload: File;
  form: FormGroup;
  imageToShow: any;
  images: any=[];
  mainImage: any;
  isImageLoading: boolean;
  slideIndex : number;

  constructor(private fb: FormBuilder,private router: Router,
    private http: HttpClient, private uploadService: UploadService) { }

  ngOnInit() {
    this.createForm();

    this.uploadService.getImage2().subscribe(response => {
      this.images = response;
      console.log('Response image', response.length);
    });

    //this.getImageFromService();
  }
  // Instantiate an AbstractControl from a user specified configuration
  createForm() {
    this.form = this.fb.group({
      file_upload: null
    });
  }

  selectFile(event) {
    this.currentFileUpload = event.target.files;
  }

  fileChange(event: any) {
    // Instantiate an object to read the file content
    let reader = new FileReader();
    // when the load event is fired and the file not empty
    if (event.target.files && event.target.files.length > 0) {
      // Fill file variable with the file content
      this.currentFileUpload = event.target.files[0];
    }
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageToShow = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }

   // console.log('image', this.imageToShow);
  }

  getImageFromService() {
    this.isImageLoading = true;
    var yourImageUrl = `http://localhost:8080/getImage`;
    this.uploadService.getImage(yourImageUrl).subscribe(data => {
      this.createImageFromBlob(data);
      //console.log('data image', data);
      this.isImageLoading = false;
    }, error => {
      this.isImageLoading = false;
      ///console.log(error);
    });
  }

  upload() {

    let body = new FormData();
    body.append("file", this.currentFileUpload);

    this.http.post('http://localhost:8080/upload', body)
      .subscribe(
        // Admire results
        (data) => { console.log(data) },
        // Or errors :-(
        error => console.log(error),
        // tell us if it's finished
        () => { console.log("completed") }
      );

    // this.getImageFromService();
    window.location.reload();

  }

  uploadFile() {
    debugger;
    console.log('Upload called');
    this.uploadService.uploadFile("aa", this.currentFileUpload).subscribe(
      //this.uploadService.saveProjectData(this.currentFileUpload) .subscribe(
      data => {
        console.log(data);
      }
    )

  }

   openModal() {
    document.getElementById("myModal").style.display = "block";
  }
   closeModal() {
    document.getElementById("myModal").style.display = "none";
  }
   currentSlide(n) {
    this.showSlides(this.slideIndex = n);
  }
   showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    //var dots = document.getElementsByClassName("demo");
    //var captionText = document.getElementById("caption");
    if (n > slides.length) {this.slideIndex = 1}
    if (n < 1) {this.slideIndex = slides.length}
    // for (i = 0; i < slides.length; i++) {
    //     slides[i].style.display = "none";
    // }
    // for (i = 0; i < dots.length; i++) {
    //     dots[i].className = dots[i].className.replace(" active", "");
    // }
      //slides[this.slideIndex-1].style.display = "block";
      
    //dots[slideIndex-1].className += " active";
    //captionText.innerHTML = dots[slideIndex-1].alt;
  }

  changeMainImg(image:any){
    console.log("Main image method");
    this.mainImage = image;
}
}
