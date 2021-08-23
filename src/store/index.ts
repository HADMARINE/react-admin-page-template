import ExStore from './ExStore';
import { RouterStore } from 'mobx-react-router';

export default { ExStore: new ExStore(), Routings: new RouterStore() };

export type Routings = RouterStore;
