import { test, UiComponent } from './test';
declare const ENV: string;

test('start');
UiComponent();

if (ENV !== 'production') {
  console.log('dev');
  UiComponent();
  
}
