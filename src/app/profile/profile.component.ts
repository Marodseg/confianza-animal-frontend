import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { Organization } from '../interfaces/interfaces';
import { first, shareReplay } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  organization$ = this.userService.getUserProfile();
  selectedFile: ImageSnippet | undefined;

  constructor(public userService: UserService, public toastr: ToastrService) {}

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);

      this.userService.uploadPhoto(this.selectedFile.file).subscribe(
        res => {
          this.toastr.success('Imagen subida con éxito', '', { timeOut: 4000 });
          window.location.reload();
        },
        err => {
          this.toastr.error(err.error.detail, '', { timeOut: 4000 });
        }
      );
    });

    reader.readAsDataURL(file);
  }
}
