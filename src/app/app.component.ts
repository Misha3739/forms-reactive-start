import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  genders = ['male', 'female', 'other'];
  signupForm: FormGroup;
  defaultGender = 'other';

  forbiddenUserNames = ['Chris', 'Ann'];

  ngOnInit()
  {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this )]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });
    this.signupForm.statusChanges.subscribe((value) => {
      console.log(value);
    });


    this.signupForm.patchValue({
      'userData' : {
        'username' : 'Mihail',
        'email' : 'mihail.udot@yandex.ru'
      },
      //Not working!
      'gender': 'male'
    });
  }

  onSubmit()
  {
    console.log(this.signupForm);

    this.signupForm.reset();
  }

  onAddHobby()
  {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  forbiddenNames(control: FormControl): {[s: string]: boolean}
  {
    if(this.forbiddenUserNames.indexOf(control.value) !== -1)
    {
      return {'nameIsForbidden' : true};
    }
    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any>
  {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if(control.value.startsWith('mihuil'))
        {
          resolve({'emailIsForbidden' : true});
        }
        else
        {
          resolve(null);
        }

      }, 1500);
    });
    return promise;
  }
}
