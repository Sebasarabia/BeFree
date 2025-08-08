// index.js o App.js (lo primero de todo)
import 'react-native-get-random-values';

import 'react-native-gesture-handler';   // ← lo que ya tenías
import { registerRootComponent } from 'expo';
import App from './App';

registerRootComponent(App);
