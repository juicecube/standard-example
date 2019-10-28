import { test, UiComponent } from './test';
declare const ENV: string;

test('start');

if (ENV !== 'production') {
  console.log('dev');
  UiComponent();
  
}
